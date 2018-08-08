import React, { Component, Fragment } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deckSize: 6,
      deck: this.initializeDeck(6),
    };

    this.numberOfCards = Array.from({ length: 15 }).map((_, index) => index + 6);
  }

  initializeDeck(deckSize) {
    const deck = [
      ...Array.from({ length: deckSize }).map((_, index) => index),
      ...Array.from({ length: deckSize }).map((_, index) => index),
    ].map(this.intializeCard);

    for (let i = 0; i < deck.length; i++) {
      const randomPosition = Math.floor(Math.random() * deck.length);
      [deck[i], deck[randomPosition]] = [deck[randomPosition], deck[i]];
    }

    return deck;
  }

  intializeCard = (value, index) => {
    return {
      key: index,
      value,
      revealed: false,
      matched: false,
    };
  }

  render() {
    return (
      <Fragment>
        <div>
          {this.state.deck.map((card) => (
            <div
              key={card.key}
              style={{
                display: 'inline-block',
                padding: '1rem',
                border: '1px solid #ccc',
              }}
              onClick={() => this.onCardClick(card)}
            >
              {(card.revealed || card.matched) ? card.value : 'X'}
            </div>
          ))}
        </div>
        <select
          value={this.state.deckSize}
          onChange={this.onDeckSizeChange}
        >
          {this.numberOfCards.map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
        <button onClick={this.restart}>Restart</button>
      </Fragment>
    );
  }

  onCardClick = (clickedCard) => {
    if (clickedCard.revealed || clickedCard.matched) {
      return;
    }

    this.setState(
      ({ deck }) => ({
        deck: deck.map((card) => {
          if (card.key !== clickedCard.key) {
            return card;
          }

          return {
            ...card,
            revealed: true,
          };
        }),
      }),
      () => this.checkMatch(),
    );
  }

  checkMatch() {
    const [firstCard, secondCard] = this.state.deck.filter((card) => card.revealed && !card.matched);

    if (!secondCard) {
      return;
    }

    if (firstCard.value !== secondCard.value) {
      this.setState(({ deck }) => ({
        deck: deck.map((card) => {
          if (card.matched || !card.revealed) {
            return card;
          }

          return {
            ...card,
            revealed: false,
          };
        }),
      }));

      return;
    }

    this.setState(
      ({ deck }) => ({
        deck: deck.map((card) => {
          if (!card.revealed) {
            return card;
          }

          return {
            ...card,
            matched: true,
          };
        }),
      }),
      () => this.checkWin(),
    );
  }

  checkWin() {
    const win = this.state.deck.every((card) => card.matched);

    if (win) {
      alert('Nyertel');
    }
  }

  onDeckSizeChange = (e) => {
    const deckSize = parseInt(e.target.value, 10);

    this.setState(() => ({ deckSize }));
  }

  restart = () => {
    this.setState(({ deckSize }) => ({
      deck: this.initializeDeck(deckSize),
    }))
  }
}

export default App;
