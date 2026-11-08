# V91 · REVIEW91: ĐI TỚI (sự kiện tuần + thành tựu) · thể lực bảng chọn ải · Phá Vây mua lượt · Khế Ước Nguyệt Thực · bảo hiểm skin
import sys,json
from playwright.sync_api import sync_playwright
f=sys.argv[1];O=sys.argv[2]+'/';OK=[]
def chk(n,c):OK.append(('✓' if c else '✗')+' '+n)
SEED="if(!sessionStorage.getItem('t91')){sessionStorage.setItem('t91','1');const h=JSON.parse(localStorage.getItem('saobang-hangar-v1')||'{}');h.cleared=Array.from({length:119},(_,i)=>i+1);localStorage.setItem('saobang-hangar-v1',JSON.stringify(h));}"
with sync_playwright() as p:
  b=p.chromium.launch();pg=b.new_page(viewport={'width':393,'height':852});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
  pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(2000);pg.add_init_script(SEED);pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(6000)
  pg.evaluate("()=>{document.getElementById('tutorial392')?.remove();window.TITLE84=false;document.querySelectorAll('.m63,.adv70,.st71').forEach(e=>e.hidden=true);Progress.grantCredits(200000)}")
  # sự kiện tuần
  pg.evaluate("()=>{Nav74.sub('event83')}");pg.wait_for_timeout(1500)
  n=pg.evaluate("()=>document.querySelectorAll('.ev83:not([hidden]) .go91').length");chk('Sự kiện tuần: có nút ĐI TỚI (%d)'%n,n>=1);pg.screenshot(path=O+'ev.png')
  pg.evaluate("()=>{document.querySelector('.ev83:not([hidden]) .go91').click()}");pg.wait_for_timeout(1200)
  chk('Bấm ĐI TỚI đóng bảng sự kiện',pg.evaluate("()=>!document.querySelector('.ev83:not([hidden])')"))
  # thành tựu
  pg.evaluate("()=>{document.querySelectorAll('.m63,#m40,#cmap').forEach(e=>e.hidden=true);try{ChapterMap.close()}catch{};Meta40.rewardsPanel('ach')}");pg.wait_for_timeout(1500)
  n=pg.evaluate("()=>document.querySelectorAll('.ach .go91').length");chk('Thành tựu: có nút ĐI TỚI (%d)'%n,n>=1);pg.screenshot(path=O+'ach.png')
  # thể lực bảng chọn ải
  pg.evaluate("()=>{document.querySelectorAll('.m63,#m40').forEach(e=>e.hidden=true);ChapterMap.open()}");pg.wait_for_timeout(1200)
  pg.evaluate("()=>{const x=document.querySelector('.cm-node[data-stage=\"117\"]');if(x)x.click()}");pg.wait_for_timeout(1500)
  t=pg.evaluate("()=>(document.querySelector('#cm-sheet .en91')||{}).textContent||''");chk('Bảng chọn ải hiện thể lực: '+t[:90],'Thể lực' in t);pg.screenshot(path=O+'sheet.png')
  # Phá Vây
  pg.evaluate("()=>{const st=JSON.parse(localStorage.getItem('saobang-bk78')||'{}');st.day={d:new Date(Date.now()+7*3600000).toISOString().slice(0,10),n:2};localStorage.setItem('saobang-bk78',JSON.stringify(st));}")
  pg.reload();pg.wait_for_function("()=>typeof V91==='object'&&typeof BK78==='object'",timeout=60000);pg.wait_for_timeout(2000);pg.evaluate("()=>{document.getElementById('tutorial392')?.remove();document.querySelectorAll('.m63').forEach(e=>e.hidden=true);BK78.open()}");pg.wait_for_timeout(1500)
  has=pg.evaluate("()=>!!document.querySelector('.bk91')");chk('Phá Vây hết 2 lượt: hiện nút mua lượt',has);pg.screenshot(path=O+'bk.png')
  c0=pg.evaluate("()=>Progress.balance()");pg.evaluate("()=>document.querySelector('.bk91').click()");pg.wait_for_timeout(800)
  d=pg.evaluate("()=>({c:Progress.balance(),max:FEATURES_V78.BREAKOUT_ROGUELITE.DAILY_REWARDED_RUNS_MAX,btn:!!document.querySelector('.bk91')})")
  chk('Mua lượt: −15.000 ◈, lượt có thưởng 3, nút ẩn',c0-d['c']==15000 and d['max']==3 and not d['btn'])
  # Khế Ước
  pg.evaluate("()=>{document.querySelectorAll('.m63').forEach(e=>e.hidden=true);V91.setPact(['r03','r10','r12']);}")
  pg.evaluate("()=>{Gfx66.open()}");pg.fill('#st66-code','SAOBANG-ADMIN-2026');pg.click('[data-adm]');pg.click('[data-adm]');pg.wait_for_timeout(6500);pg.wait_for_function("()=>typeof V91==='object'",timeout=60000);pg.wait_for_timeout(1500)
  pg.evaluate("()=>{document.getElementById('tutorial392')?.remove();document.querySelectorAll('.m63').forEach(e=>e.hidden=true);V91.setPact(['r03','r10','r12'])}")
  st=pg.evaluate("()=>({un:Eclipse67.unlocked(),can:Eclipse67.canStart(10)})");
  pg.evaluate("()=>{const P=Progress.getState();try{const it=P.items[0];if(it){it.enhance=3;}}catch{};}")
  pg.evaluate("()=>{Expedition67.open();document.querySelector('.ex67 [data-x=\"tab\"][data-v=\"ecl\"]').click()}");pg.wait_for_timeout(1500);pg.screenshot(path=O+'pact0.png');pg.evaluate("()=>document.querySelector('[data-p91x]').click()");pg.wait_for_timeout(300)
  pg.screenshot(path=O+'pact.png')
  chk('Khung Nguyệt Thực hiện Khế Ước (+105%)',pg.evaluate("()=>{const e=document.querySelector('.pact91');return !!e&&/\\+105%/.test(e.textContent)}"))
  pg.evaluate("()=>{document.querySelectorAll('.m63').forEach(e=>e.hidden=true);if(!window.__iv)window.__iv=setInterval(()=>{try{invuln=0;const d=document.getElementById('st80');if(d)d.hidden=true;window.__st80=0;}catch{}},150);Eclipse67.launch(1)}");pg.wait_for_timeout(2500)
  r=pg.evaluate("()=>({run:V91.state().run,ecl:Eclipse67.active(),mode,un:Eclipse67.unlocked(),lv:level})");print(r,st);chk('Vào Nguyệt Thực: chốt 3 luật +105%',r['run'] and r['run']['pct']==105)
  if not r['ecl']:
    print('\n'.join(OK));sys.exit()
  dmg=pg.evaluate("""async()=>{await new Promise(r=>setTimeout(r,1500));const w=0;invuln=0;shield=0;hp=maxHp;hp=maxHp;await new Promise(r=>setTimeout(r,200));const h0=hp;const st0={inv:invuln,sh:shield,m:mode,mh:maxHp};hp-=10;await new Promise(r=>setTimeout(r,300));const lost=h0-hp;window.__dbg={st0,h0,h1:hp,inv:invuln};hp=maxHp;
    const rv=Revive393.offer();return {w,lost,scale:enemyScale(),rv,boss:!!boss}}""")
  chk('Ép Xung Quá Tải: trúng đòn mất ×1,25 (%s/%s)'%(dmg['lost'],dmg['scale']),abs(dmg['lost']-12.5)<1e-6)
  chk('Tử Chiến Độc Hành chặn hồi sinh',dmg['rv'] is False)
  rw=pg.evaluate("()=>{const r=Eclipse67.reward(1);return {c:r.credits,m:r.materials}}")
  chk('Thưởng Nguyệt Thực ải 1: ◈ 96 + 105%% = %s, có dòng Khế Ước'%rw['c'],rw['c']==96+round(96*1.05) and any('Khế Ước' in x for x in rw['m']))
  # skin pity
  pg.evaluate("()=>{mode='menu';const k='saobang-skin69-v1';const s=JSON.parse(localStorage.getItem(k)||'{}');s.pity=49;s.spin={d:'',n:0};localStorage.setItem(k,JSON.stringify(s));}")
  pg.reload();pg.wait_for_timeout(6000)
  sp=pg.evaluate("""()=>{document.getElementById('tutorial392')?.remove();Skin69.open();const el=[...document.querySelectorAll('[data-k="spin"]')].find(x=>x.offsetParent);const own0=Object.keys(JSON.parse(localStorage.getItem('saobang-skin69-v1')).own||{}).length;if(el)el.click();
     const s=JSON.parse(localStorage.getItem('saobang-skin69-v1'));return {btn:!!el,own0,own1:Object.keys(s.own||{}).length,pity:s.pity,res:(document.querySelector('.sk-res')||{}).textContent}}""")
  chk('Vòng quay skin lượt 50: bảo hiểm tặng skin, đếm về 0 (%s)'%sp['res'],sp['btn'] and sp['pity']==0 and 'BẢO HIỂM' in (sp['res'] or ''))
  pg.wait_for_timeout(1200);pg.screenshot(path=O+'skin.png')
  chk('không lỗi JS'+(' · '+errs[0][:200] if errs else ''),not errs)
  b.close()
print('\n'.join(OK))
