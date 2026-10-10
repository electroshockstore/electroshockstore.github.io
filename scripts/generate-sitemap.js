import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getSlugFromCategory, generateSKU } from '../src/utils/slugify.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const categoriesPath = path.join(__dirname, '../src/data/categories');
const baseUrl = 'https://www.electroshock.com.ar';

// Mapa display -> archivo. Debe cubrir las mismas categorías que src/data/index.js.
// (placas_video.json usa guion bajo en disco, pero el slug de ruta usa guion.)
const CATEGORY_FILES = {
  'Procesadores': 'procesadores.json',
  'Motherboards': 'motherboards.json',
  'Memorias RAM': 'memorias.json',
  'Almacenamiento': 'almacenamiento.json',
  'Fuentes': 'fuentes.json',
  'Refrigeración': 'refrigeracion.json',
  'Teclados': 'teclados.json',
  'Mouse': 'mouse.json',
  'Auriculares': 'auriculares.json',
  'Joystick': 'joystick.json',
  'Conectividad': 'conectividad.json',
  'Monitores': 'monitores.json',
  'Portátiles': 'portatiles.json',
  'Placas de Video': 'placas_video.json',
};

// Rutas estáticas canónicas. Se excluyen a propósito:
// - /pc-builder (duplicada de /armatupc)
// - /buscar (resultados efímeros, con noindex en runtime)
// - /producto/:id (legacy, redirige a la URL SKU canónica)
const STATIC_ROUTES = ['/', '/puntos-de-retiro', '/armatupc'];

const escapeXml = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

function readProducts(file) {
  const raw = fs.readFileSync(path.join(categoriesPath, file), 'utf8');
  const parsed = JSON.parse(raw);
  const products = parsed?.products || parsed || [];
  return Array.isArray(products) ? products : [];
}

function generateSitemap() {
  const today = new Date().toISOString().split('T')[0];
  const urls = new Map();

  const add = (loc, lastmod) => {
    if (!urls.has(loc)) urls.set(loc, lastmod || today);
  };

  for (const route of STATIC_ROUTES) {
    add(`${baseUrl}${route === '/' ? '' : route}`, today);
  }

  let productCount = 0;

  for (const [category, file] of Object.entries(CATEGORY_FILES)) {
    const filePath = path.join(categoriesPath, file);
    if (!fs.existsSync(filePath)) {
      console.warn(`Categoría sin archivo: ${category} (${file})`);
      continue;
    }

    let products = [];
    try {
      products = readProducts(file);
    } catch (error) {
      console.warn(`No se pudo leer ${file}:`, error.message);
      continue;
    }

    const categorySlug = getSlugFromCategory(category);
    const lastmod = fs.statSync(filePath).mtime.toISOString().split('T')[0];
    add(`${baseUrl}/categoria/${categorySlug}`, lastmod);

    for (const product of products) {
      if (!product?.name || !product?.brand || !product?.category) continue;
      const productSlug = getSlugFromCategory(product.category);
      const productSku = generateSKU(product.name, product.brand);
      add(`${baseUrl}/categoria/${productSlug}/${productSku}`, lastmod);
      productCount += 1;
    }
  }

  const entries = [...urls.entries()].sort(([a], [b]) => a.localeCompare(b));

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${entries.map(([loc, lastmod]) => `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`).join('\n')}
</urlset>`;

  const distPath = path.join(__dirname, '../dist');
  if (!fs.existsSync(distPath)) {
    fs.mkdirSync(distPath, { recursive: true });
  }

  fs.writeFileSync(path.join(distPath, 'sitemap.xml'), xml);
  console.log(`✅ Sitemap generado con ${entries.length} URLs (${productCount} productos)`);
}

generateSitemap();
