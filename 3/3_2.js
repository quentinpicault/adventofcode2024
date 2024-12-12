import file from "./3_2.json" with { type: "json" };
import * as _ from "https://deno.land/x/lodash@4.17.15-es/lodash.js";

const { data } = file;
let enabler = true;
let result = 0;
for (const el of data) {
  if (el === "don't()") {
    enabler = false;
    continue;
  }
  if (el === "do()") {
    enabler = true;
    continue;
  }
  if (el[0] !== undefined && enabler) {
    result += el[0] * el[1];
    continue;
  }
}
console.log("🚀 ~ result:", result);
