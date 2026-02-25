import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useScrollToTop } from '../hooks/useScrollToTop';
import Header from '../components/Shared/Header';
import Footer from '../components/Shared/Footer';
import ScrollButton from '../components/Shared/ScrollButton';
import HeroCarousel from '../components/Home/HeroCarousel';
import PCBuilderSection from '../components/Home/PCBuilderSection';
import CategoryProductSection from '../components/Home/CategoryProductSection';
import PuntosRetiroInfoSection from '../components/Home/PuntosRetiroInfoSection';
import CategoryFilter from '../components/Catalog/CategoryFilter';
import DiagonalDivider from '../components/Home/DiagonalDivider';

import { useFilter } from '../context/FilterContext';
import { getSlugFromCategory } from '../utils/slugify';
import { useSEO } from '../hooks/useSEO';
import { useParallax } from '../hooks/useParallax';
import mayoristaData from '../data/categories/mayorista.json';
import RevendedoresSection from '../components/Home/RevendedoresSection';

const mayoristaProducts = mayoristaData.products;

const Home = () => {
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery, setSelectedCategory, clearSubFilters } = useFilter();
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Scroll al inicio
  useScrollToTop();
  
  // Activar animaciones después de un pequeño delay
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);
  
  // Parallax sutil para backgrounds (solo desktop)
  const parallax1 = useParallax(0.15);
  const parallax2 = useParallax(0.25);
  const parallax3 = useParallax(0.2);

  // SEO para Home
  useSEO({
    title: 'ElectroShock | Catálogo de Venta - Tecnología y Componentes PC',
    description: 'Catálogo completo de productos ElectroShock. Encuentra los mejores componentes para PC, hardware gaming, periféricos y más.',
    keywords: 'ElectroShock, componentes pc, hardware, gaming, tecnología',
    type: 'website'
  });

  // Limpiar categoría seleccionada al entrar al Home
  useEffect(() => {
    setSelectedCategory(null);
  }, [setSelectedCategory]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    const slug = getSlugFromCategory(category);
    navigate(`/categoria/${slug}`);
  };

  const handleGoHome = () => {
    setSelectedCategory(null);
    setSearchQuery('');
    clearSubFilters();
    navigate('/');
  };

  const handleRevendedorProductClick = (product) => {
    console.log('Pack seleccionado:', product);
    // navigate(`/pack/${product.id}`); // Si tienes una página especial para Kits
  };

  return (
    <div className="min-h-screen w-full flex flex-col relative">
      {/* Background Gradients con Parallax - Solo desktop */}
      <div className="fixed inset-0 -z-10 bg-[#0a0a0f] overflow-hidden">
        <div className="hidden md:block absolute inset-0">
          {/* Gradient 1 - Parallax lento */}
          <div 
            ref={parallax1.ref}
            style={parallax1.style}
            className="absolute w-1/2 h-1/2 bg-blue-900/10 rounded-full blur-3xl top-0 left-0" 
          />
          {/* Gradient 2 - Parallax medio */}
          <div 
            ref={parallax2.ref}
            style={parallax2.style}
            className="absolute w-1/2 h-1/2 bg-purple-900/10 rounded-full blur-3xl bottom-0 right-0" 
          />
          {/* Gradient 3 - Parallax rápido (nuevo) */}
          <div 
            ref={parallax3.ref}
            style={parallax3.style}
            className="absolute w-1/3 h-1/3 bg-cyan-900/8 rounded-full blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" 
          />
        </div>
      </div>
      
      <Header 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onGoHome={handleGoHome}
      />

      <main className="flex-1 w-full flex flex-col relative">
        <div className="w-full flex-1 flex flex-col">
          {/* CategoryFilter - Solo Desktop con fade-in */}
          <div className={`hidden sm:block px-3 sm:px-4 py-3 sm:py-4 bg-[#0a0a0f] transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            <CategoryFilter 
              selectedCategory={null}
              onCategoryChange={handleCategoryClick}
            />
          </div>

          {/* Hero con fade-in */}
          <div className={`mb-4 sm:mb-6 transition-all duration-700 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <HeroCarousel />
          </div>

          {/* Mobile: Kits Ahorro con fade-in */}
          <div className={`sm:hidden px-3 mb-4 transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <RevendedoresSection
              products={mayoristaProducts}
              onProductClick={handleRevendedorProductClick}
            />
          </div>

          {/* Mobile: PC Builder con fade-in */}
          <div className={`sm:hidden transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <PCBuilderSection />
          </div>

          {/* Mobile: Separador diagonal */}
          <div className="sm:hidden">
            <DiagonalDivider />
          </div>

          {/* Mobile: Puntos de Retiro con fade-in */}
          <div className={`sm:hidden mb-4 transition-all duration-700 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <PuntosRetiroInfoSection />
          </div>
          
          {/* Desktop: PC Builder y Puntos de Retiro con fade-in */}
          <div className={`hidden sm:block mb-4 sm:mb-6 sm:px-4 transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="grid md:grid-cols-2 gap-3 sm:gap-4 h-[600px]">
              <PCBuilderSection />
              <PuntosRetiroInfoSection />
            </div>
          </div>

          {/* Desktop: Kits Ahorro con fade-in */}
          <div className={`hidden sm:block px-3 sm:px-4 mb-4 sm:mb-6 transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <RevendedoresSection
              products={mayoristaProducts}
              onProductClick={handleRevendedorProductClick}
            />
          </div>
          
          {/* Categories con fade-in */}
          <div className={`px-3 sm:px-4 mb-6 sm:mb-10 transition-all duration-700 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <CategoryProductSection onCategoryClick={handleCategoryClick} />
          </div>
        </div>
      </main>

      <Footer />
      <ScrollButton />
    </div>
  );
};

export default Home;
