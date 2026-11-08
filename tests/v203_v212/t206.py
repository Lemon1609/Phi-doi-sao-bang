import sys,json,os
HTML=sys.argv[1]
src=open('claude_tools/do_dac/t193.py').read().split('# ---------------- V190')[0]
sys.argv=['x',HTML,'120'];exec(src)
OK=[]
def chk(n,c,info=''):OK.append(bool(c));print(('✓ ' if c else '✗ ')+n,str(info)[:400],flush=True)
BOT="""()=>{window.__iv&&clearInterval(window.__iv);window.__iv=setInterval(()=>{try{invuln=999;hp=maxHp;superTime=0;power=5;powerUpgrades=4;if(mode==='play'){if(boss&&!boss.dead){const w=(boss.parts||[]).filter(p=>!p.dead&&p.hp>0);const tx=w.length?w.reduce((a,b)=>Math.abs(b.x-player.x)<Math.abs(a.x-player.x)?a:b).x:boss.x;player.x+=(tx-player.x)*.3;player.y=Math.min(H-80,boss.y+330);}for(const e of enemies)if(!e.boss&&!e.bossPart)e.dead=true;}}catch{}},50)}"""
with sync_playwright() as p:
  br=p.chromium.launch();pg,errs,o=setup(br,'S')
  # 1) trận thật ải 120 → thẻ kết quả
  pg.evaluate("""()=>{mode='menu';Lobby.show();try{V75.addEn(99)}catch{};document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value='120';Lobby.hide();reset();if(mode==='pause')mode='play';setTimeout(()=>{enemies=[];startBoss();},600);}""")
  pg.evaluate(BOT)
  cut=None
  for i in range(900):
    r=pg.evaluate("()=>({m:mode,b:!!boss,core:boss?Math.round(boss.coreHp):0,cm:boss?Math.round(boss.coreMax||0):0,w:boss?(boss.parts||[]).filter(p=>p.dead||p.hp<=0).length:0,rs:!!document.querySelector('#rs .s206')})")
    if r['rs']:break
    pg.wait_for_timeout(200)
  pg.wait_for_timeout(1200)
  info=pg.evaluate("()=>{const s=document.querySelector('#rs .s206');return {txt:s?s.innerText:null,det:(document.querySelector('#rs details')||{}).innerText,st:V206X.state().R}}")
  chk('Thẻ kết quả có bảng tổng kết V206',info['txt'] and 'Hạ boss' in info['txt'] and 'Sát thương / giây' in info['txt'],info)
  pg.evaluate("()=>{const d=document.querySelector('#rs details');if(d)d.open=true;const s=document.querySelector('#rs');s&&s.scrollIntoView({block:'start'})}");pg.wait_for_timeout(500)
  pg.screenshot(path='/tmp/V206_tong_ket.png')
  # 2) Cài đặt
  pg.evaluate("()=>{try{document.getElementById('overlay').hidden=true;mode='menu';Lobby.show();}catch{};Gfx66.open()}");pg.wait_for_timeout(1500)
  t=pg.evaluate("()=>{const b=document.querySelector('.st206');return b?b.innerText:null}")
  chk('Cài đặt có 2 công tắc Rung màn hình / Chậm cảnh hạ boss',t and 'Rung màn hình' in t and 'Chậm cảnh' in t,t)
  r=pg.evaluate("()=>{document.querySelector('[data-s206=shake]').click();const a=FX16.feedback.screenShake.onBossDestroy.amp;document.querySelector('[data-s206=shake]').click();return [a,FX16.feedback.screenShake.onBossDestroy.amp]}")
  chk('Tắt rung → biên độ 0, bật lại → 3 px',r==[0,3],r)
  pg.screenshot(path='/tmp/V206_cai_dat.png')
  pg.evaluate("()=>{try{Gfx66.close()}catch{}}")
  # 3) Luyện tập
  st0=pg.evaluate("()=>({en:V75.energy(),cr:Progress.balance(),ms:JSON.stringify(Missions393.state?Missions393.state():null)})")
  pg.evaluate("()=>V206X.pracOpen()");pg.wait_for_timeout(500)
  pt=pg.evaluate("()=>{const p=document.querySelector('.p206');return p?p.innerText:null}")
  chk('Mở bảng Luyện tập boss',pt and 'LUYỆN TẬP BOSS' in pt,pt)
  pg.screenshot(path='/tmp/V206_luyen_tap.png')
  pg.evaluate("()=>{const p=document.querySelector('.p206');p&&p.remove();V206X.pracStart(100,true)}")
  pg.evaluate(BOT)
  for i in range(900):
    if pg.evaluate("()=>!!document.querySelector('.p206 .s206')"):break
    pg.wait_for_timeout(200)
  r=pg.evaluate("()=>{const p=document.querySelector('.p206');return {txt:p?p.innerText:null,en:V75.energy(),cr:Progress.balance(),ms:JSON.stringify(Missions393.state?Missions393.state():null),mode,act:V206X.active()}}")
  chk('Luyện tập: hạ boss → bảng tổng kết riêng, về sảnh',r['txt'] and 'ĐÃ HẠ BOSS' in r['txt'] and r['mode']=='menu' and not r['act'],r['txt'])
  chk('Luyện tập không tốn năng lượng, không cộng hợp kim, không tính nhiệm vụ',r['en']>=st0['en'] and r['cr']==st0['cr'] and r['ms']==st0['ms'],{'truoc':st0,'sau':{k:r[k] for k in ('en','cr','ms')}})
  pg.screenshot(path='/tmp/V206_luyen_tap_kq.png')
  chk('Không lỗi JS',not errs,errs[:3])
  print(sum(OK),'/',len(OK));br.close()
