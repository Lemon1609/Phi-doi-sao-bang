'use strict';
// V205 · SHIP_AND_GEAR_BAL_V205 (Gemini 08/11) · BƯỚC A. Tắt: window.BAL205=false
//  • Sát thương trang bị (auxDamage → đạn trang bị, hiệu ứng GEAR_FX qua refDPS) nhân theo bậc chiến cơ đang lái:
//    Thường ×1,00 · S ×2,20 · SS ×3,90 (hợp thể robot tính như SS).
//  • Bù máu boss Chiến dịch = bù bước B (theo tàu chuẩn từng mốc) × bù bước A (+10% S, +15% SS), nội suy. Bảng combinedAnchors Gemini 08/11.
//  Bước B (hệ số 13 tàu) nằm trong src/v120.js (K205, cùng cờ).
const BAL205X=(()=>{
 const C={rank:{'':1,S:2.2,SS:3.9},boss:[[1,1],[20,2.13],[40,.82],[60,1.00],[80,1.18],[100,1.25],[120,1.33],[140,1.90],[160,2.53],[180,3.84],[200,1.51]]}/* V206 · đường cong Gemini 14/19/32/33/45/52/60 s (ải 20/40/80/120/160/180/200), vi chỉnh theo đo bot có phản chấn vỡ cánh */;
 const on=()=>window.BAL205!==false;
 function grade(){try{if(typeof activeRobot!=='undefined'&&activeRobot)return 'SS';}catch{}try{const r=Fusion.getSelected();if(r)return 'SS';}catch{}
  try{return Workshop.craftProgress(launchCraft).grade||'';}catch{return '';}}
 const rankM=()=>on()?(C.rank[grade()]||1):1;
 // ---- A1: trang bị theo bậc tàu ----
 try{const ops=Progress.stats;if(!ops.__b205){const f=function(){const o=ops.apply(this,arguments);try{const m=rankM();if(m!==1)for(const e of (o&&o.equipment)||[]){if(e&&e.auxDamage>0&&!e.__b205){e.auxDamage*=m;e.__b205=m;}}}catch{}return o;};f.__b205=1;Progress.stats=f;}}catch{}
 // ---- A2: bù máu boss theo ải ----
 function bossK(st){const A=C.boss;if(st<=A[0][0])return A[0][1];for(let i=1;i<A.length;i++){const [x1,y1]=A[i],[x0,y0]=A[i-1];if(st<=x1)return x1===x0?y1:y0+(y1-y0)*(st-x0)/(x1-x0);}return A[A.length-1][1];}
 function eligible(){try{if(typeof gameMode!=='undefined'&&gameMode!=='campaign')return false;}catch{}try{if(typeof Dungeons!=='undefined'&&Dungeons.active())return false;}catch{}
  try{if(Event83.inRaid())return false;}catch{}if(window.__tb200)return false;try{if(Eclipse67.active())return false;}catch{}return true;}
 let seen=null;
 setInterval(()=>{if(!on())return;try{if(typeof boss==='undefined'||!boss||boss.dead||boss===seen||!boss.bossHealthReady)return;seen=boss;if(boss.__b205||!eligible())return;
  const k=bossK(+level||0);if(k===1)return;boss.__b205=k;boss.max*=k;boss.hp*=k;if(boss.coreMax){boss.coreMax*=k;boss.coreHp*=k;}for(const p of (boss.parts||[]))if(p.max){p.max*=k;p.hp*=k;}}catch{}},60);
 return {C,rankM,bossK,grade};
})();
window.BAL205X=BAL205X;
