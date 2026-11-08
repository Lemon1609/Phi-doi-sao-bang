'use strict';
// RV75 · REVIEW75 (Gemini 23/10) — phần chạy trong trận:
//  1) 3 đội hình bay mới PINCER_CROSS / VORTEX_ORBIT / SINE_WEAVE (khung Gemini 480×1100 → nhân y theo H/1100).
//     Áp cho ~40% nhóm quái thường từ ải 21 (không áp quái lớn/tinh anh, không áp Vô tận/Phó bản boss).
//  2) Chống "tường đạn": > 14 viên trong bán kính 110 px quanh tàu thì đạn mới bắn lệch 12° ra xa tàu.
//  3) Đạn có cờ fix75 (đòn boss nhanh) không bị kẹp 260 px/s của Threat30.
//  4) Vệt sáng dọc (loot beam 28 px) dưới sao & vật phẩm rơi để tách khỏi đạn địch.
//  Tắt từng phần: window.RV75_FORM=false, RV75_DENS=false, RV75_BEAM=false.
const REVIEW75_RUN={
 FORM:{fromStage:21,chance:.4,delay:{PINCER_CROSS:.28,VORTEX_ORBIT:.22,SINE_WEAVE:.30}},
 DENS:{near:110,max:14,deflectDeg:12},
 BEAM:{h:28,starCol:'#ffd166',itemCol:'#00ff88'}};
const RV75=(()=>{
 const C=REVIEW75_RUN,TAU=Math.PI*2;
 const F={
  PINCER_CROSS(t,i){const tau=Math.max(0,t-Math.floor(i/2)*.28),side=i%2===0?1:-1;return {x:240-side*210*Math.cos(.85*tau),y:-40+220*tau-75*Math.sin(1.7*tau)};},
  VORTEX_ORBIT(t,i,n){const tau=Math.max(0,t-i*.22),R=40+160*Math.exp(-.6*tau),a=2.4*tau+TAU*i/Math.max(1,n);
   if(tau<3.5)return {x:240+R*Math.cos(a),y:340-380*Math.exp(-1.8*tau)+R*Math.sin(a)};
   const ey=340+(40+160*Math.exp(-2.1))*Math.sin(2.4*3.5+TAU*i/Math.max(1,n));return {x:240+R*Math.cos(a),y:ey+320*(tau-3.5)};},
  SINE_WEAVE(t,i){const tau=Math.max(0,t-Math.floor(i/2)*.30),p=i%2===0?1:-1;return {x:240+p*155*Math.sin(2.6*tau),y:-40+145*tau};}};
 const KEYS=Object.keys(F);
 const groups=new Map();let gcount=0;
 const playing=()=>typeof mode!=='undefined'&&mode==='play';
 function eligible(){try{if(gameMode!=='campaign')return false;if(Dungeons.active())return false;if(Meta40.state().run)return false;}catch{}return (level|0)>=C.FORM.fromStage;}
 function assign(){if(window.RV75_FORM===false||!eligible())return;for(const e of enemies){if(e.dead||e.f75!==undefined||e.group30===undefined)continue;
   let g=groups.get(e.group30);if(!g){g={k:Math.random()<C.FORM.chance?KEYS[(gcount++)%KEYS.length]:null,list:[]};groups.set(e.group30,g);}
   if(!g.k||e.large||e.elite||e.boss||e.bossPart||e.rescue28){e.f75=null;continue;}e.f75={k:g.k,i:g.list.length,t0:e.age||0};g.list.push(e);}
  for(const g of groups.values())if(g.k)for(const e of g.list)if(e.f75)e.f75.n=g.list.length;}
 function place(){const sy=(typeof H==='number'?H:1100)/1100;for(const e of enemies){const f=e.f75;if(!f||e.dead)continue;const p=F[f.k]((e.age||0)-f.t0,f.i,f.n||1);e.x=Math.max(20,Math.min(W-20,p.x));e.y=p.y*sy;}}
 // chống tường đạn
 let nearN=0;
 function density(){if(window.RV75_DENS===false)return;const R2=C.DENS.near*C.DENS.near;let n=0;const fresh=[];
  for(const b of bullets){if(b.dead)continue;const dx=b.x-player.x,dy=b.y-player.y;if(dx*dx+dy*dy<R2)n++;if(!b.c75&&(b.age||0)<.08)fresh.push(b);}
  nearN=n;if(n<C.DENS.max){for(const b of fresh)b.c75=1;return;}
  const a=C.DENS.deflectDeg*Math.PI/180;for(const b of fresh){b.c75=1;if(b.boss75)continue;const toP=Math.atan2(player.y-b.y,player.x-b.x),va=Math.atan2(b.vy,b.vx);let d=va-toP;while(d>Math.PI)d-=TAU;while(d<-Math.PI)d+=TAU;if(Math.abs(d)>.6)continue;
   const s=d>=0?1:-1,sp=Math.hypot(b.vx,b.vy),na=va+s*a;b.vx=Math.cos(na)*sp;b.vy=Math.sin(na)*sp;}}
 // vệt sáng vật phẩm
 function beams(){if(window.RV75_BEAM===false)return;try{const B=C.BEAM,h=B.h*(typeof W!=='undefined'?W/480:1)*1.0;ctx.save();ctx.globalCompositeOperation='lighter';
   for(const d of drops){if(d.dead)continue;const col=d.type==='star'?B.starCol:B.itemCol,y0=d.y-(d.type==='star'?4:12),hh=d.type==='star'?h:h*1.4,w=d.type==='star'?3:5;
    const g=ctx.createLinearGradient(0,y0,0,y0-hh);g.addColorStop(0,col+'aa');g.addColorStop(1,col+'00');ctx.fillStyle=g;ctx.globalAlpha=.75+.25*Math.sin((d.t||0)*6);ctx.fillRect(d.x-w/2,y0-hh,w,hh);}
   ctx.restore();}catch{}}
 function install(){
  try{const ou=update;update=function(dt){const r=ou.apply(this,arguments);try{if(playing()){assign();place();density();}}catch(e){console.warn('RV75',e);}return r;};}catch{}
  try{const ov=Threat30.velocity;Threat30.velocity=function(b){if(b&&b.fix75)return;return ov.apply(this,arguments);};}catch{}
  try{const od=Loot40.draw;Loot40.draw=function(){try{if(playing())beams();}catch{}return od.apply(this,arguments);};}catch{}
  // GPT V75 #2: tối nền trận (chỉ lớp nền, không phủ đạn/HUD). Tắt: window.BG76=0
  try{const ob=Report392.background;Report392.background=function(){const r=ob.apply(this,arguments);try{const a=window.BG76??.28;if(a>0&&(mode==='play'||mode==='pause')){ctx.save();ctx.globalCompositeOperation='source-over';ctx.globalAlpha=a;ctx.fillStyle='#071020';ctx.fillRect(-40,-40,(typeof W==='number'?W:480)+80,(typeof H==='number'?H:1100)+80);ctx.restore();}}catch{}return r;};}catch{}
  try{const ors=reset;reset=function(){groups.clear();gcount=0;return ors.apply(this,arguments);};}catch{}}
 setTimeout(()=>{try{install();}catch(e){console.warn('RV75 install',e);}},0);
 return {F,state:()=>({groups:groups.size,formed:enemies.filter(e=>e.f75&&!e.dead).map(e=>e.f75.k),near:nearN})};
})();
