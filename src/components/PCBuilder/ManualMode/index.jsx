import { useState } from 'react';
import Header from '../../Shared/Header';
import Footer from '../../Shared/Footer';
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
      
      // Auto-advance to next category
      setTimeout(() => {
        const categories = ['Procesadores', 'Motherboards', 'Memorias RAM', 'Fuentes', 'Refrigeración', 'Almacenamiento'];
        const currentIndex = categories.indexOf(selectedCategory);
        
        if (currentIndex !== -1 && currentIndex < categories.length - 1) {
          setSelectedCategory(categories[currentIndex + 1]);
          setSelectedProduct(null); // Clear preview when advancing
        }
      }, 500);
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

      {/* Mobile/Tablet Layout: Single column with tabs */}
      <main className="flex lg:hidden flex-1 w-full overflow-hidden flex-col">
        {/* Mobile Category Selector */}
        <div className="bg-white border-b border-gray-200 p-4 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {['Procesadores', 'Motherboards', 'Memorias RAM', 'Fuentes', 'Refrigeración', 'Almacenamiento'].map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Content */}
        <div className="flex-1 overflow-y-auto">
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
              />
            </div>
          )}
        </div>

        {/* Mobile Build Summary Bar */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Total estimado</p>
              <p className="text-xl font-bold text-gray-900">
                ${Object.values(pcBuild).reduce((sum, value) => {
                  if (Array.isArray(value)) {
                    return sum + value.reduce((s, item) => s + (item?.price || 0), 0);
                  }
                  return sum + (value?.price || 0);
                }, 0).toLocaleString()}
              </p>
            </div>
            <button
              onClick={onModeChange}
              className="px-4 py-2 bg-gray-900 text-white rounded-xl text-sm font-semibold"
            >
              Ver Build
            </button>
          </div>
        </div>
      </main>
      
      <ScrollButton />
      <FloatingChatButton />
    </div>
  );
};

export default ManualMode;
