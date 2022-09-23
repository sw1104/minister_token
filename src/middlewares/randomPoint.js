function createRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  var randomPoint = createRandomNumber(1000, 100000);

module.exports = {
    randomPoint
};
