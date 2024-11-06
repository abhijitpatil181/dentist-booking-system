export const dentists = [
  {
    fullName: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@example.com',
    mobileNumber: '987-654-3210',
    gender: 'female',
    hourlyRate: 120,
    userName: 'sarahj123',
    password: 'password123',
    role: 'dentist',
  },
  {
    fullName: 'Dr. Michael Smith',
    email: 'michael.smith@example.com',
    mobileNumber: '555-123-4567',
    gender: 'male',
    hourlyRate: 140,
    userName: 'michaelsmith',
    password: 'mypassword456',
    role: 'dentist',
  },
  {
    fullName: 'Dr. Emily Davis',
    email: 'emily.davis@example.com',
    mobileNumber: '321-654-0987',
    gender: 'female',
    hourlyRate: 135,
    userName: 'emilydavis',
    password: 'password789',
    role: 'dentist',
  },
  {
    fullName: 'Dr. William Brown',
    email: 'william.brown@example.com',
    mobileNumber: '888-555-1234',
    gender: 'male',
    hourlyRate: 160,
    userName: 'williambrown',
    password: 'securepass123',
    role: 'dentist',
  },
  {
    fullName: 'Dr. Olivia Wilson',
    email: 'olivia.wilson@example.com',
    mobileNumber: '444-789-0123',
    gender: 'female',
    hourlyRate: 125,
    userName: 'oliviawilson',
    password: 'mypassword321',
    role: 'dentist',
  },
];

export const services = [
  {
    serviceId: 'svc001',
    serviceName: 'Teeth Cleaning',
    priceOfService: 100,
  },
  {
    serviceId: 'svc002',
    serviceName: 'Tooth Extraction',
    priceOfService: 200,
  },
  {
    serviceId: 'svc003',
    serviceName: 'Root Canal Treatment',
    priceOfService: 500,
  },
  {
    serviceId: 'svc004',
    serviceName: 'Dental Filling',
    priceOfService: 150,
  },
  {
    serviceId: 'svc005',
    serviceName: 'Orthodontic Braces',
    priceOfService: 1200,
  },
  {
    serviceId: 'svc006',
    serviceName: 'Teeth Whitening',
    priceOfService: 250,
  },
  {
    serviceId: 'svc007',
    serviceName: 'Dental Crown',
    priceOfService: 800,
  },
  {
    serviceId: 'svc008',
    serviceName: 'Gum Disease Treatment',
    priceOfService: 400,
  },
];

export const customers = [
  {
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    mobileNumber: '123-456-7890',
    gender: 'male',
    servicesRequired: 'Teeth Cleaning',
    userName: 'johndoe123',
    password: 'password123',
    role: 'customer',
  },
  {
    fullName: 'Jane Smith',
    email: 'jane.smith@example.com',
    mobileNumber: '987-654-3210',
    gender: 'female',
    servicesRequired: 'Root Canal Treatment',
    userName: 'janesmith456',
    password: 'password456',
    role: 'customer',
  },
];

export const bookingData = [
  {
    bookingId: 'BKG123456',
    date: '2024-11-04',
    title: 'Dental Appointment with Dr. Smith',
    timeSlot: '8:30 AM',
  },
  {
    bookingId: 'BKG123457',
    date: '2024-11-12',
    title: 'Teeth Cleaning with Dr. Johnson',
    timeSlot: '9:00 AM',
  },
  {
    bookingId: 'BKG123458',
    date: '2024-11-15',
    title: 'Cavity Filling with Dr. Lee',
    timeSlot: '11:00 AM',
  },
  {
    bookingId: 'BKG123459',
    date: '2024-11-18',
    title: 'Consultation with Dr. Brown',
    timeSlot: '12:00 PM',
  },
  {
    bookingId: 'BKG123460',
    date: '2024-11-20',
    title: 'Braces Adjustment with Dr. Taylor',
    timeSlot: '1:00 PM',
  },
  {
    bookingId: 'BKG123461',
    date: '2024-11-21',
    title: 'Follow-up Appointment with Dr. Adams',
    timeSlot: '2:00 PM',
  },
  {
    bookingId: 'BKG123462',
    date: '2024-11-22',
    title: 'Oral Surgery Consultation with Dr. Miller',
    timeSlot: '3:00 PM',
  },
  {
    bookingId: 'BKG123463',
    date: '2024-11-23',
    title: 'Wisdom Teeth Removal with Dr. Davis',
    timeSlot: '4:00 PM',
  },
  {
    bookingId: 'BKG123464',
    date: '2024-11-24',
    title: 'Preventive Care with Dr. Thompson',
    timeSlot: '5:00 PM',
  },
  {
    bookingId: 'BKG123465',
    date: '2024-11-25',
    title: 'Check-up Appointment with Dr. Wilson',
    timeSlot: '5:30 PM',
  },
];

export const timeSlots = [
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

export const appointments = [
  {
    appointmentId: 1,
    appointmentDate: '2024-11-10',
    patientName: 'John Doe',
    dentistName: 'Dr. Smith',
    serviceRequested: 'Teeth Cleaning',
  },
  {
    appointmentId: 2,
    appointmentDate: '2024-11-12',
    patientName: 'Jane Doe',
    dentistName: 'Dr. Brown',
    serviceRequested: 'Tooth Extraction',
  },
  {
    appointmentId: 3,
    appointmentDate: '2024-11-15',
    patientName: 'Alice Johnson',
    dentistName: 'Dr. Lee',
    serviceRequested: 'Root Canal',
  },
  {
    appointmentId: 4,
    appointmentDate: '2024-11-18',
    patientName: 'Bob Smith',
    dentistName: 'Dr. Patel',
    serviceRequested: 'Dental Checkup',
  },
];

export const reportData = [
  {
    date: '2024-11-09',
    dentistName: 'Dr. Smith',
    numberOfBooking: 4,
    bookings: [
      {
        patientName: 'John Doe',
        serviceName: 'Teeth Cleaning',
        bookingDate: '2024-11-09T10:00:00',
      },
      {
        patientName: 'Jane Doe',
        serviceName: 'Cavity Filling',
        bookingDate: '2024-11-09T11:00:00',
      },
      {
        patientName: 'Mark Spencer',
        serviceName: 'Root Canal',
        bookingDate: '2024-11-09T13:00:00',
      },
      {
        patientName: 'Emily Clark',
        serviceName: 'Teeth Whitening',
        bookingDate: '2024-11-09T14:00:00',
      },
    ],
  },
  {
    date: '2024-11-10',
    dentistName: 'Dr. Taylor',
    numberOfBooking: 4,
    bookings: [
      {
        patientName: 'James Smith',
        serviceName: 'Teeth Cleaning',
        bookingDate: '2024-11-10T09:00:00',
      },
      {
        patientName: 'Sarah Johnson',
        serviceName: 'Cavity Filling',
        bookingDate: '2024-11-10T10:30:00',
      },
      {
        patientName: 'Michael Brown',
        serviceName: 'Tooth Extraction',
        bookingDate: '2024-11-10T12:00:00',
      },
      {
        patientName: 'Olivia Williams',
        serviceName: 'Dental Checkup',
        bookingDate: '2024-11-10T14:30:00',
      },
    ],
  },
];
