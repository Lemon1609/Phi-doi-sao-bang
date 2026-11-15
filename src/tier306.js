'use strict';
// V306t · ô trang bị theo bậc: gắn data-t306 theo nhãn bậc game đã in (Trắng/Lục/Lam/Tím/Vàng) để CSS đổi khung. Không đổi dữ liệu.
(()=>{try{
 const MAP={'trắng':'xam','lục':'luc','lam':'lam','tím':'tim','vàng':'vang'};
 function run(){
  document.querySelectorAll('.hb-slot:not([data-t306]),.hb-it:not([data-t306])').forEach(e=>{
   const t=[...e.querySelectorAll('b')].map(x=>x.textContent.trim().toLowerCase()).find(x=>MAP[x]);
   if(t)e.setAttribute('data-t306',MAP[t]);
  });
 }
 new MutationObserver(()=>setTimeout(run,0)).observe(document.body,{childList:true,subtree:true});run();
}catch(e){}})();
