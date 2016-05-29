'use strict';

class Game {
  constructor() {
    this.running = false;
    this.players = [];
  }

  start() {
    this.running = true;
  }

  addPlayer(player) {
    this.players.push(player);
  }
}

module.exports = Game;
