import file from "./5.json" with { type: "json" };
import * as _ from "https://deno.land/x/lodash@4.17.15-es/lodash.js";

const validUpdate = (up) => {
  let valid = true;
  for (const rule of rules) {
    const findFirst = up.findIndex((e) => e === rule[0]);
    const findSecond = up.findIndex((e) => e === rule[1]);
    if (findFirst === -1 || findSecond === -1) continue;
    if (findFirst < findSecond) continue;
    if (findFirst > findSecond) {
      valid = false;
      break;
    }
  }
  return valid;
};

const { rules, updates } = file;
const printed = [];
for (const update of updates) {
  if (validUpdate(update)) printed.push(update);
}
const result = _.sum(printed.map((e) => e[Math.floor(e.length / 2)]));
console.log("🚀 ~ result:", result);
