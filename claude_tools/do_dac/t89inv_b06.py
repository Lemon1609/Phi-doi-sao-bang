# V89 · REVIEW89 A6: dựng 6 tài khoản mẫu (STAGE_BENCHMARK_100_200_V89) → lực chiến thật + ST/s thật
#  Mỗi mốc S: boss cuối chương (ải S), mini boss (ải S-10), ải thường (ải S-1: thời gian qua ải, tổng máu quái sinh ra).
#  Dùng: python3 tests/t89b.py <html> <S> [grade ''|S|SS|auto] [phần: boss,mini,norm]
import sys,json,os
from playwright.sync_api import sync_playwright
f=sys.argv[1];S=int(sys.argv[2]);G=sys.argv[3] if len(sys.argv)>3 else 'auto';PARTS=(sys.argv[4] if len(sys.argv)>4 else 'boss,mini,norm').split(',')
FR={'W':0,'G':1,'B':2,'B+1':3,'B+2':4,'B+3':5,'P':6,'P+1':7,'P+2':8,'P+3':9,'P+4':10,'P+5':11}
PCAP=[10,15,20,25,30,35,40,45,50,55,58,60]
B={100:dict(ship=5,sf='B+2',sl=50,set=4,gf='B+1',gl=45,gem=[(1,4)],main=20,subs=[],wing=1,sss=0),
   120:dict(ship=7,sf='P',sl=60,set=6,gf='B+3',gl=55,gem=[(2,6)],main=30,subs=[15],wing=3,sss=0),
   140:dict(ship=8,sf='P+1',sl=70,set=7,gf='P',gl=65,gem=[(2,8)],main=40,subs=[20,20],wing=6,sss=0),
   160:dict(ship=10,sf='P+3',sl=85,set=9,gf='P+2',gl=80,gem=[(3,4),(2,4)],main=50,subs=[30,30],wing=8,sss=0),
   180:dict(ship=12,sf='P+4',sl=95,set=11,gf='P+4',gl=90,gem=[(3,8)],main=60,subs=[40,40],wing=9,sss=0),
   200:dict(ship=13,sf='P+5',sl=100,set=12,gf='P+5',gl=100,gem=[(3,8)],main=60,subs=[60,60],wing=10,sss=1)}
b=dict(B[S]);
if os.environ.get('SHIP'):b['ship']=int(os.environ['SHIP'])
if os.environ.get('NOWING'):b['wing']=0
ci=b['ship']-1
SEED="if(!sessionStorage.getItem('b89')){sessionStorage.setItem('b89','1');const h=JSON.parse(localStorage.getItem('saobang-hangar-v1')||'{}');h.cleared=Array.from({length:%d},(_,i)=>i+1);localStorage.setItem('saobang-hangar-v1',JSON.stringify(h));}"%(S-1 if S<=180 else 199)
BUILD="""(a)=>{const [b,ci,FR,PCAP]=a;const o={};Progress.setLocked(false);Progress.grantCredits(5e8);try{Workshop.exp70(1e8)}catch{};
 for(let i=0;i<13;i++)try{Campaign36.acquire('craft',i,'','story')}catch{};V70.setTier('craft',ci,FR[b.sf]);
 const ids=[];for(const m of Campaign36.sets[b.set]){Campaign36.acquire('gear',m,'','story');const it=Progress.getState().items.filter(x=>x.variant===m).slice(-1)[0];V70.setTier('gear',it.id,FR[b.gf]);Progress.equip(it.id);ids.push(it.id);
  for(let k=0;k<200;k++){const g=Progress.v70.get(it.id);if(!g||g.level>=b.gl)break;if(Progress.upgrade(it.id)===false)break;}}
 if(window.__SSG){for(const m of ['nanite','stellar','prism']){Campaign36.acquire('gear',m,'SS','endless');}const ss=Progress.getState().items.filter(x=>x.grade==='SS');const byK={};for(const it of ss)if(!byK[it.kind])byK[it.kind]=it;ids.length=0;for(const k in byK){const it=byK[k];V70.setTier('gear',it.id,FR[b.gf]);Progress.equip(it.id);ids.push(it.id);for(let q=0;q<200;q++){const g=Progress.v70.get(it.id);if(!g||g.level>=b.gl)break;if(Progress.upgrade(it.id)===false)break;}}}
 o.gearLv=ids.map(id=>Progress.v70.get(id).level);
 // phi công: chính Thiên Lam (#4), phụ Hàn Sương (#7), Mộc Miên (#6)
 const tierFor=lv=>{for(let i=0;i<PCAP.length;i++)if(PCAP[i]>=lv)return i;return PCAP.length-1;};
 const team=[[4,b.main],...b.subs.map((lv,k)=>[[7,6,5][k],lv])];team.forEach(([id,lv],k)=>{Pilot67._give(id,lv);Pilot67._tier(id,tierFor(lv));Pilot67.setSlot(k,id);});
 // đá khảm: ô 0–2 đá chỉ số; lần lượt chiến cơ → giáp → tên lửa → vũ khí phụ
 const hosts=['c'+ci,...ids.map(id=>'g:'+id)];let put=0,want=0;const posOf={};
 for(const [t,n] of b.gem){want+=n;let left=n;for(const key of hosts){if(left<=0)break;const h=Stone71.hostOf?Stone71.hostOf(key):null;}}
 o.wantGem=want;return o}"""
