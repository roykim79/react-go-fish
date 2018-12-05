import React from 'react';
import PlayingCard from '../../models/PlayingCard';

describe('PlayingCard', () => {
  let playingCard;

  beforeEach(() => {
    playingCard = new PlayingCard('A', 'S');
  });

  describe('rank', () => {
    it('returns the rank of the playingCard', () => {
      expect(playingCard.rank()).toEqual('A');
    });
  });

  describe('suit', () => {
    it('returns the suit of the playingCard', () => {
      expect(playingCard.suit()).toEqual('S');
    });
  });
})
