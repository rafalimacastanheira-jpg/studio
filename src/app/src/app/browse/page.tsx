"use client";

import { useMemo, useState } from "react";
import { TITLES_DATA } from "@/lib/data";
import MovieCard from "@/components/movie-card";

type ContentType = "all" | "movie" | "series";

export default function BrowsePage() {
  const [selectedType, setSelectedType] = useState<ContentType>("all");
  const [selectedGenre, setSelectedGenre] = useState("Todos");

  const titlesByType = useMemo(() => {
    if (selectedType === "all") return TITLES_DATA;
    return TITLES_DATA.filter((item) => item.type === selectedType);
  }, [selectedType]);

  const genres = useMemo(() => {
    const setGenres = new Set<string>();

    titlesByType.forEach((item) => {
      item.genres.forEach((genre) => setGenres.add(genre));
    });

    return ["Todos", ...Array.from(setGenres).sort()];
  }, [titlesByType]);

  const filteredTitles = useMemo(() => {
    if (selectedGenre === "Todos") return titlesByType;

    return titlesByType.filter((item) =>
      item.genres.includes(selectedGenre)
    );
  }, [titlesByType, selectedGenre]);

  function changeType(type: ContentType) {
    setSelectedType(type);
    setSelectedGenre("Todos");
  }

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <h1 className="font-headline text-3xl font-bold">
          Explorar Títulos
        </h1>

        <p className="text-muted-foreground">
          Escolhe entre filmes, séries e géneros.
        </p>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => changeType("all")}
            className={`px-4 py-2 rounded-full ${
              selectedType === "all"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary"
            }`}
          >
            Todos
          </button>

          <button
            onClick={() => changeType("movie")}
            className={`px-4 py-2 rounded-full ${
              selectedType === "movie"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary"
            }`}
          >
            Filmes
          </button>

          <button
            onClick={() => changeType("series")}
            className={`px-4 py-2 rounded-full ${
              selectedType === "series"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary"
            }`}
          >
            Séries
          </button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">Géneros</h2>

        <div className="flex flex-wrap gap-3">
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`px-4 py-2 rounded-full ${
                selectedGenre === genre
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <p className="text-sm text-muted-foreground">
          {filteredTitles.length} título(s)
        </p>

        {filteredTitles.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {filteredTitles.map((title) => (
              <MovieCard key={title.id} title={title} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border p-8 text-center text-muted-foreground">
            Não foram encontrados títulos para este filtro.
          </div>
        )}
      </section>
    </div>
  );
}