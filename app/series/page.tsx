import MovieCard from '@/components/MovieCard';
import { db } from '@/src/db';
import { movies } from '@/src/db/schema';
import { desc } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const allMovies = await db.select().from(movies).orderBy(desc(movies.createdAt));
  const filteredMovies = allMovies.filter(m => m.categories.map(c => c.toLowerCase()).includes("série"));
  
  return (
    <div className="flex-1 flex flex-col px-4 lg:px-8 py-8 relative w-full">
      <div className="mb-8">
        <h1 className="text-4xl font-black text-white tracking-tighter">Séries</h1>
        <p className="text-brand-text-muted mt-2">Explore as melhores séries do nosso catálogo.</p>
      </div>
      
      {filteredMovies.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <p className="text-brand-text-muted font-medium">Nenhum título disponível no momento.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pb-20">
          {filteredMovies.map((movie) => (
            <div key={movie.id} className="w-full flex justify-center">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
