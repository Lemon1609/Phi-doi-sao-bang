import sys,json
from playwright.sync_api import sync_playwright
f=sys.argv[1];R={}
with sync_playwright() as p:
    b=p.chromium.launch();c=b.new_context(viewport={'width':390,'height':844},device_scale_factor=2)
    pg=c.new_page();errs=[];pg.on('pageerror',lambda e:errs.append(str(e)));pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(3000)
    R['fresh']=pg.evaluate("()=>[Ch9.open(),Eclipse67.unlocked(),MISSIONS.length,CHAPTERS36.length,Progress.canStart(161)]")
    # admin → mở Chương 9
    pg.evaluate("()=>{Gfx66.open()}");pg.fill('#st66-code','SAOBANG-ADMIN-2026');pg.click('[data-adm]');pg.click('[data-adm]');pg.wait_for_timeout(6500)
    R['adm']=pg.evaluate("()=>[Ch9.open(),Progress.canStart(161),Progress.canStart(162),Eclipse67.unlocked(),Eclipse67.chapterOpen(0),Eclipse67.canStart(1),Eclipse67.canStart(2),Combat.stageRequirement(170)]")
    pg.evaluate("()=>{document.getElementById('tutorial392')?.remove();Expedition67.open('ch9')}");pg.wait_for_timeout(400);pg.screenshot(path='/tmp/claude-0/t67_panel9.png')
    pg.evaluate("()=>Expedition67.open('ecl')");pg.wait_for_timeout(400);pg.screenshot(path='/tmp/claude-0/t67_panelE.png')
    # chơi ải 161
    pg.evaluate("()=>{Expedition67.close();Expedition67.launch9(161);setInterval(()=>{if(mode==='play'){hp=maxHp;}},60)}");pg.wait_for_timeout(2500)
    R['play161']=pg.evaluate("()=>[mode,level,gameMode,Ch9.inCh9(),Combat.stageRequirement(level),Waves30.total(),CHAPTERS36[Campaign36.chapter(level)].name]")
    pg.wait_for_timeout(16000);pg.screenshot(path='/tmp/claude-0/t67_play161.png')
    R['haz']=pg.evaluate("()=>({...Ch9.state(),vort:enemies.filter(e=>e.vortex67&&!e.dead).length,wave:Waves30.state().wave})")
    # thắng ải 161 nhanh
    pg.evaluate("()=>{const d0=Dust67.get();window.__d0=d0;finishStage36(false);}");pg.wait_for_timeout(800)
    R['win161']=pg.evaluate("()=>[mode,Progress.getState().cleared.includes(161),Dust67.get()-window.__d0,Progress.canStart(162)]")
    pg.evaluate("()=>nextStage()");pg.wait_for_timeout(800);R['next']=pg.evaluate("()=>[mode,level]")
    # boss 180
    pg.evaluate("()=>{mode='menu';for(let i=161;i<=179;i++)if(!Progress.getState().cleared.includes(i))Progress.rewardStage(i);}")
    pg.evaluate("()=>{try{Hangar41.close()}catch{};Lobby.hide();document.getElementById('gamemode').value='campaign';Ch9.ensureOptions();document.getElementById('mission-select').value='180';reset();endlessWave=Waves30.total();}")
    for i in range(30):
        pg.wait_for_timeout(500)
        if pg.evaluate("()=>!!(boss&&boss.bossHealthReady)"):break
    pg.evaluate("()=>{window.__bf=.95;setInterval(()=>{if(boss&&boss.bossHealthReady&&window.__bf>0){boss.coreHp=Math.max(boss.coreHp,boss.coreMax*window.__bf);for(const q of boss.parts)if(!q.dead)q.hp=Math.max(q.hp,q.max*window.__bf);boss.hp=Math.max(boss.hp,boss.max*window.__bf);}},30)}")
    print('dbg',json.dumps(R,ensure_ascii=False),flush=True);R['boss180']=pg.evaluate("()=>[level,!!boss&&boss.ch9,boss&&Math.round(boss.max),boss&&boss.parts.map(p=>[Math.round(p.x-boss.x),p.hitW])]")
    print('b180',R['boss180'],flush=True)
    for k in range(5):
        pg.wait_for_timeout(500);print(pg.evaluate("()=>[mode,!!boss,boss&&+(boss.hp/boss.max).toFixed(2),boss&&boss.coreHp,level]"),flush=True)
    pg.screenshot(path='/tmp/claude-0/t67_boss180.png')
    pg.evaluate("()=>{window.__bf=.5;boss.coreHp=boss.coreMax*.5;for(const q of boss.parts)q.hp=q.max*.5;boss.hp=boss.max*.5;}");pg.wait_for_timeout(9000);R['ph2']=pg.evaluate("()=>Ch9.state()");pg.screenshot(path='/tmp/claude-0/t67_boss180_p2.png')
    pg.evaluate("()=>{window.__bf=.25;boss.coreHp=boss.coreMax*.25;for(const q of boss.parts)q.hp=q.max*.25;boss.hp=boss.max*.25;}");pg.wait_for_timeout(5000);R['ph3']=pg.evaluate("()=>[Ch9.state(),!!boss.rage67]");pg.screenshot(path='/tmp/claude-0/t67_boss180_p3.png')
    # Nguyệt Thực E1
    pg.evaluate("()=>{window.__bf=0;mode='menu';}");pg.wait_for_timeout(300)
    pg.evaluate("()=>{try{Hangar41.open&&Hangar41.open()}catch{};Eclipse67.launch(1);setInterval(()=>{if(mode==='play'){hp=maxHp;}},60)}");pg.wait_for_timeout(3000)
    R['ecl']=pg.evaluate("()=>[mode,level,Eclipse67.active(),Combat.stageRequirement(level),Bullet66.cur().burst,Bullet66.cur().cap,+Bullet66.cur().dmg.toFixed(2)]")
    pg.wait_for_timeout(5000);pg.screenshot(path='/tmp/claude-0/t67_ecl.png')
    pg.evaluate("()=>{window.__c0=Progress.balance();window.__cl=Progress.getState().cleared.length;finishStage36(false);}");pg.wait_for_timeout(600)
    R['eclwin']=pg.evaluate("()=>[Eclipse67.state().cleared,Eclipse67.state().stars,Progress.balance()-window.__c0,Progress.getState().cleared.length-window.__cl]")
    R['errs']=errs;b.close()
print(json.dumps(R,ensure_ascii=False))
