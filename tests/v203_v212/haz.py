import sys,json
src=open('claude_tools/do_dac/t193.py').read().split('# ---------------- V190')[0]
HTML=sys.argv[1];sys.argv=['x',HTML,'200'];exec(src)
with sync_playwright() as p:
  br=p.chromium.launch();pg,errs,o=setup(br,'SS')
  pg.evaluate("()=>{try{Gfx66.set('high')}catch{}}")
  for st in (111,132,152,171,192):
    pg.evaluate("""(st)=>{window.__iv&&clearInterval(window.__iv);mode='menu';Lobby.show();try{V75.addEn(99)}catch{};document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value=String(st);Lobby.hide();reset();if(mode==='pause')mode='play';
      window.__iv=setInterval(()=>{try{invuln=999;hp=maxHp;player.x=240+Math.sin(performance.now()/900)*150;}catch{}},50);setTimeout(()=>{HAZ208X._spawnRock();HAZ208X._spawnTur();},2500)}""",st)
    pg.wait_for_timeout(6500)
    print(st,pg.evaluate("()=>({h:HAZ208X.state(),nen:NEN194.on(),ch:Campaign36.chapter(level)+1})"))
    pg.screenshot(path=f'/tmp/h_{st}.png')
  # va chạm thiên thạch thật (không bất tử)
  pg.evaluate("()=>{window.__iv&&clearInterval(window.__iv);invuln=0;const h0=Report392.state().totalHits;window.__h0=h0;HAZ208X._spawnRock();}")
  pg.evaluate("()=>{const o=HAZ208X;}")
  print('ERR',errs[:3]);br.close()
