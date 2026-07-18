'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function WatchMoviePage() {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchMovie = async () => {
      try {
        const res = await fetch('/api/movies');
        const data = await res.json();
        const found = data.find((m: any) => m.id.toString() === id);
        if (found) {
          setMovie(found);
          // Record history
          fetch('/api/historico', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ movieId: found.id, progress: 1 })
          }).catch(console.error);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-brand-red animate-spin" />
      </div>
    );
  }

  if (!movie || !movie.videoUrl) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-white">
        <h1 className="text-2xl font-bold mb-4">Filme não encontrado ou vídeo indisponível.</h1>
        <Link href={`/filme/${id}`} className="px-6 py-2 bg-brand-red rounded-lg font-bold hover:bg-brand-red/80 transition">
          Voltar
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative">
      <div className="absolute top-0 left-0 right-0 p-6 z-50 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent">
        <Link href={`/filme/${id}`} className="w-10 h-10 rounded-full bg-black/50 backdrop-blur flex items-center justify-center border border-white/10 hover:bg-white/10 transition-colors">
          <ArrowLeft className="w-5 h-5 text-white" />
        </Link>
        <h1 className="text-lg font-bold truncate max-w-sm">{movie.title}</h1>
        <div className="w-10"></div>
      </div>
      
      <div className="flex-1 flex items-center justify-center relative bg-black">
        <video 
          src={movie.videoUrl} 
          controls 
          autoPlay 
          className="w-full h-full max-h-screen outline-none"
        />
      </div>
    </div>
  );
}
