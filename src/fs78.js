// V78 · TỰ TOÀN MÀN HÌNH trên điện thoại: chạm lần đầu → phóng to cả trang; trình duyệt không hỗ trợ thì bỏ qua êm
const FS78=(()=>{
 const KEY='saobang-fs78';
 let on=true;try{on=localStorage.getItem(KEY)!=='0';}catch{}
 let userExit=false;
 const root=document.documentElement;
 const fsEl=()=>document.fullscreenElement||document.webkitFullscreenElement||null;
 const can=()=>!!(root.requestFullscreen||root.webkitRequestFullscreen)&&(document.fullscreenEnabled!==false);
 const touch=()=>{try{return matchMedia('(pointer:coarse)').matches;}catch{return false;}};
 function enter(){if(fsEl()||!can())return;try{const fn=root.requestFullscreen||root.webkitRequestFullscreen;const r=fn.call(root,{navigationUI:'hide'});
  if(r&&r.then)r.then(()=>{try{screen.orientation&&screen.orientation.lock&&screen.orientation.lock('portrait').catch(()=>{});}catch{}}).catch(()=>{});}catch{}}
 // khi cả trang đã toàn màn hình: game không cần tự bật/tắt toàn màn hình cho khung chơi nữa (tránh bị thoát ra sau mỗi trận)
 try{const oReq=Element.prototype.requestFullscreen;if(oReq)Element.prototype.requestFullscreen=function(){if(on&&fsEl()===root&&this!==root)return Promise.resolve();return oReq.apply(this,arguments);};
  const oExit=document.exitFullscreen;if(oExit)document.exitFullscreen=function(){if(on&&fsEl()===root&&!FS78._manual)return Promise.resolve();return oExit.apply(this,arguments);};}catch{}
 document.addEventListener('fullscreenchange',()=>{if(!fsEl()&&on)userExit=true;paint();});
 document.addEventListener('pointerup',()=>{if(on&&!userExit&&touch())enter();},{capture:true});
 function toggle(){if(fsEl()){on=false;FS78._manual=true;try{(document.exitFullscreen||document.webkitExitFullscreen).call(document);}catch{}FS78._manual=false;}else{on=true;userExit=false;enter();}
  try{localStorage.setItem(KEY,on?'1':'0');}catch{}paint();}
 function paint(){const b=document.getElementById('fs78b');if(b)b.textContent=fsEl()?'⛶ THOÁT TOÀN MÀN HÌNH':'⛶ TOÀN MÀN HÌNH';const s=document.getElementById('fs78s');if(s)s.textContent=!can()?'Trình duyệt này không cho phóng toàn màn hình (iPhone: bấm Chia sẻ → Thêm vào MH chính).':on?'Tự phóng to khi chạm vào màn hình.':'Đã tắt tự phóng to.';}
 function mount(){const c=document.getElementById('st66-code');if(!c||document.getElementById('fs78'))return;const lab=c.closest('.st66-row')?.previousElementSibling;if(!lab)return;
  const d=document.createElement('div');d.id='fs78';d.innerHTML='<div class="st66-l">MÀN HÌNH</div><p class="st66-now" id="fs78s"></p><div class="st66-row"><button id="fs78b"></button></div>';
  lab.parentNode.insertBefore(d,document.getElementById('cl78')||lab);paint();d.querySelector('#fs78b').addEventListener('click',e=>{e.stopPropagation();toggle();});}
 setInterval(()=>{try{mount();}catch{}},600);
 // V78.6: đang chơi mà mất lớp play-screen (thu nhỏ / thoát toàn màn hình) → dựng lại, không lộ giao diện cũ
 setInterval(()=>{try{if(typeof mode!=='undefined'&&['play','pause'].includes(mode)&&!document.body.classList.contains('play-screen'))PlayScreen.enter();}catch{}},300);
 return {toggle,enter,on:()=>on,_manual:false};
})();
