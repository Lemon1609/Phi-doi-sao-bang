'use strict';
// V307 · hiệu ứng + cơ chế trang bị theo chỉ thị Gemini (19/11, chủ dự án chọn "thêm đủ cơ chế"). Vẽ trên canvas trận sau Equipment25.draw.
//  GIÁP: lá chắn lục giác r 44 khi đang có khiên (shield / khiên chắn đạn / giáp chặn), màu theo dòng:
//        điện–phản đòn (Kính Phản, Dịch Pha, Long Viêm, Thánh Quang) tím–cyan + tia điện · sinh mệnh (Nano, Thiên Ân) lục + hạt bay ·
//        từ trường (Quỹ Đạo, Vực Tối) vàng + sóng giãn · còn lại (Thành Trì) cyan.
//        VỠ KHIÊN: khiên vừa mất → sóng xung kích 150 px trong 0,35 s, xóa đạn địch trong vòng, đẩy lùi quái thường (hồi 1,2 s).
//  TÊN LỬA: đầu đạn to 1,25×, đuôi lửa gradient theo dòng (hỏa ngục / thiên tinh cam–đỏ · hư không / xoắn ốc tím–hồng · hàn sương / lôi kích băng),
//        trúng đích: vòng sóng 10 → 48 px trong 0,22 s + 6–8 tia lửa.
//  VŨ KHÍ PHỤ (2 tàu con): hào quang theo bậc dưới tàu con · Pháo Điện Từ / Quang Thương: sét nhảy thêm tối đa 2 quái (35 % sát thương viên) ·
//        Đĩa Nguyệt Nhận: đĩa sáng xoay · Hàn Băng / Thiên Hoàn: vùng sương băng tại điểm trúng + phủ lam lên quái đang chậm.
//  Tắt: window.TB307=false · từng phần: TB307ARMOR / TB307BREAK / TB307MIS / TB307SIDE / TB307CHAIN = false
(()=>{const CFG={hexR:44,breakR:150,breakT:.35,breakCd:1.2,push:46,misK:1.25,ringT:.22,chainN:2,chainR:130,chainK:.35};window.TB307CFG=CFG;
 const off=k=>window.TB307===false||window[k]===false;
 const ARM={mirror:'elec',phase:'elec',reactive:'elec',nanite:'life',orbital:'mag'};
 const ACOL={elec:['#B388FF','#00E5FF'],life:['#00E676','#9dffcf'],mag:['#FFD600','#fff2a0'],base:['#4fd8ff','#bff4ff']};
 const MIS={inferno:'fire',stellar:'fire',singularity:'void',spiral:'void',cryo:'ice',thunder:'ice'};
 const MCOL={fire:['#FF3D00','#FFD600'],void:['#D500F9','#82B1FF'],ice:['#00E5FF','#FFFFFF']};
 const TIERC=['#cfd8e3','#3ee08f','#3aa8ff','#b45cff','#ffd34a'];
 const beh=i=>{try{return (GearCatalog[i.variant]&&GearCatalog[i.variant].behavior)||i.variant;}catch{return '';}};
 const item=k=>{try{return (gear.equipment||[]).find(i=>i.kind===k)||null;}catch{return null;}};
 const now=()=>{try{return time;}catch{return performance.now()/1000;}};
 let wasOn=false,breakFx=null,lastBreak=-9,parts=[],rings=[],arcs=[],frost=[],track=new Map(),hexCache={};
 function shieldOn(){try{return shield>0||bulletShieldTime>0||(Equipment25.blocksBullet&&Equipment25.blocksBullet());}catch{return false;}}
 function hexTex(col){if(hexCache[col])return hexCache[col];const c=document.createElement('canvas');c.width=c.height=128;const g=c.getContext('2d');g.strokeStyle=col;g.lineWidth=1.4;const s=9,h=s*Math.sqrt(3);
  for(let y=-h;y<140;y+=h)for(let x=-s*3,o=0;x<140;x+=s*1.5,o^=1){const cy=y+(o?h/2:0);g.beginPath();for(let k=0;k<6;k++){const a=k*Math.PI/3;g[k?'lineTo':'moveTo'](x+Math.cos(a)*s,cy+Math.sin(a)*s);}g.closePath();g.stroke();}return hexCache[col]=c;}
 function drawShield(t){const a=item('armor');const fam=a?(ARM[beh(a)]||'base'):'base',[c1,c2]=ACOL[fam],R=CFG.hexR,x=player.x,y=player.y;
  ctx.save();ctx.translate(x,y);ctx.globalCompositeOperation='lighter';
  const g=ctx.createRadialGradient(0,0,R*.55,0,0,R);g.addColorStop(0,c1+'00');g.addColorStop(.8,c1+'44');g.addColorStop(1,c2+'cc');ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,0,R,0,6.283);ctx.fill();
  ctx.save();ctx.beginPath();ctx.arc(0,0,R-1,0,6.283);ctx.clip();ctx.globalAlpha=.5+.1*Math.sin(t*3);ctx.rotate(t*.15);ctx.drawImage(hexTex(c1),-64,-64,128,128);ctx.restore();
  ctx.globalAlpha=.95;ctx.strokeStyle=c1;ctx.lineWidth=2.2;ctx.beginPath();ctx.arc(0,0,R,0,6.283);ctx.stroke();
  if(fam==='mag'){const p=(t*.9)%1;ctx.globalAlpha=(1-p)*.6;ctx.strokeStyle=c1;ctx.lineWidth=2;ctx.beginPath();ctx.arc(0,0,R+p*22,0,6.283);ctx.stroke();}
  if(fam==='elec'&&Math.random()<.18){const a0=Math.random()*6.283;ctx.globalAlpha=.9;ctx.strokeStyle='#e6fbff';ctx.lineWidth=1.2;ctx.beginPath();let px=Math.cos(a0)*R,py=Math.sin(a0)*R;ctx.moveTo(px,py);for(let k=0;k<4;k++){px+=Math.cos(a0+1.6)*6+(Math.random()-.5)*8;py+=Math.sin(a0+1.6)*6+(Math.random()-.5)*8;ctx.lineTo(px,py);}ctx.stroke();}
  ctx.restore();
  if(fam==='life'&&Math.random()<.35&&parts.length<40){const a0=Math.random()*6.283;parts.push({x:x+Math.cos(a0)*R*.9,y:y+Math.sin(a0)*R*.6,vy:-30-Math.random()*25,life:.9,c:c1});}}
 function doBreak(t){if(t-lastBreak<CFG.breakCd)return;lastBreak=t;breakFx={x:player.x,y:player.y,t0:t};}
 function stepBreak(t){if(!breakFx)return;const p=(t-breakFx.t0)/CFG.breakT;if(p>1.4){breakFx=null;return;}const r=Math.min(1,p)*CFG.breakR;
  if(p<=1&&!off('TB307BREAK')){try{bullets=bullets.filter(b=>Math.hypot(b.x-breakFx.x,b.y-breakFx.y)>r);}catch{}try{for(const e of enemies){if(e.dead||e===boss||e.bossPart)continue;const d=Math.hypot(e.x-breakFx.x,e.y-breakFx.y);if(d<r&&d>1&&!e.__tbp){e.__tbp=1;e.x+=(e.x-breakFx.x)/d*CFG.push;e.y+=(e.y-breakFx.y)/d*CFG.push*.6;}}}catch{}}
  ctx.save();ctx.globalCompositeOperation='lighter';ctx.globalAlpha=Math.max(0,1-p)*.9;ctx.strokeStyle='#bff4ff';ctx.lineWidth=6*(1-Math.min(1,p))+1.5;ctx.beginPath();ctx.arc(breakFx.x,breakFx.y,Math.max(1,r),0,6.283);ctx.stroke();
  const g=ctx.createRadialGradient(breakFx.x,breakFx.y,r*.6,breakFx.x,breakFx.y,Math.max(2,r));g.addColorStop(0,'#4fd8ff00');g.addColorStop(1,'#4fd8ff55');ctx.fillStyle=g;ctx.beginPath();ctx.arc(breakFx.x,breakFx.y,Math.max(1,r),0,6.283);ctx.fill();ctx.restore();
  if(p>1)try{for(const e of enemies)delete e.__tbp;}catch{}}
 function missiles(dt,t){const live=new Set();const m=item('missiles');const fam=m?(MIS[beh(m)]||'fire'):'fire',[c1,c2]=MCOL[fam];
  for(const s of shots){if(s.gearKind!=='missiles'||s.dead)continue;live.add(s);if(!s.__tb7){s.__tb7=1;s.r=(s.r||5)*CFG.misK;s.__h=[];}
   s.__h.push(s.x,s.y);if(s.__h.length>28)s.__h.splice(0,2);track.set(s,{x:s.x,y:s.y,dead:false});
   const h=s.__h;if(h.length>=4){ctx.save();ctx.globalCompositeOperation='lighter';ctx.lineCap='round';const n=h.length/2;for(let k=1;k<n;k++){const q=k/n;ctx.strokeStyle=q>.6?c2:c1;ctx.globalAlpha=q*.75;ctx.lineWidth=1+q*(s.r||5)*1.1;ctx.beginPath();ctx.moveTo(h[k*2-2],h[k*2-1]);ctx.lineTo(h[k*2],h[k*2+1]);ctx.stroke();}
    if(fam==='fire'&&Math.random()<.3&&parts.length<60)parts.push({x:s.x+(Math.random()-.5)*6,y:s.y+8,vy:40,vx:(Math.random()-.5)*40,life:.35,c:'#ffb340'});ctx.restore();}}
  for(const [s,v] of track){if(live.has(s))continue;track.delete(s);if(v.y>-10&&v.y<(typeof H!=='undefined'?H:900)+10&&v.x>-10&&v.x<(typeof W!=='undefined'?W:480)+10)rings.push({x:v.x,y:v.y,t0:t,c1,c2,sp:Array.from({length:6+(Math.random()*3|0)},()=>({a:Math.random()*6.283,v:90+Math.random()*80}))});}
  for(const r of rings){const p=(t-r.t0)/CFG.ringT;if(p>1.6){r.dead=1;continue;}const q=Math.min(1,p);ctx.save();ctx.globalCompositeOperation='lighter';ctx.globalAlpha=Math.max(0,1-q)*.9;ctx.strokeStyle=r.c2;ctx.lineWidth=3*(1-q)+1;ctx.beginPath();ctx.arc(r.x,r.y,10+38*q,0,6.283);ctx.stroke();
   ctx.globalAlpha=Math.max(0,1-p/1.6);ctx.strokeStyle=r.c1;ctx.lineWidth=2;for(const s of r.sp){const d0=s.v*(t-r.t0),d1=d0+8;ctx.beginPath();ctx.moveTo(r.x+Math.cos(s.a)*d0,r.y+Math.sin(s.a)*d0);ctx.lineTo(r.x+Math.cos(s.a)*d1,r.y+Math.sin(s.a)*d1);ctx.stroke();}ctx.restore();}
  rings=rings.filter(r=>!r.dead);if(rings.length>24)rings.splice(0,rings.length-24);}
 function side(t){const sd=item('sidearm');if(!sd)return;let rank=0;try{rank=(sd.spec||gearSpec(sd)).rank|0;}catch{}const col=TIERC[Math.max(0,Math.min(4,rank))];
  try{for(let k=0;k<2;k++){const p=Battle28.support()[k];if(!p)continue;ctx.save();ctx.globalCompositeOperation='lighter';const g=ctx.createRadialGradient(p.x,p.y+4,2,p.x,p.y+4,22);g.addColorStop(0,col+'aa');g.addColorStop(1,col+'00');ctx.globalAlpha=.75+.15*Math.sin(t*4+k);ctx.fillStyle=g;ctx.beginPath();ctx.ellipse(p.x,p.y+6,22,14,0,0,6.283);ctx.fill();ctx.restore();}}catch{}
  const b=beh(sd);if(b==='disc'){for(const s of shots){if(s.gearKind!=='sidearm'||s.dead)continue;s.__rot=(s.__rot||0)+.35;ctx.save();ctx.translate(s.x,s.y);ctx.rotate(s.__rot);ctx.globalCompositeOperation='lighter';ctx.strokeStyle='#e6d0ff';ctx.lineWidth=2;const R=(s.r||5)+5;ctx.beginPath();ctx.arc(0,0,R,0,4.4);ctx.stroke();ctx.strokeStyle='#d29bff';ctx.beginPath();ctx.arc(0,0,R-3,3.2,6.0);ctx.stroke();ctx.restore();}}
  try{for(const e of enemies){if(e.dead||!(e.frozen>0||e.slow>0))continue;ctx.save();ctx.globalCompositeOperation='lighter';ctx.globalAlpha=.22;ctx.fillStyle='#7fe8ff';ctx.beginPath();ctx.arc(e.x,e.y,(e.r||16)+4,0,6.283);ctx.fill();ctx.restore();}}catch{}}
 function fxDraw(dt,t){for(const p of parts){p.life-=dt;p.y+=p.vy*dt;p.x+=(p.vx||0)*dt;}parts=parts.filter(p=>p.life>0);ctx.save();ctx.globalCompositeOperation='lighter';for(const p of parts){ctx.globalAlpha=Math.min(1,p.life*2);ctx.fillStyle=p.c;ctx.beginPath();ctx.arc(p.x,p.y,1.8,0,6.283);ctx.fill();}
  for(const a of arcs){a.life-=dt;ctx.globalAlpha=Math.max(0,a.life/.22);ctx.strokeStyle='#dff7ff';ctx.lineWidth=1.6;ctx.beginPath();ctx.moveTo(a.a.x,a.a.y);const n=6;for(let k=1;k<n;k++){const q=k/n;ctx.lineTo(a.a.x+(a.b.x-a.a.x)*q+(Math.random()-.5)*14,a.a.y+(a.b.y-a.a.y)*q+(Math.random()-.5)*14);}ctx.lineTo(a.b.x,a.b.y);ctx.stroke();ctx.strokeStyle='#4fc8ff';ctx.lineWidth=4;ctx.globalAlpha*=.35;ctx.stroke();}
  arcs=arcs.filter(a=>a.life>0);
  for(const f of frost){f.life-=dt;const q=1-f.life/.55;ctx.globalAlpha=Math.max(0,f.life/.55)*.55;const g=ctx.createRadialGradient(f.x,f.y,0,f.x,f.y,28);g.addColorStop(0,'#e8fdffcc');g.addColorStop(1,'#7fe8ff00');ctx.fillStyle=g;ctx.beginPath();ctx.arc(f.x,f.y,14+14*q,0,6.283);ctx.fill();}frost=frost.filter(f=>f.life>0);ctx.restore();}
 let lastT=0;
 function frame(){if(off('x')||typeof mode==='undefined'||(mode!=='play'&&mode!=='pause'))return;const t=now(),dt=Math.min(.05,Math.max(0,t-(lastT||t)));lastT=t;
  const on=shieldOn();if(!off('TB307ARMOR')&&on)drawShield(t);if(wasOn&&!on&&mode==='play'&&!off('TB307BREAK'))doBreak(t);wasOn=on;stepBreak(t);
  if(!off('TB307MIS'))missiles(dt,t);if(!off('TB307SIDE'))side(t);fxDraw(dt,t);}
 function hookHit(){const oh=Equipment25.hit;Equipment25.hit=function(s,e){const r=oh.apply(this,arguments);try{if(off('x')||!s||!e||s.gearKind!=='sidearm')return r;const sd=item('sidearm'),b=sd?beh(sd):'';
   if((b==='rail')&&!s.chains&&!off('TB307CHAIN')){const L=enemies.filter(n=>n!==e&&!n.dead&&Math.hypot(n.x-e.x,n.y-e.y)<CFG.chainR).sort((a,c)=>Math.hypot(a.x-e.x,a.y-e.y)-Math.hypot(c.x-e.x,c.y-e.y)).slice(0,CFG.chainN);let prev=e;
    for(const n of L){arcs.push({a:{x:prev.x,y:prev.y},b:{x:n.x,y:n.y},life:.22});const d=(s.damage||0)*CFG.chainK*(typeof Combat!=='undefined'?Combat.factor():1);n.hp-=d;try{Feedback31.damage(n,d,{gearKind:'auxiliary'});}catch{}if(n.hp<=0)try{kill(n);}catch{}prev=n;}if(arcs.length>14)arcs.splice(0,arcs.length-14);}
   if(b==='prism'&&frost.length<10)frost.push({x:e.x,y:e.y,life:.55});}catch{}return r;};}
 function hook(){if(typeof Equipment25==='undefined'||!Equipment25.draw||Equipment25.__tb307)return false;Equipment25.__tb307=1;const od=Equipment25.draw;Equipment25.draw=function(){const r=od.apply(this,arguments);try{frame();}catch(e){}return r;};hookHit();return true;}
 if(!hook()){const iv=setInterval(()=>{if(hook())clearInterval(iv);},300);}})();
