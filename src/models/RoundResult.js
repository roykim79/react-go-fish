export default class RoundResult {
  constructor(asker, target, rank, guessedRight = false) {
    this._asker = asker;
    this._target = target;
    this._rank = rank;
    this._guessedRight = guessedRight;
  }

  asker() {
    return this._asker;
  }

  target() {
    return this._target;
  }

  rank() {
    return this._rank;
  }

  guessedRight() {
    return this._guessedRight;
  }

  setGuessedRight(boolean) {
    this._guessedRight = boolean;
  }

  toString() {
    let resultString = `${this.asker().name()} asked ${this.target().name()} for ${this.rank()}'s. `;

    if (this.guessedRight()) {
      resultString += `${this.asker().name()} guessed right`;
    } else {
      resultString += `${this.asker().name()} went fishing`;
    }

    return resultString;
  }
}
