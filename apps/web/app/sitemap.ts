import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seoSchemas';
import { RATGEBER_ARTICLES } from '@/data/ratgeberArticles';
import { GLOSSARY } from '@/data/energyGlossary';
import { CITIES } from '@/data/germanCities';

interface SitemapEntry {
  path: string;
  priority?: number;
  changeFrequency?: MetadataRoute.Sitemap[number]['changeFrequency'];
  lastModified?: Date;
}

const STATIC_ENTRIES: SitemapEntry[] = [
  { path: '', priority: 1, changeFrequency: 'weekly' },
  { path: '/energiecheck', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/stromkosten-senken', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/gaskosten-senken', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/photovoltaik-beratung', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/gewerbe-energiecheck', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/energieberatung-deutschland', priority: 0.7, changeFrequency: 'weekly' },

  // Neue intent-spezifische Landingpages (No-Spend SEO-Hebel)
  { path: '/stromvertrag-pruefen', priority: 0.85, changeFrequency: 'weekly' },
  { path: '/gasvertrag-pruefen', priority: 0.85, changeFrequency: 'weekly' },
  { path: '/jahresabrechnung-pruefen', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/anbieterwechsel-pruefen', priority: 0.8, changeFrequency: 'weekly' },

  // Hilfsseiten / Topic-Authority
  { path: '/fragen-antworten', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/ratgeber', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/glossar', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/energieberatung', priority: 0.75, changeFrequency: 'weekly' },
  { path: '/newsletter', priority: 0.55, changeFrequency: 'monthly' },

  // Kontakt-Seite
  { path: '/kontakt', priority: 0.65, changeFrequency: 'monthly' },

  // Rechtliche Pflicht-/Hilfsseiten
  { path: '/datenschutz', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/impressum', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/agb', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/widerruf', priority: 0.3, changeFrequency: 'yearly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const articleEntries: SitemapEntry[] = RATGEBER_ARTICLES.map((a) => ({
    path: `/ratgeber/${a.slug}`,
    priority: 0.6,
    changeFrequency: 'monthly',
    lastModified: new Date(a.publishedAt),
  }));

  const glossaryEntries: SitemapEntry[] = GLOSSARY.map((g) => ({
    path: `/glossar/${g.slug}`,
    priority: 0.4,
    changeFrequency: 'monthly',
  }));

  const cityEntries: SitemapEntry[] = CITIES.map((c) => ({
    path: `/energieberatung/${c.slug}`,
    priority: 0.55,
    changeFrequency: 'monthly',
  }));

  return [
    ...STATIC_ENTRIES,
    ...articleEntries,
    ...glossaryEntries,
    ...cityEntries,
  ].map((e) => ({
    url: `${SITE_URL}${e.path}`,
    lastModified: e.lastModified ?? now,
    changeFrequency: e.changeFrequency,
    priority: e.priority,
  }));
}
