'use strict';
// V95 · Gemini REVIEW95
//  §1 #13 bậc SS: hệ số 0,52 + xuyên nhiều bộ phận cùng boss 10% (sửa trong ss90.js)
//  §2 Giãn mốc mở tính năng (ải): Thử thách ngày 12 · Phá Vây 20 · Hạt giống 30 · Vòng quay 35 · Hợp thể/SSS 45 · Phó bản giới hạn 50 · Tối thượng 80.
//     Giữ quyền cũ: tài khoản đã mở theo mốc cũ trước V95 vẫn mở (chụp số ải đã qua lúc cài V95 vào khóa mới saobang-ux95).
//  §3 Nguyệt Thực 161–200 (mở khi đã vượt ải 200): máu quái/boss = 1,3 × Chiến dịch (boss theo bảng BOSSHP87) · lực chiến đề nghị 13.200 → 16.500
//     · thưởng lần đầu E180 (25.000 ◈ + bản sao Tím) và E200 khi bật ≥ 2 luật Khế Ước (40.000 ◈ + bản sao Tím bộ 10–12 + danh hiệu «Chúa Tể Nguyệt Thực» +5% sát thương)
//  Tắt: window.V95=false
const V95CFG={unl:{daily:[10,12],breakout:[10,20],seed:[15,30],wheel:[45,35],sss:[40,45],limited:[45,50],ult:[90,80]},
 ecl:{hp:1.3,req:[13200,16500],first:{180:{alloy:25000,tier:6},200:{alloy:40000,tier:6,sets:[10,11,12],rules:2,title:'AURA_ECLIPSE_LORD'}}}};
const V95=(()=>{
 const on=()=>window.V95!==false;const fmt=n=>Math.round(n).toLocaleString('vi-VN');
 const KEY='saobang-ux95';let S={};try{S=JSON.parse(localStorage.getItem(KEY)||'{}')||{};}catch{}
 const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S));}catch{}};
 const cl=()=>{try{return Progress.getState().cleared.length|0;}catch{return 0;}};
 if(S.base==null){S.base=cl();save();}
 // mốc mới, trừ khi tài khoản đã mở theo mốc cũ lúc cài V95
 const lv=k=>{const [o,n]=V95CFG.unl[k];if(!on())return o;return (S.base>=o)?Math.min(o,n):n;};
 function gates(){try{UNLOCK66.challenge.lv=lv('daily');}catch{}
  try{UNLOCK66.sss.lv=lv('sss');if(UNLOCK66.sss.stall){UNLOCK66.sss.stall.min=lv('sss')-5;UNLOCK66.sss.stall.stages=[lv('sss')];}}catch{}
  try{WHEEL74.unlock=lv('wheel');}catch{}try{LIMITED74.unlock=lv('limited');}catch{}try{ULT72.unlock=lv('ult');}catch{}
  try{const F=Nav74.F;F.daily.lv=lv('daily');F.breakout.lv=lv('breakout');F.breakout.lk=()=>cl()>=lv('breakout');F.seed78.lv=lv('seed');F.seed78.lk=()=>cl()>=lv('seed');
   F.wheel.lv=lv('wheel');F.sss.lv=lv('sss');F.limited.lv=lv('limited');F.ult.lv=lv('ult');F.ult.lk=()=>cl()>=lv('ult');}catch{}}
 // ---------- Nguyệt Thực 161–200 ----------
 const hi=()=>{try{return on()&&(level|0)>=161&&Eclipse67.active();}catch{return false;}};
 function eclHooks(){try{if(ECL.__v95)return;ECL.__v95=1;const B={hp:ECL.hp,hpElite:ECL.hpElite,hpBoss:ECL.hpBoss};const H=V95CFG.ecl.hp;
   Object.defineProperty(ECL,'hp',{get:()=>hi()?H:B.hp,configurable:true});Object.defineProperty(ECL,'hpElite',{get:()=>hi()?H:B.hpElite,configurable:true});
   Object.defineProperty(ECL,'hpBoss',{get:()=>hi()?((window.BOSSHP87&&BOSSHP87[level|0])?1:H):B.hpBoss,configurable:true});}catch{}
  try{if(Combat.stageRequirement.__v95)return;const o=Combat.stageRequirement;const f=function(n){if(on()&&(n|0)>=161){let e=false;try{e=Eclipse67.active();}catch{}if(e){const [a,b]=V95CFG.ecl.req;return Math.round(a+(b-a)*((Math.min(200,n|0)-161)/39));}}return o.apply(this,arguments);};f.__v95=1;Combat.stageRequirement=f;}catch{}}
 // danh hiệu cuối game (gắn vào hệ danh hiệu V84)
 function title(){try{if(TITLE84.items.AURA_ECLIPSE_LORD)return;TITLE84.items.AURA_ECLIPSE_LORD={title:'Chúa Tể Nguyệt Thực',aura:'Nhật Thực Tử Dạ',days:0,dmg:.05,hp:0,c1:'#B5179E',c2:'#3C096C',r:50,spin:1.2,note:'Vượt Nguyệt Thực 200 với ≥ 2 luật Khế Ước'};TITLE84.order.unshift('AURA_ECLIPSE_LORD');}catch{}}
 function copy(t,sets){try{if(sets){const si=sets[Math.floor(Math.random()*sets.length)];const set=Campaign36.sets[si];const m=set[Math.floor(Math.random()*set.length)];Evo82.addCopy('gear',m,t,1,true);let nm=m;try{nm=GearCatalog[m].name;}catch{}return 'Bản sao Tím Lv1 · '+nm;}
   return (window.V92&&V92.giveCopy)?V92.giveCopy(t):'';}catch{return '';}}
 function hookReward(){try{if(Eclipse67.__v95)return;const o=Eclipse67.reward;Eclipse67.__v95=1;Eclipse67.reward=function(s){const r=o.apply(this,arguments);try{const F=V95CFG.ecl.first[s|0];S.ef=S.ef||{};
     if(on()&&r&&F&&!S.ef[s]){let rules=0;try{const rr=V91.state().run;rules=rr?rr.ids.length:0;}catch{}
      if(rules>=(F.rules||0)){S.ef[s]=1;save();const L=[];Progress.grantCredits(F.alloy);r.credits=(r.credits||0)+F.alloy;L.push('🏆 Lần đầu E'+s+': +'+fmt(F.alloy)+' ◈');const x=copy(F.tier,F.sets);if(x)L.push('+'+x);
       if(F.title){try{Title84.grant(F.title);L.push('Danh hiệu «Chúa Tể Nguyệt Thực» (+5% sát thương)');}catch{}}if(Array.isArray(r.materials))r.materials=r.materials.concat(L);}}}catch{}return r;};}catch{}}
 function note(){const box=document.querySelector('.ex67:not([hidden]) .ex67-chs');if(!box||box.parentElement.querySelector('.e95'))return;if(cl()>=200&&Progress.getState().cleared.includes(200))return;
  let n=0;try{n=Progress.getState().cleared.includes(200);}catch{}const p=document.createElement('p');p.className='e95';p.style.cssText='margin:4px 0;font-size:10px;color:#b9a6d9';p.textContent='🌑 Nguyệt Thực Chương 9–10 (E161–E200) mở sau khi vượt ải 200 Chiến dịch.';box.after(p);}
 function boot(){gates();eclHooks();title();hookReward();}
 boot();setTimeout(boot,700);setTimeout(boot,2500);setInterval(()=>{if(!on())return;try{note();}catch{}},800);
 return {lv,state:()=>JSON.parse(JSON.stringify(S)),CFG:V95CFG};
})();
window.V95=V95;
