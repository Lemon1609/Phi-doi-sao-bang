import sys,json
from playwright.sync_api import sync_playwright
f=sys.argv[1];seed=open('tests/seed_full.js').read();R={}
with sync_playwright() as p:
    b=p.chromium.launch()
    for E in (0,5):
        c=b.new_context(viewport={'width':390,'height':844},is_mobile=True,has_touch=True,device_scale_factor=2);c.add_init_script(seed);c.add_init_script("localStorage.setItem('saobang-effects-v1','high')")
        c.add_init_script('(()=>{const h=JSON.parse(localStorage.getItem("saobang-hangar-v1"));for(const it of h.items)it.enhance=%d;localStorage.setItem("saobang-hangar-v1",JSON.stringify(h));const w=JSON.parse(localStorage.getItem("saobang-workshop-v1"));w.craftEnhancements=w.craftEnhancements.map(()=>%d);localStorage.setItem("saobang-workshop-v1",JSON.stringify(w));})()'%(E,E))
        pg=c.new_page();pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(2800)
        pg.evaluate("()=>{document.getElementById('mission-select').value='3';Lobby.hide();reset();setInterval(()=>{if(mode==='play')hp=maxHp},50)}");pg.wait_for_timeout(2500)
        cdp=c.new_cdp_session(pg);cdp.send('Emulation.setCPUThrottlingRate',{'rate':1})
        R[E]=pg.evaluate("()=>new Promise(r=>{let n=0,t0=performance.now(),mx=0,last=t0;function f(t){n++;mx=Math.max(mx,t-last);last=t;if(t-t0<4000)requestAnimationFrame(f);else r({fps:+(n*1000/(t-t0)).toFixed(1),maxMs:+mx.toFixed(1),q:VisualFX.counts().quality})}requestAnimationFrame(f)})")
        c.close()
    b.close()
print(json.dumps(R))
