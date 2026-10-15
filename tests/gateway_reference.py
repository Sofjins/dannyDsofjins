"""Browser regression checks for reference framing and real Three.js rendering.
Run: python tests/gateway_reference.py --require-webgl
Offline UI/fallback-only test: --embedded (never claims a WebGL pass).
"""
import argparse
import base64
import io
import json
import os
import threading
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

import numpy as np
from PIL import Image
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'test-results'
OUT.mkdir(exist_ok=True)
parser = argparse.ArgumentParser()
parser.add_argument('--embedded', action='store_true')
parser.add_argument('--require-webgl', action='store_true')
args = parser.parse_args()
report = {'checks': [], 'renderer': None, 'errors': [], 'webgl_verified': False}

def check(name, value, detail=None):
    report['checks'].append({'name': name, 'pass': bool(value), 'detail': detail})
    assert value, f'{name}: {detail}'

class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, *_):
        pass

server = None
if not args.embedded:
    server = ThreadingHTTPServer(('127.0.0.1', 0), partial(QuietHandler, directory=str(ROOT)))
    threading.Thread(target=server.serve_forever, daemon=True).start()
    origin = f'http://127.0.0.1:{server.server_port}'


def load(page, *, block_gl=False):
    page.on('pageerror', lambda err: report['errors'].append(str(err)))
    if block_gl:
        script = '''(() => { const get = HTMLCanvasElement.prototype.getContext;
        HTMLCanvasElement.prototype.getContext = function(kind,...rest) {
        return kind === 'webgl2' || kind === 'webgl' ? null : get.call(this,kind,...rest); }; })();'''
        if args.embedded:
            page.add_init_script(script)
        else:
            page.add_init_script(script)
    if args.embedded:
        from bs4 import BeautifulSoup
        html = BeautifulSoup((ROOT/'index.html').read_text(), 'html.parser')
        for item in html.select('script, link'):
            item.decompose()
        for name in ['assets/site.css', 'assets/v25/gateway.css']:
            style = html.new_tag('style'); style.string = (ROOT/name).read_text(); html.head.append(style)
        html.select_one('#gateway-still')['src'] = 'data:image/webp;base64,' + base64.b64encode((ROOT/'assets/v25/street-master.webp').read_bytes()).decode()
        page.set_content(str(html), wait_until='load')
        if block_gl:
            page.evaluate(script)
        page.add_script_tag(content=(ROOT/'assets/site.js').read_text())
        module=(ROOT/'assets/v25/main.js').read_text()
        framing=(ROOT/'assets/v25/framing.js').read_text().replace('export function','function')
        module=module.replace("import { streetFraming } from './framing.js?v=living-street-8';",framing)
        water=(ROOT/'assets/v25/water-light.js').read_text().replace('export const','const')
        module=module.replace("import { waterLightShader } from './water-light.js?v=living-street-8';",water)
        for name,statement in [('neon',"import { neonLevels, neonFunctions, neonShader } from './neon.js?v=living-street-8';"),('environment',"import { environmentFunctions, environmentTransform } from './environment.js?v=living-street-8';"),('prepared-assets',"import { loadPreparedAssets } from './prepared-assets.js';")]:
            module=module.replace(statement,(ROOT/f'assets/v25/{name}.js').read_text().replace('export ',''))
        page.add_script_tag(type='module', content=module)
    else:
        # Use exactly the production-pinned Three.js package, served locally for deterministic CI.
        def module_route(route):
            from urllib.parse import urlparse
            file = ROOT/'node_modules/three/build'/Path(urlparse(route.request.url).path).name
            if file.is_file():
                route.fulfill(body=file.read_bytes(), headers={'content-type': 'text/javascript', 'access-control-allow-origin': '*'})
            else:
                route.abort()
        page.route('https://cdn.jsdelivr.net/npm/three@0.179.1/build/*', module_route)
        page.route('https://fonts.googleapis.com/**', lambda route: route.abort())
        page.route('https://fonts.gstatic.com/**', lambda route: route.abort())
        page.goto(origin, wait_until='load')
    page.wait_for_function("window.__gatewayTest && ['image','webgl'].includes(window.__gatewayTest.snapshot().renderer)")
    page.wait_for_function('window.__gatewayTest.snapshot().renderer==="image" || window.__gatewayTest.snapshot().motion?.cat.model==="authored-gltf"')
    page.wait_for_function('document.querySelector("#gateway-still").naturalWidth === 1536')
    page.wait_for_timeout(100)


