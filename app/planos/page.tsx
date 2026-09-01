'use client';
import { CreditCard, CheckCircle2, Zap, Shield, Sparkles, Smartphone, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

export default function PlanosPage() {
  const [loadingPlanId, setLoadingPlanId] = useState<string | null>(null);
  const [appyPayPlan, setAppyPayPlan] = useState<any | null>(null);
  const [phone, setPhone] = useState('');
  const [isProcessingAppyPay, setIsProcessingAppyPay] = useState(false);

  const plans = [
    {
      id: 'basic',
      name: 'Básico',
      price: '19,90',
      period: '/mês',
      features: ['Qualidade HD', 'Assista em 1 tela', 'Com anúncios'],
      popular: false,
      color: 'from-gray-800 to-black',
      buttonText: 'Assinar Básico',
      isCurrent: false,
      priceId: 'price_mock_basic',
    },
    {
      id: 'premium',
      name: 'Premium 4K',
      price: '39,90',
      period: '/mês',
      features: ['Qualidade 4K Ultra HD', 'Assista em 4 telas', 'Sem anúncios', 'Downloads ilimitados', 'Acesso antecipado'],
      popular: true,
      color: 'from-brand-red/80 to-brand-red/20',
      buttonText: 'Assinar Premium',
      isCurrent: false,
      priceId: 'price_mock_premium',
    },
    {
      id: 'family',
      name: 'Família',
      price: '59,90',
      period: '/mês',
      features: ['Qualidade 4K Ultra HD', 'Assista em 6 telas', 'Perfis Infantis dedicados', 'Sem anúncios', 'Downloads ilimitados'],
      popular: false,
      color: 'from-purple-900/80 to-purple-900/20',
      buttonText: 'Assinar Família',
      isCurrent: false,
      priceId: 'price_mock_family',
    }
  ];

  const handleAppyPaySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!appyPayPlan || !phone) return;
    setIsProcessingAppyPay(true);

    try {
      const res = await fetch('/api/appypay/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          planId: appyPayPlan.id, 
          amount: parseFloat(appyPayPlan.price.replace(',', '.')),
          name: `Plano ${appyPayPlan.name}`,
          phone: phone
        }),
      });
      const data = await res.json();
      if (data.success) {
        alert(data.message || 'Pagamento iniciado! Confira seu telemóvel.');
        setAppyPayPlan(null);
      } else {
        alert(data.error || 'Erro ao processar Appy Pay.');
      }
    } catch (e) {
      console.error(e);
      alert('Erro ao processar Appy Pay.');
    } finally {
      setIsProcessingAppyPay(false);
    }
  };

  const handleSubscribe = async (plan: any) => {
    setLoadingPlanId(plan.id);
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          priceId: plan.priceId, 
          isSubscription: true,
          amount: parseFloat(plan.price.replace(',', '.')),
          name: `Plano ${plan.name}`
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.assign(data.url);
      } else {
        alert(data.error || 'Erro ao processar o pagamento.');
      }
    } catch (e) {
      console.error(e);
      alert('Erro ao processar o pagamento.');
    } finally {
      setLoadingPlanId(null);
    }
  };

  return (
    <div className="flex-1 flex flex-col px-4 lg:px-8 py-8 relative w-full min-h-[calc(100vh-80px)]">
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-black text-white mb-4 tracking-tighter">Assinaturas e <span className="text-brand-red">Planos</span></h1>
          <p className="text-brand-text-muted max-w-2xl mx-auto text-lg">Escolha o plano ideal para você ou gerencie sua assinatura atual. Pagamentos processados com segurança via Stripe.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <motion.div 
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-brand-card border rounded-3xl p-8 flex flex-col ${plan.isCurrent ? 'border-brand-red shadow-[0_0_30px_rgba(139,0,0,0.3)]' : 'border-white/10'}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-brand-red to-[#ff4d4d] text-white text-[10px] font-black uppercase tracking-widest py-1.5 px-4 rounded-full shadow-lg flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Mais Popular
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-xl font-black text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-sm text-brand-text-muted font-bold">R$</span>
                  <span className="text-5xl font-black text-white">{plan.price}</span>
                  <span className="text-sm text-brand-text-muted">{plan.period}</span>
                </div>
              </div>
              
              <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white/80">
                    <CheckCircle2 className="w-5 h-5 text-brand-green shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button 
                onClick={() => handleSubscribe(plan)}
                disabled={loadingPlanId === plan.id}
                className={`w-full py-4 rounded-xl font-black transition-all flex items-center justify-center gap-2 mb-3 ${
                  plan.isCurrent 
                  ? 'bg-white/10 text-white border border-white/20 cursor-default' 
                  : 'bg-white text-black hover:bg-gray-200 shadow-xl'
                }`}
              >
                {loadingPlanId === plan.id ? 'Redirecionando...' : plan.buttonText}
              </button>

              {!plan.isCurrent && (
                <button
                  onClick={() => setAppyPayPlan(plan)}
                  className="w-full py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 bg-[#F68A1E]/10 text-[#F68A1E] border border-[#F68A1E]/30 hover:bg-[#F68A1E] hover:text-white"
                >
                  <Smartphone className="w-4 h-4" /> Multicaixa Express (AppyPay)
                </button>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-brand-card border border-white/5 rounded-3xl p-8 shadow-xl max-w-3xl mx-auto"
        >
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 rounded-full bg-[#635BFF]/10 flex items-center justify-center shrink-0">
              <Shield className="w-8 h-8 text-[#635BFF]" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Faturamento via Stripe & AppPay</h3>
              <p className="text-brand-text-muted text-sm mb-6">Todos os pagamentos são processados com segurança pelo Stripe, com suporte completo a Apple Pay, Google Pay e todos os cartões, ou de forma local via Multicaixa Express e Unitel Money (AppyPay). Nós não armazenamos os dados de pagamento. Caso deseje cancelar, gerencie as preferências diretamente no portal do cliente.</p>
              <button className="px-6 py-3 bg-[#635BFF] text-white font-bold rounded-xl hover:bg-[#635BFF]/80 transition-colors flex items-center gap-2">
                <CreditCard className="w-5 h-5" /> Portal do Cliente (Stripe)
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {appyPayPlan && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-brand-card border border-white/10 rounded-3xl p-8 max-w-md w-full shadow-2xl relative"
            >
              <button 
                onClick={() => setAppyPayPlan(null)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-white/5 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#F68A1E]/10 flex items-center justify-center">
                  <Smartphone className="w-6 h-6 text-[#F68A1E]" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">Appy Pay Angola</h3>
                  <p className="text-sm text-brand-text-muted">Multicaixa Express</p>
                </div>
              </div>

              <div className="mb-6 p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-brand-text-muted">Plano selecionado</span>
                  <span className="font-bold text-white">{appyPayPlan.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-brand-text-muted">Total a pagar</span>
                  <span className="font-black text-brand-green text-lg">R$ {appyPayPlan.price}</span>
                </div>
              </div>

              <form onSubmit={handleAppyPaySubmit}>
                <div className="mb-6">
                  <label className="block text-xs font-bold text-brand-text-muted uppercase tracking-wider mb-2">
                    Número de Telemóvel (Multicaixa)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 font-bold">+244</span>
                    <input 
                      required 
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="9XX XXX XXX" 
                      className="w-full pl-16 pr-4 py-3 bg-brand-bg border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#F68A1E] transition-colors"
                    />
                  </div>
                  <p className="text-xs text-brand-text-muted mt-2">Você receberá uma notificação no app Multicaixa Express para confirmar o pagamento.</p>
                </div>

                <button 
                  type="submit" 
                  disabled={isProcessingAppyPay}
                  className="w-full py-4 bg-[#F68A1E] text-white font-black rounded-xl hover:bg-[#F68A1E]/80 transition-colors shadow-lg disabled:opacity-50"
                >
                  {isProcessingAppyPay ? 'A Processar...' : 'Pagar com Multicaixa Express'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
