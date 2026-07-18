export default function FloatingPlayer() {
  return (
    <div className="fixed bottom-8 right-8 w-64 h-24 bg-brand-card/90 backdrop-blur-xl border border-white/10 rounded-2xl z-50 p-4 hidden md:flex items-center gap-4 shadow-2xl">
       <div className="w-16 h-16 bg-[#333] rounded-lg shrink-0 overflow-hidden">
         <div className="w-full h-full bg-brand-red/30 flex items-center justify-center text-xs text-white">▶</div>
       </div>
       <div className="flex flex-col flex-1">
         <span className="text-[10px] uppercase tracking-widest text-brand-green font-bold">Continuar</span>
         <span className="text-xs font-bold truncate mb-1 text-white">O Despertar da IA</span>
         <div className="w-full h-1 bg-white/10 rounded-full mt-1">
           <div className="w-[70%] h-full bg-brand-red rounded-full"></div>
         </div>
         <span className="text-[9px] text-brand-text-muted mt-1">42:15 / 2:15:00</span>
       </div>
    </div>
  );
}
