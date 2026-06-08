/* eslint-disable no-console */
import { chromium } from 'playwright';
import path from 'node:path';

const BASE = process.env.BASE ?? 'http://localhost:3001';
const OUT = path.resolve(__dirname, '..', 'preview');

async function main() {
  const browser = await chromium.launch();
  const desktop = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    locale: 'de-DE',
  });
  const page = await desktop.newPage();
  await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  await page.locator('#energy-lead-form').screenshot({ path: path.join(OUT, '31-hero-form-upload.png') });
  console.log(' ', path.join(OUT, '31-hero-form-upload.png'));

  const mobile = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    locale: 'de-DE',
  });
  const mp = await mobile.newPage();
  await mp.goto(`${BASE}/`, { waitUntil: 'networkidle' });
  await mp.locator('#energy-lead-form').screenshot({ path: path.join(OUT, '32-hero-form-upload-mobile.png') });
  console.log(' ', path.join(OUT, '32-hero-form-upload-mobile.png'));

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
