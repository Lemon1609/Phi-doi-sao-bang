import sys,json
from playwright.sync_api import sync_playwright
f=sys.argv[1];R={}
with sync_playwright() as p:
    b=p.chromium.launch();c=b.new_context(viewport={'width':390,'height':844},device_scale_factor=2)
    pg=c.new_page();errs=[];pg.on('pageerror',lambda e:errs.append(str(e)));pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(3000)
    R['fresh']=pg.evaluate("()=>[Onboard66.open('market'),Onboard66.open('skins')]")
    pg.evaluate("()=>{Gfx66.open()}");pg.fill('#st66-code','SAOBANG-ADMIN-2026');pg.click('[data-adm]');pg.click('[data-adm]');pg.wait_for_timeout(7000)
    pg.evaluate("()=>{document.getElementById('tutorial392')?.remove();Gfx66.close()}");pg.wait_for_timeout(300)
    pg.screenshot(path='/tmp/claude-0/t67t_hangar.png')
    R['bm']=pg.evaluate("()=>{Trade67.rollDay();const st=Trade67.state();const out=st.bm.slots.map((s,i)=>[s,Trade67.buySlot(i)]);return out}")
    R['skin']=pg.evaluate("()=>[Trade67.buySkin('bul_crimson'),Trade67.buySkin('frm_amber'),Trade67.buySkin('bul_frost'),Trade67.buySkin('bul_gold'),Trade67.state().owned,Trade67.state().equip]")
    pg.evaluate("()=>Trade67.open('bm')");pg.wait_for_timeout(300);pg.screenshot(path='/tmp/claude-0/t67t_bm.png')
    pg.evaluate("()=>{document.querySelector('.tr67 [data-v=\"skin\"]').click()}");pg.wait_for_timeout(300);pg.screenshot(path='/tmp/claude-0/t67t_skin.png')
    pg.evaluate("()=>{Trade67.close();document.getElementById('mission-select').value='30';Lobby.hide();reset();setInterval(()=>{if(mode==='play')hp=maxHp},60)}");pg.wait_for_timeout(4000);pg.screenshot(path='/tmp/claude-0/t67t_play.png')
    R['pieces']=pg.evaluate("()=>Pilot67.state().pieces")
    R['errs']=errs;b.close()
print(json.dumps(R,ensure_ascii=False))
