import { useState } from 'react';
import { toast } from 'react-toastify';

import { collection, where, query, getDocs, addDoc } from 'firebase/firestore';

import { Button, TextField } from '@/components';
import { db } from '@/services/firebase';

const AddServices = () => {
  const [serviceName, setServiceName] = useState();
  const [price, setPrice] = useState();

  const onSubmitHandler = async e => {
    e.preventDefault();
    try {
      const serviceId = crypto.randomUUID(); // Generate a unique serviceId

      // Reference to the 'services' collection
      const servicesRef = collection(db, 'services');

      // Check if the service already exists
      const q = query(servicesRef, where('serviceId', '==', serviceId));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        console.log('Service with this ID already exists.');
        return;
      }

      // Create a new document in the 'services' collection
      const docRef = await addDoc(servicesRef, {
        serviceName,
        priceOfService: price,
        serviceId,
      });
      reset();
      toast.success(`${serviceName} Added Successfully`);

      console.log('Service added with ID:', docRef.id);
    } catch (error) {
      console.error('Error adding service:', error);
    }
  };

  const reset = () => {
    setServiceName('');
    setPrice('');
  };

  return (
    <>
      <form
        onSubmit={onSubmitHandler}
        style={{ display: 'flex', flexDirection: 'column', rowGap: '1rem', width: '20vw', padding: '2rem' }}
      >
        <TextField
          label="Service Name"
          value={serviceName}
          onChange={e => setServiceName(e.target.value)}
          required={true}
        />
        <TextField
          label="Price of the service"
          value={price}
          type="number"
          onChange={e => setPrice(e.target.value)}
          required={true}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <Button
            style={{
              width: '47%',
              fontSize: '1rem',
              border: 'none',
              borderRadius: '0.5rem',
              backgroundColor: 'grey',
              padding: '0.5rem 1rem',
            }}
            className="custom-class"
            buttonType={'reset'}
          >
            Cancel
          </Button>
          <Button
            style={{
              width: '47%',

              fontSize: '1rem',
              border: 'none',
              borderRadius: '0.5rem',
              padding: '0.5rem 1rem',
            }}
            className="custom-class"
            buttonType={'submit'}
          >
            Add Service
          </Button>
        </div>
      </form>
    </>
  );
};

export default AddServices;
