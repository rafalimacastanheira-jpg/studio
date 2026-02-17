import type { Title } from "@/lib/definitions";
import POSTERS from "./posters.json";
import { SEED_TITLES } from "./seed-titles";

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
  "Drama", "Ação", "Comédia", "Thriller", "Ficção Científica", "Romance",
  "Terror", "Aventura", "Crime", "Fantasia", "História", "Animação",
  "Mistério", "Família", "Guerra", "Musical"
];

function getRandomGenres(): string[] {
  const num = Math.floor(Math.random() * 2) + 1;
  const shuffled = [...genresList].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
}

export const ORIGINAL_TITLES_DATA: Title[] = SEED_TITLES.map((t) => {
  const slug = slugify(t.name);

  return {
    ...t,
    slug,
    synopsis: `Esta é uma sinopse de exemplo para ${t.name}, um aclamado ${t.type === "movie" ? "filme" : "série"} de ${t.year}.`,
    genres: getRandomGenres(),
    posterUrl:
      (POSTERS as Record<string, string>)[slug] ??
      "https://placehold.co/500x750?text=Sem+Capa",
  };
});

export const ALL_GENRES = [...new Set(ORIGINAL_TITLES_DATA.flatMap((t) => t.genres))].sort();
