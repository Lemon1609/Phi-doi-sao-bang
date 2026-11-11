import sys,os
os.chdir('/home/claude/phi-doi-sao-bang')
HTML=sys.argv[1];OUT=sys.argv[2];os.makedirs(OUT,exist_ok=True)
src=open('claude_tools/do_dac/t193.py').read().split('# ---------------- V190')[0]
sys.argv=['x',HTML,'160'];exec(src)
CLEAN="()=>{document.getElementById('tutorial392')?.remove();window.RULE84=false;window.TITLE84=false;try{Ch9.open=()=>true}catch{};document.querySelectorAll('.m63,.adv70,.st71').forEach(e=>e.hidden=true)}"
with sync_playwright() as p:
  br=p.chromium.launch();pg,errs,o=setup(br,'SS');pg.wait_for_timeout(1500)
  pg.reload();pg.wait_for_timeout(5000);pg.evaluate(CLEAN)
  pg.evaluate("()=>{Workshop.craftGrade=()=>'SS';Progress.setLocked(false);selectCraft(5);launchCraft=5;try{HOLO212.set({on:false})}catch{}}");pg.wait_for_timeout(2500)
  pg.screenshot(path=f'{OUT}/sanh.png')
  pg.evaluate("""()=>{document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value='60';selectCraft(5);launchCraft=5;Lobby.hide();reset();if(mode==='pause')mode='play';window.__iv=setInterval(()=>{hp=maxHp;shield=maxShield;superTime=0;invuln=0},100)}""");pg.wait_for_timeout(4500)
  pg.screenshot(path=f'{OUT}/tran.png')
  print('errs',errs[:3]);br.close()
