'use strict';
require('blanket');
var assert = require('assert');
var net = require('net');

var Server = require('../src/server.js');

describe('Server', () => {
  var server;
  const DEFAULT_PORT = 5000;
  const WAIT_AFTER_CONNECT = 1;

  beforeEach(() => { server = new Server(); });
  afterEach(done => { server.stop(done); });

  describe('start()', () => {
    var client;

    it('starts with default port: 5000', done => {
      server.start();
      client = new net.connect(5000, () => {
        client.end();
        done();
      });
    });

    it('starts with specific port: 5050', done => {
      server.start(5050);
      client = new net.connect(5050, () => {
        client.end();
        done();
      });
    });

    it('throws an error when start is called twice', () => {
      server.start();
      assert.throws(() => {
        server.start();
      }, 'Called Server Start twice!');
    });

    it('creates a connection after client connected', done => {
      server.start(DEFAULT_PORT, () => {
        client = new net.connect(DEFAULT_PORT, () => {
          setTimeout(() => {
            assert.equal(server.connections.length, 1);
            client.end();
            done();
          }, WAIT_AFTER_CONNECT);
        });
      });

    });
    it('registers events', done => {
      server.start();
      client = new net.connect(DEFAULT_PORT, () => {
        setTimeout(() => {
          assert.equal(server.connections[0].socket.listenerCount('data'), 1);
          assert.equal(server.connections[0].socket.listenerCount('end'), 2);
          client.end();
          done();
        }, WAIT_AFTER_CONNECT);
      });
    });
  });

  describe('stop()', () => {
    beforeEach(() => {
      server.start();
    });

    it('works when no client is connected', done => {
      server.stop(done);
    });

    it('handles non-functional callback', () => {
      server.stop('foo');
    });

    it('releases the server socket correctly', done => {
      server.stop(() => {
        server.start(DEFAULT_PORT, () => {
          server.stop(done);
        });
      });
    });
    it('removes all connections', () => {
      server.connections.push(1);
      server.connections.push(2);
      server.connections.push(3);
      server.stop();
      assert.equal(server.connections.length, 0);
    });
  });
});
