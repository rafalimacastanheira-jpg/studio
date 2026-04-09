"use client";

import { useMemo, useCallback } from "react";
import useLocalStorage from "./use-local-storage";
import type { Comment } from "@/lib/definitions";

export function useComments() {
  const [comments, setComments] = useLocalStorage<Comment[]>("comments", []);

  const getCommentsForTitle = useCallback(
    (titleId: number) => {
      return comments
        .filter((c) => c.titleId === titleId)
        .sort((a, b) => new Date(b.ts).getTime() - new Date(a.ts).getTime());
    },
    [comments]
  );

  const addComment = useCallback(
    (titleId: number, userId: string, userName: string, text: string) => {
      const newComment: Comment = {
        id: crypto.randomUUID(),
        titleId,
        userId,
        userName,
        text,
        ts: new Date().toISOString(),
      };

      setComments((prev) => [...prev, newComment]);
    },
    [setComments]
  );

  const commentsByUser = useMemo(() => {
    return (userId: string) =>
      comments
        .filter((c) => c.userId === userId)
        .sort((a, b) => new Date(b.ts).getTime() - new Date(a.ts).getTime());
  }, [comments]);

  return {
    comments,
    getCommentsForTitle,
    addComment,
    commentsByUser,
  };
}
