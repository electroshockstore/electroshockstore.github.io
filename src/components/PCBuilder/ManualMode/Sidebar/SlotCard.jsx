import { Plus, Trash2 } from 'lucide-react';

/**
 * SlotCard - Tarjeta de componente individual
 * Single Responsibility: Mostrar un slot de componente
 */
const SlotCard = ({ category, component, isSelected, onClick, onRemove }) => {
  const isMultiple = Array.isArray(component) && component.length > 0;
  const displayComponent = isMultiple ? component[0] : component;
  const count = isMultiple ? component.length : 0;
  const filled = !!displayComponent;

  return (
    <div
      style={{
        position: 'relative',
        borderRadius: 12,
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        background: isSelected
          ? 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)'
          : filled
            ? '#FFFFFF'
            : '#F8FAFC',
        border: isSelected 
          ? '2px solid #0EA5E9' 
          : filled 
            ? '2px solid #E2E8F0' 
            : '2px dashed #CBD5E1',
        boxShadow: isSelected
          ? '0 4px 16px rgba(14,165,233,0.25)'
          : filled
            ? '0 2px 8px rgba(0,0,0,0.04)'
            : 'none',
      }}
      onClick={onClick}
      onMouseEnter={e => { 
        e.currentTarget.style.transform = 'translateY(-2px)'; 
        e.currentTarget.style.boxShadow = isSelected 
          ? '0 8px 24px rgba(14,165,233,0.35)' 
          : '0 4px 12px rgba(0,0,0,0.08)'; 
      }}
      onMouseLeave={e => { 
        e.currentTarget.style.transform = 'translateY(0)'; 
        e.currentTarget.style.boxShadow = isSelected 
          ? '0 4px 16px rgba(14,165,233,0.25)' 
          : filled ? '0 2px 8px rgba(0,0,0,0.04)' : 'none'; 
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', padding: '12px', gap: 12 }}>
        
        {/* Image Container */}
        <div style={{
          flexShrink: 0,
          width: 48,
          height: 48,
          borderRadius: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: filled ? '#FFFFFF' : '#F1F5F9',
          border: filled ? '2px solid #F1F5F9' : '2px dashed #CBD5E1',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {filled ? (
            <img
              src={displayComponent.images?.[0] || displayComponent.image}
              alt={displayComponent.name}
              style={{ 
                width: 36, 
                height: 36, 
                objectFit: 'contain',
                filter: isSelected ? 'brightness(1.1)' : 'none'
              }}
            />
          ) : (
            <span style={{ 
              fontSize: 10, 
              fontWeight: 700, 
              letterSpacing: '0.05em', 
              color: '#94A3B8', 
              fontFamily: "'Inter', sans-serif",
              textAlign: 'center'
            }}>
              {category.label}
            </span>
          )}

          {/* Count badge */}
          {isMultiple && count > 1 && (
            <div style={{
              position: 'absolute', 
              top: -4, 
              right: -4,
              width: 18, 
              height: 18, 
              borderRadius: '50%',
              background: '#F97316', 
              color: 'white',
              fontSize: 10, 
              fontWeight: 900,
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              border: '2px solid white',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              {count}
            </div>
          )}
        </div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {!filled ? (
            <>
              <p style={{ 
                margin: 0, 
                fontSize: 11, 
                fontWeight: 600, 
                color: '#64748B', 
                letterSpacing: '-0.01em',
                fontFamily: "'Inter', sans-serif"
              }}>
                {category.sublabel}
              </p>
              <p style={{ 
                margin: '2px 0 0', 
                fontSize: 9, 
                color: '#94A3B8', 
                fontFamily: "'Inter', sans-serif", 
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.03em'
              }}>
                {category.allowMultiple ? `Máx ×${category.maxCount}` : 'Vacío'}
              </p>
            </>
          ) : (
            <>
              <p style={{
                margin: 0, 
                fontSize: 9, 
                fontWeight: 600, 
                letterSpacing: '0.05em', 
                textTransform: 'uppercase',
                color: isSelected ? 'rgba(255,255,255,0.6)' : '#94A3B8',
                fontFamily: "'Inter', sans-serif",
              }}>
                {category.label}{isMultiple && count > 1 ? ` ×${count}` : ''}
              </p>
              <p style={{
                margin: '3px 0 0', 
                fontSize: 12, 
                fontWeight: 600, 
                color: isSelected ? 'white' : '#0F172A',
                overflow: 'hidden', 
                textOverflow: 'ellipsis', 
                whiteSpace: 'nowrap', 
                letterSpacing: '-0.01em',
                fontFamily: "'Inter', sans-serif",
                lineHeight: 1.3
              }}>
                {displayComponent.name}
              </p>
              <p style={{
                margin: '3px 0 0', 
                fontSize: 14, 
                fontWeight: 800,
                color: isSelected ? '#7DD3FC' : '#0EA5E9',
                letterSpacing: '-0.02em',
                fontFamily: "'Inter', sans-serif"
              }}>
                ${(displayComponent.price * (isMultiple ? count : 1)).toLocaleString('es-AR')}
              </p>
            </>
          )}
        </div>

        {/* Action Button */}
        {!filled ? (
          <div style={{
            width: 32, 
            height: 32, 
            borderRadius: 8, 
            flexShrink: 0,
            background: '#E2E8F0',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            transition: 'all 0.2s'
          }}>
            <Plus size={16} color="#64748B" strokeWidth={2.5} />
          </div>
        ) : (
          <button
            onClick={e => { e.stopPropagation(); onRemove(); }}
            style={{
              width: 32, 
              height: 32, 
              borderRadius: 8, 
              flexShrink: 0, 
              border: 'none', 
              cursor: 'pointer',
              background: isSelected ? 'rgba(239,68,68,0.15)' : '#FEE2E2',
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = isSelected ? 'rgba(239,68,68,0.3)' : '#FCA5A5';
              e.currentTarget.style.transform = 'scale(1.1) rotate(5deg)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = isSelected ? 'rgba(239,68,68,0.15)' : '#FEE2E2';
              e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
            }}
          >
            <Trash2 size={14} color={isSelected ? '#FCA5A5' : '#EF4444'} strokeWidth={2.5} />
          </button>
        )}
      </div>

      {/* Selected indicator line */}
      {isSelected && (
        <div style={{
          position: 'absolute', 
          bottom: 0, 
          left: 0, 
          right: 0, 
          height: 3,
          background: 'linear-gradient(90deg, #0EA5E9, #38BDF8, #7DD3FC)',
          boxShadow: '0 -2px 8px rgba(14,165,233,0.3)'
        }} />
      )}
    </div>
  );
};

export default SlotCard;
