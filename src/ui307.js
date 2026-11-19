'use strict';
// V307 bước 3 · quy chuẩn giao diện bằng mã (ui307.css): rút gọn số lớn (≥100.000 → 104,5K · ≥1.000.000 → 104,5M, làm tròn xuống), gắn lớp nút đặc cho «MỞ ›» / «VÀO ›», thu cỡ chữ tiêu đề bị cắt «…», nền khoang nâng cấp. Chỉ đổi hiển thị. Tắt: window.UI307=false
(()=>{const I=window.UI307_IMG||{},H=window.HOP307_IMG||{};let st=0;
 function sh(v){const f=(x,u)=>(Math.floor(x*10)/10).toLocaleString('vi-VN',{maximumFractionDigits:1})+u;return v>=1e9?f(v/1e9,'B'):v>=1e6?f(v/1e6,'M'):f(v/1e3,'K');}
 const NUM=['#q307 b','#q307 small','#q307 span','#q307 div','#h1-cr','#h1-core','.nc307-gem small','.h1-chip b','.hb-res b','#hb-res span','#hb-res i'];
 function nums(){for(const e of document.querySelectorAll(NUM.join(','))){for(const n of e.childNodes){if(n.nodeType!==3)continue;const t=n.nodeValue;const r=t.replace(/\d{1,3}(?:\.\d{3})+|\d{6,}/g,m=>{const v=+m.replace(/\./g,'');return v>=1e5?sh(v):m;});if(r!==t){n.nodeValue=r;e.title=t.trim();}}}}
 function sums(){for(const e of document.querySelectorAll('.pl67-sum')){if(e.children.length)continue;const t=e.textContent,n=t.replace(/\d{1,3}(?:\.\d{3}){1,}/g,m=>{const v=+m.replace(/\./g,'');return v>=1e5?sh(v):m;});if(n!==t)e.textContent=n;}}
 // bước 4: ký tự tài nguyên → icon GPT; giữ nguyên ký tự trong DOM (chữ trong suốt) nên textContent không đổi
 const GL={'◈':'icon_alloy','💎':'icon_diamond','🎫':'icon_sweep_ticket'},RX=/[◈🎫]|💎/;
 function icons(){if(window.UI307ICON===false)return;const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,{acceptNode(n){if(!RX.test(n.nodeValue))return 2;const p=n.parentElement;if(!p||p.closest('script,style,textarea,select,option,canvas,svg,.u7i,[contenteditable]'))return 2;if(p.matches('title'))return 2;return 1;}});const L=[];let n;while((n=w.nextNode()))L.push(n);
  for(const t of L){const f=document.createDocumentFragment();const parts=t.nodeValue.split(/([◈🎫]|💎)/);for(const s of parts){if(!s)continue;if(GL[s]&&I[GL[s]]){const e=document.createElement('span');e.className='u7i u7i-'+GL[s].slice(5);e.textContent=s;f.appendChild(e);}else f.appendChild(document.createTextNode(s));}t.replaceWith(f);}}
 function btns(){for(const e of document.querySelectorAll('span,b')){if(e.children.length||e.classList.contains('u7-sec'))continue;const t=e.textContent.trim();if(t==='MỞ ›'||t==='VÀO ›')e.classList.add('u7-sec');}}
 const TT='h1,h2,h3,h4,.m63-eye,.n74pc h2,.hb-top b,.cm-head b,[class*=title],[class*=tit] b';
 function fit(){for(const e of document.querySelectorAll(TT)){if(!e.offsetParent||e.clientWidth<20)continue;if(e.scrollWidth<=e.clientWidth+1)continue;const cs=getComputedStyle(e);if(cs.textOverflow!=='ellipsis'&&cs.overflow!=='hidden')continue;
   let fs=parseFloat(cs.fontSize),b=e.__u7b||(e.__u7b=fs),n=0;while(e.scrollWidth>e.clientWidth+1&&fs>b*.62&&n++<12){fs-=.5;e.style.setProperty('font-size',fs+'px','important');}e.classList.add('u7-fit');if(e.scrollWidth>e.clientWidth+1)e.classList.remove('u7-fit');}}
 function s(){const on=window.UI307!==false;const r=document.documentElement;r.classList.toggle('ui307',on);if(!on)return;
  if(!st&&I.bg_upgrade_bay){st=1;for(const k of ['alloy','diamond','sweep_ticket'])if(I['icon_'+k])r.style.setProperty('--u7i-'+k,'url('+I['icon_'+k]+')');r.style.setProperty('--u7-bay','url('+I.bg_upgrade_bay+')');if(H.nut_tim){r.style.setProperty('--u7-tim','url('+H.nut_tim+')');r.style.setProperty('--u7-tim-p','url('+(H.nut_tim_nhan||H.nut_tim)+')');}}
  if(typeof mode!=='undefined'&&mode==='play')return;nums();sums();icons();btns();fit();}
 s();setInterval(s,450);})();
