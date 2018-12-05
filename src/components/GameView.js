import React, { PureComponent } from 'react';
import OpponentView from './OpponentView';
import PlayerView from './PlayerView';
import PropTypes from 'prop-types';

export default class GameView extends PureComponent {
  static propTypes = {
    game: PropTypes.object.isRequired,
    playRound: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {};
  };

  updateCard(card) {
    this.setState(() => ({card}), this.playRoundIfPossible );
  }

  updateOpponent(opponent) {
    this.setState(() => ({opponent}), this.playRoundIfPossible);
  }

  playRoundIfPossible() {
    const { opponent, card } = this.state;

    if (card && opponent) {
      this.props.playRound(opponent.name(), card.rank());
      this.setState(() => ({card: null, opponent: null}))
    }
  }

  renderOpponents(opponents) {
    return opponents.map((opponent, i) => (
        <OpponentView
          key={`opponent${i}`}
          opponent={opponent}
          handleClick={this.updateOpponent.bind(this)}
          isSelected={this.state.opponent === opponent}
        />
      )
    );
  }

  renderRoundResults(results) {
    return results.map((result, i) => {
      return (
        <div>
          <li className='round-result'>
            <span className='round-result-index'>{i + 1}:</span>
            <span className="round-result-string">
              {result.toString()}
            </span>
          </li>
        </div>
      )
    })
  }

  render() {
    const players = this.props.game.players(),
          roundResults = this.props.game.roundResults(),
          player = players[0],
          opponents = players.slice(1, players.length);

    return (
      <div id='game-view'>
        <div className="opponents-list">
          {this.renderOpponents(opponents)}
        </div>
        <div className="player-container">
          <PlayerView player={player}
            handleClick={this.updateCard.bind(this)}
            selectedCard={this.state.card}
          />
        </div>
        <ul className="round-results-list">
          {this.renderRoundResults(roundResults)}
        </ul>
      </div>
    );
  }
}
