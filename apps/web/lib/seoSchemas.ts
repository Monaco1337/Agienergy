/**
 * JSON-LD-Helfer fuer SEO/Rich-Snippets.
 * Wirkt ohne Werbe-Spend: erhoeht CTR in den SERPs (FAQ-Snippets, Sitelinks,
 * Organization-Karte) und verbessert die maschinelle Verstaendlichkeit der Seite.
 */

export const SITE_URL =
  (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.agienergy.de').replace(/\/$/, '');

const BRAND = 'AGI Energy';
const TAGLINE = 'Persönliche Energieprüfung statt anonymer Tarifportale.';

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: BRAND,
    legalName: 'AGI Energy by AGI Works',
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/icon-512`,
    description: TAGLINE,
    areaServed: { '@type': 'Country', name: 'Deutschland' },
    sameAs: [] as string[],
  };
}

export function webSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name: BRAND,
    description: TAGLINE,
    inLanguage: 'de-DE',
    publisher: { '@id': `${SITE_URL}/#organization` },
  };
}

interface ServiceSchemaInput {
  path: string;
  name: string;
  description: string;
  serviceType: string;
}

export function serviceSchema({ path, name, description, serviceType }: ServiceSchemaInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}${path}#service`,
    name,
    serviceType,
    description,
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: { '@type': 'Country', name: 'Deutschland' },
    audience: { '@type': 'Audience', audienceType: 'Privatpersonen und Gewerbe in Deutschland' },
    url: `${SITE_URL}${path}`,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      description: 'Unverbindliche Erstprüfung – keine automatische Vertragsumstellung.',
    },
  };
}

export interface FaqItem {
  q: string;
  a: string;
}

export function faqSchema(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  };
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  };
}

export function jsonLdScriptProps(payload: unknown) {
  return {
    type: 'application/ld+json',
    dangerouslySetInnerHTML: { __html: JSON.stringify(payload) },
  } as const;
}
