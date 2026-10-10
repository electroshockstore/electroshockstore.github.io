import OffsetGlowCTA from '../../Shared/OffsetGlowCTA';
import CategoryCard from './CategoryCard';

const DesktopGrid = ({ categories, onCategoryClick }) => {
  const gridLayout = [
    { cls: { gridColumn: 'span 2', gridRow: 'span 2' }, i: 0, textSize: 'text-xl' },
    { cls: { gridColumn: 'span 2', gridRow: 'span 1' }, i: 4, textSize: 'text-base' },
    { cls: { gridColumn: 'span 2', gridRow: 'span 1' }, i: 2, textSize: 'text-base' },
    { cls: { gridColumn: 'span 2', gridRow: 'span 2' }, i: 5, textSize: 'text-base' },
    { cls: { gridColumn: 'span 1', gridRow: 'span 1' }, i: 1, textSize: 'text-sm' },
    { cls: { gridColumn: 'span 1', gridRow: 'span 1' }, i: 6, textSize: 'text-sm' },
    { cls: { gridColumn: 'span 2', gridRow: 'span 1' }, i: 3, textSize: 'text-base' },
    { cls: { gridColumn: 'span 1', gridRow: 'span 1' }, i: 7, textSize: 'text-sm' },
    { cls: { gridColumn: 'span 1', gridRow: 'span 1' }, i: 8, textSize: 'text-sm' },
  ];

  return (
    <>
      <div
        className="hidden lg:grid gap-2"
        style={{
          gridTemplateColumns: 'repeat(6, 1fr)',
          gridTemplateRows: '200px 160px 160px',
          flex: 1,
        }}
      >
        {gridLayout.map(({ cls, i, textSize }) => (
          <div key={categories[i].id} style={cls}>
            <CategoryCard 
              category={categories[i]} 
              index={i} 
              onClick={onCategoryClick} 
              textSize={textSize} 
            />
          </div>
        ))}
      </div>

      {/* Desktop CTA */}
      <div className="hidden lg:flex justify-center pt-5">
        <OffsetGlowCTA
          label="Ver todo el catálogo"
          onClick={() => onCategoryClick('procesadores')}
          className="text-xs uppercase tracking-widest"
        />
      </div>
    </>
  );
};

export default DesktopGrid;
