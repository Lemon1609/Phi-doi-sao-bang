# V86 · REVIEW85: cánh boss (lõi 25%/55%/+15%), nứt giáp lance36, #13 Bạo Tẩu 12 luồng, luật hào quang, tốc độ boss ×0,88, mốc boss cuối tuần
import sys,json
from playwright.sync_api import sync_playwright
f=sys.argv[1];O=(sys.argv[2] if len(sys.argv)>2 else '/tmp')+'/';R={};OK=[]
def chk(n,c):OK.append(('✓' if c else '✗')+' '+n)
SEED="if(!sessionStorage.getItem('t86')){sessionStorage.setItem('t86','1');const h=JSON.parse(localStorage.getItem('saobang-hangar-v1')||'{}');h.cleared=Array.from({length:60},(_,i)=>i+1);localStorage.setItem('saobang-hangar-v1',JSON.stringify(h));}"
with sync_playwright() as p:
  b=p.chromium.launch();pg=b.new_page(viewport={'width':393,'height':852});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
  pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(2000);pg.add_init_script(SEED);pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(6000)
  pg.evaluate("()=>{document.getElementById('tutorial392')?.remove();window.RULE84=false;try{V75.addEn(900)}catch{};for(let i=0;i<13;i++)try{Campaign36.acquire('craft',i,'','story')}catch{}}")
  R['cfg']=pg.evaluate("()=>({sc:['CH6','CH7','CH8','CH9'].map(k=>B75.specOf(k).sc),ms:EVENT83.raid.ms.map(m=>m.dmg)})")
  chk('Boss 120–180 tốc độ ×0,88',all(abs(x-.88)<1e-9 for x in R['cfg']['sc']))
  chk('Mốc boss cuối tuần 1,2/3,2/8,5/18/38 triệu',R['cfg']['ms']==[1200000,3200000,8500000,18000000,38000000])
  # boss có cánh: ải 20
  pg.evaluate("()=>{mode='menu';Progress.setLocked(false);document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value='20';Lobby.hide();reset();window.__af=Arsenal30.fire;Arsenal30.fire=()=>{};setInterval(()=>{try{invuln=999;hp=maxHp;const d=document.getElementById('st80');if(d)d.hidden=true;window.__st80=0;}catch{}},150)}")
  for _ in range(160):
    if pg.evaluate("()=>!!(boss&&boss.bossHealthReady&&boss.y>80)"):break
    pg.evaluate("()=>{try{for(const e of enemies)if(!e.boss)e.dead=true;}catch{}}");pg.wait_for_timeout(250)
  pg.wait_for_timeout(1500);pg.screenshot(path=O+'t86_wings.png')
  R['wing']=pg.evaluate("""()=>{const b=boss;const c=()=>b.coreHp;const out={n:(b.parts||[]).length};let c0=c();damageBoss(10,'test',b);out.two=+(c0-c()).toFixed(3);
     b.parts[0].hp=0;b.parts[0].dead=true;c0=c();damageBoss(10,'test',b);out.one=+(c0-c()).toFixed(3);
     for(const q of b.parts){q.hp=0;q.dead=true;}c0=c();damageBoss(10,'test',b);out.none=+(c0-c()).toFixed(3);out.open=!!b.coreOpen;return out}""")
  chk('Lõi nhận 25% khi còn 2 cánh',abs(R['wing']['two']-2.5)<.05)
  chk('Lõi nhận 55% khi còn 1 cánh',abs(R['wing']['one']-5.5)<.05)
  chk('Phá xong 2 cánh: lõi +15% trong 5 s',abs(R['wing']['none']-11.5)<.05)
  # nứt giáp lance36
  R['crack']=pg.evaluate("""async()=>{mode='menu';try{Lobby.show()}catch{};Progress.setLocked(false);Campaign36.acquire('gear','lance36','','story');const it=Progress.getState().items.filter(x=>x.variant==='lance36').slice(-1)[0];Progress.equip(it.id);
     document.getElementById('mission-select').value='40';Lobby.hide();reset();for(let i=0;i<160&&!(boss&&boss.bossHealthReady&&boss.y>80);i++){try{for(const e of enemies)if(!e.boss)e.dead=true;}catch{};await new Promise(r=>setTimeout(r,250));}
     const b=boss;for(const q of b.parts||[]){q.hp=0;q.dead=true;}await new Promise(r=>setTimeout(r,5500));const st=Bal86.state();let c0=b.coreHp;damageBoss(10,'test',b);const d0=c0-b.coreHp;
     try{activateSuper()}catch(e){superTime=8};await new Promise(r=>setTimeout(r,400));c0=b.coreHp;damageBoss(10,'test',b);const d1=c0-b.coreHp;return {lance:st.lance,d0:+d0.toFixed(3),d1:+d1.toFixed(3),crack:Bal86.state().bossCrack}}""")
  chk('Quang Thương: bật Bạo Tẩu → boss nứt giáp, nhận +18%',R['crack']['lance'] and R['crack']['crack'] and abs(R['crack']['d1']/max(.001,R['crack']['d0'])-1.18)<.02)
  pg.wait_for_timeout(300);pg.screenshot(path=O+'t86_crack.png')
  # #13 Bạo Tẩu 12 luồng
  R['s13']=pg.evaluate("""async()=>{Arsenal30.fire=window.__af;mode='menu';try{Lobby.show()}catch{};selectCraft(12);Progress.setLocked(false);try{V75.addEn(99)}catch{};document.getElementById('mission-select').value='41';Lobby.hide();reset();if(mode==='pause'){try{resume()}catch{}if(mode==='pause')mode='play';}
     await new Promise(r=>setTimeout(r,2500));power=5;try{activateSuper()}catch(e){superTime=8};await new Promise(r=>setTimeout(r,1200));
     const L=shots.filter(s=>!s.dead&&s.art28===12);const xs=new Set();for(const s of L){const a=Math.round(Math.atan2(s.vx,-s.vy)*180/Math.PI);xs.add(a);}return {n:L.length,angles:[...xs].sort((a,b)=>a-b),sup:superTime}}""")
  chk('#13 Bạo Tẩu có luồng cắt chéo ±16/22/28°',all(a in R['s13']['angles'] for a in [16,22,28,-16,-22,-28]))
  pg.screenshot(path=O+'t86_s13bt.png')
  # hào quang
  R['aura']=pg.evaluate("""async()=>{window.V100=false;/* V100 gỡ chọn tay hào quang: kiểm cơ chế cũ khi tắt V100 */mode='menu';try{PlayScreen.exit(false)}catch{};try{Lobby.show()}catch{};Title84.grant('AURA_STAR_DEVOURER',7);Title84.picker();await new Promise(r=>setTimeout(r,300));
     const ok=!!document.querySelector('#au86:not([hidden]) [data-au="m:off"]');document.querySelector('#au86 [data-au="m:off"]').click();const off=AURA85.pref();const a1=AURA85.allow('title84');document.querySelector('#au86 [data-au="m:auto"]').click();const out={ok,off,a1,a2:AURA85.allow('title84'),fest:AURA85.allow('fest78')};window.V100=true;return out}""")
  chk('Bảng chọn hào quang; Tắt → không vẽ; Tự động → danh hiệu ưu tiên',R['aura']['ok'] and R['aura']['off']=='off' and not R['aura']['a1'] and R['aura']['a2'] and not R['aura']['fest'])
  pg.screenshot(path=O+'t86_picker.png')
  R['errs']=errs[:5];chk('không lỗi JS',not errs);b.close()
print(json.dumps(R,ensure_ascii=False)[:2500]);print('KẾT QUẢ '+' · '.join(OK))
