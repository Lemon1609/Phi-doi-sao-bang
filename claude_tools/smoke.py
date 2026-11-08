# Dùng: (cd <thư_mục_ra> && python3 -m http.server 8765 &) rồi python3 claude_tools/smoke.py — cần wrapped.html (xem wrap.py)
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
  b=p.chromium.launch();pg=b.new_page(viewport={'width':393,'height':852});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
  pg.goto('http://localhost:8765/wrapped.html');pg.wait_for_timeout(5000)
  pg.screenshot(path='/tmp/web_lobby.png')
  print(pg.evaluate("()=>({t:document.title,mode:typeof mode!=='undefined'&&mode,codes:typeof Codes78})"))
  pg.evaluate("()=>{document.getElementById('tutorial392')?.remove();document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value='1';Lobby.hide();reset()}");pg.wait_for_timeout(3000)
  pg.screenshot(path='/tmp/web_play.png')
  print(pg.evaluate("()=>({mode,en:enemies.length})"),errs[:5]);b.close()
