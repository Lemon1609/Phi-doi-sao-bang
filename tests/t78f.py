# V78.2 · về sảnh sau ải, màn kết quả gọn, nguyên liệu cố định theo ải boss, hút gần, rung chỉ khi trúng đòn
import sys,json
from playwright.sync_api import sync_playwright
f=sys.argv[1];R={};O='/tmp/claude-0/t78f_'
START="""(n)=>{document.getElementById('tutorial392')?.remove();const h=JSON.parse(localStorage.getItem('saobang-hangar-v1')||'{}');h.cleared=Array.from({length:12},(_,i)=>i+1);localStorage.setItem('saobang-hangar-v1',JSON.stringify(h));}"""
GO="""(n)=>{document.getElementById('tutorial392')?.remove();document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value=String(n);Lobby.hide();reset();invuln=99}"""
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':407,'height':715},device_scale_factor=2);errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(3500);pg.add_style_tag(content='#g74{display:none!important}');pg.evaluate('()=>Gfx66.open()');pg.fill('#st66-code','SAOBANG-ADMIN-2026');pg.click('[data-adm]');pg.click('[data-adm]');pg.wait_for_timeout(9000);pg.add_style_tag(content='#g74{display:none!important}')
    pg.evaluate(GO,5);pg.wait_for_timeout(1500)
    R['mat0']=pg.evaluate("()=>['alloy','crystal','circuit','plasma'].map(t=>[1,2,3].reduce((a,k)=>a+V70.have(t+k),0))")
    pg.evaluate("()=>{enemies.length=0;boss=null;finishStage36()}");pg.wait_for_timeout(4500)
    R['mat1']=pg.evaluate("()=>['alloy','crystal','circuit','plasma'].map(t=>[1,2,3].reduce((a,k)=>a+V70.have(t+k),0))")
    R['win']=pg.evaluate("()=>({tiles:[...document.querySelectorAll('#rs .rw78')].map(e=>e.title),vis:[...document.querySelectorAll('#overlay button')].filter(b=>b.getBoundingClientRect().width>0&&getComputedStyle(b).display!=='none').map(b=>b.textContent.trim()),grid:document.querySelector('#rs .rs-grid')?getComputedStyle(document.querySelector('#rs .rs-grid')).display:null,mode,st:document.getElementById('overlay').dataset.state,rs:!!document.getElementById('rs')})")
    pg.screenshot(path=O+'win.png')
    print(pg.evaluate("()=>[document.body.className,getComputedStyle(document.getElementById('tutorial392')||document.body).display,mode]"),flush=True);pg.click('#lobby-back');pg.wait_for_timeout(1500)
    R['afterBack']=pg.evaluate("()=>({mode,lobby:!document.getElementById('lobby')?.hidden,nav:Nav74.state().cur,start:getComputedStyle(document.getElementById('start')).display})")
    # thua
    pg.evaluate(GO,1);pg.wait_for_timeout(1200);pg.evaluate("()=>{invuln=0;hp=0;end()}");pg.wait_for_timeout(3000)
    R['lose']=pg.evaluate("()=>[...document.querySelectorAll('#overlay button')].filter(b=>b.getBoundingClientRect().width>0&&getComputedStyle(b).display!=='none').map(b=>b.textContent.trim())")
    pg.screenshot(path=O+'lose.png');pg.click('#lobby-back');pg.wait_for_timeout(1200)
    # hút gần + rung
    pg.evaluate(GO,1);pg.wait_for_timeout(1500)
    pg.evaluate("()=>{enemies.length=0;bullets.length=0;player.x=240;player.y=H-200;drops.length=0;Safety31.push(drops,100,{x:240,y:H-200-110,type:'power',t:0,vy:0,vx:0});Safety31.push(drops,100,{x:240,y:H-200-40,type:'heal',t:0,vy:0,vx:0});}")
    pg.wait_for_timeout(700)
    R['pull']=pg.evaluate("()=>drops.filter(d=>!d.dead&&d.type!=='craft').map(d=>[d.type,Math.round(Math.hypot(d.x-player.x,d.y-player.y))])")
    R['shake']=pg.evaluate("()=>new Promise(r=>{shake=.6;setTimeout(()=>r(shake),120)})")
    pg.screenshot(path=O+'play.png')
    R['btn']=pg.evaluate("()=>['pause','fullscreen-toggle'].map(i=>{const r=document.getElementById(i).getBoundingClientRect();return [i,Math.round(r.left),Math.round(r.top),Math.round(r.width)]})")
    pg.evaluate(GO,1);pg.wait_for_timeout(1500)
    R['sh0']=pg.evaluate("()=>({hp,maxHp,shield,st:Shield78.state()})")
    R['sh1']=pg.evaluate("()=>{enemies.length=0;bullets.length=0;invuln=0;const h=hp;damage('bullet');return {dHp:h-hp,st:Shield78.state(),inv:invuln}}")
    R['sh2']=pg.evaluate("()=>new Promise(r=>setTimeout(()=>{invuln=0;const h=hp;damage('collision');r({dHp:Math.round((h-hp)*100)/100,hp})},300))")
    R['shDrop']=pg.evaluate("()=>new Promise(r=>{invuln=5;Safety31.push(drops,100,{x:player.x,y:player.y-10,type:'shield',t:0,vy:0,vx:0});setTimeout(()=>r(Shield78.state()),500)})")
    R['errs']=errs;b.close()
print(json.dumps(R,ensure_ascii=False))
