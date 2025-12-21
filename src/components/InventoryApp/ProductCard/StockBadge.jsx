const StockBadge = ({ stock, stockStatus, isUsed }) => {
  if (isUsed) {
    return (
      <div className="absolute top-4 right-4 px-3 py-1.5 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 
                     shadow-lg border-2 border-white flex items-center justify-center transform rotate-3
                     group-hover:rotate-0 group-hover:scale-110 transition-all duration-300">
        <span className="text-white font-black text-xs uppercase tracking-wide">Usada</span>
      </div>
    );
  }

  return (
    <div className={`absolute top-4 right-4 w-14 h-14 rounded-xl bg-gradient-to-br ${stockStatus.color} 
                   shadow-lg border-2 border-white flex items-center justify-center transform rotate-6
                   group-hover:rotate-0 group-hover:scale-110 transition-all duration-300`}>
      <span className="text-white font-black text-lg">{stock}</span>
    </div>
  );
};

export default StockBadge;
