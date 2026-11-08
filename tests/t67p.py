import sys,json
from playwright.sync_api import sync_playwright
f=sys.argv[1];R={}
with sync_playwright() as p:
    b=p.chromium.launch();c=b.new_context(viewport={'width':390,'height':844},device_scale_factor=2)
    pg=c.new_page();errs=[];pg.on('pageerror',lambda e:errs.append(str(e)));pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(3000)
    R['fresh']=pg.evaluate("()=>[Onboard66.open('pilot'),Object.keys(Pilot67.state().own)]")
    pg.evaluate("()=>{Gfx66.open()}");pg.fill('#st66-code','SAOBANG-ADMIN-2026');pg.click('[data-adm]');pg.click('[data-adm]');pg.wait_for_timeout(7000)
    R['adm']=pg.evaluate("()=>{const cp0=Combat.stats().cp;for(let i=2;i<=8;i++)Pilot67.recruit(i);const st=Pilot67.state();return {open:Onboard66.open('pilot'),own:Object.keys(st.own),team:st.team,cp0}}")
    R['lv']=pg.evaluate("()=>{const out=[];for(let k=0;k<12;k++)out.push(Pilot67.levelUp(8));return [out.join('|'),Pilot67.state().own[8]]}")
    R['tree']=pg.evaluate("()=>{const o=[];for(let k=0;k<6;k++)o.push(Pilot67.treeUp(1));o.push(Pilot67.treeUp(4));return o}")
    R['team']=pg.evaluate("()=>{Pilot67.setSlot(0,8);return [Pilot67.state().team,Pilot67.teamStats(),Combat.stats().cp]}")
    pg.evaluate("()=>{document.getElementById('tutorial392')?.remove();Pilot67.open()}");pg.wait_for_timeout(400);pg.screenshot(path='/tmp/claude-0/t67p_panel.png')
    pg.evaluate("()=>{document.querySelector('.pl67 [data-x=\"tab\"][data-v=\"tree\"]').click()}");pg.wait_for_timeout(300);pg.screenshot(path='/tmp/claude-0/t67p_tree.png')
    pg.evaluate("()=>{Pilot67.close();document.getElementById('mission-select').value='60';Lobby.hide();reset();}");pg.wait_for_timeout(1500)
    R['play']=pg.evaluate("()=>[mode,maxHp,maxShield,+Pilot67.atkMult().toFixed(3),Pilot67.main()]")
    pg.wait_for_timeout(1500);pg.screenshot(path='/tmp/claude-0/t67p_play.png')
    R['super']=pg.evaluate("()=>{superTime=0;activateSuper();return +superTime.toFixed(1)}")
    R['errs']=errs;b.close()
print(json.dumps(R,ensure_ascii=False))
