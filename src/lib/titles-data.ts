import type { Title, CastMember } from "./definitions";
import SEED from "./seed-titles.json";
import POSTERS from "./posters.json";

export type SeedTitle = {
  id: number;
  name: string;
  year: number;
  type: "movie" | "series";
};

function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['’.:()]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const genresList = [
  "Drama",
  "Ação",
  "Comédia",
  "Thriller",
  "Ficção Científica",
  "Romance",
  "Terror",
  "Aventura",
  "Crime",
  "Fantasia",
  "História",
  "Animação",
  "Mistério",
  "Família",
  "Guerra",
  "Musical",
];

function getRandomGenres(): string[] {
  const num = Math.floor(Math.random() * 2) + 1;
  const shuffled = [...genresList].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
}

const postersMap = POSTERS as Record<string, string>;

const fallbackTrailer = "https://www.youtube.com/embed/dQw4w9WgXcQ";

const castPool: CastMember[] = [
  { name: "Leonardo DiCaprio", role: "Protagonista" },
  { name: "Morgan Freeman", role: "Mentor" },
  { name: "Scarlett Johansson", role: "Personagem principal" },
  { name: "Tom Hanks", role: "Líder" },
  { name: "Natalie Portman", role: "Personagem principal" },
  { name: "Robert De Niro", role: "Antagonista" },
  { name: "Emma Stone", role: "Protagonista" },
  { name: "Brad Pitt", role: "Personagem principal" },
  { name: "Christian Bale", role: "Herói" },
  { name: "Anne Hathaway", role: "Aliada" },
  { name: "Cillian Murphy", role: "Personagem principal" },
  { name: "Zendaya", role: "Personagem principal" },
  { name: "Joaquin Phoenix", role: "Personagem central" },
  { name: "Matt Damon", role: "Aliado" },
  { name: "Keanu Reeves", role: "Herói" },
  { name: "Jennifer Lawrence", role: "Protagonista" },
];

function getRandomCast(): CastMember[] {
  const shuffled = [...castPool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 4);
}

function getTrailerBySlug(slug: string): string {
  const trailerMap: Record<string, string> = {
    interstellar: "https://www.youtube.com/embed/zSWdZVtXT7E",
    inception: "https://www.youtube.com/embed/YoHD9XEInc0",
    "the-dark-knight": "https://www.youtube.com/embed/EXeTwQWrcwY",
    parasite: "https://www.youtube.com/embed/5xH0HfJHsaY",
    gladiator: "https://www.youtube.com/embed/owK1qxDselE",
    "fight-club": "https://www.youtube.com/embed/qtRKdVHc-cE",
    "the-matrix": "https://www.youtube.com/embed/vKQi3bBA1y8",
    "pulp-fiction": "https://www.youtube.com/embed/s7EdQ4FqbhY",
    "forrest-gump": "https://www.youtube.com/embed/bLvqoHBptjg",
    "the-godfather": "https://www.youtube.com/embed/UaVTIH8mujA",

    "breaking-bad": "https://www.youtube.com/embed/HhesaQXLuRY",
    "better-call-saul": "https://www.youtube.com/embed/HN4oydykJFc",
    "game-of-thrones": "https://www.youtube.com/embed/KPLWWIOCOOQ",
    "stranger-things": "https://www.youtube.com/embed/b9EkMc79ZSU",
    "the-crown": "https://www.youtube.com/embed/JWtnJjn6ng0",
    "chernobyl": "https://www.youtube.com/embed/s9APLXM9Ei8",
  };

  return trailerMap[slug] ?? fallbackTrailer;
}

const featuredIds = new Set([1, 2, 3, 4, 5, 6, 7, 8]);

export const ORIGINAL_TITLES_DATA: Title[] = (SEED as SeedTitle[]).map((t) => {
  const slug = slugify(t.name);

  return {
    ...t,
    slug,
    synopsis: `Esta é uma sinopse de exemplo para ${t.name}, um aclamado ${
      t.type === "movie" ? "filme" : "série"
    } de ${t.year}.`,
    genres: getRandomGenres(),
    posterUrl: postersMap[slug] ?? "https://placehold.co/500x750?text=Sem+Capa",
    trailerUrl: getTrailerBySlug(slug),
    cast: getRandomCast(),
    featured: featuredIds.has(t.id),
  };
});

export const ALL_GENRES = Array.from(
  new Set(ORIGINAL_TITLES_DATA.flatMap((t) => t.genres))
).sort();
