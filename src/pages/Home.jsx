import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Car, Users, MessageSquare } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { cars } from '../data/cars';
import CarCard from '../components/CarCard';

const Home = () => {
  const { user, addFavorite, removeFavorite } = useAuth();
  const navigate = useNavigate();
  const featuredCars = cars.slice(0, 3);

  const handleViewDetails = (car) => {
    navigate(`/cars/${car.id}`);
  };

  const handleToggleFavorite = (carId) => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (user.favorites.includes(carId)) {
      removeFavorite(carId);
    } else {
      addFavorite(carId);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-automotive overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{
            backgroundImage: 'url("https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg")'
          }}
        ></div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
            CarInfo <span className="text-automotive-red">Pro</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 animate-slide-up opacity-90">
            Your Ultimate Automotive Intelligence Platform
          </p>
          <p className="text-lg mb-12 animate-slide-up max-w-2xl mx-auto opacity-80">
            Discover comprehensive car information, compare vehicles, read expert reviews, 
            and chat with our AI assistant about everything automotive.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <Link
              to="/cars"
              className="bg-gradient-red text-white px-8 py-4 rounded-lg text-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center space-x-2"
            >
              <span>Explore Cars</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/ai-chat"
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-automotive-navy transition-colors flex items-center justify-center space-x-2"
            >
              <MessageSquare className="h-5 w-5" />
              <span>Try AI Chat</span>
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-automotive-navy mb-4">
              Why Choose CarInfo Pro?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide the most comprehensive automotive platform with cutting-edge features
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-red p-4 rounded-full w-16 h-16 mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Car className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-automotive-navy mb-3">Comprehensive Database</h3>
              <p className="text-gray-600">
                Access detailed information on thousands of car models with specifications, reviews, and pricing.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-automotive p-4 rounded-full w-16 h-16 mx-auto mb-6 group-hover:scale-110 transition-transform">
                <MessageSquare className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-automotive-navy mb-3">AI-Powered Chat</h3>
              <p className="text-gray-600">
                Get instant answers about any car question from our intelligent AI assistant.
              </p>
            </div>

            <div className="text-center group">
              <div className="bg-gradient-silver p-4 rounded-full w-16 h-16 mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-automotive-navy mb-3">Expert Reviews</h3>
              <p className="text-gray-600">
                Read professional reviews and real user experiences to make informed decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cars Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-automotive-navy mb-4">
              Featured Vehicles
            </h2>
            <p className="text-xl text-gray-600">
              Discover our handpicked selection of exceptional automobiles
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {featuredCars.map((car) => (
              <CarCard
                key={car.id}
                car={car}
                onViewDetails={handleViewDetails}
                isFavorite={user?.favorites?.includes(car.id) || false}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/cars"
              className="bg-gradient-automotive text-white px-8 py-3 rounded-lg text-lg font-semibold hover:opacity-90 transition-opacity inline-flex items-center space-x-2"
            >
              <span>View All Cars</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-automotive text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-gray-300">Car Models</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1M+</div>
              <div className="text-gray-300">Happy Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100K+</div>
              <div className="text-gray-300">Expert Reviews</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-gray-300">AI Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-automotive-navy text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Find Your Perfect Car?
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            Join thousands of car enthusiasts who trust CarInfo Pro for their automotive needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-gradient-red text-white px-8 py-4 rounded-lg text-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Get Started Free
            </Link>
            <Link
              to="/cars"
              className="border-2 border-gray-300 text-gray-300 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-300 hover:text-automotive-navy transition-colors"
            >
              Browse Cars
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;