import { usePriceHistory } from '../hooks/usePriceHistory';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';

/**
 * Gráfico de histórico de precios - Moderno, atractivo y fácil de leer
 */
export function PriceChart({ productId }) {
  const { history, loading, error } = usePriceHistory(productId);

  if (loading || error || !history || history.data.length < 1) {
    return null;
  }

  const { data, priceChange, priceChangePercent } = history;

  // Preparar datos con formato mejorado
  const chartData = data.map((d, index) => ({
    fecha: d.formattedDate.split(' ').slice(0, 2).join(' '),
    fechaCompleta: d.formattedDate,
    precio: d.price,
    index: index
  }));

  // Si solo hay un punto, duplicarlo para mostrar línea recta
  if (chartData.length === 1) {
    chartData.push({
      ...chartData[0],
      fecha: 'Actual',
      index: 1
    });
  }

  // Calcular min y max para el dominio del eje Y con padding
  const prices = chartData.map(d => d.precio);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const padding = (maxPrice - minPrice) * 0.1 || maxPrice * 0.05; // 10% padding o 5% si son iguales
  const yMin = Math.floor((minPrice - padding) / 1000) * 1000;
  const yMax = Math.ceil((maxPrice + padding) / 1000) * 1000;

  // Colores según tendencia
  const isPositive = priceChange > 0;
  const isNeutral = priceChange === 0;
  const lineColor = isNeutral ? '#3b82f6' : (isPositive ? '#ef4444' : '#10b981');
  const gradientColor = isNeutral ? '#3b82f6' : (isPositive ? '#ef4444' : '#10b981');
  
  const formatPrice = (value) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}k`;
    return `$${value}`;
  };

  const TrendIcon = isNeutral ? Minus : (isPositive ? TrendingUp : TrendingDown);

  // Precio promedio para línea de referencia
  const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Header moderno */}
      <div className="bg-gradient-to-br from-gray-50 to-white px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h3 className="text-lg font-bold text-gray-900">
            Histórico de Precios
          </h3>
          
          <div className="flex items-center gap-3">
            {/* Precio actual */}
            <div className="text-right">
              <div className="text-xs text-gray-500 font-medium">Precio Actual</div>
              <div className="text-xl font-bold text-gray-900">
                ${data[data.length - 1].price.toLocaleString('es-AR')}
              </div>
            </div>
            
            {/* Badge de cambio - solo icono */}
            {!isNeutral && (
              <div className={`flex items-center justify-center p-3 rounded-xl shadow-md ${
                isPositive 
                  ? 'bg-gradient-to-r from-red-500 to-red-600 text-white' 
                  : 'bg-gradient-to-r from-green-500 to-green-600 text-white'
              }`}>
                <TrendIcon className="w-6 h-6" />
              </div>
            )}
            
            {isNeutral && (
              <div className="flex items-center justify-center p-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md">
                <Minus className="w-6 h-6" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Gráfico grande y atractivo */}
      <div className="p-6 bg-gradient-to-br from-gray-50 to-white">
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={chartData} margin={{ top: 20, right: 20, left: 10, bottom: 20 }}>
            <defs>
              <linearGradient id={`gradient-${productId}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={gradientColor} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={gradientColor} stopOpacity={0.05}/>
              </linearGradient>
            </defs>
            
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
            
            <XAxis 
              dataKey="fecha" 
              tick={{ fontSize: 13, fill: '#6b7280', fontWeight: 500 }}
              stroke="#d1d5db"
              tickLine={false}
              angle={-15}
              textAnchor="end"
              height={60}
            />
            
            <YAxis 
              domain={[yMin, yMax]}
              tickFormatter={formatPrice}
              tick={{ fontSize: 13, fill: '#6b7280', fontWeight: 600 }}
              stroke="#d1d5db"
              tickLine={false}
              width={70}
            />
            
            {/* Línea de referencia del promedio */}
            <ReferenceLine 
              y={avgPrice} 
              stroke="#9ca3af" 
              strokeDasharray="5 5"
              label={{ 
                value: 'Promedio', 
                position: 'right',
                fill: '#6b7280',
                fontSize: 12,
                fontWeight: 600
              }}
            />
            
            <Tooltip 
              formatter={(value) => [`$${value.toLocaleString('es-AR')}`, 'Precio']}
              labelFormatter={(label, payload) => {
                if (payload && payload[0]) {
                  return payload[0].payload.fechaCompleta;
                }
                return label;
              }}
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '2px solid #e5e7eb',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: '600',
                padding: '12px 16px',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
              }}
              labelStyle={{ fontWeight: 'bold', color: '#374151', marginBottom: '4px' }}
            />
            
            <Area 
              type="monotone"
              dataKey="precio" 
              stroke={lineColor} 
              strokeWidth={3}
              fill={`url(#gradient-${productId})`}
              dot={{ 
                fill: lineColor, 
                strokeWidth: 2, 
                r: 5, 
                stroke: 'white'
              }}
              activeDot={{ 
                r: 8,
                strokeWidth: 3,
                stroke: 'white',
                fill: lineColor,
                filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.2))'
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
