import { generateSKU, getSlugFromCategory } from './slugify';

export const SITE_URL = 'https://www.electroshock.com.ar';

export const updateMetaTags = ({
  title,
  description,
  keywords,
  image,
  imageAlt,
  url,
  type = 'website',
  robots,
  twitterCard,
}) => {
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
    const fullImageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`;
    updateMetaTag('og:image', fullImageUrl);
    updateMetaTag('twitter:image', fullImageUrl);
    if (imageAlt) {
      updateMetaTag('og:image:alt', imageAlt);
      updateMetaTag('twitter:image:alt', imageAlt);
    }
  }

  if (url) {
    const fullUrl = url.startsWith('http') ? url : `${SITE_URL}${url}`;
    updateMetaTag('og:url', fullUrl);
    updateMetaTag('twitter:url', fullUrl);
    updateLinkTag('canonical', fullUrl);
  }

  // Open Graph no tiene tipo "product": las fichas usan "website" y el
  // marcado de producto vive en JSON-LD (Schema.org).
  updateMetaTag('og:type', type === 'product' ? 'website' : type);

  if (twitterCard) {
    updateMetaTag('twitter:card', twitterCard);
  } else if (type === 'product') {
    updateMetaTag('twitter:card', 'summary_large_image');
  }

  if (robots) {
    updateMetaTag('robots', robots);
  }
};

const updateMetaTag = (name, content) => {
  // Solo Open Graph usa `property`. Twitter y meta estándar usan `name`.
  // Además eliminamos restos legacy `property="twitter:..."` para no duplicar.
  if (name.startsWith('twitter:')) {
    const legacy = document.querySelector(`meta[property="${name}"]`);
    if (legacy) legacy.remove();
  }
  const attribute = name.startsWith('og:') ? 'property' : 'name';

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

export const generateProductSchema = (product, canonicalUrl) => {
  const categorySlug = getSlugFromCategory(product.category);
  const sku = generateSKU(product.name, product.brand);
  const url = canonicalUrl || `${SITE_URL}/categoria/${categorySlug}/${sku}`;

  const schema = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.name,
    "url": url,
    "brand": {
      "@type": "Brand",
      "name": product.brand
    },
    "description": product.description || `${product.name} - ${product.brand}`,
    "sku": sku,
    "offers": {
      "@type": "Offer",
      "url": url,
      "priceCurrency": "ARS",
      "price": product.price,
      "availability": product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "seller": {
        "@type": "Organization",
        "name": "ElectroShock"
      }
    }
  };

  if (product.model) {
    schema.model = product.model;
  }

  if (product.category) {
    schema.category = product.category;
  }

  if (product.images && product.images.length > 0) {
    schema.image = product.images.map(img =>
      img.startsWith('http') ? img : `${SITE_URL}${img}`
    );
  }

  return schema;
};

export const generateOrganizationSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Store",
    "name": "ElectroShock",
    "description": "Tienda de componentes de PC, periféricos gaming, hardware y tecnología en Zona Sur,  Buenos Aires. y Florencio Varela",
    "url": SITE_URL,
    "logo": `${SITE_URL}/logotipo_tiny.png`,
    "image": `${SITE_URL}/logotipo_tiny.png`,
    "telephone": "+54-11-2571-8382",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Zona Sur,  Buenos Aires.",
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
    "sameAs": [
      "https://www.instagram.com/shock.store.ok/"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+54-11-2571-8382",
      "contactType": "customer service",
      "availableLanguage": "Spanish"
    }
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
    'ElectroShock',
    'componentes pc',
    'hardware',
    'tecnología',
    'Zona Sur,  Buenos Aires.',
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
  
  return `${baseDesc}. Precio: ${price}. ${stock} en ElectroShock. Envíos a todo el país. Zona Sur,  Buenos Aires. y Florencio Varela.`;
};
