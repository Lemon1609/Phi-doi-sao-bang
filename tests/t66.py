import sys,json
from playwright.sync_api import sync_playwright
f=sys.argv[1];seed=open('tests/seed_full.js').read();R={}
with sync_playwright() as p:
    b=p.chromium.launch()
    def ctx(init=''):
        c=b.new_context(viewport={'width':390,'height':844},is_mobile=True,has_touch=True,device_scale_factor=1);c.add_init_script(seed)
        if init:c.add_init_script(init)
        pg=c.new_page();errs=[];pg.on('pageerror',lambda e:errs.append(str(e)));pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(2800);return c,pg,errs
    c,pg,errs=ctx()
    R['boot_gone']=pg.evaluate("()=>!document.getElementById('boot66')")
    # 1) cổng xuất hiện tự nhiên ở ải 3 (dọn quái nhanh)
    pg.evaluate("()=>{document.getElementById('mission-select').value='3';Lobby.hide();reset();window.__k=setInterval(()=>{if(mode==='play'){hp=maxHp;bullets.length=0;if(!Gate66.gates().length)for(const e of enemies)if(!e.dead&&e!==boss&&e.y>0)kill(e);}},120)}")
    log=[]
    for i in range(80):
        pg.wait_for_timeout(500)
        st=pg.evaluate("()=>({w:Waves30.state().wave,tot:Waves30.total(),g:Gate66.gates().map(g=>[g.k,Math.round(g.y)]),c:Gate66.cores(),boss:!!boss,rest:+endlessRest.toFixed(2),lv:level})")
        log.append(st)
        if st['g'] and len(st['c'])==0:
            pg.screenshot(path='shots/v66_gate.png')
            pg.evaluate("()=>{const g=Gate66.gates()[0];player.x=g.x;player.y=g.y+10;}")
        if st['g'] and len(st['c'])==1:
            pg.evaluate("()=>{const g=Gate66.gates()[1];player.x=g.x;player.y=g.y;}")  # chạm phải ở lần 2
        if st['boss'] or len(st['c'])>=2 and i>30:break
    R['log']=[l for k,l in enumerate(log) if k%3==0 or l['g']][:40]
    R['cores']=pg.evaluate("()=>Gate66.cores()");pg.wait_for_timeout(600);pg.screenshot(path='shots/v66_pills.png')
    pg.evaluate("()=>clearInterval(window.__k)");R['errs1']=errs;c.close()
    # 2) từng lõi
    c,pg,errs=ctx()
    pg.evaluate("()=>{document.getElementById('mission-select').value='4';Lobby.hide();reset();setInterval(()=>{if(mode==='play'){hp=maxHp;}},100)}");pg.wait_for_timeout(800)
    E={}
    E['focus']=pg.evaluate("""async()=>{const sample=()=>{const m=shots.filter(s=>s.main66&&!s.dead&&s.age<.3);return m.length?[m.length,+(m.reduce((a,s)=>a+s.damage,0)/m.length).toFixed(3),+Math.max(...m.map(s=>Math.abs(s.vx))).toFixed(1)]:null};
      await new Promise(r=>setTimeout(r,300));const a=sample();Gate66._give('FOCUS_BEAM');await new Promise(r=>setTimeout(r,700));const b=sample();return {before:a,after:b};}""")
    E['berserk']=pg.evaluate("()=>{Gate66._give('BERSERK');superTime=0;activateSuper();return [+superTime.toFixed(2),Gate66.rate()]}")
    E['nova']=pg.evaluate("()=>{superTime=0;Gate66._give('NOVA_SHIELD');shield=1;invuln=0;bulletShieldTime=0;for(let i=0;i<20;i++)bullets.push({x:player.x+60,y:player.y-20,vx:0,vy:0,r:5,type:'orb',age:0});const n0=bullets.length;const e={x:player.x,y:player.y-90,hp:999,dead:false,type:0,v:0,age:0};enemies.push(e);damage('collision');return {n0,n1:bullets.length,enemyHpLost:+(999-e.hp).toFixed(2)}}")
    E['vamp']=pg.evaluate("()=>{Gate66._give('VAMP_GRAZE');shield=0;invuln=0;bulletShieldTime=0;const c0=Combat26.state().charge;Combat26.graze({x:player.x+12,y:player.y,r:3,dead:false},12);return {dCharge:Combat26.state().charge-c0,shield:+shield.toFixed(3),max:maxShield}}")
    E['greed']=pg.evaluate("()=>{Gate66._give('GREED_CORE');const c0=runCredits;const e={x:200,y:200,hp:1,dead:false,type:0};enemies.push(e);kill(e);return {gain:runCredits-c0}}")
    E['twin']=pg.evaluate("()=>{Gate66._give('TWIN_MISSILE');return [Gate66.misRate(),Gate66.misExtra(),(gear.equipment||[]).map(i=>i.kind)]}")
    E['ric']=pg.evaluate("""async()=>{Gate66._give('RICOCHET');Gate66._give('CRYO_ROUND');for(const e of enemies)e.dead=true;player.x=240;player.y=H*.8;
       const mk=x=>{addEnemy({x,y:250,v:0,type:0,large:false,elite:false,guard:0,hp:5000,fire:99,age:0,phase:0,dead:false});return enemies.at(-1);};const a=mk(240),bb=mk(340);const a0=a.hp,b0=bb.hp;
       await new Promise(r=>setTimeout(r,1500));return {a:+(a0-a.hp).toFixed(1),b:+(b0-bb.hp).toFixed(1),frozen:+(a.frozen||0).toFixed(2),cryo:a.cryo66>time,bx:Math.round(bb.x),by:Math.round(bb.y)}}""")
    E['focus2']=pg.evaluate("""async()=>{const m=()=>{const x=shots.filter(s=>s.main66&&!s.dead&&s.age<.3);return [x.length,+(x.reduce((a,s)=>a+s.damage,0)/Math.max(1,x.length)).toFixed(3),+(Math.max(0,...x.map(s=>Math.abs(s.x-player.x)))).toFixed(1)]};return m();}""")
    E['cores']=pg.evaluate("()=>Gate66.cores()")
    pg.screenshot(path='shots/v66_cores.png')
    R['E']=E;R['errs2']=errs;c.close()
    # 3) B2: phá cánh boss → choáng, bom −50% lên cánh
    c,pg,errs=ctx()
    pg.evaluate("()=>{document.getElementById('mission-select').value='10';Lobby.hide();reset();setInterval(()=>{if(mode==='play'){hp=maxHp;}},100)}");pg.wait_for_timeout(500)
    pg.evaluate("()=>{endlessWave=Waves30.total();}");
    for i in range(30):
        pg.wait_for_timeout(500)
        if pg.evaluate("()=>!!(boss&&boss.bossHealthReady&&boss.parts&&boss.parts.length)"):break
    B={}
    B['parts']=pg.evaluate("()=>boss?boss.parts.map(p=>[+p.hp.toFixed(1),p.max]):null")
    B['bomb']=pg.evaluate("()=>{const h0=boss.parts.map(p=>p.hp);damageBoss(20,'bomb',null);return boss.parts.map((p,i)=>+(h0[i]-p.hp).toFixed(2))}")
    B['bomb_ref']=pg.evaluate("()=>{const h0=boss.parts.map(p=>p.hp);damageBoss(20,'gear',boss.parts[0]);return +(h0[0]-boss.parts[0].hp).toFixed(2)}")
    pg.evaluate("()=>{const p=boss.parts[0];damageBoss(p.hp+50,'gear',p);}");pg.wait_for_timeout(250)
    B['stun']=pg.evaluate("()=>[+(boss.stun66||0).toFixed(2),boss.parts[0].dead]")
    n0=pg.evaluate("()=>{bullets.length=0;return 0}");pg.wait_for_timeout(1500)
    B['bullets_during_stun']=pg.evaluate("()=>bullets.filter(b=>!b.turret).length")
    pg.screenshot(path='shots/v66_stun.png')
    B['stun_cnt']=[]
    for k in range(8):
        pg.wait_for_timeout(700);B['stun_cnt'].append(pg.evaluate("()=>[+(boss&&boss.stun66||0).toFixed(1),bullets.length,beams.length,mode,!!boss,boss?Math.round(boss.fire*10)/10:null]"))
    R['B']=B;R['errs3']=errs;c.close()
    # 4) người mới: khóa nút; người cũ: mở
    c,pg,errs=ctx("localStorage.clear();")
    pg.wait_for_timeout(1500)
    R['fresh']=pg.evaluate("()=>{const L=[...document.querySelectorAll('.lk66')].map(b=>b.dataset.lk66);return {cleared:Onboard66.cleared(),locked:[...new Set(L)],n:L.length,tower:Meta40.towerPanel(),gems:UI392.showTab('gems'),sss:Gear44.open('armor'),g44:!document.getElementById('g44')||document.getElementById('g44').hidden}}")
    pg.screenshot(path='shots/v66_fresh.png')
    pg.evaluate("()=>{localStorage.setItem('saobang-assist-v48',JSON.stringify({stage:10,fails:2}));}")
    R['stall']=pg.evaluate("()=>{const st=JSON.parse(localStorage.getItem('saobang-campaign-v36')||'null');return 0}")
    R['errs4']=errs;c.close()
    c,pg,errs=ctx("localStorage.setItem('saobang-backup-remind-v66','1');")
    pg.wait_for_timeout(1000)
    R['vet']=pg.evaluate("()=>{const r=document.getElementById('hgr41');return {cleared:Onboard66.cleared(),locked:r?r.querySelectorAll('.lk66').length:null,remind:!!(r&&r.querySelector('.rm66'))}}")
    R['errs5']=errs;c.close();b.close()
print(json.dumps(R,ensure_ascii=False))
