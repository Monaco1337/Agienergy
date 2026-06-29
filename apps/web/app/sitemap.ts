import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seoSchemas';

interface SitemapEntry {
  path: string;
  priority?: number;
  changeFrequency?: MetadataRoute.Sitemap[number]['changeFrequency'];
}

const ENTRIES: SitemapEntry[] = [
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

  // Rechtliche Pflicht-/Hilfsseiten
  { path: '/datenschutz', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/impressum', priority: 0.3, changeFrequency: 'yearly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ENTRIES.map((e) => ({
    url: `${SITE_URL}${e.path}`,
    lastModified: now,
    changeFrequency: e.changeFrequency,
    priority: e.priority,
  }));
}
