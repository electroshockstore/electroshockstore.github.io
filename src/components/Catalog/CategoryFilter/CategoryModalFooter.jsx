import { ShoppingCart, ChevronRight } from 'lucide-react';

const CategoryModalFooter = () => {
  return (
    <div
      className="flex-shrink-0 relative overflow-hidden"
      style={{
        background: '#0a0a0a',
        borderTop: '2px solid #ea580c',
        fontFamily: "'Barlow Condensed', sans-serif",
      }}
    >
      {/* Top glow line */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(234,88,12,0.6) 30%, rgba(234,88,12,0.6) 70%, transparent)' }}
      />

      {/* Diagonal accent */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(-45deg, #ea580c 0, #ea580c 1px, transparent 0, transparent 40%)',
          backgroundSize: '8px 8px',
        }}
      />

      <div className="flex items-center justify-between px-5 py-4 relative z-10">
        {/* Left: instruction text */}
        <div className="flex flex-col">
          <span
            className="text-gray-500 font-bold uppercase tracking-widest"
            style={{ fontSize: '9px', letterSpacing: '0.2em' }}
          >
            PASO 01
          </span>
          <span
            className="text-white font-black uppercase tracking-wide leading-none mt-0.5"
            style={{ fontSize: '15px', letterSpacing: '0.05em' }}
          >
            SELECCIONA CATEGORÍA
          </span>
        </div>

        {/* Right: CTA button */}
        <div
          className="flex items-center gap-2 px-4 py-2.5 text-white font-black uppercase tracking-wider"
          style={{
            background: 'linear-gradient(90deg, #c2410c, #ea580c)',
            clipPath: 'polygon(8px 0, 100% 0, calc(100% - 8px) 100%, 0 100%)',
            fontSize: '12px',
            letterSpacing: '0.1em',
          }}
        >
          <ShoppingCart className="w-3.5 h-3.5" strokeWidth={2.5} />
          <span>EXPLORAR</span>
          <ChevronRight className="w-3 h-3" strokeWidth={3} />
        </div>
      </div>

      {/* Bottom micro-detail */}
      <div
        className="h-0.5 w-full"
        style={{ background: 'linear-gradient(90deg, #ea580c 0%, #f97316 50%, transparent 100%)' }}
      />
    </div>
  );
};

export default CategoryModalFooter;