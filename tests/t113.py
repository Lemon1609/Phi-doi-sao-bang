# V113 · REVIEW113: lực chiến trong trận = sảnh · trần đạn boss · bỏ ô trang trí mép · HUD biểu tượng · bản đồ /10 · vật phẩm mới
import sys
from playwright.sync_api import sync_playwright
f=sys.argv[1];O=sys.argv[2]+'/';OK=[]
def chk(n,c):OK.append(('✓' if c else '✗')+' '+n)
with sync_playwright() as p:
  b=p.chromium.launch();pg=b.new_page(viewport={'width':393,'height':852},device_scale_factor=2);pg.on('dialog',lambda d:d.accept());errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
  pg.goto('file://'+f+'?nopop');pg.wait_for_function("()=>typeof Thu100==='object'",timeout=120000);pg.wait_for_timeout(3000)
  pg.evaluate("(a)=>Thu100.start(a)",160);pg.wait_for_timeout(8000)
  for k in range(60):
    pg.wait_for_timeout(3000)
    try:
      if pg.evaluate("()=>sessionStorage.getItem('thu100-step')===null&&typeof Combat==='object'"):break
    except Exception:pass
  pg.wait_for_timeout(3000)
  pg.evaluate("()=>{document.querySelectorAll('.m63').forEach(e=>e.hidden=true);ChapterMap.open()}");pg.wait_for_timeout(1500)
  m=pg.evaluate("()=>({t:document.getElementById('cm-small').textContent,h:(document.getElementById('cm-lock113')||{}).textContent||''})")
  chk('Bản đồ: tiêu đề /10 + điều kiện mở Chương 9 (%s · %s)'%(m['t'],m['h'][:70]),'/ 10' in m['t'] and 'Chương 9' in m['h'])
  pg.screenshot(path=O+'map.png');pg.evaluate("()=>ChapterMap.close()")
  pk=pg.evaluate("()=>Object.fromEntries(['power','heal','shield','drone','super','bomb'].map(k=>[k,(PICKUP51_ASSETS[k]||{}).base?.length||0]))");chk('Tranh vật phẩm mới đã nhúng (%s)'%pk,all(v>1000 for v in pk.values()))
  GO="""(st)=>{document.querySelectorAll('.m63').forEach(e=>e.hidden=true);mode='menu';try{Lobby.show()}catch{};Progress.setLocked(false);try{V75.addEn(60)}catch{};document.getElementById('gamemode').value='campaign';try{syncModeSetup()}catch{};document.getElementById('mission-select').value=String(st);Lobby.hide();reset();if(mode==='pause')mode='play';
    if(!window.__iv)window.__iv=setInterval(()=>{try{invuln=999;hp=maxHp;const d=document.getElementById('st80');if(d)d.hidden=true;window.__st80=0;if(mode==='pause')mode='play';}catch{}},120)}"""
  pg.evaluate(GO,160);pg.wait_for_timeout(2500)
  c=pg.evaluate("()=>({fl:Combat.flight().cp,st:Math.round(Combat.stats().cp),fa:Combat.factor(),cpHidden:document.querySelector('.t7-cp').hidden,gz:!!document.querySelector('.t7-gz .gz113')})")
  chk('Lực chiến trong trận = sảnh (%s), không còn bị trừ ST'%c,abs(c['fl']-c['st'])<=2 and c['fa']>=.999 and c['cpHidden'])
  chk('HUD: biểu tượng Sượt đạn thay chữ GRAZE',c['gz'])
  dec=pg.evaluate("()=>{let n=0;const o=CanvasRenderingContext2D.prototype.fillRect;const g=document.getElementById('game').getContext('2d');CanvasRenderingContext2D.prototype.fillRect=function(x,y,w,h){if(this===g&&w===45&&h===90)n++;return o.apply(this,arguments)};return new Promise(r=>setTimeout(()=>{CanvasRenderingContext2D.prototype.fillRect=o;r(n)},1500))}")
  chk('Không còn ô chữ nhật trang trí ở mép (%d lần vẽ)'%dec,dec==0)
  try:pg.wait_for_function("()=>{try{return !!boss&&boss.y>80}catch{return false}}",timeout=200000,polling=200)
  except Exception:pass
  pg.evaluate("()=>{setInterval(()=>{try{if(boss){player.x=boss.x;player.y=Math.min(H-150,boss.y+420)}}catch{}},60)}")
  pg.wait_for_timeout(25000)
  s=pg.evaluate("()=>V113.state()");chk('Trận boss 160: trần đạn hoạt động (cao nhất %d viên, nén %d loạt, hoãn %d viên, trần %s)'%(s['maxSeen'],s['comp'],s['held'],s['rule']),s['rule'] and s['maxSeen']<=s['rule'][1]+12 and (s['comp']>0 or s['maxSeen']<s['rule'][0]))
  pg.screenshot(path=O+'boss.png')
  chk('không lỗi JS'+(' · '+errs[0][:200] if errs else ''),not errs)
  b.close()
print('\n'.join(OK))
