'use strict';

var assert = require('assert');
var sinon = require('sinon');

var Location = require('../src/location.js');
var Player = require('../src/player.js');

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
});
