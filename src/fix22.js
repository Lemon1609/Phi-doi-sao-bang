'use strict';
// V2.2.1 · SỬA NHẢY MÀN (máy thật V2.2.0.43). Tắt cả: window.FIX22=false; từng phần: MIS22 / MAP22
//  • NHIỆM VỤ / MÙA GIẢI: băng tranh (tranh307, vòng 400 ms) và thẻ Chiến lệnh (l11309, vòng 250 ms) trước đây chèn sau khi danh sách đã hiện
//    → danh sách bị đẩy tụt. Nay chèn ngay khi hộp mở / vẽ lại (bọc Q77.open + MutationObserver trên hộp, chạy trước khung vẽ kế tiếp).
const FIX22=(()=>{
 const on=k=>window.FIX22!==false&&window[k]!==false;
 const tr=f=>{try{return f();}catch(e){return undefined;}};
 // ---------- NHIỆM VỤ ----------
 const syncMis=()=>{tr(()=>Tranh307.banners());tr(()=>L11309.seasonCard());};
 const seen=new WeakSet();
 function watch(){for(const el of document.querySelectorAll('.m63.q77p,.m63.s77p')){if(seen.has(el))continue;seen.add(el);
   new MutationObserver(()=>{if(on('MIS22')&&!el.hidden)syncMis();}).observe(el,{childList:true,subtree:true,attributes:true,attributeFilter:['hidden']});}}
 function hookQ(){if(typeof Q77==='undefined'||Q77.__f22)return false;const o=Q77.open;Q77.open=function(){const r=o.apply(this,arguments);if(on('MIS22')){watch();syncMis();}return r;};Q77.__f22=1;
  if(typeof S77!=='undefined'&&!S77.__f22){const o2=S77.open;S77.open=function(){const r=o2.apply(this,arguments);if(on('MIS22')){watch();syncMis();}return r;};S77.__f22=1;}return true;}
 let n=0;const iv=setInterval(()=>{if(hookQ()||++n>40)clearInterval(iv);},250);
 // ---------- BẢN ĐỒ CHỌN ẢI (tin 24/11 17:43) ----------
 //  (1) Kéo > 10 px tính từ lúc chạm → hủy cú chạm (không mở thẻ ải / không xuất kích).
 //  (2) Khóa xuất kích 400 ms: chạm đôi / touchend + click không thể vào trận 2 lần.
 //  (3) 3 s sau khi vào trận: chặn Lobby.show / ChapterMap.open / Nav74.tab|page / End78.goLobby / Hangar41.open nếu đang 'play'
 //      (nguồn "vừa vào trận đã bị kéo về menu"); mỗi lần chặn ghi tên + ngăn xếp vào FIX22.blocked() để chẩn đoán máy thật.
 let launchAt=-1e9,lockUntil=0;const blocked=[];const inPlay=()=>{try{return mode==='play'||mode==='pause';}catch{return false;}};
 let userAt=-1e9;for(const t of ['pointerdown','keydown','touchstart'])document.addEventListener(t,e=>{if(e.isTrusted)userAt=performance.now();},{capture:true,passive:true});
 const guardOn=()=>on('MAP22')&&inPlay()&&performance.now()-launchAt<3000&&performance.now()-userAt>800;/* lệnh đi kèm cú chạm thật (≤0,8 s) luôn được cho qua, ví dụ bấm VỀ SẢNH trong menu tạm dừng */
 function guard(obj,name,label){try{if(!obj||typeof obj[name]!=='function'||obj[name].__g22)return;const o=obj[name];
   const f=function(){if(guardOn()){blocked.push({f:label,t:Math.round(performance.now()-launchAt),s:(new Error().stack||'').split('\n').slice(2,5).join(' | ')});if(blocked.length>20)blocked.shift();return;}return o.apply(this,arguments);};
   for(const k of Object.keys(o))try{f[k]=o[k];}catch{}f.__g22=1;obj[name]=f;}catch{}}
 function hookGuards(){tr(()=>guard(Lobby,'show','Lobby.show'));tr(()=>guard(ChapterMap,'open','ChapterMap.open'));tr(()=>guard(Nav74,'tab','Nav74.tab'));tr(()=>guard(Nav74,'page','Nav74.page'));
  tr(()=>guard(End78,'goLobby','End78.goLobby'));tr(()=>guard(Hangar41,'open','Hangar41.open'));}
 let drag=null;
 const pt=e=>e.touches&&e.touches[0]?e.touches[0]:e.changedTouches&&e.changedTouches[0]?e.changedTouches[0]:e;
 function down(e){if(!on('MAP22'))return;if(!e.target.closest||!e.target.closest('#cmap'))return;const p=pt(e);drag={x:p.clientX,y:p.clientY,mv:0};}
 function move(e){if(!drag)return;const p=pt(e);const d=Math.hypot(p.clientX-drag.x,p.clientY-drag.y);if(d>drag.mv)drag.mv=d;}
 function clickCap(e){if(!on('MAP22'))return;const t=e.target;if(!t.closest)return;
  if(t.closest('#cmap')&&drag&&drag.mv>10&&t.closest('#cmap .cm-world,#cmap .cm-node')){e.stopImmediatePropagation();e.preventDefault();drag=null;return;}
  const go=t.closest('#cmap .cm-go,#start,.go10,[data-l9b=quick]');
  if(go&&e.isTrusted){const now=performance.now();if(now<lockUntil){e.stopImmediatePropagation();e.preventDefault();return;}lockUntil=now+400;
   if(go.id==='start'||go.closest('#cmap')){const mp=document.getElementById('cmap');if(mp){mp.style.pointerEvents='none';setTimeout(()=>{mp.style.pointerEvents='';},400);}}}
  if(t.closest('#cmap'))setTimeout(()=>{drag=null;},0);}
 document.addEventListener('pointerdown',down,true);document.addEventListener('touchstart',down,{capture:true,passive:true});
 document.addEventListener('pointermove',move,{capture:true,passive:true});document.addEventListener('touchmove',move,{capture:true,passive:true});
 document.addEventListener('click',clickCap,true);
 // ghi mốc vào trận: lúc mode chuyển sang play (kiểm 4 lần/khung không cần — dùng rAF nhẹ 10 Hz)
 let lastM='';setInterval(()=>{let m='';try{m=mode;}catch{}if(m==='play'&&lastM!=='play'&&lastM!=='pause')launchAt=performance.now();lastM=m;hookGuards();},100);
 return {syncMis,blocked:()=>blocked.slice(),launchAt:()=>launchAt};
})();
