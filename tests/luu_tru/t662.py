import sys,json
from playwright.sync_api import sync_playwright
f=sys.argv[1];R={}
with sync_playwright() as p:
    b=p.chromium.launch();c=b.new_context(viewport={'width':390,'height':844},is_mobile=True,has_touch=True)
    pg=c.new_page();errs=[];pg.on('pageerror',lambda e:errs.append(str(e)));pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(3500)
    R['before']=pg.evaluate("()=>[Onboard66.cleared(),Progress.balance(),Workshop.expBalance()]")
    pg.evaluate("()=>{document.getElementById('tutorial392')?.remove();Gfx66.open()}");pg.wait_for_timeout(300)
    pg.fill('#st66-code','sai-ma');pg.click('[data-adm]');R['wrong']=pg.inner_text('#st66-adm')
    pg.fill('#st66-code','saobang-admin-2026');pg.click('[data-adm]');R['warn']=pg.inner_text('#st66-adm');pg.screenshot(path='shots/v662_code.png')
    pg.click('[data-adm]')
    pg.wait_for_timeout(6000)
    R['after']=pg.evaluate("""()=>{const P=Progress.getState(),C=Campaign36.getState();return {cleared:Onboard66.cleared(),credits:Progress.balance(),exp:Workshop.expBalance(),stars3:Object.values(C.stars).filter(v=>v===3).length,crafts:C.crafts.length,models:C.models.length,
      items:P.items.length,sample:P.items.slice(0,2).map(i=>[i.variant,i.level,i.enhance,i.grade]),craft0:Workshop.craftProgress(0),sss:Object.keys(Gear44.state().owned).length,sssEnh:Gear44.sssEnh('sss_aegis_mirror'),active:Gear44.activeId('armor'),
      robots:Fusion.getState().supers.length,gems:Object.values(Gems.getState().fragments).reduce((a,b)=>a+b,0),cores:JSON.parse(localStorage.getItem('saobang-meta-v407')).cores,locked:document.querySelectorAll('.lk66').length,adm:Admin66.state(),cp:Combat.stats().cp}}""")
    pg.evaluate("()=>Progress.spendCredits(80000000)");pg.wait_for_timeout(2600);R['topup']=pg.evaluate("()=>Progress.balance()")
    pg.screenshot(path='shots/v662_after.png')
    pg.evaluate("()=>{document.getElementById('mission-select').value='160';Lobby.hide();reset();}");pg.wait_for_timeout(1500);R['play160']=pg.evaluate("()=>[mode,level]")
    R['errs']=errs;b.close()
print(json.dumps(R,ensure_ascii=False))
