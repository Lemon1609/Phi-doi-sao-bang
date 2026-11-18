'use strict';
// V307 · TRANH GPT B11 (bản thử, 18/11/2026): nền sảnh (thay nền SVG sanh307), nút XUẤT KÍCH / VÔ TẬN, vòng quay (vành, kim, nút QUAY giữa).
//  Ô thưởng hình quạt GPT chỉ ~19° (cần 36°) → giữ 10 ô vẽ bằng mã (conic-gradient) bên trong vành.
//  Tắt: window.B11307=false.
(function(){
 const I=window.B11307_IMG||{};if(!I.nen_sanh)return;
 const st=document.createElement('style');st.id='b11307-var';
 st.textContent='html.b11307{'+Object.keys(I).map(k=>'--x11-'+k.replace(/_/g,'-')+':url('+I[k]+')').join(';')+'}';
 document.head.appendChild(st);
 const t=()=>document.documentElement.classList.toggle('b11307',window.B11307!==false);t();setInterval(t,1000);
})();
