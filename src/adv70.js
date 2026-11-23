'use strict';
// V70 · HỆ PHẨM CHẤT 4 KHUNG MÀU (12 nấc) — thay Đột phá V69. Thiết kế: Gemini (GEMINI_TRA_LOI_PHAM_CHAT_V70.md), người dùng chốt 22/10/2026:
//  • Trắng → Lục → Lam → Lam+1..+3 → Tím → Tím+1..+5. Trần cấp 25/35/45/50/55/60/75/80/85/90/95/100 (cấp tối đa 100).
//  • Đổi khung (→Lục, →Lam, →Tím): bộ 4 nguyên liệu cùng màu khung đích + hợp kim ◈ + đá ⬢.
//  • Nấc cộng (Lam+n, Tím+n): phôi cùng mẫu cùng màu + hợp kim, không tốn nguyên liệu khác.
//  • SSS: KHÔNG dùng phôi Tím (người dùng bác) → vẫn đột phá ★ bằng Tinh Hạch Siêu Việt (giữ từ V69).
//  Cân bằng (Claude): giữ đúng sức mạnh tối đa của bản cũ (+5 Lv120 ≡ Tím+5 Lv100); mỗi nấc +3,64%, hệ số cấp ×119/99.
//  Lõi game vẫn giữ "enhance" 0–5 cho các phần cũ: enhance = floor(5·nấc/11). Nấc thật lưu riêng ở saobang-tier70-v1.
const MAT69={
 types:[{id:'alloy',n:'Lõi Hợp Kim'},{id:'crystal',n:'Tinh Thể Năng Lượng'},{id:'circuit',n:'Mạch Lượng Tử'},{id:'plasma',n:'Sợi Plasma'}],
 tiers:[{n:'Lục',c:'#3ee08f'},{n:'Lam',c:'#3aa8ff'},{n:'Tím',c:'#b45cff'}],
 sss:{id:'sss_core',n:'Tinh Hạch Siêu Việt',c:'#ffb43a'}};
const TIER70={
 name:['Trắng','Lục','Lam','Lam +1','Lam +2','Lam +3','Tím','Tím +1','Tím +2','Tím +3','Tím +4','Tím +5'],
 frame:[0,1,2,2,2,2,3,3,3,3,3,3],               // 0 Trắng · 1 Lục · 2 Lam · 3 Tím
 fname:['Trắng','Lục','Lam','Tím'],fcol:['#d6e0ea','#3ee08f','#3aa8ff','#b45cff'],
 cap:[25,35,45,50,55,60,75,80,85,90,95,100],
 // bước nấc n → n+1: mat = màu bộ nguyên liệu (1 Lục, 2 Lam, 3 Tím) · ph = màu phôi (2 Lam, 3 Tím), k = số phôi
 step:[{mat:1},{mat:2},{ph:2,k:1},{ph:2,k:1},{ph:2,k:2},{mat:3},{ph:3,k:1},{ph:3,k:1},{ph:3,k:2},{ph:3,k:2},{ph:3,k:3}],
 cr:{craft:[1500,3500,5000,6500,8500,12000,15000,18000,22000,27000,35000],gear:[1000,2500,3500,4500,6000,9000,10500,12500,15500,19000,24500]},
 stone:{craft:{1:40,2:80,3:150},gear:{1:25,2:60,3:110}},
 mq:{craft:{1:1,2:1,3:1},gear:{1:1,2:1,3:1}},  // V78.2: mỗi loại 1 nguyên liệu (giống game gốc)
 tm:.0364,lk:119/99,                           // hệ số mỗi nấc · co giãn hệ số cấp (thang 100 thay 120)
 ve:[0,1,3,3,3,3,5,5,5,5,5,5],                 // ngoại hình: Lục = q1 · Lam = tiến hóa I · Tím = tiến hóa II · Tím+5 = q5
 phoi:{frag:15,purple:{k:3,cr:3000},recycle:3,up:{1:{k:3,cr:0},2:{k:3,cr:200},3:{k:3,cr:3000}}},   // V74: bỏ mảnh · 3 Trắng→1 Lục · 3 Lục→1 Lam · 3 Lam→1 Tím
 craftMat:{2:{from:1,k:3,cr:200},3:{from:2,k:3,cr:600}},
 // rơi nguyên liệu theo dải ải: xác suất [Lục, Lam, Tím]
 band:[[20,[1,0,0]],[40,[.6,.4,0]],[60,[.3,.7,0]],[100,[0,.6,.4]],[140,[0,.4,.6]],[999,[0,.2,.8]]],ecl:[0,.3,.7],
 picks:{normal:[0,0],mini:1,boss:2},sweepK:.5,   // V78.2: nguyên liệu chỉ rơi ở ải mini boss (÷5) và boss (÷10)
 // rơi phôi: xác suất khung [Trắng, Lục, Lam, Tím]; Trắng/Lục tự phân giải thành mảnh
 phDrop:{mini:{p:.4,w:[55,35,10,0]},boss:{p:.6,w:[20,50,26,4]},ecl:{p:.45,w:[0,30,52,18]},eclBoss:{p:1,w:[0,30,52,18]},ch9:{p:.25,w:[0,30,52,18]}},
 dust:[6,12],                                   // phôi Trắng / Lục rơi ra → mảnh
 mile:{},   // V79: bỏ phôi mốc ải (trước: 20/40/60 Lam, 80–160 Tím) → thay bằng Thành tựu tặng bộ chiến cơ + trang bị (set79.js)
 dismantle:[6,12],                              // phân giải trang bị Trắng / Lục → mảnh mẫu đó (Lam+ → 1 phôi Lam, Tím+ → 1 phôi Tím)
 // SSS (giữ từ V69)
 sss:[{k:10,c:10000},{k:15,c:15000},{k:20,c:20000},{k:30,c:26000},{k:40,c:32000},{k:55,c:40000},{k:70,c:48000},{k:90,c:58000},{k:115,c:70000},{k:140,c:85000}],
 sssGear:.04,sssShip:.05,sssDrop:{ecl:[1,2,3],ch9:[2,3,5],eclSweep:window.ECON203===false?[1,1,2]:[1,2,3]/* V203 */}};
