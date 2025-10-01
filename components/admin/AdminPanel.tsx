import React, { useState } from 'react';
import { WaffleBase, Ingredient, AppSettings, ExtraProduct, PaymentMethod } from '../types';
import GeneralSettings from './GeneralSettings';
import ManageItems from './ManageItems';
import AboutUsEditor from './AboutUsEditor';
import FAQManager from './FAQManager';

interface AdminPanelProps {
  bases: WaffleBase[];
  setBases: React.Dispatch<React.SetStateAction<WaffleBase[]>>;
  ingredients: Ingredient[];
  setIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>;
  toppings: Ingredient[];
  setToppings: React.Dispatch<React.SetStateAction<Ingredient[]>>;
  extraProducts: ExtraProduct[];
  setExtraProducts: React.Dispatch<React.SetStateAction<ExtraProduct[]>>;
  paymentMethods: PaymentMethod[];
  setPaymentMethods: React.Dispatch<React.SetStateAction<PaymentMethod[]>>;
  settings: AppSettings;
  setSettings: React.Dispatch<React.SetStateAction<AppSettings>>;
  onNavigate: (view: string) => void;
  onLogout: () => void;
}

type AdminView = 'settings' | 'about' | 'faq' | 'bases' | 'ingredients' | 'toppings' | 'extras' | 'payments';

const AdminPanel: React.FC<AdminPanelProps> = (props) => {
  const [view, setView] = useState<AdminView>('settings');

  const getButtonClass = (buttonView: AdminView) => {
    return `px-4 py-2 font-bold rounded-lg transition ${
      view === buttonView ? 'bg-brand-fuchsia text-white' : 'bg-gray-200 text-gray-700'
    }`;
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800">Panel de Administración</h1>
            <div className="flex items-center">
              <a 
                href="#menu" 
                onClick={(e) => { e.preventDefault(); props.onNavigate('menu'); }}
                className="text-brand-fuchsia font-semibold hover:underline"
              >
                Volver a la Tienda
              </a>
               <button
                onClick={props.onLogout}
                className="ml-4 bg-red-500 text-white font-bold py-2 px-3 rounded-lg hover:bg-red-600 transition-all text-sm"
              >
                Cerrar Sesión
              </button>
            </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex space-x-2 border-b pb-4 flex-wrap gap-2">
            <button onClick={() => setView('settings')} className={getButtonClass('settings')}>Configuración General</button>
            <button onClick={() => setView('about')} className={getButtonClass('about')}>Quiénes Somos</button>
            <button onClick={() => setView('faq')} className={getButtonClass('faq')}>Preguntas Frecuentes</button>
            <button onClick={() => setView('bases')} className={getButtonClass('bases')}>Bases de Waffle</button>
            <button onClick={() => setView('ingredients')} className={getButtonClass('ingredients')}>Ingredientes</button>
            <button onClick={() => setView('toppings')} className={getButtonClass('toppings')}>Toppings</button>
            <button onClick={() => setView('extras')} className={getButtonClass('extras')}>Otros Productos</button>
            <button onClick={() => setView('payments')} className={getButtonClass('payments')}>Métodos de Pago</button>
        </div>

        <div>
            {view === 'settings' && <GeneralSettings 
                bases={props.bases}
                ingredients={props.ingredients}
                toppings={props.toppings}
                extraProducts={props.extraProducts}
                paymentMethods={props.paymentMethods}
                settings={props.settings}
            />}
            {view === 'about' && <AboutUsEditor settings={props.settings} onSave={props.setSettings} />}
            {view === 'faq' && <FAQManager settings={props.settings} onSave={props.setSettings} />}
            {view === 'bases' && <ManageItems title="Bases de Waffle" items={props.bases} setItems={props.setBases} itemType="base" />}
            {view === 'ingredients' && <ManageItems title="Ingredientes" items={props.ingredients} setItems={props.setIngredients} itemType="ingredient" />}
            {view === 'toppings' && <ManageItems title="Toppings" items={props.toppings} setItems={props.setToppings} itemType="topping" />}
            {view === 'extras' && <ManageItems title="Otros Productos" items={props.extraProducts} setItems={props.setExtraProducts} itemType="extra" />}
            {view === 'payments' && <ManageItems title="Métodos de Pago" items={props.paymentMethods} setItems={props.setPaymentMethods} itemType="payment" />}
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;