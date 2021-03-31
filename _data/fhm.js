const _ = require("lodash");
const axios = require("axios");
const xlsx = require("xlsx");
const addColor = require("../src/addColor.js");
const cases = require("../src/cases.js");
const divideValuesByPopulation = require("../src/divideValuesByPopulation.js");
const sum = require("../src/sum.js");
const diff = require("../src/diff.js");
const population = require("../src/population.js");
const coordinates = require("../src/coordinates.js");

async function getBook() {
  const { data, status, statusText } = await axios.get(
    "https://www.arcgis.com/sharing/rest/content/items/b5e7488e117749c19881cce45db13f7e/data",
    {
      responseType: "arraybuffer",
    }
  );
  console.log(status, statusText, data.length, "bytes");
  return xlsx.read(data);
}

const regionNames = _.keys(population);

module.exports = async () => {
  const { columns, rows, cells } = cases(await getBook());
  const values7 = divideValuesByPopulation(
    sum(cells, 7),
    columns,
    population,
    1e6 / 7
  );
  const width = 800;
  const height = 600;
  const max = 1400;
  const cells14 = addColor(
    divideValuesByPopulation(sum(cells, 14), columns, population, 1e5),
    "14"
  ).reverse();

  return {
    cases: {
      columns,
      rows: rows.reverse(),
      cells7: addColor(values7, "7").reverse(),
      cells14,
      cellsDiff: addColor(diff(cells, 7), "diff").reverse(),
      charts: columns.map((column, columnIndex) => ({
        region: column.toLowerCase(),
        width,
        height,
        max,
        points: values7.map((a, rowIndex) => [
          (rowIndex * width) / values7.length,
          height - (a[columnIndex] * height) / max,
        ]),
      })),
      map: _.map(_.first(cells14), ({ value, bgcolor }, i) => {
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
      }),
    },
  };
};
