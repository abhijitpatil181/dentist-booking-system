import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { parse, format, startOfWeek, add, sub } from 'date-fns';
import { collection, where, query, getDocs, doc, updateDoc } from 'firebase/firestore';

import useBookingContext from '@/hooks/useBookingContext';
import useFirestoreCollection from '@/hooks/useFirestoreCollection';
import useLoginContext from '@/hooks/useLoginConext';
import { bookingData } from '@/mock/dashboard.mock';
import { db } from '@/services/firebase';

import Dialog from '../dialog/Dialog';
import AppointmentDetails from './AppointmentDetails';
// for selectable dates
import BookingBlock from './BookingBlock';

const timeSlots = [
  '8:30 AM',
  '9:00 AM',
  '11:00 AM',
  '12:00 PM',
  '1:00 PM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM',
  '5:00 PM',
  '5:30 PM',
];

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const BookingHistory = () => {
  console.log('renderd');
  const { data } = useFirestoreCollection('bookings');
  const { data: customerData } = useFirestoreCollection('customer');
  const { data: dentistData } = useFirestoreCollection('dentist');
  const { data: servicesData } = useFirestoreCollection('services');
  const { historyDate, setHistoryDate } = useBookingContext();
  const [weekDates, setWeekDates] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentWeekStart, setCurrentWeekStart] = useState(null);
  const [open, setOpen] = useState(false);
  const [slotData, setSlotData] = useState({
    patientName: '',
    serviceName: '',
    slot: '',
    serviceId: '',
    bookingId: '',
  });
  const location = useLocation();
  const isBooking = location.pathname.endsWith('/bookings');
  console.log('bookings', isBooking);
  const bookingHistory = location.pathname.endsWith('/booking-history');
  const navigate = useNavigate();
  const { logInDetails } = useLoginContext();

  const getFormattedDate = dateString => format(parse(dateString, 'yyyy-MM-dd', new Date()), 'd MMMM yyyy');

  // Calculate the initial week dates
  useEffect(() => {
    if (historyDate) {
      const initialDate = parse(historyDate, 'yyyy-MM-dd', new Date());
      const initialWeekStart = startOfWeek(initialDate, { weekStartsOn: 1 }); // Monday as the start of the week
      setCurrentWeekStart(initialWeekStart);
      calculateWeekDates(initialWeekStart);
    } else {
      navigate(`/${logInDetails.role}/dashboard`);
    }
  }, [historyDate]);

  // Calculate week dates based on the given start date
  const calculateWeekDates = startOfWeekDate => {
    const dates = Array.from({ length: 6 }, (_, i) =>
      format(add(startOfWeekDate, { days: i }), 'yyyy-MM-dd'),
    );
    setWeekDates(dates);
    setStartDate(getFormattedDate(dates[0]));
    setEndDate(getFormattedDate(dates[dates.length - 1]));
  };

  // Navigate to the previous week
  const handlePreviousWeek = () => {
    const previousWeekStart = sub(currentWeekStart, { weeks: 1 });
    setCurrentWeekStart(previousWeekStart);
    calculateWeekDates(previousWeekStart);
  };

  // Navigate to the next week
  const handleNextWeek = () => {
    const nextWeekStart = add(currentWeekStart, { weeks: 1 });
    setCurrentWeekStart(nextWeekStart);
    calculateWeekDates(nextWeekStart);
  };

  // Filter bookings for a specific day
  const getBookingsForDay = date => {
    return data.filter(booking => {
      const bookingDate = booking.date.toDate();
      const formattedDate = format(bookingDate, 'yyyy-MM-dd');
      return (
        formattedDate === date &&
        (booking.customerId === logInDetails.username || booking.dentistId === logInDetails.username)
      );
    });
  };

  const handleSlotClick = (booking, slot) => {
    if (booking.bookingId && slot && logInDetails.role === 'dentist') {
      const patientName = customerData.find(customer => customer.username === booking.customerId)?.fullname;
      const bookedServiceId = booking.serviceData.find(service => service.slot === slot)?.serviceId;
      const serviceName = servicesData.find(service => service.serviceId === bookedServiceId)?.serviceName;
      setSlotData({
        patientName,
        serviceName,
        serviceId: bookedServiceId,
        bookingId: booking.bookingId,
        slot,
      });
      setOpen(true);
    }
  };

  const handleConfirm = async () => {
    try {
      const bookingsRef = collection(db, 'bookings');

      const customerQuery = query(bookingsRef, where('bookingId', '==', slotData.bookingId));

      // Get the documents that match the query
      const querySnapshot = await getDocs(customerQuery);
      querySnapshot.forEach(async docSnapshot => {
        const bookingData = docSnapshot.data();

        // Assuming servicesData is an array of services in the document
        const updatedServicesData = bookingData.serviceData.map(service => {
          if (service.slot === slotData.slot) {
            // Match slot if you have a specific slot to match
            return { ...service, status: true }; // Update the status to true
          }
          return service;
        });

        // Update the document with modified servicesData
        const bookingDocRef = doc(db, 'bookings', docSnapshot.id);
        await updateDoc(bookingDocRef, {
          serviceData: updatedServicesData,
        });
      });
      toast.success('Booking Data Updated Successfully !');
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', height: '2.5rem' }}>
        <p style={{ fontSize: '1.5rem', fontWeight: 400, paddingBottom: '0.3rem', paddingLeft: '0.3rem' }}>
          Booking History
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {bookingHistory && (
            <button
              onClick={handlePreviousWeek}
              style={{
                marginLeft: '0.5rem',
                border: 'none',
                background: 'transparent',
                padding: '0.5rem',
                cursor: 'pointer',
                fontSize: '1.2rem',
              }}
            >
              &lt;
            </button>
          )}
          <h6 style={{ fontSize: '1.2rem', margin: '0', fontWeight: 400 }}>{`${startDate} - ${endDate}`}</h6>
          {bookingHistory && (
            <button
              onClick={handleNextWeek}
              style={{
                marginLeft: '0.5rem',
                border: 'none',
                background: 'transparent',
                padding: '0.5rem',
                cursor: 'pointer',
                fontSize: '1.2rem',
              }}
            >
              &gt;
            </button>
          )}
        </div>
        <button
          style={{
            background: isBooking ? 'white' : '#D6CCCC',
            height: '100%',
            fontSize: '1.2rem',
            fontWeight: 400,
            border: '1px solid black',
            padding: '0.2rem 0.5rem',
            cursor: 'pointer',
          }}
          onClick={e => {
            e.preventDefault(); // Prevent default action if necessary
            const formattedDate = format(new Date(), 'yyyy-MM-dd');
            setHistoryDate(formattedDate);
            navigate('booking-history');
          }}
          disabled={bookingHistory ? true : false}
        >
          Booking History
        </button>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', position: 'relative' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #D9D9D9', padding: '8px' }}>Time Slots</th>
            {daysOfWeek.map((day, index) => (
              <th key={index} style={{ border: '1px solid #D9D9D9', padding: '8px' }}>
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((time, index) => (
            <tr key={index} style={{ position: 'relative' }}>
              <td style={{ border: '1px solid #D9D9D9', padding: '8px' }}>{time}</td>
              {weekDates.map((date, dayIndex) => {
                const bookingsForDay = getBookingsForDay(date);
                const bookingForTimeSlot = bookingsForDay.find(booking =>
                  booking.serviceData.some(bookedSlot => bookedSlot.slot === time),
                );

                return (
                  <td
                    key={dayIndex}
                    style={{
                      border: '1px solid #D9D9D9',
                      padding: '0.5rem',
                      position: 'relative',
                      height: '4rem',
                    }}
                  >
                    {bookingForTimeSlot &&
                    bookingForTimeSlot.serviceData.some(bookedSlot => bookedSlot.slot === time) ? (
                      <BookingBlock
                        key={bookingForTimeSlot.bookingId}
                        booking={bookingForTimeSlot}
                        dentistData={dentistData.find(
                          dentist => dentist.username === bookingForTimeSlot.dentistId,
                        )}
                        handleSlotClick={handleSlotClick}
                        timeSlot={time}
                      />
                    ) : null}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      {open && (
        <Dialog
          isOpen={open}
          onClose={() => setOpen(false)}
          title="Appointment Details"
          content={<AppointmentDetails bookedData={slotData} />}
          confirmText="Complete"
          onConfirm={handleConfirm}
          height="50vh"
          width="5vw"
        />
      )}
    </div>
  );
};

export default BookingHistory;
