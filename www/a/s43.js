window.AURA307_IMG={'celestial':'assets/15dad82a7867.webp','emperor':'assets/5a2172b700a0.webp','glacial':'assets/8dc6eb75420f.webp','phoenix':'assets/417ad0aab21e.webp','void':'assets/dda5f2840ccf.webp'};'use strict';
// V307 · CÁNH BẠO TẨU 6 BẬC (5 mẫu GPT dùng chung, mỗi tàu đổi màu / tỉ lệ riêng — bảng Gemini 19/11)
//  Thay lớp lửa / sét / ánh sáng cũ của BtFx218 khi Bạo Tẩu. Thân Bạo Tẩu = thân thường sáng hơn, vẽ 1,12× (QBT307).
//  Bậc: Thường không cánh (vòng sáng mỏng) · Lục 0,70 nhuộm lục · Lam 0,85 nhuộm lam · Tím 1,0 màu gốc · Tím+5 1,12 + lớp bóng 1,18 · SS 1,25 + viền vàng + vòng ma trận xoay.
//  Vòng cung đếm ngược vàng quanh tàu theo thời gian Bạo Tẩu còn lại. Tắt: window.AURA307=false
(function(){
 const IM={};for(const k in (window.AURA307_IMG||{})){const im=new Image();im.src=AURA307_IMG[k];IM[k]=im;}
 // id 0-based: [mẫu, lọc màu riêng, scaleX, scaleY]
 const C={0:['phoenix','',1.15,1],7:['phoenix','hue-rotate(-12deg)',1.2,.95],4:['celestial','',1.15,1.05],8:['celestial','hue-rotate(15deg)',.85,1.25],9:['celestial','hue-rotate(40deg)',1.25,.9],11:['celestial','',1,1.15],
  1:['glacial','hue-rotate(25deg)',.95,1.15],2:['glacial','',1.1,1.1],3:['void','hue-rotate(-15deg)',1.15,.95],5:['void','hue-rotate(65deg)',.9,1.2],6:['void','contrast(1.2) saturate(1.2)',1.1,1.05],
  10:['emperor','',1.1,1.1],12:['emperor','saturate(1.3) brightness(1.1)',1.25,1.1]};
 const TS={thuong:0,luc:.7,lam:.85,tim:1,tim5:1.12,ss:1.25},TA={thuong:0,luc:.75,lam:.85,tim:.95,tim5:1,ss:1};
 const TF={luc:'grayscale(1) sepia(1) hue-rotate(80deg) saturate(3)',lam:'grayscale(1) sepia(1) hue-rotate(150deg) saturate(3)'};
 const GOLD='grayscale(1) sepia(1) saturate(4) hue-rotate(2deg) brightness(1.25)';
 const CA={};function tint(k,f){const im=IM[k];if(!im||!im.complete||!im.naturalWidth)return null;if(!f)return im;const key=k+'|'+f;if(CA[key])return CA[key];
  try{const c=document.createElement('canvas');c.width=im.naturalWidth;c.height=im.naturalHeight;const g=c.getContext('2d');if(!('filter' in g))return CA[key]=im;g.filter=f;g.drawImage(im,0,0);return CA[key]=c;}catch{return CA[key]=im;}}
 const on=()=>window.AURA307!==false;
 const tierOf=(id,a)=>{if(a&&a.__f)return a.__f;try{return Dan299.tierOf(id)||'tim';}catch{return 'tim';}};
 const QB={};for(let i=0;i<13;i++)QB[i]={thuong:.893,luc:.893,lam:.893,tim:.893,tim5:.893,ss:.893};
 // tàu chỉ đổi bậc SS: các bậc khác giữ thân Bạo Tẩu cũ (để QBT cũ)
 for(const i of [1,2,3,5,6,7,10])QB[i]={ss:.893};
 window.QBT307=QB;
 function wings(ctx,id,tier,size,ta){const c=C[id];if(!c)return;const s=(tier in TS)?TS[tier]:1,A=(tier in TA)?TA[tier]:1;const T=Math.min(1,ta/.25),open=.2+.8*(1-Math.pow(1-T,3)),br=1+.05*Math.sin(ta*Math.PI*2/.8);
  let rem=8;try{rem=superTime;}catch{}const close=rem<.5?Math.max(0,rem/.5):1;
  if(s<=0){ctx.save();ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.55*close;ctx.strokeStyle='#bfefff';ctx.lineWidth=2;ctx.beginPath();ctx.arc(0,0,size*.42*br,0,6.283);ctx.stroke();ctx.restore();return;}
  const f=(window.MAUA309!==false?null:TF[tier])||c[1],im=tint(c[0],f);if(!im)return;const W=size*1.75*s*c[2]*open*br*close,H=size*1.75*s*c[3]*open*br*close;
  ctx.save();ctx.globalCompositeOperation='screen';
  if(tier==='tim5'||tier==='ss'){ctx.globalAlpha=.45*close;const k=1.18*(1+.04*Math.sin(ta*7.5+1.6));ctx.drawImage(im,-W*k/2,-H*k/2,W*k,H*k);}
  ctx.globalAlpha=.85*A*close;ctx.drawImage(im,-W/2,-H/2,W,H);
  if(tier==='ss'){const gim=tint(c[0],GOLD);if(gim){ctx.globalAlpha=.35*close;ctx.drawImage(gim,-W*1.04/2,-H*1.04/2,W*1.04,H*1.04);}
   ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.5*close;ctx.strokeStyle='#ffd600';ctx.lineWidth=1.5;ctx.save();ctx.rotate(ta*.6);ctx.setLineDash([size*.08,size*.05]);ctx.beginPath();ctx.arc(0,0,size*.62,0,6.283);ctx.stroke();ctx.rotate(-ta*1.3);ctx.setLineDash([size*.03,size*.06]);ctx.beginPath();ctx.arc(0,0,size*.74,0,6.283);ctx.stroke();ctx.restore();}
  ctx.restore();}
 function arc(ctx,size){let rem=0,tot=8;try{rem=superTime;tot=Math.max(rem,window.__bt307max||0);}catch{}if(!(rem>0)){window.__bt307max=0;return;}window.__bt307max=tot;
  ctx.save();ctx.globalCompositeOperation='source-over';ctx.globalAlpha=.9;ctx.strokeStyle='#ffd600';ctx.lineWidth=2.5;ctx.lineCap='round';ctx.beginPath();ctx.arc(0,0,38,-Math.PI/2,-Math.PI/2+6.283*(rem/tot));ctx.stroke();ctx.restore();}
 function hook(){if(!window.BtFx218||BtFx218.__a307)return false;const ob=BtFx218.back,of=BtFx218.front;
  BtFx218.back=function(ctx,a,cell,cw,ch,size,isOn,now,ta,id){if(!on())return ob.apply(this,arguments);if(isOn){try{wings(ctx,id,tierOf(id,a),size,ta);}catch{}}else window.__bt307max=0;};
  BtFx218.front=function(ctx,a,cell,cw,ch,size,isOn,now,ta,id){if(!on())return of.apply(this,arguments);if(isOn&&typeof mode!=='undefined'&&mode==='play'){try{arc(ctx,size);}catch{}}};
  BtFx218.__a307=1;return true;}
 if(!hook()){const t=setInterval(()=>{if(hook())clearInterval(t);},250);}
})();
