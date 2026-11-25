'use strict';
// V2.2.3 · CLEAN23 — trận sạch + nhẹ (video máy thật V2.2.2, chủ dự án 25/11). Tắt toàn bộ: window.CLEAN23=false (đặt trước khi trang tải)
//  1) Quái trúng đạn: bỏ 3 lớp chớp vẽ lại (race36 bóng trắng · V192 vẽ lại cộng sáng · FX16 vẽ lại cộng sáng) → 1 dấu trúng nhỏ cộng sáng 70 ms
//     (1 sprite dựng sẵn 1 lần, mỗi lần chỉ drawImage — không canvas phụ mỗi lần trúng, không ctx.filter / shadowBlur). Boss giữ chớp cũ.
//  2) Bạo Tẩu: bỏ quả cầu chớp trắng-vàng + vòng vàng to lúc kích hoạt (VisualFX.ultimate / ringA tâm ở tàu người chơi).
//     (vòng quanh tàu con, cánh lửa trên đạn, vệt lửa to tên lửa, tia tàu con dày, vòng đếm ngược dày: sửa ở evo21 / tb309 / dan307 / gear_fx_v3 / aura307 / l3309)
//  3) HUD chẩn đoán FPS xuống dưới thanh máu (góc phải) · thông báo "ĐÃ MỞ · …" lên giữa trên, không che nút đáy.
//  4) Về Sảnh: gắn Sảnh cổ điển lob222 ngay trong khung đầu tiên (không nháy Sảnh cũ ~300 ms).
(()=>{
 const ON=()=>window.CLEAN23!==false;
 if(!ON())return;
 const now=()=>performance.now();
 const inPlay=()=>{try{return mode==='play'||mode==='pause';}catch{return false;}};
 // ---------- 1) dấu trúng ----------
 const TICK=(()=>{const c=document.createElement('canvas');c.width=c.height=48;const g=c.getContext('2d');
  const r=g.createRadialGradient(24,24,0,24,24,22);r.addColorStop(0,'rgba(255,255,255,.95)');r.addColorStop(.18,'rgba(255,236,200,.8)');r.addColorStop(.45,'rgba(255,170,90,.28)');r.addColorStop(1,'rgba(255,140,60,0)');
  g.fillStyle=r;g.fillRect(0,0,48,48);g.strokeStyle='rgba(255,240,210,.85)';g.lineWidth=1.4;g.beginPath();g.arc(24,24,9,0,6.283);g.stroke();
  g.fillStyle='rgba(255,255,255,.9)';for(const [w,h] of [[1.3,14],[14,1.3]])g.fillRect(24-w/2,24-h/2,w,h);return c;})();
 const isBoss=e=>!!(e&&(e.isBoss||e.boss||e.bossPart||(typeof boss!=='undefined'&&e===boss)));
 let nTick=0;
 function hookHit(){try{if(typeof Render27==='undefined'||Render27.__c23)return;const o=Render27.hit;Render27.hit=function(e){try{if(e&&!isBoss(e)){const t=now();if(!e.h23||t-e.h23>90)e.h23=t;}}catch{}return o.apply(this,arguments);};Render27.__c23=1;}catch{}}
 function hookDraw(){try{if(typeof EnemyFleet==='undefined'||EnemyFleet.__c23)return;const o=EnemyFleet.drawEnemy;
  EnemyFleet.drawEnemy=function(e){if(!e||isBoss(e))return o.apply(this,arguments);const hf=e.hitFlashTimer;if(hf>0)e.hitFlashTimer=0;let r;try{r=o.apply(this,arguments);}finally{if(hf>0)e.hitFlashTimer=hf;}
   try{if(e.h23&&!e.dead&&!window.__noTick23){const u=(now()-e.h23)/70;if(u>=0&&u<1){const s=(e.large||e.elite?30:22)*(.8+.4*u);ctx.save();ctx.globalCompositeOperation='lighter';ctx.globalAlpha=(1-u)*.9;ctx.drawImage(TICK,e.x-s/2,e.y+(e.large?16:10)-s/2,s,s);ctx.restore();nTick++;}}}catch{}return r;};EnemyFleet.__c23=1;}catch{}}
 // ---------- 2) chớp kích hoạt Bạo Tẩu ----------
 const atPlayer=(x,y)=>{try{return inPlay()&&Math.hypot(x-player.x,y-player.y)<44;}catch{return false;}};
 let nSkip=0;
 function hookFx(){try{if(typeof VisualFX==='undefined'||VisualFX.__c23)return;const u=VisualFX.ultimate,ra=VisualFX.ringA;
  if(u)VisualFX.ultimate=function(x,y,c,r){if(atPlayer(x,y)){nSkip++;return;}return u.apply(this,arguments);};
  if(ra)VisualFX.ringA=function(x,y,c,r){if((r||0)>=40&&atPlayer(x,y)){nSkip++;return;}return ra.apply(this,arguments);};VisualFX.__c23=1;}catch{}}
 // ---------- 3) CSS ----------
 function css(){if(document.getElementById('clean23-css'))return;const s=document.createElement('style');s.id='clean23-css';
  s.textContent='html body #hud22#hud22{left:auto!important;right:calc(env(safe-area-inset-right,0px) + 6px)!important;top:calc(var(--sat42,0px) + 48px)!important;font-size:8.5px!important;padding:1px 4px!important;opacity:.85}'+
   'html body .g75b.g75b{top:calc(var(--sat42,0px) + 58px)!important;bottom:auto!important}';
  (document.head||document.documentElement).appendChild(s);}
 // ---------- 4) Về Sảnh không nháy Sảnh cũ ----------
 let kickUntil=0,kicking=false,nKick=0;
 function kick(pre){if(window.LOB222===false||typeof window.LOB222!=='object')return;kickUntil=now()+1400;
  try{if(pre&&!document.documentElement.classList.contains('lob222')){document.documentElement.classList.add('lob222','lob23w');}}catch{}
  try{LOB222.tick();}catch{}if(kicking)return;kicking=true;
  const f=()=>{try{LOB222.tick();}catch{}nKick++;if(now()<kickUntil)requestAnimationFrame(f);else{kicking=false;const H=document.documentElement;if(H.classList.contains('lob23w')){H.classList.remove('lob23w');try{if(!LOB222.inLobby())H.classList.remove('lob222');}catch{}}}};requestAnimationFrame(f);}
 function wrap(obj,k,pre){try{if(!obj||typeof obj[k]!=='function'||obj[k].__c23)return;const o=obj[k];const f=function(){if(pre)try{kick(true);}catch{}const r=o.apply(this,arguments);try{kick(false);}catch{}return r;};f.__c23=1;obj[k]=f;}catch{}}
 function hookLobby(){try{if(typeof End78!=='undefined')wrap(End78,'goLobby',false);/* không gắn lớp lob222 trước (từng làm chạm XUẤT KÍCH trên bản đồ mở ngay sau đó bị nuốt) — chỉ gọi tick đồng bộ + mỗi khung */}catch{}try{if(typeof Lobby!=='undefined')wrap(Lobby,'show');}catch{}}
 // lob222 đã lên → bỏ cờ chờ
 setInterval(()=>{const H=document.documentElement;if(H.classList.contains('lob23w')){try{if(LOB222.inLobby())H.classList.remove('lob23w');}catch{}}},250);
 // ĐẸP/NHẸ đổi → đổi bộ đệm canvas ngay
 function hookQ(){try{if(typeof VisualFX==='undefined'||VisualFX.__c23q)return;const o=VisualFX.setQuality;VisualFX.setQuality=function(){const r=o.apply(this,arguments);try{V105.apply();}catch{}return r;};VisualFX.__c23q=1;}catch{}}
 // ---------- 5) dựng sẵn bộ đệm sáng đạn địch dq309 (không tạo canvas lần đầu gặp trong trận) ----------
 (()=>{let n=0;const t=setInterval(()=>{try{const A=window.DQ309_IMG;if(!A)return;let all=true;for(const k in A){try{if(!window.__dq309im||!window.__dq309im(k))all=false;}catch{all=false;}}if(all||++n>60)clearInterval(t);}catch{clearInterval(t);}},500);})();
 function all(){hookHit();hookDraw();hookFx();hookLobby();hookQ();css();}
 all();setTimeout(all,0);setTimeout(all,1500);setInterval(all,3000);
 window.CLEAN23S={state:()=>({nTick,nSkip,nKick})};
})();
