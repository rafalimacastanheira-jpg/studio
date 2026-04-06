"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "@/lib/firebase";

type Rating = {
  id?: string;
  userId: string;
  titleId: number;
  score: number;
  ts?: string;
};

export function useRatings() {
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [loading, setLoading] = useState(false);

  const loadRatings = useCallback(async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, "ratings"));
      const data: Rating[] = snap.docs.map((docItem) => {
        const d = docItem.data();
        return {
          id: docItem.id,
          userId: d.userId,
          titleId: d.titleId,
          score: d.score,
          ts: d.ts?.toDate ? d.ts.toDate().toISOString() : d.ts,
        };
      });
      setRatings(data);
    } catch (error) {
      console.error("Erro ao carregar ratings:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRatings();
  }, [loadRatings]);

  const getRatingsForTitle = useCallback(
    (titleId: number) => ratings.filter((r) => r.titleId === titleId),
    [ratings]
  );

  const getAverageForTitle = useCallback(
    (titleId: number) => {
      const titleRatings = getRatingsForTitle(titleId);
      if (titleRatings.length === 0) return { avg: null, count: 0 };

      const sum = titleRatings.reduce((acc, r) => acc + r.score, 0);
      const avg = Math.round((sum / titleRatings.length) * 10) / 10;
      return { avg, count: titleRatings.length };
    },
    [getRatingsForTitle]
  );

  const getRatingForUser = useCallback(
    (titleId: number, userId: string) =>
      ratings.find((r) => r.titleId === titleId && r.userId === userId),
    [ratings]
  );

  const setRating = useCallback(
    async (userId: string, titleId: number, score: number) => {
      const q = query(
        collection(db, "ratings"),
        where("userId", "==", userId),
        where("titleId", "==", titleId)
      );

      const snap = await getDocs(q);

      if (!snap.empty) {
        const existing = snap.docs[0];
        await updateDoc(doc(db, "ratings", existing.id), {
          score,
          ts: serverTimestamp(),
        });
      } else {
        await addDoc(collection(db, "ratings"), {
          userId,
          titleId,
          score,
          ts: serverTimestamp(),
        });
      }

      await loadRatings();
    },
    [loadRatings]
  );

  const ratingsByUser = useMemo(() => {
    return (userId: string) =>
      ratings
        .filter((r) => r.userId === userId)
        .sort(
          (a, b) =>
            new Date(b.ts || 0).getTime() - new Date(a.ts || 0).getTime()
        );
  }, [ratings]);

  return {
    ratings,
    loading,
    getRatingsForTitle,
    getAverageForTitle,
    setRating,
    getRatingForUser,
    ratingsByUser,
    reloadRatings: loadRatings,
  };
}
