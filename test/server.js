'use strict';
require('blanket');
var assert = require('assert');
var net = require('net');

var Server = require('../src/server.js');
var Connection = require('../src/connection.js');
describe('Server', function() {
  var server;
  beforeEach(function() {
    server = new Server();
  });
  describe('start()', function() {
    it('starts with default port: 5000', function(done) {
      server.start();
      var client = new net.connect({port: 5000}, function() {
        done();
        client.end();
        server.stop();
      });
    });

    it('starts with specific port: 5050', function(done) {
      server.start(5050);
      var client = new net.connect({port: 5050}, function() {
        done();
        client.end();
        server.stop();
      });
    });

    it('throws an error when start is called twice', function() {
      server.start(5050);
      assert.throws(function() {
        server.start(5050);
      }, 'Called Server Start twice!');
      server.stop();
    });

    it('creates a connection after client connected', function(done) {
      server.start(5000);
      var client = new net.connect({port: 5000}, function() {
        assert.equal(server.connections.length, 1);
        client.end();
        server.stop();
        done();
      });
    });
    it('registers events', function(done) {
      server.start(5000);
      var client = new net.connect({port: 5000}, function() {
        assert.equal(server.connections[0].socket.listenerCount('data'), 1);
        assert.equal(server.connections[0].socket.listenerCount('end'), 2);
        client.end();
        server.stop();
        done();
      });
    });

  });

  describe('stop()', function() {
    beforeEach(function() {
      server.start(5100);
    });

    it('works when no client is connected', function(done) {
      server.stop(done);
    });

    it('releases the server socket correctly', function(done) {
      server.stop(function() {
        server.start(5100, function() {
          done();
          server.stop();
        });
      });
    });
    it('removes all connections', function() {
      server.connections.push(1);
      server.connections.push(2);
      server.connections.push(3);
      server.stop();
      assert.equal(server.connections.length, 0);
    });
  });
});
