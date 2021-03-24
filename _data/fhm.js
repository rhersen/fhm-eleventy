const _ = require("lodash");
const axios = require("axios");
const xlsx = require("xlsx");
const addColor = require("../src/addColor.js");
const cases = require("../src/cases.js");
const divideValuesByPopulation = require("../src/divideValuesByPopulation.js");
const sum = require("../src/sum.js");
const diff = require("../src/diff.js");

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

const population = {
  Totalt_antal_fall: 10230000,
  Blekinge: 159748,
  Dalarna: 287795,
  Gotland: 59636,
  Gävleborg: 287333,
  Halland: 333202,
  Jämtland_Härjedalen: 130697,
  Jönköping: 363351,
  Kalmar: 245415,
  Kronoberg: 201290,
  Norrbotten: 250230,
  Skåne: 1376659,
  Stockholm: 2374550,
  Sörmland: 297169,
  Uppsala: 383044,
  Värmland: 282342,
  Västerbotten: 271621,
  Västernorrland: 245380,
  Västmanland: 275634,
  Västra_Götaland: 1724529,
  Örebro: 304634,
  Östergötland: 465214,
};

const regionNames = _.keys(population);

const sandhammaren = { y: 55.387522, x: 14.185065 };
const fosby = { y: 59.2257424, x: 11.6937195 };
const treriksröset = { y: 69.0507753, x: 20.5171448 };
const haparanda = { y: 65.840444, x: 24.076838 };
const furuvik = { y: 60.6499265, x: 17.3371703 };
const grøvelsjøen = { y: 62.2634423, x: 12.3006323 };
const brömsebro = { y: 56.2992432, x: 15.9891883 };
const båstad = { y: 56.4278324, x: 12.8248392 };
const oxelösund = { y: 58.6734704, x: 17.0545007 };
const billdal = { y: 57.5735092, x: 11.9138001 };
const rörbäcksnäs = { y: 61.12886, x: 12.8050636 };
const stekenjokk = { y: 65.0698147, x: 14.2659379 };
const vindelkroken = { y: 66.2666664, x: 15.5412453 };
const jävre = { y: 65.1528011, x: 21.4794835 };
const salusand = { y: 63.4700831, x: 19.2520158 };
const njurundabommen = { y: 62.2680333, x: 17.3652393 };
const järsjö = { y: 60.1427778, x: 18.5163299 };
const nynäshamn = { y: 58.9123653, x: 17.9108162 };
const flatvarp = { y: 57.985413, x: 16.7949144 };
const hoburg = { y: 56.9289992, x: 18.1299352 };
const visby = { y: 57.6271917, x: 18.2735696 };
const sudersand = { y: 57.9493628, x: 19.1184951 };
const hoting = { y: 64.1137273, x: 16.1950004 };
const ytterhogdal = { y: 62.1748893, x: 14.9323852 };
const sölvesborg = { y: 56.0497402, x: 14.5768039 };
const rumpeboda = { y: 56.4516997, x: 14.4223001 };
const markaryd = { y: 56.4589499, x: 13.5825608 };
const eringsboda = { y: 56.4385185, x: 15.3574556 };
const arnö = { y: 59.4988811, x: 17.1783612 };
const avesta = { y: 60.1405361, x: 16.1639807 };
const noppikoski = { y: 61.4932749, x: 14.8351696 };
const vingåker = { y: 59.0503859, x: 15.8397022 };
const skinnskatteberg = { y: 59.825645, x: 15.6763624 };
const fredriksberg = { y: 60.1409872, x: 14.3645216 };
const finnerödja = { y: 58.924554, x: 14.4314438 };
const visingsö = { y: 58.0457454, x: 14.329842 };
const katthult = { y: 57.6888032, x: 15.5562243 };
const aaseda = { y: 57.167505, x: 15.3351557 };
const skeppshult = { y: 57.1274509, x: 13.3616952 };
const falsterbo = { y: 55.3960591, x: 12.8232552 };
const torhamn = { y: 56.0946438, x: 15.8236561 };
const sandhamn = { y: 59.2878805, x: 18.9020756 };

const coordinates = {
  Totalt_antal_fall: [],
  Uppsala: [furuvik, avesta, arnö, järsjö],
  Skåne: [sandhammaren, falsterbo, båstad, markaryd, rumpeboda, sölvesborg],
  Blekinge: [rumpeboda, eringsboda, brömsebro, torhamn, sölvesborg],
  Norrbotten: [vindelkroken, treriksröset, haparanda, jävre],
  Västerbotten: [stekenjokk, vindelkroken, jävre, salusand, hoting],
  Västernorrland: [hoting, salusand, njurundabommen, ytterhogdal],
  Gotland: [hoburg, visby, sudersand],
  Stockholm: [järsjö, sandhamn, nynäshamn, arnö],
  Jämtland_Härjedalen: [
    grøvelsjøen,
    stekenjokk,
    hoting,
    ytterhogdal,
    noppikoski,
  ],
  Gävleborg: [noppikoski, ytterhogdal, njurundabommen, furuvik, avesta],
  Sörmland: [arnö, nynäshamn, oxelösund, vingåker],
  Västmanland: [avesta, arnö, vingåker, skinnskatteberg],
  Dalarna: [
    rörbäcksnäs,
    grøvelsjøen,
    noppikoski,
    avesta,
    skinnskatteberg,
    fredriksberg,
  ],
  Värmland: [fosby, rörbäcksnäs, fredriksberg, finnerödja],
  Örebro: [finnerödja, fredriksberg, skinnskatteberg, vingåker],
  Västra_Götaland: [billdal, fosby, finnerödja, visingsö, skeppshult],
  Östergötland: [visingsö, finnerödja, vingåker, oxelösund, flatvarp, katthult],
  Kalmar: [katthult, flatvarp, brömsebro, eringsboda, aaseda],
  Kronoberg: [aaseda, eringsboda, rumpeboda, markaryd, skeppshult],
  Halland: [båstad, billdal, skeppshult, markaryd],
  Jönköping: [skeppshult, visingsö, katthult, aaseda],
};

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
      map: _.map(_.first(cells14), ({ value, bgcolor }, i) => ({
        value,
        bgcolor,
        points: _.map(coordinates[regionNames[i]], (coord) => [
          coord.x,
          70 - coord.y,
        ]).toString(),
      })),
    },
  };
};
