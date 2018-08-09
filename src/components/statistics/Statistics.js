import React from 'react';
import './Statistics.css';

export const Statistics = ({
  currentTries,
  onRestartClick,
}) => (
  <div className='Statistics'>
    <span>
      Current tries: <strong>{currentTries}</strong>
    </span>

    <button
      className='StatisticsRestartButton'
      onClick={onRestartClick}
    >
      Restart
    </button>
  </div>
);
