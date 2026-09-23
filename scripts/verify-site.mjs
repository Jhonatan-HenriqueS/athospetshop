import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const baseURL = process.env.TEST_BASE_URL || 'http://localhost:3000';
const browser = await chromium.launch({ channel: process.env.PLAYWRIGHT_CHANNEL || 'chrome' });
const report = { checkedAt: new Date().toISOString(), baseURL, viewports: [], errors: [], checks: [] };
await fs.mkdir('docs/screenshots', { recursive: true });
try {
  for (const width of [360, 390, 768, 1024, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: 960 }, reducedMotion: 'reduce', hasTouch: width === 390 });
    const page = await context.newPage();
    page.on('pageerror', error => report.errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error') report.errors.push(message.text()); });
    const response = await page.goto(baseURL, { waitUntil: 'networkidle' });
    assert.equal(response.status(), 200);
    await page.evaluate(async () => {
      await document.fonts.ready;
      for (let y = 0; y < document.body.scrollHeight; y += 750) {
        window.scrollTo(0, y);
        await new Promise(resolve => setTimeout(resolve, 65));
      }
      await Promise.race([
        Promise.all([...document.images].filter(img => img.getClientRects().length > 0).map(img => img.decode().catch(() => {}))),
        new Promise(resolve => setTimeout(resolve, 5000)),
      ]);
      window.scrollTo(0, 0);
    });
    const measurements = await page.evaluate(() => ({
      documentWidth: document.documentElement.scrollWidth,
      viewportWidth: innerWidth,
      brokenImages: [...document.images].filter(img => img.getClientRects().length > 0 && (!img.complete || img.naturalWidth === 0)).map(img => img.src),
      clippedButtons: [...document.querySelectorAll('main [data-slot="button"]')].filter(el => el.scrollWidth > el.clientWidth + 1).map(el => el.textContent),
      h1Count: document.querySelectorAll('h1').length,
      locale: document.documentElement.lang,
    }));
    assert.equal(measurements.documentWidth, width, `Horizontal overflow at ${width}`);
    assert.deepEqual(measurements.brokenImages, []);
    assert.deepEqual(measurements.clippedButtons, []);
    assert.equal(measurements.h1Count, 1);
    assert.equal(measurements.locale, 'pt-BR');
    const accessibility = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
    const violations = accessibility.violations.map(v => ({ id: v.id, impact: v.impact, nodes: v.nodes.map(n => ({ target: n.target, summary: n.failureSummary })) }));
    assert.deepEqual(violations, [], `Accessibility issues at ${width}: ${JSON.stringify(violations)}`);
    await page.screenshot({ path: `docs/screenshots/athos-${width}.png`, fullPage: true });
    report.viewports.push({ width, ...measurements, axeViolations: violations.length });
    console.log(`PASS ${width}px: layout, images, buttons and automated accessibility`);
    if (width === 390) {
      await page.setViewportSize({ width, height: 568 });
      const trigger = page.getByRole('button', { name: 'Abrir menu de navegação' });
      await trigger.focus(); await page.keyboard.press('Enter');
      await page.getByRole('dialog').waitFor({ state: 'visible' });
      const menuContact = page.getByRole('dialog').getByRole('link', { name: 'Falar no WhatsApp' });
      await menuContact.scrollIntoViewIfNeeded();
      const contactBounds = await menuContact.boundingBox();
      assert.ok(contactBounds.width > 250, 'Menu CTA uses full available width');
      assert.ok(contactBounds.height >= 44 && contactBounds.y + contactBounds.height <= 568, 'Menu CTA reachable in a short viewport');
      assert.equal(await menuContact.evaluate(el => el.scrollWidth <= el.clientWidth + 1), true, 'Menu CTA label is not clipped');
      const menuAxe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
      assert.deepEqual(menuAxe.violations.map(v => v.id), []);
      await page.screenshot({ path: 'docs/screenshots/menu-short.png' });
      await page.keyboard.press('Escape');
      await page.getByRole('dialog').waitFor({ state: 'hidden' });
      assert.equal(await trigger.evaluate(el => el === document.activeElement), true, 'Menu restores focus');
      await page.setViewportSize({ width, height: 960 });
      await trigger.tap();
      await page.getByRole('navigation', { name: 'Navegação móvel' }).getByRole('link', { name: 'Dúvidas' }).tap();
      await page.getByRole('dialog').waitFor({ state: 'hidden' });
      await page.waitForURL(url => url.hash === '#duvidas');
      assert.equal(new URL(page.url()).hash, '#duvidas');
      const question = page.getByRole('button', { name: 'Como solicitar atendimento veterinário?' });
      await question.focus(); await page.keyboard.press('Enter');
      assert.equal(await question.getAttribute('aria-expanded'), 'true');
      await page.getByText('Entre em contato com a equipe para verificar o serviço, os horários e a necessidade de agendamento. Uma mensagem enviada não representa agendamento confirmado.').waitFor({ state: 'visible' });
      await page.keyboard.press('Enter');
      assert.equal(await question.getAttribute('aria-expanded'), 'false');
      report.checks.push('Mobile Sheet: short viewport, full-width CTA, automated accessibility, keyboard, touch, Escape, focus restore, anchor close; FAQ: keyboard expand/collapse');
    }
    if (width === 1440) {
      await page.getByRole('link', { name: 'Voltar ao topo', exact: true }).click();
      await page.waitForFunction(() => window.scrollY === 0);
      report.checks.push('Footer back-to-top returns to document start');
      const links = await page.locator('a[href*="wa.me"]').evaluateAll(nodes => nodes.map(n => ({ href: n.href, label: n.textContent })));
      assert.ok(links.length >= 15);
      for (const link of links) {
        const url = new URL(link.href);
        assert.equal(url.hostname, 'wa.me');
        assert.equal(url.pathname, '/5569992222466');
        assert.ok(url.searchParams.get('text')?.startsWith('Olá!'));
      }
      const categories = await page.locator('.category-card a').evaluateAll(nodes => nodes.map(n => new URL(n.href).searchParams.get('text')));
      assert.equal(new Set(categories).size, 6);
      const schema = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent());
      assert.equal(schema.telephone, '+5569992222466');
      assert.deepEqual(schema['@type'], ['PetStore', 'VeterinaryCare']);
      assert.equal(schema.aggregateRating, undefined);
      assert.equal(await page.locator('iframe').count(), 0);
      assert.equal(await page.locator('meta[name="robots"]').getAttribute('content'), 'noindex, follow');
      assert.equal(await page.locator('link[rel="canonical"]').count(), 0);
      report.checks.push(`${links.length} WhatsApp links validated; six contextual categories; JSON-LD; Leaflet map without iframe; safe preview SEO`);
    }
    await context.close();
  }
  const noJsContext = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const noJs = await noJsContext.newPage();
  const html = await (await noJs.goto(baseURL)).text();
  assert.ok(html.includes('Uma mensagem enviada não representa agendamento confirmado.'));
  assert.equal(await noJs.locator('.faq-accordion [data-slot="accordion-content"]:visible').count(), 8);
  assert.equal(await noJs.locator('.faq-accordion [data-slot="accordion-content"]').evaluateAll(nodes => nodes.every(el => getComputedStyle(el).animationName === 'none')), true, 'No-JS FAQ never collapses through CSS animation');
  assert.ok(await noJs.getByRole('link', { name: 'Abrir rota no Maps', exact: true }).getAttribute('href'));
  assert.equal(await noJs.locator('h1').isVisible(), true);
  await noJsContext.close();
  const context = await browser.newContext();
  const page = await context.newPage();
  page.on('pageerror', error => report.errors.push(error.message));
  await page.goto(baseURL, { waitUntil: 'networkidle' });
  const staggerVisible = await page.evaluate(async () => {
    const cards = [...document.querySelectorAll('.category-card')];
    window.scrollTo({ top: scrollY + cards[0].getBoundingClientRect().top - 180, behavior: 'instant' });
    let stagger = false;
    const started = performance.now();
    while (performance.now() - started < 1400) {
      await new Promise(resolve => requestAnimationFrame(resolve));
      const offsets = cards.map(card => new DOMMatrixReadOnly(getComputedStyle(card).transform).m42);
      if (Math.max(...offsets) - Math.min(...offsets) > 0.1) stagger = true;
    }
    return stagger;
  });
  assert.equal(staggerVisible, true, 'Cards enter at staggered times');
  await page.waitForFunction(() => [...document.querySelectorAll('.category-card')].every(el => getComputedStyle(el).transform === 'none'));
  await page.locator('#a-athos').scrollIntoViewIfNeeded();
  await page.waitForFunction(() => getComputedStyle(document.querySelector('#a-athos')).transform === 'none');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.waitForFunction(() => [...document.querySelectorAll('[data-reveal], [data-reveal-card], [data-reveal] > .section-heading')].every(el => getComputedStyle(el).transform === 'none'));
  for (const selector of ['.category-card', '.product-card']) {
    const card = page.locator(selector).first();
    await card.hover();
    assert.deepEqual(await card.evaluate(el => ({
      transform: getComputedStyle(el).transform,
      translate: getComputedStyle(el).translate,
      image: getComputedStyle(el.querySelector('img')).transform,
    })), { transform: 'none', translate: 'none', image: 'none' }, 'Reduced motion prevents hover movement and zoom');
  }
  await page.locator('.text-link').first().hover();
  assert.equal(await page.locator('.text-link svg').first().evaluate(el => getComputedStyle(el).transform), 'none');
  report.checks.push('GSAP cards enter in sequence; section entrance completes; reduced motion clears transforms and disables hover movement/zoom');
  await page.goto(`${baseURL}/privacidade`);
  assert.equal(await page.title(), 'Política de Privacidade | Athos');
  const privacyAxe = await new AxeBuilder({ page }).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
  assert.equal(privacyAxe.violations.length, 0);
  assert.equal((await page.goto(`${baseURL}/pagina-inexistente`)).status(), 404);
  const robots = await (await context.request.get(`${baseURL}/robots.txt`)).text();
  assert.ok(robots.includes('Allow: /'));
  const sitemap = await (await context.request.get(`${baseURL}/sitemap.xml`)).text();
  assert.ok(!sitemap.includes('<loc>'), 'No invented canonical URLs in unconfigured preview');
  report.checks.push('Eight SSR FAQ answers readable without JavaScript; privacy route; real 404; robots and empty preview sitemap');
  await context.close();
  assert.deepEqual(report.errors, [], 'No browser errors');
  await fs.writeFile('docs/verification-results.json', JSON.stringify(report, null, 2) + '\n');
  console.log('PASS all focused checks. Report: docs/verification-results.json');
} finally { await browser.close(); }
