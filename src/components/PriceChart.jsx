import { lazy, Suspense } from 'react';
import { usePriceHistory } from '../hooks/usePriceHistory';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

/**
 * Gráfico de histórico de precios - Moderno y grande
 */
export function PriceChart({ productId }) {
  const { history, loading, error } = usePriceHistory(productId);

  if (loading || error || !history || history.data.length < 1) {
    return null;
  }

  const { data, priceChange, priceChangePercent } = history;

  // Preparar datos
  const chartData = data.map(d => ({
    fecha: d.formattedDate.split(' ').slice(0, 2).join(' '),
    precio: d.price
  }));

  if (chartData.length === 1) {
    chartData.push({ ...chartData[0] });
  }

  // Colores
  const isPositive = priceChange > 0;
  const isNeutral = priceChange === 0 || data.length === 1;
  const lineColor = isNeutral ? '#64748b' : (isPositive ? '#ef4444' : '#10b981');
  
  const formatPrice = (value) => `$${(value / 1000).toFixed(0)}k`;

  const TrendIcon = isNeutral ? Minus : (isPositive ? TrendingUp : TrendingDown);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header moderno */}
      <div className="bg-gradient-to-br from-gray-50 to-white px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">
             Histórico de Precios
          </h3>
          
          {/* Badge grande y atractivo */}
          {!isNeutral && (
            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-base shadow-md ${
              isPositive 
                ? 'bg-gradient-to-r from-red-500 to-red-600 text-white' 
                : 'bg-gradient-to-r from-green-500 to-green-600 text-white'
            }`}>
              <TrendIcon className="w-5 h-5" />
              <span>{Math.abs(priceChangePercent)}%</span>
            </div>
          )}
          
          {isNeutral && (
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-base bg-gradient-to-r from-gray-400 to-gray-500 text-white shadow-md">
              <Minus className="w-5 h-5" />
              <span>Sin cambios</span>
            </div>
          )}
        </div>
      </div>

      {/* Gráfico grande */}
      <div className="p-6 bg-gradient-to-br from-gray-50 to-white">
        <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
              <defs>
                <linearGradient id={`gradient-${productId}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={lineColor} stopOpacity={0.4}/>
                  <stop offset="95%" stopColor={lineColor} stopOpacity={0.05}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis 
                dataKey="fecha" 
                tick={{ fontSize: 12, fill: '#6b7280', fontWeight: 500 }}
                stroke="#d1d5db"
                tickLine={false}
              />
              <YAxis 
                tickFormatter={formatPrice}
                tick={{ fontSize: 12, fill: '#6b7280', fontWeight: 500 }}
                stroke="#d1d5db"
                tickLine={false}
                width={60}
              />
              <Tooltip 
                formatter={(value) => [`$${value.toLocaleString('es-AR')}`, 'Precio']}
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '2px solid #e5e7eb',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: '600',
                  padding: '12px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                labelStyle={{ fontWeight: 'bold', color: '#374151' }}
              />
              <Area 
                type="stepAfter" 
                dataKey="precio" 
                stroke={lineColor} 
                strokeWidth={3}
                fill={`url(#gradient-${productId})`}
                dot={{ 
                  fill: lineColor, 
                  strokeWidth: 3, 
                  r: 5, 
                  stroke: 'white',
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                }}
                activeDot={{ 
                  r: 7,
                  strokeWidth: 3,
                  filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.2))'
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
      </div>
    </div>
  );
}
