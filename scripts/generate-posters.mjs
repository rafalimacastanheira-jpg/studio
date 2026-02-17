import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const SEED_PATH = path.join(ROOT, "src", "lib", "seed-titles.json");
const OUT_PATH = path.join(ROOT, "src", "lib", "posters.json");

const API_KEY = process.env.TMDB_API_KEY;
if (!API_KEY) {
  console.error("❌ Falta TMDB_API_KEY no ambiente (process.env.TMDB_API_KEY).");
  process.exit(1);
}

function slugify(name) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['’.:()]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function safeReadJson(filePath, fallback) {
  try {
    const txt = await fs.readFile(filePath, "utf8");
    return JSON.parse(txt);
  } catch {
    return fallback;
  }
}

async function tmdbSearch({ name, year, type }) {
  // TMDB: movie => /search/movie, series => /search/tv
  const endpoint =
    type === "series"
      ? "https://api.themoviedb.org/3/search/tv"
      : "https://api.themoviedb.org/3/search/movie";

  const params = new URLSearchParams({
    api_key: API_KEY,
    query: name,
    include_adult: "false",
    language: "en-US",
  });

  // ano ajuda MUITO a bater certo
  if (type === "movie" && year) params.set("year", String(year));
  if (type === "series" && year) params.set("first_air_date_year", String(year));

  const url = `${endpoint}?${params.toString()}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`TMDB error ${res.status}`);
  const data = await res.json();

  const first = data?.results?.[0];
  const posterPath = first?.poster_path;
  if (!posterPath) return null;

  // w500 é bom pro card
  return `https://image.tmdb.org/t/p/w500${posterPath}`;
}

async function main() {
  const force = process.argv.includes("--force");

  const seed = await safeReadJson(SEED_PATH, []);
  const existing = await safeReadJson(OUT_PATH, {});

  const out = force ? {} : { ...existing };

  let added = 0;
  let already = 0;
  let missing = 0;

  for (const t of seed) {
    const slug = slugify(t.name);

    if (!force && out[slug]) {
      already++;
      continue;
    }

    try {
      const posterUrl = await tmdbSearch(t);
      if (posterUrl) {
        out[slug] = posterUrl;
        added++;
      } else {
        missing++;
      }
    } catch {
      missing++;
    }
  }

  await fs.writeFile(OUT_PATH, JSON.stringify(out, null, 2), "utf8");

  console.log("\n=== FEITO ===");
  console.log("Capas novas:", added);
  console.log("Já existiam:", already);
  console.log("Sem capa:", missing);
  console.log("Arquivo atualizado:", OUT_PATH);
  if (force) console.log("Modo: FORCE (sobrescrevendo)");
}

main().catch((e) => {
  console.error("❌ Erro:", e);
  process.exit(1);
});
