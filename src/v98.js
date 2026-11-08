'use strict';
// V98 · Gemini REVIEW97
//  §2 Sảnh: đã mở Viễn chinh thì cột trái bỏ ô GIAO DỊCH/CHỢ ĐEN (đã có trong tab CỬA HÀNG) — sửa trong lobby74.js
//     · chấm đỏ tab PHI ĐỘI / TRANG BỊ: chỉ khi chiến cơ ĐANG LÁI hoặc trang bị ĐANG MẶC đủ điều kiện nâng khung, hoặc còn ô trang bị trống
//  §3.1 Độ nhạy kéo tàu bằng cảm ứng: 1,0× · 1,2× (mặc định) · 1,4× (khóa mới saobang-touch98). Chuột giữ 1,0×.
//     (Game kéo tàu theo độ lệch ngón tay, không đặt tàu dưới ngón → không cần "đệm ngón tay +32 px"; tự tạm dừng khi mất tiêu điểm đã có từ V39.)
//  §3.2 Thanh nguồn sát thương ở màn kết quả: Chiến cơ · Trang bị · Đồng đội · Kỹ năng + tổng / trung bình ST/s / thời gian.
//  Tắt: window.V98=false
const V98=(()=>{
 const on=()=>window.V98!==false;const fmt=n=>Math.round(n).toLocaleString('vi-VN');const g=f=>{try{return f();}catch{return null;}};
 // ---------- §3.1 độ nhạy ----------
 const TK='saobang-touch98';let T={sens:1.2};try{Object.assign(T,JSON.parse(localStorage.getItem(TK)||'{}'));}catch{}
 const saveT=()=>{try{localStorage.setItem(TK,JSON.stringify(T));}catch{}};
 window.SENS98=e=>(on()&&e&&e.pointerType==='touch')?(+T.sens||1):1;
 function sensUI(){
  // V107: trong bảng CÀI ĐẶT (.st66) đặt thành mục riêng, không chen vào hàng âm thanh (bị tràn mất)
  try{const card=document.querySelector('.st66 .m63-card');if(card&&card.offsetParent&&!card.querySelector('[data-sn107]')){const box=document.createElement('div');box.dataset.sn107=1;
   const paint=()=>{box.innerHTML='<div class="st66-l">ĐỘ NHẠY KÉO TÀU</div><p class="st66-now" style="margin:2px 0 6px">Ngón tay di chuyển 1 cm thì tàu đi xa hơn bao nhiêu. Thấy tàu chậm chạp thì chọn cao hơn.</p><div class="st66-row" style="display:flex;gap:6px">'+[1,1.2,1.4].map(v=>`<button data-sn98="${v}" aria-pressed="${T.sens==v}" style="flex:1;${T.sens==v?'border-color:#46ffb2;color:#46ffb2':''}">${v==1?'CHUẨN 1×':v==1.2?'NHANH 1,2×':'RẤT NHANH 1,4×'}</button>`).join('')+'</div>';};
   paint();box.addEventListener('click',e=>{const x=e.target.closest('[data-sn98]');if(!x)return;e.stopPropagation();T.sens=+x.dataset.sn98;saveT();paint();});
   const ls=[...card.querySelectorAll('.st66-l')];const scr=ls.find(l=>/màn hình/i.test(l.textContent));if(scr)scr.before(box);else{const btns=card.querySelector('.m63-btns');card.insertBefore(box,btns);}}}catch{}
  for(const b of document.querySelectorAll('[data-px="music393"],#music393')){if(!b.offsetParent||b.closest('.st66'))continue;const host=b.parentElement;if(!host||host.querySelector('.sn98'))continue;
   const w=document.createElement('div');w.className='sn98';w.style.cssText='display:flex;align-items:center;gap:4px;margin:4px 0 6px;font-size:11px;color:#bfe3ff;width:100%';
   const paint=()=>{w.innerHTML='☝ Độ nhạy kéo tàu '+[1,1.2,1.4].map(v=>`<button data-sn98="${v}" style="flex:1;padding:4px 0;font-size:11px;font-weight:800;border-radius:6px;border:1px solid ${T.sens==v?'#46ffb2':'#3e6f98'};background:${T.sens==v?'rgba(20,70,50,.85)':'rgba(11,29,51,.85)'};color:#e8f4ff">${String(v).replace('.',',')}×</button>`).join('');};
   paint();w.addEventListener('click',e=>{const x=e.target.closest('[data-sn98]');if(!x)return;e.stopPropagation();T.sens=+x.dataset.sn98;saveT();paint();});
   const mv=host.querySelector('.mv96');(mv||b).after(w);}}
 // ---------- §2 chấm đỏ tab ----------
 const ready=(k,ref)=>{try{const q=V70.req(k,ref);return !!q&&V70.lacks(q).length===0;}catch{return false;}};
 function dots(){try{const F=Nav74.F;if(F.__v98)return;F.__v98=1;const o1=F.ships.dot,o2=F.armory.dot;
   F.ships.dot=()=>{if(!on())return o1&&o1();let c=0;try{c=selected|0;}catch{}return ready('craft',c);};
   F.armory.dot=()=>{if(!on())return o2&&o2();try{const eq=Progress.v70.equipped()||{};const ids=Object.values(eq).filter(Boolean);if(ids.length<3)return true;return ids.some(id=>ready('gear',id));}catch{return false;}};}catch{}}
 // ---------- §3.2 nguồn sát thương ----------
 const D={main:0,gear:0,wing:0,skill:0},C={main:['Chiến cơ','#FFB300'],gear:['Trang bị','#29B6F6'],wing:['Đồng đội','#00E676'],skill:['Kỹ năng','#E040FB']};let shown=false,tries98=0;
 function cls(src){if(src==null)return 'main';if(typeof src==='string'){if(src==='wing87')return 'wing';if(src==='gear')return 'gear';return 'skill';}if(src.wing87)return 'wing';if(src.gearKind||src.gear81)return 'gear';if(src.__x85||src.ss90)return 'main';return 'main';}
 function add(src,a){if(!(a>0)||!Number.isFinite(a))return;let m='';try{m=mode;}catch{}if(m!=='play')return;D[cls(src)]+=a;}
 let H={};function hooks(){
  if(!H.b&&typeof window.damageBoss==='function'){H.b=1;const o=window.damageBoss;const f=function(a,src,part){const r=o.apply(this,arguments);try{add(src,Number.isFinite(r)?r:0);}catch{}return r;};window.damageBoss=f;try{damageBoss=f;}catch{}}
  if(!H.r&&g(()=>Report392.hit)){H.r=1;const o=Report392.hit;Report392.hit=function(a,src){try{add(src,a);}catch{}return o.apply(this,arguments);};}
  if(!H.s&&typeof window.reset==='function'){H.s=1;const o=window.reset;const f=function(){for(const k in D)D[k]=0;shown=false;tries98=0;try{document.querySelectorAll('#overlay .dps98').forEach(x=>x.remove());}catch{}return o.apply(this,arguments);};window.reset=f;try{reset=f;}catch{}}}
 function bar(){if(!on()||shown)return;let m='';try{m=mode;}catch{}if(m!=='over'&&m!=='reward')return;const ov=document.getElementById('overlay');if(!ov||ov.hidden)return;
  const tot=D.main+D.gear+D.wing+D.skill;if(!(tot>0))return;shown=true;let sec=1;try{sec=Math.max(1,time||1);}catch{}
  const ks=Object.keys(D).filter(k=>D[k]>0);let pc=ks.map(k=>Math.round(D[k]/tot*100));const diff=100-pc.reduce((a,b)=>a+b,0);if(pc.length){const i=pc.indexOf(Math.max(...pc));pc[i]+=diff;}
  const d=document.createElement('div');d.className='dps98';d.style.cssText='margin:8px 0;padding:8px;border:1px solid #3e6f98;border-radius:8px;background:rgba(8,24,44,.85);font-size:11px;color:#dcecff;text-align:left';
  d.innerHTML=`<b>Tổng ST: ${fmt(tot)}</b> (${fmt(tot/sec)}/s · ${Math.round(sec)}s)<div style="display:flex;height:18px;border-radius:5px;overflow:hidden;margin:5px 0">${ks.map((k,i)=>`<i style="width:${pc[i]}%;background:${C[k][1]}"></i>`).join('')}</div>`+
   `<div style="display:flex;flex-wrap:wrap;gap:8px">${ks.map((k,i)=>`<span><b style="color:${C[k][1]}">■</b> ${C[k][0]} ${pc[i]}%</span>`).join('')}</div>`;
  const rs=document.getElementById('rs');if(rs&&rs.offsetParent)rs.appendChild(d);else{const t=document.getElementById('ovtext');(t||ov.firstElementChild).after(d);}if(!d.offsetParent&&(tries98=(tries98|0)+1)<15){d.remove();shown=false;}}
 function boot(){hooks();dots();}
 boot();setTimeout(boot,900);setTimeout(boot,3200);
 setInterval(()=>{try{sensUI();}catch{}try{bar();}catch{}},400);
 return {state:()=>({D:{...D},sens:T.sens}),D};
})();
window.V98=V98;
