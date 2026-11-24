# V2.2.1 · KIỂM RÒ RỈ: 6 vòng Sảnh → trận 8 s → về Sảnh; đếm setInterval/setTimeout đang sống, rAF mỗi giây, listener đã thêm,
#  số vòng rAF khác nhau đang chạy (raf_s chỉ để xem: phụ thuộc FPS máy đo), độ dài các mảng trận sau khi về Sảnh. Đạt khi số đo vòng 6 ≈ vòng 2 (không tăng theo số vòng).
import sys,json
from playwright.sync_api import sync_playwright
H=sys.argv[1]
INIT="""(()=>{const I=new Set(),T=new Set();const si=setInterval,ci=clearInterval,st=setTimeout,ct=clearTimeout;
window.setInterval=function(f,d,...a){const id=si(f,d,...a);I.add(id);return id};window.clearInterval=function(id){I.delete(id);return ci(id)};
window.setTimeout=function(f,d,...a){let id;id=st(function(){T.delete(id);return typeof f==='function'?f.apply(this,arguments):undefined},d,...a);T.add(id);return id};window.clearTimeout=function(id){T.delete(id);return ct(id)};
let raf=0,RS=new Set();const r=requestAnimationFrame;window.requestAnimationFrame=function(f){raf++;RS.add(f.name+'|'+String(f).length);return r(f)};window.__rsClr=()=>RS.clear();
let L=0;const ae=EventTarget.prototype.addEventListener,re=EventTarget.prototype.removeEventListener;EventTarget.prototype.addEventListener=function(){L++;return ae.apply(this,arguments)};EventTarget.prototype.removeEventListener=function(){L--;return re.apply(this,arguments)};
window.__ro22=()=>({iv:I.size,to:T.size,raf,L,loops:RS.size});})()"""
with sync_playwright() as p:
  b=p.chromium.launch();pg=b.new_page(viewport={'width':390,'height':844});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:160]))
  pg.add_init_script(INIT);pg.goto('file://'+H+'?nopop');pg.wait_for_timeout(15000)
  pg.evaluate("()=>{document.getElementById('tutorial392')?.remove();document.querySelectorAll('.m63').forEach(e=>e.hidden=true)}")
  rows=[]
  for k in range(6):
    pg.evaluate("()=>{mode='menu';Lobby.show();try{V75.addEn(99)}catch{};document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value='1';Lobby.hide();reset();if(mode==='pause')mode='play';invuln=1e9}")
    pg.wait_for_timeout(8000)
    pg.evaluate("()=>{try{End78.goLobby()}catch(e){mode='menu';Lobby.show()}}");pg.wait_for_timeout(3000)
    a=pg.evaluate("()=>{__rsClr();return __ro22()}");pg.wait_for_timeout(1000);b2=pg.evaluate("()=>__ro22()")
    arr=pg.evaluate("()=>({mode,bul:bullets.length,en:enemies.length,dr:(typeof drops!=='undefined'?drops.length:-1),shots:(typeof shots!=='undefined'?shots.length:-1),dom:document.getElementsByTagName('*').length,heap:Math.round((performance.memory||{}).usedJSHeapSize/1e6)})")
    rows.append(dict(vong=k+1,iv=a['iv'],to=a['to'],raf_s=b2['raf']-a['raf'],loops=b2['loops'],L=a['L'],**arr));print(rows[-1],flush=True)
  r2,r6=rows[1],rows[5]
  ok=lambda k,tol:r6[k]<=r2[k]+tol
  for k,t in [('iv',2),('to',8),('loops',0),('L',30),('dom',60),('bul',5),('dr',5)]:print(('ĐẠT ' if ok(k,t) else 'TRƯỢT ')+k,r2[k],'→',r6[k])
  print('loi',errs[:5]);b.close()
