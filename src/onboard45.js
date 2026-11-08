'use strict';
// V45 · Người chơi mới: bong bóng hướng dẫn (#tutorial392) không hiện chồng lên hộp Điểm danh/Thành tựu (#m40),
// Sảnh SSS hay Xưởng SSS — ẩn tạm khi các lớp đó đang mở, đóng lại thì hiện tiếp. Chỉ đọc DOM, không đụng save.
(()=>{
 const t0=performance.now();
 function covered(){const m=document.getElementById('m40');const cl=document.body.classList;
  return (m&&!m.hidden&&m.childElementCount>0)||cl.contains('ccht-on')||cl.contains('g44-on');}
 function sync(){const c=document.getElementById('tutorial392');if(!c)return;
  // 2,2 s đầu: chờ hộp điểm danh tự bật (Meta40 kiểm tra mỗi 1,5 s) để bong bóng không hiện rồi biến mất
  const hide=performance.now()-t0<2200||covered();if(c.classList.contains('ob45-hide')!==hide)c.classList.toggle('ob45-hide',hide);}
 sync();setInterval(sync,250);
})();
