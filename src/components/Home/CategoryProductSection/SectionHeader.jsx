const SectionHeader = () => {
  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden flex items-end justify-between gap-4 mb-10">
        <div className="flex-1">
          <div className="text-[13px] text-white/40 uppercase tracking-tighter mb-1">
            ElectroShock · Catálogo
          </div>
          <div className="flex flex-col">
            <span 
              className="text-[clamp(4.5rem,10vw,7.5rem)] font-black leading-[0.8] text-white"
              style={{ fontFamily: "'Bebas Neue','Arial Black',sans-serif" }}
            >
              EXPLORÁ
            </span>
            <span 
              className="text-[clamp(2.8rem,6vw,4.8rem)] font-black leading-[0.8] text-blue-600 translate-x-3 -mt-2"
              style={{ fontFamily: "'Bebas Neue','Arial Black',sans-serif" }}
            >
              CATEGORÍAS
            </span>
          </div>
          <p className="text-[15px] text-white/50 mt-3 font-medium">
            Todo para tu setup en un solo lugar
          </p>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block mb-10">
        {/* Eyebrow rule */}
        <div className="flex items-center gap-4 mb-7">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
          <span className="text-[10px] font-black tracking-[0.38em] uppercase text-white/30">
            ElectroShock
          </span>
          <div className="h-px flex-1" style={{ background: 'rgba(255,255,255,0.07)' }} />
          <span className="text-[10px] font-black tracking-[0.3em] uppercase text-white/15">
            Catálogo {new Date().getFullYear()}
          </span>
          <div className="h-px w-12" style={{ background: 'rgba(255,255,255,0.07)' }} />
        </div>

        {/* Title + meta */}
        <div className="flex items-end gap-10">
          {/* Giant title */}
          <div className="flex flex-col leading-none shrink-0">
            <span 
              className="font-black text-white"
              style={{ 
                fontFamily: "'Bebas Neue','Arial Black',sans-serif", 
                fontSize: 'clamp(5.5rem,8.5vw,9rem)', 
                lineHeight: 0.82, 
                letterSpacing: '-0.01em' 
              }}
            >
              EXPLORÁ
            </span>
            <span 
              className="font-black text-blue-600"
              style={{ 
                fontFamily: "'Bebas Neue','Arial Black',sans-serif", 
                fontSize: 'clamp(3.2rem,5vw,5.5rem)', 
                lineHeight: 0.82, 
                letterSpacing: '-0.01em', 
                marginLeft: '0.15em' 
              }}
            >
              CATEGORÍAS
            </span>
          </div>

          {/* Descriptor */}
          <div className="flex items-stretch gap-5 self-stretch py-1 flex-1 max-w-xs">
            <div className="w-px shrink-0" style={{ background: 'rgba(255,255,255,0.1)' }} />
            <div className="flex flex-col justify-between">
              <p className="text-[13px] text-white/40 leading-[1.6] font-medium">
                Todo para armar o mejorar<br />tu setup gamer.
              </p>
              <span className="text-[10px] font-black tracking-[0.2em] uppercase text-white/18">
                15 categorías
              </span>
            </div>
          </div>

          {/* Ghost number + badges */}
          <div className="flex flex-col items-end gap-4 ml-auto shrink-0">
            <span 
              className="font-black select-none"
              style={{ 
                fontFamily: "'Bebas Neue','Arial Black',sans-serif", 
                fontSize: 'clamp(5rem,7.5vw,8rem)', 
                lineHeight: 0.85, 
                color: 'rgba(255,255,255,0.05)', 
                letterSpacing: '-0.02em' 
              }}
            >
              15
            </span>
            <div className="flex flex-wrap justify-end gap-1.5 max-w-[320px]">
              {[
                { name: 'PROCESADORES', color: '#f97316' },
                { name: 'MOTHERBOARDS', color: '#2563eb' },
                { name: 'MEMORIAS', color: '#10b981' },
                { name: 'ALMACENAMIENTO', color: '#8b5cf6' },
                { name: 'FUENTES', color: '#eab308' },
                { name: 'REFRIGERACIÓN', color: '#06b6d4' },
                { name: 'PERIFÉRICOS', color: '#ec4899' },
                { name: 'MONITORES', color: '#f97316' },
                { name: 'PLACAS VIDEO', color: '#2563eb' },
              ].map((cat, idx) => (
                <span 
                  key={idx}
                  className="px-2.5 py-1 rounded-full text-[9px] font-black tracking-widest uppercase leading-none"
                  style={{ 
                    background: `${cat.color}15`, 
                    color: cat.color, 
                    border: `1px solid ${cat.color}28` 
                  }}
                >
                  {cat.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom rule */}
        <div className="mt-8 h-px" style={{ background: 'rgba(255,255,255,0.07)' }} />
      </div>
    </>
  );
};

export default SectionHeader;
