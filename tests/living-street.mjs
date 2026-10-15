import assert from 'node:assert/strict';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve, extname } from 'node:path';
import { chromium } from 'playwright';
import { PNG } from 'pngjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = resolve(root, 'test-results');
await mkdir(output, { recursive: true });
const report = { checks: [], errors: [], webgl: false };
const verify = (name, condition, detail) => {
  report.checks.push({ name, pass: Boolean(condition), detail });
  assert.ok(condition, `${name}: ${JSON.stringify(detail)}`);
};
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp', '.png': 'image/png' };
let browser;
try {
  browser = await chromium.launch({ headless: true, args: ['--no-sandbox', '--enable-unsafe-swiftshader', '--use-angle=swiftshader'] });
  const context = await browser.newContext({ viewport: { width: 1660, height: 1200 }, deviceScaleFactor: 1 });
  await context.route('**/*', async route => {
    const url = new URL(route.request().url());
    if (url.hostname !== 'street.test') return route.abort();
    const path = resolve(root, '.' + (url.pathname === '/' ? '/index.html' : url.pathname));
    if (!path.startsWith(root)) return route.abort();
    try { await route.fulfill({ body: await readFile(path), contentType: types[extname(path)] || 'application/octet-stream' }); }
    catch { await route.fulfill({ status: 404, body: 'Not found' }); }
  });
  const page = await context.newPage();
  page.on('pageerror', error => report.errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error' && /THREE|Shader|WebGL/i.test(message.text())) report.errors.push(message.text()); });
  await page.goto('http://street.test/');
  await page.waitForFunction(() => window.__gatewayTest && window.__gatewayTest.snapshot().renderer !== 'loading');
  const initial = await page.evaluate(() => window.__gatewayTest.snapshot());
  verify('real WebGL renderer', initial.renderer === 'webgl', initial.reason);
  report.webgl = true;
  verify('live scene starts automatically', initial.mode === 'live');
  verify('architecture remains a rigid plane', initial.vertices === 4 && initial.maxDepth === 0);
  verify('cat has articulated 3D joints', initial.motion.cat.model === 'articulated-3d' && initial.motion.cat.joints >= 18);
  verify('five separate foliage groups', initial.motion.foliage.count === 5);
  verify('mist has three depth layers', initial.motion.atmosphere.layers === 3);
  const art = page.locator('.reference-art');
  const frame = async seconds => {
    await page.evaluate(time => window.__gatewayTest.seek(time), seconds);
    await page.waitForFunction(time => window.__gatewayTest.snapshot().motion.clock === time, seconds);
    return PNG.sync.read(await art.screenshot());
  };
  const difference = (first, second, rectangle) => {
    const [left, top, width, height] = rectangle;
    let total = 0, maximum = 0;
    for (let row = top; row < top + height; row++) for (let column = left; column < left + width; column++) {
      for (let channel = 0; channel < 3; channel++) {
        const offset = (row * first.width + column) * 4 + channel;
        const delta = Math.abs(first.data[offset] - second.data[offset]);
        total += delta; maximum = Math.max(maximum, delta);
      }
    }
    return { mean: total / (width * height * 3), maximum };
  };
  const early = await frame(.35);
  const later = await frame(1.8);
  verify('roof stays pixel-stable', difference(early, later, [240, 105, 270, 85]).maximum === 0);
  verify('lantern pixels move', difference(early, later, [116, 214, 100, 176]).maximum > 5);
  verify('foliage pixels move', difference(early, later, [554, 448, 160, 150]).maximum > 3);
  verify('mist pixels evolve', difference(early, later, [250, 800, 300, 150]).maximum > 0);
  for (const [seconds, name, mode] of [[8, 'walk', 'walk'], [13.2, 'jump', 'jump'], [16, 'perch', 'perch'], [27, 'return', 'walk']]) {
    await frame(seconds);
    const cat = await page.evaluate(() => window.__gatewayTest.snapshot().motion.cat);
    verify(`cat ${name}`, cat.mode === mode, cat);
    if (name === 'perch') verify('paws land on crate top', cat.screenY === 707);
    await art.screenshot({ path: resolve(output, `street-${name}.png`) });
  }
  await frame(16);
  await page.evaluate(() => window.__gatewayTest.greetCat());
  await frame(17);
  verify('cat responds without teleportation', await page.evaluate(() => window.__gatewayTest.snapshot().motion.cat.greeting > 0));
  await page.evaluate(() => window.__gatewayTest.setMode('reference'));
  await page.waitForTimeout(120);
  const original = PNG.sync.read(await art.screenshot());
  await page.evaluate(() => {
    document.querySelector('#gateway-webgl').style.opacity = '0';
    document.querySelector('#gateway-still').style.opacity = '1';
  });
  const source = PNG.sync.read(await art.screenshot());
  const colorDelta = difference(original, source, [0, 0, original.width, original.height]);
  verify('original mode matches supplied artwork', colorDelta.mean < .8, colorDelta);
  await page.evaluate(() => {
    document.querySelector('#gateway-webgl').style.opacity = '';
    document.querySelector('#gateway-still').style.opacity = '';
    window.__gatewayTest.setMode('live');
  });
  for (const world of ['magic', 'software']) {
    await page.locator(`.gateway-door--${world}`).click();
    verify(`${world} door begins a transition`, await page.locator('#gateway-experience').getAttribute('data-entering') === world);
    await page.waitForFunction(destination => document.body.dataset.world === destination, world);
    await page.locator('.brand').click();
    await page.waitForFunction(() => document.body.dataset.world === 'gateway');
    await page.waitForTimeout(900);
  }
  for (const [width, height] of [[1440, 900], [1024, 768], [844, 390], [390, 844], [360, 640]]) {
    await page.setViewportSize({ width, height });
    await page.waitForTimeout(140);
    const layout = await page.evaluate(() => {
      const artwork = document.querySelector('.reference-art').getBoundingClientRect();
      const stage = document.querySelector('.reference-stage').getBoundingClientRect();
      return { inside: artwork.left >= stage.left - 1 && artwork.right <= stage.right + 1 && artwork.top >= stage.top - 1 && artwork.bottom <= stage.bottom + 1,
        overflow: document.documentElement.scrollWidth > innerWidth + 1 };
    });
    verify(`full scene fits ${width}x${height}`, layout.inside && !layout.overflow, layout);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator('[data-view="software"]').click();
  verify('mobile close view works', await page.evaluate(() => window.__gatewayTest.snapshot().view === 'software'));
  await page.screenshot({ path: resolve(output, 'street-mobile.png'), fullPage: true });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.waitForTimeout(120);
  verify('reduced motion restores still artwork', await page.evaluate(() => window.__gatewayTest.snapshot().mode === 'reference'));
  verify('cat hotspot hides in still mode', await page.locator('.living-cat-target').isHidden());
  const fallback = await context.newPage();
  await fallback.addInitScript(() => {
    const originalContext = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function(kind, ...argumentsList) {
      return kind === 'webgl2' || kind === 'webgl' ? null : originalContext.call(this, kind, ...argumentsList);
    };
  });
  await fallback.goto('http://street.test/');
  await fallback.waitForFunction(() => window.__gatewayTest?.snapshot().renderer === 'image');
  await fallback.locator('.gateway-door--software').click();
  await fallback.waitForFunction(() => document.body.dataset.world === 'software');
  verify('doors work without WebGL', true);
  verify('no unhandled runtime or shader errors', report.errors.length === 0, report.errors);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.setViewportSize({ width: 1660, height: 1200 });
  await page.evaluate(() => { window.__gatewayTest.setView('full'); window.__gatewayTest.setMode('live'); });
  await frame(8);
  if (process.env.GATEWAY_PREVIEW_LOG === '1') {
    const preview = await art.screenshot({ type: 'jpeg', quality: 65 });
    console.log(`STREET_PREVIEW_BASE64=${preview.toString('base64')}`);
  }
  await context.close();
} finally {
  await browser?.close();
  await writeFile(resolve(output, 'living-street-report.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
}
