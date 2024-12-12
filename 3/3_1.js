import file from "./3_1.json" with { type: "json" };
import * as _ from "https://deno.land/x/lodash@4.17.15-es/lodash.js";

const { data } = file;
const result = _.reduce(data, (sum, mul) => {
  return sum + mul[0] * mul[1];
}, 0);
console.log("🚀 ~ result ~ result:", result);
