# V89 · REVIEW89 A6: dựng 6 tài khoản mẫu (STAGE_BENCHMARK_100_200_V89) → lực chiến thật + ST/s thật
#  Mỗi mốc S: boss cuối chương (ải S), mini boss (ải S-10), ải thường (ải S-1: thời gian qua ải, tổng máu quái sinh ra).
#  Dùng: python3 tests/t89b.py <html> <S> [grade ''|S|SS|auto] [phần: boss,mini,norm]
import sys,json,os
from playwright.sync_api import sync_playwright
f=sys.argv[1];S=int(sys.argv[2]);G='';PARTS=[]
FR={'W':0,'G':1,'B':2,'B+1':3,'B+2':4,'B+3':5,'P':6,'P+1':7,'P+2':8,'P+3':9,'P+4':10,'P+5':11}
PCAP=[10,15,20,25,30,35,40,45,50,55,58,60]
B={20:dict(ship=1,sf='G',sl=15,set=1,gf='G',gl=12,gem=[],main=5,subs=[],wing=0,sss=0),   # V187: mốc sớm do Claude giả định (người chơi không nạp, đi thẳng)
   40:dict(ship=2,sf='B',sl=25,set=2,gf='G',gl=20,gem=[(1,2)],main=10,subs=[],wing=0,sss=0),
   60:dict(ship=3,sf='B+1',sl=35,set=3,gf='B',gl=30,gem=[(1,3)],main=15,subs=[],wing=0,sss=0),
   80:dict(ship=4,sf='B+1',sl=45,set=3,gf='B+1',gl=40,gem=[(1,4)],main=18,subs=[],wing=0,sss=0),
   100:dict(ship=5,sf='B+2',sl=50,set=4,gf='B+1',gl=45,gem=[(1,4)],main=20,subs=[],wing=1,sss=0),
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
 if(window.__SSG){for(const m of ['aegis','inferno','rail']){Campaign36.acquire('gear',m,'SS','endless');}const ss=Progress.getState().items.filter(x=>x.grade==='SS');const byK={};for(const it of ss)if(!byK[it.kind])byK[it.kind]=it;ids.length=0;for(const k in byK){const it=byK[k];V70.setTier('gear',it.id,FR[b.gf]);Progress.equip(it.id);ids.push(it.id);for(let q=0;q<200;q++){const g=Progress.v70.get(it.id);if(!g||g.level>=b.gl)break;if(Progress.upgrade(it.id)===false)break;}}}
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
  pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(2000);pg.add_init_script(SEED);pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(5000)
  pg.evaluate("()=>{document.getElementById('tutorial392')?.remove();window.RULE84=false;window.TITLE84=false;try{Ch9.open=()=>true}catch{};document.querySelectorAll('.m63,.adv70,.st71').forEach(e=>e.hidden=true)}")
  pg.evaluate('()=>{window.__SSG=%s}'%('true' if os.environ.get('SSG') else 'false'));o=pg.evaluate(BUILD,[b,ci,FR,PCAP]);pg.wait_for_timeout(800)
  pg.add_init_script(LV%(ci,b['sl'],ci,json.dumps(grade)));pg.goto('file://'+f+'?nopop');pg.wait_for_timeout(5000)
  pg.evaluate("()=>{document.getElementById('tutorial392')?.remove();window.RULE84=false;window.TITLE84=false;try{Ch9.open=()=>true}catch{};document.querySelectorAll('.m63,.adv70,.st71').forEach(e=>e.hidden=true)}")
  o['gem']=pg.evaluate(GEM,[b,ci])
  o.update(pg.evaluate("""(a)=>{const [b,ci]=a;Progress.setLocked(false);SSS87._set({done:b.sss?{[ci]:1}:{},off:{}});Wing87._set({id:b.wing?b.wing-1:null});selectCraft(ci);launchCraft=ci;
     return {cp:Math.round(Combat.stats().cp),req:Math.round(Meta40.reqCP(%d)),craft:Workshop.craftProgress(ci),n:V70.craftN(ci),pilots:Pilot67.state().team,wingRatio:Wing87.state().ratio}}"""%S,[b,ci]))
  o['grade']=grade;return pg,errs,o

# ---------------- V199 · ĐO SỐNG SÓT (đề xuất Gemini 07/11) ----------------
#  Không bất tử. Tàu né đơn giản: x = W/2 + 110·sin(1,8 t), đứng gần đáy, tự bắn. 100 s ở ải S (quái thường rồi boss).
#  Đếm: đạn địch sinh ra / phút, nhiều nhất trên màn, số đòn trúng thật / phút, máu+khiên mất / phút, đòn bị chặn (mất 0).
#  Máu < 30% thì nạp lại (đếm 'lần nạp máu') để đo trọn ải. Game trừ máu trễ nên đo bằng theo dõi máu+khiên mỗi 50 ms. Kết quả: số đòn chịu được = (máu tối đa + khiên tối đa) / mất TB mỗi đòn.
import statistics
RUN="""(st)=>{mode='menu';try{Lobby.show()}catch{};Progress.setLocked(false);try{V75.addEn(99)}catch{};document.getElementById('gamemode').value='campaign';document.getElementById('mission-select').value=String(st);Lobby.hide();reset();if(mode==='pause')mode='play';
 const R=window.__sv={t0:time,seen:new WeakSet(),ph:{thuong:{sec:0,spawn:0,hit:0,loss:0,block:0,peak:0,die:0},boss:{sec:0,spawn:0,hit:0,loss:0,block:0,peak:0,die:0}},pool:maxHp+maxShield,maxHp,maxShield,es:enemyScale()};
 // game trừ máu TRỄ sau khi damage() trả về → đo bằng theo dõi máu+khiên mỗi 50 ms (giảm = trúng; tăng = hồi, bỏ qua)
 R.prev=hp+shield;const od=damage;const nd=function(src){const P=R.ph[(boss&&!boss.dead)?'boss':'thuong'];if(!(invuln>0)&&mode==='play'&&src==='bullet'&&bulletShieldTime>0)P.block++;return od.apply(this,arguments)};window.damage=nd;try{damage=nd}catch{}
 let last=performance.now();window.__mv=setInterval(()=>{try{if(mode!=='play')return;document.querySelectorAll('.m63,.adv70,.st71').forEach(e=>e.hidden=true);const t=time-R.t0;pointer=null;player.x=W/2+110*Math.sin(1.8*t);player.y=H-150;
   const P=R.ph[(boss&&!boss.dead)?'boss':'thuong'];const cur=hp+shield;if(cur<R.prev-1e-6){P.hit++;P.loss+=R.prev-cur;}R.prev=cur;if(hp<maxHp*0.3){P.die++;hp=maxHp;R.prev=hp+shield;}const now=performance.now();P.sec+=(now-last)/1000;last=now;let n=0;for(const b of bullets){if(b.dead)continue;n++;if(!R.seen.has(b)){R.seen.add(b);P.spawn++;}}P.peak=Math.max(P.peak,n);}catch(e){}},50);}"""
with sync_playwright() as p:
  br=p.chromium.launch();g=os.environ.get('GR','')
  pg,errs,o=setup(br,g)
  pg.evaluate(RUN,S);pg.wait_for_timeout(int(os.environ.get('SEC','100'))*1000)
  r=pg.evaluate("()=>{clearInterval(window.__mv);const R=window.__sv;return {pool:R.pool,maxHp:R.maxHp,maxShield:R.maxShield,es:R.es,ph:R.ph,mode,boss:!!(boss&&!boss.dead)}}")
  out={'S':S,'grade':g or 'thuong','cp':o['cp'],'req':o['req'],'pool':round(r['pool'],2),'es':round(r['es'],3)}
  for k,P in r['ph'].items():
    m=P['sec']/60 or 1;h=P['hit'] or 0
    out[k]={'giay':round(P['sec']),'dan_phut':round(P['spawn']/m),'dan_toi_da':P['peak'],'trung_phut':round(h/m,1),'chan':P['block'],'mat_phut':round(P['loss']/m,2),
      'don_chiu':round(r['pool']/(P['loss']/h),1) if h else None,'giay_song':round(r['pool']/(P['loss']/P['sec']),0) if P['loss'] else None,'lan_nap_mau':P['die']}
  print(json.dumps(out,ensure_ascii=False),flush=True);print('ERRS',errs[:3]);br.close()
