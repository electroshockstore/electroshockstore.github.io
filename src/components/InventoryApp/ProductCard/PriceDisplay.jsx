// Componente para mostrar el precio
import { DollarSign } from 'lucide-react';

const formatPrice = (price) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0
  }).format(price);
};

const PriceDisplay = ({ price, category }) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-center gap-2 p-3 bg-green-50 rounded-xl border border-green-200">
        <DollarSign className="h-5 w-5 text-green-600" />
        <span className="text-lg font-black text-green-700">{formatPrice(price)}</span>
      </div>
      <div className="text-center">
        <span className="text-xs text-gray-500 font-medium">{category}</span>
      </div>
    </div>
  );
};

export default PriceDisplay;
