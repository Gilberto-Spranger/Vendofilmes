'use client';

import { useDownloads } from '@/store/DownloadsProvider';
import MovieCard from '@/components/MovieCard';
import { HardDrive, AlertCircle } from 'lucide-react';
import Footer from '@/components/Footer';

export default function DownloadsPage() {
  const { downloads, storageUsed, storageTotal } = useDownloads();
  const storagePercentage = Math.min((storageUsed / storageTotal) * 100, 100);

  return (
    <div className="px-4 lg:px-8 pb-8 flex-1 flex flex-col relative min-h-screen">
      <div className="pt-8 mb-12">
        <h1 className="text-3xl lg:text-5xl font-black text-white tracking-tighter mb-4">Meus Downloads</h1>
        <p className="text-brand-text-muted">Filmes e séries baixados para assistir offline, em qualquer lugar.</p>
        
        {/* Storage Widget */}
        <div className="mt-8 bg-brand-card border border-white/10 rounded-2xl p-6 max-w-2xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-brand-red/20 flex items-center justify-center">
              <HardDrive className="w-5 h-5 text-brand-red" />
            </div>
            <div>
              <h3 className="font-bold text-white">Armazenamento do Dispositivo</h3>
              <p className="text-xs text-brand-text-muted">{(storageUsed / 1024).toFixed(1)} GB usados de {(storageTotal / 1024).toFixed(1)} GB</p>
            </div>
          </div>
          
          <div className="w-full h-2 bg-black/50 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-1000 ${storagePercentage > 90 ? 'bg-red-500' : 'bg-brand-red'}`}
              style={{ width: `${storagePercentage}%` }}
            />
          </div>
          
          {storagePercentage > 90 && (
            <div className="mt-3 flex items-center gap-2 text-red-400 text-xs font-medium">
              <AlertCircle className="w-4 h-4" />
              Armazenamento quase cheio. Remova downloads antigos.
            </div>
          )}
        </div>
      </div>

      {downloads.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50">
          <div className="w-24 h-24 mb-6 rounded-full bg-white/5 flex items-center justify-center">
             <HardDrive className="w-10 h-10 text-white/50" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Nenhum download ainda</h2>
          <p className="text-sm max-w-md mx-auto">Os títulos que você baixar aparecerão aqui para você curtir mesmo sem internet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 gap-y-12">
          {downloads.map(movie => (
            <div key={movie.id} className="relative">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-auto pt-20">
        <Footer />
      </div>
    </div>
  );
}
