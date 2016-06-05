'use strict';

var log = require('./log.js');

class Location {
  constructor(name, x, y) {
    this.producers = [];
    this.stores = [];
    this.name = name ? name : 'Unnamed Location';
    this.x = x ? x : 0;
    this.y = y ? y : 0;
  }

  addProducer(producer) {
    log('Added producer to location \"%s\".', this.name);
    this.producers.push(producer);
  }

  addStore(store) {
    log('Added store to location \"%s\".', this.name);
    this.stores.push(store);
  }

  calculateDistance(location) {
    var other = location ? location : new Location();
    return Math.sqrt(Math.pow((this.x - other.x), 2) +
                     Math.pow((this.y - other.y), 2));
  }

  tick() {
    this.producers.forEach (producer => {
      producer.tick();
    });

    this.stores.forEach (store => {
      store.tick();
    });
  }
}

module.exports = Location;
