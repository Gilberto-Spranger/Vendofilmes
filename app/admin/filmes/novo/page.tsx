'use client';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Save, ArrowLeft, Loader2, UploadCloud } from 'lucide-react';
import Link from 'next/link';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/firebase';

export default function AddMoviePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    year: new Date().getFullYear().toString(),
    rating: 'L',
    match: '95',
    categories: '',
  });

  const [files, setFiles] = useState<{
    thumbnail: File | null;
    banner: File | null;
    video: File | null;
  }>({
    thumbnail: null,
    banner: null,
    video: null,
  });

  const uploadFile = async (file: File, path: string) => {
    const storageRef = ref(storage, `${path}/${Date.now()}_${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    return getDownloadURL(snapshot.ref);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!files.thumbnail || !files.banner || !files.video) {
      alert('Por favor, selecione a capa, o banner e o vídeo.');
      return;
    }
    setLoading(true);
    
    try {
      const thumbnailUrl = await uploadFile(files.thumbnail, 'thumbnails');
      const bannerUrl = await uploadFile(files.banner, 'banners');
      const videoUrl = await uploadFile(files.video, 'videos');

      const payload = {
        ...formData,
        categories: formData.categories.split(',').map(c => c.trim()).filter(Boolean),
        thumbnailUrl,
        bannerUrl,
        videoUrl,
      };
      
      const res = await fetch('/api/movies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      
      if (!res.ok) throw new Error('Failed to create movie');
      
      router.push('/filmes');
      router.refresh();
    } catch (error) {
      console.error(error);
      alert('Erro ao adicionar o filme. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: keyof typeof files) => {
    if (e.target.files && e.target.files[0]) {
      setFiles(prev => ({ ...prev, [type]: e.target.files![0] }));
    }
  };

  return (
    <div className="flex-1 flex flex-col px-4 lg:px-8 py-8 relative w-full min-h-[calc(100vh-80px)]">
      <div className="max-w-3xl mx-auto w-full">
        <div className="mb-8 flex items-center gap-4">
          <Link href="/filmes" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:bg-white/10 transition-colors">
            <ArrowLeft className="w-5 h-5 text-white" />
          </Link>
          <div>
            <h1 className="text-3xl font-black text-white tracking-tighter">Adicionar Filme</h1>
            <p className="text-brand-text-muted mt-1 text-sm">Preencha os detalhes e faça o upload dos arquivos para adicionar um novo filme.</p>
          </div>
        </div>
        
        <div className="bg-brand-card border border-white/5 rounded-3xl p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-brand-text-muted uppercase tracking-wider mb-2">Título</label>
                <input required type="text" name="title" value={formData.title} onChange={handleChange} className="w-full bg-brand-bg border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-red/50 transition-colors" placeholder="Ex: O Retorno do Rei" />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-brand-text-muted uppercase tracking-wider mb-2">Descrição</label>
                <textarea required name="description" value={formData.description} onChange={handleChange} rows={4} className="w-full bg-brand-bg border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-red/50 transition-colors" placeholder="Sinopse do filme..." />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-brand-text-muted uppercase tracking-wider mb-2">Categorias (separadas por vírgula)</label>
                <input required type="text" name="categories" value={formData.categories} onChange={handleChange} className="w-full bg-brand-bg border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-red/50 transition-colors" placeholder="Ex: Ação, Aventura, Fantasia" />
              </div>

              <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-bold text-brand-text-muted uppercase tracking-wider mb-2">Capa (Imagem Vertical)</label>
                  <label className="w-full h-32 bg-brand-bg border border-white/10 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-brand-red/50 transition-colors group">
                    <UploadCloud className="w-6 h-6 text-white/50 mb-2 group-hover:text-brand-red transition-colors" />
                    <span className="text-xs text-white/50 text-center px-2">{files.thumbnail ? files.thumbnail.name : 'Selecionar Capa'}</span>
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange(e, 'thumbnail')} />
                  </label>
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-text-muted uppercase tracking-wider mb-2">Banner (Imagem Horizontal)</label>
                  <label className="w-full h-32 bg-brand-bg border border-white/10 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-brand-red/50 transition-colors group">
                    <UploadCloud className="w-6 h-6 text-white/50 mb-2 group-hover:text-brand-red transition-colors" />
                    <span className="text-xs text-white/50 text-center px-2">{files.banner ? files.banner.name : 'Selecionar Banner'}</span>
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange(e, 'banner')} />
                  </label>
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-text-muted uppercase tracking-wider mb-2">Filme (Arquivo de Vídeo)</label>
                  <label className="w-full h-32 bg-brand-bg border border-white/10 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-brand-red/50 transition-colors group">
                    <UploadCloud className="w-6 h-6 text-white/50 mb-2 group-hover:text-brand-red transition-colors" />
                    <span className="text-xs text-white/50 text-center px-2">{files.video ? files.video.name : 'Selecionar Vídeo'}</span>
                    <input type="file" accept="video/*" className="hidden" onChange={(e) => handleFileChange(e, 'video')} />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-text-muted uppercase tracking-wider mb-2">Duração</label>
                <input required type="text" name="duration" value={formData.duration} onChange={handleChange} className="w-full bg-brand-bg border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-red/50 transition-colors" placeholder="Ex: 2h 15m" />
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-text-muted uppercase tracking-wider mb-2">Ano</label>
                <input required type="number" name="year" value={formData.year} onChange={handleChange} className="w-full bg-brand-bg border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-red/50 transition-colors" />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-brand-text-muted uppercase tracking-wider mb-2">Classificação</label>
                <select required name="rating" value={formData.rating} onChange={handleChange} className="w-full bg-brand-bg border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-red/50 transition-colors">
                  <option value="L">Livre</option>
                  <option value="10+">10+</option>
                  <option value="12+">12+</option>
                  <option value="14+">14+</option>
                  <option value="16+">16+</option>
                  <option value="18+">18+</option>
                </select>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-brand-text-muted uppercase tracking-wider mb-2">% de Relevância</label>
                <input required type="number" min="0" max="100" name="match" value={formData.match} onChange={handleChange} className="w-full bg-brand-bg border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-red/50 transition-colors" />
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 flex justify-end">
              <button disabled={loading} type="submit" className="px-8 py-3 bg-brand-red text-white font-bold rounded-xl hover:bg-brand-red/80 transition-all flex items-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                {loading ? 'Fazendo Upload & Salvando...' : 'Salvar Filme'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
