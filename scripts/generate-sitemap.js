import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Importar datos de productos
const categoriesPath = path.join(__dirname, '../src/data/categories');
const categories = [
  'procesadores',
  'motherboards',
  'memorias',
  'almacenamiento',
  'fuentes',
  'refrigeracion',
  'monitores',
  'teclados',
  'mouse',
  'auriculares',
  'joystick',
  'conectividad'
];

const baseUrl = 'https://www.jldev.com.ar';

// Función para generar slug
const generateSlug = (text) => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// Función para generar SKU
const generateSKU = (name, brand) => {
  const namePart = name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 30);
  
  const brandPart = brand
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  
  return `${brandPart}-${namePart}`;
};

async function generateSitemap() {
  const urls = [];
  const today = new Date().toISOString().split('T')[0];

  // Página principal
  urls.push({
    loc: baseUrl,
    lastmod: today,
    changefreq: 'daily',
    priority: '1.0'
  });

  // Páginas de categorías y productos
  for (const category of categories) {
    try {
      const categoryFile = path.join(categoriesPath, `${category}.js`);
      
      if (fs.existsSync(categoryFile)) {
        const categoryModule = await import(`file://${categoryFile}`);
        const products = Object.values(categoryModule)[0] || [];
        
        // URL de categoría
        const categorySlug = generateSlug(category);
        urls.push({
          loc: `${baseUrl}/categoria/${categorySlug}`,
          lastmod: today,
          changefreq: 'weekly',
          priority: '0.8'
        });

        // URLs de productos
        products.forEach(product => {
          const categorySlug = generateSlug(product.category);
          const productSku = generateSKU(product.name, product.brand);
          
          urls.push({
            loc: `${baseUrl}/categoria/${categorySlug}/${productSku}`,
            lastmod: today,
            changefreq: 'weekly',
            priority: '0.6'
          });
        });
      }
    } catch (error) {
      console.warn(`No se pudo procesar la categoría ${category}:`, error.message);
    }
  }

  // Generar XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  // Guardar sitemap
  const distPath = path.join(__dirname, '../dist');
  if (!fs.existsSync(distPath)) {
    fs.mkdirSync(distPath, { recursive: true });
  }
  
  fs.writeFileSync(path.join(distPath, 'sitemap.xml'), xml);
  console.log(`✅ Sitemap generado con ${urls.length} URLs`);
}

generateSitemap().catch(console.error);
