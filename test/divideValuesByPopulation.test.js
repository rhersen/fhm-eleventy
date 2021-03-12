const expect = require("chai").expect;
const subject = require("../src/divideValuesByPopulation.js");

describe("divideValuesByPopulation", function () {
  it("returns empty array", () => expect(subject([])).to.deep.equal([]));

  it("returns array of empty array", () =>
    expect(subject([[]])).to.deep.equal([[]]));

  it("divides by 2", () =>
    expect(
      subject(
        [
          [20, 10],
          [60, 16],
          [40, 20],
        ],
        ["Totalt_antal_fall", "Blekinge"],
        {
          Totalt_antal_fall: 4,
          Blekinge: 2,
        }
      )
    ).to.deep.equal([
      [5, 5],
      [15, 8],
      [10, 10],
    ]));

  it("multiplies by factor", () =>
    expect(
      subject(
        [[19], [61], [42]],
        ["Totalt_antal_fall", "Blekinge"],
        {
          Totalt_antal_fall: 4,
          Blekinge: 2,
        },
        100
      )
    ).to.deep.equal([[475], [1525], [1050]]));
});
