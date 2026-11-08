import sys,json,os
from playwright.sync_api import sync_playwright
f=sys.argv[1];R={};O='/tmp/claude-0/t71/';os.makedirs(O,exist_ok=True)
def ctx(b,errs):
    c=b.new_context(viewport={'width':412,'height':1012},device_scale_factor=2);pg=c.new_page();pg.on('pageerror',lambda e:errs.append(str(e)));return c,pg
def clean(pg):pg.evaluate("()=>{document.getElementById('tutorial392')?.remove();document.getElementById('m40')?.remove();document.querySelectorAll('.adv70,.st71').forEach(e=>e.hidden=true)}")
with sync_playwright() as p:
    b=p.chromium.launch();errs=[]
    # 1. người mới: khóa
    c,pg=ctx(b,errs);pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(3500);clean(pg)
    R['new']=pg.evaluate("()=>[Stone71.unlocked(),Stone71.state().st.length,Stone71.state().mig]")
    pg.evaluate("()=>Stone71.host('c0')");pg.wait_for_timeout(300);pg.screenshot(path=O+'locked.png')
    R['patrolNew']=pg.evaluate("()=>{const p=Stone71.patrolPreview();return [p.h<.1,Stone71.patrolClaim()]}")
    c.close()
    # 2. quản trị: khảm đầy Cam
    c,pg=ctx(b,errs);pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(3000)
    pg.evaluate("()=>{Gfx66.open()}");pg.fill('#st66-code','SAOBANG-ADMIN-2026');pg.click('[data-adm]');pg.click('[data-adm]');pg.wait_for_timeout(8000);clean(pg)
    R['adm0']=pg.evaluate("()=>{try{Fusion.select(null)}catch{};const s=Combat.stats();return [Stone71.unlocked(),Math.round(s.cp),+s.attack.toFixed(1),+s.hp.toFixed(2),+s.armor.toFixed(2),Stone71.state().st.length,typeof launchCraft!=='undefined'?launchCraft:null]}")
    R['fill']=pg.evaluate("""()=>{const lc=typeof launchCraft!=='undefined'?launchCraft:0;const eq=Progress.v70.equipped();const hosts=['c'+lc,'g:'+eq.armor,'g:'+eq.missiles,'g:'+eq.sidearm];const out=[];
      for(const key of hosts){const h=Stone71.hostOf(key);const st=[Stone71.make(4,h.pos,{ty:'stat'}),Stone71.make(4,h.pos,{ty:'stat'}),Stone71.make(4,h.pos,{ty:'stat'}),Stone71.make(4,h.pos,{ty:'omega',m:h.model}),Stone71.make(4,h.pos,{ty:'sigma',m:h.model})];
        st.forEach(s=>Stone71.give(s));out.push([key,h.open,st.map((s,i)=>Stone71.put(key,i,s.id))]);}
      const s=Combat.stats();return [out,Math.round(s.cp),+s.attack.toFixed(1),+s.hp.toFixed(2),+s.armor.toFixed(2),+Stone71.atkMult().toFixed(4),Stone71.totals().def]}""")
    R['effect']=pg.evaluate("""()=>{const eq=Progress.v70.equipped();const key='g:'+eq.missiles;for(const s of Stone71.on(key))if(s.on.s>=3)Stone71.take(s.id);const a=Stone71.make(4,'missiles',{ty:'effect',k:'m7'}),b2=Stone71.make(4,'missiles',{ty:'effect',k:'m6'});Stone71.give(a);Stone71.give(b2);const r=[Stone71.put(key,3,a.id),Stone71.put(key,4,b2.id),Stone71.put(key,0,a.id)];
      const m0=mode;mode='play';const bs=boss;boss=null;hp=maxHp;const c1=Stone71._cond();mode=m0;boss=bs;return [r,Stone71.totals().eff,+c1.toFixed(3)]}""")
    pg.evaluate("()=>{const eq=Progress.v70.equipped();Stone71.host('g:'+eq.missiles)}");pg.wait_for_timeout(300);pg.screenshot(path=O+'host.png')
    pg.evaluate("()=>document.querySelector('.st71 [data-a=sock][data-v=\"1\"]').click()");pg.wait_for_timeout(300);pg.screenshot(path=O+'picker.png')
    R['merge']=pg.evaluate("()=>{for(let i=0;i<5;i++)Stone71.give(Stone71.make(2,'armor',{ty:'stat'}));const n0=Stone71.state().st.length;const s=Stone71.merge(2,'armor');return [n0,Stone71.state().st.length,s&&[s.t,s.pos,s.ty]]}")
    pg.evaluate("()=>Stone71.inv('all')");pg.wait_for_timeout(300);pg.screenshot(path=O+'inv.png')
    R['salv']=pg.evaluate("()=>{const it=Progress.grantChestGear('aegis');const n=Progress.v70.items().length;V70.sync();const tgt=Progress.v70.items().find(x=>x.id!==Progress.v70.equipped().armor&&V70.nOf(x)>=2);if(!tgt)return 'no item';const s=Stone71.salvage(tgt.id);return [n,Progress.v70.items().length,s&&[s.t,s.ty]]}")
    R['patrol']=pg.evaluate("()=>{Stone71._set({pat:{at:Date.now()-5*3600000,mx:Date.now(),h2:0,h6:0}});const p=Stone71.patrolPreview();const c0=Progress.balance();const r=Stone71.patrolClaim();return [+p.h.toFixed(2),p.cr,p.ex,p.low,p.lam,r&&r.stones.length]}")
    pg.evaluate("()=>Stone71.patrol()");pg.wait_for_timeout(300);pg.screenshot(path=O+'patrol.png')
    clean(pg);pg.evaluate("()=>Hub40.open('gear')");pg.wait_for_timeout(600)
    pg.evaluate("()=>{const eq=Progress.v70.equipped();document.querySelector('#hub40 [data-it=\"'+eq.missiles+'\"]').click()}");pg.wait_for_timeout(500);pg.screenshot(path=O+'hub_sheet.png')
    R['hubBtn']=pg.evaluate("()=>[document.querySelector('#sh-st71')?.innerText,document.querySelector('#sh-sv71')?.innerText]")
    pg.evaluate("()=>Hub40.open('craft')");pg.wait_for_timeout(500);R['hubCraft']=pg.evaluate("()=>document.querySelector('#hb-st71')?.innerText")
    clean(pg);pg.evaluate("()=>{Hub40.close&&Hub40.close();Lobby68.set('kho')}");pg.wait_for_timeout(800);pg.screenshot(path=O+'kho.png')
    c.close()
    # 3. quy đổi ngọc
    c,pg=ctx(b,errs);pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(3000)
    pg.evaluate("""()=>{const items=JSON.parse(localStorage.getItem('saobang-hangar-v1')).items;const it=items.find(i=>i.kind==='missiles');
      localStorage.setItem('saobang-gems-v1',JSON.stringify({version:1,fragments:{'armor-B':12,'missiles-D':7},jewels:[{id:'j1',kind:'missiles',grade:'S',itemId:it.id},{id:'j2',kind:'armor',grade:'A',itemId:null},{id:'j3',kind:'sidearm',grade:'C',itemId:null},{id:'j4',kind:'missiles',grade:'B',itemId:null}]}));
      const h=JSON.parse(localStorage.getItem('saobang-hangar-v1'));h.items.find(i=>i.id===it.id).enhance=5;h.items.find(i=>i.id===it.id).level=120;localStorage.setItem('saobang-hangar-v1',JSON.stringify(h));
      localStorage.removeItem('saobang-stone71-v1');localStorage.removeItem('saobang-tier70-v1');Storage.prototype.setItem=function(){};}""")
    pg.reload();pg.wait_for_timeout(4500);pg.screenshot(path=O+'mig.png')
    R['mig']=pg.evaluate("()=>{const S=Stone71.state();return [S.mig,S.st.length,S.st.map(s=>[s.t,s.pos,s.ty,s.on?s.on.s:null]),Stone71.unlocked()]}")
    R['errs']=errs;b.close()
print(json.dumps(R,ensure_ascii=False))
