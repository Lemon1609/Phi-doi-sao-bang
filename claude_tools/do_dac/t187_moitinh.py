from playwright.sync_api import sync_playwright
import sys,json
with sync_playwright() as p:
    b=p.chromium.launch()
    for st in (20,40,60):
        ctx=b.new_context(viewport={'width':412,'height':860});pg=ctx.new_page();pg.set_default_timeout(240000)
        pg.add_init_script("if(!sessionStorage.getItem('s187')){sessionStorage.setItem('s187','1');const h=JSON.parse(localStorage.getItem('saobang-hangar-v1')||'{}');h.cleared=Array.from({length:%d},(_,i)=>i+1);localStorage.setItem('saobang-hangar-v1',JSON.stringify(h));}"%(st-1))
        pg.goto('file://'+sys.argv[1]+'?nopop',timeout=240000);pg.wait_for_timeout(2000)
        pg.goto('file://'+sys.argv[1]+'?nopop',timeout=240000);pg.wait_for_timeout(9000)
        pg.evaluate("""(st)=>{document.querySelectorAll('.adv70,.st71,.u72,.m63,#g44,#st66,#m40').forEach(e=>e.hidden=true);document.getElementById('tutorial392')?.remove();mode='menu';try{Lobby.show()}catch{};Progress.setLocked(false);
          const h=JSON.parse(localStorage.getItem('saobang-hangar-v1')||'{}');
          document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value=String(st);Lobby.hide();reset();if(mode==='pause')mode='play';
          window.__iv=setInterval(()=>{try{invuln=999;hp=maxHp;if(boss&&!boss.dead){player.x+=(boss.x-player.x)*.3;player.y=Math.min(H-80,boss.y+330);}}catch{}},50)}""",st)
        t_ent=None;cp=pg.evaluate("()=>{try{return [Math.round(Combat.stats().cp),Math.round(Meta40.reqCP(%d))]}catch(e){return String(e)}}"%st)
        for i in range(400):
            pg.wait_for_timeout(250)
            r=pg.evaluate("()=>({t:time,m:mode,b:!!boss,e:!!(boss&&boss.entered76),d:!!(boss&&(boss.dead||boss.defeatStarted)),hp:boss?Math.round((boss.hp||0)+(boss.coreHp||0)+(boss.parts||[]).reduce((a,p)=>a+Math.max(0,p.hp||0),0)):0})")
            if r['e'] and t_ent is None:t_ent=r['t'];hp0=r['hp']
            if t_ent is not None and (r['d'] or r['m']!='play'):print(st,'cp/req',cp,'mau boss',hp0,'TTK tu luc vao vi tri',round(r['t']-t_ent,1),'s',flush=True);break
        else:print(st,'het gio',r)
        ctx.close()
    b.close()
