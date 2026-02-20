import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import Portal from './Portal';

const ScrollButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setShowButton(scrollTop > 300);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    // Scroll nativo suave
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <Portal>
      <div className="floating-button-fixed-right">
      {/* Botón Scroll to Top - Diseño moderno con glassmorphism */}
      <button
        onClick={scrollToTop}
        className={`group relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl
                   bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600
                   text-white 
                   backdrop-blur-xl bg-opacity-90
                   shadow-[0_8px_32px_rgba(59,130,246,0.3)]
                   hover:shadow-[0_12px_48px_rgba(59,130,246,0.5)]
                   border border-white/20
                   flex items-center justify-center
                   transition-all duration-300 ease-out
                   hover:scale-110 hover:-translate-y-1
                   active:scale-95
                   ${showButton 
                     ? 'opacity-100 translate-y-0 pointer-events-auto' 
                     : 'opacity-0 translate-y-8 pointer-events-none'
                   }`}
        style={{
          willChange: 'transform, opacity'
        }}
        aria-label="Ir al inicio"
      >
        {/* Glow effect animado */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400 to-purple-500 opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-300" />
        
        {/* Icono con animación de rebote al hover */}
        <ArrowUp 
          className="h-6 w-6 sm:h-7 sm:w-7 relative z-10 group-hover:-translate-y-0.5 transition-transform duration-200" 
          strokeWidth={2.5} 
        />
        
        {/* Ripple effect en el borde */}
        <div className="absolute inset-0 rounded-2xl border-2 border-blue-400/50 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
        
        {/* Tooltip mejorado */}
        <span className="absolute right-full mr-4 px-4 py-2.5
                         bg-gray-900/95 backdrop-blur-sm text-white text-sm font-bold
                         rounded-xl whitespace-nowrap
                         opacity-0 group-hover:opacity-100
                         translate-x-2 group-hover:translate-x-0
                         pointer-events-none
                         transition-all duration-200
                         shadow-xl border border-white/10">
          Ir al inicio
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-45 w-2 h-2 bg-gray-900/95 border-r border-t border-white/10" />
        </span>
      </button>
    </div>
    </Portal>
  );
};

export default ScrollButton;
