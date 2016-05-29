'use strict';

var assert = require('assert');
var sinon = require('sinon');

var Player = require('../src/player.js');

describe('Player', () => {
  var player;
  var producer;
  beforeEach(() => {
    player = new Player();
    producer = { tick: sinon.spy() };
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
      assert.equal(producer.tick.called, true);
    });
  });
});
