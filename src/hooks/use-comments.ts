"use client";

import { useMemo } from 'react';
import useLocalStorage from './use-local-storage';
import type { Comment } from '@/lib/definitions';

export function useComments() {
  const [comments, setComments] = useLocalStorage<Comment[]>('comments', []);

  const getCommentsForTitle = (titleId: number) => {
    return comments.filter(c => c.titleId === titleId)
      .sort((a, b) => new Date(b.ts).getTime() - new Date(a.ts).getTime());
  };
  
  const addComment = (titleId: number, userId: number, userName: string, text: string) => {
    if (text.trim().length < 2) {
      throw new Error('O comentário é muito curto.');
    }
    setComments(prevComments => {
      const newComment: Comment = {
        id: Date.now(),
        titleId,
        userId,
        userName,
        text,
        ts: new Date().toISOString(),
      };
      return [newComment, ...prevComments];
    });
  };

  return { comments, getCommentsForTitle, addComment };
}
