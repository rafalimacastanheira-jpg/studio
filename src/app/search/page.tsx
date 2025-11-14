"use client";

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TITLES_DATA, GENRES } from '@/lib/data';
import MovieCard from '@/components/movie-card';
import type { Title } from '@/lib/definitions';
import { useRatings } from '@/hooks/use-ratings';

function SearchPageComponent() {
  const searchParams = useSearchParams();
  const { getAverageForTitle } = useRatings();

  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [genre, setGenre] = useState('');
  const [sort, setSort] = useState('rating');
  const [results, setResults] = useState<Title[]>([]);

  const filteredAndSortedTitles = useMemo(() => {
    let filtered = TITLES_DATA.filter(title =>
      title.name.toLowerCase().includes(query.toLowerCase())
    );

    if (genre) {
      filtered = filtered.filter(title => title.genres.includes(genre));
    }

    const sorted = [...filtered].sort((a, b) => {
      if (sort === 'year') {
        return b.year - a.year;
      }
      if (sort === 'count') {
        return getAverageForTitle(b.id).count - getAverageForTitle(a.id).count;
      }
      // Default to rating
      return (getAverageForTitle(b.id).avg ?? 0) - (getAverageForTitle(a.id).avg ?? 0);
    });

    return sorted;
  }, [query, genre, sort, getAverageForTitle]);

  useEffect(() => {
    setQuery(searchParams.get('q') || '');
  }, [searchParams]);

  useEffect(() => {
    setResults(filteredAndSortedTitles);
  }, [filteredAndSortedTitles]);
  

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // This will trigger the useMemo due to query state change
  };

  return (
    <div className="space-y-8">
      <h1 className="font-headline text-3xl font-bold">Pesquisar Títulos</h1>
      <div className="space-y-4 rounded-lg border bg-card p-4">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
          <Input 
            placeholder="Pesquisar por nome..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-grow"
          />
          <Button type="submit" className='sm:hidden'>Pesquisar</Button>
        </form>
        <div className="flex flex-col sm:flex-row gap-2">
          <Select value={genre} onValueChange={setGenre}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Género" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todos os géneros</SelectItem>
              {GENRES.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">⭐ Melhor avaliados</SelectItem>
              <SelectItem value="year">📅 Mais recentes</SelectItem>
              <SelectItem value="count">📈 Mais avaliados</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <section>
        <h2 className="text-xl font-bold mb-4">Resultados ({results.length})</h2>
        {results.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
            {results.map(title => (
              <MovieCard key={title.id} title={title} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-muted-foreground">
            <p>Nenhum título encontrado.</p>
            <p className="text-sm">Tente ajustar os seus filtros de pesquisa.</p>
          </div>
        )}
      </section>
    </div>
  );
}


export default function SearchPage() {
  return (
    <Suspense fallback={<div>A carregar...</div>}>
      <SearchPageComponent />
    </Suspense>
  )
}
