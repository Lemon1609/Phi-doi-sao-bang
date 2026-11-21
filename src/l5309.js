'use strict';
// V309 Lượt 5 · vật phẩm rơi mới (8 tranh GPT), quái tinh anh nổi bật, nổ quái mới.
//  • Vật phẩm: ảnh nền PICKUP51 đã đổi sang src/drop309 lúc dựng (DROP5=0 để giữ hộp lục giác bạc V78). Ở đây: nhịp 0,96↔1,06 + vòng sáng mảnh cộng sáng phía sau. Tắt: window.DROP309=false.
//  • Sao điểm: STAR183 đọc window.DROP309IM (tranh sao mới). Tắt cùng cờ.
//  • Quái tinh anh: vẽ ×1,25 + quầng cam–đỏ xoay (cộng sáng, α .45) dưới thân; ★ sáng hơn; thanh máu cam giữ. Va chạm giữ nguyên. Tắt: window.ELITE309=false.
//  • Nổ quái: chớp lõi trắng–cam 0,10 s + vòng xung kích mảnh 0,22 s (easeOutQuad); tinh anh 2 vòng to. Tắt: window.NO309=false.
//  Không dùng ctx.filter / shadowBlur; mọi quầng là sprite dựng 1 lần.
const L5309=(()=>{
 const TAU=Math.PI*2,A=typeof DROP309_IMG!=='undefined'?DROP309_IMG:{};
 const quiet=()=>{try{return VisualFX.reduced();}catch{return false;}};
 const light=()=>{try{return VisualFX.counts().quality==='light';}catch{return false;}};
 const T=()=>{try{return time;}catch{return performance.now()/1000;}};
 // ---- sprite dựng sẵn ----
 const C={};
 function ring(col,a){const k='r'+col+a;if(C[k])return C[k];const n=128,c=document.createElement('canvas');c.width=c.height=n;const g=c.getContext('2d'),h=n/2,gr=g.createRadialGradient(h,h,h*.5,h,h,h);
  gr.addColorStop(0,'rgba(0,0,0,0)');gr.addColorStop(.55,col+'00');gr.addColorStop(.74,col);gr.addColorStop(.8,col);gr.addColorStop(1,col+'00');g.globalAlpha=a;g.fillStyle=gr;g.fillRect(0,0,n,n);return C[k]=c;}
 function core(){if(C.core)return C.core;const n=128,c=document.createElement('canvas');c.width=c.height=n;const g=c.getContext('2d'),h=n/2,gr=g.createRadialGradient(h,h,0,h,h,h);
  gr.addColorStop(0,'rgba(255,255,255,1)');gr.addColorStop(.22,'rgba(255,247,214,.95)');gr.addColorStop(.48,'rgba(255,170,60,.6)');gr.addColorStop(.75,'rgba(249,115,22,.18)');gr.addColorStop(1,'rgba(249,115,22,0)');g.fillStyle=gr;g.fillRect(0,0,n,n);return C.core=c;}
 function shock(col){const k='s'+col;if(C[k])return C[k];const n=192,c=document.createElement('canvas');c.width=c.height=n;const g=c.getContext('2d'),h=n/2;
  const gr=g.createRadialGradient(h,h,h*.78,h,h,h);gr.addColorStop(0,'rgba(255,255,255,0)');gr.addColorStop(.35,col);gr.addColorStop(.55,'rgba(255,255,255,.95)');gr.addColorStop(.75,col);gr.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=gr;g.fillRect(0,0,n,n);return C[k]=c;}
 function aura(){if(C.aura)return C.aura;const n=160,c=document.createElement('canvas');c.width=c.height=n;const g=c.getContext('2d'),h=n/2;
  const gr=g.createRadialGradient(h,h,h*.18,h,h,h);gr.addColorStop(0,'rgba(239,68,68,0)');gr.addColorStop(.42,'rgba(239,68,68,.7)');gr.addColorStop(.68,'rgba(249,115,22,1)');gr.addColorStop(.85,'rgba(249,115,22,.45)');gr.addColorStop(1,'rgba(249,115,22,0)');g.fillStyle=gr;g.fillRect(0,0,n,n);
  // 3 cung sáng để thấy quay
  g.globalCompositeOperation='lighter';g.lineCap='round';for(let i=0;i<3;i++){const a0=i*TAU/3;g.strokeStyle=i%2?'rgba(249,115,22,.95)':'rgba(239,68,68,.95)';g.lineWidth=5;g.beginPath();g.arc(h,h,h*.74,a0,a0+TAU/7);g.stroke();g.strokeStyle='rgba(255,220,170,.8)';g.lineWidth=1.6;g.beginPath();g.arc(h,h,h*.74,a0+.05,a0+TAU/7-.05);g.stroke();}
  return C.aura=c;}
 // ---- 1. vật phẩm rơi ----
 const DCOL={power:'#ff7a2e',heal:'#4ade80',shield:'#22d3ee',bomb:'#ff4d4d',drone:'#60a5fa',super:'#c084fc',magnet:'#a78bfa',star:'#fbbf24'};
 const dOn=()=>window.DROP309!==false&&A.power;
 const im={};for(const k in A){const i=new Image();i.decoding='async';i.src=A[k];im[k]=i;}
 if(im.star)window.DROP309IM=im.star;
 function glow(x,y,sz,col,ph){if(light())return;const g=ctx,k=quiet()?0:(Math.sin(T()*3+(ph||0))+1)/2,r=sz*(.62+.05*k);g.save();g.globalCompositeOperation='lighter';g.globalAlpha=.22+.12*k;g.drawImage(ring(col,1),x-r,y-r,r*2,r*2);g.restore();}
 const kp=d=>quiet()?1:1.01+.05*Math.sin(T()*4+(d.ph||0)*1.3);/* 0,96 ↔ 1,06 */
 function hook(){
  if(typeof Pickup51!=='undefined'&&!Pickup51.__l5){Pickup51.__l5=1;const od=Pickup51.draw;Pickup51.draw=function(d,y,sz){
    if(!dOn()||!d||!DCOL[d.type])return od.apply(this,arguments);
    try{const base=quiet()?1:1+.06*Math.sin(T()*6+(d.ph||0));sz=sz/base*kp(d);glow(d.x,y,sz,DCOL[d.type],d.ph);}catch{}
    return od.call(this,d,y,sz);};}
 }
 // ---- 2. quái tinh anh ----
 const eOn=()=>window.ELITE309!==false;
 function eHook(){if(typeof EnemyFleet==='undefined'||EnemyFleet.__l5)return;EnemyFleet.__l5=1;const de=EnemyFleet.drawEnemy;EnemyFleet.drawEnemy=function(e){
   if(!eOn()||!e||!e.elite||e.dead||e===window.boss)return de.apply(this,arguments);
   const g=ctx,r=((e.r||22)*1.25+10)*2.1;
   try{g.save();g.globalCompositeOperation='lighter';g.globalAlpha=.45;g.translate(e.x,e.y);if(!quiet())g.rotate(T()*1.6);g.drawImage(aura(),-r,-r,r*2,r*2);g.restore();}catch{}
   g.save();g.translate(e.x,e.y);g.scale(1.25,1.25);g.translate(-e.x,-e.y);let rv;try{rv=de.apply(this,arguments);}finally{g.restore();}try{star(e);}catch{}return rv;};}
 function star(e){/* thay vòng tím/vàng r36 + ★ nhỏ của bản gốc */const g=ctx,y=e.y-((e.r||22)*1.25+24);g.save();g.textAlign='center';g.font='bold 17px sans-serif';g.fillStyle='#3a1300';g.fillText('★',e.x+1,y+1);g.fillStyle='#ffe27a';g.fillText('★',e.x,y);
   if(!light()){g.globalCompositeOperation='lighter';g.globalAlpha=.55;const r=11;g.drawImage(ring('#fbbf24',1),e.x-r,y-5-r,r*2,r*2);}g.restore();}
 // ---- 3. nổ quái ----
 const nOn=()=>window.NO309!==false;const FX=[];
 function add(e){if(!nOn()||!e||quiet()||e.__l5no)return;e.__l5no=1;let isB=false;try{isB=e===boss||e.bossPart;}catch{}if(isB||e.rescue28)return;
   const big=!!(e.elite||e.large);FX.push({x:e.x,y:e.y,t0:T(),r:(e.r||22)*(e.large?1.5:1),el:!!e.elite,big});if(FX.length>(light()?10:24))FX.shift();}
 function drawNo(){if(!FX.length)return;const g=ctx,t=T();g.save();g.globalCompositeOperation='lighter';
   for(let i=FX.length-1;i>=0;i--){const f=FX[i],u=t-f.t0;if(u<0||u>.36){FX.splice(i,1);continue;}
    if(u<.10){const p=u/.10,s=f.r*(1.6+1.4*p)*(f.big?1.3:1);g.globalAlpha=1-p*p;g.drawImage(core(),f.x-s,f.y-s,s*2,s*2);}
    const rs=f.el?[[0,1.9,'#fb923c'],[.05,3.0,'#ef4444']]:[[0,f.big?2.2:1.7,'#fdba74']];
    for(const [d,m,col] of rs){const v=(u-d)/.22;if(v<0||v>1)continue;const e2=1-(1-v)*(1-v),R=f.r*(.5+m*e2)+6;g.globalAlpha=(1-e2)*(f.el?.95:.8);g.drawImage(shock(col),f.x-R,f.y-R,R*2,R*2);}}
   g.restore();}
 function nHook(){try{if(typeof kill==='function'&&!kill.__l5){const ok=kill;const f=function(e){const was=e&&!e.dead;const r=ok.apply(this,arguments);try{if(was&&e.dead)add(e);}catch{}return r;};f.__l5=1;kill=f;}}catch{}
   try{if(typeof VisualFX!=='undefined'&&!VisualFX.__l5){VisualFX.__l5=1;const vd=VisualFX.draw;VisualFX.draw=function(){const r=vd.apply(this,arguments);try{drawNo();}catch{}return r;};}}catch{}}
 function boot(){hook();eHook();nHook();}
 boot();setTimeout(boot,0);setTimeout(boot,1500);
 return {star,on:eOn,dOn,glow,kp,fx:()=>FX.length,FX,DCOL};
})();
