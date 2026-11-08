'use strict';
// V51 · Tranh vật phẩm rơi (bộ mới của GPT) thay capsule vẽ bằng code.
//  • PICKUP51_ASSETS = {<khóa>:{base,idle,burst}} — khóa là loại buff ('super','heal',…) hoặc 'weapon0'..'weapon4'.
//  • Có tranh → vẽ tranh 62 px (idle 4 ô: 5 fps trong 0,8 s rồi giữ ô đầu 1,6 s); chưa có → Loot40 vẽ capsule cũ.
//  • Nhặt → phát dải burst 8 ô (16 fps / 0,5 s) tại chỗ nhặt.
//  • Giảm chuyển động: chỉ dùng tranh tĩnh, không burst.
const Pickup51=(()=>{
 const A=typeof PICKUP51_ASSETS!=='undefined'?PICKUP51_ASSETS:{},IMG={},fx=[];
 const img=src=>{if(!src)return null;const im=new Image();im.decoding='async';im.src=src;return im;};
 for(const k in A)IMG[k]={base:img(A[k].base),idle:img(A[k].idle),burst:img(A[k].burst)};
 const ok=im=>im&&im.complete&&im.naturalWidth>0;
 const keyOf=d=>d.type==='weapon'?'weapon'+(d.weapon||0):d.type;
 const quiet=()=>{try{return VisualFX.reduced();}catch{return false;}};
 function draw(d,y,sz){const s=IMG[keyOf(d)];if(!s)return false;if(window.PICK208!==false)sz*=1.18;/* V208 · D5: viên rơi to thêm 18% cho dễ thấy */
  let im=s.base,fr=0,n=1;
  if(!quiet()&&ok(s.idle)){const c=((time+(d.ph||0)*.4)%2.4);if(c<.8){fr=Math.floor(c*5)%4;n=4;im=s.idle;}}
  if(!ok(im)){im=s.base;fr=0;n=1;}if(!ok(im))return false;if(!ok(s.idle))sz*=(window.BUFF78K||.8);/* V78.8: hộp buff V2 vẽ gọn hơn */
  const fw=im.naturalWidth/n;ctx.save();ctx.globalCompositeOperation='source-over';ctx.drawImage(im,fr*fw,0,fw,im.naturalHeight,d.x-sz/2,y-sz/2,sz,sz);ctx.restore();return true;}
 function burst(d){const s=IMG[keyOf(d)];if(!s||!ok(s.burst)||quiet())return;fx.push({im:s.burst,x:d.x,y:d.y,t0:time});if(fx.length>8)fx.shift();}
 function drawFx(){for(let i=fx.length-1;i>=0;i--){const f=fx[i],u=time-f.t0;if(u<0||u>=.5){fx.splice(i,1);continue;}
   const fr=Math.min(7,Math.floor(u*16)),fw=f.im.naturalWidth/8,sz=96;ctx.save();ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1;ctx.drawImage(f.im,fr*fw,0,fw,f.im.naturalHeight,f.x-sz/2,f.y-sz/2,sz,sz);ctx.restore();}}
 return {draw,burst,drawFx,has:k=>!!IMG[k],hasD:d=>!!IMG[keyOf(d)],img:k=>{const s=IMG[k];return s&&ok(s.base)?s.base:null;},keys:()=>Object.keys(IMG)};
})();
