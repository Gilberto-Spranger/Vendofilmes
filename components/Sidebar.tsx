'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Film, Tv, PlaySquare, Star, Clock, Download } from 'lucide-react';
import clsx from 'clsx';
import { motion } from 'motion/react';

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', icon: Home, label: 'Início' },
    { href: '/filmes', icon: Film, label: 'Filmes' },
    { href: '/series', icon: Tv, label: 'Séries' },
    { href: '/documentarios', icon: PlaySquare, label: 'Documentários' },
  ];

  const libraryItems = [
    { href: '/minha-lista', icon: Star, label: 'Minha Lista' },
    { href: '/downloads', icon: Download, label: 'Downloads' },
    { href: '/historico', icon: Clock, label: 'Histórico' },
  ];

  return (
    <aside className="w-64 border-r border-white/5 flex flex-col p-6 hidden lg:flex bg-[#0A0A0A] z-50 shrink-0">
      <div className="flex items-center gap-3 mb-12 cursor-pointer hover:scale-105 transition-transform origin-left">
        <div className="relative w-10 h-10 flex items-center justify-center">
          <div className="absolute inset-0 bg-brand-red rounded-lg rotate-45 opacity-50 shadow-[0_0_15px_rgba(139,0,0,0.5)]"></div>
          <div className="z-10 text-xl">🎬</div>
        </div>
        <span className="text-2xl font-black tracking-tighter text-white">
          VENDO<span className="text-brand-red">FILMES</span>
        </span>
      </div>

      <nav className="space-y-8 flex-1">
        <div>
          <h3 className="text-[10px] uppercase tracking-[0.2em] text-brand-text-muted mb-4 font-bold ml-4">Navegação</h3>
          <ul className="space-y-1 relative">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href} className="block relative">
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute inset-0 bg-brand-card border-l-2 border-brand-red rounded-r-lg"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <li className={clsx(
                    "relative flex items-center gap-3 px-4 py-3 rounded-r-lg cursor-pointer transition-colors font-medium z-10",
                    isActive ? "text-white font-bold" : "text-brand-text-muted hover:text-white hover:bg-white/5"
                  )}>
                    <Icon className={clsx("w-4 h-4", isActive ? "text-brand-red" : "opacity-80")} /> 
                    <span className="text-sm">{item.label}</span>
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>

        <div>
          <h3 className="text-[10px] uppercase tracking-[0.2em] text-brand-text-muted mb-4 font-bold ml-4">Biblioteca</h3>
          <ul className="space-y-1 relative">
             {libraryItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href} className="block relative">
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute inset-0 bg-brand-card border-l-2 border-brand-red rounded-r-lg"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <li className={clsx(
                    "relative flex items-center gap-3 px-4 py-3 rounded-r-lg cursor-pointer transition-colors font-medium z-10",
                    isActive ? "text-white font-bold" : "text-brand-text-muted hover:text-white hover:bg-white/5"
                  )}>
                    <Icon className={clsx("w-4 h-4", isActive ? "text-brand-red" : "opacity-80")} /> 
                    <span className="text-sm">{item.label}</span>
                  </li>
                </Link>
              );
            })}
          </ul>
        </div>
      </nav>

      <div className="mt-auto">
        <div className="bg-gradient-to-br from-brand-card to-brand-bg p-5 rounded-2xl border border-white/5 shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-red/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-3">
              <span className="text-[9px] font-black bg-brand-red px-2 py-1 rounded-full text-white tracking-widest uppercase shadow-[0_0_10px_rgba(139,0,0,0.5)]">VIP PRO</span>
              <span className="text-[10px] text-brand-text-muted font-medium">Ativo</span>
            </div>
            <p className="text-sm font-black mb-4 text-white">Plano Premium 4K</p>
            <Link href="/planos" className="w-full block">
              <button className="w-full py-2.5 bg-brand-green/10 border border-brand-green/30 text-brand-green text-xs font-bold rounded-xl hover:bg-brand-green hover:text-white transition-all shadow-lg hover:shadow-[0_0_20px_rgba(11,93,58,0.4)]">
                GERENCIAR PLANO
              </button>
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}
