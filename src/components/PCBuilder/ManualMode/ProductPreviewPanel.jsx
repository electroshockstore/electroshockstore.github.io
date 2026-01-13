import armaTuPcImage from '/images/arma_tu_pc.webp';

// Extract key features from product specifications dynamically
const extractKeyFeatures = (product) => {
  const features = [];
  const specs = product.specifications || product.specs || {};
  
  // Graphics integrated
  if (specs.graficosIntegrados || specs['Gráficos Integrados']) {
    const hasGraphics = specs.graficosIntegrados !== 'No' && specs['Gráficos Integrados'] !== 'No';
    features.push({
      label: hasGraphics ? 'Gráficos integrados' : 'Requiere GPU dedicada',
      value: hasGraphics ? (specs.graficosIntegrados || specs['Gráficos Integrados']) : 'No incluido',
      type: hasGraphics ? 'positive' : 'warning',
      icon: hasGraphics ? (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ) : (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      )
    });
  }
  
  // Cooler included (only for CPUs) - Check if product is a CPU by category
  if (product.category === 'Procesadores' && specs.disipador) {
    const hasCooler = specs.disipador && specs.disipador !== 'No incluido' && specs.disipador !== 'No';
    features.push({
      label: hasCooler ? 'Cooler incluido' : 'Cooler no incluido',
      value: hasCooler ? specs.disipador : 'Comprar por separado',
      type: hasCooler ? 'positive' : 'warning',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    });
  }
  
  // WiFi
  if (specs.wifi || specs['WiFi Integrado']) {
    const hasWifi = specs.wifi === 'Sí' || specs['WiFi Integrado'] === 'Sí';
    if (hasWifi) {
      features.push({
        label: 'WiFi integrado',
        value: 'Incluido',
        type: 'positive',
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
          </svg>
        )
      });
    }
  }
  
  // Bluetooth
  if (specs.bluetooth || specs['Bluetooth']) {
    const hasBluetooth = specs.bluetooth === 'Sí' || specs['Bluetooth'] === 'Sí';
    if (hasBluetooth) {
      features.push({
        label: 'Bluetooth',
        value: 'Incluido',
        type: 'positive',
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0" />
          </svg>
        )
      });
    }
  }
  
  // Cores/Threads
  if (specs.nucleos || specs['Núcleos']) {
    features.push({
      label: 'Procesamiento',
      value: `${specs.nucleos || specs['Núcleos']} núcleos / ${specs.hilos || specs['Hilos'] || 'N/A'} hilos`,
      type: 'spec',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      )
    });
  }
  
  // RAM Capacity
  if (specs.capacidad || specs['Capacidad']) {
    features.push({
      label: 'Capacidad',
      value: specs.capacidad || specs['Capacidad'],
      type: 'spec',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
        </svg>
      )
    });
  }
  
  // Speed
  if (specs.velocidad || specs['Velocidad']) {
    features.push({
      label: 'Velocidad',
      value: specs.velocidad || specs['Velocidad'],
      type: 'spec',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    });
  }
  
  // RAM RGB - Always show for RAM products
  if (specs.rgb !== undefined || specs['RGB'] !== undefined) {
    const hasRGB = specs.rgb === 'Sí' || specs['RGB'] === 'Sí';
    features.push({
      label: hasRGB ? 'Iluminación RGB' : 'Sin RGB',
      value: hasRGB ? 'Incluido' : 'Sin iluminacion',
      type: hasRGB ? 'positive' : 'info',
      icon: hasRGB ? (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ) : (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      )
    });
  }
  
  // RAM Heatsink/Dissipator - Only show for RAM products
  if (product.category === 'Memorias RAM' && (specs.disipador !== undefined || specs['Disipador'] !== undefined)) {
    const hasHeatsink = specs.disipador === 'Sí' || specs['Disipador'] === 'Sí';
    features.push({
      label: hasHeatsink ? 'Con disipador' : 'Sin disipador',
      value: hasHeatsink ? 'Incluido' : 'Modelo básico',
      type: hasHeatsink ? 'positive' : 'info',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      )
    });
  }
  
  return features;
};

