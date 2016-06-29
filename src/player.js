'use strict';

var log = require('./log.js');
var Location = require('./location.js');

class Player {
  constructor(name, startMoney) {
    this.locations = [];
    this.name = name ? name : 'Unnamed Player';
    this.money = startMoney;
    this.ressources = {};
  }

  addLocation(location) {
    if (!(location instanceof Location)) {
      log('Could not add location to player \"%s\": Location is invalid');
      return false;
    }
    log('Added location \"%s\" to player \"%s\".', location.name, this.name);
    return this.locations.push(location);
  }

  tick() {
    this.locations.forEach (location => {
      location.tick();
    });
  }

  getRessource(name) {
    return this.ressources[name] ? this.ressources[name] : 0;
  }

  buyAndDeployProducer() {}
}

module.exports = Player;
