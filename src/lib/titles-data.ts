import type { Title } from "@/lib/definitions";
import SEED from "@/lib/seed-titles.json";
import POSTERS from "@/lib/posters.json";

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
  "Musical"
];

function getRandomGenres(): string[] {
  const num = Math.floor(Math.random() * 2) + 1; // 1 ou 2
  const shuffled = [...genresList].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
}

const postersMap = POSTERS as Record<string, string>;

export const ORIGINAL_TITLES_DATA: Title[] = (SEED as SeedTitle[]).map((t) => {
  const slug = slugify(t.name);

  return {
    ...t,
    slug,
    synopsis: `Esta é uma sinopse de exemplo para ${t.name}, um aclamado ${
      t.type === "movie" ? "filme" : "série"
    } de ${t.year}.`,
    genres: getRandomGenres(),
    posterUrl: postersMap[slug] ?? "https://placehold.co/500x750?text=Sem+Capa"
  };
});

export const ALL_GENRES = Array.from(
  new Set(ORIGINAL_TITLES_DATA.flatMap((t) => t.genres))
).sort();