const FeaturePill = ({ label, value, type, icon }) => {
  const styles = {
    positive: 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 text-green-900',
    warning: 'bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200 text-orange-900',
    info: 'bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200 text-blue-900',
    spec: 'bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200 text-gray-900'
  };
  
  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-full border-2 ${styles[type]} transition-all hover:scale-[1.02] hover:shadow-md`}>
      <div className="flex-shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium opacity-75">{label}</p>
        <p className="text-sm font-bold truncate">{value}</p>
      </div>
    </div>
  );
};

const CompatibilityBadge = ({ status }) => {
  // Only show badge for compatible or incompatible, not neutral
  if (status === 'neutral') return null;
  
  if (status === 'green') {
    return (
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <span className="text-sm font-bold">Compatible</span>
      </div>
    );
  }
  
  // Red badge for incompatible
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
      <span className="text-sm font-bold">Incompatible</span>
    </div>
  );
};

const EmptyPreview = ({ selectedCategory }) => {
  if (!selectedCategory) {
    return (
      <div className="p-8 h-full flex flex-col items-center justify-center">
        <img 
          src={armaTuPcImage} 
          alt="Armá tu PC" 
          className="w-full max-w-md object-contain"
        />
      </div>
    );
  }

  return (
    <div className="p-8 h-full flex flex-col items-center justify-center text-center">
      <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl flex items-center justify-center mb-6 shadow-inner">
        <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">
        Selecciona un producto
      </h3>
      <p className="text-sm text-gray-500 leading-relaxed">
        Haz clic en un producto para ver sus detalles
      </p>
    </div>
  );
};

const ProductPreviewPanel = ({ selectedProduct, selectedCategory, onBack }) => {
  if (!selectedProduct) {
    return (
      <aside className="hidden lg:block w-72 xl:w-80 bg-gradient-to-b from-white to-gray-50 border-l border-gray-200 overflow-y-auto">
        <EmptyPreview selectedCategory={selectedCategory} />
      </aside>
    );
  }

  const keyFeatures = extractKeyFeatures(selectedProduct);
  const compatibilityResult = selectedProduct.compatibilityResult;

  return (
    <aside className="w-full lg:w-72 xl:w-80 bg-gradient-to-b from-white to-gray-50 lg:border-l border-gray-200 overflow-y-auto">
      {/* Mobile Back Button */}
      {onBack && (
        <div className="lg:hidden sticky top-0 bg-white border-b border-gray-200 p-4 z-10">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-700 font-semibold"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver a productos
          </button>
        </div>
      )}
      
      <div className="p-4 md:p-6 lg:p-6 xl:p-8 space-y-4 md:space-y-6">
        {/* Product Image */}
        <div className="bg-gradient-to-br from-gray-50 via-white to-gray-50 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 aspect-square flex items-center justify-center shadow-inner border border-gray-100">
          <img 
            src={selectedProduct.images?.[0] || selectedProduct.image} 
            alt={selectedProduct.name}
            className="max-w-full max-h-full object-contain"
          />
        </div>
        
        {/* Product Name & Brand */}
        <div>
          {selectedProduct.brand && (
            <div className="inline-block px-3 md:px-4 py-1.5 md:py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-full mb-3">
              <p className="text-xs md:text-sm font-bold text-blue-700 uppercase tracking-wider">
                {selectedProduct.brand}
              </p>
            </div>
          )}
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
            {selectedProduct.name}
          </h2>
        </div>
        
        {/* Price */}
        <div className="text-3xl md:text-4xl lg:text-5xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          ${selectedProduct.price.toLocaleString('es-AR')}
        </div>
        
      
        
        {/* Description */}
        {selectedProduct.description && (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-5 border border-blue-100">
            <p className="text-sm text-gray-800 leading-relaxed">
              {selectedProduct.description}
            </p>
          </div>
        )}
        
        {/* Key Features - Pills Style */}
        {keyFeatures.length > 0 && (
          <div>
            <h3 className="text-xs font-bold text-gray-500 mb-4 uppercase tracking-wider">
              Características principales
            </h3>
            <div className="space-y-3">
              {keyFeatures.map((feature, idx) => (
                <FeaturePill key={idx} {...feature} />
              ))}
            </div>
          </div>
        )}
        
        {/* Compatibility Info - Always Clear and Visible */}
        {compatibilityResult && compatibilityResult.reasons.length > 0 && (
          <div>
            <h3 className="text-xs font-bold text-gray-500 mb-4 uppercase tracking-wider">
              {compatibilityResult.status === 'green' ? 'Por qué es compatible' : 'Por qué no es compatible'}
            </h3>
            <div className={`rounded-2xl p-5 border-2 ${
              compatibilityResult.status === 'green' 
                ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-300' 
                : 'bg-gradient-to-br from-red-50 to-rose-50 border-red-300'
            }`}>
              <ul className="space-y-3">
                {compatibilityResult.reasons.map((reason, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                      compatibilityResult.status === 'green' ? 'bg-green-500' : 'bg-red-500'
                    }`}>
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {compatibilityResult.status === 'green' ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        )}
                      </svg>
                    </div>
                    <span className="text-sm font-semibold text-gray-900 leading-relaxed flex-1">
                      {reason}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        
      </div>
    </aside>
  );
};

export default ProductPreviewPanel;
