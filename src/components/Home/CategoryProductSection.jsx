import { useState } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

const allCategories = [
  { id: 1, name: 'PROCESADORES',   image: '/images/category_grid/procesador_grid_tiny.webp',      slug: 'procesadores',   accent: '#f97316' },
  { id: 2, name: 'MOTHERBOARDS',   image: '/images/category_grid/motherboard_grid_tiny.webp',     slug: 'motherboards',   accent: '#2563eb' },
  { id: 3, name: 'MEMORIAS RAM',   image: '/images/category_grid/ram_grid_tiny.webp',             slug: 'memorias-ram',   accent: '#10b981' },
  { id: 4, name: 'ALMACENAMIENTO', image: '/images/category_grid/almacenamiento_grid_tiny.webp',  slug: 'almacenamiento', accent: '#8b5cf6' },
  { id: 5, name: 'FUENTES',        image: '/images/category_grid/fuente_grid_tiny.webp',          slug: 'fuentes',        accent: '#eab308' },
  { id: 6, name: 'REFRIGERACIÓN',  image: '/images/category_grid/refrigeracion_grid_tiny.webp',  slug: 'refrigeracion',  accent: '#06b6d4' },
  { id: 7, name: 'TECLADOS',       image: '/images/category_grid/teclados_grid_tiny.webp',        slug: 'teclados',       accent: '#ec4899' },
  { id: 8, name: 'MOUSE',          image: '/images/category_grid/mouse_grid_tiny.webp',           slug: 'mouse',          accent: '#f97316' },
  { id: 9, name: 'AURICULARES',    image: '/images/category_grid/auriculares_grid_tiny.webp',     slug: 'auriculares',    accent: '#2563eb' },
];

