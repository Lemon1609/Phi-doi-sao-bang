'use strict';
// V199 · Hoàn thiện bản APK (chỉ chạy khi mở trong app Android Capacitor; bản web không đổi).
//  - Nút Back Android: đang chơi → tạm dừng · đang tạm dừng → chơi tiếp · có bảng/hộp đang mở → đóng bảng trên cùng
//    · đang ở màn con → về Sảnh · đang ở Sảnh → hỏi "Thoát game?".
//  - Rời app (về màn hình chính / tắt màn): tạm dừng trận + ghi dữ liệu lưu ngay.
//  - Ẩn thanh trạng thái cho toàn màn hình. Tắt: window.APK199=false
const APK199=(()=>{
 const cap=window.Capacitor,native=!!(cap&&cap.isNativePlatform&&cap.isNativePlatform());
 const P=(cap&&cap.Plugins)||{},App=P.App,SB=P.StatusBar;
 const on=()=>native&&window.APK199!==false;
 const save=()=>{try{Progress.flush();}catch{}try{DeviceSave.flush();}catch{}};
 const SEL='[aria-label="Đóng"],.adv-x,.v75-x,.m63-x,.g74x,.e74x,.s77-x,.n74x,[data-close]';
 const vis=e=>{if(!e||e.disabled)return false;const r=e.getBoundingClientRect();if(r.width<4||r.height<4)return false;if(r.bottom<0||r.top>innerHeight)return false;const s=getComputedStyle(e);return s.visibility!=='hidden'&&s.display!=='none'&&+s.opacity>0.05;};
 const zOf=e=>{let z=0;for(let p=e;p&&p!==document.body;p=p.parentElement){const s=getComputedStyle(p);if(s.position!=='static'&&s.zIndex!=='auto')z=Math.max(z,+s.zIndex||0);}return z;};
 let dlg=null;
 function closeDlg(){if(dlg){dlg.remove();dlg=null;}}
 function askExit(){if(dlg)return;dlg=document.createElement('div');dlg.className='apk199';
  dlg.innerHTML='<div class="apk199-b"><b>Thoát Phi Đội Sao Băng?</b><p>Tiến trình đã được lưu.</p><div><button type="button" data-k="0">Ở lại</button><button type="button" data-k="1" class="ex">Thoát</button></div></div>';
  dlg.addEventListener('click',e=>{const b=e.target.closest('[data-k]');if(e.target===dlg||(b&&b.dataset.k==='0'))closeDlg();else if(b){save();try{App.exitApp();}catch{}}});
  (document.fullscreenElement||document.webkitFullscreenElement||document.body).appendChild(dlg);}
 function back(){
  if(dlg){closeDlg();return;}
  try{if(typeof Revive393!=='undefined'&&Revive393.active())return;}catch{}
  try{if(mode==='play'||mode==='pause'){pause();return;}}catch{}
  const cs=[...document.querySelectorAll(SEL)].filter(vis);
  if(cs.length){let best=cs[cs.length-1],bz=-1;cs.forEach((c,i)=>{const z=zOf(c)*1000+i;if(z>bz){bz=z;best=c;}});best.click();return;}
  try{if(Nav74.state().cur!=='home'){Nav74.tab('home');return;}}catch{}
  askExit();
 }
 if(on()){
  try{SB&&SB.setOverlaysWebView&&SB.setOverlaysWebView({overlay:true});SB&&SB.hide&&SB.hide();}catch{}
  try{App&&App.addListener('backButton',back);}catch{}
  try{App&&App.addListener('appStateChange',s=>{if(s&&!s.isActive){try{if(mode==='play')pause();}catch{}save();}});}catch{}
  try{App&&App.addListener('pause',()=>{try{if(mode==='play')pause();}catch{}save();});}catch{}
  document.documentElement.classList.add('apk199-on');
 }
 return {native,back,askExit};
})();
