'use strict';
// V307 · Bước 2 trong trận (Gemini góp ý giao diện, chủ dự án duyệt 19/11):
//  • lớp tối nhẹ phủ lên nền chương (sau nền, trước quái / đạn) để tàu, quái, đạn nổi hơn — window.NENTOI307=false để tắt
//  • viền tối mảnh #2B000E dưới mỗi viên đạn địch để luôn tách khỏi nền và đạn ta — window.VIEN307=false để tắt
//  • thanh trên cùng (máu / tạm dừng) hạ theo vùng tai thỏ: safe-area-inset-top + 12 px (CSS trong tran307.css)
(function(){
 const A=.25;
 function hook(){let ok=true;
  try{if(typeof NEN194!=='undefined'&&!NEN194.__t307){const od=NEN194.draw;NEN194.draw=function(){const r=od.apply(this,arguments);try{if(window.NENTOI307!==false&&NEN194.on()){ctx.save();ctx.globalAlpha=1;ctx.globalCompositeOperation='source-over';ctx.fillStyle='rgba(4,9,18,'+A+')';ctx.fillRect(0,0,W,H);ctx.restore();}}catch{}return r;};NEN194.__t307=1;}}catch{ok=false;}
  try{if(typeof Render27!=='undefined'&&!Render27.__t307){const op=Render27.projectile;Render27.projectile=function(b){try{if(window.VIEN307!==false&&b&&!b.dead&&Number.isFinite(b.x)){const r=Math.max(2.5,Math.min(14,(b.r||b.radius||4)))+1.5;ctx.save();ctx.globalCompositeOperation='source-over';ctx.globalAlpha=.8;ctx.fillStyle='#2B000E';ctx.beginPath();ctx.arc(b.x,b.y,r,0,6.283);ctx.fill();ctx.restore();}}catch{}return op.apply(this,arguments);};Render27.__t307=1;}}catch{ok=false;}
  return ok&&typeof NEN194!=='undefined'&&typeof Render27!=='undefined';}
 if(!hook()){const t=setInterval(()=>{if(hook())clearInterval(t);},300);}
})();
