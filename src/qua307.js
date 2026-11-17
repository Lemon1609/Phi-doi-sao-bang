'use strict';
// V307 · MÀN "CHÚC MỪNG NHẬN ĐƯỢC" khi nhận quà (học cách hiện thưởng của game cùng thể loại · chủ dự án chọn 17/11/2026)
//  • Bấm nút NHẬN / NHẬN TẤT CẢ / ĐIỂM DANH… ngoài trận → gom mọi phần thưởng cấp ra trong 0,7 s
//    (kim cương, hợp kim, Đá XP, bản sao, trang bị, vé, thể lực, lõi) → màn tối có huy hiệu, từng ô thưởng bật ra lần lượt,
//    tên + số lượng dưới ô, 1 nút vàng NHẬN. Chạm 1 ô → hộp thông tin (tên, loại, mô tả).
//  • Chỉ hiện, không thêm phần thưởng. Tắt: window.QUA307=false.
const QUA307=(()=>{
 const on=()=>window.QUA307!==false;
 const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 const fmt=n=>Math.round(n||0).toLocaleString('vi-VN');
 const inPlay=()=>{try{return ['play','pause'].includes(mode);}catch{return false;}};
 let bag=null,tm=null,el=null,list=[];
 const INFO={gem:['Kim cương','Tiền tệ hiếm','Dùng mua lượt, làm mới cửa hàng, mở rương.'],
  cr:['Hợp kim','Tiền tệ','Tiền tệ chính: tiến khung, nâng bậc, nâng phi công, cửa hàng.'],
  tk:['Vé càn quét','Tiêu hao','Càn quét nhanh ải đã đạt 3 sao.'],en:['Thể lực','Tiêu hao','Cần để vào ải chiến dịch.'],
  core:['Lõi Siêu Hợp','Nguyên liệu','Tiến bậc phi công Tím / Tím+5, cây tiềm năng.'],
  copy:['Bản sao','Nguyên liệu','Nguyên liệu tiến khung cho đúng mẫu.'],gear:['Trang bị','Trang bị','Mặc vào ô trang bị, hoặc làm vật liệu nâng cấp cùng mẫu / hợp thành.']};
 function push(key,o){if(!bag)return;const k=key+(o.sub||'');const x=bag.find(b=>b.k===k);if(x){x.n+=o.n||1;return;}bag.push(Object.assign({k,type:key,n:o.n||1},o));}
 function wrap(obj,fn,cb){try{if(!obj||typeof obj[fn]!=='function'||obj[fn].__q307)return;const o=obj[fn];const f=function(){const r=o.apply(this,arguments);try{if(bag)cb(arguments,r);}catch{}return r;};f.__q307=1;obj[fn]=f;}catch{}}
 function hook(){
  try{wrap(Econ74,'add',a=>{if(a[0]>0)push('gem',{n:a[0]|0});});}catch{}
  try{wrap(Progress,'grantCredits',a=>{if(a[0]>0)push('cr',{n:a[0]|0});});}catch{}
  try{wrap(XPDA307,'add',a=>{if(a[1]>0)push('xp',{sub:a[0],t:a[0],n:a[1]|0});});}catch{}
  try{wrap(V75,'addTk',a=>{if(a[0]>0)push('tk',{n:a[0]|0});});}catch{}
  try{wrap(V75,'addEn',a=>{if(a[0]>0)push('en',{n:a[0]|0});});}catch{}
  try{wrap(Meta407,'addCores',a=>{if(a[0]>0)push('core',{n:a[0]|0});});}catch{}
  try{wrap(Evo82,'addCopy',(a,r)=>{if(r)push('copy',{sub:r.k+':'+r.m+':'+r.t,c:r});});}catch{}
  try{wrap(Progress,'grantChestGear',(a,r)=>{if(r)push('gear',{sub:r.id,it:r});});}catch{}}
 hook();setTimeout(hook,3000);setTimeout(hook,8000);
 const RX=/NHẬN|ĐIỂM DANH|LĨNH|MỞ RƯƠNG|MỞ QUÀ/i;
 document.addEventListener('click',e=>{if(!on()||inPlay()||bag)return;const b=e.target.closest&&e.target.closest('button,[role=button],.btn');if(!b||!RX.test(b.textContent||''))return;if(b.closest('#q307,#nc307,#k307'))return;
  bag=[];hook();clearTimeout(tm);tm=setTimeout(()=>{const got=bag;bag=null;if(got&&got.length)show(got);},700);},true);
 // ---------- hiển thị ----------
 const TC=['#d6e0ea','#3ee08f','#3aa8ff','#b45cff'];
 function frameOfCopy(t){return t>=6?3:t>=2?2:t>=1?1:0;}
 function cell(x,i){let ic='',nm='',col='#7fdcff';
  if(x.type==='gem'){ic='<i class="g">💎</i>';nm='Kim cương';col='#7fe6ff';}
  else if(x.type==='cr'){ic='<i class="c">◈</i>';nm='Hợp kim';col='#ffd166';}
  else if(x.type==='xp'){let N='Đá XP',C='#8fd6ff';try{N=XPDA307.NAME[x.t];C=XPDA307.COL[x.t];}catch{}ic=`<i class="d" style="--g:${C}"></i>`;nm=N;col=C;}
  else if(x.type==='tk'){ic='<i class="c">🎫</i>';nm='Vé càn quét';}
  else if(x.type==='en'){ic='<i class="c">⚡</i>';nm='Thể lực';col='#5ce39a';}
  else if(x.type==='core'){ic='<i class="c">✪</i>';nm='Lõi Siêu Hợp';col='#c77dff';}
  else if(x.type==='copy'){const c=x.c||{};col=TC[frameOfCopy(c.t|0)];let n='';try{n=c.k==='craft'?(crafts[c.m]||{}).name:(GearCatalog[c.m]||{}).name;}catch{}
   let tn='';try{tn=TIER70.name[c.t|0];}catch{}nm='Bản sao '+tn+(n?' · '+n:'');let src='';try{if(c.k==='craft'){const S=SHIP118[c.m];src=S&&(S.lam||S.thuong);}}catch{}
   ic=src?`<img src="${src}" alt="">`:(c.k==='gear'?(()=>{try{return String(Progress.art({kind:GearCatalog[c.m].kind,variant:c.m,grade:'',rank:'',level:1})).replace(/<b>[\s\S]*?<\/b>/g,'');}catch{return '<i class="c">❖</i>';}})():'<i class="c">❖</i>');}
  else if(x.type==='gear'){const it=x.it;try{nm=Progress.title(it).split(' · ')[0];ic=String(Progress.art(it)).replace(/<b>[\s\S]*?<\/b>/g,'');col=V70C(it);}catch{nm='Trang bị';}}
  x._nm=nm;x._col=col;
  return `<button class="q307-it" data-q="i" data-i="${i}" style="--c:${col};--d:${(i*0.12).toFixed(2)}s"><span class="q307-f">${ic}<b>${x.n>1||['gem','cr','xp','tk','en','core'].includes(x.type)?fmt(x.n):''}</b></span><small>${esc(nm)}</small></button>`;}
 function show(items){if(!on())return;list=items;
  if(!el){el=document.createElement('div');el.id='q307';el.addEventListener('click',click);document.body.appendChild(el);}
  el.innerHTML=`<div class="q307-in"><div class="q307-em"><i></i><b>CHÚC MỪNG NHẬN ĐƯỢC</b></div><div class="q307-grid">${items.map(cell).join('')}</div><button class="q307-ok" data-q="ok">NHẬN</button><div class="q307-pop" hidden></div></div>`;
  el.classList.add('open');try{Audio393.sfx('pickup');}catch{}}
 function click(e){const b=e.target.closest('[data-q]');if(!b)return;const q=b.dataset.q;const pop=el.querySelector('.q307-pop');
  if(q==='ok'){el.classList.remove('open');return;}
  if(q==='x'){pop.hidden=true;return;}
  if(q==='i'){const x=list[+b.dataset.i];const I=INFO[x.type]||(x.type==='xp'?[x._nm,'Tiêu hao','Nâng Level trang bị và chiến cơ ('+(()=>{try{return XPDA307.XP[x.t]+' XP / viên';}catch{return '';}})()+').']:[x._nm,'','']);
   pop.innerHTML=`<div class="q307-card" style="--c:${x._col}"><button data-q="x" aria-label="Đóng">✕</button><div class="q307-ch">${b.querySelector('.q307-f').innerHTML}</div><div><b>${esc(x._nm||I[0])}</b><small>Loại: ${esc(I[1])}</small></div><p>${esc(I[2])}</p></div>`;pop.hidden=false;}}
 return {show,_bag:()=>bag};
})();
