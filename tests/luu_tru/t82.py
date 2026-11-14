# V82 · bỏ phôi → bản sao
import sys,json
from playwright.sync_api import sync_playwright
f=sys.argv[1];R={};O='/tmp/claude-0/-home-claude/5e17076b-711a-5cdd-a148-8fee187c2778/scratchpad/'
SEED="""if(!sessionStorage.getItem('t82')){sessionStorage.setItem('t82','1');const h=JSON.parse(localStorage.getItem('saobang-hangar-v1')||'{}');h.cleared=Array.from({length:60},(_,i)=>i+1);localStorage.setItem('saobang-hangar-v1',JSON.stringify(h));
 const t=JSON.parse(localStorage.getItem('saobang-tier70-v1')||'{}');t.ph=Object.assign(t.ph||{},{'c0:0':3,'g:aegis:2':2,'c0:3':1});localStorage.setItem('saobang-tier70-v1',JSON.stringify(t));localStorage.removeItem('saobang-evo82');}"""
with sync_playwright() as p:
  b=p.chromium.launch();pg=b.new_page(viewport={'width':393,'height':852});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
  pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(3000);pg.evaluate("()=>localStorage.removeItem('saobang-evo82')")
  pg.add_init_script(SEED);pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(5000)
  R['mig']=pg.evaluate("()=>({st:Evo82.state(),list:Evo82.list().map(c=>[c.k,c.m,c.t]),ph:V70.phList()})")
  R['ph2copy']=pg.evaluate("()=>{const n0=Evo82.list().length;V70.phAdd('gear','inferno',1,2);return [Evo82.list().length-n0,Evo82.list().slice(-1)[0].t,V70.phList()['g:inferno:1']||0]}")
  # đột phá chiến cơ 0: Trắng → Lục
  R['brk']=pg.evaluate("""()=>{Progress.grantCredits(500000);Workshop.exp70(5000);for(const t of MAT69.types)V70.add(t.id+'1',2);
    let o=Workshop.craftProgress(0);const out={lv0:o.level,t0:V70.craftN(0)};
    try{Workshop.set70(0,{level:25});}catch(e){out.e=''+e}out.lv1=Workshop.craftProgress(0).level;
    const c=Evo82.addCopy('craft',1,0,1);out.plan0=Evo82.plan('craft',0).lacks;Evo82.levelCopy(c.u,15);out.cLv=Evo82.list().find(x=>x.u===c.u).lv;
    const p=Evo82.plan('craft',0);out.plan1=p.lacks;out.rf=p.rf;out.ok=Evo82.doBreak('craft',0);out.t1=V70.craftN(0);out.gone=!Evo82.list().some(x=>x.u===c.u);return out}""")
  # bản sao tự đột phá
  R['cbrk']=pg.evaluate("""()=>{const a=Evo82.addCopy('gear','aegis',0,1),b2=Evo82.addCopy('gear','mirror',0,1);Evo82.levelCopy(a.u,25);Evo82.levelCopy(b2.u,15);const ok=Evo82.doBreak('copy',a.u);return {ok,t:Evo82.list().find(x=>x.u===a.u).t}}""")
  # S wildcard: món S thiếu bản sao → 2 món cùng loại
  R['wild']=pg.evaluate("""()=>{const p=Evo82.plan('copy',Evo82.addCopy('craft',5,2,45).u);return {same:p.needSame,any:p.needAny,wild:p.wild}}""")
  # rương: tỉ lệ nhóm hiếm
  R['chest']=pg.evaluate("""()=>{EL81.left=()=>99;EL81.use=()=>{};const g={'':0,S:0,SS:0},un=[0];let mats=0;for(let i=0;i<20000;i++){const r=Chest74V70({grade:'B',type:'gear'});for(const x of r.got||[]){g[x.rare||'']++;if(x.unlock)un[0]++;}}return {g,unlock:un[0],n:Evo82.state().n}}""")
  pg.evaluate("()=>{document.getElementById('tutorial392')?.remove();Workshop.set70(1,{level:35});Evo82.open('craft',0)}");pg.wait_for_timeout(500);pg.screenshot(path=O+'t82_brk.png')
  pg.evaluate("()=>Evo82.inv('craft')");pg.wait_for_timeout(400);pg.screenshot(path=O+'t82_inv.png')
  R['errs']=errs[:5];b.close()
print(json.dumps(R,ensure_ascii=False))
