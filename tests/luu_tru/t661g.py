import sys,json
from playwright.sync_api import sync_playwright
f=sys.argv[1];seed=open('tests/seed_full.js').read();R={}
with sync_playwright() as p:
    b=p.chromium.launch()
    for dpr in [3]:
        c=b.new_context(viewport={'width':390,'height':844},device_scale_factor=dpr,is_mobile=True,has_touch=True);c.add_init_script(seed)
        pg=c.new_page();errs=[];pg.on('pageerror',lambda e:errs.append(str(e)));pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(3000)
        R['init']=pg.evaluate("()=>[Gfx66.pref(),Gfx66.now(),window.GFX66]")
        pg.click('#hgr41 [data-st66]');pg.wait_for_timeout(300);pg.screenshot(path='shots/v661_settings.png')
        pg.click('.st66 [data-gfx="light"]');pg.wait_for_timeout(200)
        R['light']=pg.evaluate("()=>[Gfx66.pref(),Gfx66.now(),localStorage.getItem('saobang-gfx-v66'),localStorage.getItem('saobang-effects-v1')]")
        pg.click('.st66 [data-px="sound"]');pg.wait_for_timeout(200);R['sound']=pg.evaluate("()=>document.querySelector('.st66 [data-px=\"sound\"]').textContent")
        pg.click('.st66 [data-x="close"]')
        pg.evaluate("()=>{document.getElementById('mission-select').value='4';Lobby.hide();reset();}");pg.wait_for_timeout(1200)
        R['cv_light']=pg.evaluate("()=>[canvas.width,canvas.height]")
        pg.evaluate("()=>Gfx66.set('high')");pg.wait_for_timeout(500);R['cv_high']=pg.evaluate("()=>[canvas.width,canvas.height,BloomQualityC.state()]")
        pg.evaluate("()=>VisualFX.setQuality('auto-light')");R['high_noauto']=pg.evaluate("()=>Gfx66.now()")
        pg.evaluate("()=>Gfx66.set('auto')");pg.evaluate("()=>VisualFX.setQuality('auto-light')");R['auto_drop']=pg.evaluate("()=>[Gfx66.now(),Gfx66.pref()]")
        pg.evaluate("()=>pause()");pg.wait_for_timeout(600);pg.screenshot(path='shots/v661_pause.png');R['pz']=pg.evaluate("()=>{const b=document.getElementById('pz66');return b&&!b.hidden?b.textContent:null}")
        R['errs']=errs;c.close()
    # người mới, chưa có key → TỰ ĐỘNG
    c=b.new_context(viewport={'width':390,'height':844},is_mobile=True);c.add_init_script("localStorage.clear()");pg=c.new_page();pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(2500)
    R['fresh']=pg.evaluate("()=>[Gfx66.pref(),Gfx66.now()]");c.close();b.close()
print(json.dumps(R,ensure_ascii=False))
