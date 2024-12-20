import file from "./4.json" with { type: "json" };
import * as _ from "https://deno.land/x/lodash@4.17.15-es/lodash.js";

const directions = {
  "N": [-1, 0],
  "NE": [-1, 1],
  "E": [0, 1],
  "SE": [1, 1],
  "S": [1, 0],
  "SW": [1, -1],
  "W": [0, -1],
  "NW": [-1, -1],
};

const testLetter = (x, y) => {
  if (x < 0 || x > data.length - 1 || y < 0 || y > data[0].length - 1) {
    return "Z";
  }
  return data[x][y];
};

const { data } = file;
let result = 0;
for (let i = 0; i < data.length; i++) {
  for (let j = 0; j < data[0].length; j++) {
    if (testLetter(i, j) === "X") {
      const tests = {};
      for (const d of Object.keys(directions)) {
        const cs = directions[d];
        tests[d] = [
          testLetter(i + cs[0], j + cs[1]),
          testLetter(i + 2 * cs[0], j + 2 * cs[1]),
          testLetter(i + 3 * cs[0], j + 3 * cs[1]),
        ];
      }
      const report = Object.values(tests);
      result += _.sumBy(
        report,
        (e) => _.isEqual(e, ["M", "A", "S"]) ? 1 : 0,
      );
    }
  }
}
console.log("🚀 ~ result:", result);
