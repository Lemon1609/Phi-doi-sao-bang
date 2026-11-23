'use strict';
// V2.1 Đợt 1 · TIẾN HÓA CƠ CHẾ & HIỆU ỨNG THEO BẬC (chủ dự án 23/11). Tắt toàn bộ: window.EVO21=false (đặt trước khi trang tải hoặc bất kỳ lúc nào).
//  1) Cơ chế co309 theo bậc khung chiến cơ: Tím / Tím+5 / SS = 100 % (đúng mức cũ, save cũ đồ Tím không đổi) · Lam ~80 % · Lục ~55 % · Thường = sơ khai (tắt hiệu ứng phụ).
//     Hệ số bù DK / BK của co309 co theo cùng tỉ lệ (cơ chế yếu đi thì không còn bị trừ bù) → tổng sát thương mỗi bậc gần như giữ nguyên, chỉ khác hành vi.
//     Tắt riêng: window.EVO21CO=false
//  2) VFX đạn chính + kỹ năng S tăng dần Thường → Tím: lóe nòng, vệt đuôi, tia lửa trúng địch. Sprite dựng sẵn (cache theo màu), vẽ 'lighter',
//     không ctx.filter / shadowBlur; chế độ Nhẹ giảm nửa số hạt. Tắt riêng: window.EVO21FX=false
//  3) Chiến Thần 4 mốc +0..2 / +3..5 / +6..9 / +10: cỡ + quầng đạn robot và quy mô Tuyệt kỹ E (chỉ HÌNH, va chạm / sát thương giữ nguyên ≈ 12 × đơn vị/giây).
//     rob309.js gọi Evo21.rob(k). +3..+5 = đúng hình hiện tại. Tắt riêng: window.EVO21ROB=false
//  4) Bộ nạp ảnh GPT mới: window.EVO21_IMG (khối evo21-img-js, build đọc src/evo21img/*.webp do claude_tools/evo21_cat.py tạo):
//     tau<N>_dan_<thuong|luc|lam|tim>[ / tau<N>_dan / tau<N>_dan_bt] → dan307 vẽ thay sprite đạn · tau<N>_canh_<bậc>[ / tau<N>_canh] → wing309 vẽ cánh Bạo Tẩu cả đôi, 'lighter'.
//     Chưa có ảnh thì mọi thứ chạy như cũ.
(function(){
 const on=k=>window.EVO21!==false&&window[k]!==false;
 const TS=['thuong','luc','lam','tim','tim5','ss'];
 const tierOf=id=>{try{return (window.Dan299&&Dan299.tierOf(id))||'tim';}catch{return 'tim';}};
 const T4=t=>t==='thuong'||t==='luc'||t==='lam'?t:'tim';
 const MK={thuong:0,luc:.55,lam:.8,tim:1,tim5:1,ss:1};          // cường độ cơ chế
 const VK={thuong:.3,luc:.55,lam:.8,tim:1,tim5:1.1,ss:1.2};      // cường độ VFX
 const lite=()=>{try{return VisualFX.counts().quality==='light';}catch{return false;}};
 const playing=()=>{try{return mode==='play';}catch{return false;}};
 const sel=()=>{try{return (typeof activeRobot!=='undefined'&&activeRobot)?-1:selected;}catch{return -1;}};

 // ---------------- 1) cơ chế co309 theo bậc ----------------
 let C0=null,DK0=null,BK0=null,lastK=null,lastId=null;
 function snap(){const O=window.CO309;if(!O||!O.C)return false;if(!C0){C0=JSON.parse(JSON.stringify(O.C));DK0=Object.assign({},O.DK);BK0=O.BK?Object.assign({},O.BK):{};if(!('cutOn' in C0)){C0.cutOn=1;C0.cutK=1;}}return true;}
 function applyK(id,K){const O=window.CO309,C=O.C,c=C0;if(K===lastK&&id===lastId)return;lastK=K;lastId=id;
  const sz=v=>.6+.4*v;
  C.splashK=c.splashK*K;C.splashR=c.splashR*sz(K);
  C.shardN=K<=0?0:K<.7?2:c.shardN;C.shardK=c.shardK*K;
  C.pierceN=K<=0?1:K<.7?2:c.pierceN;
  C.bounceN=K<=0?0:K<.7?1:c.bounceN;C.bounceK=c.bounceK*K;C.bounceR=c.bounceR*(.7+.3*K);
  C.lockCone=c.lockCone*K;C.lockTurn=c.lockTurn*K;
  C.crescentR=1+(c.crescentR-1)*K;C.cutOn=K>0?1:0;C.cutK=K;
  C.nukeK=c.nukeK*K;C.nukeR=c.nukeR*sz(K);
  C.homeTurn=c.homeTurn*K;
  C.gravPull=c.gravPull*K;C.gravR=K>0?c.gravR*sz(K):0;
  C.sawPre=1-(1-c.sawPre)*K;
  C.waveCurve=c.waveCurve*K;
  for(const k in DK0)O.DK[k]=1+(DK0[k]-1)*K;
  if(O.BK)for(const k in BK0)O.BK[k]=1+(BK0[k]-1)*K;}
 function restore(){if(!C0)return;const O=window.CO309;Object.assign(O.C,JSON.parse(JSON.stringify(C0)));Object.assign(O.DK,DK0);if(O.BK)Object.assign(O.BK,BK0);lastK=null;}
 // riêng từng tàu (chủ dự án 23/11): #01 nổ lan Thường 8 % · Lục 15 % · Lam 22 % · Tím+ 30 % (gốc) → K = tỉ lệ / 0,30
 const MKS={0:{thuong:.08/.30,luc:.15/.30,lam:.22/.30}};
 function coK(id){if(!on('EVO21CO'))return 1;const t=tierOf(id),o=MKS[id];return (o&&o[t]!=null)?o[t]:(MK[t]??1);}

 // ---------------- sprite dựng sẵn (cache theo màu) ----------------
 const SPC={};
 function rgb(c){if(Array.isArray(c))return c;const m=/^#?([0-9a-f]{6})$/i.exec(String(c||''));if(!m)return [160,200,255];const n=parseInt(m[1],16);return [n>>16&255,n>>8&255,n&255];}
 function dot(col){const k='d'+col;if(SPC[k])return SPC[k];const c=document.createElement('canvas');c.width=c.height=48;const g=c.getContext('2d'),[r,gg,b]=rgb(col),G=g.createRadialGradient(24,24,0,24,24,24);
  G.addColorStop(0,'rgba(255,255,255,1)');G.addColorStop(.22,`rgba(${Math.min(255,r+90)},${Math.min(255,gg+90)},${Math.min(255,b+90)},.95)`);G.addColorStop(.5,`rgba(${r},${gg},${b},.55)`);G.addColorStop(1,`rgba(${r},${gg},${b},0)`);g.fillStyle=G;g.fillRect(0,0,48,48);return SPC[k]=c;}
 function tail(col){const k='t'+col;if(SPC[k])return SPC[k];const c=document.createElement('canvas');c.width=96;c.height=16;const g=c.getContext('2d'),[r,gg,b]=rgb(col);
  const G=g.createLinearGradient(0,0,96,0);G.addColorStop(0,`rgba(${r},${gg},${b},0)`);G.addColorStop(.6,`rgba(${r},${gg},${b},.55)`);G.addColorStop(1,'rgba(255,255,255,.95)');
  g.fillStyle=G;g.beginPath();g.moveTo(0,8);g.lineTo(96,1.5);g.lineTo(96,14.5);g.closePath();g.fill();return SPC[k]=c;}
 // bảng màu lóe nòng / tia lửa / lửa động cơ theo bậc (tàu có bộ ảnh GPT mới). Tím đa sắc: tia lửa chọn ngẫu nhiên.
 const PAL={1:{thuong:['#bfefff'],luc:['#38bdf8'],lam:['#34d399','#22d3ee'],tim:['#22d3ee','#a855f7','#34d399']},0:{thuong:['#ffe08a'],luc:['#ff8c1a'],lam:['#e0302a','#ffc040'],tim:['#ffb020','#ff3a3a','#b04dff']}};
 function palOf(id){const p=PAL[id];if(!p||window.EVO21===false)return null;return p[T4(tierOf(id))]||null;}
 function colOf(id){const p=palOf(id);if(p)return p[0];return colOf0(id);}
 function colRnd(id){const p=palOf(id);return p?p[(Math.random()*p.length)|0]:colOf0(id);}
 function colOf0(id){try{if(window.FX18&&FX18.tone){const c=FX18.tone(id);if(c)return c;}}catch{}try{return Dan299.colorOf(id);}catch{}return '#9ad8ff';}

 // ---------------- 2) VFX đạn chính + kỹ năng S ----------------
 const P=[];const MAXP=150;let flash=[];
 function sparks(x,y,col,n,sp,life){if(lite())n=Math.ceil(n/2);for(let k=0;k<n&&P.length<MAXP;k++){const a=Math.random()*Math.PI*2,v=sp*(.4+Math.random()*.8);P.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-sp*.25,t:0,life:life*(.7+Math.random()*.6),col,s:3+Math.random()*3});}}
 function onEmit(id,s,k,n){if(!on('EVO21FX')||!playing()||k!==0)return;const V=VK[tierOf(id)]??1,col=colOf(id);
  flash.push({x:player.x,y:player.y-30,t:0,life:.06+.06*V,R:12+24*V,col,V,streak:V>=.8});if(flash.length>6)flash.shift();}
 const hitT=new WeakMap();
 function onHit(s,e){if(!on('EVO21FX')||!s||!s.d307||!e||!playing())return;const id=s.art28|0,V=VK[tierOf(id)]??1;const t=performance.now();const l=hitT.get(e)||0;if(t-l<60)return;hitT.set(e,t);
  sparks(s.x,s.y,colRnd(id),1+Math.round(4*V),110+120*V,.16+.12*V);}
 // kỹ năng S / SS (v121): bùng nổ lúc kích hoạt + tia lửa trên mục tiêu trúng trong lúc kỹ năng chạy
 let skCur=null,skT=0;
 function skillTick(){try{const st=window.V121&&V121.state&&V121.state();const c=st&&st.cur;if(!c){skCur=null;return null;}const id=sel();if(id<0)return null;
   if(skCur!==c.i+'|'+c.tk&&!skCur){const V=VK[tierOf(id)]??1,col=colOf(id);flash.push({x:player.x,y:player.y-10,t:0,life:.28,R:40+70*V,col,V,ring:true});sparks(player.x,player.y-10,col,4+Math.round(10*V),200+160*V,.35);const sw=pick('song',id);if(sw)waves.push({im:sw,t:0,dur:c.ss?1.15:.9,V,ss:!!c.ss,x:player.x,y:player.y-40});}
   skCur=c.i+'|'+c.tk;return id;}catch{return null;}}
 function onDamage(e,amt,src){if(!on('EVO21FX')||!skCur||!e||amt<=0||!playing())return;if(src&&typeof src==='object'&&(src.d307||src.gearKind))return;const id=sel();if(id<0)return;const t=performance.now();if(t-skT<40)return;
  const l=hitT.get(e)||0;if(t-l<90)return;hitT.set(e,t);skT=t;const V=VK[tierOf(id)]??1;sparks(e.x,e.y,colRnd(id),2+Math.round(4*V),140+120*V,.22+.1*V);}
 const waves=[];
 let lastT=0;
 function render(g){const now=performance.now()/1000,dt=Math.min(.05,Math.max(0,now-(lastT||now)));lastT=now;try{if(playing()){gearFlush(g);hazDraw(g);}}catch{}if(!on('EVO21FX'))return;
  const live=playing();if(!live&&!P.length&&!flash.length&&!waves.length)return;if(live)skillTick();
  g.save();g.globalCompositeOperation='lighter';
  // vệt đuôi đạn chính
  const id=sel();if(live&&id>=0&&typeof shots!=='undefined'){const V=VK[tierOf(id)]??1,tl=tail(colOf(id)),L=10+30*V,Wd=3+4*V;let c=0;g.globalAlpha=.3+.4*V;
   for(const s of shots){if(!s.d307||s.dead||s.art28!==id)continue;if(++c>(lite()?40:80))break;const sp=Math.hypot(s.vx,s.vy)||1,a=Math.atan2(s.vy,s.vx),ln=L*(s.bt307?1.3:1)*Math.min(1,(s.age||0)/.05+.2);
    const ca=Math.cos(a),sa=Math.sin(a);g.save();g.transform(ca,sa,-sa,ca,s.x,s.y);g.drawImage(tl,-ln-2,-Wd/2,ln,Wd);g.restore();}}
  g.restore();g.save();g.globalCompositeOperation='lighter';
  // lóe nòng / bùng kỹ năng
  flash=flash.filter(f=>{f.t+=dt;const u=f.t/f.life;if(u>=1)return false;const im=dot(f.col),R=f.R*(f.ring?(.4+u*.9):(1-u*.4));g.globalAlpha=(f.ring?.55:.5+.4*f.V)*(1-u);g.drawImage(im,f.x-R,f.y-R,R*2,R*2);
   if(f.streak){g.globalAlpha=.5*(1-u);const h=f.R*1.6;g.drawImage(im,f.x-2.5,f.y-h,5,h*1.2);}
   if(f.ring){g.globalAlpha=.6*(1-u);g.strokeStyle=f.col;g.lineWidth=3*(1-u)+1;g.beginPath();g.arc(f.x,f.y,R*.9,0,Math.PI*2);g.stroke();}return true;});
  // sóng kỹ năng (ảnh GPT 'song'): quét từ mũi tàu lên trên, cỡ / độ rực theo bậc, SS lớn nhất
  for(let i=waves.length-1;i>=0;i--){const w=waves[i];w.t+=dt;const u=w.t/w.dur;if(u>=1){waves.splice(i,1);continue;}const im=w.im;
   const Wd=(typeof W!=='undefined'?W:480)*(.5+.4*w.V)*(w.ss?1.35:1)*(.75+.35*u),Hh=Wd*im.naturalHeight/im.naturalWidth,y=w.y-u*(w.y+Hh*.2),a=Math.min(1,u*6,(1-u)*2.5)*(.55+.45*Math.min(1,w.V));
   g.globalAlpha=a;g.drawImage(im,w.x-Wd/2,y-Hh*.6,Wd,Hh);if(w.ss||w.V>=1){g.globalAlpha=a*.35;g.drawImage(im,w.x-Wd*.55,y-Hh*.66,Wd*1.1,Hh*1.1);}}
  // tia lửa
  for(let i=P.length-1;i>=0;i--){const p=P[i];p.t+=dt;if(p.t>=p.life){P.splice(i,1);continue;}p.x+=p.vx*dt;p.y+=p.vy*dt;p.vx*=.9;p.vy=p.vy*.9+120*dt;const u=p.t/p.life,s=p.s*(1-u*.6);g.globalAlpha=1-u;g.drawImage(dot(p.col),p.x-s,p.y-s,s*2,s*2);}
  g.restore();}

 // ---------------- 3) Chiến Thần 4 mốc ----------------
 const RM={gun:[.85,1,1.12,1.25],glow:[.75,1,1.25,1.5],ult:[.88,1,1.08,1.16],ultA:[.8,1,1,1]};
 function robM(){try{const r=activeRobot;if(!r)return 1;const e=Math.max(0,Math.min(10,r.enhance|0));return e<=2?0:e<=5?1:e<=9?2:3;}catch{return 1;}}
 function rob(k){if(!on('EVO21ROB'))return 1;const a=RM[k];return a?a[robM()]:1;}

 // ---------------- 4) ảnh GPT mới ----------------
 const IMG={},H0=window.EVO21_H||{};for(const k in (window.EVO21_IMG||{})){const im=new Image();im.src=EVO21_IMG[k];if(H0[k])im.__h0=H0[k];/* ảnh đã thu nhỏ lúc dựng: chiều cao gốc để giữ cỡ vẽ */IMG[k]=im;}
 const ok=im=>im&&im.complete&&im.naturalWidth;
 function pick(base,id){const N=id+1,t=T4(tierOf(id));return [IMG[`tau${N}_${base}_${t}`],IMG[`tau${N}_${base}`]].find(ok)||null;}
 function dan(id,bt){if(window.EVO21===false||window.EVO21IMG===false)return null;if(bt){const b=IMG[`tau${id+1}_dan_bt`];if(ok(b))return b;}return pick('dan',id);}
 const SPIN={11:1};function spin(id){return !!SPIN[id]&&window.EVO21!==false;}
 function hasSong(i){if(window.EVO21===false||window.EVO21IMG===false)return false;return !!(ok(IMG[`tau${i+1}_song`])||ok(IMG[`tau${i+1}_song_${T4(tierOf(i))}`]));}
 // tia laser liên tục (tàu 2): cột GPT theo bậc, lặp dọc phần giữa ảnh + cuộn lên, rộng theo bậc; điểm chạm bùng sáng
 const LW={thuong:12,luc:20,lam:28,tim:38,tim5:42,ss:46};
 function laser(s,g){if(window.EVO21===false||window.EVO21IMG===false)return false;const id=1,im=pick('dan',id);if(!im)return false;
  const t=tierOf(id),sup=(()=>{try{return superTime>0;}catch{return false;}})(),y=Math.max(0,s.y),fade=s.life28>0?Math.max(0,Math.min(1,(s.life28-s.age)/.05)):1,
   w=LW[t]*(sup?1.25:1),iw=im.naturalWidth,ih=im.naturalHeight,sy0=ih*.25,sh=ih*.5,seg=w*sh/iw,off=(performance.now()/1000*520)%seg;
  g.save();g.globalCompositeOperation='lighter';g.globalAlpha=fade;g.beginPath();g.rect(s.x-w,0,w*2,y);g.clip();
  for(let yy=y+off;yy>-seg;yy-=seg)g.drawImage(im,0,sy0,iw,sh,s.x-w/2,yy-seg,w,seg);
  g.restore();g.save();g.globalCompositeOperation='lighter';const d=dot(colOf(id));g.globalAlpha=.85*fade;const R=w*1.4;g.drawImage(d,s.x-R,y-R*.8,R*2,R*2);
  let contact=null;if(s.hit)for(const e of s.hit)if(e&&!e.dead&&e.hp>0&&Number.isFinite(e.y)&&e.y<=s.y&&(!contact||e.y>contact.y))contact=e;
  if(contact){const R2=w*1.8;g.globalAlpha=.8*fade;g.drawImage(d,s.x-R2,contact.y-R2,R2*2,R2*2);if(Math.random()<.35)sparks(s.x,contact.y,colRnd(id),2,160,.2);}
  g.restore();return true;}
 // Chiến Thần (V2.1): tranh GPT ct<i>_dan_<1..3> · ct<i>_canh · ct<i>_ult ; mốc 0:+0..2 → đạn 1 · 1–2 → đạn 2 · 3:+10 → đạn 3
 function robDan(i){if(window.EVO21===false||window.EVO21IMG===false)return null;const m=robM(),b=m===0?1:m===3?3:2,im=IMG[`ct${i+1}_dan_${b}`];return ok(im)?im:null;}
 function robUlt(i){if(window.EVO21===false||window.EVO21IMG===false)return null;const im=IMG[`ct${i+1}_ult`];return ok(im)?im:null;}
 function robWing(g,i,x,y,now){const im=IMG[`ct${i+1}_canh`];if(!ok(im)||window.EVO21===false)return;const br=window.WSTATIC42!==false?1:1+Math.sin(now*3.2)*.04,m=robM(),w=(m===3?330:290)*br,h=w*im.naturalHeight/im.naturalWidth;
  g.save();g.globalCompositeOperation='lighter';g.globalAlpha=m===3?.9:.75;g.drawImage(im,x-w/2,y-h*.62,w,h);g.restore();}
 const HZ=[];
 function robHazard(i,x,y,w,h,im,un){HZ.push({i,x,y,w,h,im,un:Number.isFinite(un)&&un>0?un:1,acc:0,tl:performance.now(),t0:performance.now(),dur:i===5?1500:1200});if(HZ.length>3)HZ.shift();}
 /* V2.1 Đợt 3: vùng dư gây sát thương — mọi vùng 1,5 × đơn vị/giây, vệt lửa #6 2,0 × đơn vị/giây; nhịp 0,2 s */
 function hzTick(z,now){if(window.EVO21HZ===false)return;try{if(mode!=='play')return;}catch{return;}z.acc+=Math.min(.25,(now-z.tl)/1000);z.tl=now;
  while(z.acc>=.2){z.acc-=.2;const lane=z.i===5,D=(lane?2:1.5)*z.un*.2,inZ=(x,y,r)=>lane?(Math.abs(x-z.x)<30+r&&y>z.y-r&&y<z.y+z.h+120+r):(Math.abs(x-z.x)<z.w/2+r&&y>z.y-r&&y<z.y+z.h+r);
   try{for(const e of enemies){if(e.dead||e.rescue28||!Number.isFinite(e.hp))continue;if(inZ(e.x,e.y,(e.r||14)*.5)){e.hp-=D;try{Report392.hit(D,'skill');}catch{}if(e.hp<=0)kill(e);}}}catch{}
   try{if(boss&&!boss.defeatStarted&&inZ(boss.x,boss.y,60))damageBoss(D,'sss',boss);}catch{}}}
 function hazDraw(g){if(!HZ.length)return;const now=performance.now(),dt=1/60;g.save();g.globalCompositeOperation='lighter';
  for(let k=HZ.length-1;k>=0;k--){const z=HZ[k],u=(now-z.t0)/z.dur;if(u>=1){HZ.splice(k,1);continue;}hzTick(z,now);
   g.globalAlpha=.32*(1-u);g.drawImage(z.im,z.x-z.w/2,z.y,z.w,z.h);
   if(z.i===4){/* #5 Hàn Phong: vùng băng — đạn địch trong vùng chậm dần */try{for(const b of bullets){if(b.y>z.y&&b.y<z.y+z.h&&Math.abs(b.x-z.x)<z.w/2){const f=Math.pow(.3,dt);b.vx*=f;b.vy*=f;}}}catch{}
    const d=dot('#9be7ff');for(let n=0;n<6;n++){const xx=z.x+(Math.sin(now/300+n*2.1))*z.w*.4,yy=z.y+z.h*(.2+.12*n);g.globalAlpha=.5*(1-u);g.drawImage(d,xx-10,yy-10,20,20);}}
   if(z.i===5){/* #6 Xích Diễm: vệt lửa dọc làn giữa */const d=dot('#ff7a2a'),top=Math.max(0,z.y);for(let yy=top;yy<z.y+z.h+120;yy+=26){const r=16+6*Math.sin(now/90+yy*.1);g.globalAlpha=.55*(1-u);g.drawImage(d,z.x-r+Math.sin(yy*.07+now/120)*6,yy-r,r*2,r*2);}}}
  g.restore();}
 function robFinish(i){const im=robUlt(i);if(!im)return;waves.push({im,t:0,dur:.55,V:.55,ss:false,x:player.x,y:player.y-20});flash.push({x:player.x,y:player.y,t:0,life:.35,R:150,col:'#ffd56a',V:1,ring:true});}
 // ---- V2.1 Đợt 2: tên lửa (tl_<id>_<0..3>, tr<0..3>, ex0/ex1) và tàu con (wg_<id>_<0..3>, b<0..3>, wing, hit) ----
 const TI={thuong:0,luc:1,lam:2,tim:3,tim5:3,ss:3};
 const gOn=()=>window.EVO21!==false&&window.EVO21IMG!==false&&window.EVO21G!==false;
 const ts=I=>{if(window.__ts21!=null)return window.__ts21;let e=0;try{e=Gear44.sssEnh(I.sss.id)||0;}catch{}return e>=10?2:e>=3?1:0;};/* V2.1 Đợt 3: SSS 3 mốc theo cường hóa +0..2 / +3..9 / +10 */
 const sk=I=>I&&I.sss&&I.sss.id;
 const ti=I=>{if(!I)return -1;if(I.sss)return ts(I);if(window.__ti21!=null)return window.__ti21;/* chỉ để chụp ảnh thử */return TI[I.tier]!=null?TI[I.tier]:-1;};
 function gearImg(mis,I){if(!gOn())return null;const t=ti(I);if(t<0)return null;const s3=sk(I),im=IMG[s3?(mis?`st_${s3}_${t}`:`sw_${s3}_b${t}`):(mis?`tl_${I.v}_${t}`:`wg_${I.v}_b${t}`)];return ok(im)?im:null;}
 function gearTrail(c,I,sup,L,W){const t=ti(I);if(t<0)return false;const s3=sk(I),im=IMG[s3?`st_${s3}_tr${sup?2:t}`:`tl_${I.v}_tr${sup?3:t}`];if(!ok(im))return false;
  const ln=L*(1.05+.12*(sk(I)?t*1.5:t))*(sup?1.3:1)*(1+.08*Math.sin(performance.now()/1000*40)),w=ln*im.naturalWidth/im.naturalHeight;c.globalCompositeOperation='lighter';c.globalAlpha=.95;c.drawImage(im,-w/2,L*.3,w,ln);c.globalAlpha=1;return true;}
 const GT=new Map(),BURST=[];
 function gearTrack(ref,o,I,mis,sup){const s3=sk(I),t=ti(I);if(!GT.has(ref)&&window.EvoSFX)try{EvoSFX.fire(s3||I.v,t,!!s3,!!sup,mis);}catch{}/* V2.1 EVO21_SFX: phóng tên lửa / đạn tàu con theo hệ */GT.set(ref,{x:o.x,y:o.y,t:performance.now(),v:I.v,s3,mis,big:sup||(s3?t>=2:t>=3),k10:s3&&t>=2});}
 function podImg(v,I){if(!gOn()||!I)return null;const t=ti(I);if(t<0)return null;const s3=sk(I),im=IMG[s3?`sw_${s3}_${t}`:`wg_${v}_${t}`];return ok(im)?im:null;}
 function podWings(c,v,x,y,w,t,I){const s3=sk(I),im=IMG[s3?`sw_${s3}_wing`:`wg_${v}_wing`];if(!ok(im)||!gOn())return false;const ST=window.WSTATIC42!==false;let op=1;if(ST){const n=performance.now()/1000;if(!PW.on)PW.t0=n;PW.on=true;PW.seen=n;const u=(n-PW.t0)/.15;op=u<1?.55+.45*(1-Math.pow(1-u,3)):1;}
  const br=ST?op:1+Math.sin(t*5)*.04,ww=w*2.3*br,hh=ww*im.naturalHeight/im.naturalWidth,FK=window.FXK42?FXK42():1;
  /* V2.1.42: cánh mini tĩnh 1,0× (bung 0,15 s), vẽ DƯỚI thân tàu con α .55 để thân 3D luôn rõ */
  c.save();c.globalCompositeOperation='lighter';c.globalAlpha=(ST?.55:.65)*FK;c.drawImage(im,x-ww/2,y-hh*.55,ww,hh);if(ST&&op>=1&&window.Flow42)try{Flow42.wing(c,im,x-ww/2,y-hh*.55,ww,hh,-1,t,FK,I);}catch{}c.restore();return true;}
 const PW={on:false,t0:0,seen:0};setInterval(()=>{if(performance.now()/1000-PW.seen>.25)PW.on=false;},200);
 /* V2.1 Đợt 3b: Kho + Xưởng SSS — ảnh 384 theo mốc (st_/sw_<sss>_i<t>; thiếu thì ảnh trận) */
 function sssT(id){if(window.__ts21!=null)return window.__ts21;let e=0;try{e=Gear44.sssEnh(id)||0;}catch{}return e>=10?2:e>=3?1:0;}
 function sssKey(id,t){const D=(window.EVO21_IMG||{});for(const p of ['st_','sw_'])for(const k of [`${p}${id}_i${t}`,`${p}${id}_${t}`])if(D[k])return k;return null;}
 function sssIcon(id,t){if(!gOn())return null;const k=sssKey(id,t==null?sssT(id):t);return k?EVO21_IMG[k]:null;}
 function hangarImg(kind){if(!gOn())return null;try{const it=(gear.equipment||[]).find(x=>x.kind===kind);if(!it||!window.TB309)return null;const I=TB309.info(it.variant,kind);if(!I)return null;
   if(I.sss){const k=sssKey(I.sss.id,sssT(I.sss.id));const im=k&&IMG[k];return ok(im)?{im,I}:null;}const t=ti(I);if(t<0)return null;const im=IMG[kind==='sidearm'?`wg_${I.v}_${t}`:`tl_${I.v}_${t}`];return ok(im)?{im,I}:null;}catch{return null;}}
 const SH={};function sssHit(id,x,y){if(!gOn())return;const now=performance.now();if(now-(SH[id]||0)<110)return;SH[id]=now;if(window.EvoSFX)try{EvoSFX.hit(id,false,false);}catch{}const im=IMG[`sw_${id}_hit`];if(ok(im)&&BURST.length<14){let t=0;try{t=ts({sss:{id}});}catch{}BURST.push({im,x,y,t0:now,dur:200,R:30*(t>=2?1.15:1)});}}
 function gearFlush(g){const now=performance.now();for(const [r,q] of GT){if(now-q.t<90)continue;GT.delete(r);if(r.dead===false&&!r.hit)continue;
   if(q.y<-8||q.y>2000||q.x<-8||q.x>2000)continue;const key=q.s3?(q.mis?`st_${q.s3}_ex${q.big?1:0}`:`sw_${q.s3}_hit`):(q.mis?`tl_${q.v}_ex${q.big?1:0}`:`wg_${q.v}_hit`);if(window.EvoSFX)try{EvoSFX.hit(q.s3||q.v,q.big,q.mis);}catch{}if(ok(IMG[key])&&BURST.length<14)BURST.push({im:IMG[key],x:q.x,y:q.y,t0:now,dur:q.mis?260:200,R:(q.mis?(q.big?66:48):30)*(q.k10?1.15:1)});/* +10: hào quang nổ +15 % */}
  if(!BURST.length)return;g.save();g.globalCompositeOperation='lighter';for(let i=BURST.length-1;i>=0;i--){const b=BURST[i],u=(now-b.t0)/b.dur;if(u>=1){BURST.splice(i,1);continue;}const R=b.R*(.55+.6*u);g.globalAlpha=Math.min(1,(1-u)*1.6);g.drawImage(b.im,b.x-R,b.y-R*b.im.naturalHeight/b.im.naturalWidth,R*2,R*2*b.im.naturalHeight/b.im.naturalWidth);}g.restore();}
 const WS={on:false,t0:0,ring:0};
 function drawWing(g,id,size,isOn,now){if(window.EVO21===false||window.EVO21IMG===false||!isOn)return false;const im=pick('canh',id);if(!im)return false;
  if(!WS.on){WS.t0=now;WS.ring=1;}WS.on=true;const ta=now-WS.t0,ST=window.WSTATIC42!==false,UF=ST?.15:.3,open=ta<UF?.55+.45*(1-Math.pow(1-ta/UF,3)):1,
   sx=ST?1:1+Math.sin(now*5.2)*.04,sy=ST?1:1+Math.sin(now*5.2+1.3)*.04,w=size*2.35*open*sx,h=w*im.naturalHeight/im.naturalWidth*sy/sx,y0=-h*.42;
  /* V2.1.42: cánh tĩnh 1,0× sau 0,15 s bung (không nhịp thở ±4 %, không lớp bóng ×1,06 làm nhòe chi tiết); dòng năng lượng chạy dọc viền (Flow42) */
  const FK=window.FXK42?FXK42():1;g.save();g.globalCompositeOperation='lighter';g.globalAlpha=.9*FK;g.drawImage(im,-w/2,y0,w,h);if(!ST){g.globalAlpha=.18+.08*Math.sin(now*5.2);g.drawImage(im,-w*.53,y0-h*.03,w*1.06,h*1.06);}
  if(ST&&open>=1&&window.Flow42)try{Flow42.wing(g,im,-w/2,y0,w,h,id,now,FK);}catch{}
  if(ta<.45){const u=ta/.45,R=size*(.4+1.6*u);g.globalAlpha=.7*(1-u);g.strokeStyle=colOf(id);g.lineWidth=6*(1-u)+1;g.beginPath();g.arc(0,0,R,0,Math.PI*2);g.stroke();g.globalAlpha=.4*(1-u);const d=dot('#ffffff');g.drawImage(d,-R*.5,-R*.5,R,R);}
  g.restore();return true;}
 setInterval(()=>{try{if(!(superTime>0))WS.on=false;}catch{}},250);

 // ---------------- móc ----------------
 function hookTone(){try{if(!window.FX18||!FX18.tone||FX18.tone.__e21)return !!(window.FX18&&FX18.tone&&FX18.tone.__e21);const o=FX18.tone;const f=function(i){try{const id=i!=null?i:sel();const p=palOf(id);if(p)return p[p.length>2?0:p.length-1];}catch{}return o.apply(this,arguments);};f.__e21=1;FX18.tone=f;return true;}catch{return false;}}
 {const iv=setInterval(()=>{if(hookTone())clearInterval(iv);},400);}
 function hookHangar(){try{const H=window.Dan307&&Dan307.hangar;if(!H)return false;if(H.__e21)return true;H.__e21=1;const od=H.draw,orr=H.rays;
  H.draw=function(g,id,x,y,vx,vy,age,col,sc){if(window.EVO21!==false)sc=(sc||1)*.85;return od.call(this,g,id,x,y,vx,vy,age,col,sc);};
  H.rays=function(id){const r=orr.apply(this,arguments);if(r&&window.EVO21!==false&&r.n>=5)r.tot*=1.3;return r;};return true;}catch{return false;}}
 {const iv=setInterval(()=>{if(hookHangar())clearInterval(iv);},400);}
 function hook(){if(!window.CO309||!CO309.decor||typeof Equipment25==='undefined'||!Equipment25.hit||typeof VisualFX==='undefined'||!VisualFX.draw)return false;if(CO309.__e21)return true;CO309.__e21=1;snap();
  const od=CO309.decor;CO309.decor=function(id,s,k,n,bt){try{if(window.EVO21!==false&&snap())applyK(id,coK(id));else restore();}catch{}const r=od.apply(this,arguments);try{onEmit(id,s,k,n);if(id===11&&s&&window.EVO21!==false&&s.p120&&s.p120.k==='sine')s.p120=null;/* lỗi cũ: dan307 chép chung 1 đối tượng p120 'sine' của v120 cho cả loạt → mọi viên tàu 12 cùng 1 cột x */
   if(id===11&&n>1&&s&&window.EVO21!==false&&!s.__sp21){s.__sp21=1;/* V2.1: đĩa cưa #12 tỏa rộng hơn để không chồng thành cục sáng */const da=(k-(n-1)/2)*.075,c=Math.cos(da),sn=Math.sin(da),vx=s.vx,vy=s.vy;s.vx=vx*c-vy*sn;s.vy=vx*sn+vy*c;}}catch{}return r;};
  const oh=Equipment25.hit;Equipment25.hit=function(s,e){try{if(window.EVO21!==false&&s&&s.co309!=null&&snap())applyK(s.co309,coK(s.co309));}catch{}const r=oh.apply(this,arguments);try{onHit(s,e);}catch{}return r;};
  const vd=VisualFX.draw;VisualFX.draw=function(){try{const id=sel();if(window.EVO21!==false&&id>=0&&snap())applyK(id,coK(id));else if(window.EVO21===false)restore();}catch{}const r=vd.apply(this,arguments);try{if(typeof ctx!=='undefined')render(ctx);}catch{}return r;};
  try{if(typeof Feedback31!=='undefined'&&Feedback31.damage){const of=Feedback31.damage;Feedback31.damage=function(e,amt,src){const r=of.apply(this,arguments);try{onDamage(e,amt,src);}catch{}return r;};}}catch{}
  return true;}
 if(!hook()){const iv=setInterval(()=>{if(hook())clearInterval(iv);},300);}
 window.Evo21={sssIcon,sssT,hangarImg,sssHit,robHazard,gearImg,gearTrail,gearTrack,podImg,podWings,robDan,robUlt,robWing,robFinish,spin,hasSong,laser,MKS,PAL,palOf,waves,VK,RM,coK,rob,robM,dan,drawWing,tierOf,state:()=>({p:P.length,f:flash.length,C:window.CO309&&CO309.C,K:lastK,id:lastId}),restore};
})();
