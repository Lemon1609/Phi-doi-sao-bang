import sys
from playwright.sync_api import sync_playwright
f=sys.argv[1]
with sync_playwright() as p:
  b=p.chromium.launch();pg=b.new_page(viewport={'width':393,'height':852});pg.on('dialog',lambda d:d.accept())
  pg.add_init_script("""window.__bk={draw:0,true_:0,steps:0,ms:0,max:0};""")
  pg.goto('file://'+f+'?nopop');pg.wait_for_function("()=>typeof Thu100==='object'",timeout=120000);pg.wait_for_timeout(3000)
  pg.evaluate("(a)=>Thu100.start(a)",200);pg.wait_for_timeout(8000)
  for k in range(60):
    pg.wait_for_timeout(3000)
    try:
      if pg.evaluate("()=>sessionStorage.getItem('thu100-step')===null&&typeof Combat==='object'"):break
    except Exception:pass
  pg.wait_for_timeout(3000)
  pg.evaluate("""()=>{const od=BossBake3D.draw;BossBake3D.draw=function(b){__bk.draw++;const r=od.apply(this,arguments);if(r)__bk.true_++;return r};
    const ric=window.requestIdleCallback;window.requestIdleCallback=function(fn,o){return ric.call(window,function(d){const t=performance.now();const r=fn(d);const ms=performance.now()-t;__bk.steps++;__bk.ms+=ms;__bk.max=Math.max(__bk.max,ms);return r},o)};Gfx66.set('high');window.__bn=0;const ob=Row79.banner;Row79.banner=function(){window.__bn++;return ob.apply(this,arguments)};}""")
  for st in [int(x) for x in sys.argv[2:]]:
    pg.evaluate("""(st)=>{document.querySelectorAll('.m63').forEach(e=>e.hidden=true);mode='menu';try{Lobby.show()}catch{};Progress.setLocked(false);try{V75.addEn(60)}catch{};document.getElementById('gamemode').value='campaign';try{syncModeSetup()}catch{};document.getElementById('mission-select').value=String(st);Lobby.hide();reset();if(mode==='pause')mode='play';
     if(!window.__iv)window.__iv=setInterval(()=>{try{invuln=999;hp=maxHp;const d=document.getElementById('st80');if(d)d.hidden=true;window.__st80=0;if(mode==='pause')mode='play';}catch{}},150)}""",st)
    try:pg.wait_for_function("()=>{try{return !!boss}catch{return false}}",timeout=200000,polling=100)
    except Exception:pass
    pg.wait_for_timeout(6000)
    print(st,pg.evaluate("()=>[window.__bn,JSON.stringify(__bk),JSON.stringify(BossBake3D.state()),boss&&boss.design,level]"))
  b.close()
