# V87 · Chương 10 (ải 181–200): mở khóa, ải thường có quái/đạn/nền mới, boss 200 có tranh + 2 cánh + đổi pha, thưởng lần đầu
import sys,json
from playwright.sync_api import sync_playwright
f=sys.argv[1];O=sys.argv[2]+'/';R={};OK=[]
def chk(n,c):OK.append(('✓' if c else '✗')+' '+n)
SEED="if(!sessionStorage.getItem('c10')){sessionStorage.setItem('c10','1');const h=JSON.parse(localStorage.getItem('saobang-hangar-v1')||'{}');h.cleared=Array.from({length:180},(_,i)=>i+1);localStorage.setItem('saobang-hangar-v1',JSON.stringify(h));}"
GO="""(st)=>{mode='menu';try{Lobby.show()}catch{};Progress.setLocked(false);try{V75.addEn(99)}catch{};document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value=String(st);Lobby.hide();reset();if(mode==='pause'){try{resume()}catch{}if(mode==='pause')mode='play';}
 if(!window.__iv)window.__iv=setInterval(()=>{try{invuln=999;hp=maxHp;const d=document.getElementById('st80');if(d)d.hidden=true;window.__st80=0;}catch{}},150);return {mode,level}}"""
with sync_playwright() as p:
  b=p.chromium.launch();pg=b.new_page(viewport={'width':393,'height':852});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
  pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(2000);pg.add_init_script(SEED);pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(6000)
  pg.evaluate("()=>{document.getElementById('tutorial392')?.remove();window.RULE84=false;window.TITLE84=false;for(let i=0;i<13;i++)try{Campaign36.acquire('craft',i,'','story')}catch{};document.querySelectorAll('.m63,.adv70,.st71').forEach(e=>e.hidden=true)}")
  R['open']=pg.evaluate("()=>({open:Ch10.open(),c181:Progress.canStart(181),c182:Progress.canStart(182),miss:MISSIONS.length,chap:Campaign36.chapter(190),req:[Meta40.reqCP(181),Meta40.reqCP(200)],opt:!!document.querySelector('#mission-select option[value=\"181\"]')})")
  d=R['open'];chk('Vượt ải 180 → mở Chương 10, chọn được ải 181 (182 còn khóa)',d['open'] and d['c181'] and not d['c182'] and d['miss']>=200)
  chk('Lực chiến đề nghị 181 = 12.900 · 200 = 14.800 (REVIEW92)',d['req']==[12900,14800])
  # ải thường
  pg.evaluate("()=>{const h=Progress.getState();}");st=pg.evaluate(GO,181)
  pg.wait_for_timeout(9000);pg.screenshot(path=O+'c10_ai181.png')
  R['stage']=pg.evaluate("()=>({lv:level,mode,ab:Ch10.state().ab,bul:[...new Set(bullets.map(b=>b.__e86).filter(Boolean))],bg:!!Ch10.bgFor(level)})")
  s=R['stage'];chk('Ải 181 chạy, có nền Chương 10',s['lv']==181 and s['bg'])
  chk('Đạn địch dùng bộ abyss',any('abyss' in k for k in s['bul']))
  # ép thêm quái chương 10 để chụp
  pg.evaluate("()=>{Ch10.summon(2);const R0=Math.random;Math.random=()=>.01;const e=addEnemy({x:240,y:200,v:20,type:2,large:true,elite:false,guard:0,hp:500,fire:1e9,age:0,phase:0,dead:false});Math.random=R0;}");pg.wait_for_timeout(2500)
  R['ab']=pg.evaluate("()=>Ch10.state().ab");pg.screenshot(path=O+'c10_quai.png')
  chk('Có Kẻ Săn Tinh Vân và Pháo Đài Hư Không',('stalker' in R['ab']) and ('fortress' in R['ab']))
  # boss 200
  pg.evaluate("()=>{const h=JSON.parse(localStorage.getItem('saobang-hangar-v1'));}");
  pg.evaluate("()=>{try{const g=Progress.getState();}catch{}}")
  pg.evaluate("()=>{mode='menu';const o=Progress.canStart;Progress.canStart=n=>n>=1&&n<=200;window.__oc=o}")
  R['go200']=pg.evaluate(GO,200);print('go200',R['go200'],R.get('open'),R.get('stage'),R.get('ab'),flush=True)
  for _ in range(200):
    if pg.evaluate("()=>!!(boss&&boss.bossHealthReady&&boss.y>80)"):break
    pg.evaluate("()=>{try{for(const e of enemies)if(!e.boss)e.dead=true;}catch{}}");pg.wait_for_timeout(250)
  print('wait',pg.evaluate("()=>({lv:level,mode,boss:!!boss,en:enemies.length,wave:(()=>{try{return Waves30.state()}catch{return null}})()})"),flush=True)
  pg.wait_for_timeout(2500);pg.screenshot(path=O+'c10_boss200_p1.png')
  R['boss']=pg.evaluate("()=>({lv:level,art:!!Boss82.META[200],k:B75.state()&&B75.state().kd,parts:(boss.parts||[]).map(p=>[Math.round(p.x-boss.x),Math.round(p.y-boss.y)]),tot:Math.round(boss.max+(boss.coreMax||0)+(boss.parts||[]).reduce((a,p)=>a+p.max,0))})")
  pg.evaluate("()=>{for(const p of boss.parts||[]){p.hp=0;p.dead=true;}window.__b75r=.2}");pg.wait_for_timeout(4000);pg.screenshot(path=O+'c10_boss200_p3.png')
  R['p3']=pg.evaluate("()=>({ph:B75.state().ph,sum:Ch10.state().sumT})")
  chk('Boss 200: tranh GPT, mẫu đạn CH10, 2 cánh',R['boss']['art'] and R['boss']['k']=='CH10' and len(R['boss']['parts'])==2)
  chk('Boss 200 vào pha 3 khi dưới 30%',R['p3']['ph']==2)
  # thưởng lần đầu
  R['rw']=pg.evaluate("""async()=>{mode='menu';try{Lobby.show()}catch{};const s=Drop85.state();delete s.done['200'];Drop85._set(s);const cr0=Progress.balance(),g0=Stone71.haveT(3);
    const orig=Progress.getState;Progress.getState=()=>Object.assign({},orig(),{cleared:[...(orig().cleared||[]),200]});Drop85.tick();Progress.getState=orig;await new Promise(r=>setTimeout(r,1600));
    const bn=document.getElementById('dr87');return {done:Drop85.state().done['200'],dcr:Progress.balance()-cr0,dg:Stone71.haveT(3)-g0,txt:bn?bn.innerText:''}}""")
  pg.screenshot(path=O+'c10_thuong200.png')
  chk('Hạ boss 200 lần đầu: bản sao Tím bộ 10–12 + 35.000 ◈ + 2 đá Tím',R['rw']['done']=='copy' and R['rw']['dcr']==35000 and R['rw']['dg']==2)
  R['errs']=errs[:5];chk('không lỗi JS',not errs);b.close()
print(json.dumps(R,ensure_ascii=False)[:2500]);print('KẾT QUẢ '+' · '.join(OK))
