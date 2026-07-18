'use client';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Movie } from '@/types';

type DownloadsContextType = {
  downloads: Movie[];
  addDownload: (movie: Movie) => void;
  removeDownload: (movieId: number) => void;
  storageUsed: number;
  storageTotal: number;
};

const DownloadsContext = createContext<DownloadsContextType | undefined>(undefined);

export function DownloadsProvider({ children }: { children: ReactNode }) {
  const [downloads, setDownloads] = useState<Movie[]>([]);
  const storageTotal = 15360; // 15 GB total storage

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('vendofilmes_downloads');
    if (saved) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setDownloads(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const addDownload = (movie: Movie) => {
    if (!downloads.find(d => d.id === movie.id)) {
      const newDownloads = [...downloads, { ...movie, isDownloaded: true }];
      setDownloads(newDownloads);
      localStorage.setItem('vendofilmes_downloads', JSON.stringify(newDownloads));
    }
  };

  const removeDownload = (movieId: number) => {
    const newDownloads = downloads.filter(d => d.id !== movieId);
    setDownloads(newDownloads);
    localStorage.setItem('vendofilmes_downloads', JSON.stringify(newDownloads));
  };

  // Assume each movie takes roughly ~1.2GB for 4K/HD mixed
  const storageUsed = downloads.length * 1250; 

  return (
    <DownloadsContext.Provider value={{ downloads, addDownload, removeDownload, storageUsed, storageTotal }}>
      {children}
    </DownloadsContext.Provider>
  );
}

export function useDownloads() {
  const context = useContext(DownloadsContext);
  if (!context) throw new Error('useDownloads must be used within DownloadsProvider');
  return context;
}
