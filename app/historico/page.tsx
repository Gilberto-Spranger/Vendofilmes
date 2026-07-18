import MovieCard from '@/components/MovieCard';
import { db } from '@/src/db';
import { userMoviesHistory, movies, users } from '@/src/db/schema';
import { eq, desc } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

export default async function HistoricoPage() {
  const existingUsers = await db.select().from(users).limit(1);
  const userId = existingUsers.length > 0 ? existingUsers[0].id : null;
  
  let userMovies: any[] = [];
  
  if (userId) {
    const history = await db.select({
      movie: movies
    })
    .from(userMoviesHistory)
    .innerJoin(movies, eq(userMoviesHistory.movieId, movies.id))
    .where(eq(userMoviesHistory.userId, userId))
    .orderBy(desc(userMoviesHistory.watchedAt));
    
    // remove duplicates keeping most recent
    const uniqueMovies = Array.from(new Map(history.map(item => [item.movie.id, item.movie])).values());
    userMovies = uniqueMovies;
  }
  
  return (
    <div className="flex-1 flex flex-col px-4 lg:px-8 py-8 relative w-full min-h-[calc(100vh-80px)]">
      <div className="mb-8">
        <h1 className="text-4xl font-black text-white tracking-tighter">Histórico</h1>
        <p className="text-brand-text-muted mt-2">Títulos que você assistiu recentemente.</p>
      </div>
      
      {userMovies.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pb-20">
          {userMovies.map((movie) => (
            <div key={movie.id} className="w-full flex justify-center opacity-80 hover:opacity-100 transition-opacity grayscale-[30%] hover:grayscale-0">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center flex-1">
          <div className="text-6xl mb-4">⏱️</div>
          <h2 className="text-2xl font-bold text-white mb-2">Sem histórico</h2>
          <p className="text-brand-text-muted max-w-md">Você ainda não assistiu a nenhum título. Dê o play em algo agora mesmo!</p>
        </div>
      )}
    </div>
  );
}
