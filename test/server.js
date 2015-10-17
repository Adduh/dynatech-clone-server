'use strict';
require('blanket');
var assert = require('assert');
var net = require('net');

var Server = require('../src/server.js').Server;
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

  });

  describe('stop()', function() {
    beforeEach(function() {
      server.start(5100);
    });

    it('works when no client is connected', function(done) {
      server.stop(done);
    });

    it('can be started on the same port after stopping', function(done) {
      server.stop(function() {
        server.start(5100, function() {
          done();
          server.stop();
        });
      });
    });
  });
});
