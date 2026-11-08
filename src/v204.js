'use strict';
// V204 · EVENT_ENDGAME_V204 (Gemini 08/11) · phần cuối tuần + Chiến cơ của tuần. Tắt: window.EV204=false
//  • Thứ Bảy · Ngày Tiếp Tế Chip: quà nhiệm vụ ngày VKTT (tinh thể / mã hóa / lõi chip) ×1,5, làm tròn lên.
//  • Chủ Nhật · Ngày Siêu Hợp Thể: 3 trận thắng (kể cả càn quét) đầu ngày ở ải 161–200 hoặc Nguyệt Thực: +1 Tinh Hạch mỗi trận.
//  • Chiến cơ của tuần: 2 tàu xoay theo tuần sự kiện (1 tàu Thường/S + 1 tàu SS), +10% sát thương đạn chính CHỈ trong Boss cuối tuần.
//  Tiệm cuối game + chip thưởng tuần nằm trong src/event83.js (cùng cờ). Khóa mới: saobang-ev204-v1 (đếm Chủ Nhật).
const EV204X=(()=>{
 const C={sat:1.5,sun:{n:1,max:3},ship:{k:.10,rot:[[0,7],[5,9],[6,10],[2,12]]}};
 const KEY='saobang-ev204-v1';
 const on=()=>window.EV204!==false;
 const VN=()=>new Date(Date.now()+7*3600000);
 const day=()=>VN().toISOString().slice(0,10);
 const dow=()=>VN().getUTCDay();
 const isSat=()=>window.__ev204dow!=null?window.__ev204dow===6:dow()===6;
 const isSun=()=>window.__ev204dow!=null?window.__ev204dow===0:dow()===0;
 let S={d:'',n:0,t:''};try{Object.assign(S,JSON.parse(localStorage.getItem(KEY)||'{}'));}catch{}
 const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S));}catch{}};
 const roll=()=>{if(S.d!==day()){S.d=day();S.n=0;save();}};
 const name=i=>{try{return crafts[i].name;}catch{return 'Chiến cơ '+(i+1);}};
 const idx=()=>{try{return Event83.state().idx|0;}catch{return 0;}};
 const ships=()=>C.ship.rot[idx()%4];
 const T=m=>{try{toast(m);}catch{}};
 // ---- Chiến cơ của tuần (chỉ Boss cuối tuần) ----
 function featOn(){if(!on())return false;try{return Event83.inRaid()&&ships().includes(launchCraft|0);}catch{return false;}}
 try{if(typeof Chip72!=='undefined'&&Chip72.shipM&&!Chip72.shipM.__v204){const o=Chip72.shipM;const f=function(){const r=o.apply(this,arguments);return featOn()?r*(1+C.ship.k):r;};f.__v204=1;Chip72.shipM=f;}}catch{}
 // ---- Thứ Bảy: quà nhiệm vụ ngày VKTT ×1,5 ----
 try{const X=Ult72.X;if(X&&X.onClaim&&!X.onClaim.__v204){const o=X.onClaim;const f=function(kind,k){let m0=null;try{m0={...Chip72.state().mat};}catch{}const r=o.apply(this,arguments);
   try{if(on()&&isSat()&&m0){const m1=Chip72.state().mat,add={};let txt=[];for(const x of ['cry','coder','core']){const g=(m1[x]|0)-(m0[x]|0);if(g>0){const e=Math.ceil(g*C.sat)-g;if(e>0){add[x]=(m1[x]|0)+e;txt.push('+'+e+' '+({cry:'tinh thể',coder:'mã hóa',core:'lõi chip'})[x]);}}}
    if(Object.keys(add).length){Chip72._set({mat:add});T('📦 NGÀY TIẾP TẾ CHIP · '+txt.join(' · '));}}}catch{}return r;};f.__v204=1;X.onClaim=f;}}catch{}
 // ---- Chủ Nhật: +1 Tinh Hạch cho 3 trận thắng đầu ----
 function sunGive(){if(!on()||!isSun())return '';roll();if(S.n>=C.sun.max)return '';S.n++;save();try{V70.add('sss_core',C.sun.n);}catch{return '';}return '+'+C.sun.n+' Tinh Hạch · Ngày Siêu Hợp Thể ('+S.n+'/'+C.sun.max+')';}
 try{const ors=Workshop.rollStage;if(ors&&!ors.__v204){const f=function(stage){const r=ors.apply(this,arguments);try{if(typeof gameMode!=='undefined'&&gameMode==='endless')return r;let ecl=false;try{ecl=Eclipse67.active();}catch{}let dg=false;try{dg=typeof Dungeons!=='undefined'&&Dungeons.active();}catch{}
   if(!dg&&((stage|0)>160||ecl)){const t=sunGive();if(t&&Array.isArray(r))r.push(t);}}catch{}return r;};f.__v204=1;Workshop.rollStage=f;}}catch{}
 try{const osw=Eclipse67.sweep;if(osw&&!osw.__v204){const f=function(){const r=osw.apply(this,arguments);try{if(r){const t=sunGive();if(t)T('💠 '+t);}}catch{}return r;};f.__v204=1;Eclipse67.sweep=f;}}catch{}
 // ---- bảng trong Sự kiện tuần ----
 function panel(){roll();const sh=ships(),sat=isSat(),sun=isSun();
  return `<div class="ev204"><div class="adv-req-t">CHIẾN CƠ CỦA TUẦN</div><p class="ev83n">${sh.map(i=>`<b>${esc204(name(i))}</b>`).join(' · ')} · +${Math.round(C.ship.k*100)}% sát thương đạn chính trong Boss cuối tuần${sh.includes(launchCraft204())?' · <em class="ok">đang dùng</em>':''}</p>
   <div class="adv-req-t">TIẾP TẾ CUỐI TUẦN</div><div class="ev204w"><div class="${sat?'on':''}"><b>Thứ Bảy · Ngày Tiếp Tế Chip</b><small>Quà nhiệm vụ ngày VKTT ×1,5 (tinh thể, mã hóa, lõi chip)</small>${sat?'<em>ĐANG BẬT</em>':''}</div>
   <div class="${sun?'on':''}"><b>Chủ Nhật · Ngày Siêu Hợp Thể</b><small>3 trận thắng đầu ngày ở ải 161–200 hoặc Nguyệt Thực: +1 Tinh Hạch mỗi trận</small>${sun?`<em>ĐANG BẬT · ${S.n}/${C.sun.max}</em>`:''}</div></div></div>`;}
 const esc204=t=>String(t).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'})[c]);
 const launchCraft204=()=>{try{return launchCraft|0;}catch{return -1;}};
 // ---- nhắc 1 lần/ngày ở sảnh khi hiệu ứng cuối tuần bật ----
 setInterval(()=>{try{if(!on()||(!isSat()&&!isSun()))return;if(S.t===day())return;if(typeof mode==='undefined'||mode!=='menu')return;if(document.body.classList.contains('play-screen'))return;S.t=day();save();T(isSat()?'📦 HÔM NAY: NGÀY TIẾP TẾ CHIP · quà nhiệm vụ ngày VKTT ×1,5':'💠 HÔM NAY: NGÀY SIÊU HỢP THỂ · +1 Tinh Hạch cho 3 trận thắng đầu ở ải 161+ / Nguyệt Thực');}catch{}},4000);
 return {panel,ships,featOn,state:()=>({...S}),C};
})();
window.EV204X=EV204X;
