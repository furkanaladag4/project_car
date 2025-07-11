import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { cars } from '../data/cars';
import CarCard from '../components/CarCard';
import { Car, ArrowRight } from 'lucide-react';

const Dashboard = () => {
  const { user, logout, addFavorite, removeFavorite } = useAuth();
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

  return (
    <div className="min-h-screen bg-gradient-automotive py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8 text-center mb-8">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-red p-3 rounded-full">
              <Car className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-automotive-navy mb-4">
            Hoş Geldiniz, {user?.name || 'Kullanıcı'}!
          </h2>
          <p className="text-gray-600 mb-6">
            CarInfo Pro kontrol panelinize hoş geldiniz. Aşağıda favori araçlarınızı görebilirsiniz.
          </p>
          <button
            onClick={logout}
            className="bg-gradient-red text-white px-6 py-3 rounded-lg text-lg font-semibold hover:opacity-90"
          >
            Çıkış Yap
          </button>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-bold text-white mb-4">Favori Araçlarınız</h3>
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
              <p className="text-gray-300 text-lg">
                Henüz favori araç eklemediniz.{' '}
                <Link
                  to="/cars"
                  className="text-automotive-red hover:text-automotive-red-dark inline-flex items-center"
                >
                  Araçları Keşfet <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;