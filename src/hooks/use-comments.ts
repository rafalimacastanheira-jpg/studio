"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

type Comment = {
  id?: string;
  titleId: number;
  userId: string;
  userName: string;
  text: string;
  ts?: string;
};

export function useComments() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);

  const loadComments = useCallback(async () => {
    setLoading(true);
    try {
      const snap = await getDocs(collection(db, "comments"));

      const data: Comment[] = snap.docs.map((docItem) => {
        const d = docItem.data();
        return {
          id: docItem.id,
          titleId: d.titleId,
          userId: d.userId,
          userName: d.userName,
          text: d.text,
          ts: d.ts?.toDate ? d.ts.toDate().toISOString() : d.ts,
        };
      });

      data.sort(
        (a, b) =>
          new Date(b.ts || 0).getTime() - new Date(a.ts || 0).getTime()
      );

      setComments(data);
    } catch (error) {
      console.error("Erro ao carregar comentários:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  const getCommentsForTitle = useCallback(
    (titleId: number) => {
      return comments.filter((comment) => comment.titleId === titleId);
    },
    [comments]
  );

  const addComment = useCallback(
    async (titleId: number, userId: string, userName: string, text: string) => {
      const cleanedText = text.trim();

      if (!cleanedText) {
        throw new Error("O comentário não pode estar vazio.");
      }

      await addDoc(collection(db, "comments"), {
        titleId,
        userId,
        userName,
        text: cleanedText,
        ts: serverTimestamp(),
      });

      await loadComments();
    },
    [loadComments]
  );

  
  return {
    comments,
    loading,
    addComment,
    getCommentsForTitle,
    reloadComments: loadComments,
  };
}
