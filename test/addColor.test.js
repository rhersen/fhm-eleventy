const expect = require("chai").expect;
const subject = require("../src/addColor.js");

describe("addColor", function () {
  it("adds color", () =>
    expect(
      subject([
        [90, 10],
        [60, 360],
        [720, 180],
      ])
    ).to.deep.equal([
      [
        {
          bgcolor: "#e79402",
          value: 90,
        },
        {
          bgcolor: "#f1b73c",
          value: 10,
        },
      ],
      [
        {
          bgcolor: "#e79402",
          value: 60,
        },
        {
          bgcolor: "#e79402",
          value: 360,
        },
      ],
      [
        {
          bgcolor: "#e79402",
          value: 720,
        },
        {
          bgcolor: "#e79402",
          value: 180,
        },
      ],
    ]));
});
