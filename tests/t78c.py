# V78 · vật phẩm rơi không mất + hút gần, đạn quái nhỏ hơn. python3 tests/t78c.py <html tuyệt đối>
import sys,json,os
from playwright.sync_api import sync_playwright
f=sys.argv[1];R={};O='/tmp/claude-0/t78c/';os.makedirs(O,exist_ok=True)
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':393,'height':852});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(3500);pg.add_style_tag(content='#g74{display:none!important}')
    pg.evaluate("()=>{Gfx66.open()}");pg.fill('#st66-code','SAOBANG-ADMIN-2026');pg.click('[data-adm]');pg.click('[data-adm]');pg.wait_for_timeout(8000)
    pg.evaluate("()=>{document.getElementById('tutorial392')?.remove();document.getElementById('rite408')?.remove();document.querySelectorAll('.adv70,.st71,.u72').forEach(e=>e.hidden=true);Arsenal30.fire=()=>{};document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value='30';Lobby.hide();reset();invuln=999}")
    pg.wait_for_timeout(1500)
    pg.evaluate("()=>{player.x=60;for(const [x,t] of [[200,'power'],[300,'heal'],[400,'star'],[250,'shield']])Safety31.push(drops,100,{x,y:200,type:t,t:0});window.__d0=drops.filter(d=>!d.dead&&d.type!=='craft').length}")
    pg.wait_for_timeout(16000)
    R['after16s']=pg.evaluate("()=>{invuln=99;const L=drops.filter(d=>!d.dead&&d.type!=='craft');return {n0:window.__d0,n:L.length,ys:L.map(d=>Math.round(d.y)),H}}")
    pg.screenshot(path=O+'rest.png')
    R['pull']=pg.evaluate("()=>new Promise(res=>{const L=drops.filter(d=>!d.dead&&d.type!=='craft');const n0=L.length;const t=L[0];player.x=t.x;player.y=t.y+120;setTimeout(()=>res({n0,n:drops.filter(d=>!d.dead&&d.type!=='craft').length}),1500);})")
    R['errs']=errs;b.close()
print(json.dumps(R,ensure_ascii=False))