const CategoryCard = ({ category, index, onClick, textSize = 'text-sm' }) => {
  const [hover, setHover] = useState(false);
  const num = String(index + 1).padStart(2, '0');

  return (
    <button
      onClick={() => onClick(category.slug)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-label={`Explorar ${category.name}`}
      className="relative overflow-hidden rounded-2xl bg-[#0a0a0a] cursor-pointer w-full h-full flex flex-col justify-end outline-none transition-transform duration-200 hover:-translate-y-0.5 active:scale-95 p-3"
      style={{
        border: `2px solid ${hover ? category.accent + '60' : 'rgba(255,255,255,0.08)'}`,
        boxShadow: hover ? `0 8px 28px ${category.accent}25` : '0 2px 8px rgba(0,0,0,0.5)',
      }}
    >
      {/* Image */}
      <img
        src={category.image}
        alt={category.name}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-all duration-500"
        style={{ opacity: hover ? 0.5 : 0.35, transform: hover ? 'scale(1.07)' : 'scale(1)' }}
        onError={e => e.target.style.display = 'none'}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)' }} />

      {/* Glow */}
      {hover && (
        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(circle at 30% 80%, ${category.accent}22 0%, transparent 60%)` }} />
      )}

      {/* Number */}
      <span
        className="absolute top-2 left-2.5 font-bold tracking-widest text-[10px] leading-none transition-colors duration-200"
        style={{ fontFamily: 'monospace', color: hover ? category.accent : 'rgba(255,255,255,0.22)' }}
      >
        {num}
      </span>

      {/* Arrow badge */}
      <div
        className="absolute top-2 right-2 w-5 h-5 rounded-md flex items-center justify-center transition-all duration-200"
        style={{
          background: category.accent,
          opacity: hover ? 1 : 0,
          transform: hover ? 'scale(1)' : 'scale(0.6)',
        }}
      >
        <ArrowUpRight size={11} color="#fff" strokeWidth={2.5} />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Accent bar */}
        <div
          className="mb-1.5 h-0.5 rounded-full transition-all duration-300"
          style={{ width: hover ? 28 : 14, background: category.accent }}
        />
        <span
          className={`block font-black tracking-wide text-white leading-tight ${textSize}`}
          style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif", textShadow: '0 1px 6px rgba(0,0,0,0.9)' }}
        >
          {category.name}
        </span>
      </div>
    </button>
  );
};

const CategoryProductSection = ({ onCategoryClick }) => {
  const handle = (slug) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    onCategoryClick?.(slug);
  };

  return (
    <section className="w-full  px-3 pt-5 pb-3 flex flex-col gap-3">

      
      
 
        {/* HEADER */}
        <div className="flex items-end justify-between gap-4 mb-12">
          <div className="flex-1">
            <div className="cps-eyebrow text-[13px] text-white/40 uppercase tracking-tighter">ElectroShock · Catálogo</div>
            <div className="cps-title-brutalist flex flex-col">
              <span className="cps-title-main text-[clamp(4.5rem,10vw,7.5rem)] font-black leading-[0.8] text-white">EXPLORÁ</span>
              <span className="cps-title-accent text-[clamp(2.8rem,6vw,4.8rem)] font-black leading-[0.8] text-blue-600 translate-x-3 -mt-2">CATEGORÍAS</span>
            </div>
            <div className="text-[17px] leading-relaxed text-white/50 mt-4 max-w-[600px] font-medium tracking-wide">Todo para tu setup en un solo lugar</div>
          </div>
          <div className="flex-shrink-0 text-right hidden sm:block">
            <div className="text-6xl font-black text-white/10">{String(allCategories.length).padStart(2,'0')}</div>
            <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/25 mt-1">secciones</div>
          </div>
           </div>


      {/* ── MOBILE GRID (hidden on lg+) ── */}
      <div className="lg:hidden max-w-md mx-auto">
        <div className="grid grid-cols-2 gap-3">
          
          {/* CARD 1: PROCESADORES */}
          <div className="bg-[#0a0a0a] rounded-2xl p-3 border-2 border-white/10 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-100/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <img
              src={allCategories[0].image}
              alt={allCategories[0].name}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)' }} />
            <div className="relative z-10">
              <span className="inline-block px-1.5 py-0.5 bg-orange-600 text-white text-[7px] font-black rounded-full uppercase mb-1.5 shadow-sm">
                Hardware
              </span>
              <h3 className="text-base font-black text-white leading-tight mb-1">
                {allCategories[0].name}
              </h3>
              <p className="text-[10px] text-white/60 font-medium leading-tight">
                AMD e Intel
              </p>
            </div>
          </div>

          {/* CARD 2: FUENTES */}
          <div className="bg-[#0a0a0a] rounded-2xl p-3 border-2 border-white/10 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-100/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <img
              src={allCategories[4].image}
              alt={allCategories[4].name}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)' }} />
            <div className="relative z-10">
              <span className="inline-block px-1.5 py-0.5 bg-yellow-600 text-white text-[7px] font-black rounded-full uppercase mb-1.5 shadow-sm">
                Energía
              </span>
              <h3 className="text-base font-black text-white leading-tight mb-1">
                {allCategories[4].name}
              </h3>
              <p className="text-[10px] text-white/60 font-medium leading-tight">
                Certificadas
              </p>
            </div>
          </div>

          {/* CARD 3: MOTHERBOARDS - TALL (row-span-2) */}
          <div className="row-span-2 bg-[#0a0a0a] rounded-2xl border-2 border-blue-200/20 relative flex items-center justify-center overflow-hidden shadow-sm group">
            <div 
              className="absolute w-28 h-28 bg-blue-100/20 rounded-full opacity-40 group-hover:opacity-60 transition-opacity duration-500" 
              style={{ filter: 'blur(40px)' }}
            />
            <img 
              src={allCategories[5].image}
              alt={allCategories[1].name}
              loading="lazy"
              className="w-full h-full object-contain p-2 relative z-10 scale-110 group-hover:scale-115 transition-transform duration-500"
            />
          </div>

          {/* CARD 4: ALMACENAMIENTO */}
          <div className="bg-[#0a0a0a] rounded-2xl p-2.5 border-2 border-white/10 flex flex-col justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-100/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <img
              src={allCategories[3].image}
              alt={allCategories[3].name}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)' }} />
            <div className="relative z-10">
              <span className="inline-block px-1.5 py-0.5 bg-purple-600 text-white text-[7px] font-black rounded-full uppercase mb-1 shadow-sm">
                Storage
              </span>
              <h3 className="text-sm font-black text-white leading-tight">
                {allCategories[3].name}
              </h3>
            </div>
          </div>

          {/* CARD 5: REFRIGERACIÓN */}
          <div className="bg-[#0a0a0a] rounded-2xl p-2.5 border-2 border-white/10 flex flex-col justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-100/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <img
              src={allCategories[5].image}
              alt={allCategories[5].name}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)' }} />
            <div className="relative z-10">
              <span className="inline-block px-1.5 py-0.5 bg-cyan-600 text-white text-[7px] font-black rounded-full uppercase mb-1 shadow-sm">
                Cooling
              </span>
              <h3 className="text-sm font-black text-white leading-tight">
                {allCategories[5].name}
              </h3>
            </div>
          </div>

          {/* CARD 6: MEMORIAS RAM - FULL WIDTH (col-span-2) */}
          <div className="col-span-2 bg-[#0a0a0a] rounded-2xl p-3 border-2 border-white/10 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-green-100/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <img
              src={allCategories[2].image}
              alt={allCategories[2].name}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)' }} />
            
            <div className="relative z-10 flex items-start gap-2.5">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 mb-1.5 flex-wrap">
                  <span className="px-1.5 py-0.5 bg-green-600 text-white text-[7px] font-black rounded-full uppercase shadow-sm">
                    RAM
                  </span>
                </div>
                
                <h3 className="text-sm font-black text-white leading-tight mb-1">
                  {allCategories[2].name}
                </h3>
                
                <p className="text-[9px] text-white/60 font-medium leading-tight">
                  DDR4 y DDR5 disponibles
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* CTA */}
        <button
          onClick={() => handle('procesadores')}
          className="mt-3 w-full relative overflow-hidden rounded-xl flex items-center justify-center gap-2 font-black text-sm tracking-widest uppercase text-[#060608] bg-white transition-all duration-150 active:scale-95 h-12"
          style={{ fontFamily: "'Bebas Neue','Arial Black',sans-serif", letterSpacing: '0.1em' }}
        >
          Ver todo
          <ArrowRight size={15} strokeWidth={2.5} />
        </button>
      </div>

      {/* ── DESKTOP GRID (hidden below lg) ── */}
      <div
        className="hidden lg:grid gap-2"
        style={{
          gridTemplateColumns: 'repeat(6, 1fr)',
          gridTemplateRows: '200px 160px 160px',
          flex: 1,
        }}
      >
        {[
          { cls: { gridColumn: 'span 2', gridRow: 'span 2' }, i: 0, textSize: 'text-xl' },
          { cls: { gridColumn: 'span 2', gridRow: 'span 1' }, i: 4, textSize: 'text-base' },
          { cls: { gridColumn: 'span 2', gridRow: 'span 1' }, i: 2, textSize: 'text-base' },
          { cls: { gridColumn: 'span 2', gridRow: 'span 2' }, i: 5, textSize: 'text-base' },
          { cls: { gridColumn: 'span 1', gridRow: 'span 1' }, i: 1, textSize: 'text-sm' },
          { cls: { gridColumn: 'span 1', gridRow: 'span 1' }, i: 6, textSize: 'text-sm' },
          { cls: { gridColumn: 'span 2', gridRow: 'span 1' }, i: 3, textSize: 'text-base' },
          { cls: { gridColumn: 'span 1', gridRow: 'span 1' }, i: 7, textSize: 'text-sm' },
          { cls: { gridColumn: 'span 1', gridRow: 'span 1' }, i: 8, textSize: 'text-sm' },
        ].map(({ cls, i, textSize }) => (
          <div key={allCategories[i].id} style={cls}>
            <CategoryCard category={allCategories[i]} index={i} onClick={handle} textSize={textSize} />
          </div>
        ))}
      </div>

      {/* Desktop CTA */}
      <div className="hidden lg:flex justify-center pt-1">
        <button
          onClick={() => handle('procesadores')}
          className="inline-flex items-center gap-2.5 px-7 py-3 bg-white text-[#0a0a0a] rounded-xl font-bold text-xs tracking-widest uppercase cursor-pointer transition-all duration-150 hover:bg-slate-100 hover:-translate-y-0.5 active:scale-95 group"
        >
          Ver todo el catálogo
          <ArrowRight size={14} strokeWidth={2.5} className="transition-transform group-hover:translate-x-1" />
        </button>
      </div>

    </section>
  );
};

export default CategoryProductSection;