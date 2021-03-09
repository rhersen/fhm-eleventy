const _ = require("lodash");

module.exports = (rows, n) =>
  _.map(rows, (row, i) =>
    _.reduce(rows.slice(i >= n ? i + 1 - n : 0, i + 1), (row1, row2) =>
      _.map(_.range(0, _.size(row1)), (i) => row1[i] + row2[i])
    )
  );
