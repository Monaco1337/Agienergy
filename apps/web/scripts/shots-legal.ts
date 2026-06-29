/* eslint-disable no-console */
import { chromium } from 'playwright';
import path from 'node:path';
import fs from 'node:fs/promises';

const BASE = process.env['BASE'] ?? 'http://localhost:3030';
const OUT = path.resolve(__dirname, '..', 'preview-legal');

const shots: Array<{ name: string; url: string; accept?: boolean }> = [
  { name: '00-cookiebanner', url: '/', accept: false },
  { name: '01-impressum', url: '/impressum', accept: true },
  { name: '02-datenschutz', url: '/datenschutz', accept: true },
  { name: '03-agb', url: '/agb', accept: true },
  { name: '04-widerruf', url: '/widerruf', accept: true },
  { name: '05-kontakt', url: '/kontakt', accept: true },
  { name: '06-staedte-index', url: '/energieberatung', accept: true },
  { name: '07-landing-mit-footer', url: '/', accept: true },
];

async function main() {
  await fs.mkdir(OUT, { recursive: true });
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });

  for (const s of shots) {
    const page = await ctx.newPage();
    await page.goto(`${BASE}${s.url}`, { waitUntil: 'domcontentloaded' });
    if (s.accept) {
      try {
        await page.click('text=Alle akzeptieren', { timeout: 1500 });
      } catch {
        /* Banner already dismissed */
      }
    }
    await page.waitForTimeout(900);
    await page.screenshot({ path: path.join(OUT, `${s.name}.png`), fullPage: true });
    console.log('OK', s.name);
    await page.close();
  }
  await browser.close();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
