# V96 · nhạc nền soạn bằng code + REVIEW96: máu boss sớm, giảm sát thương ải 1–15, âm thanh/rung khoảnh khắc lớn
import sys,json
from playwright.sync_api import sync_playwright
f=sys.argv[1];O=sys.argv[2]+'/';OK=[]
def chk(n,c):OK.append(('✓' if c else '✗')+' '+n)
SEED="if(!sessionStorage.getItem('t96')){sessionStorage.setItem('t96','1');const h=JSON.parse(localStorage.getItem('saobang-hangar-v1')||'{}');h.cleared=Array.from({length:25},(_,i)=>i+1);localStorage.setItem('saobang-hangar-v1',JSON.stringify(h));}"
GO="""(st)=>{mode='menu';try{Lobby.show()}catch{};Progress.setLocked(false);try{V75.addEn(99)}catch{};document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value=String(st);Lobby.hide();reset();if(mode==='pause')mode='play';
 if(!window.__iv96)window.__iv96=setInterval(()=>{try{const d=document.getElementById('st80');if(d)d.hidden=true;window.__st80=0;if(window.__inv)invuln=999;}catch{}},150);return {mode,level}}"""
WB="""async()=>{for(let k=0;k<160;k++){if(boss&&boss.bossHealthReady&&boss.__v96&&boss.y>40)return true;try{for(const e of enemies)if(!e.boss&&!e.bossPart)e.dead=true;}catch{};await new Promise(r=>setTimeout(r,200));}return false}"""
TOT="()=>Math.round((boss.max||0)+(boss.coreMax||0)+(boss.parts||[]).reduce((a,p)=>a+(p.max||0),0))"
with sync_playwright() as p:
  b=p.chromium.launch(args=['--autoplay-policy=no-user-gesture-required']);pg=b.new_page(viewport={'width':393,'height':852});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
  pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(2000);pg.add_init_script(SEED);pg.goto('file://'+f+'?nopop');pg.wait_for_function("()=>typeof V96==='object'&&typeof Music96==='object'",timeout=90000);pg.wait_for_timeout(3000)
  pg.evaluate("()=>{document.getElementById('tutorial392')?.remove();document.querySelectorAll('.m63').forEach(e=>e.hidden=true)}")
  pg.mouse.click(200,400);pg.wait_for_timeout(1500)
  s=pg.evaluate("()=>({m:Music96.state(),btn:document.getElementById('music393').getAttribute('aria-pressed')})")
  chk('Lần đầu: nhạc tự bật, đang phát bài SẢNH (%s)'%s,s['btn']=='true' and s['m']['cur']=='lobby' and s['m']['ctx']=='running')
  pg.evaluate("()=>{Gfx66.open()}");pg.wait_for_timeout(800)
  chk('Cài đặt: có thanh âm lượng nhạc',pg.evaluate("()=>!!document.querySelector('.mv96 input[type=range]')"));pg.screenshot(path=O+'settings.png')
  pg.evaluate("()=>{document.querySelectorAll('.m63,.st66').forEach(e=>e.hidden=true);window.__inv=1}")
  # ải 3: giảm sát thương nhận
  pg.evaluate(GO,3);pg.wait_for_timeout(1500)
  m=pg.evaluate("()=>Music96.state().cur");chk('Vào trận: chuyển bài TRẬN (%s)'%m,m=='battle')
  d=pg.evaluate("async()=>{window.__inv=0;invuln=0;hp=maxHp;await new Promise(r=>setTimeout(r,200));const h0=hp;hp-=1;await new Promise(r=>setTimeout(r,300));return {lost:h0-hp}}")
  chk('Ải 3: mất máu ×0,85 (%s)'%d,abs(d['lost']-0.85)<1e-6)
  pg.evaluate("()=>{window.__inv=1}")
  # mini boss 5, boss 20: máu
  res={}
  for st in [5,20]:
    pg.evaluate(GO,st);ok=pg.evaluate(WB);res[st]=pg.evaluate(TOT) if ok else None
  pg.evaluate("()=>{window.V96=false}")
  for st in [5,20]:
    pg.evaluate(GO,st);ok=pg.evaluate(WB.replace("boss.__v96&&",""));pg.wait_for_timeout(300);res['o%d'%st]=pg.evaluate(TOT) if ok else None
  pg.evaluate("()=>{window.V96=true}")
  chk('Máu mini boss 5 = 32,5%% (REVIEW114) (%s / %s)'%(res[5],res['o5']),res[5] and res['o5'] and abs(res[5]/res['o5']-0.325)<0.02)
  chk('Máu boss 20 = 114,75%% (REVIEW114) gồm cánh (%s / %s)'%(res[20],res['o20']),res[20] and res['o20'] and abs(res[20]/res['o20']-1.1475)<0.03)
  # khoảnh khắc lớn: phá cánh, Bạo Tẩu, hạ boss
  pg.evaluate(GO,20);pg.evaluate(WB);pg.wait_for_timeout(400)
  m=pg.evaluate("()=>Music96.state().cur");chk('Boss xuất hiện: chuyển bài BOSS (%s)'%m,m=='boss')
  pg.evaluate("async()=>{boss.parts[0].hp=0;boss.parts[0].dead=true;await new Promise(r=>setTimeout(r,400));superTime=6;await new Promise(r=>setTimeout(r,400));for(const q of boss.parts){q.hp=0;q.dead=true;}await new Promise(r=>setTimeout(r,1300));boss.hp=0;boss.dead=true;await new Promise(r=>setTimeout(r,600));}")
  n=pg.evaluate("()=>V96.state().n");chk('Âm thanh/rung: phá 1 cánh, phá cả 2, Bạo Tẩu, hạ boss (%s)'%n,all(n.get(k,0)>=1 for k in ['wing','wings','od','win']) and n.get('win',0)==1)
  chk('không lỗi JS'+(' · '+errs[0][:200] if errs else ''),not errs)
  b.close()
print('\n'.join(OK))
