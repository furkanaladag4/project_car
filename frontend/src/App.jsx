import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Cars from './pages/Cars';
import Login from './pages/Login';
import AIChat from './pages/AIChat';
import Register from './pages/Register';
import CarDetail from './pages/CarDetail';
import Dashboard from './pages/Dashboard';
import Favorites from './pages/Favorites';
import Compare from './pages/Compare';
import Reviews from './pages/Reviews';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const PlaceholderPage = ({ title }) => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <h2 className="text-3xl font-bold text-automotive-navy mb-4">{title}</h2>
      <p className="text-gray-600">This feature is coming soon!</p>
    </div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col font-automotive">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              {/* TÜM BU YOLLARI DÜZELTTİK: './frontend/' ön ekini kaldırdık */}
              <Route path="/cars" element={<Cars />} />
              <Route path="/cars/:id" element={<CarDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/ai-chat" element={<ProtectedRoute><AIChat /></ProtectedRoute>} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
              <Route path="/compare" element={<PlaceholderPage title="Compare Vehicles" />} />
              <Route path="/reviews" element={<PlaceholderPage title="Expert Reviews" />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;