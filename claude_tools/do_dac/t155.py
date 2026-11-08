import sys,os,base64
from playwright.sync_api import sync_playwright
f=sys.argv[1];O=sys.argv[2];st=sys.argv[3];os.makedirs(O,exist_ok=True)
with sync_playwright() as p:
    b=p.chromium.launch()
    for neb in ['false','true']:
        pg=b.new_page(viewport={'width':412,'height':860});pg.set_default_timeout(240000)
        pg.add_init_script('window.NEB155='+neb)
        pg.goto('file://'+f+'?nopop',timeout=240000);pg.wait_for_timeout(3000)
        pg.evaluate("()=>{Gfx66.open()}");pg.fill('#st66-code','SAOBANG-ADMIN-2026');pg.click('[data-adm]');pg.click('[data-adm]');pg.wait_for_timeout(15000)
        pg.wait_for_function("()=>typeof Lobby!=='undefined'",timeout=240000);pg.wait_for_timeout(3000)
        pg.evaluate("""(st)=>{const P=CanvasRenderingContext2D.prototype,od=P.drawImage;window.__far=null;P.drawImage=function(im,...a){try{if(!window.__far&&im&&im.tagName==='CANVAS'&&a.length===8&&im.height>im.width*1.5&&im.width>=400)window.__far=im.toDataURL('image/png');}catch{}return od.call(this,im,...a);};
          window.RULE84=false;window.TITLE84=false;document.querySelectorAll('.adv70,.st71,.u72,.m63').forEach(e=>e.hidden=true);document.getElementById('tutorial392')?.remove();try{Fusion.select(null)}catch{};document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value=st;Lobby.hide();reset();if(mode==='pause')mode='play';}""",st)
        pg.wait_for_timeout(3000)
        u=pg.evaluate("()=>window.__far")
        if u:open(f'{O}/far_{neb}.png','wb').write(base64.b64decode(u.split(',')[1]));print(neb,'ok')
        else:print(neb,'khong bat duoc')
        pg.close()
    b.close()
