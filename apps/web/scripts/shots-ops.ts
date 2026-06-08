/* eslint-disable no-console */
import { chromium } from 'playwright';
import path from 'node:path';
import fs from 'node:fs/promises';

const BASE = 'http://localhost:3000';
const OUT = path.resolve(__dirname, '..', 'preview');

const ROUTES: { slug: string; url: string; full?: boolean }[] = [
  { slug: '20-cockpit', url: '/admin', full: true },
  { slug: '21-distribution', url: '/admin/distribution', full: true },
  { slug: '22-vertriebspartner', url: '/admin/vertriebspartner', full: true },
  { slug: '23-aufgaben', url: '/admin/aufgaben', full: true },
  { slug: '24-abschluesse', url: '/admin/abschluesse', full: true },
  { slug: '25-provisionen', url: '/admin/provisionen', full: true },
  { slug: '26-performance', url: '/admin/performance', full: true },
  { slug: '27-lead-feed', url: '/admin/lead-feed', full: true },
];

async function login(context: import('playwright').BrowserContext) {
  const page = await context.newPage();
  await page.goto(`${BASE}/admin/login`);
  await page.fill('input[name=email]', 'admin@example.com');
  await page.fill('input[name=password]', 'changeme1234!');
  await Promise.all([
    page.waitForURL((url) => !url.pathname.startsWith('/admin/login'), { timeout: 15_000 }),
    page.click('button[type=submit]'),
  ]);
  await page.close();
}

async function main() {
  await fs.mkdir(OUT, { recursive: true });
  const browser = await chromium.launch();
  const desktop = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    locale: 'de-DE',
  });
  await login(desktop);

  for (const r of ROUTES) {
    const page = await desktop.newPage();
    await page.goto(`${BASE}${r.url}`, { waitUntil: 'networkidle' });
    const file = path.join(OUT, `${r.slug}.png`);
    await page.screenshot({ path: file, fullPage: r.full ?? false });
    console.log('  ', file);
    await page.close();
  }

  const mobile = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    locale: 'de-DE',
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
  });
  await login(mobile);
  const mp = await mobile.newPage();
  await mp.goto(`${BASE}/admin`, { waitUntil: 'networkidle' });
  await mp.screenshot({ path: path.join(OUT, '28-mobile-cockpit.png'), fullPage: true });
  console.log('  ', path.join(OUT, '28-mobile-cockpit.png'));
  await mp.goto(`${BASE}/admin/distribution`, { waitUntil: 'networkidle' });
  await mp.screenshot({ path: path.join(OUT, '29-mobile-distribution.png'), fullPage: true });
  console.log('  ', path.join(OUT, '29-mobile-distribution.png'));

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
