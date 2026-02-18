
import React, { useState, useEffect, useCallback } from 'react';
import { ShoppingBag, Search, Sparkles, MessageSquare, Menu, X, Star, ArrowRight, Heart, Trash2 } from 'lucide-react';
import { PERFUMES } from './constants';
import { Perfume, CartItem } from './types';
import ScentSommelier from './components/ScentSommelier';
import ProductCard from './components/ProductCard';

const App: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSommelierOpen, setIsSommelierOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'All' | 'Floral' | 'Woody' | 'Oriental' | 'Fresh' | 'Gourmand'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const addToCart = (product: Perfume) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.product.id !== id));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const filteredPerfumes = PERFUMES.filter(p => {
    const matchesTab = activeTab === 'All' || p.category === activeTab;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="min-h-screen font-sans selection:bg-gold-200 selection:text-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <button onClick={() => setIsMenuOpen(true)} className="lg:hidden text-white hover:text-gold transition-colors">
            <Menu size={24} />
          </button>
          <h1 className="text-2xl font-serif font-bold tracking-widest text-white">
            L'AURA <span className="text-gold">LUXE</span>
          </h1>
          <div className="hidden lg:flex items-center gap-8 text-sm font-medium tracking-widest text-white/70">
            <a href="#collections" className="hover:text-gold transition-colors">COLLECTIONS</a>
            <a href="#about" className="hover:text-gold transition-colors">OUR STORY</a>
            <a href="#bespoke" className="hover:text-gold transition-colors">BESPOKE</a>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative hidden md:block">
            <input 
              type="text" 
              placeholder="Search scents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-full py-1.5 px-4 pl-10 text-sm focus:outline-none focus:border-gold/50 w-64 transition-all"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={16} />
          </div>
          <button 
            onClick={() => setIsSommelierOpen(true)}
            className="flex items-center gap-2 text-gold hover:text-white transition-all text-sm font-semibold group"
          >
            <Sparkles size={18} className="group-hover:rotate-12 transition-transform" />
            <span className="hidden sm:inline">SCENT SOMMELIER</span>
          </button>
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 hover:bg-white/5 rounded-full transition-colors"
          >
            <ShoppingBag size={22} />
            {cart.length > 0 && (
              <span className="absolute -top-0 -right-0 bg-gold text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1616948648744-4b79c5ef997a?auto=format&fit=crop&q=80&w=2000" 
            alt="Luxury Perfume" 
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-onyx via-onyx/40 to-transparent" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <span className="text-gold tracking-[0.4em] text-xs font-bold mb-4 block uppercase animate-pulse">Signature Experience</span>
          <h2 className="text-5xl md:text-8xl font-serif font-bold text-white mb-8 leading-tight">
            Olfactory <span className="italic font-normal">Perfection</span> <br /> 
            Tailored by AI
          </h2>
          <p className="text-lg text-white/60 mb-10 max-w-xl mx-auto font-light leading-relaxed">
            Discover your soul's signature scent through our exclusive AI-powered fragrance matching technology. 
            The future of luxury perfumery is here.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => setIsSommelierOpen(true)}
              className="btn-gold px-10 py-4 rounded-full text-sm font-bold tracking-widest flex items-center gap-3 w-full sm:w-auto justify-center"
            >
              FIND YOUR SCENT <ArrowRight size={18} />
            </button>
            <a 
              href="#collections"
              className="px-10 py-4 rounded-full text-sm font-bold tracking-widest border border-white/20 text-white hover:bg-white/10 transition-all w-full sm:w-auto"
            >
              EXPLORE COLLECTIONS
            </a>
          </div>
        </div>
      </header>

      {/* Main Collections */}
      <main id="collections" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-gold tracking-widest text-xs font-bold mb-2 block uppercase">Curated Excellence</span>
            <h3 className="text-4xl font-serif font-bold text-white">Private Collection</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {(['All', 'Floral', 'Woody', 'Oriental', 'Fresh', 'Gourmand'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full text-xs font-bold tracking-widest transition-all ${
                  activeTab === tab 
                  ? 'bg-gold text-black' 
                  : 'bg-white/5 text-white/50 hover:bg-white/10'
                }`}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPerfumes.map(perfume => (
            <ProductCard 
              key={perfume.id} 
              perfume={perfume} 
              onAddToCart={() => addToCart(perfume)} 
            />
          ))}
        </div>
      </main>

      {/* AI Sommelier Drawer */}
      <ScentSommelier 
        isOpen={isSommelierOpen} 
        onClose={() => setIsSommelierOpen(false)} 
        onAddToCart={addToCart}
      />

      {/* Cart Drawer */}
      <div className={`fixed inset-0 z-[60] transition-all duration-500 ${isCartOpen ? 'visible' : 'invisible'}`}>
        <div 
          className={`absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-500 ${isCartOpen ? 'opacity-100' : 'opacity-0'}`} 
          onClick={() => setIsCartOpen(false)}
        />
        <div className={`absolute right-0 top-0 bottom-0 w-full max-w-md bg-onyx border-l border-white/10 transition-transform duration-500 transform ${isCartOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}>
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <h3 className="text-xl font-serif font-bold text-white flex items-center gap-3">
              <ShoppingBag size={24} className="text-gold" /> YOUR BAG
            </h3>
            <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-white/5 rounded-full text-white/50 hover:text-white transition-colors">
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6">
                  <ShoppingBag size={32} className="text-white/20" />
                </div>
                <p className="text-white/40 font-light mb-8">Your bag is currently empty.</p>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="btn-gold px-8 py-3 rounded-full text-xs font-bold tracking-widest"
                >
                  START SHOPPING
                </button>
              </div>
            ) : (
              cart.map(item => (
                <div key={item.product.id} className="flex gap-4 p-4 glass rounded-2xl group">
                  <img src={item.product.image} alt={item.product.name} className="w-20 h-20 object-cover rounded-xl border border-white/10" />
                  <div className="flex-1">
                    <h4 className="text-white font-medium mb-1">{item.product.name}</h4>
                    <p className="text-white/40 text-xs mb-2">{item.product.brand}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-gold font-bold">${item.product.price}</span>
                      <div className="flex items-center gap-3 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                        <button className="text-white/40 hover:text-white">-</button>
                        <span className="text-xs text-white">{item.quantity}</span>
                        <button className="text-white/40 hover:text-white">+</button>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.product.id)}
                    className="opacity-0 group-hover:opacity-100 p-2 text-white/20 hover:text-red-400 transition-all self-start"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div className="p-6 border-t border-white/10 glass">
              <div className="flex justify-between items-center mb-6">
                <span className="text-white/50 tracking-widest text-xs font-bold">ESTIMATED TOTAL</span>
                <span className="text-2xl text-gold font-serif font-bold">${cartTotal}</span>
              </div>
              <button className="btn-gold w-full py-4 rounded-full font-bold tracking-[0.2em] mb-4">
                CHECKOUT SECURELY
              </button>
              <p className="text-center text-[10px] text-white/30 uppercase tracking-widest">
                Complimentary shipping & gift wrapping included
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black/50 border-t border-white/5 pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <h1 className="text-3xl font-serif font-bold tracking-widest text-white mb-6">
              L'AURA <span className="text-gold">LUXE</span>
            </h1>
            <p className="text-white/40 font-light max-w-sm leading-relaxed mb-8">
              Pioneering the intersection of artificial intelligence and artisanal perfumery. 
              Each bottle is a testament to technological precision and human soul.
            </p>
            <div className="flex items-center gap-4">
              {['Instagram', 'Twitter', 'Facebook'].map(social => (
                <a key={social} href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center text-white/40 hover:text-gold hover:border-gold/50 transition-all">
                  <span className="sr-only">{social}</span>
                  <div className="w-2 h-2 bg-current rounded-full" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white text-xs font-bold tracking-[0.2em] mb-6 uppercase">Collections</h4>
            <ul className="space-y-4 text-white/40 text-sm font-light">
              <li><a href="#" className="hover:text-gold transition-colors">The Private Blend</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Digital Soul Series</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Limited Editions</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Bespoke Curation</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-xs font-bold tracking-[0.2em] mb-6 uppercase">Service</h4>
            <ul className="space-y-4 text-white/40 text-sm font-light">
              <li><a href="#" className="hover:text-gold transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Complimentary Wrapping</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Fragrance Concierge</a></li>
              <li><a href="#" className="hover:text-gold transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/20 text-xs tracking-widest">&copy; 2024 L'AURA LUXE INTERNATIONAL. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-8 text-[10px] text-white/20 tracking-widest font-bold uppercase">
            <a href="#" className="hover:text-white transition-colors">Legal</a>
            <a href="#" className="hover:text-white transition-colors">Accessibility</a>
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
