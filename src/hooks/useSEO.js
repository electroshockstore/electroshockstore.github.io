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
    
    updateMetaTags({
      title: title || 'Shock-Store | Catálogo de Venta - Tecnología y Componentes PC',
      description: description || 'Catálogo de productos Shock-Store. Componentes de PC, periféricos gaming, hardware y tecnología. Berazategui y Florencio Varela.',
      keywords: keywords || 'shock-store, componentes pc, hardware, gaming, periféricos, tecnología, berazategui, florencio varela',
      image: image || '/logotipo_tiny.png',
      url,
      type
    });

    insertStructuredData(generateOrganizationSchema(), 'org-schema');

    if (product) {
      const productSchema = generateProductSchema(product);
      insertStructuredData(productSchema, 'product-schema');

      const breadcrumbs = [
        { name: 'Inicio', url: 'https://www.jldev.com.ar/' },
        { name: product.category, url: `https://www.jldev.com.ar/categoria/${product.category.toLowerCase()}` },
        { name: product.name, url: `https://www.jldev.com.ar${url}` }
      ];
      insertStructuredData(generateBreadcrumbSchema(breadcrumbs), 'breadcrumb-schema');
    } else if (category) {
      const breadcrumbs = [
        { name: 'Inicio', url: 'https://www.jldev.com.ar/' },
        { name: category, url: `https://www.jldev.com.ar${url}` }
      ];
      insertStructuredData(generateBreadcrumbSchema(breadcrumbs), 'breadcrumb-schema');
    } else {
      const productSchema = document.getElementById('product-schema');
      const breadcrumbSchema = document.getElementById('breadcrumb-schema');
      if (productSchema) productSchema.remove();
      if (breadcrumbSchema) breadcrumbSchema.remove();
    }

    window.scrollTo(0, 0);
  }, [title, description, keywords, image, type, product, category, location]);
};

export const useProductSEO = (product) => {
  const title = product 
    ? `${product.name} - ${product.brand} | Shock-Store`
    : 'Shock-Store | Catálogo de Venta - Tecnología y Componentes PC';
  
  const description = product 
    ? generateProductDescription(product)
    : 'Catálogo completo de productos Shock-Store. Encuentra los mejores componentes para PC, hardware gaming, periféricos y más.';
  
  const keywords = product 
    ? generateProductKeywords(product)
    : 'shock-store, componentes pc, hardware, gaming, tecnología';
  
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
    ? `${category} | Shock-Store - Catálogo de Productos`
    : 'Shock-Store | Catálogo de Venta - Tecnología y Componentes PC';
  
  const description = category
    ? `Explorá nuestro catálogo de ${category.toLowerCase()} en Shock-Store. ${productCount} productos disponibles. Componentes de PC, hardware y tecnología. Berazategui y Florencio Varela.`
    : 'Catálogo completo de productos Shock-Store. Encuentra los mejores componentes para PC, hardware gaming, periféricos y más.';
  
  const keywords = category
    ? `${category.toLowerCase()}, shock-store, componentes pc, hardware, tecnología, berazategui`
    : 'shock-store, componentes pc, hardware, gaming, tecnología';

  useSEO({
    title,
    description,
    keywords,
    type: 'website',
    category: category || null
  });
};
