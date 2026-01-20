import { useEffect, useState } from 'react';

/**
 * Loader simple con el logotipo real de Shock-Store
 */
const ModernLoader = ({ message = 'Cargando' }) => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#E5E7EB] to-[#C7CCD1]">
      <div className="text-center space-y-6">
        {/* Logo con animación de rotación */}
        <div className="flex justify-center">
          <img 
            src="/logotipo_tiny.png" 
            alt="Shock-Store" 
            className="w-24 h-24 animate-spin"
            style={{ animationDuration: '2s' }}
          />
        </div>
        
        {/* Mensaje */}
        <p className="text-gray-700 font-semibold text-lg">
          {message}{dots}
        </p>
      </div>
    </div>
  );
};

export default ModernLoader;
