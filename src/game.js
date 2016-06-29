'use strict';

const DEFAULT_TICK_INTERVAL = 200;

var Player = require('./player.js');
var log = require('./log.js');
var loop = require('node-gameloop');

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
    if (this.loopId === undefined) {
      this.loopId = loop.setGameLoop(()=> {
        this.tick();
      }, this.tickInterval);
    }
  }

  stop() {
    log('Game stopped at tick %d.', this.time);
    loop.clearGameLoop(this.loopId);
    this.loopId = undefined;
  }

  addPlayer(name, startMoney) {
    log('Added player \"%s\".', name);
    var player = new Player(name, startMoney);
    this.players.push(player);
    return player;
  }

  tick() {
    this.time++;
    log('Tick %d is being processed.', this.time);
  }

  addProducerFactory() {}
}

module.exports = Game;
