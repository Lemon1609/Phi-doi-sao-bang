// V307 · chi tiết trang bị gọn: gập mô tả + nội tại, một nút chính (nâng cấp / nâng khung), nút phụ nhỏ. Tắt: window.HB307=false
(function(){if(window.HB307===false)return;
function fix(){document.querySelectorAll('.hb-sheet.open').forEach(function(sh){
 var d=sh.querySelector(':scope>p.hb-desc');
 if(d&&!(d.parentElement&&d.parentElement.classList.contains('hb307d'))){var det=document.createElement('details');det.className='hb307d';det.innerHTML='<summary>ⓘ Chi tiết kỹ năng</summary>';d.before(det);det.appendChild(d);var ev=sh.querySelector(':scope>.ev209');if(ev)det.appendChild(ev);}
 var a=sh.querySelector('.hb-acts');if(!a)return;var bs=[].slice.call(a.querySelectorAll('button'));
 var up=bs.find(function(b){return /^\s*NÂNG CẤP/i.test(b.textContent)&&!/Đạt trần/i.test(b.textContent);})||bs.find(function(b){return /^\s*NÂNG KHUNG/i.test(b.textContent)&&!/tối đa/i.test(b.textContent);});
 bs.forEach(function(b){b.classList.toggle('pri307',b===up);});
});}
setInterval(function(){try{fix();}catch(e){}},400);})();
