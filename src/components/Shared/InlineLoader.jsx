/**
 * Loader inline para usar dentro de componentes sin ocupar toda la pantalla
 * Ideal para botones, cards, secciones, etc.
 */

const InlineLoader = ({ 
  variant = 'orbit', 
  size = 'md',
  className = '' 
}) => {
  const sizeClasses = {
    xs: 'w-4 h-4',
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16'
  };

  const dotSizes = {
    xs: 'w-1 h-1',
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-3 h-3'
  };

  const containerSize = sizeClasses[size] || sizeClasses.md;
  const dotSize = dotSizes[size] || dotSizes.md;

  // Variante: Spinner simple
  const SpinnerLoader = () => (
    <div className={`${containerSize} border-3 border-blue-500 border-t-transparent rounded-full animate-spin`} />
  );

  // Variante: Puntos animados
  const DotsLoader = () => (
    <div className="flex gap-1.5">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`${dotSize} bg-gradient-to-br from-blue-500 to-purple-600 rounded-full animate-bounce`}
          style={{
            animationDelay: `${i * 0.15}s`,
            animationDuration: '0.6s'
          }}
        />
      ))}
    </div>
  );

  // Variante: Órbita compacta
  const OrbitLoader = () => (
    <div className={`relative ${containerSize}`}>
      {/* Círculo central */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`${dotSize} bg-gradient-to-br from-blue-500 to-purple-600 rounded-full animate-pulse`} />
      </div>
      
      {/* Órbitas */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="absolute inset-0 animate-spin"
          style={{
            animationDuration: `${1.5 + i * 0.3}s`,
            animationDelay: `${i * 0.15}s`
          }}
        >
          <div 
            className={`absolute top-0 left-1/2 -translate-x-1/2 ${dotSize} rounded-full`}
            style={{
              background: 'linear-gradient(135deg, rgb(59, 130, 246), rgb(147, 51, 234))',
              opacity: 0.7 - i * 0.15,
              boxShadow: '0 0 8px rgba(59, 130, 246, 0.4)'
            }}
          />
        </div>
      ))}
    </div>
  );

  // Variante: Pulso
  const PulseLoader = () => (
    <div className="relative flex items-center justify-center">
      {[0, 1].map((i) => (
        <div
          key={i}
          className={`absolute ${containerSize} rounded-full border-2 border-blue-500 animate-ping`}
          style={{
            animationDelay: `${i * 0.4}s`,
            animationDuration: '1.2s',
            opacity: 0.5 - i * 0.2
          }}
        />
      ))}
      <div className={`${containerSize} rounded-full bg-gradient-to-br from-blue-500 to-purple-600`} 
           style={{ transform: 'scale(0.5)' }} />
    </div>
  );

  const loaderVariants = {
    spinner: <SpinnerLoader />,
    dots: <DotsLoader />,
    orbit: <OrbitLoader />,
    pulse: <PulseLoader />
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      {loaderVariants[variant] || loaderVariants.orbit}
    </div>
  );
};

export default InlineLoader;
