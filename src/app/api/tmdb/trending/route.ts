import { NextResponse } from "next/server";
import { tmdbFetch } from "@/lib/tmdb";

export async function GET() {
  const data = await tmdbFetch("/trending/all/week");
  return NextResponse.json(data);
}