'use strict';

var Producer = require('../producer');

class ProducerFactory {
  constructor(data) {
    this.data = data;
    this.name = data.name;
    this.cost = data.cost;
  }

  create(player) {
    return new Producer(this.data, player);
  }
}
module.exports = ProducerFactory;