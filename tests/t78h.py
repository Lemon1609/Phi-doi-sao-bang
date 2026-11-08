# V78.7 · cân bằng Gemini REVIEW78_6: lực chiến tân thủ, đạn, buff, Bạo Tẩu tràn hỏa lực, gợi ý càn quét, chặn bấm đúp
import sys,json
from playwright.sync_api import sync_playwright
f=sys.argv[1];R={}
GO="(n)=>{document.getElementById('tutorial392')?.remove();document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value=String(n);Lobby.hide();reset();invuln=999}"
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':393,'height':852});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(4000);pg.add_style_tag(content='#g74{display:none!important}')
    R['req']=pg.evaluate("()=>({cp:Math.round(Combat.stats().cp),req:[1,3,5,10,20,21,40].map(n=>Math.round(Meta40.reqCP(n)))})")
    pg.evaluate(GO,1);pg.wait_for_timeout(2000)
    R['bul']=pg.evaluate("()=>{const c=Bullet66.cur();return {cap:c.cap,bossCap:c.bossCap,fan:c.fan,burst:c.burst,cd:c.cd,op:Bal787.state().op}}")
    R['buff']=pg.evaluate("""()=>{drops.length=0;let mx=0;for(let i=0;i<400;i++){Loot40.onKill({x:240,y:300,elite:false,large:false});const n=drops.filter(d=>!d.dead&&!['star','craft','none'].includes(d.type)).length;mx=Math.max(mx,n);if(n>=2)for(const d of drops)if(!['star','craft'].includes(d.type))d.dead=true;}return {spawned:Bal787.state().spawned,maxOnScreen:mx}}""")
    R['over']=pg.evaluate("()=>{superTime=0;power=5;collect({type:'power',x:player.x,y:player.y});return {sup:Math.round(superTime*10)/10}}")
    pg.evaluate("()=>{enemies.length=0;finishStage36()}");pg.wait_for_timeout(3500)
    R['dbl']=pg.evaluate("()=>new Promise(r=>{const c0=Progress.balance();const b=document.getElementById('lobby-back');b.click();b.click();setTimeout(()=>r({mode,dc:Progress.balance()-c0}),1200)})")
    pg.evaluate("()=>Gfx66.open()");pg.fill('#st66-code','SAOBANG-ADMIN-2026');pg.click('[data-adm]');pg.click('[data-adm]');pg.wait_for_timeout(9000);pg.add_style_tag(content='#g74{display:none!important}')
    pg.evaluate("()=>{document.getElementById('tutorial392')?.remove();Bal787._sheet('crystal2')}");pg.wait_for_timeout(500)
    R['sheet']=pg.evaluate("()=>document.getElementById('sw787')?.innerText.replace(/\\n/g,' | ')")
    pg.screenshot(path='/tmp/claude-0/t78h_sheet.png')
    R['sweep']=pg.evaluate("()=>new Promise(r=>{const id='crystal2';const h0=V70.have(id);const b=document.querySelector('#sw787 [data-sw=sweep]');if(!b)return r('nobtn');b.click();setTimeout(()=>r({h0,h1:V70.have(id)}),800)})")
    pg.evaluate(GO,60);pg.wait_for_timeout(1500)
    R['bul60']=pg.evaluate("()=>{const c=Bullet66.cur();return {cap:c.cap,tier:Bal787.state().tier,op:Bal787.state().op}}")
    R['errs']=errs;b.close()
print(json.dumps(R,ensure_ascii=False))
