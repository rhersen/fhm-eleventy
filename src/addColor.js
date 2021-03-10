const _ = require("lodash");

module.exports = (arrays, scale = 1) =>
  _.map(arrays, (array) =>
    _.map(array, (value) => ({
      value,
      bgcolor: bgcolor(value * scale),
    }))
  );

function bgcolor(value) {
  if (value < 0.1) return "#66bfc6";
  if (value < 20) return "#f5d664";
  if (value < 60) return "#f1b73c";
  if (value < 120) return "#e79402";
  if (value < 240) return "#da6500";
  if (value < 480) return "#d23f00";
  if (value < 960) return "#b61c00";
  else return "#870202";
}
