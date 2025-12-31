export const updateMetaTags = ({ title, description, keywords, image, url, type = 'website' }) => {
  if (title) {
    document.title = title;
    updateMetaTag('og:title', title);
    updateMetaTag('twitter:title', title);
  }

  if (description) {
    updateMetaTag('description', description);
    updateMetaTag('og:description', description);
    updateMetaTag('twitter:description', description);
  }

  if (keywords) {
    updateMetaTag('keywords', keywords);
  }

  if (image) {
    const fullImageUrl = image.startsWith('http') ? image : `https://www.jldev.com.ar${image}`;
    updateMetaTag('og:image', fullImageUrl);
    updateMetaTag('twitter:image', fullImageUrl);
  }

  if (url) {
    const fullUrl = url.startsWith('http') ? url : `https://www.jldev.com.ar${url}`;
    updateMetaTag('og:url', fullUrl);
    updateMetaTag('twitter:url', fullUrl);
    updateLinkTag('canonical', fullUrl);
  }

  updateMetaTag('og:type', type);
};

const updateMetaTag = (name, content) => {
  const isProperty = name.startsWith('og:') || name.startsWith('twitter:');
  const attribute = isProperty ? 'property' : 'name';
  
  let element = document.querySelector(`meta[${attribute}="${name}"]`);
  
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }
  
  element.setAttribute('content', content);
};

const updateLinkTag = (rel, href) => {
  let element = document.querySelector(`link[rel="${rel}"]`);
  
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  
  element.setAttribute('href', href);
};

export const generateProductSchema = (product) => {
  const schema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "brand": {
      "@type": "Brand",
      "name": product.brand
    },
    "description": product.description || `${product.name} - ${product.brand}`,
    "sku": product.id.toString(),
    "offers": {
      "@type": "Offer",
      "url": `https://www.jldev.com.ar/categoria/${product.category.toLowerCase()}/${product.id}`,
      "priceCurrency": "ARS",
      "price": product.price,
      "availability": product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "seller": {
        "@type": "Organization",
        "name": "Shock-Store"
      }
    }
  };

  if (product.images && product.images.length > 0) {
    schema.image = product.images.map(img => 
      img.startsWith('http') ? img : `https://www.jldev.com.ar${img}`
    );
  }

  return schema;
};

export const generateOrganizationSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Store",
    "name": "Shock-Store",
    "description": "Tienda de componentes de PC, periféricos gaming, hardware y tecnología en Berazategui y Florencio Varela",
    "url": "https://www.jldev.com.ar",
    "logo": "https://www.jldev.com.ar/logotipo_tiny.png",
    "image": "https://www.jldev.com.ar/logotipo_tiny.png",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Berazategui",
      "addressRegion": "Buenos Aires",
      "addressCountry": "AR"
    },
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "-34.76",
        "longitude": "-58.21"
      },
      "geoRadius": "50000"
    },
    "priceRange": "$$",
    "telephone": "+54",
    "sameAs": []
  };
};

export const generateBreadcrumbSchema = (items) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
};

export const insertStructuredData = (schema, id = 'structured-data') => {
  let script = document.getElementById(id);
  
  if (!script) {
    script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  
  script.textContent = JSON.stringify(schema);
};

export const generateProductKeywords = (product) => {
  const keywords = [
    product.name,
    product.brand,
    product.model,
    product.category,
    'shock-store',
    'componentes pc',
    'hardware',
    'tecnología',
    'berazategui',
    'florencio varela'
  ];

  if (product.specifications) {
    const specs = product.specifications;
    if (specs.socket) keywords.push(specs.socket);
    if (specs.memoriaRAM) keywords.push(specs.memoriaRAM);
    if (specs.nucleos) keywords.push(`${specs.nucleos} núcleos`);
  }

  return keywords.filter(Boolean).join(', ');
};

export const generateProductDescription = (product) => {
  const baseDesc = product.description || `${product.name} - ${product.brand}`;
  const price = `$${product.price.toLocaleString('es-AR')}`;
  const stock = product.stock > 0 ? 'Disponible' : 'Sin stock';
  
  return `${baseDesc}. Precio: ${price}. ${stock} en Shock-Store. Envíos a todo el país. Berazategui y Florencio Varela.`;
};
