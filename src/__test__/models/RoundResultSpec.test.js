import React from 'react';
import RoundResult from '../../models/RoundResult';
import { fixtures } from '../TestHelper';

describe('RoundResult', () => {
  const player = fixtures.humanPlayer,
        robot = fixtures.robotPlayer;

  let roundResult;

  beforeEach(() => {
    roundResult = new RoundResult(player, robot, 'A');
  });

  describe('asker', () => {
    it('returns the asker', () => {
      expect(roundResult.asker()).toEqual(player);
    });
  });

  describe('target', () => {
    it('returns the asked player', () => {
      expect(roundResult.target()).toEqual(robot);
    });
  });

  describe('rank', () => {
    it('returns the rank asked for', () => {
      expect(roundResult.rank()).toEqual('A');
    });
  });

  describe('guessedRight', () => {
    it('returns the guessedRight boolean value', () => {
      expect(roundResult.guessedRight()).toEqual(false);
    });
  });

  describe('setGuessedRight', () => {
    it('sets the value of guessedRight to the value passed in', () => {
      expect(roundResult.guessedRight()).toEqual(false);
      roundResult.setGuessedRight(true);
      expect(roundResult.guessedRight()).toEqual(true);
    });
  });

  describe('toString', () => {
    it('returns the round result as a string', () => {
      roundResult.setGuessedRight(true);
      expect(roundResult.toString()).toEqual('Roy asked Robot for A\'s. Roy guessed right')
    });
  });
});
