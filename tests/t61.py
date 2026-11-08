import sys,json
from playwright.sync_api import sync_playwright
f=sys.argv[1];seed=open('tests/seed_full.js').read();R={}
with sync_playwright() as p:
    b=p.chromium.launch()
    def run(tag,E,sup):
        c=b.new_context(viewport={'width':390,'height':844},is_mobile=True,has_touch=True,device_scale_factor=2);c.add_init_script(seed)
        c.add_init_script('(()=>{const h=JSON.parse(localStorage.getItem("saobang-hangar-v1"));for(const it of h.items)it.enhance=%d;localStorage.setItem("saobang-hangar-v1",JSON.stringify(h));const w=JSON.parse(localStorage.getItem("saobang-workshop-v1"));w.craftEnhancements=w.craftEnhancements.map(()=>0);localStorage.setItem("saobang-workshop-v1",JSON.stringify(w));})()'%E)
        pg=c.new_page();errs=[];pg.on('pageerror',lambda e:errs.append(str(e)));pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(2800)
        pg.evaluate("(sup)=>{document.getElementById('mission-select').value='3';Lobby.hide();reset();window.__g=setInterval(()=>{if(mode==='play'){hp=maxHp;bullets.length=0;player.x=240;player.y=H*.8;if(sup){power=5;powerUpgrades=4;}}},16)}",sup)
        pg.wait_for_timeout(3000);r=pg.evaluate("()=>({rt:Object.fromEntries(Object.entries(Gear44.runtime()).map(([k,v])=>[k,v.id+':'+v.mode])),t:Evo53.tiers()})");pg.screenshot(path='shots/v61_%s.png'%tag);r['errs']=errs;c.close();return r
    for E in (0,3,5):
        for sup in (0,1):R['e%d_s%d'%(E,sup)]=run('e%d_s%d'%(E,sup),E,sup)
    b.close()
print(json.dumps({k:[v['rt'],v['errs']] for k,v in R.items()},ensure_ascii=False))
