const _ = require("lodash");

module.exports = (rows, n) =>
  _.map(rows, (row, i) => {
    const prevAndCurr = rows.slice(i >= n * 2 ? i + 1 - n * 2 : 0, i + 1);
    const [prev, curr] = _.chunk(prevAndCurr, prevAndCurr.length / 2);
    const range = _.range(0, _.size(prev?.[0]));

    return _.map(range, percentChange);

    function percentChange(i) {
      return (
        (_.reduce(curr, sumAllColumns)[i] / _.reduce(prev, sumAllColumns)[i] -
          1) *
        100
      );
    }

    function sumAllColumns(row1, row2) {
      return _.map(range, (i) => row1[i] + row2[i]);
    }
  });
