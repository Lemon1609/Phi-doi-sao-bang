'use strict';
// V191 · LỰC CHIẾN PHẢN ÁNH ĐÚNG BẬC CHIẾN CƠ (Gemini chốt 06/11, số đo V190 t190.py)
//  CHỈ cộng vào con số lực chiến (r.cp) — KHÔNG đổi r.attack, vì attack còn dùng để tính sát thương thật (VKTT ult72, nội tại 144, kỹ năng 147, SSS E3).
//  cp += (kS·st_than_tau + kG·tong_st_trang_bi) × 0,81 × m × 24 · m = hệ số mà các mô-đun khác đã nhân vào attack (đá, VKTT, codex…)
//  Bảng lực chiến đề nghị chiến dịch thay bảng V188 (neo 99/139). Tắt: window.BAL191=false
const BAL191={k:{S:{s:.18,g:.12},SS:{s:.70,g:.65}},
 req:{1:750,10:920,20:1100,30:1175,40:1250,50:1600,60:2000,70:2200,80:2400,90:2500,99:2650,100:3700,110:4490,120:5280,130:5980,139:6590,140:11310,150:13050,160:15120,170:16920,180:18740,190:19710,200:20610}};
// Neo ≥100 = bảng Gemini × (lực chiến ĐO THẬT / lực chiến Gemini ước tính): 100–139 theo tàu S (×0,935), 140–200 theo tàu SS (×0,90) — giữ đúng % Gemini định (S ~110% ở ải 100, SS ~102–108%).
(()=>{
 const on=()=>window.BAL191!==false;
 function terms(){const r=Fusion.getSelected(),v=r||Workshop.craftProgress(launchCraft),g=Progress.stats();
  const hull=12*Workshop.factor(v.grade)*Workshop.levelFactor(v)*Campaign36.rate(v.grade)*(r?1.25:1);
  const gear=(g.auxiliary||[]).reduce((n,i)=>n+i.auxDamage*i.spec.count/i.interval*(typeof Gear44!=='undefined'?Gear44.dmgMult(i.kind)/(Gear44.sssM?Gear44.sssM(i.kind):1):1),0);
  return {grade:v.grade,hull,gear};}
 function wrapStats(){try{const o=Combat.stats;if(o.__191)return;const f=function(){const r=o.apply(this,arguments);try{if(!on()||!r)return r;const t=terms(),K=BAL191.k[t.grade];if(!K)return r;
   const base=(t.hull+t.gear)*.81,m=base>0?r.attack/base:1,add=(K.s*t.hull+K.g*t.gear)*.81*m*24;return {...r,cp:Math.round(r.cp+add),cp191:add};}catch{return r;}};f.__191=1;Combat.stats=f;}catch{}}
 // bảng đề nghị: nội suy tuyến tính giữa các neo, chỉ chiến dịch (không Nguyệt Thực)
 const camp=()=>{try{return gameMode==='campaign'&&!(typeof Eclipse67!=='undefined'&&Eclipse67.active());}catch{return false;}};
 const A=Object.entries(BAL191.req).map(([n,v])=>[+n,v]).sort((a,b)=>a[0]-b[0]);
 function reqAt(n){n=Math.max(1,Math.min(200,n|0));for(let i=1;i<A.length;i++){if(n<=A[i][0]){const [n0,v0]=A[i-1],[n1,v1]=A[i];return Math.round(v0+(v1-v0)*(n-n0)/(n1-n0));}}return A[A.length-1][1];}
 function wrapReq(){try{const o=Combat.stageRequirement;if(o.__191)return;const f=function(n){if(on()&&camp())return reqAt(n);return o.apply(this,arguments);};f.__191=1;f.__188=1;Combat.stageRequirement=f;}catch{}}
 wrapStats();wrapReq();setInterval(()=>{wrapStats();wrapReq();},1000);
 window.V191={reqAt,terms,cfg:BAL191};
})();
