// V309b · Hiệu ứng tia 3 lớp + sprite GPT (Gemini 20/11 13:43): tia năng lượng có đầu nòng + điểm chạm, sét bện 2 đường,
//  nổ hạt nhân, pha lê lăng kính, lưỡi trảm, vòng xung kích. Ảnh: global FX309_IMG (src/fx309img). Tắt toàn bộ: window.FX309=false
(()=>{
 const IMG={},T=['thuong','luc','lam','tim','tim5','ss'];
 function im(k){const A=window.FX309_IMG;if(!A||!A[k])return null;let i=IMG[k];if(!i){i=new Image();i.src=A[k];IMG[k]=i;}return i.complete&&i.naturalWidth?i:null;}
 const on=()=>window.FX309!==false;
 // màu [lõi, thân, viền] theo bậc — trùng bảng dan307 (MAU309); Tím = tím hoàng gia (cột 4 GPT)
 const PAL={thuong:['#d8f3ff','#5bc0eb','#1d4ed8'],luc:['#bbf7d0','#10b981','#047857'],lam:['#bae6fd','#0284c7','#1e3a8a'],tim:['#e9d5ff','#9333ea','#581c87'],tim5:['#f5d0fe','#d946ef','#86198f'],ss:['#fef08a','#f59e0b','#b45309']};
 const tk=t=>T.includes(t)?t:'lam';
 // Bạc Thép Xanh cho bậc Thường: cột 1 GPT giảm bão hòa (Gemini: saturate 55 %, brightness 108 %) để tách khỏi bậc Lam
 const SAT={};function tex(k,t){const i=im(k+'_'+t);if(!i)return null;if(t!=='thuong')return i;if(SAT[k])return SAT[k];try{const c=document.createElement('canvas');c.width=i.naturalWidth;c.height=i.naturalHeight;const g=c.getContext('2d');g.filter='saturate(55%) brightness(108%)';g.drawImage(i,0,0);return SAT[k]=c;}catch{return i;}}
 const now=()=>performance.now()/1000;
 // tia: (x1,y1) nòng → (x2,y2) điểm chạm; w = bề rộng ảnh tia (ảnh có sẵn quầng + thân + lõi)
 function beam(g,x1,y1,x2,y2,t,w,a,opt){t=tk(t);a=a==null?1:a;opt=opt||{};const dx=x2-x1,dy=y2-y1,len=Math.hypot(dx,dy);if(len<2)return;const tx=tex('beam',t),P=PAL[t],tt=now();
  g.save();g.translate(x1,y1);g.rotate(Math.atan2(dy,dx)+Math.PI/2);g.globalCompositeOperation='lighter';
  if(tx){g.globalAlpha=a;g.drawImage(tx,-w/2,-len,w,len);g.globalAlpha=a*.45;g.save();g.scale(-1,1);const sh=(tt*3)%1;g.drawImage(tx,0,(tx.height||512)*sh*.5,(tx.width||64),(tx.height||512)*.5,-w*.55,-len,w*1.1,len);g.restore();}
  else{g.globalAlpha=a*.3;g.strokeStyle=P[2];g.lineWidth=w*.8;g.lineCap='round';g.beginPath();g.moveTo(0,0);g.lineTo(0,-len);g.stroke();g.globalAlpha=a*.85;g.strokeStyle=P[1];g.lineWidth=w*.35;g.stroke();}
  // lõi siêu nhiệt rung theo sin (Gemini: 2,5 ± 0,8 px)
  g.globalAlpha=a*.9;g.strokeStyle=P[0];g.lineWidth=Math.max(1.2,(2.5+Math.sin(tt*28)*.8)*(w/22));g.lineCap='round';g.beginPath();g.moveTo(0,0);g.lineTo(0,-len);g.stroke();
  g.restore();
  if(opt.flare!==false)flare(g,x1,y1,t,opt.fs||Math.max(18,w*1.1),a);
  if(opt.ring!==false)ring(g,x2,y2,t,opt.rs||Math.max(20,w*1.2),a);}
 function flare(g,x,y,t,s,a){const i=tex('flare',tk(t));if(!i)return;g.save();g.globalCompositeOperation='lighter';g.globalAlpha=(a==null?1:a);g.translate(x,y);g.rotate(now()*1.6);g.drawImage(i,-s/2,-s/2,s,s);g.restore();}
 function ring(g,x,y,t,s,a){const i=tex('ring',tk(t));if(!i)return;const p=.85+.15*Math.sin(now()*22);g.save();g.globalCompositeOperation='lighter';g.globalAlpha=(a==null?1:a)*.9;g.translate(x,y);g.rotate(-now()*2);g.drawImage(i,-s*p/2,-s*p/2,s*p,s*p);g.restore();}
 // sét bện: đường chính 3,5 px + quầng 10 px + đường phụ 1,5 px lệch pha (đổi mỗi 0,05 s)
 function jag(ax,ay,bx,by,n,amp,seed){const P=[[ax,ay]];let s=seed;const rnd=()=>{s=(s*9301+49297)%233280;return s/233280-.5;};for(let k=1;k<n;k++){const q=k/n,nx=-(by-ay),ny=bx-ax,l=Math.hypot(nx,ny)||1,o=rnd()*amp*Math.sin(q*Math.PI);P.push([ax+(bx-ax)*q+nx/l*o,ay+(by-ay)*q+ny/l*o]);}P.push([bx,by]);return P;}
 function path(g,P){g.beginPath();g.moveTo(P[0][0],P[0][1]);for(let k=1;k<P.length;k++)g.lineTo(P[k][0],P[k][1]);}
 function bolt(g,ax,ay,bx,by,t,a){t=tk(t);a=a==null?1:a;const P=PAL[t],f=Math.floor(now()*20),L=Math.hypot(bx-ax,by-ay),n=Math.max(4,Math.round(L/14));
  const m=jag(ax,ay,bx,by,n,16,f*7+3),s=jag(ax,ay,bx,by,n,22,f*13+11);
  g.save();g.globalCompositeOperation='lighter';g.lineJoin='round';g.lineCap='round';
  path(g,m);g.globalAlpha=a*.35;g.strokeStyle=P[2];g.lineWidth=10;g.stroke();g.globalAlpha=a*.95;g.strokeStyle=P[1];g.lineWidth=3.5;g.stroke();g.globalAlpha=a;g.strokeStyle=P[0];g.lineWidth=1.4;g.stroke();
  path(g,s);g.globalAlpha=a*.7;g.strokeStyle=P[1];g.lineWidth=1.5;g.stroke();
  g.restore();ring(g,bx,by,t,22,a);}
 function spr(g,k,x,y,s,a,rot,comp){const i=im(k);if(!i)return false;g.save();g.globalCompositeOperation=comp||'lighter';g.globalAlpha=a==null?1:a;g.translate(x,y);if(rot)g.rotate(rot);g.drawImage(i,-s/2,-s/2,s,s);g.restore();return true;}
 // hạt văng ở điểm chạm (bể hạt dùng lại, tối đa 80 — Gemini mục E)
 const POOL=[];for(let k=0;k<80;k++)POOL.push({on:0});let pi=0;
 function sparks(x,y,t,n){const c=PAL[tk(t)];for(let k=0;k<(n||4);k++){const p=POOL[pi=(pi+1)%80];const a=Math.random()*6.283,v=120+Math.random()*160;p.on=1;p.x=x;p.y=y;p.vx=Math.cos(a)*v;p.vy=Math.sin(a)*v;p.life=.15;p.c=c[k%2?0:1];}}
 let lastT=0;function drawSparks(g){const t=now(),dt=Math.min(.05,t-(lastT||t));lastT=t;g.save();g.globalCompositeOperation='lighter';for(const p of POOL){if(!p.on)continue;p.life-=dt;if(p.life<=0){p.on=0;continue;}p.x+=p.vx*dt;p.y+=p.vy*dt;g.globalAlpha=p.life/.15;g.strokeStyle=p.c;g.lineWidth=2;g.beginPath();g.moveTo(p.x,p.y);g.lineTo(p.x-p.vx*.03,p.y-p.vy*.03);g.stroke();}g.restore();}
 // tô lại sprite theo bậc (ảnh alpha=max: cường độ = sáng × alpha); Tím giữ nguyên màu GPT
 const TN={};function tint(k,t){const i=im(k);if(!i||t==='tim'||!PAL[t])return i;const key=k+'|'+t;if(TN[key])return TN[key];
  try{const h=x=>[1,3,5].map(j=>parseInt(x.slice(j,j+2),16)),B=PAL[t].map(h),mx=(a,b,f)=>[a[0]+(b[0]-a[0])*f,a[1]+(b[1]-a[1])*f,a[2]+(b[2]-a[2])*f];const W=i.naturalWidth,H=i.naturalHeight,c=document.createElement('canvas');c.width=W;c.height=H;const g=c.getContext('2d');g.drawImage(i,0,0);const d=g.getImageData(0,0,W,H),p=d.data;
   for(let j=0;j<p.length;j+=4){if(!p[j+3])continue;const v=Math.max(p[j],p[j+1],p[j+2])/255*p[j+3]/255,q=v<.25?mx(B[2].map(x=>x*.6),B[2],v/.25):v<.55?mx(B[2],B[1],(v-.25)/.3):v<.85?B[1]:mx(B[1],B[0],Math.min(1,(v-.85)/.15));p[j]=q[0];p[j+1]=q[1];p[j+2]=q[2];p[j+3]=Math.min(255,p[j+3]*1.25);}
   g.putImageData(d,0,0);return TN[key]=c;}catch{return i;}}
 function tierOf(i){try{return Dan299.tierOf(i)||'tim';}catch{return 'tim';}}
 function shipTier(){try{return tierOf(selected);}catch{return 'tim';}}
 const GT=['thuong','luc','lam','tim','tim5'];
 function gearTier(lv){return GT[Math.max(0,Math.min(4,(lv|0)-1))]||'lam';}
 setTimeout(()=>{try{const vd=VisualFX.draw;if(vd.__f309)return;const nd=function(){const r=vd.apply(this,arguments);try{if(on())drawSparks(ctx);}catch{}return r;};nd.__f309=1;VisualFX.draw=nd;}catch{}},0);
 window.FX309={tint,on,PAL,beam,bolt,flare,ring,spr,sparks,drawSparks,tierOf,shipTier,gearTier,im};
})();
