export type CastMember = {
  name: string;
  role?: string;
};

export type Title = {
  id: number;
  slug: string;
  type: "movie" | "series";
  name: string;
  year: number;
  synopsis: string;
  posterUrl: string;
  genres: string[];
  trailerUrl: string;
  cast: CastMember[];
  featured: boolean;
};

export type User = {
  id: string;
  name: string;
  email: string;
};

export type FullUser = User & {
  password?: string;
};

export type Rating = {
  userId: string;
  titleId: number;
  score: number;
  ts: string;
};

export type Comment = {
  id: string;
  titleId: number;
  userId: string;
  userName: string;
  text: string;
  ts: string;
};
