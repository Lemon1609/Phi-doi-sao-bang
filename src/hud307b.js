'use strict';
// V307 · A2: bật lớp CSS thanh máu/Bạo Tẩu kiểu neon (hud307b.css). Tắt: window.HUD307B=false
(()=>{function s(){document.documentElement.classList.toggle('hud307b',window.HUD307B!==false);}s();setInterval(s,1500);})();
