const expect = require("chai").expect;
const subject = require("../src/addColor.js");

describe("addColor", function () {
  it("adds color", () =>
    expect(
      subject(
        [
          [90, 10, 0, 360],
          [720, 180, 40, 999],
        ],
        "14"
      )
    ).to.deep.equal([
      [
        { bgcolor: "#e79402", value: 90 },
        { bgcolor: "#f5d664", value: 10 },
        { bgcolor: "#66bfc6", value: 0 },
        { bgcolor: "#d23f00", value: 360 },
      ],
      [
        { bgcolor: "#b61c00", value: 720 },
        { bgcolor: "#da6500", value: 180 },
        { bgcolor: "#f1b73c", value: 40 },
        { bgcolor: "#870202", value: 999 },
      ],
    ]));

  it("adds color according to factor", () =>
    expect(
      subject(
        [
          [70, 10],
          [744, 679],
        ],
        "7"
      )
    ).to.deep.equal([
      [
        { bgcolor: "#e79402", value: 70 },
        { bgcolor: "#f5d664", value: 10 },
      ],
      [
        { bgcolor: "#870202", value: 744 },
        { bgcolor: "#b61c00", value: 679 },
      ],
    ]));
});
