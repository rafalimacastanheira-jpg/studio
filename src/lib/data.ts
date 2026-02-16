import { ORIGINAL_TITLES_DATA, ALL_GENRES } from "./titles-data";
import type { Title } from "./definitions";
import { posterAuto } from "./posters";


export const GENRES = ALL_GENRES;


export const TITLES_DATA: Title[] = ORIGINAL_TITLES_DATA.map((t) => ({
 
    ...t,
  posterUrl: t.posterUrl ?? posterAuto(t.name, t.year, t.type),
}));