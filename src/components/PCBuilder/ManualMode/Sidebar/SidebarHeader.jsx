import { Zap } from 'lucide-react';
import WattMeter from './WattMeter';
import ComboWhatsAppButton from './ComboWhatsAppButton';
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
    <div className="flex-shrink-0 bg-slate-900 p-5 pb-[18px] relative overflow-hidden">
      {/* Decorative grid */}
      <div className="absolute inset-0 bg-grid-pattern-white-subtle" />

      {/* Decorative circle */}
      <div className="absolute -top-10 -right-10 w-[140px] h-[140px] rounded-full mesh-blob-blue-subtle" />

      {/* Title row */}
      <div className="relative flex items-start justify-between mb-[18px]">
        <div>
          <div className="flex items-center gap-[7px] mb-1">
            <div 
              className={`w-1.5 h-1.5 rounded-full ${selectedCount > 0 ? 'bg-green-500 pulse-dot-active' : 'bg-slate-600'}`}
            />
            <span className="text-[9px] font-semibold tracking-[0.1em] text-slate-500 font-sans uppercase">
              PC BUILDER
            </span>
          </div>
          <h2 className="m-0 text-[26px] font-black text-white tracking-tighter leading-none">
            Mi Combo
          </h2>
        </div>

        {/* Slots counter */}
        <div className="text-right">
          <div className="text-[32px] font-black text-white leading-none tracking-tighter">
            {String(selectedCount).padStart(2, '0')}
            <span className="text-sm text-slate-700 font-bold">
              /08
            </span>
          </div>
          <p className="mt-[3px] text-[9px] text-slate-600 font-sans tracking-wider font-semibold">
            SLOTS ACTIVOS
          </p>
        </div>
      </div>

      {/* Progress bar — segmented */}
      <div className="flex gap-[3px] mb-4">
        {CATEGORIES.map((cat) => {
          const comp = getComponent(cat.buildKey);
          const active = comp && (Array.isArray(comp) ? comp.length > 0 : true);
          
          return (
            <div
              key={cat.key}
              onClick={() => onCategoryChange(cat.key)}
              className={`flex-1 h-1 rounded cursor-pointer transition-all duration-300 ${
                active 
                  ? 'progress-segment-active' 
                  : selectedCategory === cat.key 
                    ? 'bg-slate-700' 
                    : 'bg-slate-800'
              }`}
            />
          );
        })}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-[10px] mb-3">
        {/* Wattage */}
        <div className="bg-slate-800 rounded-xl p-[10px_12px] border border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[9px] font-sans text-slate-500 tracking-[0.05em] font-semibold">
              WATTS
            </span>
            <Zap size={9} color={wattColor} fill={wattColor} />
          </div>
          <WattMeter totalWattage={totalWattage} percentage={percentage} />
          <p 
            className="m-0 mt-[6px] text-base font-black text-white tracking-tight"
            style={{ color: wattColor }}
          >
            {totalWattage}
            <span className="text-[10px] font-semibold text-slate-500">
              W
            </span>
          </p>
        </div>

        {/* Price */}
        <div className="bg-slate-800 rounded-xl p-[10px_12px] border border-slate-700">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[9px] font-sans text-slate-500 tracking-[0.05em] font-semibold">
              TOTAL ARS
            </span>
          </div>
          <p className="m-0 mt-1 text-[9px] text-slate-600 font-sans font-medium">
            invertido
          </p>
          <p 
            className="m-0 mt-[2px] font-black text-white tracking-tight"
            style={{
              fontSize: totalPrice >= 10000000 ? 13 : totalPrice >= 1000000 ? 15 : 18,
              lineHeight: 1.1,
            }}
          >
            ${totalPrice > 0 ? totalPrice.toLocaleString('es-AR') : '—'}
          </p>
        </div>
      </div>

      {/* WhatsApp Button - Reutilizando componente */}
      <ComboWhatsAppButton 
        selectedCount={selectedCount}
        pcBuild={pcBuild}
        totalPrice={totalPrice}
      />
    </div>
  );
};

export default SidebarHeader;
