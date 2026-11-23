'use strict';
// V309 · Biến hình robot hợp thể (chỉ thị Gemini V309 mục 1–2). Tắt: window.ROB309=false
//  • Lúc chuyển sang dạng Robot (Bạo Tẩu / Tuyệt kỹ E): sóng xung kích co 65→15 px rồi bung 15→160 px + 16 tia màu robot (0,6 s),
//    bất tử 0,6 s, xóa đạn địch trong 180 px.
//  • Lúc thu giáp về chiến cơ: vòng sáng nhỏ + bất tử 0,5 s.
//  • Bậc +6 trở lên: vòng ma trận năng lượng xoay sau lưng robot; +10: thêm vòng vàng kim + hạt sáng bay quanh (vẽ canvas, không thêm ảnh).
// V2.1 · mốc robot 0:+0..2 1:+3..5 2:+6..9 3:+10 (Evo21.robM). Evo21 tắt → -1 = giữ đúng số cũ V2.0
const E21M=()=>{try{if(window.EVO21===false||window.EVO21ROB===false||!window.Evo21)return -1;return Evo21.robM();}catch{return -1;}};
const E21V=(arr,orig)=>{const m=E21M();return m<0?orig:arr[m];};
const Rob309=(()=>{
 const ON=()=>window.ROB309!==false,TAU=Math.PI*2;
 let wasOn=false,fx=[],parts=[],lastT=-1;
 const col=i=>{try{return SSS_MODELS[i].color||'#c9a2ff';}catch{return '#c9a2ff';}};
 const enhOf=r=>{try{return r.enhance|0;}catch{return 0;}};
 function isOn(){try{return superTime>0||SSSGame.state().ult>0;}catch{return false;}}
 function onTransform(i){const m=E21M();fx.push({k:'in',t:0,c:m===3?'#ffd56a':col(i),x:player.x,y:player.y});if(m===3)fx.push({k:'in',t:-.08,c:'#fff1b8',x:player.x,y:player.y,big:1});
  try{invuln=Math.max(invuln,E21V([.6,.8,.8,.8],.6));}catch{}
  const R=E21V([0,180,180,1e9],180);if(R>0)try{bullets=bullets.filter(b=>Math.hypot(b.x-player.x,b.y-player.y)>R);}catch{}}
 function onRevert(i){fx.push({k:'out',t:0,c:col(i),x:player.x,y:player.y});try{invuln=Math.max(invuln,.5);}catch{}}
 function hexPath(g,r,rot){g.beginPath();for(let k=0;k<6;k++){const a=rot+k*TAU/6;g.lineTo(Math.cos(a)*r,Math.sin(a)*r);}g.closePath();}
 function circle(g,x,y,e,t,c){const light=(()=>{try{return VisualFX.counts().quality==='light';}catch{return false;}})();
  g.save();g.translate(x,y+6);g.globalCompositeOperation='lighter';g.scale(1,.55);
  const gold=e>=10,cA=gold?'#ffd56a':c,cB=gold?'#fff1b8':'#7fe8ff';
  g.globalAlpha=.55;g.strokeStyle=cA;g.lineWidth=2.2;g.beginPath();g.arc(0,0,92,0,TAU);g.stroke();
  g.globalAlpha=.35;g.lineWidth=1.2;g.setLineDash([10,7]);g.lineDashOffset=-t*40;g.beginPath();g.arc(0,0,80,0,TAU);g.stroke();g.setLineDash([]);
  g.globalAlpha=.5;g.strokeStyle=cB;g.lineWidth=1.6;hexPath(g,66,t*.8);g.stroke();hexPath(g,66,-t*.8+TAU/12);g.globalAlpha=.25;g.stroke();
  if(!light){g.globalAlpha=.6;g.fillStyle=cB;for(let k=0;k<12;k++){const a=t*1.2+k*TAU/12;g.beginPath();g.arc(Math.cos(a)*92,Math.sin(a)*92,2.2,0,TAU);g.fill();}}
  if(gold){g.globalAlpha=.45;g.strokeStyle='#ffe28a';g.lineWidth=3;g.beginPath();g.arc(0,0,104,t*1.5,t*1.5+TAU*.7);g.stroke();}
  g.restore();
  if(gold&&!light){if(parts.length<26&&Math.random()<.5)parts.push({x:x+(Math.random()-.5)*150,y:y+40+Math.random()*30,vy:-40-Math.random()*50,a:1,r:1+Math.random()*2});}}
 function drawParts(g,dt){if(!parts.length)return;g.save();g.globalCompositeOperation='lighter';
  parts=parts.filter(p=>{p.y+=p.vy*dt;p.a-=dt*.8;if(p.a<=0)return false;g.globalAlpha=p.a;g.fillStyle='#ffe9a8';g.beginPath();g.arc(p.x,p.y,p.r,0,TAU);g.fill();return true;});g.restore();}
 function drawFx(g,dt){if(!fx.length)return;g.save();g.globalCompositeOperation='lighter';
  fx=fx.filter(f=>{f.t+=dt;const x=player.x,y=player.y;
   if(f.k==='in'){if(f.t<0)return true;if(f.t>.6)return false;const u=f.t/.6;
    if(u<.35){const v=u/.35,r=65-50*v;g.globalAlpha=.5+.4*v;g.strokeStyle=f.c;g.lineWidth=3;g.beginPath();g.arc(x,y,r,0,TAU);g.stroke();}
    else{const v=(u-.35)/.65,r=(15+145*v)*(f.big?2.6:1);g.globalAlpha=.9*(1-v);g.strokeStyle='#ffffff';g.lineWidth=4*(1-v)+1;g.beginPath();g.arc(x,y,r,0,TAU);g.stroke();
     g.strokeStyle=f.c;g.lineWidth=2;for(let k=0;k<16;k++){const a=k*TAU/16+.2;g.beginPath();g.moveTo(x+Math.cos(a)*r*.35,y+Math.sin(a)*r*.35);g.lineTo(x+Math.cos(a)*r*1.05,y+Math.sin(a)*r*1.05);g.stroke();}
     const gr=g.createRadialGradient(x,y,0,x,y,r*.6);gr.addColorStop(0,'rgba(255,255,255,'+(.35*(1-v))+')');gr.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=gr;g.globalAlpha=1;g.fillRect(x-r,y-r,r*2,r*2);}
    return true;}
   if(f.t>.3)return false;const v=f.t/.3;g.globalAlpha=.6*(1-v);g.strokeStyle=f.c;g.lineWidth=2;g.beginPath();g.arc(x,y,70-40*v,0,TAU);g.stroke();return true;});
  g.restore();}
 function install(){if(typeof SSSGame==='undefined'||SSSGame.__r309)return;SSSGame.__r309=1;const od=SSSGame.draw;
  SSSGame.draw=function(r,bank){if(!ON())return od.apply(this,arguments);let i=-1;try{i=SSSGame.indexFor(r);}catch{}
   const now=typeof time==='number'?time:performance.now()/1000,dt=lastT<0?0:Math.max(0,Math.min(.1,now-lastT));lastT=now;
   const on=i>=0&&isOn(),e=enhOf(r),live=typeof mode!=='undefined'&&(mode==='play'||mode==='pause');
   if(i>=0&&live){if(on&&!wasOn)onTransform(i);else if(!on&&wasOn)onRevert(i);}wasOn=on;
   if(i>=0&&on&&E21M()>=2){try{window.Evo21&&Evo21.robWing(ctx,i,player.x,player.y,now);}catch{}}/* V2.1: cánh năng lượng GPT sau robot +6..+10 */
   if(i>=0&&on&&e>=6){try{circle(ctx,player.x,player.y,e,now,col(i));}catch{}}
   const res=od.apply(this,arguments);
   try{drawFx(ctx,dt);drawParts(ctx,dt);}catch{}
   return res;};}
 setTimeout(install,0);
 return {install,_fx:()=>fx.length};
})();

