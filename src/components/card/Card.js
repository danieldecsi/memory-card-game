import React, { Component } from 'react';
import './Card.css';

const IMAGES = [
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

export class Card extends Component {
  render() {
    const {
      card: { revealed, matched, value },
      onClick,
     } = this.props;

    return (
      <div className='Card' onClick={onClick}>
        {(revealed || matched) && (
          <img
            className='CardImage'
            src={`./cards/${IMAGES[value]}.png`}
            alt={IMAGES[value]}
          />
        )}
      </div>
    );
  }
}
