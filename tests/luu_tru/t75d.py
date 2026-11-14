# REVIEW75 · bộ kiểm thử theo 15 mục Gemini (phần tự động hóa được). Chạy: python3 tests/t75d.py <file html tuyệt đối>
import sys,json,os
from playwright.sync_api import sync_playwright
f=sys.argv[1];R={};O='/tmp/claude-0/t75d/';os.makedirs(O,exist_ok=True)
CL="()=>{document.getElementById('tutorial392')?.remove();document.getElementById('rite408')?.remove();document.querySelectorAll('.adv70,.st71,.u72').forEach(e=>e.hidden=true)}"
def page(p,admin=True,vp=(393,852)):
    b=p.chromium.launch();c=b.new_context(viewport={'width':vp[0],'height':vp[1]},device_scale_factor=1);pg=c.new_page();errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(3500)
    if admin:
        pg.add_style_tag(content='#g74{display:none!important}')
        pg.evaluate("()=>{Gfx66.open()}");pg.fill('#st66-code','SAOBANG-ADMIN-2026');pg.click('[data-adm]');pg.click('[data-adm]');pg.wait_for_timeout(8000)
    pg.evaluate(CL);return b,pg,errs
def start(pg,n,nofire=True):
    pg.evaluate("([n,nf])=>{window.__b75r=undefined;mode='menu';try{Lobby.show()}catch{};document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value=String(n);Lobby.hide();reset();invuln=999;if(nf&&!window.__af){window.__af=Arsenal30.fire;Arsenal30.fire=()=>{};}if(!nf&&window.__af){Arsenal30.fire=window.__af;window.__af=null;}}",[n,nofire])
