const expect = require("chai").expect;
const subject = require("../src/cases.js");

describe("cases", function () {
  it("returns empty object", function () {
    expect(subject({})).to.deep.equal({});
    expect(subject({ Sheets: {} })).to.deep.equal({});
    expect(subject({ Sheets: { "Antal per dag region": {} } })).to.deep.equal(
      {}
    );
    expect(
      subject({
        Sheets: {
          "Antal per dag region": {
            "!ref": "A1:W396",
            A1: {
              t: "s",
              v: "Statistikdatum",
              r: "<t>Statistikdatum</t>",
              h: "Statistikdatum",
              w: "Statistikdatum",
            },
            A2: { t: "n", v: 43865, w: "2/4/20" },
          },
        },
      })
    ).to.deep.equal({});
  });

  it("returns a column header", () =>
    expect(
      subject({
        Sheets: {
          "Antal per dag region": {
            "!ref": "A1:W396",
            A1: {
              t: "s",
              v: "Statistikdatum",
              r: "<t>Statistikdatum</t>",
              h: "Statistikdatum",
              w: "Statistikdatum",
            },
            B1: {
              t: "s",
              v: "Totalt_antal_fall",
              r: "<t>Totalt_antal_fall</t>",
              h: "Totalt_antal_fall",
              w: "Totalt_antal_fall",
            },
          },
        },
      })
    ).to.deep.equal({ Totalt_antal_fall: {} }));

  it("returns one data value", () =>
    expect(
      subject({
        Sheets: {
          "Antal per dag region": {
            "!ref": "A1:W396",
            A1: {
              t: "s",
              v: "Statistikdatum",
              r: "<t>Statistikdatum</t>",
              h: "Statistikdatum",
              w: "Statistikdatum",
            },
            B1: {
              t: "s",
              v: "Totalt_antal_fall",
              r: "<t>Totalt_antal_fall</t>",
              h: "Totalt_antal_fall",
              w: "Totalt_antal_fall",
            },
            A2: { t: "n", v: 43865, w: "2/4/20" },
            B2: { t: "n", v: 1, w: "1" },
          },
        },
      })
    ).to.deep.equal({ Totalt_antal_fall: { "2020-02-04": 1 } }));
});
