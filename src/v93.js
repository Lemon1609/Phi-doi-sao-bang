'use strict';
// V93 · Gemini REVIEW93 §5 — 3 tiện ích cho điện thoại
//  A) Càn quét 1 chạm: ải đã 3★ trên bản đồ chiến dịch có nút ⚡ nhỏ ở góc → chạm là càn quét ngay (vẫn tốn 6 🔋, dùng lượt miễn phí/vé như cũ)
//  B) NHẬN TẤT CẢ ở bảng Thành tựu (Nhiệm vụ năng động q77 đã có sẵn nút này từ V77)
//  C) Mũi tên báo nguy ở mép màn: boss / quái tinh anh / quái lớn còn ở ngoài màn hình → tam giác nhỏ chỉ hướng (không có chữ)
//  Tắt: window.V93=false · window.ARROW93=false
const V93=(()=>{
 const on=()=>window.V93!==false;
 const T=m=>{try{toast(m);}catch{}};const fmt=n=>Math.round(n).toLocaleString('vi-VN');
 // ---------- A · càn quét 1 chạm ----------
 function qsBtns(){if(!on())return;let st={};try{st=Campaign36.getState().stars||{};}catch{return;}
  for(const nd of document.querySelectorAll('.cm-node.done')){const n=+nd.dataset.stage;if(!n||(st[n]|0)<3||nd.querySelector('.qs93'))continue;
   const b=document.createElement('button');b.className='qs93';b.textContent='⚡';b.title='Càn quét';
   b.style.cssText='position:absolute;right:-8px;top:-8px;width:26px;height:26px;padding:0;border-radius:50%;border:1px solid #ffd36a;background:#3a2a08;color:#ffd36a;font-size:13px;line-height:24px;z-index:3;transform:none';
   b.addEventListener('click',e=>{e.stopPropagation();e.preventDefault();sweep(n,b);});nd.appendChild(b);}}
 function sweep(n,b){let r=null;try{r=Campaign36.sweep(n);}catch{}
  if(r){T('⚡ CÀN QUÉT ẢI '+n+' · +'+fmt(r.credits||0)+' ◈'+(r.materials&&r.materials.length?' · '+r.materials.length+' vật phẩm':''));try{b.animate([{transform:'scale(1.4)'},{transform:'scale(1)'}],{duration:300});}catch{}try{Progress.render();}catch{}try{DeviceSave.flush();}catch{}}
  else{let en=0;try{en=V75.energy();}catch{}if(en<6)return;T('HẾT LƯỢT CÀN QUÉT HÔM NAY');}}
 // ---------- B · nhận tất cả thành tựu ----------
 function achAll(){const rows=document.querySelectorAll('.ach');if(!rows.length)return;const box=rows[0].parentElement;if(!box)return;
  let btn=box.querySelector('.aa93');const ready=document.querySelectorAll('.ach.ok button[data-a]:not([disabled])').length;
  if(!btn){btn=document.createElement('button');btn.className='aa93';btn.style.cssText='display:block;width:100%;margin:0 0 8px;padding:9px;font-weight:800;border-radius:8px;border:1px solid #ffd36a;background:linear-gradient(#5a420c,#2e2104);color:#ffe9a8';
   btn.addEventListener('click',e=>{e.stopPropagation();let n=0;for(let k=0;k<60;k++){const b=document.querySelector('.ach.ok button[data-a]:not([disabled])');if(!b)break;b.click();n++;}if(!n)T('Chưa có mốc thành tựu nào để nhận');});
   const pk=box.querySelector('.pk92');(pk||rows[0]).before(btn);}
  const t=ready?'NHẬN TẤT CẢ ('+ready+')':'NHẬN TẤT CẢ';if(btn.textContent!==t)btn.textContent=t;btn.disabled=!ready;btn.style.opacity=ready?1:.5;}
 // ---------- C · mũi tên báo nguy ----------
 function arrows(){if(!on()||window.ARROW93===false)return;let m='';try{m=mode;}catch{}if(m!=='play')return;
  const g=ctx,Wd=W,Hd=H,pad=14;const list=[];
  try{if(boss&&!boss.dead&&boss.hp>0&&(boss.y<0||boss.x<0||boss.x>Wd))list.push([boss.x,boss.y,'#ff4d6d',1.35]);}catch{}
  try{let ne=0;for(const e of enemies){if(e.dead||e.bossPart||e===boss||!e.elite)continue;if(e.y<-10||e.x<-10||e.x>Wd+10){list.push([e.x,e.y,'#ffb347',1]);if(++ne>=2)break;}}}catch{}// V100: chỉ boss + tối đa 2 tinh anh (bỏ quái lớn thường)
  if(!list.length)return;const t=(typeof time==='number'?time:0);g.save();
  for(const [x,y,c,k] of list){const cx=Math.max(pad,Math.min(Wd-pad,x)),cy=Math.max(pad,Math.min(Hd-pad,y));const a=Math.atan2(y-cy||-1,x-cx);const s=9*k*(1+.12*Math.sin(t*10));
   g.save();g.translate(cx,cy);g.rotate(a);g.globalAlpha=.85;g.fillStyle=c;g.strokeStyle='rgba(0,0,0,.6)';g.lineWidth=1.5;g.beginPath();g.moveTo(s,0);g.lineTo(-s*.7,s*.75);g.lineTo(-s*.7,-s*.75);g.closePath();g.fill();g.stroke();g.restore();}
  g.restore();}
 let H1=false;function hook(){if(H1||typeof Equipment25==='undefined'||!Equipment25.draw)return;H1=true;const d=Equipment25.draw;Equipment25.draw=function(){const r=d.apply(this,arguments);try{arrows();}catch{}return r;};}
 hook();setTimeout(hook,700);setTimeout(hook,3000);
 setInterval(()=>{if(!on())return;try{qsBtns();}catch{}try{achAll();}catch{}},600);
 return {sweep,arrows};
})();
window.V93=V93;
