'use strict';
// V74 · Vô tận: TỰ MỞ RƯƠNG + BẢNG KẾT QUẢ có icon ngay khi kết thúc lượt (người dùng yêu cầu 23/10).
//  • Rương nhận trong lượt Vô tận được mở tự động lúc kết thúc (dùng Chests.open gốc → đúng tỉ lệ, giới hạn 30/ngày giữ nguyên).
//  • Bảng kết quả: trang bị / chiến cơ từ rương (hình + tên + mảnh) và mọi vật phẩm nhận trong lượt (so ảnh chụp trước–sau):
//    hợp kim, đá nâng cấp, mảnh, nguyên liệu, phôi, đá khảm, trang bị rơi, mảnh/linh kiện VKTT.

// ---------- V74 · Rương theo hệ phẩm chất V70 (người dùng chốt 23/10): ra PHÔI Trắng / Lục / Lam, KHÔNG có Tím, không còn mảnh ----------
//  Rương B: 1 phôi · Rương A: 2 phôi. Rương trang bị → mẫu trang bị đã mở; rương chiến cơ → chiến cơ đã sở hữu
//  (35% ưu tiên chiến cơ đang dùng / đồ đang mặc). SỐ TẠM, chờ Gemini cân.
const CHEST74={B:[60,32,8],A:[35,45,20],   /* V79 (chủ dự án 24/10): hạ tỉ lệ phôi Lam (B 12→8%, A 35→20%), vẫn không có Tím */gold:{B:[150,250],A:[300,500]},mat:{B:{p:.5,n:[1,1]},A:{p:1,n:[1,2],lam:.3}}};   // Gemini chốt 23/10
// V81 (chủ dự án 25/10): rương Vô tận rơi CHIẾN CƠ / TRANG BỊ bất kỳ (mọi mẫu, trừ hợp thể SSS), tối đa 30 món/ngày:
//  chưa có → MỞ KHÓA luôn món đó (khung gốc) · đã có → 1 phôi Trắng/Lục/Lam như cũ. KHÔNG còn nguyên liệu nâng cấp trong rương.
const EL81=(()=>{const K='saobang-endless81';const day=()=>{const d=new Date();return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();};
 const ld=()=>{let o={};try{o=JSON.parse(localStorage.getItem(K)||'{}')||{};}catch{}if(o.d!==day())o={d:day(),n:0,pp:0};return o;};const sv=o=>{try{localStorage.setItem(K,JSON.stringify(o));}catch{}};
 return {CAP:30,PP:5,left:()=>Math.max(0,30-(ld().n|0)),use:(k=1)=>{const o=ld();o.n=(o.n|0)+k;sv(o);},ppLeft:()=>Math.max(0,5-(ld().pp|0)),ppUse:()=>{const o=ld();o.pp=(o.pp|0)+1;sv(o);},state:ld};})();
