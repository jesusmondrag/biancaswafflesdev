
import React from 'react';
import { WaffleBase, Ingredient, WaffleConfiguration } from './types';
import BaseSelector from './BaseSelector';
import IngredientSelector from './IngredientSelector';
import ToppingSelector from './ToppingSelector';

const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
);

interface WaffleBuilderProps {
  bases: WaffleBase[];
  ingredients: Ingredient[];
  toppings: Ingredient[];
  orderSize: number;
  currentWaffle: Omit<WaffleConfiguration, 'id'>;
  onBaseSelect: (base: WaffleBase) => void;
  onIngredientToggle: (ingredient: Ingredient) => void;
  onToppingToggle: (topping: Ingredient) => void;
  onAddWaffleToOrder: () => void;
  calculateWafflePrice: (waffle: Omit<WaffleConfiguration, 'id'>) => number;
}

const WaffleBuilder: React.FC<WaffleBuilderProps> = ({
  bases,
  ingredients,
  toppings,
  orderSize,
  currentWaffle,
  onBaseSelect,
  onIngredientToggle,
  onToppingToggle,
  onAddWaffleToOrder,
  calculateWafflePrice
}) => {
  const currentWafflePrice = calculateWafflePrice(currentWaffle);

  return (
    <section>
       <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-700 text-center mb-8">
            Armando Waffle #{orderSize + 1}
        </h2>
        <BaseSelector
            bases={bases}
            selectedBase={currentWaffle.base}
            onSelectBase={onBaseSelect}
        />
        <IngredientSelector
            ingredients={ingredients}
            selectedIngredients={currentWaffle.ingredients}
            onToggleIngredient={onIngredientToggle}
        />
        <ToppingSelector
            toppings={toppings}
            selectedToppings={currentWaffle.toppings}
            onToggleTopping={onToppingToggle}
        />
       </div>

      <div className="mt-8 p-4 sm:p-6 bg-white rounded-2xl shadow-2xl text-center lg:sticky top-28 z-10">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-700">Resumen de tu Waffle Actual</h3>
          <p className="text-2xl sm:text-3xl font-black text-brand-fuchsia mt-2">${currentWafflePrice.toFixed(2)}</p>
          <button 
              onClick={onAddWaffleToOrder}
              disabled={!currentWaffle.base}
              className="mt-4 w-full inline-flex items-center justify-center bg-brand-fuchsia text-white font-black text-lg px-6 py-3 sm:px-8 sm:py-4 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
              <PlusIcon />
              Añadir este Waffle al Pedido
          </button>
      </div>
    </section>
  );
};

export default WaffleBuilder;