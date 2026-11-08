# V183 · đo riêng thời gian vẽ vật phẩm rơi (30 sao + 4 buff): cũ (DROP183=false, RV75_BEAM bật) vs mới
import sys,json
from playwright.sync_api import sync_playwright
f=sys.argv[1]
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':412,'height':860},device_scale_factor=2);pg.set_default_timeout(240000)
    pg.goto('file://'+f+'?nopop',timeout=240000);pg.wait_for_timeout(3000)
    pg.evaluate("()=>{Gfx66.open()}");pg.fill('#st66-code','SAOBANG-ADMIN-2026');pg.click('[data-adm]');pg.click('[data-adm]');pg.wait_for_timeout(15000);pg.wait_for_function("()=>typeof Lobby!=='undefined'",timeout=240000)
    pg.evaluate("""()=>{document.querySelectorAll('.adv70,.st71,.u72,.m63,#g44,#st66').forEach(e=>e.hidden=true);document.getElementById('tutorial392')?.remove();mode='menu';try{Lobby.show()}catch{};
      document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value='3';Lobby.hide();reset();if(mode==='pause')mode='play';invuln=1e9;}""");pg.wait_for_timeout(4000)
    r=pg.evaluate("""()=>{const keep=drops.slice();drops.length=0;for(let i=0;i<30;i++)drops.push({x:40+(i%10)*36,y:200+Math.floor(i/10)*60,type:'star',t:1,ph:i,big:i%3===0,dead:false});
      for(const [i,t] of ['power','heal','shield','bomb'].entries())drops.push({x:80+i*80,y:500,type:t,t:1,ph:i,dead:false,v40:true});
      const run=(old)=>{window.DROP183=old?false:undefined;window.RV75_BEAM=old?true:false;for(let k=0;k<20;k++)Loot40.draw();const t0=performance.now();for(let k=0;k<400;k++)Loot40.draw();return +((performance.now()-t0)/400).toFixed(3)};
      const o1=run(true),n1=run(false),o2=run(true),n2=run(false),o3=run(true),n3=run(false);window.DROP183=undefined;window.RV75_BEAM=false;drops.length=0;for(const d of keep)drops.push(d);mode='play';return {cu_ms:[o1,o2,o3],moi_ms:[n1,n2,n3]}}""")
    print(json.dumps(r));pg.screenshot(path='/tmp/claude-0/audit/v183_ve.png');b.close()
