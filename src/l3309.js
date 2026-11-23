'use strict';
// V309 Lượt 3 · 13 CHIẾN CƠ v4 (GPT, mọi bậc cùng một dáng, giữ màu bản sắc) — hiệu ứng nâng bậc + biến hình Bạo Tẩu bằng mã.
//  Bậc: Trắng/Lục 2 luồng phản lực · Lam +2 tia lửa mép cánh + lõi nhấp nháy · Tím +1 vòng năng lượng mảnh sau lưng (α .25) + chớp mũi
//       · Tím+5 thêm hạt · SS 2 vòng ma trận xoay ngược + hạt trôi. Cỡ thân theo bậc đã nướng sẵn trong ảnh (1 · 1 · 1,05 · 1,10 · 1,12 · 1,14).
//  Bạo Tẩu: 0,15 s vòng thu vào tâm → sóng xung kích + chớp; thân ×1,08 easeOutBack 0,3 s; viền hào quang α .30→.45; phản lực ×1,5; 3–4 hạt/giây trôi về đuôi.
//  Không ctx.filter / shadowBlur trong vòng lặp (bóng mờ viền làm 1 lần lúc tạo bộ đệm). Tắt: window.L3309=false
(()=>{if(!window.SHIP309V4)return;
 const BB=window.SHIP309BB||{},on=()=>window.L3309!==false;
 const rgba=(h,a)=>{const n=parseInt(h.slice(1),16);return 'rgba('+(n>>16&255)+','+(n>>8&255)+','+(n&255)+','+a+')';};
 const colorOf=id=>{const C=window.SHIP309COL;if(C&&C[id])return C[id];try{const c=Fighters28.profiles[id].color;if(/^#[0-9a-f]{6}$/i.test(c))return c;}catch{}return '#9fd8ff';};
 const tierOf=id=>{try{const a=Evo53.hull(id);if(a&&a.__f)return a.__f;}catch{}try{return Dan299.tierOf(id)||'tim';}catch{return 'tim';}};
 const st={id:-1,on:false,tOn:-9,parts:[],last:0};
 const ease=x=>{const c1=1.70158,c3=c1+1;x=Math.min(1,Math.max(0,x));return 1+c3*Math.pow(x-1,3)+c1*Math.pow(x-1,2);};
 // thân Bạo Tẩu ×1,08 (easeOutBack 0,3 s); bỏ hệ số cỡ cũ theo bậc (SC233 / QBT307) vì cỡ đã nằm trong ảnh v4
 function hookScale(){if(!window.BtFx218||BtFx218.__l3)return !!(window.BtFx218&&BtFx218.__l3);const os=BtFx218.scale,ob=BtFx218.scaleBT;
  BtFx218.scale=function(id,a){if(!on())return os.apply(this,arguments);return 1;};
  BtFx218.scaleBT=function(id,a){if(!on())return ob.apply(this,arguments);const t=(typeof time==='number'?time:performance.now()/1000)-st.tOn;return 1+.08*ease(t/.3);};
  BtFx218.__l3=1;return true;}
 // viền hào quang: bóng trắng mờ của thân Bạo Tẩu, tạo 1 lần
 const IMG={},GL={};
 function img(id,f){const k=id+'_'+f;if(IMG[k])return IMG[k];try{const u=SHIP118[id][f];if(!u)return null;const im=new Image();im.src=u;IMG[k]=im;return im;}catch{return null;}}
 function halo(id,f){const k=id+'_'+f;if(GL[k])return GL[k];const im=img(id,f+'_bt');if(!im||!im.complete||!im.naturalWidth)return null;
  const S=160,c=document.createElement('canvas');c.width=c.height=S;const g=c.getContext('2d');g.filter='blur(4px)';g.drawImage(im,8,8,S-16,S-16);g.filter='none';
  g.globalCompositeOperation='source-in';g.fillStyle='#fff';g.fillRect(0,0,S,S);
  const t=document.createElement('canvas');t.width=t.height=S;const h=t.getContext('2d');h.drawImage(c,0,0);h.globalCompositeOperation='source-in';h.fillStyle=colorOf(id);h.fillRect(0,0,S,S);
  return GL[k]=t;}
 const FS={};function flameSpr(col){if(FS[col])return FS[col];const W=32,H=96,cv=document.createElement('canvas');cv.width=W;cv.height=H;const g=cv.getContext('2d'),gr=g.createLinearGradient(0,0,0,H);gr.addColorStop(0,'rgba(255,255,255,.95)');gr.addColorStop(.3,rgba(col,.75));gr.addColorStop(1,rgba(col,0));g.fillStyle=gr;g.beginPath();g.moveTo(0,8);g.quadraticCurveTo(W/2,0,W,8);g.lineTo(W/2,H);g.closePath();g.fill();return FS[col]=cv;}
 function flame(c,x,y,w,len,col,t,k){if(window.V2142!==false){/* V2.1.42: sprite dựng sẵn, không tạo gradient mỗi khung */const fl=len*(1+.18*Math.sin(t*Math.PI*2*22+k)),s=flameSpr(col);c.drawImage(s,x-w,y-w*.6,w*2,fl+w*.6);return;}const fl=len*(1+.18*Math.sin(t*Math.PI*2*22+k)),g=c.createLinearGradient(0,y,0,y+fl);g.addColorStop(0,'rgba(255,255,255,.95)');g.addColorStop(.3,rgba(col,.75));g.addColorStop(1,rgba(col,0));c.fillStyle=g;c.beginPath();c.moveTo(x-w,y);c.quadraticCurveTo(x,y-w*.6,x+w,y);c.lineTo(x,y+fl);c.closePath();c.fill();}
 function ringDash(c,r,n,col,a,lw,rot){c.save();c.rotate(rot);c.strokeStyle=rgba(col,a);c.lineWidth=lw;const s=6.283/n;for(let i=0;i<n;i++){c.beginPath();c.arc(0,0,r,i*s,i*s+s*.62);c.stroke();}c.restore();}
 function back(id,f,sp,F,now,b){const B=BB[id]&&BB[id][f];if(!B)return;const col=colorOf(id),c=ctx,lite=(()=>{try{return VisualFX.counts().quality==='light';}catch{return false;}})();
  const k=sp?(1+.08*ease((now-st.tOn)/.3)):1,u=v=>v*F*k,ti={thuong:0,luc:0,lam:1,tim:2,tim5:3,ss:4}[f]||0,R=u(Math.max(B[2]-B[0],B[3]-B[1]))*.62;
  c.save();c.globalCompositeOperation='lighter';
  // vòng năng lượng sau lưng (Tím+) / 2 vòng ma trận (SS)
  if(ti>=2&&!window.__L42){/* V2.1.42: bỏ vòng gạch cũ quanh thân khi V2.1 bật (LED EVO21 thay) */ringDash(c,R,ti>=4?10:6,col,ti>=4?.32:.25,1.6,now*.6);if(ti>=4){ringDash(c,R*.82,14,'#fde047',.28,1.2,-now*.9);c.strokeStyle=rgba(col,.14);c.lineWidth=5;c.beginPath();c.arc(0,0,R*1.04,0,6.283);c.stroke();}}
  // viền hào quang khi Bạo Tẩu: bóng mờ màu hệ to hơn thân 7 %, vẽ SAU thân → chỉ lộ thành viền
  if(sp){const h=halo(id,f);if(h){const S=F*k*1.07;c.globalAlpha=.30+.15*(.5+.5*Math.sin(now*6));c.drawImage(h,-S/2,-S/2,S,S);c.globalAlpha=1;}}
  // phản lực 2 luồng ở đáy thân
  const jy=u(B[5])-2,jx=u(B[4]),jl=u(.17)*(sp?1.5:1)*(ti>=2?1.12:1),jw=Math.max(3.5,u(.028))*(sp?1.25:1);
  for(const s of [-1,1])flame(c,s*jx,jy,jw,jl,col,now,s);
  if(sp)for(const s of [-1,1]){c.fillStyle='rgba(255,255,255,.55)';c.beginPath();c.ellipse(s*jx,jy+2,jw*.6,jw*1.1,0,0,6.283);c.fill();}
  // tia lửa phụ ở mép cánh (Lam+)
  if(ti>=1&&!lite&&!window.__L42)for(const s of [-1,1])flame(c,s*u(s<0?-B[0]:B[2])*.92,u(B[6])+2,Math.max(1.6,jw*.45),jl*.45,col,now,s*3);
  c.restore();}
 function front(id,f,sp,F,now,dt){const B=BB[id]&&BB[id][f];if(!B)return;const col=colorOf(id),c=ctx,ti={thuong:0,luc:0,lam:1,tim:2,tim5:3,ss:4}[f]||0,u=v=>v*F;
  c.save();c.globalCompositeOperation='lighter';
  // lõi ngực (ngọc) nhấp nháy (Lam+): đốm sáng nhỏ ngay tại ngọc, cộng sáng
  if(ti>=1&&B.length>8){const gx=u(B[7]),gy=u(B[8]),ph=.5+.5*Math.sin(now*7),r=u(.045)*(1+.25*ph),g=c.createRadialGradient(gx,gy,0,gx,gy,r*2);g.addColorStop(0,'rgba(255,255,255,'+(.18+.22*ph)+')');g.addColorStop(.45,rgba(col,.18+.12*ph));g.addColorStop(1,rgba(col,0));c.fillStyle=g;c.fillRect(gx-r*2,gy-r*2,r*4,r*4);}
  // chớp mũi (Tím+) khi đang trong trận
  let play=false;try{play=mode==='play';}catch{}
  if(ti>=2&&play){const p=(now*8)%1,a=p<.35?(1-p/.35)*.7:0;if(a>0){const y=u(B[1])-2,r=u(.05)*(1+p);const g=c.createRadialGradient(0,y,0,0,y,r);g.addColorStop(0,'rgba(255,255,255,'+a+')');g.addColorStop(1,rgba(col,0));c.fillStyle=g;c.fillRect(-r,y-r,r*2,r*2);}}
  // hạt: Tím+5 / SS trôi quanh thân; Bạo Tẩu 3–4 hạt/giây trôi về đuôi
  const P=st.parts;if((ti>=3&&Math.random()<dt*6)||(sp&&Math.random()<dt*3.5)){const a=Math.random()*6.283,r=u(.3)*(.7+Math.random()*.4);P.push({x:Math.cos(a)*r,y:Math.sin(a)*r*.7,vx:(Math.random()-.5)*12,vy:sp?60+Math.random()*50:-8-Math.random()*10,l:1,c:ti>=4?'#fde047':col});if(P.length>24)P.shift();}
  for(const p of P){p.x+=p.vx*dt;p.y+=p.vy*dt;p.l-=dt*.9;if(p.l<=0)continue;c.globalAlpha=Math.min(1,p.l)*.8;c.fillStyle=rgba(p.c,1);c.beginPath();c.arc(p.x,p.y,1.6+p.l,0,6.283);c.fill();}
  st.parts=P.filter(p=>p.l>0);c.globalAlpha=1;
  // biến hình: 0–0,15 s vòng thu vào tâm, 0,15–0,45 s sóng xung kích + chớp
  const ta=now-st.tOn;if(ta>=0&&ta<.45){const R0=u(.75);if(ta<.15){const q=ta/.15;c.strokeStyle=rgba(col,.9);c.lineWidth=3+4*q;c.beginPath();c.arc(0,0,R0*(1-.85*q),0,6.283);c.stroke();}else{const q=(ta-.15)/.3;c.strokeStyle='rgba(255,255,255,'+(.85*(1-q))+')';c.lineWidth=6*(1-q)+1;c.beginPath();c.arc(0,0,u(.15)+u(1.45)*q,0,6.283);c.stroke();c.strokeStyle=rgba(col,.7*(1-q));c.lineWidth=10*(1-q)+1;c.beginPath();c.arc(0,0,u(.1)+u(1.2)*q,0,6.283);c.stroke();if(q<.5){const g=c.createRadialGradient(0,0,0,0,0,u(.6));g.addColorStop(0,'rgba(255,255,255,'+(.7*(1-q*2))+')');g.addColorStop(1,'rgba(255,255,255,0)');c.fillStyle=g;c.fillRect(-u(.6),-u(.6),u(1.2),u(1.2));}}}
  c.restore();}
 function hookDraw(){try{if(typeof SuperGame==='undefined'||!SuperGame.drawShip||!SuperGame.drawShip.__w309)return false;if(SuperGame.drawShip.__l3)return true;const od=SuperGame.drawShip;
  const f=function(id,rot){if(!on()||!Number.isInteger(id)||!BB[id]||typeof player==='undefined')return od.apply(this,arguments);
   const now=(typeof time==='number'?time:performance.now()/1000),dt=Math.min(.05,Math.max(0,now-(st.last||now)));st.last=now;
   let sp=false;try{sp=superTime>0;}catch{}if(st.id!==id){st.id=id;st.on=sp;st.tOn=sp?now-1:-9;st.parts=[];}if(sp&&!st.on)st.tOn=now;st.on=sp;
   const tf=tierOf(id),F=(76+(sp?12:0))*1.4,bank=(()=>{try{return V118.state().bank||0;}catch{return 0;}})();
   try{ctx.save();ctx.translate(player.x,player.y);ctx.rotate((rot||0)*.6+bank);back(id,tf,sp,F,now);ctx.restore();}catch(e){try{ctx.restore();}catch{}}
   const r=od.apply(this,arguments);
   try{ctx.save();ctx.translate(player.x,player.y);ctx.rotate((rot||0)*.6+bank);front(id,tf,sp,F,now,dt);ctx.restore();}catch(e){try{ctx.restore();}catch{}}
   return r;};
  f.__l3=1;f.__w309=1;SuperGame.drawShip=f;return true;}catch{return false;}}
 const iv=setInterval(()=>{const a=hookScale(),b=hookDraw();if(a&&b)clearInterval(iv);},250);
 window.L3309S={st,tierOf,BB};
})();
