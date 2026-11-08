# V83 · chiến cơ #11–#13
import sys,json
from playwright.sync_api import sync_playwright
f=sys.argv[1];R={};O='/tmp/claude-0/-home-claude/5e17076b-711a-5cdd-a148-8fee187c2778/scratchpad/'
SEED="""if(!sessionStorage.getItem('t83b')){sessionStorage.setItem('t83b','1');const h=JSON.parse(localStorage.getItem('saobang-hangar-v1')||'{}');h.cleared=Array.from({length:120},(_,i)=>i+1);localStorage.setItem('saobang-hangar-v1',JSON.stringify(h));}"""
with sync_playwright() as p:
  b=p.chromium.launch();pg=b.new_page(viewport={'width':393,'height':852});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
  pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(3000);pg.add_init_script(SEED);pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(5000)
  R['base']=pg.evaluate("()=>({n:crafts.length,p:Fighters28.profiles.length,ws:Workshop.getState().crafts.length,routes:Ship79.ROUTE.map(r=>r.i),art:Object.keys(SHIP83_ART).length})")
  R['acq']=pg.evaluate("()=>{const out=[];for(const i of [10,11,12]){const r=Campaign36.acquire('craft',i,'SS','endless');out.push([i,!!r,Campaign36.ownsCraft(i),Workshop.craftProgress(i).grade,Workshop.craftProgress(i).level]);}return out}")
  R['vol']=pg.evaluate("()=>[10,11,12].map(i=>{const v=Arsenal30.volley(i,3,false);return [v.length,v[0]&&v[0].type,v[0]&&v[0].art28]})")
  for i in [10,11,12]:
    pg.evaluate("i=>{document.getElementById('tutorial392')?.remove();mode='menu';try{Progress.setLocked(false)}catch{};selected=i;launchCraft=i;try{localStorage.setItem('saobang-craft',i)}catch{};document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value='30';Lobby.hide();reset();}",i)
    pg.wait_for_timeout(700);pg.evaluate("()=>{const d=document.getElementById('st80');if(d)d.hidden=true;window.__st80=0;power=4}");pg.wait_for_timeout(3500)
    R['play'+str(i)]=pg.evaluate("()=>({sel:selected,m:mode,hp,sh:shots.filter(s=>s.art28>=10).length})")
    pg.screenshot(path=O+'s83_'+str(i)+'.png')
  pg.evaluate("()=>{superTime=6}");pg.wait_for_timeout(1500);pg.screenshot(path=O+'s83_12s.png')
  pg.evaluate("()=>{mode='menu';Nav74.tab('fleet')}");pg.wait_for_timeout(1500);pg.screenshot(path=O+'s83_hangar.png')
  pg.evaluate("()=>{const b=document.querySelector('#hb-strip [data-c=\"11\"]');b&&b.click()}");pg.wait_for_timeout(1200);pg.screenshot(path=O+'s83_hangar11.png')
  # lộ trình #13: giả đạt ải 180
  R['route']=pg.evaluate("()=>{const g0=Progress.getState;Progress.getState=function(){const o=g0.apply(this,arguments);o.cleared=Array.from({length:180},(_,i)=>i+1);return o;};const k=Ship79.ROUTE.findIndex(r=>r.i===12);const ok=Ship79.claim(k);Progress.getState=g0;return {k,ok,n:V70.craftN(12),gear:Campaign36.sets[12].map(m=>{const it=Progress.getState().items.find(x=>x.variant===m);return it?[m,V70.nOf(it)]:[m,null]}),copies:Evo82.list().filter(c=>c.m==12||/12_/.test(c.m)).length}}")
  pg.evaluate("()=>{Nav74.tab('home');Nav74.tab('home')}");pg.wait_for_timeout(600)
  pg.evaluate("()=>{try{Nav74.page&&Nav74.page('g_ach')}catch(e){}}");pg.wait_for_timeout(1500)
  R['rows']=pg.evaluate("()=>{const e=document.querySelector('.s79ships');return e?e.innerText.slice(-500):'none'}")
  R['errs']=errs[:6];b.close()
print(json.dumps(R,ensure_ascii=False))
