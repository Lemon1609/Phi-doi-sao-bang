'use strict';
// V307 · Truyện của từng chiến cơ nằm ngay trong màn Chiến cơ (nút 📖 TRUYỆN trên khung xem tàu), thay cho nút TRUYỆN riêng ở sảnh.
// Dùng lại thẻ truyện Story259 (có nút ‹ › xem tàu khác). Phi công / robot: chưa có lời truyện nên chưa có nút (chờ nội dung). Tắt: window.TRUYEN307=false
(()=>{try{
 const st=document.createElement('style');
 st.textContent='html body #sto259-b{display:none!important}'+
 '.hb-stage .tr307{position:absolute;right:8px;top:36px;z-index:3;display:flex;align-items:center;gap:5px;padding:5px 10px 5px 8px;border-radius:9px;border:1.5px solid #ffd56a;background:linear-gradient(180deg,#f0a21a,#b86a00);color:#fff;font:800 11px/1 "Be Vietnam Pro",sans-serif;letter-spacing:.04em;text-shadow:0 1px 2px #5a3000;box-shadow:0 0 10px rgba(255,170,40,.45);cursor:pointer}'+
 '.hb-stage .tr307 svg{width:15px;height:15px;fill:none;stroke:#fff;stroke-width:2;stroke-linejoin:round}.hb-stage .tr307:active{transform:translateY(1px);filter:brightness(.88)}';
 document.head.appendChild(st);
 const BOOK='<svg viewBox="0 0 24 24"><path d="M4 5.5c2.6-1.3 5.3-1.3 8 0v13c-2.7-1.3-5.4-1.3-8 0z"/><path d="M12 5.5c2.6-1.3 5.3-1.3 8 0v13c-2.7-1.3-5.4-1.3-8 0z"/></svg>';
 function tick(){
  if(window.TRUYEN307===false)return;
  const stg=document.querySelector('.hb-stage');if(!stg||!stg.offsetParent)return;
  const strip=document.getElementById('hb-strip');if(!strip)return;
  let b=stg.querySelector('.tr307');
  if(!b){b=document.createElement('button');b.type='button';b.className='tr307';b.innerHTML=BOOK+'TRUYỆN';b.setAttribute('aria-label','Đọc truyện chiến cơ');
   b.addEventListener('click',e=>{e.stopPropagation();const c=strip.querySelector('[aria-current="true"]');const i=c?+c.dataset.c:0;try{Story259.show(i);}catch{}});stg.appendChild(b);}
 }
 setInterval(tick,500);
}catch(e){console.warn('TRUYEN307',e);}})();
