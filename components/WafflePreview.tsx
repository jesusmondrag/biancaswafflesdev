import React from 'react';
import { WaffleBase, Ingredient } from './types';

interface WafflePreviewProps {
  selectedBase: WaffleBase;
  selectedIngredients: Ingredient[];
}

const WafflePreview: React.FC<WafflePreviewProps> = ({ selectedBase, selectedIngredients }) => {
  return (
    <div className="mb-12 flex flex-col items-center">
      <h2 className="text-3xl font-extrabold text-gray-700 mb-6 text-center">
        Tu Creación
      </h2>
      <div className="relative w-80 h-60 md:w-96 md:h-72 bg-gray-100 rounded-2xl flex items-center justify-center overflow-hidden shadow-inner border-4 border-white">
        {/* Base Image */}
        <img
          src={selectedBase.imageUrl}
          alt={selectedBase.name}
          className="w-full h-full object-cover transition-all duration-500"
        />

        {/* Ingredients Overlay */}
        {selectedIngredients.map((ingredient, index) => (
          <img
            key={ingredient.id}
            src={ingredient.imageUrl}
            alt={ingredient.name}
            className="absolute w-16 h-16 md:w-20 md:h-20 object-contain transition-all duration-300 ease-in-out transform hover:scale-125"
            style={{
              // Pseudo-random but deterministic positioning based on ID and index
              top: `${10 + (ingredient.id % 5) * 15}%`,
              left: `${10 + ((index * 3) % 5) * 15}%`,
              transform: `rotate(${(ingredient.id * -25 + index * 55) % 360}deg)`,
            }}
            title={ingredient.name}
          />
        ))}
      </div>
    </div>
  );
};

export default WafflePreview;