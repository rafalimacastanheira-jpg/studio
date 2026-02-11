
export type Title = {
  id: number;
  slug: string;
  type: 'movie' | 'series';
  name: string;
  year: number;
  synopsis: string;
  posterUrl: string;
  genres: string[];
};

export type User = {
  id: number;
  name: string;
  email: string;
};

export type FullUser = User & {
  password?: string;
};

export type Rating = {
  userId: number;
  titleId: number;
  score: number;
  ts: string;
};

export type Comment = {
  id: number;
  titleId: number;
  userId: number;
  userName: string;
  text: string;
  ts: string;
};
