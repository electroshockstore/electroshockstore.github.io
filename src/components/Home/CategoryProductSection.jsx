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

const CategoryProductSection = ({ onCategoryClick }) => {
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
        <section className="w-full flex-1 relative">
            {/* Partículas de fondo animadas */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            <div className="max-w-7xl mx-auto py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Encabezado moderno con glow - Mejorado para fondo oscuro */}
                <div className="text-center mb-10 sm:mb-14">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-full mb-4 shadow-lg shadow-blue-500/30 border border-blue-500/30">
                        <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
                        <span className="text-sm font-semibold text-blue-300 uppercase tracking-wider">
                            Descubrí lo mejor
                        </span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-3 tracking-tight">
                        <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                            Explorá nuestras{' '}
                        </span>
                        <span className="relative inline-block">
                            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(147,51,234,0.5)]">
                                categorías
                            </span>
                            {/* Glow effect más fuerte */}
                            <span className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 blur-3xl opacity-40 -z-10 animate-pulse" />
                        </span>
                    </h2>
                    <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto font-medium drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
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
const CategoryCard = ({ category, onCategoryClick, className, textSize }) => (
    <button
        onClick={() => onCategoryClick && onCategoryClick(category.slug)}
        className={`group relative w-full overflow-hidden rounded-3xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-blue-500/50 bg-gray-900 ${className}`}
        aria-label={`Explorar categoría ${category.name}`}
        style={{
            boxShadow: '0 10px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1)'
        }}
    >
        {/* Glow border animado */}
        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
             style={{
                 boxShadow: '0 0 30px rgba(59, 130, 246, 0.5), 0 0 60px rgba(147, 51, 234, 0.3), inset 0 0 20px rgba(59, 130, 246, 0.1)'
             }} />

        {/* Imagen de fondo */}
        <div className="absolute inset-0 bg-gray-900">
            <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="eager"
                onError={(e) => {
                    e.target.style.display = 'none';
                }}
            />
        </div>

        {/* Overlay oscuro con gradiente mejorado */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/20" />

        {/* Glow effect en hover - Más intenso */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/0 via-purple-600/0 to-pink-600/0 group-hover:from-blue-600/30 group-hover:via-purple-600/30 group-hover:to-pink-600/30 transition-all duration-500" />

        {/* Brillo sutil en hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Content con text-shadow mejorado */}
        <div className="absolute inset-0 flex items-end p-4 sm:p-5 md:p-6">
            <div className="relative">
                <h3 className={`font-black text-white leading-none text-left tracking-tight ${textSize}`}
                    style={{ 
                        textShadow: '0 4px 20px rgba(0,0,0,0.9), 0 2px 8px rgba(0,0,0,0.8), 0 0 30px rgba(59,130,246,0.3)' 
                    }}>
                    {category.name}
                </h3>
                <div className="relative mt-2">
                    <div className="h-1 w-12 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full group-hover:w-20 transition-all duration-300" 
                         style={{ 
                             boxShadow: '0 0 20px rgba(59, 130, 246, 0.8), 0 0 40px rgba(147, 51, 234, 0.5)' 
                         }} />
                </div>
            </div>
        </div>

        {/* Borde con glow en hover */}
        <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-blue-400/40 transition-all duration-300" />
    </button>
);


// Exportamos el componente principal
export default CategoryProductSection;
