'use client';

import { useSearchParams } from 'next/navigation';
import { movieCategories } from '@/lib/data';
import { Movie } from '@/types';
import MovieCard from '@/components/MovieCard';

export default function SearchResults() {
  const searchParams = useSearchParams();
  const q = searchParams.get('q') || '';

  const allMovies = Object.values(movieCategories).flat();
  const uniqueMovies = Array.from(new Map(allMovies.map(item => [item.id, item])).values());

  const results = uniqueMovies.filter(m => 
    m.title.toLowerCase().includes(q.toLowerCase()) || 
    m.categories.some(c => c.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <div className="space-y-8 w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white">Resultados da busca</h1>
        <p className="text-brand-text-muted mt-2">Buscando por: "{q}"</p>
      </div>

      {results.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pb-20">
          {results.map((movie) => (
            <div key={movie.id} className="w-full flex justify-center">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="text-6xl mb-4">🎬</div>
          <h2 className="text-2xl font-bold text-white mb-2">Nenhum título encontrado</h2>
          <p className="text-brand-text-muted max-w-md">Não encontramos nenhum filme, série ou documentário correspondente à sua busca.</p>
        </div>
      )}
    </div>
  );
}
