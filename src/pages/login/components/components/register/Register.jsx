import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc, getDocs, query, where, collection } from 'firebase/firestore';

import { Button, TextField } from '@/components';
import { auth, db } from '@/services/firebase';

import SelectGender from './SelectGender';
import './register.css';

const Register = ({ formType = '' }) => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [age, setAge] = useState(null);
  const [servicesRequired, setServicesRequired] = useState('');
  const [username, setUsername] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [hourlyRate, setHourlyRate] = useState();
  const [isChecked, setIsChecked] = useState(false);
  let { role } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const isAddingDentist = location.pathname.endsWith('/add-dentist');
  if (location.pathname.includes('/admin')) {
    role = 'admin';
  }

  console.log('role', role);

  const onChangeHandler = (label, value) => {
    switch (label) {
      case 'fullname':
        setFullname(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'mobileNumber':
        setMobileNumber(value);
        break;
      case 'age':
        setAge(value);
        break;
      case 'servicesRequired':
        setServicesRequired(value);
        break;
      case 'username':
        setUsername(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        console.log('No valid field selected');
    }
  };

  const registerUser = async (
    username,
    password,
    fullname,
    email,
    mobileNumber,
    gender,
    age = 10,
    servicesRequired = [],
    hourlyRate = 100,
  ) => {
    try {
      // Define the collection based on the role
      const collectionName = role === 'admin' ? 'dentist' : role;

      // Check if the username already exists in the respective collection
      const usernameQuery = query(collection(db, collectionName), where('username', '==', username));
      const usernameSnapshot = await getDocs(usernameQuery);

      if (!usernameSnapshot.empty) {
        // Username already exists
        toast.error('Username already exists. Please choose another username.');
        return;
      }
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;

      switch (role) {
        case 'admin': {
          const currentRole = 'dentist';
          await setDoc(doc(db, currentRole, userId), {
            fullname,
            username,
            email,
            password,
            gender,
            mobileNumber,
            hourlyRate,
            role: currentRole,
          });
          toast.success('Dentist Added Successfully !');
          break;
        }

        case 'customer':
          await setDoc(doc(db, role, userId), {
            fullname,
            username,
            email,
            password,
            age,
            gender,
            servicesRequired,
            mobileNumber,
            role,
          });
          toast.success('Customer Registered Successfully !');
          navigate(`/login/${role}`);
          break;

        default:
          console.log('not found');
      }
      reset();
    } catch (error) {
      console.error('Error registering user:', error);
      toast.error(error.message);
    }
  };

  const onSubmitHandler = e => {
    e.preventDefault();

    switch (role) {
      case 'admin':
        if (isAddingDentist)
          registerUser(username, password, fullname, email, mobileNumber, gender, 10, [], hourlyRate);
        break;

      case 'customer':
        registerUser(
          username,
          password,
          fullname,
          email,
          mobileNumber,
          gender,
          age,
          servicesRequired.split(','),
        );
        break;

      default:
        console.log('not found');
    }
  };

  const reset = () => {
    setFullname('');
    setEmail('');
    setMobileNumber('');
    setAge(null);
    setServicesRequired('');
    setUsername('');
    setGender('');
    setPassword('');
    setHourlyRate('');
    setIsChecked(false);
  };

  return (
    <>
      <form
        onSubmit={e => onSubmitHandler(e)}
        style={{
          borderRadius: '0.5rem',
          border: formType === 'register' ? '1px solid black' : 'none',
          width: '45vw',
          minHeight: '35vh',
          minWidth: '10rem',
          padding: '1.5rem',
        }}
      >
        <div className="form-container">
          {formType === 'register' && <h3 style={{ fontWeight: 400, textAlign: 'center' }}>Logo</h3>}
          <div className="input-container">
            <TextField
              label="Full Name"
              value={fullname}
              onChange={e => onChangeHandler('fullname', e.target.value)}
              required={true}
              style={{ width: 'calc(50% - 1rem)' }}
            />
            <TextField
              label="Email"
              value={email}
              onChange={e => onChangeHandler('email', e.target.value)}
              required={true}
              type="email"
              style={{ width: 'calc(50% - 1rem)' }}
            />
          </div>
          <div className="input-container">
            <TextField
              label="Mobile No."
              value={mobileNumber}
              onChange={e => onChangeHandler('mobileNumber', e.target.value)}
              required={true}
              style={{ width: 'calc(50% - 1rem)' }}
            />
            {formType === 'register' && (
              <TextField
                label="Age"
                value={age}
                onChange={e => onChangeHandler('age', e.target.value)}
                required={true}
                type="number"
                style={{ width: 'calc(50% - 1rem)' }}
              />
            )}
            {formType === 'add-dentist' && (
              <TextField
                label="Hourly Rate"
                value={hourlyRate}
                onChange={e => setHourlyRate(e.target.value)}
                required={true}
                type="number"
                style={{ width: 'calc(50% - 1rem)' }}
              />
            )}
          </div>
          <div className="input-container">
            <SelectGender gender={gender} handleGenderChange={value => setGender(value)} />
            {formType === 'register' && (
              <TextField
                label="Services Required"
                value={servicesRequired}
                onChange={e => onChangeHandler('servicesRequired', e.target.value)}
                required={true}
                type="text"
                style={{ width: 'calc(50% - 1rem)' }}
              />
            )}
            {formType === 'add-dentist' && (
              <TextField
                label="Username"
                value={username}
                onChange={e => onChangeHandler('username', e.target.value)}
                required={true}
                style={{ width: 'calc(50% - 1rem)' }}
              />
            )}
          </div>
          <div className="input-container">
            {formType === 'register' && (
              <TextField
                label="Username"
                value={username}
                onChange={e => onChangeHandler('username', e.target.value)}
                required={true}
                style={{ width: 'calc(50% - 1rem)' }}
              />
            )}
            <TextField
              label="Password"
              value={password}
              onChange={e => onChangeHandler('password', e.target.value)}
              required={true}
              style={{ width: 'calc(50% - 1rem)' }}
            />
          </div>

          <div className="input-container" style={{ width: formType === 'register' ? '100%' : '50%' }}>
            {formType === 'register' && (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <label>
                  <input
                    type="checkbox"
                    checked={isChecked} // Controlled component
                    onChange={() => setIsChecked(!isChecked)} // Event handler
                    style={{ transform: 'scale(1.3)', marginRight: '0.8rem' }}
                    required
                  />
                  I accept terms and condition
                </label>
              </div>
            )}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              style={{
                width: 'calc(50% - 1rem)',
                fontSize: '1rem',
                backgroundColor: 'transparent', // Transparent background for outline look
                color: '#333', // Text color, adjust to match the border color
                border: '2px solid #333', // Border color to match the outline color
                borderRadius: '0.5rem',
                padding: '0.5rem 1rem',
              }}
              className="custom-class"
              buttonType={'cancel'}
            >
              Cancel
            </Button>

            <Button
              style={{
                width: 'calc(50% - 1rem)',
                fontSize: '1rem',
                border: 'none',
                borderRadius: '0.5rem',
                padding: '0.5rem 1rem',
              }}
              className="custom-class"
              buttonType={'submit'}
            >
              {formType === 'register' ? 'Sign Up' : 'Add Dentist'}
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Register;
