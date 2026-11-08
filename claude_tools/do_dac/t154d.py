import sys,os,json
from playwright.sync_api import sync_playwright
f=sys.argv[1];O=sys.argv[2];st=sys.argv[3] if len(sys.argv)>3 else '12';os.makedirs(O,exist_ok=True)
with sync_playwright() as p:
    b=p.chromium.launch();errs=[];pg=b.new_page(viewport={'width':412,'height':860});pg.on('pageerror',lambda e:errs.append(str(e)[:200]));pg.set_default_timeout(240000)
    pg.goto('file://'+f+'?nopop',timeout=240000);pg.wait_for_timeout(3000)
    pg.evaluate("()=>{Gfx66.open()}");pg.fill('#st66-code','SAOBANG-ADMIN-2026');pg.click('[data-adm]');pg.click('[data-adm]');pg.wait_for_timeout(15000)
    pg.wait_for_function("()=>typeof Lobby!=='undefined'&&typeof Fusion!=='undefined'",timeout=240000);pg.wait_for_timeout(4000)
    pg.evaluate("()=>{try{Fusion.select(null)}catch{};try{SSS87._set({done:{},off:{}})}catch{}}")
    pg.evaluate("(st)=>{window.RULE84=false;window.TITLE84=false;try{Ch9.open=()=>true}catch{};document.querySelectorAll('.adv70,.st71,.u72,.m63').forEach(e=>e.hidden=true);try{mode='menu';Lobby.show()}catch{};document.getElementById('tutorial392')?.remove();Progress.setLocked(false);document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value=st;Lobby.hide();reset();if(mode==='pause')mode='play';setInterval(()=>{try{invuln=999;hp=maxHp;for(const b of document.querySelectorAll('.sk80 button,.story80 button,[data-skip]'))b.click();}catch{}},400)}",st)
    pg.wait_for_timeout(3000)
    pg.evaluate('''()=>{clearInterval(1);for(let k=1;k<9999;k++)clearInterval(k);const cv=[...document.querySelectorAll('canvas')].sort((a,b)=>b.width*b.height-a.width*a.height)[0];const sm=document.createElement('canvas');sm.width=48;sm.height=96;const g=sm.getContext('2d',{willReadFrequently:true});
      window.__m=()=>{g.drawImage(cv,0,0,48,96);const d=g.getImageData(0,0,48,96).data;let s=0,w=0;for(let i=0;i<d.length;i+=4){const l=(.299*d[i]+.587*d[i+1]+.114*d[i+2]);s+=l;if(l>200)w++;}return [Math.round(s/(48*96)),Math.round(w/(48*96)*100)];};
      window.__peak=(ms)=>new Promise(r=>{const t0=performance.now();let pk=[0,0],n=0,sum=0;function f(){const m=window.__m();n++;sum+=m[0];if(m[0]>pk[0])pk=m;if(performance.now()-t0<ms)requestAnimationFrame(f);else r({dinh_sang:pk[0],dinh_pct_trang:pk[1],tb:Math.round(sum/n)});}requestAnimationFrame(f);});}''')
    EV=[('nen',"()=>{}"),('trung_don',"()=>{invuln=0;bulletShieldTime=0;shield=0;hp=maxHp;damage('bullet');}"),
        ('vo_khien',"()=>{invuln=0;bulletShieldTime=0;shield=1;hp=maxHp;damage('bullet');}"),
        ('bom_khong_skin',"()=>{try{Trade67.equip(Trade67.state().equip.bom)}catch{};bombs=3;bomb();}"),
        ('bao_tau',"()=>{activateSuper();}"),
        ('bom_skin_supernova',"()=>{Trade67._own('bom_supernova');if(Trade67.state().equip.bom!=='bom_supernova')Trade67.equip('bom_supernova');bombs=3;bomb();}"),
        ('bom_skin_blackhole',"()=>{Trade67._own('bom_blackhole');if(Trade67.state().equip.bom!=='bom_blackhole')Trade67.equip('bom_blackhole');bombs=3;bomb();}")]
    for nm,js in EV:
        pg.wait_for_timeout(2500);pg.evaluate("()=>{hp=maxHp;}")
        pg.evaluate(js)
        r=pg.evaluate("()=>window.__peak(1200)");print(nm,r,flush=True)
        pg.screenshot(path=f'{O}/ev_{nm}.png')
    print('ERRS',errs[:4]);b.close()
