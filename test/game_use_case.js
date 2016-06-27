'use strict';

var assert = require('assert');

var Game = require('../src/game');
var ProducerFactory = require('../src/factories/producer');

describe('Use case tests for game logic', () => {
  var game;
  beforeEach(() => { game = new Game(); });

  describe('Producers', () => {
    beforeEach(() => {
      var testProducerFactory = new ProducerFactory({
        name: 'Oil',
        cost: 10000,
        ressource: 'oil',
        amountPerTick: 12,
        costPerTick: 100
      });
      game.addProducerFactory(testProducerFactory);
    });

    it('produces ressources after deployment', () => {
      var player = game.addPlayer('TESTPLAYER', 12000);
      player.buyAndDeployProducer('Oil');
      game.tick();

      assert.equals(player.money, 12000 - 10000 - 100);
      assert.equals(player.ressources.oil, 12);
    });

    it('does not buy if not enough money', () => {
      var player = game.addPlayer('TESTPLAYER', 9000);
      player.buyAndDeployProducer('Oil');
      game.tick();

      assert.equals(player.money, 9000);
      assert.equals(player.ressources.oil, 0);
    });
  });
});
