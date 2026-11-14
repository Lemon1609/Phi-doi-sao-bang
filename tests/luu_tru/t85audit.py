# V85 · RÀ SOÁT TOÀN BỘ: đo sát thương 13 chiến cơ + 13 bộ trang bị (trên boss bất tử của boss cuối tuần, cùng ải 60, khung Trắng),
# chụp đạn từng chiếc (cấp 5 + Bạo Tẩu), chụp boss các chương, các màn giao diện chính, đo FPS khi CPU chậm ×4 (giả lập điện thoại).
# Dùng: python3 tests/t85audit.py <html tuyệt đối> <thư_mục_ảnh> [phần: ships,gear,boss,ui,perf]
import sys,json,os
from playwright.sync_api import sync_playwright
f=sys.argv[1];O=sys.argv[2]+'/';PARTS=(sys.argv[3] if len(sys.argv)>3 else 'ships,gear,boss,ui,perf').split(',');os.makedirs(O,exist_ok=True)
SEED="""if(!sessionStorage.getItem('a85')){sessionStorage.setItem('a85','1');const h=JSON.parse(localStorage.getItem('saobang-hangar-v1')||'{}');h.cleared=Array.from({length:%d},(_,i)=>i+1);localStorage.setItem('saobang-hangar-v1',JSON.stringify(h));}"""
R={}
def page(b,n=60):
  pg=b.new_page(viewport={'width':393,'height':852});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
  pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(2000);pg.add_init_script(SEED%n);pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(5500)
  pg.evaluate("()=>{document.getElementById('tutorial392')?.remove();window.RAID83_ALWAYS=true;window.RULE84=false;window.TITLE84=false;try{V75.addEn(900)}catch{};for(let i=0;i<13;i++)try{Campaign36.acquire('craft',i,'','story')}catch{};document.querySelectorAll('.m63,.adv70,.st71').forEach(e=>e.hidden=true)}")
  pg.wait_for_timeout(800);return pg,errs
RAIDGO="""()=>{const s=Event83.state();Event83._set({raid:Object.assign(s.raid,{att:{d:s.raid.att.d,n:0,paid:0}})});Event83.start(false);setInterval(()=>{try{invuln=999;hp=maxHp;}catch{}},200);return mode}"""
WAIT="()=>{const s=Event83.state().RD;return !!(s&&s.t>0.2)}"
def raid_measure(pg,tag,shots=True):
  pg.evaluate(RAIDGO)
  for _ in range(60):
    if pg.evaluate(WAIT):break
    pg.wait_for_timeout(300)
  pg.evaluate("()=>{power=5;powerUpgrades=4;Report392.reset&&Report392.reset();for(const q of boss.parts||[]){q.hp=0;q.dead=true;}}");pg.wait_for_timeout(2000)
  a=pg.evaluate("()=>({d:Event83.state().RD.dmg,t:Event83.state().RD.t,r:Report392.state().dealt})")
  sc=[]
  for k in range(8):
    pg.wait_for_timeout(1000);sc.append(pg.evaluate("()=>shots.filter(s=>!s.dead).length"))
    if k==4 and shots:pg.screenshot(path=O+tag+'_p5.png',clip={'x':0,'y':200,'width':393,'height':652})
  b=pg.evaluate("()=>({d:Event83.state().RD.dmg,t:Event83.state().RD.t,r:Report392.state().dealt})")
  pg.evaluate("()=>{try{activateSuper()}catch(e){superTime=8}}");pg.wait_for_timeout(1000)
  c=pg.evaluate("()=>({d:Event83.state().RD.dmg,t:Event83.state().RD.t,sup:superTime})");ss=[]
  for k in range(5):
    pg.wait_for_timeout(1000);ss.append(pg.evaluate("()=>shots.filter(s=>!s.dead).length"))
    if k==2 and shots:pg.screenshot(path=O+tag+'_bt.png',clip={'x':0,'y':200,'width':393,'height':652})
  d=pg.evaluate("()=>({d:Event83.state().RD.dmg,t:Event83.state().RD.t,sup:superTime})")
  out={'dps5':round((b['d']-a['d'])/max(.1,b['t']-a['t']),2),'dpsBT':round((d['d']-c['d'])/max(.1,d['t']-c['t']),2),'shots5':round(sum(sc)/len(sc),1),'shotsBT':round(sum(ss)/len(ss),1),
       'gear':round(b['r']['gear']-a['r']['gear'],1),'skill':round(b['r']['skill']-a['r']['skill'],1),'main':round(b['r']['main']-a['r']['main'],1),'supLeft':c['sup']}
  pg.evaluate("()=>{try{Event83._finish()}catch{}}");pg.wait_for_timeout(1500);pg.evaluate("()=>{document.querySelectorAll('#rd83r').forEach(e=>e.hidden=true)}")
  return out
