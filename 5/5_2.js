import file from "./5.json" with { type: "json" };
import * as _ from "https://deno.land/x/lodash@4.17.15-es/lodash.js";

const swapArrayElements = (arr, from, to) => {
  const temp = arr[to];
  arr[to] = arr[from];
  arr[from] = temp;
};

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
const remaining = [];
for (const update of updates) {
  if (!validUpdate(update)) remaining.push(update);
}

for (const update of remaining) {
  while (!validUpdate(update)) {
    for (const rule of rules) {
      const findFirst = update.findIndex((e) => e === rule[0]);
      const findSecond = update.findIndex((e) => e === rule[1]);
      if (findFirst === -1 || findSecond === -1) continue;
      if (findFirst < findSecond) continue;
      if (findFirst > findSecond) {
        swapArrayElements(update, findFirst, findSecond);
        break;
      }
    }
  }
}

const result = _.sum(remaining.map((e) => e[Math.floor(e.length / 2)]));
console.log("🚀 ~ result:", result);
