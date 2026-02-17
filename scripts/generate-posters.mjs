import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const FORCE = process.argv.includes("--force");

const ROOT = process.cwd();
const SEED_PATH = path.join(ROOT, "src", "lib", "seed-titles.json");
const OUT_PATH = path.join(ROOT, "src", "lib", "posters.json");

const TMDB_KEY = process.env.TMDB_API_KEY || process.env.NEXT_PUBLIC_TMDB_API_KEY;

if (!TMDB_KEY) {
  console.error("❌ Falta TMDB_API_KEY no ambiente.");
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

async function safeReadJson(file, fallback) {
  try {
    const txt = await fs.readFile(file, "utf8");
    return JSON.parse(txt);
  } catch {
    return fallback;
  }
}

async function tmdbSearch({ name, year, type }) {
  const base = "https://api.themoviedb.org/3";
  const isMovie = type === "movie";

  const url = new URL(isMovie ? `${base}/search/movie` : `${base}/search/tv`);
  url.searchParams.set("api_key", TMDB_KEY);
  url.searchParams.set("query", name);
  url.searchParams.set("include_adult", "false");
  url.searchParams.set("language", "pt-BR");

  // ano ajuda MUITO a acertar
  if (isMovie) url.searchParams.set("year", String(year));
  else url.searchParams.set("first_air_date_year", String(year));

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`TMDB search falhou: ${res.status}`);

  const data = await res.json();
  const first = data?.results?.[0];
  if (!first?.poster_path) return null;

  return `https://image.tmdb.org/t/p/w500${first.poster_path}`;
}

async function main() {
  const seed = await safeReadJson(SEED_PATH, []);
  const existing = await safeReadJson(OUT_PATH, {});

  const posters = { ...existing };

  let novos = 0;
  let jaExistiam = 0;
  let semCapa = 0;

  for (const t of seed) {
    const slug = slugify(t.name);

    if (!FORCE && posters[slug]) {
      jaExistiam++;
      continue;
    }

    try {
      const url = await tmdbSearch(t);
      if (url) {
        posters[slug] = url;
        novos++;
      } else {
        posters[slug] = "https://placehold.co/500x750?text=Sem+Capa";
        semCapa++;
      }
    } catch (err) {
      posters[slug] = "https://placehold.co/500x750?text=Sem+Capa";
      semCapa++;
      console.log(`⚠️ ${t.name} (${t.year}) -> erro: ${err.message}`);
    }

    // pequeno delay pra evitar rate limit
    await new Promise((r) => setTimeout(r, 150));
  }

  // grava ordenado
  const ordered = Object.fromEntries(Object.entries(posters).sort(([a], [b]) => a.localeCompare(b)));

  await fs.writeFile(OUT_PATH, JSON.stringify(ordered, null, 2), "utf8");

  console.log("\n=== FEITO ===");
  console.log("Capas novas:", novos);
  console.log("Já existiam:", jaExistiam);
  console.log("Sem capa:", semCapa);
  console.log("Arquivo atualizado:", OUT_PATH);
  console.log("Modo:", FORCE ? "FORCE (sobrescrevendo)" : "normal (sem sobrescrever)");
}

main().catch((e) => {
  console.error("❌ Erro:", e);
  process.exit(1);
});
