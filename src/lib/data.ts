import type { Title } from '@/lib/definitions';
import { ORIGINAL_TITLES_DATA } from './titles-data';

/**
 * Agrupa todos os gêneros únicos de todos os títulos.
 */
export const GENRES = [...new Set(ORIGINAL_TITLES_DATA.flatMap(t => t.genres))].sort();

/**
 * Exporta a lista de títulos.
 * Os dados em 'titles-data.ts' já contêm o posterUrl final,
 * então apenas repassamos a lista.
 */
export const TITLES_DATA: Title[] = ORIGINAL_TITLES_DATA;
