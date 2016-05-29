'use strict';

const DEFAULT_TICK_INTERVAL = 200;
class Game {
  constructor() {
    this.running = false;
    this.players = [];
    this.tickInterval = DEFAULT_TICK_INTERVAL;
  }

  start() {
    this.running = true;
    this.time = 0;
    setInterval(()=> {
     this.tick();
    }, this.tickInterval);
  }

  addPlayer(player) {
    this.players.push(player);
  }

  setTickInterval(TimeInMilliseconds) {
    this.tickInterval = TimeInMilliseconds;
  }
  tick() {
    this.time++;
  }
}

module.exports = Game;
