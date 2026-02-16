"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import type { Title } from "@/lib/definitions";
import { useRatings } from "@/hooks/use-ratings";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import ImageWithFallback from "./image-with-fallback";

interface MovieCardProps {
  title: Title;
}

export default function MovieCard({ title }: MovieCardProps) {
  const { getAverageForTitle } = useRatings();
  const { avg, count } = getAverageForTitle(title.id);

  const cleanType = (title.type || "").trim().toLowerCase();
  const label = cleanType === "movie" ? "Filme" : "Série";

  const posterUrl =
    (title as any).posterUrl || "https://placehold.co/500x750?text=Sem+Capa";

  return (
    <Link href={`/title/${title.slug}`} className="group block">
      <Card className="overflow-hidden h-full transition-all duration-300 ease-in-out group-hover:border-primary/50 group-hover:shadow-lg group-hover:shadow-primary/10">
        <CardContent className="p-0">
          <div className="aspect-[2/3] relative">
            <ImageWithFallback
              src={posterUrl}
              alt={`Poster de ${title.name}`}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 200px"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          <div className="p-3 space-y-2">
            <h3 className="font-bold truncate" title={title.name}>
              {title.name}
            </h3>

            <p className="text-xs text-muted-foreground">
              {label} • {title.year}
            </p>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-primary font-bold">
                <Star className={cn("w-4 h-4", avg !== null ? "fill-current" : "fill-transparent")} />
                <span>{avg ?? "–"}</span>
              </div>

              <Badge variant="secondary">
                {count} {count === 1 ? "voto" : "votos"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
