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
      image: image || '/logotipo.png',
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
  if (!product) return;

  const title = `${product.name} - ${product.brand} | Shock-Store`;
  const description = generateProductDescription(product);
  const keywords = generateProductKeywords(product);
  const image = product.images?.[0] || '/logotipo.png';

  useSEO({
    title,
    description,
    keywords,
    image,
    type: 'product',
    product
  });
};

export const useCategorySEO = (category, productCount) => {
  if (!category) return;

  const title = `${category} | Shock-Store - Catálogo de Productos`;
  const description = `Explorá nuestro catálogo de ${category.toLowerCase()} en Shock-Store. ${productCount} productos disponibles. Componentes de PC, hardware y tecnología. Berazategui y Florencio Varela.`;
  const keywords = `${category.toLowerCase()}, shock-store, componentes pc, hardware, tecnología, berazategui`;

  useSEO({
    title,
    description,
    keywords,
    type: 'website',
    category
  });
};
