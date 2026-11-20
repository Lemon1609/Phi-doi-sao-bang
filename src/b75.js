'use strict';
// B75 · Boss cuối chương 2, 4, 5, 6, 7, 8, 9 — 3 pha theo REVIEW75.BOSS_SPECIFICATIONS (Gemini 23/10).
//  Ải: 40 (CH2), 80 (CH4), 100 (CH5), 120 (CH6), 140 (CH7), 160 (CH8), 180 (CH9). Chương 1 & 3 vẫn do C76 lo.
//  Pha: 100–70% / 70–30% / < 30% máu. Đổi pha: xóa toàn bộ đạn + laze, nghỉ 0,5 s.
//  Đơn vị: px logic khung Gemini 480×1100 → x giữ nguyên (W=480), y tuyệt đối nhân H/1100. Tốc độ px/s gốc (bù enemyScale như C76).
//  Màu đạn: không gán tint → theo màu chương (người chơi đã chọn). Boss chỉ khai hỏa sau khi vào vị trí (cùng luật phi đội).
//  V85: CH6–CH9 (ải 120/140/160/180) thay theo Gemini REVIEW84 §E1. Bản cũ (REVIEW75) giữ ở BOSS75_OLD để so sánh: window.B75_OLD=true.
//  Tắt: window.B75=false (boss dùng lại mẫu cũ).
const BOSS75={
 STAGES:{40:'CH2',80:'CH4',100:'CH5',120:'CH6',140:'CH7',160:'CH8',180:'CH9',200:'CH10'},
 SPEC:{
  CH2:{name:'Thiết Giáp Hạm Phá Không',phases:[
   [{type:'PARALLEL_STREAM',lanes:4,laneGap:110,speed:220,cd:1.4},{type:'FAN_BURST',ways:5,spreadDeg:60,speed:200,cd:2.2}],
   [{type:'CLUSTER_SPLIT',count:2,stopY:550,childWays:8,speed:150,childSpeed:210,cd:2.8},{type:'CROSS_NEEDLES',ways:4,angleDeg:35,speed:250,cd:1.6}],
   [{type:'CARPET_BARRAGE',columns:5,colGap:85,shiftX:42,speed:230,cd:.9},{type:'RING_PULSE',ways:14,speed:170,cd:2.0}]]},
  CH4:{name:'Mẫu Hạm Tinh Vân',phases:[
   [{type:'VELOCITY_ARC',ways:7,spreadDeg:75,speedMin:180,speedMax:260,cd:1.8},{type:'AIMED_BURST',burst:3,gap:.12,speed:290,cd:2.0,needle:1}],
   [{type:'REFRACT_PODS',podPos:[[90,420],[390,420]],ways:3,speed:210,cd:2.5},{type:'REVERSING_SPIRAL',arms:2,reverseSec:3.0,speed:195,cd:.12}],
   [{type:'BOUNDARY_LASERS',xPositions:[70,410],warnSec:.8,activeSec:3.0,cd:5.0},{type:'ROSETTE_BLOOM',petals:6,speed:200,cd:.8}]]},
  CH5:{name:'Thực Thể Băng Giá',phases:[
   [{type:'AIMED_BURST',burst:4,gap:.08,speed:310,cd:1.5,needle:1,lock:1},{type:'SPLIT_FAN',ways:6,spreadDeg:90,centerBlindDeg:30,speed:210,cd:1.7}],
   [{type:'TIMED_BOMB',count:3,delaySec:2.0,childWays:6,speed:130,childSpeed:220,cd:2.6},{type:'SWEEPING_WAVE',ways:8,speed:190,cd:1.9}],
   [{type:'PULSE_SPIRAL',arms:3,fireSec:1.2,pauseSec:.3,speed:215,every:.1},{type:'PILLAR_LASER',width:40,warnSec:.7,cd:3.2}]]},
  // V85 · CH6–CH9 thay theo Gemini REVIEW84 §E1 · V86 (REVIEW85 G3): nhân chung ×0,88 → 154–180 px/s (sc:.88 — không nhân 0,72 như CH2–CH5), khe né ≥ 60 px.
  CH6:{name:'Pháo Đài Dung Nham',sc:.88,phases:[
   [{type:'PARABOLIC_ERUPTION',ways:5,gravityY:145,initialVy:-85,speed:180,cd:1.8},{type:'FAN_BURST',ways:5,spreadDeg:55,speed:190,cd:1.6}],
   [{type:'GATE_WALL',totalBullets:9,gateMissing:2,gateWidth:80,speed:175,cd:2.1},{type:'AIMED_BURST',burst:3,gap:.14,speed:195,cd:1.5}],
   [{type:'DUAL_SPEED_RINGS',ways:14,offsetDeg:12.8,speeds:[170,195],cd:1.7},{type:'CROSS_NEEDLES',ways:4,angleDeg:34,speed:200,cd:1.6}]]},
  CH7:{name:'Kẻ Săn Mồi Không Gian',sc:.88,phases:[
   [{type:'STRAFE_DROP_CURTAIN',columns:5,colGap:68,dashSec:1.3,speed:185,cd:2.3},{type:'TWIN_CLAW_FANS',waysPerSide:4,speed:192,cd:1.6}],
   [{type:'BLINK_RING_AMBUSH',nodes:[[120,220],[240,180],[360,220]],ways:12,warnSec:.5,speed:188,cd:3.2},{type:'PINCER_SPIRALS',arms:2,speed:185,safeCenterGap:60,every:.1}],
   [{type:'TRIPLE_SLASH_FAN',waves:3,ways:7,shiftDeg:8,waveGap:.25,speed:198,cd:1.8},{type:'SIDE_SPLITTER_TRAP',count:2,speed:190,cd:2.4}]]},
  CH8:{name:'Lõi Trí Tuệ Omega',sc:.88,phases:[
   [{type:'CHECKERBOARD_GRID',cols:6,colGap:80,alternateShift:40,speed:185,cd:1.3},{type:'PARTITION_LASERS',xPositions:[160,320],warnSec:.8,cd:3.5}],
   [{type:'GEAR_SPIRAL',arms:4,angularVel:.75,speed:190,every:.11},{type:'AIMED_FAN',ways:3,spreadDeg:22,speed:202,cd:1.9,needle:1}],
   [{type:'PURGE_WALL',gateWidth:75,centerSafeWidth:110,speed:188,cd:2.0},{type:'ROSETTE_BLOOM',petals:6,speed:195,cd:1.5}]]},
  CH9:{name:'Hoàng Đế Hư Không',sc:.88,phases:[
   [{type:'CROWN_DUAL_FAN',fastWays:6,fastSpeed:205,slowWays:5,slowSpeed:165,cd:1.6},{type:'RICOCHET_ORBS',count:2,bounces:1,r:9,speed:190,cd:2.5}],
   [{type:'DOUBLE_HELIX',ways:16,fireSec:1.5,pauseSec:.4,speed:195,every:.1},{type:'TRIPLE_LASER',lanes:3,warnSec:.8,cd:3.8}],
   [{type:'COSMIC_COLLAPSE',spiralArms:4,spiralSpeed:190,ringWays:18,ringMissing:3,ringSpeed:180,ringCd:2.2,every:.14},{type:'AIMED_BURST',burst:4,gap:.10,speed:205,cd:2.2,needle:1}]]},
  // V87 · CH10 ải 200 (Gemini REVIEW87 §4.2): pha 100→65% · 65→30% · 30→0%, cùng nhân chung ×0,88
  CH10:{name:'Thái Cổ Tinh Hoàng',sc:.88,th:[.65,.3],phases:[
   [{type:'CROSS_NEEDLES',ways:4,angleDeg:34,speed:175,cd:1.6},{type:'DUAL_SPEED_RINGS',ways:18,offsetDeg:10,speeds:[165,175],cd:2.0}],
   [{type:'TRIPLE_LASER',lanes:2,warnSec:1.2,cd:3.8},{type:'GATE_WALL',totalBullets:9,gateMissing:2,gateWidth:80,speed:190,cd:2.1}],
   [{type:'DOUBLE_HELIX',ways:16,fireSec:1.5,pauseSec:.5,speed:200,every:.1},{type:'AIMED_BURST',burst:4,gap:.10,speed:205,cd:2.2,needle:1}]]}}};
