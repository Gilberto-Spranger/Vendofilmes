'use client';
import { Wallet, ArrowUpRight, ArrowDownRight, CreditCard, History, Plus } from 'lucide-react';
import { motion } from 'motion/react';

export default function CarteiraPage() {
  const transactions = [
    { id: 1, type: 'deposit', amount: 50.00, date: '15 Jul, 2026', status: 'Concluído' },
    { id: 2, type: 'payment', amount: 39.90, date: '10 Jul, 2026', status: 'Concluído', desc: 'Assinatura Premium' },
    { id: 3, type: 'payment', amount: 15.90, date: '05 Jul, 2026', status: 'Concluído', desc: 'Aluguel de Filme' },
    { id: 4, type: 'deposit', amount: 100.00, date: '01 Jul, 2026', status: 'Concluído' },
  ];

  return (
    <div className="flex-1 flex flex-col px-4 lg:px-8 py-8 relative w-full min-h-[calc(100vh-80px)]">
      <div className="max-w-5xl mx-auto w-full">
        <h1 className="text-4xl font-black text-white mb-8 tracking-tighter flex items-center gap-4">
          <Wallet className="w-10 h-10 text-brand-green" /> Minha Carteira
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-brand-card to-brand-bg border border-white/10 rounded-3xl p-8 relative overflow-hidden shadow-2xl"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green/10 rounded-full blur-[80px] -mr-10 -mt-10 pointer-events-none" />
              
              <p className="text-sm text-brand-text-muted font-bold tracking-widest uppercase mb-2 relative z-10">Saldo Disponível</p>
              <h2 className="text-5xl font-black text-white mb-8 relative z-10">R$ 42<span className="text-2xl text-white/50">,90</span></h2>
              
              <button className="w-full py-4 bg-brand-green text-white font-black rounded-xl hover:bg-brand-green/80 transition-colors shadow-lg flex items-center justify-center gap-3 relative z-10">
                <Plus className="w-5 h-5" /> Adicionar Saldo
              </button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-brand-card border border-white/5 rounded-3xl p-8 shadow-xl"
            >
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-brand-text-muted" /> Formas de Pagamento
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-8 bg-gradient-to-br from-gray-800 to-black rounded flex items-center justify-center text-xs font-black border border-white/10">
                      PIX
                    </div>
                    <div>
                      <p className="font-bold text-white text-sm">Chave Principal</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 opacity-50 cursor-not-allowed">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-8 bg-blue-900 rounded flex items-center justify-center text-xs font-black border border-blue-500/30">
                      VISA
                    </div>
                    <div>
                      <p className="font-bold text-white text-sm">•••• 4242</p>
                    </div>
                  </div>
                </div>

                <button className="w-full py-3 border border-white/10 text-white/60 font-bold rounded-xl hover:bg-white/5 transition-colors text-sm">
                  Adicionar Novo Método
                </button>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-brand-card border border-white/5 rounded-3xl p-8 shadow-xl h-full"
            >
              <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
                <History className="w-5 h-5 text-brand-red" /> Histórico de Transações
              </h3>
              
              <div className="space-y-4">
                {transactions.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${tx.type === 'deposit' ? 'bg-brand-green/10 text-brand-green' : 'bg-brand-red/10 text-brand-red'}`}>
                        {tx.type === 'deposit' ? <ArrowDownRight className="w-6 h-6" /> : <ArrowUpRight className="w-6 h-6" />}
                      </div>
                      <div>
                        <p className="font-bold text-white">{tx.type === 'deposit' ? 'Depósito Adicionado' : tx.desc}</p>
                        <p className="text-xs text-brand-text-muted">{tx.date} • {tx.status}</p>
                      </div>
                    </div>
                    <div className={`text-lg font-black ${tx.type === 'deposit' ? 'text-brand-green' : 'text-white'}`}>
                      {tx.type === 'deposit' ? '+' : '-'} R$ {tx.amount.toFixed(2).replace('.', ',')}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
