'use strict';
// V74 · FX16 — hiệu ứng chiến đấu theo bảng của Gemini (Đợt 16, bước 1–3, chỉ bằng code).
// Chỉ thay phần VẼ. Va chạm, hitbox, sát thương giữ nguyên.
//  1) Đạn địch 3 vòng (viền tối → vòng neon → lõi trắng 45%) theo bảng màu chương, đúc sẵn (stamp).
//  2) Đạn ta: luồng phụ mờ hơn, giảm đục khi chồng nhiều → hết "bức tường vàng".
//  3) Trúng đòn: tia lửa văng + chớp sáng quái 45 ms (nghỉ 90 ms).
//  4) Hạ tinh anh/boss: vòng sóng xung kích + rung màn có biên độ theo tình huống (trần 8 px).
//  5) Chấm tâm hitbox khi đạn địch tới gần.
const FX16=window.FX16||{
 enemyPalettes:[
  {id:'p1',chapters:[1,5],rim:'#1a000d',main:'#ff1e56',outer:'#ff758f'},
  {id:'p2',chapters:[2,6],rim:'#1f1400',main:'#ffbe0b',outer:'#ffee32'},
  {id:'p3',chapters:[3,7],rim:'#001a09',main:'#00f59b',outer:'#7bf1a8'},
  {id:'p4',chapters:[4,8,9],rim:'#0b001a',main:'#ff3326',outer:'#ffa060'}],
 extraPalettes:[{id:'p5',rim:'#12001f',main:'#c04dff',outer:'#e3a6ff'}],
 feedback:{hitSpark:{countMin:3,countMax:5,lifeMs:140,speedMin:180,speedMax:280,len:10,thickness:2,spawnCooldownPerEnemyMs:40},
  hitFlash:{durationMs:45,cooldownMs:90,alpha:.75},
  screenShake:{maxAmplitudePx:8,onEliteKill:{amp:2.5,ms:110},onPartOrBomb:{amp:5,ms:260},onPlayerHit:{amp:6,ms:220},onBossDestroy:{amp:8,ms:500}}},
 hierarchy:{playerMainBulletAlpha:1,playerSideBulletAlpha:.76,playerOverlapDecay:.8,playerHitboxDot:{radius:3.5,core:'#ffffff',rim:'#00f5d4'}}
};
const FX16Run=(()=>{
 const TAU=Math.PI*2,C=FX16;
 const SC=()=>(typeof W!=='undefined'&&W?W:480)/412;          // px màn 412 → px logic
 const lite=()=>{try{return VisualFX.counts().quality==='light';}catch{return false;}};
 const calm=()=>{try{return VisualFX.reduced();}catch{return false;}};
 const now=()=>performance.now();
 function cv(w,h){const c=document.createElement('canvas');c.width=w;c.height=h;return [c,c.getContext('2d')];}
 const rgb=h=>{const n=parseInt(h.slice(1,7),16);return [n>>16&255,n>>8&255,n&255];};
 const hexA=(h,a)=>{const [r,g,b]=rgb(h);return `rgba(${r},${g},${b},${a})`;};
 function hue(h){const [r,g,b]=rgb(h).map(v=>v/255),mx=Math.max(r,g,b),mn=Math.min(r,g,b),d=mx-mn;if(!d)return -1;let x=mx===r?((g-b)/d)%6:mx===g?(b-r)/d+2:(r-g)/d+4;return (x*60+360)%360;}
 const ALL=[...C.enemyPalettes,...(C.extraPalettes||[])];
 function chapter(){let lv=1;try{lv=typeof level!=='undefined'?level:1;}catch{}return Math.floor((Math.max(1,lv|0)-1)/20)+1;}
 function chapPal(){const ch=chapter();return C.enemyPalettes.find(p=>p.chapters.includes(ch))||C.enemyPalettes[(ch-1)%C.enemyPalettes.length];}
 const tintCache=new Map();
 function palOf(b){const t=(b.tint30||'').slice(0,7);if(!t)return chapPal();if(tintCache.has(t))return tintCache.get(t);const h=hue(t);let best=chapPal(),bd=1e9;if(h>=0)for(const p of ALL){const d=Math.abs(((hue(p.main)-h+540)%360)-180);if(d<bd){bd=d;best=p;}}tintCache.set(t,best);return best;}
 // ---------- 1) Stamp đạn địch ----------
 const stamps=new Map(),R=14;   // bán kính thân trong stamp 64×64
 function stamp(p,kind,glow){const key=p.id+kind+(glow?1:0);let c=stamps.get(key);if(c)return c;const [cc,g]=cv(64,64);c=cc;g.translate(32,32);
  if(glow){const GR=kind==='crescent'?22:31;g.save();if(kind==='crescent'){g.translate(0,-6);g.scale(1.3,.7);}const gr=g.createRadialGradient(0,0,R*.6,0,0,GR);gr.addColorStop(0,hexA(p.outer,.55));gr.addColorStop(.5,hexA(p.main,.18));gr.addColorStop(1,hexA(p.main,0));g.fillStyle=gr;g.beginPath();g.arc(0,0,GR,0,TAU);g.fill();g.restore();}
  const body=(sx,sy,rr)=>{g.save();g.scale(sx,sy);g.beginPath();g.arc(0,0,rr,0,TAU);g.restore();};
  if(kind==='needle'||kind==='rice'){const sx=kind==='needle'?.42:.58,sy=kind==='needle'?1.55:1.15;
   body(sx,sy,R+1.6);g.fillStyle=p.rim;g.fill();body(sx,sy,R);g.fillStyle=p.main;g.fill();body(sx*.8,sy*.86,R*.78);g.fillStyle=p.outer;g.fill();
   const cg=g.createRadialGradient(0,0,0,0,0,R*.5);cg.addColorStop(0,'#fff');cg.addColorStop(.7,'#ffffffee');cg.addColorStop(1,'#ffffff00');g.save();g.scale(sx,sy);g.fillStyle=cg;g.beginPath();g.arc(0,0,R*.55,0,TAU);g.fill();g.restore();}
  else if(kind==='crescent'){const arc=(r0,r1,a0,a1)=>{g.beginPath();g.arc(0,0,r0,a0,a1);g.arc(0,0,r1,a1,a0,true);g.closePath();};
   arc(R+2.5,R-7.5,-2.75,-.39);g.fillStyle=p.rim;g.fill();arc(R+1,R-6,-2.65,-.49);g.fillStyle=p.main;g.fill();arc(R-.5,R-3.5,-2.45,-.69);g.fillStyle='#ffffff';g.fill();}
  else{g.fillStyle=p.rim;g.beginPath();g.arc(0,0,R+1.6,0,TAU);g.fill();
   const mg=g.createRadialGradient(0,0,R*.4,0,0,R);mg.addColorStop(0,p.outer);mg.addColorStop(.75,p.main);mg.addColorStop(1,p.main);g.fillStyle=mg;g.beginPath();g.arc(0,0,R,0,TAU);g.fill();
   const cg=g.createRadialGradient(0,0,0,0,0,R*.5);cg.addColorStop(0,'#ffffff');cg.addColorStop(.75,'#ffffffee');cg.addColorStop(1,'#ffffff00');g.fillStyle=cg;g.beginPath();g.arc(0,0,R*.5,0,TAU);g.fill();
   if(kind==='ring'){g.globalCompositeOperation='destination-out';g.beginPath();g.arc(0,0,R*.32,0,TAU);g.fill();g.globalCompositeOperation='source-over';}}
  stamps.set(key,c);return c;}
 const kindOf=b=>b.type==='saw'?'saw':b.type==='needle'?'needle':(b.type==='crescent30'||b.type==='wave'||b.type==='feather28')?(window.BUL76CR===false?'crescent':'orb'):b.type==='rice'?'rice':'orb';
 let baseDraw=null;
 // V78.8 · đạn quái V2 (GPT ui18b): sprite lõi trắng viền màu mảnh, 6 màu × tròn/thoi/kim; không quầng, không đế tối. Tắt: window.BUL78=false
 const B78={};try{for(const k in (typeof BUL78_ART!=='undefined'?BUL78_ART:{})){const im=new Image();im.src=BUL78_ART[k];B78[k]=im;}}catch{}
 const hexHue=h=>{h=String(h||'').replace('#','');if(h.length<6)return -1;const r=parseInt(h.slice(0,2),16)/255,g=parseInt(h.slice(2,4),16)/255,bb=parseInt(h.slice(4,6),16)/255,mx=Math.max(r,g,bb),mn=Math.min(r,g,bb),d=mx-mn;if(d<.12)return -1;let hu=mx===r?((g-bb)/d)%6:mx===g?(bb-r)/d+2:(r-g)/d+4;hu*=60;return hu<0?hu+360:hu;};
 const colMemo=new Map();
 function col78(p){const k=p&&p.main;if(colMemo.has(k))return colMemo.get(k);const h=hexHue(k);const c=h<0?'white':h<18||h>=335?'red':h<55?'orange':h<170?'green':h<255?'blue':'purple';colMemo.set(k,c);return c;}
 function draw78(b,kind){if(window.BUL78===false)return false;const p=palOf(b),c=col78(p),sh=kind==='needle'||kind==='rice'?'needle':kind==='crescent'||(b.r>=8&&kind==='orb'&&(b.age||0)>=0&&b.splitter)?'diamond':'round';
  const im=B78[c+'_'+sh];if(!im||!im.complete||!im.naturalWidth)return false;const k=SC(),r=Math.max(3,b.r);let sz=(2*r*1.15+3*k)*64/56*(window.BUL78K||1);if(sh==='needle')sz*=1.25;
  ctx.save();ctx.translate(b.x,b.y);if(sh!=='round')ctx.rotate(Math.atan2(b.vy||1,b.vx||0)+Math.PI/2);ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1;ctx.drawImage(im,-sz/2,-sz/2,sz,sz);ctx.restore();near(b);return true;}
 function drawBullet(b){if(b.dead||!Number.isFinite(b.r))return;const kind=kindOf(b);if(kind==='saw'&&baseDraw)return baseDraw(b);if(draw78(b,kind))return;
  const p=palOf(b),k=SC(),r=Math.max(3,b.r),drawR=Math.max(6*k,r*1.45+1.6)*(window.BUL75||.82),/* V75: đạn quái to hơn ~50% cho dễ nhìn (chỉ hình vẽ, hitbox giữ nguyên) */big=r>=8,pul=big&&!calm()?1+.07*Math.sin((b.age||0)*12):1,s=drawR/R*pul,img=stamp(p,kind,!lite()),sz=64*s;
  ctx.save();ctx.translate(b.x,b.y);
  if(kind==='needle'||kind==='rice')ctx.rotate(Math.atan2(b.vy,b.vx)+Math.PI/2);else if(kind==='crescent')ctx.rotate(Math.atan2(b.vy,b.vx)+Math.PI/2);
  ctx.globalCompositeOperation='source-over';
  // REVIEW75 (Gemini): 3 lớp — đế tối rgba(0,0,0,.78) ≈1,37× bán kính vẽ, vỏ màu chương (tranh FX16), lõi trắng #fff 55%. Tắt: window.BUL75RIM=false
  const el=kind==='needle'||kind==='rice'?.55:1,shp=rad=>{ctx.beginPath();ctx.ellipse(0,0,Math.max(.5,rad*el),Math.max(.5,rad),0,0,TAU);};
  if(window.BUL75RIM!==false){ctx.globalAlpha=.7;ctx.fillStyle='#000';shp(drawR*(window.BUL75SH||.7));ctx.fill();}
  ctx.globalAlpha=1;ctx.drawImage(img,-sz/2,-sz/2,sz,sz);if(window.BUL75RIM!==false&&kind!=='crescent'){ctx.globalAlpha=.95;ctx.fillStyle='#fff';shp(drawR*.3);ctx.fill();ctx.globalAlpha=.9;ctx.strokeStyle='#fff';ctx.lineWidth=Math.max(1,.9*k);shp(drawR*.62);ctx.stroke();}else if(window.BUL75RIM!==false){ctx.globalAlpha=.95;ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(0,0,drawR*.26,0,TAU);ctx.fill();}ctx.restore();near(b);}
 // ---------- 5) chấm tâm hitbox ----------
 let nearT=0;
 function near(b){try{if(Math.abs(b.x-player.x)<48&&Math.abs(b.y-player.y)<48)nearT=now()+260;}catch{}}
 function drawDot(){let drag=false;try{drag=!!pointer;}catch{}if((now()>nearT&&!drag)||typeof player==='undefined'||mode!=='play')return;const d=C.hierarchy.playerHitboxDot,k=SC(),u=drag?1:Math.min(1,(nearT-now())/120);ctx.save();ctx.globalAlpha=u;ctx.fillStyle=d.rim;ctx.beginPath();ctx.arc(player.x,player.y,(d.radius+1.6)*k,0,TAU);ctx.fill();ctx.fillStyle=d.core;ctx.beginPath();ctx.arc(player.x,player.y,d.radius*k,0,TAU);ctx.fill();ctx.restore();}
 // ---------- 2) đạn ta: đục theo vị trí + chồng ----------
 let frameN=0,frameCx=0;
 function shotAlpha(s,list,k){const H=C.hierarchy;if(s===list[0]){frameN=list.length;let a=0;for(const q of list)a+=q.x;frameCx=list.length?a/list.length:0;}
  let al=Math.abs(s.x-frameCx)>16*(k||1)?H.playerSideBulletAlpha:H.playerMainBulletAlpha;if(frameN>48)al*=H.playerOverlapDecay;else if(frameN>28)al*=.86;return al;}
 function shotA2(s){const H=C.hierarchy;let n=0;try{n=shots.length;}catch{}let al=1;try{al=Math.abs(s.x-player.x)>22*SC()?H.playerSideBulletAlpha:H.playerMainBulletAlpha;}catch{}if(n>60)al*=H.playerOverlapDecay;else if(n>34)al*=.86;if(window.HANGAR_DEMO)al*=.62;return Math.max(.5,al);}
 // ---------- 3) tia lửa + chớp ----------
 const sparks=[];const MAXP=()=>lite()?45:180;
 function addSpark(x,y,col,n,spd=1,life){const F=C.feedback.hitSpark,k=SC();for(let i=0;i<n;i++){if(sparks.length>=MAXP())sparks.shift();const a=-Math.PI/2+(Math.random()-.5)*TAU*(55/180)+(Math.random()<.5?0:Math.PI),v=(F.speedMin+Math.random()*(F.speedMax-F.speedMin))*k*spd;sparks.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,t:0,life:(life||F.lifeMs)/1000,c:col});}}
 function onHit(e,amount,s){if(!e||calm())return;const t=now(),F=C.feedback;
  if(!e.fx16c||t>e.fx16c){e.fx16c=t+F.hitSpark.spawnCooldownPerEnemyMs;const col=(s&&(s.color||s.col))||'#ffc86a';{const cc=typeof col==='string'&&col[0]==='#'?col.slice(0,7):'#ffc86a';if(Math.random()<.45)addSpr(sparkKind(cc),e.x+(Math.random()-.5)*16,e.y+6+(Math.random()-.5)*10,(22+Math.random()*12)*SC(),150);}addSpark(e.x+(Math.random()-.5)*14,e.y+8,typeof col==='string'?col.slice(0,7):'#ffc86a',F.hitSpark.countMin+Math.floor(Math.random()*(F.hitSpark.countMax-F.hitSpark.countMin+1)));}
  if(!e.fx16n||t>e.fx16n){e.fx16f=t+F.hitFlash.durationMs;e.fx16n=t+F.hitFlash.durationMs+F.hitFlash.cooldownMs;}}
 function flashDraw(orig,e){if(!e||!e.fx16f||now()>e.fx16f||calm())return;ctx.save();ctx.globalCompositeOperation='lighter';ctx.globalAlpha=C.feedback.hitFlash.alpha*.6;try{orig(e);}catch{}ctx.restore();}
 // ---------- 4) sóng xung kích + rung ----------
 const waves=[];let shakeAmp=0,shakeEnd=0;
 function addShake(o){if(!o||calm())return;const t=now();if(t>shakeEnd)shakeAmp=0;shakeAmp=Math.min(C.feedback.screenShake.maxAmplitudePx,Math.max(shakeAmp,o.amp));shakeEnd=Math.max(shakeEnd,t+o.ms);try{shake=Math.max(shake,o.ms/1000);}catch{}}
 function amp(){const t=now();if(t>shakeEnd){shakeAmp=0;return 3;}const k=SC();return Math.max(1,shakeAmp*k*Math.min(1,(shakeEnd-t)/180+.35));}
 function addWave(x,y,r0,r1,ms,col,w){if(lite()&&r1<150)return;if(waves.length>12)waves.shift();waves.push({x,y,r0,r1,t:0,life:ms/1000,col,w});}
 function onKill(e){if(!e||calm())return;if(window.FX100!==false&&!(e.isBoss||e.boss||e.bossPart||(typeof boss!=='undefined'&&e===boss)))return;// V100 chủ dự án: chỉ boss / mini boss có hiệu ứng nổ
const k=SC();
  if(e===boss||e.isBoss){const sz=Math.max(200*k,(e.r||e.w||90)*2.6);addExp('boss',e.x,e.y,sz,760,0);setTimeout(()=>{try{addExp('elite',e.x-sz*.28,e.y+sz*.12,sz*.5,520);addExp('elite',e.x+sz*.3,e.y-sz*.1,sz*.45,520);}catch{}},160);
   if(!addRing(2,e.x,e.y,40*k,460*k,760,'#ffd36b'))addWave(e.x,e.y,20*k,220*k,700,'#fff1c0',7);addRing(1,e.x,e.y,20*k,300*k,560,'#ffffff');addSpark(e.x,e.y,'#ffd36b',lite()?8:22,1.6,420);addDebris(e.x,e.y,8,1.4);addShake(C.feedback.screenShake.onBossDestroy);}
  else if(e.elite||e.large){const sz=Math.max(90*k,(e.r||30)*3.2);addExp('elite',e.x,e.y,sz,500);if(!addRing(1,e.x,e.y,14*k,150*k,340,'#ffd36b'))addWave(e.x,e.y,10*k,78*k,300,'#fff4cf',5);addSpark(e.x,e.y,'#ffb84c',lite()?4:10,1.2,260);addDebris(e.x,e.y,3,1);addShake(C.feedback.screenShake.onEliteKill);}
  else{const sz=Math.max(48*k,(e.r||16)*3.4);if(!addExp('small',e.x,e.y,sz,380))addWave(e.x,e.y,6*k,34*k,220,'#ffe7b0',2);addSpark(e.x,e.y,'#ff9a3a',lite()?2:4,1,200);if(Math.random()<.35)addDebris(e.x,e.y,1,.8);}}
 // ---------- 16.1 sprite nổ / tia / mảnh vỡ / sóng (GPT) ----------
 const ART=(()=>{const A=(typeof FX16_ART!=="undefined"&&FX16_ART)||window.FX16_ART||{},m={};for(const k in A){const i=new Image();i.src=A[k];m[k]=i;}return m;})();
 const seq=n=>[1,2,3,4,5,6].map(i=>ART['exp_'+n+'_0'+i]).filter(Boolean);
 const EXP={small:seq('small'),elite:seq('elite'),boss:seq('boss')};
 const ok=i=>i&&i.complete&&i.naturalWidth>0;
 const sprs=[],debris=[];const tintC=new Map();
 function tinted(img,col){if(!ok(img))return null;const key=img.src.length+col+img.src.slice(-24);let c=tintC.get(key);if(c)return c;const [cc,g]=cv(img.naturalWidth,img.naturalHeight);g.drawImage(img,0,0);g.globalCompositeOperation='source-atop';g.globalAlpha=.55;g.fillStyle=col;g.fillRect(0,0,cc.width,cc.height);tintC.set(key,cc);return cc;}
 function addExp(kind,x,y,size,ms,rot){const fr=EXP[kind];if(!fr||!fr.length)return false;if(sprs.length>40)sprs.shift();sprs.push({fr,x,y,size,t:0,life:ms/1000,rot:rot??Math.random()*TAU});return true;}
 function addRing(n,x,y,s0,s1,ms,col){const im=ART['shockwave_0'+n];if(!ok(im))return false;if(sprs.length>40)sprs.shift();sprs.push({ring:tinted(im,col)||im,x,y,s0,s1,t:0,life:ms/1000,rot:Math.random()*TAU});return true;}
 function addSpr(k,x,y,size,ms){const im=ART[k];if(!ok(im)||lite())return;if(sprs.length>40)sprs.shift();sprs.push({one:im,x,y,size,t:0,life:ms/1000,rot:Math.random()*TAU});}
 function addDebris(x,y,n,spd){if(lite())return;const k=SC();for(let i=0;i<n;i++){const im=ART['debris_0'+(1+(Math.random()*4|0))];if(!ok(im))continue;if(debris.length>30)debris.shift();const a=Math.random()*TAU,v=(90+Math.random()*160)*k*spd;debris.push({im,x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-40*k,rot:Math.random()*TAU,vr:(Math.random()-.5)*10,sz:(14+Math.random()*12)*k,t:0,life:.7+Math.random()*.4});}}
 function sparkKind(col){const h=hue(col||'#ffc86a');if(h<0)return 'spark_fire';if(h>=170&&h<215)return 'spark_ice';if(h>=215&&h<290)return 'spark_elec';if(h>=290||h<12)return 'spark_slash';return 'spark_fire';}
 // 16.3: hiệu ứng một lần có tỉ lệ/alpha theo thời gian
 function addFx(k,x,y,s0,s1,ms,o={}){const im=ART[k];if(!ok(im))return false;if(sprs.length>40)sprs.shift();sprs.push({gen:o.col?(tinted(im,o.col)||im):im,x,y,s0,s1,t:0,life:ms/1000,rot:o.rot??0,vr:o.vr||0,al:o.alpha??1,comp:o.comp||'lighter',ease:o.ease||'out',follow:o.follow});return true;}
 function addShards(x,y,n,keys,spd=1){if(lite())n=Math.min(n,3);const k=SC();for(let i=0;i<n;i++){const im=ART[keys[i%keys.length]];if(!ok(im))continue;if(debris.length>30)debris.shift();const a=i/n*TAU+Math.random()*.4,v=(160+Math.random()*120)*k*spd;debris.push({im,x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,rot:Math.random()*TAU,vr:(Math.random()-.5)*8,sz:(22+Math.random()*14)*k,t:0,life:.45+Math.random()*.25,nog:1});}}
 // ---------- 16.3 · bom EMP, khiên, cánh Bạo Tẩu ----------
 function onBomb(){const k=SC(),x=player.x,y=player.y,R=Math.hypot(W,H)*1.15;addFx('bomb_core',x,y,40*k,300*k,560,{vr:1.2});addFx('bomb_hexring',x,y,60*k,R,720,{col:'#00f5d4',alpha:.95,ease:'out'});addFx('bomb_hexring',x,y,30*k,R*.6,560,{col:'#9bffd4',alpha:.7,rot:.5});}
 function onShield(a,b){if(!(b<a))return;const k=SC();addFx('shield_dome',player.x,player.y,76*k,84*k,380,{comp:'source-over',alpha:.85,follow:1});addFx('shield_ripple',player.x,player.y,34*k,110*k,320,{follow:1});
  if(b<=0){addShards(player.x,player.y,8,['shield_shard_01','shield_shard_02'],1);addFx('shield_ripple',player.x,player.y,50*k,240*k,380,{alpha:.9});}}
 let odOn=0,odT0=0;
 function drawWings(){if(window.__clean118||window.WING125!==true)return;/* V125: bỏ cánh năng lượng */let st=0;try{st=(mode==='play'||mode==='pause')?superTime:0;}catch{}if(!(st>0)){odOn=0;return;}const t=now();if(!odOn){odOn=1;odT0=t;}
  let rb=false;try{rb=!!(Combat26.state().skill);}catch{}const im=ART[rb?'od_wings_rainbow':'od_wings_gold'];if(!ok(im))return;const k=SC(),age=(t-odT0)/1000,op=Math.min(1,age/.22),blink=st<1?(.45+.55*Math.abs(Math.sin(t/60))):1;
  const w=196*k*(.35+.65*op),h=w*.75,flap=1+.04*Math.sin(t/180);ctx.save();ctx.globalCompositeOperation=lite()?'source-over':'lighter';ctx.globalAlpha=.4*blink*op;ctx.translate(player.x,player.y+12*k);ctx.scale(flap,1);ctx.drawImage(im,-w/2,-h/2,w,h);ctx.restore();}
 function drawSprites(step){if(!sprs.length&&!debris.length)return;const k=SC();ctx.save();
  for(const d of debris){d.t+=step;d.x+=d.vx*step;d.y+=d.vy*step;if(!d.nog)d.vy+=220*k*step;d.vx*=Math.exp(-step*1.5);d.rot+=d.vr*step;const u=d.t/d.life;if(u>=1)continue;ctx.save();ctx.globalAlpha=Math.min(1,(1-u)*1.6);ctx.translate(d.x,d.y);ctx.rotate(d.rot);ctx.drawImage(d.im,-d.sz/2,-d.sz/2,d.sz,d.sz);ctx.restore();}
  for(let i=debris.length-1;i>=0;i--)if(debris[i].t>=debris[i].life)debris.splice(i,1);
  ctx.globalCompositeOperation=lite()?'source-over':'lighter';
  for(const s of sprs){s.t+=step;const u=s.t/s.life;if(u>=1)continue;if(s.follow){try{s.x=player.x;s.y=player.y;}catch{}}ctx.save();ctx.globalCompositeOperation=s.fr||lite()?'source-over':'lighter';ctx.translate(s.x,s.y);ctx.rotate(s.rot);
   if(s.fr){const f=s.fr[Math.min(s.fr.length-1,(u*s.fr.length)|0)];if(ok(f)){ctx.globalAlpha=u>.75?(1-u)*4:1;const z=s.size*(.9+u*.25);ctx.drawImage(f,-z/2,-z/2,z,z);}}
   else if(s.ring){const z=s.s0+(s.s1-s.s0)*(1-(1-u)*(1-u));ctx.globalAlpha=(1-u)*.9;ctx.drawImage(s.ring,-z/2,-z/2,z,z);}
   else if(s.gen){const e=s.ease==='in'?u*u:1-(1-u)*(1-u),z=s.s0+(s.s1-s.s0)*e;ctx.globalCompositeOperation=lite()&&s.comp==='lighter'?'source-over':s.comp;ctx.rotate(s.vr*s.t);ctx.globalAlpha=s.al*(u<.15?u/.15:1)*(1-Math.max(0,(u-.55)/.45));ctx.drawImage(s.gen,-z/2,-z/2,z,z);}
   else if(s.one){ctx.globalAlpha=1-u;const z=s.size*(.7+u*.6);ctx.drawImage(s.one,-z/2,-z/2,z,z);}
   ctx.restore();}
  for(let i=sprs.length-1;i>=0;i--)if(sprs[i].t>=sprs[i].life)sprs.splice(i,1);ctx.restore();}
 let lastT=0;
 function drawFX(){try{if(typeof boss!=='undefined'&&boss&&boss.defeatStarted&&!boss.fx16d){boss.fx16d=1;boss.isBoss=1;onKill(boss);}}catch{}const t=now(),dt=lastT?Math.min(.05,(t-lastT)/1000):0;lastT=t;const step=(typeof mode!=='undefined'&&mode==='pause')?0:dt;try{drawWings();}catch{}drawSprites(step);if(!sparks.length&&!waves.length)return;
  ctx.save();ctx.globalCompositeOperation=lite()?'source-over':'lighter';ctx.lineCap='round';const F=C.feedback.hitSpark,k=SC();
  for(const w of waves){w.t+=step;const u=Math.min(1,w.t/w.life),r=w.r0+(w.r1-w.r0)*(1-(1-u)*(1-u));ctx.globalAlpha=(1-u)*.85;ctx.strokeStyle=w.col;ctx.lineWidth=Math.max(.5,w.w*(1-u))*k;ctx.beginPath();ctx.arc(w.x,w.y,r,0,TAU);ctx.stroke();}
  for(let i=waves.length-1;i>=0;i--)if(waves[i].t>=waves[i].life)waves.splice(i,1);
  for(const s of sparks){s.t+=step;s.x+=s.vx*step;s.y+=s.vy*step;s.vx*=Math.exp(-step*4);s.vy*=Math.exp(-step*4);const u=s.t/s.life;if(u>=1)continue;const L=F.len*k*(1-u*.5)/Math.max(1,Math.hypot(s.vx,s.vy));ctx.globalAlpha=1-u;ctx.strokeStyle=s.c;ctx.lineWidth=F.thickness*k*(1-u*.6);ctx.beginPath();ctx.moveTo(s.x,s.y);ctx.lineTo(s.x-s.vx*L,s.y-s.vy*L);ctx.stroke();
   if(!lite()&&u<.4){ctx.strokeStyle='#ffffff';ctx.lineWidth=.8*k;ctx.beginPath();ctx.moveTo(s.x,s.y);ctx.lineTo(s.x-s.vx*L*.5,s.y-s.vy*L*.5);ctx.stroke();}}
  for(let i=sparks.length-1;i>=0;i--)if(sparks[i].t>=sparks[i].life)sparks.splice(i,1);ctx.restore();}
 // ---------- cài đặt ----------
 let on=false;
 function install(){if(on)return;on=true;
  try{baseDraw=Threat30.draw;Threat30.draw=function(b){try{drawBullet(b);}catch(e){baseDraw&&baseDraw(b);}};}catch{}
  try{const f28=Fighters28.draw;Fighters28.draw=function(c,s){const a=c.globalAlpha;c.globalAlpha=a*shotA2(s);try{return f28.apply(this,arguments);}finally{c.globalAlpha=a;}};}catch{}
  try{const d=Feedback31.damage;Feedback31.damage=function(e,amount,s){try{onHit(e,amount,s);}catch{}return d.apply(this,arguments);};}catch{}
  try{const de=EnemyFleet.drawEnemy;EnemyFleet.drawEnemy=function(e){const r=de.apply(this,arguments);try{flashDraw(de,e);}catch{}return r;};}catch{}
  try{const db=EnemyFleet.drawBoss;EnemyFleet.drawBoss=function(b){const r=db.apply(this,arguments);try{flashDraw(db,b);}catch{}return r;};}catch{}
  try{const vd=VisualFX.draw;VisualFX.draw=function(){const r=vd.apply(this,arguments);try{drawFX();}catch{}return r;};}catch{}
  try{const rc=Render27.core;Render27.core=function(){const r=rc.apply(this,arguments);try{drawDot();}catch{}return r;};}catch{}
  try{const d0=window.damage;if(typeof d0==='function'){window.damage=function(){let iv=0;try{iv=invuln;}catch{}let sh0=0;try{sh0=shield;}catch{}const r=d0.apply(this,arguments);try{if(invuln>iv+.05)addShake(C.feedback.screenShake.onPlayerHit);}catch{}try{onShield(sh0,shield);}catch{}return r;};}}catch{}
  try{const b0=window.bomb;if(typeof b0==='function'){window.bomb=function(){let n0=0;try{n0=bombs;}catch{}const r=b0.apply(this,arguments);try{addShake(C.feedback.screenShake.onPartOrBomb);}catch{}try{if(bombs<n0)onBomb();}catch{}return r;};}}catch{}
  try{const k0=window.kill;if(typeof k0==='function'){window.kill=function(e){const was=e&&!e.dead;const r=k0.apply(this,arguments);try{if(was&&e.dead)onKill(e);}catch{}return r;};}}catch{}
 }
 return {install,onKill,onHit,addShake,amp,addFx,addShards,onBomb,onShield,art:k=>ART[k],shotAlpha,palOf,chapPal,state:()=>({fn:frameN,calm:calm(),lite:lite(),sparks:sparks.length,waves:waves.length,amp:shakeAmp,stamps:stamps.size,sprs:sprs.length,debris:debris.length,art:Object.keys(ART).length})};
})();
window.FX16A=(s,list,k)=>FX16Run.shotAlpha(s,list,k);
window.FX16S=()=>FX16Run.amp();
// ---------- 16.2 · đạn ta theo tranh GPT (10 chiến cơ × 3 nấc, chớp nòng, laser) ----------
// Tắt: window.FX16PB=false. Chỉ đổi phần vẽ; quỹ đạo, va chạm, sát thương giữ nguyên.
const PB16=(()=>{
 const TAU=Math.PI*2;let A={};try{A=(typeof FX16_ART!=='undefined'&&FX16_ART)||{};}catch{}
 const IM={};for(const k in A)if(k.startsWith('pb_')||k.startsWith('beam_')){const i=new Image();i.src=A[k];IM[k]=i;}
 const ok=i=>i&&i.complete&&i.naturalWidth>0;
 const on=()=>window.FX16PB!==false;
 const k0=()=>(typeof W!=='undefined'&&W?W:480)/412;
 const lite=()=>{try{return VisualFX.counts().quality==='light';}catch{return false;}};
 const quiet=()=>{try{return VisualFX.reduced();}catch{return false;}};
 const vivid=()=>{try{return VIVID68.on;}catch{return false;}};
 const tierOf=l=>l>=4?3:l>=2?2:1;
 // nấc gần nhất có tranh (tàu 1 chỉ có t1,t2; tàu 5 chỉ có t1)
 function spr(id,l){if(l>=4){try{if(Rank36.grade()==='SS'){const i=IM['pb_'+id+'_ss'];if(ok(i))return [i,3];}}catch{}}/* V122: đạn SS */for(let t=tierOf(l);t>=1;t--){const i=IM['pb_'+id+'_t'+t];if(ok(i))return [i,t];}return [null,0];}
 const HT={1:46,2:54,3:62};
 const SW={};function swapRB(im,key){let c=SW[key];if(c)return c;try{c=document.createElement('canvas');c.width=im.naturalWidth;c.height=im.naturalHeight;const x=c.getContext('2d');x.drawImage(im,0,0);const d=x.getImageData(0,0,c.width,c.height),q=d.data;for(let j=0;j<q.length;j+=4){const r=q[j];q[j]=q[j+2];q[j+2]=r;}x.putImageData(d,0,0);}catch{c=im;}SW[key]=c;return c;}/* V125: tàu 12 dòng thứ hai vàng → lam */
 function bullet(g,s){const id=(s.art28??0)%10;let [im,t]=spr(id,s.level30||0);if(!im)return false;if(id===3&&window.Fx215)im=Fx215.lime(im,'pb3_'+t+'_'+(im.src||'').length);/* V215: đạn tàu 4 hồng → lục acid */if(s.p120&&s.p120.c==='#3de6ff'&&window.TINT125!==false)im=swapRB(im,id+'_'+t+'_'+im.src.length);const k=k0(),sc=s.scale30||1,v=vivid()?(VIVID68.size||1):1;
  const l=s.level30||0,many=[0,2,4,7,8,9].includes(id),dn=many?(l>=4?.6:l>=3?.74:l>=2?.88:1):(id===3&&l>=4?.8:1);let H=HT[t]*k*(.92+.08*Math.min(2,sc))*v*dn,Wd=H*.75;const Q7=window.SHOT117&&SHOT117.on?SHOT117:null,K7=Q7?['plume','beam','shard','needle','shard','beam','crescent','plume','petal','orb'][id%10]:null;if(l>=3&&window.SIZE122!==false){H*=1.15;Wd*=1.15;}/* V122 B6 */if(Q7&&l>=4){const nw=typeof SHIP118!=='undefined'&&SHIP118[id];/* V118: đạn tranh mới đã thon sẵn → không bóp ngang nữa */const f=Q7.l4(sc),q=nw?[1,1]:(Q7.ws(K7)||[1,1]);Wd*=f*q[0];H*=f*q[1];}const sp=Math.hypot(s.vx||0,s.vy||0),st=1+Math.min(Q7?Q7.st(K7)-1:.25,.25,sp/4000),a=Math.atan2(s.vy||-1,s.vx||0)+Math.PI/2;
  g.save();g.translate(s.x,s.y);g.rotate(a);g.globalCompositeOperation=vivid()?'source-over':'lighter';g.globalAlpha*=(window.PB76A??1)*(window.HANGAR_DEMO?.5:1);if(Q7&&Q7.boss())g.globalAlpha*=Q7.al(s,K7);else if(t===3)g.globalAlpha*=vivid()?.8:.6;
  const R9=window.HOP4309!==false&&typeof activeRobot!=='undefined'&&activeRobot&&activeRobot.super&&!(typeof superTime!=='undefined'&&superTime>0);if(R9)Wd*=1.42;/* V309 Lượt 4: Chiến Thần Hợp Thể dạng chiến cơ — cột đạn dày +42 % + lõi trắng gắt. Tắt: window.HOP4309=false */
  g.drawImage(im,-Wd/2,-H*.44*st,Wd,H*st);if(R9){g.globalCompositeOperation='lighter';g.globalAlpha=Math.min(1,g.globalAlpha*1.4);g.fillStyle='rgba(255,255,255,.75)';g.beginPath();g.ellipse(0,-H*.44*st+H*st*.46,Wd*.1,H*st*.34,0,0,6.283);g.fill();}g.restore();return true;}
 function contactY(s){let c=null;if(s.hit)for(const e of s.hit)if(e&&!e.dead&&e.hp>0&&Number.isFinite(e.y)&&e.y<=s.y&&(!c||e.y>c.y))c=e;return c?c.y:null;}
 function beam(g,s,orig){const id=(s.art28??0)%10,l=s.level30||0,big=(id===1&&l>=4)||(id===5&&l>=2),body=IM['beam_'+id+'_body'],tip=IM['beam_'+id+'_tip'];
  const fade=(s.life28>0?Math.max(0,Math.min(1,(s.life28-s.age)/.04)):1)*((s.p120&&s.p120.va)||1),y=Math.max(0,s.y),w=Math.max(2,s.r||3)*((s.p120&&s.p120.vw)||1),k=k0(),clock=typeof time==='number'?time:0;
  if(!ok(body))return orig();
  if(!big){const r=drawBody(g,s,body,tip,fade,y,w*.8,k,clock,id,0);const [im]=spr(id,l);if(im&&!quiet()&&(!lite()||id===1)){g.save();g.globalCompositeOperation=vivid()?'source-over':'lighter';const H=34*k,step=58*k,n=Math.ceil(y/step)+1;for(let j=0;j<n;j++){const yy=y-((clock*620+j*step)%(n*step));if(yy<0||yy>y)continue;g.globalAlpha=fade*.85;g.drawImage(im,s.x-H*.375,yy-H*.44,H*.75,H);}g.restore();}return r;}
  const r2=drawBody(g,s,body,tip,fade,y,w*(l>=4?1.15:1),k,clock,id,1);if(id===1&&window.PIP126!==false&&!quiet()){const [im]=spr(id,l);if(im){g.save();g.globalCompositeOperation=vivid()?'source-over':'lighter';const H=40*k,step=64*k,n=Math.ceil(y/step)+1;for(let j=0;j<n;j++){const yy=y-((clock*680+j*step)%(n*step));if(yy<0||yy>y)continue;g.globalAlpha=fade*.8;g.drawImage(im,s.x-H*.375,yy-H*.44,H*.75,H);}g.restore();}}/* V126: tia lớn tàu 2 có hạt đạn tranh mới chạy dọc */return r2;}
 function drawBody(g,s,body,tip,fade,y,w,k,clock,id,big){const bw=w*7.5,th=bw*4;g.save();g.globalCompositeOperation=vivid()?'source-over':'lighter';g.globalAlpha=fade;
  const off=(clock*900)%th;for(let yy=y+off;yy>-th;yy-=th){const top=yy-th;if(top>y)continue;const y0=Math.max(top,0),y1=Math.min(yy,y);if(y1<=y0)continue;const sy=(y0-top)/th*256,sh=(y1-y0)/th*256;g.drawImage(body,0,sy,64,sh,s.x-bw/2,y0,bw,y1-y0);}
  const cy=contactY(s);if(ok(tip)&&(big||cy!=null)){const r=bw*1.15*(1+.12*Math.sin(clock*40));g.drawImage(tip,s.x-r,(cy??0)-r,r*2,r*2);}
  const m=IM['pb_'+id+'_muzzle'];if(ok(m)){const r=bw*.8;g.globalAlpha=fade*.9;g.drawImage(m,s.x-r,y-r,r*2,r*2);}
  g.restore();return true;}
 let mz={t:-9,id:0,l:0};
 function install(){if(typeof Arsenal30==='undefined')return;
  const od=Arsenal30.draw;Arsenal30.draw=function(g,s){try{if(on()&&s&&s.level30!==undefined){if(s.ray28)return beam(g,s,()=>od.apply(this,[g,s]));{let n=0;try{n=shots.length;}catch{}const sc=window.PB79SC===false?1:n>44?.76:n>28?.86:1;if(sc<1){g.save();g.translate(s.x,s.y);g.scale(sc,sc);g.translate(-s.x,-s.y);try{if(bullet(g,s))return true;}finally{g.restore();}}else if(bullet(g,s))return true;}}/* V79 (GPT P0): đạn chính dày (vd. Bán Nguyệt SS) thu nhỏ hình vẽ 14–24% khi >28 viên — hitbox, sát thương giữ nguyên */}catch(e){}return od.apply(this,arguments);};
  try{const ol=PlayerFXB.laser;PlayerFXB.laser=function(s){try{if(on()&&s&&s.level30!==undefined)return beam(ctx,s,()=>ol.apply(this,[s]));}catch{}return ol.apply(this,arguments);};}catch{}
  const of=Arsenal30.fire;Arsenal30.fire=function(fusion=false){const r=of.apply(this,arguments);try{mz={t:typeof time==='number'?time:0,id:(fusion&&activeRobot?activeRobot.artIndex%9:selected)%10,l:Arsenal30.p()};}catch{}return r;};
  try{const dm=ShotV2.drawMuzzle;ShotV2.drawMuzzle=function(){try{const im=IM['pb_'+mz.id+'_muzzle'];if(on()&&ok(im)&&!quiet()&&typeof time==='number'){const age=time-mz.t;if(age<0||age>.07||mode!=='play')return;const r=(13+mz.l*3.5)*k0()*(1-age/.07*.35);ctx.save();ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.9*(1-age/.07);ctx.translate(player.x,player.y-30);ctx.rotate((mz.t*37)%TAU*.15);ctx.drawImage(mz.id===3&&window.Fx215?Fx215.lime(im,'mz3'):im,-r,-r,r*2,r*2);ctx.restore();return;}}catch{}return dm.apply(this,arguments);};}catch{}}
 return {install,state:()=>({imgs:Object.keys(IM).length,ready:Object.values(IM).filter(ok).length,mz})};
})();
setTimeout(()=>{try{FX16Run.install();PB16.install();}catch(e){console.warn('FX16',e);}},0);
