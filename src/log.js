function log() {
  if(process.env.NODE_ENV !== 'test') {
    var args = Array.prototype.slice.call(arguments);
    var date = new Date();
    var dateFormat = date.getHours() + ":" +
                     date.getMinutes() + ":" +
                     date.getSeconds() + "." +
                     date.getMilliseconds();

    args[0] = dateFormat + " | " + args[0];
    console.log.apply(this, args);
  }
}

module.exports = log;
