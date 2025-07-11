import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { cars } from '../data/cars';
import CarCard from '../components/CarCard';
import { Car, ArrowRight } from 'lucide-react';

const Favorites = () => {
  const { user, addFavorite, removeFavorite } = useAuth();
  const navigate = useNavigate();
  const favoriteCars = cars.filter(car => user?.favorites?.includes(car.id));

  const handleToggleFavorite = (carId) => {
    if (user.favorites.includes(carId)) {
      removeFavorite(carId);
    } else {
      addFavorite(carId);
    }
  };

  const handleViewDetails = (car) => {
    navigate(`/cars/${car.id}`);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Login Required</h2>
          <p className="text-gray-600 mb-6">Please log in to view your favorite cars.</p>
          <Link
            to="/login"
            className="bg-gradient-red text-white px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-automotive-navy mb-2">Your Favorite Cars</h1>
          <p className="text-gray-600">Browse your handpicked collection of favorite vehicles</p>
        </div>

        {favoriteCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteCars.map(car => (
              <CarCard
                key={car.id}
                car={car}
                onViewDetails={handleViewDetails}
                isFavorite={user?.favorites?.includes(car.id) || false}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-red p-3 rounded-full">
                <Car className="h-8 w-8 text-white" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Favorites Yet</h3>
            <p className="text-gray-500 mb-6">Start adding cars to your favorites by browsing our collection.</p>
            <Link
              to="/cars"
              className="bg-gradient-red text-white px-8 py-3 rounded-lg text-lg font-semibold hover:opacity-90 transition-opacity inline-flex items-center space-x-2"
            >
              <span>Browse Cars</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;