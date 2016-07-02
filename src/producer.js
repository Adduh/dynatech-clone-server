'use strict';

var _ = require('underscore');

class Producer {
  constructor(init, player) {
    this.name = init.name;
    this.cost = init.cost;
    this.output = init.output;
    this.costPerTick = init.costPerTick;
    this.player = player;
  }
  tick() {
    this.player.money -= this.costPerTick;
    _.each(this.output, (value, key) => {
      this.player.addRessource(key, value);
    });
  }
}

module.exports = Producer;
