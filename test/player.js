'use strict';

var assert = require('assert');

var Player = require('../src/player.js');

describe('Player', () => {
  var player;
  var producer;
  class TestProducer {
    constructor() {
      this.ticked = false;
    }
    tick() {
      this.ticked = true;
    }
  }
  beforeEach(() => {
    player = new Player();
    producer = new TestProducer();
  });
  describe('constructor()', () => {
    it('it initiates producers', () => {
      assert.equal(player.producers.length, 0);
    });
  });
  describe('addProducer()', () => {
    it('adds a producer to the producers list', () => {
      assert.equal(player.producers.length, 0);
      player.addProducer(producer);
      assert.equal(player.producers.length, 1);
      assert.equal(player.producers[0], producer);
    });
  });
  describe('tick()', () => {
    it('calls tick on all producers', () => {
      assert.equal(player.producers.length, 0);
      player.addProducer(producer);
      player.tick();
      assert.equal(producer.ticked, true);

    });
  });
});
