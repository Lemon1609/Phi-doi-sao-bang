'use strict';
// V2.2.3 · Gói C (T26): NỀN ĐỊA HÌNH PARALLAX. 3 nền (Quỹ Đạo cơ khí đỏ · Thành Phố Mây lam · Thung Lũng lục) nối mép trên–dưới,
//  trôi 75 px/s; lớp mây (độ sáng → alpha, α ≤ .28) trôi ×1,55. Bạo Tẩu ×1,85, Xung Kích S (pkb25 __surgeS25) ×3,2, đổi tốc mượt.
//  Chiến dịch: chương → nền (1,4 Thung Lũng · 3,5,8,9 Thành Phố Mây · 2,6,7,10 Quỹ Đạo). Vô tận: bắt đầu Thung Lũng, mỗi boss
//  xuất hiện chuyển nền kế tiếp (hòa 1,2 s). Vẽ qua NEN194.draw (v194 gọi PKC26.draw) nên lớp tối tran307, sét l7309, vệt tốc vfx23 vẫn chạy.
//  Chỉ drawImage ảnh nạp sẵn: không tạo canvas, không filter / shadowBlur. Tắt: window.PKC26=false
// V2.4-B: thêm 2 vùng 2 lớp — Vực Dung Nham (lava) · Hẻm Băng (ice): lớp nền bg_<n>_floor ×1,0 + lớp vách bg_<n>_cliffs ×1,65
//  (hành lang giữa trong suốt, không vẽ mây → vẫn 2 lớp toàn màn như vùng cũ). Chương 2,8 Dung Nham · 5,9 Băng.
//  Vô tận xoay 5 vùng theo boss: Thung Lũng → Dung Nham → Mây → Băng → Quỹ Đạo. Tắt riêng 2 vùng mới: window.NEN24B=false
const PKC26=(()=>{
 const A=window.PKC26_IMG||{},IM={},NAMES=['valley','skycity','orbit','lava','ice'];
 const CH0={1:0,4:0,3:1,5:1,8:1,9:1,2:2,6:2,7:2,10:2},CH1={1:0,4:0,3:1,2:3,8:3,5:4,9:4,6:2,7:2,10:2},EROT1=[0,3,1,4,2];
 const TWO={3:1,4:1},CLIFF=1.65;
 const nb=()=>window.NEN24B!==false&&!!A.bg_lava_floor&&!!A.bg_ice_floor;
 const BASE=75,CLOUD=1.55,KBT=1.85,KS=3.2,CA=.28,FADE=1.2;
 const key=k=>TWO[NAMES.indexOf(k)]?k+'_floor':k;
 const im=k=>{const s=A['bg_'+k]||A['bg_'+key(k)];if(!s)return null;let i=IM[k];if(!i){i=new Image();i.decoding='async';i.src=s;IM[k]=i;}return i.complete&&i.naturalWidth?i:null;};
 setTimeout(()=>{for(const n of NAMES)im(n);im('clouds');if(nb()){im('lava_cliffs');im('ice_cliffs');}},1200);
 const S={y:0,yc:0,yk:0,k:1,cur:-1,prev:-1,ft:0,eIdx:0,hadBoss:false,lastLv:-1,lastMode:'',n:0};
 const off=()=>window.PKC26===false||!A.bg_valley;
 function biome(){try{
  const two=nb();
  if(gameMode==='endless')return two?EROT1[S.eIdx%5]:S.eIdx%3;
  if(gameMode==='campaign'){const c=Campaign36.chapter(level)+1,M=two?CH1:CH0;return M[c]!=null?M[c]:0;}
 }catch{}return -1;}
 const on=()=>{if(off())return false;try{if(mode!=='play'&&mode!=='pause')return false;}catch{return false;}return biome()>=0;};
 function target(){let k=1;try{const v=window.V24C!==false&&window.V24!==false;if(window.__surgeS25>0||(v&&window.__blitz24))k=v?2.4:KS;else if(superTime>0)k=KBT;}catch{}return k;}/* V2.4-C: Xung Kích / bứt tốc đầu Vô tận ×2,4 */
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
  if(!still){const tk=target();S.k+=(tk-S.k)*Math.min(1,dt*(tk>S.k?6:2.5));const v=BASE*S.k;S.y+=dt*v;S.yc+=dt*v*CLOUD;S.yk+=dt*v*CLIFF;if(S.ft>0)S.ft-=dt;S.n++;}
  ctx.save();try{ctx.globalCompositeOperation='source-over';
   const top=(i,a)=>{if(TWO[i]){const k=im(NAMES[i]+'_cliffs');if(k)layer(k,S.yk,a);}};
   if(S.ft>0&&S.prev>=0){const p=im(NAMES[S.prev]),a=1-Math.max(0,S.ft)/FADE;if(p)layer(p,S.y,1);top(S.prev,1-a);layer(b,S.y,a);top(S.cur,a);}else{layer(b,S.y,1);top(S.cur,1);}
   if(!TWO[S.cur]){const c=im('clouds');if(c)layer(c,S.yc,CA);}
  }catch{}ctx.restore();return true;}
 function full(){if(!on())return false;const t=biome();if(t<0||!im(NAMES[t]))return false;if(S.ft>0&&S.prev>=0&&!im(NAMES[S.prev]))return false;return true;}
 return {on,draw,full,state:()=>({on:on(),cur:S.cur>=0?NAMES[S.cur]:'',two:!!TWO[S.cur],yk:Math.round(S.yk),k:Math.round(S.k*100)/100,eIdx:S.eIdx,fade:Math.max(0,S.ft),y:Math.round(S.y),n:S.n}),NAMES,CH:CH1,CH0,CLIFF,speeds:()=>({floor:BASE*S.k,cliffs:TWO[S.cur]?BASE*S.k*CLIFF:0,k:S.k})};
})();
window.PKC26S=PKC26;
