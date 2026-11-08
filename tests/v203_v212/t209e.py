import sys
exec(open('tests/v203_v212/t209.py').read().split("with sync_playwright() as p:")[0])
with sync_playwright() as p:
  br=p.chromium.launch();pg,errs,o=setup(br,'SS')
  for lv in (150,170,190):
    start(pg,150);pg.evaluate("(l)=>{level=l;clearInterval(window.__hz);invuln=999}",lv);pg.wait_for_timeout(2500)
    pg.screenshot(path=f'/tmp/V209_nen_{lv}.png')
  start(pg,140);pg.evaluate("()=>{clearInterval(window.__hz);invuln=999;setTimeout(()=>{try{enemies=[];startBoss();}catch(e){window.__e9=String(e)}},600)}")
  for i in range(60):
    if pg.evaluate("()=>!!(boss&&boss.bossHealthReady)"):break
    pg.wait_for_timeout(200)
  pg.wait_for_timeout(1500);print(pg.evaluate("()=>window.__e9||null"));print('boss',pg.evaluate("()=>boss?{hp:boss.hp,max:boss.max,y:boss.y}:null"))
  pg.wait_for_timeout(3500);pg.screenshot(path='/tmp/V209_boss.png')
  pg.evaluate("()=>{if(!boss)return;const w=(boss.parts||[])[0];if(w)damageBoss(w.hp+1,'gear',w)}");pg.wait_for_timeout(1500)
  pg.screenshot(path='/tmp/V209_boss2.png')
  print(errs[:3]);br.close()
