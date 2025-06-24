export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  image: string;
  description: string;
  specs: {
    engine: string;
    horsepower: number;
    torque: string;
    transmission: string;
    fuelType: string;
    mpg: string;
    topSpeed: string;
    acceleration: string;
  };
  features: string[];
  category: 'sedan' | 'suv' | 'sports' | 'electric' | 'luxury' | 'truck';
  rating: number;
  reviews: Review[];
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  favorites: string[];
  isAuthenticated: boolean;
}

export interface ChatMessage {
  id: string;
  message: string;
  isUser: boolean;
  timestamp: string;
}