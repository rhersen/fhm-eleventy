const expect = require("chai").expect;
const subject = require("../src/diff.js");

describe("diff", function () {
  it("returns empty array", () => expect(subject([])).to.deep.equal([]));
  it("returns array of empty array", () =>
    expect(subject([[]])).to.deep.equal([[]]));
  it("calculates sum of 3 rows", () =>
    expect(subject([[2], [3], [4], [5]], 2)).to.deep.equal([
      [],
      [1.5],
      [1.5],
      [1.8],
    ]));
});