def bounded(page):
    return page.evaluate('''() => {
      const a=document.querySelector('.reference-art').getBoundingClientRect();
      const b=document.querySelector('.reference-stage').getBoundingClientRect();
      return {inside:a.left>=b.left-.6 && a.right<=b.right+.6 && a.top>=b.top-.6 && a.bottom<=b.bottom+.6 && Math.abs(b.width-innerWidth)<1 && Math.abs(b.height-innerHeight)<1,
      aspect:a.width/a.height, overflow:document.documentElement.scrollWidth>innerWidth+1,
      size:[a.width,a.height]}; }''')

def wait_full_layout(page):
    page.wait_for_function('''() => {
      const art = document.querySelector('.reference-art').getBoundingClientRect();
      const stage = document.querySelector('.reference-stage').getBoundingClientRect();
      const expectedWidth = Math.min(innerWidth, innerHeight * 1.5);
      return Math.abs(stage.width - innerWidth) < 1 && Math.abs(stage.height - innerHeight) < 1
        && Math.abs(art.width - expectedWidth) < 1
        && Math.abs(art.height - expectedWidth / 1.5) < 1
        && art.left >= stage.left - .6 && art.right <= stage.right + .6
        && art.top >= stage.top - .6 && art.bottom <= stage.bottom + .6;
    }''')

