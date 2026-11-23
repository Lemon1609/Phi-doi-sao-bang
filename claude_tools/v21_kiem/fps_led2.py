import sys,os
from playwright.sync_api import sync_playwright
H=sys.argv[1]
os.chdir('/home/claude/nguon');sys.argv=['x',H];exec(open('tests/v203_v212/t209.py').read().split("with sync_playwright() as p:")[0])
with sync_playwright() as p:
  for name,init in [('đo riêng','')]:
    br=p.chromium.launch();pg,errs,_o=setup(br,'SS')
    if init:pg.add_init_script(init);pg.reload()
    pg.wait_for_timeout(5000)
    pg.evaluate("()=>{document.getElementById('tutorial392')?.remove();selectCraft(12);launchCraft=12;document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value='12';Lobby.hide();reset();if(mode==='pause')mode='play';setInterval(()=>{hp=maxHp;superTime=8},50)}")
    pg.wait_for_timeout(2500)
    print('chi phí LED / khung (ms):',pg.evaluate('''()=>{const c=document.createElement('canvas');c.width=480;c.height=800;const g=c.getContext('2d');const I={tier:'tim',pal:['#fff','#a855f7','','#22d3ee']};
      for(let k=0;k<20;k++){EvoLED.shipLED(g,12,'tim',106,k*.016,true,1.25,240,600);}
      const N=300,t0=performance.now();for(let k=0;k<N;k++){const t=k*.016;EvoLED.shipLED(g,12,'tim',106,t,true,1.25,240,600);EvoLED.ctLED(g,1,240,400,t,true,3,.5,1);EvoLED.pod(g,180,620,52,I,true,.05);EvoLED.pod(g,300,620,52,I,true,.05);for(let m=0;m<6;m++){g.save();g.translate(200+m*10,300);EvoLED.mis(g,30,70,I,true);g.restore();}}return +((performance.now()-t0)/N).toFixed(3);}'''))
    r=pg.evaluate("()=>new Promise(res=>{let n=0,w=0,last=performance.now();const t0=last;function f(t){n++;w=Math.max(w,t-last);last=t;if(t-t0<6000)requestAnimationFrame(f);else res({fps:+(n*1000/(t-t0)).toFixed(1),worst:+w.toFixed(1)});}requestAnimationFrame(f);})")
    st=pg.evaluate("()=>window.EvoLED?EvoLED.state():null")
    print(name,r,'mode',pg.evaluate("()=>mode"),'led',st and {k:st[k] for k in ('ship','pod','mis') if k in st},'lỗi',len(errs),errs[:2],flush=True);br.close()
