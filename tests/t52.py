import sys,json
from playwright.sync_api import sync_playwright
f=sys.argv[1];seed=open('tests/seed_full.js').read();R={}
with sync_playwright() as p:
    b=p.chromium.launch()
    def run(tag,enh,craftEnh):
        c=b.new_context(viewport={'width':390,'height':844},is_mobile=True,has_touch=True,device_scale_factor=2);c.add_init_script(seed);c.add_init_script('(()=>{const E=%d,CE=%d;const h=JSON.parse(localStorage.getItem("saobang-hangar-v1"));for(const it of h.items)it.enhance=E;localStorage.setItem("saobang-hangar-v1",JSON.stringify(h));const w=JSON.parse(localStorage.getItem("saobang-workshop-v1"));w.craftEnhancements=w.craftEnhancements.map(()=>CE);localStorage.setItem("saobang-workshop-v1",JSON.stringify(w));})()'%(enh,craftEnh))
        pg=c.new_page();errs=[];pg.on('pageerror',lambda e:errs.append(str(e)));pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(2800)
        pg.evaluate("([e,ce])=>{const P=Progress.getState();for(const k of ['armor','missiles','sidearm']){const it=P.items.find(x=>x.id===P.equipped[k]);if(it)it.enhance=e;}try{Workshop.getState?0:0}catch{};window.__ce=ce;}",[enh,craftEnh])
        pg.evaluate("()=>{try{const g=Workshop.craftProgress(selected);}catch{}}")
        pg.evaluate("()=>{document.getElementById('mission-select').value='3';Lobby.hide();reset();window.__g=setInterval(()=>{if(mode==='play'){hp=maxHp;bullets.length=0;for(const e of enemies){if(!e.__k){e.__k=1;}e.y=Math.min(e.y,260);}}},16)}");pg.wait_for_timeout(2500);pg.evaluate('()=>{for(let i=0;i<5;i++)enemies.push({x:120+i*60,y:220,hp:1e6,max:1e6,dead:false,type:0,vx:0,vy:0,r:22,elite:false})}')
        pg.wait_for_timeout(4000)
        r=pg.evaluate("()=>({tiers:Rank52.tiers(),particles:Rank52.particles(),rt:Gear44.runtime(),mode})")
        pg.screenshot(path='shots/v52_%s.png'%tag);r['errs']=errs;c.close();return r
    R['t0']=run('t0',0,0);R['t1']=run('t1',1,1);R['t2']=run('t2',3,3);R['t3']=run('t3',5,5)
    b.close()
print(json.dumps(R,ensure_ascii=False))
