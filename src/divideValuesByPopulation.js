const _ = require("lodash");

module.exports = (arrays, columns, divisors, factor = 1) =>
  _.map(arrays, (array) =>
    _.map(
      array,
      (value, i) =>
        Math.round((10 * (factor * value)) / divisors[columns[i]]) / 10
    )
  );
