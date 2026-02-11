
import type { Title } from '@/lib/definitions';
import { ORIGINAL_TITLES_DATA } from './titles-data';

type TitleSource = typeof ORIGINAL_TITLES_DATA[0];

function createSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/'/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function resolvePosterUrl(title: TitleSource): string {
  const query = encodeURIComponent(title.name);
  return `https://source.unsplash.com/featured/500x750/?movie,${query}`;
}

const processedTitles: Title[] = ORIGINAL_TITLES_DATA.map(t => ({
  ...t,
  slug: createSlug(t.name),
  posterUrl: resolvePosterUrl(t),
}));

/**
 * Agrupa todos os gêneros únicos de todos os títulos.
 */
export const GENRES = [...new Set(ORIGINAL_TITLES_DATA.flatMap(t => t.genres))].sort();

/**
 * Exporta a lista de títulos processada com `slug` e `posterUrl`.
 */
export const TITLES_DATA: Title[] = processedTitles;
