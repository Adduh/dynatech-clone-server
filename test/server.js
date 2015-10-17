"use strict";
require("blanket");
var assert = require("assert");
var net = require("net");

var Server = require("../src/server.js").Server;
describe('Server', function() {
  var server;
  beforeEach(function() {
    server = new Server();
  });
  describe('Start Server', function() {
    it('should start with default port: 5000', function(done) {
      server.start();
      var connected = false;
      var client = new net.connect({port: 5000},
          function() {
            connected = true;
            done();
          });
      client.end();
    });
  });
});
