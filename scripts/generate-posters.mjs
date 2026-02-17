import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ajusta caminhos do teu projeto
const postersPath = path.join(__dirname, "..", "src", "lib", "posters.json");
const seedPath = path.join(__dirname, "..", "src", "lib", "seed-titles.ts");

// TMDB
const TMDB_API_KEY = process.env.TMDB_API_KEY || process.env.NEXT_PUBLIC_TMDB_API_KEY;

if (!TMDB_API_KEY) {
  console.error("❌ Falta TMDB_API_KEY no .env.local");
  process.exit(1);
}

// Importar SEED_TITLES do TS (jeito simples: extrair o array por regex)
const seedFile = fs.readFileSync(seedPath, "utf8");
const match = seedFile.match(/export const SEED_TITLES: SeedTitle\[] = ([\s\S]*);\s*$/m);

if (!match) {
  console.error("❌ Não consegui ler SEED_TITLES em seed-titles.ts");
  process.exit(1);
}

// Avaliar o array (transforma TS em JS básico)
const arrayText = match[1]
  .replace(/: "movie" \| "series"/g, "")
  .replace(/type: "movie" \| "series"/g, "")
  .replace(/as SeedTitle\[\]/g, "");

const SEED_TITLES = Function(`"use strict"; return ${arrayText};`)();

function slugify(name) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['’.:()]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function tmdbSearch({ name, year, type }) {
  const endpoint =
    type === "series"
      ? "https://api.themoviedb.org/3/search/tv"
      : "https://api.themoviedb.org/3/search/movie";

  const params = new URLSearchParams({
    api_key: TMDB_API_KEY,
    query: name,
    include_adult: "false",
    language: "pt-PT",
  });

  // movie: year, tv: first_air_date_year
  if (type === "movie") params.set("year", String(year));
  if (type === "series") params.set("first_air_date_year", String(year));

  const url = `${endpoint}?${params.toString()}`;
  const res = await fetch(url);

  if (!res.ok) return null;

  const data = await res.json();
  const first = data?.results?.[0];
  const posterPath = first?.poster_path;

  if (!posterPath) return null;

  return `https://image.tmdb.org/t/p/w500${posterPath}`;
}

(async () => {
  let posters = {};
  if (fs.existsSync(postersPath)) {
    try {
      posters = JSON.parse(fs.readFileSync(postersPath, "utf8"));
    } catch {
      posters = {};
    }
  }

  let ok = 0;
  let fail = 0;

  for (const t of SEED_TITLES) {
    const slug = slugify(t.name);

    // se já existe, não refaz
    if (posters[slug]) continue;

    const url = await tmdbSearch(t);
    if (url) {
      posters[slug] = url;
      ok++;
      console.log(`✅ ${slug} -> OK`);
    } else {
      fail++;
      console.log(`⚠️ ${slug} -> sem poster`);
    }
  }

  fs.writeFileSync(postersPath, JSON.stringify(posters, null, 2), "utf8");

  console.log("\n=== FEITO ===");
  console.log("Capas novas:", ok);
  console.log("Sem capa:", fail);
  console.log("Arquivo atualizado:", postersPath);
})();
