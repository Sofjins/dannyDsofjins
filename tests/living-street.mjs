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
  const context = await browser.newContext({ viewport: { width: 1536, height: 1024 }, deviceScaleFactor: 1 });
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
  await page.waitForFunction(()=>window.__gatewayTest.snapshot().motion?.cat.model==='authored-gltf');
  const initial = await page.evaluate(() => window.__gatewayTest.snapshot());
  verify('real WebGL renderer', initial.renderer === 'webgl', initial.reason);
  report.webgl = true;
  await page.evaluate(() => window.__gatewayTest.setCatSeed(97402971));
  verify('live scene starts automatically', initial.mode === 'live');
  verify('architecture remains a rigid plane', initial.vertices === 4 && initial.maxDepth === 0);
  verify('cat uses the authored rig and animation clips', initial.motion.cat.model === 'authored-gltf' && initial.motion.cat.joints >= 30 && initial.motion.cat.clips.includes('WalkClean'));
  verify('nine separate foliage groups', initial.motion.foliage.count === 9);
  verify('plants use leaf-only alpha sprites, not rectangular wall cutouts', initial.motion.foliage.isolatedAlpha && initial.motion.foliage.alphaOccupancy.every(([name, occupancy]) => occupancy > .03 && occupancy < .85), initial.motion.foliage.alphaOccupancy);
  verify('three independently anchored curtain panels', initial.motion.curtains.count === 3 && initial.motion.curtains.topAnchored && initial.motion.curtains.isolatedAlpha);
  verify('mist has five depth layers and no rainfall', initial.motion.atmosphere.layers === 5 && initial.motion.atmosphere.viewport && initial.motion.rainCount === 0);
  verify('seven sparse drip origins, including the bowl', initial.motion.gutter.dropsPerCycle === 3 && initial.motion.gutter.cycle > 6 && initial.motion.gutter.emitters.length === 7);
  verify('gutter is attached to both the eave and wall',initial.motion.gutter.attachment==='eave-gutter-and-bolted-wall-bracket');
  verify('steam originates at the street drain',initial.viewportMist?.steam&&initial.viewportMist.drain.x===912&&initial.viewportMist.drain.y===842);
  verify('fog and darkness preserve actual light shapes',initial.viewportMist.lightProtection==='emissive-pixels'&&initial.viewportMist.scattering);
  verify('cat has its own planar reflection and cast shadows', initial.motion.pavement.reflection === 'planar-skinned-mesh' && initial.motion.pavement.shadows === 'pcf-cast-and-contact');
  verify('short black coat and reduced tail', initial.motion.cat.coat === 'black-short-fur' && initial.motion.cat.tailScale[0] < .6);
  verify('mist reaches the viewport, not only the source artwork', await page.locator('.viewport-mist').count() === 1);
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
  for (const [label, rectangle] of Object.entries({ leftTree: [0, 424, 180, 190], doorwayPot: [251, 643, 95, 80], maple: [554, 448, 160, 150], bowlPlant: [722, 553, 137, 140], rightVine: [1385, 384, 110, 176] })) {
    verify(`${label} moves independently`, difference(early, later, rectangle).maximum > 3);
  }
  verify('roof stays pixel-stable', difference(early, later, [240, 105, 270, 85]).maximum === 0);
  verify('brick column beside the maple does not sway', difference(early, later, [726, 452, 18, 85]).maximum <= 2);
  verify('lantern pixels move', difference(early, later, [116, 214, 100, 176]).maximum > 5);
  verify('foliage pixels move', difference(early, later, [554, 448, 160, 150]).maximum > 3);
  verify('mist pixels evolve', difference(early, later, [250, 800, 300, 150]).maximum > 0);
  verify('curtain pixels move', difference(early, later, [290, 315, 310, 145]).maximum > 4);
  const steaming=await frame(8);
  if(process.env.GATEWAY_PREVIEW_LOG==='1') {
    console.log(`DRAIN_PREVIEW_BASE64=${(await page.screenshot({type:'jpeg',quality:90,clip:{x:805,y:660,width:300,height:230}})).toString('base64')}`);
    console.log(`GUTTER_PREVIEW_BASE64=${(await page.screenshot({type:'jpeg',quality:95,clip:{x:644,y:163,width:187,height:111}})).toString('base64')}`);
  }
  await page.evaluate(()=>window.__gatewayTest.setSteamEnabled(false));
  const withoutSteam=await frame(8);
  const steamDelta=difference(steaming,withoutSteam,[855,710,140,132]);
  verify('drain emits visible steam without moving the grate',steamDelta.maximum>3&&steamDelta.mean>.1,steamDelta);
  verify('steam does not leak under the pavement',difference(steaming,withoutSteam,[800,850,300,65]).maximum===0);
  await page.evaluate(()=>window.__gatewayTest.setSteamEnabled(true));
  const shaded=await frame(2);
  await page.evaluate(()=>window.__gatewayTest.setShadeEnabled(false));
  const unshaded=await frame(2);
  for(const [name,rectangle,channel] of [['left lantern',[140,270,45,70],0],['Japanese neon',[1344,348,31,103],2]]){
    const [left,top,width,height]=rectangle;
    let total=0,count=0;
    for(let row=top;row<top+height;row++)for(let column=left;column<left+width;column++){
      const offset=(row*shaded.width+column)*4+channel;
      if(unshaded.data[offset]>180){total+=Math.abs(shaded.data[offset]-unshaded.data[offset]);count++;}
    }
    verify(`${name} stays luminous under the side vignette`,count>15&&total/count<8,{pixels:count,mean:total/Math.max(1,count)});
  }
  verify('surrounding masonry still receives the vignette',difference(shaded,unshaded,[10,350,70,130]).mean>1);
  await page.evaluate(()=>window.__gatewayTest.setShadeEnabled(true));
  const reflected = await frame(90);
  if (process.env.GATEWAY_PREVIEW_LOG === '1') console.log(`SURFACE_PREVIEW_BASE64=${(await art.screenshot({ type: 'jpeg', quality: 80 })).toString('base64')}`);
  const catAt90 = await page.evaluate(() => window.__gatewayTest.snapshot().motion.cat);
  await page.evaluate(() => window.__gatewayTest.setSurfaceVisible(false));
  await page.waitForTimeout(120);
  const dry = await frame(90);
  const surfaceDelta = difference(reflected, dry, [Math.floor(catAt90.x-120), 778, 280, 100]);
  verify('wet street actually renders the moving cat reflection and shadow', surfaceDelta.maximum > 3 && surfaceDelta.mean > .03, surfaceDelta);
  await page.evaluate(() => window.__gatewayTest.setSurfaceVisible(true));
  const neonOn = await frame(2);
  const neonOff = await frame(2.4);
  if (process.env.GATEWAY_PREVIEW_LOG === '1') console.log(`INITIAL_PREVIEW_BASE64=${(await art.screenshot({ type: 'jpeg', quality: 75 })).toString('base64')}`);
  verify('coffee sign visibly flickers in its new left-hand position', difference(neonOn, neonOff, [1134, 575, 63, 73]).mean > 2);
  await frame(200);
  const plan = await page.evaluate(() => window.__gatewayTest.snapshot().motion.cat.plan);
  for (const mode of ['drink', 'walk', 'sit-down', 'sit', 'jump', 'land', 'perch', 'jump-down']) {
    const event = plan.find(event => event.mode === mode);
    await frame(event.start + event.duration * .5);
    const cat = await page.evaluate(() => window.__gatewayTest.snapshot().motion.cat);
    verify(`cat ${mode}`, cat.mode === mode, { mode: cat.mode, x: cat.x, screenY: cat.screenY });
    verify('cat stays above the street', cat.screenY <= 778);
    await art.screenshot({ path: resolve(output, `street-${mode}.png`) });
  }
  await frame(45);
  await page.evaluate(() => window.__gatewayTest.greetCat());
  await frame(46);
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
  for (const [width, height] of [[1710, 896], [1440, 900], [1024, 768], [844, 390], [390, 844], [360, 640]]) {
    await page.setViewportSize({ width, height });
    await page.waitForFunction(() => {
      const artwork = document.querySelector('.reference-art').getBoundingClientRect();
      const stage = document.querySelector('.reference-stage').getBoundingClientRect();
      return artwork.left >= stage.left - 1 && artwork.right <= stage.right + 1 && artwork.top >= stage.top - 1 && artwork.bottom <= stage.bottom + 1;
    });
    const layout = await page.evaluate(() => {
      const artwork = document.querySelector('.reference-art').getBoundingClientRect();
      const stage = document.querySelector('.reference-stage').getBoundingClientRect();
      return { contained: artwork.left >= stage.left - 1 && artwork.right <= stage.right + 1 && artwork.top >= stage.top - 1 && artwork.bottom <= stage.bottom + 1,
        viewport: Math.abs(stage.width - innerWidth) < 1 && Math.abs(stage.height - innerHeight) < 1,
        overflow: document.documentElement.scrollWidth > innerWidth + 1 || document.documentElement.scrollHeight > innerHeight + 1,
        artwork: artwork.toJSON(), stage: stage.toJSON(), transform: getComputedStyle(document.querySelector('.reference-art')).transform };
    });
    verify(`full scene fits without cropping at ${width}x${height}`, layout.contained && layout.viewport && !layout.overflow, layout);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator('[data-view="software"]').click();
  verify('mobile close view works', await page.evaluate(() => window.__gatewayTest.snapshot().view === 'software'));
  await page.screenshot({ path: resolve(output, 'street-mobile.png'), fullPage: true });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.waitForFunction(()=>window.__gatewayTest.snapshot().mode==='reference');
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
  await page.setViewportSize({ width: 1710, height: 896 });
  await page.evaluate(() => { window.__gatewayTest.setView('full'); window.__gatewayTest.setMode('live'); window.__gatewayTest.seek(90); });
  await page.waitForTimeout(160);
  await page.screenshot({ path: resolve(output, 'street-fullscreen-uncropped.png') });
  if (process.env.GATEWAY_PREVIEW_LOG === '1') console.log(`WIDE_PREVIEW_BASE64=${(await page.screenshot({ type: 'jpeg', quality: 75 })).toString('base64')}`);
  await page.setViewportSize({ width: 1024, height: 1365 });
  await page.waitForFunction(()=>document.querySelector('#gateway-experience').dataset.environment==='portrait');
  await page.waitForTimeout(250);
  await page.screenshot({ path: resolve(output, 'street-tall-environment.png') });
  if (process.env.GATEWAY_PREVIEW_LOG === '1') console.log(`TALL_PREVIEW_BASE64=${(await page.screenshot({ type: 'jpeg', quality: 80 })).toString('base64')}`);
  await page.setViewportSize({ width: 1536, height: 1024 });
  await page.evaluate(() => { window.__gatewayTest.setView('full'); window.__gatewayTest.setMode('live'); });
  await frame(90);
  if (process.env.GATEWAY_PREVIEW_LOG === '1') {
    const preview = await art.screenshot({ type: 'jpeg', quality: 65 });
    console.log(`STREET_PREVIEW_BASE64=${preview.toString('base64')}`);
    for (const mode of ['drink', 'jump', 'land', 'perch']) {
      const event = plan.find(event => event.mode === mode);
      await frame(event.start + event.duration * .5);
      const cat = await page.evaluate(() => window.__gatewayTest.snapshot().motion.cat);
      const preview = await page.screenshot({ type: 'jpeg', quality: 90, clip: { x: cat.x - 100, y: cat.screenY - 160, width: 200, height: 200 } });
      console.log(`CAT_${mode.toUpperCase()}_BASE64=${preview.toString('base64')}`);
    }
  }
  await context.close();
} finally {
  await browser?.close();
  await writeFile(resolve(output, 'living-street-report.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
}
