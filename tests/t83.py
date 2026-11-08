# V83 · bộ 10–12 + đạn kỹ năng bộ 6–8
import sys,json
from playwright.sync_api import sync_playwright
f=sys.argv[1];R={};O='/tmp/claude-0/-home-claude/5e17076b-711a-5cdd-a148-8fee187c2778/scratchpad/'
SEED="""if(!sessionStorage.getItem('t83')){sessionStorage.setItem('t83','1');const h=JSON.parse(localStorage.getItem('saobang-hangar-v1')||'{}');h.cleared=Array.from({length:120},(_,i)=>i+1);localStorage.setItem('saobang-hangar-v1',JSON.stringify(h));}"""
SETS=[['devour10_a','devour10_m','devour10_s'],['chrono11_a','chrono11_m','chrono11_s'],['monarch12_a','monarch12_m','monarch12_s'],['aurora36','comet36','halo36']]
with sync_playwright() as p:
  b=p.chromium.launch();pg=b.new_page(viewport={'width':393,'height':852});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
  pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(3000);pg.add_init_script(SEED);pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(5000)
  R['cat']=pg.evaluate("()=>({sets:[10,11,12].map(i=>Campaign36.sets[i]),names:['devour10_a','chrono11_m','monarch12_s'].map(v=>GearCatalog[v].name+' · '+GearCatalog[v].skill),nodrop:!!GEAR81_NODROP.devour10_a,stone:!!(typeof STONE71!=='undefined'&&STONE71.ab.monarch12_s)})")
  for eq in SETS:
    pg.evaluate("""(eq)=>{document.getElementById('tutorial392')?.remove();mode='menu';try{Progress.setLocked(false)}catch{};window.__c={};if(!Skill81.__w){Skill81.__w=1;const fa=Skill81.fire,ar=Skill81.armor;Skill81.fire=function(i){const r=fa.apply(this,arguments);if(r)__c[i.variant]=(__c[i.variant]||0)+1;return r};Skill81.armor=function(i){const r=ar.apply(this,arguments);if(r)__c[i.variant]=(__c[i.variant]||0)+1;return r};}
     for(const v of eq){let it=Progress.getState().items.find(x=>x.variant===v);if(!it){const a=Campaign36.acquire('gear',v,'','endless');it=a&&a.item;}Progress.equip(it.id);}
     document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value='79';Lobby.hide();reset();}""",eq)
    pg.wait_for_timeout(700);pg.evaluate("()=>{const d=document.getElementById('st80');if(d)d.hidden=true;window.__st80=0;}")
    pg.wait_for_timeout(6000)
    pg.evaluate("()=>{const a=gear.equipment.find(i=>i.kind==='armor');Equipment25.armorSkill(a);hp=Math.max(1,hp-4);}")
    pg.wait_for_timeout(300);pg.screenshot(path=O+'t83_'+eq[0]+'.png')
    R[eq[0]]=pg.evaluate("()=>({c:__c,eq:gear.equipment.map(i=>i.variant),hp,st:Skill81.state()})")
  pg.evaluate("()=>{mode='menu';Nav74.tab('equip')}");pg.wait_for_timeout(1200);pg.screenshot(path=O+'t83_inv.png')
  R['errs']=errs[:5];b.close()
print(json.dumps(R,ensure_ascii=False))
