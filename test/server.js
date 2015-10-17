'use strict';
require('blanket');
var assert = require('assert');
var net = require('net');

var Server = require("../src/server.js").Server;
describe('Server', function() {
  var server;
  beforeEach(function() {
    server = new Server();
  });
  describe('Start Server', function() {
    it('should start with default port: 5000', function(done) {
      server.start();
      var client = new net.connect({port: 5000}, function() {
        done();
        client.end();
        server.stop();
      });
    });

    it('should start with specific port: 5050', function(done) {
      server.start(5050);
      var client = new net.connect({port: 5050}, function() {
        done();
        client.end();
        server.stop();
      });
    });

    it('start should throw an error when start is called twice', function() {
      server.start(5050);
      assert.throws(function() {
        server.start(5050);
      }, 'Called Server Start twice!');
      server.stop();
    });

  });

  describe('Stop Server', function() {
    beforeEach(function() {
      server.start(5100);
    });

    it('stopping should work when no client is connected', function(done) {
      server.stop(done);
    });

    it('reopening of server should work on the same port after stopping', function(done) {
      server.stop(function() {
        server.start(5100,function() {
          done();
          server.stop();
        });
      });
    });
  });
});
