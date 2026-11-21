'use strict';
// V69-E · GIÁP = MÀNG MỎNG (người dùng 22/10: "bỏ đồ họa giáp, chỉ giữ tính năng & thông số; trong game giáp chỉ là màng mỏng bao quanh
//  chiến cơ và biến mất khi hết"). Thay toàn bộ hình vỏ giáp (shell idle/max/proc, vệ tinh, hạt nano) của GEAR_FX và vòng hào quang Evo53.
//  Màng hiện khi còn điểm giáp (shield > 0), mờ dần theo lượng giáp còn lại, lóe sáng khi đỡ đạn, tắt hẳn khi giáp về 0 / hết hiệu lực.
const ARMOR69={r:50,fade:6};
// V69-G (người dùng gửi ảnh mẫu 15:25): MỘT lớp bong bóng duy nhất quanh tàu — đĩa xanh mờ, mép sáng, giữa trong suốt.
//  Thay cả 3 lớp cũ: sprite khiên chung (shieldArt), bong bóng FX40 có kinh tuyến, màng giáp V69-E.
//  • Khiên chắn đạn (nhặt vật phẩm, có thời gian): bong bóng sáng rõ, 2 s cuối nhấp nháy rồi tắt.
//  • Điểm giáp (shield > 0): bong bóng nhạt theo % giáp, lóe khi bị trúng, tắt khi giáp = 0.
const Armor69=(()=>{
 let vis=0,fl=0,last=0,prevSh=null;const TAU=Math.PI*2;
 function bubble(){if(!(mode==='play'||mode==='pause'))return;if(window.SHIP309V4&&window.L3309!==false&&window.TB309&&TB309.on()&&window.TB309SH!==false)return;/* V309 Lượt 3: vành khiên tb309 thay bong bóng */const now=performance.now()/1000,dt=Math.min(.05,Math.max(0,now-(last||now)));last=now;
  let frac=0,timed=0;try{frac=maxShield>0?Math.max(0,Math.min(1,shield/maxShield)):0;timed=bulletShieldTime||0;}catch{}
  try{if(prevSh!=null&&shield<prevSh-1e-6)fl=1;prevSh=shield;}catch{}fl=Math.max(0,fl-dt*3);
  const want=((timed>0||frac>0)&&!(window.BUB231!==false&&typeof superTime!=='undefined'&&superTime>0))?1:0;/* V231: chủ dự án 12/11 — Bạo Tẩu không vẽ bong bóng khiên tròn quanh tàu (khiên vẫn chặn đạn). Tắt: BUB231=false */vis+=(want-vis)*Math.min(1,dt*ARMOR69.fade);if(vis<.02)return;
  let a=timed>0?1:(.38+.42*frac);if(timed>0&&timed<2&&Math.floor(now*10)%2)a*=.35;a=Math.min(1,a*vis+.45*fl);
  const q=(()=>{try{return VisualFX.reduced();}catch{return false;}})();const x=player.x,y=player.y,r=ARMOR69.r*(timed>0?1.08:1)+(q?0:Math.sin(now*4)*1.2);
  if(window.SH183!==false)a*=.55;/* V183: chủ dự án chọn giữ khiên tròn nhưng mờ, mảnh hơn */
  ctx.save();ctx.globalCompositeOperation='source-over';
  const g=ctx.createRadialGradient(x,y-r*.15,r*.2,x,y,r);g.addColorStop(0,'rgba(90,170,255,'+(.05*a)+')');g.addColorStop(.7,'rgba(70,160,255,'+(.16*a)+')');g.addColorStop(.93,'rgba(150,220,255,'+(.42*a)+')');g.addColorStop(1,'rgba(150,220,255,0)');
  ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,r,0,TAU);ctx.fill();
  ctx.globalCompositeOperation='lighter';ctx.lineWidth=window.SH183!==false?1.1:1.6;ctx.strokeStyle='rgba(190,240,255,'+(.55*a)+')';ctx.beginPath();ctx.arc(x,y,r*.96,0,TAU);ctx.stroke();
  const hg=ctx.createRadialGradient(x-r*.35,y-r*.45,0,x-r*.35,y-r*.45,r*.4);hg.addColorStop(0,'rgba(255,255,255,'+(.22*a)+')');hg.addColorStop(1,'rgba(255,255,255,0)');ctx.fillStyle=hg;ctx.beginPath();ctx.arc(x-r*.35,y-r*.45,r*.4,0,TAU);ctx.fill();
  ctx.restore();}
 try{const vd=VisualFX.draw;VisualFX.draw=function(){const r=vd.apply(this,arguments);try{bubble();}catch{}return r;};}catch{}
 try{if(typeof FX40!=='undefined'&&FX40.shieldBubble)FX40.shieldBubble=function(){return bulletShieldTime>0;};}catch{}
 function draw(c,s){try{if(window.ARM140!==false)return;/* V140: như game gốc, giáp không có hình trong trận (khiên tròn + hiệu ứng kích hoạt vẫn giữ) */const d=s.def;if(!d||d.tier==='sss'||!(window.TB133&&TB133[d.id]))return;const sup=typeof superTime!=='undefined'&&superTime>0,bt=sup&&s.assets[d.id+'_shell_bt'];const im=s.assets[d.id+'_shell_'+(bt?'bt':'idle')];const p=s.player;if(!im||!p)return;c.save();c.globalCompositeOperation='source-over';c.drawImage(im,p.x-96,p.y-96,192,192);c.restore();}catch(e){}}/* V133: giáp mới = 2 module khiên nhỏ hai bên hông */// lớp giáp của GEAR_FX: không vẽ gì nữa (bong bóng chung ở trên)
 return {draw,state:()=>({vis,fl})};
})();
// V69-F · Thay "khung hạng" RankArt trong trận (các tấm cánh + elip viền mảnh màu hạng SS hồng tím, trông như lỗi) bằng
//  vệt sáng dưới bụng tàu + vài đốm sáng bay vòng chậm theo màu hạng. Ngoài trận (Kho) giữ nguyên RankArt.
const RankFx69=(()=>{
 const TAU=Math.PI*2;
 function hex2(c,a){const n=parseInt((c||'#8fbecb').slice(1,7),16);return `rgba(${n>>16&255},${n>>8&255},${n&255},${a})`;}
 function draw(ctx,i,x,y,size,t){let n=0,col='#8fbecb';try{n=Workshop.index(i.grade)+(i.enhance||0)*.25;col=Workshop.color(i.grade);}catch{}if(n<=0)return;
  const q=(()=>{try{return VisualFX.reduced();}catch{return false;}})(),k=Math.min(1,n/3);ctx.save();ctx.globalCompositeOperation='lighter';
  const ry=size*.5,g=ctx.createRadialGradient(x,y+size*.2,0,x,y+size*.2,ry);g.addColorStop(0,hex2(col,.28*k));g.addColorStop(1,hex2(col,0));ctx.fillStyle=g;ctx.beginPath();ctx.ellipse(x,y+size*.2,ry,ry*.45,0,0,TAU);ctx.fill();
  const m=2+Math.round(2*k);for(let j=0;j<m;j++){const a=(q?0:t*.9)+j*TAU/m,px=x+Math.cos(a)*size*.62,py=y+size*.12+Math.sin(a)*size*.2,front=Math.sin(a)>0,r=1.6+1.4*k;
   ctx.globalAlpha=front?.85:.35;ctx.fillStyle=hex2(col,1);ctx.beginPath();ctx.arc(px,py,r*1.8,0,TAU);ctx.fill();ctx.fillStyle='#ffffff';ctx.beginPath();ctx.arc(px,py,r*.8,0,TAU);ctx.fill();}
  ctx.restore();}
 try{const od=RankArt.draw;RankArt.draw=function(ctx,i,x,y,size,t){if(typeof mode!=='undefined'&&(mode==='play'||mode==='pause')){try{draw(ctx,i,x,y,size,t);}catch{}return;}return od.apply(this,arguments);};}catch{}
 return {draw};
})();
