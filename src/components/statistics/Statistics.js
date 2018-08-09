import React from 'react';
import './Statistics.css';

export const Statistics = ({
  currentTries,
}) => (
  <div className='Statistics'>
    <span>
      Current tries: <strong>{currentTries}</strong>
    </span>
  </div>
);
