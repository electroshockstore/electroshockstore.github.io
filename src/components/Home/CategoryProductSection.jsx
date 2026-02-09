import { Sparkles, ArrowRight, Cpu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useScrollReveal from '../../hooks/useScrollReveal';

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
    const navigate = useNavigate();
    const { elementRef, className } = useScrollReveal({ 
        threshold: 0.1,
        animation: 'scale' // Zoom in sutil
    });
    
    const handleCategoryClick = (slug) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (onCategoryClick) {
            onCategoryClick(slug);
        }
    };

    const handleVerMas = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (onCategoryClick) {
            onCategoryClick('procesadores');
        }
    };

    return (
        <section 
            ref={elementRef}
            className={`${className} w-full flex-1 relative`}
        >
            {/* Partículas de fondo animadas */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse [animation-delay:1s]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse [animation-delay:2s]" />
            </div>

            <div className="max-w-7xl mx-auto py-8 sm:py-12 md:py-16 px-0 sm:px-6 lg:px-8 relative z-10">
                {/* Encabezado */}
                <div className="text-center mb-6 sm:mb-10 px-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-full mb-3 shadow-lg shadow-blue-500/30 border border-blue-500/30">
                        <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
                        <span className="text-xs font-semibold text-blue-300 uppercase tracking-wider">
                            Descubrí lo mejor
                        </span>
                    </div>
                    <h2 className="text-2xl sm:text-4xl md:text-5xl font-black mb-2 tracking-tight">
                        <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                            Explorá nuestras{' '}
                        </span>
                        <span className="relative inline-block">
                            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(147,51,234,0.5)]">
                                categorías
                            </span>
                            <span className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 blur-3xl opacity-40 -z-10 animate-pulse" />
                        </span>
                    </h2>
                    <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto font-medium drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                        Encontrá todo lo que necesitás para armar tu setup
                    </p>
                </div>

                {/* Bento Grid Moderno - Desktop */}
                <div className="hidden lg:block">
                    <div className="grid grid-cols-6 grid-rows-4 gap-4 h-[600px]">
                        {/* PROCESADORES - Grande (2x2) */}
                        <CategoryCard
                            category={allCategories[0]}
                            onCategoryClick={handleCategoryClick}
                            className="col-span-2 row-span-2"
                            textSize="text-xl font-black"
                            isLarge={true}
                        />
                        
                        {/* MOTHERBOARDS - Mediano (2x1) */}
                        <CategoryCard
                            category={allCategories[1]}
                            onCategoryClick={handleCategoryClick}
                            className="col-span-2 row-span-1"
                            textSize="text-lg font-bold"
                        />
                        
                        {/* MEMORIAS RAM - Mediano (2x1) */}
                        <CategoryCard
                            category={allCategories[2]}
                            onCategoryClick={handleCategoryClick}
                            className="col-span-2 row-span-1"
                            textSize="text-lg font-bold"
                        />
                        
                        {/* ALMACENAMIENTO - Alto (2x2) */}
                        <CategoryCard
                            category={allCategories[3]}
                            onCategoryClick={handleCategoryClick}
                            className="col-span-2 row-span-2"
                            textSize="text-xl font-black"
                            isLarge={true}
                        />
                        
                        {/* FUENTES - Pequeño (1x1) */}
                        <CategoryCard
                            category={allCategories[4]}
                            onCategoryClick={handleCategoryClick}
                            className="col-span-1 row-span-1"
                            textSize="text-base font-semibold"
                        />
                        
                        {/* REFRIGERACIÓN - Pequeño (1x1) */}
                        <CategoryCard
                            category={allCategories[5]}
                            onCategoryClick={handleCategoryClick}
                            className="col-span-1 row-span-1"
                            textSize="text-base font-semibold"
                        />
                        
                        {/* TECLADOS - Ancho (2x1) */}
                        <CategoryCard
                            category={allCategories[6]}
                            onCategoryClick={handleCategoryClick}
                            className="col-span-2 row-span-1"
                            textSize="text-lg font-bold"
                        />
                        
                        {/* MOUSE - Pequeño (1x1) */}
                        <CategoryCard
                            category={allCategories[7]}
                            onCategoryClick={handleCategoryClick}
                            className="col-span-1 row-span-1"
                            textSize="text-base font-semibold"
                        />
                        
                        {/* AURICULARES - Pequeño (1x1) */}
                        <CategoryCard
                            category={allCategories[8]}
                            onCategoryClick={handleCategoryClick}
                            className="col-span-1 row-span-1"
                            textSize="text-base font-semibold"
                        />
                    </div>
                </div>

                {/* Bento Grid Tablet */}
                <div className="hidden sm:block lg:hidden">
                    <div className="grid grid-cols-4 grid-rows-3 gap-3 h-[480px]">
                        {/* PROCESADORES - Grande (2x2) */}
                        <CategoryCard
                            category={allCategories[0]}
                            onCategoryClick={handleCategoryClick}
                            className="col-span-2 row-span-2"
                            textSize="text-lg font-black"
                            isLarge={true}
                        />
                        
                        {/* MOTHERBOARDS - Vertical (1x2) */}
                        <CategoryCard
                            category={allCategories[1]}
                            onCategoryClick={handleCategoryClick}
                            className="col-span-1 row-span-2"
                            textSize="text-base font-bold"
                        />
                        
                        {/* MEMORIAS RAM - Vertical (1x2) */}
                        <CategoryCard
                            category={allCategories[2]}
                            onCategoryClick={handleCategoryClick}
                            className="col-span-1 row-span-2"
                            textSize="text-base font-bold"
                        />
                        
                        {/* ALMACENAMIENTO - Ancho (2x1) */}
                        <CategoryCard
                            category={allCategories[3]}
                            onCategoryClick={handleCategoryClick}
                            className="col-span-2 row-span-1"
                            textSize="text-base font-bold"
                        />
                        
                        {/* FUENTES - Pequeño (1x1) */}
                        <CategoryCard
                            category={allCategories[4]}
                            onCategoryClick={handleCategoryClick}
                            className="col-span-1 row-span-1"
                            textSize="text-sm font-semibold"
                        />
                        
                        {/* REFRIGERACIÓN - Pequeño (1x1) */}
                        <CategoryCard
                            category={allCategories[5]}
                            onCategoryClick={handleCategoryClick}
                            className="col-span-1 row-span-1"
                            textSize="text-sm font-semibold"
                        />
                    </div>
                    
                    {/* Categorías restantes en grid simple */}
                    <div className="grid grid-cols-3 gap-3 mt-4">
                        {allCategories.slice(6).map((category) => (
                            <CategoryCard
                                key={category.id}
                                category={category}
                                onCategoryClick={handleCategoryClick}
                                className="h-[120px]"
                                textSize="text-sm font-semibold"
                            />
                        ))}
                    </div>
                </div>

                {/* Bento Grid Mobile - Optimizado y compacto */}
                <div className="block sm:hidden px-3">
                    <div className="grid grid-cols-4 gap-2 auto-rows-[100px]">
                        {/* PROCESADORES - Grande destacado (2x2) */}
                        <CategoryCard
                            category={allCategories[0]}
                            onCategoryClick={handleCategoryClick}
                            className="col-span-2 row-span-2"
                            textSize="text-base font-black"
                            isLarge={true}
                        />
                        
                        {/* FUENTES - Vertical (1x2) */}
                        <CategoryCard
                            category={allCategories[4]}
                            onCategoryClick={handleCategoryClick}
                            className="col-span-1 row-span-2"
                            textSize="text-xs font-bold"
                        />
                        
                        {/* MEMORIAS RAM - Vertical (1x2) */}
                        <CategoryCard
                            category={allCategories[2]}
                            onCategoryClick={handleCategoryClick}
                            className="col-span-1 row-span-2"
                            textSize="text-xs font-bold"
                        />
                        
                        {/* REFRIGERACION - Ancho (2x1) */}
                        <CategoryCard
                            category={allCategories[5]}
                            onCategoryClick={handleCategoryClick}
                            className="col-span-2 row-span-1"
                            textSize="text-xs font-bold"
                        />
                        
                        {/* MOTHERBOARD - Pequeño (1x1) */}
                        <CategoryCard
                            category={allCategories[1]}
                            onCategoryClick={handleCategoryClick}
                            className="col-span-1 row-span-1"
                            textSize="text-[10px] font-semibold"
                        />
                        
                        {/* TECLADOS - Pequeño (1x1) */}
                        <CategoryCard
                            category={allCategories[6]}
                            onCategoryClick={handleCategoryClick}
                            className="col-span-1 row-span-1"
                            textSize="text-[10px] font-semibold"
                        />
                        
                        {/* ALMACENAMIENTO - Ancho (2x1) */}
                        <CategoryCard
                            category={allCategories[3]}
                            onCategoryClick={handleCategoryClick}
                            className="col-span-2 row-span-1"
                            textSize="text-xs font-bold"
                        />
                        
                        {/* MOUSE - Pequeño (1x1) */}
                        <CategoryCard
                            category={allCategories[7]}
                            onCategoryClick={handleCategoryClick}
                            className="col-span-1 row-span-1"
                            textSize="text-[10px] font-semibold"
                        />
                        
                        {/* AURICULARES - Pequeño (1x1) */}
                        <CategoryCard
                            category={allCategories[8]}
                            onCategoryClick={handleCategoryClick}
                            className="col-span-1 row-span-1"
                            textSize="text-[10px] font-semibold"
                        />
                    </div>
                </div>

                {/* CTA Button - Ver Más */}
                <div className="flex justify-center pt-4">
                    <button
                        onClick={handleVerMas}
                        className="group relative inline-flex items-center gap-2 sm:gap-4 px-6 sm:px-10 md:px-12 py-3 sm:py-5 md:py-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-400 hover:via-purple-400 hover:to-pink-400 rounded-xl sm:rounded-2xl font-bold sm:font-black text-white text-sm sm:text-lg md:text-xl shadow-xl sm:shadow-2xl shadow-blue-500/40 sm:shadow-blue-500/50 hover:shadow-2xl sm:hover:shadow-3xl hover:shadow-blue-500/60 sm:hover:shadow-blue-500/70 transition-all duration-500 hover:scale-105 sm:hover:scale-110 active:scale-95 border border-blue-400/30 sm:border-2 sm:border-blue-400/40 hover:border-blue-300/50 sm:hover:border-blue-300/60"
                    >
                        {/* Efecto de brillo animado */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 sm:via-white/30 to-transparent opacity-0 group-hover:opacity-100 rounded-xl sm:rounded-2xl transition-opacity duration-500 animate-pulse" />
                        
                        {/* Resplandor de fondo */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-xl sm:rounded-2xl blur-lg sm:blur-xl opacity-0 group-hover:opacity-50 sm:group-hover:opacity-60 transition-opacity duration-500 -z-10 scale-110" />
                        
                        <Cpu className="w-4 h-4 sm:w-6 md:w-7 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-500" />
                        <span className="relative z-10 tracking-wide text-xs sm:text-base md:text-lg">Ver más</span>
                        <ArrowRight className="w-4 h-4 sm:w-6 md:w-7 group-hover:translate-x-2 sm:group-hover:translate-x-3 group-hover:scale-110 transition-transform duration-500" />
                        
                        {/* Partículas animadas - Solo en desktop */}
                        <div className="hidden sm:block absolute -top-2 -right-2 w-3 md:w-4 h-3 md:h-4 bg-blue-300 rounded-full opacity-0 group-hover:opacity-100 animate-ping" />
                        <div className="hidden sm:block absolute -bottom-2 -left-2 w-2 md:w-3 h-2 md:h-3 bg-purple-300 rounded-full opacity-0 group-hover:opacity-100 animate-ping [animation-delay:0.3s]" />
                        <div className="hidden sm:block absolute top-1/2 -right-3 md:-right-4 w-1.5 md:w-2 h-1.5 md:h-2 bg-pink-300 rounded-full opacity-0 group-hover:opacity-100 animate-ping [animation-delay:0.6s]" />
                    </button>
                </div>
            </div>
        </section>
    );
};


// --- Componente Reutilizable para la Tarjeta ---
const CategoryCard = ({ category, onCategoryClick, className, textSize, isLarge = false }) => (
    <button
        onClick={() => onCategoryClick && onCategoryClick(category.slug)}
        className={`group relative w-full overflow-hidden rounded-2xl sm:rounded-3xl transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500/50 bg-gray-900 ${className}`}
        aria-label={`Explorar categoría ${category.name}`}
        style={{
            boxShadow: isLarge 
                ? '0 20px 60px rgba(0,0,0,0.6), 0 8px 32px rgba(59,130,246,0.2), 0 0 0 1px rgba(255,255,255,0.15), inset 0 1px 0 rgba(255,255,255,0.1)'
                : '0 12px 40px rgba(0,0,0,0.5), 0 4px 20px rgba(59,130,246,0.15), 0 0 0 1px rgba(255,255,255,0.12), inset 0 1px 0 rgba(255,255,255,0.08)'
        }}
    >
        {/* Glow border animado - MUY intenso */}
        <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-700 ${isLarge ? 'animate-pulse' : ''}`}
             style={{
                 boxShadow: isLarge 
                    ? '0 0 60px rgba(59, 130, 246, 0.9), 0 0 120px rgba(147, 51, 234, 0.7), 0 0 180px rgba(236, 72, 153, 0.5), inset 0 0 40px rgba(59, 130, 246, 0.3)'
                    : '0 0 40px rgba(59, 130, 246, 0.8), 0 0 80px rgba(147, 51, 234, 0.6), 0 0 120px rgba(236, 72, 153, 0.4), inset 0 0 25px rgba(59, 130, 246, 0.2)'
             }} />

        {/* Resplandor de fondo permanente */}
        <div className={`absolute inset-0 rounded-3xl transition-opacity duration-500 ${isLarge ? 'opacity-40' : 'opacity-25'} group-hover:opacity-70`}
             style={{
                 boxShadow: isLarge
                    ? '0 0 40px rgba(59, 130, 246, 0.3), 0 0 80px rgba(147, 51, 234, 0.2)'
                    : '0 0 25px rgba(59, 130, 246, 0.2), 0 0 50px rgba(147, 51, 234, 0.15)'
             }} />

        {/* Imagen de fondo */}
        <div className="absolute inset-0 bg-gray-900">
            <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-125 group-hover:contrast-110"
                loading="eager"
                onError={(e) => {
                    e.target.style.display = 'none';
                }}
            />
        </div>

        {/* Overlay oscuro con gradiente mejorado */}
        <div className={`absolute inset-0 ${isLarge 
            ? 'bg-gradient-to-br from-black/85 via-black/65 to-black/35' 
            : 'bg-gradient-to-t from-black/90 via-black/55 to-black/15'
        }`} />

        {/* Glow effect en hover - MUY intenso */}
        <div className={`absolute inset-0 transition-all duration-700 ${isLarge
            ? 'bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/50 group-hover:via-purple-500/50 group-hover:to-pink-500/50'
            : 'bg-gradient-to-tr from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/35 group-hover:via-purple-500/35 group-hover:to-pink-500/35'
        }`} />

        {/* Brillo intenso en hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Efecto de cristal/vidrio */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

        {/* Partículas flotantes para cards grandes */}
        {isLarge && (
            <>
                <div className="absolute top-4 right-4 w-3 h-3 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-500 shadow-[0_0_20px_rgba(59,130,246,0.8)]" />
                <div className="absolute bottom-6 right-6 w-2 h-2 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-500 shadow-[0_0_15px_rgba(147,51,234,0.8)] [animation-delay:0.5s]" />
                <div className="absolute top-1/3 right-8 w-2.5 h-2.5 bg-pink-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-500 shadow-[0_0_18px_rgba(236,72,153,0.8)] [animation-delay:1s]" />
                <div className="absolute top-1/2 left-6 w-1.5 h-1.5 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-500 shadow-[0_0_12px_rgba(34,211,238,0.8)] [animation-delay:1.5s]" />
            </>
        )}

        {/* Content */}
        <div className={`absolute inset-0 flex items-end ${isLarge ? 'p-6 md:p-8' : 'p-3 sm:p-4'} z-10`}>
            <div className="relative">
                <h3 className={`font-black text-white leading-none text-left tracking-tight ${textSize} ${isLarge ? 'mb-2' : ''} filter drop-shadow-2xl`}
                    style={{ 
                        textShadow: isLarge 
                            ? '0 4px 20px rgba(0,0,0,0.9), 0 2px 8px rgba(0,0,0,0.8), 0 0 30px rgba(59,130,246,0.5)' 
                            : '0 2px 10px rgba(0,0,0,0.9), 0 1px 4px rgba(0,0,0,0.8), 0 0 20px rgba(59,130,246,0.3)' 
                    }}>
                    {category.name}
                </h3>
                
                {/* Descripción adicional para cards grandes */}
                {isLarge && (
                    <p className="text-gray-200 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 mb-3 filter drop-shadow-lg"
                       style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8), 0 0 15px rgba(59,130,246,0.4)' }}>
                        {category.name === 'PROCESADORES' && 'Intel, AMD y más'}
                        {category.name === 'ALMACENAMIENTO' && 'SSD, HDD, NVMe'}
                    </p>
                )}
                
                <div className="relative mt-1.5 sm:mt-2">
                    <div className={`${isLarge ? 'h-1.5 w-16' : 'h-1 sm:h-1 w-8 sm:w-12'} bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full ${isLarge ? 'group-hover:w-28' : 'group-hover:w-16 sm:group-hover:w-20'} transition-all duration-500 filter drop-shadow-lg`} 
                         style={{ 
                             boxShadow: isLarge 
                                ? '0 0 30px rgba(59, 130, 246, 0.9), 0 0 60px rgba(147, 51, 234, 0.7), 0 4px 20px rgba(0,0,0,0.5)' 
                                : '0 0 20px rgba(59, 130, 246, 0.8), 0 0 40px rgba(147, 51, 234, 0.6), 0 2px 10px rgba(0,0,0,0.4)' 
                         }} />
                </div>
            </div>
        </div>

        {/* Borde con glow en hover - MUY intenso */}
        <div className={`absolute inset-0 rounded-3xl border-2 transition-all duration-500 ${isLarge 
            ? 'border-blue-400/30 group-hover:border-blue-300/80 group-hover:shadow-[0_0_50px_rgba(59,130,246,0.8),0_0_100px_rgba(147,51,234,0.6)]'
            : 'border-blue-400/20 group-hover:border-blue-300/60 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.7),0_0_60px_rgba(147,51,234,0.5)]'
        }`} />

        {/* Efecto de ondas en hover */}
        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
             style={{
                 background: `radial-gradient(circle at 50% 50%, rgba(59,130,246,0.1) 0%, transparent 70%)`
             }} />
    </button>
);


// Exportamos el componente principal
export default CategoryProductSection;
