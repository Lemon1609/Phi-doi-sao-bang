import sys
exec(open('/home/claude/work/V83_nguon/tests/v203_v212/t209.py').read().split("with sync_playwright() as p:")[0].replace("open('claude_tools","open('/home/claude/work/V83_nguon/claude_tools"))
CLEAN="()=>{document.getElementById('tutorial392')?.remove();window.RULE84=false;window.TITLE84=false;try{Ch9.open=()=>true}catch{};document.querySelectorAll('.m63,.adv70,.st71').forEach(e=>e.hidden=true)}"
with sync_playwright() as p:
  br=p.chromium.launch();pg,errs,o=setup(br,'SS');pg.wait_for_timeout(1500)
  for idx in (0,1,2,6):
    pg.reload();pg.wait_for_timeout(5000);pg.evaluate(CLEAN)
    info=pg.evaluate("(i)=>{Progress.setLocked(false);selectCraft(i);launchCraft=i;HOLO212.set({on:true,tier:1});let n=null;try{n=V70.craftN(i)}catch{};return {i,n}}",idx);print(info);pg.wait_for_timeout(2500)
    pg.screenshot(path=f'/tmp/claude-0/s203/F_{idx}_sanh.png',clip={'x':0,'y':110,'width':393,'height':420})
    pg.evaluate("""(i)=>{document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value='60';selectCraft(i);launchCraft=i;Lobby.hide();reset();if(mode==='pause')mode='play';invuln=0;window.__iv=setInterval(()=>{hp=maxHp;shield=maxShield;superTime=0;try{Combat26.state().charge>90&&0}catch{}},100)}""",idx);pg.wait_for_timeout(6500)
    pg.screenshot(path=f'/tmp/claude-0/s203/F_{idx}_tran.png')
    pg.evaluate("()=>{clearInterval(window.__iv);window.__iv=setInterval(()=>{hp=maxHp;shield=maxShield},100);activateSuper()}");pg.wait_for_timeout(1800)
    pg.screenshot(path=f'/tmp/claude-0/s203/F_{idx}_bt.png')
  print(errs[:3]);br.close()
