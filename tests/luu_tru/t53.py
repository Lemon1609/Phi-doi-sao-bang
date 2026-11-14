import sys,json
from playwright.sync_api import sync_playwright
f=sys.argv[1];seed=open('tests/seed_full.js').read();R={}
with sync_playwright() as p:
    b=p.chromium.launch();c=b.new_context(viewport={'width':390,'height':844},is_mobile=True,has_touch=True,device_scale_factor=2);c.add_init_script(seed)
    pg=c.new_page();errs=[];pg.on('pageerror',lambda e:errs.append(str(e)));pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(2800)
    pg.evaluate("()=>{document.getElementById('mission-select').value='3';Lobby.hide();reset();gear.magnet=0;window.PX=240;window.PY=H*.78;window.__g=setInterval(()=>{if(mode==='play'){hp=maxHp-1;superTime=0;enemies.forEach(e=>e.dead=true);player.x=PX;player.y=PY;}},10)}")
    pg.wait_for_timeout(500)
    pg.evaluate("()=>{drops=[];const L=[['power'],['heal'],['shield'],['bomb'],['drone'],['weapon']];L.forEach(([t],i)=>Safety31.push(drops,100,{x:60+i*70,y:150,type:t,weapon:2,t:0,vx:0,vy:-80,ph:i,v40:true}));}")
    pg.wait_for_timeout(3500);R['ds']=pg.evaluate("()=>drops.filter(d=>!d.dead).map(d=>[d.type,Math.round(d.x),Math.round(d.y),d.slot51,Math.round(Math.hypot(d.x-player.x,d.y-player.y))])");R['w']=pg.evaluate('()=>[weapon,H]');pg.screenshot(path='shots/v53_dau.png')
    # dải trưng bày: 5 súng + sao + siêu cấp đang bay giữa màn
    pg.evaluate("()=>{PX=240;PY=H*.95;drops=drops.filter(d=>0);const ks=[['weapon',0],['weapon',1],['weapon',2],['weapon',3],['weapon',4],['super',0]];ks.forEach(([t,w],i)=>Safety31.push(drops,100,{x:50+i*76,y:H*.42,type:t,weapon:w,t:-99,vx:0,vy:0,ph:i,v40:true}));for(let i=0;i<4;i++)Safety31.push(drops,100,{x:120+i*80,y:H*.55,type:'star',big:i%2==1,t:0,vx:0,vy:0,ph:i,v40:true});window.__f=setInterval(()=>{for(const d of drops){if(d.type!=='star'){d.t=-99;}}},5)}")
    pg.wait_for_timeout(400);pg.screenshot(path='shots/v53_mau.png')
    R['keys']=pg.evaluate("()=>Pickup51.keys()");R['errs']=errs;b.close()
print(json.dumps(R,ensure_ascii=False))
