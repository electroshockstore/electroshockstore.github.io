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

const ManualMode = ({ onGoHome }) => {
  const { pcBuild, selectComponent, recommendedWattage, totalWattage, evaluatePSU, removeComponent } = usePCBuilder();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const compatibleProducts = selectedCategory 
    ? getCompatibleProducts(pcBuild, products, selectedCategory)
    : [];
  
  const filteredProducts = compatibleProducts;

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedProduct(null);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleAddProduct = (product) => {
    if (product.compatibilityResult?.status !== 'red') {
      selectComponent(selectedCategory, product);
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
      
      {/* Desktop Layout: Sidebar + Product Grid + Preview Panel */}
      <main className="hidden lg:flex flex-1 w-full overflow-hidden">
        <CategorySidebar 
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
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

      {/* Mobile Layout: Sidebar OR Product Grid (full screen) */}
      <main className="flex lg:hidden flex-1 w-full overflow-hidden">
        {!selectedCategory ? (
          /* Show Sidebar when no category selected */
          <CategorySidebar 
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        ) : (
          /* Show Product Grid full screen when category selected */
          <div className="flex-1 flex flex-col overflow-hidden bg-white">
            {/* Header con botón volver */}
            <div className="flex-shrink-0 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 backdrop-blur-sm border-b border-gray-200 shadow-sm p-4">
              <div className="flex items-center gap-3 mb-3">
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setSelectedProduct(null);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-all active:scale-95 bg-white shadow-sm border border-gray-200"
                >
                  <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                    Paso {['Procesadores', 'Motherboards', 'Memorias RAM', 'Placas de Video', 'Refrigeración', 'Almacenamiento', 'Fuentes', 'Monitores'].indexOf(selectedCategory) + 1} de 8
                  </p>
                  <h2 className="text-lg font-black text-gray-900">{selectedCategory}</h2>
                </div>
              </div>
              
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

            {/* Product Grid or Preview */}
            {!selectedProduct ? (
              <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
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
              <div className="flex-1 overflow-y-auto">
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
        )}
      </main>
      
      <ScrollButton />
    </div>
  );
};

export default ManualMode;
