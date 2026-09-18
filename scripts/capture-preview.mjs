import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { chromium } from '@playwright/test';

// Refresh visual evidence after asset-only changes without repeating unrelated checks.
const browser = await chromium.launch({ channel: process.env.PLAYWRIGHT_CHANNEL || 'chrome' });
await fs.mkdir('docs/screenshots', { recursive: true });
try {
  for (const width of [360, 390, 768, 1024, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 960 }, reducedMotion: 'reduce' });
    await page.goto(process.env.TEST_BASE_URL || 'http://localhost:3000', { waitUntil: 'networkidle' });
    await page.evaluate(async () => {
      await document.fonts.ready;
      for (let y = 0; y < document.body.scrollHeight; y += 750) {
        window.scrollTo(0, y);
        await new Promise(resolve => setTimeout(resolve, 65));
      }
      await Promise.race([
        Promise.all([...document.images].filter(img => img.getClientRects().length).map(img => img.decode().catch(() => {}))),
        new Promise(resolve => setTimeout(resolve, 5000)),
      ]);
      window.scrollTo(0, 0);
    });
    const measurement = await page.evaluate(() => ({
      width: innerWidth,
      documentWidth: document.documentElement.scrollWidth,
      broken: [...document.images].filter(img => img.getClientRects().length && (!img.complete || !img.naturalWidth)).map(img => img.src),
    }));
    assert.equal(measurement.documentWidth, width);
    assert.deepEqual(measurement.broken, []);
    await page.screenshot({ path: `docs/screenshots/athos-${width}.png`, fullPage: true });
    console.log(JSON.stringify(measurement));
    await page.close();
  }
} finally { await browser.close(); }
