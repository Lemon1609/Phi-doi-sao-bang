'use strict';
// V307 · ĐỒNG BỘ GIAO DIỆN THEO TRANH GPT B9 (18/11/2026)
//  • Thay bộ biến khung chung --u18-* (dùng khắp game): nút phụ → nút xanh lam B9 (thường / nhấn / khóa), tab nhỏ → tab ngang B9,
//    nút ✕ → nut_dong B5, khung panel → khung hộp B6, thanh tiêu đề → thanh B9. Ảnh đã ghép 9-slice đúng kích thước gốc (claude_tools/chin_o.py).
//  • Thanh đầu màn phụ (#hub40 .hb-top) + đầu bản đồ (#cmap .cm-head) dùng thanh tiêu đề B9; nút ‹ › chương dùng nut_quay_lai.
//  • Màn Rương: băng tranh + 3 rương (trang bị / chiến cơ / boss).
//  • Tắt: window.B9307=false.
(function(){
 const I=window.B9307_IMG||{};if(!I.sec)return;
 const u=k=>'url('+I[k]+')';
 const st=document.createElement('style');st.id='b9307-var';
 st.textContent='html.b9307{--u18-sec:'+u('sec')+';--u18-sec-p:'+u('sec_p')+';--u18-sec-d:'+u('sec_d')+';--u18-chip:'+u('chip')+';--u18-chip-on:'+u('chip_on')+';--u18-x:'+u('x')+';--u18-x-p:'+u('x')+';--u18-close:'+u('x')+';--u18-panel:'+u('panel')+';--u18-title:'+u('title')+';--b9-head:'+u('head')+';--b9-back:'+u('back')+'}';
 document.head.appendChild(st);
 const R=[['ruong_trang_bi','RƯƠNG TRANG BỊ','70% mỗi boss Vô tận'],['ruong_chien_co','RƯƠNG CHIẾN CƠ','30% mỗi boss Vô tận'],['ruong_boss','RƯƠNG BOSS','Bậc A: 2 phôi']];
 function tick(){const on=window.B9307!==false;document.documentElement.classList.toggle('b9307',on);if(!on)return;
  const c=document.getElementById('chest-lab');if(c&&c.getClientRects().length&&!c.querySelector('.b9r')){
   const d=document.createElement('div');d.className='b9r';
   d.innerHTML=`<img class="b9r-ban" src="${I.bang_ruong}" alt=""><div class="b9r-row">${R.map(r=>`<div class="b9r-c"><img src="${I[r[0]]}" alt=""><b>${r[1]}</b><small>${r[2]}</small></div>`).join('')}</div>`;
   c.insertBefore(d,c.firstChild);}}
 tick();setInterval(()=>{try{tick();}catch{}},400);
})();
