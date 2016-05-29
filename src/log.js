function debug(line) {
  if(process.env.NODE_ENV !== 'test') {
    console.log(line);
  }
}

module.exports = {debug};
