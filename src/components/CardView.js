import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class CardView extends PureComponent {
  render() {
    const { card, handleClick, selectedCard } = this.props;
    return (
      <div onClick={() => handleClick(card)}
        className={selectedCard === card ? 'card selected' : 'card'}
        key={card.rank()+card.suit()}
        id={card.rank()+card.suit()}
      >
        {card.rank()+card.suit()}
      </div>
    );
  }
}
