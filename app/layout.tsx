import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import FloatingPlayer from '@/components/FloatingPlayer';
import { DownloadsProvider } from '@/store/DownloadsProvider';
import AiSupportAgent from '@/components/AiSupportAgent';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'VendoFilmes | Streaming Premium',
  description: 'Plataforma premium de streaming de filmes, séries e documentários.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-brand-bg text-brand-text overflow-hidden antialiased`} suppressHydrationWarning>
        <DownloadsProvider>
          <div className="flex h-[100dvh] w-full bg-[#050505]">
            <Sidebar />
            <div className="flex-1 flex flex-col relative overflow-hidden bg-brand-bg md:rounded-l-3xl md:border-l md:border-white/5 shadow-[-20px_0_50px_rgba(0,0,0,0.5)]">
              <main className="flex-1 flex flex-col relative overflow-y-auto overflow-x-hidden scrollbar-hide">
                <Navbar />
                {children}
                <FloatingPlayer />
                <AiSupportAgent />
              </main>
            </div>
          </div>
        </DownloadsProvider>
      </body>
    </html>
  );
}
