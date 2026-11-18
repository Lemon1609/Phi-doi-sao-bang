'use strict';
// V307 · Bong bóng hướng dẫn người mới (#tutorial392) chỉ hiện ở sảnh chính (tab Sảnh, không mở trang/hộp nào).
// Trước đây nó nằm cố định z-index cao nên đè lên Kho, Nâng cấp, Bản đồ, Phó bản... Tắt: window.TUT307=false
(()=>{
 const OV='#k307:not([hidden]),#nc307:not([hidden]),#cmap:not([hidden]),#hub40:not([hidden]),#nav74p:not([hidden]),.m63:not([hidden]),#jr80:not([hidden]),.e74p:not([hidden]),#g74:not([hidden])';
 function vis(e){return e&&e.getClientRects().length>0&&getComputedStyle(e).display!=='none'&&getComputedStyle(e).visibility!=='hidden';}
 function sync(){const c=document.getElementById('tutorial392');if(!c)return;
  let an=false;
  if(window.TUT307!==false){
   try{const s=Nav74.state();an=s.cur!=='home'||!!s.sub;}catch{}
   if(!an)an=[...document.querySelectorAll(OV)].some(vis);
   if(!an)an=document.body.classList.contains('play-screen')||document.body.classList.contains('res78');}
  if(c.classList.contains('tut307-an')!==an)c.classList.toggle('tut307-an',an);}
 setInterval(()=>{try{sync();}catch{}},250);
})();
