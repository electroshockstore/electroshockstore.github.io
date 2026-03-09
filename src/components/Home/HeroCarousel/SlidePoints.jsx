const SlidePoints = ({ slide, isVisible, isIOS }) => {
  return (
    <div 
      className={`grid grid-cols-2 gap-x-2 gap-y-1 sm:grid-cols-3 sm:gap-4 md:gap-5 lg:gap-6 ${isVisible && !isIOS ? 'animate-fade-in delay-200' : ''}`}
    >
      {slide.points.map((point, idx) => (
        <div
          key={idx}
          className="flex items-center gap-1 sm:gap-3 group"
        >
          <div className="flex-shrink-0">
            <div className={`w-3 h-3 sm:w-7 sm:h-7 md:w-8 md:h-8 ${point.highlight ? 'bg-red-600' : 'bg-white'} flex items-center justify-center font-black text-black sm:shadow-[4px_4px_0px_rgba(0,0,0,0.8)]`}>
              {point.highlight ? (
                <span className="text-white text-[8px] sm:text-lg md:text-xl">!</span>
              ) : (
                <span className="text-black text-[8px] sm:text-lg md:text-xl">✓</span>
              )}
            </div>
          </div>
          
          <div className={`flex-1 ${
            point.highlight 
              ? 'border-l-[.5px] sm:border-l-4 border-red-600 pl-1 sm:pl-3' 
              : 'border-l-[1.5px] sm:border-l-4 border-white/30 pl-1 sm:pl-3'
          }`}>
            <span className={`text-[7.5px] sm:text-sm md:text-base lg:text-lg font-black uppercase tracking-tight leading-tight ${
              point.highlight ? 'text-red-400' : 'text-white'
            }`}
            style={{
              textShadow: '1px 1px 0px rgba(0,0,0,0.8)'
            }}>
              {point.text}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SlidePoints;
