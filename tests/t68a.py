import sys,json
from playwright.sync_api import sync_playwright
f=sys.argv[1];R={};O='/tmp/claude-0/t68/';import os;os.makedirs(O,exist_ok=True)
with sync_playwright() as p:
    b=p.chromium.launch();c=b.new_context(viewport={'width':412,'height':1012},device_scale_factor=2)
    pg=c.new_page();errs=[];pg.on('pageerror',lambda e:errs.append(str(e)));pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(3000)
    # --- tài khoản mới: thua ở ải 1 ---
    pg.evaluate("()=>{document.getElementById('tutorial392')?.remove();document.getElementById('mission-select').value='1';Lobby.hide();reset();}");pg.wait_for_timeout(1500)
    R['fresh_raw']=pg.evaluate("()=>[+Hud68.rawFactor().toFixed(3),+Combat.factor().toFixed(3),Combat.flight().cp,Combat.requirement()]")
    pg.evaluate("()=>{toast('NÂNG ĐẠN W · LV 3');toast('NÂNG ĐẠN W · LV 3');toast('KHIÊN CHẮN ĐẠN · 10 GIÂY');toast('HỒI MÁU +1');toast('A');toast('B');}")
    pg.wait_for_timeout(300);R['q']=pg.evaluate("()=>[Hud68.queue(),[...document.querySelectorAll('#fq68 .fq68')].map(e=>e.textContent)]")
    pg.wait_for_timeout(700);pg.screenshot(path=O+'fresh_hud.png')
    R['tele']=pg.evaluate("()=>{const t=document.getElementById('tele07');return {cpHidden:t.querySelector('.t7-cp').hidden,cp:t.querySelector('.t7-cp').textContent,h:t.offsetHeight}}")
    pg.evaluate("()=>{hp=0;end(false);}");pg.wait_for_timeout(1500);pg.screenshot(path=O+'fresh_fail.png')
    R['fail']=pg.evaluate("()=>{const d=document.querySelector('#rs .fx68');return d?[d.querySelector('.fx68-t').textContent,[...d.querySelectorAll('button')].map(b=>b.dataset.f68)]:null}")
    pg.click('#rs [data-f68="craft"]');pg.wait_for_timeout(1200);pg.screenshot(path=O+'fresh_craft.png')
    R['after']=pg.evaluate("()=>({mode,ov:document.getElementById('overlay').hidden,hgr:document.getElementById('hgr41').hidden,panels:[...document.querySelectorAll('body > *')].filter(e=>e.id&&getComputedStyle(e).display!='none'&&e.offsetHeight>0).map(e=>e.id).slice(-6)})")
    # --- admin: ải 40, HUD + laser ---
    pg.evaluate("()=>{Gfx66.open()}");pg.fill('#st66-code','SAOBANG-ADMIN-2026');pg.click('[data-adm]');pg.click('[data-adm]');pg.wait_for_timeout(8000)
    pg.evaluate("()=>{document.getElementById('tutorial392')?.remove();document.getElementById('mission-select').value='40';Lobby.hide();reset();}");pg.wait_for_timeout(2500)
    R['adm_raw']=pg.evaluate("()=>[+Hud68.rawFactor().toFixed(3),+Combat.factor().toFixed(3),document.querySelector('#tele07 .t7-cp').hidden]")
    R['beam']=pg.evaluate("()=>{beams.push({x:150,y:90,width:13,age:0,warn:.6,duration:.75,angle28:Math.PI/2,length28:900,color:'#ff7a4d'});beams.push({x:0,y:300,width:13,age:0,warn:.6,duration:.75,angle28:0,length28:900,color:'#6bcfff'});return beams.length}")
    pg.wait_for_timeout(250);R['warn']=pg.evaluate("()=>beams.map(b=>[b.warn,+b.age.toFixed(2)])");pg.screenshot(path=O+'adm_laser.png')
    pg.wait_for_timeout(2500);pg.screenshot(path=O+'adm_hud.png')
    R['errs']=errs;b.close()
print(json.dumps(R,ensure_ascii=False))
