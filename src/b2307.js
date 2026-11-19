'use strict';
// V307 · B2: đồng bộ Chợ Đen / thẻ ải / sự kiện tuần + nút tạm dừng / hồi sinh (b2307.css); sửa câu hồi sinh còn chữ "giáp" (đã bỏ giáp từ V78). Tắt: window.B2307=false
(()=>{function s(){const on=window.B2307!==false;document.documentElement.classList.toggle('b2307',on);if(!on)return;
 const ov=document.getElementById('overlay');if(ov&&!ov.hidden){for(const p of ov.querySelectorAll('p,div,span')){if(p.children.length)continue;const t=p.textContent;if(t.includes('đầy máu và giáp'))p.textContent=t.replace('đầy máu và giáp','đầy máu');}}}
 s();setInterval(s,400);})();
