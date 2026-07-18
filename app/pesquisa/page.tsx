import { Suspense } from 'react';
import SearchResults from './SearchResults';
import { Loader2 } from 'lucide-react';

export default function PesquisaPage() {
  return (
    <div className="flex-1 flex flex-col px-4 lg:px-8 py-8 relative w-full min-h-screen">
      <Suspense fallback={<div className="flex-1 flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-brand-red" /></div>}>
        <SearchResults />
      </Suspense>
    </div>
  );
}
