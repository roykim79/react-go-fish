import React, { Component } from 'react';
import OpponentView from './OpponentView';
import PlayerView from './PlayerView';
import PropTypes from 'prop-types';

export default class GameView extends Component {
  static propTypes = {
    game: PropTypes.object.isRequired,
    playRound: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {};
  };

  onSubmit = (e) => {
    e.preventDefault();
    debugger;
    this.props.playRound(e.target.player.value, this.state.rank)
  }

  updateCard(value) {
    this.setState(() => {
      return {rank: value};
    });
  }

  renderOpponents(opponents) {
    return opponents.map((opponent, i) => {
      return <OpponentView key={`opponent${i}`} opponent={opponent} />;
    });
  }

  render() {
    const players = this.props.game.players();
    const player = players[0];
    const opponents = players.slice(1, players.length);

    return (
      <form id='game-form' onSubmit={this.onSubmit}>
        {this.renderOpponents(opponents)}
        <PlayerView player={player} updateCard={this.updateCard.bind(this)}/>
      </form>
    );
  }
}
