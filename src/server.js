"use strict";
var net = require('net');

var Server = function constructor() {
  this.server = null;
};

Server.prototype.start = function (port, callback) {
  if (typeof port === 'undefined') {
    port = 5000;
  }
  var server = net.createServer(function(c) {
    console.log('new client connected!');
    c.on('end', function () {
      console.log('client disconnected!');
    });
  });
  server.listen(port, callback);
  this.server = server;
}

Server.prototype.stop = function (callback) {
  this.server.close(callback);
}

module.exports = { Server: Server };
