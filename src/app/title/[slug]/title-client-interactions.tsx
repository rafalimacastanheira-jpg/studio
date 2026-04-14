"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/auth-context";
import { useRatings } from "@/hooks/use-ratings";
import { useComments } from "@/hooks/use-comments";
import { useToast } from "@/hooks/use-toast";
import { Star, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export function RatingSection({ titleId }: { titleId: number }) {
  const { user } = useAuth();
  const { getAverageForTitle, setRating, getRatingForUser } = useRatings();
  const { toast } = useToast();

  const [ratingStats, setRatingStats] = useState(getAverageForTitle(titleId));
  const [myScore, setMyScore] = useState<string | number>("");

  useEffect(() => {
    setRatingStats(getAverageForTitle(titleId));

    if (user) {
      const userRating = getRatingForUser(titleId, user.id);
      setMyScore(userRating ? userRating.score : "");
    } else {
      setMyScore("");
    }
  }, [getAverageForTitle, getRatingForUser, titleId, user]);

  const handleSaveScore = async () => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Ação necessária",
        description: "Faça login para avaliar.",
      });
      return;
    }

    const scoreValue = Number(myScore);

    if (isNaN(scoreValue) || scoreValue < 0 || scoreValue > 10) {
      toast({
        variant: "destructive",
        title: "Valor inválido",
        description: "A nota deve ser um número entre 0 e 10.",
      });
      return;
    }

    try {
      await setRating(user.id, titleId, scoreValue);
      setRatingStats(getAverageForTitle(titleId));
      toast({
        title: "Sucesso",
        description: "A sua nota foi guardada!",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao guardar nota",
        description: error?.message || "Não foi possível guardar a nota.",
      });
    }
  };

  return (
    <>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 text-2xl font-bold text-primary">
          <Star
            className={cn(
              "h-7 w-7",
              ratingStats.avg !== null ? "fill-current" : "fill-transparent"
            )}
          />
          <span>{ratingStats.avg?.toFixed(1) ?? "–"}</span>
        </div>
        <span className="text-sm text-muted-foreground">
          {ratingStats.count}{" "}
          {ratingStats.count === 1 ? "avaliação" : "avaliações"}
        </span>
      </div>

      {user && (
        <div className="flex items-center gap-2 pt-4">
          <div className="relative">
            <label htmlFor="myScore" className="sr-only">
              A sua nota
            </label>
            <Input
              id="myScore"
              type="number"
              min="0"
              max="10"
              step="0.5"
              placeholder="Sua nota (0-10)"
              value={myScore}
              onChange={(e) => setMyScore(e.target.value)}
              className="w-48"
            />
          </div>
          <Button onClick={handleSaveScore}>Guardar Nota</Button>
        </div>
      )}
    </>
  );
}

export function CommentsSection({ titleId }: { titleId: number }) {
  const { user } = useAuth();
  const { getCommentsForTitle, addComment } = useComments();
  const [newComment, setNewComment] = useState("");
  const { toast } = useToast();

  const comments = getCommentsForTitle(titleId);

  const handleSendComment = async () => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Ação necessária",
        description: "Faça login para comentar.",
      });
      return;
    }

    if (!newComment.trim()) {
      toast({
        variant: "destructive",
        title: "Comentário vazio",
        description: "Escreva um comentário antes de publicar.",
      });
      return;
    }

    try {
      await addComment(titleId, user.id, user.name, newComment);
      setNewComment("");
      toast({
        title: "Comentário publicado!",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro",
        description:
          error?.message || "Não foi possível publicar o comentário.",
      });
    }
  };

  return (
    <section className="space-y-6">
      <h2 className="font-headline flex items-center gap-2 text-2xl font-bold">
        <MessageSquare className="h-6 w-6" />
        Comentários
      </h2>

      {user && (
        <div className="space-y-2">
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Escreva um comentário…"
            rows={3}
          />
          <Button onClick={handleSendComment}>Publicar Comentário</Button>
        </div>
      )}

      <div className="space-y-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <Card key={comment.id} className="bg-card/50">
              <CardContent className="flex items-start gap-4 p-4">
                <Avatar>
                  <AvatarFallback>
                    {comment.userName?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <p className="font-semibold">{comment.userName}</p>
                    <p className="text-xs text-muted-foreground">
                      {comment.ts
                        ? new Date(comment.ts).toLocaleString("pt-PT")
                        : "Agora mesmo"}
                    </p>
                  </div>

                  <p className="text-sm text-foreground/80">{comment.text}</p>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="py-8 text-center text-muted-foreground">
            <p>Ainda não há comentários.</p>
            <p className="text-sm">Seja o primeiro a comentar!</p>
          </div>
        )}
      </div>
    </section>
  );
}
