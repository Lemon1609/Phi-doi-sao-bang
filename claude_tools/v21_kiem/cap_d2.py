import sys, os, json
from playwright.sync_api import sync_playwright
H='/home/claude/work/l21f.html';O='/home/claude/anh/e21/d2';os.makedirs(O,exist_ok=True)
os.chdir('/home/claude/nguon');_a=sys.argv;sys.argv=['x',H];exec(open('tests/v203_v212/t209.py').read().split("with sync_playwright() as p:")[0]);sys.argv=_a
SIDE=['disc','lance36','chrono11_s','rail','solar','ricochet','gravity','prism','orbit36','halo36','carrier9','devour10_s','monarch12_s']
JOBS=json.loads(os.environ.get('JOBS','[["thunder",0,0],["thunder",3,1],["comet36",2,0],["chrono11_m",3,1],["gravity",1,0],["halo36",3,1],["carrier9",3,0]]'))
CLEAN="()=>{document.getElementById('tutorial392')?.remove();window.RULE84=false;window.TITLE84=false;try{Ch9.open=()=>true}catch{};document.querySelectorAll('.m63,.adv70,.st71').forEach(e=>e.hidden=true)}"
with sync_playwright() as p:
  for v,t,sup in JOBS:
    br=p.chromium.launch();pg,errs,_o=setup(br,'SS');pg.wait_for_timeout(1500)
    kind='sidearm' if v in SIDE else 'missiles'
    pg.add_init_script("""(()=>{try{const c=JSON.parse(localStorage['saobang-campaign-v36']||'null');if(c&&c.models&&!c.models.includes('%s')){c.models.push('%s');localStorage['saobang-campaign-v36']=JSON.stringify(c);}}catch(e){}try{const h=JSON.parse(localStorage['saobang-hangar-v1']);const it=h.items.find(i=>i.id===h.equipped['%s']);if(it){it.variant='%s';localStorage['saobang-hangar-v1']=JSON.stringify(h);}}catch(e){}})()"""%(v,v,kind,v))
    pg.reload();pg.wait_for_timeout(4500);pg.evaluate(CLEAN)
    pg.evaluate("(a)=>{const [k,v,t,sup]=a;window.__ti21=t;Progress.setLocked(false);{const S=Progress.getState(),cur=S.items.find(i=>i.id===S.equipped[k]);if(!cur||cur.variant!==v){let it=null;try{it=Progress.grantChestGear(v,'','story')}catch(e){}if(it)Progress.equip(it.id);else if(cur)cur.variant=v;}}selectCraft(0);launchCraft=0;document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value='12';Lobby.hide();reset();if(mode==='pause')mode='play';window.__iv=setInterval(()=>{hp=maxHp;shield=0;superTime=sup?8:0;try{player.y=700;player.x=240}catch{};try{bullets.length=0}catch{}},20)}",[kind,v,t,sup])
    pg.wait_for_timeout(3500);best=-1
    for k in range(20):
      pg.wait_for_timeout(250)
      n=pg.evaluate("()=>{let n=0;for(const s of (GearVK304.ST||[]))for(const b of s.pool)if(b.on&&(b.type==='shot'||b.type==='return'))n++;for(const q of shots)if(q.gearItem&&q.gearItem.kind!=='armor')n++;return n}")
      if n>best:best=n;pg.screenshot(path=f'{O}/{v}_{t}{"s" if sup else ""}.png',clip={'x':0,'y':120,'width':390,'height':700})
    print(v,t,sup,best,errs[:2],flush=True);br.close()
