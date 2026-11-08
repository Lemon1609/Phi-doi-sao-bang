# V82 · 9 kỹ năng bộ 6–8: chạy trận, không lỗi, so sát thương lên boss với bộ cũ
import sys,json
from playwright.sync_api import sync_playwright
f=sys.argv[1];R={};O='/tmp/claude-0/-home-claude/5e17076b-711a-5cdd-a148-8fee187c2778/scratchpad/'
SEED="""if(!sessionStorage.getItem('t82c')){sessionStorage.setItem('t82c','1');const h=JSON.parse(localStorage.getItem('saobang-hangar-v1')||'{}');h.cleared=Array.from({length:120},(_,i)=>i+1);localStorage.setItem('saobang-hangar-v1',JSON.stringify(h));}"""
SETS={'bo1':['mirror','cryo','disc'],'bo6':['aurora36','comet36','lance36'],'bo7':['void36','nova36','orbit36'],'bo8':['seraph36','judgement36','halo36']}
with sync_playwright() as p:
  b=p.chromium.launch();pg=b.new_page(viewport={'width':393,'height':852});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
  pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(3000);pg.add_init_script(SEED);pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(5000)
  pg.evaluate("()=>{document.getElementById('tutorial392')?.remove();window.STORY80=false;}")
  for name,eq in SETS.items():
    pg.evaluate("""(eq)=>{mode="menu";try{Progress.setLocked(false)}catch{};for(const v of eq){let it=Progress.getState().items.find(x=>x.variant===v);if(!it){const a=Campaign36.acquire('gear',v,'','endless');it=a&&a.item;}Progress.equip(it.id);}
      document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value='79';Lobby.hide();reset();}""",eq)
    pg.wait_for_timeout(600);pg.evaluate("()=>{const d=document.getElementById('st80');if(d)d.hidden=true;window.__st80=0;}")
    pg.wait_for_timeout(7000)
    R[name]=pg.evaluate("()=>({eq:gear.equipment.map(i=>i.variant),st:Skill81.state(),k:kills|0,mode})")
    if name!='bo1':pg.screenshot(path=O+'s81_'+name+'.png')
  # sát thương lên boss 10 s (chỉ trang bị: tắt đạn chính)
  for name,eq in SETS.items():
    R['boss_'+name]=pg.evaluate("""(eq)=>new Promise(res=>{mode="menu";try{Progress.setLocked(false)}catch{};for(const v of eq){const it=Progress.getState().items.find(x=>x.variant===v);Progress.equip(it.id);}
      document.getElementById('mission-select').value='80';reset();setTimeout(()=>{const d=document.getElementById('st80');if(d)d.hidden=true;window.__st80=0;endlessWave=9;for(const e of enemies)e.dead=true;
       const w=setInterval(()=>{if(boss&&boss.y>100){clearInterval(w);invuln=999;window.__dsum=0;const db=window.damageBoss;window.damageBoss=function(a,src){if(src==='gear'||(src&&src.gearModel))__dsum+=a;return db.apply(this,arguments)};setTimeout(()=>{window.damageBoss=db;res({gearDmg:Math.round(__dsum),eq:gear.equipment.map(i=>i.variant)})},10000);}},200);},600);})""",eq)
  R['errs']=errs[:5];b.close()
print(json.dumps(R,ensure_ascii=False))
