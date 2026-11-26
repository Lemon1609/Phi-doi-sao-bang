'use strict';
// V194 · Tranh GPT 06/11: NỀN TRẬN 3 LỚP chương 1–5 (NEN_CHUONG_V192_A) + HOẠT CẢNH MỞ RƯƠNG có cột sáng theo phẩm (MO_RUONG_V192).
//  Nền: lớp xa thay nền sao vẽ bằng mã (qua Parallax, cùng cơ chế Ch9/Ch10), lớp giữa trôi ×1,6, lớp gần ×3,2 (chỉ ở mép).
//   Khi có tranh, tắt hành tinh + đá vẽ bằng mã (hành tinh có vành elip). Giữ bụi tốc độ. Tắt: window.NEN194=false
//  Rương: rung → bật nắp → cột sáng (Lam / Tím / vàng S–SS / vàng + tia nắng xoay cho APEX) → mờ đi, chạm để bỏ qua. Tắt: window.RUONG194=false
const NEN194=(()=>{
 const A=(typeof NEN194_ART!=='undefined'&&NEN194_ART)||{},IM={};
 const im=k=>{if(!A[k])return null;if(!IM[k]){const i=new Image();i.src=A[k];IM[k]=i;}return IM[k].complete&&IM[k].naturalWidth?IM[k]:null;};
 const chap=()=>{try{if(window.NEN194===false||gameMode!=='campaign')return 0;const c=Campaign36.chapter(level)+1;return (A['ch'+c+'_xa']||A['ch'+c+'_giua'])?c:0;}catch{return 0;}};/* V208: chương 8–10 chỉ có lớp giữa/gần */
 // nạp sẵn để lần đầu vào trận có ngay tranh
 setTimeout(()=>{for(const k in A)im(k);},1500);
 let ym=0,yn=0;
 function layer(img,y,a){const h=Math.round(W*img.naturalHeight/img.naturalWidth),o=((y%h)+h)%h;ctx.globalAlpha=a;ctx.drawImage(img,0,o-h,W,h);if(o<H)ctx.drawImage(img,0,o,W,h);}
 function draw(dt,still){try{if(typeof PKC26!=='undefined'&&PKC26.draw(dt,still))return;}catch{}const c=chap();if(!c)return;const g=im('ch'+c+'_giua'),n=im('ch'+c+'_gan');if(!still){ym+=dt*22;yn+=dt*44;}
  ctx.save();try{if(g)layer(g,ym,1);let lq=false;try{lq=VisualFX.counts().quality==='light';}catch{}if(n&&!lq)layer(n,yn,.85);}catch{}ctx.restore();}
 const pk=()=>{try{return typeof PKC26!=='undefined'&&PKC26.on();}catch{return false;}};
 return {far:lv=>{if(pk())return null;const c=chap();return c?im('ch'+c+'_xa'):null;},on:()=>pk()||!!chap(),draw};
})();
const Ruong194=(()=>{
 const A=(typeof RUONG194_ART!=='undefined'&&RUONG194_ART)||{};
 let batch=[],tm=0,el=null,busy=false;
 const RK={none:0,lam:1,tim:2,vang:3,sss:4};
 function rarity(r){let best='none';const up=k=>{if(RK[k]>RK[best])best=k;};
  try{for(const g of (r&&r.got)||[]){if(g.rare==='APEX')up('sss');else if(g.rare==='SS'||g.rare==='S')up('vang');else if(g.unlock)up('tim');else if(g.ph===2)up('lam');}}catch{}
  try{const s=JSON.stringify(r||{});if(/"grade":"SSS"/.test(s))up('sss');else if(/"grade":"SS?"/.test(s))up('vang');}catch{}return best;}
 function note(r){if(window.RUONG194===false||!r)return;batch.push(r);clearTimeout(tm);tm=setTimeout(flush,40);}
 function flush(){const b=batch;batch=[];if(!b.length)return;let best='none';for(const r of b){const k=rarity(r);if(RK[k]>RK[best])best=k;}play(best);}
 const reduced=()=>{try{return matchMedia('(prefers-reduced-motion: reduce)').matches;}catch{return false;}};
 function play(k){if(busy||!A.ruong_dong)return;try{if(mode==='play')return;}catch{}busy=true;
  const col={lam:'#3BA4FF',tim:'#A45CFF',vang:'#FFC93C',sss:'#FFD86A'}[k],pil={lam:'cot_sang_lam',tim:'cot_sang_tim',vang:'cot_sang_vang',sss:'cot_sang_vang'}[k];
  const dur=reduced()?500:k==='none'?900:k==='sss'?1900:1400;
  el=document.createElement('div');el.className='r194'+(reduced()?' rm':'')+' k-'+k;el.style.setProperty('--rc',col||'#fff');
  el.innerHTML=`<div class="r194-st">${k==='sss'&&A.tia_nang_sss?`<img class="r194-tia" src="${A.tia_nang_sss}" alt="">`:''}${pil&&A[pil]?`<img class="r194-cot" src="${A[pil]}" alt="">`:''}
   <img class="r194-mo" src="${A.ruong_mo}" alt=""><img class="r194-dong" src="${A.ruong_dong}" alt=""><img class="r194-nap" src="${A.ruong_nap}" alt="">
   ${k!=='none'&&A.hat_sang?Array.from({length:k==='sss'?16:10},(_,i)=>`<i class="r194-hat" style="--hx:${Math.round((Math.random()-.5)*260)}px;--hy:${-Math.round(80+Math.random()*260)}px;--hd:${(.45+Math.random()*.5).toFixed(2)}s;--hf:${i%4};background-image:url(${A.hat_sang})"></i>`).join(''):''}</div>`;
  document.body.appendChild(el);const end=()=>{if(!el)return;el.classList.add('out');const e=el;el=null;setTimeout(()=>{e.remove();busy=false;},260);};
  el.addEventListener('click',end);setTimeout(end,dur);try{if(k!=='none')tone(k==='sss'?990:k==='vang'?880:660,.22,'triangle',.06);}catch{}}
 return {note,play,rarity};
})();
