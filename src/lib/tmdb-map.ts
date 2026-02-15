import type { Title } from "@/lib/definitions";

function slugify(str: string) {
  return str
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function tmdbToTitle(item: any): Title {
  const isTv = item.media_type === "tv" || item.first_air_date;
  const name = isTv ? item.name : item.title;
  const date = isTv ? item.first_air_date : item.release_date;
  const year = date ? Number(String(date).slice(0, 4)) : undefined;

  const safeId = `${isTv ? "tv" : "movie"}_${item.id}`;

  return {
    id: safeId as any,
    name,
    year,
    type: isTv ? "series" : "movie",
    slug: slugify(`${name}-${safeId}`),
  } as Title;
}