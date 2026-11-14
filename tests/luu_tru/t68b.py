import sys,json
from playwright.sync_api import sync_playwright
f=sys.argv[1];R={};O='/tmp/claude-0/t68/'
with sync_playwright() as p:
    b=p.chromium.launch();errs=[]
    for adm in (0,1):
        c=b.new_context(viewport={'width':412,'height':1012},device_scale_factor=2)
        pg=c.new_page();pg.on('pageerror',lambda e:errs.append(str(e)));pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(3500)
        if adm:
            pg.evaluate("()=>{Gfx66.open()}");pg.fill('#st66-code','SAOBANG-ADMIN-2026');pg.click('[data-adm]');pg.click('[data-adm]');pg.wait_for_timeout(8000)
        pg.evaluate("()=>{document.getElementById('tutorial392')?.remove()}");pg.wait_for_timeout(800)
        pg.screenshot(path=O+'lob_%d.png'%adm)
        R['lob%d'%adm]=pg.evaluate("()=>({mode:Lobby68.mode(),cls:document.getElementById('hgr41').className,ship:document.getElementById('lb68-ship').textContent,cp:document.getElementById('lb68-cp').textContent,stage:document.getElementById('lb68-stage').textContent,endLock:document.querySelector('#lb68 [data-lb68=endless]').className,pil:document.querySelector('#lb68 [data-lb68=pilot]').className,pn:document.getElementById('lb68-pnm').textContent})")
        pg.click('#lb68 [data-lb68=kho]');pg.wait_for_timeout(700);pg.screenshot(path=O+'kho_%d.png'%adm)
        R['kho%d'%adm]=pg.evaluate("()=>[Lobby68.mode(),getComputedStyle(document.querySelector('#hgr41 .h1-dock')).display,getComputedStyle(document.getElementById('lb68')).display]")
        pg.click('#hgr41 .bk68');pg.wait_for_timeout(400);R['back%d'%adm]=pg.evaluate("()=>Lobby68.mode()")
        # xuất kích chiến dịch
        pg.click('#lb68 [data-lb68=camp]');pg.wait_for_timeout(1500)
        R['camp%d'%adm]=pg.evaluate("()=>[mode,gameMode,level]")
        if adm:
            pg.evaluate("()=>{end(false)}");pg.wait_for_timeout(600);pg.evaluate("()=>{document.getElementById('m40')?.remove();document.getElementById('lobby-back').click()}");pg.wait_for_timeout(900)
            R['ret']=pg.evaluate("()=>[Lobby68.mode(),document.getElementById('hgr41').hidden]")
            pg.click('#lb68 [data-lb68=endless]');pg.wait_for_timeout(1500);R['endless']=pg.evaluate("()=>[mode,gameMode]")
        else:
            pg.evaluate("()=>{end(false)}");pg.wait_for_timeout(600);pg.evaluate("()=>{document.getElementById('m40')?.remove();document.getElementById('lobby-back').click()}");pg.wait_for_timeout(900)
            pg.click('#lb68 [data-lb68=endless]');pg.wait_for_timeout(800);R['endlessLocked']=pg.evaluate("()=>[mode,gameMode]")
        c.close()
    R['errs']=errs;b.close()
print(json.dumps(R,ensure_ascii=False))
