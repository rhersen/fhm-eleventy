const _ = require("lodash");

const colors = {
  14: [
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
  ],
  7: [
    "#66bfc6",
    0.1 / 1.4,
    "#f5d664",
    20 / 1.4,
    "#f1b73c",
    60 / 1.4,
    "#e79402",
    120 / 1.4,
    "#da6500",
    240 / 1.4,
    "#d23f00",
    480 / 1.4,
    "#b61c00",
    960 / 1.4,
    "#870202",
  ],
};

module.exports = (arrays, table = "14") =>
  _.map(arrays, (array) =>
    _.map(array, (value) => ({
      value,
      bgcolor: bgcolor(value, colors[table]),
    }))
  );

function bgcolor(value, table14) {
  for (let i = 0; i < table14.length; i += 2)
    if (value < table14[i + 1]) return table14[i];
  return _.last(table14);
}
