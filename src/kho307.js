'use strict';
// V307 · KHO TRANG BỊ 1 MÀN + TÚI ĐỒ (học cách bố trí của game cùng thể loại · chủ dự án duyệt 17/11/2026)
//  • Màn Kho: xem trước tàu + 3 ô đang mặc (giữ của Hub40) + cộng hưởng; dưới là 2 nút NÂNG CẤP · TIẾN KHUNG (theo ô đang chọn)
//    và 1 nút TÚI ĐỒ. Lưới đồ, bộ lọc, nút Mặc tốt nhất / Phân giải nhanh chuyển vào Túi đồ.
//  • Túi đồ: tab đáy Trang bị / Tài nguyên; mỗi món 1 hàng (khung, sao, Lv, "cho X XP"); 3 nút đáy:
//    TIẾN KHUNG NHANH (các món đang mặc đủ điều kiện) · PHÂN GIẢI NHANH · MẶC TỐT NHẤT.
//  • Tắt: window.KHO307=false.
const KHO307=(()=>{
 const on=()=>window.KHO307!==false;
 const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 const fmt=n=>Math.round(n||0).toLocaleString('vi-VN');
 const items=()=>{try{return Progress.v70.items();}catch{return [];}};
 const eq=()=>{try{return Progress.v70.equipped()||{};}catch{return {};}};
 const eqIds=()=>Object.values(eq());
 const kname=k=>{try{return Progress.kindName(k);}catch{return k;}};
 const label=it=>{try{return V70T(it);}catch{return '';}};
 const col=it=>{try{return V70C(it);}catch{return '#d6e0ea';}};
 const nOf=it=>{try{const k=TIER70.name.indexOf(V70T(it));return k<0?0:k;}catch{return 0;}};
 const art=it=>{try{return String(Progress.art(it)).replace(/<b>[\s\S]*?<\/b>/g,'');}catch{return '';}};
 const title=it=>{try{return Progress.title(it).split(' · ')[0];}catch{return it.id;}};
 const feed=it=>{try{return NC307.feedXp(it);}catch{return 0;}};
 const capOf=it=>{try{return Workshop.cap(it);}catch{return 100;}};
 let sel=null;
 // ---------- HỢP THÀNH 5 → 1 (chủ dự án chốt 17/11: 5 Trắng→Lục, 5 Lục→Lam, 5 Lam→Lam+1; trộn mẫu/loại tùy ý; không nhận đồ hợp thể)
 //  số theo Gemini lượt 5: ◈ 150 / 450 / 1.500 · 100 % thành công · Lam→Lam+1 tối đa 10 lượt/ngày · hoàn 85 % XP đã đầu tư bằng Đá XP
 const HOP={rec:[{inN:0,outN:1,cost:150,lim:0,name:'Trắng → Lục'},{inN:1,outN:2,cost:450,lim:0,name:'Lục → Lam'},{inN:2,outN:3,cost:1500,lim:10,name:'Lam → Lam +1'}],K:'saobang-hop307-v1'};
 let hr=0,hp=[],hask=false;
 const day=()=>{const d=new Date();return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();};
 const hopUsed=()=>{try{const v=JSON.parse(localStorage.getItem(HOP.K)||'{}');return v.d===day()?(v.n|0):0;}catch{return 0;}};
 const hopAdd=()=>{try{localStorage.setItem(HOP.K,JSON.stringify({d:day(),n:hopUsed()+1}));}catch{}};
 const hopOk=(it,r)=>it&&!eqIds().includes(it.id)&&!it.super&&!it.key&&!it.directFusion&&!it.fusion&&nOf(it)===r.inN;
 const baseXp=it=>{try{return NC307CFG.feed[nOf(it)];}catch{return 0;}};
 function refundXp(list){let x=0;for(const it of list)x+=Math.max(0,feed(it)-baseXp(it));return x;}
 function giveStones(xp){if(!(xp>0))return '';const o={};for(const t of [4,3,2]){const v=XPDA307.XP[t];o[t]=Math.floor(xp/v);xp-=o[t]*v;}o[1]=Math.ceil(xp/XPDA307.XP[1]);const out=[];for(const t of [4,3,2,1])if(o[t]){XPDA307.add(t,o[t]);out.push(o[t]+' '+XPDA307.NAME[t]);}return out.join(', ');}
 function hopRun(){const r=HOP.rec[hr],list=hp.map(id=>items().find(i=>i.id===id)).filter(i=>hopOk(i,r));
  if(list.length<5)return 'Cần đủ 5 món '+TIER70.name[r.inN]+'.';if(r.lim&&hopUsed()>=r.lim)return 'Hết lượt hôm nay ('+r.lim+'/ngày).';
  if(Progress.balance()<r.cost)return 'Thiếu hợp kim ('+fmt(r.cost)+' ◈).';
  // loại đầu ra theo trọng số đầu vào; mẫu ngẫu nhiên chưa Tím+5
  const kind=list[Math.floor(Math.random()*list.length)].kind;
  const isMax=v=>{try{return MAX307API.isMax('gear',v);}catch{return false;}};
  let pool=(typeof ACTIVE_GEAR_MODELS!=='undefined'?ACTIVE_GEAR_MODELS:Object.keys(GearCatalog)).filter(v=>GearCatalog[v]&&GearCatalog[v].kind===kind&&!isMax(v));
  if(!pool.length)pool=(typeof ACTIVE_GEAR_MODELS!=='undefined'?ACTIVE_GEAR_MODELS:Object.keys(GearCatalog)).filter(v=>GearCatalog[v]&&!isMax(v));
  if(!pool.length)pool=(typeof ACTIVE_GEAR_MODELS!=='undefined'?ACTIVE_GEAR_MODELS:Object.keys(GearCatalog)).filter(v=>GearCatalog[v]&&GearCatalog[v].kind===kind);/* mọi mẫu đã Tím+5: vẫn ra món (dùng làm vật liệu cùng mẫu) */
  const rx=refundXp(list);
  if(!Progress.spendCredits(r.cost))return 'Thiếu hợp kim.';
  let made=null;for(let k=0;k<8&&!made;k++){const v=pool[Math.floor(Math.random()*pool.length)];try{made=Progress.grantChestGear(v,'','legacy');}catch{}}
  if(!made){Progress.grantCredits(r.cost);return 'Không tạo được trang bị, đã hoàn hợp kim.';}
  for(const it of list)Progress.v70.remove(it.id);
  try{V70.setTier('gear',made.id,r.outN);}catch{}
  if(r.lim)hopAdd();const st=giveStones(rx);hp=[];
  try{Progress.render();}catch{}
  window.__hop307=(window.__hop307||[]).concat([{r:hr,out:made.variant,n:r.outN,refund:rx}]);
  return 'HỢP THÀNH: '+title(made)+' · '+TIER70.name[r.outN]+(st?' · hoàn '+st:'');}
 function hopHtml(){const r=HOP.rec[hr],pool=items().filter(i=>hopOk(i,r)&&!hp.includes(i.id)).sort((a,b)=>(a.level-b.level));
  const sl=hp.map(id=>items().find(i=>i.id===id)).filter(Boolean);
  return `<div class="k307-tabs">${HOP.rec.map((x,i)=>`<button data-k="hr" data-id="${i}" class="${i===hr?'on':''}">${x.name}</button>`).join('')}</div>
  <div class="k307-hop"><p>5 món <b>${TIER70.name[r.inN]}</b> bất kỳ (khác mẫu, khác loại đều được) → 1 món <b>${TIER70.name[r.outN]}</b> ngẫu nhiên. Đồ đang mặc và đồ hợp thể không dùng được.</p>
   <div class="k307-slots">${Array.from({length:5},(_,k)=>{const it=sl[k];return it?`<button data-k="hun" data-id="${esc(it.id)}" style="--c:${col(it)}"><div class="k307-ic">${art(it)}</div><small>Lv${it.level|0}</small></button>`:'<button class="e" disabled>+</button>';}).join('')}</div>
   <div class="k307-hc">Chi phí <b>${fmt(r.cost)} ◈</b>${r.lim?` · hôm nay ${hopUsed()}/${r.lim}`:''}${refundXp(sl)>0?` · <em>hoàn ${fmt(refundXp(sl))} XP bằng Đá XP</em>`:''}</div></div>
  <div class="k307-list">${pool.length?pool.map(it=>`<button class="k307-row" data-k="hadd" data-id="${esc(it.id)}" style="--c:${col(it)}"><div class="k307-ic">${art(it)}</div><div class="k307-ri"><b>${esc(title(it))}</b><small>${esc(kname(it.kind))} · ${esc(label(it))}</small></div><div class="k307-rr"><b>Lv${it.level|0}</b>${it.level>1?'<em>hoàn XP</em>':''}</div></button>`).join(''):'<i>Không còn món '+TIER70.name[r.inN]+' dùng được.</i>'}</div>
  ${hask?`<div class="k307-ask"><div><p>Có món đã nâng Level: phần XP đã đầu tư hoàn <b>85%</b> bằng Đá XP. 5 món sẽ mất hẳn. Tiếp tục?</p><button data-k="hok">Hợp thành</button><button data-k="hno">Thôi</button></div></div>`:''}
  <div class="k307-acts k307-acts2"><button data-k="hauto">TỰ CHỌN</button><button data-k="hgo" class="go" ${sl.length===5?'':'disabled'}>HỢP THÀNH</button></div>`;}               // id món đang chọn trên màn kho
 // ---------- màn Kho ----------
 function patch(){if(!on())return;const body=document.getElementById('hb-body');if(!body)return;const doll=body.querySelector(':scope>.hb-doll');
  if(!doll){body.classList.remove('k307');return;}
  body.classList.add('k307');
  const slots=[...doll.querySelectorAll('.hb-slot')],E=eq(),kinds=Object.keys(E);
  if(!sel||!eqIds().includes(sel))sel=E[kinds[0]]||null;
  slots.forEach((s,i)=>{const id=E[kinds[i]];s.classList.toggle('k307-on',!!id&&id===sel);if(!s.__k307){s.__k307=1;s.addEventListener('click',ev=>{if(!on())return;const k=Object.keys(eq())[[...doll.querySelectorAll('.hb-slot')].indexOf(s)];const id=eq()[k];if(!id)return;if(sel!==id){sel=id;ev.stopImmediatePropagation();ev.preventDefault();patch();}},true);}});
  let bar=body.querySelector(':scope>.k307-bar');
  if(!bar){bar=document.createElement('div');bar.className='k307-bar';bar.innerHTML='<div class="k307-two"><button data-k="up">NÂNG CẤP<small></small></button><button data-k="adv">TIẾN KHUNG<small></small></button></div><button data-k="bag" class="k307-bag">🎒 TÚI ĐỒ <small></small></button>';
   bar.addEventListener('click',e=>{const b=e.target.closest('[data-k]');if(!b)return;const k=b.dataset.k;if(k==='up'){if(sel)NC307.open(sel);}else if(k==='adv'){if(sel)NC307.open(sel,'adv');}else if(k==='bag')bag();});
   const m7=body.querySelector(':scope>.m7-card');(m7||doll).after(bar);}
  const it=sel&&items().find(i=>i.id===sel);
  bar.querySelector('[data-k=up] small').textContent=it?title(it)+' · Lv'+(it.level|0)+'/'+capOf(it):'';
  bar.querySelector('[data-k=adv] small').textContent=it?label(it):'';
  bar.querySelector('[data-k=bag] small').textContent=items().length+' món';}
 setInterval(()=>{try{patch();}catch{}},400);
 // ---------- Túi đồ ----------
 let el=null,tab='gear',kf='all',msg='';
 function rowHtml(it){const e=eqIds().includes(it.id);let st='';try{const a=Progress.stat(it);st=it.kind==='armor'?`Giáp ${a.armor.toFixed(1)} · Máu ${a.hp.toFixed(1)}`:`ST ${a.auxDamage.toFixed(2)} · ${a.interval.toFixed(2)} s`;}catch{}
  const n=nOf(it),fr=[0,1,2,2,2,2,3,3,3,3,3,3][n],plus=n<2?0:n<6?n-2:n-6;
  return `<button class="k307-row" data-k="item" data-id="${esc(it.id)}" style="--c:${col(it)}"><div class="k307-ic">${art(it)}</div><div class="k307-ri"><b>${esc(title(it))}</b><span>${'★'.repeat(fr+1)}${'✦'.repeat(plus)} <small>${esc(label(it))}</small></span><small>${kf==='all'?esc(kname(it.kind))+' · ':''}${st}</small></div><div class="k307-rr"><b>Lv${it.level|0}<small>/${capOf(it)}</small></b>${e?'<s>Đang mặc</s>':`<em>cho ${fmt(feed(it))} XP</em>`}</div></button>`;}
 function resHtml(){const R=[];try{for(const t of XPDA307.types)R.push([XPDA307.NAME[t],XPDA307.have(t),fmt(XPDA307.XP[t])+' XP / viên',XPDA307.COL[t],'◆']);}catch{}
  try{R.push(['Hợp kim',Progress.balance(),'Tiền tệ chính: nâng bậc, tiến khung, phi công','#ffd166','◈']);}catch{}
  try{R.push(['Lõi Siêu Hợp',Meta407.cores(),'Tiến bậc phi công Tím / Tím+5, cây tiềm năng','#c77dff','✪']);}catch{}
  try{R.push(['Bản sao (kho)',Evo82.list().length,'Nguyên liệu tiến khung','#7fdcff','❖']);}catch{}
  return R.map(r=>`<div class="k307-row k307-res" style="--c:${r[3]}"><div class="k307-ic"><i>${r[4]}</i></div><div class="k307-ri"><b>${esc(r[0])}</b><small>${esc(r[2])}</small></div><div class="k307-rr"><b>${fmt(r[1])}</b></div></div>`).join('');}
 function render(){if(!el)return;const all=items(),kinds=[...new Set(all.map(i=>i.kind))];
  let l=tab==='gear'?all.filter(i=>kf==='all'||i.kind===kf).sort((a,b)=>(eqIds().includes(b.id)-eqIds().includes(a.id))||nOf(b)-nOf(a)||(b.level-a.level)):[];
  el.querySelector('.k307-in').innerHTML=`<div class="k307-top"><b>TÚI ĐỒ</b><span>${tab==='gear'?all.length+' trang bị':tab==='hop'?'Hợp thành':'Tài nguyên'}</span><button data-k="x" aria-label="Đóng">✕</button></div>
   ${tab==='gear'?`<div class="k307-tabs"><button data-k="kf" data-id="all" class="${kf==='all'?'on':''}">Tất cả</button>${kinds.map(k=>`<button data-k="kf" data-id="${esc(k)}" class="${kf===k?'on':''}">${esc(kname(k))}</button>`).join('')}</div>`:''}
   ${tab==='hop'?hopHtml():`<div class="k307-list">${tab==='gear'?(l.length?l.map(rowHtml).join(''):'<i>Túi trống.</i>'):resHtml()}</div>`}
   ${msg?`<p class="k307-m">${esc(msg)}</p>`:''}
   ${tab==='gear'?`<div class="k307-acts"><button data-k="qadv">TIẾN KHUNG<br>NHANH</button><button data-k="qm">PHÂN GIẢI<br>NHANH</button><button data-k="best">MẶC TỐT<br>NHẤT</button></div>`:''}
   <div class="k307-foot"><button data-k="tab" data-id="gear" class="${tab==='gear'?'on':''}">TRANG BỊ</button><button data-k="tab" data-id="hop" class="${tab==='hop'?'on':''}">HỢP THÀNH</button><button data-k="tab" data-id="res" class="${tab==='res'?'on':''}">TÀI NGUYÊN</button></div>`;}
 function quickAdv(){let n=0;for(const id of eqIds()){try{for(let g=0;g<11;g++){const p=Evo82.plan('gear',id);if(!p||p.max||!p.ok)break;if(!Evo82.doBreak('gear',id))break;n++;}}catch{break;}}return n;}
 function click(e){const b=e.target.closest('[data-k]');if(!b||!el.contains(b))return;const k=b.dataset.k,id=b.dataset.id;msg='';
  if(k==='x'){close();return;}
  if(k==='tab'){tab=id;hp=[];hask=false;}else if(k==='kf')kf=id;
  else if(k==='hr'){hr=+id;hp=[];}
  else if(k==='hadd'){if(hp.length<5&&!hp.includes(id))hp.push(id);}
  else if(k==='hun'){hp=hp.filter(x=>x!==id);}
  else if(k==='hauto'){const r=HOP.rec[hr];hp=items().filter(i=>hopOk(i,r)).sort((a,b)=>a.level-b.level).slice(0,5).map(i=>i.id);if(hp.length<5)msg='Chỉ có '+hp.length+' món '+TIER70.name[r.inN]+' dùng được.';}
  else if(k==='hgo'){const sl=hp.map(x=>items().find(i=>i.id===x)).filter(Boolean);if(sl.some(i=>i.level>1)&&!hask){hask=true;}else{hask=false;msg=hopRun();}}
  else if(k==='hok'){hask=false;msg=hopRun();}
  else if(k==='hno'){hask=false;}
  else if(k==='item'){close();try{Hub40.openItem(id);}catch{}return;}
  else if(k==='qadv'){const n=quickAdv();msg=n?'Đã tiến khung '+n+' lần cho đồ đang mặc.':'Đồ đang mặc chưa đủ điều kiện tiến khung (trần cấp, bản sao, hợp kim).';}
  else if(k==='qm'){const q=document.getElementById('hb-qm');if(q){q.click();msg='Đã phân giải đồ Trắng/Lục thừa.';}}
  else if(k==='best'){const q=document.getElementById('hb-best');if(q){q.click();msg='Đã mặc bộ tốt nhất.';}}
  render();}
 function bag(){if(!on())return;if(!el){el=document.createElement('div');el.id='k307';el.innerHTML='<div class="k307-in"></div>';el.addEventListener('click',click);document.body.appendChild(el);}el.classList.add('open');render();}
 function close(){if(el)el.classList.remove('open');}
 return {bag,close,patch,sel:()=>sel,hop:{run:hopRun,set:(r,ids)=>{hr=r;hp=ids.slice();},used:hopUsed,cfg:HOP}};
})();
