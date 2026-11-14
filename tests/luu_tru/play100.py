# V100 · CHƠI THỬ TỰ ĐỘNG 10 BƯỚC (bot né đạn, KHÔNG bất tử) trên bản thử *_THU.html
#  Ghi: thắng/thua, thời gian ải, thời gian hạ boss, số lần trúng đạn, máu còn, đỉnh số quái/đạn, thời gian khung hình (máy chủ ảo, chỉ để so sánh tương đối)
import sys,os,json,time
from playwright.sync_api import sync_playwright
F=sys.argv[1];O=sys.argv[2]+'/';os.makedirs(O,exist_ok=True);LOG=[];ERR=[]
def log(*a):
  s=' '.join(str(x) for x in a);print(s,flush=True);LOG.append(s)
BOT="""()=>{if(window.__bot)return;window.__bot={hits:0,pk:{en:0,eb:0,sh:0},ft:[],bossT0:0,bossT:0,wings:[],t0:performance.now()};
 const B=window.__bot;let last=performance.now();
 const loop=t=>{const d=t-last;last=t;if(typeof mode!=='undefined'&&mode==='play'&&d<1000)B.ft.push(d);requestAnimationFrame(loop);};requestAnimationFrame(loop);
 setInterval(()=>{try{const d=document.getElementById('st80');if(d&&!d.hidden){d.hidden=true;window.__st80=0;}}catch{}
  try{if(mode!=='play')return;B.pk.en=Math.max(B.pk.en,enemies.filter(e=>!e.dead).length);B.pk.eb=Math.max(B.pk.eb,bullets.length);B.pk.sh=Math.max(B.pk.sh,shots.length);
   const bs=boss&&!boss.dead&&boss.hp>0&&boss.bossHealthReady;if(bs&&!B.bossT0)B.bossT0=time;if(bs){const w=(boss.parts||[]).filter(p=>!p.dead&&p.hp>0).length;if(B.wl!==w){B.wings.push([Math.round(time-B.bossT0),w]);B.wl=w;}}
   let tx=W/2,ty=H*.74;if(bs){const w=(boss.parts||[]).filter(p=>!p.dead&&p.hp>0);tx=w.length?w.reduce((a,b)=>Math.abs(b.x-player.x)<Math.abs(a.x-player.x)?b:a).x:boss.x;ty=Math.min(H*.82,Math.max(H*.6,boss.y+360));}
   else{const L=enemies.filter(e=>!e.dead&&e.y>20&&e.y<H*.6);if(L.length){const e=L.reduce((a,b)=>Math.abs(b.x-player.x)<Math.abs(a.x-player.x)?b:a);tx=e.x;}}
   let best=null,bd=1e9;for(let dx=-150;dx<=150;dx+=25)for(const dy of [-60,0,50]){const x=Math.max(30,Math.min(W-30,tx+dx)),y=Math.max(H*.45,Math.min(H-50,ty+dy));let dg=0;
     for(const b of bullets){if(b.dead)continue;const px=b.x+(b.vx||0)*.25,py=b.y+(b.vy||0)*.25;const q=Math.hypot(px-x,py-y),q0=Math.hypot(b.x-x,b.y-y);if(q<70)dg+=(70-q)*(70-q);if(q0<45)dg+=(45-q0)*(45-q0)*2;}
     for(const e of enemies){if(e.dead)continue;const q=Math.hypot(e.x-x,e.y-y);if(q<60)dg+=(60-q)*(60-q)*3;}
     dg+=Math.abs(x-tx)*.6+Math.hypot(x-player.x,y-player.y)*.15;if(dg<bd){bd=dg;best=[x,y];}}
   if(best){player.x+=(best[0]-player.x)*.45;player.y+=(best[1]-player.y)*.45;}}catch(e){}},40);}"""
STAT="""()=>{const B=window.__bot||{ft:[]};const f=B.ft.slice(20);const s=[...f].sort((a,b)=>a-b);const avg=f.length?f.reduce((a,b)=>a+b,0)/f.length:0;let tk={};try{tk=Report392.state().taken;}catch{}
 return {mode,lv:level,t:Math.round(time||0),hp:+(hp||0).toFixed(2),maxHp,hits:(tk.bullet|0)+(tk.collision|0),bossT:B.bossT0?Math.round((B.bossEnd||time)-B.bossT0):null,wings:B.wings,pk:B.pk,
  fAvg:+avg.toFixed(1),f95:s.length?+s[Math.floor(s.length*.95)].toFixed(1):0,fps:avg?Math.round(1000/avg):0}}"""
def page(b,thu=True):
  pg=b.new_page(viewport={'width':393,'height':852});pg.on('pageerror',lambda e:ERR.append(str(e)[:160]));pg.on('dialog',lambda d:d.accept())
  pg.goto('file://'+F+'?nopop');pg.wait_for_function("()=>typeof Thu100==='object'&&typeof V100==='object'",timeout=120000);pg.wait_for_timeout(4500)
  pg.evaluate("()=>{document.getElementById('tutorial392')?.remove()}");return pg
