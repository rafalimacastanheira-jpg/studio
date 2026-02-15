import { NextResponse } from "next/server";
import { tmdbFetch } from "@/lib/tmdb";

export async function GET() {
  const movies = await tmdbFetch("/movie/popular");
  const tv = await tmdbFetch("/tv/popular");
  return NextResponse.json({ movies: movies.results, tv: tv.results });
}