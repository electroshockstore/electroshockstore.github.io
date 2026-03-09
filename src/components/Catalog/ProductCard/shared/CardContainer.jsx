import { memo } from 'react';
import useScrollReveal from '../../../../hooks/useScrollReveal';

const CardContainer = memo(({ 
  children, 
  onClick, 
  index = 0, 
  isFeatured = false,
  className = '' 
}) => {
  const revealRef = useScrollReveal({ 
    threshold: 0.1, 
    rootMargin: '50px',
    delay: Math.min(index * 50, 300)
  });

  return (
    <div 
      ref={revealRef}
      onClick={onClick}
      className={`product-card-reveal group relative bg-white rounded-xl sm:rounded-2xl 
                 ${isFeatured ? 'border-0' : 'border border-gray-100 hover:border-blue-500/30'}
                 hover:shadow-2xl hover:shadow-blue-500/10
                 shadow-[0_4px_12px_-2px_rgba(0,0,0,0.08),0_2px_6px_-1px_rgba(0,0,0,0.06)]
                 hover:shadow-[0_20px_40px_-8px_rgba(0,0,0,0.12),0_8px_16px_-4px_rgba(59,130,246,0.15)]
                 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col h-full
                 active:scale-[0.98] sm:active:scale-100 ${className}`}
    >
      {/* Top gradient accent line */}
      <div className="product-card-accent absolute top-0 left-0 right-0 h-[2px] z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

      {/* Featured glow corners */}
      {isFeatured && (
        <>
          <div className="featured-glow-tl absolute top-0 left-0 w-16 h-16 pointer-events-none z-10" />
          <div className="featured-glow-br absolute bottom-0 right-0 w-20 h-20 pointer-events-none z-10" />
        </>
      )}

      {children}
    </div>
  );
});

CardContainer.displayName = 'CardContainer';
export default CardContainer;
