import { chromium } from 'playwright';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { resolve, extname } from 'node:path';
const output=resolve('test-results/baked');
await mkdir(output,{recursive:true});
const browser=await chromium.launch({headless:true,args:['--no-sandbox','--enable-unsafe-swiftshader','--use-angle=swiftshader']});
try {
  const page=await browser.newPage({viewport:{width:1536,height:1024},deviceScaleFactor:1});
  await page.route('**/*',async route=>{
    const url=new URL(route.request().url());
    if(url.hostname!=='street.test')return route.abort();
    const path=resolve('.'+(url.pathname==='/'?'/index.html':url.pathname));
    if(!path.startsWith(process.cwd()+'/'))return route.abort();
    try {await route.fulfill({body:await readFile(path),contentType:({'.html':'text/html','.js':'text/javascript','.css':'text/css','.webp':'image/webp'})[extname(path)]||'application/octet-stream'});}
    catch {await route.fulfill({status:404,body:'Not found'});}
  });
  await page.goto('http://street.test/?bake=1');
  await page.waitForFunction(()=>window.__gatewayTest?.snapshot().renderer==='webgl');
  const assets=await page.evaluate(()=>window.__gatewayTest.exportPrepared());
  for(const key of ['base','props'])await writeFile(resolve(output,key+'.png'),Buffer.from(assets[key].split(',')[1],'base64'));
  await writeFile(resolve(output,'manifest.json'),JSON.stringify(assets.manifest));
  await page.addStyleTag({content:'.site-header,.reference-controls,.reference-views{visibility:hidden!important}'});
  await page.evaluate(()=>{window.__gatewayTest.setCatVisible(false);window.__gatewayTest.seek(0);});
  await page.waitForFunction(()=>window.__gatewayTest.snapshot().motion.clock===0);
  await page.locator('.reference-art').screenshot({path:resolve(output,'poster.png')});
} finally {await browser.close();}
