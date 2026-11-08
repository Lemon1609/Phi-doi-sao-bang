# V98 · REVIEW97: nhạc biến tấu + nhạc hiệu thắng/thua · sảnh cột trái · chấm đỏ · độ nhạy cảm ứng · thanh nguồn sát thương
import sys,json
from playwright.sync_api import sync_playwright
f=sys.argv[1];O=sys.argv[2]+'/';OK=[]
def chk(n,c):OK.append(('✓' if c else '✗')+' '+n)
SEED="if(!sessionStorage.getItem('t98')){sessionStorage.setItem('t98','1');const h=JSON.parse(localStorage.getItem('saobang-hangar-v1')||'{}');h.cleared=Array.from({length:70},(_,i)=>i+1);localStorage.setItem('saobang-hangar-v1',JSON.stringify(h));}"
GO="""(st)=>{mode='menu';try{Lobby.show()}catch{};Progress.setLocked(false);try{V75.addEn(99)}catch{};document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value=String(st);Lobby.hide();reset();if(mode==='pause')mode='play';
 if(!window.__iv98)window.__iv98=setInterval(()=>{try{const d=document.getElementById('st80');if(d)d.hidden=true;window.__st80=0;if(window.__inv)invuln=999;}catch{}},150);return {mode,level}}"""
with sync_playwright() as p:
  b=p.chromium.launch(args=['--autoplay-policy=no-user-gesture-required']);pg=b.new_page(viewport={'width':393,'height':852},has_touch=True);errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
  pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(2000);pg.add_init_script(SEED);pg.goto('file://'+f+'?nopop');pg.wait_for_function("()=>typeof V98==='object'",timeout=90000);pg.wait_for_timeout(3500)
  pg.evaluate("()=>{document.getElementById('tutorial392')?.remove();document.querySelectorAll('.m63').forEach(e=>e.hidden=true)}");pg.mouse.click(200,450);pg.wait_for_timeout(800)
  left=pg.evaluate("()=>[...document.querySelectorAll('.l74-b')].filter(e=>e.offsetParent).map(e=>e.textContent.trim())")
  chk('Sảnh ải 70: không còn ô GIAO DỊCH/CHỢ ĐEN ở cột trái (%s)'%left,not any('GIAO' in x or 'CHỢ ĐEN' in x for x in left) and any('VIỄN CHINH' in x for x in left))
  pg.screenshot(path=O+'lobby.png')
  dd=pg.evaluate("()=>({ships:Nav74.F.ships.dot(),armory:Nav74.F.armory.dot()})");chk('Chấm đỏ PHI ĐỘI/TRANG BỊ theo đồ đang dùng (%s)'%dd,isinstance(dd['ships'],bool))
  # độ nhạy cảm ứng
  pg.evaluate(GO,21);pg.wait_for_timeout(1500)
  def drag(kind):
    return pg.evaluate("""(k)=>{const c=document.querySelector('canvas');const r=c.getBoundingClientRect();player.x=W/2;const x0=r.x+r.width*.5,y0=r.y+r.height*.7;
      const ev=(t,x)=>c.dispatchEvent(new PointerEvent(t,{pointerId:7,pointerType:k,clientX:x,clientY:y0,bubbles:true,isPrimary:true}));ev('pointerdown',x0);ev('pointermove',x0+40);const tx=pointerTarget?pointerTarget.x-W/2:null;ev('pointerup',x0+40);return {tx,scale:W/r.width}}""",kind)
  m=drag('mouse');t=drag('touch')
  chk('Kéo bằng cảm ứng nhạy 1,2× so với chuột (%s / %s)'%(t['tx'],m['tx']),m['tx'] and t['tx'] and abs(t['tx']/m['tx']-1.2)<0.02)
  # nhạc biến tấu
  s=pg.evaluate("()=>Music96.state()");chk('Trận thường: bài TRẬN (%s)'%s['cur'],s['cur']=='battle')
  pg.evaluate("()=>{mode='menu';try{Lobby.show()}catch{};document.getElementById('gamemode').value='endless';try{syncModeSetup()}catch{};Lobby.hide();reset();if(mode==='pause')mode='play';window.__inv=1}");pg.wait_for_timeout(1500)
  pg.evaluate("()=>{time=400}");pg.wait_for_timeout(300);s=pg.evaluate("()=>Music96.state()");chk('Vô tận phút 6,7: bài VÔ TẬN 132 bpm (%s)'%s,s['cur']=='endless' and s['bpm']==132)
  pg.evaluate("()=>{time=2000}");pg.wait_for_timeout(300);s=pg.evaluate("()=>Music96.state()");chk('Vô tận trần 144 bpm (%s)'%s['bpm'],s['bpm']==144)
  pg.evaluate("()=>{document.getElementById('gamemode').value='campaign';try{syncModeSetup()}catch{}}")
  # thanh nguồn sát thương + nhạc hiệu thua
  pg.evaluate(GO,21);pg.wait_for_timeout(5000)
  pg.evaluate("()=>{window.__inv=0;invuln=0;hp=0;try{end(false)}catch(e){}}");pg.wait_for_timeout(1500)
  r=pg.evaluate("()=>({vis:!!(document.querySelector('.dps98')||{}).offsetParent,bar:(document.querySelector('.dps98')||{}).textContent||'',D:V98.state().D,m:Music96.state(),mode})")
  chk('Màn thua: thanh nguồn sát thương HIỆN RA (%s)'%r['bar'][:70],r['vis'] and 'Tổng ST' in r['bar'] and r['D']['main']>0)
  chk('Màn thua: phát nhạc hiệu Thua (%s)'%r['m'],r['m']['jl']>=1)
  pg.screenshot(path=O+'lose.png')
  errs=[e for e in errs if 'setPointerCapture' not in e];chk('không lỗi JS'+(' · '+errs[0][:200] if errs else ''),not errs)
  b.close()
print('\n'.join(OK))
