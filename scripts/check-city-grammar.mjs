// Guards the interpolated city tokens against the single most common defect in this content:
// dropping a city name straight after a noun with no preposition. Russian needs one, and the
// result otherwise is visibly machine-generated text ("вскрытие замка Москве", "цена замены
// личинки Химках") on hundreds of pages at once. This ran as a one-off cleanup over
// lib/serviceFaqVariants.ts (196 fixes); the check exists so the cleanup stays done.
//
// Usage: node scripts/check-city-grammar.mjs   (wired up as `npm run lint:grammar`)

import fs from "node:fs";
import path from "node:path";

const ROOTS = ["lib", "content", "components", "app"];
const EXTENSIONS = new Set([".ts", ".tsx", ".json"]);

/** Prepositions (and governing words) that legitimately precede each case. */
const ALLOWED_BEFORE = {
  cityPrepositional: ["в", "во"],
  cityDative: ["по"],
  cityAccusative: ["в", "во", "через"],
  // Genitive is the one case that attaches straight to a governing noun — "района Москвы",
  // "в черте города Москвы" — so it is checked against those nouns rather than prepositions.
  cityGenitive: ["до", "от", "из", "для", "у", "близ", "район", "района", "районах", "города", "центра", "окраин"],
};

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (EXTENSIONS.has(path.extname(entry.name))) out.push(full);
  }
  return out;
}

const problems = [];
let checked = 0;

for (const root of ROOTS) {
  if (!fs.existsSync(root)) continue;
  for (const file of walk(root)) {
    const source = fs.readFileSync(file, "utf-8");
    for (const match of source.matchAll(/\{\{(city(?:Prepositional|Dative|Accusative|Genitive))\}\}/g)) {
      checked++;
      const token = match[1];
      const before = source.slice(0, match.index);
      // Last whitespace-delimited word before the token, stripped of punctuation and case.
      const previous = (before.match(/([^\s]+)\s+$/)?.[1] ?? "")
        .replace(/[«»"'(),.:;—–-]/g, "")
        .toLowerCase();
      if (ALLOWED_BEFORE[token].includes(previous)) continue;
      const line = before.split("\n").length;
      problems.push({ file, line, token, context: before.slice(-70).replace(/\s+/g, " ") });
    }
  }
}

if (problems.length > 0) {
  console.error(`\nГрамматика городских токенов: ${problems.length} проблем(ы) из ${checked} вхождений\n`);
  for (const { file, line, token, context } of problems) {
    console.error(`  ${file}:${line}`);
    console.error(`    …${context}⟦${token}⟧`);
    console.error(`    нужен предлог: ${ALLOWED_BEFORE[token].slice(0, 3).map((w) => `"${w} …"`).join(" / ")}\n`);
  }
  console.error("Падеж и предлог должны совпадать: «по» + дательный (выезд), «в» + предложный (цена).\n");
  process.exit(1);
}

console.log(`Грамматика городских токенов: ${checked} вхождений, проблем нет.`);
