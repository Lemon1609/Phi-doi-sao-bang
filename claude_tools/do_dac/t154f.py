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
    pg.wait_for_timeout(2500)
    r=pg.evaluate('''()=>new Promise(res=>{const P=CanvasRenderingContext2D.prototype,od=P.drawImage,fr=P.fillRect,seen={};
      P.drawImage=function(im,...a){try{const w=a.length>=8?a[6]:a.length>=4?a[2]:(im.width||0),h=a.length>=8?a[7]:a.length>=4?a[3]:(im.height||0);if(w*h>W*H*.25&&this.canvas.width>300){const st=(new Error().stack||'').split('\\n').slice(2,5).map(x=>x.trim().slice(0,90)).join(' | ');const k='IMG '+Math.round(w)+'x'+Math.round(h)+' a='+this.globalAlpha.toFixed(2)+' op='+this.globalCompositeOperation+' :: '+st;seen[k]=(seen[k]||0)+1;}}catch{}return od.call(this,im,...a);};
      P.fillRect=function(x,y,w,h){try{if(w*h>W*H*.25&&this.canvas.width>300){const st=(new Error().stack||'').split('\\n').slice(2,4).map(x=>x.trim().slice(0,90)).join(' | ');const fs=typeof this.fillStyle==='string'?this.fillStyle:'grad';const k='RECT a='+this.globalAlpha.toFixed(2)+' '+fs.slice(0,30)+' op='+this.globalCompositeOperation+' :: '+st;seen[k]=(seen[k]||0)+1;}}catch{}return fr.call(this,x,y,w,h);};
      setTimeout(()=>{P.drawImage=od;P.fillRect=fr;res(seen);},3000);})''')
    for k,v in sorted(r.items(),key=lambda x:-x[1]):print(v,k)
    pg.screenshot(path=O+'/bg.png')
    print('ERRS',errs[:4]);b.close()
