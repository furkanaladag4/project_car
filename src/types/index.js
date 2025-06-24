// Car interface structure for reference
export const CarStructure = {
  id: 'string',
  make: 'string',
  model: 'string',
  year: 'number',
  price: 'number',
  image: 'string',
  description: 'string',
  specs: {
    engine: 'string',
    horsepower: 'number',
    torque: 'string',
    transmission: 'string',
    fuelType: 'string',
    mpg: 'string',
    topSpeed: 'string',
    acceleration: 'string'
  },
  features: ['string'],
  category: 'sedan | suv | sports | electric | luxury | truck',
  rating: 'number',
  reviews: ['Review']
};

// Review interface structure
export const ReviewStructure = {
  id: 'string',
  userId: 'string',
  userName: 'string',
  rating: 'number',
  comment: 'string',
  date: 'string'
};

// User interface structure
export const UserStructure = {
  id: 'string',
  name: 'string',
  email: 'string',
  avatar: 'string',
  favorites: ['string'],
  isAuthenticated: 'boolean'
};

// ChatMessage interface structure
export const ChatMessageStructure = {
  id: 'string',
  message: 'string',
  isUser: 'boolean',
  timestamp: 'string'
};