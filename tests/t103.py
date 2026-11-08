# V103 · vật phẩm lễ hội rơi thật (bay ra, hút về tàu, tia sáng), token cộng ngay khi hạ quái
import sys
from playwright.sync_api import sync_playwright
f=sys.argv[1];O=sys.argv[2]+'/';OK=[]
def chk(n,c):OK.append(('✓' if c else '✗')+' '+n)
with sync_playwright() as p:
  b=p.chromium.launch();pg=b.new_page(viewport={'width':393,'height':852});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
  pg.goto('file://'+f+'?nopop');pg.wait_for_function("()=>typeof Fest78==='object'",timeout=120000);pg.wait_for_timeout(3000)
  act=pg.evaluate("()=>(Fest78.active()||{}).id||null");chk('Lễ hội đang chạy: %s'%act,act is not None)
  pg.evaluate("()=>{document.getElementById('tutorial392')?.remove();document.querySelectorAll('.m63').forEach(e=>e.hidden=true);mode='menu';try{Lobby.show()}catch{};Progress.setLocked(false);document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value='1';Lobby.hide();reset();if(mode==='pause')mode='play';setInterval(()=>{invuln=999;const d=document.getElementById('st80');if(d)d.hidden=true;window.__st80=0;if(mode==='pause')mode='play'},100)}")
  pg.wait_for_timeout(2500);chk('Đang trong trận (%s)'%pg.evaluate('()=>mode'),pg.evaluate('()=>mode')=='play')
  r=pg.evaluate("""()=>{const k=Object.keys(Fest78.state().tok||{});Fest78._set({day:{d:'',n:0}});const s0=JSON.stringify(Fest78.state().tok);const R=Math.random;Math.random=()=>0;
    for(let i=0;i<6;i++)Fest78._kill({x:80+i*45,y:420,elite:1});Math.random=R;return {n:Fest78.drops(),s0,s1:JSON.stringify(Fest78.state().tok)}}""")
  chk('Hạ 6 quái: 6 vật phẩm bay ra (%d), token đã cộng ngay (%s → %s)'%(r['n'],r['s0'],r['s1']),r['n']==6 and r['s0']!=r['s1'])
  pg.wait_for_timeout(250);pg.screenshot(path=O+'fest_drop.png')
  pg.wait_for_timeout(2500);print(pg.evaluate('()=>[Fest78._dbg(),mode,time]'));n=pg.evaluate("()=>Fest78.drops()");chk('Sau 2,7 s vật phẩm đã bay về tàu (còn %d)'%n,n==0)
  pg.evaluate("()=>Fps88._set({on:true,log:[]})");pg.wait_for_timeout(5000);pg.evaluate("()=>{mode='menu'}");pg.wait_for_timeout(500)
  lg=pg.evaluate("()=>Fps88.state().log[0]||null");chk('Đo FPS ghi giây tệ nhất + số lần giật (%s)'%lg,lg and lg.get('w') and 'hitch' in lg)
  chk('không lỗi JS'+(' · '+errs[0][:200] if errs else ''),not errs)
  b.close()
print('\n'.join(OK))
