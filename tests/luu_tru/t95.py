# V95 · REVIEW95: #13 bậc SS · giãn mốc mở tính năng (giữ quyền cũ) · Nguyệt Thực 161–200 + thưởng lần đầu + danh hiệu
import sys,json
from playwright.sync_api import sync_playwright
f=sys.argv[1];O=sys.argv[2]+'/';OK=[]
def chk(n,c):OK.append(('✓' if c else '✗')+' '+n)
def seed(n,base):return "if(!sessionStorage.getItem('t95')){sessionStorage.setItem('t95','1');const h=JSON.parse(localStorage.getItem('saobang-hangar-v1')||'{}');h.cleared=Array.from({length:%d},(_,i)=>i+1);localStorage.setItem('saobang-hangar-v1',JSON.stringify(h));localStorage.setItem('saobang-ux95',JSON.stringify({base:%d}));}"%(n,base)
with sync_playwright() as p:
  b=p.chromium.launch();errs=[]
  def page(n,base):
    pg=b.new_page(viewport={'width':393,'height':852});pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(2000);pg.add_init_script(seed(n,base));pg.goto('file://'+f+'?nopop');pg.wait_for_function("()=>typeof V95==='object'",timeout=90000);pg.wait_for_timeout(2500)
    pg.evaluate("()=>{document.getElementById('tutorial392')?.remove();document.querySelectorAll('.m63').forEach(e=>e.hidden=true)}");return pg
  Q="()=>({ss:SS90_DATA.mult[13],dec:SS90_DATA.decay13,daily:Onboard66.open('challenge'),bk:Nav74.F.breakout.lk(),seed:Nav74.F.seed78.lk(),wheel:Econ74.wOpen(),sss:Onboard66.open('sss'),lim:Econ74.lOpen(),ult:Nav74.F.ult.lk(),lv:['daily','breakout','seed','wheel','sss','limited','ult'].map(k=>V95.lv(k))})"
  # người mới: đã qua 19 ải, cài V95 từ đầu
  pg=page(19,0);d=pg.evaluate(Q)
  chk('#13 bậc SS: hệ số 0,52, xuyên bộ phận 10%',d['ss']==0.52 and abs(d['dec']-0.1)<1e-9)
  chk('Mốc mới %s'%d['lv'],d['lv']==[12,20,30,35,45,50,80])
  chk('Người mới ải 19: Thử thách ngày mở; Phá Vây, Hạt giống chưa mở (%s)'%d,d['daily'] and not d['bk'] and not d['seed'])
  pg.evaluate("()=>{ChapterMap.open()}");pg.wait_for_timeout(1200);gt=pg.evaluate("()=>(document.querySelector('.goal94')||{}).textContent||''")
  chk('Dải mục tiêu: '+gt,'ải 20' in gt and 'PHÁ VÂY' in gt);pg.close()
  # người chơi cũ: đã qua 19 ải trước khi cài V95 → giữ Phá Vây / Hạt giống
  pg=page(19,19);d=pg.evaluate(Q);chk('Giữ quyền cũ ải 19: Phá Vây và Hạt giống vẫn mở (%s)'%d['lv'],d['bk'] and d['seed']);pg.close()
  pg=page(36,0);d=pg.evaluate(Q);print(d);chk('Người mới ải 36: Vòng quay mở (35), Hợp thể chưa (45)',d['wheel'] and not d['sss']);pg.close()
  pg=page(82,0);d=pg.evaluate(Q);chk('Người mới ải 82: Tối thượng mở (80)',d['ult']);pg.close()
  # Nguyệt Thực 161–200
  pg=page(19,19)
  pg.evaluate("()=>{Gfx66.open()}");pg.fill('#st66-code','SAOBANG-ADMIN-2026');pg.click('[data-adm]');pg.click('[data-adm]');pg.wait_for_timeout(6500)
  pg.add_init_script("if(!sessionStorage.getItem('t95c')){sessionStorage.setItem('t95c','1');const h=JSON.parse(localStorage.getItem('saobang-hangar-v1')||'{}');h.cleared=Array.from({length:200},(_,i)=>i+1);localStorage.setItem('saobang-hangar-v1',JSON.stringify(h));const c=JSON.parse(localStorage.getItem('saobang-campaign-v36')||'{}');c.stars=c.stars||{};for(let i=1;i<=200;i++)c.stars[i]=3;localStorage.setItem('saobang-campaign-v36',JSON.stringify(c));const e=JSON.parse(localStorage.getItem('saobang-eclipse-v67')||'{}');e.cleared=Array.from({length:199},(_,i)=>i+1);localStorage.setItem('saobang-eclipse-v67',JSON.stringify(e));}")
  pg.reload();pg.wait_for_function("()=>typeof V95==='object'&&typeof Eclipse67==='object'",timeout=90000);pg.wait_for_timeout(2500)
  e=pg.evaluate("()=>({max:Eclipse67.maxCh(),c161:Eclipse67.canStart(161),c201:Eclipse67.canStart(201),cl200:Progress.getState().cleared.includes(200)})")
  chk('Đã vượt 200: Nguyệt Thực có 10 chương, E161 vào được (%s)'%e,e['max']==10 and e['c161'] and not e['c201'])
  pg.evaluate("()=>{document.querySelectorAll('.m63').forEach(x=>x.hidden=true);V91.setPact(['r01','r02']);if(!window.__iv)window.__iv=setInterval(()=>{try{invuln=999;hp=maxHp;const d=document.getElementById('st80');if(d)d.hidden=true;window.__st80=0;}catch{}},150);Eclipse67.launch(161)}")
  pg.wait_for_timeout(3000)
  r=pg.evaluate("()=>({act:Eclipse67.active(),lv:level,req:Combat.stageRequirement(161),r200:Combat.stageRequirement(200),hp:ECL.hp,hpE:ECL.hpElite})")
  chk('E161: lực chiến đề nghị 13.200 (E200: 16.500), máu quái ×1,3 (%s)'%r,r['act'] and r['lv']==161 and r['req']==13200 and r['r200']==16500 and r['hp']==1.3 and r['hpE']==1.3)
  pg.screenshot(path=O+'e161.png')
  w=pg.evaluate("()=>{const a=Eclipse67.reward(180),b2=Eclipse67.reward(180),c=Eclipse67.reward(200);return {a:a.materials,b:b2.materials,c:c.materials,t:Object.keys(Title84.state().own||{})}}")
  chk('Lần đầu E180: +25.000 ◈ + bản sao Tím, chỉ 1 lần',any('25.000' in x for x in w['a']) and not any('Lần đầu' in x for x in w['b']))
  chk('Lần đầu E200 (2 luật): +40.000 ◈ + bản sao Tím + danh hiệu Chúa Tể Nguyệt Thực (%s)'%w['t'],any('40.000' in x for x in w['c']) and 'AURA_ECLIPSE_LORD' in w['t'])
  pg.evaluate("()=>{mode='menu';try{Lobby.show()}catch{};Eclipse67.launch(180)}");
  bh=pg.evaluate("""async()=>{for(let k=0;k<200;k++){if(boss&&boss.bossHealthReady&&boss.__hp87&&boss.y>40)break;try{for(const e of enemies)if(!e.boss&&!e.bossPart)e.dead=true;}catch{};await new Promise(r=>setTimeout(r,200));}
     const parts=(boss&&boss.parts||[]).reduce((a,p)=>a+(p.max||0),0);return {lv:level,act:Eclipse67.active(),tot:Math.round((boss.max||0)+(boss.coreMax||0)+parts),core:Math.round(boss.max||0)}}""")
  chk('Boss E180: tổng máu ≈ 429.300 × 1,3 = 558.090 (REVIEW115) (%s)'%bh,bh['act'] and abs(bh['tot']-558090)<558090*0.03)
  pg.close()
  chk('không lỗi JS'+(' · '+errs[0][:200] if errs else ''),not errs)
  b.close()
print('\n'.join(OK))
