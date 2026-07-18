import { Movie } from '@/types';

export const featuredMovie: Movie = {
  id: 'featured-1',
  title: 'O Despertar da IA',
  description: 'Num futuro não tão distante, a inteligência artificial alcança a singularidade. Um grupo de engenheiros deve decidir se a desliga ou a liberta, mudando o destino da humanidade para sempre.',
  thumbnailUrl: 'https://picsum.photos/seed/ai1/800/1200',
  bannerUrl: 'https://picsum.photos/seed/ai2/1920/1080',
  duration: '2h 15m',
  year: 2026,
  rating: '16+',
  categories: ['Ficção Científica', 'Suspense', 'Ação'],
  match: 98,
};

const generateMovies = (seedStart: number, count: number, categories: string[]): Movie[] => {
  return Array.from({ length: count }).map((_, i) => {
    const shuffledCats = [...categories].sort(() => 0.5 - Math.random());
    return {
      id: `m-${seedStart}-${i}`,
      title: `Filme Incrível ${seedStart + i}`,
      description: 'Uma história emocionante cheia de reviravoltas e momentos inesquecíveis.',
      thumbnailUrl: `https://picsum.photos/seed/thumb${seedStart + i}/800/1200`,
      bannerUrl: `https://picsum.photos/seed/banner${seedStart + i}/1920/1080`,
      duration: `${Math.floor(Math.random() * 2) + 1}h ${Math.floor(Math.random() * 59)}m`,
      year: 2020 + Math.floor(Math.random() * 5),
      rating: ['L', '10+', '12+', '14+', '16+', '18+'][Math.floor(Math.random() * 6)],
      categories: shuffledCats.slice(0, 2),
      match: 80 + Math.floor(Math.random() * 19),
    };
  });
};

export const getMovieById = (id: string): Movie | undefined => {
  if (featuredMovie.id === id) return featuredMovie;
  for (const category of Object.values(movieCategories)) {
    const found = category.find(m => m.id === id);
    if (found) return found;
  }
  return undefined;
};

export const movieCategories = {
  destaques: generateMovies(100, 10, ['Ação', 'Drama', 'Suspense']),
  documentarios: generateMovies(200, 10, ['Documentário', 'Natureza', 'História']),
  populares: generateMovies(300, 10, ['Comédia', 'Romance', 'Família']),
  novidades: generateMovies(400, 10, ['Terror', 'Ficção', 'Mistério']),
  acao: generateMovies(500, 10, ['Ação', 'Aventura']),
};
