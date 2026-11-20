'use strict';
// V309c · 13 CƠ CHẾ ĐẠN RIÊNG (Gemini mục D, lượt 2 · chủ dự án đồng ý 20/11 14:30). Đạn vẫn do dan307 gom sát thương rồi phát lại;
//  module này thêm hành vi bay + hiệu ứng trúng. Hệ số bù sát thương theo đo bia cố định 15 bia: CO309.DK.
//  Ánh xạ theo tàu thật trong game (Gemini đánh số 10/11/13 lệch kỹ năng): tàu 10 = hạm đội hộ tống (kỹ năng Hạm đội), tàu 11 = cầu hấp dẫn (kỹ năng Hố đen), tàu 13 = lốc cắt gió hình sin.
//  Tắt toàn bộ: window.CO309B=false · tắt 1 tàu: window.CO309OFF=[id0,...] (id 0-based)
(function(){
 const off=id=>window.CO309B===false||(window.CO309OFF||[]).includes(id);
 // id 0-based: 0 lông vũ nổ lan · 2 băng vỡ 3 mảnh · 3 thương xuyên 3 quái · 4 khúc xạ nảy · 5 khóa mục tiêu · 6 trăng khuyết chém đạn · 7 hạt nhân mini
 //  8 tên lửa truy đuổi · 9 hạm đội hộ tống · 10 cầu hấp dẫn · 11 đĩa cưa thời gian · 12 lốc hình sin. Tàu 2 (id 1) giữ laser liền.
 // Tham số theo Gemini cân bằng (de_xuat_cho/GEMINI_TRA_LOI_CAN_BANG_13_CO_CHE_V309.md, 20/11 15:53): ưu tiên boss đơn 92–100 %, bia 15 98–106 %
 const C={splashR:34,splashK:.30, shardN:3,shardK:.08,shardLife:.24, pierceN:3,pierceF:[1,.7,.45], bounceN:2,bounceR:120,bounceK:.22, lockCone:22,lockTurn:4.0, crescentR:1.5,
  nukeR:48,nukeK:.35, homeTurn:6.0, droneX:48,droneA:5.5,droneConv:500, gravR:80,gravPull:55,gravT:.22,gravICD:.4,gravStop:18, sawT:.6,sawPre:.625, waveCurve:150};
 const DK={0:.96,1:1,2:.90,3:.98,4:.90,5:.85,6:.96,7:.96,8:.94,9:1.03,10:.96,11:1,12:.92};// hệ số bù (đo bia cố định 15 bia, bậc Tím, 20/11): khúc xạ 1,10 · khóa mục tiêu 1,36 · lốc sin 1,17 so với không cơ chế
 window.CO309={C,DK};
 const T=s=>s.t307||'tim';
 const isBossT=e=>{try{return e===boss||!!e.bossPart;}catch{return false;}};
 function hurt(e,d,s){if(!e||e.dead||d<=0)return;try{if(isBossT(e)){damageBoss(d,s,e);return;}const h=e.hp;e.hp-=d;try{Report392.hit(Math.min(h,d),s);}catch{}try{Feedback31.damage(e,h-e.hp,s);}catch{}if(e.hp<=0)kill(e);}catch{}}
 const near=(x,y,R,ex)=>enemies.filter(n=>!n.dead&&!ex.has(n)&&Math.hypot(n.x-x,n.y-y)<R).sort((a,b)=>Math.hypot(a.x-x,a.y-y)-Math.hypot(b.x-x,b.y-y));
 const FXL=[];// hiệu ứng ngắn: {k,x,y,x2,y2,t,life,tt,e}
 const fx=(o)=>{if(FXL.length>60)FXL.shift();FXL.push(Object.assign({t:0},o));};
 // ---------- gắn hành vi lúc phát đạn (gọi từ dan307 emit) ----------
 function decor(id,s,k,n,bt){if(off(id))return;s.co309=id;const dk=DK[id]||1;if(dk!==1)s.damage*=dk;
  if(id===3){s.piercing=true;s.p309=0;s.d309=s.damage;}
  else if(id===6){s.r=(s.r||4)*C.crescentR;}
  else if(id===11){s.damage*=C.sawPre;s.saw309=s.damage*(1-C.sawPre)/C.sawPre;}
  else if(id===12){if(n>1){s.pathStyle=2;s.pathCurve=C.waveCurve*(k%2?1:-1);s.pathPhase=k%2?0:Math.PI;}}
  else if(id===9){if(n>=3&&(k===0||k===n-1)){const sd=k===0?-1:1;let px=player.x+sd*C.droneX,py=player.y+4;try{const S=Battle28.support();const q=S&&S.find(z=>z&&(z.x-player.x)*sd>0);if(q){px=q.x;py=q.y-8;}}catch{}s.x=px;s.y=py;const sp=Math.hypot(s.vx,s.vy),a=-Math.atan2(px-player.x,C.droneConv);/* hội tụ cách tàu ~500 px (Gemini mục C) dù tàu con đứng ở đâu */s.vx=Math.sin(a)*sp;s.vy=-Math.cos(a)*sp;s.drone309=sd;}}
  else if(id===8){if(n>=2){const sd=k%2?1:-1;s.x=player.x+sd*24;s.y=player.y-6;}s.home309=1;}
  else if(id===5){s.lock309=1;}}
 // ---------- khi trúng (bọc Equipment25.hit) ----------
 function onHit(s,e){const id=s.co309;if(id==null||off(id)||!e)return;const t=T(s),B=isBossT(e);
  if(id===0){const L=near(e.x,e.y,C.splashR+ (e.large?14:0),new Set([e]));for(const n of L)hurt(n,s.damage*C.splashK,s);fx({k:'ring',x:e.x,y:e.y,life:.22,tt:t,s:46});}
  else if(id===2){if(!B&&!s.shard309){for(let q=0;q<C.shardN;q++){const a=(-.5+q/(C.shardN-1))*.9+Math.atan2(s.vy,s.vx);const sp=900;try{shot(e.x,e.y-6,Math.cos(a)*sp,Math.sin(a)*sp,'rapid',s.damage*C.shardK,3);const z=shots.at(-1);if(z){z.d307=1;z.art28=s.art28;z.t307=s.t307;z.c307=s.c307;z.L307=(s.L307||80)*.42;z.bt307=false;z.k307=0;z.age=.1;z.shard309=1;z.co309=2;z.life309=C.shardLife;z.damage=s.damage*C.shardK;z.hit=new Set([e]);}}catch{}}}}
  else if(id===3){if(B){s.piercing=false;}else{s.p309=(s.p309||0)+1;if(s.p309>=C.pierceN)s.piercing=false;else s.damage=(s.d309||s.damage)*C.pierceF[s.p309];/* suy hao theo lần xuyên 100/70/45 % */}fx({k:'spark',x:e.x,y:e.y,tt:t,n:3});}
  else if(id===4){const ex=new Set([e]);let from=e;for(let q=0;q<C.bounceN;q++){const n=near(from.x,from.y,C.bounceR,ex)[0];if(!n)break;ex.add(n);hurt(n,s.damage*C.bounceK,s);fx({k:'beam',x:from.x,y:from.y,x2:n.x,y2:n.y,life:.14,tt:t});from=n;}}
  else if(id===7){const L=near(e.x,e.y,C.nukeR+(e.large?14:0),new Set([e]));for(const n of L)hurt(n,s.damage*C.nukeK,s);fx({k:'nuke',x:s.x,y:s.y-4,life:.32,tt:t});}
  else if(id===10){if(!B)for(const n of near(e.x,e.y,C.gravR,new Set([e])))if(!n.large&&!n.rescue28&&!n.immovable&&!n.bia304&&!n.pull309&&!((n.pullICD309||0)>performance.now()/1000)){n.pull309={x:e.x,y:e.y,t:C.gravT};}/* 1 lực hút / quái, ICD 0,4 s, không hút boss / bia đo */fx({k:'grav',x:e.x,y:e.y,life:.34,tt:t});}
  else if(id===11){if(s.saw309)fx({k:'saw',e,x:e.x,y:e.y,dx:s.x-e.x,dy:s.y-e.y,life:C.sawT,tt:t,d:s.saw309,acc:0,src:s});}
  if(id!==3&&id!==2)fx({k:'spark',x:s.x,y:s.y,tt:t,n:2});}
 // ---------- mỗi khung: lái đạn, chém đạn địch, hút quái, cưa ----------
 let lastT=0;
 function step(dt){if(typeof mode==='undefined'||mode!=='play')return;
  for(const s of shots){if(s.dead||s.co309==null||off(s.co309))continue;
   if(s.life309!=null){s.life309-=dt;if(s.life309<=0){s.dead=true;continue;}}
   if(s.lock309||s.home309){let tg=null;if(s.home309){let best=-1;const L=[...enemies.filter(n=>!n.dead&&n.y>0)];try{if(boss&&!boss.dead)L.push(boss);}catch{}for(const n of L){const h=n.hp||0;if(h>best){best=h;tg=n;}}}
    else{const a0=Math.atan2(s.vy,s.vx);let bd=1e9;for(const n of enemies){if(n.dead||n.y<0)continue;const dx=n.x-s.x,dy=n.y-s.y,d=Math.hypot(dx,dy);let da=Math.atan2(dy,dx)-a0;da=Math.atan2(Math.sin(da),Math.cos(da));if(Math.abs(da)<C.lockCone*Math.PI/180&&d<bd){bd=d;tg=n;}}if(!tg)try{if(boss&&!boss.dead){const da=Math.atan2(boss.y-s.y,boss.x-s.x)-a0;if(Math.abs(Math.atan2(Math.sin(da),Math.cos(da)))<C.lockCone*Math.PI/180)tg=boss;}}catch{}}
    if(tg){const sp=Math.hypot(s.vx,s.vy),a=Math.atan2(s.vy,s.vx);let da=Math.atan2(tg.y-s.y,tg.x-s.x)-a;da=Math.atan2(Math.sin(da),Math.cos(da));const tr=(s.home309?C.homeTurn:C.lockTurn)*dt,na=a+Math.max(-tr,Math.min(tr,da));s.vx=Math.cos(na)*sp;s.vy=Math.sin(na)*sp;}}
   if(s.co309===6&&typeof bullets!=='undefined'){const R=(s.r||6)+10;for(const b of bullets){if(b.dead||(b.r||5)>7||b.laser||b.beam)continue;if(Math.abs(b.x-s.x)<R&&Math.abs(b.y-s.y)<R+8){b.dead=true;b.x=-999;fx({k:'spark',x:s.x,y:s.y,tt:T(s),n:2});}}}}
  for(const e of enemies){const p=e.pull309;if(!p)continue;p.t-=dt;if(p.t<=0||e.dead){e.pull309=null;e.pullICD309=performance.now()/1000+C.gravICD;continue;}const dx=p.x-e.x,dy=p.y-e.y,d=Math.hypot(dx,dy);if(d>C.gravStop){e.x+=dx/d*C.gravPull*dt;e.y+=dy/d*C.gravPull*dt;}}
  for(const f of FXL){if(f.k!=='saw')continue;const e=f.e;if(!e||e.dead){f.t=f.life;continue;}f.x=e.x+f.dx*.3;f.y=e.y+f.dy*.3;const want=f.d*Math.min(1,(f.t+dt)/f.life)-f.acc;if(want>0&&Math.floor((f.t+dt)/.1)>Math.floor(f.t/.1)){hurt(e,want,f.src);f.acc+=want;}}}
 // ---------- vẽ ----------
 function hull10(){try{return Evo53.hull(9);}catch{return null;}}
 function draw(g,dt){const F=window.FX309;for(const f of FXL)f.t+=dt;for(let i=FXL.length-1;i>=0;i--)if(FXL[i].k!=='spark'&&FXL[i].t>=FXL[i].life)FXL.splice(i,1);
  for(const f of FXL){const u=f.life?f.t/f.life:1,a=Math.max(0,1-u);
   if(f.k==='spark'){if(F)F.sparks(f.x,f.y,f.tt,f.n);f.t=f.life=1;continue;}
   if(!F)continue;
   if(f.k==='ring')F.ring(g,f.x,f.y,f.tt,f.s*(.6+u*.7),a);
   else if(f.k==='beam')F.beam(g,f.x,f.y,f.x2,f.y2,f.tt,16,a,{flare:false,rs:20});
   else if(f.k==='nuke'){F.spr(g,'nuke',f.x,f.y,(C.nukeR*2.2)*(.5+u*.6),Math.min(1,a*1.6),f.x*.01,'source-over');const sk=F.tint('shock',f.tt);if(sk){g.save();g.globalCompositeOperation='lighter';g.globalAlpha=a*.55;const z=C.nukeR*2*(.6+u*1.2);g.drawImage(sk,f.x-z/2,f.y-z/2,z,z);g.restore();}}
   else if(f.k==='grav'){const sk=F.tint('shock',f.tt);if(sk){g.save();g.globalCompositeOperation='lighter';g.globalAlpha=a*.7;g.translate(f.x,f.y);g.rotate(-f.t*9);const z=C.gravR*2*(1.1-u*.7);g.drawImage(sk,-z/2,-z/2,z,z);g.restore();}}
   else if(f.k==='saw'){F.ring(g,f.x,f.y,f.tt,30,Math.min(1,a*2));F.flare(g,f.x,f.y,f.tt,26,a);}}
  // tàu 10: 2 viên ngoài cùng bắn từ 2 tàu con hộ tống có sẵn (Battle28.support) — không vẽ thêm tàu
 }
 function hook(){if(typeof Equipment25==='undefined'||!Equipment25.hit||typeof VisualFX==='undefined')return false;if(Equipment25.__co309)return true;Equipment25.__co309=1;
  const oh=Equipment25.hit;Equipment25.hit=function(s,e){const r=oh.apply(this,arguments);try{if(s&&s.co309!=null)onHit(s,e);}catch(err){}return r;};
  const vd=VisualFX.draw;const nd=function(){const r=vd.apply(this,arguments);try{const t=performance.now()/1000,dt=Math.min(.05,Math.max(0,t-(lastT||t)));lastT=t;if(window.CO309B!==false){step(dt);if(mode==='play'||mode==='pause')draw(ctx,mode==='play'?dt:0);}}catch(err){}return r;};VisualFX.draw=nd;return true;}
 if(!hook()){const iv=setInterval(()=>{if(hook())clearInterval(iv);},300);}
 window.CO309=Object.assign(window.CO309||{},{C,DK,decor,state:()=>({fx:FXL.length})});
})();
