import sys,os,time
os.chdir('/home/claude/phi-doi-sao-bang')
HTML=sys.argv[1];OUT=sys.argv[2];SH=[int(x) for x in sys.argv[3].split(',')];os.makedirs(OUT,exist_ok=True)
src=open('claude_tools/do_dac/t193.py').read().split('# ---------------- V190')[0]
sys.argv=['x',HTML,'160'];exec(src)
CLEAN="()=>{document.getElementById('tutorial392')?.remove();window.RULE84=false;window.TITLE84=false;try{Ch9.open=()=>true}catch{};document.querySelectorAll('.m63,.adv70,.st71').forEach(e=>e.hidden=true)}"
with sync_playwright() as p:
  br=p.chromium.launch();pg,errs,o=setup(br,'SS');pg.wait_for_timeout(1500)
  for idx in SH:
    pg.reload();pg.wait_for_timeout(5000);pg.evaluate(CLEAN)
    pg.evaluate("""(i)=>{Workshop.craftGrade=()=>"SS";Progress.setLocked(false);selectCraft(i);launchCraft=i;document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value='60';Lobby.hide();reset();if(mode==='pause')mode='play';window.__iv=setInterval(()=>{hp=maxHp;shield=maxShield;invuln=0},100)}""",idx);pg.wait_for_timeout(4500)
    d=f'{OUT}/s{idx}';os.makedirs(d,exist_ok=True)
    for i in range(52):
      if i==6:pg.evaluate("()=>activateSuper()")
      pg.screenshot(path=f'{d}/{i:03d}.png',clip={'x':36,'y':520,'width':320,'height':332})
    print(idx,pg.evaluate("()=>({st:window.BtFx218&&BtFx218.state(),sup:superTime})"),flush=True)
    pg.evaluate("()=>{clearInterval(window.__iv);superTime=0}")
  print('errs',errs[:3]);br.close()
