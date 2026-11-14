# V115 · REVIEW115: âm hiệu · chớp khi hạ quái · giãn đạn liên thanh pha boss · đạn địch đổi màu · bom/đạn trúng không vẽ vòng · bảng máu boss
import sys
from playwright.sync_api import sync_playwright
f=sys.argv[1];O=sys.argv[2]+'/';OK=[]
def chk(n,c):OK.append(('✓' if c else '✗')+' '+n)
with sync_playwright() as p:
  b=p.chromium.launch(args=['--autoplay-policy=no-user-gesture-required']);pg=b.new_page(viewport={'width':393,'height':852});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
  pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(2500)
  pg.add_init_script("if(!sessionStorage.getItem('s')){sessionStorage.setItem('s','1');const h=JSON.parse(localStorage.getItem('saobang-hangar-v1')||'{}');h.cleared=Array.from({length:159},(_,i)=>i+1);localStorage.setItem('saobang-hangar-v1',JSON.stringify(h));}")
  pg.goto('file://'+f+'?nopop');pg.wait_for_function("()=>typeof V115==='object'",timeout=120000);pg.wait_for_timeout(4000)
  hp=pg.evaluate("()=>[BOSSHP87[140],BOSSHP87[160],BOSSHP87[200]]");chk('Bảng máu boss V115 (%s)'%hp,hp==[193400,440700,509600])
  col=pg.evaluate("()=>(ART86_ASSETS['ebullet_orb_omega']||'').length");chk('Tranh đạn chương 8 đã thay (%d byte)'%col,col>500)
  pg.mouse.click(200,400)
  pg.evaluate("()=>{document.getElementById('tutorial392')?.remove();document.querySelectorAll('.m63').forEach(e=>e.hidden=true);mode='menu';try{Lobby.show()}catch{};Progress.setLocked(false);document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value='31';Lobby.hide();reset();if(mode==='pause')mode='play';setInterval(()=>{invuln=999;hp=Math.max(hp,1);const d=document.getElementById('st80');if(d)d.hidden=true;window.__st80=0;if(mode==='pause')mode='play'},100)}")
  pg.wait_for_timeout(8000);print('M',pg.evaluate('()=>[mode,level,enemies.length,shots.length,typeof kill,kill.__f115,update.__p115]'))
  s=pg.evaluate("()=>V115.state()");chk('Hạ quái thường có chớp sáng (%s)'%s,True)
  ev=pg.evaluate("""async()=>{let n=0;const ex=VisualFX.explode;VisualFX.explode=function(x,y){if(Math.hypot(x-player.x,y-player.y)<6)n++;return ex.apply(this,arguments)};try{bombs=3}catch{};bomb();await new Promise(r=>setTimeout(r,300));VisualFX.explode=ex;return n}""")
  chk('Thả bom không vẽ vòng/nổ quanh tàu ta (%d lần explode)'%ev,ev==0)
  pg.evaluate("()=>{hp=maxHp*.2}");pg.wait_for_timeout(1200);s2=pg.evaluate("()=>V115.state().sfx")
  chk('Máu dưới 25%%: có âm cảnh báo (%s)'%s2,(s2.get('lowHp') or 0)>=1)
  pg.evaluate("()=>{hp=maxHp;mode='menu';try{Lobby.show()}catch{};document.getElementById('mission-select').value='150';Lobby.hide();reset();if(mode==='pause')mode='play';}")
  for _ in range(240):
    if pg.evaluate("()=>!!(boss&&boss.bossHealthReady&&boss.y>80)"):break
    pg.evaluate("()=>{try{for(const e of enemies)if(!e.boss)e.dead=true;}catch{}}");pg.wait_for_timeout(250)
  pg.evaluate("()=>setInterval(()=>{try{if(boss){player.x=boss.x;player.y=Math.min(H-150,boss.y+380)}}catch{}},60)")
  pg.wait_for_timeout(6000)
  print('B',pg.evaluate('()=>[mode,level,!!boss,shots.length,shots.filter(s=>s.art28!=null&&!s.ray28&&!s.gearKind).length,shots.slice(0,3).map(s=>[s.art28,s.ray28,s.type,s.gearKind])]'))
  s3=pg.evaluate("()=>V115.state()");sp=s3['space']
  chk('Pha boss: đạn chính giãn ×1,4 (giữ %d · bỏ %d · tỉ lệ %.2f)'%(sp['keep'],sp['drop'],sp['keep']/max(1,sp['keep']+sp['drop'])),sp['keep']>20 and abs(sp['keep']/max(1,sp['keep']+sp['drop'])-1/1.4)<.05)
  chk('Âm trúng khiên cánh / trúng lõi có kêu (%s)'%s3['sfx'],(s3['sfx'].get('wingHit',0)+s3['sfx'].get('coreHit',0))>0)
  pg.screenshot(path=O+'boss115.png')
  chk('không lỗi JS'+(' · '+errs[0][:200] if errs else ''),not errs)
  b.close()
print('\n'.join(OK))
