// Lazy loading de categorías de productos
export const loadCategory = async (categoryName) => {
  const categoryMap = {
    'Procesadores': () => import('./categories/procesadores.json'),
    'Motherboards': () => import('./categories/motherboards.json'),
    'Memorias RAM': () => import('./categories/memorias.json'),
    'Almacenamiento': () => import('./categories/almacenamiento.json'),
    'Fuentes': () => import('./categories/fuentes.json'),
    'Refrigeración': () => import('./categories/refrigeracion.json'),
    'Teclados': () => import('./categories/teclados.json'),
    'Mouse': () => import('./categories/mouse.json'),
    'Auriculares': () => import('./categories/auriculares.json'),
    'Joystick': () => import('./categories/joystick.json'),
    'Conectividad': () => import('./categories/conectividad.json'),
    'Monitores': () => import('./categories/monitores.json'),
    'Portátiles': () => import('./categories/portatiles.json'),
    'Placas de Video': () => import('./categories/placas_video.json'),
    'Mayorista': () => import('./categories/mayorista.json')
  };

  const loader = categoryMap[categoryName];
  if (!loader) return [];

  try {
    const module = await loader();
    // JSON imports return the array directly as default export
    return module.default || [];
  } catch (error) {
    console.error(`Error loading category ${categoryName}:`, error);
    return [];
  }
};

// Eager loading para uso inmediato (mantener compatibilidad)
import procesadoresProducts from './categories/procesadores.json';
import motherboardsProducts from './categories/motherboards.json';
import memoriasProducts from './categories/memorias.json';
import almacenamientoProducts from './categories/almacenamiento.json';
import fuentesProducts from './categories/fuentes.json';
import refrigeracionProducts from './categories/refrigeracion.json';
import tecladosProducts from './categories/teclados.json';
import mouseProducts from './categories/mouse.json';
import auricularesProducts from './categories/auriculares.json';
import joystickProducts from './categories/joystick.json';
import conectividadProducts from './categories/conectividad.json';
import monitoresProducts from './categories/monitores.json';
import portatilesProducts from './categories/portatiles.json';
import placasVideoProducts from './categories/placas_video.json';
import mayoristaProducts from './categories/mayorista.json';
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
