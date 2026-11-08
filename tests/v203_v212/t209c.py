import sys
exec(open('tests/v203_v212/t209.py').read().split("with sync_playwright() as p:")[0])
with sync_playwright() as p:
  br=p.chromium.launch();pg,errs,o=setup(br,'SS')
  start(pg,132)
  pg.evaluate("()=>{window.__arm209={ids:['nanite'],lv:5,sss:false};superTime=0}")
  r=pg.evaluate("""async()=>{invuln=99;hp=maxHp*.5;const d={x:player.x,y:player.y-140,type:'bomb',t:0};Safety31.push(drops,100,d);const log=[];for(let i=0;i<30;i++){await new Promise(r=>setTimeout(r,150));log.push([Math.round(d.x-player.x),Math.round(d.y-player.y),d.type,!!d.dead,drops.includes(d),V209EV._S.seen.size,mode]);if(d.dead)break;}return {log,n:V209EV.state().n,arm:V209EV.state().active}}""")
  for l in r['log'][-6:]:print(l)
  print(r['n'],r['arm'])
  br.close()
