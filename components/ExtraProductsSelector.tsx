
import React, { useState } from 'react';
import { ExtraProduct } from './types';

interface ExtraProductsSelectorProps {
  products: ExtraProduct[];
  order: (ExtraProduct & { quantity: number })[];
  onAdd: (product: ExtraProduct) => void;
  onRemove: (product: ExtraProduct) => void;
}

const PlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>;
const MinusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" /></svg>;

const ExtraProductsSelector: React.FC<ExtraProductsSelectorProps> = ({ products, order, onAdd, onRemove }) => {
  const [animatedProductId, setAnimatedProductId] = useState<number | null>(null);

  const getQuantity = (productId: number) => {
    return order.find(p => p.id === productId)?.quantity || 0;
  };

  const handleAnimate = (productId: number) => {
      setAnimatedProductId(productId);
      setTimeout(() => setAnimatedProductId(null), 300);
  }

  return (
    <section className="bg-white rounded-2xl shadow-lg p-8 my-12">
      <h2 className="text-4xl font-extrabold text-gray-700 text-center mb-8">
        ¿Algo para Acompañar?
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {products.map((product) => {
            const quantity = getQuantity(product.id);
            return (
                <div key={product.id} className={`rounded-2xl shadow-md p-3 text-center flex flex-col items-center justify-between transform hover:scale-105 transition-all duration-300 border-2 ${quantity > 0 ? 'border-brand-fuchsia bg-fuchsia-50' : 'bg-white border-gray-200'} ${animatedProductId === product.id ? 'animate-pop' : ''}`}>
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-24 h-24 object-contain mb-2"
                    />
                    <div className="flex-grow">
                        <h3 className="font-bold text-gray-800">{product.name}</h3>
                        <p className="font-semibold text-gray-500">${product.price.toFixed(2)}</p>
                    </div>
                    {quantity === 0 ? (
                        <button onClick={() => { onAdd(product); handleAnimate(product.id); }} className="mt-3 w-full flex items-center justify-center bg-brand-fuchsia text-white font-bold py-2 px-3 rounded-lg transition hover:bg-opacity-90">
                            <PlusIcon /> <span className="ml-1">Añadir</span>
                        </button>
                    ) : (
                        <div className="mt-3 flex items-center justify-center space-x-3">
                            <button onClick={() => { onRemove(product); handleAnimate(product.id); }} className="bg-gray-200 p-2 rounded-full text-gray-700 hover:bg-gray-300 transition"><MinusIcon /></button>
                            <span className="font-bold text-lg text-brand-fuchsia">{quantity}</span>
                            <button onClick={() => { onAdd(product); handleAnimate(product.id); }} className="bg-gray-200 p-2 rounded-full text-gray-700 hover:bg-gray-300 transition"><PlusIcon /></button>
                        </div>
                    )}
                </div>
            )
        })}
      </div>
    </section>
  );
};

export default ExtraProductsSelector;
