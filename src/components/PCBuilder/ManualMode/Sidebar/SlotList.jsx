import { useRef, useState, useEffect } from 'react';
import SlotCard from './SlotCard';
import { CATEGORIES } from './constants';

/**
 * SlotList - Lista de slots de componentes
 * Single Responsibility: Renderizar la lista de componentes
 */
const SlotList = ({ selectedCategory, getComponent, onCategoryChange, onRemove }) => {
  const scrollRef = useRef(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      if (scrollRef.current) {
        const { scrollHeight, clientHeight, scrollTop } = scrollRef.current;
        const hasScroll = scrollHeight > clientHeight;
        const isAtBottom = scrollHeight - scrollTop - clientHeight < 10;
        setShowScrollIndicator(hasScroll && !isAtBottom);
      }
    };

    checkScroll();
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
    }

    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener('scroll', checkScroll);
      }
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  return (
    <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0, overflow: 'hidden' }}>
      <div
        ref={scrollRef}
        className="sidebar-scroll"
        style={{ 
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          padding: '12px',
          paddingBottom: '60px',
          minHeight: 0
        }}
      >
        {/* Section label */}
        <p style={{
          margin: '0 0 4px 4px', 
          fontSize: 9, 
          fontWeight: 700,
          letterSpacing: '0.08em', 
          color: '#94A3B8', 
          textTransform: 'uppercase',
          fontFamily: "'Inter', sans-serif",
        }}>
          — Componentes
        </p>

        {/* Cards container */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {CATEGORIES.map((category, idx) => (
            <div
              key={category.key}
              className="slot-card"
              style={{ animationDelay: `${idx * 40}ms` }}
            >
              <SlotCard
                category={category}
                component={getComponent(category.buildKey)}
                isSelected={selectedCategory === category.key}
                onClick={() => onCategoryChange(category.key)}
                onRemove={() => onRemove(category.key)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator - only shows when there's more content below */}
      {showScrollIndicator && (
        <div 
          className="scroll-indicator"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 40,
            background: 'linear-gradient(to top, #F8FAFC 0%, transparent 100%)',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            paddingBottom: 8
          }}
        >
          <div style={{
            display: 'flex',
            gap: 2,
            animation: 'bounce 2s infinite'
          }}>
            <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#94A3B8' }} />
            <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#94A3B8' }} />
            <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#94A3B8' }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SlotList;
