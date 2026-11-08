'use strict';
// V93 · KHUNG HẠNG VÔ TẬN (tranh GPT V93_khung_hang): Vàng · Bạch Kim · Kim Cương. Nhận khi hết mùa đạt hạng đó (v92.js gọi FR93.give).
//  Khung cao nhất đã có tự đeo quanh ảnh phi công ở Sảnh (lỗ giữa = 300/512 khung). Khóa lưu mới: saobang-frame93. Tắt: window.FR93_OFF=true
const FR93=(()=>{
 const KEY='saobang-frame93',ORD=['gold','platinum','diamond'];let S={own:[]};try{Object.assign(S,JSON.parse(localStorage.getItem(KEY)||'{}'));}catch{}
 const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S));}catch{}};
 const img=id=>(typeof FRAME93_ART!=='undefined'&&FRAME93_ART[id])||'';
 function give(id){if(!ORD.includes(id))return false;if(!S.own.includes(id)){S.own.push(id);save();}return true;}
 const best=()=>{let b='';for(const id of ORD)if(S.own.includes(id))b=id;return b;};
 function paint(){if(window.FR93_OFF)return;const pp=document.getElementById('lb68-pp');if(!pp||!pp.offsetWidth)return;const par=pp.parentElement;const b=best();let fr=par.querySelector(':scope > .fr93');
  if(!b){if(fr)fr.remove();return;}if(getComputedStyle(par).position==='static')par.style.position='relative';
  if(!fr){fr=document.createElement('img');fr.className='fr93';fr.alt='';fr.style.cssText='position:absolute;pointer-events:none;z-index:2';par.appendChild(fr);}
  if(fr.dataset.k!==b){fr.dataset.k=b;fr.src=img(b);}const d=Math.max(pp.offsetWidth,pp.offsetHeight),sz=Math.round(d*512/300);
  fr.style.width=fr.style.height=sz+'px';fr.style.left=Math.round(pp.offsetLeft+pp.offsetWidth/2-sz/2)+'px';fr.style.top=Math.round(pp.offsetTop+pp.offsetHeight/2-sz/2)+'px';}
 setInterval(()=>{try{paint();}catch{}},800);
 return {give,img,best,state:()=>JSON.parse(JSON.stringify(S)),paint};
})();
window.FR93=FR93;
