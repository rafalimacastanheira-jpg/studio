"use client";


import Link from "next/link";
import { TITLES_DATA } from "@/lib/data";
import MovieCard from "@/components/movie-card";

import { Button } from "@/components/ui/button";
import ImageWithFallback from "@/components/image-with-fallback";

export default function Home() {
  const featuredMovies = TITLES_DATA.filter((item) => item.type === "movie").slice(0, 6);
  const featuredSeries = TITLES_DATA.filter((item) => item.type === "series").slice(0, 6);
  const heroTitle = TITLES_DATA.find((item) => item.slug === "interstellar") || TITLES_DATA[0];

  return (
    <div className="space-y-14">
      <section className="relative overflow-hidden rounded-3xl border bg-card/40">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_420px] p-8 md:p-10">
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
                HelpFlix
              </p>

              <h1 className="font-headline text-4xl font-bold leading-tight md:text-6xl">
                Descobre, avalia e comenta os melhores filmes e séries
              </h1>

              <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
                Uma plataforma inspirada no IMDb para explorares títulos,
                veres trailers, leres comentários, dares notas e encontrares
                o teu próximo filme ou série favorita.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/browse">Explorar catálogo</Link>
              </Button>

              <Button asChild variant="secondary" size="lg">
                <Link href={`/title/${heroTitle.slug}`}>Ver destaque</Link>
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 pt-2 text-sm text-muted-foreground">
              <span className="rounded-full bg-secondary px-3 py-1">Trailers</span>
              <span className="rounded-full bg-secondary px-3 py-1">Comentários</span>
              <span className="rounded-full bg-secondary px-3 py-1">Avaliações</span>
              <span className="rounded-full bg-secondary px-3 py-1">Filmes e séries</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[420px]">
            <div className="relative aspect-[2/3] overflow-hidden rounded-2xl border shadow-2xl">
              <ImageWithFallback
                src={heroTitle.posterUrl}
                alt={heroTitle.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-headline text-3xl font-bold">Filmes em destaque</h2>
          <Link href="/browse" className="text-sm font-semibold text-primary hover:underline">
            Ver mais
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {featuredMovies.map((title) => (
            <MovieCard key={title.id} title={title} />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-headline text-3xl font-bold">Séries em destaque</h2>
          <Link href="/browse" className="text-sm font-semibold text-primary hover:underline">
            Ver mais
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {featuredSeries.map((title) => (
            <MovieCard key={title.id} title={title} />
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border bg-card/50 p-6">
          <h3 className="mb-2 text-xl font-bold">Explora por género</h3>
          <p className="text-sm text-muted-foreground">
            Encontra filmes e séries por drama, ação, comédia, romance e muito mais.
          </p>
        </div>

        <div className="rounded-2xl border bg-card/50 p-6">
          <h3 className="mb-2 text-xl font-bold">Avalia os títulos</h3>
          <p className="text-sm text-muted-foreground">
            Dá notas aos teus filmes e séries preferidos e acompanha as avaliações.
          </p>
        </div>

        <div className="rounded-2xl border bg-card/50 p-6">
          <h3 className="mb-2 text-xl font-bold">Partilha opiniões</h3>
          <p className="text-sm text-muted-foreground">
            Comenta cada título e vê o que outros utilizadores acharam.
          </p>
        </div>
      </section>
    </div>
  );
}
