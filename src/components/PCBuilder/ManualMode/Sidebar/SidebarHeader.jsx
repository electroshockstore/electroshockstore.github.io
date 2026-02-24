import { Zap } from 'lucide-react';
import WattMeter from './WattMeter';
import { CATEGORIES } from './constants';

/**
 * SidebarHeader - Cabecera del sidebar con estadísticas
 * Single Responsibility: Mostrar información general del build
 */
const SidebarHeader = ({ 
  selectedCount, 
  totalPrice, 
  totalWattage, 
  percentage, 
  wattColor,
  pcBuild,
  getComponent,
  selectedCategory,
  onCategoryChange 
}) => {
  return (
    <div 
      style={{
        flexShrink: 0,
        background: '#0F172A',
        padding: '20px 18px 18px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative grid */}
      <div 
        style={{
          position: 'absolute', 
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px',
        }} 
      />

      {/* Decorative circle */}
      <div 
        style={{
          position: 'absolute', 
          top: -40, 
          right: -40,
          width: 140, 
          height: 140, 
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(14,165,233,0.15) 0%, transparent 70%)',
        }} 
      />

      {/* Title row */}
      <div 
        style={{ 
          position: 'relative', 
          display: 'flex', 
          alignItems: 'flex-start', 
          justifyContent: 'space-between', 
          marginBottom: 18 
        }}
      >
        <div>
          <div 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 7, 
              marginBottom: 4 
            }}
          >
            <div 
              style={{
                width: 6, 
                height: 6, 
                borderRadius: '50%',
                background: selectedCount > 0 ? '#22C55E' : '#475569',
                animation: selectedCount > 0 ? 'pulse-dot 2s infinite' : 'none',
              }} 
            />
            <span 
              style={{ 
                fontSize: 9, 
                fontWeight: 600, 
                letterSpacing: '0.1em', 
                color: '#64748B', 
                fontFamily: "'Inter', sans-serif", 
                textTransform: 'uppercase' 
              }}
            >
              PC BUILDER
            </span>
          </div>
          <h2 
            style={{ 
              margin: 0, 
              fontSize: 26, 
              fontWeight: 900, 
              color: 'white', 
              letterSpacing: '-0.04em', 
              lineHeight: 1 
            }}
          >
            Mi Combo
          </h2>
        </div>

        {/* Slots counter */}
        <div style={{ textAlign: 'right' }}>
          <div 
            style={{ 
              fontSize: 32, 
              fontWeight: 900, 
              color: 'white', 
              lineHeight: 1, 
              letterSpacing: '-0.05em' 
            }}
          >
            {String(selectedCount).padStart(2, '0')}
            <span 
              style={{ 
                fontSize: 14, 
                color: '#334155', 
                fontWeight: 700 
              }}
            >
              /08
            </span>
          </div>
          <p 
            style={{ 
              margin: '3px 0 0', 
              fontSize: 9, 
              color: '#475569', 
              fontFamily: "'Inter', sans-serif", 
              letterSpacing: '0.05em',
              fontWeight: 600
            }}
          >
            SLOTS ACTIVOS
          </p>
        </div>
      </div>

      {/* Progress bar — segmented */}
      <div 
        style={{ 
          display: 'flex', 
          gap: 3, 
          marginBottom: 16 
        }}
      >
        {CATEGORIES.map((cat) => {
          const comp = getComponent(cat.buildKey);
          const active = comp && (Array.isArray(comp) ? comp.length > 0 : true);
          
          return (
            <div
              key={cat.key}
              onClick={() => onCategoryChange(cat.key)}
              style={{
                flex: 1, 
                height: 4, 
                borderRadius: 4, 
                cursor: 'pointer',
                background: active
                  ? 'linear-gradient(90deg, #0EA5E9, #38BDF8)'
                  : selectedCategory === cat.key
                    ? '#334155'
                    : '#1E293B',
                transition: 'background 0.3s ease',
                boxShadow: active ? '0 0 6px rgba(14,165,233,0.5)' : 'none',
              }}
            />
          );
        })}
      </div>

      {/* Stats row */}
      <div 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: 10,
          marginBottom: 12
        }}
      >
        {/* Wattage */}
        <div 
          style={{
            background: '#1E293B', 
            borderRadius: 12, 
            padding: '10px 12px',
            border: '1px solid #334155',
          }}
        >
          <div 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              marginBottom: 8 
            }}
          >
            <span 
              style={{ 
                fontSize: 9, 
                fontFamily: "'Inter', sans-serif", 
                color: '#64748B', 
                letterSpacing: '0.05em',
                fontWeight: 600
              }}
            >
              WATTS
            </span>
            <Zap size={9} color={wattColor} fill={wattColor} />
          </div>
          <WattMeter totalWattage={totalWattage} percentage={percentage} />
          <p 
            style={{ 
              margin: '6px 0 0', 
              fontSize: 16, 
              fontWeight: 900, 
              color: wattColor, 
              letterSpacing: '-0.03em' 
            }}
          >
            {totalWattage}
            <span 
              style={{ 
                fontSize: 10, 
                fontWeight: 600, 
                color: '#64748B' 
              }}
            >
              W
            </span>
          </p>
        </div>

        {/* Price */}
        <div 
          style={{
            background: '#1E293B', 
            borderRadius: 12, 
            padding: '10px 12px',
            border: '1px solid #334155',
          }}
        >
          <div 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              marginBottom: 4 
            }}
          >
            <span 
              style={{ 
                fontSize: 9, 
                fontFamily: "'Inter', sans-serif", 
                color: '#64748B', 
                letterSpacing: '0.05em',
                fontWeight: 600
              }}
            >
              TOTAL ARS
            </span>
          </div>
          <p 
            style={{ 
              margin: '4px 0 0', 
              fontSize: 9, 
              color: '#475569', 
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500
            }}
          >
            invertido
          </p>
          <p 
            style={{
              margin: '2px 0 0', 
              fontWeight: 900, 
              color: 'white', 
              letterSpacing: '-0.04em',
              fontSize: totalPrice >= 10000000 ? 13 : totalPrice >= 1000000 ? 15 : 18,
              lineHeight: 1.1,
            }}
          >
            ${totalPrice > 0 ? totalPrice.toLocaleString('es-AR') : '—'}
          </p>
        </div>
      </div>

      {/* WhatsApp Button */}
      <button
        onClick={() => {
          const components = Object.entries(pcBuild)
            .filter(([_, value]) => value && (Array.isArray(value) ? value.length > 0 : true))
            .map(([, value]) => {
              const item = Array.isArray(value) ? value[0] : value;
              return `• ${item.name}`;
            })
            .join('%0A');
          
          const message = `¡Hola! Quiero este combo de PC:%0A%0A${components}%0A%0ATotal: ${totalPrice.toLocaleString('es-AR')}%0A%0A¿Está disponible?`;
          window.open(`https://wa.me/5491125718382?text=${message}`, '_blank');
        }}
        disabled={selectedCount < 2}
        style={{
          width: '100%',
          padding: '11px 14px',
          borderRadius: 12,
          border: 'none',
          cursor: selectedCount < 2 ? 'not-allowed' : 'pointer',
          fontFamily: "'Inter', sans-serif",
          fontWeight: 800,
          fontSize: 12,
          letterSpacing: '-0.01em',
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: 7,
          transition: 'all 0.2s ease',
          position: 'relative',
          overflow: 'hidden',
          ...(selectedCount < 2
            ? { background: '#1E293B', color: '#475569', border: '1px solid #334155' }
            : {
                background: 'linear-gradient(135deg, #25D366, #128C7E)',
                color: 'white',
                boxShadow: '0 4px 16px rgba(37,211,102,0.3)',
              }
          ),
        }}
        onMouseEnter={e => { 
          if (selectedCount >= 2) { 
            e.currentTarget.style.transform = 'translateY(-1px)'; 
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(37,211,102,0.4)'; 
          } 
        }}
        onMouseLeave={e => { 
          e.currentTarget.style.transform = 'translateY(0)'; 
          e.currentTarget.style.boxShadow = selectedCount >= 2 ? '0 4px 16px rgba(37,211,102,0.3)' : 'none'; 
        }}
      >
        {selectedCount >= 2 && (
          <div style={{
            position: 'absolute', 
            top: 0, 
            left: 0, 
            bottom: 0,
            width: `${(selectedCount / 8) * 100}%`,
            background: 'linear-gradient(90deg, rgba(255,255,255,0.15), transparent)',
            transition: 'width 0.5s ease',
          }} />
        )}
        <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24" style={{ flexShrink: 0, position: 'relative' }}>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.785"/>
        </svg>
        <span style={{ position: 'relative' }}>
          {selectedCount < 2 ? 'Seleccioná al menos 2' : 'Quiero este combo'}
        </span>
      </button>
    </div>
  );
};

export default SidebarHeader;
