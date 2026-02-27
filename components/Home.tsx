import React from 'react';
import { ViewState } from '../types';

interface HomeProps {
  onStart: (view: ViewState) => void;
}

export const Home: React.FC<HomeProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-orange-100 flex items-center justify-center px-4 relative overflow-hidden">

      {/* Animated Glow Background */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-orange-300 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-green-300 rounded-full blur-3xl opacity-30 animate-pulse"></div>

      <div className="relative bg-white/60 backdrop-blur-xl shadow-2xl rounded-3xl p-10 md:p-16 max-w-5xl w-full text-center border border-white/40 transition-all duration-500 hover:shadow-green-200">

        {/* Floating Fruit Icons */}
        <div className="absolute top-6 right-6 opacity-20 pointer-events-none animate-bounce">
          <i className="fas fa-apple-whole text-8xl text-red-500"></i>
        </div>
        <div className="absolute bottom-6 left-6 opacity-20 pointer-events-none animate-bounce">
          <i className="fas fa-lemon text-8xl text-yellow-400"></i>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 tracking-tight">
          Fruity <span className="text-green-600">Fiesta</span>
        </h1>

        {/* Subtitle */}
        <h2 className="text-xl md:text-2xl font-semibold mt-4 text-gray-600">
          Let’s pick some <span className="text-green-600">Fresh Fruits</span> 🍎 🍌 🍊
        </h2>

        <div className="mt-6 h-[2px] bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

        {/* Description */}
        <p className="mt-8 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Experience the future of agricultural automation. 
          Our AI-powered system classifies fruits and evaluates their quality 
          within seconds using advanced deep learning technology.
        </p>

        {/* Upload Box */}
        <div
          onClick={() => onStart('prediction')}
          className="mt-10 cursor-pointer group flex flex-col items-center p-8 border-2 border-dashed border-gray-300 rounded-2xl hover:border-green-500 hover:bg-green-50 transition-all duration-300 w-full max-w-md mx-auto hover:scale-105 shadow-inner"
        >
          <i className="fas fa-image text-6xl text-gray-400 group-hover:text-green-500 mb-4 transition"></i>
          <span className="text-lg font-medium text-gray-700 group-hover:text-green-700 transition">
            Click to Upload Your Image
          </span>
        </div>

        {/* Button */}
        <div className="mt-8">
          <button
            onClick={() => onStart('prediction')}
            type="button"
            className="px-10 py-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold shadow-lg hover:scale-110 hover:shadow-2xl transition-all duration-300 active:scale-95"
          >
             Submit and Predict
          </button>
        </div>

      </div>
    </div>
  );
};