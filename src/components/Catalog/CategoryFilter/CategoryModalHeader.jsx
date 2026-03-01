import { Cpu, X } from 'lucide-react';

const CategoryModalHeader = ({ onClose, categoriesCount }) => {
  return (
    <div
      className="flex-shrink-0 relative overflow-hidden"
      style={{
        background: '#0a0a0a',
        borderBottom: '2px solid #ea580c',
        fontFamily: "'Barlow Condensed', sans-serif",
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #f97316 30%, #f97316 70%, transparent)' }}
      />

      {/* Hex grid background */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill='%23ea580c' fill-opacity='1'%3E%3Cpolygon points='13.99 .01 27.98 7.5 27.98 22.5 13.99 30 0 22.5 0 7.5'/%3E%3Cpolygon points='13.99 30 27.98 37.5 27.98 52.5 13.99 60 0 52.5 0 37.5'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '28px',
        }}
      />

      <div className="flex items-center justify-between px-5 py-4 relative z-10">
        {/* Left: icon + title */}
        <div className="flex items-center gap-3">
          <div
            className="relative flex items-center justify-center"
            style={{
              width: 42,
              height: 42,
              background: 'linear-gradient(135deg, #1a1a1a, #2d2d2d)',
              border: '2px solid #ea580c',
              clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
            }}
          >
            {/* Pulsing ring */}
            <div
              className="absolute inset-0 animate-ping opacity-30"
              style={{
                border: '2px solid #ea580c',
                clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
              }}
            />
            <Cpu className="w-5 h-5 text-orange-500 relative z-10" strokeWidth={2} />
          </div>

          <div>
            <h2
              className="text-white font-black tracking-wider uppercase leading-none"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: '20px',
                letterSpacing: '0.08em',
              }}
            >
              CATEGORÍAS
            </h2>
            <div className="flex items-center gap-2 mt-0.5">
              <div
                className="h-px flex-1"
                style={{ background: 'linear-gradient(90deg, #ea580c, transparent)', width: 24 }}
              />
              <span
                className="text-orange-400 font-bold uppercase tracking-widest"
                style={{ fontSize: '9px', letterSpacing: '0.2em' }}
              >
                {categoriesCount} DISPONIBLES
              </span>
            </div>
          </div>
        </div>

        {/* Right: close button */}
        <button
          onClick={onClose}
          className="relative flex items-center justify-center transition-all duration-150 active:scale-90"
          style={{
            width: 36,
            height: 36,
            background: '#1a1a1a',
            border: '1px solid #374151',
            clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
          }}
        >
          <X className="w-4 h-4 text-gray-400" strokeWidth={2.5} />
          {/* Hover fill */}
          <div
            className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-150"
            style={{
              background: 'rgba(234,88,12,0.15)',
              clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
            }}
          />
        </button>
      </div>
    </div>
  );
};

export default CategoryModalHeader;