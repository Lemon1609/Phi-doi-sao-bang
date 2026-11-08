import sys,json
from playwright.sync_api import sync_playwright
f=sys.argv[1];seed=open('tests/seed_full.js').read();R={}
with sync_playwright() as p:
    b=p.chromium.launch()
    c=b.new_context(viewport={'width':390,'height':844},is_mobile=True,has_touch=True,device_scale_factor=3);c.add_init_script(seed)
    pg=c.new_page();errs=[];pg.on('pageerror',lambda e:errs.append(str(e)));pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(2800)
    # 1) Graze về 0 khi sang ải
    pg.evaluate("()=>{document.getElementById('mission-select').value='3';Lobby.hide();reset();}");pg.wait_for_timeout(600)
    R['graze']=pg.evaluate("()=>{Combat26.addCharge07(60);const a=Combat26.state().charge;mode='reward';nextStage();return [a,Combat26.state().charge,level]}")
    # 2) buff đậu: tắt cột sáng, mờ khi có đạn
    pg.evaluate("()=>{window.__g=setInterval(()=>{if(mode==='play'){hp=maxHp;enemies.forEach(e=>e.dead=true);player.x=240;player.y=H*.8;}},10);drops=[];Safety31.push(drops,100,{x:100,y:200,type:'heal',t:0,vx:0,vy:-60,ph:0,v40:true});}")
    pg.wait_for_timeout(3500);R['dau']=pg.evaluate("()=>{const d=drops.find(d=>d.type==='heal'&&!d.dead);return d&&{park:d.park51,fade:+d.fade51.toFixed(2)}}")
    pg.evaluate("()=>{const d=drops.find(d=>d.type==='heal'&&!d.dead);window.__b=setInterval(()=>{bullets.length=0;bullets.push({x:d.x+20,y:d.y,vx:0,vy:0,r:4,dead:false})},10)}")
    pg.wait_for_timeout(600);R['gan_dan']=pg.evaluate("()=>{const d=drops.find(d=>d.type==='heal'&&!d.dead);return d&&+d.fade51.toFixed(2)}")
    pg.evaluate("()=>{clearInterval(__b);bullets.length=0}");pg.wait_for_timeout(600);R['het_dan']=pg.evaluate("()=>{const d=drops.find(d=>d.type==='heal'&&!d.dead);return d&&+d.fade51.toFixed(2)}")
    R['errs']=errs;c.close()
    # 3) DPR 3 + CPU chậm → tự giảm hiệu ứng
    c=b.new_context(viewport={'width':390,'height':844},is_mobile=True,has_touch=True,device_scale_factor=3);c.add_init_script(seed);c.add_init_script("localStorage.setItem('saobang-effects-v1','high')")
    pg=c.new_page();pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(2800)
    pg.evaluate("()=>{document.getElementById('mission-select').value='3';Lobby.hide();reset();setInterval(()=>{if(mode==='play')hp=maxHp},50)}")
    R['q_truoc']=pg.evaluate("()=>[VisualFX.counts().quality,devicePixelRatio]")
    cdp=c.new_cdp_session(pg);cdp.send('Emulation.setCPUThrottlingRate',{'rate':20})
    pg.wait_for_timeout(9000);cdp.send('Emulation.setCPUThrottlingRate',{'rate':1})
    R['q_sau']=pg.evaluate("()=>VisualFX.counts().quality");c.close();b.close()
print(json.dumps(R,ensure_ascii=False))
