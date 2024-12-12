import file from "./1.json" with { type: "json" };
import * as _ from "https://deno.land/x/lodash@4.17.15-es/lodash.js";

const { data } = file;
const left = data.map((t) => t[0]);
const right = data.map((t) => t[1]);
const sortedLeft = _.sortBy(left, (e) => e);
const sortedRight = _.sortBy(right, (e) => e);
const distances = sortedLeft.map((e, i) => Math.abs(e - sortedRight[i]));
const result = _.sum(distances);
console.log("🚀 ~ result:", result);
