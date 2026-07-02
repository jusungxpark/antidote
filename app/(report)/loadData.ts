import fs from "fs";
import path from "path";

// Report data lives at the repo root:
//   data/companies/[slug].json  — per-firm layer (one file per send)
//   data/sectors/[id].json      — fixed sector scaffold
const companiesDir = path.join(process.cwd(), "data", "companies");
const sectorsDir = path.join(process.cwd(), "data", "sectors");

export function listCompanySlugs(): string[] {
  if (!fs.existsSync(companiesDir)) return [];
  return fs
    .readdirSync(companiesDir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(/\.json$/, ""));
}

export function loadCompany(slug: string): any | null {
  const file = path.join(companiesDir, `${slug}.json`);
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, "utf-8"));
}

export function loadSector(id: string): any {
  const file = path.join(sectorsDir, `${id}.json`);
  return JSON.parse(fs.readFileSync(file, "utf-8"));
}
