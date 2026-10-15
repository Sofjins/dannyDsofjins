"""Actual WebGL motion checks and an 18-second browser recording. No fake GL mocks."""
import base64, io, json, os, threading
from functools import partial
from pathlib import Path
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import urlparse
import numpy as np
from PIL import Image
from playwright.sync_api import sync_playwright

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'test-results'; OUT.mkdir(exist_ok=True)
report={'checks':[], 'errors':[]}
def check(name,yes,detail=None):
    report['checks'].append({'name':name,'pass':bool(yes),'detail':detail})
    assert yes,f'{name}: {detail}'
class Quiet(SimpleHTTPRequestHandler):
    def log_message(self,*_):pass
server=ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(ROOT)))
threading.Thread(target=server.serve_forever,daemon=True).start()
origin=f'http://127.0.0.1:{server.server_port}'
def load(page):
    page.on('pageerror',lambda error:report['errors'].append(str(error)))
    def library(route):
        f=ROOT/'node_modules/three/build'/Path(urlparse(route.request.url).path).name
        if f.exists():route.fulfill(body=f.read_bytes(),headers={'Content-Type':'text/javascript','Access-Control-Allow-Origin':'*'})
        else:route.abort()
    page.route('https://cdn.jsdelivr.net/npm/three@0.179.1/build/*',library)
    page.route('https://fonts.googleapis.com/**',lambda r:r.abort())
    page.route('https://fonts.gstatic.com/**',lambda r:r.abort())
    page.goto(origin,wait_until='load')
    page.wait_for_function('window.__gatewayTest && ["webgl","image"].includes(window.__gatewayTest.snapshot().renderer)')
    page.wait_for_function('window.__gatewayTest.snapshot().motion?.cat.model==="authored-gltf"')
    snap=page.evaluate('window.__gatewayTest.snapshot()')
    check('real_webgl',snap['renderer']=='webgl',snap)
    return snap

def frame(page,t):
    page.evaluate('(t)=>window.__gatewayTest.seek(t)',t)
    page.wait_for_function('(time)=>window.__gatewayTest.snapshot().motion.clock===time',arg=t)
    shot=page.locator('.reference-art').screenshot()
    return np.array(Image.open(io.BytesIO(shot)).convert('RGB')).astype('int16')

