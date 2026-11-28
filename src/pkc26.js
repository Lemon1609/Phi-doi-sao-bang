'use strict';
// V2.2.3 · Gói C (T26): NỀN ĐỊA HÌNH PARALLAX. 3 nền (Quỹ Đạo cơ khí đỏ · Thành Phố Mây lam · Thung Lũng lục) nối mép trên–dưới,
//  trôi 75 px/s; lớp mây (độ sáng → alpha, α ≤ .28) trôi ×1,55. Bạo Tẩu ×1,85, Xung Kích S (pkb25 __surgeS25) ×3,2, đổi tốc mượt.
//  Chiến dịch: chương → nền (1,4 Thung Lũng · 3,5,8,9 Thành Phố Mây · 2,6,7,10 Quỹ Đạo). Vô tận: bắt đầu Thung Lũng, mỗi boss
//  xuất hiện chuyển nền kế tiếp (hòa 1,2 s). Vẽ qua NEN194.draw (v194 gọi PKC26.draw) nên lớp tối tran307, sét l7309, vệt tốc vfx23 vẫn chạy.
//  Chỉ drawImage ảnh nạp sẵn: không tạo canvas, không filter / shadowBlur. Tắt: window.PKC26=false
const PKC26=(()=>{
 const A=window.PKC26_IMG||{},IM={},NAMES=['valley','skycity','orbit'];
 const CH={1:0,4:0,3:1,5:1,8:1,9:1,2:2,6:2,7:2,10:2};
 const BASE=75,CLOUD=1.55,KBT=1.85,KS=3.2,CA=.28,FADE=1.2;
 const im=k=>{const s=A['bg_'+k];if(!s)return null;let i=IM[k];if(!i){i=new Image();i.decoding='async';i.src=s;IM[k]=i;}return i.complete&&i.naturalWidth?i:null;};
 setTimeout(()=>{for(const n of NAMES)im(n);im('clouds');},1200);
 const S={y:0,yc:0,k:1,cur:-1,prev:-1,ft:0,eIdx:0,hadBoss:false,lastLv:-1,lastMode:'',n:0};
 const off=()=>window.PKC26===false||!A.bg_valley;
 function biome(){try{
  if(gameMode==='endless')return S.eIdx%3;
  if(gameMode==='campaign'){const c=Campaign36.chapter(level)+1;return CH[c]!=null?CH[c]:0;}
 }catch{}return -1;}
 const on=()=>{if(off())return false;try{if(mode!=='play'&&mode!=='pause')return false;}catch{return false;}return biome()>=0;};
 function target(){let k=1;try{if(window.__surgeS25>0)k=KS;else if(superTime>0)k=KBT;}catch{}return k;}
 function layer(img,y,a){const h=Math.round(W*img.naturalHeight/img.naturalWidth);if(!h)return;let o=y%h;if(o<0)o+=h;ctx.globalAlpha=a;
  for(let yy=o-h;yy<H;yy+=h)ctx.drawImage(img,0,yy,W,h);}
 function track(){let md='';try{md=mode;}catch{}
  // vào trận mới (Vô tận): về nền đầu
  try{if(md==='play'&&S.lastMode!=='play'&&S.lastMode!=='pause'&&gameMode==='endless'&&stageTime<2){S.eIdx=0;S.cur=-1;S.hadBoss=false;}}catch{}
  S.lastMode=md;
  try{if(gameMode==='endless'){const b=!!boss;if(b&&!S.hadBoss){S.eIdx++;}S.hadBoss=b;}}catch{}
  const t=biome();if(t!==S.cur){if(S.cur<0){S.cur=t;S.prev=-1;S.ft=0;}else{S.prev=S.cur;S.cur=t;S.ft=FADE;}}}
 function draw(dt,still){if(!on())return false;track();
  const b=im(NAMES[S.cur]);if(!b)return false;
  if(!(dt>0)||dt>.1)dt=.016;
  if(!still){const tk=target();S.k+=(tk-S.k)*Math.min(1,dt*(tk>S.k?6:2.5));const v=BASE*S.k;S.y+=dt*v;S.yc+=dt*v*CLOUD;if(S.ft>0)S.ft-=dt;S.n++;}
  ctx.save();try{ctx.globalCompositeOperation='source-over';
   if(S.ft>0&&S.prev>=0){const p=im(NAMES[S.prev]);if(p)layer(p,S.y,1);layer(b,S.y,1-Math.max(0,S.ft)/FADE);}else layer(b,S.y,1);
   const c=im('clouds');if(c)layer(c,S.yc,CA);
  }catch{}ctx.restore();return true;}
 function full(){if(!on())return false;const t=biome();if(t<0||!im(NAMES[t]))return false;if(S.ft>0&&S.prev>=0&&!im(NAMES[S.prev]))return false;return true;}
 return {on,draw,full,state:()=>({on:on(),cur:S.cur>=0?NAMES[S.cur]:'',k:Math.round(S.k*100)/100,eIdx:S.eIdx,fade:Math.max(0,S.ft),y:Math.round(S.y),n:S.n}),NAMES,CH};
})();
window.PKC26S=PKC26;
