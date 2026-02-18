const RuleCard = ({ rule, index }) => {
  return (
    <div className="relative group">
      {/* Glow effect on hover - Solo desktop con filter inline */}
      <div 
        className={`hidden sm:block absolute -inset-0.5 bg-gradient-to-r ${rule.gradient} rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`} 
        style={{ filter: 'blur(24px)' }}
      />
      
      <div className={`relative bg-gradient-to-br ${rule.bgGradient} backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-7 md:p-8 border ${rule.borderColor} overflow-hidden transition-all duration-300 hover:border-opacity-60`}>
        {/* Subtle shine effect - Solo desktop */}
        <div className="hidden sm:block absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Icon con gradiente */}
        <div className="relative mb-3 sm:mb-6">
          <div className="relative inline-flex">
            {/* Glow background - Solo desktop con filter inline */}
            <div 
              className={`hidden sm:block absolute inset-0 bg-gradient-to-r ${rule.gradient} rounded-xl opacity-40`} 
              style={{ filter: 'blur(12px)' }}
            />
            
            {/* Icon container */}
            <div className={`relative bg-gradient-to-br ${rule.iconBg} backdrop-blur-sm p-2 sm:p-4 rounded-lg sm:rounded-xl border ${rule.borderColor}`}>
              <rule.icon className="w-5 h-5 sm:w-8 sm:h-8 text-white" strokeWidth={2.5} />
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="relative space-y-1.5 sm:space-y-3">
          <h3 className="text-base sm:text-2xl font-black text-white leading-tight">
            {rule.title}
          </h3>
          
          <div className={`inline-flex px-2 py-0.5 sm:px-3 sm:py-1 bg-gradient-to-r ${rule.gradient} rounded-full`}>
            <p className="text-[10px] sm:text-sm font-bold text-white uppercase tracking-wide">
              {rule.subtitle}
            </p>
          </div>
          
          <p className="text-xs sm:text-base text-gray-300 leading-relaxed pt-1 sm:pt-2">
            {rule.description}
          </p>
        </div>

        {/* Decorative corner accent - Solo desktop con filter inline */}
        <div 
          className={`hidden sm:block absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${rule.gradient} opacity-10 rounded-full -translate-y-1/2 translate-x-1/2`} 
          style={{ filter: 'blur(40px)' }}
        />
      </div>
    </div>
  );
};

export default RuleCard;
