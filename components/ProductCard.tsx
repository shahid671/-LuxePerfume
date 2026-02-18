
import React from 'react';
import { Star, ShoppingBag, Plus } from 'lucide-react';
import { Perfume } from '../types';

interface ProductCardProps {
  perfume: Perfume;
  onAddToCart: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ perfume, onAddToCart }) => {
  return (
    <div className="group relative glass rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] border border-white/5 hover:border-gold/30">
      <div className="relative aspect-[4/5] overflow-hidden">
        <img 
          src={perfume.image} 
          alt={perfume.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart();
          }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 btn-gold px-6 py-3 rounded-full flex items-center gap-2 text-xs font-bold tracking-widest opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 shadow-2xl"
        >
          <Plus size={16} /> ADD TO BAG
        </button>

        <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-1.5">
          <Star size={12} className="text-gold fill-gold" />
          <span className="text-[10px] font-bold text-white">{perfume.rating}</span>
        </div>
      </div>
      
      <div className="p-8">
        <div className="flex justify-between items-start mb-2">
          <div>
            <span className="text-gold text-[10px] tracking-[0.2em] font-bold uppercase mb-1 block">
              {perfume.category}
            </span>
            <h4 className="text-xl font-serif font-bold text-white group-hover:text-gold transition-colors">
              {perfume.name}
            </h4>
          </div>
          <span className="text-xl font-serif text-white/80">${perfume.price}</span>
        </div>
        
        <p className="text-white/40 text-sm font-light line-clamp-2 mb-6 leading-relaxed">
          {perfume.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {perfume.notes.top.slice(0, 2).map(note => (
            <span key={note} className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[9px] text-white/40 tracking-widest uppercase font-bold">
              {note}
            </span>
          ))}
          <span className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[9px] text-white/40 tracking-widest uppercase font-bold">
            +{perfume.notes.top.length + perfume.notes.middle.length - 2} More
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
