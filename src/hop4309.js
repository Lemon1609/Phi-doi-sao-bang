'use strict';
// V309 Lượt 4 · CHIẾN THẦN HỢP THỂ (công thức 1–1, tranh GPT 21/11) — cỡ vẽ, hào quang, biến hình 3 pha, dải cut-in. Tắt: window.HOP4309=false
//  • Dạng chiến cơ ×1,35 (≈ 98 px cạnh dài, to hơn 13 chiến cơ v4 ~15–20 % theo diện tích); dạng robot giữ cỡ cũ (≈ 127 px) + thở 1,00↔1,03.
//  • Biến hình (dạng chiến cơ → robot): 0–0,15 s tối nền α .45 + tia sáng hút vào tâm · 0,15–0,28 s chớp sáng + 2 vòng xung kích đồng tâm,
//    thân robot vọt 1,17× rồi về (easeOutBack) · dải cut-in chéo 0,6 s ở 1/5 trên màn (không che vùng né đạn) có ảnh mặt trước + tên.
//  • Robot: hào quang gạch xoay sau lưng + luồng hạt năng lượng trôi ngược về đuôi. Hitbox / sát thương không đổi.
//  Không ctx.filter / shadowBlur. Ảnh mặt trước = hàng 2 của SSS_ATLAS (đã nhúng).
(()=>{const ON=()=>window.HOP4309!==false;
 // nút chính màn Hợp thể khi chưa đủ điều kiện: khung nút tím B5 (khóa) thay khung bạc
 try{if(ON()&&window.HOP307_IMG&&HOP307_IMG.nut_tim_khoa){const n=':not(#_h4)'.repeat(36),st=document.createElement('style');st.id='hop4309-css';st.textContent=`html body #ht-x${n}:disabled{background-image:url(${HOP307_IMG.nut_tim_khoa})!important;color:#e9d5ff!important;text-shadow:0 1px 2px #000!important;filter:none!important;opacity:1!important}`;document.head.appendChild(st);}}catch{}
 const KF=1.35,KR0=1.0;/* V2.2.3 VFX đợt 2: Chiến Thần dạng robot 1,18× (window.KR23) */
 const st={on:false,tOn:-9,parts:[],last:0,i:-1};
 const rgba=(h,a)=>{const n=parseInt(String(h).slice(1,7),16)||0;return 'rgba('+(n>>16&255)+','+(n>>8&255)+','+(n&255)+','+a+')';};
 const now=()=>typeof time==='number'?time:performance.now()/1000;
 const eob=x=>{x=Math.min(1,Math.max(0,x));const c1=1.70158,c3=c1+1;return 1+c3*Math.pow(x-1,3)+c1*Math.pow(x-1,2);};
 let FR=null;function front(){if(FR)return FR;if(typeof SSS_ATLAS==='undefined')return null;FR=new Image();FR.src=SSS_ATLAS;return FR;}
 function scale(f,on){if(!ON())return 1;let b=0;try{b=f.bloom();}catch{}const t=now();
  if(on&&!st.on)st.tOn=t;st.on=!!on;
  const KR=window.KR23||KR0;let k=KF*(1-b)+KR*b;if(b>.5)k*=1.015+.015*Math.sin(t*2.4);
  const ta=t-st.tOn;if(on&&ta>=.15&&ta<.6)k*=1+.17*(1-eob((ta-.15)/.3));
  return k;}
 function col(i){try{return SSS_MODELS[i].color||'#c084fc';}catch{return '#c084fc';}}
 function nameOf(i){try{return SSS_MODELS[i].name;}catch{return '';}}
 function back(i,sp,t){const c=ctx,x=player.x,y=player.y,C=col(i),ta=t-st.tOn;
  // tối nền + tia hút vào tâm (pha tụ)
  if(sp&&ta>=0&&ta<.28){const q=ta<.15?ta/.15:1-(ta-.15)/.13;c.save();c.fillStyle='rgba(0,0,0,'+(.45*q)+')';c.fillRect(-40,-40,(typeof W!=='undefined'?W:480)+80,(typeof H!=='undefined'?H:900)+80);
   if(ta<.15){c.globalCompositeOperation='lighter';c.strokeStyle=rgba(C,.75);c.lineWidth=2;for(let k=0;k<12;k++){const a=k/12*6.283+t*2,r0=180*(1-q)+30,r1=r0+70*(1-q)+20;c.beginPath();c.moveTo(x+Math.cos(a)*r1,y+Math.sin(a)*r1);c.lineTo(x+Math.cos(a)*r0,y+Math.sin(a)*r0);c.stroke();}}c.restore();}
  // hào quang xoay sau lưng robot
  if(sp&&ta>.15){const R=78,a0=t*.8;c.save();c.globalCompositeOperation='lighter';const g=c.createRadialGradient(x,y-10,R*.2,x,y-10,R*1.15);g.addColorStop(0,rgba(C,.18));g.addColorStop(1,rgba(C,0));c.fillStyle=g;c.fillRect(x-R*1.2,y-10-R*1.2,R*2.4,R*2.4);
   c.strokeStyle=rgba(C,.35);c.lineWidth=2;for(let k=0;k<8;k++){c.beginPath();c.arc(x,y-10,R,a0+k*.785,a0+k*.785+.5);c.stroke();}c.strokeStyle='rgba(253,224,71,.22)';c.lineWidth=1.2;for(let k=0;k<12;k++){c.beginPath();c.arc(x,y-10,R*.8,-a0*1.3+k*.524,-a0*1.3+k*.524+.3);c.stroke();}c.restore();}}
 function front2(i,sp,t,dt){const c=ctx,x=player.x,y=player.y,C=col(i),ta=t-st.tOn;
  // hạt năng lượng trôi ngược (robot)
  const P=st.parts;if(sp&&Math.random()<dt*14){P.push({x:x+(Math.random()-.5)*70,y:y-10+(Math.random()-.5)*50,vy:140+Math.random()*80,l:1});if(P.length>30)P.shift();}
  c.save();c.globalCompositeOperation='lighter';for(const p of P){p.y+=p.vy*dt;p.l-=dt*1.6;if(p.l<=0)continue;c.globalAlpha=p.l*.8;c.fillStyle=rgba(C,1);c.beginPath();c.arc(p.x,p.y,1.4+p.l*1.6,0,6.283);c.fill();}c.restore();st.parts=P.filter(p=>p.l>0);
  // chớp + 2 vòng xung kích (pha nổ)
  if(sp&&ta>=.15&&ta<.5){const q=(ta-.15)/.35;c.save();c.globalCompositeOperation='lighter';if(q<.4){const g=c.createRadialGradient(x,y,0,x,y,140);g.addColorStop(0,'rgba(255,255,255,'+(.8*(1-q/.4))+')');g.addColorStop(1,'rgba(255,255,255,0)');c.fillStyle=g;c.fillRect(x-140,y-140,280,280);}
   for(const [r0,r1,cc] of [[20,170,'#ffffff'],[10,120,C]]){c.globalAlpha=.85*(1-q);c.strokeStyle=cc;c.lineWidth=5*(1-q)+1;c.beginPath();c.arc(x,y,r0+(r1-r0)*q,0,6.283);c.stroke();}c.restore();}
  // dải cut-in 0,6 s (ảnh mặt trước + tên), ở 1/5 trên màn
  if(sp&&ta>=.1&&ta<.7&&window.CUTIN4309!==false){const u=(ta-.1)/.6,WW=(typeof W!=='undefined'?W:480),inn=u<.18?u/.18:u>.82?(1-u)/.18:1,off=(1-inn)*WW*(u<.5?-1:1),bh=96,by=140;
   c.save();c.translate(off,0);c.globalAlpha=Math.min(1,inn*1.2);c.beginPath();c.moveTo(-20,by+18);c.lineTo(WW+20,by-18);c.lineTo(WW+20,by-18+bh);c.lineTo(-20,by+18+bh);c.closePath();
   const g=c.createLinearGradient(0,0,WW,0);g.addColorStop(0,'rgba(8,10,24,.92)');g.addColorStop(.5,rgba(C,.55));g.addColorStop(1,'rgba(8,10,24,.92)');c.fillStyle=g;c.fill();c.strokeStyle=rgba(C,.95);c.lineWidth=2;c.stroke();
   const F=front();if(F&&F.complete&&F.naturalWidth){const s=F.naturalHeight/2;c.save();c.clip();c.drawImage(F,i*s,s,s,s,WW*.06,by-36,bh+70,bh+70);c.restore();}
   c.fillStyle='#ffffff';c.font="900 22px 'Neo',sans-serif";c.textAlign='right';c.fillText(nameOf(i).toUpperCase(),WW-24,by+bh*.45);c.font="700 12px 'Neo',sans-serif";c.fillStyle='#fde047';c.fillText('CHIẾN THẦN HỢP THỂ · KHAI HỎA',WW-24,by+bh*.45+20);c.restore();}}
 function hook(){try{if(typeof SSSGame==='undefined'||!SSSGame.draw||SSSGame.draw.__h4)return !!(typeof SSSGame!=='undefined'&&SSSGame.draw&&SSSGame.draw.__h4);const od=SSSGame.draw;
  const f=function(r,bank){if(!ON())return od.apply(this,arguments);let i=-1;try{i=SSSGame.indexFor(r);}catch{}if(i<0||typeof player==='undefined')return od.apply(this,arguments);
   const t=now(),dt=Math.min(.05,Math.max(0,t-(st.last||t)));st.last=t;let sp=false;try{sp=superTime>0;}catch{}if(st.i!==i){st.i=i;st.parts=[];}
   try{back(i,sp,t);}catch{}const res=od.apply(this,arguments);try{front2(i,sp,t,dt);}catch{}return res;};
  f.__h4=1;SSSGame.draw=f;return true;}catch{return false;}}
 // hoàn hợp kim tiến bậc của 2 robot bị bỏ (đổi dữ liệu ở lúc tải Fusion, khóa saobang-hop4309-v1)
 function refund(){try{const o=JSON.parse(localStorage.getItem('saobang-hop4309-v1')||'null');if(!o||o.paid||!(o.cr>0))return true;if(typeof Progress==='undefined'||!Progress.grantCredits)return false;Progress.grantCredits(o.cr);o.paid=1;localStorage.setItem('saobang-hop4309-v1',JSON.stringify(o));return true;}catch{return true;}}
 const iv=setInterval(()=>{const a=hook(),b=refund();if(a&&b)clearInterval(iv);},300);
 window.Hop4309={scale,st};
})();
