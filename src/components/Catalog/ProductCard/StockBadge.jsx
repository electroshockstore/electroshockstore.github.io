const StockBadge = ({ stock, stockStatus, isUsed }) => {
  if (isUsed) {
    return (
      <div className="absolute top-2 right-2 sm:top-4 sm:right-4 px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg sm:rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 
                     shadow-lg border sm:border-2 border-white flex items-center justify-center transform rotate-3
                     group-hover:rotate-0 group-hover:scale-110 transition-all duration-300">
        <span className="text-white font-black text-[10px] sm:text-xs uppercase tracking-wide">Usada</span>
      </div>
    );
  }

  return (
    <div className={`absolute top-2 right-2 sm:top-4 sm:right-4 w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-gradient-to-br ${stockStatus.color} 
                   shadow-lg border sm:border-2 border-white flex items-center justify-center transform rotate-6
                   group-hover:rotate-0 group-hover:scale-110 transition-all duration-300`}>
      <span className="text-white font-black text-sm sm:text-lg">{stock}</span>
    </div>
  );
};

export default StockBadge;
