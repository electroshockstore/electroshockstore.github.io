/**
 * Constantes del Sidebar - Single Responsibility
 */

export const CATEGORIES = [
  { key: 'Procesadores',   label: 'CPU',  sublabel: 'Procesador',     buildKey: 'cpu',         allowMultiple: false },
  { key: 'Motherboards',   label: 'MOBO', sublabel: 'Motherboard',    buildKey: 'motherboard', allowMultiple: false },
  { key: 'Memorias RAM',   label: 'RAM',  sublabel: 'Memoria',        buildKey: 'ram',         allowMultiple: true, maxCount: 2 },
  { key: 'Placas de Video', label: 'GPU',  sublabel: 'Placa de Video', buildKey: 'gpu',         allowMultiple: false },
  { key: 'Refrigeración',  label: 'COOL', sublabel: 'Refrigeración',  buildKey: 'cooling',     allowMultiple: false },
  { key: 'Almacenamiento', label: 'SSD',  sublabel: 'Almacenamiento', buildKey: 'storage',     allowMultiple: false },
  { key: 'Fuentes',        label: 'PSU',  sublabel: 'Fuente',         buildKey: 'psu',         allowMultiple: false },
  { key: 'Monitores',      label: 'MON',  sublabel: 'Monitor',        buildKey: 'monitor',     allowMultiple: false },
];

export const SIDEBAR_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

  .sidebar-scroll::-webkit-scrollbar { width: 0px; }
  .sidebar-scroll { scrollbar-width: none; }

  @keyframes pulse-dot {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.8); }
  }

  @keyframes slide-up {
    from { opacity: 0; transform: translateY(6px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-4px); }
  }

  .slot-card { animation: slide-up 0.3s ease both; }
  
  /* Ocultar indicador cuando no hay scroll */
  .sidebar-scroll:not([data-scrollable="true"]) ~ .scroll-indicator {
    display: none;
  }
`;