window.EL81=EL81;
function Chest81(c){const A=['A','C'].includes(c.grade),ev=(window.Evo82&&Evo82.on()),D=ev?EVO82.drop:null,w=ev?(A?D.chestA:D.chestB):(A?CHEST74.A:CHEST74.B),rolls=Math.min(A?2:1,EL81.left()),out=[],got=[];
 const G=CHEST74.gold[A?'A':'B'],cr=G[0]+Math.floor(Math.random()*(G[1]-G[0]+1));try{Progress.grantCredits(cr);}catch{}
 // V82 (Gemini REVIEW82 bổ sung): nhóm hiếm S (#6–#7 · bộ 5–6) / SS (#8–#10 · bộ 7–9) tỉ lệ rất thấp · nhóm thường (#1–#5 · bộ 0–4)
 const grp=(k,m)=>{let si=-1;if(k==='craft')si=m|0;else{try{Campaign36.sets.forEach((st,i)=>{if(st&&st.includes(m))si=i;});}catch{}}return si>=10?'APEX':si>=7?'SS':si>=5?'S':'';};
 const owns=(k,m)=>{try{return k==='craft'?Campaign36.ownsCraft(m):Campaign36.ownsModel(m)&&(Progress.getState().items||[]).some(x=>x.variant===m);}catch{return false;}};
 let first=null;
 for(let r=0;r<rolls;r++){const all=[];for(let i=0;i<13;i++)all.push(['craft',i]);try{for(const v of Object.keys(GearCatalog))all.push(['gear',v]);}catch{}
  let g='';if(ev){const R=D.rare[A?'A':'B'],x=Math.random(),ap=R.APEX||0;g=x<ap?'APEX':x<ap+R.SS?'SS':x<ap+R.SS+R.S?'S':'';}
  let pool=ev?all.filter(([k,m])=>grp(k,m)===g):all;if(!pool.length)pool=all.filter(([k,m])=>grp(k,m)==='');
  let pick=null;
  if(ev&&!g&&Math.random()<D.smart){try{const eq=Object.values(Progress.v70.equipped()).map(id=>Progress.v70.get(id)).filter(Boolean).map(it=>['gear',it.variant]);eq.push(['craft',selected|0]);const ok=eq.filter(([k,m])=>grp(k,m)==='');if(ok.length)pick=ok[Math.floor(Math.random()*ok.length)];}catch{}}
  if(!pick){const W=pool.map(([k,m])=>ev&&owns(k,m)?D.ownedMult:1),sum=W.reduce((a,b)=>a+b,0);let x=Math.random()*sum,i=0;for(;i<pool.length-1;i++){if(x<W[i])break;x-=W[i];}pick=pool[i];}
  const [kind,model]=pick;if(!first)first={kind,model};
  const s=w.reduce((a,b)=>a+b,0);let x=Math.random()*s,f=0;for(;f<2;f++){if(x<w[f])break;x-=w[f];}
  if(ev&&(g==='SS'||g==='APEX'))f=2;
  if(!owns(kind,model)){let ok=null;try{ok=Campaign36.acquire(kind,model,'','endless');}catch{}
   if(ok){const t=ev?(g?2:EVO82.phTier[f]):0;if(t>0){try{V70.setTier(kind,kind==='craft'?model:ok.item&&ok.item.id,t);}catch{}}out.push({unlock:1,kind,model});got.push({kind,model,unlock:1,t,rare:g});EL81.use();continue;}}
  if(ev){Evo82.addCopy(kind,model,EVO82.phTier[f],1,true);}else{try{V70.phAdd(kind,model,f,1);}catch{}}
  out.push({ph:ev?null:f,cp:ev?EVO82.phTier[f]:null,kind,model});got.push({kind,model,ph:f,copy:ev,rare:g});EL81.use();}
 if(!first){try{toast('ĐÃ ĐỦ '+EL81.CAP+' CHIẾN CƠ / TRANG BỊ VÔ TẬN HÔM NAY · RƯƠNG CHỈ CÒN HỢP KIM');}catch{}first={kind:'gear',model:'aegis'};}
 return {type:first.kind==='craft'?'craft':'gear',v70:true,kind:first.kind,model:first.model,index:first.kind==='craft'?first.model:undefined,out,got,fragments:0,cr,mats:[]};}
function Chest74V70(c){if(window.ENDLESS81!==false)return Chest81(c);const A=['A','C'].includes(c.grade),w=A?CHEST74.A:CHEST74.B,rolls=A?2:1,out=[];let kind='gear',model=null;
 try{if(c.type==='craft'){kind='craft';const own=[];for(let i=0;i<13;i++)if(Campaign36.ownsCraft(i))own.push(i);model=own.length?own[Math.floor(Math.random()*own.length)]:0;if(Math.random()<(window.SMART79||.5)&&Campaign36.ownsCraft(selected))model=selected;}
  else{const ms=Campaign36.getState().models||[];model=ms[Math.floor(Math.random()*ms.length)];try{if(Math.random()<(window.SMART79||.5)){const eq=Progress.v70.equipped(),its=Object.values(eq).map(id=>Progress.v70.get(id)).filter(Boolean);if(its.length)model=its[Math.floor(Math.random()*its.length)].variant;}}catch{}}}catch{}
 if(model===null||model===undefined)return null;
 for(let r=0;r<rolls;r++){const s=w.reduce((a,b)=>a+b,0);let x=Math.random()*s,f=0;for(;f<2;f++){if(x<w[f])break;x-=w[f];}try{V70.phAdd(kind,model,f,1);}catch{}out.push({ph:f});}
 const G=CHEST74.gold[A?'A':'B'],cr=G[0]+Math.floor(Math.random()*(G[1]-G[0]+1));try{Progress.grantCredits(cr);}catch{}
 const M=CHEST74.mat[A?'A':'B'],mats=[];const ty=()=>MAT69.types[Math.floor(Math.random()*4)].id;
 if(Math.random()<M.p){const n=M.n[0]+Math.floor(Math.random()*(M.n[1]-M.n[0]+1));for(let i=0;i<n;i++){const id=ty()+'1';try{V70.add(id,1);}catch{}mats.push(id);}}
 if(M.lam&&Math.random()<M.lam){const id=ty()+'2';try{V70.add(id,1);}catch{}mats.push(id);}
 return {type:kind==='craft'?'craft':'gear',v70:true,kind,model,index:kind==='craft'?model:undefined,out,fragments:0,cr,mats};}
