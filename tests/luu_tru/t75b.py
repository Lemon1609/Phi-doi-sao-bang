import sys,json,os
from playwright.sync_api import sync_playwright
f=sys.argv[1];R={};O='/tmp/claude-0/t75b/';os.makedirs(O,exist_ok=True)
CL="()=>{document.getElementById('tutorial392')?.remove();document.querySelectorAll('.adv70,.st71,.u72,#g74').forEach(e=>e.hidden=true)}"
with sync_playwright() as p:
    b=p.chromium.launch();errs=[]
    c=b.new_context(viewport={'width':412,'height':1012},device_scale_factor=2);pg=c.new_page();pg.on('pageerror',lambda e:errs.append(str(e)));pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(3000)
    pg.add_style_tag(content='#g74{display:none!important}')
    pg.evaluate("()=>{Gfx66.open()}");pg.fill('#st66-code','SAOBANG-ADMIN-2026');pg.click('[data-adm]');pg.click('[data-adm]');pg.wait_for_timeout(8000);pg.evaluate(CL)
    # wheel
    R['wheel']=pg.evaluate("""()=>{Econ74.add(5000,'t');const g0=Econ74.gems();const fl=Econ74.freeLeft();for(let i=0;i<fl;i++)Econ74.spin(1);const g1=Econ74.gems();const r=[];for(let i=0;i<5;i++){const a=Econ74.gems();Econ74.spin(1);r.push(a-Econ74.gems());}return [fl,g0-g1,r,Econ74.spin(10)]}""")
    # energy
    R['en']=pg.evaluate("""()=>{const st=V75.state?V75.state():null;return [PLAN75.ENERGY.REGEN_MIN,PLAN75.ENERGY.REPLAY_COST,PLAN75.ENERGY.BOSS_COST,PLAN75.ENERGY.SWEEP_COST]}""")
    R['oc2']=pg.evaluate("""()=>{mode='menu';const id=Gear44.activeId('missiles')||'sss_rail_disc';const k=GEAR_FX.byId[id]?.kind||'missiles';const m0=Gear44.dmgMult(k);Progress.grantCredits(500000);const r=[];for(let i=0;i<30;i++)r.push(OC75.refine(id));return [id,k,+m0.toFixed(4),+Gear44.dmgMult(k).toFixed(4),OC75.state(),r.filter(Boolean).length,typeof Progress.balance,Econ74.gems(),Gear44.sssEnh(id),Progress.balance()]}""")
    pg.evaluate("()=>OC75.open()");pg.wait_for_timeout(400);pg.screenshot(path=O+'oc75.png')
    pg.evaluate("()=>{document.querySelector('.oc75p').hidden=true;Econ74.wheel()}");pg.wait_for_timeout(400);pg.screenshot(path=O+'wheel.png')
    def replay(n):
        pg.evaluate("()=>{mode='menu';try{Lobby.show()}catch{}}")
        return pg.evaluate("(n)=>{V75.addEn(200,'t');const e0=V75.energy();document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value=String(n);Lobby.hide();reset();return [mode,Progress.getState().cleared.includes(n),Math.round((e0-V75.energy())*10)/10]}",n)
    R['rp41']=replay(41);R['rp45']=replay(45)
    # O78 rewards
    R['o78']=pg.evaluate("()=>[JSON.stringify(OVERLIMIT_BOSS_V78.REWARD_FIRST(1)),JSON.stringify(OVERLIMIT_BOSS_V78.REWARD_WEEK(9)),O78.state?O78.state().life:'?']")
    # BM
    R['bm']=pg.evaluate("()=>document.getElementById('trade67-js')?1:0")
    # OC75
    R['oc']=pg.evaluate("""()=>{let o={};try{o=Gear44.state().owned}catch{};const ids=Object.keys(o);const L=ids.filter(id=>GEAR_FX.byId[id]);const id=L[0];const d=id?GEAR_FX.byId[id]:null;
      return [ids.length,id,d&&d.tier,id?Gear44.sssEnh(id):null,OC75.mult(id||'x')]}""")
    R['errs']=errs;b.close()
print(json.dumps(R,ensure_ascii=False))
