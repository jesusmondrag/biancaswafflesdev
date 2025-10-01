
import React, { useState } from 'react';
import { Ingredient } from './types';

interface IngredientSelectorProps {
  ingredients: Ingredient[];
  selectedIngredients: Ingredient[];
  onToggleIngredient: (ingredient: Ingredient) => void;
}

const IngredientSelector: React.FC<IngredientSelectorProps> = ({
  ingredients,
  selectedIngredients,
  onToggleIngredient,
}) => {
  const [animatedIngredientId, setAnimatedIngredientId] = useState<number | null>(null);

  const isSelected = (ingredient: Ingredient) =>
    !!selectedIngredients.find((item) => item.id === ingredient.id);

  const handleToggle = (ingredient: Ingredient) => {
    onToggleIngredient(ingredient);
    setAnimatedIngredientId(ingredient.id);
    // Remove the animation class after it has played
    setTimeout(() => {
      setAnimatedIngredientId(null);
    }, 300); 
  };

  return (
    <div className="mb-12">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-700 mb-6">
        <span className="text-brand-fuchsia">Paso 2:</span> Agrega tus Ingredientes
      </h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
        {ingredients.map((ingredient) => (
          <label
            key={ingredient.id}
            className={`cursor-pointer rounded-2xl shadow-md p-1 sm:p-2 text-center flex flex-col items-center justify-center transform hover:scale-105 transition-all duration-300 ${
              isSelected(ingredient)
                ? 'bg-fuchsia-100 border-4 border-brand-fuchsia shadow-lg shadow-brand-fuchsia/50'
                : 'bg-white border-2 border-gray-200'
            } ${
              animatedIngredientId === ingredient.id ? 'animate-pop' : ''
            }`}
          >
            <img
              src={ingredient.imageUrl}
              alt={ingredient.name}
              className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-full mb-2"
            />
            <span className="font-semibold text-xs sm:text-sm mb-2">{ingredient.name}</span>
            <input
              type="checkbox"
              checked={isSelected(ingredient)}
              onChange={() => handleToggle(ingredient)}
              className="form-checkbox h-5 w-5 text-brand-fuchsia rounded focus:ring-brand-fuchsia"
            />
          </label>
        ))}
      </div>
    </div>
  );
};

export default IngredientSelector;