import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./router/router";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { LoginContext } from "./context/logInConext";
import { useState } from "react";

function App() {

  const [logInDetails,setLogInDetails]=useState({username:'',role:''});

  return (
    <>
      <LoginContext.Provider value={{logInDetails,setLogInDetails}}>
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
