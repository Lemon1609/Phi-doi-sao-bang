'use strict';
// V208 · CHƯỚNG NGẠI CHƯƠNG 6–10 (Gemini V205_BOSS_AND_IDEAS_CONFIG.chapterHazards6To10 + tranh GPT CHUONG_NGAI_V207). Tắt: window.HAZ208=false
//  • Chỉ ở Chiến dịch ải 101–200, pha quái thường; ngừng sinh khi boss vào màn (vật đang có trôi hết rồi biến mất).
//  • Thiên thạch: máu = 2,5 × máu quái thường đang có; va vào tàu = đúng 1 đòn va chạm (luật SURV200, có bất tử ngắn); vỡ rơi 1 sao.
//  • Tháp pháo 2 bên mép: máu = 4 × quái thường; nòng xoay theo tàu, bắn đạn địch có sẵn (đỏ/hồng); trôi theo nền rồi rời màn.
//  • Vẽ ở lớp nền (dưới quái và đạn) → không che đạn; không vòng quanh vật, không chữ bay.
const HAZ208=(()=>{
 const C={rockEvery:[6,9],rockMax:2,rockSize:[54,68],rockHpK:2.5,turEvery:22,turHpK:4,turFire:2.4,turSize:52,scroll:26};
 const A=(typeof HAZ208_ART!=='undefined'&&HAZ208_ART)||{},IM={};
 const im=k=>{if(!A[k])return null;if(!IM[k]){const i=new Image();i.src=A[k];IM[k]=i;}return IM[k].complete&&IM[k].naturalWidth?IM[k]:null;};
 const on=()=>window.HAZ208!==false;
 // V209 (Gemini V209_ARMOR_EVENT_CONFIG.hazardProgressionV209): số theo chương 6–10, tháp phải lệch pha 1,2 s, thưởng phá tháp. Tắt riêng: window.HAZ209=false
 const G9=(typeof V209_ARMOR_EVENT_CONFIG!=='undefined'&&V209_ARMOR_EVENT_CONFIG.hazardProgressionV209)||null;
 const on9=()=>!!G9&&window.HAZ209!==false;
 function chCfg(){if(!on9())return null;const ch=Math.max(6,Math.min(10,Math.ceil((+level||101)/20)));return G9.byChapter[ch]||null;}
 const rockEvery=()=>{const c=chCfg();return c?c.asteroidSpawnSec:C.rockEvery;},rockHpK=()=>{const c=chCfg();return c?c.asteroidHpMult:C.rockHpK;},
  turEvery=()=>{const c=chCfg();return c?c.turretPairSec:C.turEvery;},turHpK=()=>{const c=chCfg();return c?c.turretHpMult:C.turHpK;},turFire=()=>{const c=chCfg();return c?c.turretShotCd:C.turFire;};
 const inX=x=>{const m=on9()?G9.dropMarginFromScreenEdgePx:0;return Math.max(m,Math.min(W-m,x));};
 const ev9=(k,o)=>{try{if(window.V209EV)V209EV.on(k,o);}catch{}};
 let pairN=0;
 function grant9(n){try{if(n>0){Progress.grantCredits(n);}}catch{}}
 let R=[],T=[],tR=4,tT=10,last=-1;
 function live(){try{if(!on()||typeof gameMode==='undefined'||gameMode!=='campaign'||mode!=='play')return false;if(typeof Dungeons!=='undefined'&&Dungeons.active())return false;if(window.__tb200||window.__prac206||window.__sr207)return false;return (+level||0)>100;}catch{return false;}}
 function mobHp(){let s=0,n=0;try{for(const e of enemies)if(!e.dead&&!e.boss&&!e.bossPart&&!e.large&&e.maxHp>0){s+=e.maxHp;n++;}}catch{}return n?s/n:3*(typeof enemyScale==='function'?enemyScale():1);}
 const rnd=(a,b)=>a+Math.random()*(b-a);
 function spawnRock(){const z=rnd(C.rockSize[0],C.rockSize[1]),hp=mobHp()*rockHpK();R.push({x:rnd(40,W-40),y:-z,vx:rnd(-18,18),vy:rnd(58,88),a:rnd(0,6.3),va:rnd(-.9,.9),z,hp,max:hp,fl:0});}
 function spawnTur(){const hp=mobHp()*turHpK(),y=-C.turSize,pid=++pairN,c0=rnd(1,2),off=on9()?G9.turretRightFirePhaseOffsetSec:0;for(const x of [30,W-30])T.push({x,y,hp,max:hp,ang:Math.PI/2,cd:c0+(x>W/2?off:0),fl:0,pid});}
 function hitShots(o,rad){let k=0;try{for(const s of shots){if(s.dead||s.ray28||!(s.damage>0)||(s.hit&&s.hit.has(o)))continue;const dx=s.x-o.x,dy=s.y-o.y,rr=rad+(s.r||4);if(dx*dx+dy*dy<rr*rr){o.hp-=s.damage;k+=s.damage;try{Report392.hit(Math.min(s.damage,o.hp+s.damage),s);}catch{}if(s.piercing){if(s.hit)s.hit.add(o);}else s.dead=true;o.fl=.08;}}}catch{}return k;}
 function boom(o,big){try{VisualFX.explode(o.x,o.y,big?.9:.6,'enemy');}catch{}}
 function step(){const t=+time||0;if(t<last-.25||last<0){R=[];T=[];last=t;return;}const dt=Math.max(0,Math.min(.1,t-last));last=t;if(mode!=='play'||dt<=0)return;/* dùng đồng hồ trận: khi thoại cốt truyện / tạm dừng làm đồng hồ đứng thì chướng ngại cũng đứng, không bắn */const ok=live(),noBoss=typeof boss==='undefined'||!boss;
  if(ok&&noBoss){tR-=dt;if(tR<=0){const re=rockEvery();tR=rnd(re[0],re[1]);if(R.length<C.rockMax)spawnRock();}tT-=dt;if(tT<=0){tT=turEvery();if(!T.length)spawnTur();}}
  for(const o of R){o.x+=o.vx*dt;o.y+=o.vy*dt;o.a+=o.va*dt;o.fl=Math.max(0,o.fl-dt);hitShots(o,o.z*.42);
   if(o.hp<=0&&!o.gone){o.gone=1;boom(o,true);try{const rv=on9()?G9.rewards.asteroidBreak:null;Safety31.push(drops,100,rv?{x:inX(o.x),y:o.y,type:'star',t:0,val:rv.starVal}:{x:o.x,y:o.y,type:'star',t:0});}catch{}ev9('hazard',{kind:'rock'});continue;}
   try{const dx=player.x-o.x,dy=player.y-o.y,rr=o.z*.38+8;if(dx*dx+dy*dy<rr*rr&&invuln<=0){damage('collision')/* V210: đo được va chạm = đúng 1 đòn đạn (5,64 = 5,64 ở ải 132) → đã đạt hazardAsteroidCollisionScaleVsBullet 1,0 */;o.gone=1;boom(o,false);}}catch{}}
  R=R.filter(o=>!o.gone&&o.y<H+80&&o.x>-80&&o.x<W+80);
  for(const o of T){o.y+=C.scroll*dt;o.fl=Math.max(0,o.fl-dt);hitShots(o,C.turSize*.42);
   if(o.hp<=0&&!o.gone){o.gone=1;boom(o,true);turReward(o);ev9('hazard',{kind:'turret'});continue;}
   try{o.ang=Math.atan2(player.y-o.y,player.x-o.x);o.cd-=dt;if(o.cd<=0&&o.y>40&&o.y<H*.62){o.cd=turFire();emit(o.x+Math.cos(o.ang)*18,o.y+Math.sin(o.ang)*18,o.ang,150,'orb');}}catch{}}
  for(const o of T)if(o.gone&&!o.paid2)GONE.set(o.pid,(GONE.get(o.pid)||0)+1);T=T.filter(o=>!o.gone&&o.y<H+60);}
 function turReward(o){if(!on9())return;const rw=G9.rewards,s1=rw.singleTurretBreak,x=inX(o.x);
  try{for(let k=0;k<s1.bigStarCount;k++)Safety31.push(drops,100,{x,y:o.y,type:'star',t:0,big:true,val:s1.bigStarVal});}catch{}
  try{if(Math.random()<s1.buffDropChance){const ty=s1.buffPool[Math.floor(Math.random()*s1.buffPool.length)];Safety31.push(drops,100,{x,y:o.y+18,type:ty,t:0});}}catch{}
  grant9(s1.directCredits);S9.cr+=s1.directCredits;S9.tur++;
  const mate=T.find(q=>q!==o&&q.pid===o.pid);if((mate&&mate.gone&&!mate.paid2)||(!mate&&GONE.get(o.pid))){if(mate)mate.paid2=1;o.paid2=1;GONE.delete(o.pid);const b2=rw.bothTurretsInPairCleared;
   if(b2.dropComboMedalV77){try{V77._drop(inX(o.x),o.y,true);}catch{}}grant9(b2.bonusDirectCredits);S9.cr+=b2.bonusDirectCredits;S9.pairs++;}}
 const S9={cr:0,tur:0,pairs:0},GONE=new Map();
 function draw(){if(!R.length&&!T.length)return;const rock=im('thien_thach'),base=im('thap_phao_de'),bar=im('thap_phao_nong');ctx.save();
  try{for(const o of R){ctx.save();ctx.translate(o.x,o.y);ctx.rotate(o.a);ctx.shadowColor='rgba(0,0,0,.85)';ctx.shadowBlur=10;/* bóng tối mềm để tách khỏi đá trang trí nền (không phải vòng sáng) */if(rock)ctx.drawImage(rock,-o.z/2,-o.z/2,o.z,o.z);else{ctx.fillStyle='#4a4e57';ctx.beginPath();ctx.arc(0,0,o.z*.42,0,6.3);ctx.fill();}ctx.shadowBlur=0;
    if(o.fl>0){ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.35;if(rock)ctx.drawImage(rock,-o.z/2,-o.z/2,o.z,o.z);}ctx.restore();}
   for(const o of T){const z=C.turSize;ctx.save();ctx.translate(o.x,o.y);if(base)ctx.drawImage(base,-z/2,-z/2,z,z);ctx.rotate(o.ang+Math.PI/2);if(bar)ctx.drawImage(bar,-z*.32,-z*.62,z*.64,z*.9);
    if(o.fl>0&&base){ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.3;ctx.rotate(-(o.ang+Math.PI/2));ctx.drawImage(base,-z/2,-z/2,z,z);}ctx.restore();}}catch{}ctx.restore();}
 try{const o=Report392.reset;Report392.reset=function(){R=[];T=[];tR=4;tT=10;last=-1;GONE.clear();S9.cr=0;S9.tur=0;S9.pairs=0;return o.apply(this,arguments);};}catch{}
 // khung hình: cập nhật sau mỗi bước trận; vẽ trong lớp nền (sau tranh nền chương)
 try{const o=runGameFrameC;runGameFrameC=function(){const r=o.apply(this,arguments);try{step();}catch{}return r;};}catch{}
 try{const od=NEN194.draw;NEN194.draw=function(){const r=od.apply(this,arguments);try{if(on())draw();}catch{}return r;};}catch{}
 return {C,S9,chCfg,_R:()=>R,_T:()=>T,state:()=>({rocks:R.length,turrets:T.length,live:live()}),_spawnRock:spawnRock,_spawnTur:spawnTur};
})();
window.HAZ208X=HAZ208;
