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
    // JSON imports return the object directly as default export
    return module.default?.products || module.default || [];
  } catch (error) {
    console.error(`Error loading category ${categoryName}:`, error);
    return [];
  }
};

// Eager loading para uso inmediato (mantener compatibilidad)
import procesadoresData from './categories/procesadores.json';
import motherboardsData from './categories/motherboards.json';
import memoriasData from './categories/memorias.json';
import almacenamientoData from './categories/almacenamiento.json';
import fuentesData from './categories/fuentes.json';
import refrigeracionData from './categories/refrigeracion.json';
import tecladosData from './categories/teclados.json';
import mouseData from './categories/mouse.json';
import auricularesData from './categories/auriculares.json';
import joystickData from './categories/joystick.json';
import conectividadData from './categories/conectividad.json';
import monitoresData from './categories/monitores.json';
import portatilesData from './categories/portatiles.json';
import placasVideoData from './categories/placas_video.json';
import mayoristaData from './categories/mayorista.json';
import { extendProductsWithCompatibility } from './compatibility/index.js';

// Extract products arrays from wrapped objects
const procesadoresProducts = procesadoresData.products;
const motherboardsProducts = motherboardsData.products;
const memoriasProducts = memoriasData.products;
const almacenamientoProducts = almacenamientoData.products;
const fuentesProducts = fuentesData.products;
const refrigeracionProducts = refrigeracionData.products;
const tecladosProducts = tecladosData.products;
const mouseProducts = mouseData.products;
const auricularesProducts = auricularesData.products;
const joystickProducts = joystickData.products;
const conectividadProducts = conectividadData.products;
const monitoresProducts = monitoresData.products;
const portatilesProducts = portatilesData.products;
const placasVideoProducts = placasVideoData.products;
const mayoristaProducts = mayoristaData.products;

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
