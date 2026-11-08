import sys,json,os,time as T
from playwright.sync_api import sync_playwright
f=sys.argv[1];R={};O='/tmp/claude-0/t72/';os.makedirs(O,exist_ok=True)
def ctx(b,errs):
    c=b.new_context(viewport={'width':412,'height':1012},device_scale_factor=2);pg=c.new_page();pg.on('pageerror',lambda e:errs.append(str(e)));return c,pg
def clean(pg):pg.evaluate("()=>{document.getElementById('tutorial392')?.remove();document.getElementById('m40')?.remove();document.querySelectorAll('.adv70,.st71,.u72').forEach(e=>e.hidden=true)}")
with sync_playwright() as p:
    b=p.chromium.launch();errs=[]
    c,pg=ctx(b,errs);pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(3500);clean(pg)
    R['new']=pg.evaluate("()=>{Ult72.open();return [document.querySelector('.u72 h3')?.innerText,Ult72.bonus()]}")
    c.close()
    c,pg=ctx(b,errs);pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(3000)
    pg.evaluate("()=>{Gfx66.open()}");pg.fill('#st66-code','SAOBANG-ADMIN-2026');pg.click('[data-adm]');pg.click('[data-adm]');pg.wait_for_timeout(8000);clean(pg)
    pg.evaluate("()=>{try{Fusion.select(null)}catch{};Ult72.open()}");pg.wait_for_timeout(400);pg.screenshot(path=O+'gift.png')
    R['gift']=pg.evaluate("()=>{document.querySelector('.u72 [data-a=gift][data-v=fortress]').click();const S=Ult72.state();return [S.main,S.w.fortress,Ult72.bonus()]}")
    pg.wait_for_timeout(300);pg.screenshot(path=O+'main.png')
    R['cp0']=pg.evaluate("()=>Math.round(Combat.stats().cp)")
    R['lv']=pg.evaluate("()=>{let n=0;while(Ult72.levelUp('fortress')&&n<50)n++;const S=Ult72.state();return [n,S.w.fortress.lv,Ult72.promote('fortress')]}")
    R['promo']=pg.evaluate("()=>{Ult72._set({pool:500,comp:500});Ult72.assign('fortress',300);const a=Ult72.promote('fortress');const S=Ult72.state();return [a,S.w.fortress,S.pool,S.comp]}")
    R['max']=pg.evaluate("()=>{Ult72._set({w:{fortress:{own:1,r:15,lv:100},world:{own:1,r:15,lv:100},hunter:{own:1,r:15,lv:100},web:{own:1,r:15,lv:100}}});const a=[+Ult72.bonus().toFixed(4),Math.round(Combat.stats().cp)];Ult72.setSup(0,'world');Ult72.setSup(1,'hunter');a.push(+Ult72.bonus().toFixed(4),Math.round(Combat.stats().cp));return a}")
    pg.evaluate("()=>{Ult72.open()}");pg.wait_for_timeout(300);pg.screenshot(path=O+'max.png')
    pg.evaluate("()=>{document.querySelector('.u72 [data-a=tasks]').click()}");pg.wait_for_timeout(300)
    R['tasks0']=pg.evaluate("()=>[...document.querySelectorAll('.u72 .adv-s')].map(x=>x.innerText.replace(/\\n/g,' | ')).slice(0,8)")
    pg.screenshot(path=O+'tasks.png')
    # trận đấu
    clean(pg)
    pg.evaluate("()=>{document.getElementById('mission-select').value='100';Lobby.hide();reset();}");pg.wait_for_timeout(2500)
    R['battle0']=pg.evaluate("()=>[mode,+Ult72._D0().toFixed(1),Ult72._B.on,typeof W]")
    for wid in ['fortress','world','hunter','web']:
        pg.evaluate("(id)=>{Ult72.setMain(id);Ult72._B.ents=[];Ult72._B.tok=99999;Ult72._B.ready=0;Ult72._B.useAt=-99;Ult72._B.ev=99;bombs=3;}",wid)
        pg.wait_for_timeout(300)
        r=pg.evaluate("(id)=>{const before=Report392&&1;if(id==='fortress')bomb();if(id==='hunter'){for(let i=0;i<12;i++){Ult72._B.lastPick=-9;collect({type:'heal',x:0,y:0});}}const u=Ult72.useUlt();return [u,Ult72._B.ents.map(e=>e.ty),document.getElementById('ult72-btn')?.hidden]}",wid)
        pg.wait_for_timeout(1600);pg.screenshot(path=O+'b_'+wid+'.png')
        r.append(pg.evaluate("()=>[Ult72._B.ents.map(e=>e.ty+(e.form!=null?e.form:'')),+Ult72._B.tok.toFixed(0),Ult72._B.stopE.size,bullets.filter(b=>b.__v72).length,mode]"))
        R['b_'+wid]=r
    R['errs']=errs;b.close()
print(json.dumps(R,ensure_ascii=False))
