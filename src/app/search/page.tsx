"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import MovieCard from "@/components/movie-card";
import { TITLES_DATA } from "@/lib/data";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = (searchParams.get("q") || "").trim().toLowerCase();

  const results = useMemo(() => {
    if (!query) return [];

    return TITLES_DATA.filter((title) => {
      const inName = title.name.toLowerCase().includes(query);
      const inSynopsis = title.synopsis.toLowerCase().includes(query);
      const inGenres = title.genres.some((genre) =>
        genre.toLowerCase().includes(query)
      );

      return inName || inSynopsis || inGenres;
    });
  }, [query]);

  return (
    <div className="space-y-8">
      <section className="space-y-2">
        <h1 className="font-headline text-3xl font-bold">Pesquisa</h1>
        <p className="text-muted-foreground">
          {query
            ? `Resultados para: "${searchParams.get("q")}"`
            : "Escreve algo na barra de pesquisa para procurar filmes e séries."}
        </p>
      </section>

      {!query ? (
        <div className="rounded-lg border p-8 text-center text-muted-foreground">
          Ainda não pesquisaste nada.
        </div>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {results.map((title) => (
            <MovieCard key={title.id} title={title} />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border p-8 text-center text-muted-foreground">
          Não foram encontrados resultados para "{searchParams.get("q")}".
        </div>
      )}
    </div>
  );
}



