import { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import { format } from 'date-fns';

import { BookingHistory, Dialog } from '@/components';
import { BookingContext } from '@/context/bookingContext';
import useFirestoreCollection from '@/hooks/useFirestoreCollection';
import useLoginContext from '@/hooks/useLoginConext';

import { BookAppointment, Payment, ViewBookings } from './components';
import Success from './components/components/Success';
import './customerDashboard.css';

const CustomerDashboard = () => {
  const { data: dentistData } = useFirestoreCollection('dentist');
  const { data: servicesData } = useFirestoreCollection('services');
  const { data: bookingData } = useFirestoreCollection('bookings');
  const [currentDate, setCurrentDate] = useState(new Date()); // Initialize current date
  const [selectedDate, setSelectedDate] = useState('');
  const [events, setEvents] = useState([]); // State to hold events
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isPaymentRoute = location.pathname.endsWith('/payment');
  const isPaymentSuccess = location.pathname.endsWith('/success');
  const isCustomerDashboard = location.pathname.endsWith('/dashboard');
  const isBooking = location.pathname.endsWith('/bookings') || location.pathname.endsWith('/booking-history');
  const [selectedDentist, setSelectedDentist] = useState({ id: '', value: '' });
  const [selectedService, setSelectedService] = useState({ id: '', value: '' });
  const [totalPrice, setTotalPrice] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [historyDate, setHistoryDate] = useState('');
  const { logInDetails } = useLoginContext();
  console.log('bookings', isBooking);

  const fetchEventsForMonth = date => {
    const targetMonth = date.getMonth();
    const targetYear = date.getFullYear();

    return bookingData
      .filter(booked => {
        if (logInDetails.role === 'customer' && booked.customerId === logInDetails.username) {
          return true;
        } else if (logInDetails.role === 'dentist' && booked.dentistId === logInDetails.username) {
          return true;
        }
        return false;
      })
      .filter(item => {
        // Convert Firestore date string to a Date object
        const itemDate = item.date.toDate();

        // Check if itemDate matches the current month and year
        return itemDate.getMonth() === targetMonth && itemDate.getFullYear() === targetYear;
      })
      .map(item => {
        const itemDate = item.date.toDate();
        const dentistName = dentistData.find(dentist => dentist.username === item.dentistId)?.fullname;

        // Format the date as "YYYY-MM-DD" for FullCalendar

        const formatDate = inputDate => {
          const date = new Date(inputDate);
          return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        };
        const formattedDate = formatDate(itemDate);
        item.serviceData.length;

        return item.serviceData.slice(0, 2).map(service => ({
          title: `${dentistName || 'No Title'} - ${service.slot}`,
          date: formattedDate,
          color: service.status ? '#4caf50' : 'white',
          borderColor: service.status ? 'none' : '1px solid black',
          extendedProps: {
            bookingId: item.id,
            serviceId: service.serviceId,
            totalPrice: service.totalPrice,
            status: service.status,
          },
        }));
      });
  };

  useEffect(() => {
    if (bookingData.length > 0) {
      const newEvents = fetchEventsForMonth(currentDate); // Fetch events when currentDate changes
      setEvents(newEvents.flatMap(event => event));
    }
  }, [currentDate, bookingData]);

  const handleDateClick = e => {
    if (logInDetails.role === 'customer') {
      const date = e.date; // This is a Date object from FullCalendar
      const dayName = format(date, 'EEEE');
      if (dayName === 'Sunday' || dayName === 'Saturday') {
        toast.error('Booking is available from Monday to Sunday !');
        return;
      }
      const formattedDate = format(date, 'dd MMMM yyyy');
      setSelectedDate(formattedDate);
      setIsDialogOpen(true); // Open dialog on date click
    }
  };

  const handleConfirm = () => {
    if (!selectedDentist.id) {
      toast.error('Please Select Dentist');
      return;
    } else if (!selectedService.id) {
      toast.error('Please Select Dentist');
      return;
    } else if (!selectedSlot) {
      toast.error('Please Select Slot');
      return;
    }

    setIsDialogOpen(false);
    navigate('payment');
  };

  // Function to handle the previous month
  const handlePrevMonth = () => {
    const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    setCurrentDate(prevMonth);
  };

  // Function to handle the next month
  const handleNextMonth = () => {
    const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    setCurrentDate(nextMonth);
  };

  const handleEventClick = info => {
    const { event } = info; // The clicked event

    const eventDate = event.start; // This will be a Date object
    const formattedDate = format(eventDate, 'yyyy-MM-dd');
    setHistoryDate(formattedDate);

    navigate('bookings');
  };

  const reset = () => {
    setSelectedDate('');
    setSelectedDentist({ id: '', value: '' });
    setSelectedService({ id: '', value: '' });
    setSelectedSlot('');
  };

  // Get the formatted current month and year
  const monthYearString = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <>
      <BookingContext.Provider value={{ historyDate, setHistoryDate }}>
        {/* {isViewBookings && <ViewBookings/>} */}
        {isBooking && (
          <div style={{ paddingTop: '1rem' }}>
            <BookingHistory />
          </div>
        )}
      </BookingContext.Provider>
      {isPaymentRoute && (
        <Payment
          dentistId={selectedDentist.id}
          serviceId={selectedService.id}
          totalPrice={totalPrice}
          selectedSlot={selectedSlot}
          selectedDate={selectedDate}
          reset={reset}
        />
      )}
      {isCustomerDashboard && (
        <>
          <div style={{ display: 'flex', justifyContent: 'flex-end', height: '4vh', marginTop: '1rem' }}>
            <div
              style={{
                border: '1px solid grey',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <button
                onClick={handlePrevMonth}
                style={{
                  marginLeft: '0.5rem',
                  border: 'none',
                  background: 'transparent',
                  padding: '0.5rem',
                  cursor: 'pointer',
                  fontSize: '1.2rem',
                }}
              >
                &lt; {/* Previous month icon */}
              </button>
              <h6 style={{ fontSize: '1.2rem', margin: '0', fontWeight: 400 }}>{monthYearString}</h6>{' '}
              {/* Display current month and year */}
              <button
                onClick={handleNextMonth}
                style={{
                  marginLeft: '0.5rem',
                  border: 'none',
                  background: 'transparent',
                  padding: '0.5rem',
                  cursor: 'pointer',
                  fontSize: '1.2rem',
                }}
              >
                &gt; {/* Next month icon */}
              </button>
            </div>
            {logInDetails.role === 'customer' && (
              <div
                style={{
                  border: '1px solid grey',
                  display: 'flex',
                  alignItems: 'center',
                  width: '12.6vw',
                  justifyContent: 'center',
                }}
              >
                <h6
                  style={{ fontSize: '1.2rem', fontWeight: 400, cursor: 'pointer' }}
                  onClick={() => {
                    const formattedDate = format(new Date(), 'yyyy-MM-dd');
                    setHistoryDate(formattedDate);
                    navigate('booking-history');
                  }}
                >
                  Booking History
                </h6>
              </div>
            )}
          </div>

          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            height={'80vh'}
            width={'60%'}
            dayHeaderFormat={{ weekday: 'long' }}
            headerToolbar={false}
            events={events} // Pass the events to the calendar
            datesSet={({ start }) => {
              const newDate = new Date(start);
              setCurrentDate(new Date(newDate.getFullYear(), newDate.getMonth() + 1, 1)); // Set to first of the month
              setEvents(fetchEventsForMonth(new Date(newDate.getFullYear(), newDate.getMonth() + 1, 1)));
            }}
            dateClick={e => handleDateClick(e)}
            eventDidMount={info => {
              // Check the event's `status` from extendedProps
              // if (info.event.extendedProps.status === true) {
              //   // Apply green background for `status: true`
              //   // info.backgroundColor= '#4caf50 !important'
              //    info.el.classList.add('green-event')
              //   // info.el.style.color = 'white'; // Adjust text color for readability
              // }
            }}
            eventClick={handleEventClick}
          />

          <Dialog
            isOpen={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
            title="Book Appointment"
            content={
              <BookAppointment
                date={selectedDate}
                dentistData={dentistData}
                servicesData={servicesData}
                selectedDentist={selectedDentist}
                selectedService={selectedService}
                totalPrice={totalPrice}
                setTotalPrice={setTotalPrice}
                selectedSlot={selectedSlot}
                setSelectedDentist={setSelectedDentist}
                setSelectedService={setSelectedService}
                setSelectedSlot={setSelectedSlot}
              />
            }
            confirmText="Make Payment"
            onConfirm={handleConfirm}
            height="50vh"
            width="15vw"
          />
        </>
      )}
      {isPaymentSuccess && <Success />}
    </>
  );
};

export default CustomerDashboard;
