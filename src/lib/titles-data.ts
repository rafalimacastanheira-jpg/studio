
import type { Title } from '@/lib/definitions';

export type SeedTitle = {
  id: number;
  name: string;
  year: number;
  type: 'movie' | 'series';
};

export const SEED_TITLES: SeedTitle[] = [
  // ===== FILMES (1–50) =====
  { id: 1, name: 'Interstellar', year: 2014, type: 'movie' },
  { id: 2, name: 'Inception', year: 2010, type: 'movie' },
  { id: 3, name: 'The Matrix', year: 1999, type: 'movie' },
  { id: 4, name: 'Parasite', year: 2019, type: 'movie' },
  { id: 5, name: 'The Dark Knight', year: 2008, type: 'movie' },
  { id: 6, name: 'Pulp Fiction', year: 1994, type: 'movie' },
  { id: 7, name: 'Fight Club', year: 1999, type: 'movie' },
  { id: 8, name: 'Forrest Gump', year: 1994, type: 'movie' },
  { id: 9, name: 'The Godfather', year: 1972, type: 'movie' },
  { id: 10, name: 'The Godfather Part II', year: 1974, type: 'movie' },

  { id: 11, name: 'Gladiator', year: 2000, type: 'movie' },
  { id: 12, name: 'The Shawshank Redemption', year: 1994, type: 'movie' },
  { id: 13, name: 'Schindler’s List', year: 1993, type: 'movie' },
  { id: 14, name: 'The Silence of the Lambs', year: 1991, type: 'movie' },
  { id: 15, name: 'Se7en', year: 1995, type: 'movie' },
  { id: 16, name: 'The Green Mile', year: 1999, type: 'movie' },
  { id: 17, name: 'Whiplash', year: 2014, type: 'movie' },
  { id: 18, name: 'The Prestige', year: 2006, type: 'movie' },
  { id: 19, name: 'Django Unchained', year: 2012, type: 'movie' },
  { id: 20, name: 'The Departed', year: 2006, type: 'movie' },

  { id: 21, name: 'The Wolf of Wall Street', year: 2013, type: 'movie' },
  { id: 22, name: 'Titanic', year: 1997, type: 'movie' },
  { id: 23, name: 'Avatar', year: 2009, type: 'movie' },
  { id: 24, name: 'Mad Max: Fury Road', year: 2015, type: 'movie' },
  { id: 25, name: 'Joker', year: 2019, type: 'movie' },
  { id: 26, name: 'The Social Network', year: 2010, type: 'movie' },
  { id: 27, name: 'La La Land', year: 2016, type: 'movie' },
  { id: 28, name: 'The Lion King', year: 1994, type: 'movie' },
  { id: 29, name: 'Spirited Away', year: 2001, type: 'movie' },
  { id: 30, name: 'Toy Story', year: 1995, type: 'movie' },

  { id: 31, name: 'Up', year: 2009, type: 'movie' },
  { id: 32, name: 'Coco', year: 2017, type: 'movie' },
  { id: 33, name: 'WALL·E', year: 2008, type: 'movie' },
  { id: 34, name: 'The Incredibles', year: 2004, type: 'movie' },
  { id: 35, name: 'Jurassic Park', year: 1993, type: 'movie' },
  { id: 36, name: 'Back to the Future', year: 1985, type: 'movie' },
  { id: 37, name: 'Star Wars: Episode IV - A New Hope', year: 1977, type: 'movie' },
  { id: 38, name: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980, type: 'movie' },
  { id: 39, name: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001, type: 'movie' },
  { id: 40, name: 'The Lord of the Rings: The Two Towers', year: 2002, type: 'movie' },

  { id: 41, name: 'The Lord of the Rings: The Return of the King', year: 2003, type: 'movie' },
  { id: 42, name: 'Harry Potter and the Philosopher’s Stone', year: 2001, type: 'movie' },
  { id: 43, name: 'Harry Potter and the Prisoner of Azkaban', year: 2004, type: 'movie' },
  { id: 44, name: 'Spider-Man: Into the Spider-Verse', year: 2018, type: 'movie' },
  { id: 45, name: 'Logan', year: 2017, type: 'movie' },
  { id: 46, name: 'The Avengers', year: 2012, type: 'movie' },
  { id: 47, name: 'Black Panther', year: 2018, type: 'movie' },
  { id: 48, name: 'Get Out', year: 2017, type: 'movie' },
  { id: 49, name: 'A Quiet Place', year: 2018, type: 'movie' },
  { id: 50, name: 'Her', year: 2013, type: 'movie' },

  // ===== SÉRIES (51–100) =====
  { id: 51, name: 'Breaking Bad', year: 2008, type: 'series' },
  { id: 52, name: 'Better Call Saul', year: 2015, type: 'series' },
  { id: 53, name: 'Game of Thrones', year: 2011, type: 'series' },
  { id: 54, name: 'Stranger Things', year: 2016, type: 'series' },
  { id: 55, name: 'The Crown', year: 2016, type: 'series' },
  { id: 56, name: 'Chernobyl', year: 2019, type: 'series' },
  { id: 57, name: 'The Mandalorian', year: 2019, type: 'series' },
  { id: 58, name: 'The Boys', year: 2019, type: 'series' },
  { id: 59, name: 'Peaky Blinders', year: 2013, type: 'series' },
  { id: 60, name: 'Black Mirror', year: 2011, type: 'series' },

  { id: 61, name: 'Sherlock', year: 2010, type: 'series' },
  { id: 62, name: 'House of the Dragon', year: 2022, type: 'series' },
  { id: 63, name: 'The Last of Us', year: 2023, type: 'series' },
  { id: 64, name: 'Narcos', year: 2015, type: 'series' },
  { id: 65, name: 'Money Heist', year: 2017, type: 'series' },
  { id: 66, name: 'Dark', year: 2017, type: 'series' },
  { id: 67, name: 'The Witcher', year: 2019, type: 'series' },
  { id: 68, name: 'Ozark', year: 2017, type: 'series' },
  { id: 69, name: 'Mindhunter', year: 2017, type: 'series' },
  { id: 70, name: 'The Office (US)', year: 2005, type: 'series' },

  { id: 71, name: 'Friends', year: 1994, type: 'series' },
  { id: 72, name: 'How I Met Your Mother', year: 2005, type: 'series' },
  { id: 73, name: 'The Big Bang Theory', year: 2007, type: 'series' },
  { id: 74, name: 'Brooklyn Nine-Nine', year: 2013, type: 'series' },
  { id: 75, name: 'The Simpsons', year: 1989, type: 'series' },
  { id: 76, name: 'Rick and Morty', year: 2013, type: 'series' },
  { id: 77, name: 'Fargo', year: 2014, type: 'series' },
  { id: 78, name: 'True Detective', year: 2014, type: 'series' },
  { id: 79, name: 'Westworld', year: 2016, type: 'series' },
  { id: 80, name: 'The Walking Dead', year: 2010, type: 'series' },

  { id: 81, name: 'The Handmaid’s Tale', year: 2017, type: 'series' },
  { id: 82, name: 'Dexter', year: 2006, type: 'series' },
  { id: 83, name: 'The Sopranos', year: 1999, type: 'series' },
  { id: 84, name: 'The Wire', year: 2002, type: 'series' },
  { id: 85, name: 'Succession', year: 2018, type: 'series' },
  { id: 86, name: 'The Bear', year: 2022, type: 'series' },
  { id: 87, name: 'Euphoria', year: 2019, type: 'series' },
  { id: 88, name: 'The Queen’s Gambit', year: 2020, type: 'series' },
  { id: 89, name: 'Severance', year: 2022, type: 'series' },
  { id: 90, name: 'Arcane', year: 2021, type: 'series' },

  { id: 91, name: 'Attack on Titan', year: 2013, type: 'series' },
  { id: 92, name: 'Death Note', year: 2006, type: 'series' },
  { id: 93, name: 'One Piece', year: 1999, type: 'series' },
  { id: 94, name: 'Fullmetal Alchemist: Brotherhood', year: 2009, type: 'series' },
  { id: 95, name: 'Demon Slayer: Kimetsu no Yaiba', year: 2019, type: 'series' },
  { id: 96, name: 'Squid Game', year: 2021, type: 'series' },
  { id: 97, name: 'The Stranger', year: 2020, type: 'series' },
  { id: 98, name: 'Vikings', year: 2013, type: 'series' },
  { id: 99, name: 'The Umbrella Academy', year: 2019, type: 'series' },
  { id: 100, name: 'Loki', year: 2021, type: 'series' },
];


function createSlug(name: string): string {
    return name
        .toLowerCase()
        .replace(/['’.:()]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

function generatePoster(title: string, id: number): string {
  return `https://picsum.photos/seed/${encodeURIComponent(title + id)}/500/750`;
}

const genresList = [
  "Drama", "Ação", "Comédia", "Thriller", "Ficção Científica", "Romance", 
  "Terror", "Aventura", "Crime", "Fantasia", "História", "Animação", 
  "Mistério", "Família", "Guerra", "Musical"
];

function getRandomGenres(): string[] {
  const num = Math.floor(Math.random() * 2) + 1; // 1 or 2 genres
  const shuffled = genresList.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
}

export const ORIGINAL_TITLES_DATA: Title[] = SEED_TITLES.map(title => ({
  ...title,
  slug: createSlug(title.name),
  synopsis: `Esta é uma sinopse de exemplo para ${title.name}, um aclamado ${title.type === 'movie' ? 'filme' : 'série'} de ${title.year}.`,
  genres: getRandomGenres(),
  posterUrl: generatePoster(title.name, title.id)
}));

const allGeneratedGenres = ORIGINAL_TITLES_DATA.flatMap(t => t.genres);
export const ALL_GENRES = [...new Set(allGeneratedGenres)].sort();
