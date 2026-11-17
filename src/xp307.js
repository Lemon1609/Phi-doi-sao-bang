'use strict';
// V307 · BẢNG RƠI ĐÁ XP 4 LOẠI (Gemini lượt 4, GEMINI_TRA_LOI_NANG_CAP_XP_V307_LUOT4.json · chủ dự án đồng ý 17/11/2026)
//  • Ải chiến dịch / càn quét rơi Đá XP I–III theo dải ải, tách ải thường · mini boss · boss (boss rơi loại cao hơn).
//  • Đá XP IV chỉ ở hầm ngục (và sau này sự kiện / phần thưởng), không rơi ở ải.
//  • ◈ cuối ải +27 % (Gemini lượt 4: ◈ phải gánh thêm tiến khung, bản sao, cây tiềm năng… sau khi bỏ đá ⬢).
//  • Đá ⬢ cũ nhận trong lúc qua ải bị bỏ (da307.js đổi các nguồn khác sang Đá XP).
//  • Tắt: window.XP307=false.
const XP307CFG={
 // mỗi dòng: [loại, min, max, xác suất]
 bands:[
  [10,{n:[[1,18,22,1]],mini:[[1,20,24,1],[2,1,1,.5]],boss:[[1,12,16,1],[2,3,4,1]]}],
  [30,{n:[[1,16,20,1],[2,4,4,.91]],mini:[[1,16,20,1],[2,5,6,1]],boss:[[2,8,10,1],[3,1,1,.6]]}],
  [50,{n:[[1,10,14,1],[2,7,8,1]],mini:[[2,8,10,1],[3,1,1,1]],boss:[[2,7,9,1],[3,1,2,1]]}],
  [70,{n:[[2,8,10,1],[3,1,1,1]],mini:[[2,9,11,1],[3,1,2,1]],boss:[[2,6,8,1],[3,2,4,1]]}],
  [90,{n:[[2,6,8,1],[3,2,2,1]],mini:[[2,6,8,1],[3,2,4,1]],boss:[[2,4,6,1],[3,4,5,1]]}],
  [115,{n:[[2,4,6,1],[3,3,3,1]],mini:[[2,3,5,1],[3,4,5,1]],boss:[[3,6,7,1]]}],
  [140,{n:[[2,4,5,1],[3,5,5,1],[3,1,1,.0625]],mini:[[2,3,4,1],[3,7,8,1]],boss:[[3,9,11,1]]}],
  [9999,{n:[[2,3,4,1],[3,6,6,1]],mini:[[3,9,10,1]],boss:[[3,11,12,1]]}]],
 // hầm ngục theo độ khó (game có 4 cấp: Thường · Tinh Anh · Ác Mộng · Thần Thoại → tầng 1–4 của Gemini; tầng 5 chưa dùng)
 dungeon:[[[4,1,1,1],[2,8,8,1]],[[4,2,2,1],[3,4,4,1]],[[4,4,4,1],[3,6,6,1]],[[4,6,6,1],[3,8,8,1]],[[4,10,10,1],[3,12,12,1]]],
 credits:.27};
const XP307=(()=>{
 const C=XP307CFG,on=()=>window.XP307!==false;
 const ri=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
 const XPv=t=>{try{return XPDA307.XP[t];}catch{return [0,15,60,240,1000][t];}};
 function roll(rows){const o={1:0,2:0,3:0,4:0};for(const [t,a,b,p] of rows)if(Math.random()<p)o[t]+=ri(a,b);o.xp=[1,2,3,4].reduce((s,t)=>s+o[t]*XPv(t),0);return o;}
 function kindOf(n){let bk='';try{bk=Campaign36.bossKind(n)||'';}catch{}return bk==='mini'?'mini':bk?'boss':'n';}
 function rowsOf(n){n=n|0;const B=(C.bands.find(r=>n<=r[0])||C.bands[C.bands.length-1])[1];return B[kindOf(n)];}
 const bal=()=>{try{return Progress.balance();}catch{return 0;}};
 function give(tag,rows,fn,ctx,args,cr){if(!on()||!rows)return fn.apply(ctx,args);
  const c0=bal();window.__x307on=(window.__x307on|0)+1;let r;try{r=fn.apply(ctx,args);}finally{window.__x307on--;}
  if(tag==='stage'?!(bal()-c0>0):!r)return r;
  try{const g=roll(rows);for(const t of [1,2,3,4])if(g[t])XPDA307.add(t,g[t]);
   let extra=0;if(cr){const d=bal()-c0;if(d>0){extra=Math.round(d*C.credits);Progress.grantCredits(extra);}}
   window.__xp307=(window.__xp307||[]).concat([{tag,g,cr:extra}]).slice(-50);if(r&&typeof r==='object')r.xp307=g;}catch{}
  return r;}
 function hook(){let ok=0;
  if(typeof finishStage36==='function'&&!finishStage36.__x307){const o=finishStage36;const f=function(){let n=0;try{n=level|0;}catch{}const camp=typeof gameMode!=='undefined'&&gameMode==='campaign'&&!(typeof Dungeons!=='undefined'&&Dungeons.active&&Dungeons.active());return give('stage',camp?rowsOf(n):null,o,this,arguments,true);};f.__x307=1;window.finishStage36=f;try{finishStage36=f;}catch{}ok++;}
  if(typeof Campaign36!=='undefined'&&Campaign36.sweep&&!Campaign36.sweep.__x307){const o=Campaign36.sweep;const f=function(n){return give('sweep',rowsOf(n),o,this,arguments,true);};f.__x307=1;Campaign36.sweep=f;ok++;}
  if(typeof Dungeons!=='undefined'&&Dungeons.complete&&!Dungeons.complete.__x307){const o=Dungeons.complete;const f=function(){let d=0;try{d=Dungeons.getRun().d|0;}catch{}return give('dungeon',C.dungeon[Math.max(0,Math.min(4,d))],o,this,arguments,false);};f.__x307=1;Dungeons.complete=f;ok++;}
  return ok;}
 return {hook,roll,rowsOf,kindOf,expect:n=>rowsOf(n).reduce((s,[t,a,b,p])=>s+(a+b)/2*p*XPv(t),0)};
})();
XP307.hook();setTimeout(()=>XP307.hook(),3000);
