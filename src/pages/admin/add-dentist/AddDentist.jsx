import { useState } from 'react';

import { Button, TextField } from '@/components';
import { Register } from '@/pages/login/components/components';

const AddDentist = () => {
  return (
    <>
      <Register formType="add-dentist" />
    </>
  );
};

export default AddDentist;
