'use strict';

var assert = require('assert');

var Game = require('../src/game.js');
var Player = require('../src/player.js');

describe('Game', () => {
  var game;
  beforeEach(() => { game = new Game(10); });

  describe('contructor()', () => {
    it('initiates running, players and time', () => {
      assert.equal(game.loopId, undefined);
      assert.equal(game.players.length, 0);
      assert.equal(game.time, 0);
    });
  });

  describe('start()', () => {
    beforeEach(() => { game.start(); });
    afterEach(() => { game.stop(); });

    it('sets the interval', () => {
      assert.notEqual(game.loopId, undefined);
    });

    it('starts ticking', done => {
      setTimeout(() => {
        assert.equal(game.time, 2);
        done();
      }, 2.5 * game.tickInterval);
    });

    it('does nothing if already running', done => {
      game.start();
      setTimeout(() => {
        assert.equal(game.time, 2);
        done();
      }, 2.5 * game.tickInterval);
    });

    it('resumes after stop', done => {
      setTimeout(() => {
        game.stop();
        setTimeout(() => {
          game.start();
          assert.equal(game.time, 2);
          done();
        }, 2 * game.tickInterval);
      }, 2.5 * game.tickInterval);
    });

  });
  describe('stop()', () => {
    beforeEach(done => {
      game.start();
      setTimeout(() => {
        game.stop();
        done();
      }, 2.5 * game.tickInterval);
    });

    it('does nothing if not running', () => {
      game.stop();
    });

    it('clears the interval', () => {
      assert.equal(game.loopId, undefined);
    });

    it('stops ticking', done => {
      setTimeout(() => {
        assert.equal(game.loopId, undefined);
        assert.equal(game.time, 2);
        done();
      }, 2 * game.tickInterval);
    });
  });

  describe('addPlayer()', () => {
    it('adds a Player into list', () => {
      game.addPlayer('TESTPLAYER');
      assert.equal(game.players.length, 1);
      assert.equal(game.players[0].name, 'TESTPLAYER');
      assert(game.players[0] instanceof Player);
    });
  });
});
