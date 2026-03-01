import { useIsIOS } from '../../../hooks/useDevice';
import CategoryModalCard from './CategoryModalCard';

const CategoryModalGrid = ({ categories, selectedCategory, onCategorySelect }) => {
  const isIOS = useIsIOS();

  return (
    <div
      className="flex-1 overflow-y-auto overflow-x-hidden relative"
      style={{
        background: '#0d0d0d',
        WebkitOverflowScrolling: 'touch',
        overscrollBehavior: 'contain',
      }}
    >
      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px',
        }}
      />

      {/* Diagonal stripe accent */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: 'repeating-linear-gradient(-45deg, #ea580c 0, #ea580c 1px, transparent 0, transparent 50%)',
          backgroundSize: '12px 12px',
        }}
      />

      {/* Ambient glow top */}
      <div
        className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(234,88,12,0.08) 0%, transparent 100%)',
        }}
      />

      {/* Grid */}
      <div className="px-4 py-5 relative z-10">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-5">
          <div
            className="h-px flex-1"
            style={{ background: 'linear-gradient(90deg, #ea580c 0%, transparent 100%)' }}
          />
          <span
            className="text-orange-500 font-black uppercase tracking-widest"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: '10px',
              letterSpacing: '0.25em',
            }}
          >
            HARDWARE · TECH
          </span>
          <div
            className="h-px flex-1"
            style={{ background: 'linear-gradient(90deg, transparent 0%, #ea580c 100%)' }}
          />
        </div>

        <div className="grid grid-cols-2 gap-3 w-full">
          {categories.map((category, index) => (
            <CategoryModalCard
              key={category}
              category={category}
              index={index}
              isSelected={selectedCategory === category}
              isIOS={isIOS}
              onSelect={onCategorySelect}
            />
          ))}
        </div>

        {/* Bottom spacing */}
        <div className="h-4" />
      </div>
    </div>
  );
};

export default CategoryModalGrid;