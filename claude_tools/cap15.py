import sys,os
os.chdir('/home/claude/nguon')
src=open('claude_tools/do_dac/t193.py').read().split('# ---------------- V190')[0]
HTML=sys.argv[1];OUT=sys.argv[2];sys.argv=['x',HTML,'160'];exec(src)
t209=open('tests/v203_v212/t209.py').read();exec(t209[t209.find('def start'):t209.find('with sync_playwright')])
with sync_playwright() as p:
  br=p.chromium.launch();pg,errs,o=setup(br,'SS');pg.add_style_tag(content='#q307{display:none!important}')
  pg.wait_for_timeout(1500);pg.screenshot(path=OUT+'_sanh.png')
  start(pg,20);pg.evaluate("()=>{Opt15.setHud(true);invuln=1e9;setInterval(()=>{try{hp=maxHp}catch(e){}},300)}")
  pg.wait_for_function("()=>typeof boss!=='undefined'&&boss&&boss.y>100",timeout=90000);pg.wait_for_timeout(2500)
  pg.evaluate("()=>{try{activateSuper()}catch(e){}}");pg.wait_for_timeout(1800);pg.screenshot(path=OUT+'_boss.png');print(pg.evaluate("()=>{const e=document.getElementById('perf15');if(!e)return 'không có';const cs=getComputedStyle(e);const r=e.getBoundingClientRect();const top=document.elementFromPoint(r.x+20,r.y+10);return {hid:e.hidden,disp:cs.display,vis:cs.visibility,op:cs.opacity,r:[r.x,r.y,r.width,r.height],top:top&&(top.id||top.className||top.tagName),txt:e.textContent.slice(0,40),hud:window.PERF_HUD,full:!!document.fullscreenElement}}"))
  print('errs',errs[:3])
