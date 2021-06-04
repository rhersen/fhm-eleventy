const _ = require("lodash");
const axios = require("axios");
const addColor = require("../src/addColor.js");
const divideValuesByPopulation = require("../src/divideValuesByPopulation.js");
const sum = require("../src/sum.js");
const diff = require("../src/diff.js");
const population = require("../src/population.js");
const coordinates = require("../src/coordinates.js");

async function getCases() {
  const { data, status, statusText } = await axios.get(
    "https://secure.hersen.name/fohm"
  );
  console.log(status, statusText);
  return data;
}

const regionNames = _.keys(population);

module.exports = async () => {
  const cases = await getCases();
  const { columns, rows, cells } = cases;
  const values7 = divideValuesByPopulation(
    sum(cells, 7),
    columns,
    population,
    1e6 / 7
  );
  const width = 800;
  const height = 600;
  const max = 1400;
  const cells7 = addColor(values7, "7").reverse();
  const cellsDiff = addColor(diff(cells, 7), "diff")
    .reverse()
    .filter((cell, i) => i % 7 === 0);

  const cells14 = addColor(
    divideValuesByPopulation(sum(cells, 14), columns, population, 1e5),
    "14"
  ).reverse();

  const latest7 = _.first(cells7);
  const latestDiff = _.first(cellsDiff);
  const latest14 = _.first(cells14);

  return {
    timestamp: cases.heading,
    cases: {
      columns,
      rows: rows.reverse(),
      cells7,
      cells14,
      cellsDiff,
      charts: columns.map((column, columnIndex) => ({
        region: column.toLowerCase(),
        width,
        height,
        max,
        yValues: _.range(100, max, 100),
        points: _.join(
          _.map(_.slice(values7, 132), (a, rowIndex) => [
            (rowIndex * width) / (values7.length - 132),
            height - (a[columnIndex] * height) / max,
          ])
        ),
      })),
      latest: {
        rows: _.sortBy(
          _.map(latest7, (entry, i) => ({
            ...entry,
            entry14: latest14[i],
            entryDiff: latestDiff[i],
            regionName: regionNames[i],
          })),
          ({ value }) => -value
        ),
      },
      map7: _.map(latest7, mapRegion),
      map14: _.map(latest14, mapRegion),
      mapDiff: _.map(latestDiff, mapRegion),
    },
  };

  function mapRegion({ value, bgcolor }, i) {
    const coordinate = coordinates[regionNames[i]];
    const points = _.map(coordinate, xy);

    return {
      value,
      bgcolor,
      points: points.toString(),
      center: { x: centerX(points), y: centerY(points) },
    };

    function xy(coord) {
      return [coord.x, 70 - coord.y];
    }

    function centerX(points) {
      const values = points.map(([x]) => x);
      return (Math.min(...values) + Math.max(...values)) / 2;
    }

    function centerY(points) {
      const values = points.map(([, y]) => y);
      return (Math.min(...values) + Math.max(...values)) / 2;
    }
  }
};
