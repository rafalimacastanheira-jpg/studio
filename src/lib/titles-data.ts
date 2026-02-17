import type { Title } from "@/lib/definitions";

/* =========================
   BASE TMDB (CDN)
========================= */
const TMDB = "https://image.tmdb.org/t/p/w500";

/* =========================
   POSTERS FIXOS (slug → path)
========================= */
const POSTERS: Record<string, string> = {
  interstellar: "/gEU2QniE6E77NI6lCU6MxNBvIx.jpg",
  inception: "/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
  "the-matrix": "/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
  parasite: "/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
  "the-dark-knight": "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
  "pulp-fiction": "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
  "fight-club": "/bptfVGEQuv6vDTIMVCHjJ9Dz8PX.jpg",
  "forrest-gump": "/saHP97rTPS5eLmrLQEcANmKrsFl.jpg",
  "the-godfather": "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
  "the-godfather-part-ii": "/hek3koDUyRQk7FIhPXsa6mT2Zc3.jpg",
  gladiator: "/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg",
  "the-shawshank-redemption": "/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
  joker: "/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
  avatar: "/jRXYjXNq0Cs2TcJjLkki24MLp7u.jpg",
  titanic: "/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",

  // Séries
  "breaking-bad": "/3xnWaLQjelJDDF7LT1WBo6f4BRe.jpg",
  "better-call-saul": "/fC2HDm5t0kHl7mTm7jxMR31b7by.jpg",
  "game-of-thrones": "/7WUHnWGx5OO145IRxPDUkQSh4C7.jpg",
  "stranger-things": "/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg",
  loki: "/voHUmluYmKyleFkTu3lOXQG702u.jpg",
};

/* =========================
   TITLES BASE
========================= */
const SEED_TITLES = [
  { id: 1, name: "Interstellar", year: 2014, type: "movie" },
  { id: 2, name: "Inception", year: 2010, type: "movie" },
  { id: 3, name: "The Matrix", year: 1999, type: "movie" },
  { id: 4, name: "Parasite", year: 2019, type: "movie" },
  { id: 5, name: "The Dark Knight", year: 2008, type: "movie" },
  { id: 6, name: "Pulp Fiction", year: 1994, type: "movie" },

  { id: 51, name: "Breaking Bad", year: 2008, type: "series" },
  { id: 52, name: "Better Call Saul", year: 2015, type: "series" },
  { id: 53, name: "Game of Thrones", year: 2011, type: "series" },
  { id: 54, name: "Stranger Things", year: 2016, type: "series" },
  { id: 55, name: "Loki", year: 2021, type: "series" },
];

/* =========================
   HELPERS
========================= */
function slugify(name: string) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['’.:()]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function poster(slug: string) {
  return POSTERS[slug]
    ? `${TMDB}${POSTERS[slug]}`
    : "https://placehold.co/500x750?text=Sem+Capa";
}

/* =========================
   EXPORT FINAL
========================= */
export const ORIGINAL_TITLES_DATA: Title[] = SEED_TITLES.map((t) => {
  const slug = slugify(t.name);

  return {
    ...t,
    slug,
    synopsis: `Sinopse de ${t.name}.`,
    genres: ["Drama"],
    posterUrl: poster(slug),
  };
});

export const ALL_GENRES = ["Drama", "Ação", "Crime", "Thriller"];
