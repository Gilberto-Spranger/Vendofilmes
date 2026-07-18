import { movieCategories } from '@/lib/data';
import MovieCard from '@/components/MovieCard';

export default function HistoricoPage() {
  // Mocking user's history
  const movies = [...movieCategories.populares.slice(0, 4)];
  
  return (
    <div className="flex-1 flex flex-col px-4 lg:px-8 py-8 relative w-full min-h-[calc(100vh-80px)]">
      <div className="mb-8">
        <h1 className="text-4xl font-black text-white tracking-tighter">Histórico</h1>
        <p className="text-brand-text-muted mt-2">Títulos que você assistiu recentemente.</p>
      </div>
      
      {movies.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pb-20">
          {movies.map((movie) => (
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
