
import type { Title } from '@/lib/definitions';

/**
 * Dataset principal de títulos.
 * Os slugs e posterUrl serão gerados dinamicamente.
 */
export const ORIGINAL_TITLES_DATA: Omit<Title, 'slug' | 'posterUrl'>[] = [
  {
    id: 1,
    name: "Interstellar",
    year: 2014,
    type: "movie",
    synopsis: "Exploradores viajam por um buraco de minhoca para salvar a humanidade.",
    genres: ["Ficção Científica", "Drama"],
  },
  {
    id: 2,
    name: "Breaking Bad",
    year: 2008,
    type: "series",
    synopsis: "Professor de química começa a produzir metanfetamina.",
    genres: ["Drama", "Crime"],
  },
  {
    id: 3,
    name: "The Matrix",
    year: 1999,
    type: "movie",
    synopsis: "Um hacker descobre a verdade sobre a realidade.",
    genres: ["Ação", "Ficção Científica"],
  },
  {
    id: 4,
    name: "Parasita",
    year: 2019,
    type: "movie",
    synopsis: "Família pobre infiltra-se na casa de uma família rica.",
    genres: ["Drama", "Thriller"],
  },
  {
    id: 5,
    name: "The Lord of the Rings",
    year: 2001,
    type: "movie",
    synopsis: "Um hobbit parte numa jornada para destruir um anel poderoso.",
    genres: ["Fantasia", "Aventura"],
  },
  {
    id: 6,
    name: "Pulp Fiction",
    year: 1994,
    type: "movie",
    synopsis: "Histórias interligadas do submundo do crime.",
    genres: ["Crime", "Drama"],
  },
  {
    id: 7,
    name: "The Crown",
    year: 2016,
    type: "series",
    synopsis: "A história do reinado da Rainha Elizabeth II.",
    genres: ["Drama", "História"],
  },
  {
    id: 8,
    name: "The Lion King",
    year: 1994,
    type: "movie",
    synopsis: "Um jovem leão foge após a morte do pai.",
    genres: ["Animação", "Aventura"],
  }
];
