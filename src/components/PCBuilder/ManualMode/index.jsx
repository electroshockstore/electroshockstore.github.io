import { useState } from 'react';
import Header from '../../Shared/Header';
import ScrollButton from '../../Shared/ScrollButton';
import FloatingChatButton from '../../Shared/FloatingChatButton';
import CategorySidebar from './CategorySidebar';
import ProductGrid from './ProductGrid';
import ProductPreviewPanel from './ProductPreviewPanel';
import { usePCBuilder } from '../../../context/PCBuilderContext';
import { products } from '../../../data';
import { getCompatibleProducts } from '../../../utils/compatibilityEngine';

const ManualMode = ({ onModeChange, onGoHome }) => {
  const { pcBuild, selectComponent } = usePCBuilder();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const compatibleProducts = selectedCategory 
    ? getCompatibleProducts(pcBuild, products, selectedCategory)
    : [];

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedProduct(null);
  };

  const handleProductClick = (product) => {
    // Only show preview on click, don't select yet
    setSelectedProduct(product);
  };

  const handleAddProduct = (product) => {
    // Add product to build when "Agregar" button is clicked
    if (product.compatibilityResult?.status !== 'red') {
      selectComponent(selectedCategory, product);
      
      // Return to main build screen after adding (mobile only behavior)
      // Desktop keeps the category open for further selection
      setSelectedCategory(null);
      setSelectedProduct(null);
    }
  };

  const getSelectedProductId = (category) => {
    const categoryMap = {
      'Procesadores': 'cpu',
      'Motherboards': 'motherboard',
      'Memorias RAM': 'ram',
      'Fuentes': 'psu',
      'Refrigeración': 'cooling',
      'Almacenamiento': 'storage'
    };
    
    const buildKey = categoryMap[category];
    if (!buildKey) return null;
    
    const value = pcBuild[buildKey];
    if (Array.isArray(value)) {
      return value.length > 0 ? value[0].id : null;
    }
    return value ? value.id : null;
  };

  const selectedProductId = selectedCategory ? getSelectedProductId(selectedCategory) : null;

  return (
    <div className="h-screen w-full flex flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden">
      <Header 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onGoHome={onGoHome}
        hideSearchOnMobile={true}
      />
      
      {/* Desktop Layout: 3 columns */}
      <main className="hidden lg:flex flex-1 w-full overflow-hidden">
        <CategorySidebar 
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          onModeChange={onModeChange}
        />
        
        <div className="flex-1 overflow-y-auto p-4 xl:p-8 bg-gradient-to-br from-white/80 via-blue-50/50 to-indigo-50/50 backdrop-blur-sm">
          <ProductGrid
            selectedCategory={selectedCategory}
            products={compatibleProducts}
            selectedProductId={selectedProductId}
            onProductClick={handleProductClick}
            onAddProduct={handleAddProduct}
            onSkipCategory={() => {
              const categories = ['Procesadores', 'Motherboards', 'Memorias RAM', 'Fuentes', 'Refrigeración', 'Almacenamiento'];
              const currentIndex = categories.indexOf(selectedCategory);
              
              if (currentIndex !== -1 && currentIndex < categories.length - 1) {
                setSelectedCategory(categories[currentIndex + 1]);
                setSelectedProduct(null);
              }
            }}
          />
        </div>
        
        <ProductPreviewPanel
          selectedProduct={selectedProduct}
          selectedCategory={selectedCategory}
        />
      </main>

      {/* Mobile/Tablet Layout: PC Case visualization + Category list */}
      <main className="flex lg:hidden flex-1 w-full overflow-hidden flex-col relative">
        {!selectedCategory ? (
          /* Main Build Screen with PC Case */
          <>
            {/* PC Case Visualization - Muy compacto */}
            <div className="relative bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 p-3 pb-3 flex-shrink-0">
              {/* Header compacto */}
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h2 className="text-sm font-bold text-white">Armá tu PC</h2>
                  <p className="text-[10px] text-gray-400">
                    {Object.values(pcBuild).filter(v => v && (Array.isArray(v) ? v.length > 0 : true)).length}/6 componentes
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] text-gray-400 uppercase tracking-wide">Total</p>
                  <p className="text-lg font-black text-white">
                    ${Object.values(pcBuild).reduce((sum, value) => {
                      if (Array.isArray(value)) {
                        return sum + value.reduce((s, item) => s + (item?.price || 0), 0);
                      }
                      return sum + (value?.price || 0);
                    }, 0).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* PC Case Image with hotspots - Mini */}
              <div className="relative w-full h-32 rounded-lg overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&h=200&fit=crop"
                  alt="PC Case"
                  className="absolute inset-0 w-full h-full object-cover opacity-20"
                />
                
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-gray-800/80 to-gray-900/90" />
                
                {/* Component indicators - Horizontal layout */}
                <div className="absolute inset-0 flex items-center justify-center gap-2 px-4">
                  {[
                    { key: 'cpu', label: 'CPU' },
                    { key: 'motherboard', label: 'MB' },
                    { key: 'ram', label: 'RAM' },
                    { key: 'psu', label: 'PSU' },
                    { key: 'cooling', label: 'Cool' },
                    { key: 'storage', label: 'SSD' }
                  ].map(({ key, label }) => {
                    const hasComponent = pcBuild[key] && (Array.isArray(pcBuild[key]) ? pcBuild[key].length > 0 : true);
                    return (
                      <div
                        key={key}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-[8px] font-bold shadow-md transition-all ${
                          hasComponent 
                            ? 'bg-green-500 text-white' 
                            : 'bg-gray-700/80 text-gray-400 border border-dashed border-gray-500'
                        }`}
                      >
                        {hasComponent ? (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          label
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Category List - PRIORIZADO con máxima altura */}
            <div className="flex-1 bg-white overflow-y-auto">
              <div className="p-3 space-y-2 pb-20">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 px-1">Seleccioná componentes</h3>
                
                {[
                  { key: 'Procesadores', label: 'Procesador', icon: '/images/icons/cpu_icon_tiny.webp', buildKey: 'cpu' },
                  { key: 'Motherboards', label: 'Motherboard', icon: '/images/icons/motherboard_icon_tiny.webp', buildKey: 'motherboard' },
                  { key: 'Memorias RAM', label: 'Memoria RAM', icon: '/images/icons/ram_icon_tiny.webp', buildKey: 'ram' },
                  { key: 'Fuentes', label: 'Fuente', icon: '/images/icons/psu_icon_tiny.webp', buildKey: 'psu' },
                  { key: 'Refrigeración', label: 'Refrigeración', icon: '/images/icons/refrigeracion_icon_tiny.webp', buildKey: 'cooling' },
                  { key: 'Almacenamiento', label: 'Almacenamiento', icon: '/images/icons/storage_icon_tiny.webp', buildKey: 'storage' }
                ].map((cat) => {
                  const component = pcBuild[cat.buildKey] && (Array.isArray(pcBuild[cat.buildKey]) ? pcBuild[cat.buildKey][0] : pcBuild[cat.buildKey]);
                  const hasComponent = component != null;
                  
                  return (
                    <button
                      key={cat.key}
                      onClick={() => handleCategoryChange(cat.key)}
                      className={`w-full rounded-xl p-3 transition-all active:scale-98 flex items-center gap-3 ${
                        hasComponent
                          ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300'
                          : 'bg-gray-50 border-2 border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {/* Icon */}
                      <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center p-2 flex-shrink-0 shadow-sm">
                        <img src={cat.icon} alt={cat.label} className="w-full h-full object-contain" />
                      </div>
                      
                      {/* Info */}
                      <div className="flex-1 text-left min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <p className="text-sm font-bold text-gray-700">{cat.label}</p>
                          {hasComponent && (
                            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          )}
                        </div>
                        {hasComponent ? (
                          <>
                            <p className="text-xs text-gray-600 line-clamp-1 mb-0.5">{component.name}</p>
                            <p className="text-sm font-bold text-green-600">${component.price.toLocaleString()}</p>
                          </>
                        ) : (
                          <p className="text-xs text-gray-400">Sin seleccionar</p>
                        )}
                      </div>
                      
                      {/* Arrow */}
                      <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          /* Product Selection Screen */
          <>
            {/* Header con categoría actual */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <div>
                    <p className="text-xs opacity-80 uppercase tracking-wide">Seleccionando</p>
                    <h2 className="text-lg font-bold">{selectedCategory}</h2>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Grid or Preview */}
            <div className="flex-1 overflow-y-auto bg-gray-50">
              {!selectedProduct ? (
                <div className="p-4">
                  <ProductGrid
                    selectedCategory={selectedCategory}
                    products={compatibleProducts}
                    selectedProductId={selectedProductId}
                    onProductClick={handleProductClick}
                    onAddProduct={handleAddProduct}
                    onSkipCategory={() => {
                      const categories = ['Procesadores', 'Motherboards', 'Memorias RAM', 'Fuentes', 'Refrigeración', 'Almacenamiento'];
                      const currentIndex = categories.indexOf(selectedCategory);
                      
                      if (currentIndex !== -1 && currentIndex < categories.length - 1) {
                        setSelectedCategory(categories[currentIndex + 1]);
                        setSelectedProduct(null);
                      } else {
                        setSelectedCategory(null);
                      }
                    }}
                  />
                </div>
              ) : (
                <div className="h-full">
                  <ProductPreviewPanel
                    selectedProduct={selectedProduct}
                    selectedCategory={selectedCategory}
                    onBack={() => setSelectedProduct(null)}
                    onAdd={() => {
                      handleAddProduct(selectedProduct);
                      setSelectedProduct(null);
                    }}
                  />
                </div>
              )}
            </div>
          </>
        )}
      </main>
      
      <ScrollButton />
      <FloatingChatButton />
    </div>
  );
};

export default ManualMode;
