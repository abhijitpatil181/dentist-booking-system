import { timeSlots } from '@/mock/dashboard.mock';
import Success from '@/pages/customer/components/components/Success';

const BookingBlock = ({ booking, dentistData, handleSlotClick, timeSlot }) => {
  const startSlotIndex = timeSlots.indexOf(booking.timeSlot);
  const endSlotIndex = startSlotIndex + (booking.timeSlot === '1:00 PM' ? 2 : 1); // Adjust for 2-hour slots if necessary

  const topPosition = startSlotIndex * 40; // Calculate top position based on index
  const height = `${(endSlotIndex - startSlotIndex) * 40}px`; // Calculate height based on slots spanned
  const status = booking?.serviceData?.find(data => data.slot === timeSlot)?.status;

  return (
    <div
      style={{
        backgroundColor: status ? '#4caf50' : 'white',
        textAlign: 'center',
        border: '1px solid black',
        borderRadius: '5px',
        top: `${topPosition}px`,
        zIndex: 1,
        cursor: 'pointer',
      }}
      onClick={e => handleSlotClick(booking, timeSlot)}
      aria-disabled={status}
    >
      {dentistData?.fullname} {timeSlot}
    </div>
  );
};

export default BookingBlock;