with sync_playwright() as p:
    ERR=[]
    # ---- A: fresh profile (#15) ----
    b,pg,errs=page(p,admin=False)
    R['15_fresh']=pg.evaluate("()=>{UX75.tabs();const vis=id=>{const e=document.querySelector('#nav74 [data-t=\"'+id+'\"]');return !!e&&getComputedStyle(e).display!=='none'};return {home:vis('home'),combat:vis('combat'),equip:vis('equip'),shop:vis('shop'),fleet:vis('fleet'),guideModal:!!document.querySelector('#g74:not([hidden])')}}")
    pg.screenshot(path=O+'fresh.png');ERR+=errs;b.close()
    # ---- B: admin, in battle ----
    b,pg,errs=page(p)
    R['nav_admin_tabs']=pg.evaluate("()=>{UX75.tabs();return ['equip','shop','fleet'].map(id=>getComputedStyle(document.querySelector('#nav74 [data-t=\"'+id+'\"]')).display!=='none')}")
    # #12 vòng quay: 2 free + 7 trả phí = 450
    R['12_wheel']=pg.evaluate("()=>{Econ74.add(5000,'t');let paid=0;const fl=Econ74.freeLeft();for(let i=0;i<fl;i++)Econ74.spin(1);for(let i=0;i<7;i++){const a=Econ74.gems();Econ74.spin(1);paid+=a-Econ74.gems();}return {free:fl,paid7:paid}}")
    # #13 thể lực: càn quét 5 → -30; hồi 1 sau 300 s
    R['13_energy']=pg.evaluate("()=>{V75.addEn(500,'t');const st=V75.state();V75._set({en:120,ts:Date.now()});const e0=V75.energy();let n=0;for(let i=0;i<5;i++){try{if(Campaign36.sweep(1))n++;}catch{}}const e1=V75.energy();V75._set({ts:Date.now()-301000});const e2=V75.energy();return {e0,sweeps:n,e1,afterRegen:e2,cost:PLAN75.ENERGY.SWEEP_COST}}")
    # #11 Vượt Hạn thưởng
    R['11_o78']=pg.evaluate("()=>[OVERLIMIT_BOSS_V78.REWARD_FIRST(1),OVERLIMIT_BOSS_V78.REWARD_WEEK(1)]")
    # #7 graze combo 20
    R['7_graze']=pg.evaluate("()=>{C76run.gReset();C76run._graze(20);return C76run.state().combo}")
    # #5 spawn threshold ở ải 25
    start(pg,25);pg.wait_for_timeout(4000)
    R['5_spawn']=pg.evaluate("()=>new Promise(res=>{const t0=performance.now();for(const e of enemies)if(!e.rescue28)kill(e);let seen=false;const iv=setInterval(()=>{const live=enemies.filter(e=>!e.dead&&e.y<H).length;if(live>0&&!seen){seen=true;clearInterval(iv);res({ms:Math.round(performance.now()-t0),live});}if(performance.now()-t0>3000){clearInterval(iv);res({ms:-1});}},50);})")
    # #3 trần đạn ở ải 160 (180 không vào được qua reset)
    start(pg,160);pg.wait_for_timeout(1000)
    R['3_cap']=pg.evaluate("()=>new Promise(res=>{let mx=0;const t0=performance.now();let fr=0,last=performance.now(),minFps=999;const iv=setInterval(()=>{invuln=99;mx=Math.max(mx,bullets.filter(b=>!b.dead).length);},100);(function loop(){fr++;const n=performance.now();if(n-t0<20000)requestAnimationFrame(loop);else{clearInterval(iv);res({maxBullets:mx,cap:Bullet66.cur().cap,avgFps:Math.round(fr/((n-t0)/1000))});}})();})")
    # #4 khe an toàn: boss ải 100, đo khe ngang lớn nhất ở dải tàu
    start(pg,100);pg.evaluate("()=>{for(const e of enemies)e.dead=true;try{startBoss()}catch{}}");pg.wait_for_timeout(7000)
    # #8 đổi pha boss xóa đạn
    R['8_phase']=pg.evaluate("()=>new Promise(res=>{window.__b75r=.9;setTimeout(()=>{const before=bullets.filter(b=>!b.dead).length;const ph0=B75.state()&&B75.state().ph;window.__b75r=.6;setTimeout(()=>{res({before,after:bullets.filter(b=>!b.dead).length,ph:[ph0,B75.state()&&B75.state().ph]});},60);},2500);})")
    R['4_corridor']=pg.evaluate("""()=>new Promise(res=>{const S=[];let k=0;const iv=setInterval(()=>{invuln=99;k++;if(k===2)window.__b75r=undefined;if(k===30)window.__b75r=.5;if(k===60)window.__b75r=.1;const y0=650*H/1100,y1=1020*H/1100;
      for(let y=y0;y<=y1;y+=40){const xs=bullets.filter(b=>!b.dead&&Math.abs(b.y-y)<14).map(b=>b.x).sort((a,b)=>a-b);let gap=0,prev=0;for(const x of xs){gap=Math.max(gap,x-prev-10);prev=x+0;}gap=Math.max(gap,W-prev);S.push(gap);}
      if(k>=90){clearInterval(iv);const bad=S.filter(g=>g<54).length;res({samples:S.length,minGap:Math.round(Math.min(...S)),under54:bad,b75:B75.state()});}},120);})""")
    pg.screenshot(path=O+'boss100.png')
    # đội hình mới ở ải 45
    start(pg,45);pg.wait_for_timeout(9000)
    R['formations']=pg.evaluate("()=>RV75.state()");pg.screenshot(path=O+'form45.png')
    # chống tường đạn: lượng đạn quanh tàu
    R['density_near']=pg.evaluate("()=>RV75.state().near")
    # #9 tẩy đá tự động
    R['9_autoReforge']=pg.evaluate("()=>typeof Stone71._auto==='function'||typeof Stone71._ar!=='undefined'")
    # thua → gợi ý
    pg.evaluate("()=>{invuln=0;hp=0;try{end(false)}catch(e){}}");pg.wait_for_timeout(900)
    R['defeat_hint']=pg.evaluate("()=>{const c=document.querySelector('.ux75d');return c&&!c.hidden?c.textContent.slice(0,90):null}");pg.screenshot(path=O+'defeat.png')
    # nhiệm vụ: nút nhận tất cả
    pg.evaluate("()=>{mode='menu';document.querySelector('.ux75d')&&(document.querySelector('.ux75d').hidden=true);Q77.open('d')}");pg.wait_for_timeout(300)
    R['q77_all']=pg.evaluate("()=>[!!document.querySelector('.q77-all'),typeof Q77.claimAll]")
    ERR+=errs;b.close()
    # ---- C: bản đồ · càn quét ×5 ----
    b,pg,errs=page(p)
    R['sweep5']=pg.evaluate("()=>{V75.addEn(200,'t');return typeof UX75.sweep5==='function'?UX75.sweep5(1):null}")
    ERR+=errs;b.close()
    R['errs']=ERR
print(json.dumps(R,ensure_ascii=False))
