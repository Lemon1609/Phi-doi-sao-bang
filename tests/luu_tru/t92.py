# V92 · REVIEW92: Phá Vây bản sao + Chinh Phục Tuần · hạng Vô tận theo mùa · đặc quyền thành tựu · r09 · máu/lực chiến
import sys,json
from playwright.sync_api import sync_playwright
f=sys.argv[1];O=sys.argv[2]+'/';OK=[]
def chk(n,c):OK.append(('✓' if c else '✗')+' '+n)
SEED="if(!sessionStorage.getItem('t92')){sessionStorage.setItem('t92','1');const h=JSON.parse(localStorage.getItem('saobang-hangar-v1')||'{}');h.cleared=Array.from({length:119},(_,i)=>i+1);localStorage.setItem('saobang-hangar-v1',JSON.stringify(h));}"
with sync_playwright() as p:
  b=p.chromium.launch();pg=b.new_page(viewport={'width':393,'height':852});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
  pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(2000);pg.add_init_script(SEED);pg.goto('file://'+f+'?nopop');pg.wait_for_function("()=>typeof V92==='object'&&typeof BK78==='object'",timeout=90000);pg.wait_for_timeout(2500)
  pg.evaluate("()=>{document.getElementById('tutorial392')?.remove();window.TITLE84=false;document.querySelectorAll('.m63,.adv70,.st71').forEach(e=>e.hidden=true);for(let i=0;i<13;i++)try{Campaign36.acquire('craft',i,'','story')}catch{}}")
  # máu / lực chiến
  d=pg.evaluate("()=>({hp:[130,140,150,160,170].map(s=>BOSSHP87[s]),req:[150,160,170,180,190,200].map(s=>Meta40.reqCP(s)),r09:V91.PACT91.rules.find(r=>r.id==='r09').n})")
  chk('Máu boss 130–170: '+str(d['hp']),d['hp']==[102000,193400,227900,440700,239800])
  chk('Lực chiến đề nghị 150–200: '+str(d['req']),d['req']==[8900,9600,11200,12800,13800,14800])
  chk('r09 = Phong Tỏa Hồi Phục',d['r09']=='Phong Tỏa Hồi Phục')
  # Phá Vây
  r=pg.evaluate("""()=>{const n0=Evo82.list().length;const a=BKR92(12,true,true);const n1=Evo82.list().length;const b2=BKR92(12,true,true);const n2=Evo82.list().length;const c=BKR92(3,false,true);
     return {a,b2,c,d1:n1-n0,d2:n2-n1,tiers:Evo82.list().slice(n0).map(x=>x.t)}}""")
  chk('Phá Vây chặng 12 có thưởng: bản sao Lục chắc chắn + Chinh Phục Tuần (%d bản sao)'%r['d1'],r['d1']>=2 and any('Chinh Phục Tuần' in x for x in r['a']))
  chk('Chinh Phục Tuần chỉ 1 lần/tuần',not any('Chinh Phục Tuần' in x for x in r['b2']) and r['d2']>=1)
  chk('Chặng 3: không bản sao',r['c']==[])
  chk('Không có bản sao Tím ở lượt ngày (bậc: %s)'%r['tiers'],not any(('Tím' in x) and ('Chinh Phục' not in x) for x in r['a']+r['b2']))
  pg.evaluate("()=>BK78.open()");pg.wait_for_timeout(1500)
  chk('Bảng Phá Vây hiện Chinh Phục Tuần: ĐÃ NHẬN',pg.evaluate("()=>/ĐÃ NHẬN/.test((document.querySelector('.bkw92')||{}).textContent||'')"));pg.screenshot(path=O+'bk.png')
  # hạng Vô tận
  pg.evaluate("()=>{document.querySelectorAll('.m63').forEach(e=>e.hidden=true);V92._rank({best:0,played:0})}")
  pg.evaluate("()=>{gameMode='endless';score=345678;try{end(false)}catch(e){};gameMode='campaign'}");pg.wait_for_timeout(500)
  rk=pg.evaluate("()=>V92.rank()");chk('Vô tận 345.678 điểm → hạng Vàng',rk['best']==345678 and rk['tier']=='Vàng')
  pg.evaluate("()=>{mode='menu';S77.open()}");pg.wait_for_timeout(1500)
  chk('Bảng mùa giải hiện hạng Vô tận',pg.evaluate("()=>!!document.querySelector('.s77p .rk92')"));pg.screenshot(path=O+'rank.png')
  g=pg.evaluate("()=>{document.querySelectorAll('.m63').forEach(e=>e.hidden=true);const c0=Progress.balance(),t0=V75.tickets(),n0=Evo82.list().length;V92._rank({sid:V92.rank().sid-1});V92.rollSeason();return {dc:Progress.balance()-c0,dt:V75.tickets()-t0,dn:Evo82.list().length-n0,r:V92.rank()}}")
  chk('Hết mùa: gửi quà hạng Vàng (50.000 ◈, 8 vé, 1 bản sao Lam), đặt lại kỷ lục',g['dc']==50000 and g['dt']==8 and g['dn']==1 and g['r']['best']==0)
  # đặc quyền
  e0=pg.evaluate("()=>({t:V92.tier(),max:PLAN75.ENERGY.MAX,sw:SWEEP92(),rc:REVC92(),cost:Progress.getState().items.length})")
  pg.add_init_script("if(!sessionStorage.getItem('a92')){sessionStorage.setItem('a92','1');const k='saobang-meta-v40';const s=JSON.parse(localStorage.getItem(k)||'null')||{v:1,daily:{last:-1,streak:0},ach:{},tower:{best:0,runs:0}};s.ach=s.ach||{};Object.assign(s.ach,{clear:4,boss:3,kill:3,star:3,ss:2,robot:3,sss:3,tower:3,endless:3,star3:4,tim5:4,bossrun:4});localStorage.setItem(k,JSON.stringify(s));}")
  pg.reload();pg.wait_for_function("()=>typeof V92==='object'&&typeof Ult72==='object'",timeout=90000);pg.wait_for_timeout(3500)
  e1=pg.evaluate("()=>({st:V92.stars(),t:V92.tier(),max:PLAN75.ENERGY.MAX,rg:PLAN75.ENERGY.REGEN_MIN,sw:SWEEP92(),rc:REVC92(),g:GDISC92(),ult:Ult72.C.ultCd})")
  chk('Chưa có sao: bậc 0, 120 🔋, 10 càn quét, hồi sinh 300 (%s)'%e0,e0['t']==0 and e0['max']==120 and e0['sw']==10 and e0['rc']==300)
  chk('39★: bậc 5, 140 🔋, hồi 4,5 phút, 15 càn quét, hồi sinh 200, −8%% nâng cấp (%s)'%e1,e1['t']==5 and e1['max']==140 and e1['rg']==4.5 and e1['sw']==15 and e1['rc']==200 and abs(e1['g']-.92)<1e-9)
  f1=pg.evaluate("()=>{mode='play';const c0=Progress.balance();Progress.grantCredits(1000);const d=Progress.balance()-c0;mode='menu';const c1=Progress.balance();Progress.grantCredits(1000);return [d,Progress.balance()-c1]}")
  chk('+12%% ◈ trong trận, không cộng ở sảnh (%s)'%f1,f1==[1120,1000])
  pg.evaluate("()=>{document.querySelectorAll('.m63').forEach(e=>e.hidden=true);Meta40.rewardsPanel('ach')}");pg.wait_for_timeout(1500)
  chk('Bảng thành tựu hiện đặc quyền',pg.evaluate("()=>!!document.querySelector('.pk92')"));pg.screenshot(path=O+'perk.png')
  chk('không lỗi JS'+(' · '+errs[0][:200] if errs else ''),not errs)
  b.close()
print('\n'.join(OK))
