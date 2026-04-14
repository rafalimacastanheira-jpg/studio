"use client";

import Link from "next/link";
import MovieCard from "@/components/movie-card";
import { TITLES_DATA } from "@/lib/data";

export default function HomePage() {
  const featuredTitles = TITLES_DATA.slice(0, 6);
  const movieCount = TITLES_DATA.filter((item) => item.type === "movie").length;
  const seriesCount = TITLES_DATA.filter((item) => item.type === "series").length;

  const topGenres = Array.from(
    new Set(TITLES_DATA.flatMap((item) => item.genres))
  ).slice(0, 8);

  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-6 py-12 md:px-10 md:py-16">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-primary blur-3xl" />
          <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-orange-500 blur-3xl" />
        </div>

        <div className="relative grid items-center gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            <span className="inline-flex rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
              Plataforma de filmes e séries
            </span>

            <div className="space-y-4">
              <h1 className="font-headline text-4xl font-bold leading-tight md:text-6xl">
                Descobre, avalia e organiza os teus títulos favoritos
              </h1>

              <p className="max-w-2xl text-base text-slate-300 md:text-lg">
                O HelpFlix permite explorar filmes e séries, filtrar por género,
                criar conta, dar avaliações e acompanhar o teu perfil de forma
                simples e moderna.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/browse"
                className="rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:opacity-90"
              >
                Explorar catálogo
              </Link>

              <Link
                href="/register"
                className="rounded-full border border-slate-600 bg-slate-800/70 px-6 py-3 font-semibold transition hover:bg-slate-700"
              >
                Criar conta
              </Link>
            </div>

            <div className="grid max-w-2xl grid-cols-2 gap-4 pt-4 md:grid-cols-4">
              <div className="rounded-2xl border bg-slate-900/70 p-4">
                <p className="text-2xl font-bold">{TITLES_DATA.length}</p>
                <p className="text-sm text-muted-foreground">Títulos</p>
              </div>

              <div className="rounded-2xl border bg-slate-900/70 p-4">
                <p className="text-2xl font-bold">{movieCount}</p>
                <p className="text-sm text-muted-foreground">Filmes</p>
              </div>

              <div className="rounded-2xl border bg-slate-900/70 p-4">
                <p className="text-2xl font-bold">{seriesCount}</p>
                <p className="text-sm text-muted-foreground">Séries</p>
              </div>

              <div className="rounded-2xl border bg-slate-900/70 p-4">
                <p className="text-2xl font-bold">{topGenres.length}+</p>
                <p className="text-sm text-muted-foreground">Géneros</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {featuredTitles.map((title) => (
              <div key={title.id} className="scale-100 transition hover:scale-[1.02]">
                <MovieCard title={title} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-headline text-3xl font-bold">Títulos em destaque</h2>
            <p className="text-muted-foreground">
              Alguns dos títulos mais interessantes disponíveis no catálogo.
            </p>
          </div>

          <Link
            href="/browse"
            className="text-sm font-semibold text-primary hover:underline"
          >
            Ver catálogo completo
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {featuredTitles.map((title) => (
            <MovieCard key={title.id} title={title} />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div>
          <h2 className="font-headline text-3xl font-bold">Explora por género</h2>
          <p className="text-muted-foreground">
            Encontra rapidamente o estilo de conteúdo que queres ver.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {topGenres.map((genre) => (
            <Link
              key={genre}
              href="/browse"
              className="rounded-full bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition hover:bg-primary hover:text-primary-foreground"
            >
              {genre}
            </Link>
          ))}
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl border bg-card p-6">
          <h3 className="mb-3 text-xl font-bold">Catálogo organizado</h3>
          <p className="text-muted-foreground">
            Separa filmes e séries, filtra por género e encontra títulos com mais rapidez.
          </p>
        </div>

        <div className="rounded-3xl border bg-card p-6">
          <h3 className="mb-3 text-xl font-bold">Conta pessoal</h3>
          <p className="text-muted-foreground">
            Cria a tua conta, entra no sistema e acompanha o teu perfil dentro da plataforma.
          </p>
        </div>

        <div className="rounded-3xl border bg-card p-6">
          <h3 className="mb-3 text-xl font-bold">Avaliações e interação</h3>
          <p className="text-muted-foreground">
            Dá notas aos títulos, consulta médias e torna a experiência mais interativa.
          </p>
        </div>
      </section>

      <section className="rounded-3xl border bg-card px-6 py-10 text-center md:px-10">
        <h2 className="font-headline text-3xl font-bold">
          Pronto para começar?
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          Cria uma conta ou explora já o catálogo e descobre novas recomendações.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/register"
            className="rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:opacity-90"
          >
            Registar
          </Link>

          <Link
            href="/browse"
            className="rounded-full border px-6 py-3 font-semibold transition hover:bg-secondary"
          >
            Ver catálogo
          </Link>
        </div>
      </section>
    </div>
  );
}
