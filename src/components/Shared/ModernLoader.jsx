import { useEffect, useState } from 'react';

/**
 * Componente de carga moderno con múltiples variantes de animación
 * @param {string} variant - Tipo de animación: 'dots', 'pulse', 'bars', 'orbit'
 * @param {string} message - Mensaje opcional a mostrar
 * @param {string} size - Tamaño: 'sm', 'md', 'lg'
 */
const ModernLoader = ({ 
  variant = 'orbit', 
  message = '', 
  size = 'md' 
}) => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-16 h-16',
    lg: 'w-24 h-24'
  };

  const containerSize = sizeClasses[size] || sizeClasses.md;

  // Variante: Puntos animados
  const DotsLoader = () => (
    <div className="flex gap-2">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-4 h-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full animate-bounce"
          style={{
            animationDelay: `${i * 0.15}s`,
            animationDuration: '0.6s'
          }}
        />
      ))}
    </div>
  );

  // Variante: Pulso con anillos
  const PulseLoader = () => (
    <div className="relative flex items-center justify-center">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`absolute ${containerSize} rounded-full border-4 border-blue-500 animate-ping`}
          style={{
            animationDelay: `${i * 0.3}s`,
            animationDuration: '1.5s',
            opacity: 0.6 - i * 0.2
          }}
        />
      ))}
      <div className={`${containerSize} rounded-full bg-gradient-to-br from-blue-500 to-purple-600 animate-pulse`} />
    </div>
  );

  // Variante: Barras de carga
  const BarsLoader = () => (
    <div className="flex gap-1.5 items-end h-16">
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="w-2 bg-gradient-to-t from-blue-500 to-purple-600 rounded-full animate-pulse"
          style={{
            animationDelay: `${i * 0.1}s`,
            animationDuration: '0.8s',
            height: `${20 + (i % 3) * 15}px`
          }}
        />
      ))}
    </div>
  );

  // Variante: Órbita (más moderna y atractiva)
  const OrbitLoader = () => (
    <div className={`relative ${containerSize}`}>
      {/* Círculo central */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-4 h-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full animate-pulse" />
      </div>
      
      {/* Órbitas */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="absolute inset-0 animate-spin"
          style={{
            animationDuration: `${2 + i * 0.5}s`,
            animationDelay: `${i * 0.2}s`
          }}
        >
          <div 
            className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
            style={{
              background: `linear-gradient(135deg, rgb(59, 130, 246), rgb(147, 51, 234))`,
              opacity: 0.8 - i * 0.2,
              boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)'
            }}
          />
        </div>
      ))}
    </div>
  );

  const loaderVariants = {
    dots: <DotsLoader />,
    pulse: <PulseLoader />,
    bars: <BarsLoader />,
    orbit: <OrbitLoader />
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#E5E7EB] to-[#C7CCD1]">
      <div className="text-center space-y-6">
        {/* Animación del loader */}
        <div className="flex justify-center">
          {loaderVariants[variant] || loaderVariants.orbit}
        </div>
        
        {/* Mensaje con animación de puntos */}
        {message && (
          <div className="space-y-2">
            <p className="text-gray-700 font-semibold text-lg tracking-wide">
              {message}{dots}
            </p>
            <div className="w-48 h-1 bg-gray-300 rounded-full mx-auto overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse" 
                   style={{ width: '60%' }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModernLoader;
