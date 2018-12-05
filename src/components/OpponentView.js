import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class OpponentView extends PureComponent {
  static propTypes = {
    opponent: PropTypes.object.isRequired
  }

  render() {
    const { opponent, handleClick, isSelected } = this.props;

    return (
      <div
        className={isSelected ? 'player robot selected' : 'player robot'}
        onClick={() => handleClick(opponent)}
      >
        <div className='name'>{opponent.name()}</div>
        <div>Cards:{opponent.cardCount()}</div>
        <div>Sets:{opponent.sets()}</div>
      </div>
    );
  }
}
