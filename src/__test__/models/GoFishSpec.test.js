import React from 'react';
import CardDeck from '../../models/CardDeck';
import Player from '../../models/Player';
import GoFish from '../../models/GoFish';
import RoundResult from '../../models/RoundResult';
import { fixtures } from '../TestHelper';

describe('GoFish', () => {
  let human1, robot1, players, goFishGame;

  beforeEach(() => {
    human1 = new Player('Player1');
    robot1 = new Player('Robot1', true);
    players = [human1, robot1];
    goFishGame = new GoFish(players);
  });

  it('has players', () => {
    expect(goFishGame.players()).not.toBeUndefined();
  });

  it('has a deck', () => {
    expect(goFishGame.deck()).not.toBeUndefined();
    expect(typeof goFishGame.deck().shuffle).toEqual('function');
  });

  describe('start', () => {
    it('shuffles the deck and deals the cards', () => {
      goFishGame.start();
      players.forEach(player => {
        expect(player.cardCount()).toEqual(7);
      });
    });
  });

  describe('currentPlayer', () => {
    it('returns the current player', () => {
      expect(goFishGame.currentPlayer()).toBe(human1);
    })
  });

  describe('nextPlayer', () => {
    it('sets the currentPlayer to be the next player', () => {
      expect(goFishGame.currentPlayer()).toBe(human1);
      goFishGame.nextPlayer();
      expect(goFishGame.currentPlayer()).toBe(robot1);
      goFishGame.nextPlayer();
      expect(goFishGame.currentPlayer()).toBe(human1);
    });
  });

  describe('goFish', () => {
    it('takes a card from the deck and adds it to the hand of the currentPlayer', () => {
      expect(goFishGame.currentPlayer().cardCount()).toEqual(0);
      goFishGame.goFish();
      expect(goFishGame.currentPlayer().cardCount()).toEqual(1);
    });
  });

  describe('playTurn', () => {
    const card1 = fixtures.aceSpade,
          card2 = fixtures.kingSpade;

    beforeEach(() => {
      human1.take(card1);
      robot1.take(card2);
    });

    // describe('a correct guess', () => {
    //   it('transfers card(s) from the asked player to the current player, no player change', () => {
    //     expect(goFishGame.currentPlayer()).toBe(human1);
    //     expect(human1.cardCount()).toEqual(1);
    //     expect(robot1.cardCount()).toEqual(1);
    //     goFishGame.playTurn(robot1.name(), card2.rank()); // guess right
    //     expect(goFishGame.currentPlayer()).toBe(human1);
    //     expect(robot1.cardCount()).toEqual(0);
    //     expect(human1.cardCount()).toEqual(2);
    //   });
    // });
    //
    // describe('an incorrect guess', () => {
    //   it('gives current player a card from the deck and calls nextPlayer', () => {
    //     expect(goFishGame.currentPlayer()).toBe(human1);
    //     expect(human1.cardCount()).toEqual(1);
    //     expect(robot1.cardCount()).toEqual(1);
    //     goFishGame.playTurn(robot1.name(), card1.rank()); // guess wrong
    //     expect(goFishGame.currentPlayer()).toBe(robot1);
    //     expect(robot1.cardCount()).toEqual(1);
    //     expect(human1.cardCount()).toEqual(2);
    //   });
    // });
  });

  describe('gameWinner', () => {
    let riggedGame;

    beforeEach(() => {
      riggedGame = new GoFish(players, new CardDeck([]));
      riggedGame.start();
    });

    it('returns undefined if there is no winner at the time', () => {
      human1.take(fixtures.twoAces);
      human1.checkForSets();
      robot1.take(fixtures.twoKings);
      robot1.checkForSets();
      expect(goFishGame.gameWinner()).toBeUndefined();
    });

    it('returns the winner when there is one', () => {
      human1.take(fixtures.fourAces);
      human1.checkForSets();
      robot1.take(fixtures.twoKings);
      robot1.checkForSets();
      expect(riggedGame.deck().count()).toEqual(0)
      expect(riggedGame.gameWinner()).toBe(human1);
    });
  });

  describe('humanPlayer', () => {
    it('returns the human player', () => {
      expect(goFishGame.humanPlayer()).toEqual(human1);
    });
  });

  describe('pickTarget', () => {
    it('picks a player that is not the current player', () => {
      goFishGame.start();
      expect(goFishGame.pickTarget()).toEqual(robot1);
      goFishGame.nextPlayer();
      expect(goFishGame.pickTarget()).toEqual(human1);
    });
  });

  describe('playForBot', () => {
    beforeEach(() => {
      goFishGame.start();
    });

    it('does nothing if the current player is not a bot', () => {
      expect(human1.cardCount()).toEqual(7);
      expect(robot1.cardCount()).toEqual(7);
      goFishGame.playForBot();
      expect(human1.cardCount()).toEqual(7);
      expect(robot1.cardCount()).toEqual(7);
      expect(goFishGame.roundResults().length).toEqual(0);
    });

    it('plays for the robot if it is the robot/s turn', () => {
      expect(robot1.cardCount()).toEqual(7);
      goFishGame.nextPlayer();
      goFishGame.playForBot();
      expect(robot1.cardCount()).not.toEqual(7);
      expect(goFishGame.roundResults().length).toBeGreaterThan(0);
      expect(goFishGame.roundResults()[0].asker().name()).toEqual('Robot1');
      expect(goFishGame.roundResults()[0].target().name()).toEqual('Player1');
    });
  });
});
