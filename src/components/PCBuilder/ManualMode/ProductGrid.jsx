import { usePCBuilder } from '../../../context/PCBuilderContext';
import CompactProductCard from '../CompactProductCard';
import CategoryReminder from './CategoryReminder';

const EmptyState = ({ icon, title, description }) => (
  <div className="h-full flex flex-col items-center justify-center text-center px-6">
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-12 shadow-xl max-w-md border border-gray-100">
      <div className="text-6xl mb-6">{icon}</div>
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        {title}
      </h2>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  </div>
);

const AlreadyOwnCard = ({ category, onSkip }) => {
  return (
    <div 
      onClick={onSkip}
      className="group relative bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 rounded-xl lg:rounded-2xl p-3 lg:p-6 border-2 border-dashed border-purple-300 hover:border-purple-500 transition-all duration-300 cursor-pointer hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] min-h-[200px] lg:min-h-[280px] flex flex-col items-center justify-center text-center"
    >
      {/* Icon */}
      <div className="w-10 h-10 lg:w-16 lg:h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl lg:rounded-2xl flex items-center justify-center mb-2 lg:mb-4 group-hover:scale-110 transition-transform shadow-lg">
        <svg className="w-5 h-5 lg:w-8 lg:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      
      {/* Title */}
      <h3 className="text-xs lg:text-lg font-bold text-gray-900 mb-1 lg:mb-2 px-1">
        Ya poseo este componente
      </h3>
      
      {/* Description */}
      <p className="text-[10px] lg:text-sm text-gray-600 mb-2 lg:mb-4">
        Omitir {category}
      </p>
      
      {/* Badge */}
      <div className="inline-flex items-center gap-1 lg:gap-2 px-2 lg:px-4 py-1 lg:py-2 bg-white rounded-full border border-purple-200 shadow-sm">
        <span className="text-[10px] lg:text-xs font-semibold text-purple-700">
          Clic para continuar
        </span>
        <svg className="w-3 h-3 lg:w-4 lg:h-4 text-purple-500 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
};

const getReminder = (category, pcBuild) => {
  // Check if CPU doesn't have cooler and we're in cooling category
  if (category === 'Refrigeración' && pcBuild.cpu) {
    const cpuSpecs = pcBuild.cpu.specifications || pcBuild.cpu.specs || {};
    const hasCooler = cpuSpecs.disipador && cpuSpecs.disipador !== 'No incluido';
    
    if (!hasCooler) {
      return {
        message: `⚠️ Tu procesador ${pcBuild.cpu.name} no incluye cooler. Necesitas seleccionar uno para que funcione.`,
        type: 'warning'
      };
    }
  }
  
  // Check if motherboard doesn't have WiFi and we're in connectivity
  if (category === 'Conectividad' && pcBuild.motherboard) {
    const mbSpecs = pcBuild.motherboard.specifications || pcBuild.motherboard.specs || {};
    const hasWifi = mbSpecs.wifi === 'Sí' || mbSpecs['WiFi Integrado'] === 'Sí';
    
    if (!hasWifi) {
      return {
        message: `💡 Tu motherboard no tiene WiFi integrado. Considera agregar una tarjeta WiFi si la necesitas.`,
        type: 'info'
      };
    }
  }
  
  return null;
};

const ProductGrid = ({ 
  selectedCategory, 
  products = [], 
  selectedProductId,
  onProductClick,
  onSkipCategory,
  onAddProduct
}) => {
  const { pcBuild } = usePCBuilder();
  if (!selectedCategory) {
    return (
      <EmptyState
        icon="🖥️"
        title="Selecciona una categoría"
        description="Elige un componente de la barra lateral para comenzar a armar tu PC"
      />
    );
  }

  if (products.length === 0) {
    return (
      <EmptyState
        icon="📦"
        title="Sin productos"
        description="No encontramos productos en esta categoría"
      />
    );
  }

  const reminder = getReminder(selectedCategory, pcBuild);

  return (
    <div className="h-full">
      {/* Header Section - Compacto en mobile */}
      <div className="mb-3 lg:mb-6">
        <h2 className="text-lg lg:text-2xl xl:text-3xl font-bold text-gray-900 mb-1">
          {selectedCategory}
        </h2>
        <p className="text-xs lg:text-sm text-gray-600">
          {products.length} productos disponibles
        </p>
      </div>
      
      {/* Reminder if needed */}
      {reminder && (
        <CategoryReminder message={reminder.message} type={reminder.type} />
      )}
      
      {/* Product Grid - Más columnas en pantallas estándar */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2 lg:gap-3 xl:gap-4 pb-20 lg:pb-32">
        {/* Already Own Card - Always first */}
        <AlreadyOwnCard 
          category={selectedCategory}
          onSkip={onSkipCategory}
        />
        
        {/* Product Cards */}
        {products.map(product => {
          const isSelected = product.id === selectedProductId;
          
          return (
            <CompactProductCard
              key={product.id}
              product={product}
              compatibilityResult={product.compatibilityResult}
              isSelected={isSelected}
              onClick={onProductClick}
              onAddToBuild={onAddProduct}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProductGrid;
