
import { Perfume } from './types';

export const PERFUMES: Perfume[] = [
  {
    id: '1',
    name: 'Midnight Bloom',
    brand: 'L\'Aura Private Blend',
    price: 245,
    image: 'https://images.unsplash.com/photo-1541605028969-f0b35ee46d76?auto=format&fit=crop&q=80&w=800',
    description: 'An intoxicating evening scent inspired by moonlit gardens.',
    category: 'Floral',
    rating: 4.9,
    notes: {
      top: ['Jasmine', 'Saffron'],
      middle: ['Amberwood', 'Ambergris'],
      base: ['Fir Resin', 'Cedar']
    }
  },
  {
    id: '2',
    name: 'Santal Mystique',
    brand: 'L\'Aura Private Blend',
    price: 210,
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800',
    description: 'A spiritual journey through ancient sandalwood forests.',
    category: 'Woody',
    rating: 4.8,
    notes: {
      top: ['Cardamom', 'Violet'],
      middle: ['Iris', 'Papyrus'],
      base: ['Sandalwood', 'Leather', 'Cedar']
    }
  },
  {
    id: '3',
    name: 'Desert Mirage',
    brand: 'L\'Aura Private Blend',
    price: 280,
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800',
    description: 'The warmth of desert sands meeting cool oasis waters.',
    category: 'Oriental',
    rating: 5.0,
    notes: {
      top: ['Pink Pepper', 'Rose'],
      middle: ['Oud', 'Incense'],
      base: ['Vanilla', 'Labdanum']
    }
  },
  {
    id: '4',
    name: 'Azure Breeze',
    brand: 'L\'Aura Private Blend',
    price: 185,
    image: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&q=80&w=800',
    description: 'Crisp Mediterranean mornings and endless blue horizons.',
    category: 'Fresh',
    rating: 4.7,
    notes: {
      top: ['Bergamot', 'Grapefruit'],
      middle: ['Sea Salt', 'Sage'],
      base: ['Musk', 'Driftwood']
    }
  },
  {
    id: '5',
    name: 'Velvet Cacao',
    brand: 'L\'Aura Private Blend',
    price: 260,
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=800',
    description: 'Rich, dark chocolate intertwined with smoky vetiver.',
    category: 'Gourmand',
    rating: 4.9,
    notes: {
      top: ['Roasted Cacao', 'Coffee'],
      middle: ['Cinnamon', 'Rum'],
      base: ['Patchouli', 'Dark Amber']
    }
  },
  {
    id: '6',
    name: 'Celestial Neroli',
    brand: 'L\'Aura Private Blend',
    price: 225,
    image: 'https://images.unsplash.com/photo-1557170334-a7c3a4e240ad?auto=format&fit=crop&q=80&w=800',
    description: 'A radiant burst of orange blossoms and starlit clarity.',
    category: 'Floral',
    rating: 4.8,
    notes: {
      top: ['Neroli', 'Bergamot'],
      middle: ['Jasmine Tea', 'Orange Blossom'],
      base: ['Ambrette', 'White Musk']
    }
  }
];
