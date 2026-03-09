import { memo, useMemo } from 'react';
import CardImage from './CardImage';
import CardContent from './CardContent';

const RevendedoresCard = memo(({ product, onClick, index = 0, horizontal = false }) => {
  const savings = useMemo(() => {
    const totalRegular = product.unitPrice * product.quantity;
    const discount = totalRegular - product.price;
    const pct = ((discount / totalRegular) * 100).toFixed(0);
    return { amount: discount, percentage: pct };
  }, [product]);

  const fixedImages = [
    '/images/category_filter/pandora2_mayor.webp',
    '/images/category_filter/kumara_mayor.webp',
    '/images/category_filter/g203_mayor.webp',
  ];

  const displayImage = fixedImages[index] || fixedImages[0];

  const accents = ['#f59e0b', '#3b82f6', '#10b981', '#f97316', '#8b5cf6'];
  const accent = accents[index % accents.length];

  return (
    <article className="group relative flex flex-col rev-card w-full">
      <div
        className={`relative flex overflow-hidden rounded-xl bg-[#0b0b0d] ${
          horizontal ? 'flex-row h-auto' : 'flex-col h-full'
        }`}
        style={{
          transform: 'translateY(-4px)',
          boxShadow: `0 20px 60px rgba(0,0,0,0.8), 0 0 60px ${accent}35, 0 0 0 1px ${accent}60`,
          borderColor: `${accent}70`,
          border: '1px solid',
        }}
      >
        {/* Accent line top */}
        <div
          className={horizontal ? 'w-1 h-full' : 'h-1 w-full'}
          style={{ background: `linear-gradient(${horizontal ? 'to bottom' : 'to right'}, transparent 5%, ${accent} 40%, transparent 95%)` }}
        />

        <CardImage
          image={displayImage}
          alt={product.name}
          accent={accent}
          quantity={product.quantity}
          discountPercentage={savings.percentage}
          horizontal={horizontal}
        />

        <CardContent
          brand={product.brand}
          quantity={product.quantity}
          name={product.name}
          accent={accent}
          savings={savings.amount}
          onClick={onClick}
          horizontal={horizontal}
        />

        {/* Bottom/Right accent */}
        <div
          className={horizontal ? 'w-1 h-full' : 'h-1 w-full'}
          style={{ background: `linear-gradient(${horizontal ? 'to bottom' : 'to right'}, transparent 5%, ${accent} 40%, transparent 95%)` }}
        />
      </div>
    </article>
  );
});

RevendedoresCard.displayName = 'RevendedoresCard';
export default RevendedoresCard;