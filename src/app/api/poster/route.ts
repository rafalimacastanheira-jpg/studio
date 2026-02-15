import { NextResponse } from "next/server";

const TMDB_BASE = "https://api.themoviedb.org/3";
const POSTER_BASE = "https://image.tmdb.org/t/p/w500";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const name = searchParams.get("name") || "";
  const year = searchParams.get("year") || "";
  const type = searchParams.get("type") || "movie";

  const apiKey = process.env.TMDB_API_KEY || process.env.NEXT_PUBLIC_TMDB_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ posterUrl: null, error: "Missing TMDB key" }, { status: 400 });
  }

  const media = type === "series" ? "tv" : "movie";

  const url = new URL(`${TMDB_BASE}/search/${media}`);
  url.searchParams.set("api_key", apiKey);
  url.searchParams.set("query", name);
  if (year) url.searchParams.set("year", year);

  const res = await fetch(url.toString(), { cache: "no-store" });
  const json: any = await res.json();

  const poster = json?.results?.[0]?.poster_path;
  const posterUrl = poster ? `${POSTER_BASE}${poster}` : null;

  return NextResponse.json({ posterUrl });
}
