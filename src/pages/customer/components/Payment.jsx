import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { parse } from 'date-fns';
import { collection, where, query, getDocs, addDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { Timestamp } from 'firebase/firestore';

// Assuming you create a CSS file for styling
import { Button, TextField } from '@/components';
import useLoginContext from '@/hooks/useLoginConext';
import { db } from '@/services/firebase';

import './payment.css';

const methods = ['Card', 'Net Banking', 'UPI'];

const Payment = ({ dentistId, serviceId, totalPrice, selectedSlot, selectedDate, reset }) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('Card');
  const navigate = useNavigate();
  const location = useLocation();
  const { logInDetails } = useLoginContext();

  const onSubmitHandler = async e => {
    e.preventDefault();
    const date = parse(selectedDate, 'dd MMMM yyyy', new Date());

    // const timestamp = Timestamp.fromDate(date);
    try {
      // Reference to the 'bookings' collection
      const bookingId = crypto.randomUUID();
      const bookingsRef = collection(db, 'bookings');

      // Step 1: Check if a booking already exists for this customer, dentist, and date
      const customerQuery = query(
        bookingsRef,
        where('customerId', '==', logInDetails.username), // Replace 'ab' with dynamic customer ID if applicable
        where('dentistId', '==', dentistId),
        where('date', '==', date),
      );

      const customerQuerySnapshot = await getDocs(customerQuery);
      let docRef = null;

      if (!customerQuerySnapshot.empty) {
        // Document exists with the specified customerId, dentistId, and date
        docRef = customerQuerySnapshot.docs[0].ref;
      }

      // Step 2: Check all bookings for this dentist and date to validate slots
      const slotQuery = query(bookingsRef, where('dentistId', '==', dentistId), where('date', '==', date));

      const slotQuerySnapshot = await getDocs(slotQuery);

      // Collect all booked slots for this dentist on this date
      let totalSlotsBooked = 0;
      let slotAlreadyBooked = false;

      slotQuerySnapshot.forEach(doc => {
        const data = doc.data();

        // Check each slot within serviceData array
        data.serviceData?.forEach(service => {
          if (service.slot === selectedSlot) {
            slotAlreadyBooked = true; // The slot is already booked for this date
          }
        });

        // Count total booked slots for this dentist on this date
        totalSlotsBooked += data.serviceData?.length || 0;
      });

      if (slotAlreadyBooked) {
        toast.error('This slot has already been booked for this dentist on this date.');
        return;
      }

      if (totalSlotsBooked >= 2) {
        toast.error('Only two slots can be booked per day for this dentist.');
        return;
      }
      // Step 3: Add or update booking
      if (docRef) {
        // Update the existing document by adding the new slot and service ID
        await updateDoc(docRef, {
          serviceData: arrayUnion({ slot: selectedSlot, status: false, totalPrice, serviceId }),
        });

        toast.success('Booking updated with new timeslot and service ID.');
      } else {
        // Create a new document since none matched the customer, dentist, and date combination
        const newDocRef = await addDoc(bookingsRef, {
          bookingId,
          customerId: logInDetails.username, // Replace 'ab' with dynamic customer ID if applicable
          dentistId,
          date,
          serviceData: [{ slot: selectedSlot, status: false, totalPrice, serviceId }],
        });

        toast.success('Booking created with ID:', newDocRef.id);
      }
      reset();
      navigate(`${location.pathname}/success`);
    } catch (error) {
      console.error('Error adding or updating booking:', error);
    }
  };

  return (
    <div style={{ width: '30vw', padding: '2rem', display: 'flex', flexDirection: 'column', rowGap: '1rem' }}>
      <p style={{ fontSize: '1.3rem' }}>Select Payment Method</p>
      <div className="payment-tabs">
        {methods.map(method => (
          <div
            key={method}
            className={`payment-tab ${selectedPaymentMethod === method ? 'active' : 'inactive'}`}
            onClick={() => setSelectedPaymentMethod(method)}
          >
            <p>{method}</p>
          </div>
        ))}
      </div>
      <form onSubmit={onSubmitHandler} style={{ display: 'flex', flexDirection: 'column', rowGap: '1rem' }}>
        <TextField
          label="Card Number"
          value={'3453 2222 6666'}
          onChange={e => console.log(e)}
          required={true}
        />
        <TextField
          label="Card Holder Name"
          value={'Vishal Singh'}
          onChange={e => console.log(e)}
          required={true}
        />
        <div
          style={{ display: 'flex', columnGap: '1rem', justifyContent: 'space-between', flexWrap: 'wrap' }}
        >
          <TextField
            label="Expiration Date"
            value={'08/2030'}
            onChange={e => console.log(e)}
            style={{ width: '40%' }}
            required={true}
          />
          <TextField
            label="CVV"
            value={898}
            onChange={e => console.log(e)}
            style={{ width: '40%' }}
            required={true}
            type="number"
          />
        </div>
        <div
          style={{ display: 'flex', columnGap: '1rem', justifyContent: 'space-between', flexWrap: 'wrap' }}
        >
          <Button
            style={{
              width: '40%',
              fontSize: '1rem',
              backgroundColor: 'transparent', // Transparent background for outline look
              color: '#333', // Text color, adjust to match the border color
              border: '2px solid #333', // Border color to match the outline color
              borderRadius: '0.5rem',
              padding: '0.5rem 1rem',
            }}
            className="custom-class"
            onClick={e => {
              e.preventDefault();
            }}
            buttonType={'cancel'}
          >
            Cancel
          </Button>
          <Button
            style={{
              width: '40%',
              fontSize: '1rem',
              border: 'none',
              borderRadius: '0.5rem',
              padding: '0.5rem 1rem',
            }}
            className="custom-class"
            buttonType={'submit'}
          >
            Pay
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Payment;
