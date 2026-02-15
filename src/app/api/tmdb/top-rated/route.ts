import { NextResponse } from "next/server";
import { tmdbFetch } from "@/lib/tmdb";

export async function GET() {
  const movies = await tmdbFetch("/movie/top_rated");
  const tv = await tmdbFetch("/tv/top_rated");
  return NextResponse.json({ movies: movies.results, tv: tv.results });
}