// ---------- V309 bước 2: thời gian đứng theo bậc · +45 % sát thương dạng robot · tuyệt kỹ riêng 7 robot (vẽ canvas) ----------
//  Tắt: window.ROBDUR309=false · window.ROBDPS309=false · window.ROBULT309=false
const RobUlt309=(()=>{
 const TAU=Math.PI*2,DUR=[5,5.2,5.5,5.8,6.2,6.6,7,7.4,7.8,8.1,8.5],COL=[['#c026d3','#22d3ee'],['#f97316','#06b6d4'],['#facc15','#ef4444'],['#3b82f6','#a855f7'],['#38bdf8','#f8fafc'],['#dc2626','#fbbf24'],['#eab308','#9333ea']];if(window.HOP4309!==false){COL[1]=['#a855f7','#2dd4bf'];COL[3]=['#a855f7','#facc15'];}/* V309 Lượt 4: mẫu 1 Thời Không Thôn Tinh tím–ngọc, mẫu 3 Hư Không Đế Vương tím–vàng */
 let was=false,P=[];
 const robot=()=>{try{return activeRobot&&activeRobot.super?activeRobot:null;}catch{return null;}};
 const idx=r=>{try{return SSSGame.indexFor(r);}catch{return -1;}};
 // thời gian đứng: cộng thêm (bảng − 5 s) lúc vừa biến hình
 let fin21={m:-1,i:-1};
 setInterval(()=>{try{const r=robot(),on=!!r&&superTime>0;if(on&&!was&&window.ROBDUR309!==false&&mode==='play'){const e=Math.max(0,Math.min(10,r.enhance|0));superTime+=DUR[e]-5;}
  if(on){fin21={m:E21M(),i:idx(r),r};}
  else if(was&&fin21.m===3&&mode==='play'){/* V2.1 +10: Auto-Finisher — hết giờ robot, bắn 1 sóng E thu gọn (50 % ≈ 6 × đơn vị) + xóa đạn quanh tàu để hạ cánh an toàn */
   try{const R0=fin21.r,u=(()=>{try{return allyDamageScale()*gear.damage*1.25*Workshop.factor(R0.grade)*Workshop.levelFactor(R0);}catch{return 1;}})(),D=6*u;
    bullets=bullets.filter(b=>Math.hypot(b.x-player.x,b.y-player.y)>260);
    for(const e of enemies){if(e.dead||e.rescue28||!Number.isFinite(e.hp))continue;if(Math.hypot(e.x-player.x,e.y-player.y)<320){e.hp-=D;try{Report392.hit(D,'skill');}catch{}if(e.hp<=0)kill(e);}}
    try{if(boss&&!boss.defeatStarted&&Math.hypot(boss.x-player.x,boss.y-player.y)<420)damageBoss(D,'sss',boss);}catch{}
    try{window.Evo21&&Evo21.robFinish(fin21.i);}catch{}}catch{}fin21={m:-1,i:-1};}
  was=on;}catch{}},50);
 // +45 % sát thương khi đang ở dạng robot
 try{if(typeof Combat!=='undefined'&&Combat.factor&&!Combat.factor.__r309){const of=Combat.factor;const f=function(){const v=of.apply(this,arguments);try{if(window.ROBDPS309!==false&&robot()&&superTime>0&&mode==='play')return v*(window.ROBGUN309===false?1.45:1.35);}catch{}return v;};f.__r309=1;Combat.factor=f;}}catch{}
 function glow(g,x,y,r,c,a){const gr=g.createRadialGradient(x,y,0,x,y,r);gr.addColorStop(0,'rgba(255,255,255,'+a+')');gr.addColorStop(.35,c);gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.fillRect(x-r,y-r,r*2,r*2);}
 function col(g,x,w,c1,c2,a){const gr=g.createLinearGradient(x-w,0,x+w,0);gr.addColorStop(0,'rgba(0,0,0,0)');gr.addColorStop(.3,c1);gr.addColorStop(.5,'#ffffff');gr.addColorStop(.7,c2);gr.addColorStop(1,'rgba(0,0,0,0)');g.globalAlpha=a;g.fillStyle=gr;g.fillRect(x-w,0,w*2,H);}
 let hz21=0;
 function draw(i,u,t){const g=ctx,[c1,c2]=COL[i]||COL[0],px=player.x,py=player.y,E21=k=>{try{return window.Evo21?Evo21.rob(k):1;}catch{return 1;}},fade=Math.min(1,u*6,(1-u)*5)*E21('ultA'),zk=E21('ult');
  const m21=E21M(),usp=window.Evo21?Evo21.robUlt(i):null;
  if(usp){/* V2.1: Tuyệt kỹ E tranh GPT, phủ +20 % từ +3, +6 xóa đạn địch trong vùng quét */const cov=E21V([1,1.2,1.2,1.3],1),ww=W*.95*cov,hh=ww*usp.naturalHeight/usp.naturalWidth,yy=py-40-hh*(.35+.55*Math.min(1,u*1.6));
   g.save();g.globalCompositeOperation='lighter';g.globalAlpha=Math.min(1,fade*1.1);g.drawImage(usp,px-ww/2,yy,ww,hh);if(m21>=1){g.globalAlpha=fade*.3;g.drawImage(usp,px-ww*.55,yy-hh*.05,ww*1.1,hh*1.1);}g.restore();
   if(m21>=2&&mode==='play')try{bullets=bullets.filter(b=>!(b.y<py&&b.y>yy&&Math.abs(b.x-px)<ww/2));}catch{}
   if(u<.1)hz21=0;else if(u>.9&&!hz21&&m21>=2){hz21=1;try{const R0=fin21.r||(typeof activeRobot!=='undefined'?activeRobot:null),un=(()=>{try{return allyDamageScale()*gear.damage*1.25*Workshop.factor(R0.grade)*Workshop.levelFactor(R0);}catch{return 1;}})();Evo21.robHazard(i,px,yy,ww,hh,usp,un);}catch{}}/* V2.1 +6: vùng dư 1,2 s (#5 băng làm chậm đạn · #6 vệt lửa giữa làn 1,5 s) */
   if(i!==3)return;}
  g.save();g.globalCompositeOperation='lighter';if(zk!==1){g.translate(W/2,H*.45);g.scale(zk,zk);g.translate(-W/2,-H*.45);}/* V2.1: quy mô Tuyệt kỹ E theo mốc +0..2/+3..5/+6..9/+10 */
  if(i===0){for(const x of [W*.12,W*.88])col(g,x,34+10*Math.sin(t*20),c1,c2,.75*fade);
   if(P.length<70)for(let k=0;k<4;k++)P.push({x:Math.random()*W,y:H+10,vx:(Math.random()-.5)*160,vy:-500-Math.random()*300,r:Math.random()*TAU,c:Math.random()<.5?c1:c2});}
  else if(i===1){const top=-20,wd=W*.42*Math.min(1,u*4);g.globalAlpha=.55*fade;const gr=g.createLinearGradient(0,py,0,top);gr.addColorStop(0,'#ffffff');gr.addColorStop(.2,c1);gr.addColorStop(1,window.HOP4309!==false?'rgba(168,85,247,0)':'rgba(249,115,22,0)');g.fillStyle=gr;g.beginPath();g.moveTo(px-18,py-20);g.lineTo(px-wd,top);g.lineTo(px+wd,top);g.lineTo(px+18,py-20);g.closePath();g.fill();
   g.globalAlpha=.5*fade;g.strokeStyle=c2;g.lineWidth=1.2;for(let k=-6;k<=6;k++){const x=px+k*wd/6;g.beginPath();g.moveTo(x,top);g.lineTo(px+k*3,py-20);g.stroke();}for(let y=(t*400)%40;y<py;y+=40){g.beginPath();g.moveTo(px-wd*(1-y/py)-18,y);g.lineTo(px+wd*(1-y/py)+18,y);g.stroke();}}
  else if(i===2){/* chủ dự án 20/11 10:00: bỏ chữ X → hào quang mặt trời nở + 3 cột lửa dọc */const s=Math.min(1,u*4),cx=W/2,cy=H*.42,R=Math.max(W,H)*.75*s;
   const gr=g.createRadialGradient(cx,cy,R*.05,cx,cy,R);gr.addColorStop(0,'rgba(255,250,210,'+(.55*fade)+')');gr.addColorStop(.3,'rgba(250,204,21,'+(.35*fade)+')');gr.addColorStop(.7,'rgba(239,68,68,'+(.18*fade)+')');gr.addColorStop(1,'rgba(239,68,68,0)');g.fillStyle=gr;g.fillRect(0,0,W,H);
   g.globalAlpha=.7*fade;g.strokeStyle=c1;g.lineWidth=6;g.beginPath();g.arc(cx,cy,R*.55,0,TAU);g.stroke();g.strokeStyle='#fff7c2';g.lineWidth=2;g.stroke();
   for(const x of [W*.22,W*.5,W*.78])col(g,x,(x===W*.5?44:28)+8*Math.sin(t*22+x),c1,c2,.7*fade);}
  else if(i===3){g.globalCompositeOperation='source-over';g.globalAlpha=.25*fade;g.fillStyle='#2a0b4d';g.fillRect(0,0,W,H);g.globalCompositeOperation='lighter';
   const nC=E21V([5,5,7,7],5);for(let k=0;k<nC;k++){const x=W*(k+.5)/nC,d=Math.min(1,Math.max(0,u*5-k*.35)),h=H*d;if(d<=0)continue;g.globalAlpha=.8*fade;const gr=g.createLinearGradient(x-22,0,x+22,0);gr.addColorStop(0,'rgba(0,0,0,0)');gr.addColorStop(.5,'#e8f4ff');gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.beginPath();g.moveTo(x-22,0);g.lineTo(x+22,0);g.lineTo(x,h);g.closePath();g.fill();
    g.strokeStyle=k%2?c1:c2;g.lineWidth=2;g.beginPath();let yy=0,xx=x;g.moveTo(xx,yy);while(yy<h){yy+=24;xx=x+(Math.random()-.5)*30;g.lineTo(xx,yy);}g.stroke();}}
  else if(i===4){/* bỏ chữ thập → 3 nhát chém trăng khuyết ngang quét từ dưới lên */for(let k=0;k<3;k++){const v=u*3-k*.7;if(v<0||v>1.3)continue;const a=Math.min(1,v*4,(1.3-v)*4)*fade,cy=H*(1-v*.9),cx=W/2;
    for(const [lw,cc,al] of [[26,c1,.35],[10,'#f8fafc',1]]){g.globalAlpha=a*al;g.strokeStyle=cc;g.lineWidth=lw;g.beginPath();g.ellipse(cx,cy+60,W*.62,90,0,Math.PI*1.08,Math.PI*1.92);g.stroke();}
    if(P.length<90)for(let n=0;n<3;n++)P.push({x:cx+(Math.random()-.5)*W,y:cy+(Math.random()-.5)*60,vx:(Math.random()-.5)*80,vy:60+Math.random()*80,r:Math.random()*TAU,c:'#dff6ff'});}}
  else if(i===5){const s=Math.min(1,u*5),w=(48+14*Math.sin(t*30))*s;const gr=g.createLinearGradient(px-w,0,px+w,0);gr.addColorStop(0,'rgba(0,0,0,0)');gr.addColorStop(.25,c1);gr.addColorStop(.5,'#fff3c4');gr.addColorStop(.75,c2);gr.addColorStop(1,'rgba(0,0,0,0)');g.globalAlpha=.85*fade;g.fillStyle=gr;g.fillRect(px-w,0,w*2,py-10);
   for(let y=py;y>0;y-=90){const r=(u*600+y)%300;g.globalAlpha=.35*fade;g.strokeStyle=c1;g.lineWidth=3;g.beginPath();g.ellipse(px,y-((t*500)%90),r*.9,18,0,0,TAU);g.stroke();}glow(g,px,py-30,90,c2,.7*fade);}
  else{const v=Math.min(1,u*1.3);for(const sd of [-1,1]){const cx=W/2+sd*(W*.75)*(1-v);g.save();g.translate(cx,H*.42);g.scale(sd,1);g.globalAlpha=.85*fade;g.strokeStyle=c1;g.lineWidth=16;g.beginPath();g.arc(0,0,H*.32,-Math.PI*.42,Math.PI*.42);g.stroke();g.strokeStyle='#fff6c8';g.lineWidth=5;g.stroke();g.restore();}
   if(v>.92){const r=(u-.7)*900;const cs=['#ff5d5d','#ffb347','#fff35c','#5dff8a','#5dc8ff','#9d6bff'];cs.forEach((c,k)=>{g.globalAlpha=.5*fade;g.strokeStyle=c;g.lineWidth=6;g.beginPath();g.arc(W/2,H*.42,Math.max(1,r-k*14),0,TAU);g.stroke();});}}
  // hạt
  const dt=1/60;P=P.filter(p=>{p.x+=p.vx*dt;p.y+=p.vy*dt;p.r+=dt*6;if(p.y<-30||p.y>H+30)return false;g.globalAlpha=.85*fade;g.fillStyle=p.c;g.save();g.translate(p.x,p.y);g.rotate(p.r);g.beginPath();g.moveTo(0,-9);g.lineTo(3,0);g.lineTo(0,9);g.lineTo(-3,0);g.closePath();g.fill();g.restore();return true;});
  g.restore();}
 function install(){if(typeof SSSGame==='undefined'||SSSGame.__u309)return;SSSGame.__u309=1;const od=SSSGame.draw;
  try{if(typeof SSSGun!=='undefined'&&SSSGun.ultimate&&!SSSGun.__u309){const ou=SSSGun.ultimate;SSSGun.ultimate=function(){if(window.ROBULT309!==false)return;return ou.apply(this,arguments);};SSSGun.__u309=1;}}catch{}
  SSSGame.draw=function(r){const res=od.apply(this,arguments);try{if(window.ROBULT309!==false){const U=SSSGame.state().ult;const i=idx(r);if(i>=0&&U>0&&U<=2.4){const u=1-U/2.4;draw(i,u,typeof time==='number'?time:performance.now()/1000);}else if(P.length&&!(U>0))P=[];}}catch{}return res;};}
 setTimeout(install,0);
 return {DUR,install};
})();

