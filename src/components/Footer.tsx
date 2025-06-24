import React from 'react';
import { Car, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-automotive-carbon text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-red p-2 rounded-lg">
                <Car className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold font-automotive">CarInfo Pro</span>
            </div>
            <p className="text-gray-400 mb-4">
              Your ultimate destination for comprehensive car information, expert reviews, and AI-powered automotive insights.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2 text-gray-400">
                <Mail className="h-4 w-4" />
                <span className="text-sm">info@carinfopro.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/cars" className="text-gray-400 hover:text-white transition-colors">Browse Cars</a></li>
              <li><a href="/compare" className="text-gray-400 hover:text-white transition-colors">Compare Vehicles</a></li>
              <li><a href="/reviews" className="text-gray-400 hover:text-white transition-colors">Expert Reviews</a></li>
              <li><a href="/ai-chat" className="text-gray-400 hover:text-white transition-colors">AI Assistant</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><a href="/cars?category=luxury" className="text-gray-400 hover:text-white transition-colors">Luxury Cars</a></li>
              <li><a href="/cars?category=sports" className="text-gray-400 hover:text-white transition-colors">Sports Cars</a></li>
              <li><a href="/cars?category=electric" className="text-gray-400 hover:text-white transition-colors">Electric Vehicles</a></li>
              <li><a href="/cars?category=suv" className="text-gray-400 hover:text-white transition-colors">SUVs</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">© 2024 CarInfo Pro. All rights reserved. Built with passion for automotive excellence.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;