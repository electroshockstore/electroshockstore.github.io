import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const ScrollButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Mostrar botón después de scrollear 300px
      setShowButton(scrollTop > 300);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!showButton) return null;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[1001]">
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
  );
};

export default ScrollButton;
