'use strict';
// V208 · G2 (rà soát đồ họa, chủ dự án duyệt 08/11): khung thoại cốt truyện (#st80) không đè lên bảng tổng kết kết quả.
//  Khi thẻ kết quả (#rs) đang hiện → khung thoại chuyển lên mép trên màn hình. Tắt: window.V208=false
(()=>{const on=()=>window.V208!==false;
 setInterval(()=>{try{const rs=document.getElementById('rs'),ov=document.getElementById('overlay');const vis=on()&&rs&&ov&&!ov.hidden&&rs.offsetParent!==null;document.body.classList.toggle('rs208',!!vis);}catch{}},250);
})();
// V208 · D4: nhãn "từ khóa cơ chế" trên chi tiết trang bị, rút tự động từ chính mô tả nội tại / kỹ năng (không thêm số liệu mới).
//  Tắt: window.KW208=false
(()=>{const on=()=>window.V208!==false&&window.KW208!==false;
 const R=[['Theo dõi',/tự khóa|tự dẫn|truy (đuổi|kích|ảnh|tung)|đuổi theo|dẫn đường|khóa mục tiêu|tự tìm/i],['Xuyên',/xuyên/i],['Nổ lan',/nổ|bộc phá|bạo liệt|bạo phát/i],
  ['Làm chậm',/làm chậm|chậm lại|đóng băng|băng giá|giảm tốc/i],['Xích điện',/sét|tia điện nối|nối chuỗi|liên tỏa|lan sang/i],['Hút',/hút|xoáy|hố đen|thôn phệ|hấp dẫn|kéo (địch|quái)/i],
  ['Nảy',/nảy|khúc xạ|chiết xạ|phản xạ|bật lại|dội lại/i],['Chặn đạn',/chặn|đỡ đạn|phá đạn|xóa đạn|hủy đạn/i],['Hồi máu',/hồi (máu|phục|giáp)|tái tạo|hồi sinh/i],
  ['Phản đòn',/phản (chấn|đòn|lại)/i],['Thiêu đốt',/cháy|thiêu|bỏng/i],['Phân tách',/phân (liệt|tách)|tách (đôi|nhỏ|thành)/i],['Hồi hoàn',/hồi hoàn|quay về|bay vòng|hồi toàn/i],['Né tránh',/né|dư ảnh|dịch pha|bất tử|vô hình/i]];
 function kws(t){const o=[];for(const [n,re] of R){if(re.test(t))o.push(n);if(o.length>=4)break;}return o;}
 function chips(L){return `<div class="kw208">${L.map(x=>`<span>${x}</span>`).join('')}</div>`;}
 function apply(){if(!on())return;
  try{const det=document.querySelector('#g44-det .g44-txt');if(det&&!det.querySelector('.kw208')){const h=det.querySelector('h3');const L=kws(det.textContent);if(h&&L.length)h.insertAdjacentHTML('afterend',chips(L));}}catch{}
  try{document.querySelectorAll('[data-item]').forEach(sh=>{if(sh.querySelector('.kw208'))return;const d=sh.querySelector('p.hb-desc');const h=sh.querySelector('h3');if(!d||!h)return;let t=d.textContent;try{const it=Progress.v70.get(sh.dataset.item);const g=typeof GEAR_FX!=='undefined'&&GEAR_FX.data?GEAR_FX.data.find(x=>x.id===it.variant):null;if(g){t+=' '+JSON.stringify([g.trait&&g.trait.lv&&g.trait.lv[0],g.skill&&g.skill.effect]);}}catch{}const L=kws(t);if(L.length)h.insertAdjacentHTML('afterend',chips(L));});}catch{}}
 try{new MutationObserver(()=>apply()).observe(document.body,{childList:true,subtree:true});}catch{}
})();
