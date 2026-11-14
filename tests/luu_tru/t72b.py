import sys,json,os
from playwright.sync_api import sync_playwright
f=sys.argv[1];R={};O='/tmp/claude-0/t72/';os.makedirs(O,exist_ok=True)
def clean(pg):pg.evaluate("()=>{document.getElementById('tutorial392')?.remove();document.querySelectorAll('.adv70,.st71,.u72').forEach(e=>e.hidden=true)}")
with sync_playwright() as p:
    b=p.chromium.launch();errs=[]
    c=b.new_context(viewport={'width':412,'height':1012},device_scale_factor=2);pg=c.new_page();pg.on('pageerror',lambda e:errs.append(str(e)));pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(3000)
    pg.evaluate("()=>{Gfx66.open()}");pg.fill('#st66-code','SAOBANG-ADMIN-2026');pg.click('[data-adm]');pg.click('[data-adm]');pg.wait_for_timeout(8000);clean(pg)
    pg.evaluate("()=>{try{Fusion.select(null)}catch{};Ult72._set({gift:1,main:'fortress',w:{fortress:{own:1,r:15,lv:100}}});}")
    pg.wait_for_timeout(3500)
    R['unlock']=pg.evaluate("()=>[Chip72.unlocked(),Chip72.state().mat,Chip72.dropLv(),Math.round(Combat.stats().cp)]")
    R['prod']=pg.evaluate("()=>{Chip72._set({mat:{cry:5000,coder:50,core:200},xp:1000});const out=Chip72.produce(10);return [out.length,out.map(c=>[c.q,c.sh,c.set,c.lv,c.ln.length]),Chip72.state().pity,Chip72.dropLv()]}")
    R['equip']=pg.evaluate("""()=>{const sh=['fire','fire','frame','frame','link','link'];const r=[];for(let i=0;i<6;i++){const c=Chip72._give(Chip72.gen({q:6,sh:sh[i],set:'fortress_1',lv:50}));r.push(Chip72.equip(c.id,'fortress',i));}
      const T=Chip72.agg('fortress');return [r,+T.atk.toFixed(4),+T.hp.toFixed(4),T.set,Ult72.X.has('fortress_1',6),+Ult72.bonusOf('atk').toFixed(4),Math.round(Combat.stats().cp)]}""")
    R['ops']=pg.evaluate("""()=>{const c=Chip72.state().ch.find(x=>x.q>=2&&!x.eq)||Chip72._give(Chip72.gen({q:4}));const a=Chip72.upgrade(c.id);const r1=Chip72.refine(c.id,0);Chip72.accept(true);const r2=Chip72.rebuild(c.id,1%c.ln.length);Chip72.accept(false);
      for(let i=0;i<5;i++)Chip72._give(Chip72.gen({q:0,sh:'link'}));const m=Chip72.merge(0,'link');const n0=Chip72.state().ch.length;const s=Chip72.salvage(Chip72.state().ch.filter(x=>!x.eq&&x.q<=1).map(x=>x.id));return [a,!!r1,!!r2,Chip72.state().ch.find(x=>x.id===c.id).rbi,m&&m.q,n0,s.n,Chip72.state().mat]}""")
    pg.evaluate("()=>Chip72.open('fortress')");pg.wait_for_timeout(400);pg.screenshot(path=O+'chip_home.png')
    pg.evaluate("()=>document.querySelector('.c72 [data-a=forge]').click()");pg.wait_for_timeout(300);pg.screenshot(path=O+'chip_forge.png')
    pg.evaluate("()=>{const id=Chip72.state().ch.find(x=>x.q>=4).id;document.querySelector('.c72 [data-a=inv]').click();}");pg.wait_for_timeout(300);pg.screenshot(path=O+'chip_inv.png')
    pg.evaluate("()=>document.querySelector('.c72 .c72-grid [data-a=det]').click()");pg.wait_for_timeout(300);pg.screenshot(path=O+'chip_det.png')
    pg.evaluate("()=>{document.querySelectorAll('.c72').forEach(e=>e.hidden=true);Ult72.open()}");pg.wait_for_timeout(300);pg.screenshot(path=O+'u72_chipbtn.png')
    # trận với bộ Thiên Tiệm 6
    clean(pg);pg.evaluate("()=>{document.getElementById('mission-select').value='100';Lobby.hide();reset();}");pg.wait_for_timeout(2500)
    R['battle']=pg.evaluate("()=>{bombs=3;bomb();const t=Ult72._B.ents.filter(e=>e.ty==='turret').map(e=>e.blk);return [t,Ult72.charge()>0,mode]}")
    pg.wait_for_timeout(1500)
    R['errs']=errs;b.close()
print(json.dumps(R,ensure_ascii=False))
