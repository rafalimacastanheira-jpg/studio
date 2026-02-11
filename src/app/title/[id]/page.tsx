import { TITLES_DATA } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import TitleClientInteractions from './title-client-interactions';
import { resolvePosterUrl } from '@/lib/data';

export default function TitlePage({ params }: { params: { slug: string } }) {
  const title = TITLES_DATA.find(t => t.slug === params.slug);

  if (!title) {
    notFound();
  }
  
  const posterUrl = resolvePosterUrl(title);

  return (
    <div className="space-y-8">
      <article className="grid md:grid-cols-[280px_1fr] gap-8">
        <div className="w-full md:w-[280px]">
          <div className="aspect-[2/3] relative rounded-lg overflow-hidden shadow-2xl shadow-black/50 border border-border">
            <Image
              src={posterUrl}
              alt={`Poster de ${title.name}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 280px"
              priority
              data-ai-hint={title.imageHint}
            />
          </div>
        </div>
        
        <div className="flex flex-col gap-4">
          <div className="space-y-2">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider">
              {title.type === 'movie' ? 'Filme' : 'Série'}
            </p>
            <h1 className="font-headline text-4xl font-bold">{title.name} <span className="text-muted-foreground font-light">({title.year})</span></h1>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {title.genres.map(genre => (
              <Badge key={genre} variant="secondary">{genre}</Badge>
            ))}
          </div>

          <TitleClientInteractions titleId={title.id} />
          
          <div>
            <h2 className="font-headline text-xl font-bold mb-2">Sinopse</h2>
            <p className="text-muted-foreground leading-relaxed">{title.synopsis}</p>
          </div>
        </div>
      </article>

      <TitleClientInteractions.CommentsSection titleId={title.id} />
    </div>
  );
}
