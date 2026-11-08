# V157 · đo ngân sách đơn mục tiêu 16 vũ khí SSS (boss, quái thường bị xóa): A = món mẹ thường · B = SSS, E3 tắt · C = SSS, E3 bật
# tách phần ô còn lại bằng hệ 2 phương trình A/B (B = khác + 1,755·x0 khi cường hóa +10, OC75 = 1)
import sys,json,os
from playwright.sync_api import sync_playwright
f=sys.argv[1];ONLY=sys.argv[2].split(',') if len(sys.argv)>2 else None;DUR=int(os.environ.get('DUR','10000'))
with sync_playwright() as p:
    b=p.chromium.launch();errs=[];pg=b.new_page(viewport={'width':412,'height':860});pg.on('pageerror',lambda e:errs.append(str(e)[:300]));pg.set_default_timeout(240000)
    pg.goto('file://'+f+'?nopop',timeout=240000);pg.wait_for_timeout(3000)
    pg.evaluate("()=>{Gfx66.open()}");pg.fill('#st66-code','SAOBANG-ADMIN-2026');pg.click('[data-adm]');pg.click('[data-adm]');pg.wait_for_timeout(15000)
    pg.wait_for_function("()=>typeof Gear44!=='undefined'&&typeof SSSE3_API!=='undefined'",timeout=240000);pg.wait_for_timeout(4000)
    pg.evaluate("""()=>{window.__gd=0;const od=damageBoss;damageBoss=function(a,s,part){if(s==='gear'||(s&&s.gearKind&&s.gearKind!=='armor'))window.__gd+=(+a||0);return od.call(this,(+a||0)*1e-4,s,part);};
      setInterval(()=>{try{if(window.__zk&&gear&&gear.equipment)for(const i of gear.equipment)if(i.kind===window.__zk)i.auxDamage=1e-9;invuln=999;hp=maxHp;if(mode==='play'){if(superTime>0)superTime=0;if(boss&&!boss.dead){player.x+=(boss.x-player.x)*.3;player.y=Math.min(H-80,boss.y+330);for(const e of enemies)if(!e.bossPart)e.dead=true;}}}catch{}},100)}""")
    defs=pg.evaluate("()=>Gear44.defs().filter(d=>d.kind!=='armor').map(d=>[d.id,d.kind,d.parents])")
    out=[]
    for sid,kind,par in defs:
        if ONLY and sid not in ONLY:continue
        pg.evaluate("""([sid,kind,par])=>{document.querySelectorAll('.adv70,.st71,.u72,.m63,#g44').forEach(e=>e.hidden=true);document.getElementById('tutorial392')?.remove();mode='menu';try{Lobby.show()}catch{};Progress.setLocked(false);
          const it=Progress.getState().items.filter(x=>x.variant===par[0]).sort((a,b)=>V70.nOf(b)-V70.nOf(a))[0];Progress.equip(it.id);Gear44.equipSSS(kind,sid);const o=kind==='missiles'?'sidearm':'missiles';Gear44.equipSSS(o,null);
          document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value='60';Lobby.hide();reset();if(mode==='pause')mode='play';}""",[sid,kind,par])
        for _ in range(200):
            if pg.evaluate("()=>!!(boss&&boss.bossHealthReady&&boss.y>60)"):break
            pg.evaluate("()=>{try{for(const e of enemies)if(!e.bossPart)e.dead=true;}catch{}}");pg.wait_for_timeout(300)
        r={}
        for st in ['C']:
            pg.evaluate("([st,kind,sid])=>{if(st==='A'){Gear44.equipSSS(kind,null);window.SSSE3=false;}else{Gear44.equipSSS(kind,sid);window.SSSE3=(st==='C')?undefined:false;}gear=Progress.stats();window.__zk=kind==='missiles'?'sidearm':'missiles';mode='play';}",[st,kind,sid]);pg.wait_for_timeout(2500)
            pg.evaluate("()=>{window.__gd=0;SSSE3_API.reset();mode='play'}");pg.wait_for_timeout(DUR);r[st]=pg.evaluate("()=>window.__gd");r['e3']=pg.evaluate("()=>SSSE3_API.state().dealt")
        m=pg.evaluate("(k)=>{window.SSSE3=false;const a=Gear44.sssM(k);window.SSSE3=undefined;return a}",kind)
        e3=r['e3'];nor=r['C']-e3;ratio=e3/max(1e-9,nor);cal=(.46/.62)/max(1e-9,ratio)
        res={'id':sid,'thuong':round(nor),'e3':round(e3),'e3/thuong':round(ratio,3),'cal':round(cal,3),'tran':pg.evaluate("()=>SSSE3_API.state()")}
        print(json.dumps(res,ensure_ascii=False),flush=True);out.append(res)
    pg.evaluate("()=>{window.SSSE3=undefined}")
    print('ERRS',errs[:6]);b.close()
