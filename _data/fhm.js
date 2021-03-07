const format = require('date-fns/format');
const isValid = require('date-fns/isValid');
const parse = require('date-fns/parse');
let axios = require('axios');
let xlsx = require('xlsx');

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

function iso(date) {
  const parsed = parse(date, "M/d/yy", new Date());
  return isValid(parsed) ? format(parsed, "yyyy-MM-dd") : date;
}

function cases({Sheets}) {
  const sheet = Sheets?.["Antal per dag region"];
  if (!sheet) return {};

  const entries = Object.entries(sheet);

  const columnKeys = Object.fromEntries(
    entries
      .filter(([cell]) => /^[^A]1$/.test(cell))
      .map(([cell, value]) => [/^(\D+)(\d+)$/.exec(cell)[1], value.v])
  );

  const rowKeys = Object.fromEntries(
    entries
      .filter(([cell]) => /^A\d+$/.test(cell))
      .filter(([cell]) => cell !== "A1")
      .map(([cell, value]) => [/^(\D+)(\d+)$/.exec(cell)[2], value.w])
  );

  const columns = Object.fromEntries(
    Object.entries(columnKeys).map(([, value]) => [value, {}])
  );

  entries
    .filter(([cell]) => !/^A/.test(cell))
    .filter(([cell]) => !/\D1$/.test(cell))
    .forEach(([cell, value]) => {
      const match = /^(\D+)(\d+)$/.exec(cell);
      if (match)
        columns[columnKeys[match[1]]][iso(rowKeys[match[2]])] = value.v;
    });
  return columns;
}

module.exports = async () => ({
  cases: cases(await getBook()),
  population: {
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
  }
})
