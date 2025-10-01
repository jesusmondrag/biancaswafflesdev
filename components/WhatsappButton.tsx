

import React from 'react';
import { WaffleConfiguration, ExtraProduct } from './types';

const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.05 4.91A9.816 9.816 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.73-1.11-5.22-2.9-7.01zm-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.264 8.264 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.23.86 5.82 2.45s2.45 3.62 2.45 5.82c0 4.54-3.7 8.24-8.24 8.24zm4.52-6.16c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.06-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74 2.48 1.08 2.48.72 2.92.69.44-.04 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.07-.12-.22-.19-.48-.31z"/>
  </svg>
);


interface WhatsappButtonProps {
    order: WaffleConfiguration[];
    extraProductsOrder: (ExtraProduct & { quantity: number })[];
    total: number;
    name: string;
    phone: string;
    phoneError?: string;
    address: string;
    deliveryMethod: 'pickup' | 'delivery' | null;
    paymentMethod: string | null;
    paymentMethodName: string | null;
    whatsappNumber: string;
}

const WhatsappButton: React.FC<WhatsappButtonProps> = ({ order, extraProductsOrder, total, name, phone, phoneError, address, deliveryMethod, paymentMethod, paymentMethodName, whatsappNumber }) => {
  
  const isButtonDisabled = 
    !name.trim() ||
    !phone.trim() ||
    !!phoneError ||
    (order.length === 0 && extraProductsOrder.length === 0) ||
    !deliveryMethod ||
    !paymentMethod ||
    (deliveryMethod === 'delivery' && !address.trim());

  const handleOrder = () => {
    if (isButtonDisabled) {
      alert("Por favor, completa todos los campos y añade al menos un producto a tu pedido.");
      return;
    }

    let message = `*¡Hola Bianca's Waffle! 🧇 Quisiera hacer un pedido:*\n\n`;
    message += `*Cliente:* ${name}\n`;
    message += `*Teléfono:* ${phone}\n\n`;
    
    message += `*Método de Entrega:* ${deliveryMethod === 'pickup' ? 'Pickup (retirar en el foodtruck)' : 'Delivery (a tu casa)'}\n`;
    if (deliveryMethod === 'delivery') {
      message += `*Dirección:* ${address}\n`;
    }

    message += `*Método de Pago:* ${paymentMethodName}\n`;
    
    if (order.length > 0) {
        message += `\n`;
        order.forEach((waffle, index) => {
            message += `*--- WAFFLE ${index + 1} ---*\n`;
            message += `*Base:* ${waffle.base.name} - $${waffle.base.price.toFixed(2)}\n`;

            if (waffle.ingredients.length > 0) {
                message += `*Ingredientes:*\n`;
                waffle.ingredients.forEach(ing => {
                    message += `  - ${ing.name} - $${ing.price.toFixed(2)}\n`;
                });
            }
            
            if (waffle.toppings.length > 0) {
                message += `*Toppings:*\n`;
                waffle.toppings.forEach(top => {
                    message += `  - ${top.name} - $${top.price.toFixed(2)}\n`;
                });
            }
        });
    }

    if (extraProductsOrder.length > 0) {
        message += `\n*--- ADICIONALES ---*\n`;
        extraProductsOrder.forEach(item => {
            message += `${item.quantity}x ${item.name} - $${(item.price * item.quantity).toFixed(2)}\n`;
        });
    }


    message += `\n*--------------------*\n`;
    message += `*TOTAL A PAGAR: $${total.toFixed(2)}*\n`;
    message += `*--------------------*\n\n`;
    message += `¡Espero confirmación! Gracias 😊`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="mt-16 text-center">
        <button 
            onClick={handleOrder}
            disabled={isButtonDisabled}
            className={`inline-flex items-center justify-center bg-brand-green text-white font-black text-xl px-12 py-5 rounded-full shadow-2xl transition-all duration-300 ease-in-out ${
              isButtonDisabled
              ? 'opacity-50 cursor-not-allowed'
              : 'transform hover:scale-110'
            }`}
        >
            <WhatsAppIcon />
            COMPLETAR PEDIDO POR WHATSAPP
        </button>
    </div>
  );
};

export default WhatsappButton;