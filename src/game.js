'use strict';

const DEFAULT_TICK_INTERVAL = 200;

class Game {
  constructor(tickInterval) {
    this.running = false;
    this.players = [];
    this.tickInterval = tickInterval ? tickInterval: DEFAULT_TICK_INTERVAL;
  }

  start() {
    if (!this.running) {
      this.running = true;
      this.time = 0;
      this.intervalId = setInterval(()=> {
        this.tick();
      }, this.tickInterval);
    }
  }

  stop() {
    this.running = false;
    clearInterval(this.intervalId);
  }

  addPlayer(player) {
    this.players.push(player);
  }

  tick() {
    this.time++;
  }
}

module.exports = Game;
