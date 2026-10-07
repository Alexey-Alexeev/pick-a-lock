// Generates public/data/lead-meta.json — a slug→name lookup for cities and services that
// lead.php reads at request time (it has no access to the TS content layer or Zod schemas).
// Runs before every build (see package.json "prebuild").
import fs from "node:fs";
import path from "node:path";

const contentDir = path.join(process.cwd(), "content");
const outDir = path.join(process.cwd(), "public", "data");

function loadSlugNameMap(dirName) {
  const dir = path.join(contentDir, dirName);
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));
  const map = {};
  for (const file of files) {
    const data = JSON.parse(fs.readFileSync(path.join(dir, file), "utf-8"));
    if (data.slug && data.name) map[data.slug] = data.name;
  }
  return map;
}

const cities = loadSlugNameMap("cities");
const services = loadSlugNameMap("services");

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "lead-meta.json"), JSON.stringify({ cities, services }));

console.log(`generate-lead-meta: ${Object.keys(cities).length} cities, ${Object.keys(services).length} services`);