// ---------- V74 · BỎ MẢNH chiến cơ / trang bị (mảnh chỉ còn ở phi công) ----------
//  • Mảnh cũ trong save quy đổi 1 lần: 15 mảnh → 1 phôi Lam, 5 → 1 phôi Lục, 2 → 1 phôi Trắng (đúng giá trị cũ 15 mảnh = 1 phôi Lam).
//  • Mọi nguồn cộng mảnh (thưởng ải, phó bản, chương 9…) bị bỏ; chiến cơ nhận trùng → 1 phôi Trắng chiến cơ đó.
const Frag74=(()=>{
 function conv(kind,k,f){if(!(f>0))return 0;const lam=Math.floor(f/15),r=f%15,luc=Math.floor(r/5),tr=Math.floor((r%5)/2),used=lam*15+luc*5+tr*2;
  try{if(lam)V70.phAdd(kind,k,2,lam);if(luc)V70.phAdd(kind,k,1,luc);if(tr)V70.phAdd(kind,k,0,tr);Workshop.frag70(kind,k,-f);}catch{return 0;}return used;}
 function sweep(){try{if(typeof V70==='undefined'||typeof Workshop==='undefined'||!Workshop.frag70)return;const W=Workshop.getState();
  (W.craftFragments||[]).forEach((f,i)=>{if(f>0)conv('craft',i,f);});for(const m in (W.gearFragments||{})){const f=W.gearFragments[m];if(f>0)conv('gear',m,f);}}catch{}}
 function install(){
  try{const g0=Workshop.grant;Workshop.grant=function(r){if(r&&typeof r==='object'&&(r.fragments||r.gearFragments)){r=Object.assign({},r);delete r.fragments;delete r.gearFragments;}return g0.call(this,r);};}catch{}
  try{const gc=Workshop.grantCraft;Workshop.grantCraft=function(i){let b=0;try{b=Workshop.getState().craftFragments[i]|0;}catch{}const r=gc.apply(this,arguments);try{const a=Workshop.getState().craftFragments[i]|0;if(a>b){Workshop.frag70('craft',i,-(a-b));V70.phAdd('craft',i,0,1);if(r&&typeof r==='object'){r.fragments=0;r.phoi=0;}}}catch{}return r;};}catch{}
  try{const rs=Workshop.rollStage;Workshop.rollStage=function(){const r=rs.apply(this,arguments);return Array.isArray(r)?r.filter(t=>!/mảnh (chiến cơ|trang bị)/i.test(String(t))):r;};}catch{}
  sweep();setInterval(sweep,4000);}
 setTimeout(install,50);
 return {sweep};
})();
const Chest74=(()=>{
 let snap=null,runIds=[],busyOpen=false;
 const jget=k=>{try{return JSON.parse(localStorage.getItem(k)||'{}')||{};}catch{return {};}};
 const sum=o=>!o?0:Array.isArray(o)?o.reduce((a,b)=>a+(+b||0),0):Object.values(o).reduce((a,b)=>a+(typeof b==='number'?b:sum(b)),0);
 function snapshot(){const P=Progress.getState(),W=Workshop.getState();let st=[],u={pool:0,comp:0};try{st=Stone71.state().st.map(s=>s.id);}catch{}try{const x=Ult72.state();u={pool:x.pool|0,comp:x.comp|0};}catch{}
  let pp={};try{pp={...(Pilot67.state().pieces||{})};}catch{}
  return {pp,cr:P.credits|0,exp:W.exp|0,aux:W.aux|0,cf:sum(W.craftFragments),gf:sum(W.gearFragments),items:new Set((P.items||[]).map(i=>i.id)),m:{...(jget('saobang-adv69-v1').m||{})},ph:{...(jget('saobang-tier70-v1').ph||{})},st:new Set(st),u};}
 const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 const fmt=n=>Number(n).toLocaleString('vi-VN');
 const TH=[];function shipImg(i){const n17=(window.UI17!==false&&typeof window.SHIPCUR17==='function'&&SHIPCUR17(i));if(n17)return n17;/* V309 L17B */if(TH[i])return TH[i];try{const im=(typeof Evo53!=='undefined'&&Evo53.hull)?Evo53.hull(i):fighterAtlasV22;const w=(im.naturalWidth||im.width)/5,h=(im.naturalHeight||im.height)/4,c=document.createElement('canvas');c.width=c.height=112;c.getContext('2d').drawImage(im,i%5*w,Math.floor(i/5)*h,w,h,0,0,112,112);return TH[i]=c.toDataURL();}catch{return '';}}
 const shipName=i=>{try{return Fighters28.profiles[i].name;}catch{return 'Chiến cơ';}};
 const gearName=it=>{try{return GearCatalog[it.variant].name;}catch{return 'Trang bị';}};
 const gearArt=it=>{try{return Progress.art(it);}catch{return '◈';}};
 const phName=k=>{const [a,col]=k.split(/:(?=[0-3]$)/);let nm='';try{nm=a[0]==='c'?shipName(+a.slice(1)):GearCatalog[a.slice(2)].name;}catch{}return 'Phôi '+(['Trắng','Lục','Lam','Tím'][+col]||'Lam')+(nm?' · '+nm:'');};
 // V81: icon trang bị dạng <img> (ô kết quả nhỏ không hiển thị được ảnh ghép atlas)
 const gIcon=v=>{try{const al=(typeof GEAR81_DATA!=='undefined'&&GEAR81_DATA[v])?GEAR81_DATA[v].art:v;const A=typeof GEAR44_ASSETS!=='undefined'?GEAR44_ASSETS:{},E=typeof EVO53_ART!=='undefined'?EVO53_ART:{};const src=A[v+'_icon']||A[al+'_icon']||E['g:'+al+'_icon_evo1']||A[(GearCatalog[v]&&GearCatalog[v].behavior||'')+'_icon'];return src?`<img src="${src}" alt="" class="${al!==v?'g81':''}">`:'';}catch{return '';}};
 const phArt=k=>{const a=k.split(/:(?=[0-3]$)/)[0];if(a[0]==='c')return `<img src="${shipImg(+a.slice(1))}" alt="">`;try{const v=a.slice(2);const ic=gIcon(v);if(ic)return ic;const it=(Progress.getState().items||[]).find(x=>x.variant===v);if(it)return gearArt(it);}catch{}return '◈';};
 // ---------- vòng đời lượt ----------
 function onStart(){try{if(gameMode!=='endless'){snap=null;return;}}catch{snap=null;return;}runIds=[];try{snap=snapshot();}catch{snap=null;}}
 function onCrate(r){if(snap&&r&&r.crate)runIds.push(r.crate.id);}
 function onEnd(){if(!snap)return;const s0=snap,ids=runIds.slice();snap=null;runIds=[];let tries=0;
  const go=()=>{const opened=[];let blocked=false;for(const id of ids){let r=false;try{r=Chests.open(id,Math.random,true);}catch{}if(r)opened.push(r);else if(Chests.getState().crates.some(c=>c.id===id))blocked=true;}
   if(blocked&&tries++<6){setTimeout(go,600);return;}
   try{Progress.render();}catch{}try{Chests.render();}catch{}try{if(typeof DeviceSave!=='undefined')DeviceSave.flush();}catch{}
   show(opened,s0);};
  setTimeout(go,400);}
 // ---------- bảng kết quả ----------
 function show(opened,s0){let s1;try{s1=snapshot();}catch{return;}
  const chestItemIds=new Set(opened.filter(r=>!r.v70&&r.type==='gear'&&r.item).map(r=>r.item.id));
  const v70card=r=>{const nm=r.kind==='craft'?shipName(r.model):(()=>{try{return GearCatalog[r.model].name;}catch{return 'Trang bị';}})();
   const art=r.kind==='craft'?`<img src="${shipImg(r.model)}" alt="">`:(()=>{try{const it=(Progress.getState().items||[]).find(x=>x.variant===r.model);return it?gearArt(it):'◈';}catch{return '◈';}})();
   const fr=0;const lines=r.out.map(o=>o.ph!=null?`<i class="c74ph c${o.ph}">+1 Phôi ${['Trắng','Lục','Lam','Tím'][o.ph]}</i>`:'').join('')+(fr?`<i class="c74fr">+${fr} mảnh</i>`:'');const best=Math.max(...r.out.map(o=>o.ph||0));
   return `<div class="c74card ${r.kind==='craft'?'s':'g'} b${best}"><span class="c74art">${art}</span><b>${esc(nm)}</b>${lines}</div>`;};
  const card81=g=>{const nm=g.kind==='craft'?shipName(g.model):(()=>{try{return GearCatalog[g.model].name;}catch{return 'Trang bị';}})();const art=g.kind==='craft'?`<img src="${shipImg(g.model)}" alt="">`:(gIcon(g.model)||'◈');
   const line=(g.rare?'<i class="c74ph c3">✦ NỔ HŨ BẬC '+g.rare+'</i>':'')+(g.unlock?'<i class="c74ph c3">★ MỞ KHÓA MỚI</i>':g.copy?`<i class="c74ph c${g.ph}">+1 Bản sao ${['Trắng','Lục','Lam','Tím'][g.ph]} Lv1</i>`:`<i class="c74ph c${g.ph}">+1 Phôi ${['Trắng','Lục','Lam','Tím'][g.ph]}</i>`);return `<div class="c74card ${g.kind==='craft'?'s':'g'} b${g.unlock?3:g.ph}"><span class="c74art">${art}</span><b>${esc(nm)}</b>${line}</div>`;};
  const cards=opened.map(r=>r.got?r.got.map(card81).join(''):r.v70?v70card(r):r.type==='gear'&&r.item?`<div class="c74card g"><span class="c74art">${gearArt(r.item)}</span><b>${esc(gearName(r.item))}</b><small>+${r.fragments||0} mảnh</small></div>`
   :`<div class="c74card s"><span class="c74art"><img src="${shipImg(r.index|0)}" alt=""></span><b>${esc(shipName(r.index|0))}</b><small>${r.fragments?'+'+r.fragments+' mảnh':'Chiến cơ mới'}</small></div>`).join('');
  for(const r of opened)if(r.v70)for(const o of r.out){if(o.unlock||o.cp!=null)continue;if(o.ph!=null){const km=o.kind?o.model:r.model,kk=o.kind||r.kind;const k=(kk==='craft'?'c'+km:'g:'+km)+':'+o.ph;s0.ph[k]=(s0.ph[k]|0)+1;}else{if(r.kind==='craft')s0.cf+=o.frag;else s0.gf+=o.frag;}}
  const T=[];const tile=(art,n,v,c='#4cc9f0')=>T.push(`<div class="c74t" style="--tc:${c}"><span class="c74i">${art}</span><b>+${fmt(v)}</b><small>${esc(n)}</small></div>`);
  const dc=s1.cr-s0.cr;if(dc>0)tile('◈','Hợp kim',dc,'#ffd166');
  const de=(s1.exp-s0.exp)+5*(s1.aux-s0.aux);if(de>0)tile('⬢','Đá nâng cấp',de,'#7fdcff');
    for(const k in s1.m){const d=(s1.m[k]|0)-(s0.m[k]|0);if(d<=0)continue;let ic='',nm=k;try{ic=V70.icon(k);}catch{}try{const [ty,t]=k.split('_');const T0=MAT69.types.find(x=>x.id===ty);nm=T0?T0.n+' '+MAT69.tiers[(+t||1)-1].n:(k===MAT69.sss.id?MAT69.sss.n:V70.matName(k));}catch{}tile(ic&&ic.startsWith('data:')?`<img src="${ic}" alt="">`:(ic||'◈'),nm,d,'#3ee08f');}
  for(const k in s1.ph){const d=(s1.ph[k]|0)-(s0.ph[k]|0);if(d>0)tile(phArt(k),phName(k),d,['#d6e0ea','#3ee08f','#3aa8ff','#b45cff'][+k.slice(-1)]||'#3aa8ff');}
  try{const st=Stone71.state().st.filter(s=>!s0.st.has(s.id));const g={};for(const s of st){const key=Stone71.name(s)+'|'+s.t;(g[key]=g[key]||{s,n:0}).n++;}for(const k in g){tile(Stone71.icon(g[k].s),Stone71.name(g[k].s),g[k].n,'#00f59b');}}catch{}
  try{for(const id in s1.pp){const d=(s1.pp[id]|0)-((s0.pp||{})[id]|0);if(d>0){let nm='Phi công',ic='🧑‍✈️';try{const P=PILOTS67.find(x=>x.id==id);nm=P.name;if(typeof PILOT_ASSETS!=='undefined'&&PILOT_ASSETS['p'+id])ic=`<img src="${PILOT_ASSETS['p'+id]}" alt="">`;}catch{}tile(ic,'Mảnh phi công · '+nm,d,'#ff9fd6');}}}catch{}
  if(s1.u.pool>s0.u.pool)tile('✸','Mảnh VKTT tự chọn',s1.u.pool-s0.u.pool,'#ff7b00');
  if(s1.u.comp>s0.u.comp)tile('⚙','Linh kiện VKTT',s1.u.comp-s0.u.comp,'#ff7b00');
  try{const P=Progress.getState();const unl=new Set();for(const r of opened)for(const g of (r.got||[]))if(g.unlock&&g.kind==='gear')unl.add(g.model);const drops=(P.items||[]).filter(i=>!s0.items.has(i.id)&&!chestItemIds.has(i.id)&&!unl.has(i.variant));for(const it of drops.slice(0,12))T.push(`<div class="c74t" style="--tc:#b388ff"><span class="c74i">${gIcon(it.variant)||gearArt(it)}</span><b>+1</b><small>${esc(gearName(it))}</small></div>`);}catch{}
  if(!opened.length&&!T.length)return;
  let wave=0;try{wave=gameMode==="endless"?(level|0):0;}catch{}
  let el=document.getElementById('c74');if(!el){el=document.createElement('div');el.id='c74';document.body.appendChild(el);el.addEventListener('click',e=>{if(e.target.closest('[data-c74x]'))el.hidden=true;});}
  el.innerHTML=`<div class="c74c"><div class="c74h"><small>KẾT QUẢ VÔ TẬN${wave?' · ĐỢT '+wave:''}</small><b>${opened.length?'ĐÃ MỞ '+opened.length+' RƯƠNG':'VẬT PHẨM NHẬN ĐƯỢC'}</b></div>
   ${opened.length?`<div class="c74sec">TỪ RƯƠNG</div><div class="c74cards">${cards}</div>`:''}
   ${T.length?`<div class="c74sec">VẬT PHẨM</div><div class="c74grid">${T.join('')}</div>`:''}
   <p class="c74note">Đã cất vào kho và tự lưu.</p><button type="button" class="c74ok" data-c74x>NHẬN</button></div>`;
  el.hidden=false;try{tone(880,.15,'triangle',.05);setTimeout(()=>tone(1320,.18,'triangle',.05),140);}catch{}}
 // ---------- móc ----------
 function install(){
  try{const r0=window.reset;if(typeof r0==='function')window.reset=function(){const r=r0.apply(this,arguments);try{onStart();}catch{}return r;};}catch{}
  try{const rb=Chests.rewardBoss;Chests.rewardBoss=function(){const r=rb.apply(this,arguments);try{onCrate(r);}catch{}return r;};}catch{}
  try{const e0=window.end;if(typeof e0==='function')window.end=function(){const r=e0.apply(this,arguments);try{onEnd();}catch{}return r;};}catch{}}
 setTimeout(install,0);
 // dự phòng nếu lối gọi cũ bỏ qua reset/end đã bọc
 let lm='';setInterval(()=>{let m='',g='';try{m=mode;g=gameMode;}catch{return;}if(m==='play'&&lm!=='play'&&lm!=='pause'&&g==='endless'&&!snap)onStart();if(lm==='play'&&m!=='play'&&m!=='pause'&&snap)onEnd();lm=m;},250);
 return {show,state:()=>({on:!!snap,ids:runIds.slice()})};
})();
