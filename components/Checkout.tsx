

import React, { useMemo, useState } from 'react';
import Map from './Map';
import { WaffleConfiguration, AppSettings, ExtraProduct, PaymentMethod } from './types';
import WhatsappButton from './WhatsappButton';

const MapPinIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const HomeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
);


interface CheckoutProps {
  name: string;
  phone: string;
  onNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onPhoneChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  address: string;
  onAddressChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  deliveryMethod: 'pickup' | 'delivery' | null;
  onDeliveryMethodChange: (method: 'pickup' | 'delivery') => void;
  paymentMethod: string | null;
  onPaymentMethodChange: (method: string) => void;
  paymentMethods: PaymentMethod[];
  order: WaffleConfiguration[];
  extraProductsOrder: (ExtraProduct & { quantity: number })[];
  total: number;
  settings: AppSettings;
}

const Checkout: React.FC<CheckoutProps> = ({ name, phone, onNameChange, onPhoneChange, address, onAddressChange, deliveryMethod, onDeliveryMethodChange, paymentMethod, onPaymentMethodChange, paymentMethods, order, extraProductsOrder, total, settings }) => {
  const [phoneError, setPhoneError] = useState('');
  
  const selectedPaymentMethodName = useMemo(() => {
    if (!paymentMethod) return null;
    return paymentMethods.find(p => p.key === paymentMethod)?.name || null;
  }, [paymentMethod, paymentMethods]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPhone = e.target.value;
    onPhoneChange(e);
    // Basic validation: check if it contains numbers and has a reasonable length
    const phoneRegex = /^[\d\s-]{7,15}$/;
    if (newPhone && !phoneRegex.test(newPhone)) {
        setPhoneError('Por favor, introduce un número de teléfono válido.');
    } else {
        setPhoneError('');
    }
  };
  
  return (
    <section className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8 mt-12">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-700 text-center mb-8">
        ¡Casi listo!
      </h2>
      <div className="max-w-md mx-auto">
        <div className="space-y-6">
          <div>
            <label htmlFor="fullName" className="block text-sm font-bold text-gray-600 mb-1">
              Nombre Completo
            </label>
            <input
              type="text"
              id="fullName"
              value={name}
              onChange={onNameChange}
              placeholder="Ej: Bianca Smith"
              className="w-full px-4 py-3 text-gray-800 border-2 border-gray-200 rounded-lg focus:ring-brand-fuchsia focus:border-brand-fuchsia transition"
            />
          </div>
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-bold text-gray-600 mb-1">
              Nro. de Teléfono
            </label>
            <input
              type="tel"
              id="phoneNumber"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="Ej: 0412-1234567"
              className={`w-full px-4 py-3 text-gray-800 border-2 rounded-lg focus:ring-brand-fuchsia focus:border-brand-fuchsia transition ${phoneError ? 'border-red-500' : 'border-gray-200'}`}
              aria-invalid={!!phoneError}
              aria-describedby="phone-error"
            />
            {phoneError && <p id="phone-error" className="text-red-600 text-sm mt-1">{phoneError}</p>}
          </div>

          <div className="pt-2">
             <label className="block text-sm font-bold text-gray-600 mb-2">
                Método de Entrega
            </label>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <button
                    onClick={() => onDeliveryMethodChange('pickup')}
                    className={`w-full flex items-center justify-center py-3 px-2 text-sm sm:text-base font-bold rounded-lg transition-all duration-300 transform hover:scale-105 ${
                        deliveryMethod === 'pickup'
                        ? 'bg-brand-fuchsia text-white shadow-lg'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                    <MapPinIcon />
                    Pickup (retirar)
                </button>
                <button
                    onClick={() => onDeliveryMethodChange('delivery')}
                    className={`w-full flex items-center justify-center py-3 px-2 text-sm sm:text-base font-bold rounded-lg transition-all duration-300 transform hover:scale-105 ${
                        deliveryMethod === 'delivery'
                        ? 'bg-brand-fuchsia text-white shadow-lg'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                    <HomeIcon />
                    Delivery
                </button>
            </div>
          </div>
          
          {deliveryMethod === 'delivery' && (
             <div className="transition-all duration-500">
                <label htmlFor="fullAddress" className="block text-sm font-bold text-gray-600 mb-1">
                Dirección Completa
                </label>
                <input
                type="text"
                id="fullAddress"
                value={address}
                onChange={onAddressChange}
                placeholder="Ej: Av. Principal, Edif. Sol, Apto 5"
                className="w-full px-4 py-3 text-gray-800 border-2 border-gray-200 rounded-lg focus:ring-brand-fuchsia focus:border-brand-fuchsia transition"
                />
            </div>
          )}
          
          {deliveryMethod === 'pickup' && (
             <div className="mt-6 transition-all duration-500 ease-in-out">
                <p className="text-center font-bold text-gray-600 mb-2">
                    ¡Te esperamos! Encuéntranos aquí:
                </p>
                <Map mapUrl={settings.mapUrl} />
            </div>
          )}

        </div>

        <div className="mt-10">
            <h3 className="text-center text-lg font-bold text-gray-600 mb-4">Métodos de Pago</h3>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
              {paymentMethods.map(method => (
                <button 
                  key={method.id}
                  onClick={() => onPaymentMethodChange(method.key)}
                  className={`w-full sm:w-auto flex items-center justify-center px-6 py-3 font-bold rounded-lg shadow-sm transition-all duration-300 transform hover:scale-105 ${
                      paymentMethod === method.key
                      ? 'bg-brand-fuchsia text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                    <img src={method.imageUrl} alt={`${method.name} Logo`} className="h-8 w-8 mr-3 object-contain" />
                    {method.name}
                </button>
              ))}
            </div>
        </div>
      </div>
      <WhatsappButton
        order={order}
        extraProductsOrder={extraProductsOrder}
        total={total}
        name={name}
        phone={phone}
        phoneError={phoneError}
        address={address}
        deliveryMethod={deliveryMethod}
        paymentMethod={paymentMethod}
        paymentMethodName={selectedPaymentMethodName}
        whatsappNumber={settings.whatsappNumber}
      />
    </section>
  );
};

export default Checkout;