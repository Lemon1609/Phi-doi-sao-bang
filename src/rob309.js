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
