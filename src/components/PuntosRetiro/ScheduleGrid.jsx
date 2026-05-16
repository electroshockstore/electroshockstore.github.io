import { memo } from 'react';
import { Calendar, Clock } from 'lucide-react';

const ScheduleGrid = memo(({ days, schedule, weekendSchedule }) => {
  return (
    <div className="schedule-block-premium space-y-3.5">
      {/* Grid 2 columnas moderno */}
      <div className="grid grid-cols-2 gap-3">
        {/* Días */}
        <div className="schedule-item-premium group">
          <div className="flex flex-col gap-2">
            <div className="w-8 h-8 bg-[#3B82F6]/10 rounded-lg flex items-center justify-center border border-[#3B82F6]/30 shadow-[0_0_15px_rgba(59,130,246,0.12)] group-hover:shadow-[0_0_25px_rgba(59,130,246,0.25)] transition-all duration-[350ms]">
              <Calendar className="w-4 h-4 text-[#3B82F6]" strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-[9px] text-[#94A3B8] font-bold mb-0.5 uppercase tracking-[0.8px]">Días</p>
              <p className="text-xs font-extrabold text-white leading-tight">{days}</p>
            </div>
          </div>
        </div>

        {/* Horario */}
        <div className="schedule-item-premium group">
          <div className="flex flex-col gap-2">
            <div className="w-8 h-8 bg-[#00D9FF]/10 rounded-lg flex items-center justify-center border border-[#00D9FF]/30 shadow-[0_0_15px_rgba(0,217,255,0.12)] group-hover:shadow-[0_0_25px_rgba(0,217,255,0.25)] transition-all duration-[350ms]">
              <Clock className="w-4 h-4 text-[#00D9FF]" strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-[9px] text-[#94A3B8] font-bold mb-0.5 uppercase tracking-[0.8px]">Horario</p>
              <p className="text-xs font-extrabold text-white leading-tight">{schedule}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Fines de semana */}
      {weekendSchedule && (
        <div className={`weekend-block-premium ${
          weekendSchedule === 'NO' ? 'weekend-closed' : 'weekend-open'
        }`}>
          <div className="flex items-center gap-3 p-3.5">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center border flex-shrink-0 ${
              weekendSchedule === 'NO'
                ? 'bg-[#FF5C7A]/10 border-[#FF5C7A]/30 shadow-[0_0_15px_rgba(255,92,122,0.15)]'
                : 'bg-[#A855F7]/10 border-[#A855F7]/30 shadow-[0_0_15px_rgba(168,85,247,0.15)]'
            }`}>
              <Calendar className={`w-4 h-4 ${weekendSchedule === 'NO' ? 'text-[#FF5C7A]' : 'text-[#A855F7]'}`} strokeWidth={2.5} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[9px] text-[#94A3B8] font-bold mb-0.5 uppercase tracking-[0.8px]">Fines de Semana</p>
              <p className={`text-sm font-extrabold ${weekendSchedule === 'NO' ? 'text-[#FF5C7A]' : 'text-[#A855F7]'}`}>
                {weekendSchedule}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

ScheduleGrid.displayName = 'ScheduleGrid';

export default ScheduleGrid;
