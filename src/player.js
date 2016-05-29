'use strict';

class Player {
  constructor(name) {
    this.producers = [];
    this.name = name;
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
