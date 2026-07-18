import { db } from '@/src/db';
import { movies } from '@/src/db/schema';
import { desc } from 'drizzle-orm';
import Link from 'next/link';
import { Plus, Edit } from 'lucide-react';
import Image from 'next/image';
import DeleteMovieButton from './DeleteMovieButton';

export const dynamic = 'force-dynamic';

export default async function AdminMoviesPage() {
  const allMovies = await db.select().from(movies).orderBy(desc(movies.createdAt));

  return (
    <div className="flex-1 flex flex-col px-4 lg:px-8 py-8 relative w-full min-h-[calc(100vh-80px)]">
      <div className="max-w-5xl mx-auto w-full">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tighter">Gerenciar Filmes</h1>
            <p className="text-brand-text-muted mt-1 text-sm">Adicione, edite ou remova filmes do catálogo.</p>
          </div>
          <Link href="/admin/filmes/novo" className="px-6 py-2 bg-brand-red text-white font-bold rounded-xl hover:bg-brand-red/80 transition-all flex items-center gap-2 shadow-lg">
            <Plus className="w-5 h-5" />
            Adicionar Filme
          </Link>
        </div>

        <div className="bg-brand-card border border-white/5 rounded-3xl p-6 shadow-xl overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-brand-text-muted text-xs uppercase tracking-wider">
                <th className="pb-4 font-bold">Capa</th>
                <th className="pb-4 font-bold">Título</th>
                <th className="pb-4 font-bold">Ano</th>
                <th className="pb-4 font-bold">Ações</th>
              </tr>
            </thead>
            <tbody>
              {allMovies.map((movie) => (
                <tr key={movie.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-4">
                    <div className="w-16 h-24 relative rounded-md overflow-hidden bg-white/5">
                      <Image src={movie.thumbnailUrl} alt={movie.title} fill className="object-cover" />
                    </div>
                  </td>
                  <td className="py-4 font-bold text-white">{movie.title}</td>
                  <td className="py-4 text-brand-text-muted">{movie.year}</td>
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <button className="p-2 bg-white/5 rounded-lg hover:bg-white/10 text-white transition-colors" title="Editar">
                        <Edit className="w-4 h-4" />
                      </button>
                      <DeleteMovieButton id={movie.id} />
                    </div>
                  </td>
                </tr>
              ))}
              {allMovies.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-brand-text-muted font-medium">Nenhum filme encontrado.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
