# V84 · đo điểm boss cuối tuần theo sức mạnh tài khoản: python3 tests/t84raid.py <file> <tier 0..11> <seed: new|all> [giây đo]
import sys,json,os
from playwright.sync_api import sync_playwright
f=sys.argv[1];tier=int(sys.argv[2]);seed=sys.argv[3];secs=int(sys.argv[4]) if len(sys.argv)>4 else 30
SEED=open(os.path.join(os.path.dirname(__file__),'seed_all.js'),encoding='utf-8').read() if seed=='all' else ("if(!sessionStorage.getItem('seeded')){sessionStorage.setItem('seeded','1');const h=JSON.parse(localStorage.getItem('saobang-hangar-v1')||'{}');h.cleared=Array.from({length:%d},(_,i)=>i+1);localStorage.setItem('saobang-hangar-v1',JSON.stringify(h));}"%int(seed[1:]))
with sync_playwright() as p:
  b=p.chromium.launch();pg=b.new_page(viewport={'width':393,'height':852});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
  pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(3000);pg.add_init_script(SEED);pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(6000)
  info=pg.evaluate("""(t)=>{document.getElementById('tutorial392')?.remove();window.RAID83_ALWAYS=true;
   try{if(t>0){V70.setTier('craft',selected|0,t);const eq=Progress.v70.equipped();for(const id of Object.values(eq))V70.setTier('gear',id,t);}}catch(e){return 'ERR '+e}
   let cp=0;try{cp=Progress.stats().power||Progress.stats().cp||0}catch{}return {sel:selected,cp,n:V70.craftN(selected|0)}}""",tier)
  pg.evaluate("()=>Event83.start(false)");pg.wait_for_timeout(1500)
  pg.evaluate("()=>{setInterval(()=>{try{invuln=999;hp=maxHp;}catch{}},200)}")
  # chờ boss sẵn sàng
  for _ in range(40):
    if pg.evaluate("()=>{const s=Event83.state().RD;return !!(s&&s.t>0)}"):break
    pg.wait_for_timeout(500)
  pg.evaluate("()=>{for(const q of boss.parts||[]){q.hp=0;q.dead=true;}}")
  d0=pg.evaluate("()=>Event83.state().RD");pg.wait_for_timeout(secs*1000);d1=pg.evaluate("()=>Event83.state().RD")
  rate=(d1['dmg']-d0['dmg'])/max(.1,d1['t']-d0['t'])
  print(json.dumps({'tier':tier,'seed':seed,'info':info,'t':[d0['t'],d1['t']],'dps':round(rate,2),'pts90':round(rate*90*1200),'stun':d1['stun'],'errs':errs[:3]},ensure_ascii=False))
  b.close()
