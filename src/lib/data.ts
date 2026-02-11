import type { Title } from '@/lib/definitions';
import { ORIGINAL_TITLES_DATA } from './titles-data';

/* ================================
   CONFIGURAÇÃO BASE
================================ */

const TMDB_POSTER_BASE = 'https://image.tmdb.org/t/p/w500';

/* ================================
   MAPA DE POSTERS OFICIAIS TMDB
================================ */

const POSTER_MAP: Record<number, string> = {
  1: `${TMDB_POSTER_BASE}/nBNZadXqJSdt05SHLqgT0HuC5Gm.jpg`, // Interstellar
  2: `${TMDB_POSTER_BASE}/ggFHVNu6YYI5L9pCfOacjizRGt.jpg`, // Breaking Bad
  3: `${TMDB_POSTER_BASE}/aOIuZAjPaRIE0R3zp8UxK7G5B7f.jpg`, // The Matrix
  4: `${TMDB_POSTER_BASE}/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg`, // Parasita
  5: `${TMDB_POSTER_BASE}/u3bZgnGQ9T01sWNhyveQz0wH0Hl.jpg`, // Game of Thrones
  6: `${TMDB_POSTER_BASE}/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg`, // Inception
  7: `${TMDB_POSTER_BASE}/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg`, // LOTR
  8: `${TMDB_POSTER_BASE}/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg`, // Pulp Fiction
  9: `${TMDB_POSTER_BASE}/49WJfeN0moxb9IPfGn8AIqMGskD.jpg`, // Stranger Things
  10: `${TMDB_POSTER_BASE}/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg`, // Forrest Gump
  11: `${TMDB_POSTER_BASE}/a26cQPRhJPX6GbWfQbvZdrrp9j9.jpg`, // Fight Club
  13: `${TMDB_POSTER_BASE}/qJ2tW6WMUDux911r6m7haRef0WH.jpg`, // The Dark Knight
  16: `${TMDB_POSTER_BASE}/e3oGYpoTUhOFK0BJfloru5ZmGV.jpg`, // Silence of the Lambs
  17: `${TMDB_POSTER_BASE}/k7eYdWvhYQyRQoU2TB2A2Xu2TfD.jpg`, // Cidade de Deus
  18: `${TMDB_POSTER_BASE}/hlLXt2tOPT6RRnjiUmoxyG1LTFi.jpg`, // Chernobyl
  19: `${TMDB_POSTER_BASE}/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg`, // Gladiator
  20: `${TMDB_POSTER_BASE}/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg`, // Spirited Away
  21: `${TMDB_POSTER_BASE}/pE8CScObQURsFZ723PSW1K9EGYp.jpg`, // Peaky Blinders
  22: `${TMDB_POSTER_BASE}/d4KNaTrltq6bpkFS01pYtyXa09m.jpg`, // The Godfather
  23: `${TMDB_POSTER_BASE}/5CSqM06ISWvKuz3Q0hptQZ6Pp2l.jpg`, // Psycho
  24: `${TMDB_POSTER_BASE}/pXeuS38bskG9bnVHU7QNvZ4fVch.jpg`, // Black Mirror
  25: `${TMDB_POSTER_BASE}/9fgh3Ns1iRzlQNYuJyK0ARQZU7w.jpg`, // The Shining
  26: `${TMDB_POSTER_BASE}/7lyBcpYB0Qt8gYhXYaEZUNlNQAv.jpg`, // Back to the Future
  27: `${TMDB_POSTER_BASE}/sWgBv7LV2PRoQgkxwlibdGXKz1S.jpg`, // The Mandalorian
  28: `${TMDB_POSTER_BASE}/mEFe8Lj0Coz3YAeS8p2OBpC8hFM.jpg`, // Jurassic Park
  29: `${TMDB_POSTER_BASE}/sKCr78MXSLixwmZ8DyJLrpMsd15.jpg`, // The Lion King
  30: `${TMDB_POSTER_BASE}/6kbAMLteGO8yyewYau6bJ683sw7.jpg`, // The Crown
};

/* ================================
   FALLBACK AUTOMÁTICO (UNSPLASH)
================================ */

function fallbackPoster(t: Title): string {
  const query = encodeURIComponent((t.imageHint || t.name).toString());
  // Unsplash "featured" por tema – 500x750 (portrait). Não requer API key.
  return `https://source.unsplash.com/featured/500x750/?${query}`;
}

/* ================================
   RESOLVER DE POSTERS
================================ */

export function resolvePosterUrl(t: Title): string {
  // 1. Se houver no mapa, usa TMDB
  if (POSTER_MAP[t.id]) {
    return POSTER_MAP[t.id];
  }
  // 2. Se já vier um posterUrl "válido" (diferente de picsum), mantém
  if (t.posterUrl && !/picsum\.photos/.test(t.posterUrl)) {
    return t.posterUrl;
  }
  // 3. Senão, usa Unsplash temático como fallback
  return fallbackPoster(t);
}

/* ================================
   DADOS FINAIS
================================ */

/**
 * Agrupa todos os gêneros únicos de todos os títulos.
 */
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
