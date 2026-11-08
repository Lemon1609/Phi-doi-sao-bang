import sys,json,os
from playwright.sync_api import sync_playwright
f=sys.argv[1];O=sys.argv[2];os.makedirs(O,exist_ok=True)
PAIRS=[('chrono11_m','chrono11_s'),('monarch12_m','monarch12_s')]
with sync_playwright() as p:
    b=p.chromium.launch();errs=[];pg=b.new_page(viewport={'width':412,'height':860});pg.on('pageerror',lambda e:errs.append(str(e)[:300]));pg.set_default_timeout(240000)
    pg.goto('file://'+f+'?nopop',timeout=240000);pg.wait_for_timeout(3000)
    pg.evaluate("()=>{Gfx66.open()}");pg.fill('#st66-code','SAOBANG-ADMIN-2026');pg.click('[data-adm]');pg.click('[data-adm]');pg.wait_for_timeout(15000)
    pg.wait_for_function("()=>typeof Gear44!=='undefined'&&typeof NT147S!=='undefined'",timeout=240000);pg.wait_for_timeout(4000)
    pg.evaluate("""()=>{window.__gd=0;const od=damageBoss;damageBoss=function(a,s,part){if(s==='gear'||(s&&s.gearKind&&s.gearKind!=='armor'))window.__gd+=(+a||0);return od.call(this,(+a||0)*1e-4,s,part);};
      setInterval(()=>{try{invuln=999;hp=maxHp;if(mode==='play'){if(boss&&!boss.dead){player.x+=(boss.x-player.x)*.3;player.y=Math.min(H-80,boss.y+330);for(const e of enemies)if(!e.bossPart)e.dead=true;}}}catch{}},100)}""")
    for mi,sd in PAIRS:
        pg.evaluate("""(a)=>{document.querySelectorAll('.adv70,.st71,.u72,.m63').forEach(e=>e.hidden=true);document.getElementById('tutorial392')?.remove();mode='menu';try{Lobby.show()}catch{};Progress.setLocked(false);for(const k of ['armor','missiles','sidearm'])try{Gear44.equipSSS(k,null)}catch{};
          for(const m of a){Campaign36.acquire('gear',m,'SS','endless');const it=Progress.getState().items.filter(x=>x.variant===m).slice(-1)[0];Progress.equip(it.id);}
          document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value='60';Lobby.hide();reset();if(mode==='pause')mode='play';}""",[mi,sd])
        for _ in range(200):
            if pg.evaluate("()=>!!(boss&&boss.bossHealthReady&&boss.y>60)"):break
            pg.evaluate("()=>{try{for(const e of enemies)if(!e.bossPart)e.dead=true;}catch{}}");pg.wait_for_timeout(300)
        res={'on':[],'off':[]}
        for rep in range(1):
            for st in ['on','off']:
                pg.evaluate("(s)=>{window.NT147=(s==='on')?undefined:false;}",st);pg.wait_for_timeout(2000)
                pg.evaluate("()=>{window.__gd=0}");pg.wait_for_timeout(8000)
                res[st].append(round(pg.evaluate("()=>window.__gd"),1))
        pg.evaluate("()=>{window.NT147=undefined}")
        res['cnt']=pg.evaluate("()=>NT147S.count()");res['boss']=pg.evaluate("()=>!!boss")
        for q in range(8):pg.screenshot(path=f'{O}/{mi}_{sd}_{q}.png');pg.wait_for_timeout(120)
        on=sum(res['on']);off=sum(res['off'])
        print(mi,sd,'ON',res['on'],'OFF',res['off'],'ti_le %.2f'%(on/off if off else 0),res['cnt'],flush=True)
    pg.evaluate("()=>{mode='menu';try{Lobby.show()}catch{};document.querySelectorAll('.adv70,.st71,.u72,.m63').forEach(e=>e.hidden=true);try{Nav74.tab('equip');Nav74.sub('armory');}catch(e){}}");pg.wait_for_timeout(2500);pg.screenshot(path=O+'/kho.png')
    print('ERRS',errs[:6]);b.close()
