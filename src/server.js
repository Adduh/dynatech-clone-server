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
  this.server.close(callback);
  this.connections = [];
  this.server = null;
};

module.exports = Server;
