import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class PlayerView extends Component {
  static propTypes = {
    player: PropTypes.object.isRequired,
    updateCard: PropTypes.func.isRequired
  }
  // 
  // constructor(props) {
  //   super(props);
  // }

  handleClick = (e) => {
    this.props.updateCard(e.target.value);
  }

  renderHand(cards) {
    return cards.map(card => (
      <input type='submit'
        onClick={this.handleClick}
        className='card'
        name='rank'
        key={card.rank()+card.suit()}
        id={card.rank()+card.suit()}
        value={card.rank()}
      />
    ))
  }

  render() {
    const { player } = this.props,
          cards = player.hand();

    return (
      <div className='player human'>
        <div className="name">{player.name()}</div>
        <div className="sets">Sets: {player.sets()}</div>
        {this.renderHand(cards)}
      </div>
    );
  }
}
