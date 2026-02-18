import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import Portal from './Portal';

const ScrollButton = () => {
  const [showButton, setShowButton] = useState(false);
  const [viewportOffset, setViewportOffset] = useState(0);
  
  // Detectar iOS
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setShowButton(scrollTop > 300);
    };

    // Scroll nativo - usar evento estándar
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // iOS: Ajustar posición con visualViewport para mantener botón siempre visible
  useEffect(() => {
    if (!isIOS || !window.visualViewport) return;

    const handleViewportChange = () => {
      // Calcular offset cuando la barra de direcciones se oculta/muestra
      const offset = window.innerHeight - window.visualViewport.height;
      setViewportOffset(offset);
    };

    window.visualViewport.addEventListener('resize', handleViewportChange);
    window.visualViewport.addEventListener('scroll', handleViewportChange);
    
    // Inicializar
    handleViewportChange();

    return () => {
      window.visualViewport.removeEventListener('resize', handleViewportChange);
      window.visualViewport.removeEventListener('scroll', handleViewportChange);
    };
  }, [isIOS]);

  const scrollToTop = () => {
    // Scroll nativo suave
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!showButton) return null;

  return (
    <Portal>
      <div 
        className="floating-button-fixed-right"
        style={isIOS ? {
          transform: `translate3d(0, ${-viewportOffset}px, 0)`
        } : undefined}
      >
      {/* Botón Scroll to Top */}
      <button
        onClick={scrollToTop}
        className="group relative w-12 h-12 sm:w-14 sm:h-14 rounded-full 
                   bg-gradient-to-br from-blue-500 to-blue-600 
                   text-white shadow-[0_8px_24px_rgba(59,130,246,0.4)]
                   hover:shadow-[0_12px_32px_rgba(59,130,246,0.5)]
                   hover:scale-110 active:scale-95
                   transition-all duration-300
                   flex items-center justify-center"
        aria-label="Ir al inicio"
      >
        <ArrowUp className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2.5} />
        
        {/* Tooltip */}
        <span className="absolute right-full mr-3 px-3 py-2 
                         bg-gray-900 text-white text-sm font-semibold 
                         rounded-lg whitespace-nowrap
                         opacity-0 group-hover:opacity-100
                         pointer-events-none
                         transition-opacity duration-200">
          Ir al inicio
        </span>
      </button>
    </div>
    </Portal>
  );
};

export default ScrollButton;
