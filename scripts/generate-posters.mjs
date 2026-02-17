import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const ROOT = process.cwd();

const SEED_PATH = path.join(ROOT, "src", "lib", "seed-titles.json");
const OUT_PATH = path.join(ROOT, "src", "lib", "posters.json");

const TMDB_KEY = process.env.TMDB_API_KEY || process.env.NEXT_PUBLIC_TMDB_API_KEY;

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
  const isMovie = type === "movie";
  const endpoint = isMovie ? "search/movie" : "search/tv";
  const query = new URLSearchParams({
    api_key: TMDB_KEY,
    query: name,
    include_adult: "false"
  });

  // ajuda muito na precisão
  if (isMovie && year) query.set("year", String(year));
  if (!isMovie && year) query.set("first_air_date_year", String(year));

  const url = `https://api.themoviedb.org/3/${endpoint}?${query.toString()}`;
  const res = await fetch(url);

  if (!res.ok) return null;

  const data = await res.json();
  const first = data?.results?.[0];
  if (!first?.poster_path) return null;

  return `https://image.tmdb.org/t/p/w500${first.poster_path}`;
}

async function main() {
  if (!TMDB_KEY) {
    console.error("❌ Falta TMDB_API_KEY no ambiente.");
    process.exit(1);
  }

  const force = process.argv.includes("--force");

  const seedRaw = await fs.readFile(SEED_PATH, "utf8");
  const seed = JSON.parse(seedRaw);

  let existing = {};
  try {
    const existingRaw = await fs.readFile(OUT_PATH, "utf8");
    existing = JSON.parse(existingRaw);
  } catch {
    existing = {};
  }

  let newCount = 0;
  let already = 0;
  let missing = 0;

  const posters = { ...existing };

  for (const item of seed) {
    const slug = slugify(item.name);

    if (!force && posters[slug]) {
      already++;
      continue;
    }

    const posterUrl = await tmdbSearch(item);

    if (posterUrl) {
      posters[slug] = posterUrl;
      newCount++;
    } else {
      missing++;
      // não grava placeholder aqui (deixa o app usar fallback)
      if (force) delete posters[slug];
    }

    // evita estourar limite
    await new Promise((r) => setTimeout(r, 250));
  }

  await fs.writeFile(OUT_PATH, JSON.stringify(posters, null, 2), "utf8");

  console.log("\n=== FEITO ===");
  console.log("Capas novas:", newCount);
  console.log("Já existiam:", already);
  console.log("Sem capa:", missing);
  console.log("Arquivo atualizado:", OUT_PATH);
  if (force) console.log("Modo: FORCE (sobrescrevendo)");
}

main().catch((e) => {
  console.error("❌ Erro:", e);
  process.exit(1);
});
