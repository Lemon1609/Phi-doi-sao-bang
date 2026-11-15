'use strict';
// V306u · thanh chỉ số (.hb-bar): copy độ rộng phần lấp sang biến --p để CSS vẽ ảnh thanh neon cắt theo %. Không đổi số liệu.
(()=>{try{
 function run(){document.querySelectorAll('.hb-bar').forEach(b=>{const i=b.querySelector('i');if(!i)return;const w=i.style.width||'0%';if(b.style.getPropertyValue('--p')!==w)b.style.setProperty('--p',w);});}
 new MutationObserver(()=>setTimeout(run,0)).observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['style']});run();
}catch(e){}})();
