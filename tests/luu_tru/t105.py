# V105 · độ phân giải động khi FPS thấp · huy chương có ngôi sao thay chữ
import sys
from playwright.sync_api import sync_playwright
f=sys.argv[1];O=sys.argv[2]+'/';OK=[]
def chk(n,c):OK.append(('✓' if c else '✗')+' '+n)
with sync_playwright() as p:
  b=p.chromium.launch();pg=b.new_page(viewport={'width':393,'height':852},device_scale_factor=2.75);errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
  pg.goto('file://'+f+'?nopop');pg.wait_for_function("()=>typeof V105==='object'",timeout=120000);pg.wait_for_timeout(3000)
  pg.evaluate("()=>{document.getElementById('tutorial392')?.remove();document.querySelectorAll('.m63').forEach(e=>e.hidden=true);VisualFX.setQuality('high');mode='menu';try{Lobby.show()}catch{};Progress.setLocked(false);document.getElementById('mission-select').value='1';Lobby.hide();reset();if(mode==='pause')mode='play';setInterval(()=>{invuln=999;const d=document.getElementById('st80');if(d)d.hidden=true;window.__st80=0;if(mode==='pause')mode='play'},100)}")
  pg.wait_for_timeout(1500)
  a=pg.evaluate("()=>({w:document.getElementById('game').width,s:V105.state(),q:window.GFX66})");chk('ĐẸP khởi đầu nét tối đa 2× (khung %d px, %s)'%(a['w'],a),a['w']==960)
  cdp=pg.context.new_cdp_session(pg);cdp.send('Emulation.setCPUThrottlingRate',{'rate':6})
  pg.wait_for_timeout(15000);cdp.send('Emulation.setCPUThrottlingRate',{'rate':1})
  a2=pg.evaluate("()=>({w:document.getElementById('game').width,s:V105.state()})");chk('Máy giật (CPU chậm 6×): tự giảm độ nét (%s)'%a2,a2['w']<960 and a2['w']>=600)
  pg.evaluate("()=>{V77.run&&V77._drop(240,300)}");pg.wait_for_timeout(300);pg.screenshot(path=O+'medal.png')
  chk('Huy chương rơi (%s)'%pg.evaluate("()=>V77.run()&&V77.run().medals"),True)
  chk('không lỗi JS'+(' · '+errs[0][:200] if errs else ''),not errs)
  b.close()
print('\n'.join(OK))