with sync_playwright() as p:
  b=p.chromium.launch()
  if 'ships' in PARTS:
    pg,errs=page(b);R['ships']={}
    for i in [int(x) for x in os.environ.get('SHIPS','0,1,2,3,4,5,6,7,8,9,10,11,12').split(',')]:
      pg.evaluate("(i)=>{mode='menu';try{Lobby.show()}catch{};selectCraft(i)}",i);pg.wait_for_timeout(500)
      sel=pg.evaluate("()=>selected")
      R['ships'][i]=dict(raid_measure(pg,'ship%02d'%i),name=pg.evaluate("(i)=>Fighters28.profiles[i].name",i),sel=sel)
      print('ship',i,R['ships'][i],flush=True)
    R['ships_err']=errs[:5];pg.close()
  if 'gear' in PARTS:
    pg,errs=page(b);R['gear']={}
    sets=pg.evaluate("()=>Campaign36.sets")
    TIER=int(os.environ.get('TIER','0'));REP=int(os.environ.get('REP','1'))
    for k in [int(x) for x in os.environ.get('SETS',','.join(str(i) for i in range(len(sets)))).split(',')]:
     st=sets[k]
     for rep in range(REP):
      ok=pg.evaluate("""(a)=>{const [st,n]=a;mode='menu';try{Lobby.show()}catch{};Progress.setLocked(false);const out=[];for(const m of st){const r=Campaign36.acquire('gear',m,'','story');const it=Progress.getState().items.filter(x=>x.variant===m).slice(-1)[0];if(it){if(n)try{V70.setTier('gear',it.id,n)}catch{};Progress.equip(it.id);out.push(it.kind)}}selectCraft(0);return out}""",[st,TIER])
      R['gear'][str(k)+('' if REP==1 else '_'+str(rep))]=dict(raid_measure(pg,'gear%02d'%k,shots=rep==0),set=st,eq=ok,g81=pg.evaluate("()=>{try{return Gear81.state().boss86}catch{return null}}"))
      print('gear',k,rep,R['gear'][str(k)+('' if REP==1 else '_'+str(rep))],flush=True)
    R['gear_err']=errs[:5];pg.close()
  if 'boss' in PARTS:
    pg,errs=page(b,180);R['boss']={}
    for st in [20,40,60,80,100,120,140,160,180]:
      pg.evaluate("(st)=>{mode='menu';try{Lobby.show()}catch{};try{Ch9.open=()=>true}catch{};Progress.setLocked(false);document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value=String(st);Lobby.hide();reset();if(!window.__iv)window.__iv=setInterval(()=>{try{invuln=999;hp=maxHp;const d=document.getElementById('st80');if(d)d.hidden=true;window.__st80=0;}catch{}},150);}",st)
      for _ in range(160):
        if pg.evaluate("()=>!!(boss&&boss.bossHealthReady&&boss.y>80)"):break
        pg.evaluate("()=>{try{for(const e of enemies)if(!e.boss)e.dead=true;}catch{}}");pg.wait_for_timeout(250)
      pg.wait_for_timeout(2500);pg.screenshot(path=O+'boss%03d.png'%st)
      R['boss'][st]=pg.evaluate("()=>({name:(window.BOSSNAME80||{})[level]||'',art:(()=>{try{return !!Boss82.stageArt&&!!Boss82.stageArt(boss)}catch(e){return 'err'}})(),b75:B75.state(),w:Math.round(boss.hitW||0)})")
    R['boss_err']=errs[:5];pg.close()
  if 'ui' in PARTS:
    pg,errs=page(b,180);R['ui']=[]
    for t in ['home','combat','fleet','equip','shop']:
      pg.evaluate("(t)=>{try{Nav74.tab(t)}catch{}}",t);pg.wait_for_timeout(1500);pg.screenshot(path=O+'ui_'+t+'.png');R['ui'].append(t)
    for nm,js in [('event','Event83.open()'),('skin','Skin69&&Skin69.open&&Skin69.open()'),('pilot','Pilot67&&Pilot67.open&&Pilot67.open()'),('evo','Evo82&&Evo82.open&&Evo82.open()'),('ach','Ach79&&Ach79.open&&Ach79.open()')]:
      try:
        pg.evaluate("()=>{try{Nav74.tab('home')}catch{};document.querySelectorAll('.m63').forEach(e=>e.hidden=true)}");pg.evaluate("()=>{try{"+js+"}catch(e){return String(e)}}");pg.wait_for_timeout(1200);pg.screenshot(path=O+'ui_'+nm+'.png');R['ui'].append(nm)
      except Exception as e:R['ui'].append(nm+':'+str(e)[:80])
    R['ui_err']=errs[:5];pg.close()
  if 'perf' in PARTS:
    R['perf']={}
    for nm,setup in [('ai60_thuong',"()=>{document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value='59'}"),
                     ('boss180_pha3',"()=>{try{Ch9.open=()=>true}catch{};document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value='180'}"),
                     ('vo_tan',"()=>{document.getElementById('gamemode').value='endless'}")]:
      pg,errs=page(b,180)
      cdp=pg.context.new_cdp_session(pg)
      pg.evaluate(setup);pg.evaluate("()=>{mode='menu';Progress.setLocked(false);Lobby.hide();reset();selectCraft&&0;setInterval(()=>{try{invuln=999;hp=maxHp;const d=document.getElementById('st80');if(d)d.hidden=true;window.__st80=0;}catch{}},200)}")
      if nm=='boss180_pha3':
        for _ in range(160):
          if pg.evaluate("()=>!!(boss&&boss.bossHealthReady)"):break
          pg.evaluate("()=>{try{for(const e of enemies)if(!e.boss)e.dead=true;}catch{}}");pg.wait_for_timeout(250)
        pg.evaluate("()=>{window.__b75r=.15;power=5;activateSuper()}")
      if nm=='vo_tan':pg.evaluate("()=>{try{level=30}catch{};power=5}")
      pg.wait_for_timeout(3000)
      cdp.send('Emulation.setCPUThrottlingRate',{'rate':4})
      fps=pg.evaluate("""async()=>{let n=0,t0=performance.now(),worst=0,last=t0;const ent=[];await new Promise(r=>{function f(t){n++;worst=Math.max(worst,t-last);last=t;if(t-t0<6000)requestAnimationFrame(f);else r();}requestAnimationFrame(f);});
         return {fps:Math.round(n/((performance.now()-t0)/1000)),worstMs:Math.round(worst),bullets:bullets.length,shots:shots.length,enemies:enemies.length,mode}}""")
      cdp.send('Emulation.setCPUThrottlingRate',{'rate':1})
      R['perf'][nm]=fps;print('perf',nm,fps,flush=True);pg.close()
  b.close()
json.dump(R,open(O+'audit.json','w'),ensure_ascii=False,indent=1);print('XONG')
