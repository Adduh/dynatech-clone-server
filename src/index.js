'use strict';

exports.require = require;
var Server = require('./server.js');
var Game = require('./game.js');
var server = new Server();
server.start();

var game = new Game();
game.start();
