'use strict';
// V2.2.3 · GÓI A (T24, chủ dự án 26/11). Tắt toàn bộ: window.PKA24=false (đặt trước khi trang tải). Tắt từng phần:
//  window.DAN24=false (tương phản đạn) · TEL24=false (báo laser dọc) · X224=false (chữ X2) · TT24=false (mưa tinh thể) · SFX24=false (âm thanh Gói A)
//  (nhạc nền hòa tiếng khi chuyển bài nằm trong music96.js, tắt window.XF24=false)
// NGUYÊN TẮC KINH TẾ (chủ dự án chốt 26/11): X2 và mưa tinh thể CHỈ là hình + tiếng. Không cộng điểm, không cộng Hợp kim / Kim cương / Đá XP / rương.
//  X2 = hệ số combo SẴN CÓ của game (multiplier(), ×1..×5, điểm đã được game tính như cũ). Tinh thể = hạt trang trí bay về tàu, không nhặt được gì.
// Hiệu năng: mọi hình dựng sẵn lúc tải (0 canvas mới trong trận), không shadowBlur / filter / fillText mỗi khung.
(()=>{
 const ON=()=>window.PKA24!==false,on=k=>ON()&&window[k]!==false;
 const now=()=>performance.now()/(window.__fx23slow||1); // __fx23slow chỉ để chụp ảnh
 const play=()=>{try{return mode==='play';}catch{return false;}};
 const light=()=>{try{return VisualFX.counts().quality==='light';}catch{return false;}};
 function cv(w,h,f){const c=document.createElement('canvas');c.width=w;c.height=h;f(c.getContext('2d'),w,h);return c;}
 // ---------- hình dựng sẵn ----------
 const CORE=cv(32,32,g=>{const r=g.createRadialGradient(16,16,0,16,16,16);r.addColorStop(0,'rgba(255,255,255,1)');r.addColorStop(.32,'rgba(255,248,222,.95)');r.addColorStop(.62,'rgba(255,196,128,.35)');r.addColorStop(1,'rgba(255,150,90,0)');g.fillStyle=r;g.fillRect(0,0,32,32);});
 const HALO=cv(32,32,g=>{const r=g.createRadialGradient(16,16,4,16,16,16);r.addColorStop(0,'rgba(12,0,6,.0)');r.addColorStop(.45,'rgba(14,0,8,.78)');r.addColorStop(.72,'rgba(10,0,6,.5)');r.addColorStop(1,'rgba(6,0,4,0)');g.fillStyle=r;g.fillRect(0,0,32,32);});
 const BADGE=cv(64,64,g=>{g.translate(32,32);g.fillStyle='rgba(20,0,6,.85)';g.beginPath();g.arc(0,0,27,0,6.283);g.fill();const r=g.createLinearGradient(0,-24,0,24);r.addColorStop(0,'#ff6a5a');r.addColorStop(1,'#c4121f');g.fillStyle=r;g.beginPath();g.arc(0,0,23,0,6.283);g.fill();g.strokeStyle='#ffd7cf';g.lineWidth=2.2;g.stroke();
  g.fillStyle='#fff';g.strokeStyle='rgba(60,0,8,.9)';g.lineWidth=3;g.font='900 40px sans-serif';g.textAlign='center';g.textBaseline='middle';g.strokeText('!',0,3);g.fillText('!',0,3);});
 const BAND=cv(32,4,g=>{const r=g.createLinearGradient(0,0,32,0);r.addColorStop(0,'rgba(255,40,40,0)');r.addColorStop(.18,'rgba(255,60,50,.55)');r.addColorStop(.5,'rgba(255,90,70,.22)');r.addColorStop(.82,'rgba(255,60,50,.55)');r.addColorStop(1,'rgba(255,40,40,0)');g.fillStyle=r;g.fillRect(0,0,32,4);});
 const XS={};for(let m=2;m<=5;m++)XS[m]=cv(84,44,g=>{g.font='italic 900 30px sans-serif';g.textAlign='center';g.textBaseline='middle';g.lineJoin='round';g.lineWidth=6;g.strokeStyle='rgba(30,10,0,.9)';g.strokeText('X'+m,42,23);
  const r=g.createLinearGradient(0,6,0,38);r.addColorStop(0,'#fffbe0');r.addColorStop(.45,m>=4?'#ffb13b':'#ffd84d');r.addColorStop(1,m>=4?'#ff5a2a':'#f59e0b');g.fillStyle=r;g.fillText('X'+m,42,23);});
 const CRY=cv(20,24,g=>{g.translate(10,12);const r=g.createLinearGradient(-8,-10,8,10);r.addColorStop(0,'#f0feff');r.addColorStop(.45,'#5fe8ff');r.addColorStop(1,'#2563eb');g.fillStyle=r;g.beginPath();g.moveTo(0,-11);g.lineTo(8,-2);g.lineTo(0,11);g.lineTo(-8,-2);g.closePath();g.fill();g.strokeStyle='rgba(8,24,60,.9)';g.lineWidth=1.4;g.stroke();g.fillStyle='rgba(255,255,255,.85)';g.beginPath();g.moveTo(0,-9);g.lineTo(3,-2);g.lineTo(0,1);g.lineTo(-3,-2);g.closePath();g.fill();});
 const GLINT=cv(24,24,g=>{const r=g.createRadialGradient(12,12,0,12,12,12);r.addColorStop(0,'rgba(220,255,255,1)');r.addColorStop(.35,'rgba(110,230,255,.6)');r.addColorStop(1,'rgba(60,160,255,0)');g.fillStyle=r;g.fillRect(0,0,24,24);});
 // ---------- âm thanh nhiều lớp (WebAudio, dùng chung context của Audio393) ----------
 let ac=null,bus=null,nb=null,voices=0;
 const sfxOn=()=>{try{return !!sound;}catch{return false;}};
 function A(){let a=null;try{if(typeof audio!=='undefined')a=audio;}catch{}if(!a)return null;if(a!==ac){ac=a;bus=null;}
  if(!bus){try{const c=ac.createDynamicsCompressor();c.threshold.value=-18;c.ratio.value=6;c.attack.value=.003;c.release.value=.12;bus=ac.createGain();bus.gain.value=.38;bus.connect(c);c.connect(ac.destination);
   nb=ac.createBuffer(1,Math.ceil(ac.sampleRate*.25),ac.sampleRate);const d=nb.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;}catch{bus=null;return null;}}return ac;}
 const ready=()=>on('SFX24')&&sfxOn()&&!document.hidden&&A()&&ac.state==='running'&&bus;
 const stat={n:0,drop:0,peak:0,siren:0,chime:0,up:0};
 function voice(){if(voices>=10){stat.drop++;return false;}voices++;stat.n++;if(voices>stat.peak)stat.peak=voices;return true;}
 function tone(type,f0,f1,t,d,v,lp){if(!voice())return;try{const o=ac.createOscillator(),g=ac.createGain();o.type=type;o.frequency.setValueAtTime(f0,t);if(f1&&f1!==f0)o.frequency.exponentialRampToValueAtTime(f1,t+d*.9);let n=o;if(lp){const f=ac.createBiquadFilter();f.type='lowpass';f.frequency.value=lp;o.connect(f);n=f;}n.connect(g);g.connect(bus);
  g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(v,t+.006);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.start(t);o.stop(t+d+.03);o.onended=()=>{voices--;try{o.disconnect();g.disconnect();}catch{}};}catch{voices--;}}
 function click(t,v,hp){if(!voice())return;try{const s=ac.createBufferSource(),f=ac.createBiquadFilter(),g=ac.createGain();s.buffer=nb;f.type='highpass';f.frequency.value=hp||5000;s.connect(f);f.connect(g);g.connect(bus);g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.0001,t+.03);s.start(t);s.stop(t+.04);s.onended=()=>{voices--;try{s.disconnect();g.disconnect();}catch{}};}catch{voices--;}}
 // tinh thể về tàu: thân sine + lớp tam giác quãng tám + tiếng tách kim loại; cao dần theo chuỗi
 let chT=0,chN=0;
 function chime(){if(!ready())return;const n=now();if(n-chT<45)return;chN=n-chT<420?Math.min(14,chN+1):0;chT=n;stat.chime++;const t=ac.currentTime,f=1046*Math.pow(2,[0,2,4,7,9,12,14,16,19,21,24,26,28,31,33][chN]/12);
  tone('sine',f,f,t,.16,.10);tone('triangle',f*2,f*2,t,.09,.035);click(t,.05,7000);}
 // còi báo laser: 2 lớp răng cưa lệch nhau quét lên/xuống + nền trầm
 function siren(){if(!ready())return;stat.siren++;const t=ac.currentTime;for(let k=0;k<2;k++){const s=t+k*.24;tone('sawtooth',620,980,s,.22,.07,2200);tone('square',624*1.5,980*1.5,s,.2,.025,2600);}tone('sine',110,90,t,.48,.09);try{if(window.Music96&&Music96.duckFx)Music96.duckFx(.25,.4);}catch{}}
 // hệ số combo tăng: hợp âm rải 3 nốt + tiếng tách
 function up(m){if(!ready())return;stat.up++;const t=ac.currentTime,b=660*Math.pow(2,(m-2)*2/12);[1,1.26,1.5].forEach((r,i)=>tone('triangle',b*r,b*r,t+i*.045,.18,.07));tone('sine',b*3,b*3,t+.09,.14,.03);click(t,.06,4000);}
 // ---------- 1) tương phản đạn ----------
 function hookShots(){try{if(typeof Fighters28==='undefined'||!Fighters28.draw||Fighters28.draw.__p24)return;const o=Fighters28.draw;const f=function(g,s){if(g===ctx&&on('DAN24')&&play()){const a=g.globalAlpha;g.globalAlpha=Math.max(.72,Math.min(.82,a));try{return o.apply(this,arguments);}finally{g.globalAlpha=a;}}return o.apply(this,arguments);};f.__p24=1;Fighters28.draw=f;}catch{}}
 function hookHostile(){try{if(typeof Render27!=='undefined'&&Render27.projectile&&!Render27.projectile.__p24){const o=Render27.projectile;const f=function(b){if(on('DAN24')&&b&&!b.dead&&b.r>0){const d=Math.min(40,Math.max(14,b.r*4));ctx.drawImage(HALO,b.x-d/2,b.y-d/2,d,d);}return o.apply(this,arguments);};f.__p24=1;Render27.projectile=f;}}catch{}
  try{if(typeof PlayerFXB!=='undefined'&&PlayerFXB.hostile&&!PlayerFXB.hostile.__p24){const o=PlayerFXB.hostile;const f=function(b){const r=o.apply(this,arguments);if(on('DAN24')&&b&&!b.dead&&b.r>0){const d=Math.min(18,Math.max(7,b.r*1.7));const p=ctx.globalCompositeOperation,a=ctx.globalAlpha;ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1;ctx.drawImage(CORE,b.x-d/2,b.y-d/2,d,d);ctx.globalAlpha=a;ctx.globalCompositeOperation=p;}return r;};f.__p24=1;PlayerFXB.hostile=f;}}catch{}}
 // ---------- 2) báo laser dọc 0,9 s ----------
 const isV=b=>b.angle28===undefined||Math.abs(Math.cos(b.angle28))<.2;
 let sirenT=-1e9;
 function scanBeams(){if(!on('TEL24'))return;let L;try{L=beams;}catch{return;}for(const b of L){if(!b||b.__p24)continue;b.__p24=1;if(!isV(b))continue;b.__v24=1;if(b.age<.1&&b.warn<.9)b.warn=.9;if(now()-sirenT>700){sirenT=now();siren();}}}
 function drawTel(g){let L;try{L=beams;}catch{return;}const t=now()/1000;for(const b of L){if(!b||!b.__v24||!(b.age<b.warn))continue;const u=b.age/b.warn,w=Math.max(26,(b.width||14)*2.2),y0=Math.max(0,b.y||0),h=H-y0,pl=.5+.5*Math.sin(t*22);
   g.save();g.globalCompositeOperation='lighter';g.globalAlpha=(.35+.4*u)*(.65+.35*pl);g.drawImage(BAND,b.x-w/2,y0,w,h);g.globalAlpha=.55+.35*pl;g.fillStyle='#ff4d4d';g.fillRect(b.x-w/2,y0,1.6,h);g.fillRect(b.x+w/2-1.6,y0,1.6,h);g.restore();
   const by=Math.min(H-120,Math.max(96,y0+44)),k=(u<.12?.6+u/.12*.5:1.1-.1*pl)*30;g.save();g.globalAlpha=.95;g.drawImage(BADGE,b.x-k,by-k,k*2,k*2);g.restore();}}
 // ---------- 3) chữ X2..X5 (hệ số combo có sẵn) ----------
 const XP=[];for(let i=0;i<24;i++)XP.push({on:0});let xpi=0,lastM=1;
 function pop(x,y,m,big){const p=XP[xpi=(xpi+1)%XP.length];p.on=1;p.x=x;p.y=y;p.m=Math.min(5,m);p.t0=now();p.big=big?1.35:1;}
 function drawX(g){const t=now();for(const p of XP){if(!p.on)continue;const u=(t-p.t0)/380;if(u>=1){p.on=0;continue;}const s=(u<.18?1.5-u/.18*.5:1)*p.big*.92,a=u<.6?1:1-(u-.6)/.4,im=XS[p.m];g.globalAlpha=a;g.drawImage(im,p.x-42*s,p.y-22*s-26*u,84*s,44*s);}g.globalAlpha=1;}
 // ---------- 4) mưa tinh thể hút nam châm (chỉ trang trí) ----------
 const CP=[];for(let i=0;i<64;i++)CP.push({on:0});let cpi=0,lt=0;const GL=[];for(let i=0;i<12;i++)GL.push({on:0});let gli=0;
 function spawn(x,y,n){if(!on('TT24'))return;if(light())n=Math.ceil(n*.6);for(let k=0;k<n;k++){const p=CP[cpi=(cpi+1)%CP.length];const a=-Math.PI/2+(Math.random()-.5)*2.4,v=90+Math.random()*150;p.on=1;p.x=x+(Math.random()-.5)*14;p.y=y+(Math.random()-.5)*10;p.vx=Math.cos(a)*v;p.vy=Math.sin(a)*v;p.t=0;p.cw=Math.random()<.5?-1:1;p.r=Math.random()*6.283;}}
 function step(dt){let px=240,py=700;try{px=player.x;py=player.y;}catch{}for(const p of CP){if(!p.on)continue;p.t+=dt;if(p.t>2.4){p.on=0;continue;}
   if(p.t<.22){p.vx*=Math.pow(.05,dt);p.vy=p.vy*Math.pow(.05,dt)+260*dt;}else{const dx=px-p.x,dy=py-p.y,d=Math.hypot(dx,dy)||1;if(d<18){p.on=0;chime();const G=GL[gli=(gli+1)%GL.length];G.on=1;G.x=px;G.y=py;G.t0=now();continue;}
    const acc=1500+2600*Math.min(1,(p.t-.22)/.6);p.vx+=(dx/d*acc+(-dy/d)*p.cw*420)*dt;p.vy+=(dy/d*acc+(dx/d)*p.cw*420)*dt;const sp=Math.hypot(p.vx,p.vy),mx=900;if(sp>mx){p.vx*=mx/sp;p.vy*=mx/sp;}}
   p.x+=p.vx*dt;p.y+=p.vy*dt;p.r+=dt*6;}}
 function drawC(g){const t=now();let any=false;for(const p of CP){if(!p.on)continue;if(!any){g.save();any=true;}const s=.82+.18*Math.sin(p.r);g.globalAlpha=.95;g.drawImage(CRY,p.x-8*s,p.y-10,16*s,20);}
  if(any){g.globalCompositeOperation='lighter';for(const G of GL){if(!G.on)continue;const u=(t-G.t0)/180;if(u>=1){G.on=0;continue;}g.globalAlpha=.7*(1-u);const d=18+22*u;g.drawImage(GLINT,G.x-d/2,G.y-d/2,d,d);}g.restore();}}
 // ---------- móc hạ địch ----------
 let bossRef=null,upT=0,hk=0;
 function hookKill(){try{if(typeof kill!=='function'||kill.__p24)return;const o=kill;const f=function(e){const was=!!(e&&e.dead);const r=o.apply(this,arguments);try{if(ON()&&!was&&e&&e.dead&&!e.__p24k&&!e.meteor&&!e.rescue28&&play()){e.__p24k=1;/* chống lặp khi mô-đun khác bọc lại kill */let m=1;try{m=multiplier();}catch{}
    if(on('X224')&&m>=2){pop(e.x,e.y-6,m,m>lastM);if(m>lastM&&now()-upT>250){upT=now();up(m);}}lastM=m;spawn(e.x,e.y,e.type===4?6:(e.elite?8:4));}}catch{}return r;};f.__p24=1;kill=f;hk++;}catch{}}
 function watchBoss(){let b=null;try{b=boss;}catch{}if(b&&b!==bossRef){bossRef=b;bossRef.__d24=0;}if(bossRef&&!bossRef.__d24&&(bossRef.dead||!(bossRef.hp>0))){bossRef.__d24=1;spawn(bossRef.x||240,bossRef.y||160,24);}
  try{if(lastM>1&&multiplier()<=1)lastM=1;}catch{}}
 // ---------- vẽ: sau thân tàu, trước đạn địch ----------
 let lf=0;
 function frame(){if(!ON()||!play()){if(!play()){for(const p of CP)p.on=0;for(const p of XP)p.on=0;}return;}const n=now();let dt=lf?(n-lf)/1000:.016;lf=n;if(!(dt>0))dt=.016;dt=Math.min(.05,dt);
  try{scanBeams();watchBoss();step(dt);drawTel(ctx);drawC(ctx);drawX(ctx);}catch{}}
 function hookOver(){try{if(typeof BloomQualityC==='undefined'||!BloomQualityC.draw||BloomQualityC.draw.__p24)return;const o=BloomQualityC.draw;const f=function(){const r=o.apply(this,arguments);frame();return r;};f.__p24=1;BloomQualityC.draw=f;}catch{}}
 function all(){hookShots();hookHostile();hookKill();hookOver();}
 all();setInterval(all,1000);
 window.PKA24S={hooked:()=>hk>0,stat,pop,spawn,siren,chime,up,cry:()=>CP.filter(p=>p.on).length,xs:()=>XP.filter(p=>p.on).length};
})();
