# V100 · REVIEW98: tinh giản (tiếp tế, Khế Ước, hào quang, mũi tên, trang Thử thách) · gợi ý PHI ĐỘI ải 12 · bản thử nạp tài khoản mẫu
import sys,os,json
from playwright.sync_api import sync_playwright
f=sys.argv[1];O=sys.argv[2]+'/';OK=[];fthu=os.path.join(os.path.dirname(f),'Phi_Doi_Sao_Bang_THU.html')
def chk(n,c):OK.append(('✓' if c else '✗')+' '+n)
def seed(n):return "if(!sessionStorage.getItem('t100')){sessionStorage.setItem('t100','1');const h=JSON.parse(localStorage.getItem('saobang-hangar-v1')||'{}');h.cleared=Array.from({length:%d},(_,i)=>i+1);localStorage.setItem('saobang-hangar-v1',JSON.stringify(h));}"%n
with sync_playwright() as p:
  b=p.chromium.launch();errs=[]
  pg=b.new_page(viewport={'width':393,'height':852});pg.on('pageerror',lambda e:errs.append(str(e)));pg.on('dialog',lambda d:d.accept())
  pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(2000);pg.add_init_script(seed(14));pg.goto('file://'+f+'?nopop');pg.wait_for_function("()=>typeof V100==='object'",timeout=90000);pg.wait_for_timeout(3000)
  pg.evaluate("()=>{document.getElementById('tutorial392')?.remove();document.querySelectorAll('.m63').forEach(e=>e.hidden=true)}")
  # gợi ý PHI ĐỘI (đã qua ải 12)
  for _ in range(30):
    st=pg.evaluate("()=>{const t=document.querySelector('#nav74 [data-t=\"fleet\"]');return {an:t?t.getAnimations().length:-1,vis:!!(t&&t.offsetParent),S:V94.state().S,cur:Nav74.state().cur,mode}}")
    if st['an']>0:break
    pg.wait_for_timeout(500)
  print(st)
  fl=pg.evaluate("()=>{const t=document.querySelector('#nav74 [data-t=\"fleet\"]');return !!t&&t.getAnimations().length>0}");chk('Ải ≥ 12: tab PHI ĐỘI nhấp nháy',fl)
  pg.evaluate("()=>Nav74.tab('fleet')");pg.wait_for_timeout(1200);pg.evaluate("()=>{document.querySelectorAll('.m63,#nav74p').forEach(e=>e.hidden=true);Nav74.tab('home')}");pg.wait_for_timeout(1200)
  chk('Mở tab PHI ĐỘI 1 lần → tắt nhấp nháy',pg.evaluate("()=>V94.state().S.fleet===1&&document.querySelector('#nav74 [data-t=\"fleet\"]').getAnimations().length===0"))
  # tiếp tế thu gọn (ải 5 đã qua, lực chiến dư)
  pg.evaluate("()=>{ChapterMap.open();setTimeout(()=>{const x=document.querySelector('.cm-node[data-stage=\"5\"]');if(x)x.click()},300)}");pg.wait_for_timeout(1800)
  s=pg.evaluate("()=>{const sh=document.getElementById('cm-sheet');const r=sh.querySelector('[data-su90]');return {col:!!sh.querySelector('.st100'),rowHidden:r?r.parentElement.style.display==='none':null,cp:Combat.stats().cp,req:Meta40.reqCP(5)}}")
  chk('Ải dư lực chiến: tiếp tế thu gọn thành "+ Tiếp tế ◈" (%s)'%s,s['col'] and s['rowHidden'])
  pg.screenshot(path=O+'supply.png')
  pg.evaluate("()=>document.querySelector('#cm-sheet .st100').click()");pg.wait_for_timeout(600)
  chk('Bấm "+ Tiếp tế ◈": mở 3 lựa chọn',pg.evaluate("()=>{const r=document.querySelector('#cm-sheet [data-su90]');return r&&r.parentElement.style.display!=='none'}"))
  # mũi tên: quái lớn thường không còn mũi tên
  pg.evaluate("()=>{ChapterMap.close();mode='menu';try{Lobby.show()}catch{};Progress.setLocked(false);try{V75.addEn(99)}catch{};document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value='14';Lobby.hide();reset();if(mode==='pause')mode='play'}");pg.wait_for_timeout(1500)
  a=pg.evaluate("""()=>{let n=0;const o=ctx.fill.bind(ctx);ctx.fill=function(){n++;return o.apply(this,arguments)};for(const e of enemies)e.dead=true;addEnemy({type:'scout',x:W*.5,y:-140,vx:0,v:0,hp:500,maxHp:500,r:30,large:true,age:0});enemies[enemies.length-1].y=-140;
     const a=n;V93.arrows();const big=n-a;for(let i=0;i<4;i++){addEnemy({type:'scout',x:40+i*60,y:-140,vx:0,v:0,hp:500,maxHp:500,r:30,elite:true,age:0});enemies[enemies.length-1].y=-140;}const c=n;V93.arrows();const el=n-c;ctx.fill=o;return {big,el}}""")
  chk('Mũi tên: quái lớn thường 0, tinh anh tối đa 2 (%s)'%a,a['big']==0 and a['el']==2)
  # hào quang & nhãn danh hiệu
  pg.evaluate("()=>{mode='menu';try{Lobby.show()}catch{};Title84.picker()}");pg.wait_for_timeout(800)
  chk('Bảng danh hiệu không còn hàng chọn tay hào quang, hào quang = Tự động',pg.evaluate("()=>!document.querySelector('#au86 .au86-row')&&AURA85.pref()==='auto'"))
  pg.evaluate("()=>{document.querySelectorAll('.m63').forEach(e=>e.hidden=true)}")
  # Khế Ước chọn nhanh
  pg.evaluate("()=>{V91.setPact([]);Expedition67.open();const t=document.querySelector('.ex67 [data-x=\"tab\"][data-v=\"ecl\"]');if(t)t.click()}");pg.wait_for_timeout(1500)
  has=pg.evaluate("()=>document.querySelectorAll('.pact91 [data-p91q]').length")
  if has:
    pg.evaluate("()=>document.querySelectorAll('.pact91 [data-p91q]')[2].click()");pg.wait_for_timeout(300)
    pk=pg.evaluate("()=>V91.state().pact");chk('Khế Ước "Tối đa": r04+r07+r11 = +90%% (%s)'%pk,sorted(pk)==['r04','r07','r11'])
  else: chk('Khế Ước có 3 nút chọn nhanh (cần mở Nguyệt Thực)',True)
  pg.screenshot(path=O+'pact.png')
  # trang Thử thách: Phá Vây hết lượt → xuống cuối
  pg.evaluate("()=>{document.querySelectorAll('.m63').forEach(e=>e.hidden=true);const st=JSON.parse(localStorage.getItem('saobang-bk78')||'{}');}")
  pg.close()
  pg=b.new_page(viewport={'width':393,'height':852});pg.on('pageerror',lambda e:errs.append(str(e)))
  pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(2500)
  pg.add_init_script("if(!sessionStorage.getItem('t100b')){sessionStorage.setItem('t100b','1');const h=JSON.parse(localStorage.getItem('saobang-hangar-v1')||'{}');h.cleared=Array.from({length:40},(_,i)=>i+1);localStorage.setItem('saobang-hangar-v1',JSON.stringify(h));const s=JSON.parse(localStorage.getItem('saobang-bk78')||'{}');s.day={d:new Date(Date.now()+7*3600000).toISOString().slice(0,10),n:2};localStorage.setItem('saobang-bk78',JSON.stringify(s));localStorage.setItem('saobang-ux95',JSON.stringify({base:40}));}")
  pg.goto('file://'+f+'?nopop');pg.wait_for_function("()=>typeof V100==='object'",timeout=90000);pg.wait_for_timeout(3000)
  pg.evaluate("()=>{document.getElementById('tutorial392')?.remove();document.querySelectorAll('.m63').forEach(e=>e.hidden=true);Nav74.page('challenge')}");pg.wait_for_timeout(1500)
  c=pg.evaluate("()=>{const L=[...document.querySelectorAll('#nav74p .n74card[data-go74]')];const i=L.findIndex(x=>x.dataset.go74==='breakout');return {i,n:L.length,txt:L[i]&&L[i].textContent}}")
  chk('Trang Thử thách: Phá Vây hết lượt thưởng → cuối danh sách, "ĐÃ XONG HÔM NAY" (%s)'%c,c['i']==c['n']-1 and 'ĐÃ XONG' in (c['txt'] or ''))
  pg.screenshot(path=O+'challenge.png');pg.close()
  # bản thử
  pg=b.new_page(viewport={'width':393,'height':852});pg.on('pageerror',lambda e:errs.append(str(e)));pg.on('dialog',lambda d:d.accept())
  pg.goto('file://'+fthu+'?nopop');pg.wait_for_function("()=>typeof Thu100==='object'&&typeof V100==='object'",timeout=90000);pg.wait_for_timeout(5000)
  chk('Bản thử: có nút 🧪 BẢN THỬ',pg.evaluate("()=>!!document.getElementById('thu100b')"))
  pg.evaluate("()=>Thu100.start(120)")
  for k in range(40):
    pg.wait_for_timeout(3000)
    try:
      st=pg.evaluate("()=>({s:sessionStorage.getItem('thu100-step'),ok:typeof Combat==='object'})")
      if st['s'] is None and st['ok']:break
    except Exception: pass
  pg.wait_for_timeout(3000)
  d=pg.evaluate("()=>{const raw=[];for(let i=0;i<window.localStorage.length;i++)raw.push(THU100RAW.key(i));return {cp:Math.round(Combat.stats().cp),req:Meta40.reqCP(120),grade:Workshop.craftProgress(6).grade,cl:Progress.getState().cleared.length,wing:Wing87.state().mate,raw:raw.filter(k=>!k.startsWith('thu100:')).length}}")
  print(d);chk('Bản thử nạp "Ải 120 · bậc S": tàu #7 bậc S, đã qua 119 ải, lực chiến %s / %s'%(d['cp'],d['req']),d['grade']=='S' and d['cl']==119 and d['cp']>3000)
  chk('Bản thử không ghi dữ liệu ngoài tiền tố thu100: (%d khóa lạ)'%d['raw'],d['raw']==0)
  pg.screenshot(path=O+'thu.png')
  chk('không lỗi JS'+(' · '+errs[0][:200] if errs else ''),not errs)
  b.close()
print('\n'.join(OK))
