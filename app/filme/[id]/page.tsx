import { db } from '@/src/db';
import { movies } from '@/src/db/schema';
import { eq } from 'drizzle-orm';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import MovieRow from '@/components/MovieRow';
import Footer from '@/components/Footer';
import MovieActions from './MovieActions';

export const dynamic = 'force-dynamic';

export default async function MovieDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  const movieData = await db.select().from(movies).where(eq(movies.id, parseInt(resolvedParams.id)));
  const movie = movieData[0];

  if (!movie) {
    notFound();
  }

  const allMovies = await db.select().from(movies);

  return (
    <div className="flex-1 flex flex-col relative w-full bg-brand-bg min-h-screen">
      {/* Hero Backdrop */}
      <div className="relative w-full h-[60vh] lg:h-[80vh] shrink-0">
        <Image
          src={movie.bannerUrl || movie.thumbnailUrl}
          alt={movie.title}
          fill
          className="object-cover"
          priority
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-bg via-brand-bg/80 to-transparent" />
        <div className="absolute top-0 right-0 w-[800px] h-full bg-gradient-to-l from-brand-red/10 to-transparent opacity-60 blur-[100px]" />
        
        {/* Back Button */}
        <div className="absolute top-8 left-4 lg:left-8 z-50">
          <Link href="/" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 hover:bg-black/40">
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm font-bold">Voltar</span>
          </Link>
        </div>

        {/* Content */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-4 lg:p-12 pb-12 lg:pb-24 max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-2 py-1 bg-brand-red text-white text-[10px] font-black tracking-widest uppercase rounded">
              Original VendoFilmes
            </span>
            {movie.categories.map(cat => (
              <span key={cat} className="text-xs font-bold text-brand-text-muted bg-white/5 px-2 py-1 rounded border border-white/10">
                {cat}
              </span>
            ))}
          </div>

          <h1 className="text-5xl lg:text-7xl font-black text-white tracking-tighter leading-none mb-6 drop-shadow-2xl">
            {movie.title}
          </h1>

          <div className="flex items-center gap-4 text-sm font-bold text-white/80 mb-8">
            <span className="text-brand-green flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
              {movie.match}% Relevante
            </span>
            <span>{movie.year}</span>
            <span className="px-2 py-0.5 border border-white/20 rounded bg-white/5">{movie.rating}</span>
            <span>{movie.duration}</span>
            <span className="text-yellow-500">⭐ {(movie.match / 10).toFixed(1)}</span>
          </div>

          <p className="text-lg text-white/70 leading-relaxed max-w-2xl mb-10 font-medium">
            {movie.description}
          </p>

          <MovieActions movie={movie} />
        </div>
      </div>

      {/* More details / Cast / Episodes */}
      <div className="px-4 lg:px-12 py-12 relative z-30 -mt-20 lg:-mt-32 space-y-16">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl">
          <div className="md:col-span-2 space-y-8 bg-brand-card/40 backdrop-blur-3xl p-8 rounded-3xl border border-white/5">
            <h3 className="text-2xl font-bold text-white">Elenco Principal</h3>
            <div className="flex flex-wrap gap-4">
               {['Ator Famoso 1', 'Atriz Conhecida 2', 'Coadjuvante Estrela 3'].map((actor, i) => (
                 <div key={i} className="flex items-center gap-3 bg-white/5 pr-4 rounded-full border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                   <div className="w-12 h-12 rounded-full bg-gray-800 overflow-hidden relative">
                     <Image src={`https://picsum.photos/seed/actor${i}${movie.id}/100/100`} alt={actor} fill className="object-cover" referrerPolicy="no-referrer"/>
                   </div>
                   <span className="text-sm font-bold text-white">{actor}</span>
                 </div>
               ))}
            </div>
          </div>
          
          <div className="space-y-6 bg-brand-card/40 backdrop-blur-3xl p-8 rounded-3xl border border-white/5">
             <h3 className="text-xl font-bold text-white">Detalhes</h3>
             <div className="space-y-4 text-sm">
               <div>
                 <span className="text-brand-text-muted block mb-1">Gêneros</span>
                 <span className="text-white font-medium">{movie.categories.join(', ')}</span>
               </div>
               <div>
                 <span className="text-brand-text-muted block mb-1">Diretor</span>
                 <span className="text-white font-medium">Diretor Renomado</span>
               </div>
               <div>
                 <span className="text-brand-text-muted block mb-1">Qualidade de Áudio</span>
                 <span className="text-white font-medium">Dolby Atmos, Surround 5.1</span>
               </div>
             </div>
          </div>
        </div>

        <MovieRow title="Títulos Semelhantes" movies={allMovies.filter(m => m.id !== movie.id).slice(0, 5)} />
      </div>
      
      <Footer />
    </div>
  );
}
