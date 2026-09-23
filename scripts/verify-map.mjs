import assert from 'node:assert/strict';
import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const baseURL = process.env.TEST_BASE_URL || 'http://localhost:3000';
const browser = await chromium.launch({ channel: process.env.PLAYWRIGHT_CHANNEL || 'chrome' });
const errors = [];
try {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
  const page = await context.newPage();
  const tiles = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('request', request => { if (request.url().includes('tile.openstreetmap.org')) tiles.push(request.url()); });
  await page.goto(baseURL);
  await page.evaluate(() => document.fonts.ready);
  assert.equal(tiles.length, 0, 'No map tiles requested before approaching the section');
  await page.locator('#localizacao').scrollIntoViewIfNeeded();
  await page.getByRole('button', { name: 'Voltar à localização da Athos' }).waitFor();
  await page.waitForFunction(() => [...document.querySelectorAll('.leaflet-tile-loaded')].some(img => img.naturalWidth > 0));
  // This is the map tile containing the business pin, not the Google camera center.
  const latitude = -10.8746245, longitude = -61.9629766, z = 17;
  const x = Math.floor((longitude + 180) / 360 * 2 ** z);
  const y = Math.floor((1 - Math.asinh(Math.tan(latitude * Math.PI / 180)) / Math.PI) / 2 * 2 ** z);
  assert.ok(tiles.some(url => url.includes(`/${z}/${x}/${y}.png`)), 'Verified business location is visible');
  const marker = page.locator('.athos-map-marker');
  const initialPosition = await marker.getAttribute('style');
  await page.getByRole('button', { name: 'Aproximar mapa', exact: true }).click();
  await page.waitForFunction(() => [...document.querySelectorAll('.leaflet-tile')].some(img => img.src.includes('/18/')));
  await page.getByRole('button', { name: 'Afastar mapa', exact: true }).click();
  const canvas = page.locator('.location-map-canvas');
  const box = await canvas.boundingBox();
  await page.mouse.move(box.x + box.width / 2 - 80, box.y + box.height / 2 + 80);
  const beforeDrag = await marker.boundingBox();
  await page.mouse.down();
  await page.mouse.move(box.x + box.width / 2 + 40, box.y + box.height / 2 + 130, { steps: 12 });
  await page.mouse.up();
  await page.waitForFunction(x => Math.abs(document.querySelector('.athos-map-marker').getBoundingClientRect().x - x) > 40, beforeDrag.x);
  await page.getByRole('button', { name: 'Voltar à localização da Athos' }).click();
  await page.waitForFunction(style => document.querySelector('.athos-map-marker').getAttribute('style') === style, initialPosition);
  await marker.click();
  await page.locator('.athos-map-popup').waitFor();
  assert.match(await page.locator('.athos-map-popup').textContent(), /Rua Monte Castelo, 452/);
  assert.equal(await page.locator('.athos-map-popup a').getAttribute('href'), 'https://maps.app.goo.gl/2mTcRD3yX1iBPRYY6');
  const axe = await new AxeBuilder({ page }).include('#localizacao').analyze();
  assert.deepEqual(axe.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.target) })), []);
  await page.locator('.leaflet-popup-close-button').click();
  for (const width of [360, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.locator('#localizacao').scrollIntoViewIfNeeded();
    const rect = await canvas.boundingBox();
    assert.ok(rect.x >= 0 && rect.x + rect.width <= width + 1 && rect.height >= 350);
    assert.ok(await page.locator('.leaflet-control-attribution').isVisible());
  }
  await page.locator('#localizacao').screenshot({ path: '/tmp/athos-map-desktop.png' });
  await page.setViewportSize({ width: 390, height: 1100 });
  await page.locator('#localizacao').screenshot({ path: '/tmp/athos-map-mobile.png' });

  const offline = await browser.newPage({ viewport: { width: 390, height: 1000 }, reducedMotion: 'reduce' });
  await offline.route('https://tile.openstreetmap.org/**', route => route.abort());
  await offline.goto(baseURL);
  await offline.locator('#localizacao').scrollIntoViewIfNeeded();
  await offline.getByText('Não foi possível carregar o mapa.').waitFor();
  assert.ok(await offline.getByRole('link', { name: 'Abrir localização ↗' }).isVisible());
  await offline.unroute('https://tile.openstreetmap.org/**');
  await offline.getByRole('button', { name: 'Tentar novamente' }).click();
  await offline.getByRole('button', { name: 'Voltar à localização da Athos' }).waitFor();

  const noJs = await browser.newPage({ javaScriptEnabled: false });
  await noJs.goto(baseURL);
  assert.ok(await noJs.locator('.map-status noscript p').isVisible());
  assert.ok(await noJs.getByRole('link', { name: 'Abrir rota no Maps' }).isVisible());
  assert.deepEqual(errors, []);
  console.log('Map passed: lazy loading, real tiles, verified position, zoom, drag/recenter, popup/route, resize, accessibility, failed tiles/retry and no-JS fallback.');
} finally {
  await browser.close();
}
