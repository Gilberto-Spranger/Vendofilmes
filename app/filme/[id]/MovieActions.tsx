'use client';

import { Play, Plus, ThumbsUp, Share2, Download, Check } from 'lucide-react';
import Link from 'next/link';
import { Movie } from '@/types';
import { useState, useEffect } from 'react';
import { useDownloads } from '@/store/DownloadsProvider';

export default function MovieActions({ movie }: { movie: Movie }) {
  const [inList, setInList] = useState(false);
  const [liked, setLiked] = useState(false);
  const { downloads, addDownload, removeDownload } = useDownloads();
  const [isDownloading, setIsDownloading] = useState(false);

  const isDownloaded = downloads.some(d => d.id === movie.id);

  useEffect(() => {
    // Check if in list
    const checkList = async () => {
      try {
        const res = await fetch('/api/minha-lista');
        const list = await res.json();
        if (list.some((m: any) => m.movieId === movie.id)) {
          setInList(true);
        }
      } catch (e) {
        console.error(e);
      }
    };
    checkList();
  }, [movie.id]);

  const toggleList = async () => {
    try {
      const res = await fetch('/api/minha-lista', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ movieId: movie.id }),
      });
      if (res.ok) {
        setInList(!inList);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: movie.title,
          text: movie.description,
          url: window.location.href,
        });
      } catch (err) {
        console.error(err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copiado para a área de transferência!');
    }
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isDownloaded) {
      removeDownload(movie.id);
    } else {
      setIsDownloading(true);
      setTimeout(() => {
        addDownload(movie);
        setIsDownloading(false);
      }, 1500);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-4">
      <Link href={`/assistir/${movie.id}`} className="px-8 py-4 bg-white text-black font-black rounded-xl flex items-center gap-3 hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.3)]">
        <Play className="w-5 h-5 fill-black" />
        ASSISTIR AGORA
      </Link>
      <button onClick={handleDownload} disabled={isDownloading} className={`px-6 py-4 bg-brand-card/80 backdrop-blur-xl border border-white/10 text-white font-bold rounded-xl flex items-center gap-3 hover:bg-white/10 hover:border-white/30 transition-all ${isDownloaded ? 'text-brand-green border-brand-green/50' : ''}`}>
        {isDownloading ? <span className="animate-pulse">BAIXANDO...</span> : isDownloaded ? <><Check className="w-5 h-5" /> BAIXADO</> : <><Download className="w-5 h-5" /> BAIXAR</>}
      </button>
      <button onClick={toggleList} title="Minha Lista" className={`w-14 h-14 flex items-center justify-center bg-brand-card/80 backdrop-blur-xl border border-white/10 text-white rounded-xl hover:bg-white/10 hover:border-white/30 transition-all ${inList ? 'text-brand-green border-brand-green/50' : ''}`}>
        {inList ? <Check className="w-6 h-6 text-brand-green" /> : <Plus className="w-6 h-6" />}
      </button>
      <button onClick={() => setLiked(!liked)} title="Gostei" className={`w-14 h-14 flex items-center justify-center bg-brand-card/80 backdrop-blur-xl border border-white/10 text-white rounded-xl hover:bg-white/10 hover:border-white/30 transition-all ${liked ? 'bg-white/20 text-blue-400 border-blue-400/50' : ''}`}>
        <ThumbsUp className={`w-5 h-5 ${liked ? 'fill-blue-400' : ''}`} />
      </button>
      <button onClick={share} title="Compartilhar" className="w-14 h-14 flex items-center justify-center bg-brand-card/80 backdrop-blur-xl border border-white/10 text-white rounded-xl hover:bg-white/10 hover:border-white/30 transition-all">
        <Share2 className="w-5 h-5" />
      </button>
    </div>
  );
}
