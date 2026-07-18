import Hero from '@/components/Hero';
import MovieRow from '@/components/MovieRow';
import Footer from '@/components/Footer';
import { movieCategories } from '@/lib/data';

export default function Home() {
  return (
        <div className="px-4 lg:px-8 pb-8 flex-1 flex flex-col relative">
          <Hero />
          <div className="flex-1 flex flex-col gap-10 mt-4 lg:mt-8 relative z-20">
            <MovieRow title="Recomendado para Você" movies={movieCategories.novidades} />
            <MovieRow title="Filmes em Destaque" movies={movieCategories.destaques} />
            <MovieRow title="Documentários" movies={movieCategories.documentarios} />
            <MovieRow title="Mais Assistidos" movies={movieCategories.populares} />
            <MovieRow title="Ação e Aventura" movies={movieCategories.acao} />
          </div>
          <div className="mt-16">
            <Footer />
          </div>
        </div>
  );
}
