import { AddDentist, AddServices, AdminDashboard, ViewReport } from "@/pages/admin";
import {CustomerDashboard} from "@/pages";
import { DentistDashboard } from "@/pages";
import { Navigate } from "react-router-dom";
import { Payment, ViewBookings } from "@/pages/customer/components";
import Success from "@/pages/customer/components/components/Success";
import { BookingHistory } from "@/components";

export const getRoleBasedRoutes = (userRole) => {

  switch (userRole) {
    case 'admin':
      return [
        {path:'', element: <Navigate to="dashboard" replace />},
        { path: 'dashboard', element: <AdminDashboard /> },
        { path: 'add-service', element: <AddServices /> },
        { path: 'view-report', element: <ViewReport /> },
        { path: 'add-dentist', element: <AddDentist /> },
      ];
    case 'dentist':
      return [
        {path:'', element: <Navigate to="dashboard" replace />},
        { path: 'dashboard', element: <DentistDashboard />,children:[{
          path:'bookings',
          element:<BookingHistory/>
        }], 
      }
      ];
    case 'customer':
      return [
        {path:'', element: <Navigate to="dashboard" replace />},
        { path: 'dashboard', element: <CustomerDashboard /> ,children:[
            {
              path:'payment',
              element:<Payment/>,
              children:[
                {
                  path:'success',
                  element:<Success/>
                }
              ]
            },
            {
               path:'view-bookings',
              element:<ViewBookings/>,
            }
        ]}
      ];
    default:
      return [{ path: '*', element: <Navigate to="/login" replace /> }];
  }
};
