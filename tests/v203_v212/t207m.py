import sys
src=open('claude_tools/do_dac/t193.py').read().split('# ---------------- V190')[0]
HTML=sys.argv[1];sys.argv=['x',HTML,'180'];exec(src)
BOT="""()=>{window.__iv&&clearInterval(window.__iv);window.__iv=setInterval(()=>{try{invuln=999;if(!(V207X.active()&&V207X.active().mod==='one_hp_glass'))hp=maxHp;if(mode==='play'&&boss&&!boss.dead){const w=(boss.parts||[]).filter(p=>!p.dead&&p.hp>0);const tx=w.length?w.reduce((a,b)=>b.hp<a.hp?b:a).x:boss.x;player.x+=(tx-player.x)*.3;player.y=Math.min(H-80,boss.y+330);}}catch{}},50)}"""
with sync_playwright() as p:
  br=p.chromium.launch();pg,errs,o=setup(br,'SS')
  for mi in range(5):
    pg.evaluate("(m)=>{const v=document.querySelector('.v207');v&&v.remove();V207X.start('daily',m)}",mi);pg.evaluate(BOT)
    smp=[]
    for i in range(1500):
      if i%25==10:smp.append(pg.evaluate("()=>({bf:+Combat26.bulletFactor().toFixed(2),hp:+hp.toFixed(1),sh:+(shield||0).toFixed(1),pw:power,sup:+superTime.toFixed(1),bmax:boss?Math.round(boss.max):0})"))
      if pg.evaluate("()=>!!document.querySelector('.v207 h3') && !V207X.active()"):break
      pg.wait_for_timeout(200)
    t=pg.evaluate("()=>document.querySelector('.v207 h3').innerText+' | '+(document.querySelector('.v207 p')||{}).innerText")
    print(mi,t,'| mau:',smp[:4])
  print('ERR',errs[:3]);br.close()
