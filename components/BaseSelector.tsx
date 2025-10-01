
import React from 'react';
import { WaffleBase } from './types';

interface BaseSelectorProps {
  bases: WaffleBase[];
  selectedBase: WaffleBase;
  onSelectBase: (base: WaffleBase) => void;
}

const BaseSelector: React.FC<BaseSelectorProps> = ({ bases, selectedBase, onSelectBase }) => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-700 mb-6">
        <span className="text-brand-fuchsia">Paso 1:</span> Elige tu Base
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {bases.map((base) => (
          <div
            key={base.id}
            onClick={() => onSelectBase(base)}
            className={`cursor-pointer bg-white rounded-2xl overflow-hidden transform transition-all duration-300 ease-in-out border-4 ${
              selectedBase.id === base.id
                ? 'border-brand-fuchsia scale-105 shadow-2xl'
                : 'border-transparent shadow-lg hover:scale-105 hover:shadow-xl'
            }`}
          >
            <img src={base.imageUrl} alt={base.name} className="w-full h-40 sm:h-48 object-cover" />
            <div className="p-4 text-center">
              <h3 className="text-lg sm:text-xl font-bold">{base.name}</h3>
              <p className="text-md sm:text-lg text-gray-500 font-semibold">${base.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BaseSelector;