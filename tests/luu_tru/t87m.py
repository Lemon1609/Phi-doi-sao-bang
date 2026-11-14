# V87 · số đo cho Gemini (REVIEW86 H5 §3): boss 180 cuối game · đồng đội 25% (+FPS CPU×4) · 3 hợp thể SSS (boss + dọn quái 15 s)
# Dùng: python3 tests/t87m.py <html> <thư mục> [boss180,wing,sss]
import sys,json,os
from playwright.sync_api import sync_playwright
f=sys.argv[1];O=sys.argv[2]+'/';PARTS=(sys.argv[3] if len(sys.argv)>3 else 'boss180,wing,sss').split(',');os.makedirs(O,exist_ok=True);R={}
SEED="if(!sessionStorage.getItem('m87')){sessionStorage.setItem('m87','1');const h=JSON.parse(localStorage.getItem('saobang-hangar-v1')||'{}');h.cleared=Array.from({length:180},(_,i)=>i+1);localStorage.setItem('saobang-hangar-v1',JSON.stringify(h));const w=JSON.parse(localStorage.getItem('saobang-workshop-v1')||'null');if(w&&w.craftLevels){w.craftLevels=w.craftLevels.map(()=>100);localStorage.setItem('saobang-workshop-v1',JSON.stringify(w));}}"
def page(b):
  pg=b.new_page(viewport={'width':393,'height':852});errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
  pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(2000);pg.add_init_script(SEED);pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(5500)
  pg.evaluate("()=>{document.getElementById('tutorial392')?.remove();window.RAID83_ALWAYS=true;window.RULE84=false;window.TITLE84=false;try{V75.addEn(900)}catch{};try{Ch9.open=()=>true}catch{};for(let i=0;i<13;i++)try{Campaign36.acquire('craft',i,'','story')}catch{};document.querySelectorAll('.m63,.adv70,.st71').forEach(e=>e.hidden=true);Wing87._set({id:null})}")
  pg.wait_for_timeout(600);return pg,errs
INV="()=>{if(!window.__iv)window.__iv=setInterval(()=>{try{invuln=999;hp=maxHp;const d=document.getElementById('st80');if(d)d.hidden=true;window.__st80=0;}catch{}},150)}"
RAIDGO="""()=>{const s=Event83.state();Event83._set({raid:Object.assign(s.raid,{att:{d:s.raid.att.d,n:0,paid:0}})});Event83.start(false);return mode}"""
def raid(pg,secs=8):
  pg.evaluate(INV);pg.evaluate(RAIDGO)
  for _ in range(60):
    if pg.evaluate("()=>{const s=Event83.state().RD;return !!(s&&s.t>0.2)}"):break
    pg.wait_for_timeout(300)
  pg.evaluate("()=>{power=5;powerUpgrades=4;for(const q of boss.parts||[]){q.hp=0;q.dead=true;}}");pg.wait_for_timeout(int(os.environ.get('WARM','2500')))
  pg.evaluate("()=>{if(!window.__db87){window.__db87={all:0,w:0};const o=window.damageBoss;window.damageBoss=function(a,s){try{window.__db87.all+=a;if(s&&s.wing87)window.__db87.w+=a;}catch{}return o.apply(this,arguments)};try{damageBoss=window.damageBoss}catch{}}window.__db87.all=0;window.__db87.w=0}")
  a=pg.evaluate("()=>({d:Event83.state().RD.dmg,t:Event83.state().RD.t,w:Wing87.state().dealt})");pg.wait_for_timeout(secs*1000)
  c=pg.evaluate("()=>({d:Event83.state().RD.dmg,t:Event83.state().RD.t,w:Wing87.state().dealt,s:SSS87.state(),db:window.__db87})")
  pg.evaluate("()=>{try{Event83._finish()}catch{}}");pg.wait_for_timeout(1300);pg.evaluate("()=>{document.querySelectorAll('#rd83r').forEach(e=>e.hidden=true);mode='menu';try{Lobby.show()}catch{}}")
  dt=max(.1,c['t']-a['t']);return {'dps':round((c['d']-a['d'])/dt,1),'wingDps':round((c['w']-a['w'])/dt,1),'sssCasts':c['s']['nCast'],'bossAll':round(c['db']['all']/dt,1),'bossWing':round(c['db']['w']/dt,1),'sssDealt':c['s']['dealt']}
def setup(pg,ship,n=None,fuse=None,wing=None,gearSet=None,gt=0):
  return pg.evaluate("""(a)=>{const [ship,n,fuse,wing,gs,gt]=a;mode='menu';try{Lobby.show()}catch{};Progress.setLocked(false);if(n!=null)V70.setTier('craft',ship,n);
   const d={};if(fuse)d[ship]=1;SSS87._set({done:d,off:{}});Wing87._set({id:wing});
   if(gs!=null)for(const m of Campaign36.sets[gs]){Campaign36.acquire('gear',m,'','story');const it=Progress.getState().items.filter(x=>x.variant===m).slice(-1)[0];if(gt)V70.setTier('gear',it.id,gt);Progress.equip(it.id);if(gt){Progress.grantCredits(5e7);for(let k=0;k<99;k++)if(Progress.upgrade(it.id)===false)break;}}
   selectCraft(ship);return {cp:Math.round(Combat.stats().cp),sel:selected,lv:Workshop.craftProgress(ship).level}}""",[ship,n,fuse,wing,gearSet,gt])
