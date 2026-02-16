import { ORIGINAL_TITLES_DATA, ALL_GENRES } from "./titles-data";
import type { Title } from "./definitions";
import { posterAuto } from "./posters"; // <-- GARANTE QUE EXISTE ESTE FICHEIRO/FUNÇÃO

/**
 * Agrupa todos os gêneros únicos de todos os títulos.
 */
export const GENRES = ALL_GENRES;

/**
 * Exporta a lista de títulos processada com `slug` e `posterUrl`.
 * (IMPORTANTE para GitHub Pages: posterUrl tem que vir pronto, sem API)
 */
export const TITLES_DATA: Title[] = ORIGINAL_TITLES_DATA.map((t) => ({
  ...t,
  // se já vier posterUrl no titles-data, usa.
  // se não vier, tenta gerar via posterAuto (mapa local)
  posterUrl: t.posterUrl ?? posterAuto(t.name, t.year, t.type),
}));