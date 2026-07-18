'use client';
import { Trash2, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DeleteMovieButton({ id }: { id: number }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm('Tem certeza que deseja remover este filme?')) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/movies/${id}`, { method: 'DELETE' });
      if (res.ok) {
        router.refresh();
      } else {
        alert('Erro ao deletar o filme');
      }
    } catch (e) {
      alert('Erro ao deletar o filme');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={loading}
      className="p-2 bg-brand-red/10 rounded-lg hover:bg-brand-red text-brand-red hover:text-white transition-colors disabled:opacity-50" 
      title="Remover"
    >
      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
    </button>
  );
}
