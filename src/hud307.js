'use strict';
// V307 · HUD trong trận (chủ dự án chọn 17/11, học game gốc):
//  • Bật lại CHỮ NỔI NHỎ khi nhặt đồ, màu theo loại (V125 đã tắt). Tắt riêng: window.TEXT125=false
//  • Số giây hồi chiêu lớn giữa nút Tên lửa / Kỹ năng khi đang hồi. Tắt: window.CD307=false
(()=>{try{
 if(window.TEXT125===undefined)window.TEXT125=true;
 const $=id=>document.getElementById(id);
 function put(btn,v){if(!btn)return;let b=btn.querySelector(':scope > b.cd307');
  if(!(v>0.05)||window.CD307===false){if(b)b.hidden=true;return;}
  if(!b){b=document.createElement('b');b.className='cd307';b.setAttribute('aria-hidden','true');btn.appendChild(b);}
  const t=v>=10?String(Math.ceil(v)):v>=1?String(Math.ceil(v)):v.toFixed(1).replace('.',',');if(b.textContent!==t)b.textContent=t;b.hidden=false;}
 setInterval(()=>{try{
  let m=0;try{m=Equipment25.cooldown()||0;}catch{}put($('missile-action'),m);
  let r=0;try{r=(typeof activeRobot!=='undefined'&&activeRobot)?robotCooldown:(Rank36.state().cool||0);}catch{}put($('robot-skill'),r);
 }catch(e){}},120);
}catch(e){console.warn('HUD307',e);}})();
