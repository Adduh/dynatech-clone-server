function debug() {
  if(process.env.NODE_ENV !== 'test') {
    console.log.apply(this, arguments);
  }
}

module.exports = {debug};
