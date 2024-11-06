import { useEffect, useState } from 'react';

import useFirestoreCollection from '@/hooks/useFirestoreCollection';
// Importing CSS for styling
import { appointments } from '@/mock/dashboard.mock';
import { getAdminDashboardData } from '@/utils/helper';

import './adminDashboard.css';

const AdminDashboard = () => {
  const { data: bookingsData } = useFirestoreCollection('bookings');
  const { data: servicesData } = useFirestoreCollection('services');
  const [dashboardData, setDashboardData] = useState([]);

  useEffect(() => {
    if (bookingsData.length > 0 && servicesData.length > 0) {
      const data = getAdminDashboardData(bookingsData, servicesData);
      setDashboardData(data);
    }
  }, [bookingsData, servicesData]);

  return (
    <div style={{ paddingTop: '3rem' }}>
      <table className="appointment-table">
        <thead>
          <tr>
            <th>Appointment Date</th>
            <th>Patient Name</th>
            <th>Dentist Name</th>
            <th>Service Requested</th>
          </tr>
        </thead>
        <tbody>
          {dashboardData.map((appointment, index) => (
            <tr key={index}>
              <td>{appointment.appointmentDate}</td>
              <td>{appointment.patientName}</td>
              <td>{appointment.dentistName}</td>
              <td>{appointment.serviceRequested}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
