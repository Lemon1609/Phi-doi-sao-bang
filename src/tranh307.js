'use strict';
// V307 · TRANH LỚN NỬA TRÊN (học bố cục game gốc: mỗi màn quan trọng một tranh điểm nhìn ở nửa trên, thông tin + nút ở dưới).
//  • Băng tranh cho NHIỆM VỤ (q77) · MÙA GIẢI (s77) · ĐIỂM DANH (#m40) · trang QUÀ (#nav74p).
//  • Màn PHI CÔNG (pl67): hàng chân dung nhỏ lên trên, thẻ nhân vật lớn + nút ‹ › duyệt.
//  Tranh thật lấy từ TRANH307 (src/tranh307/<khóa>.png, GPT vẽ). Chưa có tranh → tạm dùng chân dung phi công sẵn có + nền màu.
//  Không đổi logic màn nào; chỉ chèn khối trang trí và gọi .click() nút gốc. Tắt: window.TRANH307OFF=true
(()=>{try{
 if(window.TRANH307OFF)return;
 const A=typeof TRANH307!=='undefined'?TRANH307:{};
 const PA=()=>typeof PILOT_ART!=='undefined'?PILOT_ART:(typeof PILOT_ASSETS!=='undefined'?PILOT_ASSETS:{});
 // khóa → [tiêu đề, dòng phụ, phi công tạm, màu chủ]
 const B={
  nhiem_vu:['NHIỆM VỤ HẰNG NGÀY','Đủ năng động mở rương mốc · làm mới 0 giờ',2,'#2fd0ff'],
  mua_giai:['MÙA GIẢI 21 NGÀY','25 cấp thưởng · rương vượt cấp',4,'#c24dff'],
  diem_danh:['ĐIỂM DANH MỖI NGÀY','Giữ chuỗi 7 ngày · ngày 7 nhận quà lớn',6,'#3fd468'],
  qua:['TRUNG TÂM QUÀ','Quà đăng nhập · nhiệm vụ · mùa giải',1,'#ffb347']};
 function banner(k){const b=B[k],art=A[k];const d=document.createElement('div');d.className='tr307'+(art?' art':'');d.dataset.k=k;d.style.setProperty('--tc',b[3]);
  const pil=PA()['p'+b[2]];
  d.innerHTML=art?`<img class="tr307-full" src="${art}" alt=""><div class="tr307-t"><b>${b[0]}</b><small>${b[1]}</small></div>`
   :`<i class="tr307-bg"></i>${pil?`<img class="tr307-pil" src="${pil}" alt="">`:''}<div class="tr307-t"><b>${b[0]}</b><small>${b[1]}</small></div>`;
  return d;}
 function put(host,after,k){if(!host)return;const cur=host.querySelector(':scope > .tr307');if(cur&&cur.dataset.k===k)return;if(cur)cur.remove();if(!k)return;
  const ref=after?host.querySelector(':scope > '+after):null;const d=banner(k);if(ref)ref.after(d);else host.prepend(d);}
 const vis=e=>!!(e&&!e.hidden&&e.getClientRects().length);
 function banners(){
  const q=document.querySelector('.q77p .q77-card');if(vis(q))put(q,'.q77-top','nhiem_vu');
  const s=document.querySelector('.s77p .s77-card');if(vis(s))put(s,'.s77-top','mua_giai');
  const m=document.querySelector('#m40 .mm');if(vis(m)){const h=m.querySelector(':scope > h3');put(m,'p.sub',h&&/điểm danh/i.test(h.textContent)?'diem_danh':null);}
  const g=document.querySelector('#nav74p .n74pc');if(vis(g)){const h=g.querySelector('.n74ph b');put(g,'.n74ph',h&&h.textContent.trim()==='QUÀ'?'qua':null);}}
 // ---------- màn Phi công ----------
 function pilot(){const w=document.querySelector('.pl67-wrap');if(!vis(w))return;const list=w.querySelector('.pl67-list'),card=w.querySelector('.pl67-card');if(!list||!card)return;
  w.classList.add('pl307');
  const btns=[...list.querySelectorAll('button[data-x="pick"]')],i=btns.findIndex(b=>b.getAttribute('aria-pressed')==='true');
  const id=i>=0?btns[i].dataset.v:null;
  if(!card.querySelector('.pl307-nav')){const n=document.createElement('div');n.className='pl307-nav';n.innerHTML='<button type="button" data-d="-1" aria-label="Phi công trước">‹</button><button type="button" data-d="1" aria-label="Phi công sau">›</button>';card.prepend(n);
   n.addEventListener('click',e=>{const b=e.target.closest('[data-d]');if(!b)return;e.stopPropagation();e.preventDefault();const L=[...document.querySelectorAll('.pl67-wrap .pl67-list button[data-x="pick"]')];if(!L.length)return;const j=L.findIndex(x=>x.getAttribute('aria-pressed')==='true');L[((j<0?0:j)+(+b.dataset.d)+L.length)%L.length].click();},true);}
  const img=card.querySelector(':scope > img.pl67-img');
  if(img){img.classList.add('pl307-hero');const full=id&&A['phi_cong_'+id];if(full&&img.dataset.full!==id){img.dataset.full=id;img.src=full;img.classList.add('full');}}
  const on=list.querySelector('button[aria-pressed="true"]');if(on&&on.dataset.v!==list.dataset.sc307){list.dataset.sc307=on.dataset.v;try{on.scrollIntoView({block:'nearest',inline:'center'});}catch{}}}
 setInterval(()=>{try{banners();pilot();}catch(e){}},400);
 window.Tranh307={keys:()=>Object.keys(B),has:k=>!!A[k]};
}catch(e){console.warn('TRANH307',e);}})();
