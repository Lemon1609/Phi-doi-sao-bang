'use strict';
// V307 · BỎ ĐÁ NÂNG CẤP ⬢ (chủ dự án chốt 17/11/2026 · quy đổi theo Gemini lượt 4)
//  • Chỉ còn một họ đá: Đá XP I–IV (kho XPDA307), dùng để nâng Level.
//  • Mọi khoản trước đây trừ đá ⬢ (tiến khung, bản sao, cây tiềm năng, vũ khí tối thượng, trao đổi…) nay trừ ◈ = số đá × 15.
//    Làm ở một chỗ: Workshop.exp70(−n) / spendExp(n) trừ ◈; expBalance / getState().exp trả số "đá quy đổi" = ⌊◈ / 15⌋.
//  • Mọi nguồn trước đây tặng đá ⬢ (nhiệm vụ, mùa giải, tách bản sao…) nay tặng Đá XP cùng lượng XP (1 đá = 15 XP), chia loại tham lam đến III.
//  • Tồn kho đá ⬢ cũ đổi một lần sang Đá XP (thuật toán Gemini: IV → III → II → I, làm tròn lên ở I).
//  • Tắt: window.DA307=false (cần đặt trước khi tải; đã quy đổi tồn kho thì không hoàn lại).
(function(){
 if(window.DA307===false||typeof Workshop==='undefined'||typeof XPDA307==='undefined')return;
 const K=15,MIG='saobang-da307-mig';
 const W=Workshop,o={exp70:W.exp70,spendExp:W.spendExp,grant:W.grant,expBalance:W.expBalance,getState:W.getState};
 const XP=XPDA307.XP;
 function split(xp,top){const out={1:0,2:0,3:0,4:0};for(const t of [4,3,2].filter(t=>t<=top)){out[t]=Math.floor(xp/XP[t]);xp-=out[t]*XP[t];}out[1]=Math.ceil(xp/XP[1]);return out;}
 function giveXp(stones,top){if(!(stones>0))return;if(window.__x307on)return;/* đá rơi lúc qua ải: xp307 thay bằng bảng mới */
  const s=split(stones*K,top||3);for(const t of [1,2,3,4])if(s[t])XPDA307.add(t,s[t]);window.__da307g=(window.__da307g|0)+stones;}
 const bal=()=>{try{return Progress.balance();}catch{return 0;}};
 // ---- quy đổi tồn kho một lần ----
 try{if(!localStorage.getItem(MIG)){const n=o.expBalance.call(W)|0;if(n>0){const s=split(n*K,4);for(const t of [1,2,3,4])if(s[t])XPDA307.add(t,s[t]);o.exp70.call(W,-n);}localStorage.setItem(MIG,JSON.stringify({n,at:Date.now()}));if(n>0)setTimeout(()=>{try{toast('ĐÁ NÂNG CẤP ⬢ ĐÃ ĐỔI SANG ĐÁ XP · '+n.toLocaleString('vi-VN')+' viên = '+(n*K).toLocaleString('vi-VN')+' XP');}catch{}},2500);}}catch{}
 // ---- thay hàm ----
 W.exp70=function(d){d=d|0;if(d<0){const c=-d*K;if(bal()<c)return false;return Progress.spendCredits(c);}if(d>0)giveXp(d);return true;};
 W.spendExp=function(n){n=Math.max(0,Math.floor(n||0));if(!n)return true;const c=n*K;if(bal()<c)return false;return Progress.spendCredits(c);};
 W.grant=function(r){if(r&&typeof r==='object'){const st=Math.max(0,Math.floor(r.exp||0))+5*Math.max(0,Math.floor(r.aux||0));if(st)giveXp(st);r=Object.assign({},r,{exp:0,aux:0});}return o.grant.call(W,r);};
 W.expBalance=()=>Math.floor(bal()/K);
 W.getState=function(){const s=o.getState.call(W);try{s.exp=Math.floor(bal()/K);s.aux=0;}catch{}return s;};
 W.__da307={o,split,K};
 // ---- chữ trên giao diện: "⬢" cũ → ◈ ×15 (chi phí) hoặc XP (phần thưởng "+N ⬢"); "Thiếu đá" → "Thiếu hợp kim" ----
 const num=t=>parseInt(String(t).replace(/[.,\s]/g,''),10)||0,f=n=>n.toLocaleString('vi-VN');
 function fix(t){if(t.indexOf('⬢')<0&&t.indexOf('Thiếu đá')<0)return t;
  return t.replace(/(\d[\d.,]*)\s?◈\s?(?:·\s?)?(\d[\d.,]*)\s?⬢/g,(m,a,b)=>f(num(a)+num(b)*K)+' ◈').replace(/\+\s?(\d[\d.,]*)\s?⬢/g,(m,a)=>'+'+f(num(a)*K)+' XP')
   .replace(/(\d[\d.,]*)\s?\/\s?(\d[\d.,]*)\s?⬢/g,(m,a,b)=>f(num(a)*K)+' / '+f(num(b)*K)+' ◈')
   .replace(/(\d[\d.,]*)\s?⬢/g,(m,a)=>f(num(a)*K)+' ◈')
   .replace(/⬢\s?((?:\d[\d.,]*)(?:\s?\/\s?\d[\d.,]*)*)/g,(m,a)=>'◈ '+a.split('/').map(x=>f(num(x)*K)).join(' / '))
   .replace(/⬢/g,'◈').replace(/Thiếu đá/g,'Thiếu hợp kim');}
 function walk(n){if(!n)return;if(n.nodeType===3){const v=n.nodeValue,w=fix(v);if(w!==v)n.nodeValue=w;return;}if(n.nodeType!==1||/^(SCRIPT|STYLE|TEXTAREA|INPUT)$/.test(n.nodeName))return;for(const c of n.childNodes)walk(c);}
 function hookUI(){if(!document.body)return setTimeout(hookUI,300);walk(document.body);try{new MutationObserver(ms=>{for(const m of ms){if(m.type==='characterData')walk(m.target);else for(const a of m.addedNodes)walk(a);}}).observe(document.body,{childList:true,subtree:true,characterData:true});}catch{}
  const ot=window.toast;if(typeof ot==='function'&&!ot.__d307){const nt=function(x){return ot.call(this,typeof x==='string'?fix(x):x);};nt.__d307=1;try{toast=nt;}catch{}window.toast=nt;}}
 if(window.DA307UI!==false)hookUI();
 W.__da307.fix=fix;
})();
