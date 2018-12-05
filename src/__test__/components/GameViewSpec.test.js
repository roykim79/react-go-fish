import React from 'react';
import CardDeck from '../../models/CardDeck';
import GoFish from '../../models/GoFish';
import GameView from '../../components/GameView';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { fixtures } from '../TestHelper';

Enzyme.configure({ adapter: new Adapter() });

describe('GameView', () => {
  let wrapper, game;
  const { humanPlayer, robotPlayer, fourAces } = fixtures;
  const playRound = jest.fn();
  const mountView = () => mount(<GameView game={game} playRound={playRound}/>);

  describe('playRound', () => {
    game = new GoFish([humanPlayer, robotPlayer], new CardDeck(fourAces))
    game.start();
    wrapper = mountView();

    it('calls the callback with a game, player, and rank', () => {
      debugger;
      wrapper.first('input[name="rank"]').simulate('click');
      wrapper.find('#game-form').simulate('submit', {target: {player: {value: 'Robot'}}, preventDefault: jest.fn()});

      expect(playRound).toBeCalledWith('Robot', 'A');
    })
  })
})
