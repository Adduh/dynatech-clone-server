'use strict';

const DEFAULT_TICK_INTERVAL = 200;

var Player = require('./player.js');
var log = require('./log.js');

class Game {
  constructor(tickInterval) {
    this.players = [];
    this.tickInterval = tickInterval ? tickInterval : DEFAULT_TICK_INTERVAL;
    this.time = 0;
  }

  start() {
    if (!this.time) {
      log('Game started.');
    } else {
      log('Game resumed at tick %d.', this.time);
    }
    if (!this.intervalId) {
      this.intervalId = setInterval(()=> {
        this.tick();
      }, this.tickInterval);
    }
  }

  stop() {
    log('Game stopped at tick %d.', this.time);
    clearInterval(this.intervalId);
    this.intervalId = undefined;
  }

  addPlayer(name) {
    log('Added player \"%s\".', name);
    this.players.push(new Player(name));
  }

  tick() {
    this.time++;
    log('Tick %d is being processed.', this.time);
  }
}

module.exports = Game;
