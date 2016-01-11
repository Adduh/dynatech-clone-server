'use strict';

var Connection = function(socket) {
  var that = this;
  this.socket = socket;
  socket.setEncoding('utf8');
  socket.on('data', function(data) {
    that.onRecv(data);
  });
};

Connection.prototype.init = function() {
};

Connection.prototype.onRecv = function(data) {
  console.log(data);
};
module.exports = Connection;
