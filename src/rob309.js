'use strict';
// V309 · Biến hình robot hợp thể (chỉ thị Gemini V309 mục 1–2). Tắt: window.ROB309=false
//  • Lúc chuyển sang dạng Robot (Bạo Tẩu / Tuyệt kỹ E): sóng xung kích co 65→15 px rồi bung 15→160 px + 16 tia màu robot (0,6 s),
//    bất tử 0,6 s, xóa đạn địch trong 180 px.
//  • Lúc thu giáp về chiến cơ: vòng sáng nhỏ + bất tử 0,5 s.
//  • Bậc +6 trở lên: vòng ma trận năng lượng xoay sau lưng robot; +10: thêm vòng vàng kim + hạt sáng bay quanh (vẽ canvas, không thêm ảnh).
const Rob309=(()=>{
 const ON=()=>window.ROB309!==false,TAU=Math.PI*2;
 let wasOn=false,fx=[],parts=[],lastT=-1;
 const col=i=>{try{return SSS_MODELS[i].color||'#c9a2ff';}catch{return '#c9a2ff';}};
 const enhOf=r=>{try{return r.enhance|0;}catch{return 0;}};
 function isOn(){try{return superTime>0||SSSGame.state().ult>0;}catch{return false;}}
 function onTransform(i){fx.push({k:'in',t:0,c:col(i),x:player.x,y:player.y});
  try{invuln=Math.max(invuln,.6);}catch{}
  try{bullets=bullets.filter(b=>Math.hypot(b.x-player.x,b.y-player.y)>180);}catch{}}
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
   if(f.k==='in'){if(f.t>.6)return false;const u=f.t/.6;
    if(u<.35){const v=u/.35,r=65-50*v;g.globalAlpha=.5+.4*v;g.strokeStyle=f.c;g.lineWidth=3;g.beginPath();g.arc(x,y,r,0,TAU);g.stroke();}
    else{const v=(u-.35)/.65,r=15+145*v;g.globalAlpha=.9*(1-v);g.strokeStyle='#ffffff';g.lineWidth=4*(1-v)+1;g.beginPath();g.arc(x,y,r,0,TAU);g.stroke();
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
 const TAU=Math.PI*2,DUR=[5,5.2,5.5,5.8,6.2,6.6,7,7.4,7.8,8.1,8.5],COL=[['#c026d3','#22d3ee'],['#f97316','#06b6d4'],['#facc15','#ef4444'],['#3b82f6','#a855f7'],['#38bdf8','#f8fafc'],['#dc2626','#fbbf24'],['#eab308','#9333ea']];
 let was=false,P=[];
 const robot=()=>{try{return activeRobot&&activeRobot.super?activeRobot:null;}catch{return null;}};
 const idx=r=>{try{return SSSGame.indexFor(r);}catch{return -1;}};
 // thời gian đứng: cộng thêm (bảng − 5 s) lúc vừa biến hình
 setInterval(()=>{try{const r=robot(),on=!!r&&superTime>0;if(on&&!was&&window.ROBDUR309!==false&&mode==='play'){const e=Math.max(0,Math.min(10,r.enhance|0));superTime+=DUR[e]-5;}was=on;}catch{}},50);
 // +45 % sát thương khi đang ở dạng robot
 try{if(typeof Combat!=='undefined'&&Combat.factor&&!Combat.factor.__r309){const of=Combat.factor;const f=function(){const v=of.apply(this,arguments);try{if(window.ROBDPS309!==false&&robot()&&superTime>0&&mode==='play')return v*1.45;}catch{}return v;};f.__r309=1;Combat.factor=f;}}catch{}
 function glow(g,x,y,r,c,a){const gr=g.createRadialGradient(x,y,0,x,y,r);gr.addColorStop(0,'rgba(255,255,255,'+a+')');gr.addColorStop(.35,c);gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.fillRect(x-r,y-r,r*2,r*2);}
 function col(g,x,w,c1,c2,a){const gr=g.createLinearGradient(x-w,0,x+w,0);gr.addColorStop(0,'rgba(0,0,0,0)');gr.addColorStop(.3,c1);gr.addColorStop(.5,'#ffffff');gr.addColorStop(.7,c2);gr.addColorStop(1,'rgba(0,0,0,0)');g.globalAlpha=a;g.fillStyle=gr;g.fillRect(x-w,0,w*2,H);}
 function draw(i,u,t){const g=ctx,[c1,c2]=COL[i]||COL[0],px=player.x,py=player.y,fade=Math.min(1,u*6,(1-u)*5);
  g.save();g.globalCompositeOperation='lighter';
  if(i===0){for(const x of [W*.12,W*.88])col(g,x,34+10*Math.sin(t*20),c1,c2,.75*fade);
   if(P.length<70)for(let k=0;k<4;k++)P.push({x:Math.random()*W,y:H+10,vx:(Math.random()-.5)*160,vy:-500-Math.random()*300,r:Math.random()*TAU,c:Math.random()<.5?c1:c2});}
  else if(i===1){const top=-20,wd=W*.42*Math.min(1,u*4);g.globalAlpha=.55*fade;const gr=g.createLinearGradient(0,py,0,top);gr.addColorStop(0,'#ffffff');gr.addColorStop(.2,c1);gr.addColorStop(1,'rgba(249,115,22,0)');g.fillStyle=gr;g.beginPath();g.moveTo(px-18,py-20);g.lineTo(px-wd,top);g.lineTo(px+wd,top);g.lineTo(px+18,py-20);g.closePath();g.fill();
   g.globalAlpha=.5*fade;g.strokeStyle=c2;g.lineWidth=1.2;for(let k=-6;k<=6;k++){const x=px+k*wd/6;g.beginPath();g.moveTo(x,top);g.lineTo(px+k*3,py-20);g.stroke();}for(let y=(t*400)%40;y<py;y+=40){g.beginPath();g.moveTo(px-wd*(1-y/py)-18,y);g.lineTo(px+wd*(1-y/py)+18,y);g.stroke();}}
  else if(i===2){const s=Math.min(1,u*5),L=Math.hypot(W,H);g.translate(W/2,H*.45);for(const a of [Math.PI/4,-Math.PI/4]){g.save();g.rotate(a);const w=(38+12*Math.sin(t*25))*s;const gr=g.createLinearGradient(0,-w,0,w);gr.addColorStop(0,'rgba(0,0,0,0)');gr.addColorStop(.3,c2);gr.addColorStop(.5,'#fff7c2');gr.addColorStop(.7,c1);gr.addColorStop(1,'rgba(0,0,0,0)');g.globalAlpha=.8*fade;g.fillStyle=gr;g.fillRect(-L/2,-w,L,w*2);g.restore();}glow(g,0,0,120*s,c1,.6*fade);}
  else if(i===3){g.globalCompositeOperation='source-over';g.globalAlpha=.25*fade;g.fillStyle='#2a0b4d';g.fillRect(0,0,W,H);g.globalCompositeOperation='lighter';
   for(let k=0;k<5;k++){const x=W*(k+.5)/5,d=Math.min(1,Math.max(0,u*5-k*.35)),h=H*d;if(d<=0)continue;g.globalAlpha=.8*fade;const gr=g.createLinearGradient(x-22,0,x+22,0);gr.addColorStop(0,'rgba(0,0,0,0)');gr.addColorStop(.5,'#e8f4ff');gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.beginPath();g.moveTo(x-22,0);g.lineTo(x+22,0);g.lineTo(x,h);g.closePath();g.fill();
    g.strokeStyle=k%2?c1:c2;g.lineWidth=2;g.beginPath();let yy=0,xx=x;g.moveTo(xx,yy);while(yy<h){yy+=24;xx=x+(Math.random()-.5)*30;g.lineTo(xx,yy);}g.stroke();}}
  else if(i===4){for(let k=0;k<3;k++){const v=u*3-k;if(v<0||v>1.2)continue;const a=Math.min(1,v*4,(1.2-v)*4)*fade,cy=H*(.25+.2*k),cx=W/2;g.globalAlpha=a;g.strokeStyle='#f8fafc';g.lineWidth=10*(1-v*.6);
    for(const sd of [1,-1]){g.beginPath();g.moveTo(cx-sd*W*.6,cy-W*.6);g.lineTo(cx+sd*W*.6,cy+W*.6);g.stroke();}g.strokeStyle=c1;g.lineWidth=22*(1-v*.6);g.globalAlpha=a*.4;for(const sd of [1,-1]){g.beginPath();g.moveTo(cx-sd*W*.6,cy-W*.6);g.lineTo(cx+sd*W*.6,cy+W*.6);g.stroke();}
    if(P.length<90)for(let n=0;n<3;n++)P.push({x:cx+(Math.random()-.5)*W,y:cy+(Math.random()-.5)*80,vx:(Math.random()-.5)*80,vy:60+Math.random()*80,r:Math.random()*TAU,c:'#dff6ff'});}}
  else if(i===5){const s=Math.min(1,u*5),w=(48+14*Math.sin(t*30))*s;const gr=g.createLinearGradient(px-w,0,px+w,0);gr.addColorStop(0,'rgba(0,0,0,0)');gr.addColorStop(.25,c1);gr.addColorStop(.5,'#fff3c4');gr.addColorStop(.75,c2);gr.addColorStop(1,'rgba(0,0,0,0)');g.globalAlpha=.85*fade;g.fillStyle=gr;g.fillRect(px-w,0,w*2,py-10);
   for(let y=py;y>0;y-=90){const r=(u*600+y)%300;g.globalAlpha=.35*fade;g.strokeStyle=c1;g.lineWidth=3;g.beginPath();g.ellipse(px,y-((t*500)%90),r*.9,18,0,0,TAU);g.stroke();}glow(g,px,py-30,90,c2,.7*fade);}
  else{const v=Math.min(1,u*1.3);for(const sd of [-1,1]){const cx=W/2+sd*(W*.75)*(1-v);g.save();g.translate(cx,H*.42);g.scale(sd,1);g.globalAlpha=.85*fade;g.strokeStyle=c1;g.lineWidth=16;g.beginPath();g.arc(0,0,H*.32,-Math.PI*.42,Math.PI*.42);g.stroke();g.strokeStyle='#fff6c8';g.lineWidth=5;g.stroke();g.restore();}
   if(v>.92){const r=(u-.7)*900;const cs=['#ff5d5d','#ffb347','#fff35c','#5dff8a','#5dc8ff','#9d6bff'];cs.forEach((c,k)=>{g.globalAlpha=.5*fade;g.strokeStyle=c;g.lineWidth=6;g.beginPath();g.arc(W/2,H*.42,Math.max(1,r-k*14),0,TAU);g.stroke();});}}
  // hạt
  const dt=1/60;P=P.filter(p=>{p.x+=p.vx*dt;p.y+=p.vy*dt;p.r+=dt*6;if(p.y<-30||p.y>H+30)return false;g.globalAlpha=.85*fade;g.fillStyle=p.c;g.save();g.translate(p.x,p.y);g.rotate(p.r);g.beginPath();g.moveTo(0,-9);g.lineTo(3,0);g.lineTo(0,9);g.lineTo(-3,0);g.closePath();g.fill();g.restore();return true;});
  g.restore();}
 function install(){if(typeof SSSGame==='undefined'||SSSGame.__u309)return;SSSGame.__u309=1;const od=SSSGame.draw;
  SSSGame.draw=function(r){const res=od.apply(this,arguments);try{if(window.ROBULT309!==false){const U=SSSGame.state().ult;const i=idx(r);if(i>=0&&U>0&&U<=2.4){const u=1-U/2.4;draw(i,u,typeof time==='number'?time:performance.now()/1000);}else if(P.length&&!(U>0))P=[];}}catch{}return res;};}
 setTimeout(install,0);
 return {DUR,install};
})();
