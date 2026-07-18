import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full bg-brand-bg text-brand-text-muted py-12 border-t border-brand-card">
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
        <div className="mb-8">
          <span className="font-bold text-2xl tracking-tighter text-white">
            Vendo<span className="text-brand-red">Filmes</span>
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          <div className="flex flex-col gap-3">
            <Link href="#" className="hover:text-white transition">Áudio e Legendas</Link>
            <Link href="#" className="hover:text-white transition">Imprensa</Link>
            <Link href="#" className="hover:text-white transition">Privacidade</Link>
            <Link href="#" className="hover:text-white transition">Contato</Link>
          </div>
          <div className="flex flex-col gap-3">
            <Link href="#" className="hover:text-white transition">Audiodescrição</Link>
            <Link href="#" className="hover:text-white transition">Relações com Investidores</Link>
            <Link href="#" className="hover:text-white transition">Avisos Legais</Link>
          </div>
          <div className="flex flex-col gap-3">
            <Link href="#" className="hover:text-white transition">Centro de Ajuda</Link>
            <Link href="#" className="hover:text-white transition">Carreiras</Link>
            <Link href="#" className="hover:text-white transition">Preferências de Cookies</Link>
          </div>
          <div className="flex flex-col gap-3">
            <Link href="#" className="hover:text-white transition">Cartão Pré-pago</Link>
            <Link href="#" className="hover:text-white transition">Termos de Uso</Link>
            <Link href="#" className="hover:text-white transition">Informações Corporativas</Link>
          </div>
        </div>
        <div className="mt-12 text-xs">
          <p>© {new Date().getFullYear()} VendoFilmes. Desenvolvido para proporcionar a melhor experiência de streaming.</p>
        </div>
      </div>
    </footer>
  );
}
