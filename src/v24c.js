'use strict';
// V2.4-C · XUNG KÍCH SIÊU TỐC · CẢNH BÁO LASER DỌC ⚠ · LÕI TRẮNG ĐẠN BOSS · NGHI THỨC LẬT RƯƠNG
//  0 đổi thời lượng / sát thương Xung Kích (pkb25 giữ nguyên 4,5 s bất tử + tông vỡ); 0 đổi thời gian báo laser (b.warn của trò chơi).
//  Ảnh: window.V24C_IMG (src/v24cimg, 6 webp ≤ 150 KB). Mọi sprite/canvas dựng lúc tải → 0 canvas mới trong trận; 0 shadowBlur / filter.
//  Xung Kích: nón gió fx_blitz_cone ôm mũi + cột lửa fx_blitz_flame tới đáy màn ('lighter', rung bề ngang), nền parallax ×2,4 (pkc26).
//   Tông nổ quái → mưa tinh thể + chữ "X<hệ số combo hiện hành>" (bể ≤ 8 chữ, ≤ 40 hạt).
//   Hết Xung Kích → vòng xoáy fx_blitz_vortex 0,45 s quanh tàu + hút tinh thể: Chiến dịch hút thật các viên ★ trên màn;
//   Vô tận chỉ hút HÌNH (bóng sáng bay về tàu, viên thật để nguyên) → điểm Vô tận 0 % thay đổi.
//   Pha bứt tốc đầu trận Vô tận: 1,6 s đầu chỉ hiện nón + lửa + nền ×2,4 (chỉ hình).
//  Laser dọc: 0,75 s cuối giai đoạn báo trước → đường ngắm đỏ mảnh + tam giác ⚠ nhấp nháy sát đỉnh + bíp (SND24S) ; lúc bắn thêm lõi trắng.
//  Đạn boss: chấm lõi trắng sắc giữa mỗi viên khi có boss (nổi trên nền Dung Nham / Băng).
//  Kết trận: lật rương ở lưới VẬT PHẨM ĐẠT ĐƯỢC (rung → chớp → mở → quà nảy lần lượt; chạm để bỏ qua). Huy hiệu CHIẾN THẮNG vẽ trong v24.js.
//  Tắt: window.V24C=false · riêng BLITZ24=false · LASER24=false · CORE24=false · CHEST24=false · BOSSXL24=false (boss 68–80 %, build).
(()=>{
 const on=k=>window.V24C!==false&&window.V24!==false&&(!k||window[k]!==false);
 const nowS=()=>performance.now()/1000,TAU=Math.PI*2;
 const IMG={};const im=k=>{if(IMG[k])return IMG[k];const s=window.V24C_IMG&&V24C_IMG[k];if(!s)return null;const i=new Image();i.src=s;IMG[k]=i;return i;};
 const ok=i=>i&&i.complete&&i.naturalWidth>0;
 ['fx_blitz_cone','fx_blitz_flame','fx_blitz_vortex','ui_victory_crest','ui_chest_closed','ui_chest_open'].forEach(im);
 window.V24CI=im;
 // ---------- sprite dựng lúc tải ----------
 const SP={};function spr(k,w,h,fn){if(SP[k])return SP[k];const c=document.createElement('canvas');c.width=w;c.height=h;fn(c.getContext('2d'),w,h);SP[k]=c;return c;}
 const dot=()=>spr('dot',24,24,g=>{const r=g.createRadialGradient(12,12,0,12,12,12);r.addColorStop(0,'rgba(255,255,255,1)');r.addColorStop(.45,'rgba(255,255,255,.95)');r.addColorStop(.7,'rgba(255,255,255,.35)');r.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=r;g.fillRect(0,0,24,24);});
 const gem=()=>spr('gem',32,32,g=>{g.translate(16,16);g.globalCompositeOperation='lighter';const r=g.createRadialGradient(0,0,0,0,0,16);r.addColorStop(0,'rgba(255,255,255,.95)');r.addColorStop(.3,'rgba(127,232,255,.8)');r.addColorStop(1,'rgba(40,150,255,0)');g.fillStyle=r;g.fillRect(-16,-16,32,32);
   g.fillStyle='rgba(255,255,255,.95)';g.beginPath();g.moveTo(0,-11);g.lineTo(3,0);g.lineTo(0,11);g.lineTo(-3,0);g.closePath();g.fill();g.beginPath();g.moveTo(-11,0);g.lineTo(0,2.5);g.lineTo(11,0);g.lineTo(0,-2.5);g.closePath();g.fill();});
 const warnTri=()=>spr('tri',64,58,g=>{g.lineJoin='round';g.beginPath();g.moveTo(32,4);g.lineTo(60,54);g.lineTo(4,54);g.closePath();g.fillStyle='#ffcf2e';g.fill();g.lineWidth=4;g.strokeStyle='#ff2a2a';g.stroke();
   g.fillStyle='#2a0505';g.font="900 34px 'Be Vietnam Pro',Neo,sans-serif";g.textAlign='center';g.textBaseline='middle';g.fillText('!',32,36);});
 const XT={};function xtxt(n){const k='x'+n;if(XT[k])return XT[k];XT[k]=spr(k,140,64,g=>{g.textAlign='center';g.textBaseline='middle';g.font="900 40px 'Be Vietnam Pro',Neo,sans-serif";g.lineJoin='miter';g.miterLimit=3;
   g.lineWidth=8;g.strokeStyle='#3b1800';g.strokeText('X'+n,70,34);const gr=g.createLinearGradient(0,14,0,54);gr.addColorStop(0,'#fff6b8');gr.addColorStop(.5,'#ffd21f');gr.addColorStop(1,'#ff9a00');g.fillStyle=gr;g.fillText('X'+n,70,34);g.lineWidth=1.5;g.strokeStyle='#fffbe0';g.strokeText('X'+n,70,33);});return XT[k];}
 setTimeout(()=>{try{dot();gem();warnTri();for(let n=1;n<=9;n++)xtxt(n);}catch{}},300);
 // ---------- trạng thái ----------
 const S={was:false,vt:-9,start:-9,runK:'',pops:[],sp:[],ghost:[],pull:0};
 const play=()=>{try{return mode==='play';}catch{return false;}};
 const endless=()=>{try{return gameMode==='endless';}catch{return false;}};
 const surge=()=>{try{return window.__surgeS25>0;}catch{return false;}};
 function startBlitz(){if(!endless())return false;let st=9;try{st=stageTime;}catch{}return st<1.6;}
 function blitzOn(){return on('BLITZ24')&&play()&&(surge()||startBlitz());}
 window.__blitz24=0;
 function tick(){if(!on()){window.__blitz24=0;return;}const b=blitzOn();window.__blitz24=b?1:0;const s=surge();
  if(S.was&&!s&&play()&&on('BLITZ24')){S.vt=nowS();vacuum();}S.was=s;
  // hút thật (chỉ Chiến dịch)
  if(S.pull>0&&endless())S.pull=0;
  if(S.pull>0&&play()){S.pull=Math.max(0,S.pull-.05);try{const px=player.x,py=player.y;for(const d of drops){if(!d||d.dead||d.type!=='star')continue;const dx=px-d.x,dy=py-d.y,L=Math.hypot(dx,dy)||1,v=Math.min(L,900*.05);d.x+=dx/L*v;d.y+=dy/L*v;}}catch{}}}
 setInterval(()=>{try{tick();}catch{}},50);
 function vacuum(){let px=240,py=700;try{px=player.x;py=player.y;}catch{}
  if(!endless())S.pull=.6;
  // bóng sáng bay về tàu (cả 2 chế độ, chỉ hình)
  try{let n=0;for(const d of drops){if(!d||d.dead||d.type!=='star')continue;if(++n>24)break;S.ghost.push({x:d.x,y:d.y,t:nowS()});}}catch{}
  if(S.ghost.length>24)S.ghost.splice(0,S.ghost.length-24);}
 // tông nổ quái khi Xung Kích → mưa tinh thể + X<n>
 function hookKill(){try{if(typeof kill!=='function'||kill.__v24c)return;const ok_=kill;const f=function(e){const was=e&&e.dead;const r=ok_.apply(this,arguments);
   try{if(on('BLITZ24')&&!was&&e&&e.dead&&surge()&&!e.rescue28){const px=player.x,py=player.y;if(Math.hypot(e.x-px,e.y-py)<140){let m=1;try{m=Math.max(1,Math.min(9,multiplier()|0));}catch{}
     if(S.pops.length<8)S.pops.push({x:e.x,y:e.y,t:nowS(),n:m});for(let k=0;k<6&&S.sp.length<40;k++){const a=Math.random()*TAU,v=90+Math.random()*160;S.sp.push({x:e.x,y:e.y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-120,t:nowS()});}}}}catch{}return r;};
  for(const k of Object.keys(ok_))f[k]=ok_[k];f.__v24c=1;kill=f;}catch{}}
 // ---------- vẽ (sau VisualFX.draw) ----------
 function draw(){if(!on())return;let pl=false;try{pl=mode==='play'||mode==='pause';}catch{}if(!pl)return;const g=ctx,t=nowS();g.save();g.globalCompositeOperation='lighter';
  let px=240,py=700;try{px=player.x;py=player.y;}catch{}
  // nón + cột lửa
  if(window.__blitz24){const fl=im('fx_blitz_flame'),co=im('fx_blitz_cone');const env=surge()?Math.min(1,(window.__surgeS25||0)*3):Math.min(1,(1.6-(typeof stageTime==='number'?stageTime:0))*3);
   if(ok(fl)){const w=74*(1+.1*Math.sin(t*31)+.05*Math.sin(t*53)),y0=py+16,h=Math.max(40,H-y0+20);g.globalAlpha=.9*env;g.drawImage(fl,px-w/2,y0,w,h);g.globalAlpha=.55*env;g.drawImage(fl,px-w*.28,y0,w*.56,h*.7);}
   if(ok(co)){const w=150*(1+.04*Math.sin(t*24)),h=w*co.naturalHeight/co.naturalWidth;g.globalAlpha=.85*env;g.drawImage(co,px-w/2,py-74,w,h);}}
  // vòng xoáy 0,45 s
  {const u=window.__vt24u!=null?window.__vt24u:(t-S.vt)/.45;/* __vt24u: giữ pha để chụp */if(u>=0&&u<1){const vo=im('fx_blitz_vortex');if(ok(vo)){const R=(60+80*Math.sin(u*Math.PI/2))*1;g.globalAlpha=Math.min(1,(1-u)*1.6);g.save();g.translate(px,py);g.rotate(u*5.2);g.drawImage(vo,-R,-R,R*2,R*2);g.restore();}}}
  // bóng tinh thể bay về tàu
  {const gs=gem();for(let i=S.ghost.length-1;i>=0;i--){const q=S.ghost[i],u=(t-q.t)/.42;if(u>=1){S.ghost.splice(i,1);continue;}const e=u*u,x=q.x+(px-q.x)*e,y=q.y+(py-q.y)*e,R=10*(1-u*.5);g.globalAlpha=.9;g.drawImage(gs,x-R,y-R,R*2,R*2);}}
  // mưa tinh thể khi tông
  {const gs=gem();for(let i=S.sp.length-1;i>=0;i--){const q=S.sp[i],u=(t-q.t)/.6;if(u>=1){S.sp.splice(i,1);continue;}const dt=t-q.t,x=q.x+q.vx*dt,y=q.y+q.vy*dt+260*dt*dt,R=8*(1-u*.4);g.globalAlpha=1-u;g.drawImage(gs,x-R,y-R,R*2,R*2);}}
  g.globalCompositeOperation='source-over';
  // chữ X<n>
  for(let i=S.pops.length-1;i>=0;i--){const p=S.pops[i],u=(t-p.t)/.7;if(u>=1){S.pops.splice(i,1);continue;}const sp=xtxt(p.n),s=u<.18?.5+.7*(u/.18):1.2-.2*Math.min(1,(u-.18)/.2),w=sp.width*.5*s,h=sp.height*.5*s;g.globalAlpha=u<.7?1:1-(u-.7)/.3;g.drawImage(sp,p.x-w/2,p.y-34-u*30-h/2,w,h);}
  // lõi trắng cột laser đang bắn (vẽ ở đây vì dq309 tự vẽ tia khi bắn, không gọi hàm gốc)
  if(on('LASER24')){g.globalCompositeOperation='lighter';try{for(const b of beams){if(!b||!(b.age>=b.warn)||b.age>b.warn+(b.duration||1))continue;const w=Math.max(4,(b.width||18)*.3),y0=Math.max(0,b.y||0),fl=.9+.1*Math.sin(t*50);g.globalAlpha=.85*fl;g.fillStyle='#ffffff';g.fillRect(b.x-w/2,y0,w,H-y0);g.globalAlpha=.35*fl;g.fillRect(b.x-w,y0,w*2,H-y0);}}catch{}}
  g.globalCompositeOperation='source-over';
  // lõi trắng đạn boss
  if(on('CORE24')){let bo=null;try{bo=boss;}catch{}if(bo&&!bo.dead){const d=dot();g.globalAlpha=.95;try{for(const b of bullets){if(!b||b.dead)continue;const R=Math.max(2.6,Math.min(6,(b.r||4)*.5));g.drawImage(d,b.x-R,b.y-R,R*2,R*2);}}catch{}}}
  g.restore();}
 // ---------- laser dọc ----------
 function hookBeam(){try{if(typeof Bosses28==='undefined'||!Bosses28.drawBeam||Bosses28.drawBeam.__v24c)return;const od=Bosses28.drawBeam;
  const f=function(b){const r=od.apply(this,arguments);try{if(on('LASER24')&&b){const g=ctx,t=nowS();
    if(b.age<b.warn){const rem=b.warn-b.age;if(rem<=.75){if(!b.__w24c){b.__w24c=1;try{window.SND24S&&SND24S.play('beep');}catch{}}
      g.save();const bl=(Math.sin(t*TAU*6)>0)?1:.45;g.globalAlpha=.85;g.fillStyle='#ff2a2a';g.fillRect(b.x-.75,Math.max(0,b.y),1.5,H);g.globalAlpha=.25*bl;g.fillRect(b.x-3,Math.max(0,b.y),6,H);
      const tr=warnTri(),y=Math.max(150,(b.y||0)+8);g.globalAlpha=bl;g.drawImage(tr,b.x-16,y,32,29);g.restore();}}
    }}catch{}return r;};
  for(const k of Object.keys(od))f[k]=od[k];f.__v24c=1;Bosses28.drawBeam=f;}catch{}}
 function hookVFX(){try{if(typeof VisualFX==='undefined'||VisualFX.__v24cc)return;const od=VisualFX.draw;VisualFX.draw=function(){const r=od.apply(this,arguments);try{draw();}catch{}return r;};VisualFX.__v24cc=1;}catch{}}
 function hooks(){hookVFX();hookBeam();hookKill();}
 hooks();setTimeout(hooks,1200);setTimeout(hooks,4000);setInterval(hooks,3000);
 // ---------- nghi thức lật rương (màn kết quả) ----------
 const C={key:'',run:null};
 function chest(){if(!on('CHEST24'))return;const rs=document.querySelector('#overlay.rs-on #rs');if(!rs){C.key='';return;}
  const loot=rs.querySelector('.rs-loot');if(!loot)return;const items=[...loot.querySelectorAll('.rw78:not(.e22h)')].filter(e=>e.offsetParent);if(!items.length)return;
  const k=(rs.querySelector('#rs-score')||{}).dataset?.f||'';const key=items.length+':'+items.map(e=>e.textContent).join('|')+':'+(rs.dataset.v24c||'');
  if(loot.dataset.c24==='done'||loot.dataset.c24==='run')return;
  const ch=im('ui_chest_closed'),cop=im('ui_chest_open');if(!ok(ch)||!ok(cop))return;
  loot.dataset.c24='run';loot.classList.add('c24h');const box=document.createElement('div');box.className='c24box';box.innerHTML='<img alt="" class="c24c"><i class="c24f"></i>';box.querySelector('img').src=ch.src;loot.appendChild(box);
  items.forEach((e,i)=>{e.style.setProperty('--c24d',(i*.09).toFixed(2)+'s');});
  const T=[];const fin=()=>{T.forEach(clearTimeout);loot.classList.remove('c24h');loot.classList.add('c24in');loot.dataset.c24='done';box.classList.add('c24out');setTimeout(()=>{box.remove();},700);ov.removeEventListener('pointerdown',skip,true);};
  const ov=document.getElementById('overlay');const skip=e=>{if(loot.dataset.c24!=='run')return;try{e.stopPropagation();e.preventDefault();}catch{}items.forEach(x=>x.style.setProperty('--c24d','0s'));fin();};
  ov.addEventListener('pointerdown',skip,true);
  const hold=window.__c24hold;/* chỉ để chụp: 'shake' | 'open' giữ nguyên một pha */
  if(hold==='shake'){box.classList.add('c24shake');box.style.animationIterationCount='infinite';C.run={t:nowS(),n:items.length};return;}
  if(hold==='open'){box.classList.add('c24flash');box.querySelector('img').src=cop.src;loot.classList.remove('c24h');loot.classList.add('c24in');C.run={t:nowS(),n:items.length};return;}
  box.classList.add('c24shake');
  T.push(setTimeout(()=>{box.classList.remove('c24shake');box.classList.add('c24flash');box.querySelector('img').src=cop.src;try{window.SND24S&&SND24S.play('upg');}catch{}},560));
  T.push(setTimeout(()=>{loot.classList.remove('c24h');loot.classList.add('c24in');},700));
  T.push(setTimeout(fin,700+items.length*90+450));
  C.run={t:nowS(),n:items.length};}
 setInterval(()=>{try{chest();}catch{}},120);
 window.V24CS={S,C,blitz:()=>window.__blitz24,vortex:()=>{S.vt=nowS();vacuum();},pops:()=>S.pops.length,sp:()=>S.sp.length,ghost:()=>S.ghost.length};
})();
