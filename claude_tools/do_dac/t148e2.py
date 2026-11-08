import sys,json
from playwright.sync_api import sync_playwright
f=sys.argv[1]
EQ="""(a)=>{document.querySelectorAll('.adv70,.st71,.u72,.m63').forEach(e=>e.hidden=true);document.getElementById('tutorial392')?.remove();mode='menu';try{Lobby.show()}catch{};Progress.setLocked(false);for(const k of ['armor','missiles','sidearm'])try{Gear44.equipSSS(k,null)}catch{};
 for(const m of a){Campaign36.acquire('gear',m,'SS','endless');const it=Progress.getState().items.filter(x=>x.variant===m).slice(-1)[0];Progress.equip(it.id);}
 document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value='60';Lobby.hide();reset();if(mode==='pause')mode='play';}"""
PREP="()=>{invuln=0;bulletShieldTime=0;shield=0;hp=maxHp*.8;}"
with sync_playwright() as p:
    b=p.chromium.launch();errs=[];pg=b.new_page(viewport={'width':412,'height':860});pg.on('pageerror',lambda e:errs.append(str(e)[:300]));pg.set_default_timeout(240000)
    pg.goto('file://'+f+'?nopop',timeout=240000);pg.wait_for_timeout(3000)
    pg.evaluate("()=>{Gfx66.open()}");pg.fill('#st66-code','SAOBANG-ADMIN-2026');pg.click('[data-adm]');pg.click('[data-adm]');pg.wait_for_timeout(15000)
    pg.wait_for_function("()=>typeof Gear44!=='undefined'&&typeof NT147S!=='undefined'",timeout=240000);pg.wait_for_timeout(4000)
    pg.evaluate(EQ,['aurora36','comet36','lance36']);pg.wait_for_timeout(7000)
    print('tag07',pg.evaluate("()=>{const o={};for(const s of shots){const k=(s.gearKind||'chinh')+':'+(s.v147||'-');o[k]=(o[k]||0)+1}return o}"))
    pg.screenshot(path='/tmp/claude-0/b07_tran.png')
    def one(arm,js):
        pg.evaluate(EQ,[arm]);pg.wait_for_timeout(2500);pg.evaluate("()=>{mode='play'}")
        r=pg.evaluate(js);r={'kq':r,'mode':pg.evaluate('()=>mode'),'arm':pg.evaluate('()=>gear.armorItem&&gear.armorItem.variant')};print(arm,json.dumps(r,ensure_ascii=False),flush=True)
    base="(()=>{window.SHIELD78=false;window.BK78=false;window.FAIR76=false;invuln=0;bulletShieldTime=0;shield=0;hp=maxHp*.8;const h0=hp;damage('bullet');return h0-hp})()"
    one('phase',"()=>{window.SHIELD78=false;window.BK78=false;window.FAIR76=false;let n=0;for(let k=0;k<200;k++){invuln=0;bulletShieldTime=0;shield=0;hp=maxHp*.8;const h0=hp;damage('collision');if(hp>=h0-1e-9)n++;}return {ti_le_chan:n/200}}")
    one('aurora36',"()=>{window.NT147=false;const off="+base+";window.NT147=undefined;NT147S.S.layer=1;const on="+base+";return {mat_mau_tat:+off.toFixed(3),mat_mau_co_tang:+on.toFixed(3),tang_sau:NT147S.S.layer}}")
    one('aegis9',"()=>{window.NT147=false;const off="+base+";window.NT147=undefined;const on="+base+";return {tat:+off.toFixed(3),bat:+on.toFixed(3),giam:+(1-on/off).toFixed(3)}}")
    one('monarch12_a',"async()=>{window.NT147=false;const off="+base+";window.NT147=undefined;const on="+base+";const d=NT147S.count().defer;const h1=hp;await new Promise(r=>setTimeout(r,4500));return {tat:+off.toFixed(3),ngay:+on.toFixed(3),hoan:d,rut_sau_4s:+(h1-hp).toFixed(3)}}")
    one('chrono11_a',"()=>{window.SHIELD78=false;window.BK78=false;window.FAIR76=false;invuln=0;bulletShieldTime=0;shield=0;hp=enemyScale()*.5;damage('bullet');return {hp:+hp.toFixed(3),invuln:+invuln.toFixed(2),mode}}")
    one('void36',"()=>{window.SHIELD78=false;window.BK78=false;window.FAIR76=false;invuln=0;bulletShieldTime=0;shield=0;hp=maxHp*.3;damage('bullet');return {hp:+hp.toFixed(3),invuln:+invuln.toFixed(2)}}")
    one('seraph36',"()=>{invuln=0;bulletShieldTime=0;shield=0;hp=maxHp*.8;collect({type:'heal',x:0,y:0});collect({type:'power',x:0,y:0});hp=maxHp*.8;const n=NT147S.count().seraph;window.NT147=false;const off="+base+";window.NT147=undefined;const on="+base+";return {tang:n,tat:+off.toFixed(3),bat:+on.toFixed(3)}}")
    one('devour10_a',"()=>{hp=maxHp*.5;window.SKILL81=false;const h0=hp;const e=enemies.find(e=>!e.dead&&!e.bossPart);if(!e)return 'khong co quai';e.hp=0;kill(e);return {hoi:+(hp-h0).toFixed(3),phan_tram:+((hp-h0)/maxHp*100).toFixed(2),kc:NT147S.S.kc,elite:!!(e.elite||e.large)}}")
    print('ERRS',errs[:6]);b.close()
