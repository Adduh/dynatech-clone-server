'use strict';

var log = require('./log.js');

class Player {
  constructor(name) {
    this.producers = [];
    this.name = name ? name : 'Unnamed Player';
  }

  addProducer(producer) {
    log('Added producer to player \"%s\".', this.name);
    this.producers.push(producer);
  }

  tick() {
    this.producers.forEach (producer => {
      producer.tick();
    });
  }
}

module.exports = Player;
