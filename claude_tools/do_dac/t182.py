# V182 · kiểm: không còn buff drone (2 chiến cơ phụ trợ). Nhặt drop 'drone' giả → drone vẫn 0, giáp tăng.
import sys
from playwright.sync_api import sync_playwright
f=sys.argv[1]
with sync_playwright() as p:
    b=p.chromium.launch();errs=[];pg=b.new_page(viewport={'width':412,'height':860});pg.on('pageerror',lambda e:errs.append(str(e)[:300]))
    pg.set_default_timeout(240000);pg.goto('file://'+f+'?nopop',timeout=240000);pg.wait_for_timeout(3000)
    pg.evaluate("()=>{Gfx66.open()}");pg.fill('#st66-code','SAOBANG-ADMIN-2026');pg.click('[data-adm]');pg.click('[data-adm]');pg.wait_for_timeout(15000)
    pg.evaluate("()=>{document.querySelectorAll('.adv70,.st71,.u72,.m63,#g44').forEach(e=>e.hidden=true);document.getElementById('tutorial392')?.remove();mode='menu';try{Lobby.show()}catch{};document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value='5';Lobby.hide();reset();if(mode==='pause')mode='play';invuln=1e9;}");pg.wait_for_timeout(1500)
    print('mode0',pg.evaluate('()=>mode'),'maxShield',pg.evaluate('()=>maxShield'));r=pg.evaluate("()=>{shield=0;drops.push({x:player.x,y:player.y,type:'drone',t:0,vx:0,ph:0,v40:true,dead:false});return 1}");pg.wait_for_timeout(1500)
    print('sau khi nhat drop drone: drone=',pg.evaluate("()=>drone"),'shield=',pg.evaluate("()=>+shield.toFixed(2)"))
    # đếm drop sinh ra trong 60 giây chơi
    pg.evaluate("()=>{window.__ty={};const o=Safety31.push;Safety31.push=function(arr,n,obj){if(arr===drops&&obj)window.__ty[obj.type]=(window.__ty[obj.type]||0)+1;return o.apply(this,arguments)};}")
    pg.wait_for_timeout(40000);pg.screenshot(path='/tmp/claude-0/audit/v183_tran40.png');pg.wait_for_timeout(20000)
    pg.screenshot(path='/tmp/claude-0/audit/v183_tran.png');print('mode',pg.evaluate('()=>mode'),'kills',pg.evaluate('()=>kills'));print('loai drop 60s:',pg.evaluate("()=>window.__ty"),'drone=',pg.evaluate("()=>drone"))
    print('ERRS',errs[:4]);b.close()
