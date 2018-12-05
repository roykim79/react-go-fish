import React, { PureComponent } from 'react';
import CardView from './CardView';
import PropTypes from 'prop-types';

export default class PlayerView extends PureComponent {
  static propTypes = {
    player: PropTypes.object.isRequired,
    handleClick: PropTypes.func.isRequired,
    selectedCard: PropTypes.object
  }

  renderHand(cards) {
    const { handleClick, selectedCard } = this.props;

    return cards.map((card, i) => (
      <CardView card={card}
        key={`card${i}`}
        handleClick={handleClick}
        selectedCard={selectedCard}
      />
    ))
  }

  render() {
    const { player } = this.props,
          cards = player.hand();

    return (
      <div className='player human'>
        <div className="name">{player.name()}</div>
        <div className="sets">Sets: {player.setCount()}</div>
        <div className="hand">
          {this.renderHand(cards)}
        </div>
      </div>
    );
  }
}
