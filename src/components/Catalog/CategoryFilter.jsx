import { useState, useRef, useEffect } from 'react';
import { categories } from '../../data';
import { useIsIOS } from '../../hooks/useDevice';
import CategoryModal from './CategoryFilter/CategoryModal';
import MobileDropdown from './CategoryFilter/MobileDropdown';
import DesktopCarousel from './CategoryFilter/DesktopCarousel';

const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const [savedScrollPosition, setSavedScrollPosition] = useState(0);
  
  const isIOS = useIsIOS();
  const dropdownRef = useRef(null);
  const scrollContainerRef = useRef(null);

  // Lógica de Scroll (optimizada sin dependencias circulares)
  useEffect(() => {
    const checkScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        setShowLeftArrow(scrollLeft > 10);
        setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 10);
      }
    };

    checkScroll();
    window.addEventListener('resize', checkScroll);
    
    const scrollEl = scrollContainerRef.current;
    if (scrollEl) {
      scrollEl.addEventListener('scroll', checkScroll, { passive: true });
    }

    return () => {
      window.removeEventListener('resize', checkScroll);
      if (scrollEl) {
        scrollEl.removeEventListener('scroll', checkScroll);
      }
    };
  }, []);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Bloquear scroll cuando modal está abierto
  useEffect(() => {
    if (isOpen) {
      setSavedScrollPosition(window.scrollY);
      // ⚡ Scroll nativo - No necesita pausarse
      
      // iOS: Agregar clase modal-open
      if (isIOS) {
        document.body.classList.add('modal-open');
        document.body.style.top = `-${window.scrollY}px`;
      }
      
      return () => {
        // ⚡ Scroll nativo - No necesita reanudarse
        
        // iOS: Remover clase y restaurar scroll
        if (isIOS) {
          document.body.classList.remove('modal-open');
          document.body.style.position = '';
          document.body.style.top = '';
          window.scrollTo(0, savedScrollPosition);
        }
      };
    }
  }, [isOpen, isIOS, savedScrollPosition]);

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleCategorySelect = (category) => {
    setIsOpen(false);
    onCategoryChange(category);
  };

  return (
    <>
      {/* Modal de categorías */}
      <CategoryModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
      />

      <div className="relative group z-20 w-full category-filter">
        {/* CAPAS DE RESPLANDOR */}
        <div 
          className="absolute -inset-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full -z-10 opacity-30"
          style={{ filter: 'blur(24px)' }}
        />
        <div 
          className="absolute -inset-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full -z-10 opacity-25"
          style={{ filter: 'blur(16px)' }}
        />

        {/* RGB FLOWING BORDER */}
        <div className="relative rounded-full overflow-hidden p-[3px] animate-border-rotate">
          <div className="relative bg-white rounded-full z-10">
            {/* MOBILE: Dropdown */}
            <MobileDropdown
              isOpen={isOpen}
              selectedCategory={selectedCategory}
              onClick={() => setIsOpen(!isOpen)}
              dropdownRef={dropdownRef}
            />

            {/* DESKTOP: Carousel */}
            <DesktopCarousel
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={onCategoryChange}
              showLeftArrow={showLeftArrow}
              showRightArrow={showRightArrow}
              onScroll={handleScroll}
              scrollContainerRef={scrollContainerRef}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryFilter;
