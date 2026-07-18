'use client';
import { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type Message = { role: 'user' | 'model'; text: string };

export default function AiSupportAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Olá! Sou o VendoBot, sua IA pessoal de filmes. Quer uma recomendação ou ajuda com algo? 🍿' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: userMsg,
          history: messages.slice(1) // skip the initial system prompt essentially
        })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'model', text: data.text }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: 'Oops! Tive um problema de conexão. Tente novamente.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 right-8 z-[60] p-4 bg-gradient-to-r from-brand-red to-brand-red/80 text-white rounded-full shadow-2xl hover:scale-110 transition-transform ${isOpen ? 'hidden md:hidden' : 'md:hidden'} md:block md:bottom-36 border border-white/20`}
      >
        <Sparkles className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-4 right-4 md:bottom-36 md:right-8 w-[350px] h-[500px] max-h-[80vh] bg-brand-card/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl z-[70] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-gradient-to-r from-brand-red/20 to-transparent flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-red flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">VendoAI</h3>
                  <span className="text-[10px] text-brand-green font-bold uppercase tracking-widest flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-brand-green rounded-full inline-block animate-pulse"></span> Online
                  </span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl p-3 text-sm ${msg.role === 'user' ? 'bg-brand-red text-white rounded-tr-sm' : 'bg-white/10 text-brand-text-muted rounded-tl-sm'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[85%] rounded-2xl p-3 bg-white/5 text-brand-text-muted rounded-tl-sm flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-brand-red" />
                    <span className="text-xs">Analisando...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-black/20">
              <div className="relative">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Peça uma recomendação..."
                  className="w-full bg-white/5 border border-white/10 rounded-full pl-4 pr-12 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-brand-red/50 transition-colors"
                />
                <button 
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-2 p-1.5 bg-brand-red rounded-full text-white disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform"
                >
                  <Send className="w-4 h-4 ml-0.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
