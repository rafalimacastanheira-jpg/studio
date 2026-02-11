import type { Title } from '@/lib/definitions';

function createSlug(name: string): string {
    return name
        .toLowerCase()
        .replace(/'/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

/* ===============================
   GERADOR DE CAPA AUTOMÁTICA
   (Nunca fica sem imagem)
================================= */

function generatePoster(title: string, id: number) {
  return `https://picsum.photos/seed/${encodeURIComponent(title + id)}/500/750`
}

/* ===============================
   GERADOR DE 120 FILMES/SÉRIES
================================= */

const genresList = [
  "Drama",
  "Ação",
  "Comédia",
  "Thriller",
  "Ficção Científica",
  "Romance",
  "Terror",
  "Aventura"
];

function randomGenre() {
  return genresList[Math.floor(Math.random() * genresList.length)]
}

export const ORIGINAL_TITLES_DATA: Title[] = Array.from({ length: 120 }, (_, i) => {
  const id = i + 1;
  const isMovie = id % 2 === 0;

  const name = isMovie
    ? `Filme Exemplo ${id}`
    : `Série Exemplo ${id}`;

  return {
    id,
    name,
    slug: createSlug(name),
    year: 1990 + (id % 30),
    synopsis: `Sinopse do ${name}. Esta é uma descrição automática para demonstração do projeto.`,
    genres: [randomGenre()],
    type: isMovie ? "movie" : "series",
    posterUrl: generatePoster(name, id)
  }
});

export const ALL_GENRES = [...new Set(genresList)].sort();
