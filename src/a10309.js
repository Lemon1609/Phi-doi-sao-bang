'use strict';
// V309 Lượt 10 · KHỐI A "THỔI HỒN" (tắt toàn bộ: window.ANIM10=false)
//  WING10: vẽ thân 3 mảnh (cánh trái 0–38 % · thân 32–68 % · cánh phải 62–100 %, chồng 6 %) và xoay 2 cánh quanh gốc cánh:
//   thường ±3,8° nhịp chậm; Bạo Tẩu (tàu người chơi) / boss gồng laser: bung 7° nhịp nhanh.
//   Chiến cơ (v118 put) và Chiến Thần dạng chiến cơ (SSSGame) cắt bằng VÙNG CON của atlas đã nạp (giữ đường nhuộm Trang phục l8309);
//   Kho / Bách khoa / Boss cắt 1 lần ra 3 canvas offscreen (cache WeakMap) rồi chỉ vẽ lại.
//  LED10: 3 chấm sáng chạy gốc → đầu cánh (chu kỳ 1,2 s, lighter, sprite dựng sẵn). ARC10: hồ quang gấp khúc 4–5 đoạn 1–1,5 px
//   (lõi trắng + viền màu, lighter, không shadowBlur) giữa 2 đầu cánh khi Bạo Tẩu; boss gồng laser: hồ quang quanh thân; boss / cánh < 35 % máu:
//   tia lửa chập điện ngắt quãng. Đồ họa "Nhẹ": 2 chấm / cánh, 1 lớp hồ quang, ít tia lửa.
const WING10=(()=>{
 const on=()=>window.ANIM10!==false;
 const lite=()=>{try{return VisualFX.counts().quality==='light';}catch{return false;}};
 const T=()=>performance.now()/1000;
 const D=Math.PI/180;
 const CUT=[[0,.38],[.32,.68],[.62,1]];
 // ---------- sprite chấm sáng ----------
 const DOT=new Map();function dot(col){let c=DOT.get(col);if(c)return c;c=document.createElement('canvas');c.width=c.height=32;const g=c.getContext('2d'),gr=g.createRadialGradient(16,16,0,16,16,16);gr.addColorStop(0,'rgba(255,255,255,1)');gr.addColorStop(.25,col);gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.fillRect(0,0,32,32);DOT.set(col,c);return c;}
 // ---------- góc cánh ----------
 function angle(burst,seed){const t=T()+(seed||0);const b=Math.max(0,Math.min(1,burst||0));const amp=(3.8+(7-3.8)*b)*D,fq=2.1+(6.5-2.1)*b;return amp*(.5+.5*Math.sin(t*fq))+b*1.5*D;}
 // vẽ 3 mảnh từ vùng con (sx,sy,sw,sh) của img vào (dx,dy,dw,dh); a = góc cánh; py = tâm xoay theo trục dọc (tỉ lệ 0–1)
 function piece9(g,img,sx,sy,sw,sh,dx,dy,dw,dh,i,a,py,draw){const [u0,u1]=CUT[i];const X=sx+sw*u0,Wd=sw*(u1-u0),x0=dx+dw*u0,ww=dw*(u1-u0);
   if(i===1||!a){draw(img,X,sy,Wd,sh,x0,dy,ww,dh);return;}
   const pxv=i===0?dx+dw*.35:dx+dw*.65,pyv=dy+dh*py;g.save();g.translate(pxv,pyv);g.rotate(i===0?a:-a);g.translate(-pxv,-pyv);draw(img,X,sy,Wd,sh,x0,dy,ww,dh);g.restore();}
 function split9(g,img,sx,sy,sw,sh,dx,dy,dw,dh,a,py,raw){const draw=raw||((...p)=>g.drawImage(...p));piece9(g,img,sx,sy,sw,sh,dx,dy,dw,dh,0,a,py,draw);piece9(g,img,sx,sy,sw,sh,dx,dy,dw,dh,2,a,py,draw);piece9(g,img,sx,sy,sw,sh,dx,dy,dw,dh,1,a,py,draw);}
 // cache 3 canvas offscreen cho ảnh rời (Kho / Bách khoa / Boss)
 const CACHE=new WeakMap();
 function pieces(img){let c=CACHE.get(img);if(c)return c;const w=img.naturalWidth||img.width,h=img.naturalHeight||img.height;if(!w||!h)return null;
   c=CUT.map(([u0,u1])=>{const cv=document.createElement('canvas');cv.width=Math.max(1,Math.round(w*(u1-u0)));cv.height=h;cv.getContext('2d').drawImage(img,w*u0,0,w*(u1-u0),h,0,0,cv.width,h);return cv;});c.w=w;c.h=h;CACHE.set(img,c);return c;}
 function drawSplit(g,img,dx,dy,dw,dh,a,py){if(!on()){g.drawImage(img,dx,dy,dw,dh);return;}const P=pieces(img);if(!P){g.drawImage(img,dx,dy,dw,dh);return;}
   for(const i of [0,2,1]){const [u0,u1]=CUT[i],x0=dx+dw*u0,ww=dw*(u1-u0);if(i===1||!a){g.drawImage(P[i],x0,dy,ww,dh);continue;}const pxv=i===0?dx+dw*.35:dx+dw*.65,pyv=dy+dh*py;g.save();g.translate(pxv,pyv);g.rotate(i===0?a:-a);g.translate(-pxv,-pyv);g.drawImage(P[i],x0,dy,ww,dh);g.restore();}}
 // ---------- LED + hồ quang (toạ độ cục bộ, tâm ảnh = 0,0; cạnh ảnh = S) ----------
 const rot=(x,y,px,py,a)=>{const c=Math.cos(a),s=Math.sin(a),X=x-px,Y=y-py;return [px+X*c-Y*s,py+X*s+Y*c];};
 function wingPts(S,a,bb,py){const tipX=bb?Math.max(Math.abs(bb[0]),Math.abs(bb[2]))*S*.86:S*.4,tipY=bb&&bb[6]!=null?bb[6]*S:S*.08,root=[S*.12,S*(py-.5)+S*.02];
   const pv=S*(py-.5);const L=rot(-tipX,tipY,-S*.15,pv,a),R=rot(tipX,tipY,S*.15,pv,-a),LR=rot(-root[0],root[1],-S*.15,pv,a),RR=rot(root[0],root[1],S*.15,pv,-a);return {L,R,LR,RR};}
 function led(g,S,a,col,bb,py){if(!on())return;const P=wingPts(S,a,bb,py),n=lite()?2:3,t=T(),im=dot(col);g.save();g.globalCompositeOperation='lighter';
   for(const [r0,r1] of [[P.LR,P.L],[P.RR,P.R]])for(let k=0;k<n;k++){const u=((t/1.2)+k/n)%1,x=r0[0]+(r1[0]-r0[0])*u,y=r0[1]+(r1[1]-r0[1])*u,s=Math.max(5,S*.075)*(1-u*.35);g.globalAlpha=Math.min(1,(u<.15?u/.15:1)*(1-u)*1.6);g.drawImage(im,x-s,y-s,s*2,s*2);}
   g.restore();}
 const ARCS=new Map();
 function zig(key,x0,y0,x1,y1,n,amp){let A=ARCS.get(key);const t=performance.now();if(!A||t-A.t>70){const pts=[];for(let i=1;i<n;i++){const u=i/n;pts.push([u,(Math.random()-.5)*2*amp]);}A={t,pts};ARCS.set(key,A);if(ARCS.size>40)ARCS.clear();}
   const dx=x1-x0,dy=y1-y0,L=Math.hypot(dx,dy)||1,nx=-dy/L,ny=dx/L,out=[[x0,y0]];for(const [u,o] of A.pts)out.push([x0+dx*u+nx*o,y0+dy*u+ny*o]);out.push([x1,y1]);return out;}
 function stroke(g,pts,col,w){g.beginPath();g.moveTo(pts[0][0],pts[0][1]);for(let i=1;i<pts.length;i++)g.lineTo(pts[i][0],pts[i][1]);g.strokeStyle=col;g.lineWidth=w;g.stroke();}
 // L10B: tia điện 2 lớp mềm — hào quang ngoài 3,5 px đúng màu α .35 + lõi 1,3 px màu pha sáng (không trắng tinh), nhá ngắt quãng theo nhịp ngắn
 const LT=new Map();function light(col){let r=LT.get(col);if(r)return r;let m=/^#?([0-9a-f]{6})$/i.exec(col||'');let R=125,G=211,B=252;if(m){const n=parseInt(m[1],16);R=n>>16&255;G=n>>8&255;B=n&255;}
   const f=.55;r=`rgb(${Math.round(R+(255-R)*f)},${Math.round(G+(255-G)*f)},${Math.round(B+(255-B)*f)})`;LT.set(col,r);return r;}
 function hsh(k){let h=0;for(let i=0;i<k.length;i++)h=(h*31+k.charCodeAt(i))|0;return (h>>>0)%997/997;}
 function arc(g,key,x0,y0,x1,y1,col,amp){if(!on())return;const ph=(performance.now()/1000*6.5+hsh(key))%1;if(ph>.55)return;/* nhá ~55 % thời gian, nhịp ~0,15 s */
   const pts=zig(key,x0,y0,x1,y1,lite()?4:5,amp);g.save();g.globalCompositeOperation='lighter';g.lineJoin='round';g.lineCap='round';
   const fade=ph<.08?ph/.08:ph>.45?(.55-ph)/.1:1;g.globalAlpha=.35*fade;stroke(g,pts,col,3.5);g.globalAlpha=.85*fade;stroke(g,pts,light(col),1.3);g.restore();}
 function tipArc(g,S,a,col,bb,py,key){const P=wingPts(S,a,bb,py);if(Math.random()<.18)return;arc(g,key+'a',P.L[0],P.L[1],P.R[0],P.R[1],col,S*.08);if(!lite()&&Math.random()<.5)arc(g,key+'b',P.LR[0],P.LR[1],P.L[0],P.L[1],col,S*.05);}
 // ---------- L10B · cánh năng lượng tàu con: 5 nan lông vũ uốn cong, dựng sẵn 1 lần ra canvas (cache theo cặp màu) ----------
 const PW=new Map();
 function podWingImg(c0,c1){const k=c0+'|'+c1;let cv=PW.get(k);if(cv)return cv;cv=document.createElement('canvas');cv.width=128;cv.height=128;const g=cv.getContext('2d');
   const gr=g.createLinearGradient(8,110,120,10);gr.addColorStop(0,'rgba(236,254,255,.95)');gr.addColorStop(.22,c0);gr.addColorStop(.7,c1);gr.addColorStop(1,'rgba(0,0,0,0)');
   for(let i=0;i<5;i++){const a0=-1.25+i*.33,L=70+i*9-(i===4?14:0),w=9-i*.9;g.save();g.translate(10,104);g.rotate(a0);g.beginPath();g.moveTo(0,-w*.5);g.bezierCurveTo(L*.35,-w*1.4,L*.72,-w*.9-L*.08,L,-L*.12);g.bezierCurveTo(L*.7,w*.2-L*.04,L*.35,w*.9,0,w*.5);g.closePath();
     g.globalAlpha=.78-i*.06;g.fillStyle=gr;g.fill();g.globalAlpha=.55;g.strokeStyle='rgba(236,254,255,.55)';g.lineWidth=.8;g.beginPath();g.moveTo(2,0);g.bezierCurveTo(L*.4,-w*.6,L*.75,-w*.4-L*.08,L*.96,-L*.115);g.stroke();g.restore();}
   PW.set(k,cv);if(PW.size>16)PW.delete(PW.keys().next().value);return cv;}
 // vẽ 2 cánh hai bên tàu con (x,y = tâm, w = cỡ tàu con); sp = Bạo Tẩu (rực hơn, bung rộng); cols = [lõi, chóp] (màu Trang Phục nếu có)
 function podWing(g,x,y,w,sp,cols){if(!on())return;const f18=window.FX18!==false&&window.FX18API;if(f18&&!cols)cols=FX18API.podCols();if(f18&&window.FX17B!==false){FX18API.podFx(g,x,y,w,sp,(cols&&cols[1])||'#7dd3fc',T());return;}/* V309 L17B */const c0=(cols&&cols[0])||'#22d3ee',c1=(cols&&cols[1])||'#7c3aed',im=f18?FX18API.wingImg(c0,c1):podWingImg(c0,c1),a=angle(sp?1:0,.9),K11=window.PW11===false?1:(+window.PW11K||1.7),S=w*(sp?1.25:1.05)*K11,UP=window.PW11===false?0:(+window.PW11UP||(sp?.85:.72));
   g.save();for(const sd of [-1,1]){g.save();g.translate(x+sd*w*.18,y+w*(K11>1?.02:.12));g.scale(sd,1);g.rotate(-a*1.2-(sp?.12:0)-UP);if(f18){g.globalCompositeOperation='lighter';g.globalAlpha=sp?1:.82;}else g.globalAlpha=sp?.95:.62;g.drawImage(im,-S*.06,-S*.82,S,S);
     if(sp&&!lite()){g.globalCompositeOperation='lighter';g.globalAlpha=.3;g.drawImage(im,-S*.06,-S*.82,S,S);}g.restore();}g.restore();}
 // ---------- tia lửa chập điện ----------
 const SP=[];
 function spark(x,y,col){if(SP.length>(lite()?30:70))return;const n=lite()?3:6;for(let i=0;i<n;i++){const a=Math.random()*Math.PI*2,v=60+Math.random()*160;SP.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-40,t:0,L:.18+Math.random()*.22,c:col});}}
 let spT=0;function sparks(g){if(!SP.length)return;const t=T(),dt=Math.min(.05,spT?t-spT:.016);spT=t;g.save();g.globalCompositeOperation='lighter';g.lineWidth=1.3;
   for(const p of SP){p.t+=dt;p.vy+=260*dt;const x0=p.x,y0=p.y;p.x+=p.vx*dt;p.y+=p.vy*dt;g.globalAlpha=Math.max(0,1-p.t/p.L);g.strokeStyle=p.t<p.L*.4?light(p.c):p.c;g.beginPath();g.moveTo(x0,y0);g.lineTo(p.x,p.y);g.stroke();}
   g.restore();for(let i=SP.length-1;i>=0;i--)if(SP[i].t>=SP[i].L)SP.splice(i,1);}
 // ---------- móc vào v118 (chiến cơ) ----------
 const colOf=id=>{try{return Fighters28.profiles[id].color||'#7dd3fc';}catch{return '#7dd3fc';}};
 const bbOf=id=>{try{const L=window.L3309S,f=L.tierOf(id);return (L.BB[id]||{})[f]||null;}catch{return null;}};
 // gọi thay cho ctx.drawImage(atlas, ô…) trong v118.put
 function put(g,img,sx,sy,sw,sh,dx,dy,dw,dh,u,id){if(!on()){g.drawImage(img,sx,sy,sw,sh,dx,dy,dw,dh);return;}const a=angle(u,id*.37);split9(g,img,sx,sy,sw,sh,dx,dy,dw,dh,a,.5);}
 // gọi sau khi vẽ thân (đã ở toạ độ tàu): LED luôn, hồ quang khi Bạo Tẩu
 function fx(g,S,u,id){if(!on()||window.__L42)return;/* V2.1.42: LED 3 chấm + hồ quang chóp cánh cũ → EVO21_LED */const a=angle(u,id*.37),col=colOf(id),bb=bbOf(id);led(g,S,a,col,bb,.5);if(u>.5)tipArc(g,S,a,col,bb,.5,'p'+id);}
 // ---------- Chiến Thần dạng chiến cơ (SSSGame) ----------
 function hookSSS(){try{if(typeof SSSGame==='undefined'||SSSGame.__a10||!SSSGame.draw)return;const od=SSSGame.draw;SSSGame.draw=function(r,bank){if(!on())return od.apply(this,arguments);const g=ctx,raw=g.drawImage,self=this;let hit=null;
   const a=angle((typeof superTime==='number'&&superTime>0)?1:0,1.7);
   let o8=null;try{if(window.SK8ROB!==false&&typeof L8309!=='undefined'&&window.SKIN8!==false){const o=L8309.wear('ship');if(o&&o.id!=='def')o8=o;}}catch{}/* L10B: nhuộm Trang Phục cho Chiến Thần (bake LUT 1 lần / ô atlas, tắt window.SK8ROB=false) */
   const big=img=>img&&((img.naturalWidth||img.width)>=256);
   g.drawImage=function(img,sx,sy,sw,sh,dx,dy,dw,dh){try{const n=arguments.length;
     if(n===9&&img&&(img===window.__hop309bay||img===window.__hop309atlas||(img.naturalWidth||img.width)>=1400)){let I=img,X=sx,Y=sy,Wd=sw,Hd=sh;if(o8){const b=L8309.bake(img,o8,sx,sy,sw,sh);if(b){I=b;X=0;Y=0;Wd=b.width;Hd=b.height;}}
       if(sy<(img.naturalHeight||img.height)*.45&&dw>30){if(!hit)hit={dx,dy,dw,dh};return split9(g,I,X,Y,Wd,Hd,dx,dy,dw,dh,a,.5,(...p)=>raw.apply(g,p));}if(I!==img)return raw.call(g,I,X,Y,Wd,Hd,dx,dy,dw,dh);}
     else if(o8&&(n===5||n===3)&&big(img)){const b=L8309.bake(img,o8);if(b){const A=[...arguments];A[0]=b;return raw.apply(g,A);}}}catch{}return raw.apply(g,arguments);};
   let res;try{res=od.apply(self,arguments);}finally{g.drawImage=raw;}
   try{if(hit){let col='#c4b5fd';try{col=SSS_MODELS[FusionBlueprints.modelFor(r)].color||col;}catch{}const m=g.getTransform();g.save();g.translate(hit.dx+hit.dw/2,hit.dy+hit.dh/2);led(g,hit.dw,a,col,null,.5);if(typeof superTime==='number'&&superTime>0)tipArc(g,hit.dw,a,col,null,.5,'sss');g.restore();g.setTransform(m);}}catch{}
   return res;};SSSGame.draw.__a10=1;SSSGame.__a10=1;}catch{}}
 // ---------- Boss (boss82 gọi WING10.boss thay drawImage) ----------
 const charging=()=>{if(window.__ch10)return true;try{return (beams||[]).some(b=>b&&b.age<b.warn);}catch{return false;}};
 function bossDraw(g,img,x,y,S,b){if(!on()){g.drawImage(img,x,y,S,S);return;}const ch=charging(),a=angle(ch?1:0,2.3)*.85;drawSplit(g,img,x,y,S,S,a,.45);
   const cx=x+S/2,cy=y+S*.45,col=ch?'#fb923c':((b&&b.color)||'#ff4d6d');
   if(ch&&!lite()||ch&&Math.random()<.5){for(let k=0;k<(lite()?1:3);k++){const a0=Math.random()*Math.PI*2,r0=S*.18,r1=S*(.3+Math.random()*.12);arc(g,'b'+k,cx+Math.cos(a0)*r0,cy+Math.sin(a0)*r0,cx+Math.cos(a0+.5)*r1,cy+Math.sin(a0+.5)*r1,col,S*.04);}}
   try{const now=T();if(b&&now-(b.__sp10||0)>(lite()?.5:.28)){b.__sp10=now;const low=b.max&&b.hp/b.max<.35;for(const p of (b.parts||[]))if(!p.dead&&p.max&&p.hp/p.max<.35&&Math.random()<.7)spark(p.x+(Math.random()-.5)*20,p.y+(Math.random()-.5)*16,'#fbbf24');
     if(low&&Math.random()<.8)spark(cx+(Math.random()-.5)*S*.4,cy+(Math.random()-.5)*S*.3,'#fb923c');}}catch{}
   sparks(g);}
 // ---------- sân khấu canvas dùng chung (Kho / Bách khoa) ----------
 function Stage(c,cfg){const K={c,raf:0,b:[],pb:[],m:[],fx:[],sh:0,ps:0,ms:.4,lt:0,src:'',im:null,st:null,cfg,alive:()=>c.isConnected};
   function img(src){if(!src)return null;if(K.src!==src){K.src=src;K.im=new Image();K.im.src=src;}return K.im;}
   const okI=im=>im&&im.complete!==false&&(im.naturalWidth||im.width);
   function frame(){if(!K.alive()||!(K.cfg.visible?K.cfg.visible():true)){K.raf=0;return;}K.raf=requestAnimationFrame(frame);if(window.V2142!==false){/* V2.1.42: sân khấu 30 FPS, dừng khi có bảng che, DPR ≤ 1,5 */if(window.__modal42)return;const n42=performance.now();if(n42-(K.l42||0)<31)return;K.l42=n42;}const W=c.clientWidth,H=c.clientHeight;if(!W||!H)return;const dpr=Math.min(window.V2142!==false?1.5:2,window.devicePixelRatio||1);
     if(c.width!==Math.round(W*dpr)||c.height!==Math.round(H*dpr)){c.width=Math.round(W*dpr);c.height=Math.round(H*dpr);}const g=c.getContext('2d');g.setTransform(dpr,0,0,dpr,0,0);g.clearRect(0,0,W,H);
     const t=T(),dt=Math.min(.05,K.lt?t-K.lt:.016);K.lt=t;const o=K.cfg.get()||{};
     if(!K.st)K.st=Array.from({length:46},()=>({x:Math.random(),y:Math.random(),v:.03+Math.random()*.09,a:.25+Math.random()*.6,s:Math.random()<.2?2:1}));
     for(const s of K.st){s.y+=s.v*dt;if(s.y>1)s.y=0;g.fillStyle=`rgba(205,228,255,${s.a})`;g.fillRect(s.x*W,s.y*H,s.s,s.s);}
     const col=o.col||'#7dd3fc',x=W/2+Math.sin(t*.9)*W*.06,y=H*(o.cy||.66)+Math.sin(t*1.9)*5,S=Math.min(W*(o.sw||.46),H*(o.sh||.5));
     const fx18=window.FX18!==false&&window.FX18API;const im0=img(o.src),sh0=okI(im0)?S*Math.min(1,(im0.naturalHeight||im0.height)/(im0.naturalWidth||im0.width)):S,noseY=y-sh0*.44;
     if(o.ring!==false&&fx18)FX18API.disk(g,W/2,y+S*.43,S*.84,S*.17,t);else if(o.ring!==false){g.save();g.globalAlpha=.55;g.strokeStyle=col;g.lineWidth=1.5;g.beginPath();g.ellipse(W/2,y+S*.42,S*.7,S*.13,0,0,Math.PI*2);g.stroke();g.globalAlpha=.25;g.beginPath();g.ellipse(W/2,y+S*.42,S*.95,S*.18,0,0,Math.PI*2);g.stroke();g.restore();}
     if(o.fire!==false){K.sh-=dt;if(K.sh<=0){const R=fx18&&o.id!=null&&window.Dan307&&Dan307.hangar?Dan307.hangar.rays(o.id):null;if(R){K.sh=.2;const n=Math.min(R.n,7),tot=Math.min(R.tot,.9),sp=760;for(let k=0;k<n;k++){const a=n>1?-tot/2+tot*k/(n-1):0;K.b.push({x:x+(k-(n-1)/2)*3,y:noseY,vx:Math.sin(a)*sp,vy:-Math.cos(a)*sp,age:0,d:1});}}
       else if(fx18){K.sh=.11;K.b.push({x:x,y:noseY,vx:0,vy:-900,age:0,lz:1});}else{K.sh=.12;K.b.push({x:x-S*.07,y:y-S*.36},{x:x+S*.07,y:y-S*.36});}}}
     const pim=okI(o.pod)?o.pod:null,mim=okI(o.mis)?o.mis:null;const burst=o.burst?(o.burst()):0;
     if(pim){K.ps-=dt;if(K.ps<=0){K.ps=.3;K.pb.push({x:x-S*.62,y:y-S*.1},{x:x+S*.62,y:y-S*.1});}}
     if(o.misOn!==false){K.ms-=dt;if(K.ms<=0){K.ms=1.3;K.m.push({x:x-S*.3,y:y-S*.2,vx:-110,vy:-120,a:0},{x:x+S*.3,y:y-S*.2,vx:110,vy:-120,a:0});}}
     for(const b of K.b){if(!b.d&&!b.lz)continue;b.age+=dt;b.x+=b.vx*dt;b.y+=b.vy*dt;if(b.d){if(!Dan307.hangar.draw(g,o.id,b.x,b.y,b.vx,b.vy,b.age,col,.62))b.dead=1;}
       else{g.save();g.globalCompositeOperation='lighter';const L=46,gr=g.createLinearGradient(0,b.y,0,b.y+L);gr.addColorStop(0,'#ffffff');gr.addColorStop(.3,col);gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.fillRect(b.x-2.2,b.y,4.4,L);g.globalAlpha=.35;g.fillRect(b.x-5,b.y,10,L*.7);g.restore();}
       if(b.y<20||b.x<-20||b.x>W+20){b.dead=1;if(!(window.FX17B!==false))K.fx.push({x:Math.max(6,Math.min(W-6,b.x)),y:22,t:0});}}
     g.save();g.globalCompositeOperation='lighter';
     for(const b of K.b){if(b.d||b.lz)continue;b.y-=620*dt;const L=26,gr=g.createLinearGradient(b.x,b.y-L/2,b.x,b.y+L/2);gr.addColorStop(0,'#ffffff');gr.addColorStop(.35,col);gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.beginPath();g.ellipse(b.x,b.y,3.4,L/2,0,0,Math.PI*2);g.fill();if(b.y<20){b.dead=1;K.fx.push({x:b.x,y:22,t:0});}}
     for(const b of K.pb){b.y-=480*dt;g.fillStyle='rgba(125,211,252,.9)';g.beginPath();g.ellipse(b.x,b.y,2.6,8,0,0,Math.PI*2);g.fill();if(b.y<10)b.dead=1;}
     for(const f of K.fx){f.t+=dt;g.globalAlpha=Math.max(0,1-f.t/.25);g.strokeStyle=col;g.lineWidth=2;g.beginPath();g.arc(f.x,f.y,4+f.t*60,0,Math.PI*2);g.stroke();if(f.t>.25)f.dead=1;}
     g.globalAlpha=1;g.restore();K.b=K.b.filter(b=>!b.dead);K.pb=K.pb.filter(b=>!b.dead);K.fx=K.fx.filter(f=>!f.dead);
     for(const m of K.m){m.a+=dt;const k=Math.min(1,m.a*2);m.vx+=((W/2-m.x)*2.5-m.vx)*dt*k*2;m.vy+=(-460-m.vy)*dt*k*2;m.x+=m.vx*dt;m.y+=m.vy*dt;
       g.save();g.translate(m.x,m.y);g.rotate(Math.atan2(m.vy,m.vx)+Math.PI/2);if(fx18)FX18API.flame(g,0,13,0,30,11,o.mcol||'#ffb347',t,m.x*.01,true);else{g.globalCompositeOperation='lighter';g.fillStyle='rgba(251,146,60,.55)';g.beginPath();g.ellipse(0,14,4,12,0,0,Math.PI*2);g.fill();}g.globalCompositeOperation='source-over';
       if(mim){const iw=mim.naturalWidth||mim.width,ih=mim.naturalHeight||mim.height,L=30,w=L*iw/ih;g.drawImage(mim,-w/2,-L/2,w,L);if(window.EvoLED)try{const e=window.Evo21&&Evo21.hangarImg('missiles');if(e)EvoLED.mis(g,w,L,e.I,false);}catch{}}else{g.fillStyle='#fde68a';g.fillRect(-2,-9,4,18);}g.restore();if(m.y<16){m.dead=1;if(!(fx18&&window.FX17B!==false))K.fx.push({x:m.x,y:20,t:0});}}K.m=K.m.filter(m=>!m.dead);
     if(pim){const iw=pim.naturalWidth||pim.width,ih=pim.naturalHeight||pim.height,s=S*.24/Math.max(iw,ih);let pc=null;try{pc=window.SK8P&&window.SK8P('pod');}catch{}if(!pc&&fx18&&o.pcol)pc=o.pcol;for(const sd of [-1,1]){const px=x+sd*S*.62,py=y+S*.02+Math.sin(t*2.4+sd)*3;podWing(g,px,py,S*.24,burst>.5,pc);g.drawImage(pim,px-iw*s/2,py-ih*s/2,iw*s,ih*s);if(window.EvoLED)try{const e=window.Evo21&&Evo21.hangarImg('sidearm');if(e)EvoLED.pod(g,px,py,S*.24,e.I,burst>.5,null);}catch{}}}
     const im=img(o.src);
     if(okI(im)){const a=angle(burst,.9),iw=im.naturalWidth||im.width,ih=im.naturalHeight||im.height,sw=S*Math.min(1,iw/ih),sh=S*Math.min(1,ih/iw);
       const f17b=fx18&&window.FX17B!==false,inf=f17b?FX18API.shipInfo(im):null,col2=(inf&&inf.col)||col;
       if(o.fire!==false&&f17b)FX18API.engine(g,x,y,sw,sh,inf,col2,t);else if(o.fire!==false&&fx18){for(const sd of [-1,1])FX18API.flame(g,x+sd*sw*.075,y+sh*.38,0,S*.2,S*.075,col,t,sd*3.1);}else if(o.fire!==false){g.save();g.globalCompositeOperation='lighter';g.globalAlpha=.5;g.fillStyle=col;g.beginPath();g.ellipse(x-S*.08,y+S*.4,4,14+Math.sin(t*30)*3,0,0,Math.PI*2);g.ellipse(x+S*.08,y+S*.4,4,14+Math.cos(t*30)*3,0,0,Math.PI*2);g.fill();g.restore();}
       if(o.wing!==false)drawSplit(g,im,x-sw/2,y-sh/2,sw,sh,a,.5);else g.drawImage(im,x-sw/2,y-sh/2,sw,sh);
       if(window.EvoLED&&o.wing!==false&&Number.isInteger(o.id))try{EvoLED.stageShip(g,o.id,x,y,S,t,burst);}catch{}/* V2.1 EVO21_LED trên bệ Kho */
       if(o.th17&&window.TH17API)try{TH17API.fx(g,o.id,im,x,y,sw,0,t,true);}catch{}
       if(o.shield){g.save();g.globalCompositeOperation='lighter';g.globalAlpha=.35+.15*Math.sin(t*3);g.strokeStyle=o.shield;g.lineWidth=2.5;g.beginPath();g.arc(x,y,S*.62,0,Math.PI*2);g.stroke();g.restore();}
       g.save();g.translate(x,y);if(o.wing!==false)led(g,Math.min(sw,sh)>0?sw:S,a,col,o.bb||null,.5);if(burst>.5||o.arc)tipArc(g,sw,a,col,o.bb||null,.5,'st'+(o.key||''));g.restore();}}
   K.start=()=>{if(!K.raf)K.raf=requestAnimationFrame(frame);};return K;}
 // ---------- ánh kim quét trang bị Tím+ / SSS (thuần CSS, JS chỉ gắn 1 thẻ <i class="gl10">) ----------
 function shine(){const ok=on();document.documentElement.classList.toggle('anim10',ok);if(!ok)return;
   const tag=el=>{if(el&&!el.querySelector(':scope>.gl10')){const i=document.createElement('i');i.className='gl10';el.appendChild(i);}};
   document.querySelectorAll('#hb-body.k307 .hb-slot').forEach(s=>{const t=(s.querySelector(':scope>b')||{}).textContent||'';const art=s.querySelector('[class*=gear25-],.c9art');if(art&&/Tím|SSS|Huyền/.test(t))tag(art);});
   document.querySelectorAll('#k307 .k307-row[data-f="3"] .k307-ic,#nc307 .nc307-row[data-f="3"] .nc307-mini').forEach(tag);}
 // L10B: Sảnh (sân khấu demo) không vẽ quả cầu sáng VisualFX.ultimate lúc demo Bạo Tẩu — nguồn chính làm tàu lóa trắng (tắt window.SANH10=false)
 // L10B: bỏ ảnh chớp nòng cũ của súng chính (ShotV2 — hình phi tiêu trắng mảnh ngay trên mũi tàu khi bắn thường). Tắt: window.MUZ10=false
 function hookMuz(){try{if(typeof ShotV2==='undefined'||ShotV2.__m10)return;const om=ShotV2.drawMuzzle;ShotV2.drawMuzzle=function(){if(window.MUZ10!==false&&window.ANIM10!==false)return;return om.apply(this,arguments);};ShotV2.__m10=1;}catch{}}
 function hookFlash(){try{if(typeof VisualFX==='undefined'||VisualFX.__u10)return;const ou=VisualFX.ultimate;VisualFX.ultimate=function(){if(window.HANGAR_DEMO&&window.SANH10!==false&&window.ANIM10!==false)return;return ou.apply(this,arguments);};VisualFX.__u10=1;}catch{}}
 setInterval(()=>{try{hookSSS();shine();hookFlash();hookMuz();}catch{}},700);
 return {podWing,podWingImg,put,fx,split9,drawSplit,angle,led,arc,tipArc,spark,sparks,bossDraw,Stage,colOf,bbOf,on};
})();
window.WING10=WING10;