// ---------- V309 bước 3: đạn riêng dạng ROBOT đứng của 7 robot (chỉ thị Gemini mục 3). Tắt: window.ROBGUN309=false ----------
//  Đạn thật (trúng quái / boss). Chủ dự án 20/11 09:57: BỎ tia MAX cũ (vệt trắng tỏa quạt, SSSGun.beams) → dồn sát thương tia (9 × unit/giây) vào đạn riêng: tổng ≈ 12 × unit/giây;
//  để giữ mức "+45 % dạng robot", hệ số Combat.factor dạng robot hạ 1,45 → 1,35 khi bật đạn riêng (ước lượng, chưa đo bia).
const RobGun309=(()=>{
 const TAU=Math.PI*2,DPS=12,MAX=180,COL=[['#e879f9','#22d3ee'],['#fb923c','#22d3ee'],['#fde047','#ef4444'],['#93c5fd','#c084fc'],['#bae6fd','#ffffff'],['#f87171','#fbbf24'],['#fde047','#a855f7']];if(window.HOP4309!==false){COL[1]=['#c084fc','#5eead4'];COL[3]=['#c084fc','#fde047'];}
 let P=[],acc=0,acc2=0,ang=0,last=-1,cur21=-1;
 const robot=()=>{try{return activeRobot&&activeRobot.super?activeRobot:null;}catch{return null;}};
 const unit=r=>{try{return allyDamageScale()*gear.damage*1.25*Workshop.factor(r.grade)*Workshop.levelFactor(r)*(typeof Meta407!=='undefined'?Meta407.sssMult():1);}catch{return 1;}};
 function near(x,y){let b=null,bd=1e9;for(const e of enemies){if(e.dead||e.rescue28||e.y<-30)continue;const d=(e.x-x)**2+(e.y-y)**2;if(d<bd){bd=d;b=e;}}if(boss&&!boss.defeatStarted){const d=(boss.x-x)**2+(boss.y-y)**2;if(d<bd)b=boss;}return b;}
 function shoot(x,y,a,v,o){if(P.length>=MAX)return;P.push(Object.assign({x,y,vx:Math.sin(a)*v,vy:-Math.cos(a)*v,a,t:0,life:1.6,r:6,hit:new Set()},o));}
 function hurt(e,d,q){if(typeof mode!=='undefined'&&mode!=='play')return;try{if(e===boss||e.bossPart){damageBoss(d,'sss',e);return;}if(e.dead||!Number.isFinite(e.hp))return;try{Report392.hit(Math.min(e.hp,d),'skill');}catch{}e.hp-=d;if(q&&q.freeze)e.frozen=Math.max(e.frozen||0,q.freeze);if(e.hp<=0)kill(e);}catch{}}
 // nhịp bắn từng mẫu: [chu kỳ s, số viên mỗi loạt] → sát thương mỗi viên = DPS·unit·chu kỳ / số viên
 const PAT=[[.12,6],[.14,7],[.16,5],[.2,6],[.42,2],[.13,9],[.18,9]];
 function fire(i,r,px,py,t){cur21=i;const [cd,n]=PAT[i],d=DPS*unit(r)*cd/n,[c1,c2]=COL[i];
  if(i===0){for(let k=0;k<6;k++){const a=(-50+20*k)*Math.PI/180+Math.sin(t*3+k)*.18;shoot(px,py-30,a,620,{d,k:'feather',c:k%2?c1:c2,curl:Math.sin(t*2+k)*1.2});}}
  else if(i===1){const ns=E21V([4,6,6,6],4);for(let k=0;k<n;k++){const a=(-30+60*k/(n-1))*Math.PI/180;shoot(px,py-34,a,700,{d,k:'heat',c:c1,split:ns,slow:E21M()>=2?1:0});}}
  else if(i===2){shoot(px,py-40,0,760,{d:d*1.2,k:'plasma',c:c1,r:10,pierce:E21V([3,5,5,5],3)});const nv=E21V([4,4,6,6],4);for(let k=0;k<nv;k++){const h=nv/2,sx=px+(k<h?-1:1)*(54+(k%h)*28),sy=py-10+(k%h)*20,e=near(sx,sy),a=e?Math.atan2(e.x-sx,-(e.y-sy)):0;shoot(sx,sy,a,820,{d:d*.95*4/nv,k:'bolt',c:c2});}}
  else if(i===3){for(let k=0;k<6;k++){const aa=ang+k*TAU/6,sx=px+Math.cos(aa)*70,sy=py-20+Math.sin(aa)*34,e=near(sx,sy),a=e?Math.atan2(e.x-sx,-(e.y-sy)):0;shoot(sx,sy,a,900,{d,k:'laser',c:k%2?c1:c2,slow:1});}}
  else if(i===4){for(const sd of [-1,1])shoot(px+sd*46,py-20,sd*.06,560,{d,k:'slash',c:c1,r:30,pierce:E21V([6,8,8,8],6),freeze:E21V([1.5,2,2,2],1.5),life:1.4});}
  else if(i===5){for(let k=0;k<8;k++){const a=(-60+120*k/7)*Math.PI/180;shoot(px,py-30,a,640,{d:d*.9,k:'fire',c:k%2?c1:c2});}shoot(px,py-44,0,980,{d:d*1.8,k:'lance',c:c2,r:9,pierce:E21V([8,12,12,12],8)});}
  else{const bo=E21M()>=1;for(let k=0;k<9;k++){const a=(-40+80*k/8)*Math.PI/180;shoot(px,py-34,a,860,{d:bo?d/1.15:d,bounce:bo?1:0,k:'prism',c:['#ff5d5d','#ffb347','#fff35c','#5dff8a','#5dc8ff','#9d6bff','#ff6bd6','#fde047','#a855f7'][k]});}}}
 function step(dt,i,r){const px=player.x,py=player.y;ang+=dt*2.2;
  {const tn=performance.now()/1000;for(const e of enemies){if(e.slow21>tn){if(e.__s21x!=null){e.x-=(e.x-e.__s21x)*.2;e.y-=(e.y-e.__s21y)*.2;}e.__s21x=e.x;e.__s21y=e.y;}else if(e.__s21x!=null)e.__s21x=null;}}/* V2.1 #2 +6: quái trúng mảnh chậm 20 % trong 1 s */
  for(const q of P){q.t+=dt;if(q.curl){const s=Math.hypot(q.vx,q.vy),a=Math.atan2(q.vx,-q.vy)+q.curl*dt;q.vx=Math.sin(a)*s;q.vy=-Math.cos(a)*s;}q.x+=q.vx*dt;q.y+=q.vy*dt;
   if(q.dead)continue;const list=enemies;for(const e of list){if(e.dead||e.rescue28||q.hit.has(e))continue;const rr=(e.hitW||(e.large?40:24))/2+q.r;if((e.x-q.x)**2+(e.y-q.y)**2<rr*rr){q.hit.add(e);hurt(e,q.d,q);
     if(q.split){const ns=q.split===true||q.split===1?4:q.split;q.split=0;for(let k=0;k<ns;k++)shoot(q.x,q.y,k*TAU/ns+.4,460,{d:q.d*.35*4/ns,k:'shard',c:'#67e8f9',life:.5,r:4});if(q.slow)try{e.slow21=performance.now()/1000+1;}catch{}}/* V2.1: 4 → 6 mảnh (+3), chia lại sát thương; +6 làm chậm 20 % 1 s */
     if(q.bounce){q.bounce=0;let b2=null,bd=1e9;for(const o of list){if(o===e||o.dead||o.rescue28)continue;const dd=(o.x-q.x)**2+(o.y-q.y)**2;if(dd<bd&&dd<220*220){bd=dd;b2=o;}}if(b2){const a=Math.atan2(b2.x-q.x,-(b2.y-q.y));shoot(q.x,q.y,a,860,{d:q.d*.3,k:'prism',c:q.c,life:.5,hit:new Set([e])});}}/* V2.1: khúc xạ 1 lần (+3), sát thương gốc đã chia 1,15 */
     if(!q.pierce||--q.pierce<=0){q.dead=true;break;}}}
   if(!q.dead&&boss&&!boss.defeatStarted&&!q.hit.has(boss)){const parts=(boss.parts||[]).filter(p=>!p.dead);let tgt=null;for(const p2 of parts)if((p2.x-q.x)**2+(p2.y-q.y)**2<((p2.hitW||30)/2+q.r)**2){tgt=p2;break;}if(!tgt&&(boss.x-q.x)**2+(boss.y-q.y)**2<((boss.hitW||70)/2+q.r)**2)tgt=boss;
    if(tgt){q.hit.add(boss);hurt(tgt,q.d,q);if(!q.pierce||--q.pierce<=0)q.dead=true;}}}
  P=P.filter(q=>!q.dead&&q.t<q.life&&q.y>-60&&q.y<H+60&&q.x>-60&&q.x<W+60);
  // Thiên Vũ: mỗi 1,2 s sóng xung kích xóa đạn địch gần thân
  if(i===0){if(E21M()===3)try{bullets=bullets.filter(b=>Math.hypot(b.x-px,b.y-py)>72);}catch{}/* V2.1 +10: vòng lông vũ hộ thân */acc2+=dt;if(acc2>=E21V([1.2,1.0,.8,.8],1.2)){acc2=0;try{bullets=bullets.filter(b=>Math.hypot(b.x-px,b.y-py)>130);}catch{}P.push({x:px,y:py,vx:0,vy:0,t:0,life:.35,k:'ring',c:COL[0][1],r:0,hit:new Set(),dead:false,d:0,nohit:1});}}}
 function draw(g){if(!P.length)return;g.save();g.globalCompositeOperation='lighter';const E21=k=>{try{return window.Evo21?Evo21.rob(k):1;}catch{return 1;}},G21=E21('glow'),S9=(window.ROBDAN309===false?1:1.6)*E21('gun');/* V2.1: cỡ / quầng theo mốc +0..2/+3..5/+6..9/+10 (chỉ hình) *//* V309: đạn robot dày khối, bão hòa (chủ dự án 20/11 23:47). Tắt: window.ROBDAN309=false */
  for(const q of P){const a=Math.atan2(q.vx,-q.vy);g.save();g.translate(q.x,q.y);g.rotate(a);g.fillStyle=q.c;g.strokeStyle=q.c;g.globalAlpha=Math.min(1,(q.life-q.t)*4);
   {const sp=(q.k!=='ring'&&q.k!=='shard'&&cur21>=0&&window.Evo21)?Evo21.robDan(cur21):null;if(sp){/* V2.1: đạn robot tranh GPT theo mốc (chỉ hình; va chạm giữ q.r) */const S0={feather:34,heat:34,plasma:58,bolt:26,laser:40,slash:84,fire:30,lance:70,prism:36}[q.k]||32,k=G21*(E21M()===3?1.12:1),iw=sp.naturalWidth,ih=sp.naturalHeight,wide=iw>ih,h=wide?S0*k*ih/iw*1.25:S0*k,w=wide?S0*k*1.25:h*iw/ih;g.globalCompositeOperation='lighter';g.drawImage(sp,-w/2,-h/2,w,h);g.restore();g.globalCompositeOperation='lighter';continue;}}
   if(S9>1&&q.k!=='ring'){const rr=(q.k==='slash'?44:q.k==='plasma'||q.k==='lance'?30:20)*G21;const gr=g.createRadialGradient(0,0,0,0,0,rr);gr.addColorStop(0,q.c);gr.addColorStop(1,'rgba(0,0,0,0)');const al=g.globalAlpha;g.globalAlpha=al*.45;g.fillStyle=gr;g.fillRect(-rr,-rr,rr*2,rr*2);g.globalAlpha=al;g.fillStyle=q.c;g.globalCompositeOperation='source-over';g.scale(S9,S9);if(q.k==='laser'||q.k==='prism')g.scale(1.6,1);}
   switch(q.k){case 'feather':g.beginPath();g.moveTo(0,-14);g.quadraticCurveTo(5,0,0,12);g.quadraticCurveTo(-5,0,0,-14);g.fill();g.fillStyle='#fff';g.fillRect(-1,-10,2,16);break;
    case 'heat':g.beginPath();g.ellipse(0,0,4,11,0,0,TAU);g.fill();g.fillStyle='#fff7d6';g.beginPath();g.ellipse(0,-2,2,6,0,0,TAU);g.fill();break;
    case 'shard':g.beginPath();g.moveTo(0,-6);g.lineTo(3,0);g.lineTo(0,6);g.lineTo(-3,0);g.closePath();g.fill();break;
    case 'plasma':{const gr=g.createRadialGradient(0,0,0,0,0,14);gr.addColorStop(0,'#fff');gr.addColorStop(.4,q.c);gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.beginPath();g.ellipse(0,0,10,20,0,0,TAU);g.fill();break;}
    case 'bolt':case 'fire':g.beginPath();g.ellipse(0,0,3.5,9,0,0,TAU);g.fill();g.fillStyle='#fff';g.beginPath();g.ellipse(0,-1,1.6,5,0,0,TAU);g.fill();break;
    case 'laser':g.lineWidth=2.2;g.beginPath();g.moveTo(0,-18);g.lineTo(0,14);g.stroke();g.strokeStyle='#fff';g.lineWidth=.9;g.stroke();break;
    case 'slash':g.lineWidth=5;g.beginPath();g.arc(0,16,30,-Math.PI*.85,-Math.PI*.15);g.stroke();g.strokeStyle='#fff';g.lineWidth=2;g.stroke();break;
    case 'lance':g.fillRect(-3.5,-30,7,48);g.fillStyle='#fff';g.fillRect(-1.5,-30,3,48);break;
    case 'prism':g.lineWidth=2;g.beginPath();g.moveTo(0,-16);g.lineTo(0,12);g.stroke();g.fillStyle='#fff';g.fillRect(-1,-14,2,6);break;
    case 'ring':g.rotate(-a);g.lineWidth=3;g.globalAlpha=1-q.t/q.life;g.beginPath();g.arc(0,0,20+q.t/q.life*110,0,TAU);g.stroke();break;}
   g.restore();g.globalCompositeOperation='lighter';}
  g.restore();}
 function install(){if(typeof SSSGame==='undefined'||SSSGame.__g309)return;SSSGame.__g309=1;const od=SSSGame.draw;
  try{if(typeof SSSGun!=='undefined'&&SSSGun.beams&&!SSSGun.__g309){const ob=SSSGun.beams;SSSGun.beams=function(){if(window.ROBGUN309!==false)return [];return ob.apply(this,arguments);};SSSGun.__g309=1;}}catch{}
  SSSGame.draw=function(r){const res=od.apply(this,arguments);try{if(window.ROBGUN309!==false){const now=typeof time==='number'?time:performance.now()/1000,dt=last<0?0:Math.max(0,Math.min(.05,now-last));last=now;
    let i=-1;try{i=SSSGame.indexFor(r);}catch{}const demo=!!window.HANGAR_DEMO&&mode!=='play',on=i>=0&&superTime>0&&(mode==='play'&&robot()||demo);
    if(on&&mode==='play'&&dt>0&&window.ROBPOS309!==false){/* V309: robot đứng cao hơn mép đáy ≥150 (≈120 px màn) để không bị cắt chân */const lim=H-260;if(player.y>lim)player.y=Math.max(lim,player.y-900*dt);}
    if(on&&dt>0){acc+=dt;const cd=PAT[i][0];let n=0;while(acc>=cd&&n<3){acc-=cd;n++;fire(i,r,player.x,player.y,now);}}else acc=0;
    if((mode==='play'||demo)&&dt>0)step(dt,i,r);if(mode!=='play'&&mode!=='pause'&&!demo)P=[];draw(ctx);}}catch(e){}return res;};}
 setTimeout(install,0);
 return {install,_n:()=>P.length};
})();
