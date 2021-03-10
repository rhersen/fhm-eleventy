const expect = require("chai").expect;
const subject = require("../src/sum.js");

describe("sum", function () {
  it("returns empty array", () => expect(subject([])).to.deep.equal([]));
  it("returns array of empty array", () =>
    expect(subject([[]])).to.deep.equal([[]]));
  it("calculates sum of 2 rows", () =>
    expect(subject([[2], [3]])).to.deep.equal([[2], [5]]));
  it("calculates sum of 3 rows", () =>
    expect(subject([[2], [3], [4], [5]], 3)).to.deep.equal([
      [2],
      [5],
      [9],
      [12],
    ]));
});
