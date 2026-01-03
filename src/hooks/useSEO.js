import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  updateMetaTags,
  insertStructuredData,
  generateOrganizationSchema,
  generateProductSchema,
  generateBreadcrumbSchema,
  generateProductKeywords,
  generateProductDescription
} from '../utils/seo';

export const useSEO = ({ 
  title, 
  description, 
  keywords, 
  image, 
  type = 'website',
  product = null,
  category = null 
}) => {
  const location = useLocation();

  useEffect(() => {
    const url = location.pathname;
    const baseUrl = 'https://www.jldev.com.ar';
    
    // Títulos y descripciones más atractivos y sintetizados
    const defaultTitle = 'Shock-Store | 🔥 Tecnología y Componentes PC - Berazategui';
    const defaultDescription = '🚀 Tu tienda de tecnología en Berazategui. ✅ Componentes PC ⚡ Gaming 💻 Hardware 🎮 Periféricos. Catálogo actualizado, mejores precios y envíos rápidos.';
    const defaultKeywords = 'shock-store, componentes pc, hardware gaming, periféricos, tecnología, berazategui, placas video, procesadores, memorias ram, ssd, fuentes, refrigeración';
    
    updateMetaTags({
      title: title || defaultTitle,
      description: description || defaultDescription,
      keywords: keywords || defaultKeywords,
      image: image ? `${baseUrl}${image}` : `${baseUrl}/logotipo_tiny.png`,
      url: `${baseUrl}${url}`,
      type
    });

    // Schema.org mejorado
    insertStructuredData(generateOrganizationSchema(), 'org-schema');

    if (product) {
      const productSchema = generateProductSchema(product);
      insertStructuredData(productSchema, 'product-schema');

      const breadcrumbs = [
        { name: '🏠 Inicio', url: baseUrl },
        { name: `📦 ${product.category}`, url: `${baseUrl}/categoria/${product.category.toLowerCase()}` },
        { name: `🔧 ${product.name}`, url: `${baseUrl}${url}` }
      ];
      insertStructuredData(generateBreadcrumbSchema(breadcrumbs), 'breadcrumb-schema');
    } else if (category) {
      const breadcrumbs = [
        { name: '🏠 Inicio', url: baseUrl },
        { name: `📦 ${category}`, url: `${baseUrl}${url}` }
      ];
      insertStructuredData(generateBreadcrumbSchema(breadcrumbs), 'breadcrumb-schema');
    } else {
      // Limpiar schemas no necesarios
      ['product-schema', 'breadcrumb-schema'].forEach(id => {
        const element = document.getElementById(id);
        if (element) element.remove();
      });
    }

    window.scrollTo(0, 0);
  }, [title, description, keywords, image, type, product, category, location]);
};

export const useProductSEO = (product) => {
  const title = product 
    ? `${product.name} - ${product.brand} | 🔥 Shock-Store`
    : 'Shock-Store | 🔥 Tecnología y Componentes PC - Berazategui';
  
  const description = product 
    ? `🚀 ${product.name} de ${product.brand} en Shock-Store. 💰 $${product.price?.toLocaleString()} ✅ Stock disponible ⚡ Envío rápido. ${generateProductDescription(product)}`
    : '🚀 Catálogo completo Shock-Store. ✅ Componentes PC 🎮 Gaming 💻 Hardware 🖱️ Periféricos. Mejores precios y calidad garantizada.';
  
  const keywords = product 
    ? `${generateProductKeywords(product)}, shock-store, berazategui, ${product.brand.toLowerCase()}, ${product.category.toLowerCase()}`
    : 'shock-store, componentes pc, hardware gaming, tecnología, berazategui';
  
  const image = product?.images?.[0] || '/logotipo_tiny.png';

  useSEO({
    title,
    description,
    keywords,
    image,
    type: product ? 'product' : 'website',
    product: product || null
  });
};

export const useCategorySEO = (category, productCount) => {
  const title = category 
    ? `${category} | 🔥 Shock-Store - ${productCount} Productos Disponibles`
    : 'Shock-Store | 🔥 Tecnología y Componentes PC - Berazategui';
  
  const description = category
    ? `🚀 Explorá ${productCount} productos de ${category.toLowerCase()} en Shock-Store Berazategui. ✅ Stock actualizado 💰 Mejores precios ⚡ Envío rápido 🎮 Gaming y tecnología.`
    : '🚀 Catálogo completo Shock-Store. ✅ Componentes PC 🎮 Gaming 💻 Hardware 🖱️ Periféricos. Tu tienda de tecnología en Berazategui.';
  
  const keywords = category
    ? `${category.toLowerCase()}, shock-store, componentes pc, hardware, tecnología, berazategui, gaming, ${category.toLowerCase()} gaming`
    : 'shock-store, componentes pc, hardware gaming, tecnología, berazategui';

  useSEO({
    title,
    description,
    keywords,
    type: 'website',
    category: category || null
  });
};
