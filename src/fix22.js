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
 return {syncMis};
})();
