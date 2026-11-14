# V81 · bộ 9 Kỳ Hạm + kiểu bắn #6/#8
import sys,json
from playwright.sync_api import sync_playwright
f=sys.argv[1];R={};O='/tmp/claude-0/-home-claude/5e17076b-711a-5cdd-a148-8fee187c2778/scratchpad/'
SEED="""if(!sessionStorage.getItem('t81')){sessionStorage.setItem('t81','1');
 const h=JSON.parse(localStorage.getItem('saobang-hangar-v1')||'{}');h.cleared=Array.from({length:160},(_,i)=>i+1);localStorage.setItem('saobang-hangar-v1',JSON.stringify(h));}"""
def battle(pg,craft,eq,secs=8):
  return pg.evaluate("""([craft,eq])=>{try{Gear44.equipSSS('missiles',null);Gear44.equipSSS('sidearm',null);Gear44.equipSSS('armor',null);}catch{}
   for(const v of eq){let it=Progress.getState().items.find(x=>x.variant===v);if(!it){const a=Campaign36.acquire('gear',v,'SS','endless');it=a&&a.item;}if(it)Progress.equip(it.id);}
   try{Campaign36.acquire('craft',craft,'SS','endless');}catch{}try{selected=craft;launchCraft=craft;}catch{}
   document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value='100';Lobby.hide();reset();return [mode,gear.equipment.map(i=>i.variant)]}""",[craft,eq])
with sync_playwright() as p:
  b=p.chromium.launch();pg=b.new_page(viewport={'width':393,'height':852});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
  pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(3500);pg.add_init_script(SEED);pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(4500)
  R['cat']=pg.evaluate("()=>({set9:Campaign36.sets[9],cat:['aegis9','swarm9','carrier9'].map(v=>GearCatalog[v]&&GearCatalog[v].name),active:ACTIVE_GEAR_MODELS.includes('swarm9'),w5:Fighters28.profiles[5].weapon,w7:Fighters28.profiles[7].weapon})")
  # lộ trình #10 → nhận nguyên bộ 9 khung Tím
  R['route']=pg.evaluate("()=>{const ok=Ship79.claim(4);const its=Progress.getState().items.filter(i=>['aegis9','swarm9','carrier9'].includes(i.variant));return {ok,n:its.map(i=>[i.variant,V70.nOf(i)]),ship:Campaign36.ownsCraft(9)}}")
  # không rơi ngẫu nhiên: 6000 lượt rương / phó bản
  R['nodrop']=pg.evaluate("()=>{let n=0;for(let i=0;i<3000;i++){const r=Campaign36.loot('equipment',4);if(r&&r.type==='gear'&&/9$/.test(r.item&&r.item.variant||''))n++;}return n}")
  # art
  R['art']=pg.evaluate("()=>{const it=Progress.getState().items.find(i=>i.variant==='carrier9');return /g81/.test(Progress.art(it))}")
  pg.screenshot(path=O+'t81_ach.png')
  R['b10']=battle(pg,9,['aegis9','swarm9','carrier9']);pg.wait_for_timeout(9000)
  R['b10s']=pg.evaluate("()=>({mode,st:Gear81.state(),shots:(shots||[]).filter(s=>s.gearModel==='swarm9'||s.gearModel==='carrier9').length,sh:shield,models:[...new Set((shots||[]).map(s=>s.gearModel).filter(Boolean))]})")
  pg.screenshot(path=O+'t81_b10.png')
  R['b6']=battle(pg,5,['aegis','inferno','rail']);pg.wait_for_timeout(500)
  pg.evaluate("()=>{window.__h5=0;window.__h5b=0;const h=Arsenal30.hit;Arsenal30.hit=function(s,e){if(s&&s.art28===5){__h5++;if(e===boss||e.bossPart)__h5b++;}return h.apply(this,arguments)}}")
  pg.evaluate("()=>{power=Math.max(power,3)}");pg.wait_for_timeout(9000)
  R['b6s']=pg.evaluate("()=>({mode,st:Gear81.state(),craft:launchCraft,h5:__h5,h5b:__h5b,en:enemies.length,arts:[...new Set(shots.map(s=>s.art28))]})")
  R['b8']=battle(pg,7,['aegis','inferno','rail']);pg.wait_for_timeout(9000)
  R['b8s']=pg.evaluate("()=>({mode,st:Gear81.state(),craft:launchCraft})")
  pg.screenshot(path=O+'t81_b8.png')
  R['errs']=errs[:5];b.close()
print(json.dumps(R,ensure_ascii=False))
