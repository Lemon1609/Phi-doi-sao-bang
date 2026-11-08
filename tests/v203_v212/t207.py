import sys,json,os
HTML=sys.argv[1]
src=open('claude_tools/do_dac/t193.py').read().split('# ---------------- V190')[0]
sys.argv=['x',HTML,'180'];exec(src)
OK=[]
def chk(n,c,info=''):OK.append(bool(c));print(('✓ ' if c else '✗ ')+n,str(info)[:500],flush=True)
BOT="""()=>{window.__iv&&clearInterval(window.__iv);window.__iv=setInterval(()=>{try{invuln=999;if(!(V207X.active()&&V207X.active().mod==='one_hp_glass'))hp=maxHp;power=5;powerUpgrades=4;if(mode==='play'){if(boss&&!boss.dead){const w=(boss.parts||[]).filter(p=>!p.dead&&p.hp>0);const tx=w.length?w.reduce((a,b)=>b.hp<a.hp?b:a).x:boss.x;player.x+=(tx-player.x)*.3;player.y=Math.min(H-80,boss.y+330);}}}catch{}},50)}"""
def wait_panel(cap=1500):
  for i in range(cap):
    if pg.evaluate("()=>!!document.querySelector('.v207 h3') && !V207X.active()"):return True
    pg.wait_for_timeout(200)
  return False
with sync_playwright() as p:
  br=p.chromium.launch();pg,errs,o=setup(br,'SS')
  t=pg.evaluate("()=>({t:V207X.today(),r:V207X.rushStages()})");print('info',t)
  chk('Có thử thách hôm nay và 4 boss rush',t['t'] and len(t['r'])==4,t)
  pg.evaluate("()=>V207X.openDaily()");pg.wait_for_timeout(500)
  pg.screenshot(path='/tmp/V207_ngay.png')
  s0=pg.evaluate("()=>({en:V75.energy(),cry:Chip72.state().mat.cry,core:Chip72.state().mat.core,cr:Progress.balance(),h:V70.have('sss_core')})")
  pg.evaluate("()=>{document.querySelector('.v207 [data-v207=daily]').click()}");pg.evaluate(BOT)
  ok=wait_panel()
  pg.wait_for_timeout(2000)
  r=pg.evaluate("()=>({txt:document.querySelector('.v207').innerText,en:V75.energy(),cry:Chip72.state().mat.cry,core:Chip72.state().mat.core,cr:Progress.balance(),h:V70.have('sss_core'),st:V207X.state(),mode})")
  chk('Thử thách ngày: hoàn thành → bảng kết quả',ok and 'HOÀN THÀNH' in r['txt'],r['txt'][:300])
  chk('Thưởng ngày đúng: +40 tinh thể +1 lõi +8000 ◈ +2 hạch, không tốn năng lượng',r['cry']-s0['cry']==40 and r['core']-s0['core']==1 and r['cr']-s0['cr']==8000 and r['h']-s0['h']==2 and r['en']>=s0['en'],{k:(r[k]-s0[k]) for k in ('cry','core','cr','h','en')})
  pg.screenshot(path='/tmp/V207_ngay_kq.png')
  # lần 2 trong ngày: không thưởng
  pg.evaluate("()=>{document.querySelector('.v207').remove();V207X.start('daily')}");pg.evaluate(BOT);wait_panel()
  r2=pg.evaluate("()=>({txt:document.querySelector('.v207').innerText,cry:Chip72.state().mat.cry})")
  chk('Lần thắng thứ 2 trong ngày không thưởng thêm',r2['cry']==r['cry'] and 'Đã nhận thưởng' in r2['txt'],r2['txt'][:200])
  # Boss Rush
  pg.evaluate("()=>{document.querySelector('.v207').remove();V207X.openRush()}");pg.wait_for_timeout(400)
  pg.screenshot(path='/tmp/V207_rush.png')
  s1=pg.evaluate("()=>({coder:Chip72.state().mat.coder,core:Chip72.state().mat.core,cr:Progress.balance(),h:V70.have('sss_core'),en:V75.energy()})")
  pg.evaluate("()=>{document.querySelector('.v207 [data-v207=rush]').click()}");pg.evaluate(BOT)
  ok=wait_panel(3000)
  pg.wait_for_timeout(2000)
  r3=pg.evaluate("()=>({txt:document.querySelector('.v207').innerText,coder:Chip72.state().mat.coder,core:Chip72.state().mat.core,cr:Progress.balance(),h:V70.have('sss_core'),en:V75.energy(),st:V207X.state()})")
  chk('Boss Rush: hạ đủ 4/4 boss',ok and '4/4' in r3['txt'],r3['txt'][:400])
  chk('Thưởng Boss Rush: +1 mã hóa +1 lõi +2 hạch +10000 ◈, còn 2/3 lượt',r3['coder']-s1['coder']==1 and r3['core']-s1['core']==1 and r3['h']-s1['h']==2 and r3['cr']-s1['cr']==10000 and r3['st']['rN']==1 and r3['en']>=s1['en'],{k:(r3[k]-s1[k]) for k in ('coder','core','cr','h','en')})
  pg.screenshot(path='/tmp/V207_rush_kq.png')
  # 4 lượt: lượt 4 trong tuần không thưởng
  pg.evaluate("()=>{V207X._set({rN:3})}")
  pg.evaluate("()=>{document.querySelector('.v207').remove();V207X.start('rush')}");pg.evaluate(BOT);wait_panel(3000)
  r4=pg.evaluate("()=>({txt:document.querySelector('.v207').innerText,coder:Chip72.state().mat.coder})")
  chk('Hết 3 lượt/tuần thì không thưởng',r4['coder']==r3['coder'] and 'hết 3 lượt' in r4['txt'],r4['txt'][:200])
  chk('Không lỗi JS',not errs,errs[:3])
  print(sum(OK),'/',len(OK));br.close()
