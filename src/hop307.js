'use strict';
// V307 · HỘP THOẠI CHUNG (tranh GPT B5, 18/11/2026): khung hộp thoại có thanh tiêu đề, nút đóng vuông, nút tím phụ (thường / nhấn / khóa).
//  Áp cho: hộp .m63 (≈60 hộp thoại cũ: tiêu đề .m63-eye + h3 nằm trong thanh tiêu đề), hộp hỏi xác nhận của Nâng cấp / Túi đồ.
//  Nút .m63-go phụ (ĐÓNG, ĐÃ HIỂU, VỀ…, HỦY, THÔI) chuyển sang nút tím; nút chính giữ vàng như game cùng thể loại.
//  Tắt: window.HOP307=false.
(function(){
 const I=window.HOP307_IMG||{};if(!I.hop_thoai)return;
 const u=k=>'url('+I[k]+')';
 const st=document.createElement('style');st.id='hop307-var';
 st.textContent=':root{--h7-hop:'+u('hop_thoai')+';--h7-x:'+u('nut_dong')+';--h7-t:'+u('nut_tim')+';--h7-tn:'+u('nut_tim_nhan')+';--h7-tk:'+u('nut_tim_khoa')+'}';
 document.head.appendChild(st);
 const SEC=/^\s*(ĐÓNG|ĐÃ HIỂU|VỀ\b|HỦY|THÔI|ĐỂ SAU|QUAY LẠI|BỎ QUA|KHÔNG)/i;
 function tick(){const on=window.HOP307!==false;document.documentElement.classList.toggle('hop307',on);if(!on)return;
  document.querySelectorAll('.m63 .m63-go:not([data-h7]),.m63 .adv-x:not([data-h7])').forEach(b=>{b.dataset.h7='1';if(SEC.test(b.textContent||''))b.classList.add('h307s');});
  document.querySelectorAll('.m63 .m63-card').forEach(c=>{const f=c.firstElementChild;const has=!!c.querySelector(':scope>.m63-eye,:scope>h3,:scope>.m63-top');c.classList.toggle('h307nt',!has);});}
 tick();setInterval(()=>{try{tick();}catch{}},350);
})();
