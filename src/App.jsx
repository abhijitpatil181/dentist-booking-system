import { useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import { LoginContext } from './context/logInConext';
import { router } from './router/router';

function App() {
  const [logInDetails, setLogInDetails] = useState({ username: '', role: '' });

  return (
    <>
      <LoginContext.Provider value={{ logInDetails, setLogInDetails }}>
        <RouterProvider router={router} />

        <ToastContainer
          position="top-right"
          autoClose={5000}
          limit={3}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          closeButton
        />
      </LoginContext.Provider>
    </>
  );
}

export default App;
