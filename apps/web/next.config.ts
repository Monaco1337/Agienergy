import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    typedRoutes: false,
  },
  transpilePackages: ['@elo/ui', '@elo/core', '@elo/scoring', '@elo/storage', '@elo/mail', '@elo/audit', '@elo/experiments'],
  async redirects() {
    return [
      // SEO-Synonyme aus dem 7-Tage-Plan → vermeiden Duplicate-Content,
      // bündeln Ranking-Signal auf die kanonische Landingpage.
      { source: '/energiepruefung', destination: '/energiecheck', permanent: true },
      { source: '/photovoltaik-pruefen', destination: '/photovoltaik-beratung', permanent: true },
      { source: '/gewerbeenergie-pruefen', destination: '/gewerbe-energiecheck', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(self), geolocation=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
        ],
      },
    ];
  },
};

export default nextConfig;
