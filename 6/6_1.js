import file from "./6.json" with { type: "json" };
import * as _ from "https://deno.land/x/lodash@4.17.15-es/lodash.js";

const clockwise = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

const { data } = file;
const cursor = {
  x: 83,
  y: 42,
  dir: 0,
};
let found = false;
while (!found) {
  data[cursor.x][cursor.y] = "X";
  const predictX = cursor.x + clockwise[cursor.dir][0];
  const predictY = cursor.y + clockwise[cursor.dir][1];
  if (predictX < 0 || predictX > data.length - 1) {
    found = true;
    break;
  }
  if (predictY < 0 || predictY > data[0].length - 1) {
    found = true;
    break;
  }
  if (data[predictX][predictY] === "#") {
    cursor.dir = (cursor.dir + 1) % 4;
  } else {
    cursor.x = predictX;
    cursor.y = predictY;
  }
}

const result = _.reduce(data, (sum, line) => {
  return sum + _.sumBy(line, (x) => x === "X" ? 1 : 0);
}, 0);
console.log("🚀 ~ result ~ result:", result);
