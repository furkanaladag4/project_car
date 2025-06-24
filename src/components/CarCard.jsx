import React from 'react';
import { Heart, Star, Zap, Fuel } from 'lucide-react';

const CarCard = ({ car, onViewDetails, isFavorite, onToggleFavorite }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
      <div className="relative">
        <img 
          src={car.image} 
          alt={`${car.make} ${car.model}`}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4">
          {onToggleFavorite && (
            <button
              onClick={() => onToggleFavorite(car.id)}
              className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                isFavorite 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white/20 text-white hover:bg-red-500'
              }`}
            >
              <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
          )}
        </div>
        <div className="absolute bottom-4 left-4">
          <span className="bg-automotive-red text-white px-2 py-1 rounded-full text-xs font-medium capitalize">
            {car.category}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-automotive-navy">
            {car.year} {car.make} {car.model}
          </h3>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600">{car.rating}</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{car.description}</p>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <Zap className="h-4 w-4 text-automotive-red" />
            <span className="text-sm text-gray-600">{car.specs.horsepower} HP</span>
          </div>
          <div className="flex items-center space-x-2">
            <Fuel className="h-4 w-4 text-automotive-red" />
            <span className="text-sm text-gray-600">{car.specs.mpg} MPG</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <span className="text-2xl font-bold text-automotive-navy">
              ${car.price.toLocaleString()}
            </span>
            <span className="text-gray-500 text-sm ml-1">MSRP</span>
          </div>
          <button
            onClick={() => onViewDetails(car)}
            className="bg-gradient-automotive text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity font-medium"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;