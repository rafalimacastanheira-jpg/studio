"use client";

import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import MovieCard from "@/components/movie-card";
import { TITLES_DATA } from "@/lib/data";

function SearchResults() {
  const searchParams = useSearchParams();
  const rawQuery = searchParams.get("q") || "";
  const query = rawQuery.trim().toLowerCase();

  const results = useMemo(() => {
    if (!query) return [];

    return TITLES_DATA.filter((title) => {
      const matchesName = title.name.toLowerCase().includes(query);
      const matchesSynopsis = title.synopsis.toLowerCase().includes(query);
      const matchesGenres = title.genres.some((genre) =>
        genre.toLowerCase().includes(query)
      );

      return matchesName || matchesSynopsis || matchesGenres;
    });
  }, [query]);

  return (
    <div className="space-y-8">
      <section className="space-y-2">
        <h1 className="font-headline text-3xl font-bold">Pesquisa</h1>
        <p className="text-muted-foreground">
          {query
            ? `Resultados para: "${rawQuery}"`
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
          Não foram encontrados resultados para "{rawQuery}".
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="py-10 text-center text-muted-foreground">
          A carregar pesquisa...
        </div>
      }
    >
      <SearchResults />
    </Suspense>
  );
}
