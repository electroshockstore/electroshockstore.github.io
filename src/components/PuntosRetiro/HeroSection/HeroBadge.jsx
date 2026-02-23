const HeroBadge = ({ text, icon, showDot = false, className = '' }) => {
  return (
    <div className={`inline-flex items-center gap-2 mb-7 lg:mb-4 ${className}`}>
      <span 
        className="text-xs sm:text-sm font-black uppercase tracking-[0.2em] px-3 py-1.5 text-blue-300 border"
        style={{
          borderColor: 'rgba(59,130,246,0.4)',
          background: 'rgba(59,130,246,0.08)',
          clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)'
        }}
      >
        {icon && `${icon} `}{text}
      </span>
      {showDot && (
        <span 
          className="hero-badge-dot w-2 h-2 rounded-full bg-blue-300"
        />
      )}
    </div>
  );
};

export default HeroBadge;
