import type { Title } from "@/lib/definitions";

/* =========================
   TMDB BASE
========================= */
const TMDB = "https://image.tmdb.org/t/p/w500";

/* =========================
   POSTERS (slug -> tmdb path)
========================= */
const POSTERS: Record<string, string> = {
  // FILMES
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
  "schindlers-list": "/c8Ass7acuOe4za6DhSattE359gr.jpg",
  se7en: "/69Sns8WoET6CfaYlIkHbla4l7nC.jpg",
  "the-green-mile": "/velWPhVMQeQKcxggNEU8YmIo52R.jpg",
  whiplash: "/oPxnRhyAIzJKGUEdSiwTJQBa0sa.jpg",
  "the-prestige": "/bdN3gXuIZYaJP7ftKK2sU0nPtEA.jpg",
  django-unchained: "/7oWY8VDWW7thTzWh3OKYRkWUlD5.jpg",
  titanic: "/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",
  avatar: "/jRXYjXNq0Cs2TcJjLkki24MLp7u.jpg",
  joker: "/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",

  // SÉRIES
  "breaking-bad": "/3xnWaLQjelJDDF7LT1WBo6f4BRe.jpg",
  "better-call-saul": "/fC2HDm5t0kHl7mTm7jxMR31b7by.jpg",
  "game-of-thrones": "/7WUHnWGx5OO145IRxPDUkQSh4C7.jpg",
  "stranger-things": "/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg",
  "the-crown": "/1M876KPjulVwppEpldhdc8V4o68.jpg",
  chernobyl: "/hlLXt2tOPT6RRnjiUmoxyG1LTFi.jpg",
  "the-mandalorian": "/sWgBv7LV2PRoQgkxwlibdGXKz1S.jpg",
  "the-boys": "/mY7SeH4HFFxW1hiI6cWuwCRKptN.jpg",
  "peaky-blinders": "/bGZn5RVzMMXju4ev7xbl1aLdXqq.jpg",
  loki: "/voHUmluYmKyleFkTu3lOXQG702u.jpg",
};

/* =========================
   SEED TITLES
========================= */
export const SEED_TITLES = [
  { id: 1, name: "Interstellar", year: 2014, type: "movie" },
  { id: 2, name: "Inception", year: 2010, type: "movie" },
  { id: 3, name: "The Matrix", year: 1999, type: "movie" },
  { id: 4, name: "Parasite", year: 2019, type: "movie" },
  { id: 5, name: "The Dark Knight", year: 2008, type: "movie" },
  { id: 6, name: "Pulp Fiction", year: 1994, type: "movie" },
  { id: 7, name: "Fight Club", year: 1999, type: "movie" },
  { id: 8, name: "Forrest Gump", year: 1994, type: "movie" },
  { id: 9, name: "The Godfather", year: 1972, type: "movie" },
  { id: 10, name: "The Godfather Part II", year: 1974, type: "movie" },

  { id: 51, name: "Breaking Bad", year: 2008, type: "series" },
  { id: 52, name: "Better Call Saul", year: 2015, type: "series" },
  { id: 53, name: "Game of Thrones", year: 2011, type: "series" },
  { id: 54, name: "Stranger Things", year: 2016, type: "series" },
  { id: 55, name: "The Crown", year: 2016, type: "series" },
  { id: 56, name: "Chernobyl", year: 2019, type: "series" },
  { id: 57, name: "The Mandalorian", year: 2019, type: "series" },
  { id: 58, name: "The Boys", year: 2019, type: "series" },
  { id: 59, name: "Peaky Blinders", year: 2013, type: "series" },
  { id: 100, name: "Loki", year: 2021, type: "series" },
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
   FINAL DATA
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

export const ALL_GENRES = ["Drama", "Ação", "Comédia", "Thriller"];
