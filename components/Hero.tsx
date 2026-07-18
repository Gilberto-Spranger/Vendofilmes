'use client';
import { Play, Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { featuredMovie } from '@/lib/data';
import { motion } from 'motion/react';

export default function Hero() {
  return (
    <div className="relative h-[340px] lg:h-[400px] rounded-[32px] overflow-hidden mb-8 border border-white/5 shrink-0">
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={featuredMovie.bannerUrl}
          alt={featuredMovie.title}
          fill
          className="object-cover"
          priority
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-brand-bg/60 to-transparent z-10" />
        <div className="absolute top-0 right-0 w-[600px] h-full bg-gradient-to-l from-brand-red/20 to-transparent opacity-50 blur-[80px] z-10" />
        <div className="absolute bottom-0 left-0 w-full h-[150px] bg-gradient-to-t from-brand-bg to-transparent z-10" />
      </div>
      
      <div className="absolute inset-0 z-20 p-8 lg:p-12 flex flex-col justify-center max-w-2xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-brand-text-muted">Filme em Destaque</span>
            <span className="w-1.5 h-1.5 bg-brand-red rounded-full"></span>
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-brand-green">Lançamento</span>
          </div>

          <h1 className="text-4xl lg:text-6xl font-black mb-4 tracking-tighter leading-none drop-shadow-lg text-white uppercase">
            {featuredMovie.title}
          </h1>
          
          <div className="flex items-center gap-4 mb-6 text-sm text-brand-text-muted drop-shadow-md">
            <span className="text-white font-bold">{featuredMovie.year}</span>
            <span className="px-1.5 py-0.5 border border-white/20 rounded font-bold">{featuredMovie.rating}</span>
            <span className="font-medium">{featuredMovie.duration}</span>
            <span className="flex items-center gap-1 text-yellow-500 font-bold">⭐ {featuredMovie.match / 10}</span>
          </div>

          <p className="text-brand-text-muted text-sm mb-8 line-clamp-2 lg:line-clamp-3 leading-relaxed opacity-80 font-light">
            {featuredMovie.description}
          </p>

          <div className="flex items-center gap-4">
            <button className="px-8 py-3 bg-white text-black font-bold rounded-xl flex items-center gap-2 hover:scale-105 transition-transform text-sm tracking-wide">
              <Play className="w-4 h-4 fill-black text-black" /> ASSISTIR AGORA
            </button>
            <button className="p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl hover:bg-white/20 transition-all text-white">
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
