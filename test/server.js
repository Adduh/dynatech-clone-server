'use strict';
require('blanket');
var assert = require('assert');
var net = require('net');

var Server = require('../src/server.js');

describe('Server', function() {
  var server;
  const DEFAULT_PORT = 5000;
  const WAIT_AFTER_CONNECT = 1;

  beforeEach(() => { server = new Server() });
  afterEach(done => { server.stop(done) });

  describe('start()', function() {
    var client;

    it('starts with default port: 5000', function(done) {
      server.start();
      client = new net.connect(5000, function() {
        client.end();
        done();
      });
    });

    it('starts with specific port: 5050', function(done) {
      server.start(5050);
      client = new net.connect(5050, function() {
        client.end();
        done();
      });
    });

    it('throws an error when start is called twice', function() {
      server.start();
      assert.throws(function() {
        server.start();
      }, 'Called Server Start twice!');
    });

    it('creates a connection after client connected', function(done) {
      server.start(DEFAULT_PORT, function() {
        client = new net.connect(DEFAULT_PORT, function() {
          setTimeout(function() {
            assert.equal(server.connections.length, 1);
            client.end();
            done();
          }, WAIT_AFTER_CONNECT);
        });
      });

    });
    it('registers events', function(done) {
      server.start();
      client = new net.connect(DEFAULT_PORT, function() {
        setTimeout(() => {
          assert.equal(server.connections[0].socket.listenerCount('data'), 1);
          assert.equal(server.connections[0].socket.listenerCount('end'), 2);
          client.end();
          done();
        }, WAIT_AFTER_CONNECT);
      });
    });
  });

  describe('stop()', function() {
    beforeEach(() => {
      server.start();
    });

    it('works when no client is connected', function(done) {
      server.stop(done);
    });

    it('handles non-functional callback', function() {
      server.stop("foo");
    });

    it('releases the server socket correctly', function(done) {
      server.stop(function() {
        server.start(DEFAULT_PORT, function() {
          server.stop(done);
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
