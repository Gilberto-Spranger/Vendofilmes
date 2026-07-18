'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Play, Plus, ThumbsUp, ChevronDown, Download, CheckCircle2, Loader2, Trash2 } from 'lucide-react';
import { Movie } from '@/types';
import { motion, AnimatePresence } from 'motion/react';
import { useDownloads } from '@/store/DownloadsProvider';

export default function MovieCard({ movie }: { movie: Movie }) {
  const [isHovered, setIsHovered] = useState(false);
  const { downloads, addDownload, removeDownload } = useDownloads();
  const [isDownloading, setIsDownloading] = useState(false);

  const isDownloaded = downloads.some(d => d.id === movie.id);

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isDownloaded) {
      removeDownload(movie.id);
    } else {
      setIsDownloading(true);
      // Simulate network download
      setTimeout(() => {
        addDownload(movie);
        setIsDownloading(false);
      }, 1500);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="relative flex-none w-[240px] lg:w-[280px] z-10 hover:z-50 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/filme/${movie.id}`} className="block h-full relative rounded-2xl bg-brand-card overflow-hidden border border-white/5 transition-all duration-300 group-hover:border-brand-red/30 cursor-pointer group-hover:shadow-[0_0_30px_rgba(139,0,0,0.15)]">
        <div className="aspect-[16/9] relative bg-[#222]">
           <Image
              src={movie.bannerUrl || movie.thumbnailUrl}
              alt={movie.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 160px, (max-width: 1024px) 240px, 280px"
              referrerPolicy="no-referrer"
            />
            {isDownloaded && (
              <div className="absolute top-2 left-2 px-2 py-1 bg-black/60 backdrop-blur-md rounded-md z-20 flex items-center gap-1 border border-white/10">
                <CheckCircle2 className="w-3 h-3 text-brand-green" />
                <span className="text-[9px] font-bold text-white uppercase tracking-wider">Baixado</span>
              </div>
            )}
            <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-brand-green text-[9px] font-bold rounded text-white z-20 shadow-lg">4K ULTRA</div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent z-10"></div>
        </div>
        <div className="p-4 relative z-20 bg-brand-card">
          <div className="flex justify-between items-start mb-1">
            <h3 className="text-sm font-bold truncate text-white">{movie.title}</h3>
            <span className="text-yellow-500 text-[10px] font-bold italic shrink-0 ml-2">IMDb {(movie.match / 10).toFixed(1)}</span>
          </div>
          <p className="text-[11px] text-brand-text-muted font-medium truncate">
            {movie.categories.join(' • ')} • {movie.year}
          </p>
        </div>
      </Link>
      
      <AnimatePresence>
        {isHovered && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1.05 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute -top-6 -left-4 -right-4 bg-[#111] rounded-2xl shadow-2xl shadow-black/80 overflow-hidden origin-bottom z-50 border border-white/10 ring-1 ring-brand-red/20"
          >
            <div className="relative aspect-[16/9] w-full bg-[#222]">
               <Image
                  src={movie.bannerUrl || movie.thumbnailUrl}
                  alt={movie.title}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent z-10"></div>
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
                  <Link href={`/assistir/${movie.id}`} className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/50 transform scale-50 group-hover:scale-100 transition-transform duration-300">
                    <Play className="w-5 h-5 fill-white text-white ml-0.5" />
                  </Link>
                </div>
            </div>
            <div className="p-5 space-y-4 relative z-20 bg-[#111] -mt-4">
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <Link href={`/assistir/${movie.id}`} className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:scale-110 transition-transform">
                    <Play className="w-4 h-4 fill-black text-black ml-0.5" />
                  </Link>
                  <button className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center hover:border-white hover:bg-white/10 transition-colors bg-white/5">
                    <Plus className="w-4 h-4 text-white" />
                  </button>
                  <button className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center hover:border-white hover:bg-white/10 transition-colors bg-white/5">
                    <ThumbsUp className="w-4 h-4 text-white" />
                  </button>
                  <button 
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className={`w-8 h-8 rounded-full border border-white/30 flex items-center justify-center transition-colors ${isDownloaded ? 'bg-brand-red/20 border-brand-red text-brand-red hover:bg-brand-red/30' : 'bg-white/5 hover:border-white hover:bg-white/10 text-white'}`}
                    title={isDownloaded ? "Remover Download" : "Baixar para Offline"}
                  >
                    {isDownloading ? (
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                    ) : isDownloaded ? (
                      <Trash2 className="w-4 h-4" />
                    ) : (
                      <Download className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <button className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center hover:border-white hover:bg-white/10 transition-colors bg-white/5">
                  <ChevronDown className="w-4 h-4 text-white" />
                </button>
              </div>

              <div className="flex items-center gap-3 text-xs font-bold text-white">
                <span className="text-brand-green">{movie.match}% Relevante</span>
                <span className="border border-white/20 px-1.5 py-0.5 rounded text-[10px] bg-white/5">{movie.rating}</span>
                <span className="text-brand-text-muted">{movie.duration}</span>
              </div>
              
              <div className="text-[11px] text-brand-text-muted font-medium flex items-center gap-1.5 flex-wrap">
                {movie.categories.map((cat, i) => (
                  <span key={cat} className="flex items-center gap-1.5">
                    <span className="text-gray-300">{cat}</span>
                    {i < movie.categories.length - 1 && <span className="text-brand-red font-bold text-[8px]">•</span>}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
