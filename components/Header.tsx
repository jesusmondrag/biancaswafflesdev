
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center mb-12">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-brand-fuchsia tracking-tight">
        Crea un Waffle a tu Medida Perfecta
      </h1>
      <p className="mt-4 max-w-3xl mx-auto text-lg sm:text-xl text-gray-600">
        ¡Bienvenido a nuestro menú interactivo! Aquí tú eres el artista. Comienza eligiendo tu base de waffle favorita y luego desata tu creatividad agregando todos los ingredientes que se te antojen. ¡Vamos a crear algo delicioso!
      </p>
    </header>
  );
};

export default Header;