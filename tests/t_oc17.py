# V309 L17 · kiểm HỆ ÉP XUNG: điều kiện, chi phí từng nấc, phôi ưu tiên Trắng Lv1, chỉ số chính +3 %/nấc, 4 dòng phụ (OC+3, ×2 ở OC+5), hoàn nguyên, tab giao diện.
import sys,os,json
os.chdir(os.path.dirname(os.path.abspath(__file__))+'/..')
src=open('claude_tools/do_dac/t193.py').read().split('# ---------------- V190')[0]
HTML=sys.argv[1];sys.argv=['x',HTML,'160'];exec(src)
t209=open('tests/v203_v212/t209.py').read();exec(t209[t209.find('def start'):t209.find('with sync_playwright')])
ok=[];bad=[]
def chk(n,c,info=''):
    (ok if c else bad).append(n);print(('ĐẠT ' if c else 'TRƯỢT ')+n,info,flush=True)
near=lambda a,b,t=1e-6:abs(a-b)<=t
SETUP="""
window.__ocPrep=(kind)=>{OC17._set({});const vl=['alloy3','crystal3','circuit3','plasma3'];for(const id of vl)V70.add(id,60-V70.have(id));
 for(const c of Evo82.list())Evo82.take(c.u);Progress.grantCredits(2e6);
 if(kind==='craft'){const i=0;V70.setTier('craft',i,9);Workshop.set70(i,{level:90});return {kind:'craft',idx:i,id:'craft:0'};}
 const eq=Progress.v70.equipped();const id=eq[kind];V70.setTier('gear',id,9);Progress.v70.set(id,{level:90});return {kind,id};};
"""
with sync_playwright() as p:
  br=p.chromium.launch();pg,errs,o=setup(br,'SS');pg.add_style_tag(content='#q307{display:none!important}')
  pg.evaluate("()=>{"+SETUP+"}")
  # 1 điều kiện
  r=pg.evaluate("""()=>{const x=__ocPrep('craft');V70.setTier('craft',0,8);Workshop.set70(0,{level:85});const a=OC17.elig(NC307.get('craft:0')).ok;V70.setTier('craft',0,9);Workshop.set70(0,{level:89});const b=OC17.elig(NC307.get('craft:0')).ok;Workshop.set70(0,{level:90});const c=OC17.elig(NC307.get('craft:0')).ok;
   const fz=OC17.elig({kind:'armor',id:'k',key:'x',level:100}).ok;return {a,b,c,fz}}""")
  chk('Điều kiện: Tím +2 không được · Tím +3 chưa đầy cấp không được · Tím +3 Lv90 được · Chiến Thần (key) không được',not r['a'] and not r['b'] and r['c'] and not r['fz'],r)
  # 2 phôi ưu tiên Trắng Lv1 + trừ phí nấc 1
  r=pg.evaluate("""()=>{__ocPrep('craft');Evo82.addCopy('craft',0,2,5,true);Evo82.addCopy('craft',0,0,1,true);Evo82.addCopy('craft',0,0,3,true);const it=NC307.get('craft:0');const p=OC17.plan(it);
   const b0=Progress.balance(),v0=['alloy3','crystal3','circuit3','plasma3'].reduce((a,id)=>a+V70.have(id),0),n0=Evo82.list().length,f0=Workshop.levelFactor(Workshop.craftProgress(0));
   const ok=OC17.doOC(it);const f1=Workshop.levelFactor(Workshop.craftProgress(0));
   return {pick:p.pick.map(q=>[q.t,q.lv]),ok,oc:OC17.oc(it),dHK:b0-Progress.balance(),dV:v0-['alloy3','crystal3','circuit3','plasma3'].reduce((a,id)=>a+V70.have(id),0),dN:n0-Evo82.list().length,left:Evo82.list().map(c=>[c.t,c.lv]),k:f1/f0}}""")
  chk('Phôi tự chọn ưu tiên Trắng Lv1',r['pick']==[[0,1]],r['pick'])
  chk('OC+1 trừ 15.000 hợp kim · 1 bản sao · 3 VL Tím',r['ok'] and r['oc']==1 and r['dHK']==15000 and r['dN']==1 and r['dV']==3,r)
  chk('OC+1: hệ số sức mạnh chiến cơ ×1,03',near(r['k'],1.03,1e-9),r['k'])
  # 3 đủ 5 nấc: tổng chi phí + ×1,15
  r=pg.evaluate("""()=>{__ocPrep('craft');for(let i=0;i<9;i++)Evo82.addCopy('craft',0,0,1,true);const it=()=>NC307.get('craft:0');const f0=Workshop.levelFactor(Workshop.craftProgress(0));
   const b0=Progress.balance(),v0=['alloy3','crystal3','circuit3','plasma3'].reduce((a,id)=>a+V70.have(id),0);const L=[];for(let i=0;i<6;i++)L.push(OC17.doOC(it()));
   return {L,oc:OC17.oc(it()),dHK:b0-Progress.balance(),dV:v0-['alloy3','crystal3','circuit3','plasma3'].reduce((a,id)=>a+V70.have(id),0),left:Evo82.list().length,k:Workshop.levelFactor(Workshop.craftProgress(0))/f0,ban:!!document.querySelector('.oc17ban')}}""")
  chk('OC+1→+5 tổng: 225.000 hợp kim · 9 bản sao · 44 VL Tím · nấc thứ 6 bị chặn',r['L']==[True]*5+[False] and r['oc']==5 and r['dHK']==225000 and r['left']==0 and r['dV']==44,r)
  chk('OC+5: chỉ số chính ×1,15 + banner chúc mừng',near(r['k'],1.15,1e-9) and r['ban'],r)
  # 4 hoàn nguyên
  r=pg.evaluate("""()=>{const it=NC307.get('craft:0');const f=OC17.refundOf(it);const b0=Progress.balance(),v0={};for(const id of ['alloy3','crystal3','circuit3','plasma3'])v0[id]=V70.have(id);
   const res=OC17.restore(it);const cp=Evo82.list().filter(c=>c.k==='craft'&&c.m==0);const dv={};for(const id in v0)dv[id]=V70.have(id)-v0[id];
   return {f,hk:Progress.balance()-b0,cp:cp.length,allW1:cp.every(c=>c.t===0&&c.lv===1),dv,oc:OC17.oc(it)}}""")
  exp={k:int(v*.85) for k,v in {}.items()}
  chk('Hoàn nguyên: 9 bản sao Trắng Lv1 · 85 % hợp kim (191.250) · về OC+0',r['cp']==9 and r['allW1'] and r['hk']==191250 and r['oc']==0,r)
  chk('Hoàn nguyên: VL Tím trả 85 % từng loại (làm tròn xuống)',sum(r['dv'].values())==sum(r['f']['vl'].values()) and sum(r['f']['vl'].values())<=int(44*.85) and sum(r['f']['vl'].values())>=int(44*.85)-3,r['dv'])
  r=pg.evaluate("""()=>{__ocPrep('craft');Evo82.addCopy('craft',0,0,20,true);const it=NC307.get('craft:0');const xp=OC17.cands(it)[0].xp;OC17.doOC(it);const f=OC17.refundOf(it);const d0=XPDA307.total();OC17.restore(it);return {xp,fx:f.xp,dXP:XPDA307.total()-d0}}""")
  chk('Hoàn nguyên: 100 % XP của phôi (trả bằng Đá XP, lẻ làm tròn lên)',r['xp']>0 and r['fx']==r['xp'] and 0<=r['dXP']-r['xp']<15,r)
  # 5 giáp máu
  r=pg.evaluate("""()=>{const out={};for(const kind of ['armor','missiles','sidearm']){const x=__ocPrep(kind);const it=()=>Progress.v70.get(x.id);const s0=Progress.stat(it());const keys=Object.keys(s0).filter(k=>k!=='interval');for(let i=0;i<9;i++)Evo82.addCopy('gear',it().variant,0,1,true);
   const L=[];for(let i=0;i<5;i++){OC17.doOC(it());const s1=Progress.stat(it());L.push(keys.map(k=>s1[k]/s0[k]));}out[kind]={L,oc:OC17.oc(it()),iv:Progress.stat(it()).interval/s0.interval};}return out}""")
  print(json.dumps(r)[:900])
  okg=all(r[k]['oc']==5 and all(near(v,1+.03*(i+1),1e-6) for i,row in enumerate(r[k]['L']) for v in row) and (k=='armor' or near(r[k]['iv'],1,1e-9)) for k in r)
  chk('Giáp / Tên lửa / Tàu con: chỉ số chính ×1,03 mỗi nấc → ×1,15 ở OC+5 (giáp+máu giáp / sát thương), nhịp bắn giữ nguyên',okg,{k:[round(x[0],4) for x in r[k]['L']] for k in r})
  # 6 trận: chí mạng, tên lửa boss, tàu con nạp Bạo Tẩu
  start(pg,10)
  pg.evaluate("()=>{invuln=1e9;setInterval(()=>{try{hp=maxHp}catch(e){}},300)}")
  r=pg.evaluate("""async()=>{const W=t=>new Promise(r=>setTimeout(r,t));const i=launchIdx=(typeof launchCraft!=='undefined'&&launchCraft!=null?launchCraft:selected);const s0=OC17.state();
   OC17._set({g:{['c'+i]:{oc:0,sp:{hk:0,cp:0,vl:{},xp:0}}}});await W(700);const c0=CRIT66.chance;
   OC17._set({g:{['c'+i]:{oc:3,sp:{hk:0,cp:0,vl:{},xp:0}}}});await W(300);const c3=CRIT66.chance;await W(1300);const c3b=CRIT66.chance;
   OC17._set({g:{['c'+i]:{oc:5,sp:{hk:0,cp:0,vl:{},xp:0}}}});await W(300);const c5=CRIT66.chance;return {c0,c3,c3b,c5}}""")
  chk('Chiến cơ: chí mạng +3 % ở OC+3, +6 % ở OC+5 (giữ nguyên qua chu kỳ đặt lại CRIT66)',near(r['c3']-r['c0'],.03,1e-6) and near(r['c3b']-r['c0'],.03,1e-6) and near(r['c5']-r['c0'],.06,1e-6),r)
  r=pg.evaluate("""async()=>{const W=t=>new Promise(r=>setTimeout(r,t));for(let i=0;i<120&&!(boss&&boss.bossHealthReady);i++){await W(200);for(const b of document.querySelectorAll('button'))if(/BỎ QUA/.test(b.textContent)&&b.getClientRects().length)b.click();}if(!boss)return {nb:1};boss.hp=boss.max=1e9;if(boss.coreMax){boss.coreHp=boss.coreMax=1e9;}
   for(let i=0;i<60&&mode!=='play';i++){for(const b of document.querySelectorAll('button'))if(/BỎ QUA|TIẾP TỤC/.test(b.textContent)&&b.getClientRects().length)b.click();await W(200);}const id=Progress.v70.equipped().missiles;const g={};const wg=(boss.parts||[]).find(p=>!p.dead);if(wg){wg.hp=wg.max=1e9;}const hit=src=>{const a=wg.hp;damageBoss(100,src,wg);return a-wg.hp;};for(let i=0;i<80;i++){if(hit('gear')>0)break;await W(200);}wg.hp=wg.max=1e9;
   OC17._set({g:{}});const m0=hit({gearKind:'missiles'});OC17._set({g:{['g:'+id]:{oc:3,sp:{hk:0,cp:0,vl:{},xp:0}}}});const m3=hit({gearKind:'missiles'}),s3=hit({gearKind:'sidearm'});
   OC17._set({g:{['g:'+id]:{oc:5,sp:{hk:0,cp:0,vl:{},xp:0}}}});const m5=hit({gearKind:'missiles'});return {m0,m3,s3,m5,md:mode,rd:boss.bossHealthReady,df:boss.defeatStarted,w:(boss.parts||[]).filter(p=>!p.dead).length,hp:boss.hp,core:boss.coreHp}}""")
  chk('Tên lửa: sát thương lên boss ×1,04 ở OC+3, ×1,08 ở OC+5 (đạn khác không đổi)',r.get('m0',0)>0 and near(r['m3']/r['m0'],1.04,1e-6) and near(r['s3'],r['m0'],1e-6) and near(r['m5']/r['m0'],1.08,1e-6),r)
  r=pg.evaluate("""async()=>{const W=t=>new Promise(r=>setTimeout(r,t));superTime=0;const id=Progress.v70.equipped().sidearm;OC17._set({g:{['g:'+id]:{oc:3,sp:{hk:0,cp:0,vl:{},xp:0}}}});
   power=1;powerUpgrades=0;await W(200);OC17.st.pw.acc=.96;power=2;powerUpgrades=1;await W(200);const a=power;
   OC17._set({g:{['g:'+id]:{oc:5,sp:{hk:0,cp:0,vl:{},xp:0}}}});power=1;powerUpgrades=0;await W(200);OC17.st.pw.acc=0;let n=0;for(let k=0;k<10;k++){power=1;powerUpgrades=0;await W(80);power=2;powerUpgrades=1;await W(80);if(power===3)n++;}
   OC17._set({g:{}});power=1;await W(200);OC17.st.pw.acc=.99;power=2;await W(200);const off=power;return {a,n,off}}""")
  chk('Tàu con: nạp Bạo Tẩu +5 % (OC+3: 0,96+0,05 ≥ 1 → thêm 1 nấc) · +10 % (OC+5: 10 lần tăng → 1 nấc thêm) · OC+0 không có',r['a']==3 and r['n']==1 and r['off']==2,r)
  hp0=None
  for ocv in (0,3,5):
    pg.evaluate("(v)=>{mode='menu';Lobby.show();const id=Progress.v70.equipped().armor;OC17._set(v?{g:{['g:'+id]:{oc:v,sp:{hk:0,cp:0,vl:{},xp:0}}}}:{})}",ocv)
    start(pg,12)
    m=pg.evaluate("async()=>{await new Promise(r=>setTimeout(r,800));return {pre:OC17.st.hp.pre,post:OC17.st.hp.post,cur:maxHp,k:OC17.st.hp.k}}")
    if ocv:chk('Giáp OC+%d: máu tối đa trong trận ×%s (đúng lúc áp dòng phụ)'%(ocv,'1,04' if ocv==3 else '1,08'),bool(m['pre']) and near(m['post']/m['pre'],1.04 if ocv==3 else 1.08,2e-3) and near(m['cur'],m['post'],1e-6) and near(m['k'],1.04 if ocv==3 else 1.08,1e-9),m)
  pg.evaluate("()=>{mode='menu';Lobby.show();OC17._set({})}")
  # 7 giao diện tab
  r=pg.evaluate("""async()=>{const W=t=>new Promise(r=>setTimeout(r,t));Progress.setLocked(false);__ocPrep('craft');for(let i=0;i<3;i++)Evo82.addCopy('craft',0,0,1,true);NC307.open('craft:0','up');await W(500);
   const tabs=[...document.querySelectorAll('#nc307 .oc17t button')].map(b=>b.textContent);document.querySelector('#nc307 [data-oc=oc]').click();await W(200);
   const pn=!!document.querySelector('#nc307 .oc17');const hid=getComputedStyle(document.querySelector('#nc307 .nc307-bot')||document.body).display;document.querySelector('#nc307 [data-oc=go]').click();await W(150);
   const li=[...document.querySelectorAll('#nc307 .oc17 .ask li')].map(x=>x.textContent);document.querySelector('#nc307 [data-oc=ok]').click();await W(600);
   const oc=OC17.oc(NC307.get('craft:0'));const bd=[...document.querySelectorAll('#nc307 .oc17b')].map(x=>x.textContent);document.querySelector('#nc307 [data-oc=adv]').click();await W(300);
   const advOn=!!document.querySelector('#nc307 [data-oc=adv].on')&&!document.querySelector('#nc307 .oc17');NC307.close();return {tabs,pn,hid,li,oc,bd,advOn,md:mode,bal:Progress.balance(),pl:OC17.plan(NC307.get('craft:0')).lacks,el:OC17.elig(NC307.get('craft:0')).why}}""")
  chk('Tab CƯỜNG HÓA: NÂNG CẤP | TIẾN BẬC | ÉP XUNG',r['tabs']==['NÂNG CẤP','TIẾN BẬC','ÉP XUNG'],r['tabs'])
  chk('Tab ÉP XUNG: hiện bảng, ẩn hàng nút nâng cấp, xác nhận liệt kê phôi + VL + hợp kim rồi OC+1',r['pn'] and r['hid']=='none' and len(r['li'])>=3 and 'Trắng' in r['li'][0] and r['oc']==1,r)
  chk('Huy hiệu OC+1 hiện trên thẻ · chuyển về TIẾN BẬC tắt bảng ép xung',('OC+1' in r['bd']) and r['advOn'],r)
  chk('Không lỗi JS',not errs,errs[:3])
  print('KẾT QUẢ',len(ok),'/',len(ok)+len(bad),'trượt:',bad)
