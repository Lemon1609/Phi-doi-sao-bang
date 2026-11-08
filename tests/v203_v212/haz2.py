import sys
src=open('claude_tools/do_dac/t193.py').read().split('# ---------------- V190')[0]
HTML=sys.argv[1];sys.argv=['x',HTML,'160'];exec(src)
with sync_playwright() as p:
  br=p.chromium.launch();pg,errs,o=setup(br,'SS')
  pg.evaluate("""()=>{mode='menu';Lobby.show();try{V75.addEn(99)}catch{};document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value='132';Lobby.hide();reset();if(mode==='pause')mode='play';window.__hz=setInterval(()=>{try{bullets=[];for(const e of enemies)e.dead=true;}catch{}},40)}""")
  pg.wait_for_timeout(3000)
  r=pg.evaluate("""async()=>{invuln=0;hp=maxHp;const h0=Report392.state().totalHits;HAZ208X._spawnRock();const o=HAZ208X._R().slice(-1)[0];o.hp=o.max=1e9;o.x=player.x;o.y=player.y;o.vx=0;o.vy=0;await new Promise(r=>setTimeout(r,400));return {hit:Report392.state().totalHits-h0,taken:Report392.state().taken,left:HAZ208X._R().length,inv:invuln,sh:shield,hp:+hp.toFixed(1),max:+maxHp.toFixed(1),dmgsrc:String(damage).slice(0,60)}}""")
  print('va cham thien thach',r)
  r=pg.evaluate("""async()=>{invuln=99;const d0=drops.filter(d=>d.type==='star').length;HAZ208X._spawnRock();const o=HAZ208X._R().slice(-1)[0];o.x=player.x;o.y=player.y-220;o.vx=0;o.vy=0;const hp0=o.hp;for(let i=0;i<80&&HAZ208X._R().includes(o);i++)await new Promise(r=>setTimeout(r,100));return {pha:!HAZ208X._R().includes(o),hp0:+hp0.toFixed(1),sao:drops.filter(d=>d.type==='star').length-d0}}""")
  print('ban vo thien thach',r)
  r=pg.evaluate("""async()=>{invuln=99;HAZ208X._spawnTur();const t=HAZ208X._T();t.forEach(o=>o.y=200);const b0=bullets.length;clearInterval(window.__hz);bullets=[];await new Promise(r=>setTimeout(r,2600));return {thap:t.length,dan:bullets.length,en:enemies.filter(e=>!e.dead).length}}""")
  print('thap phao ban',r)
  print('ERR',errs[:3]);br.close()
