'use strict';

const DEFAULT_TICK_INTERVAL = 200;

class Game {
  constructor(tickInterval) {
    this.players = [];
    this.tickInterval = tickInterval ? tickInterval : DEFAULT_TICK_INTERVAL;
    this.time = 0;
  }

  start() {
    if (!this.intervalId) {
      this.intervalId = setInterval(()=> {
        this.tick();
      }, this.tickInterval);
    }
  }

  stop() {
    clearInterval(this.intervalId);
    this.intervalId = undefined;
  }

  addPlayer(player) {
    this.players.push(player);
  }

  tick() {
    this.time++;
  }
}

module.exports = Game;
