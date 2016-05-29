'use strict';

function log() {
  if (process.env.NODE_ENV !== 'test') {
    var args = Array.prototype.slice.call(arguments);
    var date = new Date();
    var ms = date.getMilliseconds();
    var msAsThreeDigits = (ms < 10) ? '00' + ms :
                                (ms < 100) ? '0' + ms : ms;
    var dateFormat = date.toLocaleTimeString('de', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }) + '.' + msAsThreeDigits;

    args[0] = dateFormat + ' | ' + args[0];
    console.log.apply(null, args);
  }
}

module.exports = log;
