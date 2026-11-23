import sys, os, json
from playwright.sync_api import sync_playwright
H=os.environ.get('HT','/home/claude/work/l21g.html');O=os.environ.get('OUT','/home/claude/anh/e21/d3');os.makedirs(O,exist_ok=True)
os.chdir('/home/claude/nguon');_a=sys.argv;sys.argv=['x',H];exec(open('tests/v203_v212/t209.py').read().split("with sync_playwright() as p:")[0]);sys.argv=_a
SIDE={'sss_rail_disc','sss_solar_gravity','sss_ricochet_prism','sss_lance_orbit','sss_halo_carrier','sss_devour_chrono_s','sss_monarch_rail'}
JOBS=json.loads(os.environ.get('JOBS','[["sss_inferno_cryo",2,0],["sss_rail_disc",1,1]]'))
CLEAN="()=>{document.getElementById('tutorial392')?.remove();window.RULE84=false;window.TITLE84=false;try{Ch9.open=()=>true}catch{};document.querySelectorAll('.m63,.adv70,.st71').forEach(e=>e.hidden=true)}"
with sync_playwright() as p:
  for v,t,sup in JOBS:
    br=p.chromium.launch();pg,errs,_o=setup(br,'SS');pg.wait_for_timeout(1500)
    pg.add_init_script("(()=>{try{const k='saobang-gear-sss-v2';const o=JSON.parse(localStorage[k]||'null')||{v:2,owned:{},bind:{},wk:{w:0,n:0},pay:null,l4:1};o.v=2;o.l4=o.l4||1;o.owned['%s']={lv:5,at:1};localStorage[k]=JSON.stringify(o);}catch(e){}})()"%v)
    pg.reload();pg.wait_for_timeout(4500);pg.evaluate(CLEAN)
    kind='sidearm' if v in SIDE else 'missiles'
    r=pg.evaluate("(a)=>{const [k,v,t,sup]=a;window.__ts21=t;Progress.setLocked(false);const ok=Gear44.owns(v)?Gear44.equipSSS(k,v):'notown';selectCraft(0);launchCraft=0;document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value='12';Lobby.hide();reset();if(mode==='pause')mode='play';window.__iv=setInterval(()=>{hp=maxHp;shield=0;superTime=sup?8:0;try{player.y=700;player.x=240}catch{};try{bullets.length=0}catch{}},20);return [ok,Gear44.activeId(k)]}",[kind,v,t,sup])
    pg.wait_for_timeout(3500);best=-1
    for k in range(24):
      pg.wait_for_timeout(250)
      n=pg.evaluate("()=>{let n=0;for(const s of (GearVK304.ST||[]))for(const b of s.pool)if(b.on&&(b.type==='shot'||b.type==='return'))n++;for(const q of shots)if(q.gearItem&&q.gearItem.kind!=='armor')n++;return n}")
      if n>best:best=n;pg.screenshot(path=f'{O}/{v}_{t}{"s" if sup else ""}.png',clip={'x':0,'y':120,'width':390,'height':700})
    print(v,t,sup,r,best,errs[:2],flush=True);br.close()
