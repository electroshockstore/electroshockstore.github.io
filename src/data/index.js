// Lazy loading de categorías de productos
export const loadCategory = async (categoryName) => {
  const categoryMap = {
    'Procesadores': () => import('./categories/procesadores.js'),
    'Motherboards': () => import('./categories/motherboards.js'),
    'Memorias RAM': () => import('./categories/memorias.js'),
    'Almacenamiento': () => import('./categories/almacenamiento.js'),
    'Fuentes': () => import('./categories/fuentes.js'),
    'Refrigeración': () => import('./categories/refrigeracion.js'),
    'Teclados': () => import('./categories/teclados.js'),
    'Mouse': () => import('./categories/mouse.js'),
    'Auriculares': () => import('./categories/auriculares.js'),
    'Joystick': () => import('./categories/joystick.js'),
    'Conectividad': () => import('./categories/conectividad.js'),
    'Monitores': () => import('./categories/monitores.js'),
    'Portátiles': () => import('./categories/portatiles.js'),
    'Placas de Video': () => import('./categories/placas_video.js'),
    'Mayorista': () => import('./categories/mayorista.js')
  };

  const loader = categoryMap[categoryName];
  if (!loader) return [];

  try {
    const module = await loader();
    const key = Object.keys(module).find(k => k.includes('Products'));
    return module[key] || [];
  } catch (error) {
    console.error(`Error loading category ${categoryName}:`, error);
    return [];
  }
};

// Eager loading para uso inmediato (mantener compatibilidad)
import { procesadoresProducts } from './categories/procesadores.js';
import { motherboardsProducts } from './categories/motherboards.js';
import { memoriasProducts } from './categories/memorias.js';
import { almacenamientoProducts } from './categories/almacenamiento.js';
import { fuentesProducts } from './categories/fuentes.js';
import { refrigeracionProducts } from './categories/refrigeracion.js';
import { tecladosProducts } from './categories/teclados.js';
import { mouseProducts } from './categories/mouse.js';
import { auricularesProducts } from './categories/auriculares.js';
import { joystickProducts } from './categories/joystick.js';
import { conectividadProducts } from './categories/conectividad.js';
import { monitoresProducts } from './categories/monitores.js';
import { portatilesProducts } from './categories/portatiles.js';
import { placasVideoProducts } from './categories/placas_video.js';
import { mayoristaProducts } from './categories/mayorista.js';
import { extendProductsWithCompatibility } from './compatibility/index.js';

// Extend products with compatibility data
const allProductsRaw = [
  ...procesadoresProducts,
  ...motherboardsProducts,
  ...memoriasProducts,
  ...almacenamientoProducts,
  ...fuentesProducts,
  ...refrigeracionProducts,
  ...tecladosProducts,
  ...mouseProducts,
  ...auricularesProducts,
  ...joystickProducts,
  ...conectividadProducts,
  ...monitoresProducts,
  ...portatilesProducts,
  ...placasVideoProducts,
  ...mayoristaProducts
];

export const products = extendProductsWithCompatibility(allProductsRaw);

export const categories = [
  'Procesadores',
  'Motherboards',
  'Memorias RAM',
  'Almacenamiento',
  'Fuentes',
  'Refrigeración',
  'Teclados',
  'Mouse',
  'Auriculares',
  'Joystick',
  'Conectividad',
  'Monitores',
  'Portátiles',
  'Placas de Video'
];
