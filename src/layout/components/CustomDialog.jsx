// CustomDialog.js
import React from 'react';

import './customDialog.css';

const CustomDialog = ({ isOpen, onClose, username, onLogout }) => {
  if (!isOpen) return null; // Don't render if dialog is not open

  return (
    <div className="overlay">
      <div className="dialog-content">
        <div style={{ display: 'flex', flexDirection: 'column', rowGap: '0.5rem' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 400 }}>Username: {username}</h3>

          <button
            onClick={onLogout}
            style={{ borderRadius: '5px', border: 'none', backgroundColor: 'transparent', color: 'blue' }}
          >
            Log Out
          </button>
          <button
            onClick={onClose}
            style={{ borderRadius: '5px', border: 'none', backgroundColor: 'transparent' }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomDialog;
