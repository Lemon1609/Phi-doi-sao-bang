// V138 · tồn từ REVIEW122 (sửa bằng code)
//  (1) Kho trang bị: tàu nằm trên, 3 ô Giáp · Tên lửa · Vũ khí phụ xếp MỘT HÀNG bên dưới
//  (3) Chợ Đen / Trạm giao dịch: làm mờ đáy danh sách khi còn hàng bên dưới; cuộn tới cuối thì tắt mờ
//  (2) viên "Giải cứu" gần boss: kén đồng minh đã bỏ ở V134 (RESCUE134) → không còn xuất hiện, không cần sửa
//  Tắt từng phần: window.DOLL138=false · window.FADE138=false
(()=>{
  const root=document.documentElement;
  const st=document.createElement('style');st.id='v138-css';st.textContent=
   // (1) lưới 3 cột: hàng 1 = tàu (trải 3 cột), hàng 2 = 3 ô trang bị theo thứ tự DOM (giáp, tên lửa, vũ khí phụ)
   `html:not(.off138-doll) body .hb-doll{grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:6px 8px!important;align-items:stretch!important}`+
   `html:not(.off138-doll) body .hb-doll .hb-ship{grid-row:1!important;grid-column:1/-1!important;height:150px!important}`+
   `html:not(.off138-doll) body .hb-doll .hb-slot{min-height:0!important;padding-bottom:6px!important}`+
   `html:not(.off138-doll) body .hb-doll .hb-slot b{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}`+
   // (3) dải mờ dính đáy khung cuộn; chỉ hiện khi còn nội dung bên dưới (lớp .f138)
   `html body .tr67-wrap::after{content:'';display:block;position:sticky;bottom:var(--f138b,0px);height:48px;margin:-48px -16px 0;pointer-events:none;z-index:3;opacity:0;transition:opacity .2s;`+
     `background:linear-gradient(180deg,rgba(7,18,32,0),rgba(7,18,32,.78) 55%,rgba(6,15,28,.97))}`+
   `html:not(.off138-fade) body .tr67-wrap.f138::after{opacity:1}`+
   // V142 · (REVIEW122 'khung thừa dưới nút NÂNG CẤP') chip VÒNG QUAY / PHÓ BẢN GIỚI HẠN đè hàng nút cuối màn trưng bày VKTT → ẩn khi màn đó mở
   `html:not(.off142-chip) body:has(.sr-bot) .n74c{display:none!important}`;
  document.head.appendChild(st);
  function flags(){root.classList.toggle('off142-chip',window.CHIP142===false);root.classList.toggle('off138-doll',window.DOLL138===false);root.classList.toggle('off138-fade',window.FADE138===false);}
  // dải dính đáy vùng nội dung → bù phần đệm đáy (v117 đặt 58px) để dải nằm sát mép khung
  function upd(w){try{const more=w.scrollHeight-w.scrollTop-w.clientHeight>8;w.classList.toggle('f138',more);
    const pb=-(parseFloat(getComputedStyle(w).paddingBottom)||0)+'px';if(w.style.getPropertyValue('--f138b')!==pb)w.style.setProperty('--f138b',pb);}catch{}}
  document.addEventListener('scroll',e=>{const t=e.target;if(t&&t.classList&&t.classList.contains('tr67-wrap'))upd(t);},true);
  setInterval(()=>{flags();for(const w of document.querySelectorAll('.tr67-wrap'))if(w.offsetParent)upd(w);},400);
  flags();
})();
