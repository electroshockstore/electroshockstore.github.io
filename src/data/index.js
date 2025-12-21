import { fuentesProducts } from './categories/fuentes';
import { almacenamientoProducts } from './categories/almacenamiento';
import { memoriasProducts } from './categories/memorias';
import { procesadoresProducts } from './categories/procesadores';
import { motherboardsProducts } from './categories/motherboards';
import { refrigeracionProducts } from './categories/refrigeracion';
import { mouseProducts } from './categories/mouse';
import { auricularesProducts } from './categories/auriculares';
import { tecladosProducts } from './categories/teclados';
import { joystickProducts } from './categories/joystick';
import { monitoresProducts } from './categories/monitores';
import { conectividadProducts } from './categories/conectividad';
import { portatilesProducts } from './categories/portatiles';
import { extendProductsWithCompatibility } from './compatibility';

export const categories = [
  'Fuentes',
  'Almacenamiento',
  'Memorias RAM',
  'Motherboards',
  'Procesadores',
  'Refrigeración',
  'Mouse',
  'Auriculares',
  'Teclados',
  'Joystick',
  'Monitores',
  'Conectividad',
  'Portátiles'
];

// Raw products without compatibility data
const rawProducts = [
  ...fuentesProducts,
  ...almacenamientoProducts,
  ...memoriasProducts,
  ...motherboardsProducts,
  ...procesadoresProducts,
  ...refrigeracionProducts,
  ...mouseProducts,
  ...auricularesProducts,
  ...tecladosProducts,
  ...joystickProducts,
  ...monitoresProducts,
  ...conectividadProducts,
  ...portatilesProducts
];

// Products extended with compatibility data for PC Builder
export const products = extendProductsWithCompatibility(rawProducts);
