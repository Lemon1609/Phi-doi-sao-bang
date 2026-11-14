# V93 · REVIEW93: máu boss 100/120, hệ số bậc S, mốc hạng Vô tận, càn quét 1 chạm, nhận tất cả thành tựu, mũi tên báo nguy
import sys,json
from playwright.sync_api import sync_playwright
f=sys.argv[1];O=sys.argv[2]+'/';OK=[]
def chk(n,c):OK.append(('✓' if c else '✗')+' '+n)
SEED="if(!sessionStorage.getItem('t93')){sessionStorage.setItem('t93','1');const h=JSON.parse(localStorage.getItem('saobang-hangar-v1')||'{}');h.cleared=Array.from({length:119},(_,i)=>i+1);localStorage.setItem('saobang-hangar-v1',JSON.stringify(h));}"
with sync_playwright() as p:
  b=p.chromium.launch();pg=b.new_page(viewport={'width':393,'height':852});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
  pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(2000);pg.add_init_script(SEED);pg.goto('file://'+f+'?nopop');pg.wait_for_function("()=>typeof V93==='object'",timeout=90000);pg.wait_for_timeout(2500)
  pg.evaluate("()=>{document.getElementById('tutorial392')?.remove();document.querySelectorAll('.m63').forEach(e=>e.hidden=true)}")
  d=pg.evaluate("()=>({hp:[100,120,140].map(s=>BOSSHP87[s]),s:S92_DATA.mult,rk:V92.CFG.rank.tiers.map(t=>t.min)})")
  chk('Máu boss 100/120/140 = '+str(d['hp']),d['hp']==[38000,71400,193400])
  chk('Mốc hạng Vô tận = '+str(d['rk']),d['rk']==[0,60000,150000,350000,750000])
  # càn quét 1 chạm
  pg.evaluate("()=>{for(const n of [116,117,118,119])Campaign36.recordStars(n,3);ChapterMap.open()}");pg.wait_for_timeout(1500)
  n=pg.evaluate("()=>document.querySelectorAll('.cm-node .qs93').length");chk('Bản đồ: nút ⚡ trên ải 3★ (%d)'%n,n>=3)
  r=pg.evaluate("()=>{const e0=V75.energy(),c0=Progress.balance(),u0=Campaign36.getState().sweep.used;document.querySelector('.cm-node[data-stage=\"117\"] .qs93').click();return {de:e0-V75.energy(),dc:Progress.balance()-c0,du:Campaign36.getState().sweep.used-u0,sheet:document.getElementById('cm-sheet').classList.contains('open')}}")
  chk('Chạm ⚡: càn quét ngay (−6 🔋, +◈, +1 lượt), không mở bảng ải (%s)'%r,r['de']==6 and r['dc']>0 and r['du']==1 and not r['sheet'])
  pg.wait_for_timeout(400);pg.screenshot(path=O+'map.png')
  # nhận tất cả thành tựu
  pg.evaluate("()=>{ChapterMap.close();Progress.grantCredits(1);Meta40.rewardsPanel('ach')}");pg.wait_for_timeout(1500)
  a=pg.evaluate("()=>{const b=document.querySelector('.aa93');return {has:!!b,txt:b&&b.textContent,ready:document.querySelectorAll('.ach.ok button[data-a]:not([disabled])').length}}")
  chk('Thành tựu có nút NHẬN TẤT CẢ (%s)'%a,a['has'])
  if a['ready']>0:
    pg.evaluate("()=>document.querySelector('.aa93').click()");pg.wait_for_timeout(1200)
    chk('Bấm NHẬN TẤT CẢ: hết mốc chờ nhận',pg.evaluate("()=>document.querySelectorAll('.ach.ok button[data-a]:not([disabled])').length")==0)
  pg.screenshot(path=O+'ach.png')
  # mũi tên báo nguy
  pg.evaluate("()=>{document.querySelectorAll('#m40,.m63').forEach(e=>e.hidden=true);Progress.setLocked(false);try{V75.addEn(99)}catch{};try{Lobby.show()}catch{};selectCraft(0);document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value='20';Lobby.hide();reset();if(mode==='pause')mode='play';setInterval(()=>{try{invuln=999;hp=maxHp;const d=document.getElementById('st80');if(d)d.hidden=true;window.__st80=0;}catch{}},150)}")
  pg.wait_for_timeout(2500)
  t=pg.evaluate("""()=>{let n=0;const o=ctx.fill.bind(ctx);ctx.fill=function(){n++;return o.apply(this,arguments)};addEnemy({type:'scout',x:W*.5,y:-120,vx:0,v:0,hp:500,maxHp:500,r:30,elite:true,age:0});const e=enemies[enemies.length-1];e.y=-120;e.v=0;
      const a=n;V93.arrows();const b2=n;ctx.fill=o;return {calls:b2-a,mode,en:enemies.filter(x=>x.elite&&x.y<0).length}}""")
  chk('Quái tinh anh ngoài màn → vẽ mũi tên (%s)'%t,t['calls']>=1)
  pg.wait_for_timeout(300);pg.screenshot(path=O+'arrow.png')
  chk('không lỗi JS'+(' · '+errs[0][:200] if errs else ''),not errs)
  b.close()
print('\n'.join(OK))
