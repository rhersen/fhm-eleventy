const _ = require("lodash");

module.exports = (arrays) =>
  _.map(arrays, (array) =>
    _.map(array, (value) => ({
      value,
      bgcolor: value < 60 ? "#f1b73c" : "#e79402",
    }))
  );
