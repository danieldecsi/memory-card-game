import React from 'react';
import './Statistics.css';

export const Statistics = ({
  currentTries,
  best,
  onRestartClick,
}) => (
  <div className='Statistics'>
    <span>
      Current tries: <strong>{currentTries}</strong>
    </span>

    <div className='StatisticsBestContainer'>
      Best:
      <h1>{best || '-'}</h1>
    </div>

    <button
      className='StatisticsRestartButton'
      onClick={onRestartClick}
    >
      Restart
    </button>
  </div>
);
