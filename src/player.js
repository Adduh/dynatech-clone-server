'use strict';

var log = require('./log.js');
var Location = require('./location.js');

class Player {
  constructor(name, startMoney, game) {
    this.locations = [];
    this.name = name ? name : 'Unnamed Player';
    this.money = startMoney;
    this.ressources = {};
    this.producers = [];
    this.game = game;
  }

  addLocation(location) {
    if (!(location instanceof Location)) {
      log('Could not add location to player \"%s\": Location is invalid',
        this.name);
      return false;
    }
    log('Added location \"%s\" to player \"%s\".', location.name, this.name);
    return this.locations.push(location);
  }

  tick() {
    this.locations.forEach (location => {
      location.tick();
    });

    this.producers.forEach (producer => {
      producer.tick();
    });
  }

  getRessource(name) {
    return this.ressources[name] ? this.ressources[name] : 0;
  }

  addRessource(name, value) {
    this.ressources[name] = this.getRessource(name) + value;
    return this.ressources[name];
  }

  buildProducerByFactory(factory) {
    if (this.money < factory.cost) {
      log('Insufficient funds to buy producer of type %s.', factory.name);
    }  else {
      this.money -= factory.cost;
      this.producers.push(factory.create(this));
    }
  }

  buildProducer(name) {
    this.buildProducerByFactory(this.game.producerFactories[name]);
  }
}

module.exports = Player;
