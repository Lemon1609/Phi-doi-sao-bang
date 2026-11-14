# V82 · tranh GPT: boss 20/60/80/100 + trang bị bộ 6–9
import sys,json
from playwright.sync_api import sync_playwright
f=sys.argv[1];R={};O='/tmp/claude-0/-home-claude/5e17076b-711a-5cdd-a148-8fee187c2778/scratchpad/'
SEED="""if(!sessionStorage.getItem('t82b')){sessionStorage.setItem('t82b','1');const h=JSON.parse(localStorage.getItem('saobang-hangar-v1')||'{}');h.cleared=Array.from({length:120},(_,i)=>i+1);localStorage.setItem('saobang-hangar-v1',JSON.stringify(h));}"""
with sync_playwright() as p:
  b=p.chromium.launch();pg=b.new_page(viewport={'width':393,'height':852});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
  pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(3000);pg.add_init_script(SEED);pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(5000)
  R['st']=pg.evaluate("()=>({b:Boss82.state(),a:Art82.state()})")
  for st in [20,60,80,100]:
    pg.evaluate("s=>{document.getElementById('tutorial392')?.remove();for(const n of ['st80','r79'])document.getElementById(n)?.remove();window.__st80=0;document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value=String(s);Lobby.hide();reset();}",st)
    pg.wait_for_timeout(800)
    pg.evaluate("()=>{try{Story80&&Story80.skip&&Story80.skip()}catch{};const d=document.getElementById('st80');if(d)d.hidden=true;window.__st80=0;endlessWave=9;for(const e of enemies)e.dead=true;}")
    pg.wait_for_timeout(5500)
    R[str(st)]=pg.evaluate("()=>({boss:!!boss,lv:level,c76:(()=>{try{return C76.state().boss}catch{return null}})(),b75:(()=>{try{return B75.state()}catch{return null}})()})")
    pg.screenshot(path=O+'b82_'+str(st)+'.png')
  # trang bị bộ 9 trong trận
  pg.evaluate("""()=>{for(const v of ['aegis9','swarm9','carrier9']){let it=Progress.getState().items.find(x=>x.variant===v);if(!it){const a=Campaign36.acquire('gear',v,'SS','endless');it=a&&a.item;}Progress.equip(it.id);}document.getElementById('mission-select').value='30';reset();}""")
  pg.wait_for_timeout(6000);pg.screenshot(path=O+'b82_gear.png')
  pg.evaluate("()=>{mode='menu';Nav74.tab('equip')}");pg.wait_for_timeout(1500);pg.screenshot(path=O+'b82_inv.png')
  R['errs']=errs[:5];b.close()
print(json.dumps(R,ensure_ascii=False))
