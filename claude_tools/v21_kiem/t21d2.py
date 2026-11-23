import sys, os
from playwright.sync_api import sync_playwright
H=sys.argv[1]
os.chdir('/home/claude/nguon');_a=sys.argv;sys.argv=['x',H];exec(open('tests/v203_v212/t209.py').read().split("with sync_playwright() as p:")[0]);sys.argv=_a
START="()=>{document.getElementById('tutorial392')?.remove();Progress.setLocked(false);selectCraft(0);launchCraft=0;document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value='12';Lobby.hide();reset();if(mode==='pause')mode='play';window.__iv=setInterval(()=>{hp=maxHp;try{shots.length=0}catch{}},5)}"
with sync_playwright() as p:
  # 1) EVO21=false
  pass#,pg.evaluate("()=>({mode,ev:window.EVO21,st:stageTime|0,shots:shots.length})"),'lỗi',errs[:3]);br.close()
  # 2) vùng dư gây sát thương
  br=p.chromium.launch();pg,errs,_o=setup(br,'SS');pg.wait_for_timeout(5000);pg.evaluate(START);pg.wait_for_timeout(1500)
  pg.wait_for_timeout(3000)
  r=pg.evaluate("""async()=>{const im=new Image();const out={};
   for(const [i,P] of [[0,[[240,300],[340,300],[40,300]]],[5,[[240,300],[300,300],[40,300]]]]){let E=[];for(let k=0;k<40&&E.length<3;k++){E=enemies.filter(e=>!e.dead&&Number.isFinite(e.hp)&&!e.rescue28).slice(0,3);if(E.length<3)await new Promise(r=>setTimeout(r,250));}
    if(E.length<3){out['z'+i]='thiếu quái '+E.length;continue;}const pin=setInterval(()=>E.forEach((e,j)=>{e.x=P[j][0];e.y=P[j][1];e.vx=0;e.vy=0;}),5);E.forEach(e=>{e.hp=e.maxHp=1e6;});
    window.__rh=[];const oh=Report392.hit;Report392.hit=function(d,k){__rh.push(k+':'+(+d).toFixed(2));return oh.apply(this,arguments)};Evo21.robHazard(i,240,-50,2000,1500,im,10);const t0=performance.now();await new Promise(r=>setTimeout(r,1000));clearInterval(pin);
    out['z'+i]=[E.map(e=>Math.round(1e6-e.hp)),E.map(e=>[e.x|0,e.y|0,e.hp<1e6]),__rh.filter(x=>x.startsWith('skill')).length,E.length,__rh.filter(x=>x.startsWith('skill')).slice(0,3)];Report392.hit=oh;}return out;}""")
  print('vùng dư (đơn vị 10, 1 s): #1',r['z0'],'(mong ~15 · ~15 · 0) · #6 làn giữa',r['z5'],'(mong ~20 · 0 · 0)','lỗi',errs[:3]);br.close()
