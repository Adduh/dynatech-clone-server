'use strict';
var net = require('net');
var Connection = require('./connection.js');

var Server = function() {
  this.server = null;
  this.connections = [];
};

Server.prototype.start = function(port, callback) {
  var that = this;
  if (typeof port === 'undefined') {
    port = 5000;
  }
  if (this.server !== null) {
    throw new Error('Called Server Start twice!');
  }
  var server = net.createServer(function(socket) {
    that.connections.push(new Connection(socket));
    console.log('new client connected!');

    socket.on('end', function() {
      console.log('client disconnected!');
      that.connections = that.connections.filter(element=>element!=socket);
    });
  });
  server.listen(port, callback);
  this.server = server;
};

Server.prototype.stop = function(callback) {
  var state = this.server ? "running" : "already stopped";
  console.log("Stop (%s) server!", state);
  if (!this.server) {
    typeof callback === 'function' && callback();
  } else {
    this.server.close(callback);
    this.server = null;
  }
  this.connections = [];
};

module.exports = Server;
