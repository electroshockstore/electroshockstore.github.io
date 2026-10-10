import OffsetGlowCTA from '../../Shared/OffsetGlowCTA';
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
      <OffsetGlowCTA
        label="Ver todo el catálogo"
        onClick={() => onCategoryClick('procesadores')}
        className="mt-1.5 w-full font-black uppercase"
        frontClassName="w-full"
        labelClassName="uppercase"
        style={{
          height: 56,
          fontFamily: "'Bebas Neue','Arial Black',sans-serif",
          letterSpacing: '0.1em',
          fontSize: 15
        }}
      />
    </div>
  );
};

export default MobileGrid;
