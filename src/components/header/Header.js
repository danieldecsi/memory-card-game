import React from 'react';
import './Header.css';

export const Header = ({
  deckSize,
  onDeckSizeChange,
  deckSizeOptions,
  onStarNewGamePress,
}) => (
  <header className='Header'>
    <div className='HeaderLeft'>
      <img className='HeaderLogo' src='./logo.svg' alt='Supercharge' />
    </div>
    <div className='HeaderMiddle'>
      Deck size:

      <select
        className='HeaderDeckSizeSelect'
        value={deckSize}
        onChange={onDeckSizeChange}
      >
        {deckSizeOptions.map((deckSize) => (
          <option key={deckSize} value={deckSize}>{deckSize}</option>
        ))}
      </select>

      <button
        className='HeaderStartNewGameButton'
        onClick={onStarNewGamePress}
      >
        Start new game
      </button>
    </div>
    <div className='HeaderRight'>
    </div>
  </header>
);
