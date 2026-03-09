import { ArrowRight } from 'lucide-react';
import MobileCard from './MobileCard';

const MobileGrid = ({ categories, onCategoryClick }) => {
  return (
    <div className="lg:hidden w-full">
      <div
        className="grid gap-1.5 w-full"
        style={{
          gridTemplateColumns: '2fr 1fr',
          gridTemplateRows: '140px 115px 95px',
        }}
      >
        {/* PROCESADORES — col 1, rows 1+2 (tall) */}
        <div style={{ gridColumn: 1, gridRow: '1 / span 2' }}>
          <MobileCard category={categories[0]} onClick={onCategoryClick} wide />
        </div>

        {/* FUENTES — col 2, row 1 */}
        <div style={{ gridColumn: 2, gridRow: 1 }}>
          <MobileCard category={categories[4]} onClick={onCategoryClick} />
        </div>

        {/* REFRIGERACIÓN — col 2, row 2 */}
        <div style={{ gridColumn: 2, gridRow: 2 }}>
          <MobileCard category={categories[5]} onClick={onCategoryClick} />
        </div>

        {/* MOTHERBOARDS — col 1, row 3 */}
        <div style={{ gridColumn: 1, gridRow: 3 }}>
          <MobileCard category={categories[1]} onClick={onCategoryClick} wide />
        </div>

        {/* MEMORIAS RAM — col 2, row 3 */}
        <div style={{ gridColumn: 2, gridRow: 3 }}>
          <MobileCard category={categories[2]} onClick={onCategoryClick} />
        </div>
      </div>

      {/* ALMACENAMIENTO full-width banner */}
      <div className="mt-1.5" style={{ height: 68 }}>
        <MobileCard category={categories[3]} onClick={onCategoryClick} wide />
      </div>

      {/* CTA */}
      <button
        onClick={() => onCategoryClick('procesadores')}
        className="mt-1.5 w-full relative overflow-hidden rounded-xl flex items-center justify-center gap-2 font-black tracking-widest uppercase text-[#060608] bg-white active:scale-95 transition-transform duration-150"
        style={{ 
          height: 48, 
          fontFamily: "'Bebas Neue','Arial Black',sans-serif", 
          letterSpacing: '0.1em', 
          fontSize: 14 
        }}
      >
        Ver todo el catálogo
        <ArrowRight size={14} strokeWidth={2.5} />
      </button>
    </div>
  );
};

export default MobileGrid;
