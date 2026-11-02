import { PRODUCTS } from '../data/products';
import { SITE, CITIES, type CityKey, MODELS, REVIEWS, SIZES, type Model, VIDEOS } from '../data/site';

const U = SITE.url;

export const orgSchema = () => ({
  '@type': 'Organization',
  '@id': `${U}/#org`,
  name: SITE.name,
  legalName: SITE.legalName,
  url: `${U}/`,
  logo: `${U}/logo.png`,
  foundingDate: String(SITE.foundingYear),
  telephone: SITE.phone,
  sameAs: [SITE.instagram, SITE.twoGis],
  description: 'Фабрика ортопедических матрасов Softmatras: собственное производство, матрасы любого размера, шоурумы в Алматы и Астане.',
  areaServed: [{ '@type': 'City', name: 'Алматы' }, { '@type': 'City', name: 'Астана' }, { '@type': 'Country', name: 'Казахстан' }],
  aggregateRating: { '@type': 'AggregateRating', ratingValue: SITE.rating, ratingCount: SITE.ratingCount, reviewCount: SITE.reviewCount, bestRating: 5 },
});

export const websiteSchema = () => ({
  '@type': 'WebSite', '@id': `${U}/#website`, url: `${U}/`, name: 'Softmatras: ортопедические матрасы в Алматы и Астане', inLanguage: 'ru-KZ', publisher: { '@id': `${U}/#org` },
});

export const storeSchema = (city: CityKey) => {
  const c = CITIES[city];
  const s: any = {
    '@type': ['MattressStore', 'LocalBusiness'],
    '@id': `${U}/${city}/#store`,
    name: `Softmatras ${c.name}, матрасы ${c.in}`,
    url: `${U}/${city}/`,
    image: `${U}/img/matras-astana-zakat.jpg`,
    telephone: SITE.phone,
    priceRange: '49 900-278 000 ₸',
    currenciesAccepted: 'KZT',
    parentOrganization: { '@id': `${U}/#org` },
    address: { '@type': 'PostalAddress', streetAddress: c.address, addressLocality: c.name, addressRegion: c.region, addressCountry: 'KZ', ...(c.postal ? { postalCode: c.postal } : {}) },
    areaServed: { '@type': 'City', name: c.name },
    hasMap: c.map,
    sameAs: [SITE.instagram],
  };
  if (c.geo) s.geo = { '@type': 'GeoCoordinates', latitude: c.geo.lat, longitude: c.geo.lng };
  if (c.hours) s.openingHoursSpecification = [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], opens: '10:00', closes: '20:00' }];
  if (city === 'astana') {
    s.aggregateRating = { '@type': 'AggregateRating', ratingValue: SITE.rating, ratingCount: SITE.ratingCount, reviewCount: SITE.reviewCount, bestRating: 5 };
    s.review = REVIEWS.slice(0, 8).map(reviewNode);
  }
  return s;
};

export const reviewNode = (r: typeof REVIEWS[number]) => ({
  '@type': 'Review',
  author: { '@type': 'Person', name: r.name },
  datePublished: r.iso,
  reviewBody: r.text,
  inLanguage: r.lang === 'kk' ? 'kk' : 'ru',
  publisher: { '@type': 'Organization', name: '2ГИС' },
});

const CAT_NAME: Record<string, string> = { matras: 'Ортопедические матрасы', topper: 'Топперы', namatrasnik: 'Наматрасники', podushka: 'Ортопедические подушки' };
export const productSchema = (m: Model, size?: string, city?: CityKey) => {
  const prices = Object.values(m.prices);
  const urlPath = `${U}/katalog/${m.slug}/`;
  const one = size && m.prices[size] !== undefined ? m.prices[size] : prices.length === 1 ? prices[0] : undefined;
  const offers = one !== undefined
    ? { '@type': 'Offer', price: one, priceCurrency: 'KZT', availability: 'https://schema.org/InStock', url: urlPath, itemCondition: 'https://schema.org/NewCondition', ...(city ? { areaServed: CITIES[city].name } : {}), seller: { '@id': `${U}/#org` } }
    : { '@type': 'AggregateOffer', lowPrice: Math.min(...prices), highPrice: Math.max(...prices), offerCount: prices.length, priceCurrency: 'KZT', availability: 'https://schema.org/InStock', url: urlPath, seller: { '@id': `${U}/#org` } };
  return {
    '@type': 'Product',
    name: `${m.cat === 'matras' ? 'Ортопедический матрас ' : ''}${m.name}${size ? ' ' + size.replace('x', '×') : ''}`,
    description: m.text,
    brand: { '@type': 'Brand', name: SITE.name },
    category: CAT_NAME[m.cat],
    image: `${U}${m.img}`,
    sku: `SM-${m.slug}${size ? '-' + size : ''}`,
    additionalProperty: m.specs.map(([name, value]) => ({ '@type': 'PropertyValue', name, value })),
    offers,
  };
};

export const faqSchema = (items: { q: string; a: string }[]) => ({
  '@type': 'FAQPage',
  mainEntity: items.map((i) => ({ '@type': 'Question', name: i.q, acceptedAnswer: { '@type': 'Answer', text: i.a } })),
});

export const crumbsSchema = (items: { name: string; href: string }[]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: `${U}${it.href}` })),
});

export const videoSchemas = () =>
  VIDEOS.map((v) => ({
    '@type': 'VideoObject',
    name: v.title,
    description: v.text,
    thumbnailUrl: `${U}${v.poster}`,
    contentUrl: `${U}${v.src}`,
    uploadDate: `${v.date}T12:00:00+05:00`,
    duration: v.duration,
    publisher: { '@id': `${U}/#org` },
  }));

export const itemListSchema = () => ({
  '@type': 'ItemList',
  name: 'Каталог Softmatras: матрасы, топперы, наматрасники, подушки',
  itemListElement: PRODUCTS.map((m, i) => ({ '@type': 'ListItem', position: i + 1, url: `${U}/katalog/${m.slug}/`, name: m.name })),
});