try:
    with sync_playwright() as p:
        exe = os.environ.get('BROWSER_PATH')
        browser = p.chromium.launch(executable_path=exe, headless=True, args=[
            '--no-sandbox', '--enable-unsafe-swiftshader', '--use-angle=swiftshader', '--ignore-gpu-blocklist'])
        page = browser.new_page(viewport={'width': 1536, 'height': 1024}, device_scale_factor=1)
        load(page)
        snap = page.evaluate('window.__gatewayTest.snapshot()')
        report['renderer'] = snap
        if args.require_webgl:
            check('real_webgl_required', snap['renderer'] == 'webgl', snap)
        if snap['renderer'] == 'webgl':
            check('orthographic_camera', snap['camera'] == 'OrthographicCamera')
            check('rigid_quad_no_displacement', snap['vertices'] == 4 and snap['maxDepth'] == 0, snap)
        overlay = page.add_style_tag(content='.site-header,.reference-controls,.reference-views{visibility:hidden!important}')
        page.mouse.move(5, 5)
        page.evaluate('window.__gatewayTest.setMode("reference")')
        page.wait_for_timeout(150)
        shot = page.locator('.reference-art').screenshot(path=str(OUT/'reference-1to1.png'))
        actual = np.asarray(Image.open(io.BytesIO(shot)).convert('RGB')).astype('int16')
        expected = np.asarray(Image.open(ROOT/'assets/v25/street-master.webp').convert('RGB')).astype('int16')
        check('reference_native_size', actual.shape == expected.shape, list(actual.shape))
        delta = np.abs(actual-expected)
        mae = float(delta.mean()); p99 = float(np.percentile(delta,99))
        check('reference_colour_match', mae < .8 and p99 <= 2, {'mean_error_0_255':mae,'p99_error':p99})
        report['webgl_verified'] = snap['renderer'] == 'webgl'
        if snap['renderer'] == 'webgl':
            page.evaluate('window.__gatewayTest.setMode("live")')
            page.wait_for_timeout(250)
            check('live_mode_enabled',page.evaluate('window.__gatewayTest.snapshot().mode')=='live')
            live_a = np.asarray(Image.open(io.BytesIO(page.locator('.reference-art').screenshot())).convert('RGB')).astype('int16')
            page.wait_for_timeout(300)
            live_b = np.asarray(Image.open(io.BytesIO(page.locator('.reference-art').screenshot())).convert('RGB')).astype('int16')
            temporal = np.abs(live_a-live_b)
            check('live_light_changes_pixels',bool(temporal.max()>0))
            architecture_error=float(np.abs(live_a-actual)[105:190,240:510].mean())
            check('peripheral_grade_is_subtle',architecture_error<10,architecture_error)
            # Immutable architecture region: roofline and wood sign stay pixel-stable.
            check('architecture_not_animated',int(temporal[105:190,240:510].max())==0)
            page.locator('.gateway-door--magic').hover();page.wait_for_timeout(300)
            lit = np.asarray(Image.open(io.BytesIO(page.locator('.reference-art').screenshot())).convert('RGB')).astype('int16')
            check('door_hover_local_light',float((lit-actual)[485:705,330:555].mean())>0)
            page.mouse.move(5,5);page.evaluate('window.__gatewayTest.setMode("reference")');page.wait_for_timeout(120)
            reset = np.asarray(Image.open(io.BytesIO(page.locator('.reference-art').screenshot())).convert('RGB')).astype('int16')
            check('reference_reset_exact',int(np.abs(reset-actual).max())==0)
        overlay.evaluate('(element)=>element.remove()')
        for width,height in [(1710,896),(1440,900),(1024,768),(844,390),(390,844),(360,640)]:
            page.set_viewport_size({'width':width,'height':height});wait_full_layout(page)
            check(f'fullscreen_{width}x{height}', (r:=bounded(page))['inside'] and not r['overflow'] and abs(r['aspect']-1.5)<.002, r)
        page.set_viewport_size({'width':1710,'height':1000});wait_full_layout(page)
        page.screenshot(path=str(OUT/'desktop.png'))
        for door in ['magic','software']:
            a = page.locator(f'.gateway-door--{door}')
            r = a.bounding_box()
            if snap['renderer'] == 'webgl':
                picked = page.evaluate('([x,y])=>window.__gatewayTest.raycastAt(x,y)',[r['x']+r['width']/2,r['y']+r['height']/2])
                check(f'raycast_{door}',picked == door,picked)
            a.hover()
            check(f'no_hover_rectangle_{door}',a.evaluate('(e)=>getComputedStyle(e).borderTopWidth==="0px" && getComputedStyle(e).outlineStyle==="none"'))
            a.click()
            page.wait_for_function('(id)=>document.body.dataset.world===id',arg=door)
            check(f'door_route_{door}',page.evaluate('document.body.dataset.world')==door)
            page.locator('.brand').click()
            page.wait_for_function('document.body.dataset.world === "gateway"');page.wait_for_timeout(900)
        page.set_viewport_size({'width':390,'height':844});wait_full_layout(page)
        page.mouse.move(0,0)
        page.screenshot(path=str(OUT/'mobile-full.png'),full_page=True)
        page.locator('[data-view="magic"]').click();page.wait_for_timeout(100)
        check('explicit_mobile_focus',page.evaluate('window.__gatewayTest.snapshot().view')=='magic')
        page.screenshot(path=str(OUT/'mobile-magic.png'),full_page=True)
        page.locator('[data-view="full"]').click();wait_full_layout(page)
        check('mobile_return_full',bounded(page)['inside'])
        page.locator('.gateway-world-links a').nth(1).click()
        page.wait_for_function('document.body.dataset.world === "software"')
        check('mobile_destination',True)
        page.locator('.brand').click();page.wait_for_function('document.body.dataset.world === "gateway"')
        page.wait_for_timeout(900)
        page.emulate_media(reduced_motion='reduce')
        page.wait_for_function('window.__gatewayTest.snapshot().mode==="reference"')
        check('reduced_motion_reference',page.evaluate('window.__gatewayTest.snapshot().mode')=='reference')
        fallback_page=browser.new_page(viewport={'width':1440,'height':900})
        load(fallback_page,block_gl=True)
        check('no_webgl_fallback',fallback_page.evaluate('window.__gatewayTest.snapshot().renderer')=='image')
        fallback_page.locator('.gateway-door--magic').click()
        fallback_page.wait_for_function('document.body.dataset.world === "magic"')
        check('fallback_navigation',True)
        check('no_unhandled_javascript_errors',not report['errors'],report['errors'])
        browser.close()
finally:
    if server: server.shutdown()
    (OUT/'report.json').write_text(json.dumps(report,indent=2))
    print(json.dumps(report,indent=2))
