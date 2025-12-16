import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/InventoryApp/Header';
import CategoryFilter from '../components/InventoryApp/CategoryFilter';
import ViewToggleButton from '../components/InventoryApp/ViewToggleButton';
import ProductGrid from '../components/InventoryApp/ProductGrid';
import SidebarFilters from '../components/InventoryApp/SidebarFilters';
import Footer from '../components/InventoryApp/Footer';
import ScrollButton from '../components/InventoryApp/ScrollButton';
import HeroCarousel from '../components/InventoryApp/HeroCarousel';
import CategoryGrid from '../components/InventoryApp/CategoryGrid';
import FloatingChatButton from '../components/InventoryApp/FloatingChatButton';
import { useFilter } from '../context/FilterContext';
import { getCategoryFromSlug, getSlugFromCategory, generateSKU } from '../utils/slugify';
import { useCategorySEO, useSEO } from '../hooks/useSEO';

const Store = () => {
  const navigate = useNavigate();
  const { categorySlug } = useParams();
  const { 
    searchQuery, 
    setSearchQuery, 
    selectedCategory, 
    setSelectedCategory,
    subFilters,
    handleSubFilterChange,
    filteredProducts,
    clearSubFilters
  } = useFilter();

  const [viewMode, setViewMode] = useState('grid');

  // SEO dinámico
  if (selectedCategory && selectedCategory !== 'Todos') {
    useCategorySEO(selectedCategory, filteredProducts.length);
  } else {
    useSEO({
      title: 'Shock-Store | Catálogo de Venta - Tecnología y Componentes PC',
      description: 'Catálogo completo de productos Shock-Store. Componentes de PC, periféricos gaming, hardware y tecnología. Mejores precios en Berazategui y Florencio Varela.',
      keywords: 'shock-store, componentes pc, hardware, gaming, periféricos, tecnología, berazategui, florencio varela, procesadores, placas de video, memorias ram',
      type: 'website'
    });
  }

  // Sincronizar categoría desde URL
  useEffect(() => {
    if (categorySlug) {
      const category = getCategoryFromSlug(categorySlug);
      if (category && category !== selectedCategory) {
        setSelectedCategory(category);
      }
    }
  }, [categorySlug]);

  const toggleViewMode = () => {
    setViewMode(prev => prev === 'grid' ? 'list' : 'grid');
  };

  const openProductDetail = (product) => {
    const categorySlug = getSlugFromCategory(product.category);
    const productSku = generateSKU(product.name, product.brand);
    navigate(`/categoria/${categorySlug}/${productSku}`, { state: { productId: product.id } });
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category) {
      const slug = getSlugFromCategory(category);
      navigate(`/categoria/${slug}`);
    } else {
      navigate('/');
    }
  };

  const showSidebar = selectedCategory && selectedCategory !== 'Todos';

  const handleGoHome = () => {
    setSelectedCategory(null);
    setSearchQuery('');
    clearSubFilters();
    navigate('/');
  };

  return (
    <div className="min-h-screen w-full flex flex-col">
      <Header 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onGoHome={handleGoHome}
      />
      <main className="flex-1 w-full flex flex-col">
        <div className="px-4 sm:px-6 py-4 sm:py-8">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6 sm:items-center">
            <div className="flex-1 sm:overflow-x-auto">
              <CategoryFilter 
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
              />
            </div>
            {selectedCategory && filteredProducts.length > 0 && (
              <div className="flex sm:items-center flex-shrink-0">
                <ViewToggleButton 
                  viewMode={viewMode}
                  toggleViewMode={toggleViewMode}
                />
              </div>
            )}
          </div>
        </div>

        {!selectedCategory ? (
          <div className="w-full flex-1 flex flex-col">
            <HeroCarousel />
            <CategoryGrid onCategoryClick={handleCategoryChange} />
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6 min-h-[60vh]">
            {showSidebar && (
              <aside className="lg:flex-shrink-0">
                <SidebarFilters
                  selectedCategory={selectedCategory}
                  filters={subFilters}
                  onFilterChange={handleSubFilterChange}
                  onClearFilters={clearSubFilters}
                />
              </aside>
            )}
            
            <div className="flex-1 min-w-0">
              {filteredProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-12 shadow-2xl border border-gray-700/50 max-w-md">
                    <div className="bg-blue-500/20 backdrop-blur-sm p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                      <svg className="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">
                      No hay productos disponibles
                    </h3>
                    <p className="text-gray-400 mb-6">
                      No encontramos productos que coincidan con los filtros seleccionados.
                    </p>
                    <button
                      onClick={() => {
                        clearSubFilters();
                        setSelectedCategory(null);
                      }}
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-blue-500/50 hover:scale-105"
                    >
                      Ver todas las categorías
                    </button>
                  </div>
                </div>
              ) : (
                <ProductGrid 
                  products={filteredProducts}
                  viewMode={viewMode}
                  openModal={openProductDetail}
                />
              )}
            </div>
          </div>
        )}
      </main>
      <Footer />
      <ScrollButton />
      <FloatingChatButton />
    </div>
  );
};

export default Store;
