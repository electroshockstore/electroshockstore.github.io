import { useState, useMemo } from 'react';
import Header from '../../Shared/Header';
import ScrollButton from '../../Shared/ScrollButton';
import { X } from 'lucide-react';

import CategorySidebar from './CategorySidebar';
import ProductGrid from './ProductGrid';
import ProductPreviewPanel from './ProductPreviewPanel';
import { usePCBuilder } from '../../../context/PCBuilderContext';
import { products } from '../../../data';
import { getCompatibleProducts } from '../../../utils/compatibilityEngine';

const ManualMode = ({ onModeChange, onGoHome }) => {
  const { pcBuild, selectComponent, recommendedWattage, totalWattage, evaluatePSU, removeComponent } = usePCBuilder();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const compatibleProducts = selectedCategory 
    ? getCompatibleProducts(pcBuild, products, selectedCategory)
    : [];
  
  // Para fuentes, el compatibilityResult ya viene con la validación correcta del compatibilityEngine
  // No necesitamos procesamiento adicional
  const filteredProducts = compatibleProducts;

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
      
      {/* Desktop Layout: 2-3 columns depending on preview state */}
      <main className="hidden lg:flex flex-1 w-full overflow-hidden">
        <CategorySidebar 
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          onModeChange={onModeChange}
        />
        
        <div className="flex-1 overflow-y-auto p-4 xl:p-8 bg-gradient-to-br from-white/80 via-blue-50/50 to-indigo-50/50 backdrop-blur-sm">
          <ProductGrid
            selectedCategory={selectedCategory}
            products={filteredProducts}
            selectedProductId={selectedProductId}
            onProductClick={handleProductClick}
            onAddProduct={handleAddProduct}
            onSkipCategory={() => {
              const categories = ['Procesadores', 'Motherboards', 'Memorias RAM', 'Placas de Video', 'Refrigeración', 'Almacenamiento', 'Fuentes', 'Monitores'];
              const currentIndex = categories.indexOf(selectedCategory);
              
              if (currentIndex !== -1 && currentIndex < categories.length - 1) {
                setSelectedCategory(categories[currentIndex + 1]);
                setSelectedProduct(null);
              }
            }}
          />
        </div>
        
        {/* Preview Panel - Only show when product is selected */}
        {selectedProduct && (
          <ProductPreviewPanel
            selectedProduct={selectedProduct}
            selectedCategory={selectedCategory}
            onBack={() => setSelectedProduct(null)}
            onAdd={() => {
              handleAddProduct(selectedProduct);
              setSelectedProduct(null);
            }}
          />
        )}
      </main>

      {/* Mobile/Tablet Layout: PC Case visualization + Category list */}
      <main className="flex lg:hidden flex-1 w-full overflow-hidden flex-col relative">
        {!selectedCategory ? (
          /* Main Build Screen with PC Case */
          <>
            {/* Header moderno con gradiente y estilo */}
            <div className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 p-4 flex-shrink-0 shadow-lg">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-2xl" />
              
              <div className="relative z-10">
                {/* Título y contador */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-lg font-black text-white">Armá tu Combo</h2>
                      <p className="text-xs text-blue-100 font-semibold">
                        {Object.values(pcBuild).filter(v => v && (Array.isArray(v) ? v.length > 0 : true)).length} de 6 componentes
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Barra de progreso */}
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-blue-100 uppercase tracking-wide">Progreso</span>
                    <span className="text-xs font-black text-white">{Math.round((Object.values(pcBuild).filter(v => v && (Array.isArray(v) ? v.length > 0 : true)).length/6)*100)}%</span>
                  </div>
                  <div className="relative h-2.5 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
                    <div 
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all duration-500 shadow-lg"
                      style={{ width: `${(Object.values(pcBuild).filter(v => v && (Array.isArray(v) ? v.length > 0 : true)).length/6)*100}%` }}
                    />
                  </div>
                </div>
                
                {/* Stats en dos columnas con mejor diseño */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Voltaje Total Card */}
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20 shadow-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center shadow-md">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <span className="text-[10px] font-bold text-blue-100 uppercase">Voltaje</span>
                    </div>
                    <p className="text-2xl font-black text-white">{totalWattage}W</p>
                  </div>
                  
                  {/* Precio Total Card */}
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20 shadow-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center shadow-md">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span className="text-[10px] font-bold text-blue-100 uppercase">Total</span>
                    </div>
                    <p className="text-2xl font-black text-white">
                      ${Object.values(pcBuild).reduce((sum, value) => {
                        if (Array.isArray(value)) return sum + value.reduce((s, item) => s + (item?.price || 0), 0);
                        return sum + (value?.price || 0);
                      }, 0).toLocaleString('es-AR')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Category List - PRIORIZADO con máxima altura */}
            <div className="flex-1 bg-white overflow-y-auto">
              <div className="p-3 space-y-2 pb-32">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2 px-1">Seleccioná componentes</h3>
                
                {[
                  { key: 'Procesadores', label: 'Procesador', icon: '/images/icons/cpu_icon_tiny.webp', buildKey: 'cpu' },
                  { key: 'Motherboards', label: 'Motherboard', icon: '/images/icons/motherboard_icon_tiny.webp', buildKey: 'motherboard' },
                  { key: 'Memorias RAM', label: 'Memoria RAM', icon: '/images/icons/ram_icon_tiny.webp', buildKey: 'ram' },
                  { key: 'Refrigeración', label: 'Refrigeración', icon: '/images/icons/refrigeracion_icon_tiny.webp', buildKey: 'cooling' },
                  { key: 'Almacenamiento', label: 'Almacenamiento', icon: '/images/icons/storage_icon_tiny.webp', buildKey: 'storage' },
                  { key: 'Fuentes', label: 'Fuente', icon: '/images/icons/psu_icon_tiny.webp', buildKey: 'psu' }
                ].map((cat) => {
                  const component = pcBuild[cat.buildKey] && (Array.isArray(pcBuild[cat.buildKey]) ? pcBuild[cat.buildKey][0] : pcBuild[cat.buildKey]);
                  const hasComponent = component != null;
                  
                  return (
                    <div key={cat.key} className="relative">
                      <button
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
                              <div className="flex items-center gap-2">
                                <p className="text-sm font-bold text-green-600">${component.price.toLocaleString('es-AR')}</p>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeComponent(cat.key);
                                  }}
                                  className="ml-auto p-1 hover:bg-red-100 rounded-md transition-colors"
                                  title="Eliminar componente"
                                >
                                  <X className="w-4 h-4 text-gray-400 hover:text-red-600" strokeWidth={2.5} />
                                </button>
                              </div>
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
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        ) : (
          /* Product Selection Screen */
          <>
            {/* Header moderno con instrucciones */}
            <div className="bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 backdrop-blur-sm border-b border-gray-200 shadow-sm">
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className="p-2 hover:bg-gray-100 rounded-xl transition-all active:scale-95 bg-white shadow-sm border border-gray-200"
                    >
                      <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <div>
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Paso {
                        ['Procesadores', 'Motherboards', 'Memorias RAM', 'Placas de Video', 'Refrigeración', 'Almacenamiento', 'Fuentes', 'Monitores'].indexOf(selectedCategory) + 1
                      } de 8</p>
                      <h2 className="text-lg font-black text-gray-900">{selectedCategory}</h2>
                    </div>
                  </div>
                </div>
                
                {/* Instrucciones interactivas */}
                <div className="bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 rounded-xl p-3 border border-blue-200/50">
                  <div className="flex items-start gap-2">
                    <div className="p-1.5 bg-blue-500 rounded-lg flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold text-gray-700 leading-relaxed">
                        <span className="text-blue-600">Toca la imagen</span> para ver detalles o el botón <span className="text-indigo-600">"Agregar"</span> para seleccionar
                      </p>
                    </div>
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
                    products={filteredProducts}
                    selectedProductId={selectedProductId}
                    onProductClick={handleProductClick}
                    onAddProduct={handleAddProduct}
                    onSkipCategory={() => {
                      const categories = ['Procesadores', 'Motherboards', 'Memorias RAM', 'Placas de Video', 'Refrigeración', 'Almacenamiento', 'Fuentes', 'Monitores'];
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
        
        {/* Precio Total y Botón de WhatsApp - Fijo abajo */}
        {!selectedCategory && (
          <div className="fixed bottom-4 right-4 z-50 relative group">
            {/* CAPAS DE RESPLANDOR */}
            <div className="absolute -inset-3 bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 rounded-full opacity-30 blur-xl -z-10"></div>
            <div className="absolute -inset-2 bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 rounded-full opacity-25 blur-lg animate-pulse -z-10"></div>
            
            {/* RGB FLOWING BORDER */}
            <div className="relative bg-white rounded-full shadow-lg">
              <button
                onClick={() => {
                  const totalPrice = Object.values(pcBuild).reduce((sum, value) => {
                if (Array.isArray(value)) return sum + value.reduce((s, item) => s + (item?.price || 0), 0);
                return sum + (value?.price || 0);
              }, 0);
              
              const components = Object.entries(pcBuild)
                .filter(([_, value]) => value && (Array.isArray(value) ? value.length > 0 : true))
                .map(([key, value]) => {
                  const item = Array.isArray(value) ? value[0] : value;
                  return `• ${item.name}`;
                })
                .join('\n');
              
              const message = encodeURIComponent(
                `¡Hola! Quiero este combo de PC:\n\n${components}\n\nTotal: $${totalPrice.toLocaleString('es-AR')}%0A%0A¿Está disponible?`
              );
              
              window.open(`https://wa.me/5491125718382?text=${message}`, '_blank');
            }}
                className="relative bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-3 rounded-full shadow-2xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-2 active:scale-95"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.785"/>
                </svg>
                <span className="text-sm font-bold">Quiero este Combo</span>
              </button>
            </div>
          </div>
        )}
      </main>
      
      <ScrollButton />

    </div>
  );
};

export default ManualMode;