// Mẫu REVIEW75 cũ cho CH6–CH9 (để so sánh độ khó bằng bot: window.B75_OLD=true)
const BOSS75_OLD={
  CH6:{name:'Pháo Đài Dung Nham',phases:[
   [{type:'PARABOLIC_ERUPTION',ways:5,gravityY:160,initialVy:-90,cd:1.8},{type:'FAN_BURST',ways:5,spreadDeg:55,speed:280,cd:1.6}],
   [{type:'GATE_WALL',totalBullets:9,gateMissing:2,speed:185,cd:2.1},{type:'AIMED_BURST',burst:3,gap:.1,speed:260,cd:1.4}],
   [{type:'DUAL_SPEED_RINGS',ways:16,offsetDeg:11.25,speeds:[190,230],cd:1.6},{type:'AIMED_BURST',burst:4,gap:.10,speed:320,cd:2.0,needle:1,homing:1}]]},
  CH7:{name:'Kẻ Săn Mồi Không Gian',phases:[
   [{type:'STRAFE_DROP_CURTAIN',columns:6,colGap:60,dashSec:1.2,speed:230,cd:2.4},{type:'TWIN_CLAW_FANS',waysPerSide:4,speed:250,cd:1.5}],
   [{type:'BLINK_RING_AMBUSH',nodes:[[120,220],[240,180],[360,220]],ways:12,warnSec:.5,speed:240,cd:3.5},{type:'PINCER_SPIRALS',arms:2,speed:210,every:.1}],
   [{type:'TRIPLE_SLASH_FAN',waves:3,ways:9,shiftDeg:8,waveGap:.25,speed:270,cd:1.8},{type:'SIDE_SPLITTER_TRAP',count:2,speed:220,cd:2.5}]]},
  CH8:{name:'Lõi Trí Tuệ Omega',phases:[
   [{type:'CHECKERBOARD_GRID',cols:6,colGap:80,alternateShift:40,speed:200,cd:1.2},{type:'PARTITION_LASERS',xPositions:[160,320],warnSec:.8,cd:3.5}],
   [{type:'GEAR_SPIRAL',arms:4,angularVel:.8,speed:210,every:.11},{type:'AIMED_FAN',ways:3,spreadDeg:18,speed:310,cd:2.0,needle:1}],
   [{type:'PURGE_WALL',gateWidth:75,centerSafeWidth:110,speed:195,cd:2.0},{type:'RING_PULSE',ways:16,speed:220,cd:1.8}]]},
  CH9:{name:'Hoàng Đế Hư Không',phases:[
   [{type:'CROWN_DUAL_FAN',fastWays:7,fastSpeed:290,slowWays:6,slowSpeed:185,cd:1.6},{type:'RICOCHET_ORBS',count:2,bounces:1,speed:220,cd:2.5}],
   [{type:'DOUBLE_HELIX',ways:16,fireSec:1.6,pauseSec:.4,speed:225,every:.1},{type:'TRIPLE_LASER',lanes:3,warnSec:.8,cd:4.0}],
   [{type:'COSMIC_COLLAPSE',spiralArms:4,spiralSpeed:205,ringWays:20,ringMissing:3,ringSpeed:190,ringCd:2.2,every:.14},{type:'AIMED_BURST',burst:5,gap:.08,speed:340,cd:2.4,needle:1}]]}};
