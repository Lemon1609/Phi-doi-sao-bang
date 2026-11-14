import sys,json
from playwright.sync_api import sync_playwright
f=sys.argv[1];seed=open('tests/seed_full.js').read();R={}
with sync_playwright() as p:
    b=p.chromium.launch()
    def run(tag,craft,E):
        c=b.new_context(viewport={'width':390,'height':844},is_mobile=True,has_touch=True,device_scale_factor=2);c.add_init_script(seed)
        c.add_init_script('(()=>{const w=JSON.parse(localStorage.getItem("saobang-workshop-v1"));w.craftEnhancements=w.craftEnhancements.map(()=>%d);localStorage.setItem("saobang-workshop-v1",JSON.stringify(w));localStorage.setItem("saobang-craft","%d");const h=JSON.parse(localStorage.getItem("saobang-hangar-v1"));for(const it of h.items)it.enhance=0;localStorage.setItem("saobang-hangar-v1",JSON.stringify(h));})()'%(E,craft))
        pg=c.new_page();errs=[];pg.on('pageerror',lambda e:errs.append(str(e)));pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(2800)
        pg.evaluate("()=>{document.getElementById('mission-select').value='3';Lobby.hide();reset();window.__g=setInterval(()=>{if(mode==='play'){hp=maxHp;bullets.length=0;power=5;powerUpgrades=4;player.x=240;player.y=H*.8;}},16)}")
        pg.wait_for_timeout(2500);r=pg.evaluate("()=>({sel:selected,t:Evo53.tiers().craft,art:Evo53.art()})");pg.screenshot(path='shots/v58_tran_%s.png'%tag);r['errs']=errs;c.close();return r
    for cr in (0,2):
        for E in (4,5):R['c%d_e%d'%(cr,E)]=run('c%d_e%d'%(cr,E),cr,E)
    b.close()
print(json.dumps(R,ensure_ascii=False))
