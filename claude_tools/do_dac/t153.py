import sys,json,os
from playwright.sync_api import sync_playwright
f=sys.argv[1];O=sys.argv[2];os.makedirs(O,exist_ok=True)
with sync_playwright() as p:
    b=p.chromium.launch();errs=[];pg=b.new_page(viewport={'width':412,'height':860});pg.on('pageerror',lambda e:errs.append(str(e)[:300]));pg.set_default_timeout(240000)
    pg.goto('file://'+f+'?nopop',timeout=240000);pg.wait_for_timeout(3000)
    pg.evaluate("()=>{Gfx66.open()}");pg.fill('#st66-code','SAOBANG-ADMIN-2026');pg.click('[data-adm]');pg.click('[data-adm]');pg.wait_for_timeout(15000)
    pg.wait_for_function("()=>typeof Trade67!=='undefined'&&typeof Lobby!=='undefined'",timeout=240000);pg.wait_for_timeout(4000)
    for k,(bul,frm,bom) in enumerate([('bul_crimson','frm_wings','bom_firework'),('bul_frost','frm_cobalt','bom_shatter'),('bul_emerald','frm_thunder','bom_plasma'),('bul_rainbow','frm_cyber','bom_pixel'),('bul_void','frm_nebula','bom_blackhole'),('bul_gold','frm_amber','bom_supernova')]):
        pg.evaluate("""(a)=>{document.querySelectorAll('.adv70,.st71,.u72,.m63').forEach(e=>e.hidden=true);document.getElementById('tutorial392')?.remove();mode='menu';try{Lobby.show()}catch{};
          for(const id of a){Trade67._own(id);const st=Trade67.state();if(st.equip[id.slice(0,3)]!==id)Trade67.equip(id);}
          document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value='30';Lobby.hide();reset();if(mode==='pause')mode='play';
          if(!window.__iv)window.__iv=setInterval(()=>{try{invuln=999;hp=maxHp;}catch{}},200);}""",[bul,frm,bom])
        pg.wait_for_timeout(4500)
        if k%2==0:
            pg.evaluate("()=>{try{bombs=Math.max(bombs,2);bomb();}catch{}}");pg.wait_for_timeout(250)
        pg.screenshot(path=f'{O}/skin_{k+1}.png')
        print(k+1,pg.evaluate("()=>Trade67.state().equip"),flush=True)
    pg.evaluate("()=>{mode='menu';try{Lobby.show()}catch{};document.querySelectorAll('.adv70,.st71,.u72,.m63').forEach(e=>e.hidden=true);}")
    pg.wait_for_timeout(500)
    for nm,js in [('skin',"()=>{Trade67.open('skins')}"),('cho',"()=>{Trade67.open()}")]:
        try:pg.evaluate(js);pg.wait_for_timeout(1500);pg.screenshot(path=f'{O}/ui_{nm}.png');pg.evaluate("()=>{try{Trade67.close()}catch{}}")
        except Exception as e:print('ui',nm,str(e)[:100])
    print('ERRS',errs[:6]);b.close()
