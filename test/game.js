'use strict';

var assert = require('assert');

var Game = require('../src/game.js');

describe('Game', () => {
  var game;
  beforeEach(() => { game = new Game(10); });
  describe('contructor()', () => {
    it('initiates running, players and time', () => {
      assert.equal(game.running, false);
      assert.equal(game.players.length, 0);
      assert.equal(game.time, 0);
    });
  });
  describe('start()', () => {
    it('sets state to running', () => {
      game.start();
      assert.equal(game.running, true);

    });
    it('starts ticking', done => {
      game.start();
      setTimeout(() => {
        assert.equal(game.time, 2);
        done();
      }, 2.5 * game.tickInterval);
    });
    it('does nothing if already running', done => {
      game.start();
      game.start();
      setTimeout(() => {
        assert.equal(game.time, 2);
        done();
      }, 2.5 * game.tickInterval);
    });
    it('resumes after stop', done => {
      game.start();
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
    it('sets state to not running', done => {
      game.start();
      setTimeout(() => {
        game.stop();
        assert.equal(game.running, false);
        done();
      }, 2.5 * game.tickInterval);
    });
    it('stops ticking', done => {
      game.start();
      setTimeout(() => {
        game.stop();
        setTimeout(() => {
          assert.equal(game.time, 2);
          done();
        }, 2 * game.tickInterval);
      }, 2.5 * game.tickInterval);
    });
    it('does nothing if not running', () => {
      game.start();
      game.stop();
      game.stop();
    });
  });
  describe('addPlayer()', () => {
    it('adds a Player into list', () => {
      assert.equal(game.players.length, 0);
      game.addPlayer('TESTPLAYER');
      assert.equal(game.players.length, 1);
      assert.equal(game.players[0], 'TESTPLAYER');
    });
  });
});
