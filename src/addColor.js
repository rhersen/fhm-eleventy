const _ = require("lodash");

module.exports = (arrays, scale = 1) =>
  _.map(arrays, (array) =>
    _.map(array, (value) => ({
      value,
      bgcolor: bgcolor(value * scale),
    }))
  );

const table14 = [
  "#66bfc6",
  0.1,
  "#f5d664",
  20,
  "#f1b73c",
  60,
  "#e79402",
  120,
  "#da6500",
  240,
  "#d23f00",
  480,
  "#b61c00",
  960,
  "#870202",
];

function bgcolor(value) {
  for (let i = 0; i < table14.length; i += 2)
    if (value < table14[i + 1]) return table14[i];
  return _.last(table14);
}
