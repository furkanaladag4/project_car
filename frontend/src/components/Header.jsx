import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Car, User, Menu, X, Search, Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/cars?search=${encodeURIComponent(searchTerm)}`);
      setSearchTerm('');
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="bg-automotive-navy shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-gradient-red p-2 rounded-lg group-hover:scale-105 transition-transform">
              <Car className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white font-automotive">CarInfo Pro</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/cars" className="text-gray-300 hover:text-white transition-colors">
              Cars
            </Link>
            <span className="text-gray-300 opacity-50 cursor-not-allowed">Compare (Soon)</span>
            <span className="text-gray-300 opacity-50 cursor-not-allowed">Reviews (Soon)</span>
            {isAuthenticated && (
              <Link to="/ai-chat" className="text-gray-300 hover:text-white transition-colors">
                AI Chat
              </Link>
            )}
          </nav>

          {/* Search and User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-300" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search cars..."
                className="pl-10 pr-4 py-1 border border-gray-300 rounded-lg text-gray-300 bg-automotive-navy focus:ring-2 focus:ring-automotive-red focus:border-transparent"
              />
            </form>
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link to="/favorites" className="text-gray-300 hover:text-white transition-colors">
                  <Heart className="h-5 w-5" />
                </Link>
                <div className="relative group">
                  <button className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
                    <User className="h-5 w-5" />
                    <span className="text-sm">{user?.name}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Dashboard
                    </Link>
                    <Link to="/favorites" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Favorites
                    </Link>
                    <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login" className="text-gray-300 hover:text-white transition-colors">
                  Login
                </Link>
                <Link to="/register" className="bg-gradient-red text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-300 hover:text-white transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-automotive-navy-light">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <form onSubmit={handleSearch} className="px-3 py-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-300" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search cars..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-gray-300 bg-automotive-navy focus:ring-2 focus:ring-automotive-red focus:border-transparent"
                />
              </div>
            </form>
            <Link to="/cars" className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium">
              Cars
            </Link>
            <span className="text-gray-300 opacity-50 block px-3 py-2 text-base font-medium cursor-not-allowed">
              Compare (Soon)
            </span>
            <span className="text-gray-300 opacity-50 block px-3 py-2 text-base font-medium cursor-not-allowed">
              Reviews (Soon)
            </span>
            {isAuthenticated && (
              <>
                <Link to="/ai-chat" className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium">
                  AI Chat
                </Link>
                <Link to="/favorites" className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium">
                  Favorites
                </Link>
              </>
            )}
            {!isAuthenticated && (
              <>
                <Link to="/login" className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium">
                  Login
                </Link>
                <Link to="/register" className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;