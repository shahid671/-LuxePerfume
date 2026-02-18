
export interface Perfume {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  description: string;
  notes: {
    top: string[];
    middle: string[];
    base: string[];
  };
  category: 'Floral' | 'Woody' | 'Oriental' | 'Fresh' | 'Gourmand';
  rating: number;
}

export interface CartItem {
  product: Perfume;
  quantity: number;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface RecommendationResponse {
  recommendation: string;
  suggestedNotes: string[];
  matchedProducts: string[];
}
