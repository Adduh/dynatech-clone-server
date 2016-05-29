function log() {
  if(process.env.NODE_ENV !== 'test') {
    console.log.apply(this, arguments);
  }
}

module.exports = log;
