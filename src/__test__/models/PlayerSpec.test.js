import React from 'react';
import Player from '../../models/Player';
import PlayingCard from '../../models/PlayingCard';
import { fixtures } from '../TestHelper';

describe('Player', () => {
  let player;

  const playerName = 'Roy',
        aceSpade = new PlayingCard('A', 'S'),
        twoAces = fixtures.twoAces,
        twoKings = fixtures.twoKings,
        fourAces = fixtures.fourAces;

  beforeEach(() => {
    player = new Player(playerName);
  });

  describe('name', () => {
    it('returns the player\'s name', () => {
      expect(player.name()).toEqual(playerName);
    });
  });

  describe('hand', () => {
    it('returns the players hand as an array', () => {
      expect(player.hand()).toEqual([]);
    });
  });

  describe('sets', () => {
    it('returns the player\'s sets as an array', () => {
      expect(player.sets()).toEqual([]);
    });
  });

  describe('isBot', () => {
    it('is set to false by default', () => {
      expect(player.isBot()).toEqual(false);
    });

    it('can be set to true by passing in "true" as the 2nd argument', () => {
      const robot = new Player('RobotPlayer', true);

      expect(robot.isBot()).toEqual(true);
    });
  });

  describe('cardCount', () => {
    it('returns the number of cards the player has', () => {
      expect(player.cardCount()).toEqual(0);
    });
  });

  describe('setCount', () => {
    it('returns the number of sets the player has', () => {
      expect(player.setCount()).toEqual(0);
    });
  });

  describe('take', () => {
    it('adds a single card to the players hand', () => {
      expect(player.cardCount()).toEqual(0);
      player.take(aceSpade);
      expect(player.cardCount()).toEqual(1);
    });

    it('adds an array of cards to a players hand', () => {
      player.take(twoAces)
      expect(player.cardCount()).toEqual(2);
    });
  });

  describe('hasRank', () => {
    it('returns true if the players has any cards of the rank', () => {
      player.take(aceSpade);
      expect(player.hasRank(aceSpade.rank())).toEqual(true);
      expect(player.hasRank('K')).toEqual(false);
    });
  });

  describe('give', () => {
    it('removes the cards of a given rank from the player\'s hand and returns it', () => {
      expect(player.cardCount()).toEqual(0)
      player.take(twoAces);
      expect(player.cardCount()).toEqual(2)
      expect(player.give(aceSpade.rank())).toEqual(twoAces);
      expect(player.cardCount()).toEqual(0)
    });
  });

  describe('checkForSets', () => {
    it('removes any sets from the player\'s hand and adds the rank to the sets', () => {
      player.take(fourAces)
      player.take(twoKings)
      expect(player.cardCount()).toEqual(6)
      expect(player.setCount()).toEqual(0)
      player.checkForSets();
      expect(player.hand()).toEqual(twoKings)
      expect(player.cardCount()).toEqual(2)
      expect(player.setCount()).toEqual(1)
    });
  });

  describe('pickRank', () => {
    it('returns the rank of a random card in the players hand', () => {
      player.take(twoKings)
      expect(player.pickRank()).toEqual('K')
    });
  });
});