// V307 · đòn bổ sung theo pha (thêm vào cuối danh sách đòn của pha, hồi dài để không quá dày). Tắt: window.B307=false
const ADD307={
 CH5:[[],[{type:'GAP_ARC',ways:22,gap:3,waves:2,waveGap:.55,speed:165,cd:5.0}],[]],
 CH6:[[],[{type:'TWIN_PILLAR',off:62,width:22,warnSec:1.0,activeSec:1.4,cd:6.0}],[]],
 CH7:[[],[],[{type:'X_CROSS',spread:150,width:18,warnSec:1.0,activeSec:.7,beads:6,beadSpeed:165,cd:6.0}]],
 CH8:[[],[{type:'GAP_COLUMNS',lanes:5,width:30,warnSec:1.1,activeSec:.55,cd:6.5}],[]],
 CH9:[[],[],[{type:'X_CROSS',spread:160,width:18,warnSec:1.0,activeSec:.7,beads:7,beadSpeed:170,cd:6.5}]],
 CH10:[[],[{type:'GAP_COLUMNS',lanes:5,width:30,warnSec:1.1,activeSec:.55,cd:7.0}],[{type:'TWIN_PILLAR',off:66,width:22,warnSec:1.0,activeSec:1.4,cd:6.5},{type:'GAP_ARC',ways:24,gap:3,waves:2,waveGap:.5,speed:175,cd:5.5}]]};
