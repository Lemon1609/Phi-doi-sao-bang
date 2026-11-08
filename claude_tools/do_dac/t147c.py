import sys,json
from playwright.sync_api import sync_playwright
f=sys.argv[1]
with sync_playwright() as p:
    b=p.chromium.launch();errs=[];pg=b.new_page(viewport={'width':412,'height':860});pg.on('pageerror',lambda e:errs.append(str(e)[:300]));pg.set_default_timeout(240000)
    pg.goto('file://'+f+'?nopop',timeout=240000);pg.wait_for_timeout(3000)
    pg.evaluate("()=>{Gfx66.open()}");pg.fill('#st66-code','SAOBANG-ADMIN-2026');pg.click('[data-adm]');pg.click('[data-adm]');pg.wait_for_timeout(15000)
    pg.wait_for_function("()=>typeof Gear44!=='undefined'&&typeof KN146API!=='undefined'",timeout=240000);pg.wait_for_timeout(4000)
    print(pg.evaluate("""()=>{document.querySelectorAll('.adv70,.st71,.u72,.m63').forEach(e=>e.hidden=true);document.getElementById('tutorial392')?.remove();mode='menu';try{Lobby.show()}catch{};for(const k of ['armor','missiles','sidearm'])try{Gear44.equipSSS(k,null)}catch{};const o=[];for(const [m,g] of [['thunder','SS'],['rail','S']]){Campaign36.acquire('gear',m,g,'endless');const it=Progress.getState().items.filter(x=>x.variant===m).slice(-1)[0];Progress.equip(it.id);o.push([m,it.grade]);}
      document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value='80';Lobby.hide();reset();if(mode==='pause')mode='play';setInterval(()=>{try{invuln=999;hp=maxHp;superTime=Math.max(superTime,5)}catch{}},200);return o}"""))
    pg.wait_for_timeout(9000)
    print(pg.evaluate("()=>{const st=Gear44.fxState('missiles'),sd=Gear44.fxState('sidearm');const v={};for(const p of st.pool)if(p.on){const k=p.type+':'+p.variant;v[k]=(v[k]||0)+1}return {lv:[st.lv146,sd.lv146],mode:st.mode,kk:st.kk146,cnt:KN146API._state(),pool:v,objs:st.targets.filter(t=>t.obj).length,ranks:(gear.equipment||[]).map(i=>[i.variant,i.grade,i.spec&&i.spec.rank])}}"))
    print(pg.evaluate("()=>{const st=Gear44.fxState('missiles');return {shots:st.pool.filter(p=>p.on&&p.type==='shot').slice(0,5).map(p=>[Math.round(p.x),Math.round(p.y),Math.round(p.vx),Math.round(p.vy),p.target,+p.age.toFixed(2)]),tg:st.targets.map(t=>[Math.round(t.x),Math.round(t.y),t.r,t.hp>0]),pl:[player.x,player.y],W,H,dmg:st.metrics.damage}}"))
    print('ERRS',errs[:5]);b.close()
