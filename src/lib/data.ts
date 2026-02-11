import { ORIGINAL_TITLES_DATA, ALL_GENRES } from './titles-data';
import type { Title } from './definitions';

/**
 * Agrupa todos os gêneros únicos de todos os títulos.
 */
export const GENRES = ALL_GENRES;

/**
 * Exporta a lista de títulos processada com `slug` e `posterUrl`.
 */
export const TITLES_DATA: Title[] = ORIGINAL_TITLES_DATA;