GEM="""(a)=>{const [b,ci]=a;const eq=Progress.v70.equipped();const ids=Object.values(eq);const hosts=['c'+ci,...ids.map(id=>'g:'+id)];let put=0;const log=[];
 const posOf=key=>key[0]==='c'?'ship':Progress.v70.get(key.slice(2)).kind;
 const queue=[];for(const [t,n] of b.gem)for(let i=0;i<n;i++)queue.push(t);
 // mỗi chủ tối đa 3 ô đá chỉ số; chia đều vòng tròn
 const used={};let guard=0;while(queue.length&&guard<50){guard++;for(const key of hosts){if(!queue.length)break;const u=used[key]|0;if(u>=3)continue;const t=queue[0];const s=Stone71.make(t,posOf(key),{ty:'stat'});Stone71.give(s);const ok=Stone71.put(key,u,s.id);if(ok!==false){used[key]=u+1;queue.shift();put++;}else{log.push(key+':'+u);used[key]=9;}}}
 return {put,left:queue.length,log:log.slice(0,6)}}"""
LV="if(!sessionStorage.getItem('lv89')){sessionStorage.setItem('lv89','1');const w=JSON.parse(localStorage.getItem('saobang-workshop-v1')||'null');if(w){w.craftLevels[%d]=%d;w.crafts[%d]=%s;localStorage.setItem('saobang-workshop-v1',JSON.stringify(w));}}"
INV="()=>{if(!window.__iv)window.__iv=setInterval(()=>{try{invuln=999;hp=maxHp;if(mode==='play'){if(boss&&!boss.dead){const w=(boss.parts||[]).filter(p=>!p.dead&&p.hp>0);const tx=w.length?w.reduce((a,b)=>Math.abs(b.x-player.x)<Math.abs(a.x-player.x)?b:a).x:boss.x;player.x+=(tx-player.x)*.3;player.y=Math.min(H-80,boss.y+330);}else{player.y=Math.min(H-80,H*.62);}}const d=document.getElementById('st80');if(d)d.hidden=true;window.__st80=0;}catch{}},150)}"
def setup(p,grade):
  pg=p.new_page(viewport={'width':393,'height':852});pg.set_default_timeout(180000);pg.set_default_navigation_timeout(180000);errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
  if os.environ.get('NOPAT'):pg.add_init_script('window.PAT120=false')
  if os.environ.get('FUDGE'):pg.add_init_script('window.FUDGE120='+os.environ['FUDGE'])
  pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(2000);pg.add_init_script(SEED);pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(5000)
  pg.evaluate("()=>{document.getElementById('tutorial392')?.remove();window.RULE84=false;window.TITLE84=false;try{Ch9.open=()=>true}catch{};document.querySelectorAll('.m63,.adv70,.st71').forEach(e=>e.hidden=true)}")
  pg.evaluate('()=>{window.__SSG=%s}'%('true' if os.environ.get('SSG') else 'false'));o=pg.evaluate(BUILD,[b,ci,FR,PCAP]);pg.wait_for_timeout(800)
  pg.add_init_script(LV%(ci,b['sl'],ci,json.dumps(grade)));pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(5000)
  pg.evaluate("()=>{document.getElementById('tutorial392')?.remove();window.RULE84=false;window.TITLE84=false;try{Ch9.open=()=>true}catch{};document.querySelectorAll('.m63,.adv70,.st71').forEach(e=>e.hidden=true)}")
  o['gem']=pg.evaluate(GEM,[b,ci])
  o.update(pg.evaluate("""(a)=>{const [b,ci]=a;Progress.setLocked(false);SSS87._set({done:b.sss?{[ci]:1}:{},off:{}});Wing87._set({id:b.wing?b.wing-1:null});selectCraft(ci);launchCraft=ci;
     return {cp:Math.round(Combat.stats().cp),req:Math.round(Meta40.reqCP(%d)),craft:Workshop.craftProgress(ci),n:V70.craftN(ci),pilots:Pilot67.state().team,wingRatio:Wing87.state().ratio}}"""%S,[b,ci]))
  o['grade']=grade;return pg,errs,o
