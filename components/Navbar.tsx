'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Bell, Menu, User, Wallet, CreditCard, LogOut, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const mainContent = document.querySelector('main');
      if (mainContent) {
        setIsScrolled(mainContent.scrollTop > 50);
      }
    };
    const mainContent = document.querySelector('main');
    mainContent?.addEventListener('scroll', handleScroll);
    return () => mainContent?.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/pesquisa?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className={`sticky top-0 h-20 flex items-center justify-between px-4 lg:px-8 z-50 shrink-0 transition-all duration-500 ${isScrolled ? 'bg-brand-bg/80 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.5)] border-b border-white/5' : 'bg-gradient-to-b from-black/80 to-transparent pt-4'}`}>
      <div className="lg:hidden flex items-center gap-4">
        <button className="hover:scale-110 transition-transform"><Menu className="w-6 h-6 text-white" /></button>
        <span className="text-xl font-black tracking-tighter text-white">
          VENDO<span className="text-brand-red">FILMES</span>
        </span>
      </div>
      
      <form onSubmit={handleSearch} className="hidden lg:block relative w-[400px] group">
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Pesquisar títulos, gêneros ou diretores..." 
          className="w-full bg-white/5 border border-white/10 rounded-full px-12 py-2.5 text-sm focus:outline-none focus:border-brand-red/50 focus:bg-white/10 transition-all text-white placeholder:text-white/40 shadow-inner group-hover:bg-white/10"
        />
        <Search className="w-4 h-4 absolute left-5 top-3.5 opacity-40 text-white transition-opacity group-focus-within:opacity-100" />
      </form>

      <div className="flex items-center gap-6 relative" ref={dropdownRef}>
        <div className="relative cursor-pointer hover:opacity-80 transition-opacity">
          <Bell className="w-5 h-5 opacity-60 text-white" />
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-brand-red rounded-full"></div>
        </div>
        
        <div 
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-3 bg-brand-card py-1.5 pl-1.5 pr-4 rounded-full border border-white/10 cursor-pointer hover:border-brand-red/30 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-red to-brand-green flex items-center justify-center text-[10px] font-bold text-white">
            JD
          </div>
          <div className="hidden md:flex flex-col">
            <span className="text-[11px] font-bold text-white leading-tight">João Duarte</span>
            <span className="text-[9px] text-brand-green font-bold uppercase tracking-widest">Premium</span>
          </div>
        </div>

        <AnimatePresence>
          {isDropdownOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-14 right-0 w-56 bg-brand-card border border-white/10 rounded-2xl shadow-2xl overflow-hidden py-2"
            >
              <div className="px-4 py-3 border-b border-white/5 mb-2">
                <span className="block text-xs text-brand-text-muted mb-1">Saldo da Carteira</span>
                <span className="block text-lg font-black text-brand-green">R$ 42,90</span>
              </div>
              
              <Link href="/perfil" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-brand-text-muted hover:text-white hover:bg-white/5 transition-colors">
                <User className="w-4 h-4" /> Meu Perfil
              </Link>
              <Link href="/carteira" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-brand-text-muted hover:text-white hover:bg-white/5 transition-colors">
                <Wallet className="w-4 h-4" /> Carteira e Depósitos
              </Link>
              <Link href="/planos" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-brand-text-muted hover:text-white hover:bg-white/5 transition-colors">
                <CreditCard className="w-4 h-4" /> Assinaturas (Stripe)
              </Link>
              <Link href="/admin/filmes/novo" onClick={() => setIsDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-brand-text-muted hover:text-white hover:bg-white/5 transition-colors">
                <Plus className="w-4 h-4" /> Adicionar Filme
              </Link>
              
              <div className="mt-2 pt-2 border-t border-white/5">
                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-brand-red hover:bg-white/5 transition-colors">
                  <LogOut className="w-4 h-4" /> Sair da Conta
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
