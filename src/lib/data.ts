import type { Title } from '@/lib/definitions';
import { ORIGINAL_TITLES_DATA } from './titles-data';

/**
 * 1) Mapa de posters oficiais (TMDB) para títulos populares
 *    -> Completa automaticamente o posterUrl quando encontrar o ID no mapa.
 * 2) Fallback: Unsplash por tema (usa imageHint ou o nome do título).
 */
const TMDB_POSTER_BASE = 'https://image.tmdb.org/t/p/w500';
const POSTER_MAP: Record<number, string> = {
  // --- Filmes & séries com caminho TMDB conhecido (IDs 1–30) ---
  1: `${TMDB_POSTER_BASE}/nBNZadXqJSdt05SHLqgT0HuC5Gm.jpg`,                        // Interstellar
  2: `${TMDB_POSTER_BASE}/ggFHVNu6YYI5L9pCfOacjizRGt.jpg`,                         // Breaking Bad
  3: `${TMDB_POSTER_BASE}/aOIuZAjPaRIE0R3zp8UxK7G5B7f.jpg`,                        // The Matrix
  4: `${TMDB_POSTER_BASE}/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg`,                        // Parasite (Parasita)
  5: `${TMDB_POSTER_BASE}/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg`,                         // Game of Thrones
  6: `${TMDB_POSTER_BASE}/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg`,                        // Inception (A Origem)
  7: `${TMDB_POSTER_BASE}/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg`,                        // LOTR: Fellowship
  8: `${TMDB_POSTER_BASE}/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg`,                        // Pulp Fiction
  9: `${TMDB_POSTER_BASE}/49WJfeN0moxb9IPfGn8AIqMGskD.jpg`,                        // Stranger Things
  10: `${TMDB_POSTER_BASE}/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg`,                       // Forrest Gump
  11: `${TMDB_POSTER_BASE}/a26cQPRhJPX6GbWfQbvZdrrp9j9.jpg`,                       // Fight Club (Clube da Luta)
  12: `${TMDB_POSTER_BASE}/qZtAf4Z1pos2qsmrA6I939G2XbM.jpg`,                       // The Office
  13: `${TMDB_POSTER_BASE}/qJ2tW6WMUDux911r6m7haRef0WH.jpg`,                       // The Dark Knight
  14: `${TMDB_POSTER_BASE}/sF1U4EUQS8YiiyBercPi2xR1AoS.jpg`,                       // Schindler's List
  15: `${TMDB_POSTER_BASE}/f496cm9enuEsZkSPzCwn9OIGsBN.jpg`,                       // Friends
  16: `${TMDB_POSTER_BASE}/e3oGYpoTUhOFK0BJfloru5ZmGV.jpg`,                        // The Silence of the Lambs (Silêncio dos Inocentes)
  17: `${TMDB_POSTER_BASE}/k7eYdWvhYQyRQoU2TB2A2Xu2TfD.jpg`,                       // Cidade de Deus
  18: `${TMDB_POSTER_BASE}/hlLXt2tOPT6RRnjiUmoxyG1LTFi.jpg`,                       // Chernobyl
  19: `${TMDB_POSTER_BASE}/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg`,                       // Gladiator
  20: `${TMDB_POSTER_BASE}/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg`,                       // Spirited Away (A Viagem de Chihiro)
  21: `${TMDB_POSTER_BASE}/pE8CScObQURsFZ723PSW1K9EGYp.jpg`,                       // Peaky Blinders
  22: `${TMDB_POSTER_BASE}/d4KNaTrltq6bpkFS01pYtyXa09m.jpg`,                       // The Godfather (O Padrinho)
  23: `${TMDB_POSTER_BASE}/5CSqM06ISWvKuz3Q0hptQZ6Pp2l.jpg`,                       // Psycho (Psicose)
  24: `${TMDB_POSTER_BASE}/pXeuS38bskG9bnVHU7QNvZ4fVch.jpg`,                       // Black Mirror (arte geral)
  25: `${TMDB_POSTER_BASE}/9fgh3Ns1iRzlQNYuJyK0ARQZU7w.jpg`,                       // The Shining (O Iluminado)
  26: `${TMDB_POSTER_BASE}/7lyBcpYB0Qt8gYhXYaEZUNlNQAv.jpg`,                       // Back to the Future
  27: `${TMDB_POSTER_BASE}/sWgBv7LV2PRoQgkxwlibdGXKz1S.jpg`,                       // The Mandalorian
  28: `${TMDB_POSTER_BASE}/mEFe8Lj0Coz3YAeS8p2OBpC8hFM.jpg`,                       // Jurassic Park (alt poster)
  29: `${TMDB_POSTER_BASE}/sKCr78MXSLixwmZ8DyJLrpMsd15.jpg`,                       // The Lion King (O Rei Leão)
  30: `${TMDB_POSTER_BASE}/6kbAMLteGO8yyewYau6bJ683sw7.jpg`,                       // The Crown
  // podes continuar a preencher mais IDs aqui quando quiseres posters oficiais
};

function fallbackPoster(t: Title) {
  const query = encodeURIComponent((t.imageHint || t.name).toString());
  // Unsplash "featured" por tema – 500x750 (portrait). Não requer API key.
  return `https://source.unsplash.com/featured/500x750/?${query}`;
}

export function resolvePosterUrl(t: Title): string {
  // 1) se houver no mapa, usa TMDB
  if (POSTER_MAP[t.id]) return POSTER_MAP[t.id];
  // 2) se já vier um posterUrl “válido” diferente de picsum, mantém
  if (t.posterUrl && !/picsum\.photos/.test(t.posterUrl)) return t.posterUrl;
  // 3) senão, usa Unsplash temático
  return fallbackPoster(t);
}

export const GENRES = [...new Set(ORIGINAL_TITLES_DATA.flatMap(t => t.genres))].sort();

/**
 * Exporta uma versão “resolvida” do dataset:
 * - troca picsum => TMDB (se existir no POSTER_MAP) ou Unsplash temático
 * - mantém posterUrl original se já for personalizado
 */
export const TITLES_DATA: Title[] = ORIGINAL_TITLES_DATA.map((t) => ({
  ...t,
  posterUrl: resolvePosterUrl(t),
}));
