# V78.5 · boss Phá Không ải 40 (3 pha), tàu vận tải, bệ tiến hóa, chân dung bản đồ
import sys,json
from playwright.sync_api import sync_playwright
f=sys.argv[1];R={};O='/tmp/claude-0/t78g_'
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':393,'height':852},device_scale_factor=2);errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(3500);pg.add_style_tag(content='#g74{display:none!important}')
    pg.evaluate("()=>Gfx66.open()");pg.fill('#st66-code','SAOBANG-ADMIN-2026');pg.click('[data-adm]');pg.click('[data-adm]');pg.wait_for_timeout(9000);pg.add_style_tag(content='#g74{display:none!important}')
    pg.evaluate("()=>{document.getElementById('tutorial392')?.remove();document.querySelectorAll('.adv70,.st71,.u72').forEach(e=>e.hidden=true);Arsenal30.fire=()=>{};document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value='40';Lobby.hide();reset();invuln=999;for(const e of enemies)e.dead=true;try{startBoss()}catch{}}")
    pg.wait_for_timeout(6000)
    R['boss']=pg.evaluate("()=>({b75:B75.state(),loaded:Boss78.state(),boss:!!boss})")
    pg.screenshot(path=O+'p1.png')
    for i,r in [(2,.6),(3,.2)]:
        pg.evaluate("(r)=>{window.__b75r=r}",r);pg.wait_for_timeout(2500);R['ph'+str(i)]=pg.evaluate("()=>B75.state()");pg.screenshot(path=O+'p%d.png'%i)
    pg.evaluate("()=>{window.__b75r=undefined;boss=null;enemies.length=0;bullets.length=0;const e=addEnemy({x:W+40,y:300,v:0,type:2,large:true,elite:false,guard:0,hp:999,fire:1e9,age:0,phase:0,dead:false,carrier76:1});e.vx=-80;}")
    pg.wait_for_timeout(1500);pg.screenshot(path=O+'carrier.png')
    R['errs']=errs;b.close()
print(json.dumps(R,ensure_ascii=False))
