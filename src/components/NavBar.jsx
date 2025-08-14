import React from 'react';

const NavBar = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="text-xl font-bold text-gray-900">
              Suggestly Elite
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <button className="text-luxury-light hover:text-luxury-gold transition-colors duration-300">
              Services
            </button>
            <button className="text-luxury-light hover:text-luxury-gold transition-colors duration-300">
              Features
            </button>
            <button className="text-luxury-light hover:text-luxury-gold transition-colors duration-300">
              Pricing
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
