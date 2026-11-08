import sys
exec(open('tests/v203_v212/t209.py').read().split("with sync_playwright() as p:")[0])
with sync_playwright() as p:
  br=p.chromium.launch();pg,errs,o=setup(br,'SS')
  pg.wait_for_timeout(1500)
  r=pg.evaluate("()=>{const e=document.getElementById('ship-preview');if(!e)return null;let p=e,chain=[];while(p&&chain.length<6){chain.push((p.id||'')+'.'+(p.className||''));p=p.parentElement}const b=e.getBoundingClientRect();return {chain,b:[b.x,b.y,b.width,b.height],vis:!!e.offsetParent}}")
  print(r)
  pg.wait_for_timeout(2500)
  shots=[]
  for t in (1,2,3):
    pg.evaluate("(t)=>HOLO212.set({on:true,tier:t})",t);pg.wait_for_timeout(1800)
    pg.screenshot(path=f'/tmp/V212_t{t}.png',clip={'x':0,'y':110,'width':393,'height':520})
  pg.evaluate("()=>HOLO212.set({on:false})");pg.wait_for_timeout(1200)
  pg.screenshot(path='/tmp/V212_t0.png',clip={'x':0,'y':110,'width':393,'height':520})
  pg.evaluate("()=>HOLO212.set({on:true,tier:2})")
  print(errs[:2]);br.close()
