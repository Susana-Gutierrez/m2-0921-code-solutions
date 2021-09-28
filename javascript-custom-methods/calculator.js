/* exported calculator */

var calculator = {
  add: function (x, y) {
    return x + y;
  },
  subtract: function (x, y) {
    return x - y;
  },
  multiply: function (x, y) {
    return x * y;
  },
  divide: function (x, y) {
    return x / y;
  },
  quotient: function (x, y) {
    return x / y;
  },
  square: function (x) {
    return x * x;
  },
  sumAll: function (numbers) {
    let result = 0;
    for (let i = 0; i < numbers.length; i++){
      result = result + numbers[i];
    }
    return result;
  },
  getAverage: function (numbers) {
    let result = 0;
    for (let i = 0; i < numbers.length; i++) {
      result = result + numbers[i];
    }
    result = result / numbers.length;
    return result;
  },
};
