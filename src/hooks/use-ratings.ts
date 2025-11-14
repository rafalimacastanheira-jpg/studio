"use client";

import { useMemo } from 'react';
import useLocalStorage from './use-local-storage';
import type { Rating } from '@/lib/definitions';

export function useRatings() {
  const [ratings, setRatings] = useLocalStorage<Rating[]>('ratings', []);

  const getRatingsForTitle = (titleId: number) => {
    return ratings.filter(r => r.titleId === titleId);
  };

  const getAverageForTitle = (titleId: number) => {
    const titleRatings = getRatingsForTitle(titleId);
    if (titleRatings.length === 0) return { avg: null, count: 0 };
    const sum = titleRatings.reduce((acc, r) => acc + r.score, 0);
    const avg = Math.round((sum / titleRatings.length) * 10) / 10;
    return { avg, count: titleRatings.length };
  };

  const getRatingForUser = (titleId: number, userId: number) => {
    return ratings.find(r => r.titleId === titleId && r.userId === userId);
  }

  const setRating = (userId: number, titleId: number, score: number) => {
    setRatings(prevRatings => {
      const existingRatingIndex = prevRatings.findIndex(
        r => r.userId === userId && r.titleId === titleId
      );
      const newRatings = [...prevRatings];
      const newRating = { userId, titleId, score, ts: new Date().toISOString() };

      if (existingRatingIndex >= 0) {
        newRatings[existingRatingIndex] = newRating;
      } else {
        newRatings.push(newRating);
      }
      return newRatings;
    });
  };

  const ratingsByUser = useMemo(() => {
    return (userId: number) => ratings.filter(r => r.userId === userId).sort((a, b) => new Date(b.ts).getTime() - new Date(a.ts).getTime());
  }, [ratings]);

  return { ratings, getRatingsForTitle, getAverageForTitle, setRating, getRatingForUser, ratingsByUser };
}
