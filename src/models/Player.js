export default class Player {
  constructor(name, isBot = false) {
    this._name = name;
    this._hand = [];
    this._sets = [];
    this._isBot = isBot;
  }

  name() {
    return this._name;
  }

  hand() {
    return this._hand;
  }

  sets() {
    return this._sets;
  }

  isBot() {
    return this._isBot;
  }

  cardCount() {
    return this.hand().length;
  }

  setCount() {
    return this.sets().length;
  }

  checkForSets() {
    this.hand().forEach(card => {
      const rank = card.rank();

      if (this.setMade(rank)) {
        this.sets().push(rank);
        return this.setHand(this.hand().filter(card => card.rank() !== rank));
      }
    });
  }

  give(rank) {
    const filtered = this.hand().filter(card => card.rank() === rank);
    this.setHand(this.hand().filter(card => card.rank() !== rank))

    return filtered;
  }

  hasRank(rank) {
    return this.hand().some(card => card.rank() === rank);
  }

  pickRank() {
    return this.hand()[Math.floor(Math.random() * this.hand().length)].rank();
  }

  setHand(value) {
    this._hand = value;
  }

  setMade(rank) {
    const rankCount = this.hand().filter(card => card.rank() === rank).length;

    if (rankCount === 4) return true;
  }

  take(cards) {
    this.setHand(this.hand().concat(cards));
  }
}
