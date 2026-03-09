import { ArrowUpRight } from 'lucide-react';

const CategoryCard = ({ category, index, onClick, textSize = 'text-sm' }) => {
  const num = String(index + 1).padStart(2, '0');
  
  return (
    <button
      onClick={() => onClick(category.slug)}
      aria-label={`Explorar ${category.name}`}
      className="relative overflow-hidden rounded-2xl bg-[#0a0a0a] cursor-pointer w-full h-full flex flex-col justify-end outline-none transition-transform duration-200 hover:-translate-y-0.5 active:scale-95 p-3"
      style={{
        border: `2px solid ${category.accent}60`,
        boxShadow: `0 8px 28px ${category.accent}25`,
      }}
    >
      <img 
        src={category.image} 
        alt={category.name} 
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.5, transform: 'scale(1.07)' }}
        onError={e => e.target.style.display = 'none'}
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)' }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(circle at 30% 80%, ${category.accent}22 0%, transparent 60%)` }} />
      
      <span 
        className="absolute top-2 left-2.5 font-bold tracking-widest text-[10px] leading-none"
        style={{ fontFamily: 'monospace', color: category.accent }}
      >
        {num}
      </span>
      
      <div 
        className="absolute top-2 right-2 w-5 h-5 rounded-md flex items-center justify-center"
        style={{ background: category.accent }}
      >
        <ArrowUpRight size={11} color="#fff" strokeWidth={2.5} />
      </div>
      
      <div className="relative z-10">
        <div className="mb-1.5 h-0.5 rounded-full" style={{ width: 28, background: category.accent }} />
        <span 
          className={`block font-black tracking-wide text-white leading-tight ${textSize}`}
          style={{ fontFamily: "'Bebas Neue', 'Arial Black', sans-serif", textShadow: '0 1px 6px rgba(0,0,0,0.9)' }}
        >
          {category.name}
        </span>
      </div>
    </button>
  );
};

export default CategoryCard;
