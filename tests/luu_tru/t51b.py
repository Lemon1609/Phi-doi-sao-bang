import sys,json
from playwright.sync_api import sync_playwright
f=sys.argv[1];seed=open('tests/seed_full.js').read();R={}
with sync_playwright() as p:
    b=p.chromium.launch();c=b.new_context(viewport={'width':390,'height':844},is_mobile=True,has_touch=True,device_scale_factor=2);c.add_init_script(seed)
    pg=c.new_page();errs=[];pg.on('pageerror',lambda e:errs.append(str(e)));pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(2800)
    pg.evaluate("()=>{document.getElementById('mission-select').value='3';Lobby.hide();reset();gear.magnet=0;window.PX=240;window.PY=H*.8;window.__g=setInterval(()=>{if(mode==='play'){hp=maxHp-1;superTime=0;enemies.forEach(e=>e.dead=true);bullets.length=0;player.x=PX;player.y=PY;}},10)}")
    pg.wait_for_timeout(500)
    pg.evaluate("()=>{drops=[];for(const [i,t] of ['super','heal','power','shield'].entries())Safety31.push(drops,100,{x:80+i*100,y:150,type:t,t:0,vx:0,vy:-80,ph:i,v40:true});}")
    pg.wait_for_timeout(3500);R['keys']=pg.evaluate("()=>Pickup51.keys()");pg.screenshot(path='shots/v51_super.png')
    R['truoc']=pg.evaluate("()=>drops.filter(d=>!d.dead&&d.type!=='none').map(d=>[d.type,Math.round(d.x),Math.round(d.y)])")
    pg.evaluate("()=>{const d=drops.find(d=>d.type==='super');PX=d.x;PY=d.y;}");pg.wait_for_timeout(180);pg.screenshot(path='shots/v51_burst.png')
    R['sau']=pg.evaluate("()=>({superTime:+superTime.toFixed(1),con:drops.filter(d=>!d.dead&&d.type==='super').length})")
    R['errs']=errs;b.close()
print(json.dumps(R,ensure_ascii=False))
