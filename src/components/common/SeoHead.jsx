import { useEffect } from 'react';

const SITE_URL = 'https://shri-metro-products.vercel.app';

const BASE_KEYWORDS = [
  'ShriMetro',
  'ShriMetro Plastic Moulded Furniture',
  'Shri Metro Products',
  'plastic chairs manufacturer in Bangalore',
  'moulded plastic furniture manufacturer India',
  'wholesale plastic chairs Bangalore',
  'high grade purity polypropylene and co-polymers furniture',
  'heavy duty 200kg plastic chairs',
  'monobloc chairs wholesale Bangalore',
  'banquet chairs manufacturer Karnataka',
  'armless event chairs wholesale',
  'cafeteria chairs Bangalore',
  'relax plastic chairs',
  'baby study chairs plastic',
  'plastic dining tables wholesale',
  'center tables teapoy plastic',
  'heavy duty plastic stools',
  'bathroom patla manufacturer',
  'UV stabilized outdoor plastic furniture',
  'Kumbalgodu plastic furniture factory',
  'Vaishno Devi Industrial Estate Gerupalya Kumbalgodu',
  'Rakesh R Jain ShriMetro'
];

function setMetaTag(selector, attrName, attrValue, content) {
  if (typeof document === 'undefined') return;
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attrName, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(url) {
  if (typeof document === 'undefined') return;
  let link = document.head.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', url);
}

export default function SeoHead({
  isAdmin = false,
  isAboutPageOpen = false,
  isCatalogueBookOpen = false,
  selectedCategory = 'All Products',
  selectedProduct = null,
  products = [],
  company = {}
}) {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    // 1. Admin Portal: prevent search engine indexing of private admin console
    if (isAdmin) {
      document.title = 'ShriMetro | Administrative Command Portal';
      setMetaTag('meta[name="robots"]', 'name', 'robots', 'noindex, nofollow');
      setMetaTag('meta[name="googlebot"]', 'name', 'googlebot', 'noindex, nofollow');
      return;
    }

    // Public pages: ensure full indexing
    setMetaTag(
      'meta[name="robots"]',
      'name',
      'robots',
      'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    );
    setMetaTag(
      'meta[name="googlebot"]',
      'name',
      'googlebot',
      'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    );

    let title = 'ShriMetro | #1 Plastic Moulded Furniture Manufacturer in Bangalore | Wholesale Chairs, Tables & Stools';
    let description =
      "ShriMetro is Bangalore's leading manufacturer & wholesale supplier of heavy-duty plastic moulded furniture made from high grade purity polypropylene and co-polymers. Direct factory pricing on 43+ models of Monobloc Chairs, Banquet Chairs, Armless Chairs, Cafeteria Chairs, Relax Chairs, Baby Chairs, Dining Tables, Center Tables, Stools & Patlas from Kumbalgodu, Bengaluru.";
    let keywords = [...BASE_KEYWORDS];
    let canonicalUrl = `${SITE_URL}/`;
    let ogImage = `${SITE_URL}/logo-emblem.png`;

    if (selectedProduct) {
      const pName = selectedProduct.name || 'Plastic Moulded Furniture';
      const pCode = selectedProduct.modelCode || '';
      const pCat = selectedProduct.category || 'Moulded Furniture';
      const pMat = selectedProduct.material || 'High-Grade Purity Polypropylene & Co-Polymers';
      title = `${pName} (${pCode}) | ${pCat} | ShriMetro Plastic Moulded Furniture Bangalore`;
      description = `Buy ${pName} (${pCode}) wholesale direct from ShriMetro Bangalore factory. ${selectedProduct.description || ''} Manufactured from ${pMat} with ${selectedProduct.loadCapacityKg || '200 kg'} static load tolerance.`.trim();
      keywords = [
        pName,
        `${pName} ${pCode}`,
        `ShriMetro ${pName}`,
        `${pCat} wholesale Bangalore`,
        pMat,
        ...BASE_KEYWORDS
      ];
      canonicalUrl = `${SITE_URL}/#product-${encodeURIComponent(pCode || selectedProduct.id)}`;
      if (selectedProduct.image) {
        ogImage = selectedProduct.image.startsWith('http')
          ? selectedProduct.image
          : `${SITE_URL}${selectedProduct.image}`;
      }
    } else if (isCatalogueBookOpen) {
      title = 'Official Digital Product Catalogue (43+ Models) | ShriMetro Plastic Moulded Furniture Bangalore';
      description =
        'Browse the interactive 3D ShriMetro Digital Product Catalogue featuring all 43+ heavy-duty plastic chairs, dining tables, center tables, stools, and patlas manufactured from High-Grade Purity Polypropylene & Co-Polymers in Kumbalgodu, Bangalore.';
      keywords = [
        'ShriMetro digital catalogue',
        'plastic furniture catalogue PDF Bangalore',
        'wholesale plastic chairs price list Bangalore',
        ...BASE_KEYWORDS
      ];
      canonicalUrl = `${SITE_URL}/#catalogue`;
    } else if (isAboutPageOpen) {
      title = 'About ShriMetro | Kumbalgodu Plastic Moulded Furniture Manufacturing Plant Bangalore (Since 2012)';
      description =
        'Learn about ShriMetro (Est. 2012 by Rakesh R Jain) at Vaishno Devi Industrial Estate, Kumbalgodu, Bangalore. 2,000+ units/day injection moulding capacity using High-Grade Purity Polypropylene & Co-Polymers.';
      keywords = [
        'About ShriMetro',
        'Rakesh R Jain ShriMetro',
        'Kumbalgodu plastic furniture factory Bangalore',
        'Vaishno Devi Industrial Estate Gerupalya',
        ...BASE_KEYWORDS
      ];
      canonicalUrl = `${SITE_URL}/#about`;
    } else if (selectedCategory && selectedCategory !== 'All Products') {
      title = `${selectedCategory} Wholesale Manufacturer in Bangalore | ShriMetro Plastic Moulded Furniture`;
      description = `Explore ShriMetro's heavy-duty ${selectedCategory} engineered from High-Grade Purity Polypropylene & Co-Polymers (200 kg tested load capacity). Direct factory wholesale dispatch from Kumbalgodu, Bangalore across South India.`;
      keywords = [
        `${selectedCategory} Bangalore`,
        `wholesale ${selectedCategory} manufacturer`,
        `ShriMetro ${selectedCategory}`,
        ...BASE_KEYWORDS
      ];
    }

    document.title = title;
    setMetaTag('meta[name="title"]', 'name', 'title', title);
    setMetaTag('meta[name="description"]', 'name', 'description', description);
    setMetaTag('meta[name="keywords"]', 'name', 'keywords', keywords.join(', '));
    setCanonical(canonicalUrl);

    // Open Graph & Twitter tags
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', title);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    setMetaTag('meta[property="og:image"]', 'property', 'og:image', ogImage);
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage);

    // 2. Dynamic JSON-LD Schema Injection for All Products & Active Product Detail
    let scriptEl = document.getElementById('shrimetro-dynamic-schema');
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = 'shrimetro-dynamic-schema';
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }

    const itemListElements = (products || []).slice(0, 45).map((p, idx) => {
      const imgUrl = p.image
        ? p.image.startsWith('http')
          ? p.image
          : `${SITE_URL}${p.image}`
        : `${SITE_URL}/logo-emblem.png`;

      return {
        '@type': 'ListItem',
        position: idx + 1,
        item: {
          '@type': 'Product',
          name: `ShriMetro ${p.name} (${p.modelCode})`,
          sku: p.modelCode || p.id,
          mpn: p.modelCode || p.id,
          category: p.category,
          material: p.material || 'High-Grade Purity Polypropylene & Co-Polymers',
          image: imgUrl,
          description:
            p.description ||
            `${p.name} (${p.modelCode}) heavy-duty ${p.category} manufactured by ShriMetro in Bangalore from High-Grade Purity Polypropylene & Co-Polymers.`,
          brand: {
            '@type': 'Brand',
            name: company?.name || 'ShriMetro'
          },
          manufacturer: {
            '@type': 'Organization',
            name: company?.name || 'ShriMetro',
            address: 'Site no: 10, 11 Gerupalya, Vaishno Devi Industrial Estate, Kumbalgodu, Bangalore - 560074'
          },
          additionalProperty: [
            {
              '@type': 'PropertyValue',
              name: 'Load Capacity',
              value: p.loadCapacityKg || '200 kg'
            },
            {
              '@type': 'PropertyValue',
              name: 'Dimensions',
              value: p.dimensions || 'Standard Commercial'
            },
            {
              '@type': 'PropertyValue',
              name: 'Material Grade',
              value: p.material || 'High-Grade Purity Polypropylene & Co-Polymers'
            }
          ]
        }
      };
    });

    const schemaPayload = {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'ShriMetro Plastic Moulded Furniture Complete Wholesale Catalog',
      description:
        'All 43+ heavy-duty injection-moulded plastic chairs, dining tables, center tables, stools, and patlas manufactured by ShriMetro in Kumbalgodu, Bangalore.',
      numberOfItems: itemListElements.length,
      itemListElement: itemListElements
    };

    scriptEl.textContent = JSON.stringify(schemaPayload);
  }, [isAdmin, isAboutPageOpen, isCatalogueBookOpen, selectedCategory, selectedProduct, products, company]);

  return null;
}
