import React from 'react';
import { WaffleConfiguration, Ingredient, ExtraProduct } from './types';

interface OrderSidebarProps {
  order: WaffleConfiguration[];
  total: number;
  onRemoveWaffle: (id: number) => void;
  calculateWafflePrice: (waffle: WaffleConfiguration) => number;
  extraProductsOrder: (ExtraProduct & { quantity: number })[];
  onRemoveExtraProduct: (id: number) => void;
}

const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);

const OrderSidebar: React.FC<OrderSidebarProps> = ({ order, total, onRemoveWaffle, calculateWafflePrice, extraProductsOrder, onRemoveExtraProduct }) => {
  return (
    <div className="hidden lg:block sticky top-28 bg-white rounded-2xl shadow-2xl p-6">
      <h2 className="text-3xl font-black text-brand-fuchsia text-center mb-6 border-b-2 border-gray-100 pb-4">
        Tu Pedido
      </h2>
      <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
        {order.length === 0 && extraProductsOrder.length === 0 ? (
          <p className="text-center text-gray-500 py-8">Aún no has añadido nada a tu pedido.</p>
        ) : (
          <>
            {order.map((waffle, index) => (
              <div key={waffle.id} className="mb-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xl font-bold text-gray-800">Waffle #{index + 1}</h3>
                  <button 
                    onClick={() => onRemoveWaffle(waffle.id)} 
                    className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100 transition-colors"
                    aria-label={`Eliminar Waffle #${index + 1}`}
                  >
                      <TrashIcon />
                  </button>
                </div>

                <div className="space-y-2">
                    <div>
                      <h4 className="text-md font-bold text-gray-700">Base</h4>
                      <div className="flex justify-between items-center text-gray-600">
                        <span>{waffle.base.name}</span>
                        <span className="font-semibold">${waffle.base.price.toFixed(2)}</span>
                      </div>
                    </div>
                  
                  {waffle.ingredients.length > 0 && (
                    <div>
                      <h4 className="text-md font-bold text-gray-700">Ingredientes</h4>
                      <ul className="space-y-1">
                        {waffle.ingredients.map((ing) => (
                          <li key={ing.id} className="flex justify-between items-center text-gray-600">
                            <span>{ing.name}</span>
                            <span className="font-semibold">${ing.price.toFixed(2)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {waffle.toppings.length > 0 && (
                    <div>
                      <h4 className="text-md font-bold text-gray-700">Toppings</h4>
                      <ul className="space-y-1">
                        {waffle.toppings.map((top) => (
                          <li key={top.id} className="flex justify-between items-center text-gray-600">
                            <span>{top.name}</span>
                            <span className="font-semibold">${top.price.toFixed(2)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                 <div className="text-right font-bold text-gray-700 text-lg mt-3 pt-2 border-t border-gray-200">
                      Subtotal: ${calculateWafflePrice(waffle).toFixed(2)}
                  </div>
              </div>
            ))}

            {extraProductsOrder.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Adicionales</h3>
                  <div className="space-y-2">
                      {extraProductsOrder.map(item => (
                          <div key={`extra-${item.id}`} className="flex justify-between items-center text-gray-600 bg-gray-50 p-2 rounded-lg">
                              <div>
                                  <span className="font-semibold">{item.quantity}x</span> {item.name}
                              </div>
                              <div className="flex items-center">
                                  <span className="font-semibold mr-3">${(item.price * item.quantity).toFixed(2)}</span>
                                  <button 
                                      onClick={() => onRemoveExtraProduct(item.id)}
                                      className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100 transition-colors"
                                      aria-label={`Eliminar ${item.name}`}
                                  >
                                      <TrashIcon />
                                  </button>
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
            )}
          </>
        )}
      </div>
      <div className="mt-8 pt-6 border-t-2 border-dashed border-gray-200">
        <div className="flex justify-between items-center text-2xl font-black">
          <span className="text-gray-800">TOTAL</span>
          <span className="text-brand-fuchsia">${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSidebar;