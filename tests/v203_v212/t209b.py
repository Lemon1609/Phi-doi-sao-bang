import sys
exec(open('tests/v203_v212/t209.py').read().split("with sync_playwright() as p:")[0])
with sync_playwright() as p:
  br=p.chromium.launch();pg,errs,o=setup(br,'SS')
  start(pg,132)
  pg.evaluate("()=>{window.__arm209={ids:['monarch12_a'],lv:5,sss:false}}")
  r=pg.evaluate("""async()=>{for(let i=0;i<3;i++)V209EV.on('elite',{});const pool=V209EV.state().pool;invuln=0;hp=maxHp;shield=0;const h0=hp;let inner=null;const W0=damage;damage('collision');return {maxHp,pool,h0,hp,left:V209EV.state().pool,sc:enemyScale(),isMine:!!W0.__v209,nt:!!W0.__nt144}}""")
  print(r)
  pg.evaluate("()=>{window.__arm209={ids:['nanite'],lv:5,sss:false};superTime=0}")
  r=pg.evaluate("""async()=>{invuln=99;hp=maxHp*.5;const h0=hp;Safety31.push(drops,100,{x:player.x,y:player.y-140,type:'bomb',t:0});for(let i=0;i<40&&hp===h0;i++)await new Promise(r=>setTimeout(r,100));return {pct:+((hp-h0)/maxHp*100).toFixed(2),n:V209EV.state().n}}""")
  print(r)
  print(errs[:3]);br.close()
