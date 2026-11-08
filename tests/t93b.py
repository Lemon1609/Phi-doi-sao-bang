# V93 · khung hạng Vô tận (tranh GPT): nhận khi hết mùa hạng Vàng+, đeo quanh ảnh phi công ở Sảnh, hiện trong bảng Mùa giải
import sys
from playwright.sync_api import sync_playwright
f=sys.argv[1];O=sys.argv[2]+'/';OK=[]
def chk(n,c):OK.append(('✓' if c else '✗')+' '+n)
SEED="if(!sessionStorage.getItem('t93b')){sessionStorage.setItem('t93b','1');const h=JSON.parse(localStorage.getItem('saobang-hangar-v1')||'{}');h.cleared=Array.from({length:60},(_,i)=>i+1);localStorage.setItem('saobang-hangar-v1',JSON.stringify(h));}"
with sync_playwright() as p:
  b=p.chromium.launch();pg=b.new_page(viewport={'width':393,'height':852});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
  pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(2000);pg.add_init_script(SEED);pg.goto('file://'+f+'?nopop');pg.wait_for_function("()=>typeof FR93==='object'",timeout=90000);pg.wait_for_timeout(2500)
  pg.evaluate("()=>{document.getElementById('tutorial392')?.remove();document.querySelectorAll('.m63').forEach(e=>e.hidden=true);try{Pilot67._give(1,10);Pilot67.setSlot(0,1)}catch{}}")
  chk('3 tranh khung đã nhúng',pg.evaluate("()=>['gold','platinum','diamond'].every(k=>FR93.img(k).startsWith('data:image/webp'))"))
  r=pg.evaluate("()=>{V92._rank({best:400000,played:1,sid:V92.rank().sid-1});V92.rollSeason();return FR93.state()}")
  chk('Hết mùa hạng Bạch Kim → nhận khung Bạch Kim (%s)'%r,'platinum' in r['own'])
  pg.wait_for_timeout(1800)
  fr=pg.evaluate("()=>{const e=document.querySelector('.fr93');return e?{k:e.dataset.k,w:e.offsetWidth}:null}")
  chk('Sảnh: khung đeo quanh ảnh phi công (%s)'%fr,bool(fr) and fr['k']=='platinum' and fr['w']>40)
  pg.screenshot(path=O+'lobby.png')
  pg.evaluate("()=>{S77.open()}");pg.wait_for_timeout(1500)
  chk('Bảng Mùa giải hiện 3 khung ở mốc hạng',pg.evaluate("()=>document.querySelectorAll('.rk92 img').length")==3);pg.screenshot(path=O+'s77.png')
  chk('không lỗi JS'+(' · '+errs[0][:200] if errs else ''),not errs)
  b.close()
print('\n'.join(OK))
