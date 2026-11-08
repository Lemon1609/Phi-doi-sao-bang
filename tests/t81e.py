# V81 · luật Vô tận mới
import sys,json
from playwright.sync_api import sync_playwright
f=sys.argv[1];R={};O='/tmp/claude-0/-home-claude/5e17076b-711a-5cdd-a148-8fee187c2778/scratchpad/'
SEED="""if(!sessionStorage.getItem('t81e')){sessionStorage.setItem('t81e','1');const h=JSON.parse(localStorage.getItem('saobang-hangar-v1')||'{}');h.cleared=Array.from({length:60},(_,i)=>i+1);localStorage.setItem('saobang-hangar-v1',JSON.stringify(h));}"""
with sync_playwright() as p:
  b=p.chromium.launch();pg=b.new_page(viewport={'width':393,'height':852});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
  pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(3500);pg.add_init_script(SEED);pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(4500)
  pg.evaluate("()=>{document.getElementById('tutorial392')?.remove();document.getElementById('gamemode').value='endless';Lobby.hide();reset()}");pg.wait_for_timeout(2500)
  R['start']=pg.evaluate("()=>({mode,gm:gameMode,lv:level})")
  R['run']=pg.evaluate("""()=>{const W=Workshop.getState(),e0=W.exp|0,a0=W.aux|0,m0=JSON.stringify(JSON.parse(localStorage.getItem('saobang-adv69-v1')||'{}').m||{});
   const pp0=JSON.stringify(Pilot67.state().pieces);const out={};
   // giả lập 20 đợt qua
   for(let k=0;k<20;k++){drops.push({type:'power',x:200,y:300,vy:0,dead:false});bullets.push({x:100,y:100,vx:0,vy:10,r:4,dead:false});const nb=bullets.length,nd=drops.length;invuln=0;stageFinished36=false;finishStage36(!!Campaign36.bossKind(level));if(k===0){out.keepBul=bullets.length>=nb-1;out.keepDrop=drops.length>=1;out.inv=invuln;out.rest=endlessRest;}}
   const W1=Workshop.getState();out.dExp=(W1.exp|0)-e0;out.dAux=(W1.aux|0)-a0;out.mSame=JSON.stringify(JSON.parse(localStorage.getItem('saobang-adv69-v1')||'{}').m||{})===m0;
   out.pp=EL81.state();out.lv=level;out.mode=mode;return out}""")
  # rương: 40 lượt → tối đa 30 món
  R['chest']=pg.evaluate("""()=>{const own0=Campaign36.getState().crafts.length+Campaign36.getState().models.length;let unlock=0,ph=0,mats=0;const ex0=Workshop.getState().exp|0;
   for(let i=0;i<40;i++){const r=Chest74V70({grade:i%3?'B':'A',type:i%2?'gear':'craft'});for(const g of (r.got||[])){if(g.unlock)unlock++;else ph++;}mats+=(r.mats||[]).length;}
   return {unlock,ph,total:unlock+ph,mats,day:EL81.state(),newOwn:Campaign36.getState().crafts.length+Campaign36.getState().models.length-own0}}""")
  R['rates']=pg.evaluate("()=>{let s=0,ss=0;const N=3000;for(let i=0;i<N;i++){try{Dungeons.recordPity&&0}catch{};const r=Campaign36.loot('equipment',4);if(r&&r.rank==='S')s++;if(r&&r.rank==='SS')ss++;}return {s,ss,N}}")
  R['errs']=errs[:5];b.close()
print(json.dumps(R,ensure_ascii=False))
