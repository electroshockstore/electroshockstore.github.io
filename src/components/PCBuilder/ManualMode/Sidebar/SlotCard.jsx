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
      className={`relative rounded-xl overflow-hidden cursor-pointer transition-all duration-200 ${
        !filled 
          ? 'bg-slate-50 border-2 border-dashed border-slate-300' 
          : isSelected 
            ? 'border-2 border-sky-500 slot-card-selected-bg slot-card-selected-shadow hover:slot-card-selected-shadow-hover' 
            : 'bg-white border-2 border-slate-200 slot-card-filled-shadow hover:slot-card-filled-shadow-hover'
      } hover:-translate-y-0.5`}
      onClick={onClick}
    >
      <div className="flex items-center p-3 gap-3">
        
        {/* Image Container */}
        <div className={`flex-shrink-0 w-12 h-12 rounded-[10px] flex items-center justify-center relative overflow-hidden ${
          filled ? 'bg-white border-2 border-slate-100' : 'bg-slate-100 border-2 border-dashed border-slate-300'
        }`}>
          {filled ? (
            <img
              src={displayComponent.images?.[0] || displayComponent.image}
              alt={displayComponent.name}
              className="w-9 h-9 object-contain"
              style={{ filter: isSelected ? 'brightness(1.1)' : 'none' }}
            />
          ) : (
            <span className="text-[10px] font-bold tracking-[0.05em] text-slate-400 font-sans text-center">
              {category.label}
            </span>
          )}

          {/* Count badge */}
          {isMultiple && count > 1 && (
            <div className="absolute -top-1 -right-1 w-[18px] h-[18px] rounded-full bg-orange-500 text-white text-[10px] font-black flex items-center justify-center border-2 border-white shadow-sm">
              {count}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          {!filled ? (
            <>
              <p className="m-0 text-xs font-semibold text-slate-500">
                {category.sublabel}
              </p>
              <p className="m-0 mt-[2px] text-[9px] text-slate-400 font-sans font-medium uppercase tracking-[0.03em]">
                {category.allowMultiple ? `Máx ×${category.maxCount}` : 'Vacío'}
              </p>
            </>
          ) : (
            <>
              <p className={`m-0 text-[9px] font-semibold tracking-[0.05em] uppercase font-sans ${
                isSelected ? 'text-white/60' : 'text-slate-500'
              }`}>
                {category.label}{isMultiple && count > 1 ? ` ×${count}` : ''}
              </p>
              <p className={`m-0 mt-[3px] text-xs font-semibold truncate tracking-tight font-sans leading-tight ${
                isSelected ? 'text-white' : 'text-slate-900'
              }`}>
                {displayComponent.name}
              </p>
              <p className={`m-0 mt-[3px] text-sm font-extrabold tracking-tight font-sans ${
                isSelected ? 'text-sky-300' : 'text-sky-500'
              }`}>
                ${(displayComponent.price * (isMultiple ? count : 1)).toLocaleString('es-AR')}
              </p>
            </>
          )}
        </div>

        {/* Action Button */}
        {!filled ? (
          <div className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center transition-all duration-200 bg-slate-200">
            <Plus size={16} color="#64748B" strokeWidth={2.5} />
          </div>
        ) : (
          <button
            onClick={e => { e.stopPropagation(); onRemove(); }}
            className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center transition-all duration-200 border-none cursor-pointer ${
              isSelected ? 'bg-red-500/15 hover:bg-red-500/30' : 'bg-red-50 hover:bg-red-200'
            } hover:scale-110 hover:rotate-[5deg]`}
          >
            <Trash2 size={14} color={isSelected ? '#FCA5A5' : '#EF4444'} strokeWidth={2.5} />
          </button>
        )}
      </div>

      {/* Selected indicator line */}
      {isSelected && (
        <div className="absolute bottom-0 left-0 right-0 h-[3px] slot-indicator-gradient" />
      )}
    </div>
  );
};

export default SlotCard;
