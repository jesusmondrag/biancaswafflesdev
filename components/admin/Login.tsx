import React, { useState } from 'react';

interface LoginProps {
  onLoginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validEmails = ['admin@superadmin.com', 'admin@biancas.com'];

    // Hardcoded credentials as per request, allowing multiple admin emails
    if (validEmails.includes(email) && password === 'admin951357') {
      setError('');
      onLoginSuccess();
    } else {
      setError('Credenciales incorrectas. Inténtalo de nuevo.');
    }
  };

  return (
    <div className="bg-brand-pink min-h-screen flex items-center justify-center font-sans">
      <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
          <img src="/images/logo.png" alt="Bianca's Waffle Logo" className="h-24 mx-auto mb-4" />
          <h1 className="text-3xl font-black text-brand-fuchsia">Acceso de Administrador</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-bold text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 text-gray-800 border-2 border-gray-200 rounded-lg focus:ring-brand-fuchsia focus:border-brand-fuchsia transition"
              placeholder="admin@email.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-bold text-gray-600 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 text-gray-800 border-2 border-gray-200 rounded-lg focus:ring-brand-fuchsia focus:border-brand-fuchsia transition"
              placeholder="••••••••••"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center font-semibold">{error}</p>
          )}

          <div>
            <button
              type="submit"
              className="w-full mt-4 bg-brand-fuchsia text-white font-black text-lg px-8 py-3 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Ingresar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;