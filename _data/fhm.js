const axios = require("axios");
const xlsx = require("xlsx");
const cases = require("../src/cases.js");

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
  },
});
