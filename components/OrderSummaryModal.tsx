
import React, { useEffect } from 'react';
import { WaffleConfiguration, ExtraProduct } from './types';

interface OrderSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: WaffleConfiguration[];
  total: number;
  onRemoveWaffle: (id: number) => void;
  calculateWafflePrice: (waffle: WaffleConfiguration) => number;
  extraProductsOrder: (ExtraProduct & { quantity: number })[];
  onRemoveExtraProduct: (id: number) => void;
}

const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);

const CompactWaffleDetails: React.FC<{
    waffle: WaffleConfiguration;
    index: number;
    onRemoveWaffle: (id: number) => void;
    calculateWafflePrice: (waffle: WaffleConfiguration) => number;
}> = ({ waffle, index, onRemoveWaffle, calculateWafflePrice }) => {
    const ingredientsText = waffle.ingredients.map(i => i.name).join(', ') || 'Ninguno';
    const toppingsText = waffle.toppings.map(t => t.name).join(', ') || 'Ninguno';
    
    return (
        <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex justify-between items-start">
                <div className="flex-grow mr-2">
                    <h3 className="font-bold text-gray-800">Waffle #{index + 1}: <span className="font-normal">{waffle.base.name}</span></h3>
                    {waffle.ingredients.length > 0 && <p className="text-xs text-gray-600 leading-tight mt-1"><span className="font-semibold">Con:</span> {ingredientsText}</p>}
                    {waffle.toppings.length > 0 && <p className="text-xs text-gray-600 leading-tight mt-1"><span className="font-semibold">Toppings:</span> {toppingsText}</p>}
                </div>
                <div className="flex flex-col items-end flex-shrink-0 ml-2">
                     <p className="font-bold text-lg text-brand-fuchsia mb-1">${calculateWafflePrice(waffle).toFixed(2)}</p>
                     <button 
                        onClick={() => onRemoveWaffle(waffle.id)} 
                        className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100 transition-colors"
                        aria-label={`Eliminar Waffle #${index + 1}`}
                    >
                        <TrashIcon />
                    </button>
                </div>
            </div>
        </div>
    );
}


const OrderSummaryModal: React.FC<OrderSummaryModalProps> = ({ isOpen, onClose, order, total, onRemoveWaffle, calculateWafflePrice, extraProductsOrder, onRemoveExtraProduct }) => {

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    if (!isOpen) {
        return null;
    }

  return (
    <div 
        className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-end" 
        onClick={onClose}
        aria-modal="true"
        role="dialog"
    >
      <div 
        className={`bg-white w-full max-h-[85vh] rounded-t-2xl shadow-2xl p-4 sm:p-6 flex flex-col transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4 border-b pb-3 flex-shrink-0">
            <h2 className="text-2xl font-black text-brand-fuchsia">
                Tu Pedido
            </h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-800 p-2">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
        <div className="flex-grow space-y-4 overflow-y-auto pr-2">
            {order.length === 0 && extraProductsOrder.length === 0 ? (
            <p className="text-center text-gray-500 py-8">Aún no has añadido nada a tu pedido.</p>
            ) : (
            <>
                {order.map((waffle, index) => (
                    <CompactWaffleDetails 
                        key={waffle.id}
                        waffle={waffle}
                        index={index}
                        onRemoveWaffle={onRemoveWaffle}
                        calculateWafflePrice={calculateWafflePrice}
                    />
                ))}

                {extraProductsOrder.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                    <h3 className="text-lg font-bold text-gray-800 mb-3">Adicionales</h3>
                    <div className="space-y-2">
                        {extraProductsOrder.map(item => (
                            <div key={`extra-${item.id}`} className="flex justify-between items-center text-gray-600 bg-gray-50 p-2 rounded-lg">
                                <div><span className="font-semibold">{item.quantity}x</span> {item.name}</div>
                                <div className="flex items-center">
                                    <span className="font-semibold mr-3">${(item.price * item.quantity).toFixed(2)}</span>
                                    <button onClick={() => onRemoveExtraProduct(item.id)} className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100 transition-colors" aria-label={`Eliminar ${item.name}`}><TrashIcon /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                )}
            </>
            )}
        </div>
        <div className="mt-6 pt-6 border-t-2 border-dashed border-gray-200 flex-shrink-0">
            <div className="flex justify-between items-center text-2xl font-black">
            <span className="text-gray-800">TOTAL</span>
            <span className="text-brand-fuchsia">${total.toFixed(2)}</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryModal;