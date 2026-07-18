import Hero from '@/components/Hero';
import MovieRow from '@/components/MovieRow';
import Footer from '@/components/Footer';
import { db } from '@/src/db';
import { movies } from '@/src/db/schema';
import { desc } from 'drizzle-orm';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const allMovies = await db.select().from(movies).orderBy(desc(movies.createdAt));
  const featuredMovie = allMovies.length > 0 ? allMovies[0] : null;
  
  return (
    <div className="px-4 lg:px-8 pb-8 flex-1 flex flex-col relative">
      {featuredMovie && <Hero movie={featuredMovie} />}
      <div className="flex-1 flex flex-col gap-10 mt-4 lg:mt-8 relative z-20">
        <MovieRow title="Adicionados Recentemente" movies={allMovies.slice(0, 10)} />
        <MovieRow title="Filmes" movies={allMovies.filter(m => m.categories.map(c => c.toLowerCase()).includes('filme') || m.categories.length === 0)} />
        <MovieRow title="Séries" movies={allMovies.filter(m => m.categories.map(c => c.toLowerCase()).includes('série'))} />
        <MovieRow title="Documentários" movies={allMovies.filter(m => m.categories.map(c => c.toLowerCase()).includes('documentário'))} />
      </div>
      <div className="mt-16">
        <Footer />
      </div>
    </div>
  );
}
