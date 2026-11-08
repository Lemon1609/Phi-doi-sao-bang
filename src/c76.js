'use strict';
// V76 · ĐỘ SÂU TRẬN ĐẤU (Gemini 23/10): GRAZE COMBO · 4 QUÁI TINH ANH CÓ ẤN TỐ · MẪU ĐẠN 3 PHA BOSS CHƯƠNG 1 & 3.
//  Chỉnh cho đúng game:
//  • Graze gốc của game (Combat26.graze: bán kính 24, +50 điểm, +5% thanh Graze) GIỮ NGUYÊN. Mức nạp 0,8%/viên của Gemini sẽ làm Bạo Tẩu hiếm đi 6 lần
//    nên không dùng; thay vào đó combo chỉ cộng thêm: điểm ×(1→5) theo combo, nạp thêm tới +50% ở combo 100, và 3 mốc sóng xung kích 20/50/100.
//  • Quái tinh anh: game đã có cờ e.elite (★, thanh máu cam). Ấn tố gán thêm cho quái tinh anh có sẵn, thiếu thì nâng 1 quái thường lên.
//  • Boss: chỉ thay mẫu đạn của BOSS CUỐI CHƯƠNG 1 (ải 20) và CHƯƠNG 3 (ải 60) ở Chiến dịch; boss khác giữ mẫu cũ của Bosses28.
const C76={
 GRAZE:{BASE_SCORE:15,MAX_MULT:5,WINDOW:3.5,DECAY:10,EXTRA_CHARGE:.5,MS:[20,50,100],R20:60,R50:90,SUPER100:3,DMG100:3},
 ELITE:{
  SHIELD:{n:'Thiết Giáp Từ Tính',col:'#00f2ff',hp:3.0,sp:.75,shield:3.5},
  NOVA:{n:'Lôi Đình Bộc Phá',col:'#ff5500',hp:2.0,sp:1.0,count:12,speed:110,r:7},
  DASHER:{n:'Huyễn Ảnh Tốc Biến',col:'#bd00ff',hp:1.8,sp:2.2,every:2.2,dash:100},
  GRAVITON:{n:'Hắc Động Trọng Lực',col:'#7a00ff',hp:2.5,sp:.6,band:45,slow:.25,pull:70}},
 ELITE_COUNT:s=>s<20?0:s<60?1:s<120?(Math.random()<.5?1:2):(Math.random()<.5?2:3),
 BOSS_STAGES:{20:'ch1',60:'ch3'}};