const B75=(()=>{
 const TAU=Math.PI*2,D=Math.PI/180;let S=null;
 const playing=()=>typeof mode!=='undefined'&&mode==='play';
 const ky=()=>(typeof H==='number'?H:1100)/1100;
 function kindNow(){if(window.B75===false)return null;try{if(gameMode!=='campaign'||Dungeons.active()||Meta40.state().run)return null;}catch{}try{if(Eclipse67.active())return null;}catch{}if(BOSS75.STAGES[level])return BOSS75.STAGES[level];const n=level|0;if(window.B77SUB!==false&&typeof V77_SPEC!=='undefined'&&n%5===0&&n%20!==0){const ch=Math.min(9,Math.floor((n-1)/20)+1);return 'SUB:CH'+ch+':'+(n%10===5?'SUB_ODD':'SUB_MID10');}return null;}
 function specOf(kd){if(!kd)return null;if(kd.startsWith('SUB:')){const [,c,t]=kd.split(':');const sp=V77_SPEC.SUB_BOSSES_18[c][t];return {name:sp.name,phases:sp.phases.map(p=>p.moves),th:sp.phases.slice(1).map(p=>p.hp),sc:1};}const sp=(window.B75_OLD===true&&BOSS75_OLD[kd])||BOSS75.SPEC[kd];const ad=window.B307!==false&&ADD307[kd];return {name:sp.name,phases:ad?sp.phases.map((p,i)=>p.concat(ad[i]||[])):sp.phases,th:sp.th||[.7,.3],sc:sp.sc||.72};}
 function shot(x,y,a,s,o={}){if(S&&S.sc&&S.sc!==1)s=Math.min(230,s*S.sc);const n0=bullets.length;try{emit(x,y,a,s/Math.max(.01,enemyScale()),o.needle?'needle':'orb',{boss75:1,fix75:o.fix||s>258?1:0,...(o.r?{r:o.r}:{}),...(o.x||{})});}catch{return null;}return bullets.length>n0?bullets[bullets.length-1]:null;}
 const aim=(x,y)=>Math.atan2(player.y-y,player.x-x);
 function beam(x,width,warn,dur,o={}){try{Safety31.push(beams,24,{x,y:o.y||0,width,age:0,warn,duration:dur,angle28:o.a===undefined?Math.PI/2:o.a,length28:o.len||((typeof H==='number'?H:1100)+40),color:o.col||'#ff4d6d'});}catch{}}
 const TELE309=new Set(['AIMED_BURST','AIMED_FAN','RICOCHET_ORBS','FAN_BURST','CROSS_NEEDLES','TIMED_BOMB','CLUSTER_SPLIT','SPLIT_FAN']);
 function every(key,sec,dt){const t=S.acc;t[key]=(t[key]||0)+dt;if(t[key]>=sec){t[key]-=sec;return true;}return false;}
 const later=(t,fn)=>S.q.push({t,fn});
 function fan(x,y,a0,ways,spread,sp,o){const out=[];for(let i=0;i<ways;i++){const a=ways>1?a0-spread/2+spread*i/(ways-1):a0;out.push(shot(x,y,a,sp,o));}return out;}
 function ring(x,y,ways,sp,off=0,skip=null,o){for(let i=0;i<ways;i++){if(skip&&skip(i))continue;shot(x,y,off+i*TAU/ways,sp,o);}}
 function special(b,o){if(b){b.sp75=o;S.sp.push(b);}}
 function row(y,xs,sp){for(const x of xs)shot(x,y,Math.PI/2,sp);}
 // ---------------- các đòn ----------------
 function run(m,key,dt,b){const bx=b.x,by=b.y+22,K=ky();
  /* V309d · chớp tụ nòng 0,32 s trước loạt bắn nhanh / nguy hiểm (Gemini). Tắt: window.TELE309=false */try{if(window.TELE309!==false&&TELE309.has(m.type)&&m.cd>=.6){const left=m.cd-(S.acc[key]||0);if(left>0&&left<.32)(window.__tele75||(window.__tele75=[])).push({x:bx,y:by,l:left,t:performance.now()});}}catch{}
  switch(m.type){
   case 'PARALLEL_STREAM':if(every(key,m.cd,dt)){const sp=m.laneGap*.6;for(let r=0;r<3;r++)later(r*.12,()=>{for(let j=0;j<m.lanes;j++)shot(b.x+(j-(m.lanes-1)/2)*sp,b.y+22,Math.PI/2,m.speed);});}break;
   case 'FAN_BURST':if(every(key,m.cd,dt))fan(bx,by,aim(bx,by),m.ways,m.spreadDeg*D,m.speed);break;
   case 'AIMED_FAN':if(every(key,m.cd,dt))fan(bx,by,aim(bx,by),m.ways,m.spreadDeg*D,m.speed,{needle:m.needle});break;
   case 'CLUSTER_SPLIT':if(every(key,m.cd,dt))for(let i=0;i<m.count;i++)special(shot(bx+(i-(m.count-1)/2)*60,by,Math.PI/2+(i-(m.count-1)/2)*.35,m.speed,{r:9}),{k:'stopY',y:m.stopY*K,ways:m.childWays,cs:m.childSpeed});break;
   case 'CROSS_NEEDLES':if(every(key,m.cd,dt))for(const s of [-1,1]){const a=Math.PI/2-s*m.angleDeg*D;fan(bx+s*70,by,a,m.ways,.3,m.speed,{needle:1});}break;
   case 'CARPET_BARRAGE':if(every(key,m.cd,dt)){S.n=(S.n||0)+1;const w=(m.columns-1)*m.colGap,x0=(W-w)/2+(S.n%2?m.shiftX/2:-m.shiftX/2);row(10,Array.from({length:m.columns},(_,j)=>x0+j*m.colGap),m.speed);}break;
   case 'RING_PULSE':if(every(key,m.cd,dt))ring(bx,by,m.ways,m.speed,Math.random()*TAU);break;
   case 'VELOCITY_ARC':if(every(key,m.cd,dt)){const a0=aim(bx,by),n=m.ways;for(let i=0;i<n;i++){const u=n>1?i/(n-1):.5,a=a0-m.spreadDeg*D/2+m.spreadDeg*D*u,sp=m.speedMin+(m.speedMax-m.speedMin)*(1-Math.abs(u-.5)*2);shot(bx,by,a,sp);}}break;
   case 'AIMED_BURST':if(every(key,m.cd,dt)){const a0=aim(bx,by);for(let i=0;i<m.burst;i++)later(i*m.gap,()=>{const x=b.x,y=b.y+22;shot(x,y,m.homing||!m.lock?aim(x,y):a0,m.speed,{needle:m.needle});});}break;
   case 'REFRACT_PODS':{if(!S.pods.length&&!S.podDone){S.podDone=1;for(const [px,py] of m.podPos){const d=addEnemy({x:px,y:py*K,v:0,type:1,large:false,elite:false,guard:0,hp:b.max*.06/Math.max(.01,enemyScale()),fire:1e9,age:0,phase:0,dead:false,pod75:1});d.burst30=0;S.pods.push(d);}}
    for(const d of S.pods){if(d.dead)continue;const pp=m.podPos[S.pods.indexOf(d)];d.x=pp[0];d.y=pp[1]*K;d.fire=1e9;}
    if(every(key,m.cd,dt))for(const d of S.pods){if(d.dead)continue;const a=d.x<W/2?0:Math.PI;fan(d.x,d.y,a,m.ways,.3,m.speed);}break;}
   case 'REVERSING_SPIRAL':{S.dirT=(S.dirT||0)+dt;if(S.dirT>=m.reverseSec){S.dirT=0;S.dir=-(S.dir||1);}if(every(key,m.cd,dt)){S.sa=(S.sa||0)+(S.dir||1)*.22;for(let i=0;i<m.arms;i++)shot(bx,by,S.sa+i*TAU/m.arms,m.speed);}break;}
   case 'BOUNDARY_LASERS':case 'PARTITION_LASERS':if(every(key,m.cd,dt)||!S.acc[key+'f']){S.acc[key+'f']=1;for(const x of m.xPositions)beam(x,24,m.warnSec,m.activeSec||.6);}break;
   case 'ROSETTE_BLOOM':if(every(key,m.cd,dt)){S.ra=(S.ra||0)+.18;ring(bx,by,m.petals,m.speed,S.ra);ring(bx,by,m.petals,m.speed*.82,S.ra+.08);}break;
   case 'SPLIT_FAN':if(every(key,m.cd,dt)){const a0=aim(bx,by),half=m.ways/2,gap=m.centerBlindDeg*D,arm=(m.spreadDeg*D-gap)/2;for(const s of [-1,1])for(let i=0;i<half;i++){const a=a0+s*(gap/2+arm*(half>1?i/(half-1):0));shot(bx,by,a,m.speed);}}break;
   case 'TIMED_BOMB':if(every(key,m.cd,dt))for(let i=0;i<m.count;i++)special(shot(bx,by,Math.PI/2+(i-(m.count-1)/2)*.45,m.speed,{r:9}),{k:'timer',t:m.delaySec,ways:m.childWays,cs:m.childSpeed,needle:1});break;
   case 'SWEEPING_WAVE':if(every(key,m.cd,dt)){S.sw=-(S.sw||1);for(let i=0;i<m.ways;i++)later(i*.06,()=>{const u=i/(m.ways-1),a=Math.PI/2+(S.sw>0?.75-1.5*u:-.75+1.5*u);shot(b.x,b.y+22,a,m.speed);});}break;
   case 'PULSE_SPIRAL':{S.pt=(S.pt||0)+dt;const cyc=m.fireSec+m.pauseSec;if(S.pt%cyc<m.fireSec&&every(key,(m.every||.1),dt)){S.sa=(S.sa||0)+.19;for(let i=0;i<m.arms;i++)shot(bx,by,S.sa+i*TAU/m.arms,m.speed);}break;}
   case 'PILLAR_LASER':if(every(key,m.cd,dt))beam(player.x,m.width,m.warnSec,.5,{col:'#9be7ff'});break;
   case 'PARABOLIC_ERUPTION':if(every(key,m.cd,dt))for(let i=0;i<m.ways;i++){const vx=(i-(m.ways-1)/2)*62+(Math.random()-.5)*20,bb=shot(bx,by,0,1,{fix:1});if(bb){bb.vx=vx;bb.vy=m.initialVy;special(bb,{k:'grav',g:m.gravityY});}}break;
   case 'GATE_WALL':if(every(key,m.cd,dt)){const slots=m.totalBullets+m.gateMissing,sp=(W-40)/(slots-1),gm=Math.max(m.gateMissing,m.gateWidth?Math.ceil((m.gateWidth+12)/sp)-1:0),g0=[0,Math.floor((slots-gm)/2),slots-gm][Math.floor(Math.random()*3)];const xs=[];for(let j=0;j<slots;j++)if(j<g0||j>=g0+gm)xs.push(20+j*sp);row(by,xs,m.speed);}break;
   case 'DUAL_SPEED_RINGS':if(every(key,m.cd,dt)){const o=Math.random()*TAU;ring(bx,by,m.ways,m.speeds[0],o);ring(bx,by,m.ways,m.speeds[1],o+m.offsetDeg*D);}break;
   case 'STRAFE_DROP_CURTAIN':{if(!S.dash&&every(key,m.cd,dt))S.dash={t:0,last:-1,from:b.x};if(S.dash){const d=S.dash;d.t+=dt;const u=Math.min(1,d.t/m.dashSec);S.hold={x:90+300*u,y:b.y};const col=Math.floor((S.hold.x-90)/m.colGap);if(col>d.last&&col<m.columns){d.last=col;for(let r=0;r<3;r++)later(r*.1,()=>shot(90+col*m.colGap,b.y+22,Math.PI/2,m.speed));}if(u>=1){S.dash=null;S.hold=null;}}break;}
   case 'TWIN_CLAW_FANS':if(every(key,m.cd,dt))for(const s of [-1,1]){const x=bx+s*80;fan(x,by,aim(x,by),m.waysPerSide,.42,m.speed);}break;
   case 'BLINK_RING_AMBUSH':{if(!S.blink&&every(key,m.cd,dt)){const nd=m.nodes[Math.floor(Math.random()*m.nodes.length)];S.blink={t:0,x:nd[0],y:nd[1]*K};}
    if(S.blink){const bl=S.blink;bl.t+=dt;if(bl.t>=m.warnSec&&!bl.done){bl.done=1;S.hold={x:bl.x,y:bl.y};b.x=bl.x;b.y=bl.y;try{VisualFX.impact(bl.x,bl.y,'#c77dff',1.2);}catch{}ring(bl.x,bl.y+10,m.ways,m.speed,Math.random()*TAU);}if(bl.t>=m.warnSec+.1)S.blink=null;}break;}
   case 'PINCER_SPIRALS':if(every(key,(m.every||.1),dt)){S.pa=(S.pa||0)+.21;if(m.safeCenterGap){const w=.12+.95*(.5+.5*Math.sin(S.pa));shot(bx-80,by,Math.PI/2+w,m.speed);shot(bx+80,by,Math.PI/2-w,m.speed);}else{shot(bx-80,by,Math.PI/2+Math.sin(S.pa)*1.1,m.speed);shot(bx+80,by,Math.PI/2-Math.sin(S.pa)*1.1,m.speed);}}break;
   case 'TRIPLE_SLASH_FAN':if(every(key,m.cd,dt)){const a0=aim(bx,by);for(let w=0;w<m.waves;w++)later(w*m.waveGap,()=>fan(b.x,b.y+22,a0+(w-1)*m.shiftDeg*D,m.ways,1.25,m.speed));}break;
   case 'SIDE_SPLITTER_TRAP':if(every(key,m.cd,dt))for(const x of [22,W-22])special(shot(x,by,Math.PI/2,m.speed,{r:9}),{k:'side',cs:m.speed});break;
   case 'CHECKERBOARD_GRID':if(every(key,m.cd,dt)){S.cb=!S.cb;row(by,Array.from({length:m.cols},(_,j)=>40+j*m.colGap+(S.cb?m.alternateShift:0)).filter(x=>x<W-10),m.speed);}break;
   case 'GEAR_SPIRAL':S.ga=(S.ga||0)+m.angularVel*dt;if(every(key,(m.every||.1),dt))for(let i=0;i<m.arms;i++)shot(bx,by,S.ga+i*TAU/m.arms,m.speed);break;
   case 'PURGE_WALL':if(every(key,m.cd,dt)){const sp=40,gx=60+Math.random()*(W-120),xs=[];for(let x=20;x<=W-20;x+=sp)if(Math.abs(x-gx)>m.gateWidth/2)xs.push(x);row(by,xs,m.speed);
     S.pw=(S.pw||0)+1;if(S.pw%2===1){const cy=(typeof H==='number'?H:1100)*.6,cx=W/2;for(const sx of [0,W]){const a=Math.atan2(cy-0,cx-sx),len=Math.hypot(cx-sx,cy)-m.centerSafeWidth/2;beam(sx,20,.8,.7,{a,len,y:0,col:'#7df9ff'});}}}break;
   case 'CROWN_DUAL_FAN':if(every(key,m.cd,dt)){const a0=aim(bx,by),st=1.1/(m.fastWays-1);fan(bx,by,a0,m.fastWays,1.1,m.fastSpeed);fan(bx,by,a0,m.slowWays,1.1-st,m.slowSpeed);}break;
   case 'RICOCHET_ORBS':if(every(key,m.cd,dt))for(const s of [-1,1])special(shot(bx,by,Math.PI/2+s*.75,m.speed,{r:m.r||9}),{k:'bounce',n:m.bounces});break;
   case 'DOUBLE_HELIX':{S.pt=(S.pt||0)+dt;const cyc=m.fireSec+m.pauseSec;if(S.pt%cyc<m.fireSec&&every(key,(m.every||.1),dt)){S.ha=(S.ha||0)+TAU/m.ways;shot(bx,by,S.ha,m.speed);shot(bx,by,-S.ha+Math.PI,m.speed);}break;}
   // V307 · 4 đòn mới học cách làm game gốc (chủ dự án chọn 17/11). Tắt: window.B307=false
   case 'GAP_COLUMNS':if(every(key,m.cd,dt)){const n=m.lanes||5,gw=W/n,pc=Math.max(0,Math.min(n-1,Math.floor(player.x/gw)));let safe=pc+(Math.random()<.5?-1:1);if(safe<0||safe>=n)safe=pc+(safe<0?1:-1);for(let k=0;k<n;k++)if(k!==safe)beam(gw*(k+.5),m.width||30,m.warnSec||1.1,m.activeSec||.55,{col:m.col||'#ff4d6d'});}break;
   case 'TWIN_PILLAR':if(every(key,m.cd,dt)){const o=m.off||62;for(const s of [-1,1])beam(Math.max(24,Math.min(W-24,bx+s*o)),m.width||22,m.warnSec||1.0,m.activeSec||1.4,{y:by,col:'#36e0ff'});}break;
   case 'X_CROSS':if(every(key,m.cd,dt)){const tx=player.x,ty=Math.min((typeof H==='number'?H:1100)-90,player.y-60),wn=m.warnSec||1.0;for(const s of [-1,1]){const ox=Math.max(10,Math.min(W-10,bx+s*(m.spread||150))),oy=by,a=Math.atan2(ty-oy,tx-ox);beam(ox,m.width||18,wn,m.activeSec||.7,{y:oy,a,len:1500,col:'#ff7a3a'});later(wn+.05,()=>{for(let i=0;i<(m.beads||6);i++)later(i*.11,()=>shot(ox,oy,a,m.beadSpeed||165,{r:7}));});}}break;
   case 'GAP_ARC':if(every(key,m.cd,dt)){const n=m.ways||22,gap=m.gap||3,pa=aim(bx,by);for(let w=0;w<(m.waves||2);w++)later(w*(m.waveGap||.55),()=>{const x=b.x,y=b.y+22,a0=Math.PI*.08,a1=Math.PI*.92;let g=Math.round((pa-a0)/(a1-a0)*(n-1))-Math.floor(gap/2)+(w?(Math.random()<.5?-3:3):0);g=Math.max(0,Math.min(n-gap,g));for(let i=0;i<n;i++){if(i>=g&&i<g+gap)continue;shot(x,y,a0+(a1-a0)*i/(n-1),m.speed||170,{r:6});}});}break;
   case 'TRIPLE_LASER':if(every(key,m.cd,dt)){const xs=[player.x,player.x-W/3,player.x+W/3].map(x=>Math.max(30,Math.min(W-30,x)));for(const x of xs.slice(0,m.lanes))beam(x,26,m.warnSec,.5,{col:'#ffd166'});}break;
   case 'COSMIC_COLLAPSE':{S.ca=(S.ca||0)+.35*dt;if(every(key,(m.every||.1),dt))for(let i=0;i<m.spiralArms;i++)shot(bx,by,S.ca*3+i*TAU/m.spiralArms,m.spiralSpeed);
    if(every(key+'r',m.ringCd,dt)){const g=Math.floor(Math.random()*m.ringWays);ring(bx,by,m.ringWays,m.ringSpeed,0,i=>((i-g+m.ringWays)%m.ringWays)<m.ringMissing);}break;}}}
 // đạn đặc biệt (tách, hẹn giờ, trọng lực, dội tường, tách ngang)
 function specials(dt){const K=ky();for(const b of S.sp){const o=b.sp75;if(!o||b.dead){b.sp75=null;continue;}
   if(o.k==='stopY'){if(b.y>=o.y){b.dead=true;b.sp75=null;ring(b.x,b.y,o.ways,o.cs,Math.random()*TAU);}}
   else if(o.k==='timer'){o.t-=dt;if(o.t<=1.2&&!o.slow){o.slow=1;b.vx*=.35;b.vy*=.35;}if(o.t<=0){b.dead=true;b.sp75=null;ring(b.x,b.y,o.ways,o.cs,-Math.PI/2,null,{needle:o.needle});}}
   else if(o.k==='grav'){b.vy+=o.g*dt/Math.max(.01,1);}
   else if(o.k==='bounce'){const r=b.r||9;if(o.n>0&&(b.x<r||b.x>W-r)){b.vx=-b.vx;b.x=Math.max(r,Math.min(W-r,b.x));o.n--;}}
   else if(o.k==='side'){if(Math.abs(b.y-player.y)<12){b.dead=true;b.sp75=null;const a=b.x<W/2?0:Math.PI;shot(b.x,b.y,a,o.cs);shot(b.x,b.y,a+(b.x<W/2?-.18:.18),o.cs);}}}
  S.sp=S.sp.filter(b=>b.sp75&&!b.dead);}
 function drawBlink(){if(!S||!S.blink||S.blink.done)return;const bl=S.blink;ctx.save();ctx.globalAlpha=.35+.35*Math.sin(time*20);ctx.strokeStyle='#c77dff';ctx.lineWidth=3;ctx.beginPath();ctx.arc(bl.x,bl.y,38,0,TAU);ctx.stroke();ctx.restore();}
 function tick(dt){const b=typeof boss!=='undefined'?boss:null;if(!b||b.dead||b.defeatStarted){if(S){for(const d of S.pods)if(!d.dead)d.dead=true;S=null;}return;}
  if(!S||S.b!==b){const kd=kindNow();const SP=specOf(kd);S={b,kd,SP,sc:SP?SP.sc:1,ph:0,pause:0,acc:{},q:[],sp:[],pods:[],hold:null};if(SP)try{toast('BOSS · '+SP.name.toUpperCase());}catch{}}
  if(!S.kd)return;let ent=false;try{ent=C76run.entering();}catch{}b.fire=b.laser=b.skill=99;if(b.majorPulse36!==undefined)b.majorPulse36=99;if(ent||b.y<75)return;
  const ratio=window.__b75r!==undefined?window.__b75r:b.hp/b.max;let ph=0;S.SP.th.forEach((t,i)=>{if(ratio<t)ph=i+1;});
  if(ph>S.ph){S.ph=ph;S.pause=.5;for(const x of bullets)x.dead=true;try{beams.length=0;}catch{}S.acc={};S.q=[];S.sp=[];S.dash=null;S.blink=null;S.hold=null;S.podDone=0;for(const d of S.pods)if(!d.dead)d.dead=true;S.pods=[];try{VisualFX.impact(b.x,b.y,'#ffe28a',2);toast('BOSS · PHA '+(ph+1));}catch{}}
  if(S.hold){b.x=S.hold.x;b.y=S.hold.y;}
  if(S.pause>0){S.pause-=dt;return;}
  const P=S.SP.phases[S.ph]||[];P.forEach((m,i)=>{try{run(m,S.ph+':'+i,dt,b);}catch(e){console.warn('B75',m.type,e);}});
  for(const q of S.q)q.t-=dt;const due=S.q.filter(q=>q.t<=0);S.q=S.q.filter(q=>q.t>0);for(const q of due)try{q.fn();}catch{}
  specials(dt);}
 function install(){
  try{const ou=update;update=function(dt){const r=ou.apply(this,arguments);try{if(playing())tick(dt);}catch(e){console.warn('B75',e);}return r;};}catch{}
  try{const vd=VisualFX.draw;VisualFX.draw=function(){const r=vd.apply(this,arguments);try{drawBlink();}catch{}return r;};}catch{}
  try{const ors=reset;reset=function(){S=null;return ors.apply(this,arguments);};}catch{}}
 setTimeout(()=>{try{install();}catch(e){console.warn('B75 install',e);}},0);
 // chạy 1 danh sách đòn trên 1 vật thể bất kỳ (mid-boss V77) với trạng thái riêng
 function runOn(st,obj,moves,dt){const keep=S;S=st;try{st.acc=st.acc||{};st.q=st.q||[];st.sp=st.sp||[];st.pods=st.pods||[];st.sc=st.sc||1;moves.forEach((m,i)=>{try{run(m,'m:'+i,dt,obj);}catch(e){console.warn('B75 mid',m.type,e);}});
   for(const q of st.q)q.t-=dt;const due=st.q.filter(q=>q.t<=0);st.q=st.q.filter(q=>q.t>0);for(const q of due)try{q.fn();}catch{}specials(dt);}finally{S=keep;}}
 return {runOn,specOf,state:()=>S&&S.kd?{kd:S.kd,ph:S.ph,sp:S.sp.length,pods:S.pods.filter(d=>!d.dead).length,q:S.q.length}:null,kindNow,SPEC:BOSS75.SPEC};
})();
