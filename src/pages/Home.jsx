import { useNavigate } from 'react-router-dom';
import Header from '../components/Shared/Header';
import Footer from '../components/Shared/Footer';
import ScrollButton from '../components/Shared/ScrollButton';
import HeroCarousel from '../components/Home/HeroCarousel';
import RevendedoresSection from '../components/Home/RevendedoresSection';
import PCBuilderSection from '../components/Home/PCBuilderSection';
import CategoryProductSection from '../components/Home/CategoryProductSection';
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
      {/* Background Gradients */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[#0a0a0f]"></div>
        <div className="absolute inset-0">
          <div className="absolute" style={{ width: '60vw', height: '60vh', background: 'radial-gradient(ellipse at top left, rgba(30, 58, 138, 0.25) 0%, transparent 70%)', filter: 'blur(100px)', top: '-20%', left: '-15%' }} />
          <div className="absolute" style={{ width: '50vw', height: '50vh', background: 'radial-gradient(circle at center, rgba(88, 28, 135, 0.2) 0%, transparent 70%)', filter: 'blur(120px)', top: '30%', right: '-10%' }} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40"></div>
      </div>
      
      <Header 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onGoHome={handleGoHome}
      />

      <main className="flex-1 w-full flex flex-col relative">
        <div className="w-full flex-1 flex flex-col">
          {/* CategoryFilter - Mobile y Desktop */}
          <div className="px-3 sm:px-4 py-3 sm:py-4 bg-[#0a0a0f]">
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
            <div className="grid md:grid-cols-2 gap-3">
              <PCBuilderSection />
            </div>
          </div>
          
          {/* Desktop: PC Builder después del Hero */}
          <div className="hidden sm:block mb-4 sm:mb-6 sm:px-4">
            <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
              <PCBuilderSection />
            </div>
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