const C76run=(()=>{
 const TAU=Math.PI*2,G=C76.GRAZE,E=C76.ELITE;
 const k=()=>(typeof W!=='undefined'?W:480)/412;
 const playing=()=>typeof mode!=='undefined'&&mode==='play';
 const lite=()=>{try{return VisualFX.counts().quality==='light';}catch{return false;}};
 // ================= GRAZE COMBO =================
 const g={c:0,t:0,ms:new Set(),last:-9,flash:[]};
 function gReset(){g.c=0;g.t=0;g.ms.clear();}
 function mult(){return Math.min(G.MAX_MULT,1+g.c/25*.5);}
 function onGraze(b){g.c++;g.t=G.WINDOW;g.last=time;try{score+=Math.round(G.BASE_SCORE*mult());}catch{}
  try{Combat26.addCharge07(5*G.EXTRA_CHARGE*Math.min(g.c,100)/100*(superTime>0?.3:1));}catch{}
  for(const m of G.MS)if(g.c>=m&&!g.ms.has(m)){g.ms.add(m);shock(m);}}
 function clearAround(r){let n=0;for(const b of bullets)if(!b.dead&&Math.hypot(b.x-player.x,b.y-player.y)<r){b.dead=true;n++;}return n;}
 function shock(m){const K=k();g.flash.push({r:m===100?Math.hypot(W,H):m===50?G.R50*K:G.R20*K,t:0,c:m===100?'#ffe28a':m===50?'#7df9ff':'#bff6ff'});
  try{FX16Run.addFx('bomb_hexring',player.x,player.y,20*K,(m===100?Math.hypot(W,H)*1.1:m===50?G.R50*2.2:G.R20*2.2)*K,m===100?650:300,{col:m===100?'#ffd166':'#7df9ff',alpha:.9});}catch{}
  if(m===20){clearAround(G.R20*K);try{shield=Math.min(maxShield,Math.round((shield+maxShield*.05)*10)/10);}catch{}toastC('GRAZE ×20 · SÓNG ĐIỆN');}
  else if(m===50){const n=clearAround(G.R50*K);try{score+=n*25;invuln=Math.max(invuln,.8);}catch{}toastC('GRAZE ×50 · BẤT TỬ 0,8 s');}
  else{let avg=0,n=0;try{for(const s of shots)if(s.main66&&!s.dead&&s.damage>0){avg+=s.damage;n++;}}catch{}avg=n?avg/n:2;
   try{for(const e of [...enemies])if(!e.dead){e.hp-=avg*G.DMG100;if(e.hp<=0)kill(e);}if(boss&&!boss.dead)damageBoss(avg*G.DMG100*2,'graze',boss);}catch{}
   try{superTime=Math.max(superTime,0)+G.SUPER100;}catch{}toastC('GRAZE ×100 · ĐẠI XUNG CHẤN · BẠO TẨU 3 s');}}
 let tc=0;function toastC(t){if(time-tc<.5)return;tc=time;try{toast(t);}catch{}}
 function gUpdate(dt){if(g.c>0){g.t-=dt;if(g.t<=0){g.c=Math.max(0,g.c-Math.ceil(G.DECAY*dt));if(!g.c)g.ms.clear();}}for(const f of g.flash)f.t+=dt;g.flash=g.flash.filter(f=>f.t<.25);}
 function gDraw(){if(!playing()&&mode!=='pause')return;const K=k();ctx.save();
  for(const f of g.flash){const u=f.t/.25;ctx.globalAlpha=(1-u)*.8;ctx.strokeStyle=f.c;ctx.lineWidth=3*K;ctx.beginPath();ctx.arc(player.x,player.y,f.r*u,0,TAU);ctx.stroke();}
  if(g.c>=3){const y=player.y-52*K;ctx.globalAlpha=1;ctx.font=`900 ${Math.round(12*K)}px 'Neo',sans-serif`;ctx.textAlign='center';ctx.lineWidth=3;ctx.strokeStyle='#061018';ctx.fillStyle='#e5ff00';const t='GRAZE ×'+g.c;ctx.strokeText(t,player.x,y);ctx.fillText(t,player.x,y);
   const u=Math.max(0,g.t)/G.WINDOW;ctx.strokeStyle='#e5ff00aa';ctx.lineWidth=2*K;ctx.beginPath();ctx.arc(player.x,player.y,30*K,-Math.PI/2,-Math.PI/2+TAU*u);ctx.stroke();}
  ctx.restore();}
 // ================= QUÁI TINH ANH =================
 const AFF=Object.keys(E);
 function stageNow(){try{return gameMode==='endless'?150:(level|0);}catch{return 1;}}
 const aliveAff=()=>enemies.filter(e=>!e.dead&&e.aff76).length;
 let want=0,waveT=0;
 function pickAff(){const has=enemies.some(e=>!e.dead&&e.aff76==='GRAVITON');const L=AFF.filter(a=>!(a==='GRAVITON'&&has));return L[Math.floor(Math.random()*L.length)];}
 function makeAff(e,a){const A=E[a];e.aff76=a;e.elite=true;e.hp*=A.hp;e.maxHp=e.hp;if(e.v)e.v*=A.sp;e.t76=0;e.dash76=A.every||0;if(a==='SHIELD')e.sh76=A.shield;}
 function eligible(e){return e&&!e.bossPart&&!e.rescue28&&!e.vortex67&&!e.meteor&&!e.life67&&e!==boss&&!(e.large);}
 function onAdd(e){try{if(!playing()||boss||!eligible(e))return;const st=stageNow();const n=C76.ELITE_COUNT(st);if(!n)return;
  if(time>waveT){waveT=time+12;want=n;}if(aliveAff()>=want)return;if(e.elite||Math.random()<.18)makeAff(e,pickAff());}catch{}}
 let prev=null;
 function eUpdate(dt){if(!playing())return;const K=k();let grav=null;
  for(const e of enemies){if(e.dead||!e.aff76)continue;e.t76+=dt;
   if(e.aff76==='SHIELD'&&e.sh76>0)e.sh76-=dt;
   else if(e.aff76==='DASHER'){e.x+=Math.sin(e.t76*3)*90*K*dt;e.dash76-=dt;if(e.dash76<=0){e.dash76=E.DASHER.every;const dir=e.x<player.x?-1:1;e.x=Math.max(30,Math.min(W-30,e.x+dir*E.DASHER.dash*K));e.trail76=.25;}if(e.trail76>0)e.trail76-=dt;}
   else if(e.aff76==='GRAVITON'&&Math.abs(player.y-e.y)<=E.GRAVITON.band*K)grav=e;}
  if(prev&&grav&&invuln<=0){const dx=player.x-prev.x,dy=player.y-prev.y;player.x=prev.x+dx*(1-E.GRAVITON.slow);player.y=prev.y+dy*(1-E.GRAVITON.slow);player.x+=Math.sign(grav.x-player.x)*Math.min(Math.abs(grav.x-player.x),E.GRAVITON.pull*K*dt);}
  prev={x:player.x,y:player.y};}
 function eDraw(e){if(!e||e.dead||!e.aff76)return;if(window.RING108!==false){const A=E[e.aff76],K=k(),r=(e.r||20)*1.1+6*K;ctx.save();
  // V108: bỏ vòng/lục giác quanh quái tinh anh; chỉ giữ dấu hiệu cần cho lối chơi (khiên đang bật: quầng mờ; Hắc Động: dải hút)
  if(e.aff76==='SHIELD'&&e.sh76>0){ctx.globalAlpha=.16;ctx.fillStyle=A.col;ctx.beginPath();ctx.arc(e.x,e.y,r,0,TAU);ctx.fill();}
  else if(e.aff76==='GRAVITON'&&!lite()){ctx.globalAlpha=.08;ctx.fillStyle=A.col;ctx.fillRect(0,e.y-E.GRAVITON.band*K,W,E.GRAVITON.band*2*K);}
  ctx.restore();return;}const A=E[e.aff76],K=k(),r=(e.r||20)*1.2+8*K;ctx.save();ctx.lineWidth=2.5;ctx.strokeStyle=A.col;ctx.globalAlpha=.9;
  if(e.aff76==='SHIELD'){const on=e.sh76>0;ctx.globalAlpha=on?.95:.35;ctx.beginPath();for(let i=0;i<6;i++){const a=i*TAU/6+time*1.2;const x=e.x+r*Math.cos(a),y=e.y+r*Math.sin(a);i?ctx.lineTo(x,y):ctx.moveTo(x,y);}ctx.closePath();ctx.stroke();if(on){ctx.globalAlpha=.18;ctx.fillStyle=A.col;ctx.fill();}}
  else if(e.aff76==='NOVA'){const p=1+.15*Math.sin(time*8);ctx.beginPath();ctx.arc(e.x,e.y,r*p,0,TAU);ctx.stroke();}
  else if(e.aff76==='DASHER'){for(let i=1;i<=3;i++){ctx.globalAlpha=.25/i;ctx.beginPath();ctx.arc(e.x-Math.cos(e.t76*3)*i*9*K,e.y-i*10*K,r*.8,0,TAU);ctx.stroke();}ctx.globalAlpha=.9;ctx.beginPath();ctx.arc(e.x,e.y,r,0,TAU);ctx.stroke();}
  else{ctx.globalAlpha=.75;for(let i=0;i<3;i++){ctx.beginPath();ctx.arc(e.x,e.y,r*(.7+i*.25),time*2+i*2,time*2+i*2+4);ctx.stroke();}if(!lite()){ctx.globalAlpha=.12;ctx.fillStyle=A.col;ctx.fillRect(0,e.y-E.GRAVITON.band*K,W,E.GRAVITON.band*2*K);}}
  ctx.globalAlpha=1;ctx.font=`800 ${Math.round(9*K)}px sans-serif`;ctx.textAlign='center';ctx.fillStyle=A.col;ctx.fillText(A.n,e.x,e.y+r+11*K);ctx.restore();}
 function onKill(e){if(!e||!e.aff76||e.k76)return;e.k76=1;try{if(e.aff76==='NOVA'){const N=E.NOVA;for(let i=0;i<N.count;i++)emit(e.x,e.y,i*TAU/N.count,N.speed,'orb',{r:N.r,tint30:'#ff5500'});}Progress.grantCredits(Math.round(15+stageNow()*1.5));}catch{}}
 // đạn chính bị Khiên Từ Tính chặn (rep trong vòng va chạm gọi C76run.blocks(s,e))
 function blocks(s,e){if(!e||e.aff76!=='SHIELD'||!(e.sh76>0)||!s)return false;if(s.gearKind)return false;if(!(s.main66||s.level30!==undefined))return false;try{if(Math.random()<.25)ring(e.x,e.y,'#00f2ff',22);}catch{}return true;}
 // ================= BOSS CHƯƠNG 1 & 3 =================
 let B=null;const TT=()=>({acc:{}});
 function every(tm,key,ms,dt){tm.acc[key]=(tm.acc[key]||0)+dt*1000;if(tm.acc[key]>=ms){tm.acc[key]-=ms;return true;}return false;}
 function bossKind(){try{if(gameMode!=='campaign'||Dungeons.active()||Meta40.state().run)return null;}catch{}try{if(Eclipse67.active())return null;}catch{}return C76.BOSS_STAGES[level]||null;}
 function eb(x,y,a,s,o={}){emit(x,y,a,s/Math.max(.01,enemyScale()),'orb',o);} // emit tự nhân enemyScale → quy về px/s gốc theo thiết kế
 function bUpdate(dt){const b=boss;if(!playing()||!b||b.dead||b.defeatStarted){if(B&&(!b||b!==B.b)){for(const d of (B&&B.dr)||[])d.dead=true;B=null;}return;}
  if(!B||B.b!==b){const kd=bossKind();if(!kd){B={b,kd:null};return;}B={b,kd,ph:0,tm:TT(),pause:0,sp:0,al:0,ar:0,la:.78,dir:1,mines:[],dr:[],cols:[]};try{toast(kd==='ch1'?'BOSS · CHIẾN HẠM TIỀN TIÊU':'BOSS · PHÁO HẠM LÔI ĐÌNH');}catch{}}
  if(!B.kd||b.y<75)return;const K=k();b.fire=b.laser=b.skill=99;if(b.majorPulse36!==undefined)b.majorPulse36=99;
  const ratio=b.hp/b.max,ph=ratio>.7?0:ratio>.3?1:2;if(ph>B.ph){B.ph=ph;B.pause=.5;for(const x of bullets)x.dead=true;try{beams.length=0;}catch{}B.tm=TT();try{ring(b.x,b.y,'#ffe28a',120);toast('BOSS · PHA '+(ph+1));}catch{}}
  if(B.pause>0){B.pause-=dt;return;}const tm=B.tm,bx=b.x,by=b.y;
  if(B.kd==='ch1'){
   if(B.ph===0){if(every(tm,'fan',1800,dt)){const a0=Math.atan2(player.y-by,player.x-bx);for(let i=-2;i<=2;i++)eb(bx,by+20*K,a0+i*.25,140,{r:5,tint30:'#ff3344'});}
    if(every(tm,'las',5000,dt))Safety31.push(beams,24,{x:bx,y:by+22,width:20,age:0,warn:.8,duration:.6,angle28:Math.PI/2,length28:900,color:'#ff3344'});}
   else if(B.ph===1){b.x=W/2+Math.sin(time*1.5)*120*K;B.sp+=dt;B.al+=.12*dt*60;if(B.sp%1.5>.35&&every(tm,'sp',1000/16,dt))eb(b.x,by+25*K,B.al,110,{r:5.5,tint30:'#ffaa00'});}
   else{if(!B.dr.length){for(const s of [-1,1]){const d=addEnemy({x:bx+s*70*K,y:by+40*K,v:0,type:1,large:false,elite:false,guard:0,hp:b.max*.1/Math.max(.01,enemyScale()),fire:1e9,age:0,phase:0,dead:false,drone76:s});d.burst30=0;B.dr.push(d);}}
    for(const d of B.dr){if(d.dead)continue;d.x=b.x+d.drone76*70*K;d.y=b.y+40*K;d.fire=1e9;d.f76=(d.f76||0)-dt;if(d.f76<=0){d.f76=.9;eb(d.x,d.y+10,Math.atan2(player.y-d.y,player.x-d.x),220,{r:4,tint30:'#ffd166'});}}
    if(every(tm,'ring',2500,dt))for(let i=0;i<18;i++)eb(bx,by+20*K,i*TAU/18,90,{r:6,tint30:'#ff0055'});}}
  else{
   if(B.ph===0){if(every(tm,'x',1200,dt)){for(const [ox,a] of [[-35,Math.PI/2-.52],[35,Math.PI/2+.52]])for(let j=-1;j<=1;j++)eb(bx+ox*K,by+20*K,a+j*.12,160,{r:5,tint30:'#00f2ff'});}
    if(every(tm,'mine',4000,dt))for(const s of [-1,1]){const a=Math.atan2(player.y-by,player.x-(bx+s*40*K));eb(bx+s*40*K,by+30*K,a,80,{r:9,tint30:'#bd00ff',mine76:1});const m=bullets[bullets.length-1];if(m&&m.mine76)B.mines.push({b:m,t:0});}
    for(const m of B.mines){m.t+=dt;if(m.t>=2&&!m.done){m.done=1;if(!m.b.dead){m.b.dead=true;for(let q=0;q<4;q++)for(let j=0;j<4;j++)eb(m.b.x,m.b.y,q*Math.PI/2,90+j*30,{r:4,tint30:'#ff66ff'});}}else if(m.t>=1.2&&!m.b.dead){m.b.vx*=.9;m.b.vy*=.9;}}B.mines=B.mines.filter(m=>!m.done);}
   else if(B.ph===1){B.al+=.14*dt*10;B.ar-=.14*dt*10;if(every(tm,'sp',100,dt)){eb(bx-25*K,by+30*K,B.al,130,{r:5,tint30:'#bd00ff'});eb(bx+25*K,by+30*K,B.ar,130,{r:5,tint30:'#bd00ff'});}}
   else{B.la+=.015*B.dir*dt*60;if(B.la>2.35||B.la<.78)B.dir*=-1;if(every(tm,'sw',80,dt))eb(bx,by+35*K,B.la,180,{r:6,tint30:'#ff00ff'});
    if(every(tm,'bolt',2600,dt))for(let i=0;i<8;i++)Safety31.push(beams,24,{x:30+Math.random()*(W-60),y:0,width:26*K,age:0,warn:.6,duration:.4,angle28:Math.PI/2,length28:H+40,color:'#c77dff'});}}}
 // ================= YÊU CẦU NGƯỜI DÙNG 23/10 =================
 // (1) Boss đang tiến vào: phi đội ngừng bắn và không gây sát thương cho tới khi boss tới vị trí cuối.
 function bossTarget(b){return b.major36?150:136;}
 function entering(){try{const b=boss;if(!b||b.dead||b.defeatStarted)return false;if(b.entered76)return false;
  const tg=bossTarget(b);if(b.y>=tg-.5||(b.age||0)>6){b.entered76=1;try{toastC('⚔ BOSS ĐÃ VÀO VỊ TRÍ · KHAI HỎA!');}catch{}return false;}return true;}catch{return false;}}
 function drawEnter(){if(!entering())return;const K=k();ctx.save();ctx.globalAlpha=.6+.4*Math.sin(time*8);ctx.font=`900 ${Math.round(13*K)}px 'Neo',sans-serif`;ctx.textAlign='center';ctx.lineWidth=4;ctx.strokeStyle='#120404';ctx.fillStyle='#ffb3a0';
  const t='⚠ BOSS ĐANG TIẾN VÀO · TẠM NGỪNG KHAI HỎA';ctx.strokeText(t,W/2,H*.42);ctx.fillText(t,W/2,H*.42);ctx.restore();}
 // (2) Đang Siêu cấp/Bạo Tẩu: hạ quái (kể cả tinh anh) thì xóa toàn bộ đạn của chính con quái đó.
 function tagFire(fn){return function(e){const n0=bullets.length;const r=fn.apply(this,arguments);try{for(let i=n0;i<bullets.length;i++)if(bullets[i]&&!bullets[i].own76)bullets[i].own76=e;}catch{}return r;};}
 function cancelOwn(e){let n=0;try{if(!(superTime>0))return 0;for(const b of bullets)if(!b.dead&&(b.own76===e||(b.turret&&b.turret===e))){b.dead=true;n++;try{if(n<=14)VisualFX.impact(b.x,b.y,'#ffe28a',.5);}catch{}}if(n){score+=n*10;}}catch{}return n;}
 // ================= cài đặt =================
 function install(){
  try{const af=Arsenal30.fire;Arsenal30.fire=function(){if(entering())return;return af.apply(this,arguments);};}catch{}
  try{const eu=Equipment25.update;Equipment25.update=function(){if(entering()){/* V116: vẫn cập nhật vị trí vũ khí phụ/tàu con theo chiến cơ, chỉ hủy đạn mới bắn ra */let n0=0;try{n0=shots.length;}catch{}const r=eu.apply(this,arguments);try{for(let i=n0;i<shots.length;i++)if(shots[i])shots[i].dead=true;}catch{}return r;}return eu.apply(this,arguments);};}catch{}
  try{const odb=damageBoss;damageBoss=function(){if(entering())return;return odb.apply(this,arguments);};}catch{}
  try{const ef=EnemyFleet.fire;EnemyFleet.fire=tagFire(ef);}catch{}
  try{const ef2=enemyFire;enemyFire=tagFire(ef2);}catch{}
  try{const og=Combat26.graze;Combat26.graze=function(b,d){const r=og.apply(this,arguments);try{if(r)onGraze(b);}catch{}return r;};}catch{}
  try{const od=damage;damage=function(){let h0=0,s0=0;try{h0=hp;s0=shield;}catch{}const r=od.apply(this,arguments);try{if(hp<h0||shield<s0)gReset();}catch{}return r;};}catch{}
  try{const oa=addEnemy;addEnemy=function(e){const r=oa.apply(this,arguments);onAdd(r||e);return r;};}catch{}
  try{const ok=kill;kill=function(e){const was=e&&!e.dead;const r=ok.apply(this,arguments);try{if(was&&e.dead){onKill(e);cancelOwn(e);}}catch{}return r;};}catch{}
  try{const obm=bomb;bomb=function(){const n0=bombs;const r=obm.apply(this,arguments);try{if(bombs<n0)for(const e of enemies)if(e.aff76==='SHIELD')e.sh76=0;}catch{}return r;};}catch{}
  try{const ors=reset;reset=function(){const r=ors.apply(this,arguments);try{gReset();B=null;prev=null;waveT=0;}catch{}return r;};}catch{}
  try{const ou=update;update=function(dt){const r=ou.apply(this,arguments);try{if(playing()){gUpdate(dt);eUpdate(dt);bUpdate(dt);}}catch(e){console.warn('C76',e);}return r;};}catch{}
  try{const de=EnemyFleet.drawEnemy;EnemyFleet.drawEnemy=function(e){const r=de.apply(this,arguments);try{eDraw(e);}catch{}return r;};}catch{}
  try{const vd=VisualFX.draw;VisualFX.draw=function(){const r=vd.apply(this,arguments);try{gDraw();drawEnter();}catch{}return r;};}catch{}}
 setTimeout(()=>{try{install();}catch(e){console.warn('C76 install',e);}},0);
 return {blocks,entering,cancelOwn,state:()=>({combo:g.c,mult:mult(),window:g.t,ms:[...g.ms],aff:enemies.filter(e=>!e.dead&&e.aff76).map(e=>e.aff76),boss:B&&B.kd?{kd:B.kd,ph:B.ph,dr:B.dr.length}:null}),_aff:(e,a)=>makeAff(e,a),_graze:n=>{for(let i=0;i<n;i++)onGraze({});},gReset,C:C76};
})();