def load(pg,acc):
  pg.evaluate("(a)=>Thu100.start(a)",acc)
  for k in range(60):
    pg.wait_for_timeout(3000)
    try:
      if pg.evaluate("()=>sessionStorage.getItem('thu100-step')===null&&typeof Combat==='object'&&typeof V100==='object'"):break
    except Exception:pass
  pg.wait_for_timeout(4000);pg.evaluate("()=>{document.getElementById('tutorial392')?.remove();document.querySelectorAll('.m63').forEach(e=>e.hidden=true)}")
  return pg.evaluate("()=>({cp:Math.round(Combat.stats().cp),cl:Progress.getState().cleared.length})")
def play(pg,st,limit=240,ship=None,eclipse=False,endless=False,name='',force_lose=False,shot=None):
  pg.evaluate("()=>{window.__bot=null}")
  if eclipse: pg.evaluate("(s)=>{mode='menu';try{Lobby.show()}catch{};Eclipse67.launch(s)}",st)
  else: pg.evaluate("""([st,ship,en])=>{mode='menu';try{Lobby.show()}catch{};Progress.setLocked(false);try{V75.addEn(60)}catch{};if(ship!=null)try{selectCraft(ship)}catch{};
      const gm=document.getElementById('gamemode');gm.value=en?'endless':'campaign';try{syncModeSetup()}catch{};document.getElementById('mission-select').value=String(st);Lobby.hide();reset();}""",[st,ship,endless])
  pg.wait_for_timeout(800);pg.evaluate("()=>{if(mode==='pause'){try{resume()}catch{}if(mode==='pause')mode='play';}}");pg.evaluate(BOT)
  t0=time.time();shot_done=False;res=None
  while time.time()-t0<limit:
    pg.wait_for_timeout(1000)
    m=pg.evaluate("()=>{try{if(mode==='pause'&&typeof Revive393!=='undefined'&&Revive393.active&&Revive393.active()){Revive393.finish();}}catch{};if(window.__bot&&boss&&(boss.dead||boss.hp<=0)&&window.__bot.bossT0&&!window.__bot.bossEnd)window.__bot.bossEnd=time;return mode}")
    if force_lose and m=='play' and time.time()-t0>4: pg.evaluate("()=>{invuln=0;hp=0;try{end(false)}catch{}}")
    if shot and not shot_done and time.time()-t0>shot[0]: pg.screenshot(path=O+shot[1]);shot_done=True
    if m in ('reward','over','win','menu') and time.time()-t0>3: break
  r=pg.evaluate(STAT);r['wall']=round(time.time()-t0)
  if r['mode']=='play': r['mode']='HẾT GIỜ ĐO'
  log(name or ('ải %s'%st),json.dumps(r,ensure_ascii=False))
  pg.screenshot(path=O+('end_%s.png'%(name or st)).replace(' ','_'))
  try: pg.evaluate("()=>{try{End78.goLobby()}catch{};mode='menu'}");pg.wait_for_timeout(1500)
  except Exception:pass
  return r
