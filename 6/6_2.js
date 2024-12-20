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

let result = 0;

for (let i = 0; i < data.length; i++) {
  for (let j = 0; j < data[0].length; j++) {
    if (["#", "^"].includes(data[i][j])) continue;
    const ground = _.cloneDeep(data);
    ground[i][j] = "#";
    let found = false;
    let stuck = false;
    while (!found && !stuck) {
      const cnt = parseInt(ground[cursor.x][cursor.y]);
      if (isNaN(cnt)) ground[cursor.x][cursor.y] = "0";
      else ground[cursor.x][cursor.y] = `${cnt + 1}`;

      const predictX = cursor.x + clockwise[cursor.dir][0];
      const predictY = cursor.y + clockwise[cursor.dir][1];

      if (ground[cursor.x][cursor.y] === "2") {
        console.log(`i:${i}  j:${j}`);
        stuck = true;
        break;
      }
      if (predictX < 0 || predictX > ground.length - 1) {
        found = true;
        break;
      }
      if (predictY < 0 || predictY > ground[0].length - 1) {
        found = true;
        break;
      }
      if (ground[predictX][predictY] === "#") {
        cursor.dir = (cursor.dir + 1) % 4;
      } else {
        cursor.x = predictX;
        cursor.y = predictY;
      }
    }
  }
}

console.log("🚀 ~ result:", result);
