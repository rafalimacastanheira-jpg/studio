export type PosterQuery = {
    name: string;
    year?: number;
    type: "movie" | "series";
  };
  
  export function posterAuto(q: PosterQuery) {
    const params = new URLSearchParams({
      name: q.name,
      year: q.year ? String(q.year) : "",
      type: q.type,
    });
  
    // isto chama a tua API route (server)
    return `/api/poster?${params.toString()}`;
  }
  