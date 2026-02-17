import type { Title } from "@/lib/definitions";
import POSTERS from "./posters.json";

type SeedTitle = {
  id: number;
  name: string;
  year: number;
  type: "movie" | "series";
};

const SEED_TITLES: SeedTitle[] = [
  { id: 1, name: "Interstellar", year: 2014, type: "movie" },
  { id: 2, name: "Inception", year: 2010, type: "movie" },
  { id: 3, name: "The Matrix", year: 1999, type: "movie" },
  { id: 4, name: "Parasite", year: 2019, type: "movie" },
  { id: 5, name: "The Dark Knight", year: 2008, type: "movie" },
  { id: 6, name: "Pulp Fiction", year: 1994, type: "movie" },
  { id: 51, name: "Breaking Bad", year: 2008, type: "series" },
  { id: 100, name: "Loki", year: 2021, type: "series" }
];

function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['’.:()]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const ORIGINAL_TITLES_DATA: Title[] = SEED_TITLES.map((t) => {
  const slug = slugify(t.name);

  return {
    ...t,
    slug,
    synopsis: `Sinopse de ${t.name}.`,
    genres: ["Drama"],
    posterUrl:
      (POSTERS as Record<string, string>)[slug] ??
      "https://placehold.co/500x750?text=Sem+Capa"
  };
});

export const ALL_GENRES = ["Drama"];
