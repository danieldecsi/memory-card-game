import React, { Component, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    const DECK_SIZE = 6;

    const deck = [
      ...Array.from({ length: DECK_SIZE }).map((_, index) => index),
      ...Array.from({ length: DECK_SIZE }).map((_, index) => index),
    ];

    for (let i = 0; i < deck.length; i++) {
      const randomPosition = Math.floor(Math.random() * deck.length);
      [deck[i], deck[randomPosition]] = [deck[randomPosition], deck[i]];
    }

    this.state = {
      deck,
    };
  }

  render() {
    return (
      <Fragment>
        {this.state.deck.map((card, index) => (
          <div
            key={index}
            style={{
              display: 'inline-block',
              padding: '1rem',
              border: '1px solid #ccc',
            }}
          >
            {card}
          </div>
        ))}
      </Fragment>
    );
  }
}

export default App;
