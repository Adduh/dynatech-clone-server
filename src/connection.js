'use strict';

var log = require('./log.js');

class Connection {
  constructor(socket) {
    this.socket = socket;
    socket.setEncoding('utf8');
    socket.on('data', data => {
      this.onRecv(data);
    });
  }

  init() {
  }

  onRecv(data) {
    console.log(data);
  }
}
module.exports = Connection;
