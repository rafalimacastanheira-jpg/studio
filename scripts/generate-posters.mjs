import fs from "fs";
import path from "path";

const TMDB_API_KEY = process.env.TMDB_API_KEY;

if (!TMDB_API_KEY) {
  console.error("✘ Falta TMDB_API_KEY");
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

async function fetchPosterUrl({ name, year, type }) {
  const endpoint =
    type === "series"
      ? "https://api.themoviedb.org/3/search/tv"
      : "https://api.themoviedb.org/3/search/movie";

  const url = new URL(endpoint);
  url.searchParams.set("api_key", TMDB_API_KEY);
  url.searchParams.set("query", name);

  // Ajuda MUITO o TMDB a acertar
  if (year && type === "movie") url.searchParams.set("year", String(year));
  if (year && type === "series") url.searchParams.set("first_air_date_year", String(year));

  const res = await fetch(url);
  const json = await res.json();

  const item = json?.results?.[0];
  if (!item?.poster_path) return null;

  return `https://image.tmdb.org/t/p/w500${item.poster_path}`;
}

async function main() {
  const seedPath = path.join(process.cwd(), "src", "lib", "seed-titles.json");
  const postersPath = path.join(process.cwd(), "src", "lib", "posters.json");

  if (!fs.existsSync(seedPath)) {
    console.error("✘ Não achei:", seedPath);
    process.exit(1);
  }

  const seedTitles = JSON.parse(fs.readFileSync(seedPath, "utf-8"));

  let posters = {};
  if (fs.existsSync(postersPath)) {
    posters = JSON.parse(fs.readFileSync(postersPath, "utf-8"));
  }

  let added = 0;
  let missing = 0;
  let skipped = 0;

  for (const t of seedTitles) {
    const slug = slugify(t.name);

    if (posters[slug]) {
      skipped++;
      continue;
    }

    const posterUrl = await fetchPosterUrl(t);

    if (posterUrl) {
      posters[slug] = posterUrl;
      added++;
      console.log("✓", slug);
    } else {
      missing++;
      console.log("– sem poster:", slug);
    }
  }

  fs.writeFileSync(postersPath, JSON.stringify(posters, null, 2), "utf-8");

  console.log("\n=== FEITO ===");
  console.log("Capas novas:", added);
  console.log("Já existiam:", skipped);
  console.log("Sem capa:", missing);
  console.log("Arquivo atualizado:", postersPath);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
