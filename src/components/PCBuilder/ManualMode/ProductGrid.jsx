import { usePCBuilder } from '../../../context/PCBuilderContext';
import CompactProductCard from '../CompactProductCard';
import CategoryReminder from './CategoryReminder';
import armaTuPcImage from '/images/arma_tu_pc.webp';

const EmptyState = ({ icon, title, description }) => (
  <div className="h-full flex flex-col items-center justify-center text-center px-6">
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl lg:rounded-none p-12 shadow-xl lg:shadow-[8px_8px_0_0_#0e0e0e] max-w-md border border-gray-100 lg:border-[3px] lg:border-[#0e0e0e] lg:bg-none lg:bg-[#f6f6f6]">
      <div className="text-6xl mb-6">{icon}</div>
      <h2 className="text-3xl font-bold lg:font-black lg:uppercase lg:tracking-tight text-gray-900 lg:text-[#0e0e0e] mb-4">
        {title}
      </h2>
      <p className="pcb-mono text-gray-600 lg:text-xs lg:font-bold lg:uppercase lg:tracking-[0.08em] lg:text-[#0e0e0e]/60 leading-relaxed">{description}</p>
    </div>
  </div>
);

const AlreadyOwnCard = ({ category, onSkip }) => {
  return (
    <div 
      onClick={onSkip}
      className="group relative bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 lg:bg-none lg:bg-[#f6f6f6] rounded-xl lg:rounded-none p-3 lg:p-6 border-2 border-dashed border-purple-300 lg:border-[#0e0e0e] hover:border-purple-500 lg:hover:border-solid lg:hover:border-[#0e0e0e] transition-all duration-300 lg:duration-200 cursor-pointer hover:shadow-xl lg:hover:shadow-[4px_4px_0_0_#c8f519] hover:scale-[1.02] lg:hover:scale-100 lg:hover:translate-x-[4px] lg:hover:translate-y-[4px] lg:shadow-[6px_6px_0_0_#0e0e0e] active:scale-[0.98] lg:active:translate-x-[6px] lg:active:translate-y-[6px] lg:active:shadow-none min-h-[200px] lg:min-h-[280px] flex flex-col items-center justify-center text-center"
    >
      {/* Icon */}
      <div className="w-10 h-10 lg:w-16 lg:h-16 bg-gradient-to-br from-purple-500 to-indigo-600 lg:bg-none lg:bg-[#0e0e0e] rounded-xl lg:rounded-none flex items-center justify-center mb-2 lg:mb-4 group-hover:scale-110 lg:group-hover:scale-100 transition-transform lg:transition-colors shadow-lg lg:shadow-[3px_3px_0_0_rgba(14,14,14,0.3)] lg:group-hover:bg-[#c8f519]">
        <svg className="w-5 h-5 lg:w-8 lg:h-8 text-white lg:text-[#c8f519] lg:group-hover:text-[#0e0e0e] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      
      {/* Title */}
      <h3 className="text-xs lg:text-lg font-bold lg:font-black lg:uppercase lg:tracking-tight text-gray-900 lg:text-[#0e0e0e] mb-1 lg:mb-2 px-1">
        Ya poseo este componente
      </h3>
      
      {/* Description */}
      <p className="text-[10px] lg:text-xs lg:font-bold lg:uppercase lg:tracking-[0.1em] text-gray-600 lg:text-[#0e0e0e]/55 mb-2 lg:mb-4">
        Omitir {category}
      </p>
      
      {/* Badge */}
      <div className="inline-flex items-center gap-1 lg:gap-2 px-2 lg:px-4 py-1 lg:py-2 bg-white lg:bg-[#c8f519] rounded-full lg:rounded-none border border-purple-200 lg:border-2 lg:border-[#0e0e0e] shadow-sm">
        <span className="pcb-mono text-[10px] lg:text-xs font-semibold lg:font-black lg:uppercase lg:tracking-[0.08em] text-purple-700 lg:text-[#0e0e0e]">
          Clic para continuar
        </span>
        <svg className="w-3 h-3 lg:w-4 lg:h-4 text-purple-500 lg:text-[#0e0e0e] group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      <div className="h-full flex items-center justify-center p-8">
        <img 
          src={armaTuPcImage} 
          alt="Armá tu PC" 
          className="w-full"
        />
      </div>
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
    <div className="h-full relative">
      {/* Contenido */}
      <div className="relative z-10">
        {/* Header Section con instrucciones */}
        <div className="mb-3 lg:mb-6">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <span className="pcb-mono hidden lg:inline-block bg-[#0e0e0e] px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.18em] text-[#c8f519] mb-2">
              PC Builder / Configurador
            </span>
            <h2 className="text-base sm:text-lg lg:text-2xl xl:text-3xl font-bold lg:font-black lg:uppercase lg:tracking-tight text-gray-900 lg:text-[#0e0e0e] mb-1">
              {selectedCategory}
            </h2>
            <p className="pcb-mono text-xs lg:text-xs lg:font-bold lg:uppercase lg:tracking-[0.12em] text-gray-600 lg:text-[#0e0e0e]/55">
              {products.length} productos disponibles
            </p>
          </div>
          
          {/* Instrucciones desktop - solo visible en pantallas grandes */}
          <div className="hidden lg:block">
            <div className="bg-[#0e0e0e] p-3 border-2 border-[#0e0e0e] shadow-[4px_4px_0_0_rgba(14,14,14,0.25)] max-w-sm">
              <div className="flex items-start gap-2">
                <div className="p-1.5 bg-[#c8f519] flex-shrink-0">
                  <svg className="w-4 h-4 text-[#0e0e0e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="pcb-mono text-xs font-bold text-white leading-relaxed">
                    <span className="text-[#c8f519]">Hacé clic en la imagen</span> para ver detalles o en <span className="text-[#c8f519]">"Agregar"</span> para seleccionar
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
       
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
      </div> {/* Cierre del contenido relativo */}
    </div>
  );
};

export default ProductGrid;
