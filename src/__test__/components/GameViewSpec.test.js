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

    it('calls the callback with a player, and rank', () => {
      wrapper.find('.robot').first().simulate('click');
      wrapper.find('.card').first().simulate('click');

      expect(playRound).toBeCalledWith('Robot', 'A');
    })
  })
})
