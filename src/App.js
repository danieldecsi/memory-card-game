import React, { Component, Fragment } from 'react';
import './App.css';
import { Header } from './components/header/Header';

const CARD_IMAGES = [
  'angular',
  'd3',
  'jenkins',
  'postcss',
  'react',
  'redux',
  'sass',
  'supercharge',
  'ts',
  'webpack',
];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deckSize: 6,
      deck: this.initializeDeck(6),
      freeze: false,
    };

    this.deckSizeOptions = Array.from({ length: 5 }).map((_, index) => index + 6);
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
        <Header
          deckSize={this.state.deckSize}
          onDeckSizeChange={this.onDeckSizeChange}
          deckSizeOptions={this.deckSizeOptions}
          onStarNewGamePress={this.onNewGameClick}
        />

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
        }}>
          {this.state.deck.map((card) => (
            <div
              key={card.key}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100px',
                height: '100px',
                border: '1px solid #ccc',
              }}
              onClick={() => this.onCardClick(card)}
            >
              {(card.revealed || card.matched) && (
                <img
                  src={`./cards/${CARD_IMAGES[card.value]}.png`}
                  alt={CARD_IMAGES[card.value]}
                  style={{
                    display: 'inline-block',
                    width: '50px',
                    height: '50px',
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </Fragment>
    );
  }

  onCardClick = (clickedCard) => {
    if (clickedCard.revealed || clickedCard.matched || this.state.freeze) {
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
      this.setState(
        () => ({ freeze: true }),
        () => {
          setTimeout(() => {
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
              freeze: false,
            }));
          }, 1000);
        },
      );

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

  onNewGameClick = () => {
    this.setState(({ deckSize }) => ({
      deck: this.initializeDeck(deckSize),
    }))
  }
}

export default App;
