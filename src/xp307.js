'use strict';
// V307 · BẢNG RƠI ĐÁ XP (Gemini lượt 3, GEMINI_TRA_LOI_NANG_CAP_XP_V307_LUOT3.md · chủ dự án đồng ý 17/11/2026)
//  • Thay toàn bộ đá nâng cấp cũ nhận khi qua ải / càn quét / hầm ngục bằng Đá XP theo bảng rơi mới.
//  • Ba cỡ Nhỏ 15 · Vừa 60 · Lớn 150 XP. Kho lưu chung với đá cũ, tính theo viên Nhỏ (Vừa = 4, Lớn = 10)
//    → quy đổi tồn kho 1 đá cũ = 1 Đá XP Nhỏ là tự động, không mất gì.
//  • Ải 1–10 mini boss / boss dùng hàng riêng của Gemini; các ải khác theo dải ải.
//  • Tắt: window.XP307=false.
const XP307CFG={
 sizes:{s:15,m:60,l:150},
 stages:[[10,{s:[4,6,1],m:[2,3,.9],l:[1,1,.6]}],[30,{s:[4,6,1],m:[3,4,1],l:[1,2,.9]}],[50,{s:[5,7,1],m:[3,5,1],l:[2,2,1]}],
  [70,{s:[6,8,1],m:[4,6,1],l:[2,3,1]}],[90,{s:[6,10,1],m:[5,6,1],l:[3,3,1]}],[115,{s:[8,10,1],m:[5,7,1],l:[3,4,1]}],
  [140,{s:[10,14,1],m:[7,9,1],l:[5,6,1]}],[9999,{s:[12,16,1],m:[8,10,1],l:[5,7,1]}]],
 mini:{s:[2,4,1],m:[2,2,1],l:[0,1,.2]},boss:{s:[3,5,1],m:[1,2,1],l:[0,1,.4]},earlyBossMax:10,
 dungeon:{s:[12,16,1],m:[8,10,1],l:[6,8,1]}};
const XP307=(()=>{
 const C=XP307CFG,on=()=>window.XP307!==false;
 const ri=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
 function rollRow(R){const o={s:0,m:0,l:0};for(const k of ['s','m','l']){const [a,b,p]=R[k];if(Math.random()<p)o[k]=ri(a,b);}o.small=o.s+o.m*C.sizes.m/C.sizes.s+o.l*C.sizes.l/C.sizes.s;o.xp=o.small*C.sizes.s;return o;}
 function rowOf(n){n=n|0;let bk='';try{bk=Campaign36.bossKind(n)||'';}catch{}
  if(n<=C.earlyBossMax&&bk==='mini')return C.mini;if(n<=C.earlyBossMax&&bk)return C.boss;
  return (C.stages.find(r=>n<=r[0])||C.stages[C.stages.length-1])[1];}
 const expNow=()=>{try{return Workshop.expBalance();}catch{return 0;}};
 const last={};
 // thay phần đá cũ nhận trong fn bằng Đá XP mới
 function swap(tag,row,fn,ctx,args){const e0=expNow();const r=fn.apply(ctx,args);if(!on())return r;
  try{const d=expNow()-e0;if(d>0&&row){if(!Workshop.exp70(-d))return r;const g=rollRow(row);Workshop.grant({exp:g.small});last[tag]={old:d,...g};window.__xp307=(window.__xp307||[]).concat([{tag,old:d,small:g.small,xp:g.xp}]).slice(-50);
    if(r&&typeof r==='object'&&'materials' in r)r.xp307=g;}}catch{}
  return r;}
 function hook(){let ok=0;
  if(typeof finishStage36==='function'&&!finishStage36.__x307){const o=finishStage36;const f=function(){let n=0;try{n=level|0;}catch{}return swap('stage',(typeof gameMode!=='undefined'&&gameMode==='campaign')?rowOf(n):null,o,this,arguments);};f.__x307=1;window.finishStage36=f;try{finishStage36=f;}catch{}ok++;}
  if(typeof Campaign36!=='undefined'&&Campaign36.sweep&&!Campaign36.sweep.__x307){const o=Campaign36.sweep;const f=function(n){return swap('sweep',rowOf(n),o,this,arguments);};f.__x307=1;Campaign36.sweep=f;ok++;}
  if(typeof Dungeons!=='undefined'&&Dungeons.complete&&!Dungeons.complete.__x307){const o=Dungeons.complete;const f=function(){return swap('dungeon',C.dungeon,o,this,arguments);};f.__x307=1;Dungeons.complete=f;ok++;}
  return ok;}
 return {hook,rollRow,rowOf,last,expect:n=>{const R=rowOf(n);let x=0;for(const k of ['s','m','l']){const [a,b,p]=R[k];x+=(a+b)/2*p*C.sizes[k];}return x;}};
})();
XP307.hook();setTimeout(()=>XP307.hook(),3000);