with sync_playwright() as p:
  b=p.chromium.launch()
  if 'boss180' in PARTS:
    R['boss180']={}
    for tag,fuse in [('tim5',False),('tim5_sss13',True)]:
      pg,errs=page(b);info=setup(pg,12,11,fuse,None,12,11)
      info['req180']=pg.evaluate("()=>Math.round(Meta40.reqCP(180))");info['req200']=pg.evaluate("()=>Math.round(Meta40.reqCP(200))")
      pg.evaluate(INV);pg.evaluate("()=>{document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value='180';Lobby.hide();reset();if(mode==='pause'){try{resume()}catch{}if(mode==='pause')mode='play';}}")
      for _ in range(200):
        if pg.evaluate("()=>!!(boss&&boss.bossHealthReady&&boss.y>80)"):break
        pg.evaluate("()=>{try{for(const e of enemies)if(!e.boss)e.dead=true;}catch{};power=5;powerUpgrades=4}");pg.wait_for_timeout(250)
      pg.evaluate("()=>{window.__hp87=()=>Math.round((boss.hp||0)+(boss.coreHp||0)+(boss.parts||[]).reduce((a,p)=>a+Math.max(0,p.hp||0),0))}")
      HP0=pg.evaluate("()=>window.__hp87()")
      t0=pg.evaluate("()=>performance.now()");hp0=pg.evaluate("()=>({hp:Math.round(boss.maxHp||boss.hp||0),core:Math.round(boss.coreHp||0)})");res=None;shot=False
      for k in range(int(os.environ.get('B180S','240'))):
        pg.wait_for_timeout(1000)
        if k==20 and not shot:pg.screenshot(path=O+'b180_'+tag+'.png');shot=True
        st=pg.evaluate("()=>({dead:!boss||boss.dead||!!boss.defeatStarted,mode,lv:level})")
        if st['dead'] or st['mode']!='play':res=st;break
      t=round((pg.evaluate("()=>performance.now()")-t0)/1000,1)
      HP1=pg.evaluate("()=>window.__hp87()");info.update(sec=t,end=res,hp=hp0,hpTotal0=HP0,hpLost=HP0-HP1,dps=round((HP0-HP1)/t,1),sss=pg.evaluate("()=>SSS87.state().nCast"));R['boss180'][tag]=info;print('boss180',tag,info,flush=True);pg.close()
  if 'wing' in PARTS:
    pg,errs=page(b);R['wing']={}
    for ship,mate in [(0,6),(12,6)]:
      setup(pg,ship,None,False,None);base=[raid(pg) for _ in range(2)]
      setup(pg,ship,None,False,mate);w=[raid(pg) for _ in range(2)]
      bd=sum(x['dps'] for x in base)/2;wd=sum(x['dps'] for x in w)/2
      R['wing'][ship]={'base':base,'wing':w,'gain%':round((wd/bd-1)*100,1),'wingShare':round(sum(x['wingDps'] for x in w)/2,1),'wing_vs_rest%':round(100*sum(x['bossWing'] for x in w)/max(.1,sum(x['bossAll']-x['bossWing'] for x in w)),1)};print('wing',ship,R['wing'][ship],flush=True)
    R['wing_err']=errs[:3];pg.close()
    R['fps']={}
    for tag,mate in [('khong',None),('dong_doi',6)]:
      pg,errs=page(b);setup(pg,12,None,False,mate);cdp=pg.context.new_cdp_session(pg)
      pg.evaluate(INV);pg.evaluate("()=>{document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value='59';Lobby.hide();reset();power=5}")
      pg.wait_for_timeout(4000);cdp.send('Emulation.setCPUThrottlingRate',{'rate':4})
      fps=pg.evaluate("""async()=>{let n=0,t0=performance.now(),worst=0,last=t0;await new Promise(r=>{function f(t){n++;worst=Math.max(worst,t-last);last=t;if(t-t0<6000)requestAnimationFrame(f);else r();}requestAnimationFrame(f);});return {fps:Math.round(n/((performance.now()-t0)/1000)),worstMs:Math.round(worst),shots:shots.length,mate:Wing87.state().mate}}""")
      cdp.send('Emulation.setCPUThrottlingRate',{'rate':1});R['fps'][tag]=fps;print('fps',tag,fps,flush=True);pg.close()
  if 'sss' in PARTS:
    pg,errs=page(b);R['sss']={}
    pg.evaluate("()=>{window.__k87=0;const o=window.kill;window.kill=function(e){if(e&&!e.dead&&!e.boss)window.__k87++;return o.apply(this,arguments)};try{kill=window.kill}catch{}}")
    for ship in [int(x) for x in os.environ.get('SSHIPS','10,11,12').split(',')]:
      row={}
      for tag,fuse in [('goc',False),('sss',True)]:
        setup(pg,ship,11,fuse,None);ds=[raid(pg) for _ in range(2)]
        row[tag+'_dps']=round(sum(x['dps'] for x in ds)/2,1);row[tag+'_casts']=sum(x['sssCasts'] for x in ds)
        # dọn quái 15 s ở ải 59
        pg.evaluate(INV);pg.evaluate("()=>{document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value='59';Lobby.hide();reset();if(mode==='pause'){try{resume()}catch{}if(mode==='pause')mode='play';}}")
        pg.wait_for_timeout(1500);pg.evaluate("()=>{power=5;powerUpgrades=4;window.__k87=0;SSS87._cd(1)}");pg.wait_for_timeout(15000)
        row[tag+'_kills15s']=pg.evaluate("()=>window.__k87");pg.evaluate("()=>{mode='menu';try{Lobby.show()}catch{}}")
      row['tang_dps%']=round((row['sss_dps']/row['goc_dps']-1)*100,1);R['sss'][ship]=row;print('sss',ship,row,flush=True)
    R['sss_err']=errs[:3];pg.close()
  b.close()
json.dump(R,open(O+'m87.json','w'),ensure_ascii=False,indent=1);print('XONG')
