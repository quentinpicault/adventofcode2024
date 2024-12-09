import file from "./2.json" with { type: "json" };
import * as _ from "https://deno.land/x/lodash@4.17.15-es/lodash.js";

const data = file.data;
const result = _.reduce(data, (sum, report) => {
  let dampered = false;
  for (let i = 0; i < report.length; i++) {
    const newReport = report.toSpliced(i, 1);
    const evolutions = newReport.map((e, i) =>
      i === 0 ? 1 : e - newReport[i - 1]
    ).slice(1);
    const hasZeros = evolutions.some((e) => e === 0);
    const hasNegatives = evolutions.some((e) => e < 0);
    const hasPositives = evolutions.some((e) => e > 0);
    const hasOutbounds = evolutions.some((e) => Math.abs(e) > 3);
    if (!(hasZeros || hasOutbounds || hasNegatives && hasPositives)) {
      dampered = true;
      break;
    }
  }
  if (dampered) return sum += 1;
  return sum;
}, 0);
console.log("🚀 ~ result ~ result:", result);