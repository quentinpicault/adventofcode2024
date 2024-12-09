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

const cross = {
  "N": ["NW", "NE"],
  "E": ["NE", "SE"],
  "S": ["SW", "SE"],
  "W": ["NW", "SW"],
};

const testLetter = (x, y) => {
  if (x < 0 || x > data.length || y < 0 || y > data[0].length) return "Z";
  if (data[x] === undefined) return "Z";
  return data[x][y];
};

const data = file.data;
let result = 0;
for (let i = 0; i < data.length; i++) {
  for (let j = 0; j < data[0].length; j++) {
    if (testLetter(i, j) === "A") {
      const tests = {};
      for (const c of Object.keys(cross)) {
        const cs1 = directions[cross[c][0]];
        const cs2 = directions[cross[c][1]];
        const test1 = testLetter(i + cs1[0], j + cs1[1]);
        const test2 = testLetter(i + cs2[0], j + cs2[1]);
        tests[c] = test1 === test2 ? test1 : "Z";
      }
      const report = Object.values(tests);
      if (
        _.isEqual(report, ["M", "Z", "S", "Z"]) ||
        _.isEqual(report, ["Z", "M", "Z", "S"]) ||
        _.isEqual(report, ["S", "Z", "M", "Z"]) ||
        _.isEqual(report, ["Z", "S", "Z", "M"])
      ) {
        result += 1;
      }
    }
  }
}
console.log("🚀 ~ result:", result);
