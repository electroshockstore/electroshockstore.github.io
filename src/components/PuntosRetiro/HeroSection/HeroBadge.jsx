const HeroBadge = ({ text, icon, showDot = false, className = '' }) => {
  return (
    <div className={`inline-flex items-center gap-2 mb-4 lg:mb-4 ${className}`}>
      <span 
        className="hero-badge text-[11px] sm:text-sm font-black uppercase tracking-wider px-4 py-2 sm:px-3 sm:py-1.5 text-red-300 border-2 backdrop-blur-sm"
        style={{
          clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)'
        }}
      >
        {icon && <span className="inline-block mr-1">{icon}</span>}
        {text}
      </span>
      {showDot && (
        <span className="hero-badge-dot w-2 h-2 rounded-full bg-blue-400" />
      )}
    </div>
  );
};

export default HeroBadge;
