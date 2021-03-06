import React, { Component, Fragment } from 'react';
import './App.css';
import { Header } from './components/header/Header';
import { Statistics } from './components/statistics/Statistics';
import { Board } from './components/board/Board';

const LOCAL_STORAGE_HIGHSCORES_KEY = 'highscores';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deckSize: 6,
      deck: this.initializeDeck(6),
      freeze: false,
      currentTries: 0,
      highscores: this.restoreHighscores(),
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

  restoreHighscores() {
    let highscores = {};

    const serializedHighscores = localStorage.getItem(LOCAL_STORAGE_HIGHSCORES_KEY);
    if (serializedHighscores) {
      highscores = JSON.parse(serializedHighscores);
    }

    return highscores;
  }

  persistHighscores() {
    const { highscores } = this.state;

    const serializedHighscores = JSON.stringify(highscores);
    localStorage.setItem(LOCAL_STORAGE_HIGHSCORES_KEY, serializedHighscores);
  }

  render() {
    const { deckSize, currentTries, highscores, deck } = this.state;

    return (
      <Fragment>
        <Header
          deckSize={deckSize}
          onDeckSizeChange={this.onDeckSizeChange}
          deckSizeOptions={this.deckSizeOptions}
          onStarNewGamePress={this.onNewGameClick}
        />

        <div className='AppContentContainer'>
          <Statistics
            currentTries={currentTries}
            best={highscores[deckSize]}
            onRestartClick={this.onNewGameClick}
          />

          <Board
            deck={deck}
            onCardClick={this.onCardClick}
          />
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
        ({ currentTries }) => ({
          freeze: true,
          currentTries: currentTries + 1,
        }),
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
      ({ deck, currentTries }) => ({
        deck: deck.map((card) => {
          if (!card.revealed) {
            return card;
          }

          return {
            ...card,
            matched: true,
          };
        }),
        currentTries: currentTries + 1,
      }),
      () => this.checkWin(),
    );
  }

  checkWin() {
    const win = this.state.deck.every((card) => card.matched);

    if (win) {
      const { currentTries, highscores, deckSize } = this.state;

      if (!highscores[deckSize] || currentTries < highscores[deckSize]) {
        alert(`Uj rekord: ${currentTries}!`);

        this.setState(
          ({ highscores }) => ({
            highscores: {
              ...highscores,
              [deckSize]: currentTries,
            },
          }),
          () => this.persistHighscores(),
        );
      }
    }
  }

  onDeckSizeChange = (e) => {
    const deckSize = parseInt(e.target.value, 10);

    this.setState(() => ({ deckSize }));
  }

  onNewGameClick = () => {
    this.setState(({ deckSize }) => ({
      deck: this.initializeDeck(deckSize),
      currentTries: 0,
    }))
  }
}

export default App;
