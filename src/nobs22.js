'use strict';
// V2.2.1 · BỎ HẲN BẢN SAO (chủ dự án 24/11 17:29, chọn "Bỏ hẳn bản sao"). Tắt: window.NOBS22=false (đặt trước khi trang tải)
//  • Mọi nguồn trước đây tạo "bản sao" (Evo82.addCopy: điểm danh, rương, ải, sự kiện, phôi V70.phAdd…) đi qua absorb():
//     – chưa có mẫu → mở khóa thành món thật, đặt đúng bậc (dùng được ngay ở Kho đồ / Túi đồ);
//     – đã có mẫu, bậc mới CAO hơn món đang có → nâng món đang có lên bậc mới (giữ cấp);
//     – còn lại (cùng hoặc thấp hơn) → quy đổi: Đá XP + nguyên liệu cùng màu + hợp kim (bảng CONV) + hoàn 85 % hợp kim / 90 % đá đã nuôi.
//  • Save cũ: toàn bộ kho bản sao Evo82 quy đổi 1 lần theo cùng luật (khóa saobang-nobs22-v1), bậc cao xử lý trước.
//  • Nâng cấp (nc307) chỉ Đá XP; Tiến bậc (evo82 stepOf) và Ép Xung (oc17 cost22) dùng nguyên liệu thay bản sao — sửa ngay trong các mô-đun đó.
const NOBS22=(()=>{
 const on=()=>window.NOBS22!==false&&typeof Evo82!=='undefined'&&typeof V70!=='undefined';
 const KEY='saobang-nobs22-v1';
 // t (0..11): 0 Trắng · 1 Lục · 2–5 Lam(+0..+3) · 6–11 Tím(+0..+5)
 const CONV=t=>t>=6?{xp:[3,2],mat:[3,2],cr:6000}:t>=2?{xp:[2,2],mat:[2,2],cr:2000}:t===1?{xp:[2,1],mat:[1,1],cr:800}:{xp:[1,2],mat:null,cr:300};
 const tr=f=>{try{return f();}catch(e){return undefined;}};
 const nameOf=(k,m)=>tr(()=>k==='craft'?Fighters28.profiles[m].name:GearCatalog[m].name)||String(m);
 const TN=t=>tr(()=>TIER70.name[t])||('bậc '+t);
 const matIds=tier=>tr(()=>MAT69.types.map(x=>x.id+tier))||[];
 // món chính của mẫu: chiến cơ = chỉ số; trang bị = món bậc cao nhất cùng mẫu (không hợp thể)
 function main(k,m){if(k==='craft'){if(!tr(()=>Campaign36.ownsCraft(m|0)))return null;return {k,ref:m|0,t:tr(()=>V70.craftN(m|0))|0};}
  const its=(tr(()=>Progress.getState().items)||[]).filter(i=>i&&i.variant===m&&!i.super&&!i.fusion&&!i.directFusion&&!i.key);
  if(!its.length)return null;let b=null,bt=-1;for(const i of its){const t=tr(()=>V70.nOf(i))|0;if(t>bt){bt=t;b=i;}}return {k,ref:b.id,t:bt};}
 // gom thông báo để nhận nhiều món cùng lúc không bắn nhiều toast
 let Q=[],qt=0;function note(s){Q.push(s);clearTimeout(qt);qt=setTimeout(()=>{const a=Q.slice(0,3);const more=Q.length-a.length;Q=[];tr(()=>toast(a.join(' · ')+(more>0?' · +'+more+' món':'')));},500);}
 const G={xp:{},mat:{},cr:0,st:0};
 function convert(t,cr0,st0){const c=CONV(t|0);tr(()=>XPDA307.add(c.xp[0],c.xp[1]));G.xp[c.xp[0]]=(G.xp[c.xp[0]]|0)+c.xp[1];
  if(c.mat){const ids=matIds(c.mat[0]);for(let i=0;i<c.mat[1]&&ids.length;i++){const id=ids[Math.floor(Math.random()*ids.length)];tr(()=>V70.add(id,1));G.mat[id]=(G.mat[id]|0)+1;}}
  const cr=c.cr+Math.floor((cr0|0)*.85),st=Math.floor((st0|0)*.9);tr(()=>Progress.grantCredits(cr));if(st)tr(()=>Workshop.exp70(st));G.cr+=cr;G.st+=st;return c;}
 function refund(cr0,st0){const cr=Math.floor((cr0|0)*.85),st=Math.floor((st0|0)*.9);if(cr)tr(()=>Progress.grantCredits(cr));if(st)tr(()=>Workshop.exp70(st));G.cr+=cr;G.st+=st;}
 // xử lý 1 "bản sao" (k 'craft'|'gear', m mẫu, t bậc). Trả về 'unlock' | 'up' | 'conv'
 function absorb(k,m,t,lv,cr0,st0,quiet){if(k==='craft')m=m|0;t=t|0;const nm=nameOf(k,m);let x=main(k,m);
  if(!x){const ok=tr(()=>Campaign36.acquire(k,m,'','equipment'));/* nguồn 'equipment' mới được mở khóa mẫu chưa có (Campaign36.permitted) */if(ok){const ref=k==='craft'?m:ok.item&&ok.item.id;if(t>0&&ref!=null)tr(()=>V70.setTier(k,ref,t));if(!quiet)note('MỞ KHÓA '+nm.toUpperCase()+' · '+TN(t));return 'unlock';}}
  else if(t>x.t){tr(()=>V70.setTier(k,x.ref,t));tr(()=>V70.sync&&V70.sync());if(!quiet)note('NÂNG '+nm.toUpperCase()+' → '+TN(t));refund(cr0,st0);return 'up';}
  const c=convert(t,cr0,st0);if(!quiet)note(nm+' trùng → Đá XP'+(c.mat?' + VL':'')+' + '+(c.cr+Math.floor((cr0|0)*.85)).toLocaleString('vi-VN')+' ◈');return 'conv';}
 // bọc Evo82.addCopy (mọi đường tạo bản sao đều đi qua đây, kể cả V70.phAdd → Evo82.fromPh)
 let ORIG=null;function hook(){if(!on()||!Evo82.addCopy||ORIG)return;const orig=ORIG=Evo82.addCopy;
  const f=function(k,m,t,lv,quiet){if(!on())return orig.apply(this,arguments);absorb(k==='craft'?'craft':'gear',m,t|0,lv|0,0,0,false);return {u:-1,k,m,t:t|0,lv:lv|0,nb22:1};};
  f.__nb22=1;f.orig=orig;Evo82.addCopy=f;}
 // quy đổi kho bản sao cũ 1 lần
 let migRes=null;
 function migrate(force){if(!on())return null;let done=0;try{done=+localStorage.getItem(KEY)||0;}catch{}if(done&&!force)return null;
  const L=(tr(()=>Evo82.list())||[]).slice().sort((a,b)=>(b.t|0)-(a.t|0));
  for(const k in G.xp)delete G.xp[k];for(const k in G.mat)delete G.mat[k];G.cr=0;G.st=0;
  const res={n:L.length,unlock:0,up:0,conv:0};for(const c of L){const r=absorb(c.k,c.m,c.t|0,c.lv|0,c.cr|0,c.st|0,true);res[r]=(res[r]|0)+1;}
  tr(()=>Evo82._reset());try{localStorage.setItem(KEY,String(Date.now()));}catch{}
  res.gain={xp:{...G.xp},mat:{...G.mat},cr:G.cr,st:G.st};migRes=res;
  if(L.length){const xs=Object.keys(G.xp).map(t=>G.xp[t]+' Đá XP '+['','I','II','III','IV'][t]).join(', ');const mn=Object.values(G.mat).reduce((a,b)=>a+b,0);
   setTimeout(()=>tr(()=>toast('BỎ BẢN SAO · '+L.length+' bản sao đã quy đổi: '+(res.up?res.up+' món được nâng bậc · ':'')+xs+(mn?' · '+mn+' nguyên liệu':'')+' · +'+G.cr.toLocaleString('vi-VN')+' ◈')),1200);}
  tr(()=>Progress.render());return res;}
 // quét định kỳ: đường nội bộ của evo82 (fromPh, tách/đổi phôi) gọi addCopy không qua lớp bọc → bản sao mới sinh được xử lý trong ≤1,5 s
 function sweep(){if(!on())return;let m='';try{m=mode;}catch{}if(m==='play'||m==='pause')return;const L=tr(()=>Evo82.list())||[];if(!L.length)return;
  L.sort((a,b)=>(b.t|0)-(a.t|0));for(const c of L)absorb(c.k,c.m,c.t|0,c.lv|0,c.cr|0,c.st|0,false);tr(()=>Evo82._reset());tr(()=>Progress.render());}
 function boot(n){if(!on())return;hook();if(tr(()=>Progress.getState())&&typeof XPDA307!=='undefined'){migrate();setInterval(sweep,1500);return;}if((n|0)<40)setTimeout(()=>boot((n|0)+1),250);}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>boot(0));else boot(0);
 return {on,absorb,migrate,hook,sweep,CONV,last:()=>migRes,orig:()=>ORIG,hooked:()=>!!ORIG};
})();
