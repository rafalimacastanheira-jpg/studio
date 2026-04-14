"use client";

import { useMemo, useState } from "react";
import MovieCard from "@/components/movie-card";
import { TITLES_DATA } from "@/lib/data";

type ContentType = "all" | "movie" | "series";

export default function HomePage() {
  const [selectedType, setSelectedType] = useState<ContentType>("all");
  const [selectedGenre, setSelectedGenre] = useState<string>("Todos");

  const titlesByType = useMemo(() => {
    if (selectedType === "all") return TITLES_DATA;
    return TITLES_DATA.filter((title) => title.type === selectedType);
  }, [selectedType]);

  const availableGenres = useMemo(() => {
    const genresSet = new Set<string>();

    titlesByType.forEach((title) => {
      title.genres.forEach((genre) => genresSet.add(genre));
    });

    return ["Todos", ...Array.from(genresSet).sort((a, b) => a.localeCompare(b))];
  }, [titlesByType]);

  const filteredTitles = useMemo(() => {
    return titlesByType.filter((title) => {
      const matchesGenre =
        selectedGenre === "Todos" || title.genres.includes(selectedGenre);

      return matchesGenre;
    });
  }, [titlesByType, selectedGenre]);

  function handleTypeChange(type: ContentType) {
    setSelectedType(type);
    setSelectedGenre("Todos");
  }

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h1 className="font-headline text-3xl font-bold">Explorar Títulos</h1>
        <p className="text-muted-foreground">
          Filtra por tipo de conteúdo e género.
        </p>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => handleTypeChange("all")}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              selectedType === "all"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground"
            }`}
          >
            Todos
          </button>

          <button
            onClick={() => handleTypeChange("movie")}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              selectedType === "movie"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground"
            }`}
          >
            Filmes
          </button>

          <button
            onClick={() => handleTypeChange("series")}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              selectedType === "series"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground"
            }`}
          >
            Séries
          </button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold">Géneros</h2>

        <div className="flex flex-wrap gap-3">
          {availableGenres.map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                selectedGenre === genre
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <p className="text-sm text-muted-foreground">
          {filteredTitles.length} título(s) encontrado(s)
        </p>

        {filteredTitles.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
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
