'use strict';
// V2.2.1 · SỬA NHẢY MÀN (máy thật V2.2.0.43). Tắt cả: window.FIX22=false; từng phần: MIS22 / MAP22
//  • NHIỆM VỤ / MÙA GIẢI: băng tranh (tranh307, vòng 400 ms) và thẻ Chiến lệnh (l11309, vòng 250 ms) trước đây chèn sau khi danh sách đã hiện
//    → danh sách bị đẩy tụt. Nay chèn ngay khi hộp mở / vẽ lại (bọc Q77.open + MutationObserver trên hộp, chạy trước khung vẽ kế tiếp).
const FIX22=(()=>{
 const on=k=>window.FIX22!==false&&window[k]!==false;
 const tr=f=>{try{return f();}catch(e){return undefined;}};
 // ---------- NHIỆM VỤ ----------
 const syncMis=()=>{tr(()=>Tranh307.banners());tr(()=>L11309.seasonCard());};
 const seen=new WeakSet();
 function watch(){for(const el of document.querySelectorAll('.m63.q77p,.m63.s77p')){if(seen.has(el))continue;seen.add(el);
   new MutationObserver(()=>{if(on('MIS22')&&!el.hidden)syncMis();}).observe(el,{childList:true,subtree:true,attributes:true,attributeFilter:['hidden']});}}
 function hookQ(){if(typeof Q77==='undefined'||Q77.__f22)return false;const o=Q77.open;Q77.open=function(){const r=o.apply(this,arguments);if(on('MIS22')){watch();syncMis();}return r;};Q77.__f22=1;
  if(typeof S77!=='undefined'&&!S77.__f22){const o2=S77.open;S77.open=function(){const r=o2.apply(this,arguments);if(on('MIS22')){watch();syncMis();}return r;};S77.__f22=1;}return true;}
 let n=0;const iv=setInterval(()=>{if(hookQ()||++n>40)clearInterval(iv);},250);
 // ---------- BẢN ĐỒ CHỌN ẢI (tin 24/11 17:43) ----------
 //  (1) Kéo > 10 px tính từ lúc chạm → hủy cú chạm (không mở thẻ ải / không xuất kích).
 //  (2) Khóa xuất kích 400 ms: chạm đôi / touchend + click không thể vào trận 2 lần.
 //  (3) 3 s sau khi vào trận: chặn Lobby.show / ChapterMap.open / Nav74.tab|page / End78.goLobby / Hangar41.open nếu đang 'play'
 //      (nguồn "vừa vào trận đã bị kéo về menu"); mỗi lần chặn ghi tên + ngăn xếp vào FIX22.blocked() để chẩn đoán máy thật.
 let launchAt=-1e9,lockUntil=0;const blocked=[];const inPlay=()=>{try{return mode==='play'||mode==='pause';}catch{return false;}};
 let userAt=-1e9;for(const t of ['pointerdown','keydown','touchstart'])document.addEventListener(t,e=>{if(e.isTrusted)userAt=performance.now();},{capture:true,passive:true});
 const guardOn=()=>on('MAP22')&&inPlay()&&performance.now()-launchAt<3000&&performance.now()-userAt>800;/* lệnh đi kèm cú chạm thật (≤0,8 s) luôn được cho qua, ví dụ bấm VỀ SẢNH trong menu tạm dừng */
 function guard(obj,name,label){try{if(!obj||typeof obj[name]!=='function'||obj[name].__g22)return;const o=obj[name];
   const f=function(){if(guardOn()){blocked.push({f:label,t:Math.round(performance.now()-launchAt),s:(new Error().stack||'').split('\n').slice(2,5).join(' | ')});if(blocked.length>20)blocked.shift();return;}return o.apply(this,arguments);};
   for(const k of Object.keys(o))try{f[k]=o[k];}catch{}f.__g22=1;obj[name]=f;}catch{}}
 function hookGuards(){tr(()=>guard(Lobby,'show','Lobby.show'));tr(()=>guard(ChapterMap,'open','ChapterMap.open'));tr(()=>guard(Nav74,'tab','Nav74.tab'));tr(()=>guard(Nav74,'page','Nav74.page'));
  tr(()=>guard(End78,'goLobby','End78.goLobby'));tr(()=>guard(Hangar41,'open','Hangar41.open'));}
 let drag=null;
 const pt=e=>e.touches&&e.touches[0]?e.touches[0]:e.changedTouches&&e.changedTouches[0]?e.changedTouches[0]:e;
 function down(e){if(!on('MAP22'))return;if(!e.target.closest||!e.target.closest('#cmap'))return;const p=pt(e);drag={x:p.clientX,y:p.clientY,mv:0};}
 function move(e){if(!drag)return;const p=pt(e);const d=Math.hypot(p.clientX-drag.x,p.clientY-drag.y);if(d>drag.mv)drag.mv=d;}
 function clickCap(e){if(!on('MAP22'))return;const t=e.target;if(!t.closest)return;
  if(t.closest('#cmap')&&drag&&drag.mv>10&&t.closest('#cmap .cm-world,#cmap .cm-node')){e.stopImmediatePropagation();e.preventDefault();drag=null;return;}
  const go=t.closest('#cmap .cm-go,#start,.go10,[data-l9b=quick]');
  if(go&&e.isTrusted){const now=performance.now();if(now<lockUntil){e.stopImmediatePropagation();e.preventDefault();return;}lockUntil=now+400;
   if(go.id==='start'||go.closest('#cmap')){const mp=document.getElementById('cmap');if(mp){mp.style.pointerEvents='none';setTimeout(()=>{mp.style.pointerEvents='';},400);}}}
  if(t.closest('#cmap'))setTimeout(()=>{drag=null;},0);}
 document.addEventListener('pointerdown',down,true);document.addEventListener('touchstart',down,{capture:true,passive:true});
 document.addEventListener('pointermove',move,{capture:true,passive:true});document.addEventListener('touchmove',move,{capture:true,passive:true});
 document.addEventListener('click',clickCap,true);
 // (4) V2.2.3 · GO26: bấm XUẤT KÍCH lúc thẻ ải đang trượt lên / vừa đổi bố cục không bị nuốt: lưu vị trí nút trong 900 ms gần nhất
 //     + vị trí cuối (trừ dịch chuyển đang chạy); chạm rơi ra ngoài thẻ nhưng trúng các vị trí đó → bấm nút. Tắt: window.GO26=false
 const GR=[];let resc=0;
 const sheet=()=>document.querySelector('#cmap .cm-sheet.open');
 const goBtn=sh=>sh&&sh.querySelector('.cm-go:not([disabled])');
 function rects(){const sh=sheet(),g=goBtn(sh);if(!g)return [];const r=g.getBoundingClientRect(),o=[r];
  try{const m=new DOMMatrixReadOnly(getComputedStyle(sh).transform);if(m.m42)o.push(new DOMRect(r.left-m.m41,r.top-m.m42,r.width,r.height));}catch{}
  const t=performance.now();let a=r.top,b=r.bottom;for(const q of GR)if(t-q.t<900){a=Math.min(a,q.r.top);b=Math.max(b,q.r.bottom);}o.push(new DOMRect(r.left,a,r.width,b-a));return o;}/* dải quét dọc: nút chỉ trượt dọc */
 const inR=(x,y,rs)=>rs.some(r=>r.width>0&&x>=r.left-6&&x<=r.right+6&&y>=r.top-6&&y<=r.bottom+6);
 setInterval(()=>{if(!on('GO26'))return;try{if(mode==='play')return;}catch{}const g=goBtn(sheet());if(!g){GR.length=0;return;}GR.push({t:performance.now(),r:g.getBoundingClientRect()});if(GR.length>30)GR.shift();},30);
 function rescue(e){if(!on('GO26')||!on('MAP22'))return;const sh=sheet();if(!sh)return;const t=e.target;if(t&&t.closest&&t.closest('#cmap .cm-sheet')&&t.closest('button,a,input,select,label,[role=button],[data-su90],[onclick],.cm-sheet [class*="-btn"]'))return;/* chạm vào nền thẻ (không phải nút) vẫn cứu được */
  const p=pt(e);if(p.clientX==null)return;const now=performance.now();
  const hit=(e.type==='click'&&now-resc<700)||inR(p.clientX,p.clientY,rects());if(!hit)return;
  e.stopImmediatePropagation();
  if(e.type==='pointerdown'||e.type==='touchstart'||e.type==='mousedown'){resc=now;return;}
  if(e.type!=='click')return;e.preventDefault();
  if(e.type==='click'){resc=0;const g=goBtn(sh);if(g){window.__go26=(window.__go26||0)+1;g.click();}}}
//     Gốc của việc nút trôi: 5 mô-đun (ux90 tiếp tế · v91 thể lực · v94 trợ giúp · v100 tiếp tế · l11309 Anh Hùng) chèn dòng vào thẻ theo
 //     nhịp 250–600 ms → nút XUẤT KÍCH bị đẩy lên tới ~0,5 s sau khi thẻ mở. Nay chạy chúng ngay khi thẻ mở / đổi nội dung (trước khung vẽ kế).
 //     Gốc thứ hai (t_map22): trang nền dài ~11.700 px vẫn cuộn được dưới bản đồ cố định; khi cửa sổ bị cuộn (scrollIntoView / chạm kéo
 //     trên máy) thì vùng chạm của ô ải lệch khỏi hình → chạm ô ải rơi vào nền bản đồ. Bản đồ mở → giữ cửa sổ ở scrollY 0.
 const mapOpen=()=>{const m=document.getElementById('cmap');return !!m&&!m.hidden&&m.offsetParent!==null||(!!m&&getComputedStyle(m).display!=='none'&&!m.hidden);};
 const pin=()=>{if(!on('GO26'))return;try{if((scrollY||scrollX)&&mapOpen())scrollTo(0,0);}catch{}};
 addEventListener('scroll',pin,{passive:true});setInterval(pin,250);
 //     Ô ải: bản đồ có thể nhảy ~42 px khi thanh đầu / lề dưới đổi theo nhịp (1–2 s sau khi mở) và đôi khi có lớp không tên đè lên ô.
 //     Lưu vị trí các ô ải mở trong 900 ms; chạm rơi vào nền bản đồ (không phải nút) mà trúng vị trí ô vừa có → bấm ô đó.
 const NR=[];
 setInterval(()=>{if(!on('GO26'))return;try{if(mode==='play')return;}catch{}if(!mapOpen()||sheet()){NR.length=0;return;}const L=[];for(const n of document.querySelectorAll('#cmap .cm-node:not(.lock)')){const r=n.getBoundingClientRect();if(r.width>0&&r.bottom>0&&r.top<innerHeight)L.push([n,r]);}NR.push({t:performance.now(),L});if(NR.length>30)NR.shift();},30);
 let nres=null;
 function nodeRescue(e){if(!on('GO26')||!on('MAP22'))return;const t=e.target;if(!t||!t.closest||!t.closest('#cmap')||t.closest('.cm-node,.cm-sheet,button,a,input,[role=button]'))return;if(sheet())return;
  const p=pt(e);if(p.clientX==null)return;const now=performance.now();let hit=null;
  if(e.type==='click'&&nres&&now-nres.t<700)hit=nres.n;
  if(!hit){let bd=48;for(const n of document.querySelectorAll('#cmap .cm-node:not(.lock)')){const r=n.getBoundingClientRect();if(!(r.width>0))continue;const d=Math.hypot(p.clientX-(r.left+r.width/2),p.clientY-(r.top+r.height/2));if(d<bd){bd=d;hit=n;}}}/* vùng chạm ô ải nới tới bán kính 48 px quanh tâm (ô vẽ 46 px) — chạm hụt mép ô / ô vừa nhích vẫn mở đúng ô gần nhất */
  if(!hit){for(let i=NR.length-1;i>=0&&!hit;i--){if(now-NR[i].t>900)break;for(const [n,r] of NR[i].L)if(n.isConnected&&p.clientX>=r.left-4&&p.clientX<=r.right+4&&p.clientY>=r.top-4&&p.clientY<=r.bottom+4){hit=n;break;}}}
  if(!hit)return;if(drag&&drag.mv>10)return;
  e.stopImmediatePropagation();
  if(e.type==='pointerdown'||e.type==='touchstart'||e.type==='mousedown'){nres={t:now,n:hit};return;}
  if(e.type!=='click')return;e.preventDefault();nres=null;window.__node26=(window.__node26||0)+1;hit.click();}
 for(const ty of ['pointerdown','pointerup','touchend','mousedown','mouseup','click'])document.addEventListener(ty,nodeRescue,{capture:true});
 document.addEventListener('touchstart',nodeRescue,{capture:true,passive:true});
 let shBusy=false;const fill=()=>{if(shBusy||!on('GO26'))return;shBusy=true;try{for(const f of (window.__SH26||[]))f();}catch{}shBusy=false;};
 const shObs=new MutationObserver(()=>fill());let shEl=null;
 setInterval(()=>{const s=document.getElementById('cm-sheet');if(s&&s!==shEl){shEl=s;shObs.disconnect();shObs.observe(s,{childList:true,attributes:true,attributeFilter:['class']});fill();}},300);
 for(const ty of ['pointerdown','pointerup','touchend','mousedown','mouseup','click'])document.addEventListener(ty,rescue,{capture:true});
 document.addEventListener('touchstart',rescue,{capture:true,passive:true});
 // ghi mốc vào trận: lúc mode chuyển sang play (kiểm 4 lần/khung không cần — dùng rAF nhẹ 10 Hz)
 let lastM='';setInterval(()=>{let m='';try{m=mode;}catch{}if(m==='play'&&lastM!=='play'&&lastM!=='pause')launchAt=performance.now();lastM=m;hookGuards();},100);
 return {syncMis,blocked:()=>blocked.slice(),launchAt:()=>launchAt};
})();
