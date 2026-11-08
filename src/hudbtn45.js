'use strict';
// V45 · nút tạm dừng: game chỉ đổi chữ (Ⅱ ↔ ▶) → gắn data-ic để CSS vẽ đúng icon (tạm dừng / tiếp tục)
(()=>{const b=document.getElementById('pause');if(!b)return;
 const sync=()=>{const ic=(b.textContent||'').includes('▶')?'play':'pause';if(b.dataset.ic!==ic)b.dataset.ic=ic;};
 sync();new MutationObserver(sync).observe(b,{childList:true,characterData:true,subtree:true});})();
