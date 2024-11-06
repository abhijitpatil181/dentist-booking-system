import React, { useState } from 'react';

import './timeSlot.css';

const timeSlots = [
  '8:30 AM',
  '9:00 AM',
  '11:00 AM',
  '12:00 PM',
  '1:00 PM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM',
  '5:30 PM',
];

const TimeSlot = ({ selectedSlot, onTimeSlotChange }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const slotsPerPage = 4; // Number of time slots to display per page

  // Calculate the starting and ending indices for the current page
  const startIndex = currentPage * slotsPerPage;
  const endIndex = startIndex + slotsPerPage;
  const currentSlots = timeSlots.slice(startIndex, endIndex);

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (endIndex < timeSlots.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <button
        onClick={handlePrev}
        disabled={currentPage === 0}
        style={{ marginRight: '0.3rem', fontSize: '1.5rem', border: 'none', background: 'transparent' }}
      >
        &lt;
      </button>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          width: '70%',
          rowGap: '1rem',
          columnGap: '1rem',
        }}
      >
        {currentSlots.map((time, index) => (
          <div
            key={index}
            className="time-slot"
            onClick={() => onTimeSlotChange(time)}
            style={{ backgroundColor: selectedSlot === time ? ' #6c757d' : 'transparent' }}
          >
            <p>{time}</p>
          </div>
        ))}
      </div>

      <button
        onClick={handleNext}
        disabled={endIndex >= timeSlots.length}
        style={{ marginLeft: '0.3rem', fontSize: '1.5rem', border: 'none', background: 'transparent' }}
      >
        &gt;
      </button>
    </div>
  );
};

export default TimeSlot;
