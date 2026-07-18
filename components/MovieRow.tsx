'use client';
import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from './MovieCard';
import { Movie } from '@/types';

interface MovieRowProps {
  title: string;
  movies: Movie[];
}

export default function MovieRow({ title, movies }: MovieRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col gap-4 group relative z-30">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold tracking-tight text-white transition-colors">
          {title}
        </h2>
        <button className="text-[11px] uppercase tracking-widest text-brand-text-muted hover:text-brand-red transition-colors font-medium">Ver Tudo</button>
      </div>
      
      <div className="relative">
        <button 
          className="absolute left-0 top-0 bottom-0 z-40 w-16 bg-gradient-to-r from-brand-bg via-brand-bg/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center hover:w-20 hover:text-white text-white/50"
          onClick={() => scroll('left')}
        >
          <ChevronLeft className="w-10 h-10 drop-shadow-lg transform -translate-x-2 group-hover:translate-x-0 transition-transform" />
        </button>

        <div 
          ref={rowRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-8 pt-4 px-4 -mx-4"
        >
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        <button 
          className="absolute right-0 top-0 bottom-0 z-40 w-16 bg-gradient-to-l from-brand-bg via-brand-bg/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center hover:w-20 hover:text-white text-white/50"
          onClick={() => scroll('right')}
        >
          <ChevronRight className="w-10 h-10 drop-shadow-lg transform translate-x-2 group-hover:translate-x-0 transition-transform" />
        </button>
      </div>
    </div>
  );
}
