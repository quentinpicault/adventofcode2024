import file from "./1.json" with { type: "json" };
import * as _ from "https://deno.land/x/lodash@4.17.15-es/lodash.js";

const data = file.data;
const left = data.map((t) => t[0]);
const right = data.map((t) => t[1]);
const groupedRight = _.groupBy(right, (e) => e);
const frequencies = left.map((e) =>
  groupedRight[e] ? groupedRight[e].length : 0
);
const similarities = left.map((e, i) => e * frequencies[i]);
const result = _.sum(similarities);
console.log("🚀 ~ result:", result);
