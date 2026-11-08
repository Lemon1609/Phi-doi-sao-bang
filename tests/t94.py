# V94 · REVIEW94: trần hiệu năng ải ≥140 (gộp đạn giữ sát thương, hàng đợi quái, trần đạn quái, chữ số) · người mới: chẩn đoán thua, cứu trợ, mục tiêu, gợi ý nâng cấp
import sys,json
from playwright.sync_api import sync_playwright
f=sys.argv[1];O=sys.argv[2]+'/';OK=[]
def chk(n,c):OK.append(('✓' if c else '✗')+' '+n)
def seed(n):return "if(!sessionStorage.getItem('t94')){sessionStorage.setItem('t94','1');const h=JSON.parse(localStorage.getItem('saobang-hangar-v1')||'{}');h.cleared=Array.from({length:%d},(_,i)=>i+1);localStorage.setItem('saobang-hangar-v1',JSON.stringify(h));}"%n
GO="""(st)=>{mode='menu';try{Lobby.show()}catch{};Progress.setLocked(false);try{V75.addEn(99)}catch{};document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value=String(st);Lobby.hide();reset();if(mode==='pause')mode='play';
 if(!window.__iv94)window.__iv94=setInterval(()=>{try{const d=document.getElementById('st80');if(d)d.hidden=true;window.__st80=0;if(window.__inv)invuln=999;}catch{}},150);return {mode,level}}"""
with sync_playwright() as p:
  b=p.chromium.launch();errs=[]
  # ---------- hiệu năng ----------
  pg=b.new_page(viewport={'width':393,'height':852});pg.on('pageerror',lambda e:errs.append(str(e)))
  pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(2000);pg.add_init_script(seed(159));pg.goto('file://'+f+'?nopop');pg.wait_for_function("()=>typeof V94==='object'",timeout=90000);pg.wait_for_timeout(2500)
  pg.evaluate("()=>{document.getElementById('tutorial392')?.remove();document.querySelectorAll('.m63').forEach(e=>e.hidden=true);window.__inv=1}")
  r=pg.evaluate(GO,159);pg.wait_for_timeout(1500)
  d=pg.evaluate("""async()=>{const C=V94.PERF94.pretty;
    // 1) gộp đạn: thêm 120 viên đạn chính giả lập, so tổng sát thương trước/sau
    for(let i=0;i<120;i++)shots.push({x:200,y:600,vx:0,vy:-900,damage:10,art28:0,type:'laser',__s85:1,r:4,age:0});
    const sum0=shots.filter(s=>!s.dead).reduce((a,s)=>a+(s.damage||0),0),n0=shots.length;
    await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
    const sum1=shots.filter(s=>!s.dead).reduce((a,s)=>a+(s.damage||0),0),n1=shots.filter(s=>!s.dead).length;
    // 2) trần đạn quái: thêm 120 viên ở góc xa boss
    for(let i=0;i<120;i++)bullets.push({x:30+i,y:200,vx:0,vy:120,r:5});
    await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));const nb=bullets.filter(b=>!b.dead).length;
    // 3) hàng đợi quái: sinh 40 quái thường
    const q0=V94.state().st.q;for(let i=0;i<40;i++)addEnemy({type:'scout',x:40+i*8,y:-40,vx:0,v:60,hp:50,maxHp:50,r:18,age:0});
    const ne=enemies.filter(e=>!e.dead&&!e.elite&&!e.large&&!e.boss&&!e.bossPart).length;
    return {sum0,sum1,n0,n1,nb,ne,q:V94.state().Q,st:V94.state().st,lv:level}}""")
  chk('Gộp đạn ta: %d → %d viên, tổng sát thương %d → %d (giữ nguyên ~ trừ đạn đã trúng)'%(d['n0'],d['n1'],d['sum0'],d['sum1']),d['n1']<=80 and d['st']['merged']>0 and d['sum1']>=d['sum0']*0.85)
  chk('Trần đạn quái thường: còn %d viên (≤ 70 + đạn mới)'%d['nb'],d['nb']<=80)
  chk('Hàng đợi quái: %d quái thường trên màn, %d đang chờ'%(d['ne'],d['q']),d['ne']<=18 and d['q']>0)
  pg.wait_for_timeout(4000);d2=pg.evaluate("()=>V94.state().st");chk('Quái chờ được thả dần (%s)'%d2,d2['rel']>0)
  pg.screenshot(path=O+'perf.png')
  pg.close()
  # ---------- người mới ----------
  pg=b.new_page(viewport={'width':393,'height':852});pg.on('pageerror',lambda e:errs.append(str(e)))
  pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(2000);pg.add_init_script(seed(9));pg.goto('file://'+f+'?nopop');pg.wait_for_function("()=>typeof V94==='object'",timeout=90000);pg.wait_for_timeout(2500)
  pg.evaluate("()=>{document.getElementById('tutorial392')?.remove();document.querySelectorAll('.m63').forEach(e=>e.hidden=true);ChapterMap.open()}");pg.wait_for_timeout(1500)
  gt=pg.evaluate("()=>(document.querySelector('.goal94')||{}).textContent||''");chk('Bản đồ: dải mục tiêu kế tiếp ('+gt+')','Mục tiêu ải' in gt)
  pg.screenshot(path=O+'goal.png')
  hint=pg.evaluate("()=>{ChapterMap.close();const t=document.querySelector('#nav74 [data-t=\"equip\"]');return !!(t&&t.dataset.up94)}");chk('Gợi ý nâng cấp lần đầu: tab TRANG BỊ nhấp nháy',hint)
  for k in range(2):
    pg.evaluate(GO,10);pg.wait_for_timeout(1500);pg.evaluate("()=>{invuln=0;hp=0;try{end(false)}catch(e){}}");pg.wait_for_timeout(900)
  dg=pg.evaluate("()=>({vis:!!(document.querySelector('.dg94')||{}).offsetParent,dg:(document.querySelector('.dg94')||{}).textContent||'',fail:V94.state().S.fail[10],mode})")
  chk('Thua ải 10 hai lần: có chẩn đoán + báo cứu trợ (%s)'%dg['dg'][:80],dg['fail']==2 and 'CỨU TRỢ' in dg['dg'] and dg['vis'] and 'Lực chiến' not in dg['dg'])
  pg.screenshot(path=O+'lose.png')
  pg.evaluate("()=>{try{End78.goLobby()}catch{}}");pg.wait_for_timeout(800)
  pg.evaluate("()=>{ChapterMap.open();const x=document.querySelector('.cm-node[data-stage=\"10\"]');if(x)x.click()}");pg.wait_for_timeout(1200)
  chk('Bảng ải 10 hiện nhãn CỨU TRỢ TÂN THỦ',pg.evaluate("()=>!!document.querySelector('#cm-sheet .aid94')"));pg.screenshot(path=O+'aid.png')
  pg.evaluate("()=>{ChapterMap.close()}");pg.evaluate(GO,10);pg.wait_for_timeout(2500)
  a=pg.evaluate("()=>({aid:V94.state().aid,power,blocks:UX90.blocks()})");chk('Vào lại ải 10: cứu trợ bật, đạn ≥3, khiên 2 đòn (%s)'%a,a['aid'] and a['power']>=3 and a['blocks']==2)
  chk('không lỗi JS'+(' · '+errs[0][:200] if errs else ''),not errs)
  b.close()
print('\n'.join(OK))
