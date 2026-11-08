# ROADMAP76 · công bằng trúng đòn, đệm bom, tốc độ đạn, quái thưởng. python3 tests/t76.py <html tuyệt đối>
import sys,json,os
from playwright.sync_api import sync_playwright
f=sys.argv[1];R={};O='/tmp/claude-0/t76/';os.makedirs(O,exist_ok=True)
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':393,'height':852});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(3500);pg.add_style_tag(content='#g74{display:none!important}')
    pg.evaluate("()=>{Gfx66.open()}");pg.fill('#st66-code','SAOBANG-ADMIN-2026');pg.click('[data-adm]');pg.click('[data-adm]');pg.wait_for_timeout(8000)
    pg.evaluate("()=>{document.getElementById('tutorial392')?.remove();document.getElementById('rite408')?.remove();document.querySelectorAll('.adv70,.st71,.u72').forEach(e=>e.hidden=true)}")
    def start(n):pg.evaluate("(n)=>{mode='menu';try{Lobby.show()}catch{};document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value=String(n);Lobby.hide();reset();}",n)
    start(12);pg.wait_for_timeout(3000)
    R['buffer']=pg.evaluate("""()=>new Promise(res=>{invuln=0;bulletShieldTime=0;shield=0;hp=maxHp;const h0=hp;for(let i=0;i<8;i++)emit(player.x+(i-4)*12,player.y-60,Math.PI/2,1,'orb');const nb0=bullets.filter(b=>!b.dead&&Math.hypot(b.x-player.x,b.y-player.y)<160).length;damage('bullet');const mid=[hp,FAIR76.state().pend];
      setTimeout(()=>{res({h0,mid,after:hp,inv:+invuln.toFixed(2),near0:nb0,nearAfter:bullets.filter(b=>!b.dead&&Math.hypot(b.x-player.x,b.y-player.y)<160).length})},300);})""")
    R['bombSave']=pg.evaluate("""()=>new Promise(res=>{invuln=0;bulletShieldTime=0;shield=0;hp=maxHp;bombs=3;const h0=hp;damage('bullet');setTimeout(()=>{bomb();setTimeout(()=>res({h0,after:hp,bombs}),300);},80);})""")
    R['crit']=pg.evaluate("()=>{shield=0;hp=Math.max(.1,maxHp*.1);return FAIR76.state().crit}")
    pg.wait_for_timeout(400);pg.screenshot(path=O+'crit.png')
    pg.evaluate("()=>{hp=maxHp;invuln=99}")
    # tốc độ đạn nhắm
    def spd(n):
        start(n);pg.evaluate("()=>{invuln=999;if(!window.__af){window.__af=Arsenal30.fire;Arsenal30.fire=()=>{};}}");pg.wait_for_timeout(9000)
        return pg.evaluate("()=>{const A=bullets.filter(b=>!b.dead&&b.aimed30&&!b.boss75);const v=A.map(b=>Math.hypot(b.vx,b.vy));return {n:A.length,avg:Math.round(v.reduce((a,b)=>a+b,0)/Math.max(1,v.length)),max:Math.round(Math.max(0,...v)),cap:Bullet66.cur().cap,hp:+Bullet66.cur().hp.toFixed(2),cp:+(window.__cp76||0).toFixed(2)}}")
    R['speed1']=spd(1);R['speed60']=spd(60);R['speed160']=spd(160)
    # quái thưởng
    start(12);pg.evaluate("()=>{invuln=999;if(window.__af){Arsenal30.fire=window.__af;window.__af=null;}}")
    R['carrier']=pg.evaluate("""()=>new Promise(res=>{const t0=performance.now();const iv=setInterval(()=>{invuln=99;const st=FAIR76.state();if(st.carrier){clearInterval(iv);const e=enemies.find(x=>x.carrier76&&!x.dead);const p0=power;kill(e);setTimeout(()=>res({at:Math.round((performance.now()-t0)/1000),power:[p0,power],buff:FAIR76.state().buff>0,stars:drops.filter(d=>d.type==='star').length}),200);}
      if(performance.now()-t0>60000){clearInterval(iv);res({timeout:true,wave:Waves30.state().wave})}},200);})""")
    pg.screenshot(path=O+'carrier.png')
    R['errs']=errs;b.close()
print(json.dumps(R,ensure_ascii=False))
