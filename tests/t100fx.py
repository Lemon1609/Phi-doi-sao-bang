# V100 · chủ dự án: bỏ hiệu ứng nổ khi hạ quái thường, giữ cho boss / mini boss · bản thử mốc 200 mở Nguyệt Thực
import sys,os
from playwright.sync_api import sync_playwright
f=sys.argv[1];OK=[];fthu=os.path.join(os.path.dirname(f),'Phi_Doi_Sao_Bang_THU.html')
def chk(n,c):OK.append(('✓' if c else '✗')+' '+n)
SEED="if(!sessionStorage.getItem('fx')){sessionStorage.setItem('fx','1');const h=JSON.parse(localStorage.getItem('saobang-hangar-v1')||'{}');h.cleared=Array.from({length:30},(_,i)=>i+1);localStorage.setItem('saobang-hangar-v1',JSON.stringify(h));}"
with sync_playwright() as p:
  b=p.chromium.launch();errs=[];pg=b.new_page(viewport={'width':393,'height':852});pg.on('pageerror',lambda e:errs.append(str(e)));pg.on('dialog',lambda d:d.accept())
  pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(2000);pg.add_init_script(SEED);pg.goto('file://'+f+'?nopop');pg.wait_for_function("()=>typeof V100==='object'",timeout=90000);pg.wait_for_timeout(3000)
  pg.evaluate("()=>{document.getElementById('tutorial392')?.remove();document.querySelectorAll('.m63').forEach(e=>e.hidden=true);mode='menu';try{Lobby.show()}catch{};Progress.setLocked(false);try{V75.addEn(99)}catch{};document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value='25';Lobby.hide();reset();if(mode==='pause')mode='play';setInterval(()=>{try{invuln=999;const d=document.getElementById('st80');if(d)d.hidden=true;window.__st80=0;}catch{}},150)}")
  pg.wait_for_timeout(2500)
  r=pg.evaluate("""async()=>{const C={e:0,b:0};const o=VisualFX.explode;VisualFX.explode=function(x,y,s,k){if(k==='boss')C.b++;else C.e++;return o.apply(this,arguments)};const s0=JSON.stringify(FX16Run.state());
     let n=0;for(const e of enemies.slice()){if(!e.dead&&!e.bossPart&&e!==boss){kill(e);n++;}}for(let i=0;i<6;i++){addEnemy({type:'scout',x:60+i*50,y:200,vx:0,v:0,hp:5,maxHp:5,r:18,elite:i<2,age:0});kill(enemies[enemies.length-1]);n++;}
     await new Promise(r=>setTimeout(r,300));return {n,C,fx0:s0,fx1:JSON.stringify(FX16Run.state())}}""")
  chk('Hạ %d quái thường + tinh anh: 0 vụ nổ (%s)'%(r['n'],r['C']),r['n']>=6 and r['C']['e']==0)
  print(r['fx0'][:200]);print(r['fx1'][:200])
  b2=pg.evaluate("""async()=>{for(let k=0;k<150;k++){if(boss&&boss.bossHealthReady&&boss.y>40)break;try{for(const e of enemies)if(!e.boss&&!e.bossPart)e.dead=true;}catch{};await new Promise(r=>setTimeout(r,200));}
     if(!boss)return {boss:false};const s0=JSON.stringify(FX16Run.state());for(const q of (boss.parts||[])){q.hp=0;}boss.hp=1;try{damageBoss(99999,'bomb',boss)}catch{};await new Promise(r=>setTimeout(r,2500));return {boss:true,s0,s1:JSON.stringify(FX16Run.state()),lv:level}}""")
  print(b2)
  pg.close()
  pg=b.new_page(viewport={'width':393,'height':852});pg.on('pageerror',lambda e:errs.append(str(e)));pg.on('dialog',lambda d:d.accept())
  pg.goto('file://'+fthu+'?nopop');pg.wait_for_function("()=>typeof Thu100==='object'",timeout=90000);pg.wait_for_timeout(5000);pg.evaluate("()=>Thu100.start(200)")
  for k in range(40):
    pg.wait_for_timeout(3000)
    try:
      if pg.evaluate("()=>sessionStorage.getItem('thu100-step')===null&&typeof Combat==='object'"):break
    except Exception: pass
  pg.wait_for_timeout(3000)
  d=pg.evaluate("()=>({cp:Math.round(Combat.stats().cp),cl:Progress.getState().cleared.length,un:Eclipse67.unlocked(),max:Eclipse67.maxCh(),c161:Eclipse67.canStart(161),sss:SSS87.active&&SSS87.state().done})")
  chk('Bản thử mốc 200: lực chiến %s, đã qua %s ải, Nguyệt Thực mở=%s, E161=%s'%(d['cp'],d['cl'],d['un'],d['c161']),d['cl']==200 and d['cp']>12000)
  print(d)
  chk('không lỗi JS'+(' · '+errs[0][:200] if errs else ''),not errs)
  b.close()
print('\n'.join(OK))
