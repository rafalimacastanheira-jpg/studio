import { TITLES_DATA } from "@/lib/data";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import ImageWithFallback from "@/components/image-with-fallback";
import { RatingSection, CommentsSection } from "./title-client-interactions";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return TITLES_DATA.map((t) => ({ slug: t.slug }));
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  const title = TITLES_DATA.find((t) => t.slug === slug);

  if (!title) notFound();

  const posterUrl =
    title.posterUrl || "https://placehold.co/500x750?text=Sem+Capa";

  return (
    <div className="space-y-12">

      <article className="grid gap-8 lg:grid-cols-[320px_1fr]">

        <div className="w-full max-w-[320px]">
          <div className="relative aspect-[2/3] overflow-hidden rounded-2xl border shadow-2xl">
            <ImageWithFallback
              src={posterUrl}
              alt={`Poster de ${title.name}`}
              fill
              className="object-cover"

              priority
              sizes="(max-width: 768px) 100vw, 320px"
            />
          </div>
        </div>

        <div className="space-y-6">

          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              {title.type === "movie" ? "Filme" : "Série"}
            </p>

            <h1 className="font-headline text-4xl font-bold md:text-5xl">
              {title.name}
              <span className="ml-3 text-muted-foreground font-light">
                ({title.year})
              </span>
            </h1>
          </div>

          <div className="flex flex-wrap gap-2">
            {title.genres.map((genre) => (
              <Badge key={genre} variant="secondary">
                {genre}
              </Badge>
            ))}
          </div>

          <RatingSection titleId={title.id} />

          <section className="space-y-2">
            <h2 className="font-headline text-2xl font-bold">
              Sinopse
            </h2>

            <p className="leading-relaxed text-muted-foreground">
              {title.synopsis}
            </p>
          </section>

        </div>
      </article>

      {title.trailerUrl && (
        <section className="space-y-4">
          <h2 className="font-headline text-2xl font-bold">
            Trailer
          </h2>

          <div className="overflow-hidden rounded-2xl border bg-card">
            <div className="aspect-video w-full">
              <iframe
                src={title.trailerUrl}
                title={`Trailer de ${title.name}`}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </section>
      )}

      {title.cast?.length > 0 && (
        <section className="space-y-4">
          <h2 className="font-headline text-2xl font-bold">
            Elenco
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {title.cast.map((actor) => (
              <div
                key={actor.name}
                className="rounded-xl border bg-card/50 p-4"
              >
                <p className="font-semibold text-lg">
                  {actor.name}
                </p>

                {actor.role && (
                  <p className="text-sm text-muted-foreground">
                    {actor.role}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      <CommentsSection titleId={title.id} />

    </div>
  );
}