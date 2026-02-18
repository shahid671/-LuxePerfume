
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { Sparkles, X, Send, User, Bot, Loader2, ArrowRight } from 'lucide-react';
import { ChatMessage, Perfume, RecommendationResponse } from '../types';
import { PERFUMES } from '../constants';

interface ScentSommelierProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Perfume) => void;
}

const ScentSommelier: React.FC<ScentSommelierProps> = ({ isOpen, onClose, onAddToCart }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<Perfume[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        role: 'assistant',
        content: "Welcome to the L'Aura Bespoke Studio. I am your AI Scent Sommelier. Tell me about your mood, a memory, or the notes you gravitate towards, and I will craft the perfect fragrance profile for you."
      }]);
    }
    scrollToBottom();
  }, [isOpen, messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          {
            role: 'user',
            parts: [{ text: `User: ${userMsg}. Available scents in catalog: ${JSON.stringify(PERFUMES.map(p => ({ id: p.id, name: p.name, category: p.category, notes: p.notes })))}` }]
          }
        ],
        config: {
          systemInstruction: `You are an expert luxury perfume sommelier at L'Aura Luxe.
          1. Analyze the user's emotional or descriptive input.
          2. Recommend 1-3 specific perfumes from the catalog provided.
          3. Format your response in a luxurious, poetic, yet professional tone.
          4. ALWAYS include a special JSON-like tag at the end of your response with the matched IDs, e.g., [MATCH: 1, 3].
          5. Keep the poetic text around 2-3 sentences.`,
          temperature: 0.7,
        },
      });

      const fullText = response.text || "I apologize, but my sensory sensors are temporarily clouded. Could you describe that once more?";
      
      // Extract matches
      const matchRegex = /\[MATCH:\s*([0-9,\s]+)\]/;
      const match = fullText.match(matchRegex);
      const cleanText = fullText.replace(matchRegex, '').trim();

      if (match) {
        const ids = match[1].split(',').map(id => id.trim());
        const suggested = PERFUMES.filter(p => ids.includes(p.id));
        setRecommendations(suggested);
      }

      setMessages(prev => [...prev, { role: 'assistant', content: cleanText }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Our digital atelier is currently undergoing refinement. Please try again in a moment." }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-xl transition-opacity animate-in fade-in duration-500" 
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-4xl h-[85vh] glass border border-white/10 rounded-[2rem] overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between glass">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl btn-gold flex items-center justify-center">
              <Sparkles size={24} />
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold text-white tracking-wide">Bespoke Sommelier</h3>
              <p className="text-[10px] text-gold tracking-widest font-bold uppercase">Powered by L'Aura Intelligence</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full text-white/50 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Chat Area */}
          <div className="flex-1 flex flex-col p-6 overflow-hidden">
            <div className="flex-1 overflow-y-auto pr-4 space-y-6 scrollbar-hide">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex items-start gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.role === 'assistant' ? 'bg-gold/20 text-gold' : 'bg-white/10 text-white/40'
                  }`}>
                    {msg.role === 'assistant' ? <Bot size={16} /> : <User size={16} />}
                  </div>
                  <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'assistant' 
                    ? 'bg-white/5 text-white/80 border border-white/5' 
                    : 'bg-gold text-black font-medium'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-gold/20 text-gold flex items-center justify-center animate-pulse">
                    <Bot size={16} />
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <Loader2 size={16} className="animate-spin text-gold" />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div className="mt-6 flex gap-3 p-2 glass border border-white/10 rounded-full focus-within:border-gold/30 transition-colors">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Describe a mood, a memory, or a note..."
                className="flex-1 bg-transparent border-none outline-none px-4 text-white placeholder:text-white/20 text-sm"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="w-10 h-10 rounded-full btn-gold flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                <Send size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Recommendations Sidebar */}
          <div className="hidden md:flex w-72 border-l border-white/10 bg-black/40 flex-col p-6">
            <h4 className="text-xs font-bold tracking-[0.2em] text-white/40 uppercase mb-6 flex items-center gap-2">
              Matched Scents {recommendations.length > 0 && <span className="w-2 h-2 bg-gold rounded-full" />}
            </h4>
            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
              {recommendations.length > 0 ? (
                recommendations.map(perfume => (
                  <div key={perfume.id} className="group p-4 glass border border-white/5 rounded-2xl hover:border-gold/30 transition-all cursor-pointer">
                    <div className="aspect-square rounded-xl overflow-hidden mb-3 relative">
                      <img src={perfume.image} alt={perfume.name} className="w-full h-full object-cover" />
                      <button 
                        onClick={() => onAddToCart(perfume)}
                        className="absolute inset-0 bg-gold/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ArrowRight size={24} className="text-black" />
                      </button>
                    </div>
                    <h5 className="text-white font-bold text-xs mb-1 truncate">{perfume.name}</h5>
                    <div className="flex justify-between items-center">
                      <span className="text-gold font-bold text-xs">${perfume.price}</span>
                      <span className="text-[10px] text-white/40 uppercase tracking-widest">{perfume.category}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center px-4">
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-4">
                    <Sparkles size={20} className="text-white/10" />
                  </div>
                  <p className="text-[10px] text-white/20 uppercase tracking-[0.2em] leading-relaxed">
                    Start a conversation to reveal your bespoke matches
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScentSommelier;
