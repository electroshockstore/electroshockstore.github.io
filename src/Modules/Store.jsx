import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/InventoryApp/Header';
import CategoryFilter from '../components/InventoryApp/CategoryFilter';
import ViewToggleButton from '../components/InventoryApp/ViewToggleButton';
import SortSelector from '../components/InventoryApp/SortSelector';
import ProductGrid from '../components/InventoryApp/ProductGrid';
import SidebarFilters from '../components/InventoryApp/SidebarFilters';
import Footer from '../components/InventoryApp/Footer';
import ScrollButton from '../components/InventoryApp/ScrollButton';
import HeroCarousel from '../components/InventoryApp/HeroCarousel';
import PCBuilderSection from '../components/InventoryApp/PCBuilderSection';
import CategoryProductSection from '../components/InventoryApp/CategoryProductSection';
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
  const [sortOrder, setSortOrder] = useState(null); // null, 'asc', 'desc'

  // Ordenar productos por precio
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (!sortOrder) return 0;
    const priceA = a.price || 0;
    const priceB = b.price || 0;
    return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
  });

  // SEO Logic
  if (selectedCategory && selectedCategory !== 'Todos') {
    useCategorySEO(selectedCategory, filteredProducts.length);
  } else {
    useSEO({
      title: 'Shock-Store | Catálogo de Venta - Tecnología y Componentes PC',
      description: 'Catálogo completo de productos Shock-Store...',
      keywords: 'shock-store, componentes pc, hardware, gaming',
      type: 'website'
    });
  }

  useEffect(() => {
    if (categorySlug) {
      const category = getCategoryFromSlug(categorySlug);
      if (category && category !== selectedCategory) {
        setSelectedCategory(category);
      }
    }
  }, [categorySlug, selectedCategory, setSelectedCategory]);

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
    <div className="min-h-screen w-full flex flex-col relative">
      {/* Background Gradients (solo en Home) */}
      {!selectedCategory && (
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-[#0a0a0f]"></div>
          <div className="absolute inset-0">
            <div className="absolute" style={{ width: '60vw', height: '60vh', background: 'radial-gradient(ellipse at top left, rgba(30, 58, 138, 0.25) 0%, transparent 70%)', filter: 'blur(100px)', top: '-20%', left: '-15%' }} />
            <div className="absolute" style={{ width: '50vw', height: '50vh', background: 'radial-gradient(circle at center, rgba(88, 28, 135, 0.2) 0%, transparent 70%)', filter: 'blur(120px)', top: '30%', right: '-10%' }} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40"></div>
        </div>
      )}
      
      <Header 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onGoHome={handleGoHome}
      />

      <main className="flex-1 w-full flex flex-col relative">
        {/* Selector de Categorías Superior */}
        <div className="px-4 sm:px-6 py-4 sm:py-6 relative z-[60]">
          <CategoryFilter 
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>
        
        {!selectedCategory ? (
          /* VISTA HOME */
          <div className="w-full flex-1 flex flex-col px-2 sm:px-4">
            <div className="mb-6">
              <HeroCarousel />
            </div>
            <div className="mb-6">
              <div className="grid md:grid-cols-2 gap-4">
                <PCBuilderSection />
              </div>
            </div>
            <div className="mb-10">
              <CategoryProductSection onCategoryClick={handleCategoryChange} />
            </div>
          </div>
        ) : (
          /* VISTA DE PRODUCTOS (Categoría Seleccionada) */
          <div className="flex flex-col lg:flex-row gap-6 min-h-[60vh] px-4 sm:px-6 pb-8">
            
            {/* 1. FILTROS (Aparece primero en mobile) */}
            {showSidebar && (
              <aside className="lg:flex-shrink-0 lg:pt-24">
                <SidebarFilters
                  selectedCategory={selectedCategory}
                  filters={subFilters}
                  onFilterChange={handleSubFilterChange}
                  onClearFilters={clearSubFilters}
                />
              </aside>
            )}
            
          {/* 2. CONTENIDO DE PRODUCTOS */}
<div className="flex-1 min-w-0">
  
  {/* Controles de vista y ordenamiento alineados a la derecha */}
  {filteredProducts.length > 0 && (
    <div className="pb-4 flex justify-end items-center gap-3">
      <SortSelector 
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
      />
      <ViewToggleButton 
        viewMode={viewMode}
        toggleViewMode={toggleViewMode}
      />
    </div>
  )}

              {filteredProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-12 shadow-2xl border border-gray-700/50 max-w-md">
                    <div className="bg-blue-500/20 backdrop-blur-sm p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                      <svg className="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">No hay productos disponibles</h3>
                    <p className="text-gray-400 mb-6">No encontramos productos que coincidan con los filtros seleccionados.</p>
                    <button
                      onClick={() => {
                        clearSubFilters();
                        setSelectedCategory(null);
                      }}
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl transition-all duration-200 shadow-lg"
                    >
                      Ver todas las categorías
                    </button>
                  </div>
                </div>
              ) : (
                <ProductGrid 
                  products={sortedProducts}
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