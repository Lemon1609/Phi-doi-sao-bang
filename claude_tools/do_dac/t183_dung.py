# V183 · dò tranh nào THỰC SỰ được vẽ/hiện (drawImage + <img>/CSS nền) qua sảnh, kho, trận thường, Bạo Tẩu, tàu +5
import sys,json,re,hashlib
from playwright.sync_api import sync_playwright
f=sys.argv[1]
with sync_playwright() as p:
    b=p.chromium.launch();pg=b.new_page(viewport={'width':412,'height':860});pg.set_default_timeout(240000)
    pg.add_init_script("""window.__u=new Set();const k=s=>s&&s.length>200?s.length+':'+s.slice(-48):null;const o=CanvasRenderingContext2D.prototype.drawImage;CanvasRenderingContext2D.prototype.drawImage=function(im,...a){try{const x=k(im&&im.src);if(x)window.__u.add(x);}catch{}return o.call(this,im,...a)};
      setInterval(()=>{try{for(const e of document.querySelectorAll('img'))if(e.offsetParent){const x=k(e.src);if(x)window.__u.add(x);}for(const e of document.querySelectorAll('*')){if(!e.offsetParent)continue;const bg=getComputedStyle(e).backgroundImage;if(bg&&bg.length>200){for(const m of bg.matchAll(/url\\(\"?(data:[^\")]+)/g)){const x=k(m[1]);if(x)window.__u.add(x);}}}}catch{}},1500);""")
    pg.goto('file://'+f+'?nopop',timeout=240000);pg.wait_for_timeout(3000)
    pg.evaluate("()=>{Gfx66.open()}");pg.fill('#st66-code','SAOBANG-ADMIN-2026');pg.click('[data-adm]');pg.click('[data-adm]');pg.wait_for_timeout(12000)
    keys=lambda name:pg.evaluate("(n)=>{const A=window[n]||eval(n);const o={};for(const k in A){const s=A[k];if(typeof s==='string'&&s.length>200)o[k]=s.length+':'+s.slice(-48);}return o}",name)
    def battle(st,ship,sup):
        pg.evaluate("""([st,ship])=>{document.querySelectorAll('.adv70,.st71,.u72,.m63,#g44,#st66').forEach(e=>e.hidden=true);document.getElementById('tutorial392')?.remove();mode='menu';try{Lobby.show()}catch{};
          try{selected=ship}catch{};document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value=String(st);Lobby.hide();reset();if(mode==='pause')mode='play';invuln=1e9;}""",[st,ship])
        pg.wait_for_timeout(5000)
        if sup:pg.evaluate("()=>{superTime=5}");pg.wait_for_timeout(4000)
    # sảnh + các tab nav
    pg.evaluate("()=>{document.querySelectorAll('.adv70,.st71,.u72,.m63,#g44,#st66').forEach(e=>e.hidden=true);mode='menu';try{Lobby.show()}catch{}}");pg.wait_for_timeout(2500)
    for sel in ['#nav74 [data-go]']:
        n=pg.evaluate("(s)=>document.querySelectorAll(s).length",sel)
        for i in range(n):
            pg.evaluate("([s,i])=>{const e=document.querySelectorAll(s)[i];e&&e.click()}",[sel,i]);pg.wait_for_timeout(2500)
    for ship in range(0,13):battle(1+ship*7,ship,ship%2==0)
    used=set(pg.evaluate("()=>[...window.__u]"))
    for name in ['EVO53_ART','SHIP118','CANH132_ART','TIER69_ART','BOSS82_ART']:
        try:
            ks=keys(name)
        except Exception as e:
            print(name,'loi',str(e)[:80]);continue
        if name=='SHIP118':
            ks={}
            ks=pg.evaluate("()=>{const o={};for(const i in SHIP118)for(const f in SHIP118[i]){const s=SHIP118[i][f];if(s.length>200)o[i+'/'+f]=s.length+':'+s.slice(-48)}return o}")
        u=[k for k,v in ks.items() if v in used];nu=[k for k,v in ks.items() if v not in used]
        print(name,'dung',len(u),'/',len(ks),'| chua thay:',nu[:12])
    print('tong tranh da ve',len(used))
    b.close()