const ADV69=TIER70;// tên cũ cho test/module cũ
const V70=(()=>{
 const T=TIER70,KEY='saobang-tier70-v1',MKEY='saobang-adv69-v1';
 const rd=k=>{try{const v=JSON.parse(localStorage.getItem(k)||'null');return v&&typeof v==='object'?v:{};}catch{return {};}};
 const S=Object.assign({v:1,c:{},g:{},ph:{},ms:{},first:{},mig:0,log:[]},rd(KEY));for(const k of ['c','g','ph','ms','first'])S[k]=S[k]||{};
 const M=Object.assign({m:{},star:{}},rd(MKEY));M.m=M.m||{};M.star=M.star||{};
 const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S));}catch{}},saveM=()=>{try{localStorage.setItem(MKEY,JSON.stringify(M));}catch{}};
 const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 const fmt=n=>Math.round(n).toLocaleString('vi-VN');
 const Eof=n=>Math.floor(n*5/11);
 // ---------- quy đổi enhance/level cũ → nấc ----------
 function migN(E,L){E=Math.max(0,Math.min(5,E|0));L=Math.max(1,L|0);const Ln=Math.max(1,Math.round(L*100/120));let n=Math.min(11,Math.round(2.2*E));while(n<11&&T.cap[n]<Ln)n++;return {n,l:Math.min(Ln,T.cap[n])};}
 // ---------- tra nấc ----------
 function nOf(o){if(!o||typeof o!=='object'||o.key||o.super||o.directFusion)return null;
  if(Number.isInteger(o.idx)&&o.idx>=0&&o.idx<13){const r=S.c[o.idx];return r?r.n:migN(o.enhance,o.level).n;}
  if(typeof o.id==='string'&&o.kind){const r=S.g[o.id];return r?r.n:migN(o.enhance,o.level).n;}
  return null;}
 const craftN=i=>{const r=S.c[i];if(r)return r.n;try{const v=Workshop.craftProgress(i);return migN(v.enhance,v.level).n;}catch{return 0;}};
 // ---------- đồng bộ với lõi (tự quy đổi save cũ / dữ liệu ngoài như chế độ quản trị) ----------
 let syncing=false;
 function sync(){if(syncing)return;syncing=true;let changed=false;const notes=[];
  try{const W=Workshop.getState();for(let i=0;i<13;i++){const E=W.craftEnhancements[i]|0,L=W.craftLevels[i]|0||1,r=S.c[i];
    if((!r||r.n<2)&&!(r&&r.sg)&&['S','SS'].includes(W.crafts[i])&&!E&&L<=1){S.c[i]={n:2,sg:1};changed=true;continue;}
    if(!r||Eof(r.n)!==E||L>T.cap[r.n]){const m=migN(E,L);S.c[i]={n:m.n};changed=true;if(m.l!==L||Eof(m.n)!==E)Workshop.set70(i,{level:m.l,enhance:Eof(m.n)});if(E||L>25)notes.push({c:i,from:'+'+E+' Lv'+L,to:T.name[m.n]+' Lv'+m.l});}}}catch(e){}
  try{const items=Progress.v70.items(),ids=new Set();for(const it of items){ids.add(it.id);const E=it.enhance|0,L=it.level|0||1,r=S.g[it.id];
    if(!r&&['S','SS'].includes(it.grade)&&!(E||L>1)){S.g[it.id]={n:2};changed=true;continue;}
    if(!r||Eof(r.n)!==E||L>T.cap[r.n]){const m=migN(E,L);S.g[it.id]={n:m.n};changed=true;if(m.l!==L||Eof(m.n)!==E)Progress.v70.set(it.id,{level:m.l,enhance:Eof(m.n)});if(E||L>25)notes.push({g:it.variant,from:'+'+E+' Lv'+L,to:T.name[m.n]+' Lv'+m.l});}}
   for(const id in S.g)if(!ids.has(id)){delete S.g[id];changed=true;}}catch(e){}
  if(!S.mig){S.mig=1;changed=true;if(notes.length)setTimeout(()=>migNote(notes),1200);}
  if(changed)save();syncing=false;}
 function migNote(notes){if(!el)build();const nm=x=>{try{return x.c!=null?Fighters28.profiles[x.c].name:GearCatalog[x.g].name;}catch{return x.c!=null?'Chiến cơ '+x.c:x.g;}};
  el.innerHTML=`<div class="m63-card adv-card"><div class="m63-eye">CẬP NHẬT V70</div><h3>Hệ phẩm chất 4 khung màu</h3><p class="adv-max">Cường hóa +0…+5 đã đổi thành <b>12 nấc</b>: Trắng → Lục → Lam → Lam+1…+3 → Tím → Tím+1…+5. Cấp tối đa là <b>100</b> (thay 120); sức mạnh được giữ nguyên.</p>
   <div class="adv-mig">${notes.slice(0,16).map(x=>`<div><b>${esc(nm(x))}</b><small>${esc(x.from)} → <em>${esc(x.to)}</em></small></div>`).join('')}${notes.length>16?'<div><small>… và '+(notes.length-16)+' món khác</small></div>':''}</div>
   <div class="adv-btns"><button class="m63-go" data-a="close">ĐÃ HIỂU</button></div></div>`;el.hidden=false;}
 // ---------- tra cứu cho lõi game ----------
 const capOf=o=>{const n=nOf(o);return n==null?null:T.cap[n];};
 const lfOf=o=>{const n=nOf(o);if(n==null)return null;return (1+((o.level|0||1)-1)*.006*T.lk)*(1+n*T.tm);};
 const kOf=o=>nOf(o)==null?1:T.lk;
 const efOf=o=>{const n=nOf(o);return n==null?((o&&o.enhance)||0):n*5/11;};
 const label=o=>{const n=nOf(o);return n==null?'+'+((o&&o.enhance)||0):T.name[n];};
 const colorOf=o=>{const n=nOf(o);return T.fcol[n==null?0:T.frame[n]];};
 window.V70CAP=capOf;window.V70LF=lfOf;window.V70K=kOf;window.V70EF=efOf;window.V70T=label;window.V70C=colorOf;window.V70F=o=>{const n=nOf(o);return T.frame[n==null?0:n]|0;};
 const ve=(kind,ref)=>{let n=0;if(kind==='c')n=craftN(ref|0);else if(ref&&typeof ref==='object'){const r=S.g[ref.id];n=r?r.n:migN(ref.enhance,ref.level).n;}return T.ve[n]||0;};
 const isMax=id=>craftN(id|0)>=11;
 // ---------- nguyên liệu (kho dùng chung V69) ----------
 const mid=(type,t)=>type+t;
 const have=id=>M.m[id]|0;
 function add(id,n){n=n|0;if(!n)return;M.m[id]=Math.max(0,have(id)+n);saveM();}
 const matName=id=>{if(id===MAT69.sss.id)return MAT69.sss.n;const t=+id.slice(-1),ty=MAT69.types.find(x=>x.id===id.slice(0,-1));return (ty?ty.n:id)+' '+(MAT69.tiers[t-1]?.n||'');};
 const matCol=id=>id===MAT69.sss.id?MAT69.sss.c:(MAT69.tiers[(+id.slice(-1))-1]?.c||'#fff');
 const iconCache={};
 function icon(id){if(typeof MAT69_ART!=='undefined'&&MAT69_ART&&MAT69_ART[id])return MAT69_ART[id];if(iconCache[id])return iconCache[id];
  const c=document.createElement('canvas');c.width=c.height=96;const g=c.getContext('2d');const col=matCol(id);g.translate(48,48);
  const glow=g.createRadialGradient(0,0,4,0,0,46);glow.addColorStop(0,col+'aa');glow.addColorStop(1,col+'00');g.fillStyle=glow;g.fillRect(-48,-48,96,96);
  g.fillStyle=col;g.strokeStyle='#fff';g.lineWidth=2;g.beginPath();g.arc(0,0,24,0,Math.PI*2);g.fill();g.stroke();return iconCache[id]=c.toDataURL();}
 // ---------- phôi ----------
 const pk=(kind,model,col)=>(kind==='craft'?'c'+model:'g:'+model)+':'+col;
 const phHave=(kind,model,col)=>S.ph[pk(kind,model,col)]|0;
 function phAdd(kind,model,col,n){if((n|0)>0&&(window.Evo82&&Evo82.on())){Evo82.fromPh(kind,model,col,n|0);return;}const k=pk(kind,model,col);S.ph[k]=Math.max(0,(S.ph[k]|0)+(n|0));if(!S.ph[k])delete S.ph[k];save();}
 const fragHave=(kind,model)=>{try{const W=Workshop.getState();return kind==='craft'?(W.craftFragments[model]|0):(W.gearFragments[model]|0);}catch{return 0;}};
 const phName=col=>((window.Evo82&&Evo82.on())?'Bản sao ':'Phôi ')+(['Trắng','Lục','Lam','Tím'][col]||'Lam')+((window.Evo82&&Evo82.on())?' Lv1':'');
 // đúc phôi Lam từ mảnh cùng mẫu
 function forgeUp(kind,model,c){const P=T.phoi.up[c];if(!P)return false;if(phHave(kind,model,c-1)<P.k){toast('THIẾU '+phName(c-1).toUpperCase()+' · cần '+P.k);return false;}if(P.cr&&Progress.balance()<P.cr){toast('THIẾU HỢP KIM · cần '+fmt(P.cr));return false;}if(P.cr&&!Progress.spendCredits(P.cr))return false;phAdd(kind,model,c-1,-P.k);phAdd(kind,model,c,1);return true;}
 function forgeLam(kind,model){return forgeUp(kind,model,2);}
 function forgeLuc(kind,model){return forgeUp(kind,model,1);}
 // nâng 3 phôi Lam cùng mẫu → 1 phôi Tím
 function forgeTim(kind,model){return forgeUp(kind,model,3);}
 function forgeTimOld(kind,model){const P=T.phoi.purple;if(phHave(kind,model,2)<P.k){toast('THIẾU PHÔI LAM · cần '+P.k);return false;}if(Progress.balance()<P.cr){toast('THIẾU HỢP KIM · cần '+fmt(P.cr));return false;}if(!Progress.spendCredits(P.cr))return false;phAdd(kind,model,2,-P.k);phAdd(kind,model,3,1);return true;}
 // tái chế: 3 phôi cùng màu của mẫu KHÁC (cùng loại ô) → 1 phôi đúng mẫu
 function recyclePool(kind,model,col){const out=[];let slot=null;if(kind==='gear')try{slot=GearCatalog[model].kind;}catch{}
  for(const k in S.ph){const m=k.match(/^(c(\d)|g:([a-z_]+)):(\d)$/);if(!m||+m[4]!==col)continue;const isC=m[1][0]==='c';if(isC!==(kind==='craft'))continue;const mm=isC?+m[2]:m[3];if(mm===model)continue;if(!isC){try{if(GearCatalog[mm].kind!==slot)continue;}catch{continue;}}out.push({k,n:S.ph[k]});}
  return out.sort((a,b)=>b.n-a.n);}
 function recycle(kind,model,col){const pool=recyclePool(kind,model,col);let need=T.phoi.recycle;if(pool.reduce((s,x)=>s+x.n,0)<need){toast('CẦN '+need+' '+phName(col).toUpperCase()+' KHÁC MẪU');return false;}
  for(const x of pool){const t=Math.min(x.n,need);S.ph[x.k]-=t;if(!S.ph[x.k])delete S.ph[x.k];need-=t;if(!need)break;}phAdd(kind,model,col,1);return true;}
 // ---------- yêu cầu nâng nấc ----------
 function objOf(kind,ref){if(kind==='craft'){const v=Workshop.craftProgress(ref|0);return Object.assign({},v,{idx:ref|0});}return Progress.v70.get(ref)||null;}
 const modelOf=(kind,o)=>kind==='craft'?o.idx:o.variant;
 function req(kind,ref){const o=objOf(kind,ref);if(!o)return null;const n=nOf(o);if(n==null||n>=11)return null;const st=T.step[n],K=kind==='craft'?'craft':'gear',model=modelOf(kind,o);
  return {o,n,next:n+1,st,model,cr:T.cr[K][n],stone:st.mat?T.stone[K][st.mat]:0,mats:st.mat?MAT69.types.map(ty=>({id:mid(ty.id,st.mat),n:T.mq[K][st.mat]})):[],
   ph:st.ph?{col:st.ph,k:st.k,have:phHave(kind,model,st.ph)}:null,atCap:(o.level|0)>=T.cap[n]};}
 const stones=()=>{try{return Workshop.getState().exp|0;}catch{return 0;}};
 function lacks(q){if(!q)return ['max'];const L=[];if(!q.atCap)L.push('cap');for(const m of q.mats)if(have(m.id)<m.n)L.push(m.id);if(q.ph&&q.ph.have<q.ph.k)L.push('ph');try{if(Progress.balance()<q.cr)L.push('credits');}catch{}if(q.stone&&stones()<q.stone)L.push('stone');return L;}
 function promote(kind,ref){const q=req(kind,ref);const L=lacks(q);if(L.length){const n=L.map(x=>x==='cap'?'chưa đạt trần cấp':x==='ph'?phName(q.ph.col).toLowerCase():x==='credits'?'hợp kim':x==='stone'?'đá nâng cấp':x==='max'?'':matName(x)).filter(Boolean);if(n.length)toast('THIẾU: '+n.slice(0,3).join(', ')+(n.length>3?'…':''));return false;}
  if(!Progress.spendCredits(q.cr))return false;if(q.stone&&!Workshop.exp70(-q.stone)){Progress.grantCredits(q.cr);return false;}
  for(const m of q.mats)add(m.id,-m.n);if(q.ph)phAdd(kind,q.model,q.ph.col,-q.ph.k);
  const n=q.next,E=Eof(n);if(kind==='craft'){S.c[q.o.idx]={n};save();Workshop.set70(q.o.idx,{enhance:E});}else{S.g[q.o.id]={n};save();Progress.v70.set(q.o.id,{enhance:E});}
  try{Progress.render();}catch{}try{Combat.render&&Combat.render();}catch{}return true;}
 // ---------- phân giải trang bị ----------
 function dismantleGain(it){const n=nOf(it)|0;return {c:n>=6?3:n>=2?2:n};}
 function stoneBack(it){let s=0;try{for(let l=1;l<(it.level|0);l++)s+=Workshop.levelCost({...it,level:l}).exp;}catch{}return Math.floor(s/2);}
 function dismantle(id,quiet){const it=Progress.v70.get(id);if(!it)return null;const eq=Object.values(Progress.v70.equipped());if(eq.includes(id)){if(!quiet)toast('ĐANG MẶC · KHÔNG PHÂN GIẢI ĐƯỢC');return null;}
  const g=dismantleGain(it),sb=stoneBack(it);if(!Progress.v70.remove(id))return null;delete S.g[id];save();
  phAdd('gear',it.variant,g.c,1);if(sb)Workshop.exp70(sb);return Object.assign({sb},g);}
 function junk(){const items=Progress.v70.items(),eq=new Set(Object.values(Progress.v70.equipped())),best={};
  for(const it of items){const k=it.variant,sc=(nOf(it)|0)*1000+(it.level|0);if(!best[k]||sc>best[k].sc)best[k]={id:it.id,sc};}
  return items.filter(it=>!eq.has(it.id)&&(nOf(it)|0)<=1&&best[it.variant].id!==it.id);}
 // ---------- rơi đồ ----------
 const bandOf=stage=>{for(const [mx,p] of T.band)if(stage<=mx)return p;return T.band.at(-1)[1];};
 const roll=p=>{const r=Math.random();return r<p[0]?1:r<p[0]+p[1]?2:3;};
 const matIdx=stage=>((Math.max(1,Math.round((stage|0)/5))-1)%4+4)%4;
 function matOf(stage){const b=stage%10===0,m=!b&&stage%5===0;return (b||m)?MAT69.types[matIdx(stage)]:null;}
 function dropMats(stage,k,ecl){const boss=stage%10===0,mini=!boss&&stage%5===0,p=ecl?T.ecl:bandOf(stage);let picks=0;
  if(boss||mini){/* V78.3: lần đầu 2 · đánh lại mini 1, boss 1 (+50% cái thứ 2) · càn quét 1 chắc chắn */if(k<1)picks=1;else if(firstFlag)picks=2;else picks=mini?1:1+(Math.random()<.5?1:0);}else for(let i=0;i<T.picks.normal[0];i++)if(Math.random()<T.picks.normal[1])picks++;const got={};
  /* V78.2: mỗi ải mini boss/boss chỉ rơi 1 loại cố định: ◆5 Lõi Hợp Kim · ♛10 Tinh Thể · ◆15 Mạch Lượng Tử · ♛20 Sợi Plasma · lặp lại */const fx=MAT69.types[matIdx(stage)].id;/* V78.7: màu cố định = màu phổ biến nhất của dải ải (khớp huy hiệu bản đồ và gợi ý càn quét) */const tf=ecl?0:p.reduce((b,v,i)=>v>p[b]?i:b,0)+1;for(let i=0;i<picks;i++){const id=mid(fx,tf||roll(p));got[id]=(got[id]||0)+1;}for(const id in got)add(id,got[id]);return got;}
 function ownedCrafts(){const L=[];for(let i=0;i<13;i++)try{if(Campaign36.ownsCraft(i))L.push(i);}catch{}return L.length?L:[0];}
 function ownedModels(){try{return Campaign36.getState().models.slice();}catch{return [];}}
 function pickModel(){const ship=Math.random()<.5;if(ship){const own=ownedCrafts();let m=own[Math.floor(Math.random()*own.length)];try{if(Math.random()<(window.SMART79||.5)&&Campaign36.ownsCraft(selected))m=selected;}catch{}return {kind:'craft',model:m};}
  const ms=ownedModels();if(!ms.length)return {kind:'craft',model:ownedCrafts()[0]};let m=ms[Math.floor(Math.random()*ms.length)];
  try{if(Math.random()<(window.SMART79||.5)){const eq=Progress.v70.equipped(),its=Object.values(eq).map(id=>Progress.v70.get(id)).filter(Boolean);if(its.length)m=its[Math.floor(Math.random()*its.length)].variant;}}catch{}return {kind:'gear',model:m};}
 const nameOf=(kind,model)=>{try{return kind==='craft'?Fighters28.profiles[model].name:GearCatalog[model].name;}catch{return String(model);}};
 function dropPhoi(tbl,force){if(!force&&Math.random()>=tbl.p)return null;const w=tbl.w,s=w.reduce((a,b)=>a+b,0);let r=Math.random()*s,f=0;for(;f<3;f++){if(r<w[f])break;r-=w[f];}
  if(force==='lam')f=Math.max(f,2);if(force==='tim')f=3;const pm=pickModel();
  phAdd(pm.kind,pm.model,f,1);return '+1 '+phName(f)+' · '+nameOf(pm.kind,pm.model);}
 function miles(){const out=[];let cl=[];try{cl=Progress.v70.cleared();}catch{}let main=0;try{main=Campaign36.ownsCraft(selected)?selected:ownedCrafts()[0];}catch{}
  for(const s in T.mile)if(!S.ms[s]&&cl.includes(+s)){S.ms[s]=1;const col=T.mile[s];phAdd('craft',main,col,1);out.push('MỐC ẢI '+s+': +1 '+phName(col)+' · '+nameOf('craft',main));}if(out.length)save();return out;}
 let firstFlag=false;
 try{const orw=Progress.rewardStage;Progress.rewardStage=function(stage){let f=false;try{f=!Progress.v70.cleared().includes(stage);}catch{}firstFlag=f;try{return orw.apply(this,arguments);}finally{firstFlag=false;}};}catch{}
 const sssFor=(stage,tbl)=>{const boss=stage%10===0,mini=!boss&&stage%5===0;const n=tbl[boss?2:mini?1:0];if(n)add(MAT69.sss.id,n);return n;};
 const lines=got=>Object.entries(got).map(([id,n])=>'+'+n+' '+matName(id));
 try{const ors=Workshop.rollStage;Workshop.rollStage=function(stage){const r=ors.apply(this,arguments);try{if(typeof gameMode!=='undefined'&&gameMode==='endless')return r;let ecl=false;try{ecl=Eclipse67.active();}catch{}
   const sweep=!['play','pause','reward'].includes(mode);let out=[];stage=Math.min(stage|0,180);
   if(stage>160){const n=sssFor(stage,T.sssDrop.ch9);if(n)out.push('+'+n+' '+MAT69.sss.n);}
   if(ecl){const n=sssFor(stage,T.sssDrop.ecl);if(n)out.push('+'+n+' '+MAT69.sss.n);}
   out=out.concat(lines(dropMats(stage,sweep?T.sweepK:1,ecl)));
   const boss=stage%10===0,mini=!boss&&stage%5===0;let ph=null;
   if(ecl){const fk='e'+stage;if(boss&&!S.first[fk]&&!sweep){S.first[fk]=1;save();ph=dropPhoi(T.phDrop.eclBoss,'tim');}else ph=dropPhoi(boss?T.phDrop.eclBoss:T.phDrop.ecl);}
   else if(boss){if(firstFlag&&!sweep)ph=dropPhoi(T.phDrop.boss,'lam');else ph=dropPhoi(T.phDrop.boss);}
   else if(mini)ph=dropPhoi(T.phDrop.mini);
   else if(stage>160)ph=dropPhoi(T.phDrop.ch9);
   /* V78.8 (chủ dự án): trang bị/chiến cơ (phôi) KHÔNG rơi ở ải chiến dịch thường — chỉ Vô tận, phó bản trang bị, Nhật thực; mốc chiến dịch giữ nguyên */
   try{if(!ecl&&window.CAMPPHOI78!==true&&gameMode==='campaign'&&!(typeof Dungeons!=='undefined'&&Dungeons.active()))ph=null;}catch{}
   if(ph)out.push(ph);out=out.concat(miles());
   if(Array.isArray(r))return r.concat(out);}catch(e){}return r;};}catch{}
 try{const osw=Eclipse67.sweep;Eclipse67.sweep=function(s){const r=osw.apply(this,arguments);try{if(r){r.sss=sssFor(s,T.sssDrop.eclSweep);}}catch{}return r;};}catch{}
 // ---------- SSS ★ (giữ V69) ----------
 const starOf=key=>M.star[key]|0;
 function sssList(){const L=[];try{for(const k of ['armor','missiles','sidearm']){const id=Gear44.activeId(k);if(id){const d=Gear44.activeDef(k);L.push({key:'g:'+id,name:d?d.name:id,kind:k,col:d?.color||'#ffd56a',eff:T.sssGear});}}}catch{}
  try{const st=Fusion.getState();const keys=new Set();const sel=Fusion.getSelected();if(sel&&String(sel.key).startsWith('sss:'))keys.add(sel.key);for(const r of (st.robots||st.owned||[]))if(r&&String(r.key||'').startsWith('sss:'))keys.add(r.key);for(const k of keys){let nm=k;try{if(sel&&sel.key===k)nm=sel.name;}catch{}L.push({key:'r:'+k,name:nm,kind:'ship',col:'#ffb43a',eff:T.sssShip});}}catch{}return L;}
 function sssUp(key){const s=starOf(key);if(s>=T.sss.length)return false;const r=T.sss[s];if(have(MAT69.sss.id)<r.k){toast('THIẾU '+MAT69.sss.n+' · '+have(MAT69.sss.id)+'/'+r.k);return false;}if(Progress.balance()<r.c){toast('THIẾU HỢP KIM · cần '+fmt(r.c));return false;}
  if(!Progress.spendCredits(r.c))return false;add(MAT69.sss.id,-r.k);M.star[key]=s+1;saveM();try{Combat.render&&Combat.render();}catch{}return true;}
 function sssMult(){let m=1;try{for(const k of ['armor','missiles','sidearm']){const id=Gear44.activeId(k);if(id)m*=1+T.sssGear*starOf('g:'+id)/3;}const sel=Fusion.getSelected();if(sel&&String(sel.key).startsWith('sss:'))m*=1+T.sssShip*starOf('r:'+sel.key);}catch{}return m;}
 try{const ods=allyDamageScale;allyDamageScale=function(){return ods.apply(this,arguments)*sssMult();};}catch{}
 try{const ost=Combat.stats;Combat.stats=function(){const r=ost.apply(this,arguments);try{const m=sssMult();if(m>1&&r){r.attack*=m;r.cp=Math.round(r.cp*(1+(m-1)*.6));}}catch{}return r;};}catch{}
 // ---------- giao diện ----------
 let el=null,ctx=null;
 function build(){el=document.createElement('div');el.className='m63 adv69 adv70';el.hidden=true;document.body.appendChild(el);
  el.addEventListener('click',e=>{const t=e.target.closest('[data-a]');if(!t){if(e.target===el)close();return;}const a=t.dataset.a,v=t.dataset.v;
   if(a==='close')close();else if(a==='go')doIt();else if(a==='src')src(v);else if(a==='back')render();else if(a==='inv')inv();else if(a==='sss')sss();else if(a==='sup'){if(sssUp(v))band('ĐỘT PHÁ SSS THÀNH CÔNG');sss();}
   else if(a==='nav')nav(v);else if(a==='flam'){if(forgeLam(ctx.kind,curModel()))band('+1 PHÔI LAM');render();}else if(a==='fluc'){if(forgeLuc(ctx.kind,curModel()))band('+1 PHÔI LỤC');render();}else if(a==='ftim'){if(forgeTim(ctx.kind,curModel()))band('+1 PHÔI TÍM');render();}
   else if(a==='rec'){if(recycle(ctx.kind,curModel(),+v))band('TÁI CHẾ · +1 '+phName(+v).toUpperCase());render();}
   else if(a==='cm'){if(craftMat(v))band('GHÉP THÀNH CÔNG');inv();}
   else if(a==='dis'){const g=dismantle(v);if(g){band('PHÂN GIẢI · '+gainTxt(g));close();refreshHub();}}
   else if(a==='junk'){let n=0;for(const it of junk()){const g=dismantle(it.id,true);if(g)n++;}band('ĐÃ PHÂN GIẢI '+n+' MÓN');close();refreshHub();}});}
 const gainTxt=g=>('+1 '+phName(g.c|0))+(g.sb?' · +'+g.sb+' ⬢':'');
 function close(){if(el)el.hidden=true;}
 const curModel=()=>{const o=objOf(ctx.kind,ctx.ref);return o?modelOf(ctx.kind,o):null;};
 function refreshHub(){try{Progress.render();}catch{}try{const h=document.getElementById('hub40');if(h&&!h.hidden)h.querySelector('[data-f].on,[aria-pressed="true"][data-f]')?.click();}catch{}}
 function craftMat(id){const t=+id.slice(-1),ty=id.slice(0,-1),r=T.craftMat[t];if(!r)return false;const src=mid(ty,r.from);if(have(src)<r.k){toast('CẦN '+r.k+' '+matName(src));return false;}if(Progress.balance()<r.cr){toast('THIẾU HỢP KIM · cần '+fmt(r.cr));return false;}if(!Progress.spendCredits(r.cr))return false;add(src,-r.k);add(id,1);return true;}
 function artOf(kind,o){if(kind==='gear'){try{return Progress.art(o);}catch{return '';}}return '<img alt="" src="'+shipThumb(o.idx)+'">';}
 const TH={};function shipThumb(i){const n17=(window.UI17!==false&&typeof window.SHIPCUR17==='function'&&SHIPCUR17(i));if(n17)return n17;/* V309 L17B: ảnh chiến cơ chuẩn SHIP118 */const k=i+':'+craftN(i);if(TH[k])return TH[k];let im=null;try{im=typeof Evo53!=='undefined'&&Evo53.hull?Evo53.hull(i):fighterAtlasV22;}catch{im=fighterAtlasV22;}if(!im||!(im.naturalWidth||im.width))return '';const W=im.naturalWidth||im.width,H=im.naturalHeight||im.height,w=W/5,h=H/4,c=document.createElement('canvas');c.width=c.height=120;c.getContext('2d').drawImage(im,i%5*w,Math.floor(i/5)*h,w,h,0,0,120,120);return TH[k]=c.toDataURL();}
 const frameTag=n=>`<span class="fr70" style="--fc:${T.fcol[T.frame[n]]}">${T.name[n]}</span>`;
 function statLine(kind,o,n){const m=(1+n*T.tm);if(kind==='craft'){let gf=1;try{gf=Campaign36.factor(o.grade);}catch{}return 'Sát thương ×'+(gf*(1+((o.level|0)-1)*.006*T.lk)*m).toFixed(2);}return 'Hệ số phẩm chất ×'+m.toFixed(3);}
 function render(){if(!el)build();const q=req(ctx.kind,ctx.ref),o=objOf(ctx.kind,ctx.ref);if(!o){close();return;}const kind=ctx.kind,n=nOf(o)|0,model=modelOf(kind,o);
  const title=kind==='craft'?nameOf('craft',model):nameOf('gear',model);let body='';
  if(!q)body=`<div class="adv-cards one"><div class="adv-c fr" style="--fc:${T.fcol[3]}"><div class="adv-art">${artOf(kind,o)}</div>${frameTag(n)}<small>Cấp ${o.level}/${T.cap[n]}</small></div></div><p class="adv-max">Đã đạt khung cao nhất: <b>Tím +5</b>.${kind==='craft'?' Muốn mạnh hơn nữa: hợp thể SSS rồi đột phá ★ bằng Tinh Hạch.':''}</p>`;
  else{const nx=q.next,chg=T.frame[nx]!==T.frame[n];
   body=`<div class="adv-cards"><div class="adv-c fr" style="--fc:${T.fcol[T.frame[n]]}"><div class="adv-art">${artOf(kind,o)}</div>${frameTag(n)}<small>Trần cấp ${T.cap[n]}</small></div><div class="adv-lock">${q.atCap?'⇢':'🔒'}</div><div class="adv-c fr nx" style="--fc:${T.fcol[T.frame[nx]]}"><div class="adv-art">${artOf(kind,o)}</div>${frameTag(nx)}<small>Trần cấp <em>${T.cap[nx]}</em></small></div></div>
    <div class="adv-cmp"><div><i>HIỆN TẠI</i>${statLine(kind,o,n)}</div><div><i>SAU KHI NÂNG</i><span class="up">${statLine(kind,o,nx)}</span>${chg?'<br><span class="up">Đổi ngoại hình khung '+T.fname[T.frame[nx]]+'</span>':''}</div></div>`;
   if(q.mats.length)body+=`<div class="adv-req-t">BỘ NGUYÊN LIỆU <span style="color:${MAT69.tiers[q.st.mat-1].c}">· ${MAT69.tiers[q.st.mat-1].n.toUpperCase()}</span><button data-a="inv">KHO NGUYÊN LIỆU ›</button></div>
    <div class="adv-req">${q.mats.map(m=>{const h=have(m.id),ok=h>=m.n;return `<button class="adv-m ${ok?'ok':'no'}" data-a="src" data-v="${m.id}" style="--mc:${matCol(m.id)}"><img src="${icon(m.id)}" alt=""><small>${esc(matName(m.id))}</small><b>${h}/${m.n}</b></button>`;}).join('')}</div>`;
   if(q.ph)body+=`<div class="adv-req-t">PHÔI CÙNG MẪU <span style="color:${T.fcol[q.ph.col]}">· ${q.ph.col===3?'TÍM':'LAM'}</span></div><div class="adv-req"><button class="adv-m ph ${q.ph.have>=q.ph.k?'ok':'no'}" data-a="src" data-v="ph${q.ph.col}" style="--mc:${T.fcol[q.ph.col]}"><span class="ph70" style="--fc:${T.fcol[q.ph.col]}">${artOf(kind,o)}</span><small>${phName(q.ph.col)} · ${esc(title)}</small><b>${q.ph.have}/${q.ph.k}</b></button></div>`;
   body+=`<p class="adv-cost">Hợp kim: <b class="${Progress.balance()>=q.cr?'':'no'}">${fmt(Progress.balance())} / ${fmt(q.cr)}</b>${q.stone?` · Đá: <b class="${stones()>=q.stone?'':'no'}">${fmt(stones())} / ${q.stone} ⬢</b>`:''}${q.atCap?'':'<br><span class="no">Cần đạt trần cấp '+T.cap[n]+' trước (đang '+o.level+')</span>'}</p>`;}
  // khu phôi
  const w0=phHave(kind,model,0),w1=phHave(kind,model,1),l=phHave(kind,model,2),p=phHave(kind,model,3),poolL=recyclePool(kind,model,2).reduce((s,x)=>s+x.n,0),poolT=recyclePool(kind,model,3).reduce((s,x)=>s+x.n,0);
  body+=`<div class="adv-ph"><div class="adv-req-t">KHO PHÔI · ${esc(title)}</div><div class="ph-have"><span style="color:${T.fcol[0]}">Trắng <b>${w0}</b></span><span style="color:${T.fcol[1]}">Lục <b>${w1}</b></span><span style="color:${T.fcol[2]}">Phôi Lam <b>${l}</b></span><span style="color:${T.fcol[3]}">Phôi Tím <b>${p}</b></span></div>
   <div class="ph-acts"><button data-a="fluc" class="${w0>=3?'hot':''}">ĐÚC PHÔI LỤC<small>3 phôi Trắng</small></button><button data-a="flam" class="${w1>=3&&Progress.balance()>=T.phoi.up[2].cr?'hot':''}">ĐÚC PHÔI LAM<small>3 phôi Lục · ${fmt(T.phoi.up[2].cr)} ◈</small></button><button data-a="ftim" class="${l>=T.phoi.purple.k&&Progress.balance()>=T.phoi.purple.cr?'hot':''}">ĐÚC PHÔI TÍM<small>${T.phoi.purple.k} phôi Lam · ${fmt(T.phoi.purple.cr)} ◈</small></button>
   <button data-a="rec" data-v="2" class="${poolL>=3?'hot':''}">TÁI CHẾ LAM<small>3 phôi Lam mẫu khác (có ${poolL})</small></button><button data-a="rec" data-v="3" class="${poolT>=3?'hot':''}">TÁI CHẾ TÍM<small>3 phôi Tím mẫu khác (có ${poolT})</small></button></div></div>`;
  const L=lacks(q),can=q&&!L.length;
  el.innerHTML=`<div class="m63-card adv-card"><div class="m63-eye">NÂNG KHUNG PHẨM CHẤT</div><h3>${esc(title)} ${frameTag(n)}</h3>${body}
   <div class="adv-btns"><button class="m63-go ${can?'':'off'}" data-a="go">${!q?'TỐI ĐA':can?'NÂNG LÊN '+T.name[q.next].toUpperCase():!q.atCap?'CHƯA ĐẠT TRẦN CẤP':q.ph&&q.ph.have<q.ph.k?'THIẾU PHÔI':'THIẾU NGUYÊN LIỆU'}</button><button class="adv-x" data-a="close">ĐÓNG</button></div></div>`;
  el.hidden=false;}
 function band(t){const b=document.createElement('div');b.className='adv-band';b.textContent=t;document.body.appendChild(b);setTimeout(()=>b.remove(),1600);try{Audio393.vibrate?.(30);}catch{}try{tone(880,.18,'triangle',.06);}catch{}}
 function doIt(){const q=req(ctx.kind,ctx.ref);if(!q)return;if(promote(ctx.kind,ctx.ref)){band('NÂNG KHUNG THÀNH CÔNG · '+T.name[q.next].toUpperCase());try{const h=document.getElementById('hub40');if(h&&!h.hidden){if(ctx.kind==='gear')h.querySelector('[data-it="'+ctx.ref+'"]')?.click();else h.querySelector('#hb-strip [data-c="'+ctx.ref+'"]')?.click();}}catch{}}render();}
 const SRC={norm:t=>[[`Ải mini-boss (5, 15, 25…) và ải boss (10, 20…)`,'Mini-boss 3 món · boss 4 món · ải thường ~1,4 món','map'],['Dải ải rơi màu '+MAT69.tiers[t-1].n,t===1?'Ải 1–60 (nhiều nhất ải 1–20)':t===2?'Ải 21–180':'Ải 61–180 · Nguyệt Thực','map'],['Ghép 3 → 1 ở Kho nguyên liệu',t===1?'Lục không ghép được, chỉ rơi':'3 '+MAT69.tiers[t-2].n+' cùng loại + '+fmt(T.craftMat[t].cr)+' ◈','inv'],['Càn quét ải đã 3★','Nhận ½ lượng rơi','map']],
  ph2:[['Đúc từ phôi Lục cùng mẫu','3 phôi Lục + '+fmt(T.phoi.up[2].cr)+' ◈ → 1 phôi Lam','back'],['Rương Vô tận','Ra phôi Trắng / Lục / Lam của mẫu đã mở','endless'],['Ải boss lớn (10, 20, …)','Qua lần đầu chắc chắn 1 phôi Lam · đánh lại 60% có phôi','map'],['Ải mini-boss','40% rơi phôi (Lam 10%)','map'],['Mốc chiến dịch ải 20 / 40 / 60','+1 phôi Lam chiến cơ chính','map'],['Tái chế','3 phôi Lam mẫu khác → 1','back'],['Phân giải trang bị Lam','1 món Lam → 1 phôi Lam','back']],
  ph3:[['Đúc từ phôi Lam',T.phoi.purple.k+' phôi Lam + '+fmt(T.phoi.purple.cr)+' ◈ → 1 phôi Tím','back'],['Nguyệt Thực','Boss qua lần đầu chắc chắn 1 phôi Tím','ecl'],['Mốc chiến dịch ải 80 / 100 / 120 / 140 / 160','+1 phôi Tím chiến cơ chính','map'],['Chương 9 · Tinh Vân Đen','25% rơi phôi mỗi ải','ch9'],['Tái chế','3 phôi Tím mẫu khác → 1','back']],
  credits:[['Phó bản Vàng','Nhiều hợp kim nhất','dungeon'],['Vượt ải & càn quét','Mỗi ải 150–600 ◈','map']],
  sss:[['Nguyệt Thực','Ải thường 1 · mini-boss 2 · boss 3 (càn quét cũng vậy)','ecl'],['Chương 9 · Tinh Vân Đen','Ải thường 2 · mini-boss 3 · boss 5','ch9']]};
 function src(id){const isPh=id==='ph2'||id==='ph3',list=isPh?SRC[id]:id===MAT69.sss.id?SRC.sss:id==='credits'?SRC.credits:SRC.norm(+id.slice(-1));
  const nm=isPh?phName(+id.slice(2)):id==='credits'?'Hợp kim':matName(id);
  el.innerHTML=`<div class="m63-card adv-card"><div class="m63-eye">LẤY Ở ĐÂU</div><h3>${isPh||id==='credits'?'':`<img class="adv-hi" src="${icon(id)}" alt="">`}${esc(nm)}</h3>${!isPh&&id!=='credits'?`<p class="adv-cost">Đang có: <b>${have(id)}</b></p>`:''}
   <div class="adv-src">${list.map(r=>`<div class="adv-s"><div><b>${esc(r[0])}</b><small>${esc(r[1])}</small></div><button data-a="${r[2]==='back'?'back':r[2]==='inv'?'inv':'nav'}" data-v="${r[2]}">ĐI ›</button></div>`).join('')}</div>
   <div class="adv-btns"><button class="adv-x" data-a="${ctx?'back':'close'}">‹ QUAY LẠI</button></div></div>`;el.hidden=false;}
 function nav(v){close();try{Hub40.close&&Hub40.close();}catch{}
  if(v==='ecl'){try{Expedition67.open('ecl');}catch{}return;}if(v==='ch9'){try{Expedition67.open('ch9');}catch{}return;}
  if(v==='market'){try{Trade67.open();}catch{}return;}
  if(v==='dungeon'){try{Lobby.show();document.querySelector('#hgr41 [data-go="map"]')?.click();setTimeout(()=>document.querySelector('.dungeon-panel')?.scrollIntoView({behavior:'smooth',block:'start'}),120);}catch{}return;}
  try{Lobby.show();document.querySelector('#hgr41 [data-go="map"]')?.click();}catch{}}
 function inv(){if(!el)build();const rows=MAT69.types.map(ty=>`<div class="adv-ir"><b>${esc(ty.n)}</b>${[1,2,3].map(t=>{const id=mid(ty.id,t),r=T.craftMat[t],ok=r&&have(mid(ty.id,r.from))>=r.k;return `<div class="adv-cell"><button class="adv-m sm" data-a="src" data-v="${id}" style="--mc:${matCol(id)}"><img src="${icon(id)}" alt=""><b>${have(id)}</b></button>${r?`<button class="adv-cm ${ok?'hot':''}" data-a="cm" data-v="${id}">GHÉP<small>3→1</small></button>`:''}</div>`;}).join('')}</div>`).join('');
  el.innerHTML=`<div class="m63-card adv-card"><div class="m63-eye">KHO NGUYÊN LIỆU</div><h3>Nguyên liệu nâng khung</h3><p class="adv-cost">Ghép 3 nguyên liệu cùng loại lên màu cao hơn: Lục→Lam ${fmt(T.craftMat[2].cr)} ◈ · Lam→Tím ${fmt(T.craftMat[3].cr)} ◈.</p><div class="adv-inv">${rows}<div class="adv-ir"><b>${MAT69.sss.n}</b><button class="adv-m sm" data-a="src" data-v="${MAT69.sss.id}" style="--mc:${MAT69.sss.c}"><img src="${icon(MAT69.sss.id)}" alt=""><b>${have(MAT69.sss.id)}</b></button></div></div>
   <div class="adv-btns"><button class="adv-x" data-a="${ctx?'back':'close'}">‹ QUAY LẠI</button></div></div>`;el.hidden=false;}
 function sss(){if(!el)build();ctx=null;const L=sssList(),core=have(MAT69.sss.id);
  const rows=L.length?L.map(x=>{const s=starOf(x.key),r=T.sss[s];return `<div class="adv-sr"><div><b style="color:${x.col}">${esc(x.name)}</b><small>${x.kind==='ship'?'Siêu chiến cơ':'Trang bị SSS'} · <span class="st">${'★'.repeat(s)}${'☆'.repeat(10-s)}</span> · +${Math.round(s*x.eff*100)}% sát thương</small></div>${r?`<button data-a="sup" data-v="${esc(x.key)}" class="${core>=r.k&&Progress.balance()>=r.c?'hot':''}">★${s+1}<small>${r.k} hạch · ${fmt(r.c)} ◈</small></button>`:'<em>TỐI ĐA</em>'}</div>`;}).join(''):'<p class="adv-max">Chưa có trang bị / siêu chiến cơ SSS nào đang dùng. Hợp thể SSS trước (cần 2 chiến cơ thành phần đạt Lam +1).</p>';
  el.innerHTML=`<div class="m63-card adv-card"><div class="m63-eye">ĐỘT PHÁ SSS</div><h3><img class="adv-hi" src="${icon(MAT69.sss.id)}" alt="">${MAT69.sss.n}: <span style="color:#ffd56a">${core}</span></h3><div class="adv-sss">${rows}</div>
   <div class="adv-btns"><button class="adv-x" data-a="src" data-v="${MAT69.sss.id}">LẤY Ở ĐÂU ›</button><button class="adv-x" data-a="close">ĐÓNG</button></div></div>`;el.hidden=false;}
 function disPanel(id){if(!el)build();ctx=null;const it=Progress.v70.get(id);if(!it)return;const g=dismantleGain(it),sb=stoneBack(it);
  el.innerHTML=`<div class="m63-card adv-card"><div class="m63-eye">PHÂN GIẢI</div><h3>${esc(nameOf('gear',it.variant))} ${frameTag(nOf(it)|0)}</h3><div class="adv-cards one"><div class="adv-c fr" style="--fc:${colorOf(it)}"><div class="adv-art">${artOf('gear',it)}</div><small>Cấp ${it.level}</small></div></div>
   <p class="adv-max">Nhận: <b>${gainTxt(Object.assign({sb},g))}</b>. Món này sẽ mất.</p><div class="adv-btns"><button class="m63-go" data-a="dis" data-v="${esc(id)}">PHÂN GIẢI</button><button class="adv-x" data-a="close">HỦY</button></div></div>`;el.hidden=false;}
 function junkPanel(){if(!el)build();ctx=null;const J=junk();const cnt=[0,0,0,0];for(const it of J)cnt[dismantleGain(it).c]++;const gt=cnt.map((n,c)=>n?n+' '+phName(c).toLowerCase():'').filter(Boolean).join(', ');
  el.innerHTML=`<div class="m63-card adv-card"><div class="m63-eye">PHÂN GIẢI NHANH</div><h3>Trang bị Trắng / Lục thừa</h3><p class="adv-max">${J.length?`Phân giải <b>${J.length}</b> món đang không mặc (giữ lại món tốt nhất của mỗi mẫu). Nhận <b>${gt}</b> + ½ đá đã nâng cấp. 3 phôi Trắng đúc 1 phôi Lục, 3 phôi Lục đúc 1 phôi Lam.`:'Không có trang bị Trắng / Lục thừa.'}</p>
   <div class="adv-btns">${J.length?'<button class="m63-go" data-a="junk">PHÂN GIẢI '+J.length+' MÓN</button>':''}<button class="adv-x" data-a="close">ĐÓNG</button></div></div>`;el.hidden=false;}
 function open(kind,ref){if((window.Evo82&&Evo82.on())){Evo82.open(kind,ref);return;}if(!el)build();sync();ctx={kind:kind==='gear'?'gear':'craft',ref:kind==='gear'?ref:(ref|0)};render();}
 // ---------- vá Hub40 (Kho): nút NÂNG KHUNG / PHÂN GIẢI, dòng phôi ----------
 function btnHtml(q,lab){if(q&&(window.Evo82&&Evo82.on()))return Evo82.btnTxt(q.o.idx!=null?'craft':'gear',q.o.idx!=null?q.o.idx:q.o.id);if(!q)return lab+'<small>Tím +5 · tối đa</small>';const L=lacks(q);return 'NÂNG KHUNG → '+T.name[q.next].toUpperCase()+'<small>'+(!q.atCap?'Đạt trần cấp '+T.cap[q.n]+' trước':L.length?(q.ph?'Phôi '+q.ph.have+'/'+q.ph.k+' · xem':'Thiếu nguyên liệu · xem'):'Đủ điều kiện!')+'</small>';}
 function patchHub(){const h=document.getElementById('hub40');if(!h)return;
  const se=h.querySelector('#sh-en');if(se&&!se.dataset.adv){const sh=se.closest('.hb-sheet'),id=sh&&sh.dataset.item,it=id&&Progress.v70.get(id);if(it){se.dataset.adv=1;const q=req('gear',id),L=lacks(q);se.disabled=false;se.classList.toggle('adv-rdy',!!q&&!L.length);se.innerHTML=btnHtml(q,'NÂNG KHUNG');se.onclick=ev=>{ev.preventDefault();open('gear',id);};
    const mg=h.querySelector('#sh-mg');if(mg){mg.disabled=Object.values(Progress.v70.equipped()).includes(id);mg.innerHTML='PHÂN GIẢI<small>'+gainTxt(Object.assign({sb:stoneBack(it)},dismantleGain(it)))+'</small>';mg.onclick=ev=>{ev.preventDefault();ev.stopPropagation();disPanel(id);};}}}
  const he=h.querySelector('#hb-en');if(he&&!he.dataset.adv){const cur=h.querySelector('#hb-strip [aria-current="true"]'),idx=cur?+cur.dataset.c:0;he.dataset.adv=1;let own=true;try{own=Campaign36.ownsCraft(idx);}catch{}const q=req('craft',idx),L=lacks(q);
   he.disabled=!own;he.classList.toggle('adv-rdy',!!q&&!L.length);he.innerHTML=btnHtml(q,'NÂNG KHUNG');he.onclick=ev=>{ev.preventDefault();open('craft',idx);};
   const pg=h.querySelector('.hb-prog');if(pg&&(window.Evo82&&Evo82.on())){const n=craftN(idx);pg.innerHTML=`Khung ${frameTag(n)} · Bản sao cùng mẫu <b>${Evo82.count('craft',idx)}</b> · kho bản sao chiến cơ <b>${Evo82.list().filter(c=>c.k==='craft').length}</b>`;}else if(pg){const n=craftN(idx);pg.innerHTML=`Khung ${frameTag(n)} · <span style="color:${T.fcol[0]}">Trắng <b>${phHave('craft',idx,0)}</b></span> · <span style="color:${T.fcol[1]}">Lục <b>${phHave('craft',idx,1)}</b></span> · <span style="color:${T.fcol[2]}">Phôi Lam <b>${phHave('craft',idx,2)}</b></span> · <span style="color:${T.fcol[3]}">Phôi Tím <b>${phHave('craft',idx,3)}</b></span>`;}}
  const qm=h.querySelector('#hb-qm');if(qm&&!qm.dataset.adv){qm.dataset.adv=1;qm.innerHTML='PHÂN GIẢI NHANH<small>trang bị Trắng/Lục thừa → '+((window.Evo82&&Evo82.on())?'bản sao':'phôi')+'</small>';qm.onclick=ev=>{ev.preventDefault();ev.stopPropagation();junkPanel();};}}
 function watch(){const h=document.getElementById('hub40');if(!h){setTimeout(watch,500);return;}new MutationObserver(()=>{try{patchHub();}catch{}}).observe(h,{childList:true,subtree:true});patchHub();}
 // ---------- khởi động ----------
 try{sync();}catch{}setTimeout(()=>{try{sync();}catch{}},0);setInterval(()=>{try{if(!['play','pause'].includes(mode))sync();}catch{}},1500);
 watch();
 setInterval(()=>{try{const fx=document.querySelector('#hgr41 .h1-fx');if(fx&&!fx.querySelector('[data-adv69]')){const b=document.createElement('button');b.dataset.adv69='sss';b.className='adv69b';b.textContent='ĐỘT PHÁ SSS';b.addEventListener('click',e=>{e.stopPropagation();sss();});fx.appendChild(b);const b2=document.createElement('button');b2.dataset.adv69='inv';b2.className='adv69b';b2.textContent='NGUYÊN LIỆU';b2.addEventListener('click',e=>{e.stopPropagation();if(!el)build();ctx=null;inv();});fx.appendChild(b2);}}catch{}},800);
 // V79: đặt nấc phẩm chất trực tiếp (quà bộ thành tựu) · chỉ nâng, không hạ
 function setTier(kind,ref,n){n=Math.max(0,Math.min(11,n|0));const cur=kind==='craft'?craftN(ref):(nOf((()=>{try{return Progress.getState().items.find(i=>i.id===ref);}catch{return null;}})())||0);if(cur>=n)return false;const E=Eof(n);if(kind==='craft'){S.c[ref]={n};save();try{Workshop.set70(ref,{enhance:E});}catch{}}else{S.g[ref]={n};save();try{Progress.v70.set(ref,{enhance:E});}catch{}}try{Progress.render();}catch{}return true;}
 return {setTier,matOf,open,sss,inv,have,add,icon,matName,req,lacks,promote,sync,nOf,craftN,label,colorOf,ve,isMax,migN,Eof,phHave,phAdd,phList:()=>({...S.ph}),forgeLam,forgeLuc,forgeUp,forgeTim,recycle,dismantle,junk,dropMats,dropPhoi,miles,sssMult,star:starOf,sssUp,
  state:()=>JSON.parse(JSON.stringify({S,M}))};
})();
// tên cũ: các module V69 (skin69, v67…) gọi Adv69.add / matName / icon / open
const Adv69=V70;
