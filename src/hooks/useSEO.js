import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getAppScroller } from '../context/ScrollContext';
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
    const defaultTitle = 'ElectroShock | 🔥 Tecnología y Componentes PC - Zona Sur, Buenos Aires';
    const defaultDescription = '🚀 Tu tienda de tecnología en Zona Sur, Buenos Aires. ✅ Componentes PC ⚡ Gaming 💻 Hardware 🎮 Periféricos. Catálogo actualizado, mejores precios y envíos rápidos.';
    const defaultKeywords = 'ElectroShock, componentes pc, hardware gaming, periféricos, tecnología, Zona Sur, Buenos Aires, placas video, procesadores, memorias ram, ssd, fuentes, refrigeración';
    
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

    // Reset de scroll instantáneo en el container de la app
    // (el window está fijo; el smooth global no aplica a scrollTop directo)
    const scroller = getAppScroller();
    if (scroller) {
      scroller.scrollTop = 0;
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [title, description, keywords, image, type, product, category, location]);
};

export const useProductSEO = (product) => {
  const title = product 
    ? `${product.name} - ${product.brand} | 🔥 ElectroShock`
    : 'ElectroShock | 🔥 Tecnología y Componentes PC - Zona Sur,  Buenos Aires.';
  
  const description = product 
    ? `🚀 ${product.name} de ${product.brand} en ElectroShock. 💰 $${product.price?.toLocaleString()} ✅ Stock disponible. ${generateProductDescription(product)}`
    : '🚀 Catálogo completo ElectroShock. ✅ Componentes PC 🎮 Gaming 💻 Hardware 🖱️ Periféricos. Mejores precios y calidad garantizada.';
  
  const keywords = product 
    ? `${generateProductKeywords(product)}, ElectroShock, Zona Sur,  Buenos Aires., ${product.brand.toLowerCase()}, ${product.category.toLowerCase()}`
    : 'ElectroShock, componentes pc, hardware gaming, tecnología, Zona Sur,  Buenos Aires.';
  
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
    ? `${category} | 🔥 ElectroShock - ${productCount} Productos Disponibles`
    : 'ElectroShock | 🔥 Tecnología y Componentes PC - Zona Sur,  Buenos Aires.';
  
  const description = category
    ? `🚀 Explorá ${productCount} productos de ${category.toLowerCase()} en ElectroShock Zona Sur,  Buenos Aires.. ✅ Stock actualizado 💰 Mejores precios ⚡ Envío rápido 🎮 Gaming y tecnología.`
    : '🚀 Catálogo completo ElectroShock. ✅ Componentes PC 🎮 Gaming 💻 Hardware 🖱️ Periféricos. Tu tienda de tecnología en Zona Sur,  Buenos Aires..';
  
  const keywords = category
    ? `${category.toLowerCase()}, ElectroShock, componentes pc, hardware, tecnología, Zona Sur,  Buenos Aires., gaming, ${category.toLowerCase()} gaming`
    : 'ElectroShock, componentes pc, hardware gaming, tecnología, Zona Sur,  Buenos Aires.';

  useSEO({
    title,
    description,
    keywords,
    type: 'website',
    category: category || null
  });
};
