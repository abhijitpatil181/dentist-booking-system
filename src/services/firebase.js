// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAvKV-gjUi9CIj-ab3PqloMGefqfcv5niM',
  authDomain: 'dentist-appointment-bookings.firebaseapp.com',
  projectId: 'dentist-appointment-bookings',
  storageBucket: 'dentist-appointment-bookings.firebasestorage.app',
  messagingSenderId: '407412400314',
  appId: '1:407412400314:web:b1a10763c027c253b56283',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // Initialize Firebase Auth
export const db = getFirestore(app); // Initialize Firestore
export default app;
