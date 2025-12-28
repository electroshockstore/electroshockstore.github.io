import { Calendar, Clock } from 'lucide-react';

const ScheduleGrid = ({ days, schedule, weekendSchedule }) => {
  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Grid 2 columnas - Mejorado para mobile */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {/* Días */}
        <div className="relative bg-white/5 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/10 p-3 sm:p-5 overflow-hidden group hover:bg-white/[0.07] transition-all duration-300">
          <div className="flex flex-col gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-lg sm:rounded-xl flex items-center justify-center border border-blue-400/30">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" strokeWidth={2} />
            </div>
            <div>
              <p className="text-[10px] sm:text-xs text-gray-400 font-medium mb-0.5 sm:mb-1 uppercase tracking-wide">Días</p>
              <p className="text-sm sm:text-base font-bold text-white leading-tight">{days}</p>
            </div>
          </div>
        </div>

        {/* Horario */}
        <div className="relative bg-white/5 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/10 p-3 sm:p-5 overflow-hidden group hover:bg-white/[0.07] transition-all duration-300">
          <div className="flex flex-col gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-cyan-400/20 to-cyan-600/20 rounded-lg sm:rounded-xl flex items-center justify-center border border-cyan-400/30">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" strokeWidth={2} />
            </div>
            <div>
              <p className="text-[10px] sm:text-xs text-gray-400 font-medium mb-0.5 sm:mb-1 uppercase tracking-wide">Horario</p>
              <p className="text-sm sm:text-base font-bold text-white leading-tight">{schedule}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Fines de semana - Full width con mejor jerarquía */}
      {weekendSchedule && (
        <div className={`relative backdrop-blur-xl rounded-xl sm:rounded-2xl border overflow-hidden ${
          weekendSchedule === 'NO' 
            ? 'bg-red-500/10 border-red-500/30' 
            : 'bg-purple-500/10 border-purple-500/30'
        }`}>
          <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-5">
            <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center border flex-shrink-0 ${
              weekendSchedule === 'NO'
                ? 'bg-gradient-to-br from-red-400/20 to-red-600/20 border-red-400/30'
                : 'bg-gradient-to-br from-purple-400/20 to-purple-600/20 border-purple-400/30'
            }`}>
              <Calendar className={`w-4 h-4 sm:w-5 sm:h-5 ${weekendSchedule === 'NO' ? 'text-red-400' : 'text-purple-400'}`} strokeWidth={2} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] sm:text-xs text-gray-400 font-medium mb-0.5 sm:mb-1 uppercase tracking-wide">Fines de Semana / Feriados</p>
              <p className={`text-base sm:text-lg font-black ${weekendSchedule === 'NO' ? 'text-red-400' : 'text-purple-400'}`}>
                {weekendSchedule}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleGrid;
