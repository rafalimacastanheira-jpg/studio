const TMDB_BASE = "https://api.themoviedb.org/3";

function getApiKey() {
  const key = process.env.TMDB_API_KEY || process.env.NEXT_PUBLIC_TMDB_API_KEY;
  if (!key) throw new Error("TMDB API key missing");
  return key;
}

export async function tmdbFetch(path: string, params?: Record<string, string>) {
  const url = new URL(`${TMDB_BASE}${path}`);
  url.searchParams.set("api_key", getApiKey());
  url.searchParams.set("language", "pt-PT");

  if (params) {
    for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  }

  const res = await fetch(url.toString(), { next: { revalidate: 3600 } });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`TMDB error ${res.status}: ${text}`);
  }

  return res.json();
}