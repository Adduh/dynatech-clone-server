'use strict';

exports.require = require;
var Server = require('./server.js');
var server = new Server();
server.start();
