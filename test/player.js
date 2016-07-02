'use strict';

var assert = require('assert');
var sinon = require('sinon');

var Location = require('../src/location.js');
var Player = require('../src/player.js');
var ProducerFactory = require('../src/factories/producer');

var testProducerFactory = new ProducerFactory({
  name: 'Oil',
  cost: 10000,
  output: { oil: 12 },
  costPerTick: 100,
});

describe('Player', () => {
  var player;
  var location;
  beforeEach(() => {
    player = new Player();
    location = new Location();
    location.tick = sinon.spy();
  });

  describe('constructor()', () => {
    it('initiates locations', () => {
      assert.equal(player.locations.length, 0);
    });
  });

  describe('addLocation()', () => {
    it('adds locations to the locations list', () => {
      assert.equal(player.addLocation(location), 1);
      assert.equal(player.addLocation(location), 2);
      assert.equal(player.locations.length, 2);
      assert.equal(player.locations[0], location);
    });

    it('does not add invalid Locations', () => {
      assert.equal(player.addLocation({name: 'foo'}), false);
      assert.equal(player.locations.length, 0);
    });
  });

  describe('tick()', () => {
    it('calls tick on all locations', () => {
      assert.equal(player.locations.length, 0);
      player.addLocation(location);
      player.tick();
      assert.equal(location.tick.called, true);
    });
  });


  describe('buildProducer()', () => {
    it('adds a producer', () => {
      player.money = 12000;
      player.buildProducerByFactory(testProducerFactory);
      assert.equal(player.producers.length, 1);
      assert.equal(player.producers[0].name, 'Oil');
    });

    it('does nothing if not enough money', () => {
      player.money = 1000;
      player.buildProducerByFactory(testProducerFactory);
      assert.equal(player.producers.length, 0);
    });
  });

});
