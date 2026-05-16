import { memo } from 'react';
import { Calendar, Clock } from 'lucide-react';

const ScheduleGrid = memo(({ days, schedule, weekendSchedule }) => {
  return (
    <div className="schedule-block-premium-fluid space-y-3">
      {/* Bloques flotantes sin grid rígido */}
      <div className="flex flex-wrap gap-2.5">
        {/* Días - Bloque flotante */}
        <div className="schedule-item-fluid flex-1 min-w-[140px]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-[#3B82F6]/10 rounded-xl flex items-center justify-center border border-[#3B82F6]/30 shadow-[0_0_15px_rgba(59,130,246,0.12)] flex-shrink-0">
              <Calendar className="w-4.5 h-4.5 text-[#3B82F6]" strokeWidth={2.5} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[9px] text-[#94A3B8] font-bold mb-0.5 uppercase tracking-[0.8px]">Días</p>
              <p className="text-sm font-extrabold text-white leading-tight truncate">{days}</p>
            </div>
          </div>
        </div>

        {/* Horario - Bloque flotante */}
        <div className="schedule-item-fluid flex-1 min-w-[120px]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-[#00D9FF]/10 rounded-xl flex items-center justify-center border border-[#00D9FF]/30 shadow-[0_0_15px_rgba(0,217,255,0.12)] flex-shrink-0">
              <Clock className="w-4.5 h-4.5 text-[#00D9FF]" strokeWidth={2.5} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[9px] text-[#94A3B8] font-bold mb-0.5 uppercase tracking-[0.8px]">Horario</p>
              <p className="text-sm font-extrabold text-white leading-tight truncate">{schedule}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Fines de semana - Bloque flotante completo */}
      {weekendSchedule && (
        <div className={`weekend-block-fluid ${
          weekendSchedule === 'NO' ? 'weekend-closed' : 'weekend-open'
        }`}>
          <div className="flex items-center gap-3 p-3.5">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center border flex-shrink-0 ${
              weekendSchedule === 'NO'
                ? 'bg-[#FF5C7A]/10 border-[#FF5C7A]/30 shadow-[0_0_15px_rgba(255,92,122,0.15)]'
                : 'bg-[#A855F7]/10 border-[#A855F7]/30 shadow-[0_0_15px_rgba(168,85,247,0.15)]'
            }`}>
              <Calendar className={`w-4.5 h-4.5 ${weekendSchedule === 'NO' ? 'text-[#FF5C7A]' : 'text-[#A855F7]'}`} strokeWidth={2.5} />
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
