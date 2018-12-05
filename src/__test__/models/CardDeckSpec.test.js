import React from 'react';
import CardDeck from '../../models/CardDeck';

describe('CardDeck', () => {
  let cardDeck, cardDeck2;

  beforeEach(() => {
    cardDeck = new CardDeck();
    cardDeck2 = new CardDeck();
  });

  describe('constructor', () => {
    it('creates 52 playing cards', () => {
      expect(cardDeck._cards.length).toEqual(52);
    });
  });

  describe('count', () => {
    it('returns the number of cards remaining in the deck', () => {
      expect(cardDeck.count()).toEqual(52);
    });
  });

  describe('deal', () => {
    it('returns the last card in the card deck', () => {
      expect(cardDeck.count()).toEqual(52);
      const dealtCard = cardDeck.deal();

      expect(typeof dealtCard.rank).toEqual('function');
      expect(typeof dealtCard.suit).toEqual('function');
      expect(cardDeck.count()).toEqual(51);
    });
  });

  describe('shuffle', () => {
    it('changes the order of the cards', () => {
      cardDeck2.shuffle();

      const dealtCard = cardDeck.deal();
      const dealtCard2 = cardDeck2.deal();

      expect(dealtCard).not.toEqual(dealtCard2)
    });
  });
});
