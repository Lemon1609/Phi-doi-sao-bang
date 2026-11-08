import sys,json
from playwright.sync_api import sync_playwright
f=sys.argv[1];seed=open('tests/seed_full.js').read()
with sync_playwright() as p:
    b=p.chromium.launch();c=b.new_context(viewport={'width':1600,'height':900});c.add_init_script(seed)
    pg=c.new_page();errs=[];pg.on('pageerror',lambda e:errs.append(str(e)));pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(3500)
    # vẽ bảng: hàng = chiến cơ 0..9, cột = +0,+3,+4,+5 — dùng đúng Evo53.hull của game
    pg.evaluate('()=>{window.__ov=1}');pg.evaluate("""()=>{const cv=document.createElement('canvas');cv.width=4*170;cv.height=10*150;cv.id='evo57';cv.style.cssText='position:fixed;left:0;top:0;z-index:99999;background:#081022';document.body.appendChild(cv);const g=cv.getContext('2d');
      const E=[0,3,4,5];const orig=Workshop.craftProgress;
      for(let id=0;id<10;id++)for(let j=0;j<4;j++){Workshop.craftProgress=i=>({...orig(i),enhance:E[j]});const h=Evo53.hull(id),w=h.naturalWidth/5,hh=h.naturalHeight/4;const k=id+(window.__ov?10:0);g.drawImage(h,k%5*w,Math.floor(k/5)*hh,w,hh,j*170+10,id*150,150,150);}
      Workshop.craftProgress=orig;}""")
    pg.wait_for_timeout(300);import base64;d=pg.evaluate("()=>document.getElementById('evo57').toDataURL('image/png')");open('shots/v58_baotau.png','wb').write(base64.b64decode(d.split(',')[1]));print(errs)
    b.close()
