'use client';
import { User, Settings, Shield, Bell, Lock } from 'lucide-react';
import { motion } from 'motion/react';

export default function PerfilPage() {
  return (
    <div className="flex-1 flex flex-col px-4 lg:px-8 py-8 relative w-full min-h-[calc(100vh-80px)]">
      <div className="max-w-4xl mx-auto w-full">
        <h1 className="text-4xl font-black text-white mb-8 tracking-tighter">Meu <span className="text-brand-red">Perfil</span></h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-brand-card border border-white/5 rounded-3xl p-8 flex flex-col items-center text-center shadow-xl"
            >
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-brand-red to-brand-green flex items-center justify-center text-4xl font-bold text-white mb-6 shadow-2xl relative">
                JD
                <button className="absolute bottom-0 right-0 w-10 h-10 bg-brand-bg rounded-full flex items-center justify-center border border-white/10 hover:scale-110 transition-transform">
                  <User className="w-5 h-5 text-white" />
                </button>
              </div>
              <h2 className="text-2xl font-bold text-white mb-1">João Duarte</h2>
              <p className="text-brand-text-muted text-sm mb-6">joaoduarte@exemplo.com</p>
              
              <div className="w-full bg-white/5 rounded-2xl p-4 border border-white/5">
                <p className="text-xs text-brand-text-muted mb-1 uppercase tracking-widest font-bold">Plano Atual</p>
                <p className="text-brand-green font-black text-lg">Premium 4K</p>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-brand-card border border-white/5 rounded-3xl p-8 shadow-xl"
            >
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <Settings className="w-5 h-5 text-brand-red" /> Configurações Gerais
              </h3>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-brand-text-muted uppercase tracking-wider mb-2">Nome</label>
                    <input type="text" defaultValue="João Duarte" className="w-full bg-brand-bg border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-red/50 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-brand-text-muted uppercase tracking-wider mb-2">E-mail</label>
                    <input type="email" defaultValue="joaoduarte@exemplo.com" className="w-full bg-brand-bg border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-red/50 transition-colors" />
                  </div>
                </div>
                
                <button className="px-6 py-3 bg-brand-red text-white font-bold rounded-xl hover:bg-brand-red/80 transition-colors shadow-lg">
                  Salvar Alterações
                </button>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-brand-card border border-white/5 rounded-3xl p-8 shadow-xl"
            >
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                <Shield className="w-5 h-5 text-brand-red" /> Segurança
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 cursor-pointer hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-4">
                    <Lock className="w-5 h-5 text-white/60" />
                    <div>
                      <p className="font-bold text-white">Alterar Senha</p>
                      <p className="text-xs text-brand-text-muted">Última alteração há 3 meses</p>
                    </div>
                  </div>
                  <button className="text-sm font-bold text-brand-red">Editar</button>
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 cursor-pointer hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-4">
                    <Bell className="w-5 h-5 text-white/60" />
                    <div>
                      <p className="font-bold text-white">Notificações</p>
                      <p className="text-xs text-brand-text-muted">Gerencie seus alertas e emails</p>
                    </div>
                  </div>
                  <button className="text-sm font-bold text-brand-red">Configurar</button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
