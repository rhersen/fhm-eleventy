const _ = require("lodash");

module.exports = (arrays, columns, divisors, factor = 1) =>
  _.map(arrays, (array) =>
    _.map(array, (value, i) => (factor * value) / divisors[columns[i]])
  );
