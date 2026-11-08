// V88 · CHỦ DỰ ÁN 26/10: BỎ CÁC DẢI CHỮ THÔNG BÁO TRONG TRẬN, chỉ giữ thông báo boss xuất hiện.
//  • Trong trận (đang chơi/tạm dừng): mọi toast bị chặn trừ "BOSS SẮP XUẤT HIỆN"; dòng chữ "boss đang tiến vào" và thoại boss vẫn giữ.
//  • Tắt dải WARNING khi boss tụ tuyệt kỹ (vùng nguy hiểm đỏ vẫn còn), dải cut-in THỨC TỈNH (sóng xung kích vẫn còn),
//    nhãn ▼ PHÁ CÁNH / KHIÊN CÁNH / NỨT GIÁP, tên kỹ năng SSS. Ngoài trận (sảnh, màn thưởng) thông báo giữ nguyên.
//  Bật lại: window.MSG88=false
const Msg88=(()=>{
 const on=()=>window.MSG88!==false;
 const inBattle=()=>{try{return mode==='play'||mode==='pause';}catch{return false;}};
 const KEEP=/BOSS SẮP XUẤT HIỆN/;let n=0,last='';
 function hook(){try{if(typeof toast!=='function'||toast.__m88)return;const o=toast;const f=function(s){try{if(on()&&inBattle()&&!KEEP.test(String(s))){n++;last=String(s);return;}}catch{}return o.apply(this,arguments);};f.__m88=1;window.toast=f;try{toast=f;}catch{}}catch{}}
 hook();setTimeout(hook,600);setInterval(hook,2000);
 return {on,quiet:()=>on()&&inBattle(),state:()=>({blocked:n,last})};
})();
window.Msg88=Msg88;
