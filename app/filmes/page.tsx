import { movieCategories } from '@/lib/data';
import MovieCard from '@/components/MovieCard';

export default function FilmesPage() {
  const movies = [...movieCategories.destaques, ...movieCategories.acao, ...movieCategories.populares];
  const uniqueMovies = Array.from(new Map(movies.map(item => [item.id, item])).values());

  return (
    <div className="flex-1 flex flex-col px-4 lg:px-8 py-8 relative w-full">
      <div className="mb-8">
        <h1 className="text-4xl font-black text-white tracking-tighter">Filmes</h1>
        <p className="text-brand-text-muted mt-2">Explore os melhores filmes do nosso catálogo.</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pb-20">
        {uniqueMovies.map((movie) => (
          <div key={movie.id} className="w-full flex justify-center">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
}
