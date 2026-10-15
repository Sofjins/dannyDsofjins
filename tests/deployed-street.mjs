import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';

const report = { url: 'https://dannysofjins.xyz/', verified: false };
let browser;
try {
  browser = await chromium.launch({ headless: true, args: ['--no-sandbox', '--enable-unsafe-swiftshader', '--use-angle=swiftshader'] });
  const page = await browser.newPage({ viewport: { width: 1710, height: 896 } });
  const response = await page.goto(report.url, { timeout: 45000, waitUntil: 'domcontentloaded' });
  report.status = response.status();
  await page.waitForFunction(() => window.__gatewayTest?.version === 'living-street-7' && window.__gatewayTest.snapshot().renderer === 'webgl', null, { timeout: 45000 });
  const snapshot = await page.evaluate(() => window.__gatewayTest.snapshot());
  report.version = await page.evaluate(() => window.__gatewayTest.version);
  report.renderer = snapshot.renderer;
  report.cat = snapshot.motion.cat.model;
  report.verified = snapshot.motion.cat.model === 'authored-gltf' && snapshot.art.width <= 1711 && snapshot.art.height <= 897;
  await page.screenshot({ path: 'test-results/deployed-street.png' });
  console.log(`DEPLOYED_PREVIEW_BASE64=${(await page.screenshot({ type: 'jpeg', quality: 70 })).toString('base64')}`);
} catch (error) {
  report.error = error.message;
} finally {
  await browser?.close();
  await mkdir('test-results', { recursive: true });
  await writeFile('test-results/deployment-report.json', JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
}
