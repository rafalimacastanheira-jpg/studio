import { TITLES_DATA } from '@/lib/data';
import MovieCard from '@/components/movie-card';

export default function Home() {
  const featuredTitles = TITLES_DATA;

  return (
    <div className="space-y-12">
      <section>
        <h1 className="font-headline text-3xl font-bold mb-6">Destaques</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {featuredTitles.map((title) => (
            <MovieCard key={title.id} title={title} />
          ))}
        </div>
      </section>
    </div>
  );
}
