import { createBrowserRouter, Navigate } from 'react-router-dom';

import { BookingHistory } from '@/components';
import { Layout } from '@/layout';
import { Payment, ViewBookings } from '@/pages/customer/components';
import Success from '@/pages/customer/components/components/Success';
import { SelectUser } from '@/pages/login/components';
import { Register } from '@/pages/login/components/components';
import { getRoleBasedRoutes } from '@/router/routes/helper';

import { Login } from '../pages';
import PrivateRoutes from './routes/PrivateRoutes';

export const router = createBrowserRouter([
  {
    path: '*',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/login',
    element: <Login />,
    children: [
      {
        path: ':role',
        element: <SelectUser />,
        children: [
          {
            path: 'register',
            element: <Register />,
          },
        ],
      },
    ],
  },
  {
    path: ':user/*',
    element: <PrivateRoutes />,
  },
  {
    path: 'success',
    element: <Success />,
  },
  {
    path: 'view-bookings',
    element: <ViewBookings />,
  },
  {
    path: 'booking-history',
    element: <BookingHistory />,
  },
]);
