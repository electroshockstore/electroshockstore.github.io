/**
 * ComboWhatsAppButton - Botón específico para consultar combo de PC Builder
 * Single Responsibility: Enviar combo completo por WhatsApp
 * Diferente de Shared/WhatsAppButton que es para productos individuales
 */
const ComboWhatsAppButton = ({ selectedCount, pcBuild, totalPrice }) => {
  const handleClick = () => {
    const components = Object.entries(pcBuild)
      .filter(([_, value]) => value && (Array.isArray(value) ? value.length > 0 : true))
      .map(([, value]) => {
        const item = Array.isArray(value) ? value[0] : value;
        return `• ${item.name}`;
      })
      .join('%0A');
    
    const message = `¡Hola! Quiero este combo de PC:%0A%0A${components}%0A%0ATotal: ${totalPrice.toLocaleString('es-AR')}%0A%0A¿Está disponible?`;
    window.open(`https://wa.me/5491125718382?text=${message}`, '_blank');
  };

  return (
    <div style={{
      flexShrink: 0,
      padding: '12px',
      background: '#F8FAFC',
      borderTop: '1px solid #E2E8F0',
    }}>
      <button
        onClick={handleClick}
        disabled={selectedCount === 0}
        style={{
          width: '100%',
          padding: '13px 18px',
          borderRadius: 14,
          border: 'none',
          cursor: selectedCount === 0 ? 'not-allowed' : 'pointer',
          fontFamily: "'Inter', sans-serif",
          fontWeight: 800,
          fontSize: 13,
          letterSpacing: '-0.01em',
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: 8,
          transition: 'all 0.2s ease',
          position: 'relative',
          overflow: 'hidden',
          ...(selectedCount === 0
            ? { background: '#F1F5F9', color: '#CBD5E1' }
            : {
                background: '#0F172A',
                color: 'white',
                boxShadow: '0 4px 20px rgba(15,23,42,0.25)',
              }
          ),
        }}
        onMouseEnter={e => { 
          if (selectedCount > 0) { 
            e.currentTarget.style.transform = 'translateY(-2px)'; 
            e.currentTarget.style.boxShadow = '0 8px 28px rgba(15,23,42,0.3)'; 
          } 
        }}
        onMouseLeave={e => { 
          e.currentTarget.style.transform = 'translateY(0)'; 
          e.currentTarget.style.boxShadow = selectedCount > 0 ? '0 4px 20px rgba(15,23,42,0.25)' : 'none'; 
        }}
      >
        {selectedCount > 0 && (
          <div style={{
            position: 'absolute', 
            top: 0, 
            left: 0, 
            bottom: 0,
            width: `${(selectedCount / 8) * 100}%`,
            background: 'linear-gradient(90deg, rgba(14,165,233,0.15), transparent)',
            transition: 'width 0.5s ease',
          }} />
        )}
        <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24" style={{ flexShrink: 0, position: 'relative' }}>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.785"/>
        </svg>
        <span style={{ position: 'relative' }}>
          {selectedCount === 0 ? 'Seleccioná un componente' : 'Consultar por WhatsApp'}
        </span>
      </button>
    </div>
  );
};

export default ComboWhatsAppButton;
