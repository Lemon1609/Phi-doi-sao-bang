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
 return {XP,NAME,COL,IMG:t=>{try{return (window.DAXP307_IMG||{})[t]||'';}catch{return '';}},have,add,spend,types:[1,2,3,4],total:()=>[1,2,3,4].reduce((a,t)=>a+have(t)*XP[t],0),state:()=>JSON.parse(JSON.stringify(S))};})();
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
 // V307 (18/11): bản sao/phôi từ phó bản, sự kiện, phần thưởng (kho Evo82) dùng làm vật liệu nâng cấp — chỉ CÙNG MẪU (tàu cùng chiếc). Tắt: window.CP307=false
 const isCp=id=>typeof id==='string'&&id.startsWith('copy:');
 const cpOn=()=>window.CP307!==false&&typeof Evo82!=='undefined';
 function copyObj(u){let c=null;try{c=Evo82.list().find(x=>x.u===+u);}catch{}if(!c)return null;
  if(c.k==='craft')return {id:'copy:'+c.u,copy:c,kind:'craft',idx:c.m|0,level:c.lv,_v:(()=>{try{return {...Workshop.craftProgress(c.m|0),level:c.lv};}catch{return {level:c.lv};}})()};
  let kd='';try{kd=GearCatalog[c.m].kind;}catch{}return {id:'copy:'+c.u,copy:c,kind:kd,variant:c.m,level:c.lv,rarity:'normal',rank:'',grade:'',enhance:0};}
 const copies=()=>{if(!cpOn())return [];try{return Evo82.list().map(c=>copyObj(c.u)).filter(Boolean);}catch{return [];}};
 const get=id=>isC(id)?craftObj(+id.slice(6)):isCp(id)?copyObj(id.slice(5)):items().find(i=>i.id===id);
 const shipName=i=>{try{return Fighters28.profiles[i].name;}catch{return 'Chiến cơ '+(i+1);}};
 const ships=()=>{const L=[];for(let i=0;i<13;i++){try{if(Campaign36.ownsCraft(i)){const o=craftObj(i);if(o)L.push(o);}}catch{}}return L;};
 const eqIds=()=>{try{return Object.values(Progress.v70.equipped()||{});}catch{return [];}};
 const nOf=it=>{if(it&&it.copy)return it.copy.t|0;if(it&&it.kind==='craft'){try{return V70.craftN(it.idx);}catch{return 0;}}try{const t=V70T(it);const k=TIER70.name.indexOf(t);return k<0?0:k;}catch{return 0;}};
 const capOf=it=>{try{return Workshop.cap(it&&it.kind==='craft'?it._v:it);}catch{return 100;}};
 const xpOf=id=>S.x[id]|0;
 function invested(it){let s=0;for(let L=1;L<(it.level|0||1);L++)s+=C.need(L);return s+xpOf(it.id);}
 const feedXp=it=>C.feed[Math.min(11,nOf(it))]+Math.floor(C.refund*invested(it));
 const usable=(it,tg)=>it&&tg&&it.copy?(!it.copy.lk&&!tg.copy&&(tg.kind==='craft'?it.copy.k==='craft'&&(it.copy.m|0)===tg.idx:it.copy.k==='gear'&&it.copy.m===tg.variant)):it&&tg&&tg.kind!=='craft'&&it.kind!=='craft'&&it.id!==tg.id&&(it.variant||null)===(tg.variant||null)&&it.kind===tg.kind&&!eqIds().includes(it.id)&&!it.super&&!it.key;
 const D=XPDA307,T4=D.types;
 const zero=()=>({1:0,2:0,3:0,4:0});
 const stXp=()=>T4.reduce((a,t)=>a+(st[t]|0)*D.XP[t],0),stN=()=>T4.reduce((a,t)=>a+(st[t]|0),0);
 // ---------- trạng thái màn ----------
 let upPop=0,back=false,mode='up',flash='',warnAsk=false;
 const WK='saobang-nc307-warn';const noWarnToday=()=>{try{return localStorage.getItem(WK)===new Date().toDateString();}catch{return false;}};
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
 function colorOf(it){if(it&&(it.kind==='craft'||it.copy)){try{return TIER70.fcol[TIER70.frame[nOf(it)]];}catch{return '#d6e0ea';}}try{return V70C(it);}catch{return '#d6e0ea';}}
 function card(it,cls){const art=artOf(it);return `<div class="${cls}" style="--c:${colorOf(it)}">${art}<b>Lv${it.level|0}</b></div>`;}
 function render(){if(!el)return;if(flash){const f=flash;setTimeout(()=>{if(flash===f)flash='';},1700);}if(cur&&!get(cur))cur=null;const it=cur?get(cur):null;
  if(it&&mode==='adv'){el.querySelector('.nc307-in').innerHTML=advHtml(it);return;}
  mats=mats.filter(id=>usable(get(id),it));
  if(!it){el.querySelector('.nc307-in').innerHTML=`<div class="nc307-top"><b>NÂNG CẤP</b><button class="nc307-x" data-nc="x" aria-label="Đóng">✕</button></div>
   <div class="nc307-pn"><button class="nc307-pc nc307-pick" data-nc="bag"><b>Chọn trang bị</b><div class="nc307-art"><i>+</i></div><small>Chạm để mở túi</small></button>
   <table class="nc307-tb"><tr><td>Cấp</td><td>—</td><td>➤</td><td>—</td></tr><tr><td>Chỉ số</td><td>—</td><td>➤</td><td>—</td></tr></table></div>
   <div class="nc307-mats">${Array.from({length:C.slots},()=>'<button class="e" disabled>+</button>').join('')}</div>
   <div class="nc307-bot"><button class="nc307-b2" disabled>TIẾN KHUNG</button><button class="nc307-go" disabled>NÂNG CẤP</button><button data-nc="x" class="nc307-b3">VỀ</button></div>${el.dataset.list?sheetHtml(null,el.dataset.list):''}`;return;}
  const g=gainNow(),r=sim(it,g),r0=sim(it,0),rows=statRows(it,r.L),title=(()=>{if(it.kind==='craft')return shipName(it.idx);try{return Progress.title(it);}catch{return it.id;}})();
  const bag=items().slice().sort((a,b)=>(eqIds().includes(b.id)-eqIds().includes(a.id))||nOf(b)-nOf(a)||(b.level-a.level));
  const pct0=r0.need?Math.min(100,r0.x/r0.need*100):100,pct=r.need?Math.min(100,r.x/r.need*100):100;
  const toCap=(()=>{let t=-(r0.x|0);for(let L=(it.level|0);L<r0.cap;L++)t+=C.need(L);return Math.max(0,t);})();
  el.querySelector('.nc307-in').innerHTML=`
  <div class="nc307-top"><b>NÂNG CẤP</b><button class="nc307-swap" data-nc="bag">⇅ Đổi món</button><button class="nc307-x" data-nc="x" aria-label="Đóng">✕</button></div>
  <div class="nc307-pn" style="--c:${colorOf(it)}">
   <div class="nc307-pc" data-nc="${it.kind==='craft'?'':'bag'}"><b>${esc(String(title).split(' · ')[0])}</b><div class="nc307-art">${artOf(it)}</div><div class="nc307-st">${stars(it)}</div><small>${esc(it.kind==='craft'?TIER70.name[nOf(it)]:(()=>{try{return V70T(it);}catch{return '';}})())}</small></div>
   <table class="nc307-tb"><tr><td>Cấp</td><td>${it.level|0}/${r0.cap}</td><td>➤</td><td class="${r.L>(it.level|0)?'up':''}">${r.L}/${r.cap}</td></tr>
    ${rows.map(x=>`<tr><td>${x[0]}</td><td>${x[1]}</td><td>➤</td><td class="${x[3]?'up':''}">${x[2]}</td></tr>`).join('')}</table>
  </div>
  <div class="nc307-xp2"><div><span>XP cần lên cấp: <b>${r0.need?fmt(r0.need-r0.x):'—'}</b></span><span>XP tới trần: <b>${fmt(toCap)}</b></span></div>
   <div class="nc307-bar"><i style="width:${r.L>(it.level|0)?0:pct0}%"></i><u style="width:${pct}%"></u><em>XP nhận: ${fmt(g)}</em></div></div>
  ${r.over>C.overWarn?`<p class="nc307-w">Dư ${fmt(r.over)} XP sẽ mất do chạm trần Lv${r.cap}.</p>`:''}
  <div class="nc307-row2"><span>${it.kind==='craft'?'Vật liệu: bản sao cùng chiến cơ':'Vật liệu: trang bị / bản sao cùng mẫu'}</span><button data-nc="auto" class="nc307-auto">Tự chọn</button></div>
  ${it.kind==='craft'&&!cpOn()?'':`<div class="nc307-mats">${Array.from({length:C.slots},(_,k)=>{const m=get(mats[k]);return m?`<button data-nc="un" data-id="${esc(m.id)}" class="f">${card(m,'nc307-mini')}<em>+${fmt(feedXp(m))}</em></button>`:`<button data-nc="slot" class="e">+</button>`;}).join('')}</div>`}
  <div class="nc307-stones">${T4.map(t=>`<div class="nc307-gem" style="--g:${D.COL[t]}" title="${esc(D.NAME[t])} · ${fmt(D.XP[t])} XP">${D.IMG(t)?`<img class="nc307-gi" src="${D.IMG(t)}" alt="">`:'<i></i>'}<small>${fmt(D.have(t))}</small><div class="nc307-gb"><button data-nc="s-" data-id="${t}">−</button><b>${st[t]|0}</b><button data-nc="s+" data-id="${t}">+</button></div></div>`).join('')}</div>
  <div class="nc307-bot"><button data-nc="adv" class="nc307-b2">TIẾN KHUNG</button><button data-nc="go" class="nc307-go" ${g&&r0.need?'':'disabled'}>NÂNG CẤP</button><button data-nc="x" class="nc307-b3">VỀ</button></div>
  ${msg?`<p class="nc307-m">${esc(msg)}</p>`:''}${flash?`<div class="nc307-ok" key="${Date.now()}">${esc(flash)}</div>`:''}
  ${warnAsk?(()=>{const r=sim(it,gainNow());return `<div class="nc307-ask"><div><p>Lượt nâng này vượt trần <b>Lv${r.cap}</b>, dư <b>${fmt(r.over)} XP</b> sẽ mất (không hoàn). Vẫn nâng?</p><label class="nc307-nw"><input type="checkbox"> Hôm nay không nhắc lại</label><button data-nc="wno">Hủy</button><button data-nc="wok">Tiếp tục nâng</button></div></div>`;})():''}
  ${ask?`<div class="nc307-ask"><div><p>${/^bản sao/.test(ask.why)?'':'Trang bị '}${esc(ask.why.replace(/^bản sao/,'Bản sao'))} sẽ <b>biến mất vĩnh viễn</b>. Dùng làm nguyên liệu?</p><button data-nc="ok">Đồng ý</button><button data-nc="no">Thôi</button></div></div>`:''}
  ${el.dataset.list?sheetHtml(it,el.dataset.list):''}`;}
 let tab='all';
 const kname=k=>{if(k==='craft')return 'Chiến cơ';try{return Progress.kindName(k);}catch{return k;}};
 function sheetHtml(it,mode){const isMat=mode==='mat'&&!!it;
  let l=isMat?items().concat(copies()).filter(m=>usable(m,it)&&!mats.includes(m.id)):ships().concat(items());
  const kinds=[...new Set((isMat?[]:ships()).concat(items()).map(m=>m.kind))];
  if(tab!=='all')l=l.filter(m=>m.kind===tab);
  l=l.slice().sort(isMat?((a,b)=>nOf(a)-nOf(b)||a.level-b.level):((a,b)=>(eqIds().includes(b.id)-eqIds().includes(a.id))||nOf(b)-nOf(a)||(b.level-a.level)));
  return `<div class="nc307-sh" data-nc="no"><div class="nc307-shp"><i class="nc307-grip"></i><div class="nc307-sht"><b>${isMat?'Chọn vật liệu · bị tiêu hao':'Chọn trang bị cần nâng'}</b><button data-nc="no">✕</button></div>
   <div class="nc307-tabs"><button data-nc="tab" data-id="all" class="${tab==='all'?'on':''}">Tất cả</button>${kinds.map(k=>`<button data-nc="tab" data-id="${esc(k)}" class="${tab===k?'on':''}">${esc(kname(k))}</button>`).join('')}</div>
   <div class="nc307-rows">${l.length?l.map(m=>rowHtml(m,isMat)).join(''):(isMat?'<i>Không có trang bị / bản sao cùng mẫu để làm vật liệu.</i>':'<i>Không có trang bị phù hợp.</i>')}</div></div></div>`;}
 function rowHtml(m,isMat){const t=m.kind==='craft'?shipName(m.idx):(()=>{try{return Progress.title(m).split(' · ')[0];}catch{return m.id;}})(),lb=(m.copy||m.kind==='craft')?(()=>{try{return TIER70.name[nOf(m)];}catch{return '';}})():(()=>{try{return V70T(m);}catch{return '';}})();
  let st='';if(m.kind==='craft'){try{st='Hệ số ×'+Workshop.levelFactor(m._v).toFixed(2);}catch{}}else try{const a=Progress.stat(m);st=m.kind==='armor'?`Giáp ${a.armor.toFixed(1)} · Máu ${a.hp.toFixed(1)}`:`ST ${a.auxDamage.toFixed(2)} · ${a.interval.toFixed(2)} s`;}catch{}
  const eq=eqIds().includes(m.id);
  const fi=(()=>{try{return TIER70.frame[nOf(m)]|0;}catch{return 0;}})();
  return `<button class="nc307-row ${m.id===cur?'on':''}${m.copy?' cp':''}" data-f="${fi}" data-nc="${isMat?'add':'pick'}" data-id="${esc(m.id)}" style="--c:${colorOf(m)}">${card(m,'nc307-mini')}<div class="nc307-ri"><b>${esc(t)}</b><span class="nc307-rs">${stars(m)} <small>${esc(lb)}</small></span><small>${tab==='all'?esc(kname(m.kind))+' · ':''}${st}</small></div><div class="nc307-rr"><b>Lv${m.level|0}${m.copy?'':`<small>/${capOf(m)}</small>`}</b>${m.copy?'<s class="cp">Bản sao</s>':''}${eq?'<s>Đang mặc</s>':''}${isMat?`<em>+${fmt(feedXp(m))} XP</em>`:''}${!isMat&&m.id===cur?'<s class="cur">Đang chọn</s>':''}</div></button>`;}
 function advHtml(it){const K=it.kind==='craft'?'craft':'gear',ref=it.kind==='craft'?it.idx:it.id;let p=null;try{p=Evo82.plan(K,ref);}catch{}
  const n=nOf(it),title=(()=>{if(it.kind==='craft')return shipName(it.idx);try{return Progress.title(it).split(' · ')[0];}catch{return '';}})();
  const nm=k=>{try{return TIER70.name[k];}catch{return '';}},capN=k=>{try{return TIER70.cap[k];}catch{return 100;}},tm=(()=>{try{return TIER70.tm;}catch{return .0364;}})();
  const fc=k=>{try{return TIER70.fcol[TIER70.frame[k]];}catch{return '#d6e0ea';}};
  const max=!p||p.max,k=(1+(n+1)*tm)/(1+n*tm);
  // chỉ số 2 thẻ
  let S=[];if(it.kind==='craft'){let a=1;try{a=Workshop.levelFactor(it._v);}catch{}S.push(['Hệ số',a.toFixed(3),(a*k).toFixed(3)]);}
  else{let s0={};try{s0=Progress.stat(it);}catch{}const N={armor:'Giáp',hp:'Máu',auxDamage:'Sát thương'};for(const key of Object.keys(s0)){if(key==='interval')continue;const v=s0[key],d=key==='auxDamage'?2:1;S.push([N[key]||key,v.toFixed(d),(v*k).toFixed(d)]);}}
  const lv=it.level|0;
  const pop=Date.now()-upPop<1800?'<em class="nc307-p1">+1</em>':'';
  const cardA=`<div class="nc307-ac" style="--c:${fc(n)}">${pop}<b class="t">${esc(title)}</b><div class="nc307-art">${artOf(it)}</div><b class="f">${esc(nm(n))}</b></div>`;
  const cardB=max?'':`<div class="nc307-ac" style="--c:${fc(n+1)}"><b class="t">${esc(title)}</b><div class="nc307-art">${artOf(it)}</div><b class="f">${esc(nm(n+1))}</b></div>`;
  const tbl=max?'':`<table class="nc307-tb nc307-tc"><tr><td>Cấp</td><td>${lv}/${capN(n)}</td><td>➤</td><td class="up">${lv}/${capN(n+1)}</td></tr>${S.map(x=>`<tr><td>${x[0]}</td><td>${x[1]}</td><td>➤</td><td class="up">${x[2]}</td></tr>`).join('')}</table>`;
  let slots='',cost=0,need='';
  if(!max){const st=p.st||{};const L=[];
   if(p.needSame)L.push({im:(window.TN307_IMG||{})[it.kind==='craft'?'ban_sao_cc':'ban_sao_tb'],t:'Bản sao cùng mẫu',h:p.needSame-p.miss,n:p.needSame});
   for(const q of p.mats||[]){let N=q.id;try{N=V70.matName(q.id);}catch{}L.push({im:(typeof MAT69_ART!=='undefined'&&MAT69_ART[q.id])||'',t:N,h:q.have,n:q.n});}
   slots=Array.from({length:5},(_,i)=>{const x=L[i];if(!x)return '<div class="nc307-ns e"></div>';const ok=x.h>=x.n;return `<div class="nc307-ns ${ok?'':'no'}" title="${esc(x.t)}">${x.im?`<img src="${x.im}" alt="">`:''}<small>${Math.min(x.h,999)}/${x.n}</small>${ok?'':'<em>Thiếu</em>'}</div>`;}).join('');
   cost=(p.cr|0)+(p.stone|0)*15;if(st.mainLv&&lv<st.mainLv)need=`Cần món chính đạt Lv${st.mainLv} (đang Lv${lv})`;}
  return `<div class="nc307-top"><b>TIẾN KHUNG</b><button class="nc307-x" data-nc="x" aria-label="Đóng">✕</button></div>
   <div class="nc307-cards">${cardA}${max?'':'<i class="nc307-arr nc307-link"><span></span>'+((window.NC307_IMG||{}).ten?'<img src="'+window.NC307_IMG.ten+'" alt="">':'➤')+'</i>'+cardB}</div>
   ${tbl}
   ${max?`<p class="nc307-m">Đã đạt khung cao nhất: ${esc(nm(n))}.</p>`:`${need?`<p class="nc307-w">${esc(need)}</p>`:''}<div class="nc307-row2"><span>Chi phí <b class="cr">${fmt(cost)} ◈</b></span><span>${(p.rf&&p.rf.cr)?'hoàn '+fmt(p.rf.cr)+' ◈':''}</span></div><div class="nc307-mats nc307-nl">${slots}</div>`}
   ${msg?`<p class="nc307-m">${esc(msg)}</p>`:''}${flash?`<div class="nc307-ok">${esc(flash)}</div>`:''}
   <div class="nc307-bot"><button data-nc="upm" class="nc307-b2">NÂNG CẤP</button><button data-nc="brk" class="nc307-go" ${!max&&p.ok?'':'disabled'}>TIẾN KHUNG</button><button data-nc="x" class="nc307-b3">VỀ</button></div>`;}
 function needsAsk(m){if(m&&m.copy&&nOf(m)>=2)return 'bản sao '+(()=>{try{return TIER70.name[nOf(m)];}catch{return 'Lam';}})()+' (dùng được cho tiến khung)';return nOf(m)>=C.warnN?'khung '+(()=>{try{return V70T(m);}catch{return 'Tím';}})():(m.level|0)>=C.warnLv?'Lv'+m.level:'';}
 function add(id){const m=get(id),it=get(cur);if(!usable(m,it)||mats.length>=C.slots||mats.includes(id))return;const w=needsAsk(m);if(w){ask={id,why:w};return;}mats.push(id);}
 function auto(){const it=get(cur);if(!it)return;st=zero();mats=mats.filter(id=>!needsAsk(get(id)||{}));
  const pool=items().concat(copies()).filter(m=>usable(m,it)&&!mats.includes(m.id)&&!needsAsk(m)).sort((a,b)=>feedXp(a)-feedXp(b));
  for(const m of pool){if(mats.length>=C.slots)break;const r=sim(it,gainNow());if(r.L>=r.cap)break;if(sim(it,gainNow()+feedXp(m)).over>C.overWarn&&mats.length)break;mats.push(m.id);}
  st=zero();for(const t of T4){let r=sim(it,gainNow());while(r.L<r.cap&&st[t]<D.have(t)){st[t]++;r=sim(it,gainNow());if(r.over>C.overWarn){st[t]--;break;}}}
  if(!mats.length&&!stN())msg='Không có vật liệu phù hợp (món đang mặc, Tím trở lên và món từ Lv'+C.warnLv+' không tự chọn).';}
 function go(){const it=get(cur);if(!it)return;const g=gainNow();if(!g)return;const r=sim(it,g),old=it.level|0;
  if(stN()&&!D.spend(st)){msg='Không đủ Đá XP';return;}
  for(const id of mats){if(isCp(id)){try{Evo82.take(+id.slice(5));}catch{}}else Progress.v70.remove(id);delete S.x[id];}
  if(it.kind==='craft')Workshop.set70(it.idx,{level:r.L});else Progress.v70.set(it.id,{level:r.L});S.x[it.id]=r.x;save();mats=[];st=zero();
  msg='';flash=r.L>old?'NÂNG CẤP THÀNH CÔNG · Lv'+r.L:'+'+fmt(g)+' XP';try{Progress.render();}catch{}try{if(it.kind==='craft')Hub40.render();}catch{}try{Audio393.sfx('pickup');}catch{}}
 function click(e){const b=e.target.closest('[data-nc]');if(!b||!el.contains(b))return;const a=b.dataset.nc,id=b.dataset.id;msg='';
  if(a==='x'){close();return;}
  if(a==='adv'){mode='adv';flash='';}
  else if(a==='upm'){mode='up';flash='';}
  else if(a==='brk'){const it=get(cur);if(it){const K=it.kind==='craft'?'craft':'gear',ref=it.kind==='craft'?it.idx:it.id;let ok=false;try{ok=Evo82.doBreak(K,ref);}catch{}if(ok){flash='TIẾN KHUNG THÀNH CÔNG';upPop=Date.now();try{Audio393.sfx('pickup');}catch{}}else{let p=null;try{p=Evo82.plan(K,ref);}catch{}msg=p&&p.lacks&&p.lacks[0]||'Chưa đủ điều kiện';}}}
  else if(a==='wok'){warnAsk=false;if(b.closest('.nc307-ask').querySelector('input:checked'))try{localStorage.setItem(WK,new Date().toDateString());}catch{}go();}
  else if(a==='wno'){warnAsk=false;}
  if(a==='bag'){el.dataset.list='bag';}
  else if(a==='tab'){tab=id;}
  else if(a==='pick'){cur=id;mats=[];st=zero();delete el.dataset.list;}
  else if(a==='slot'){el.dataset.list='mat';}
  else if(a==='add'){delete el.dataset.list;add(id);}
  else if(a==='un'){mats=mats.filter(x=>x!==id);}
  else if(a==='ok'){if(ask){mats.length<C.slots&&mats.push(ask.id);ask=null;}}
  else if(a==='no'){if(b!==e.target&&b.classList.contains('nc307-sh'))return;ask=null;delete el.dataset.list;}
  else if(a==='s+'){const t=+id;const it=get(cur);if(st[t]<D.have(t)&&it&&sim(it,gainNow()).L<capOf(it))st[t]++;}else if(a==='s-'){const t=+id;st[t]=Math.max(0,(st[t]|0)-1);}
  else if(a==='auto')auto();else if(a==='go'){const it=get(cur);const r=it&&sim(it,gainNow());if(r&&r.over>C.overWarn&&!noWarnToday())warnAsk=true;else go();}
  render();}
 function open(id,md){if(!on())return false;cur=id===undefined?cur:id;mode=md||'up';flash='';warnAsk=false;mats=[];st=zero();ask=null;msg='';
  if(!el){el=document.createElement('div');el.id='nc307';try{const I=window.NC307_IMG||{};for(const k in I)el.style.setProperty('--k-'+k,'url('+I[k]+')');if(I.the)el.classList.add('gpt');}catch{}el.innerHTML='<div class="nc307-in"></div>';el.addEventListener('click',click);document.body.appendChild(el);}
  el.classList.add('open');render();return true;}
 function close(){if(el)el.classList.remove('open');try{const sh=document.querySelector('.hb-sheet.open');if(sh&&sh.dataset.item&&typeof gearSheet==='function')gearSheet(sh.dataset.item,true);}catch{}}
 // Nút NÂNG CẤP trong chi tiết trang bị → mở màn mới (chặn giữ-để-nâng cũ)
 const hit=e=>{if(!on())return;const b=e.target.closest&&e.target.closest('#sh-up');if(!b)return;const sh=b.closest('.hb-sheet');const id=sh&&sh.dataset.item;if(!id||!get(id))return;e.stopImmediatePropagation();e.preventDefault();if(e.type==='click')open(id);};
 const hitC=e=>{if(!on()||window.NC307C===false)return;const b=e.target.closest&&e.target.closest('#hb-lv,[data-level-craft]');if(!b)return;let i=null;try{i=b.dataset.levelCraft!=null?+b.dataset.levelCraft:Hub40.cur307();}catch{}if(i==null||isNaN(i))return;e.stopImmediatePropagation();e.preventDefault();if(e.type==='click')open('craft:'+i);};
 // nút nâng cũ của trang bị (kho cũ, nâng đồ đang mặc) → màn mới / ẩn
 const hitG=e=>{if(!on())return;const b=e.target.closest&&e.target.closest('[data-action="upgrade"][data-item],#upgrade392,#quote392');if(!b)return;e.stopImmediatePropagation();e.preventDefault();if(e.type==='click'&&b.dataset.item)open(b.dataset.item);};
 ['pointerdown','mousedown','touchstart','click'].forEach(t=>{document.addEventListener(t,hit,true);document.addEventListener(t,hitC,true);document.addEventListener(t,hitG,true);});
 // nút sh-up luôn bấm được (chỉ mở màn), đổi nhãn
 setInterval(()=>{try{if(!on())return;document.querySelectorAll('#upgrade392,#quote392').forEach(x=>x.style.display='none');const c=document.querySelector('#hb-lv');if(c&&!c.dataset.nc&&window.NC307C!==false){c.dataset.nc='1';c.disabled=false;c.innerHTML='NÂNG CẤP<small>Bản sao cùng tàu / Đá XP</small>';}const b=document.querySelector('.hb-sheet.open #sh-up');if(b&&get(b.closest('.hb-sheet').dataset.item)&&!b.dataset.nc){b.dataset.nc='1';b.disabled=false;b.innerHTML='NÂNG CẤP<small>Dùng trang bị khác / Đá XP</small>';}}catch{}},300);
 return {open,close,sim,da:XPDA307,feedXp,cfg:C,state:()=>JSON.parse(JSON.stringify(S)),_m:()=>mats.slice()};
})();
