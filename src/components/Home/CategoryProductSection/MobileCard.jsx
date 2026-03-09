const MobileCard = ({ category, onClick, wide = false }) => {
  return (
    <button
      onClick={() => onClick(category.slug)}
      className="relative overflow-hidden rounded-xl bg-[#0a0a0a] cursor-pointer flex flex-col justify-end outline-none active:scale-[0.97] w-full h-full"
      style={{
        border: `1.5px solid ${category.accent}55`,
        boxShadow: `0 6px 20px ${category.accent}22`,
        transition: 'transform 100ms',
      }}
    >
      <img
        src={category.image} 
        alt={category.name} 
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.5, transform: 'scale(1.06)' }}
        onError={e => e.target.style.display = 'none'}
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)' }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at 20% 90%, ${category.accent}25 0%, transparent 55%)` }} />

      <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full" style={{ background: category.accent }} />

      <div className="relative z-10 p-2.5 pb-3">
        <div className="h-[2px] rounded-full mb-1.5" style={{ width: 20, background: category.accent }} />
        <span
          className="block font-black text-white leading-none"
          style={{ 
            fontFamily: "'Bebas Neue','Arial Black',sans-serif", 
            fontSize: wide ? 15 : 13, 
            textShadow: '0 1px 5px rgba(0,0,0,0.95)', 
            letterSpacing: '0.02em' 
          }}
        >
          {category.name}
        </span>
      </div>
    </button>
  );
};

export default MobileCard;
