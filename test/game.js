'use strict';

var assert = require('assert');

var Game = require('../src/game.js');

describe('Game', () => {
  var game;
  beforeEach(() => { game = new Game(); });
  describe('contructor()', () => {
    it('initiates running and players', () => {
      assert.equal(game.running, false);
      assert.equal(game.players.length, 0);
    });
  });
  describe('start()', () => {
    it('sets state to running', () => {
      game.start();
      assert.equal(game.running, true);
    });
  });
  describe('addPlayer()', () => {
    it('adds a Player into list', () => {
      assert.equal(game.players.length, 0);
      game.addPlayer("TESTPLAYER");
      assert.equal(game.players.length, 1);
      assert.equal(game.players[0], "TESTPLAYER");
    });
  });
});
