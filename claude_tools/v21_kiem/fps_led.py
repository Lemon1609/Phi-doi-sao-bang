import sys,os
from playwright.sync_api import sync_playwright
H=sys.argv[1]
os.chdir('/home/claude/nguon');sys.argv=['x',H];exec(open('tests/v203_v212/t209.py').read().split("with sync_playwright() as p:")[0])
with sync_playwright() as p:
  for name,init in [('LED bật',''),('LED tắt','window.EVO21LED=false'),('EVO21=false','window.EVO21=false')]:
    br=p.chromium.launch();pg,errs,_o=setup(br,'SS')
    if init:pg.add_init_script(init);pg.reload()
    pg.wait_for_timeout(5000)
    pg.evaluate("()=>{document.getElementById('tutorial392')?.remove();selectCraft(12);launchCraft=12;document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value='12';Lobby.hide();reset();if(mode==='pause')mode='play';setInterval(()=>{hp=maxHp;superTime=8},50)}")
    pg.wait_for_timeout(2500)
    r=pg.evaluate("()=>new Promise(res=>{let n=0,w=0,last=performance.now();const t0=last;function f(t){n++;w=Math.max(w,t-last);last=t;if(t-t0<6000)requestAnimationFrame(f);else res({fps:+(n*1000/(t-t0)).toFixed(1),worst:+w.toFixed(1)});}requestAnimationFrame(f);})")
    st=pg.evaluate("()=>window.EvoLED?EvoLED.state():null")
    print(name,r,'mode',pg.evaluate("()=>mode"),'led',st and {k:st[k] for k in ('ship','pod','mis') if k in st},'lỗi',len(errs),errs[:2],flush=True);br.close()
