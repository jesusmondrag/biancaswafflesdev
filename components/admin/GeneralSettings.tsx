import React from 'react';
import { AppSettings, WaffleBase, Ingredient, ExtraProduct, PaymentMethod } from '../types';

interface GeneralSettingsProps {
  settings: AppSettings;
  bases: WaffleBase[];
  ingredients: Ingredient[];
  toppings: Ingredient[];
  extraProducts: ExtraProduct[];
  paymentMethods: PaymentMethod[];
}

const GeneralSettings: React.FC<GeneralSettingsProps> = (props) => {

  const handleExport = () => {
    const dataToExport = {
      bases: props.bases,
      ingredients: props.ingredients,
      toppings: props.toppings,
      extraProducts: props.extraProducts,
      paymentMethods: props.paymentMethods,
      settings: props.settings,
    };

    const jsonString = JSON.stringify(dataToExport, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-bold mb-4 text-gray-700">Configuración General y Publicación</h3>
      
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md" role="alert">
          <p className="font-bold">Flujo de Trabajo Importante</p>
          <p>Todos los cambios que realices en el panel de administración (productos, textos, etc.) se guardan temporalmente en tu navegador. Para que estos cambios sean visibles para todos tus clientes, debes seguir estos pasos:</p>
      </div>

      <div className="mt-6 space-y-4">
          <div className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center bg-brand-fuchsia text-white font-bold rounded-full">1</div>
              <p className="ml-4 text-gray-700">Realiza todas las modificaciones que necesites en las diferentes secciones del panel (Quiénes Somos, Productos, etc.).</p>
          </div>
          <div className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center bg-brand-fuchsia text-white font-bold rounded-full">2</div>
              <p className="ml-4 text-gray-700">Cuando estés listo para publicar, regresa a esta pantalla y haz clic en el botón de abajo para descargar el archivo de datos actualizado.</p>
          </div>
          <div className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center bg-brand-fuchsia text-white font-bold rounded-full">3</div>
              <p className="ml-4 text-gray-700">Sube el archivo <strong>data.json</strong> descargado a la carpeta principal de tu hosting, reemplazando el archivo existente.</p>
          </div>
      </div>
      
      <div className="mt-8 border-t pt-6">
        <h4 className="text-xl font-bold text-gray-800 mb-2">Publicar Cambios</h4>
        <p className="text-gray-600 mb-4">Este botón empaquetará todos los cambios que has hecho en un archivo. Este es el archivo que necesitas subir a tu servidor.</p>
        <button
          onClick={handleExport}
          className="bg-brand-green text-white font-bold py-3 px-6 rounded-lg hover:bg-opacity-90 transition-transform transform hover:scale-105 shadow-lg"
        >
          Descargar Archivo de Datos Actualizado
        </button>
      </div>
    </div>
  );
};

export default GeneralSettings;