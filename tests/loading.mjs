import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { resolve, extname } from 'node:path';
const report={requests:[],checks:[],errors:[]};
const browser=await chromium.launch({headless:true,args:['--no-sandbox','--enable-unsafe-swiftshader','--use-angle=swiftshader']});
try {
  const context=await browser.newContext({viewport:{width:1440,height:900}});
  let releaseCat;
  const catGate=new Promise(resolveCat=>{releaseCat=resolveCat;});
  await context.route('**/*',async route=>{
    const url=new URL(route.request().url());
    if(url.hostname!=='street.test')return route.abort();
    report.requests.push(url.pathname);
    if(url.pathname.includes('black-cat-runtime.glb'))await catGate;
    const path=resolve('.'+(url.pathname==='/'?'/index.html':url.pathname));
    if(!path.startsWith(process.cwd()+'/'))return route.abort();
    try {await route.fulfill({body:await readFile(path),contentType:({'.html':'text/html','.js':'text/javascript','.css':'text/css','.webp':'image/webp','.json':'application/json'})[extname(path)]||'application/octet-stream'});}
    catch {await route.fulfill({status:404,body:'Not found'});}
  });
  const page=await context.newPage();
  page.on('pageerror',error=>report.errors.push(error.message));
  page.on('console',message=>{if(message.type()==='error')report.errors.push(message.text());});
  await page.goto('http://street.test/',{waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>window.__gatewayTest&&window.__gatewayTest.snapshot().renderer!=='loading');
  const first=await page.evaluate(()=>window.__gatewayTest.snapshot());
  assert.equal(first.renderer,'webgl',first.reason);
  assert.equal(first.mode,'live');assert.equal(first.motion.cat.model,'loading');
  report.checks.push('Live cloth, mist and neon start without waiting for the cat');
  assert.ok(!report.requests.some(path=>/street-master|street-clean|foliage-background|cloth-background|curtains-alpha|somali-cat/.test(path)));
  report.checks.push('No old reference image or authoring plates are downloaded on startup');
  const poster=await page.locator('#gateway-still').getAttribute('src');
  assert.ok(poster.includes('scene-preview-v8.webp'));
  report.checks.push('The first visible image is the current rendered composition, not the old reference');
  report.timing=first.timing;
  report.initialRequestCount=report.requests.length;
  releaseCat();
  await page.waitForFunction(()=>window.__gatewayTest.snapshot().motion.cat.model==='authored-gltf');
  await page.evaluate(()=>window.__gatewayTest.setMode('reference'));
  assert.ok(report.requests.some(path=>path.endsWith('street-master.webp')));
  report.checks.push('Original image is fetched only when explicitly selected');
  await page.close();
  const direct=await context.newPage();
  const requestCount=report.requests.length;
  await direct.goto('http://street.test/#/software',{waitUntil:'load'});
  assert.equal(await direct.evaluate(()=>document.body.dataset.world),'software');
  assert.ok(!report.requests.slice(requestCount).some(path=>/\.glb(?:\.gz)?$/.test(path)));
  report.checks.push('Direct shop links do not start the 3D scene or download the cat');
  await context.close();
} finally {
  await browser.close();await mkdir('test-results',{recursive:true});
  await writeFile('test-results/loading-report.json',JSON.stringify(report,null,2));
  console.log(JSON.stringify(report,null,2));
}
