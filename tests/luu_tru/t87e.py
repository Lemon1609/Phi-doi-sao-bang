# V87 · REVIEW87 Câu 4: dựng tài khoản cuối game (ENDGAME_SAMPLE_V87) ở đúng lực chiến mục tiêu, đo ST/s thật lên boss
# Dùng: python3 tests/t87e.py <html> <ải> <CP mục tiêu> [giây]
import sys,json,os
from playwright.sync_api import sync_playwright
f=sys.argv[1];ST=int(sys.argv[2]);CP=int(sys.argv[3]);SECS=int(sys.argv[4]) if len(sys.argv)>4 else 60
SEED="if(!sessionStorage.getItem('pr')){sessionStorage.setItem('pr','1');const h=JSON.parse(localStorage.getItem('saobang-hangar-v1')||'{}');h.cleared=Array.from({length:199},(_,i)=>i+1);localStorage.setItem('saobang-hangar-v1',JSON.stringify(h));}"
LV="if(!sessionStorage.getItem('lv')){sessionStorage.setItem('lv','1');const w=JSON.parse(localStorage.getItem('saobang-workshop-v1')||'null');if(w){w.craftLevels=w.craftLevels.map(()=>100);w.crafts=w.crafts.map(()=>'SS');localStorage.setItem('saobang-workshop-v1',JSON.stringify(w));}}"
with sync_playwright() as p:
  b=p.chromium.launch();pg=b.new_page(viewport={'width':393,'height':852});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
  pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(2000);pg.add_init_script(SEED);pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(5000)
  pg.evaluate("()=>{for(let i=0;i<13;i++)try{Campaign36.acquire('craft',i,'','story')}catch{};for(let i=0;i<13;i++)V70.setTier('craft',i,11);Progress.setLocked(false);Progress.grantCredits(5e8);try{Workshop.exp70(1e8)}catch{};for(const m of [...Campaign36.sets[12],...Campaign36.sets[0],...Campaign36.sets[6]])Campaign36.acquire('gear',m,'SS','endless');}")
  pg.wait_for_timeout(1500);pg.add_init_script(LV);pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(5000)
  info=pg.evaluate("""(CP)=>{document.getElementById('tutorial392')?.remove();window.RULE84=false;window.TITLE84=false;document.querySelectorAll('.m63,.adv70,.st71').forEach(e=>e.hidden=true);
    Progress.setLocked(false);Progress.grantCredits(5e8);try{Workshop.exp70(1e8)}catch{};selectCraft(12);launchCraft=12;const FU=(__FU__);SSS87._set({done:FU?{12:1}:{},off:{}});Wing87._set({id:__WG__?9:null});
    // trang bị SS tốt nhất mỗi loại, Tím+5, nâng cấp dần tới lực chiến mục tiêu
    const its=Progress.getState().items;const best={};for(const it of its){if(it.grade!=='SS')continue;if(!best[it.kind])best[it.kind]=it;}
    for(const k in best){V70.setTier('gear',best[k].id,11);Progress.equip(best[k].id);}
    let guard=0;const ids=Object.values(best).map(x=>x.id);while(Combat.stats().cp<CP&&guard<1500){const id=ids[guard%ids.length];if(Progress.upgrade(id)===false&&guard>ids.length*120)break;guard++;}
    return {fuse:FU,cp:Combat.stats().cp,stats:Combat.stats(),eq:ids.map(id=>{const it=Progress.v70.get(id);return [it.variant,it.grade,it.level]}),craft:Workshop.craftProgress(12),req:Meta40.reqCP(%d)}}""".replace('%d',str(ST)).replace('__FU__',os.environ.get('FUSE','1')).replace('__WG__',os.environ.get('WING','1')),CP)
  pg.evaluate("(st)=>{if(!window.__iv)window.__iv=setInterval(()=>{try{invuln=999;hp=maxHp;const d=document.getElementById('st80');if(d)d.hidden=true;window.__st80=0;}catch{}},150);try{Ch9.open=()=>true}catch{};document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value=String(st);Lobby.hide();reset();if(mode==='pause'){try{resume()}catch{}if(mode==='pause')mode='play';}}",ST)
  for _ in range(240):
    if pg.evaluate("()=>!!(boss&&boss.bossHealthReady&&boss.y>80)"):break
    pg.evaluate("()=>{try{for(const e of enemies)if(!e.boss)e.dead=true;}catch{};power=5;powerUpgrades=4}");pg.wait_for_timeout(250)
  pg.evaluate("()=>{window.__hp87=()=>Math.round((boss.hp||0)+(boss.coreHp||0)+(boss.parts||[]).reduce((a,p)=>a+Math.max(0,p.hp||0),0))}")
  H0=pg.evaluate("()=>window.__hp87()");t0=pg.evaluate("()=>time");dead=False
  for k in range(SECS):
    pg.wait_for_timeout(1000)
    if pg.evaluate("()=>!boss||boss.dead||!!boss.defeatStarted||mode!=='play'"):dead=True;break
  t1=pg.evaluate("()=>time");H1=0 if dead else pg.evaluate("()=>window.__hp87()")
  info.update(stage=ST,hp0=H0,lost=H0-H1,gameSec=round(t1-t0,1),dps=round((H0-H1)/max(.1,t1-t0),1),killed=dead,factor=pg.evaluate("()=>Combat.factor()"),sss=SSS87.state() if False else pg.evaluate("()=>SSS87.state().nCast"),wing=pg.evaluate("()=>Wing87.state().ratio"))
  info['errs']=errs[:3];print(json.dumps(info,ensure_ascii=False));b.close()
