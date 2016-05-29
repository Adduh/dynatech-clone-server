'use strict';
var net = require('net');
var log = require('./log.js');
var Connection = require('./connection.js');

class Server {
  constructor() {
    this.server = null;
    this.connections = [];
  }

  start(port, callback) {
    if (typeof port === 'undefined') {
      port = 5000;
    }
    if (this.server !== null) {
      throw new Error('Called Server Start twice!');
    }
    var server = net.createServer(socket => {
      this.connections.push(new Connection(socket));
      log.debug('new client connected!');

      socket.on('end', () => {
        log.debug('client disconnected!');
        this.connections = this.connections.filter(element =>
          element !== socket);
      });
    });
    server.listen(port, callback);
    this.server = server;
  }

  stop(callback) {
    var state = this.server ? 'running' : 'already stopped';
   log.debug('Stop (%s) server!', state);

    if (!this.server) {
      if (typeof callback === 'function') {
        callback();
      }
    } else {
      this.server.close(callback);
      this.server = null;
    }
    this.connections = [];
  }
}

module.exports = Server;
