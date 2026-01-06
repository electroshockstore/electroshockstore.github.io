import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Header from '../components/Shared/Header';
import Footer from '../components/Shared/Footer';
import ScrollButton from '../components/Shared/ScrollButton';
import HeroCarousel from '../components/Home/HeroCarousel';
import RevendedoresSection from '../components/Home/RevendedoresSection';
import PCBuilderSection from '../components/Home/PCBuilderSection';
import CategoryProductSection from '../components/Home/CategoryProductSection';
import PuntosRetiroInfoSection from '../components/Home/PuntosRetiroInfoSection';
import CategoryFilter from '../components/Catalog/CategoryFilter';
import FloatingChatButton from '../components/Shared/FloatingChatButton';
import { useFilter } from '../context/FilterContext';
import { getSlugFromCategory } from '../utils/slugify';
import { useSEO } from '../hooks/useSEO';
import { mayoristaProducts } from '../data/categories/mayorista';

const Home = () => {
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery, setSelectedCategory, clearSubFilters } = useFilter();

  // SEO para Home
  useSEO({
    title: 'Shock-Store | Catálogo de Venta - Tecnología y Componentes PC',
    description: 'Catálogo completo de productos Shock-Store. Encuentra los mejores componentes para PC, hardware gaming, periféricos y más.',
    keywords: 'shock-store, componentes pc, hardware, gaming, tecnología',
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
    // navigate(`/pack/${product.id}`); // Si tienes una página especial para packs
  };

  return (
    <div className="min-h-screen w-full flex flex-col relative">
      {/* Background Gradients - Simplificado */}
      <div className="fixed inset-0 -z-10 bg-[#0a0a0f]">
        {/* Gradientes solo en desktop */}
        <div className="hidden sm:block absolute inset-0">
          <div className="absolute w-1/2 h-1/2 bg-blue-900/10 rounded-full blur-3xl top-0 left-0" />
          <div className="absolute w-1/2 h-1/2 bg-purple-900/10 rounded-full blur-3xl bottom-0 right-0" />
        </div>
      </div>
      
      <Header 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onGoHome={handleGoHome}
      />

      <main className="flex-1 w-full flex flex-col relative">
        <div className="w-full flex-1 flex flex-col">
          {/* CategoryFilter - Solo Desktop */}
          <div className="hidden sm:block px-3 sm:px-4 py-3 sm:py-4 bg-[#0a0a0f]">
            <CategoryFilter 
              selectedCategory={null}
              onCategoryChange={handleCategoryClick}
            />
          </div>

          {/* Hero - Sin padding en mobile para ancho completo */}
          <div className="mb-4 sm:mb-6">
            <HeroCarousel />
          </div>

          {/* Mobile: Packs Ahorro después del Hero */}
          <div className="sm:hidden px-3 mb-4">
            <RevendedoresSection 
              products={mayoristaProducts}
              onProductClick={handleRevendedorProductClick}
            />
          </div>

          {/* Mobile: PC Builder después de Packs */}
          <div className="sm:hidden mb-4">
            <PCBuilderSection />
          </div>
          
          {/* Desktop: PC Builder después del Hero */}
          <div className="hidden sm:block mb-4 sm:mb-6 sm:px-4">
            <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
              <PCBuilderSection />
            </div>
          </div>

              {/* Puntos de Retiro Info Section */}
          <div className="px-3 sm:px-4 mb-4 sm:mb-6">
            <PuntosRetiroInfoSection />
          </div>

          

          {/* Desktop: Packs Ahorro después del PC Builder */}
          <div className="hidden sm:block px-3 sm:px-4 mb-4 sm:mb-6">
            <RevendedoresSection 
              products={mayoristaProducts}
              onProductClick={handleRevendedorProductClick}
            />
          </div>

      
          
          {/* Categories - Con padding en mobile */}
          <div className="px-3 sm:px-4 mb-6 sm:mb-10">
            <CategoryProductSection onCategoryClick={handleCategoryClick} />
          </div>
        </div>
      </main>

      <Footer />
      <ScrollButton />
      <FloatingChatButton />
    </div>
  );
};

export default Home;
