'use strict';
require('blanket');
var net = require('net');
var assert = require('assert');

var Connection = require('../src/connection.js');
describe('Connection', () => {
  var connection;
  describe('constructor', () => {
    it('registers onRecv event', () => {
      var socket = new net.Socket();
      assert.equal(socket.listenerCount('data'), 0);
      connection = new Connection(socket);
      assert.equal(socket.listenerCount('data'), 1);
    });
  });
  describe('onRecv(data)', () => {
    it('parses data!', () => {
    });
  });
});