with sync_playwright() as p:
  b=p.chromium.launch(args=['--autoplay-policy=no-user-gesture-required'])
  # ---- Bước 1–3: người chơi mới ----
  pg=page(b);pg.evaluate("()=>{try{Thu100}catch{}}")
  # bản thử sạch: xóa dữ liệu thử rồi tải lại
  pg.evaluate("()=>{const ks=[];for(let i=0;i<localStorage.length;i++){const k=THU100RAW.key(i);if(k&&k.startsWith('thu100:'))ks.push(k);}ks.forEach(k=>THU100RAW.remove(k));}")
  pg.reload();pg.wait_for_function("()=>typeof V100==='object'",timeout=120000);pg.wait_for_timeout(4500);pg.mouse.click(200,450)
  log('== BƯỚC 1: tài khoản mới ==')
  for st in (1,2,3): play(pg,st,limit=150,name='B1 ải %d'%st,shot=(14,'b1_ai%d.png'%st) if st==1 else None)
  pg.wait_for_timeout(2500);log('B1 nhấp nháy tab TRANG BỊ:',pg.evaluate("()=>{const t=document.querySelector('#nav74 [data-t=\"equip\"]');return !!t&&t.getAnimations().length>0}"),'· nhạc:',json.dumps(pg.evaluate("()=>Music96.state()")))
  pg.screenshot(path=O+'b1_sanh.png');pg.close()
  # ---- Bước 2–5: tài khoản ải 20 ----
  pg=page(b);log('== BƯỚC 2–5: tài khoản ải 20 ==',load(pg,20));pg.mouse.click(200,450)
  for st in (5,10): play(pg,st,limit=150,name='B2 ải %d'%st)
  # tạm dừng / tiếp tục
  pg.evaluate("()=>{mode='menu';try{Lobby.show()}catch{};document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value='6';Lobby.hide();reset();if(mode==='pause')mode='play'}");pg.wait_for_timeout(2500)
  pg.evaluate("()=>{try{pause()}catch{}}");pg.wait_for_timeout(800);v1=pg.evaluate("()=>({mode,m:Music96.state()})");pg.evaluate("()=>{try{pause()}catch{}}");pg.wait_for_timeout(600)
  cd=pg.evaluate("()=>{const e=[...document.querySelectorAll('div,span,b')].find(x=>x.offsetParent&&/^[123]$|CHIẾN!/.test((x.textContent||'').trim()));return e?e.textContent.trim():null}")
  log('B2 tạm dừng:',v1['mode'],'· đếm ngược thấy:',cd);pg.evaluate("()=>{try{End78.goLobby()}catch{};mode='menu'}");pg.wait_for_timeout(1500)
  log('B3 nhấp nháy tab PHI ĐỘI:',pg.evaluate("()=>{const t=document.querySelector('#nav74 [data-t=\"fleet\"]');return !!t&&t.getAnimations().length>0}"))
  play(pg,20,limit=40,name='B4 ải 20 thua 1',force_lose=True);play(pg,20,limit=40,name='B4 ải 20 thua 2',force_lose=True)
  log('B4 cứu trợ:',json.dumps(pg.evaluate("()=>({fail:V94.state().S.fail})")))
  r=play(pg,20,limit=200,name='B4 ải 20 lần 3 (có cứu trợ)',shot=(40,'b4_boss20.png'))
  log('B4 âm thanh/rung:',json.dumps(pg.evaluate("()=>V96.state().n")))
  # bước 5: càn quét 1 chạm + nhận tất cả
  pg.evaluate("()=>{for(const n of [16,17,18])Campaign36.recordStars(n,3);ChapterMap.open()}");pg.wait_for_timeout(1500)
  q=pg.evaluate("()=>{const b=document.querySelector('.cm-node .qs93');const e0=V75.energy();if(b)b.click();return {btn:!!b,de:e0-V75.energy()}}");log('B5 càn quét ⚡:',q)
  pg.evaluate("()=>{ChapterMap.close();Meta40.rewardsPanel('ach')}");pg.wait_for_timeout(1200)
  a=pg.evaluate("()=>{const b=document.querySelector('.aa93');const n=document.querySelectorAll('.ach.ok button[data-a]:not([disabled])').length;if(b&&n)b.click();return {btn:!!b,ready:n,left:document.querySelectorAll('.ach.ok button[data-a]:not([disabled])').length}}");log('B5 NHẬN TẤT CẢ:',a)
  pg.evaluate("()=>{document.querySelectorAll('#m40,.m63').forEach(e=>e.hidden=true)}");pg.close()
  # ---- Bước 6: ải 120 bậc S ----
  pg=page(b);log('== BƯỚC 6: tài khoản ải 120 ==',load(pg,120));pg.mouse.click(200,450)
  play(pg,120,limit=260,ship=6,name='B6 ải 120 tàu #7',shot=(60,'b6_boss120.png'))
  log('B6 thanh sát thương:',pg.evaluate("()=>V98.state().D"))
  play(pg,120,limit=260,ship=0,name='B6 ải 120 tàu #1');pg.close()
  # ---- Bước 7: ải 160 ĐẸP / NHẸ ----
  pg=page(b);log('== BƯỚC 7: tài khoản ải 160 ==',load(pg,160));pg.mouse.click(200,450)
  pg.evaluate("()=>{try{VisualFX.setQuality('high')}catch{}}");r1=play(pg,160,limit=300,name='B7 ải 160 ĐẸP',shot=(30,'b7_dep.png'))
  pg.evaluate("()=>{try{VisualFX.setQuality('light')}catch{}}");r2=play(pg,160,limit=300,name='B7 ải 160 NHẸ',shot=(30,'b7_nhe.png'));pg.close()
  # ---- Bước 8–10: ải 200 ----
  pg=page(b);log('== BƯỚC 8–10: tài khoản ải 200 ==',load(pg,200));pg.mouse.click(200,450)
  play(pg,180,limit=300,ship=12,name='B8 ải 180',shot=(50,'b8_boss180.png'))
  play(pg,200,limit=300,ship=12,name='B8 ải 200',shot=(50,'b8_boss200.png'))
  pg.evaluate("()=>{V91.setPact(['r01','r05','r07'])}");r=play(pg,161,limit=200,eclipse=True,name='B9 Nguyệt Thực E161 (Chuẩn +55%)',shot=(20,'b9_e161.png'))
  log('B9 nhạc:',json.dumps(pg.evaluate("()=>Music96.state()")))
  play(pg,1,limit=330,endless=True,name='B10 Vô tận ~5 phút',shot=(200,'b10_votan.png'))
  log('B10 hạng mùa:',json.dumps(pg.evaluate("()=>V92.rank()"),ensure_ascii=False));pg.close()
  b.close()
log('LỖI JS:',len(ERR),ERR[:5])
open(O+'ket_qua.txt','w').write('\n'.join(LOG))
