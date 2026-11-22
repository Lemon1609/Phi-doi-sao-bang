'use strict';
// V309 Lượt 12 · Chốt hạ V1 (chủ dự án 22/11) · tắt: window.POLISH12=false
//  CSS trong l12309.css. JS: bật lớp html.polish12, bảng tạm dừng chrome, khung buồng lái đáy Sảnh, nhấn giữ +/− Đá XP (Cường hóa).
//  Không vẽ gì trong vòng lặp trận (chỉ DOM ngoài canvas, cập nhật 4 lần/giây).
const L12309=(()=>{
 const on=()=>window.POLISH12!==false;
 const $=s=>document.querySelector(s);
 const md=()=>{try{return mode;}catch{return '';}};
 // ---- bảng tạm dừng: tấm chrome bao quanh tiêu đề → gợi ý ----
 function pausePanel(){const ov=$('#overlay');if(!ov)return;let p=ov.querySelector('.pz12');const show=on()&&ov.dataset.state==='pause'&&!ov.hidden;
  if(!show){if(p)p.hidden=true;return;}if(!p){p=document.createElement('div');p.className='pz12';ov.prepend(p);}p.hidden=false;
  const vis=[...ov.children].filter(e=>e!==p&&e.offsetParent!==null&&getComputedStyle(e).display!=='none'&&e.getBoundingClientRect().height>0);if(!vis.length)return;
  const o=ov.getBoundingClientRect();let t=1e9,b=-1e9;for(const e of vis){const r=e.getBoundingClientRect();if(r.width<4)continue;t=Math.min(t,r.top);b=Math.max(b,r.bottom);}
  const top=Math.max(4,t-o.top-22),h=Math.min(o.height-top-4,b-t+44);p.style.left='18px';p.style.right='18px';p.style.top=top+'px';p.style.height=h+'px';}
 // ---- khung buồng lái: 1 tấm cơ khí vát cạnh sau 2 hàng nút đáy Sảnh ----
 function cockpit(){const lb=$('#hgr41 #lb68');if(!lb)return;let f=lb.querySelector(':scope > .cp12');if(!on()){if(f)f.hidden=true;return;}
  const a=lb.querySelector('.ck9')||lb.querySelector('.lb68-row'),c=lb.querySelector('.lb68-cta');if(!a||!c||!lb.offsetParent){if(f)f.hidden=true;return;}
  if(!f){f=document.createElement('div');f.className='cp12';f.innerHTML='<i class="a"></i>';lb.prepend(f);}f.hidden=false;
  const R=lb.getBoundingClientRect(),ra=a.getBoundingClientRect(),rc=c.getBoundingClientRect();
  const top=ra.top-R.top-7,bot=rc.bottom-R.top+7,l=Math.min(ra.left,rc.left)-R.left-6,r=R.right-Math.max(ra.right,rc.right)-6;
  f.style.top=top+'px';f.style.height=(bot-top)+'px';f.style.left=l+'px';f.style.right=r+'px';
  const mid=(ra.bottom+rc.top)/2-R.top-top;const i=f.querySelector('i');if(i)i.style.top=(mid-1)+'px';}
 // ---- nhấn giữ +/− Đá XP: sau 350 ms lặp 80 ms (nút được vẽ lại sau mỗi lần bấm nên tìm lại theo data-id) ----
 let hold=null;
 function stopHold(){if(hold){clearTimeout(hold.t);clearInterval(hold.i);hold=null;}}
 document.addEventListener('pointerdown',e=>{if(!on())return;const b=e.target.closest&&e.target.closest('#nc307 .nc307-gb button[data-nc]');if(!b)return;stopHold();
  const k=b.dataset.nc,id=b.dataset.id;let n=0;hold={t:setTimeout(()=>{hold.i=setInterval(()=>{const x=document.querySelector('#nc307 .nc307-gb button[data-nc="'+k+'"][data-id="'+id+'"]');if(!x||x.disabled){stopHold();return;}x.click();n++;if(n>400)stopHold();},n>20?40:80);},350)};},true);
 for(const ev of ['pointerup','pointercancel','pointerleave','blur'])window.addEventListener(ev,stopHold,true);
 // ---- màn thua: 2 lối tắt có sẵn (fx68) → nút vàng cho Cường hóa ----
 function loseBtns(){const b=$('#overlay .fx68-b');if(!b)return;const x=b.querySelectorAll('button');if(x[0]&&!x[0].classList.contains('y12'))x[0].classList.add('y12');}
 function tick(){document.documentElement.classList.toggle('polish12',on());if(!on()){pausePanel();cockpit();return;}
  try{pausePanel();}catch{}if(md()!=='play'){try{cockpit();}catch{}try{loseBtns();}catch{}}}
 setInterval(tick,250);setTimeout(tick,500);
 return {tick};
})();
window.L12309=L12309;
