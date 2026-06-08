/* eslint-disable no-console */
import { chromium } from 'playwright';
import path from 'node:path';
import fs from 'node:fs/promises';

const BASE = 'http://localhost:3000';
const OUT = path.resolve(__dirname, '..', 'preview');

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
  const file = path.resolve(OUT, '..', 'data', 'leads.json');
  const db = JSON.parse(await fs.readFile(file, 'utf8')) as { leads: { id: string }[] };
  const leadId = db.leads[0]?.id;
  if (!leadId) throw new Error('No lead in db');

  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 1100 },
    deviceScaleFactor: 2,
    locale: 'de-DE',
  });
  await login(ctx);

  const p = await ctx.newPage();
  await p.goto(`${BASE}/admin/leads/${leadId}`, { waitUntil: 'networkidle' });
  await p.screenshot({ path: path.join(OUT, '30-lead-drawer.png'), fullPage: true });
  console.log('  ', path.join(OUT, '30-lead-drawer.png'));

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
