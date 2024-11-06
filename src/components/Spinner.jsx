import React from 'react';
import './spinner.css'; // Import your CSS file

const Spinner = ({ message }) => {
  return (
    <div className="spinner-overlay">
      <div className="spinner"></div>
      <p className="spinner-message">{message}</p>
    </div>
  );
};

export default Spinner;
