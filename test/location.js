'use strict';

var assert = require('assert');
var sinon = require('sinon');

var Location = require('../src/location.js');

describe('location', () => {
  var location;
  var producer;
  var store;

  beforeEach(() => {
    location = new Location();
    producer = { tick: sinon.spy() };
    store = { tick: sinon.spy() };
  });

  describe('constructor()', () => {
    it('it initiates producers', () => {
      assert.equal(location.producers.length, 0);
    });
  });

  describe('addProducer()', () => {
    it('adds a producer to the producers list', () => {
      assert.equal(location.producers.length, 0);
      location.addProducer(producer);
      assert.equal(location.producers.length, 1);
      assert.equal(location.producers[0], producer);
    });
  });

  describe('addStore()', () => {
    it('adds a store to the stores list', () => {
      assert.equal(location.stores.length, 0);
      location.addStore(store);
      assert.equal(location.stores.length, 1);
      assert.equal(location.stores[0], store);
    });
  });

  describe('calculateDistance()', () => {
    it('distance to Terra is 0', () => {
      assert.equal(location.calculateDistance(), 0);
    });

    it('distance is euklid', () => {
      location = new Location(null, -1, 1);
      assert.equal(location.calculateDistance(), Math.sqrt(2));
    });

    it('distance to other locations', () => {
      location = new Location(null, -1, 1);
      assert.equal(location.calculateDistance(new Location(null, 1, 1)), 2);
    });
  });

  describe('tick()', () => {
    it('calls tick on all producers', () => {
      assert.equal(location.producers.length, 0);
      location.addProducer(producer);
      location.tick();
      assert.equal(producer.tick.called, true);
    });

    it('calls tick on all stores', () => {
      assert.equal(location.stores.length, 0);
      location.addStore(store);
      location.tick();
      assert.equal(store.tick.called, true);
    });
  });
});
