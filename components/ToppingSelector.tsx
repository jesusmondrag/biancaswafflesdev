
import React, { useState } from 'react';
import { Ingredient } from './types';

interface ToppingSelectorProps {
  toppings: Ingredient[];
  selectedToppings: Ingredient[];
  onToggleTopping: (topping: Ingredient) => void;
}

const ToppingSelector: React.FC<ToppingSelectorProps> = ({
  toppings,
  selectedToppings,
  onToggleTopping,
}) => {
  const [animatedToppingId, setAnimatedToppingId] = useState<number | null>(null);

  const isSelected = (topping: Ingredient) =>
    !!selectedToppings.find((item) => item.id === topping.id);

  const handleToggle = (topping: Ingredient) => {
    onToggleTopping(topping);
    setAnimatedToppingId(topping.id);
    // Remove the animation class after it has played
    setTimeout(() => {
      setAnimatedToppingId(null);
    }, 300);
  };

  return (
    <div className="mb-12">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-700 mb-6">
        <span className="text-brand-fuchsia">Paso 3:</span> Añade tus Toppings
      </h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
        {toppings.map((topping) => (
          <label
            key={topping.id}
            className={`cursor-pointer rounded-2xl shadow-md p-1 sm:p-2 text-center flex flex-col items-center justify-center transform hover:scale-105 transition-all duration-300 ${
              isSelected(topping)
                ? 'bg-fuchsia-100 border-4 border-brand-fuchsia shadow-lg shadow-brand-fuchsia/50'
                : 'bg-white border-2 border-gray-200'
            } ${
              animatedToppingId === topping.id ? 'animate-pop' : ''
            }`}
          >
            <img
              src={topping.imageUrl}
              alt={topping.name}
              className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-full mb-2"
            />
            <span className="font-semibold text-xs sm:text-sm mb-2">{topping.name}</span>
            <input
              type="checkbox"
              checked={isSelected(topping)}
              onChange={() => handleToggle(topping)}
              className="form-checkbox h-5 w-5 text-brand-fuchsia rounded focus:ring-brand-fuchsia"
            />
          </label>
        ))}
      </div>
    </div>
  );
};

export default ToppingSelector;