import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useState ,useEffect} from 'react';
import useFirestoreCollection from '@/hooks/useFirestoreCollection';
import "./viewBookings.css"
import useBookingContext from '@/hooks/useBookingContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { parse } from 'date-fns';
import { parseEventDate } from '@/utils/helper';

const ViewBookings=()=>{
  const {data}=useFirestoreCollection('bookings');
  const {data:dentistData}=useFirestoreCollection('dentist')
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const {setHistoryDate}=useBookingContext();
  const navigate=useNavigate();
  const location=useLocation();


  const fetchEventsForMonth = (date) => {
    const targetMonth = date.getMonth();
    const targetYear = date.getFullYear();

    return data
      .filter((item) => {
          // Convert Firestore date string to a Date object
           const itemDate=item.date.toDate();
         
          // Check if itemDate matches the current month and year
          return (
            itemDate.getMonth() === targetMonth &&
            itemDate.getFullYear() === targetYear
          );
      })
      .map((item) => {
      
          const itemDate = item.date.toDate();
          const dentistName = dentistData.find((dentist) => dentist.username === item.dentistId)?.fullname;

          // Format the date as "YYYY-MM-DD" for FullCalendar
          
          const formatDate = (inputDate) => {
          const date = new Date(inputDate);
          return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
          };
          const formattedDate = formatDate(itemDate);
          item.serviceData.length

         return item.serviceData.slice(0, 2).map((service) => ({
            title: `${dentistName || 'No Title'} - ${service.slot}`, // Customize title based on service
            date: formattedDate,
            extendedProps: {
              bookingId: item.id, // Assuming you have an ID for the booking
              serviceId: service.serviceId, // Or whatever identifier you have
              totalPrice: service.totalPrice, // Include any other relevant data
              status: service.status, // Include status if needed
            },
          }));
      });
  };


  useEffect(() => {
    if(data.length>0){     
      const newEvents = fetchEventsForMonth(currentDate); // Fetch events when currentDate changes       
      setEvents(newEvents.flatMap(event => event));
    }
  }, [currentDate,data]);

   const handlePrevMonth = () => {
    const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    setCurrentDate(prevMonth);
  };

  // Function to handle the next month
  const handleNextMonth = () => {
    const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    setCurrentDate(nextMonth);
  };
  const monthYearString = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  const handleEventClick = (info) => {
  const { event } = info; // The clicked event

  const eventDate = event.start; // This will be a Date object
  const formattedDate = format(eventDate, 'yyyy-MM-dd');
  setHistoryDate(formattedDate);
  navigate('bookings')

};

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-end', height: '4vh', marginTop: '1rem' }}>
        <div style={{ border: '1px solid grey', display: 'flex', alignItems: 'center', width: '12.6vw', justifyContent: 'center' }}>
          <button onClick={handlePrevMonth} style={{ marginRight: '0.5rem' }}>
            &lt; {/* Previous month icon */}
          </button>
          <h6 style={{ fontSize: '1rem', margin: '0' }}>{monthYearString}</h6> {/* Display current month and year */}
          <button onClick={handleNextMonth} style={{ marginLeft: '0.5rem' }}>
            &gt; {/* Next month icon */}
          </button>
        </div>
        <button 
          style={{
            border: '1px solid grey',
            display: 'flex',
            alignItems: 'center',
            width: '12.6vw',
            justifyContent: 'center',
            cursor: 'pointer',
            padding: '0.5rem', // Add padding for better appearance
            backgroundColor: 'transparent' // Optional: set background color if needed
          }} 
          onClick={(e) => {
            e.preventDefault();
            const formattedDate = format(new Date(), 'yyyy-MM-dd');
            setHistoryDate(formattedDate);
            navigate('view-booking');
          }}
        >
          Booking History
        </button>
      </div>
       <FullCalendar
        plugins={[dayGridPlugin,interactionPlugin]}
        initialView="dayGridMonth"
        height={'95%'}
        dayHeaderFormat={{ weekday: 'long' }}
        headerToolbar={false}
        events={events} // Pass the events to the calendar
        datesSet={({ start }) => {
           const newDate = new Date(start);
          setCurrentDate(new Date(newDate.getFullYear(), newDate.getMonth()+1, 1)); // Set to first of the month
          setEvents(fetchEventsForMonth(new Date(newDate.getFullYear(), newDate.getMonth()+1, 1)));
        }}
       eventClick={handleEventClick}
      
      />
    </>
  )
}

export default ViewBookings;