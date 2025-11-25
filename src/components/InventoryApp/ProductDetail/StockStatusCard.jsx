// Card de estado de stock
const StockStatusCard = ({ stock, minStock, stockStatus }) => {
  const StatusIcon = stockStatus.icon;
  const stockPercentage = Math.min((stock / (minStock * 3)) * 100, 100);

  return (
    <div
      className={`${stockStatus.bgColor} rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 border-2 border-transparent hover:border-gray-200 transition-all duration-300`}
    >
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <div
            className={`p-2 sm:p-3 bg-white rounded-lg sm:rounded-xl shadow-md ${stockStatus.glowColor}`}
          >
            <StatusIcon className={`h-5 w-5 sm:h-6 sm:w-6 ${stockStatus.iconColor}`} />
          </div>
          <div>
            <span className={`font-black text-base sm:text-xl ${stockStatus.textColor} block`}>
              {stockStatus.text}
            </span>
            <span className="text-xs sm:text-sm text-gray-600 font-medium">
              Mín: {minStock}
            </span>
          </div>
        </div>
        <div className="text-right">
          <div className={`text-3xl sm:text-5xl font-black ${stockStatus.textColor}`}>
            {stock}
          </div>
        </div>
      </div>

      {/* Barra de progreso animada */}
      <div className="relative">
        <div className="w-full bg-white/50 rounded-full h-3 overflow-hidden shadow-inner">
          <div
            className={`h-3 ${stockStatus.progressColor} rounded-full transition-all duration-1000 ease-out relative overflow-hidden`}
            style={{ width: `${stockPercentage}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockStatusCard;
