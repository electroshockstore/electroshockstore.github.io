const StockStatus = ({ stockStatus }) => {
  return (
    <div className={`hidden sm:flex absolute top-4 left-4 px-4 py-2 rounded-full
                   bg-white border-2 border-gray-200 shadow-md items-center gap-2
                   ${stockStatus.textColor} font-bold text-xs transform 
                   group-hover:scale-110 transition-transform duration-300`}>
      <div className={`w-2.5 h-2.5 rounded-full bg-gradient-to-r ${stockStatus.color} animate-pulse`}></div>
      {stockStatus.text}
    </div>
  );
};

export default StockStatus;
