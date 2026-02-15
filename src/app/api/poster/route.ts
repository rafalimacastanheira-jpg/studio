import { NextResponse } from "next/server";

const TMDB_BASE = "https://api.themoviedb.org/3";
const POSTER_BASE = "https://image.tmdb.org/t/p/w500";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const name = (searchParams.get("name") || "").trim();
  const year = (searchParams.get("year") || "").trim();
  const type = (searchParams.get("type") || "movie").trim().toLowerCase(); // "movie" | "tv"

  const apiKey = process.env.TMDB_API_KEY || process.env.NEXT_PUBLIC_TMDB_API_KEY;

  if (!apiKey || !name) {
    return NextResponse.json({ posterUrl: null });
  }

  // ✅ aceita "tv" e também "series" se algum dia vier
  const media: "movie" | "tv" = type === "tv" || type === "series" ? "tv" : "movie";

  const url = new URL(`${TMDB_BASE}/search/${media}`);
  url.searchParams.set("api_key", apiKey);
  url.searchParams.set("query", name);

  if (year) {
    if (media === "movie") url.searchParams.set("year", year);
    else url.searchParams.set("first_air_date_year", year);
  }

  const res = await fetch(url.toString(), { cache: "no-store" });
  const json: any = await res.json();

  const poster = json?.results?.[0]?.poster_path;
  const posterUrl = poster ? `${POSTER_BASE}${poster}` : null;

  return NextResponse.json({ posterUrl });
}
