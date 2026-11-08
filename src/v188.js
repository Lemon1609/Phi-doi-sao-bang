'use strict';
// V188 · CÂN BẰNG ĐỘ KHÓ theo số đo V187 (out/DO_KHO_V187.md) + bảng của Gemini (phản hồi 01/11):
//  (1) Lực chiến đề nghị chiến dịch: neo theo bảng Gemini, nội suy hệ số giữa các mốc (ải 1, 160, 180 giữ nguyên).
//  (2) Máu boss chương 1–4: ×1,8 (20) ×3,2 (40) ×4,0 (60) ×2,5 (80); mini 10/30/50/70 nhận 60% mức tăng.
//  (3) Bảng BOSSHP87: 100 ×1,09 · 120 ×0,69 · 140 ×0,86 (chỉ chiến dịch thường; Nguyệt Thực vẫn ×1,3 của bảng mới).
//  Không đổi kinh tế, không thêm nguồn kim cương. Tắt: window.BAL188=false (đặt trước khi vào trận).
const BAL188={req:{20:1100,40:1250,60:2000,80:2400,90:2850,100:3200,110:3950,120:4800,130:5750,140:6850,150:8150,200:14200},keep:[1,160,180],
 boss:{20:1.8,40:3.2,60:4.0,80:2.5,10:1.48,30:2.32,50:2.8,70:1.9},table:{100:1.09,120:.69,140:.86}};
(()=>{
 const on=()=>window.BAL188!==false;
 const camp=()=>{try{return gameMode==='campaign'&&!(typeof Eclipse67!=='undefined'&&Eclipse67.active());}catch{return false;}};
 // (3) bảng máu boss 90–200
 try{if(window.BOSSHP87&&!BOSSHP87.__188){for(const k in BAL188.table)if(BOSSHP87[k])BOSSHP87[k]=Math.round(BOSSHP87[k]*BAL188.table[k]);Object.defineProperty(BOSSHP87,'__188',{value:1});}}catch{}
 // (1) lực chiến đề nghị — bọc ngoài cùng, bọc lại nếu mô-đun khác thay hàm sau đó
 let K=null;
 function anchors(orig){const a=[];for(const n of BAL188.keep)a.push([n,1]);for(const n in BAL188.req){const o=orig(+n);if(o>0)a.push([+n,BAL188.req[n]/o]);}a.sort((x,y)=>x[0]-y[0]);return a;}
 function kAt(n,a){if(n<=a[0][0])return a[0][1];for(let i=1;i<a.length;i++){const [n1,k1]=a[i];if(n<=n1){const [n0,k0]=a[i-1];return k0+(k1-k0)*(n-n0)/(n1-n0);}}return a[a.length-1][1];}
 function wrap(){try{const o=Combat.stageRequirement;if(o.__188)return;const f=function(n){const v=o.apply(this,arguments);try{if(!on()||!camp())return v;if(!K)K=anchors(x=>o.call(this,x));return Math.round(v*kAt(Math.max(1,Math.min(200,n|0)),K));}catch{return v;}};f.__188=1;Combat.stageRequirement=f;K=null;}catch{}}
 wrap();setInterval(wrap,1000);
 // (2) máu boss chương 1–4 (không có trong BOSSHP87)
 setInterval(()=>{try{const b=boss;if(!b||b.__188||!b.bossHealthReady||!on()||!camp())return;b.__188=1;const m=BAL188.boss[level|0];if(!m)return;
   b.max*=m;b.hp=b.max;if(b.coreMax){b.coreMax*=m;b.coreHp=b.coreMax;}for(const p of (b.parts||[])){if(p.max){p.max*=m;p.hp=p.max;}}}catch{}},100);
 window.V188={req:n=>{try{return Combat.stageRequirement(n);}catch{return 0;}},cfg:BAL188};
})();
