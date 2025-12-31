import { useState } from 'react';
import { Sparkles } from 'lucide-react';

// Todas las categorías reales del proyecto
const allCategories = [
  { id: 1, name: 'PROCESADORES', image: '/images/category_grid/procesador_grid_tiny.webp', slug: 'procesadores' },
  { id: 2, name: 'MOTHERBOARDS', image: '/images/category_grid/motherboard_grid_tiny.webp', slug: 'motherboards' },
  { id: 3, name: 'MEMORIAS RAM', image: '/images/category_grid/ram_grid_tiny.webp', slug: 'memorias-ram' },
  { id: 4, name: 'ALMACENAMIENTO', image: '/images/category_grid/almacenamiento_grid_tiny.webp', slug: 'almacenamiento' },
  { id: 5, name: 'FUENTES', image: '/images/category_grid/fuente_grid_tiny.webp', slug: 'fuentes' },
  { id: 6, name: 'REFRIGERACIÓN', image: '/images/category_grid/refrigeracion_grid_tiny.webp', slug: 'refrigeracion' },
  { id: 7, name: 'TECLADOS', image: '/images/category_grid/teclados_grid_tiny.webp', slug: 'teclados' },
  { id: 8, name: 'MOUSE', image: '/images/category_grid/mouse_grid_tiny.webp', slug: 'mouse' },
  { id: 9, name: 'AURICULARES', image: '/images/category_grid/auriculares_grid_tiny.webp', slug: 'auriculares' },
];

const CategoryGrid = ({ onCategoryClick }) => {
    const largeCategory = allCategories[0];
    const smallCategories = allCategories.slice(1);

    const handleCategoryClick = (slug) => {
        // Scroll al inicio antes de navegar
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (onCategoryClick) {
            onCategoryClick(slug);
        }
    };

    return (
        <section className="w-full flex-1 ">
            <div className="max-w-7xl mx-auto py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
                {/* Encabezado moderno */}
                <div className="text-center mb-10 sm:mb-14">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 rounded-full mb-4">
                        <Sparkles className="w-4 h-4 text-red-600" />
                        <span className="text-sm font-semibold text-red-600 uppercase tracking-wider">
                            Descubrí lo mejor
                        </span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-white text-white mb-3 tracking-tight">
                        Explorá nuestras{' '}
                        <span className="bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                            categorías
                        </span>
                    </h2>
                    <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                        Encontrá todo lo que necesitás para armar tu setup ideal
                    </p>
                </div>

                {/* Grid: 1 grande vertical + grid 4x2 */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-4 sm:gap-5">
                    {/* Tarjeta grande vertical (izquierda) */}
                    {largeCategory && (
                        <CategoryCard
                            category={largeCategory}
                            onCategoryClick={handleCategoryClick}
                            className="h-[400px] lg:h-[400px]"
                            textSize="text-3xl sm:text-4xl lg:text-5xl"
                        />
                    )}

                    {/* Grid 4x2 (derecha): 4 arriba, 4 abajo */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5">
                        {smallCategories.map((category) => (
                            <CategoryCard
                                key={category.id}
                                category={category}
                                onCategoryClick={handleCategoryClick}
                                className="h-[180px] lg:h-[192px]"
                                textSize="text-xs sm:text-sm md:text-base"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};


// --- Componente Reutilizable para la Tarjeta ---
const CategoryCard = ({ category, onCategoryClick, className, textSize }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  return (
    <button
        onClick={() => onCategoryClick && onCategoryClick(category.slug)}
        className={`group relative w-full overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-red-500/50 bg-gray-800 ${className}`}
        aria-label={`Explorar categoría ${category.name}`}
    >
        {/* Imagen de fondo */}
        <div className="absolute inset-0 bg-gray-800">
            {!imageLoaded && (
              <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 animate-pulse" />
            )}
            <img
                src={category.image}
                alt={category.name}
                className={`w-full h-full object-cover transition-all duration-500 ${imageLoaded ? 'opacity-100 group-hover:scale-110' : 'opacity-0'}`}
                loading="lazy"
                onLoad={() => setImageLoaded(true)}
                onError={(e) => {
                    e.target.style.display = 'none';
                    setImageLoaded(true);
                }}
            />
        </div>

        {/* Overlay oscuro */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Brillo sutil en hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Content */}
        <div className="absolute inset-0 flex items-end p-4 sm:p-5 md:p-6">
            <div className="relative">
                <h3 className={`font-black text-white leading-none text-left tracking-tight drop-shadow-2xl ${textSize}`}>
                    {category.name}
                </h3>
                <div className="h-1 w-12 bg-white/80 rounded-full mt-2 group-hover:w-20 transition-all duration-300" />
            </div>
        </div>

        {/* Hover effect rojo */}
        <div className="absolute inset-0 bg-red-600/0 group-hover:bg-red-600/20 transition-colors duration-300" />
    </button>
  );
};


// Exportamos el componente principal
export default CategoryGrid;