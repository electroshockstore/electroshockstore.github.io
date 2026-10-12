const HeroBadge = ({ text, icon, showDot = false, className = '' }) => {
  return (
    <div className={`inline-flex items-center gap-2 mb-4 lg:mb-4 ${className}`}>
      <span 
        className="hero-badge landing-mono text-[11px] sm:text-sm font-black uppercase tracking-[0.08em] px-4 py-2 sm:px-3 sm:py-1.5 text-red-300 border-2 backdrop-blur-sm lg:text-[#c8f519] lg:bg-[#0e0e0e] lg:border-[#0e0e0e] lg:backdrop-blur-none lg:shadow-[4px_4px_0_0_rgba(14,14,14,0.25)]"
        style={{
          clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)'
        }}
      >
        {icon && <span className="mr-1 inline-flex items-center [&>svg]:h-3.5 [&>svg]:w-3.5">{icon}</span>}
        {text}
      </span>
      {showDot && (
        <span className="hero-badge-dot w-2 h-2 rounded-full bg-cyber-cyan" />
      )}
    </div>
  );
};

export default HeroBadge;
