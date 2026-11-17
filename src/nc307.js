'use strict';
// V307 · NÂNG CẤP TRANG BỊ BẰNG XP (khung giao diện, chủ dự án chốt 17/11/2026)
//  • Chọn món ở hàng túi trên cùng · thẻ lớn kèm sao ở giữa · bảng 3 dòng "hiện tại → sau" (số sau xanh lá)
//  • Hàng 5 ô vật liệu = trang bị CÙNG MẪU (chủ dự án chốt 17/11), MẤT HẲN, không hoàn · ô Đá XP · nút TỰ CHỌN · 1 nút vàng NÂNG CẤP
//  • Số liệu: Gemini lượt 2 (GEMINI_TRA_LOI_NANG_CAP_XP_V307_LUOT2.md). Chờ lượt 3 → chỉ sửa bảng NC307CFG.
//  • Đá XP: kho riêng nhiều loại XPDA307 (không còn dùng đá nâng cấp cũ).
//  • Tắt: window.NC307=false (nút Nâng cấp cũ hoạt động lại).
// Kho Đá XP nhiều loại (chủ dự án chốt 17/11: một họ Đá XP, chia loại I–IV; loại IV chỉ ở phó bản/sự kiện/phần thưởng).
//  XP mỗi loại theo Gemini lượt 4: I 15 · II 60 · III 240 · IV 1.000. Khóa saobang-daxp307-v1.
const XPDA307=(()=>{const KEY='saobang-daxp307-v1',XP={1:15,2:60,3:240,4:1000},NAME={1:'Đá XP Sơ Cấp',2:'Đá XP Trung Cấp',3:'Đá XP Cao Cấp',4:'Đá XP Tinh Túy'},COL={1:'#8fd6ff',2:'#5ce39a',3:'#c07bff',4:'#ffc24d'};
 let S={c:{1:0,2:0,3:0,4:0}};try{const v=JSON.parse(localStorage.getItem(KEY)||'null');if(v&&v.c)S=v;}catch{}for(const t of [1,2,3,4])S.c[t]=Math.max(0,S.c[t]|0);
 const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S));}catch{}};
 const have=t=>S.c[t]|0;
 function add(t,n){t=t|0;n=Math.floor(n||0);if(!XP[t]||n<=0)return false;S.c[t]+=n;save();return true;}
 function spend(m){for(const t in m)if((m[t]|0)>have(t))return false;for(const t in m)S.c[t]-=m[t]|0;save();return true;}
 return {XP,NAME,COL,have,add,spend,types:[1,2,3,4],total:()=>[1,2,3,4].reduce((a,t)=>a+have(t)*XP[t],0),state:()=>JSON.parse(JSON.stringify(S))};})();
const NC307CFG={
 need:L=>50+6*L,                     // XP từ L lên L+1
 feed:[15,40,100,180,280,400,750,1200,1800,2500,3400,4500],   // XP gốc theo 12 nấc khung (Trắng … Tím+5)
 refund:.85,                         // phần XP đã đầu tư được kế thừa khi làm vật liệu
 stoneXp:15,slots:5,overWarn:30,warnN:6,warnLv:15};
