import 'dotenv/config';
import fetch from 'node-fetch';
import type { Title } from '@/lib/definitions';
import { ORIGINAL_TITLES_DATA } from '@/lib/titles-data';

const API_KEY = process.env.TMDB_API_KEY!;
const TMDB_POSTER_BASE = 'https://image.tmdb.org/t/p/w500';

async function findPosterPath(t: { name: string; year: number; type: 'movie' | 'series' }) {
  if (!API_KEY) {
    throw new Error('TMDB_API_KEY is not defined in your .env file');
  }
  const type = t.type === 'series' ? 'tv' : 'movie';
  const url = new URL(`https://api.themoviedb.org/3/search/${type}`);
  url.searchParams.set('api_key', API_KEY);
  url.searchParams.set('query', t.name);
  url.searchParams.set('year', String(t.year));

  try {
    const res = await fetch(url.toString());
    if (!res.ok) {
        console.error(`Error fetching ${t.name}: ${res.statusText}`);
        return null;
    }
    const json: any = await res.json();
    const first = json.results?.[0];
    return first?.poster_path ? `${TMDB_POSTER_BASE}${first.poster_path}` : null;
  } catch (error) {
    console.error(`Failed to fetch poster for ${t.name}:`, error);
    return null;
  }
}

(async () => {
  console.log('Starting poster fetch...');
  for (const t of ORIGINAL_TITLES_DATA) {
    const poster = await findPosterPath({ name: t.name, year: t.year, type: t.type });
    console.log(
      poster
        ? `${t.id}: \`${poster}\`, // ${t.name}`
        : `// ${t.id}: sem poster encontrado automaticamente (${t.name})`
    );
    // Be nice to the API
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  console.log('Finished poster fetch.');
})();
