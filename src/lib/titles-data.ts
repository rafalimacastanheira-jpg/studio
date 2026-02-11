import type { Title } from '@/lib/definitions';

/**
 * Dataset principal de títulos.
 * Os slugs devem ser únicos.
 * Os posterUrl devem ser os URLs finais da imagem.
 */
export const ORIGINAL_TITLES_DATA: Title[] = [
  {
    id: 1,
    slug: "interstellar",
    name: "Interstellar",
    year: 2014,
    type: "movie",
    synopsis: "Exploradores viajam por um buraco de minhoca para salvar a humanidade.",
    genres: ["Ficção Científica", "Drama"],
    posterUrl: "https://image.tmdb.org/t/p/w500/nBNZadXqJSdt05SHLqgT0HuC5Gm.jpg",
    imageHint: "space wormhole"
  },
  {
    id: 2,
    slug: 'breaking-bad',
    name: "Breaking Bad",
    year: 2008,
    type: "series",
    synopsis: "Professor de química começa a produzir metanfetamina.",
    genres: ["Drama", "Crime"],
    posterUrl: "https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg",
    imageHint: 'desert RV'
  },
  {
    id: 3,
    slug: 'the-matrix',
    name: "The Matrix",
    year: 1999,
    type: "movie",
    synopsis: "Um hacker descobre a verdade sobre a realidade.",
    genres: ["Ação", "Ficção Científica"],
    posterUrl: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    imageHint: 'green code'
  },
  {
    id: 4,
    slug: 'parasita',
    name: "Parasita",
    year: 2019,
    type: "movie",
    synopsis: "Família pobre infiltra-se na casa de uma família rica.",
    genres: ["Drama", "Thriller"],
    posterUrl: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    imageHint: 'family portrait'
  },
  {
    id: 5,
    slug: 'the-lord-of-the-rings',
    name: "The Lord of the Rings",
    year: 2001,
    type: "movie",
    synopsis: "Um hobbit parte numa jornada para destruir um anel poderoso.",
    genres: ["Fantasia", "Aventura"],
    posterUrl: "https://image.tmdb.org/t/p/w500/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg",
    imageHint: 'fantasy ring'
  },
  {
    id: 6,
    slug: 'pulp-fiction',
    name: "Pulp Fiction",
    year: 1994,
    type: "movie",
    synopsis: "Histórias interligadas do submundo do crime.",
    genres: ["Crime", "Drama"],
    posterUrl: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    imageHint: 'dance scene'
  },
  {
    id: 7,
    slug: 'the-crown',
    name: "The Crown",
    year: 2016,
    type: "series",
    synopsis: "A história do reinado da Rainha Elizabeth II.",
    genres: ["Drama", "História"],
    posterUrl: "https://image.tmdb.org/t/p/w500/1M876KPjulVwppEpldhdc8V4o68.jpg",
    imageHint: 'royal crown'
  },
  {
    id: 8,
    slug: 'the-lion-king',
    name: "The Lion King",
    year: 1994,
    type: "movie",
    synopsis: "Um jovem leão foge após a morte do pai.",
    genres: ["Animação", "Aventura"],
    posterUrl: "https://image.tmdb.org/t/p/w500/sKCr78MXSLixwmZ8DyJLrpMsd15.jpg",
    imageHint: 'savannah sunrise'
  }
];