const NC307=(()=>{
 const KEY='saobang-nc307-v1',C=NC307CFG;
 let S={x:{}};try{Object.assign(S,JSON.parse(localStorage.getItem(KEY)||'{}'));}catch{}S.x=S.x||{};
 const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S));}catch{}};
 const on=()=>window.NC307!==false&&typeof Progress!=='undefined'&&Progress.v70;
 const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 const fmt=n=>Math.round(n).toLocaleString('vi-VN');
 const items=()=>{try{return Progress.v70.items();}catch{return [];}};
 const isC=id=>typeof id==='string'&&id.startsWith('craft:');
 function craftObj(i){try{const v=Workshop.craftProgress(i);return {id:'craft:'+i,kind:'craft',idx:i,level:v.level|0||1,_v:v};}catch{return null;}}
 const get=id=>isC(id)?craftObj(+id.slice(6)):items().find(i=>i.id===id);
 const eqIds=()=>{try{return Object.values(Progress.v70.equipped()||{});}catch{return [];}};
 const nOf=it=>{if(it&&it.kind==='craft'){try{return V70.craftN(it.idx);}catch{return 0;}}try{const t=V70T(it);const k=TIER70.name.indexOf(t);return k<0?0:k;}catch{return 0;}};
 const capOf=it=>{try{return Workshop.cap(it&&it.kind==='craft'?it._v:it);}catch{return 100;}};
 const xpOf=id=>S.x[id]|0;
 function invested(it){let s=0;for(let L=1;L<(it.level|0||1);L++)s+=C.need(L);return s+xpOf(it.id);}
 const feedXp=it=>C.feed[Math.min(11,nOf(it))]+Math.floor(C.refund*invested(it));
 const usable=(it,tg)=>it&&tg&&tg.kind!=='craft'&&it.kind!=='craft'&&it.id!==tg.id&&(it.variant||null)===(tg.variant||null)&&it.kind===tg.kind&&!eqIds().includes(it.id)&&!it.super&&!it.key;
 const D=XPDA307,T4=D.types;
 const zero=()=>({1:0,2:0,3:0,4:0});
 const stXp=()=>T4.reduce((a,t)=>a+(st[t]|0)*D.XP[t],0),stN=()=>T4.reduce((a,t)=>a+(st[t]|0),0);
 // ---------- trạng thái màn ----------
 let back=false;
 setInterval(()=>{try{if(!back)return;const d=[...document.querySelectorAll('.ev82,.adv70')].find(x=>!x.hidden&&x.getClientRects().length);if(d)return;back=false;if(el){el.classList.add('open');render();}}catch{}},300);
 let cur=null,mats=[],st=zero(),ask=null,el=null,msg='';
 function sim(it,gain){let L=it.level|0||1,x=xpOf(it.id)+gain;const cap=capOf(it);while(L<cap&&x>=C.need(L)){x-=C.need(L);L++;}const over=L>=cap?x:0;return {L,x:L>=cap?0:x,over,cap,need:L<cap?C.need(L):0};}
 const gainNow=()=>mats.reduce((s,id)=>{const m=get(id);return s+(m?feedXp(m):0);},0)+stXp();
 function statRows(it,L){if(it.kind==='craft'){let a=1,b=1;try{a=Workshop.levelFactor(it._v);b=Workshop.levelFactor({...it._v,level:L});}catch{}return [['Hệ số sức mạnh','×'+a.toFixed(3),'×'+b.toFixed(3),b>a+1e-9]];}
  let a={},b={};try{a=Progress.stat(it);b=Progress.stat({...it,level:L});}catch{}
  const f=(k,v)=>k==='interval'?v.toFixed(2)+' s':k==='auxDamage'?v.toFixed(2):v.toFixed(1);
  const nm={armor:'Giáp',hp:'Máu',auxDamage:'Sát thương/viên',interval:'Nhịp bắn'};
  return Object.keys(a).slice(0,2).map(k=>[nm[k]||k,f(k,a[k]),f(k,b[k]),k==='interval'?b[k]<a[k]-1e-9:b[k]>a[k]+1e-9]);}
 function stars(it){const n=nOf(it),fr=[0,1,2,2,2,2,3,3,3,3,3,3][n],plus=n<2?0:n<6?n-2:n-6;return '★'.repeat(fr+1)+'<span style="color:#ffd166">'+'✦'.repeat(plus)+'</span>';}
 const FORM=['thuong','luc','lam','lam','lam','lam','tim','tim','tim','tim','tim','tim5'];
 function artOf(it){if(it&&it.kind==='craft'){let src='';try{const S=SHIP118[it.idx];let f=FORM[nOf(it)];try{if(S.ss&&window.SS122!==false&&Workshop.craftGrade(it.idx)==='SS')f='ss';}catch{}src=S[f]||S.tim||S.lam||S.thuong;}catch{}return src?`<span class="nc307-ship"><img src="${src}" alt=""></span>`:'';}try{return String(Progress.art(it)).replace(/<b>[\s\S]*?<\/b>/g,'');}catch{return '';}}
 function colorOf(it){if(it&&it.kind==='craft'){try{return TIER70.fcol[TIER70.frame[nOf(it)]];}catch{return '#d6e0ea';}}try{return V70C(it);}catch{return '#d6e0ea';}}
 function card(it,cls){const art=artOf(it);return `<div class="${cls}" style="--c:${colorOf(it)}">${art}<b>Lv${it.level|0}</b></div>`;}
 function render(){if(!el)return;if(!cur||!get(cur)){const l=items();cur=l[0]&&l[0].id;}const it=get(cur);
  mats=mats.filter(id=>usable(get(id),it));
  if(!it){el.querySelector('.nc307-in').innerHTML='<p class="nc307-e">Chưa có trang bị.</p>';return;}
  const g=gainNow(),r=sim(it,g),r0=sim(it,0),rows=statRows(it,r.L),title=(()=>{if(it.kind==='craft'){try{return document.querySelector('#hb-info h3,#hb-info .hb-name')?.textContent||('Chiến cơ '+(it.idx+1));}catch{return 'Chiến cơ';}}try{return Progress.title(it);}catch{return it.id;}})();
  const bag=items().slice().sort((a,b)=>(eqIds().includes(b.id)-eqIds().includes(a.id))||nOf(b)-nOf(a)||(b.level-a.level));
  const pct0=r0.need?Math.min(100,r0.x/r0.need*100):100,pct=r.need?Math.min(100,r.x/r.need*100):100;
  el.querySelector('.nc307-in').innerHTML=`
  <div class="nc307-top"><b>NÂNG CẤP</b><button class="nc307-x" data-nc="x" aria-label="Đóng">✕</button></div>
  ${it.kind==='craft'?'':`<button class="nc307-swap" data-nc="bag">⇅ Đổi món <small>(${bag.length} trong túi)</small></button>`}
  <div class="nc307-hero" data-nc="bag" style="--c:${colorOf(it)}"><div class="nc307-art">${artOf(it)}</div><h3>${esc(title)}</h3><div class="nc307-st">${stars(it)} <span>${esc(it.kind==='craft'?TIER70.name[nOf(it)]:(()=>{try{return V70T(it);}catch{return '';}})())}</span></div></div>
  <table class="nc307-tb"><tr><td>Cấp</td><td>${it.level|0}</td><td>→</td><td class="${r.L>(it.level|0)?'up':''}">${r.L}<small>/${r.cap}</small></td></tr>
   ${rows.map(x=>`<tr><td>${x[0]}</td><td>${x[1]}</td><td>→</td><td class="${x[3]?'up':''}">${x[2]}</td></tr>`).join('')}</table>
  <div class="nc307-xp"><div class="nc307-bar"><i style="width:${r.L>(it.level|0)?0:pct0}%"></i><u style="width:${pct}%"></u></div><span>${r0.need?fmt(r0.x)+' / '+fmt(r0.need)+' XP':'Đạt trần cấp '+r0.cap}${g?` <em>+${fmt(g)} XP</em>`:''}</span></div>
  ${r.over>C.overWarn?`<p class="nc307-w">Dư ${fmt(r.over)} XP sẽ bị mất do chạm trần Lv${r.cap}. Hãy bỏ bớt vật liệu!</p>`:''}
  <div class="nc307-mats">${it.kind==='craft'?'':Array.from({length:C.slots},(_,k)=>{const m=get(mats[k]);return m?`<button data-nc="un" data-id="${esc(m.id)}" class="f">${card(m,'nc307-mini')}<em>+${fmt(feedXp(m))}</em></button>`:`<button data-nc="slot" class="e">+</button>`;}).join('')}
   <div class="nc307-stones">${T4.map(t=>`<div class="nc307-gem" style="--g:${D.COL[t]}"><i></i><div><b>${D.NAME[t]}</b><small>${fmt(D.XP[t])} XP · có ${fmt(D.have(t))}</small></div><div class="nc307-gb"><button data-nc="s-" data-id="${t}">−</button><b>${st[t]|0}</b><button data-nc="s+" data-id="${t}">+</button></div></div>`).join('')}</div></div>
  <div class="nc307-acts"><button data-nc="adv" class="nc307-adv">⇄ TIẾN KHUNG</button><button data-nc="auto" class="nc307-auto">TỰ CHỌN</button><button data-nc="go" class="nc307-go" ${g&&r0.need?'':'disabled'}>NÂNG CẤP</button></div>
  ${msg?`<p class="nc307-m">${esc(msg)}</p>`:''}
  ${ask?`<div class="nc307-ask"><div><p>Trang bị ${esc(ask.why)} sẽ <b>biến mất vĩnh viễn</b>. Dùng làm nguyên liệu?</p><button data-nc="ok">Đồng ý</button><button data-nc="no">Thôi</button></div></div>`:''}
  ${el.dataset.list?sheetHtml(it,el.dataset.list):''}`;}
 let tab='all';
 const kname=k=>{try{return Progress.kindName(k);}catch{return k;}};
 function sheetHtml(it,mode){const isMat=mode==='mat';
  let l=isMat?items().filter(m=>usable(m,it)&&!mats.includes(m.id)):items();
  const kinds=[...new Set(items().map(m=>m.kind))];
  if(tab!=='all')l=l.filter(m=>m.kind===tab);
  l=l.slice().sort(isMat?((a,b)=>nOf(a)-nOf(b)||a.level-b.level):((a,b)=>(eqIds().includes(b.id)-eqIds().includes(a.id))||nOf(b)-nOf(a)||(b.level-a.level)));
  return `<div class="nc307-sh" data-nc="no"><div class="nc307-shp"><i class="nc307-grip"></i><div class="nc307-sht"><b>${isMat?'Chọn vật liệu · bị tiêu hao':'Chọn trang bị cần nâng'}</b><button data-nc="no">✕</button></div>
   <div class="nc307-tabs"><button data-nc="tab" data-id="all" class="${tab==='all'?'on':''}">Tất cả</button>${kinds.map(k=>`<button data-nc="tab" data-id="${esc(k)}" class="${tab===k?'on':''}">${esc(kname(k))}</button>`).join('')}</div>
   <div class="nc307-rows">${l.length?l.map(m=>rowHtml(m,isMat)).join(''):(isMat?'<i>Không có trang bị cùng mẫu để làm vật liệu.</i>':'<i>Không có trang bị phù hợp.</i>')}</div></div></div>`;}
 function rowHtml(m,isMat){const t=(()=>{try{return Progress.title(m).split(' · ')[0];}catch{return m.id;}})(),lb=(()=>{try{return V70T(m);}catch{return '';}})();
  let st='';try{const a=Progress.stat(m);st=m.kind==='armor'?`Giáp ${a.armor.toFixed(1)} · Máu ${a.hp.toFixed(1)}`:`ST ${a.auxDamage.toFixed(2)} · ${a.interval.toFixed(2)} s`;}catch{}
  const eq=eqIds().includes(m.id);
  return `<button class="nc307-row ${m.id===cur?'on':''}" data-nc="${isMat?'add':'pick'}" data-id="${esc(m.id)}" style="--c:${colorOf(m)}">${card(m,'nc307-mini')}<div class="nc307-ri"><b>${esc(t)}</b><span class="nc307-rs">${stars(m)} <small>${esc(lb)}</small></span><small>${tab==='all'?esc(kname(m.kind))+' · ':''}${st}</small></div><div class="nc307-rr"><b>Lv${m.level|0}<small>/${capOf(m)}</small></b>${eq?'<s>Đang mặc</s>':''}${isMat?`<em>+${fmt(feedXp(m))} XP</em>`:''}${!isMat&&m.id===cur?'<s class="cur">Đang chọn</s>':''}</div></button>`;}
 function needsAsk(m){return nOf(m)>=C.warnN?'khung '+(()=>{try{return V70T(m);}catch{return 'Tím';}})():(m.level|0)>=C.warnLv?'Lv'+m.level:'';}
 function add(id){const m=get(id),it=get(cur);if(!usable(m,it)||mats.length>=C.slots||mats.includes(id))return;const w=needsAsk(m);if(w){ask={id,why:w};return;}mats.push(id);}
 function auto(){const it=get(cur);if(!it)return;if(it.kind==='craft')mats=[];st=zero();mats=mats.filter(id=>!needsAsk(get(id)||{}));
  const pool=items().filter(m=>usable(m,it)&&!mats.includes(m.id)&&!needsAsk(m)).sort((a,b)=>feedXp(a)-feedXp(b));
  for(const m of pool){if(mats.length>=C.slots)break;const r=sim(it,gainNow());if(r.L>=r.cap)break;if(sim(it,gainNow()+feedXp(m)).over>C.overWarn&&mats.length)break;mats.push(m.id);}
  st=zero();for(const t of T4){let r=sim(it,gainNow());while(r.L<r.cap&&st[t]<D.have(t)){st[t]++;r=sim(it,gainNow());if(r.over>C.overWarn){st[t]--;break;}}}
  if(!mats.length&&!stN())msg='Không có vật liệu phù hợp (món đang mặc, Tím trở lên và món từ Lv'+C.warnLv+' không tự chọn).';}
 function go(){const it=get(cur);if(!it)return;const g=gainNow();if(!g)return;const r=sim(it,g),old=it.level|0;
  if(stN()&&!D.spend(st)){msg='Không đủ Đá XP';return;}
  for(const id of mats){Progress.v70.remove(id);delete S.x[id];}
  if(it.kind==='craft')Workshop.set70(it.idx,{level:r.L});else Progress.v70.set(it.id,{level:r.L});S.x[it.id]=r.x;save();mats=[];st=zero();
  msg=r.L>old?'Lên Lv'+r.L+'!':'+'+fmt(g)+' XP';try{Progress.render();}catch{}try{if(it.kind==='craft')Hub40.render();}catch{}try{Audio393.sfx('pickup');}catch{}}
 function click(e){const b=e.target.closest('[data-nc]');if(!b||!el.contains(b))return;const a=b.dataset.nc,id=b.dataset.id;msg='';
  if(a==='x'){close();return;}
  if(a==='adv'){const it=get(cur);if(!it)return;el.classList.remove('open');back=true;try{V70.open(it.kind==='craft'?'craft':'gear',it.kind==='craft'?it.idx:it.id);}catch{}return;}
  if(a==='bag'){el.dataset.list='bag';}
  else if(a==='tab'){tab=id;}
  else if(a==='pick'){cur=id;mats=[];st=zero();delete el.dataset.list;}
  else if(a==='slot'){el.dataset.list='mat';}
  else if(a==='add'){delete el.dataset.list;add(id);}
  else if(a==='un'){mats=mats.filter(x=>x!==id);}
  else if(a==='ok'){if(ask){mats.length<C.slots&&mats.push(ask.id);ask=null;}}
  else if(a==='no'){if(b!==e.target&&b.classList.contains('nc307-sh'))return;ask=null;delete el.dataset.list;}
  else if(a==='s+'){const t=+id;const it=get(cur);if(st[t]<D.have(t)&&it&&sim(it,gainNow()).L<capOf(it))st[t]++;}else if(a==='s-'){const t=+id;st[t]=Math.max(0,(st[t]|0)-1);}
  else if(a==='auto')auto();else if(a==='go')go();
  render();}
 function open(id){if(!on())return false;cur=id||cur;mats=[];st=zero();ask=null;msg='';
  if(!el){el=document.createElement('div');el.id='nc307';el.innerHTML='<div class="nc307-in"></div>';el.addEventListener('click',click);document.body.appendChild(el);}
  el.classList.add('open');render();return true;}
 function close(){if(el)el.classList.remove('open');try{const sh=document.querySelector('.hb-sheet.open');if(sh&&sh.dataset.item&&typeof gearSheet==='function')gearSheet(sh.dataset.item,true);}catch{}}
 // Nút NÂNG CẤP trong chi tiết trang bị → mở màn mới (chặn giữ-để-nâng cũ)
 const hit=e=>{if(!on())return;const b=e.target.closest&&e.target.closest('#sh-up');if(!b)return;const sh=b.closest('.hb-sheet');const id=sh&&sh.dataset.item;if(!id||!get(id))return;e.stopImmediatePropagation();e.preventDefault();if(e.type==='click')open(id);};
 const hitC=e=>{if(!on()||window.NC307C===false)return;const b=e.target.closest&&e.target.closest('#hb-lv,[data-level-craft]');if(!b)return;let i=null;try{i=b.dataset.levelCraft!=null?+b.dataset.levelCraft:Hub40.cur307();}catch{}if(i==null||isNaN(i))return;e.stopImmediatePropagation();e.preventDefault();if(e.type==='click')open('craft:'+i);};
 // nút nâng cũ của trang bị (kho cũ, nâng đồ đang mặc) → màn mới / ẩn
 const hitG=e=>{if(!on())return;const b=e.target.closest&&e.target.closest('[data-action="upgrade"][data-item],#upgrade392,#quote392');if(!b)return;e.stopImmediatePropagation();e.preventDefault();if(e.type==='click'&&b.dataset.item)open(b.dataset.item);};
 ['pointerdown','mousedown','touchstart','click'].forEach(t=>{document.addEventListener(t,hit,true);document.addEventListener(t,hitC,true);document.addEventListener(t,hitG,true);});
 // nút sh-up luôn bấm được (chỉ mở màn), đổi nhãn
 setInterval(()=>{try{if(!on())return;document.querySelectorAll('#upgrade392,#quote392').forEach(x=>x.style.display='none');const c=document.querySelector('#hb-lv');if(c&&!c.dataset.nc&&window.NC307C!==false){c.dataset.nc='1';c.disabled=false;c.innerHTML='NÂNG CẤP<small>Dùng Đá XP</small>';}const b=document.querySelector('.hb-sheet.open #sh-up');if(b&&get(b.closest('.hb-sheet').dataset.item)&&!b.dataset.nc){b.dataset.nc='1';b.disabled=false;b.innerHTML='NÂNG CẤP<small>Dùng trang bị khác / Đá XP</small>';}}catch{}},300);
 return {open,close,sim,da:XPDA307,feedXp,cfg:C,state:()=>JSON.parse(JSON.stringify(S)),_m:()=>mats.slice()};
})();
