import CardDeck from './CardDeck';
import Player from './Player';
import RoundResult from './RoundResult';

export default class GoFish {
  constructor(players, deck = new CardDeck()) {
    this._players = players;
    this._deck = deck;
    this._turn = 0;
    this._roundResults = [];
  };

  static createGame(playerName, botCount) {
    let players = [new Player(playerName)];
    [...Array(botCount)].forEach((bot, i) => {
      const name = `Robot${ i + 1 }`;
      players.push(new Player(name, true));
    });

    return new GoFish(players);
  }

  players() {
    return this._players;
  };

  deck() {
    return this._deck;
  };

  turn() {
    return this._turn;
  };

  roundResults() {
    return this._roundResults;
  }

  getPlayerByName(askedPlayerName) {
    return this.players().find(player => player.name() === askedPlayerName);
  }

  humanPlayer() {
    return this.players().find(player => !player.isBot());
  }

  setTurn(value) {
    this._turn = value;
  };

  start() {
    const deck = this.deck(),
          players = this.players(),
          dealCount = players.length <= 3 ? 7 : 5;

    deck.shuffle();

    [...Array(dealCount)].forEach(() => {
      players.forEach(player => {
        if (deck.count() > 0) player.take(deck.deal());
      });
    });
  };

  currentPlayer() {
    return this.players()[this.turn() % this.players().length];
  };

  goFish() {
    this.currentPlayer().take(this.deck().deal());
  };

  nextPlayer() {
    this.setTurn(this.turn() + 1);
  };

  playTurn(askedPlayerName, rank) {
    const currentPlayer = this.currentPlayer(),
          askedPlayer = this.getPlayerByName(askedPlayerName),
          result = new RoundResult(currentPlayer, askedPlayer, rank);

    if (askedPlayer.hasRank(rank)) {
      result.setGuessedRight(true)
      currentPlayer.take(askedPlayer.give(rank));
      currentPlayer.checkForSets()
    } else {
      this.goFish();
      currentPlayer.checkForSets()
      this.nextPlayer();
    }
    this.roundResults().push(result)
    this.playForBot();
  };

  playForBot() {
    const currentPlayer = this.currentPlayer();
    if (currentPlayer.isBot()) {
      const targetPlayer = this.pickTarget(),
            rank = currentPlayer.pickRank();

      this.playTurn(targetPlayer.name(), rank);
    }
  }

  pickTarget() {
    const opponents = this.players().filter(player => {
      return player !== this.currentPlayer();
    });

    return opponents[Math.floor(Math.random() * opponents.length)];
  }

  gameWinner() {
    if (this.deck().count() === 0) {
      return this.players().reduce((l, e) => {
        return e.setCount() > l.setCount() ? e : l;
      });
    }
  };
};
