import React from 'react';

const FirebaseNotConfigured: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-red-900 bg-opacity-95 z-[100] flex items-center justify-center text-white p-8">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl font-black mb-4">Error de Configuración</h1>
        <p className="text-xl mb-6">
          La aplicación no ha sido conectada a una base de datos. La información que edites no se guardará de forma permanente.
        </p>
        <div className="font-mono bg-red-700 p-4 rounded-lg text-left text-sm leading-relaxed">
          <p className="font-bold text-base mb-2">Acción Requerida:</p>
          <ol className="list-decimal list-inside space-y-1">
            <li>Crea un proyecto en <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer" className="underline font-bold">Firebase</a>.</li>
            <li>Dentro del proyecto, habilita la base de datos **Firestore**.</li>
            <li>Ve a la **Configuración del proyecto** (⚙️) &gt; **General**.</li>
            {/* FIX: The unescaped `</>` was causing a JSX parsing error. Replaced with properly escaped HTML entities inside a `code` tag for semantic correctness. */}
            <li>En "Tus apps", crea una app web <code>&lt;/&gt;</code> y copia el objeto `firebaseConfig`.</li>
            <li>Pega este objeto en el archivo <strong>firebase/config.ts</strong> de tu proyecto.</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default FirebaseNotConfigured;
