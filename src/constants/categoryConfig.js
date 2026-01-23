import { 
  Grid3X3, Zap, HardDrive, MemoryStick, Cpu, CircuitBoard, 
  Fan, Headphones, Keyboard, Mouse, Gamepad2, 
  Monitor, Wifi, Laptop, Layers
} from 'lucide-react';

// CONFIGURACIÓN ESTÁTICA - Se crea una sola vez, nunca se re-crea
export const CATEGORY_CONFIG = {
  'Todos': {
    icon: Grid3X3,
    color: 'text-blue-500',
    colorSelected: 'text-blue-600',
    gradient: 'from-blue-500 to-blue-600',
    image: '/images/category_filter/thumbs/builder.webp'
  },
  'Fuentes': {
    icon: Zap,
    color: 'text-amber-500',
    colorSelected: 'text-amber-600',
    gradient: 'from-amber-500 to-amber-600',
    image: '/images/category_filter/thumbs/fuentes.webp'
  },
  'Almacenamiento': {
    icon: HardDrive,
    color: 'text-purple-500',
    colorSelected: 'text-purple-600',
    gradient: 'from-purple-500 to-purple-600',
    image: '/images/category_grid/thumbs/almacenamiento_grid_tiny.webp'
  },
  'Memorias RAM': {
    icon: MemoryStick,
    color: 'text-green-500',
    colorSelected: 'text-green-600',
    gradient: 'from-green-500 to-green-600',
    image: '/images/category_filter/thumbs/memorias_ram.webp'
  },
  'Motherboards': {
    icon: CircuitBoard,
    color: 'text-indigo-500',
    colorSelected: 'text-indigo-600',
    gradient: 'from-indigo-500 to-indigo-600',
    image: '/images/category_filter/thumbs/motherboard.webp'
  },
  'Procesadores': {
    icon: Cpu,
    color: 'text-red-500',
    colorSelected: 'text-red-600',
    gradient: 'from-red-500 to-red-600',
    image: '/images/category_filter/thumbs/procesadores.webp'
  },
  'Refrigeración': {
    icon: Fan,
    color: 'text-cyan-500',
    colorSelected: 'text-cyan-600',
    gradient: 'from-cyan-500 to-cyan-600',
    image: '/images/category_filter/thumbs/refrigeracion.webp'
  },
  'Auriculares': {
    icon: Headphones,
    color: 'text-pink-500',
    colorSelected: 'text-pink-600',
    gradient: 'from-pink-500 to-pink-600',
    image: '/images/category_grid/thumbs/auriculares_grid_tiny.webp'
  },
  'Teclados': {
    icon: Keyboard,
    color: 'text-violet-500',
    colorSelected: 'text-violet-600',
    gradient: 'from-violet-500 to-violet-600',
    image: '/images/category_grid/thumbs/teclados_grid_tiny.webp'
  },
  'Mouse': {
    icon: Mouse,
    color: 'text-orange-500',
    colorSelected: 'text-orange-600',
    gradient: 'from-orange-500 to-orange-600',
    image: '/images/category_grid/thumbs/mouse_grid_tiny.webp'
  },
  'Joystick': {
    icon: Gamepad2,
    color: 'text-emerald-500',
    colorSelected: 'text-emerald-600',
    gradient: 'from-emerald-500 to-emerald-600',
    image: '/images/category_filter/thumbs/Joystikc.webp'
  },
  'Monitores': {
    icon: Monitor,
    color: 'text-slate-500',
    colorSelected: 'text-slate-600',
    gradient: 'from-slate-500 to-slate-600',
    image: '/images/category_filter/thumbs/monitores.webp'
  },
  'Conectividad': {
    icon: Wifi,
    color: 'text-teal-500',
    colorSelected: 'text-teal-600',
    gradient: 'from-teal-500 to-teal-600',
    image: '/images/category_filter/thumbs/conectividad.webp'
  },
  'Portátiles': {
    icon: Laptop,
    color: 'text-sky-500',
    colorSelected: 'text-sky-600',
    gradient: 'from-sky-500 to-sky-600',
    image: '/images/category_filter/thumbs/portatiles.webp'
  },
  'Placas de Video': {
    icon: Layers,
    color: 'text-lime-500',
    colorSelected: 'text-lime-600',
    gradient: 'from-lime-500 to-lime-600',
    image: '/images/category_filter/thumbs/placas_video.webp'
  }
};

// Fallback config
const DEFAULT_CONFIG = {
  icon: Grid3X3,
  color: 'text-gray-500',
  colorSelected: 'text-gray-600',
  gradient: 'from-gray-500 to-gray-600',
  image: '/images/category_filter/thumbs/builder.webp'
};

// Funciones helper ultra-rápidas (lookup directo, sin iteraciones)
export const getCategoryConfig = (category) => CATEGORY_CONFIG[category] || DEFAULT_CONFIG;
export const getCategoryIcon = (category) => getCategoryConfig(category).icon;
export const getCategoryColor = (category, isSelected) => 
  isSelected ? getCategoryConfig(category).colorSelected : getCategoryConfig(category).color;
export const getCategoryGradient = (category) => getCategoryConfig(category).gradient;
export const getCategoryImage = (category) => getCategoryConfig(category).image;
