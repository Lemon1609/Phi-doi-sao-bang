import sys
exec(open('tests/v203_v212/t209.py').read().split("with sync_playwright() as p:")[0])
with sync_playwright() as p:
  br=p.chromium.launch();pg,errs,o=setup(br,'SS')
  start(pg,132)
  pg.evaluate("()=>{clearInterval(window.__hz)}")
  r=pg.evaluate("""async()=>{const out=[];for(let k=0;k<30&&out.length<3;k++){invuln=0;bulletShieldTime=0;hp=maxHp;shield=0;emit(player.x,player.y-30,Math.PI/2,200,'orb');await new Promise(r=>setTimeout(r,350));if(hp<maxHp)out.push(+(maxHp-hp).toFixed(2));}
   const c=[];for(let k=0;k<20&&c.length<2;k++){invuln=0;hp=maxHp;shield=0;damage('collision');if(hp<maxHp)c.push(+(maxHp-hp).toFixed(2));}return {bullet:out,coll:c,eq:Equipment25.blocksBullet()}}""")
  print(r);br.close()
