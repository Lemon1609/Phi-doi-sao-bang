'use strict';
// V307 · TRANH GPT B10 (bản thử, 18/11/2026): ô ải bản đồ, nhãn ải, nút Tuần tra, thanh máu boss, bảng điểm, nút tạm dừng / tên lửa / kỹ năng,
//  ô chức năng sảnh (cot307 + nút hai bên), ô chọn chiến cơ, thanh tab đáy. Thanh máu / Bạo Tẩu người chơi vẽ trên canvas → chưa thay (cần sửa mã vẽ).
//  Tắt: window.B10307=false.
(function(){
 const I=window.B10307_IMG||{};if(!I.do_ai_thuong)return;
 const st=document.createElement('style');st.id='b10307-var';
 st.textContent='html.b10307{'+Object.keys(I).map(k=>'--x10-'+k.replace(/_/g,'-')+':url('+I[k]+')').join(';')+'}';
 document.head.appendChild(st);
 const t=()=>document.documentElement.classList.toggle('b10307',window.B10307!==false);t();setInterval(t,1000);
})();
