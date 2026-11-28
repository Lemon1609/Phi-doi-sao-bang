window.PKB25_IMG={"ast_1":"assets/39df6291ced5.webp","ast_2":"assets/62538efe3f32.webp","ast_3":"assets/f4accafa475c.webp","orb_2":"assets/e91a171a56e1.webp","orb_s":"assets/0f4790ad3b52.webp","orb_up":"assets/cf7d1ba5dcad.webp"};'use strict';
// V2.2.3 · GÓI B (T25, chủ dự án 26/11). Tắt toàn bộ: window.PKB25=false (đặt trước khi trang tải). Tắt từng phần:
//  ORB25=false (3 ngọc S / ↑ / 2) · AST25=false (đợt thiên thạch) · HUD25=false (2 nút tròn + vòng % + cột buff) · RV25=false (đua điểm Vô tận) · RS25=false (màn tổng kết)
// NGUYÊN TẮC KINH TẾ (chủ dự án chốt 26/11 11:28): không đụng Hợp kim / Kim cương / Đá XP / rương / trần ngày.
//  · Ngọc S: bất tử 4,5 s + tông vỡ quái thường / thiên thạch (quái tông vỡ đi qua kill() như bị bắn: điểm + vật phẩm như cũ, không nhân).
//  · Ngọc 2: nhân đôi phần ĐIỂM TRẬN tăng thêm trong 12 s.  · Ngọc ↑: +1 cấp đạn, tối đa thì bật Bạo Tẩu.
//  · Thiên thạch: điểm trận + hạt tinh thể; loại lõi tinh thể rơi 1 ngọc chiến đấu (P / Khiên / Hồi máu / ↑ / 2) trong trận.
//  · VÔ TẬN: điểm Vô tận quyết định hạng mùa (thưởng Hợp kim…) + nhiệm vụ tuần → ở Vô tận KHÔNG cộng điểm thưởng nào của Gói B
//    (không rơi ngọc 2, tông / thiên thạch không thêm điểm). Ngọc S / ↑ / thiên thạch vẫn có (chỉ chiến đấu).
//  · Màn tổng kết chỉ ĐỌC: hệ số combo thật của game, bộ đếm trần ngày EL81 (rương Vô tận 30/ngày, vật phẩm đặc biệt 5/ngày), hạng V92.
// 0 shadowBlur, 0 filter, 0 canvas mới trong trận (mọi hình dựng sẵn lúc tải).
(()=>{
 const ON=()=>window.PKB25!==false&&!!window.PKB25_IMG,on=k=>ON()&&window[k]!==false;
 const now=()=>performance.now()/(window.__fx23slow||1);
 const play=()=>{try{return mode==='play';}catch{return false;}};
 const endless=()=>{try{return gameMode==='endless';}catch{return false;}};
 const bonusOk=()=>!endless();
 const IM={};function img(k){if(IM[k])return IM[k];const s=window.PKB25_IMG&&PKB25_IMG[k];if(!s)return null;const i=new Image();i.src=s;IM[k]=i;return i;}
 const ok=i=>i&&i.complete&&i.naturalWidth>0;['orb_s','orb_up','orb_2','ast_1','ast_2','ast_3'].forEach(img);
 const cp=(o,f)=>{try{for(const k of Object.keys(o))if(!(k in f))f[k]=o[k];}catch{}return f;};/* giữ cờ của mô-đun khác trên hàm bị bọc → không bọc qua lại */
 function cv(w,h,f){const c=document.createElement('canvas');c.width=w;c.height=h;f(c.getContext('2d'));return c;}
 const PILLAR=cv(64,256,g=>{const r=g.createLinearGradient(0,0,64,0);r.addColorStop(0,'rgba(255,190,40,0)');r.addColorStop(.35,'rgba(255,200,60,.55)');r.addColorStop(.5,'rgba(255,248,210,.95)');r.addColorStop(.65,'rgba(255,200,60,.55)');r.addColorStop(1,'rgba(255,190,40,0)');g.fillStyle=r;g.fillRect(0,0,64,256);
  const v=g.createLinearGradient(0,0,0,256);v.addColorStop(0,'rgba(0,0,0,1)');v.addColorStop(.25,'rgba(0,0,0,0)');g.globalCompositeOperation='destination-out';g.fillStyle=v;g.fillRect(0,0,64,256);});
 const STREAK=cv(8,96,g=>{const r=g.createLinearGradient(0,0,0,96);r.addColorStop(0,'rgba(255,230,150,0)');r.addColorStop(.5,'rgba(255,236,170,.9)');r.addColorStop(1,'rgba(255,230,150,0)');g.fillStyle=r;g.fillRect(3,0,2,96);});
 const GLOW=cv(64,64,g=>{const r=g.createRadialGradient(32,32,0,32,32,32);r.addColorStop(0,'rgba(255,255,255,.9)');r.addColorStop(.4,'rgba(255,220,120,.35)');r.addColorStop(1,'rgba(255,200,80,0)');g.fillStyle=r;g.fillRect(0,0,64,64);});
 // ---------- trạng thái trận ----------
 const R={sEnd:0,x2End:0,last:null,bonusX2:0,astPts:0,ramN:0,astN:0,maxM:1,orbN:{s:0,up:0,'2':0},runId:0,waveStage:-1,nextEndless:0};
 function newRun(){R.sEnd=0;R.x2End=0;R.last=null;R.bonusX2=0;R.astPts=0;R.ramN=0;R.astN=0;R.maxM=1;R.orbN={s:0,up:0,'2':0};R.runId++;R.waveStage=-1;R.nextEndless=0;for(const o of OB)o.on=0;AST.length=0;}
 let lastMode='';
 const sOn=()=>now()<R.sEnd,x2On=()=>now()<R.x2End;
 function toastS(t){try{toast(t);}catch{}}
 function addScore(n){if(n>0&&bonusOk())try{score+=n;}catch{}}
 // ---------- 1) ngọc S / ↑ / 2 ----------
 const OB=[];for(let i=0;i<6;i++)OB.push({on:0});let obi=0,dropT=-1e9;
 function spawnOrb(k,x,y){if(!on('ORB25'))return;if(k==='2'&&!bonusOk())k='up';const o=OB[obi=(obi+1)%OB.length];o.on=1;o.k=k;o.x=x;o.y=y;o.vy=-90;o.t=0;}
 function maybeDrop(e){if(!on('ORB25'))return;const n=now();if(n-dropT<6000||OB.filter(o=>o.on).length>=2)return;const r=Math.random();let k=null;
  if(r<.006)k='s';else if(r<.016)k='up';else if(r<.024&&bonusOk())k='2';if(k){dropT=n;spawnOrb(k,e.x,e.y);}}
 function apply(k,x,y){R.orbN[k]++;try{window.PKA24S&&PKA24S.spawn(x,y,8);}catch{}try{window.PKA24S&&PKA24S.up(5);}catch{}
  if(k==='s'){R.sEnd=now()+4500;try{invuln=Math.max(invuln,4.6);}catch{}toastS('✦ XUNG KÍCH S · BẤT TỬ 4,5 GIÂY');}
  else if(k==='up'){try{if(power<5){power++;powerUpgrades=power-1;toastS('▲ NÂNG ĐẠN · LV '+power);}else if(!(superTime>0)){activateSuper();toastS('▲ ĐẠN TỐI ĐA · BẠO TẨU!');}else{superTime+=1.5;toastS('▲ BẠO TẨU +1,5 GIÂY');}}catch{}}
  else if(k==='2'){R.x2End=now()+12000;toastS('×2 ĐIỂM TRẬN · 12 GIÂY');}}
 function stepOrbs(dt){let px=240,py=700;try{px=player.x;py=player.y;}catch{}for(const o of OB){if(!o.on)continue;o.t+=dt;o.vy=Math.min(85,o.vy+260*dt);o.y+=o.vy*dt;
   const dx=px-o.x,dy=py-o.y,d=Math.hypot(dx,dy)||1;if(d<120){o.x+=dx/d*260*dt;o.y+=dy/d*260*dt;}if(d<26){o.on=0;apply(o.k,o.x,o.y);continue;}if(o.y>H+40)o.on=0;}}
 function drawOrbs(g){const t=now()/1000;for(const o of OB){if(!o.on)continue;const im=img('orb_'+(o.k==='2'?'2':o.k)),s=44*(1+.06*Math.sin(t*6+o.x));g.save();g.globalCompositeOperation='lighter';g.globalAlpha=.5+.2*Math.sin(t*5);g.drawImage(GLOW,o.x-s,o.y-s,s*2,s*2);g.restore();if(ok(im))g.drawImage(im,o.x-s/2,o.y-s/2,s,s);}}
 // ---------- 2) xung kích S ----------
 function stepSurge(){if(!sOn()){window.__surgeS25=0;return;}window.__surgeS25=(R.sEnd-now())/1000;try{invuln=Math.max(invuln,.2);}catch{}
  let px=240,py=700;try{px=player.x;py=player.y;}catch{}
  try{for(const e of enemies){if(!e||e.dead||e.rescue28||!(e.hp>0))continue;const d=Math.hypot(e.x-px,e.y-py);if(d<(e.r||16)+34){e.hp=0;try{kill(e);}catch{}R.ramN++;addScore(50);try{window.PKA24S&&PKA24S.spawn(e.x,e.y,3);}catch{}}}}catch{}
  for(const a of AST)if(!a.dead&&Math.hypot(a.x-px,a.y-py)<a.r+30)breakAst(a,true);}
 function drawSurge(g){if(!sOn())return;const t=now()/1000,u=(R.sEnd-now())/4500;let px=240,py=700;try{px=player.x;py=player.y;}catch{}
  g.save();g.globalCompositeOperation='lighter';g.globalAlpha=(.35+.15*Math.sin(t*14))*Math.min(1,u*4);g.drawImage(PILLAR,px-30,0,60,py);
  g.globalAlpha=.55;for(let k=0;k<10;k++){const x=(k*53+Math.floor(t*7)*17)%W,y=((t*900+k*137)%(H+96))-96;g.drawImage(STREAK,x,y,4,96);}
  g.globalAlpha=.45;g.drawImage(GLOW,px-70,py-70,140,140);g.restore();}
 // ---------- 3) ×2 điểm trận ----------
 function stepX2(){let s=0;try{s=score;}catch{return;}if(R.last===null){R.last=s;return;}const d=s-R.last;if(d>0&&x2On()&&bonusOk()){try{score+=d;}catch{}R.bonusX2+=d;}try{R.last=score;}catch{}}
 // ---------- 4) đợt thiên thạch có thanh máu ----------
 const AST=[];let waveQ=0,waveT=0;
 const KIND=[{k:1,r:[18,24],hp:5,pts:80},{k:2,r:[22,28],hp:8,pts:120},{k:3,r:[24,30],hp:10,pts:160}];
 function envBusy(){try{return typeof L7309!=='undefined'&&L7309.E&&L7309.E.on;}catch{return false;}}
 function bossOn(){try{return !!(boss&&!boss.dead);}catch{return false;}}
 function schedule(dt){if(!on('AST25')||bossOn()||envBusy())return;let st=0,lv=0;try{st=stageTime;lv=level;}catch{}
  if(endless()){let t=0;try{t=time;}catch{}if(!R.nextEndless)R.nextEndless=t+35;if(t>=R.nextEndless){R.nextEndless=t+55;waveQ=6;}}
  else if(lv>=3&&R.waveStage!==lv&&st>=14){R.waveStage=lv;waveQ=6;}
  if(waveQ>0){waveT-=dt;if(waveT<=0){waveT=.42;waveQ--;const r=Math.random(),K=KIND[r<.5?0:r<.8?1:2],rad=K.r[0]+Math.random()*(K.r[1]-K.r[0]),hp=Math.round(K.hp*(1+Math.min(1.5,lv/80)));
    AST.push({K,x:40+Math.random()*(W-80),y:-rad-10,vx:(Math.random()-.5)*60,vy:70+Math.random()*45,r:rad,hp,max:hp,a:Math.random()*6.28,va:(Math.random()-.5)*1.6,dead:false,fl:0});if(AST.length>8)AST.shift();}}}
 function breakAst(a,ram){if(a.dead)return;a.dead=true;R.astN++;try{VisualFX.explode(a.x,a.y,.9,'enemy');}catch{}try{window.PKA24S&&PKA24S.spawn(a.x,a.y,4+a.K.k*2);}catch{}
  if(bonusOk()){addScore(a.K.pts);R.astPts+=a.K.pts;}
  if(a.K.k===3){const opts=['power','shield','heal','up'].concat(bonusOk()?['2']:[]),k=opts[(Math.random()*opts.length)|0];
   if(k==='up'||k==='2')spawnOrb(k,a.x,a.y);else try{Safety31.push(drops,100,{x:a.x,y:a.y,type:k,t:0,vy:-80});}catch{}}}
 function stepAst(dt){if(!AST.length)return;let px=240,py=700;try{px=player.x;py=player.y;}catch{}
  for(const a of AST){if(a.dead)continue;a.x+=a.vx*dt;a.y+=a.vy*dt;a.a+=a.va*dt;a.fl=Math.max(0,a.fl-dt);
   try{for(const s of shots){if(s.dead||a.hp<=0)continue;if(s.ray28){if(a.y<s.y&&Math.abs(s.x-a.x)<(s.r||6)+a.r){a.hp-=dt*6;a.fl=.06;}continue;}if(Math.abs(s.x-a.x)<a.r+5&&Math.abs(s.y-a.y)<a.r+8){a.hp-=1;a.fl=.06;s.dead=true;}}}catch{}
   if(a.hp<=0){breakAst(a,false);continue;}
   if(Math.hypot(a.x-px,a.y-py)<a.r+8){if(sOn())breakAst(a,true);else{a.dead=true;try{VisualFX.explode(a.x,a.y,.8,'enemy');}catch{}try{if(!(invuln>0))damage('bullet');}catch{}}}}
  for(let i=AST.length-1;i>=0;i--){const a=AST[i];if(a.dead||a.y>H+60||a.x<-80||a.x>W+80)AST.splice(i,1);}}
 function drawAst(g){for(const a of AST){if(a.dead)continue;const im=img('ast_'+a.K.k),s=a.r*2.9;g.save();g.translate(a.x,a.y);g.rotate(a.a);if(ok(im))g.drawImage(im,-s/2,-s/2,s,s);
   if(a.fl>0){g.globalCompositeOperation='lighter';g.globalAlpha=.4;g.drawImage(GLOW,-s/2,-s/2,s,s);}g.restore();
   if(a.hp<a.max){const w=a.r*1.7,x=a.x-w/2,y=a.y-a.r-10,f=Math.max(0,a.hp/a.max);g.fillStyle='rgba(4,10,8,.85)';g.fillRect(x-1,y-1,w+2,5);g.fillStyle=f>.5?'#4ade80':f>.25?'#facc15':'#f87171';g.fillRect(x,y,w*f,3);}}}
 // ---------- móc hạ địch (rơi ngọc + combo cao nhất) ----------
 let wK=0;
 function hookKill(){try{if(typeof kill!=='function'||kill.__p25||wK>=4)return;wK++;const o=kill;const f=function(e){const was=!!(e&&e.dead);const r=o.apply(this,arguments);try{if(ON()&&!was&&e&&e.dead&&!e.__p25k&&!e.meteor&&!e.rescue28&&play()){e.__p25k=1;maybeDrop(e);}}catch{}return r;};f.__p25=1;kill=cp(o,f);}catch{}}
 // ---------- vẽ + cập nhật: sau thân tàu, trước đạn địch ----------
 let lf=0;
 let FG=0;function frame(){{const pn=performance.now();if(pn-FG<3)return;FG=pn;}/* 1 lần mỗi khung */let m='';try{m=mode;}catch{}if(m==='play'&&lastMode!=='play'&&lastMode!=='pause')newRun();lastMode=m;if(!ON()||!play()){lf=0;return;}
  const n=now();let dt=lf?(n-lf)/1000:.016;lf=n;if(!(dt>0))dt=.016;dt=Math.min(.05,dt);
  try{R.maxM=Math.max(R.maxM,multiplier());}catch{}
  try{stepX2();schedule(dt);stepAst(dt);stepOrbs(dt);stepSurge();stepX2();}catch{}
  try{drawSurge(ctx);drawAst(ctx);drawOrbs(ctx);}catch{}}
 let wB=0;function hookOver(){try{if(typeof BloomQualityC==='undefined'||!BloomQualityC.draw||BloomQualityC.draw.__p25||wB>=4)return;wB++;const o=BloomQualityC.draw;const f=function(){const r=o.apply(this,arguments);frame();return r;};f.__p25=1;BloomQualityC.draw=cp(o,f);}catch{}}
 // ---------- 5) HUD tối giản: Bom trái · Tuyệt kỹ phải có vòng % · cột buff mép trái · đua điểm Vô tận ----------
 function host(){const p=document.getElementById('pause');return (p&&p.parentNode)||document.fullscreenElement||document.body;}
 let bs=null,rg=null,rv=null,moved=null,peak=0,lastCool=0;
 function css(){if(document.getElementById('pkb25-css'))return;const s=document.createElement('style');s.id='pkb25-css';s.textContent=
  '#bs25{position:fixed;left:6px;top:38%;z-index:60;display:flex;flex-direction:column;gap:6px;pointer-events:none}#bs25 i{position:relative;display:block;width:34px;height:34px;border-radius:9px;background:rgba(6,14,28,.72) center/26px no-repeat;border:1px solid rgba(160,200,255,.35)}'+
  '#bs25 i b{position:absolute;right:-2px;bottom:-4px;font:800 10px/1 sans-serif;color:#fff;background:rgba(0,0,0,.75);border-radius:6px;padding:2px 3px}#bs25 i.tx{background-image:none;color:#fde68a;font:900 13px/34px sans-serif;text-align:center}'+
  '#rg25{position:fixed;z-index:61;pointer-events:none;border-radius:50%;--p:1;background:conic-gradient(#5fe8ff calc(var(--p)*360deg),rgba(255,255,255,.12) 0);-webkit-mask:radial-gradient(circle,transparent 62%,#000 64%);mask:radial-gradient(circle,transparent 62%,#000 64%)}#rg25.full{background:conic-gradient(#fde047 360deg,#fde047 0)}'+
  'body #robot-skill.fit26 small,body #bomb.fit26 small,body #missile-action.fit26 small{max-width:100%!important}body #robot-skill small{left:0!important;right:0!important;width:auto!important;margin:0!important;transform:none!important;translate:none!important;text-align:center!important;white-space:nowrap!important}'+
  '#rv25{position:fixed;left:50%;transform:translateX(-50%);top:calc(var(--sat42,0px) + 64px);z-index:60;pointer-events:none;font:800 11px/1 sans-serif;color:#e6f4ff;background:rgba(6,14,28,.78);border:1px solid rgba(253,224,71,.45);border-radius:10px;padding:5px 10px;white-space:nowrap}#rv25 b{color:#fde047}#rv25 em{font-style:normal;color:#86efac}'+
  '#overlay.rs-on #rs{animation:iris25 .55s cubic-bezier(.2,.8,.2,1) both}@keyframes iris25{0%{clip-path:polygon(50% 45%,52% 46%,52% 48%,50% 49%,48% 48%,48% 46%)}100%{clip-path:polygon(50% -60%,160% -5%,160% 105%,50% 160%,-60% 105%,-60% -5%)}}'+
  '.rs25{margin:8px 10px 4px;padding:8px 10px;border-radius:10px;background:rgba(6,14,30,.72);border:1px solid rgba(120,180,255,.28);font:600 11px/1.45 sans-serif;color:#cfe3ff;text-align:left}.rs25 .f b{color:#fde68a}.rs25 .cap{display:flex;align-items:center;gap:6px;margin-top:5px}.rs25 .cap span{flex:0 0 118px}.rs25 .cap i{flex:1;height:6px;border-radius:4px;background:rgba(255,255,255,.12);overflow:hidden}.rs25 .cap i u{display:block;height:100%;background:linear-gradient(90deg,#38bdf8,#fde047)}.rs25 .cap em{font-style:normal;flex:0 0 44px;text-align:right}.rs25 .rv{margin-top:6px;color:#fde68a}';
  document.head.appendChild(s);}
 function cool(){try{if(typeof activeRobot!=='undefined'&&activeRobot)return robotCooldown||0;}catch{}try{return Rank36.state().cool||0;}catch{return 0;}}
 function hudMove(){const b=document.getElementById('bomb'),m=document.getElementById('missile-action'),k=document.getElementById('robot-skill'),c=document.getElementById('bombcount');if(!b||!m||!k)return;
  const rb=b.getBoundingClientRect(),rm=m.getBoundingClientRect(),rk=k.getBoundingClientRect();if(!rb.width||!rm.width||!rk.width)return;
  const tr=el=>{const v=getComputedStyle(el).translate;if(!v||v==='none')return [0,0];const p=v.split(' ').map(parseFloat);return [p[0]||0,p[1]||0];};
  // bom sang trái dưới (chỗ tên lửa), tên lửa lên trên bom, tuyệt kỹ xuống phải dưới (chỗ bom cũ)
  const set=(el,dx,dy)=>{const t=tr(el);el.style.setProperty('translate',(t[0]+dx)+'px '+(t[1]+dy)+'px','important');};
  set(b,rm.left-rb.left,rm.top-rb.top);if(c)set(c,rm.left-rb.left,rm.top-rb.top);set(m,0,-(rb.top-rk.top)-6);set(k,rb.left-rk.left,rb.top-rk.top);moved=1;}
 // V2.2.3 (sửa audit màn Tạm dừng): kẹp 3 nút trong khung nhìn (lề 6 px, đáy chừa safe-area) mỗi nhịp khi đang dời;
 //  đổi cỡ khung nhìn (vào/ra toàn màn hình, xoay máy) → trả về chỗ gốc rồi đo lại. Tắt riêng: window.CLAMP26=false
 function clampHud(){if(window.CLAMP26===false||!moved)return;const W=innerWidth,H=innerHeight;let sb=0;try{sb=parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--sab42'))||0;}catch{}
  for(const id of ['bomb','missile-action','robot-skill','bombcount']){const el=document.getElementById(id);if(!el||!el.offsetParent)continue;const r=el.getBoundingClientRect();if(!r.width)continue;
   const dx=r.left<6?6-r.left:r.right>W-6?W-6-r.right:0,dy=r.top<6?6-r.top:r.bottom>H-6-sb?H-6-sb-r.bottom:0;
   if(dx||dy){const v=getComputedStyle(el).translate,p=(!v||v==='none')?[0,0]:v.split(' ').map(parseFloat);el.style.setProperty('translate',((p[0]||0)+dx)+'px '+((p[1]||0)+dy)+'px','important');window.__clamp26=(window.__clamp26||0)+1;}}}
 let vw0=innerWidth,vh0=innerHeight;addEventListener('resize',()=>{if(Math.abs(innerWidth-vw0)<2&&Math.abs(innerHeight-vh0)<2)return;vw0=innerWidth;vh0=innerHeight;if(moved){hudReset();}});
 function hudReset(){for(const id of ['bomb','missile-action','robot-skill','bombcount']){const el=document.getElementById(id);if(el)el.style.removeProperty('translate');}moved=null;}
 function tick(){if(!ON()){if(bs)bs.hidden=true;if(rg)rg.hidden=true;if(rv)rv.hidden=true;return;}css();const P=play();
  // nút
  if(on('HUD25')&&P){if(!moved)setTimeout(()=>{if(play()&&!moved)hudMove();},300);}else if(moved&&!P){let m='';try{m=mode;}catch{}if(m!=='pause')hudReset();}
  try{clampHud();}catch{}
  // chữ dưới nút Tuyệt kỹ (TUYỆT KỸ / KỸ NĂNG / 12s, v121 ghi lại mỗi nhịp) không được tràn khỏi nút 50 px: nếu tràn → chữ nhỏ hơn (lớp fit26)
  try{if(window.CLAMP26!==false&&!window.__fit26mo){window.__fit26mo=1;const fit=el=>{if(!el||!el.clientWidth)return;const tx=el.textContent+'|'+el.clientWidth;if(el.__f26t===tx){if(el.__f26s)for(const sm of el.querySelectorAll('small'))if(!sm.style.fontSize){sm.style.setProperty('font-size',el.__f26s,'important');sm.style.setProperty('letter-spacing','-.3px','important');}return;}/* cùng chữ: dùng lại cỡ đã đo, không đo lại mỗi khung */let k=0;for(const sm of el.querySelectorAll('small'))sm.style.removeProperty('font-size');
     const ov=()=>el.scrollWidth>el.clientWidth+1||[...el.querySelectorAll('small')].some(m=>m.clientWidth>0&&m.scrollWidth>m.clientWidth+1);while(ov()&&k<6){k++;for(const sm of el.querySelectorAll('small')){const f=parseFloat(getComputedStyle(sm).fontSize)||8;sm.style.setProperty('font-size',Math.max(5,f-.75)+'px','important');sm.style.setProperty('letter-spacing','-.3px','important');}}el.__f26t=tx;el.__f26s=k?((el.querySelector('small')||{}).style||{}).fontSize||'':'';};
     /* V2.3: v121 ghi lại chữ nút mỗi nhịp → co chữ ngay trong vi tác vụ (trước khung vẽ / trước mọi lần đo) */
     const mo=new MutationObserver(R=>{const s=new Set();for(const r of R){const b=r.target.closest?r.target.closest('#robot-skill,#bomb,#missile-action'):null;if(b)s.add(b);}for(const b of s)fit(b);});
     for(const id of ['robot-skill','bomb','missile-action']){const el=document.getElementById(id);if(el){mo.observe(el,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:['class','style']});fit(el);}}}}catch{}
  try{if(window.CLAMP26!==false)for(const id of ['robot-skill','bomb','missile-action']){const el=document.getElementById(id);if(!el||!el.offsetParent)continue;if(el.scrollWidth>el.clientWidth+1)el.classList.add('fit26');}}catch{}
  // vòng %
  const k=document.getElementById('robot-skill');if(on('HUD25')&&P&&k&&k.offsetParent){if(!rg){rg=document.createElement('div');rg.id='rg25';}if(rg.parentNode!==host())host().appendChild(rg);rg.hidden=false;const c=cool();if(c>lastCool+.3||c>peak)peak=c;lastCool=c;const p=peak>0?Math.max(0,Math.min(1,1-c/peak)):1;
   const r=k.getBoundingClientRect(),pad=4;rg.style.left=(r.left-pad)+'px';rg.style.top=(r.top-pad)+'px';rg.style.width=rg.style.height=(r.width+pad*2)+'px';rg.style.setProperty('--p',p.toFixed(3));rg.classList.toggle('full',p>=1);}else if(rg)rg.hidden=true;
  // cột buff
  if(on('HUD25')&&P){if(!bs){bs=document.createElement('div');bs.id='bs25';}if(bs.parentNode!==host())host().appendChild(bs);bs.hidden=false;const L=[],n=now(),src=k2=>(window.PKB25_IMG&&PKB25_IMG[k2])||'';
   if(sOn())L.push(['orb_s',Math.ceil((R.sEnd-n)/1000)]);if(x2On())L.push(['orb_2',Math.ceil((R.x2End-n)/1000)]);
   try{if(superTime>0)L.push(['tx:BT',Math.ceil(superTime)]);}catch{}try{const sh=(typeof Shield78!=='undefined'&&Shield78.state().bub)||bulletShieldTime>0;if(sh)L.push(['tx:⬡',bulletShieldTime>0?Math.ceil(bulletShieldTime):'']);}catch{}
   try{L.push(['orb_up','W'+power]);}catch{}
   const h=L.map(([k2,v])=>k2.startsWith('tx:')?'<i class="tx">'+k2.slice(3)+(v!==''?'<b>'+v+'</b>':'')+'</i>':'<i style="background-image:url('+src(k2)+')"><b>'+v+'</b></i>').join('');if(bs.__h!==h){bs.__h=h;bs.innerHTML=h;}}else if(bs)bs.hidden=true;
  // đua điểm Vô tận
  if(on('RV25')&&P&&endless()){if(!rv){rv=document.createElement('div');rv.id='rv25';}if(rv.parentNode!==host())host().appendChild(rv);rv.hidden=false;let s=0;try{s=score;}catch{}let best=0,tiers=[];try{best=V92.rank().best|0;tiers=V92.CFG.rank.tiers;}catch{}
   const nx=tiers.find(t=>t.min>s);let h;if(best>s)h='Kỷ lục <b>'+best.toLocaleString('vi-VN')+'</b> · còn <em>'+(best-s).toLocaleString('vi-VN')+'</em>';else if(best>0&&s>=best)h='<em>VƯỢT KỶ LỤC!</em> '+s.toLocaleString('vi-VN');else h='Điểm <b>'+s.toLocaleString('vi-VN')+'</b>';
   /* hạng kế tiếp đã có thẻ target307 bên phải → chỉ đua với kỷ lục của chính mình */if(nx&&!document.querySelector('#target307,.tg307'))h+=' · Hạng '+nx.n+' <b>'+nx.min.toLocaleString('vi-VN')+'</b>';if(rv.__h!==h){rv.__h=h;rv.innerHTML=h;}}else if(rv)rv.hidden=true;
  // màn tổng kết
  if(on('RS25'))results();}
 // ---------- 6) màn tổng kết ----------
 function results(){const rs=document.querySelector('#overlay.rs-on #rs');if(!rs||rs.querySelector('.rs25'))return;const sc=rs.querySelector('.rs-score');if(!sc)return;
  let s=0;try{s=score;}catch{}const fmt=v=>Math.round(v).toLocaleString('vi-VN'),parts=[];
  const base=Math.max(0,s-R.bonusX2-R.astPts);parts.push('Điểm hạ địch & nhặt đồ <b>'+fmt(base)+'</b> (hệ số combo cao nhất <b>×'+R.maxM+'</b>: mỗi 5 mục tiêu liên tiếp +1, tối đa ×5)');
  if(R.bonusX2>0)parts.push('Ngọc ×2 <b>+'+fmt(R.bonusX2)+'</b>');if(R.astPts>0)parts.push('Thiên thạch ('+R.astN+') <b>+'+fmt(R.astPts)+'</b>');if(endless())parts.push('Vô tận: điểm Gói B không cộng (giữ hạng mùa)');
  let e={n:0,pp:0},cap=30,pcap=5;try{e=EL81.state();cap=EL81.CAP||30;pcap=EL81.PP||5;}catch{}
  const bar=(lb,v,c)=>'<div class="cap"><span>'+lb+'</span><i><u style="width:'+Math.min(100,v/c*100).toFixed(0)+'%"></u></i><em>'+v+'/'+c+'</em></div>';
  let rvH='';if(endless()){try{const rk=V92.rank(),t=V92.CFG.rank.tiers,nx=t.find(x=>x.min>Math.max(s,rk.best|0));rvH='<div class="rv">Hạng mùa: '+rk.tier+' · kỷ lục '+fmt(rk.best|0)+(nx?' · hạng '+nx.n+' cần '+fmt(nx.min):'')+'</div>';}catch{}}
  const d=document.createElement('div');d.className='rs25';d.innerHTML='<div class="f">'+parts.join(' · ')+'</div>'+bar('Rương ngày (Vô tận)',e.n|0,cap)+bar('Vật phẩm đặc biệt',e.pp|0,pcap)+rvH;sc.after(d);}
 function all(){hookKill();hookOver();}
 all();setInterval(all,1000);setInterval(()=>{try{tick();}catch{}},120);
 window.PKB25S={R,OB,AST,spawnOrb,apply,breakAst,startWave:()=>{waveQ=6;},sOn,x2On,newRun,hooks:()=>({kill:wK,draw:wB})};
})();
