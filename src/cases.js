const format = require("date-fns/format");
const isValid = require("date-fns/isValid");
const parse = require("date-fns/parse");
const _ = require("lodash");

module.exports = function cases({ Sheets }) {
  const sheet = Sheets?.["Antal per dag region"];
  if (!sheet) return {};

  const entries = Object.entries(sheet);

  const rows = _.groupBy(
    _.reject(entries, ([k]) => _.startsWith(k, "!")),
    ([k]) => k.substr(1)
  );

  return {
    columns: _.map(
      _.filter(entries, ([cell]) => /^[^A]1$/.test(cell)),
      ([, value]) => value.v
    ),
    rows: _.map(
      _.filter(
        _.filter(entries, ([cell]) => /^A\d+$/.test(cell)),
        ([cell]) => cell !== "A1"
      ),
      ([, value]) => value.w
    ),
    values: _.tail(
      _.map(rows, (row) => _.map(_.tail(row), ([, value]) => value.v))
    ),
  };
};

function iso(date) {
  const parsed = parse(date, "M/d/yy", new Date());
  return isValid(parsed) ? format(parsed, "yyyy-MM-dd") : date;
}
