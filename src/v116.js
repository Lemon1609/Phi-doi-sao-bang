// V116 · chủ dự án: không chặn chiến cơ ở góc dưới (tắt V111); thay vào đó 4 nút đáy (Tên lửa · Phi công · Kỹ năng · Bom)
//  nhỏ lại, bằng nhau, cùng 1 hàng ngang, giãn đều ra hai bên (chừa giữa cho tàu). Tắt: window.HUD116=false trước khi tải.
(()=>{
  if(window.HUD116===false)return;
  window.BTN111=false;
  const S=50;
  const st=document.createElement('style');st.id='v116-css';
  st.textContent=`body.play-screen #missile-action,body.play-screen #bomb,body.play-screen #robot-control,body.play-screen .st80p-x{position:fixed!important;top:auto!important;right:auto!important;bottom:calc(14px + env(safe-area-inset-bottom,0px))!important;width:${S}px!important;height:${S}px!important;min-width:0!important;min-height:0!important;margin:0!important;transform:none!important;z-index:30}
body.play-screen #missile-action{left:calc(9% - ${S/2}px)!important}
body.play-screen #robot-control{left:calc(91% - ${S/2}px)!important;bottom:calc(14px + ${S}px + 22px + env(safe-area-inset-bottom,0px))!important}
body.play-screen #bomb{left:calc(91% - ${S/2}px)!important}
html body.play-screen #robot-control button#robot-skill#robot-skill#robot-skill#robot-skill{width:${S}px!important;height:${S}px!important;min-width:0!important;padding:2px!important}
body.play-screen #missile-action small,body.play-screen #bomb small,body.play-screen #robot-skill small{font-size:7px!important;line-height:1!important;bottom:-11px!important}
body.play-screen #missile-action,body.play-screen #bomb{font-size:11px!important}
`;
  document.head.appendChild(st);
  // hệ số đổi px màn hình → đơn vị trận, cho ảnh phi công vẽ trên khung trận (pilot67) cùng hàng, cùng cỡ
  const upd=()=>{try{const c=document.getElementById('game');const r=c&&c.getBoundingClientRect();if(r&&r.height>0)window.HUDF116=H/r.height;}catch{}};upd();setInterval(upd,1000);
})();