try:
 with sync_playwright() as p:
    browser=p.chromium.launch(executable_path=os.environ.get('BROWSER_PATH'),headless=True,args=['--no-sandbox','--enable-unsafe-swiftshader','--use-angle=swiftshader','--ignore-gpu-blocklist'])
    page=browser.new_page(viewport={'width':1536,'height':1024},device_scale_factor=1)
    snap=load(page)
    overlay=page.add_style_tag(content='.site-header,.reference-controls,.reference-views{visibility:hidden!important}')
    check('live_starts_automatically',snap['mode']=='live')
    check('two_independent_lanterns',len(snap['motion']['lanterns'])==2)
    check('five_flame_cutouts',snap['motion']['flames']==5)
    check('rigid_architecture',snap['vertices']==4 and snap['maxDepth']==0)
    a=frame(page,.35); b=frame(page,1.8); diff=np.abs(a-b)
    for id,(x,y,w,h) in [('left',(116,214,100,176)),('right',(618,205,104,196))]:
        change=diff[y:y+h,x:x+w]
        check(f'actual_visible_motion_{id}',int((change.max(axis=2)>3).sum())>80,int((change.max(axis=2)>3).sum()))
    check('real_flame_pixel_motion',int(diff[552:568,470:482].max())>3)
    check('roof_and_magic_sign_unchanged',int(diff[105:190,240:510].max())==0)
    check('software_window_has_mist_not_geometry_warp',snap['maxDepth']==0 and int(diff[380:525,1130:1300].max())>0)
    frame(page,12.0)
    rest=page.evaluate('window.__gatewayTest.snapshot().motion')
    check('lanterns_keep_a_subtle_breeze_between_gusts',all(abs(s['angle'])<.006 for s in rest['lanterns']),rest)
    page.locator('[data-lantern="left"]').hover()
    frame(page,12.4)
    nudged=page.evaluate('window.__gatewayTest.snapshot().motion')
    check('hover_nudges_lantern',abs(nudged['lanterns'][0]['angle'])>.002,nudged)
    check('hover_does_not_kick_the_other_lantern',abs(nudged['lanterns'][1]['angle']-rest['lanterns'][1]['angle'])<.005)
    page.mouse.move(0,0)
    off=frame(page,2); dip=frame(page,2.4)
    check('aged_neon_dips_locally',float((dip-off)[575:648,1134:1197].mean())<-.25)
    page.evaluate('window.__gatewayTest.setMode("reference")')
    page.wait_for_timeout(140)
    actual=np.array(Image.open(io.BytesIO(page.locator('.reference-art').screenshot())).convert('RGB')).astype('int16')
    expected=np.array(Image.open(ROOT/'assets/v25/street-master.webp').convert('RGB')).astype('int16')
    check('original_restores_untouched_art',float(np.abs(actual-expected).mean())<.8)
    check('original_hides_animated_cutouts',not page.evaluate('window.__gatewayTest.snapshot().motion.enabled'))
    overlay.evaluate('(element)=>element.remove()')
    page.evaluate('window.__gatewayTest.setMode("live");window.__gatewayTest.seek(null)')
    # Both doors still work after introducing the new interactive props.
    for world in ['magic','software']:
        page.locator('.gateway-door--'+world).click()
        page.wait_for_function('(s)=>document.body.dataset.world===s',arg=world)
        page.locator('.brand').click();page.wait_for_function('document.body.dataset.world==="gateway"');page.wait_for_timeout(900)
    check('both_doors_and_return_work',True)
    page.set_viewport_size({'width':390,'height':844})
    page.wait_for_function('Math.abs(document.querySelector(".reference-art").getBoundingClientRect().width-innerWidth)<1')
    page.locator('[data-view="magic"]').click()
    page.wait_for_function('window.__gatewayTest.snapshot().view==="magic"')
    page.screenshot(path=str(OUT/'living-mobile.png'),full_page=True)
    check('mobile_keeps_live_scene',page.evaluate('window.__gatewayTest.snapshot().mode')=='live')
    page.emulate_media(reduced_motion='reduce')
    page.wait_for_function('window.__gatewayTest.snapshot().mode==="reference"')
    check('reduced_motion_disables_animation',page.evaluate('window.__gatewayTest.snapshot().mode')=='reference')
    page.close()
    # Record the running page, including a normal hover response, not generated frames.
    context=browser.new_context(viewport={'width':1440,'height':1000},device_scale_factor=1,record_video_dir=str(OUT/'video'),record_video_size={'width':1440,'height':1000})
    video_page=context.new_page();load(video_page)
    video_page.mouse.move(10,10)
    video_page.wait_for_timeout(7800)
    video_page.locator('[data-lantern="left"]').hover();video_page.wait_for_timeout(2200)
    video_page.mouse.move(10,10);video_page.wait_for_timeout(1100)
    video_page.locator('[data-lantern="right"]').hover();video_page.wait_for_timeout(2200)
    video_page.mouse.move(10,10);video_page.wait_for_timeout(1000)
    video_page.locator('.gateway-door--magic').hover();video_page.wait_for_timeout(1300)
    video_page.mouse.move(10,10);video_page.wait_for_timeout(1700)
    video_page.screenshot(path=str(OUT/'living-desktop.png'))
    video=video_page.video
    await_close=context.close()
    video.save_as(str(OUT/'living-street.webm'))
    check('browser_recording_saved',(OUT/'living-street.webm').stat().st_size>20000)
    check('no_unhandled_errors',not report['errors'],report['errors'])
    browser.close()
finally:
 server.shutdown()
 (OUT/'living-report.json').write_text(json.dumps(report,indent=2))
 print(json.dumps(report,indent=2))
