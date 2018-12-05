import React, { Component } from 'react';
import GoFish from './models/GoFish';
import LoginView from './components/LoginView';
import GameView from './components/GameView';
import './App.css';

export default class GoFishController extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  startGame = (name, botCount) => {
    const game = GoFish.createGame(name, botCount)
    game.start()
    this.setState(() => ({game}));
  }

  playRound = (player, rank) => {
    const { game } = this.state;
    game.playTurn(player, rank);
    this.setState(() => {
      return {game}
    });
  }

  render() {
    if (this.state.game) {
      return (<GameView game={this.state.game} playRound={this.playRound} />);
    } else {
      return (<LoginView onLogin={this.startGame} />);
    }

  }
}
