# Thời gian bot hạ boss (máu thật) · tài khoản mẫu t193 theo ải · BAL205 bật/tắt
import sys,os,json
HTML=sys.argv[1];ST=int(sys.argv[2]);FLAG=sys.argv[3]  # on|off
src=open('claude_tools/do_dac/t193.py').read().split('# ---------------- V190')[0]
sys.argv=['x',HTML,str(ST)];exec(src)
GR='' if ST<100 else 'S' if ST<140 else 'SS'
with sync_playwright() as p:
  br=p.chromium.launch();pg,errs,o=setup(br,GR)
  pg.evaluate("(f)=>{window.BAL205=f==='on'?undefined:false;}",FLAG)
  out=[]
  for k in range(int(os.environ.get('N','2'))):
    pg.evaluate("()=>{window.__iv&&clearInterval(window.__iv);window.__iv=null}")
    pg.evaluate("""(st)=>{mode='menu';try{Lobby.show()}catch{};Progress.setLocked(false);try{V75.addEn(99)}catch{};document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value=String(st);Lobby.hide();reset();if(mode==='pause')mode='play';
      window.__iv=setInterval(()=>{try{invuln=999;hp=maxHp;superTime=0;power=5;powerUpgrades=4;if(mode==='play'){if(boss&&!boss.dead){const w=(boss.parts||[]).filter(p=>!p.dead&&p.hp>0);const tx=w.length?w.reduce((a,b)=>b.hp<a.hp?b:a).x:boss.x;player.x+=(tx-player.x)*.3;player.y=Math.min(H-80,boss.y+330);}for(const e of enemies)if(!e.boss&&!e.bossPart)e.dead=true;}}catch{}},50);
      setTimeout(()=>{try{enemies=[];startBoss();}catch{}},600);}""",ST)
    for _ in range(600):
      if pg.evaluate("()=>!!(boss&&boss.bossHealthReady)"):break
      pg.wait_for_timeout(200)
    pg.wait_for_timeout(300)
    t0=pg.evaluate("()=>({t:time,max:boss.max,k:boss.__b205||1})")
    t=None
    for _ in range(int(os.environ.get("CAP","4000"))):
      r=pg.evaluate("()=>({done:!boss||boss.dead||boss.defeatStarted||mode!=='play',t:time})")
      if r['done']:t=round(r['t']-t0['t'],1);break
      pg.wait_for_timeout(100)
    out.append({'giay':t,'mau_boss':round(t0['max']),'k':t0['k']})
  res={'stage':ST,'flag':FLAG,'cp':o.get('cp'),'ship':b['ship'],'grade':GR,'lan':out}
  print(json.dumps(res,ensure_ascii=False),flush=True);br.close()
