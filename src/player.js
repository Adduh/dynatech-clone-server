'use strict';

class Player {
  constructor() {
    this.producers = [];
  }
  addProducer(producer) {
    this.producers.push(producer);
  }
  tick() {
    this.producers.forEach (producer => {
      producer.tick();
    });
  }
}

module.exports = Player;
