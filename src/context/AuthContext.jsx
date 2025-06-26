import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

  const login = async (email, password) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.email === email && storedUser.password === password) {
      const mockUser = {
        id: '1',
        name: storedUser.name || 'Car Enthusiast',
        email: email,
        favorites: storedUser.favorites || [],
        isAuthenticated: true
      };
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      return true;
    }
    return false;
  };

  const signup = async (name, email, password) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const existingUser = JSON.parse(localStorage.getItem('user'));
    if (existingUser && existingUser.email === email) {
      return false;
    }
    const newUser = {
      id: '1',
      name,
      email,
      password,
      favorites: [],
      isAuthenticated: true
    };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const addFavorite = (carId) => {
    if (!user) return;
    const updatedUser = {
      ...user,
      favorites: [...new Set([...user.favorites, carId])]
    };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const removeFavorite = (carId) => {
    if (!user) return;
    const updatedUser = {
      ...user,
      favorites: user.favorites.filter(id => id !== carId)
    };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    login,
    signup,
    logout,
    addFavorite,
    removeFavorite,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};