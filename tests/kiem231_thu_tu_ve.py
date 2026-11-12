import sys
_src = open('tests/v203_v212/t209.py').read().split("with sync_playwright() as p:")[0]
_argv = sys.argv; exec(_src); sys.argv = _argv
TIER = "()=>{const o=V70.ve.bind(V70);V70.ve=(k,i)=>k==='c'&&i===7?5:o(k,i);const m=V70.isMax.bind(V70);V70.isMax=i=>i===7?false:m(i);}"
with sync_playwright() as p:
    br = p.chromium.launch(); pg, errs, _o = setup(br, 'SS'); pg.wait_for_timeout(1500)
    pg.reload(); pg.wait_for_timeout(5000); pg.evaluate(TIER)
    pg.evaluate("()=>{document.getElementById('tutorial392')?.remove();Progress.setLocked(false);document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value='40';selectCraft(7);launchCraft=7;Lobby.hide();reset();if(mode==='pause')mode='play';window.__iv=setInterval(()=>{hp=maxHp;shield=maxShield},50)}")
    pg.wait_for_timeout(5000); pg.evaluate("()=>activateSuper()"); pg.wait_for_timeout(1000)
    print(pg.evaluate("""()=>new Promise(res=>{const L=[];const ob=BtFx218.back,op=Render27.projectile;BtFx218.back=function(){L.push('canh');return ob.apply(this,arguments)};Render27.projectile=function(){L.push('dan');return op.apply(this,arguments)};
      setTimeout(()=>{BtFx218.back=ob;Render27.projectile=op;const s=L.join(',');res({n:L.length,dau:s.slice(0,200)})},120)})"""))
    br.close()
