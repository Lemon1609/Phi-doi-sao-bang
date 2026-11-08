import sys,json,os
from playwright.sync_api import sync_playwright
f=sys.argv[1];O=sys.argv[2];os.makedirs(O,exist_ok=True);R={}
PAIRS=[('cryo','gravity'),('singularity','prism'),('thunder','rail'),('stellar','disc'),('spiral','ricochet'),('inferno','solar')]
def clean(pg):pg.evaluate("()=>{document.getElementById('tutorial392')?.remove();document.getElementById('m40')?.remove();document.querySelectorAll('.adv70,.st71,.u72,.m63').forEach(e=>e.hidden=true)}")
with sync_playwright() as p:
    b=p.chromium.launch();errs=[]
    c=b.new_context(viewport={'width':412,'height':860});pg=c.new_page();pg.on('pageerror',lambda e:errs.append(str(e)[:300]));pg.set_default_timeout(240000)
    pg.goto('file://'+f+'?nopop',timeout=240000);pg.wait_for_timeout(3000)
    pg.evaluate("()=>{Gfx66.open()}");pg.fill('#st66-code','SAOBANG-ADMIN-2026');pg.click('[data-adm]');pg.click('[data-adm]');pg.wait_for_timeout(15000)
    pg.wait_for_function("()=>typeof Gear44!=='undefined'&&typeof Lobby!=='undefined'&&typeof KN146API!=='undefined'",timeout=240000);pg.wait_for_timeout(4000);clean(pg)
    for mi,sd in PAIRS:
        info=pg.evaluate("""(a)=>{mode='menu';try{Lobby.show()}catch{};Progress.setLocked(false);for(const k of ['armor','missiles','sidearm'])try{Gear44.equipSSS(k,null)}catch{};const o=[];for(const m of a){Campaign36.acquire('gear',m,'','story');const it=Progress.getState().items.filter(x=>x.variant===m).slice(-1)[0];Progress.equip(it.id);o.push([m,it.spec&&it.spec.rank]);}return o}""",[mi,sd])
        clean(pg)
        pg.evaluate("()=>{document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value='80';Lobby.hide();reset();if(mode==='pause')mode='play';window.__iv=window.__iv||setInterval(()=>{try{invuln=999;hp=maxHp}catch{}},200)}")
        pg.wait_for_timeout(5000)
        def st():return pg.evaluate("()=>{let g=0,c=0;try{for(const b of bullets){if(b.g146)g++;if(b.c146)c++}}catch{};return {rt:Object.fromEntries(Object.entries(Gear44.runtime()).filter(([k])=>k!=='armor').map(([k,v])=>[k,v.id+':'+v.mode+':'+Math.round(v.dmg)])),kn:KN146API._state(),bent:g,slowedB:c,lv:[Gear44.fxState('missiles')?.lv146,Gear44.fxState('sidearm')?.lv146],nb:bullets.length,ne:enemies.length}}")
        r={'equip':info,'normal':st()}
        pg.screenshot(path=f'{O}/{mi}_{sd}_thuong.png')
        pg.evaluate("()=>{try{superTime=8}catch{};try{Equipment25.barrage()}catch{}}");pg.wait_for_timeout(1500)
        r['skill_super']=st();pg.screenshot(path=f'{O}/{mi}_{sd}_bt.png')
        pg.wait_for_timeout(3000);r['sau']=st()
        R[mi+'+'+sd]=r;print(mi,sd,json.dumps(r,ensure_ascii=False,separators=(',',':')),flush=True)
    R['errs']=errs[:8];b.close()
print('ERRS',R['errs'])
