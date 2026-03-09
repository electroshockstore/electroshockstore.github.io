import { memo } from 'react';
import { Package, Percent } from 'lucide-react';

const MayoristaPricing = memo(({ unitPrice, totalPrice, quantity, savings }) => {
  return (
    <div className="space-y-3">
      {/* Header compacto - Info del pack */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span className="flex items-center gap-1.5">
          <Package className="w-3.5 h-3.5" />
          Pack de {quantity} unidades
        </span>
        <span className="font-mono">${unitPrice.toLocaleString('es-AR')}/u</span>
      </div>

      {/* Precio principal - Grande y limpio */}
      <div className="space-y-1">
        <div className="flex items-baseline gap-1">
          <span className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">
            ${totalPrice.toLocaleString('es-AR')}
          </span>
        </div>
        <p className="text-xs text-gray-500">Precio total del pack</p>
      </div>

      {/* Ahorro - Minimalista pero claro */}
      <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-green-50 rounded-full">
          <Percent className="w-3 h-3 text-green-600" />
          <span className="text-xs font-semibold text-green-700">
            -{savings.percentage}%
          </span>
        </div>
        <span className="text-sm text-gray-600">
          Ahorrás <span className="font-semibold text-green-600">${savings.amount.toLocaleString('es-AR')}</span>
        </span>
      </div>
    </div>
  );
});

MayoristaPricing.displayName = 'MayoristaPricing';
export default MayoristaPricing;