def go(pg,st):
  pg.evaluate(INV);pg.evaluate("(st)=>{mode='menu';try{Lobby.show()}catch{};Progress.setLocked(false);try{V75.addEn(99)}catch{};document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value=String(st);Lobby.hide();reset();if(mode==='pause'){try{resume()}catch{}if(mode==='pause')mode='play';}window.__hp87=()=>{if(!boss)return 0;return Math.round((boss.hp||0)+(boss.coreHp||0)+(boss.parts||[]).reduce((a,p)=>a+Math.max(0,p.hp||0),0))};}",st)
def boss_ttk(pg,st,secs=25):
  go(pg,st)
  for _ in range(240):
    if pg.evaluate("()=>!!(boss&&boss.bossHealthReady&&boss.y>80)"):break
    pg.evaluate("()=>{try{for(const e of enemies)if(!e.boss)e.dead=true;}catch{};power=5;powerUpgrades=4}");pg.wait_for_timeout(250)
  for _ in range(60):
    if pg.evaluate("()=>!!(boss&&boss.entered76)"):break
    pg.wait_for_timeout(250)
  pg.wait_for_timeout(3000)
  if os.environ.get('GLARE'):
    pg.screenshot(path='/tmp/sb_do/prof/g10a.png');r=pg.evaluate('''async()=>{const c=document.getElementById('game'),g=c.getContext('2d');const A={};const P=CanvasRenderingContext2D.prototype,od=P.drawImage,oa=P.arc,ofr=P.fillRect;
   const where=()=>(new Error().stack||'').split('\\n').slice(2,6).map(l=>(l.match(/at ([^ ]+)/)||[])[1]+':'+((l.match(/:(\\d+):\\d+\\)?$/)||[])[1])).join(' < ');
   const near=(x,y)=>{const t=g.getTransform();const lx=(t.a*x+t.e)/t.a/ (c.width/W),ly=(t.d*y+t.f)/t.d/(c.height/H);return boss&&Math.hypot(lx-boss.x,ly-(boss.y+40))<160};
   const rec=(kind,sz,x,y)=>{const t=g.getTransform();const px=sz*Math.abs(t.a)/(c.width/W);if(px<60)return;const k=kind+' '+g.globalCompositeOperation+' '+where()+' ~'+Math.round(px/20)*20;A[k]=(A[k]||0)+1;};
   P.drawImage=function(im){if(this===g){const a=arguments;let dw=a.length>=9?a[7]:a.length>=5?a[3]:(im.width||0),dx=a.length>=9?a[5]:a[1],dy=a.length>=9?a[6]:a[2];rec('img',dw,dx,dy);}return od.apply(this,arguments)};
   P.arc=function(x,y,r){if(this===g)rec('arc',r*2,x,y);return oa.apply(this,arguments)};
   await new Promise(r=>setTimeout(r,5000));P.drawImage=od;P.arc=oa;return A}''');pg.screenshot(path='/tmp/sb_do/prof/g10b.png')
    [print(v,k) for k,v in sorted(r.items(),key=lambda x:-x[1])[:25]];raise SystemExit
  pg.wait_for_timeout(800)
  if os.environ.get('PROBE'):pg.screenshot(path='/tmp/sb_do/probe_%s.png'%os.environ.get('SHIP','x'));print('sh',pg.evaluate("()=>({shots:shots.length,maxAge:Math.max(...shots.map(s=>s.age||0)).toFixed(2),main:shots.filter(s=>s.art28!=null&&!s.gearKind).length,sample:shots.slice(0,6).map(s=>({t:s.type,d:+(s.damage||0).toFixed(1),x:Math.round(s.x),y:Math.round(s.y),vy:Math.round(s.vy||0),age:+(s.age||0).toFixed(1),dead:!!s.dead})),boss:[Math.round(boss.x),Math.round(boss.y),boss.hitW,boss.hitH],ys:(()=>{const h={};for(const s of shots){const k=Math.round(s.y/100)*100;h[k]=(h[k]||0)+1;}return h})(),sel:selected,lc:launchCraft,robot:!!activeRobot,mode})"),flush=True);print('probe',pg.evaluate("()=>{const L=shots.filter(s=>!s.dead&&s.art28!=null&&!s.gearKind);const d=L.map(s=>s.damage);let hits=0,amt=0;const o=window.damageBoss;window.damageBoss=function(a,src,part){hits++;amt+=a;return o.apply(this,arguments)};try{damageBoss=window.damageBoss}catch{};return new Promise(r=>setTimeout(()=>{window.damageBoss=o;try{damageBoss=o}catch{};r({n:L.length,avgDmg:+(d.reduce((a,b)=>a+b,0)/Math.max(1,d.length)).toFixed(2),types:[...new Set(L.map(s=>s.type))],pierce:L.filter(s=>s.piercing).length,hits1s:hits,amt1s:Math.round(amt),parts:(boss.parts||[]).map(p=>Math.round(p.hp)),core:Math.round(boss.coreHp||0),hp:Math.round(boss.hp)})},1000))}"),flush=True)
  if os.environ.get('GAL'):
    os.makedirs('/tmp/sb_do/v122',exist_ok=True)
    for i in ([int(x) for x in os.environ['GALI'].split(',')] if os.environ.get('GALI') else range(13)):
      for g in os.environ['GAL'].split(','):
        gg='' if g=='N' else g
        pg.evaluate("""async(a)=>{const [i,g]=a;selected=i;launchCraft=i;Rank36.grade=()=>g;Workshop.craftGrade=()=>g;superTime=0;power=5;powerUpgrades=4;shots.length=0;
          const snap={hp:boss.hp,core:boss.coreHp,parts:(boss.parts||[]).map(p=>p.hp)};const iv=setInterval(()=>{try{player.x=boss.x;player.y=Math.min(H-150,boss.y+360);invuln=0;hp=maxHp;bullets.length=0;boss.hp=snap.hp;boss.coreHp=snap.core;(boss.parts||[]).forEach((p,k)=>{p.hp=snap.parts[k];p.dead=false;});}catch{}},40);
          const t0=time;while(time-t0<1.6)await new Promise(r=>setTimeout(r,40));clearInterval(iv);}""",[i,gg])
        pg.screenshot(path='/tmp/sb_do/v122/g_%02d_%s.png'%(i+1,g))
        if os.environ.get('PBP'):print('PBP',i+1,g,pg.evaluate('''async()=>{const R={};for(const k in FX16_ART)R[FX16_ART[k].length+':'+FX16_ART[k].slice(-40)]=k;const P=CanvasRenderingContext2D.prototype,od=P.drawImage,cnt={};P.drawImage=function(im){try{const s=im&&im.src;if(s){const k=R[s.length+':'+s.slice(-40)];if(k)cnt[k]=(cnt[k]||0)+1;}}catch{}return od.apply(this,arguments)};await new Promise(r=>setTimeout(r,800));P.drawImage=od;return {q:(()=>{try{return [VisualFX.counts().quality,VisualFX.reduced()]}catch(e){return String(e)}})(),cnt,a28:[...new Set(shots.filter(s=>!s.gearKind).map(s=>s.art28))]}}'''),flush=True)
    raise SystemExit
  if os.environ.get('SKL'):
    import json as _j
    os.makedirs('/tmp/sb_do/v121',exist_ok=True)
    for i in [int(x) for x in os.environ['SKL'].split(',')]:
      for g in ['S','SS']:
        r=pg.evaluate("""async(a)=>{const [i,g]=a;const snap={hp:boss.hp,core:boss.coreHp,parts:(boss.parts||[]).map(p=>p.hp)};const restore=()=>{boss.hp=snap.hp;boss.coreHp=snap.core;(boss.parts||[]).forEach((p,k)=>{p.hp=snap.parts[k];p.dead=false;});};
          selected=i;launchCraft=i;Rank36.grade=()=>g;Workshop.craftGrade=()=>g;superTime=0;Rank36.reset();power=5;powerUpgrades=4;let acc=0;if(!window.__sk){window.__sk=1;const od=window.damageBoss;window.damageBoss=function(a,src){if(src==='skill121'&&a>0)window.__acc=(window.__acc||0)+a;return od.apply(this,arguments)};try{damageBoss=window.damageBoss}catch{}}
          const iv=setInterval(()=>{try{player.x=boss.x;player.y=Math.min(H-120,boss.y+330);invuln=99;hp=maxHp;bullets.length=0;restore();}catch{}},40);
          const wait=async(sec)=>{const t0=time;while(time-t0<sec)await new Promise(r=>setTimeout(r,40));};await wait(3.2);const base=V121.state().base;window.__shot0=1;window.__acc=0;const ok=V121.start();await wait(V121.SK[i].d[g==='SS'?1:0]*.45);clearInterval(iv);
          return {ok,base,st:V121.state()};}""",[i,g])
        pg.screenshot(path='/tmp/sb_do/v121/sk_%02d_%s.png'%(i+1,g));pg.evaluate("()=>{try{bullets.length=0}catch{}}")
        r2=pg.evaluate("""async()=>{const wait=async(sec)=>{const t0=time;while(time-t0<sec)await new Promise(r=>setTimeout(r,40));};const iv=setInterval(()=>{try{invuln=99;hp=maxHp;}catch{}},40);await wait(3.5);clearInterval(iv);return {acc:Math.round(window.__acc||0)};}""")
        print('SKL',i+1,g,_j.dumps(r),_j.dumps(r2),'ratio=%.2f'%(r2['acc']/max(1,r['base'])),flush=True)
    raise SystemExit
  if os.environ.get('BENCH'):
    import json as _j
    r=pg.evaluate("""async()=>{const snap={hp:boss.hp,core:boss.coreHp,parts:(boss.parts||[]).map(p=>p.hp)};const restore=()=>{boss.hp=snap.hp;boss.coreHp=snap.core;(boss.parts||[]).forEach((p,k)=>{p.hp=snap.parts[k];p.dead=false;});};
      let acc=0;const od=window.damageBoss;const nd=function(a){if(a>0)acc+=a;return od.apply(this,arguments)};window.damageBoss=nd;try{damageBoss=nd}catch{};
      const out=[];const wait=async(sec)=>{const t0=time;while(time-t0<sec)await new Promise(r=>setTimeout(r,50));};
      const only=(window.__only||[...Array(13).keys()]);
      for(const i of only){const row={i};for(const m of ['old','new']){window.PAT120_OFF=m==='old'?[i]:[];try{selected=i;launchCraft=i;}catch{}power=5;powerUpgrades=4;restore();bullets.length=0;shots.length=0;await wait(1.0);restore();acc=0;const t0=time;
        const iv=setInterval(()=>{try{player.x=boss.x;player.y=Math.min(H-120,boss.y+330);invuln=99;hp=maxHp;bullets.length=0;if(boss.coreHp<snap.core*.3||(boss.parts||[]).some(p=>p.hp<snap.parts[0]*.15))restore();}catch{}},30);
        await wait(8);clearInterval(iv);row[m]=Math.round(acc/(time-t0));}
        row.r=+(row.new/row.old).toFixed(3);out.push(row);}
      return out;}""")
    print('BENCH',_j.dumps(r),flush=True);raise SystemExit
  H0=pg.evaluate("()=>window.__hp87()");T0=pg.evaluate("()=>time");dead=False
  for k in range(secs*2):
    pg.wait_for_timeout(500)
    if pg.evaluate("()=>!boss||boss.dead||!!boss.defeatStarted||mode!=='play'"):dead=True;break
  if os.environ.get('PROBE'):print('ss90',pg.evaluate("()=>SS90M.state()"),flush=True)
  T1=pg.evaluate("()=>time");H1=0 if dead else pg.evaluate("()=>window.__hp87()");dt=max(.1,T1-T0)
  dps=(H0-H1)/dt;return {'st':st,'hp':H0,'dps':round(dps,1),'gameSec':round(dt,1),'killed':dead,'ttk':round(H0/max(.1,dps),1),'factor':round(pg.evaluate("()=>Combat.factor()"),3)}
