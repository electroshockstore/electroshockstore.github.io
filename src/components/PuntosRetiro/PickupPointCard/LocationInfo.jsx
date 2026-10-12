import { memo } from 'react';
import { MapPin } from 'lucide-react';

const LocationInfo = memo(({ name, address, index }) => (
  <div className="absolute inset-x-4 bottom-4 top-4 z-10 flex flex-col justify-end">
    {/* Eyebrow: índice + zona */}
    <div className="mb-2 flex items-center gap-2">
      <span className="h-[3px] w-10 bg-[#c8f519] shadow-[0_0_12px_rgba(200,245,25,0.8)]" aria-hidden="true" />
      <span className="landing-mono text-[10px] font-black uppercase tracking-[0.2em] text-[#c8f519] drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
        FV—{String(index).padStart(2, '0')} · Zona Sur
      </span>
    </div>

    {/* Título en blanco protagonista */}
    <h3 className="ppc-title font-display text-[30px] lg:text-[34px] leading-[0.95] text-white font-extrabold uppercase tracking-[-1px]">
      {name}
    </h3>

    {/* Dirección */}
    <div className="mt-2.5 inline-flex w-fit max-w-full items-center gap-2 border border-[#0e0e0e] bg-white/[0.97] px-3 py-1.5 shadow-[3px_3px_0_0_rgba(0,0,0,0.55)] backdrop-blur-md lg:rounded-none lg:shadow-[3px_3px_0_0_#0e0e0e]">
      <MapPin className="h-3.5 w-3.5 flex-shrink-0 text-[#0e0e0e]" strokeWidth={2.75} />
      <p className="landing-mono truncate text-[11px] font-bold leading-none text-[#0A1024]">
        {address}
      </p>
    </div>
  </div>
));

LocationInfo.displayName = 'LocationInfo';

export default LocationInfo;
