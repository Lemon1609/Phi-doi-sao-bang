import sys,json
from playwright.sync_api import sync_playwright
f=sys.argv[1]
with sync_playwright() as p:
  b=p.chromium.launch();pg=b.new_page(viewport={'width':393,'height':852});pg.set_default_timeout(180000)
  pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(5000)
  print(pg.evaluate("()=>[Admin66.tryCode('saobang-admin-2026'),Admin66.tryCode('saobang-admin-2026')]"))
  pg.wait_for_timeout(28000)
  print(pg.evaluate("""()=>{const s=Progress.getState();const own=[...Array(13).keys()].filter(i=>{try{return Campaign36.ownsCraft(i)}catch{return false}});
   return {cleared:s.cleared.length,maxCleared:Math.max(...s.cleared),items:s.items.length,own,vars:[...new Set(s.items.map(x=>x.variant))].join(","),lsItems:(JSON.parse(localStorage.getItem("saobang-hangar-v1")||"{}").items||[]).length,flag:localStorage.getItem('saobang-admin136'),sss87:(()=>{try{return SSS87.state().done}catch(e){return String(e)}})(),sssGear:(()=>{try{return Object.keys(JSON.parse(localStorage.getItem('saobang-gear-sss-v1')||'{}'))}catch(e){return 0}})(),fus:(()=>{try{return JSON.parse(localStorage.getItem('saobang-fusion-v36')||localStorage.getItem('saobang-fusion')||'null')}catch{return null}})()}}"""))
  b.close()
