'use strict';
// V2.2.3 · VFX đợt 1 (chủ dự án 25/11, ảnh 90239 HÀNG 2). Tắt toàn bộ: window.VFX23=false (đặt trước khi trang tải)
//  • Ngọc nhặt mới (P / Khiên / Hồi máu / Pha lê) thay ảnh rơi cũ lúc DỰNG (build74_mau.py, VFX23=0 để giữ cũ); trong trận:
//    nảy lên 180 ms khi rơi ra · vào vùng hút thì lượn cong về tàu · nhặt được → vòng sáng nhỏ quanh tàu.
//  • Tia sáng fx_hit_spark (bể 48, chỉ drawImage 'lighter'): lóe nòng 55 ms ở mũi tàu khi bắn · bùng 95 ms ĐÚNG điểm đạn trúng thân quái/boss.
//  • Bạo Tẩu: sóng vòng mảnh 280 ms · băng chữ chéo "BẠO TẨU!" · viền tối mép màn α .22 · sao nền kéo thành vệt siêu thanh (sau nền, trước mọi vật thể).
//  Không ctx.filter / shadowBlur, không tạo canvas trong trận (ảnh nạp 1 lần lúc tải).
(()=>{
 const ON=()=>window.VFX23!==false;
 if(!ON())return;
 window.__noTick23=true;// clean23 nhường dấu trúng cho tia sáng mới
 const A=window.VFX23_IMG||{};const IM={};for(const k in A){const i=new Image();i.decoding='async';i.src=A[k];IM[k]=i;}
 const ok=i=>i&&i.complete&&i.naturalWidth>0;
 const now=()=>performance.now();
 const play=()=>{try{return mode==='play';}catch{return false;}};
 const lite=()=>{try{return VisualFX.counts().quality==='light';}catch{return false;}};
 // ---------- bể tia sáng ----------
 const N=48,P=[];for(let i=0;i<N;i++)P.push({on:0});let pi=0;
 function spark(x,y,sz,life,rot){const p=P[pi=(pi+1)%N];p.on=1;p.x=x;p.y=y;p.s=sz;p.t0=now();p.l=life;p.r=rot;}
 function drawSparks(g){const im=IM.fx_hit_spark;if(!ok(im))return;const t=now();let any=false;
  for(const p of P){if(!p.on)continue;const u=(t-p.t0)/p.l;if(u>=1||u<0){p.on=0;continue;}if(!any){g.save();g.globalCompositeOperation='lighter';any=true;}
   const s=p.s*(.7+.5*u);g.globalAlpha=(1-u)*(1-u)*.95;if(p.r){g.save();g.translate(p.x,p.y);g.rotate(p.r);g.drawImage(im,-s/2,-s/2,s,s);g.restore();}else g.drawImage(im,p.x-s/2,p.y-s/2,s,s);}
  if(any)g.restore();}
 // trúng: Feedback31.damage(đích, lượng, nguồn) — nguồn là viên đạn → điểm trúng đúng chỗ
 const lastHit=new WeakMap();
 function hookHit(){try{if(typeof Feedback31==='undefined'||Feedback31.__v23)return;const o=Feedback31.damage;Feedback31.damage=function(t,a,src){try{if(play()&&t){const tt=now(),l=lastHit.get(t)||0;if(tt-l>55){lastHit.set(t,tt);
   let x=src&&Number.isFinite(src.x)?src.x:t.x,y=src&&Number.isFinite(src.y)?src.y:t.y+((t.r||20)*.4);
   if(Math.abs(x-t.x)>90||Math.abs(y-t.y)>120){x=t.x;y=t.y+((t.r||20)*.4);}
   spark(x,y,lite()?20:26,95,Math.random()*.6);}}}catch{}return o.apply(this,arguments);};Feedback31.__v23=1;}catch{}}
 // lóe nòng
 let lastMz=0;
 function hookFire(){try{if(typeof Arsenal30==='undefined'||Arsenal30.__v23)return;const o=Arsenal30.fire;Arsenal30.fire=function(){const r=o.apply(this,arguments);try{const t=now();if(play()&&t-lastMz>70){lastMz=t;spark(player.x,player.y-36,lite()?22:28,55,0);}}catch{}return r;};Arsenal30.__v23=1;}catch{}}
 // ---------- ngọc nhặt ----------
 const ORB={power:1,shield:1,heal:1};
 const pop=new WeakMap();
 function hookPick(){try{if(typeof Pickup51==='undefined'||Pickup51.__v23)return;const o=Pickup51.draw;Pickup51.draw=function(d,y,sz){if(!d||!ORB[d.type])return o.apply(this,arguments);
   let p=pop.get(d);if(!p){p={t0:now()};pop.set(d,p);}const u=(now()-p.t0)/180;let yy=y;if(u>=0&&u<1)yy=y-Math.sin(u*Math.PI)*26;// nảy lên
   let dx=0;try{const ex=d.x-player.x,ey=d.y-player.y,dist=Math.hypot(ex,ey);if(dist<170&&dist>18){const k=Math.sin(Math.min(1,dist/170)*Math.PI);dx=(-ey/dist)*k*14*(ex>=0?1:-1);}}catch{}// lượn cong khi bị hút
   const x0=d.x;d.x=x0+dx;let r;try{r=o.call(this,d,yy,sz);}finally{d.x=x0;}return r;};Pickup51.__v23=1;}catch{}}
 // vòng nhặt: ngọc biến mất khi đang sát tàu
 const seen=new Map(),rings=[];
 function trackDrops(){try{if(!play()){seen.clear();return;}const cur=new Set();for(const d of drops){if(!ORB[d.type]&&d.type!=='star')continue;cur.add(d);seen.set(d,[d.x,d.y,d.type]);}
   for(const [d,v] of seen){if(!cur.has(d)){seen.delete(d);if(Math.hypot(v[0]-player.x,v[1]-player.y)<80&&rings.length<6)rings.push({t0:now(),c:v[2]==='power'?'#ffb347':v[2]==='shield'?'#5fe0ff':v[2]==='heal'?'#5dff9a':'#9fd8ff'});}}}catch{}}
 function drawRings(g){const t=now();for(let i=rings.length-1;i>=0;i--){const r=rings[i],u=(t-r.t0)/220;if(u>=1){rings.splice(i,1);continue;}
   g.save();g.globalCompositeOperation='lighter';g.globalAlpha=(1-u)*.6;g.strokeStyle=r.c;g.lineWidth=2;g.beginPath();g.arc(player.x,player.y,20+34*u,0,6.283);g.stroke();g.restore();}}
 // ---------- Bạo Tẩu siêu thanh ----------
 let wasSup=false,shock=0;
 const SL=[];for(let i=0;i<30;i++)SL.push({x:Math.random()*480,y:Math.random()*900,v:1100+Math.random()*900,l:60+Math.random()*120,a:.12+Math.random()*.2});
 let lastT=0;
 function speedlines(g){let sp=false;try{sp=superTime>0&&play();}catch{}if(!sp){lastT=0;return;}const t=now(),dt=lastT?Math.min(.05,(t-lastT)/1000):0;lastT=t;
  let Hh=854;try{Hh=H;}catch{}g.save();g.globalCompositeOperation='lighter';g.strokeStyle='#bfe9ff';g.lineWidth=1.2;const n=lite()?16:30;
  for(let i=0;i<n;i++){const s=SL[i];s.y+=s.v*dt;if(s.y-s.l>Hh){s.y=-Math.random()*200;s.x=Math.random()*480;}g.globalAlpha=s.a;g.beginPath();g.moveTo(s.x,s.y-s.l);g.lineTo(s.x,s.y);g.stroke();}g.restore();}
 function drawShock(g){if(!shock)return;const u=(now()-shock)/280;if(u>=1){shock=0;return;}
  g.save();g.globalCompositeOperation='lighter';g.globalAlpha=.7*(1-u);g.strokeStyle='#ffe6a8';g.lineWidth=3*(1-u)+1;g.beginPath();g.arc(player.x,player.y,24+150*(1-(1-u)*(1-u)),0,6.283);g.stroke();g.restore();}
 // băng chữ + viền tối (DOM, gắn vào khung toàn màn hình nếu có)
 let bn=null,vg=null;
 function host(){return document.fullscreenElement||document.webkitFullscreenElement||document.body;}
 function ensureDom(){if(!bn){bn=document.createElement('div');bn.id='bt23';bn.innerHTML='<b>BẠO TẨU!</b>';vg=document.createElement('div');vg.id='vg23';}
  const h=host();if(bn.parentNode!==h)h.appendChild(bn);if(vg.parentNode!==h)h.appendChild(vg);}
 function css(){if(document.getElementById('vfx23-css'))return;const s=document.createElement('style');s.id='vfx23-css';
  s.textContent='#bt23{position:fixed;left:0;right:0;top:30%;height:58px;z-index:2147483050;pointer-events:none;overflow:hidden;opacity:0}'+
   '#bt23 b{position:absolute;left:50%;top:0;height:58px;line-height:58px;padding:0 46px;font:italic 900 34px/58px sans-serif;letter-spacing:3px;color:#fff6d6;white-space:nowrap;'+
   'background:linear-gradient(90deg,#ff7a1800,#ff7a18d9 18%,#ffb347e6 50%,#ff7a18d9 82%,#ff7a1800);text-shadow:0 2px 0 #7a2a00,0 0 10px #ffcf6a;transform:translateX(-50%) skewX(-16deg)}'+
   '#bt23.on{animation:bt23a .75s ease-out forwards}@keyframes bt23a{0%{opacity:0;transform:translate(60%,18px) rotate(-6deg)}22%{opacity:1;transform:translate(0,0) rotate(-6deg)}70%{opacity:1;transform:translate(-6%,-4px) rotate(-6deg)}100%{opacity:0;transform:translate(-70%,-16px) rotate(-6deg)}}'+
   '#vg23{position:fixed;inset:0;z-index:2147483040;pointer-events:none;opacity:0;transition:opacity .25s;background:radial-gradient(ellipse at center,#0000 58%,#000000 100%)}#vg23.on{opacity:.22}';
  (document.head||document.documentElement).appendChild(s);}
 function supTick(){let sp=false;try{sp=superTime>0&&play();}catch{}if(sp&&!wasSup){shock=now();try{ensureDom();bn.classList.remove('on');void bn.offsetWidth;bn.classList.add('on');}catch{}}
  if(vg)vg.classList.toggle('on',sp);wasSup=sp;}
 // vận tốc dọc → độ dài lửa (plume22 đọc window.__vy23K)
 let py=null,vy=0,lt=0;
 function vel(){try{const t=now(),dt=lt?(t-lt)/1000:0;lt=t;if(py!==null&&dt>0&&dt<.1){const v=(player.y-py)/dt;vy+=(v-vy)*Math.min(1,dt*8);}py=player.y;window.__vy23K=1+Math.max(-1,Math.min(1,-vy/500))*.18;}catch{}}
 // ---------- móc vẽ ----------
 function hookBg(){try{if(typeof NEN194==='undefined'||NEN194.__v23)return;const o=NEN194.draw;NEN194.draw=function(){const r=o.apply(this,arguments);try{speedlines(ctx);}catch{}return r;};NEN194.__v23=1;}catch{}}
 function hookFx(){try{if(typeof VisualFX==='undefined'||VisualFX.__v23)return;const o=VisualFX.draw;let lf=-1;VisualFX.draw=function(){const r=o.apply(this,arguments);try{let tm=0;try{tm=time;}catch{}if(tm===lf)return r;lf=tm;/* VisualFX.draw gọi 2 lần/khung → chỉ vẽ 1 lần */if(play()){trackDrops();drawSparks(ctx);drawRings(ctx);drawShock(ctx);vel();supTick();}else if(vg&&vg.classList.contains('on'))vg.classList.remove('on');}catch{}return r;};VisualFX.__v23=1;}catch{}}
 function all(){hookHit();hookFire();hookPick();hookBg();hookFx();css();}
 all();setTimeout(all,0);setTimeout(all,1500);setInterval(all,3000);
 window.VFX23S={state:()=>({sparks:P.filter(p=>p.on).length,rings:rings.length}),spark};
})();
