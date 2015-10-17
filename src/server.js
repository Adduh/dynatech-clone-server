"use strict";
var net = require('net');

var Server = function constructor() {
};

Server.prototype.start = function (port) {
  if (typeof port === 'undefined') {
    port = 5000;
  }
  var server = net.createServer(function(c) {
    console.log("new client connected!");
    c.on('end', function () {
      console.log("client disconnected!");
    });
  });
  server.listen(port);
}

Server.prototype.stop = function () {
}

module.exports = { Server: Server };
