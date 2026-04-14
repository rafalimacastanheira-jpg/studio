"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import MovieCard from "@/components/movie-card";
import { TITLES_DATA } from "@/lib/data";
import { Button } from "@/components/ui/button";

export default function Home() {
  const featuredTitles = useMemo(() => TITLES_DATA.slice(0, 5), []);
  const topMovies = useMemo(
    () => TITLES_DATA.filter((item) => item.type === "movie").slice(0, 6),
    []
  );
  const topSeries = useMemo(
    () => TITLES_DATA.filter((item) => item.type === "series").slice(0, 6),
    []
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (featuredTitles.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredTitles.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [featuredTitles]);

  const featured = featuredTitles[currentIndex];

  return (
    <div className="space-y-14">
      {featured && (
        <section className="relative overflow-hidden rounded-2xl border bg-card">
          <div className="grid gap-8 p-6 md:grid-cols-2 md:p-10">
            <div className="flex flex-col justify-center space-y-5">
              <span className="w-fit rounded-full bg-primary/15 px-3 py-1 text-sm font-medium text-primary">
                Destaque da semana
              </span>

              <h1 className="font-headline text-4xl font-bold md:text-5xl">
                {featured.name}
              </h1>

              <p className="text-muted-foreground">
                {featured.type === "movie" ? "Filme" : "Série"} • {featured.year}
              </p>
              <p className="line-clamp-4 text-base text-muted-foreground">
                {featured.synopsis}
              </p>

              <div className="flex flex-wrap gap-2">
                {featured.genres.map((genre) => (
                  <span
                    key={genre}
                    className="rounded-full bg-secondary px-3 py-1 text-sm"
                  >
                    {genre}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <Button asChild>
                  <Link href={`/title/${featured.slug}`}>Ver detalhes</Link>
                </Button>

                <Button asChild variant="secondary">
                  <Link href="/browse">Explorar catálogo</Link>
                </Button>
              </div>

              <div className="flex gap-2 pt-2">
                {featuredTitles.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2.5 w-2.5 rounded-full transition ${
                      currentIndex === index
                        ? "bg-primary"
                        : "bg-muted-foreground/30"
                    }`}
                    aria-label={`Ir para destaque ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center">
              <img
                src={featured.posterUrl}
                alt={`Poster de ${featured.name}`}
                className="h-auto max-h-[520px] w-full max-w-sm rounded-2xl object-cover shadow-xl"
              />
            </div>
          </div>
        </section>
      )}

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-headline text-2xl font-bold">Filmes em destaque</h2>
          <Link href="/browse" className="text-sm text-primary hover:underline">
            Ver mais
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {topMovies.map((title) => (
            <MovieCard key={title.id} title={title} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-headline text-2xl font-bold">Séries em destaque</h2>
          <Link href="/browse" className="text-sm text-primary hover:underline">
            Ver mais
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {topSeries.map((title) => (
            <MovieCard key={title.id} title={title} />
          ))}
        </div>
      </section>
 
    </div>
  );
}