def normal(pg,st,cap=150):
  pg.evaluate("()=>{window.__sp89={hp:0,n:0};if(!window.__ae89){window.__ae89=1;const o=window.addEnemy;window.addEnemy=function(e){const r=o.apply(this,arguments);try{const x=r||e;if(x&&!x.rescue28&&!x.boss)setTimeout(()=>{try{window.__sp89.hp+=x.maxHp||x.hp||0;window.__sp89.n++}catch{}},0);}catch{}return r;};try{addEnemy=window.addEnemy}catch{}}}")
  go(pg,st);pg.evaluate("()=>{power=5;powerUpgrades=4;window.__sp89={hp:0,n:0}}");T0=pg.evaluate("()=>time");res=None
  for k in range(cap*2):
    pg.wait_for_timeout(500)
    m=pg.evaluate("()=>mode")
    if m!='play':res=m;break
  T1=pg.evaluate("()=>time");sp=pg.evaluate("()=>window.__sp89")
  return {'st':st,'clearSec':round(T1-T0,1),'end':res,'spawnHp':round(sp['hp']),'spawnN':sp['n']}
with sync_playwright() as p:
  br=p.chromium.launch();out={'S':S,'bench':b}
  grades=['', 'S','SS'] if G=='auto' else [G]
  best=None
  for g in grades:
    pg,errs,o=setup(br,g)
    print('cp',g,o['cp'],'req',o['req'],flush=True)
    if best is None or abs(o['cp']-o['req'])<abs(best[2]['cp']-best[2]['req']):
      if best:best[0].close()
      best=(pg,errs,o)
    else:pg.close()
  pg,errs,o=best;out['acct']=o
  if 'boss' in PARTS:out['boss']=boss_ttk(pg,S);print('boss',out['boss'],flush=True)
  if 'mini' in PARTS:out['mini']=boss_ttk(pg,S-10,20);print('mini',out['mini'],flush=True)
  if 'norm' in PARTS:out['norm']=normal(pg,S-1);print('norm',out['norm'],flush=True)
  if 'inv' in PARTS:
    os.makedirs('/tmp/sb_do/inv',exist_ok=True)
    cat=pg.evaluate("""()=>{const o={};for(const [k,v] of Object.entries(GearCatalog))o[k]={kind:v.kind,name:v.name,set:v.set,color:v.color,tier:v.tier};
      try{for(const S of Campaign36.sets)for(const m of S)for(const g of ['','S','SS'])Campaign36.acquire('gear',m,g,'endless');}catch(e){o.__e=String(e)}
      try{for(const m of ['chrono11_a','devour10_m','monarch12_s'])Campaign36.acquire('gear',m,'SS','endless');}catch{}
      return {cat:o,sets:Campaign36.sets,n:Progress.getState().items.length};}""")
    json.dump(cat,open('/tmp/sb_do/inv/catalog.json','w'),ensure_ascii=False,indent=1);print('items',cat['n'],flush=True)
    for t,sb in [('equip','armory'),('equip','materials'),('equip','stones'),('fleet','ult'),('fleet','sss'),('shop','market'),('shop','skinshop'),('fleet','ships')]:
      try:
        pg.evaluate("(a)=>{try{mode='menu';Lobby.show()}catch{};Nav74.tab(a[0]);Nav74.sub(a[1]);}",[t,sb]);pg.wait_for_timeout(1500)
        pg.screenshot(path='/tmp/sb_do/inv/%s_%s.png'%(t,sb));print('shot',t,sb,flush=True)
      except Exception as e:print('ERR',t,sb,str(e)[:200],flush=True)
  if 'probe' in PARTS:
    pg.evaluate("(a)=>{try{mode='menu';Lobby.show()}catch{};Nav74.tab(a[0]);Nav74.sub(a[1]);}",os.environ.get('PT','fleet,ships').split(','));pg.wait_for_timeout(1500)
    r=pg.evaluate("""async()=>{const R=new Map();const add=(n,o)=>{try{if(!o)return;if(typeof o==='string'){R.set(o.length+':'+o.slice(-40),n);return;}for(const [k,v] of Object.entries(o)){if(typeof v==='string'&&v.startsWith('data:'))R.set(v.length+':'+v.slice(-40),n+'.'+k);else if(v&&typeof v==='object')for(const [k2,v2] of Object.entries(v))if(typeof v2==='string'&&v2.startsWith('data:'))R.set(v2.length+':'+v2.slice(-40),n+'.'+k+'.'+k2);}}catch{}};
      for(const n of ['SHIP118','TIER69_ART','EVO53_ART','ART86_ASSETS','SHIP83_ART','FX16_ART','SKIN15_BG'])try{add(n,eval(n))}catch{}
      const P=CanvasRenderingContext2D.prototype,od=P.drawImage,cnt={};P.drawImage=function(im){try{const cv=this.canvas;const id=cv.id||cv.className||('w'+cv.width);let key='?';const s=im&&im.src;if(s)key=R.get(s.length+':'+s.slice(-40))||('src'+s.length+'@'+s.slice(40,100));else if(im&&im.width)key='canvas'+im.width+'x'+im.height;const st=(new Error().stack||'').split(String.fromCharCode(10)).slice(2,5).map(l=>(l.match(/at ([^ ]+)/)||[])[1]).join('<');const k=id+' | '+key+' | '+st;cnt[k]=(cnt[k]||0)+1;}catch{}return od.apply(this,arguments)};
      await new Promise(r=>setTimeout(r,1200));P.drawImage=od;return Object.entries(cnt).filter(([k])=>!k.startsWith('game')).sort((a,b)=>b[1]-a[1]).slice(0,30)}""")
    for k,v in r:print('PR',v,k,flush=True)
  if 'inv2' in PARTS:
    os.makedirs('/tmp/sb_do/inv',exist_ok=True)
    pg.evaluate("()=>{try{for(const S of Campaign36.sets)for(const m of S)for(const g of ['','S','SS'])Campaign36.acquire('gear',m,g,'endless');}catch(e){}}")
    for sb in ['sssGear','sssStar','sssHall','sssOc','sssShip']:
      try:
        pg.evaluate("(s)=>{try{mode='menu';Lobby.show()}catch{};Nav74.tab('fleet');Nav74.sub(s);}",sb);pg.wait_for_timeout(1500)
        pg.screenshot(path='/tmp/sb_do/inv/x_%s.png'%sb);print('shot',sb,flush=True)
      except Exception as e:print('ERR',sb,str(e)[:200],flush=True)
  if 'rob' in PARTS:
    os.makedirs('/tmp/sb_do/inv',exist_ok=True)
    for idx,(a,b) in enumerate([[0,3],[2,6]]):
      r=pg.evaluate("""(ab)=>{try{for(let i=0;i<13;i++)V70.setTier('craft',i,6);}catch(e){}let r=null;try{r=Fusion.mergeSSS(ab[0],ab[1]);}catch(e){return 'ERR '+e}return r?r.name:'fail'}""",[a,b]);print('merge',r,flush=True)
      go(pg,20);pg.wait_for_timeout(3000)
      print('robot',pg.evaluate("()=>({ar:!!activeRobot,sup:activeRobot&&activeRobot.super,mode})"),flush=True)
      for k,st in enumerate([0,8]):
        pg.evaluate("(st)=>{superTime=st;power=5;powerUpgrades=4;}",st);pg.wait_for_timeout(1500);pg.evaluate("()=>{clearInterval(window.__iv);window.__iv=0;invuln=0;hp=maxHp;bullets.length=0;}");pg.wait_for_timeout(60)
        pg.screenshot(path='/tmp/sb_do/inv/rob_%d_%d.png'%(idx,k))
        print('pos',idx,k,pg.evaluate("()=>{const c=document.getElementById('game').getBoundingClientRect();return [player.x*c.width/W+c.left,player.y*c.height/H+c.top]}"),flush=True)
      pg.evaluate("()=>{mode='menu';try{Lobby.show()}catch{}}")
    pg.evaluate("()=>{try{mode='menu';Lobby.show()}catch{};Nav74.tab('fleet');Nav74.sub('sss');}");pg.wait_for_timeout(2000);pg.screenshot(path='/tmp/sb_do/inv/rob_lab.png')
  if 'lab' in PARTS:
    print('merge',pg.evaluate("()=>{try{for(let i=0;i<13;i++)V70.setTier('craft',i,6);}catch(e){}const r=Fusion.mergeSSS(0,3);return r?r.name:'fail'}"),flush=True)
    for t,sb in [('fleet','sss'),('fleet','sssHall')]:
      pg.evaluate("(a)=>{try{mode='menu';Lobby.show()}catch{};Nav74.tab(a[0]);Nav74.sub(a[1]);}",[t,sb]);pg.wait_for_timeout(2500);pg.screenshot(path='/tmp/sb_do/inv/lab_%s.png'%sb)
    pg.evaluate("()=>{try{const c=document.querySelector('#ccht-lobby-root #hangarCanvas');c&&c.click();}catch{}}");pg.wait_for_timeout(600);pg.screenshot(path='/tmp/sb_do/inv/lab_tap.png')
  if 'gear' in PARTS:
    os.makedirs('/tmp/sb_do/inv',exist_ok=True)
    info=pg.evaluate("""()=>{const ids=[];for(const m of ['nanite','stellar','prism']){Campaign36.acquire('gear',m,'','story');const it=Progress.getState().items.filter(x=>x.variant===m).slice(-1)[0];Progress.equip(it.id);ids.push(it.id);}
      const g=Progress.v70.get(ids[0]);return {ids,g,keys:Object.keys(V70).slice(0,60)}}""")
    print('GEAR',json.dumps(info)[:1500],flush=True)
    for tr in [0,3,5,11]:
      pg.evaluate("(a)=>{for(const id of a[0])V70.setTier('gear',id,a[1]);}",[info['ids'],tr])
      pg.evaluate("()=>{selected=0;launchCraft=0;try{selectCraft(0)}catch{}}");go(pg,20);pg.wait_for_timeout(2500)
      for k,st in enumerate([0,6]):
        pg.evaluate("(st)=>{superTime=st;power=st?5:2;powerUpgrades=st?4:1;}",st);pg.wait_for_timeout(1200);pg.evaluate("()=>{clearInterval(window.__iv);window.__iv=0;invuln=0;hp=maxHp;bullets.length=0;}");pg.wait_for_timeout(60)
        pg.screenshot(path='/tmp/sb_do/inv/gear_%d_%d.png'%(tr,k));print('DRAW',tr,k,pg.evaluate('''async()=>{const R={};const add=(n,o)=>{for(const [k,v] of Object.entries(o||{}))if(typeof v==='string'&&/nanite|stellar|prism/.test(k))R[v.length+':'+v.slice(-40)]=n+'.'+k;};try{add('A',GEAR44_ASSETS)}catch{};try{add('E',EVO53_ART)}catch{};const P=CanvasRenderingContext2D.prototype,od=P.drawImage,cnt={};P.drawImage=function(im){try{let s=im&&im.src;if(!s&&im&&im.__src)s=im.__src;if(s){const k=R[s.length+':'+s.slice(-40)];if(k)cnt[k]=(cnt[k]||0)+1;}else if(im&&im.width){cnt['cv'+im.width+'x'+im.height]=(cnt['cv'+im.width+'x'+im.height]||0)+1}}catch{}return od.apply(this,arguments)};await new Promise(r=>setTimeout(r,600));P.drawImage=od;return Object.entries(cnt).filter(([k,v])=>!k.startsWith('cv')||v<200).slice(0,25)}'''),flush=True);print('pos',tr,k,pg.evaluate("()=>{const c=document.getElementById('game').getBoundingClientRect();return [player.x*c.width/W+c.left,player.y*c.height/H+c.top,(()=>{try{return Gear44.state?1:0}catch{return -1}})()]}"),flush=True)
      pg.evaluate("()=>{mode='menu';try{Lobby.show()}catch{}}")
    pg.evaluate("()=>{try{mode='menu';Lobby.show()}catch{};Nav74.tab('equip');Nav74.sub('armory');}");pg.wait_for_timeout(2000);pg.screenshot(path='/tmp/sb_do/inv/gear_kho.png')
  out['errs']=errs[:3];br.close()
os.makedirs('/tmp/sb_do/b89',exist_ok=True);json.dump(out,open('/tmp/sb_do/b89/b%d.json'%S,'w'),ensure_ascii=False,indent=1);print('XONG',S)
