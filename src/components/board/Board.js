import React, { Component } from 'react';
import { Card } from '../card/Card';
import './Board.css';

export class Board extends Component {
  render() {
    const { deck, onCardClick } = this.props;

    return (
      <div className='Board'>
        {deck.map((card) => (
          <div key={card.key} className='BoardCardContainer'>
            <Card
              card={card}
              onClick={() => onCardClick(card)}
            />
          </div>
        ))}
      </div>
    )
  }
}
