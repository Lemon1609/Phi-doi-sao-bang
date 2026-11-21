'use strict';
// V309 Lượt 8 · TRANG PHỤC 4 HẠNG (SKIN8) — nâng cấp ngay trên Tủ skin cũ (Skin69.open mở màn mới; nút "SKIN CHIẾN CƠ (MÀU THÂN)" vẫn mở tủ cũ, save skin cũ giữ nguyên).
//  4 hạng phối màu: Sử Thi (Vô Úy Thệ Ước) · Điển Tàng (Ám Chất Lưu Kim) · Hạn Định (Kính Diện Băng Tinh) · Truyền Thuyết (Thâm Uyên Chân Lý).
//  Mặc riêng cho 3 ô: Chiến Cơ · Tàu Con · Tên Lửa. Chỉ số (chủ dự án 21/11 18:10): +2/+4/+6/+8 % Công theo hạng cao nhất đang mặc (không cộng dồn giữa các ô)
//   + Thưởng Bộ 3/3 (cả 3 ô cùng một hạng) +3 % Công. Nhân vào Combat.factor + lực chiến.
//  Đổi màu: pre-bake bảng màu theo độ sáng ra canvas phụ 1 lần (cache), trong trận chỉ vẽ ảnh đã nhuộm. Không ctx.filter / shadowBlur.
//   Chiến cơ: ảnh thân (atlas lớn, vẽ 9 tham số trong SuperGame.drawShip) · đạn chính dan307 (bảng [lõi,thân,viền] 'sk8_<hạng>') ·
//   vệt phản lực ≤ 18 hạt cộng sáng · hiệu ứng trúng boss/tinh anh. Tàu con / Tên lửa: ảnh tàu con + đạn trong tb309 (SK8B) + màu đuôi (SK8P).
//  Tab Avatar & Danh Hiệu: khung avatar + danh hiệu ở Sảnh (giữ từ bản trước).
//  Khóa lưu: saobang-skin8-v1 {o:{ship,pod,mis},frame,title,unl:{}} (trail/hit cũ giữ trong save nhưng không dùng). Tắt: window.SKIN8=false
const L8309=(()=>{
 const T0=performance.now();const TAU=Math.PI*2,now=()=>performance.now(),on=()=>window.SKIN8!==false;
 const KEY='saobang-skin8-v1';let S={trail:'def',hit:'def',frame:'def',title:'none',unl:{},o:{ship:'def',pod:'def',mis:'def'}};
 try{const o=JSON.parse(localStorage.getItem(KEY)||'null');if(o)S=Object.assign(S,o);}catch{}
 if(!S.o||typeof S.o!=='object')S.o={ship:'def',pod:'def',mis:'def'};
 const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S));}catch{}};
 const play=()=>{try{return mode==='play';}catch{return false;}};
 const light=()=>{try{return VisualFX.counts().quality==='light';}catch{return false;}};
 // ---------- tiến độ mở khóa ----------
 const P={tower:()=>{try{return Meta40.state().S.tower.best|0;}catch{return 0;}},
  rob:()=>{try{const s=new Set((Fusion.getState().supers||[]).map(q=>q.model));return s.size;}catch{return 0;}},
  sss:()=>{try{return Gear44.defs().filter(d=>Gear44.owns(d.id)).length;}catch{return 0;}},
  tim3:()=>{try{let n=0;for(let i=0;i<13;i++)if((V70.craftN(i)|0)>=9)n++;return n;}catch{return 0;}},
  esc:()=>{try{return V92.rank().best|0;}catch{return 0;}}};
 const U={tower:'tầng Tháp Boss',rob:'Chiến Thần',sss:'SSS',tim3:'chiến cơ Tím+3',esc:'điểm Vô Tận (hạng Vàng)'};
 const fmt=n=>Math.round(n).toLocaleString('vi-VN');
 // ---------- 4 hạng trang phục ----------
 //  req: danh sách phương án (chỉ cần đạt 1); mỗi phương án là các điều kiện phải đạt cùng lúc.
 //  lut: bảng màu theo độ sáng (60–30–10: nền tối · thân · điểm nhấn sáng). b: đạn [lõi,thân,viền]. tr/tc: vệt. hk/hc: hiệu ứng trúng.
 const O=[
  {id:'def',n:'Mặc định',d:'Màu gốc của chiến cơ / trang bị.',atk:0},
  {id:'epic',r:'SỬ THI',n:'Vô Úy Thệ Ước',d:'Bạch ngọc – lam hoàng gia – vàng kim. Đạn lam–vàng, vệt sao lấp lánh.',atk:.02,req:[[['tim3',1]],[['tower',15]]],
   lut:[[0,'#06123a'],[.28,'#1d4ed8'],[.52,'#b9c7dc'],[.78,'#f4f7fb'],[.9,'#fde047'],[1,'#fffbe6']],b:[[254,249,195],[59,130,246],[30,58,138]],tr:'galaxy',tc:['#fef9c3','#60a5fa','#1d4ed8'],hk:'gold',hc:['#fef9c3','#60a5fa'],sw:['#f4f7fb','#1d4ed8','#fde047']},
  {id:'class',r:'ĐIỂN TÀNG',n:'Ám Chất Lưu Kim',d:'Đen nhám obsidian – vàng kim loại rực sáng. Đạn vàng kim lõi trắng, vệt ánh kim.',atk:.04,req:[[['tower',35]],[['rob',4]]],
   lut:[[0,'#030304'],[.3,'#121218'],[.5,'#2c2620'],[.64,'#9a6a10'],[.8,'#f5b324'],[.92,'#ffe08a'],[1,'#fffaf0']],b:[[255,251,235],[251,191,36],[146,64,14]],tr:'phoenix',tc:['#fff7d6','#fbbf24','#b45309'],hk:'gold',hc:['#fff7cc','#fbbf24'],sw:['#121218','#f5b324','#fffaf0']},
  {id:'limit',r:'HẠN ĐỊNH',n:'Kính Diện Băng Tinh',d:'Bạc gương chrome – xanh băng điện. Đạn băng lam gương, tia lóe pha lê.',atk:.06,req:[[['tower',50]],[['esc',150000]]],
   lut:[[0,'#0b1220'],[.28,'#3b4a5e'],[.5,'#aab6c6'],[.7,'#eef2f7'],[.84,'#67e8f9'],[1,'#f0feff']],b:[[240,254,255],[103,232,249],[14,116,144]],tr:'ice',tc:['#ecfeff','#67e8f9','#0e7490'],hk:'bolt',hc:['#ecfeff','#38bdf8'],sw:['#eef2f7','#67e8f9','#3b4a5e']},
  {id:'legend',r:'TRUYỀN THUYẾT',n:'Thâm Uyên Chân Lý',d:'Đen hư không – đỏ huyết – tím điện. Đạn tím–đỏ lõi trắng, vệt Nhật Thực.',atk:.08,req:[[['rob',7],['sss',21]]],
   lut:[[0,'#020006'],[.26,'#16031e'],[.45,'#6b0f1a'],[.62,'#dc2626'],[.78,'#a855f7'],[.9,'#e9a8ff'],[1,'#fff0fb']],b:[[255,240,250],[217,70,239],[153,27,27]],tr:'eclipse',tc:['#f5d0fe','#a855f7','#7f1d1d'],hk:'hole',hc:['#f5d0fe','#a855f7'],sw:['#16031e','#dc2626','#a855f7']}];
 const SET=.03;
 const SLOT={ship:'Chiến Cơ',pod:'Tàu Con',mis:'Tên Lửa'};
 const oget=id=>O.find(x=>x.id===id)||O[0];
 const D={
  frame:[{id:'def',n:'Thép Xanh',d:'Khung mặc định.'},
   {id:'silver',n:'Bạc Lam',d:'Viền bạc vát cạnh ánh lam.',req:[[['tower',10]]]},
   {id:'gold',n:'Hoàng Kim',d:'Viền vàng kim vát cạnh.',req:[[['tower',30]]]},
   {id:'void',n:'Tím Hư Không',d:'Viền tím hư không.',req:[[['rob',7]]]},
   {id:'cosmic',n:'Vũ Trụ',d:'Viền sắc cầu vồng vũ trụ.',req:[[['sss',21],['rob',7]]]}],
  title:[{id:'none',n:'Không đeo',d:'Ẩn danh hiệu.'},
   {id:'boss',n:'Kẻ Diệt Boss',d:'Vượt tầng 30 Tháp Boss.',req:[[['tower',30]]]},
   {id:'lord',n:'Chúa Tể Tháp Boss',d:'Vượt tầng 50 Tháp Boss. Chữ vàng kim có ánh quét.',req:[[['tower',50]]]},
   {id:'fuse',n:'Bậc Thầy Hợp Thể',d:'Sở hữu đủ 7 Chiến Thần.',req:[[['rob',7]]]},
   {id:'emperor',n:'Đế Vương Vũ Trụ',d:'Đủ 21 Trang bị SSS + 7 Chiến Thần.',req:[[['sss',21],['rob',7]]]}]};
 const item=(t,id)=>D[t].find(x=>x.id===id)||D[t][0];
 const reqOk=req=>!req||req.some(g=>g.every(([q,v])=>P[q]()>=v));
 function ownedX(k,x){if(!x.req)return true;if(S.unl[k])return true;if(reqOk(x.req)){S.unl[k]=1;save();return true;}return false;}
 const owned=(t,x)=>ownedX(t+':'+x.id,x);
 const oOwned=x=>ownedX('o:'+x.id,x);
 function cur(t){const x=item(t,S[t]);return owned(t,x)?x:D[t][0];}
 function wear(slot){if(!on())return O[0];const x=oget(S.o[slot]);return oOwned(x)?x:O[0];}
 function setInfo(){const w=['ship','pod','mis'].map(wear);const r=w[0].id;let n=0;if(r!=='def')n=w.filter(x=>x.id===r).length;
   const best=w.reduce((a,x)=>x.atk>a.atk?x:a,O[0]);return {n:r==='def'?Math.max(...['epic','class','limit','legend'].map(id=>w.filter(x=>x.id===id).length)):n,full:r!=='def'&&n===3,best,w};}
 function bonus(){if(!on())return 0;const s=setInfo();return s.best.atk+(s.full?SET:0);}
 // ---------- pre-bake bảng màu ----------
 function hex(h){h=h.replace('#','');return [parseInt(h.slice(0,2),16),parseInt(h.slice(2,4),16),parseInt(h.slice(4,6),16)];}
 function lut(o){if(o._L)return o._L;const L=new Uint8ClampedArray(768),st=o.lut.map(([p,c])=>[p,hex(c)]);
   for(let i=0;i<256;i++){const v=i/255;let k=0;while(k<st.length-2&&v>st[k+1][0])k++;const [p0,c0]=st[k],[p1,c1]=st[k+1],f=Math.max(0,Math.min(1,(v-p0)/Math.max(1e-6,p1-p0)));
     for(let j=0;j<3;j++)L[i*3+j]=c0[j]+(c1[j]-c0[j])*f;}return o._L=L;}
 function bakeTo(cv,o){const g=cv.getContext('2d');const d=g.getImageData(0,0,cv.width,cv.height),p=d.data,L=lut(o);
   for(let i=0;i<p.length;i+=4){if(!p[i+3])continue;const r=p[i],gg=p[i+1],b=p[i+2],mx=r>gg?(r>b?r:b):(gg>b?gg:b),v=(r*.3+gg*.59+b*.11)*.55+mx*.45|0;p[i]=L[v*3];p[i+1]=L[v*3+1];p[i+2]=L[v*3+2];}
   g.putImageData(d,0,0);return cv;}
 function bake(im,o,sx,sy,sw,sh){if(!im||!o||o.id==='def')return null;const W=im.naturalWidth||im.width,H=im.naturalHeight||im.height;if(!W||!H)return null;
   const reg=sw!=null;const k=o.id+(reg?'|'+sx+','+sy+','+sw+','+sh:'');const m=im.__k8||(im.__k8={});if(m[k]!==undefined)return m[k];
   try{const cv=document.createElement('canvas');cv.width=reg?Math.max(1,Math.round(sw)):W;cv.height=reg?Math.max(1,Math.round(sh)):H;const g=cv.getContext('2d');
     if(reg)g.drawImage(im,sx,sy,sw,sh,0,0,cv.width,cv.height);else g.drawImage(im,0,0);return m[k]=bakeTo(cv,o);}catch{return m[k]=null;}}
 // tb309 gọi: ảnh tàu con / đạn tàu con / tên lửa
 window.SK8B=function(im,slot){try{const o=wear(slot);if(o.id==='def')return null;if(im.tagName==='IMG'&&!im.complete)return null;return bake(im,o);}catch{return null;}};
 window.SK8P=function(slot){try{const o=wear(slot);return o.id==='def'?null:[o.tc[1],o.tc[1]];}catch{return null;}};
 // dan307 gọi: bảng đạn chính của chiến cơ
 function regB(){try{const M=window.MAU309;if(!M)return false;for(const o of O)if(o.b&&!M['sk8_'+o.id])M['sk8_'+o.id]=o.b;return true;}catch{return false;}}
 window.SK8T=function(){const o=wear('ship');if(o.id==='def')return null;regB();return 'sk8_'+o.id;};
 // ---------- vệt phản lực (dùng chung trận + xem trước) ----------
 const C={};function dot(col){const k='d'+col;if(C[k])return C[k];const n=32,c=document.createElement('canvas');c.width=c.height=n;const g=c.getContext('2d'),h=n/2,gr=g.createRadialGradient(h,h,0,h,h,h);
   gr.addColorStop(0,'#ffffff');gr.addColorStop(.25,col);gr.addColorStop(1,col+'00');g.fillStyle=gr;g.fillRect(0,0,n,n);return C[k]=c;}
 function gem(col){const k='g'+col;if(C[k])return C[k];const n=24,c=document.createElement('canvas');c.width=c.height=n;const g=c.getContext('2d');g.beginPath();g.moveTo(12,1);g.lineTo(20,12);g.lineTo(12,23);g.lineTo(4,12);g.closePath();
   const gr=g.createLinearGradient(0,0,24,24);gr.addColorStop(0,'#ffffff');gr.addColorStop(.5,col);gr.addColorStop(1,'#0c4a6e');g.fillStyle=gr;g.fill();g.strokeStyle='rgba(255,255,255,.8)';g.lineWidth=1;g.stroke();return C[k]=c;}
 function ringS(col){const k='r'+col;if(C[k])return C[k];const n=96,c=document.createElement('canvas');c.width=c.height=n;const g=c.getContext('2d'),h=n/2,gr=g.createRadialGradient(h,h,h*.72,h,h,h);
   gr.addColorStop(0,col+'00');gr.addColorStop(.45,col);gr.addColorStop(.6,'#ffffff');gr.addColorStop(.75,col);gr.addColorStop(1,col+'00');g.fillStyle=gr;g.fillRect(0,0,n,n);return C[k]=c;}
 function holeS(){if(C.h)return C.h;const n=64,c=document.createElement('canvas');c.width=c.height=n;const g=c.getContext('2d'),h=n/2,gr=g.createRadialGradient(h,h,0,h,h,h);
   gr.addColorStop(0,'rgba(0,0,0,.95)');gr.addColorStop(.35,'rgba(20,0,40,.85)');gr.addColorStop(.55,'rgba(168,85,247,.9)');gr.addColorStop(.7,'rgba(245,208,254,.6)');gr.addColorStop(1,'rgba(168,85,247,0)');g.fillStyle=gr;g.fillRect(0,0,n,n);return C.h=c;}
 function Trail(){return {p:[],lx:null,acc:0};}
 function trailStep(T,o,x,y,dt){if(!o.tr)return;const id=o.tr;const vx=T.lx==null?0:(x-T.lx)/Math.max(dt,1e-3);T.lx=x;
   const max=light()?10:18;T.acc+=dt;const every=id==='eclipse'?.045:.028;while(T.acc>every){T.acc-=every;if(T.p.length>=max)T.p.shift();
     const s=id==='galaxy'?2+Math.random()*2.2:id==='ice'?8+Math.random()*5:id==='eclipse'?11+Math.random()*7:6+Math.random()*4;
     T.p.push({x:x+(Math.random()-.5)*8,y:y+2,vx:-vx*.25+(Math.random()-.5)*22,vy:130+Math.random()*60,t:0,l:id==='ice'?.6:id==='eclipse'?.65:.5,s,a:Math.random()*TAU,k:Math.random()});}
   for(const q of T.p){q.t+=dt;q.x+=q.vx*dt;q.y+=q.vy*dt;q.vx*=.96;q.a+=dt*3;}T.p=T.p.filter(q=>q.t<q.l);}
 function trailDraw(g,T,o,x,y,t){if(!o.tr)return;const id=o.tr,[c0,c1,c2]=o.tc;g.save();g.globalCompositeOperation='lighter';
   if(id==='eclipse'){g.globalAlpha=.55;g.strokeStyle=c1;g.lineWidth=2;g.beginPath();g.arc(x,y+6,13,t*4,t*4+TAU*.6);g.stroke();g.strokeStyle='#ef4444';g.lineWidth=1.2;g.beginPath();g.arc(x,y+6,9,-t*5,-t*5+TAU*.45);g.stroke();}
   for(const q of T.p){const u=q.t/q.l,a=1-u;
     if(id==='phoenix'){const col=u<.3?c0:u<.65?c1:c2,s=q.s*(1-u*.6)*2.4;g.globalAlpha=a*.9;g.drawImage(dot(col),q.x-s,q.y-s,s*2,s*2);if(q.k>.8){g.globalAlpha=a;g.strokeStyle=c0;g.lineWidth=1.2;g.beginPath();g.moveTo(q.x,q.y);g.lineTo(q.x-q.vx*.05,q.y-q.vy*.06);g.stroke();}}
     else if(id==='galaxy'){const tw=.55+.45*Math.sin(t*18+q.k*9),s=q.s*2.2;g.globalAlpha=a*tw;g.drawImage(dot(q.k>.5?c1:c0),q.x-s,q.y-s,s*2,s*2);if(q.k>.7){g.strokeStyle=c0;g.lineWidth=.8;g.beginPath();g.moveTo(q.x-s*1.4,q.y);g.lineTo(q.x+s*1.4,q.y);g.moveTo(q.x,q.y-s*1.4);g.lineTo(q.x,q.y+s*1.4);g.stroke();}}
     else if(id==='ice'){const s=q.s*(1-u*.5);g.globalAlpha=a;g.save();g.translate(q.x,q.y);g.rotate(q.a);g.drawImage(gem(c1),-s/2,-s/2,s,s);g.restore();}
     else if(id==='eclipse'){const s=q.s*(.7+u*.8);g.globalAlpha=a*.6;g.drawImage(dot(q.k>.6?c2==='#7f1d1d'?'#ef4444':c0:c1),q.x-s,q.y-s,s*2,s*2);}}
   g.restore();}
 // ---------- hiệu ứng trúng / hạ quái ----------
 function fxHit(L,o,x,y){if(!o.hk)return;if(L.length>16)L.shift();L.push({k:'h',x,y,t:0,l:o.hk==='bolt'?.16:.18,o,r:Math.random()*TAU});}
 function fxKill(L,o,x,y,r){if(!o.hk)return;if(L.length>16)L.shift();L.push({k:'k',x,y,t:0,l:.26,o,s:r||22});}
 function fxDraw(g,L,dt){if(!L.length)return;g.save();g.globalCompositeOperation='lighter';
   for(const f of L){f.t+=dt;const u=f.t/f.l;if(u>=1)continue;const id=f.o.hk,[c0,c1]=f.o.hc,a=1-u;
     if(f.k==='h'){if(id==='hole'){const s=26*(1-u*.6);g.globalCompositeOperation='source-over';g.globalAlpha=a*.85;g.drawImage(holeS(),f.x-s,f.y-s,s*2,s*2);g.globalCompositeOperation='lighter';}
       else{const s=18+14*u;g.globalAlpha=a;g.drawImage(dot(c1),f.x-s,f.y-s,s*2,s*2);}
       if(id==='bolt'){g.globalAlpha=a;g.strokeStyle=c0;g.lineWidth=1.4;for(let j=0;j<3;j++){const an=f.r+j*TAU/3;let px=f.x,py=f.y;g.beginPath();g.moveTo(px,py);for(let s=1;s<=3;s++){px+=Math.cos(an)*9+(Math.random()-.5)*8;py+=Math.sin(an)*9+(Math.random()-.5)*8;g.lineTo(px,py);}g.stroke();}}
       if(id==='gold'){g.globalAlpha=a*.9;g.strokeStyle=c0;g.lineWidth=1.5;const L2=10+16*u;g.beginPath();g.moveTo(f.x-L2,f.y);g.lineTo(f.x+L2,f.y);g.moveTo(f.x,f.y-L2);g.lineTo(f.x,f.y+L2);g.stroke();}}
     else{const e=1-(1-u)*(1-u),R=f.s*(.6+1.8*e);if(id==='hole'){const R2=f.s*(2.2-1.6*e);g.globalAlpha=a*.9;g.drawImage(ringS(c1),f.x-R2,f.y-R2,R2*2,R2*2);}else{g.globalAlpha=a*.85;g.drawImage(ringS(c1),f.x-R,f.y-R,R*2,R*2);}}}
   for(let i=L.length-1;i>=0;i--)if(L[i].t>=L[i].l)L.splice(i,1);g.restore();}
 // ---------- trong trận ----------
 const BT=Trail(),BF=[];let lt=0;
 function battleBack(){if(!on()||!play())return;const t=now()/1000,dt=Math.min(.05,lt?t-lt:.016);lt=t;const o=wear('ship');if(o.id==='def')return;
   let x=0,y=0;try{x=player.x;y=player.y+24;}catch{return;}trailStep(BT,o,x,y,dt);trailDraw(ctx,BT,o,x,y,t);}
 let lf=0;function battleFront(){if(!on())return;const t=now()/1000,dt=Math.min(.05,lf?t-lf:.016);lf=t;if(!play()){BF.length=0;return;}fxDraw(ctx,BF,dt);}
 const hcd=new WeakMap();
 // thân chiến cơ: nhuộm ảnh atlas lớn (vẽ 9 tham số) ngay trong SuperGame.drawShip; các lớp hào quang / cánh / lửa giữ nguyên
 const DI=CanvasRenderingContext2D.prototype.drawImage;let inShip=0,shipO=null;
 function shipDI(im,a,b,c,d,e,f,gg,h){if(inShip===1&&shipO&&arguments.length===9){const W=im.width||im.naturalWidth||0,H=im.height||im.naturalHeight||0;
     if(W*H>1.2e6){const r=bake(im,shipO,a,b,c,d);if(r)return DI.call(this,r,0,0,r.width,r.height,e,f,gg,h);}}
   return DI.apply(this,arguments);}
 function hooks(){
  try{if(typeof SuperGame!=='undefined'&&SuperGame.drawShip&&!SuperGame.drawShip.__l8&&(SuperGame.drawShip.__l3||now()-T0>2500)){const od=SuperGame.drawShip;
    const f=function(){try{battleBack();}catch{}const o=wear('ship');if(o.id==='def'||window.SKIN8SHIP===false)return od.apply(this,arguments);
      const g=(typeof ctx!=='undefined'&&ctx)||null;if(!g)return od.apply(this,arguments);const keep=g.drawImage;inShip++;shipO=o;g.drawImage=shipDI;
      try{return od.apply(this,arguments);}finally{inShip--;if(!inShip){if(keep===DI)delete g.drawImage;else g.drawImage=keep;shipO=null;}}};
    f.__l8=1;f.__l3=od.__l3;f.__w309=od.__w309;SuperGame.drawShip=f;}}catch{}
  try{if(!VisualFX.__l8){VisualFX.__l8=1;const vd=VisualFX.draw;VisualFX.draw=function(){const r=vd.apply(this,arguments);try{battleFront();}catch{}return r;};}}catch{}
  try{if(!Feedback31.__l8){Feedback31.__l8=1;const fd=Feedback31.damage;Feedback31.damage=function(e,amount){const r=fd.apply(this,arguments);try{if(on()&&play()&&e){let big=false;try{big=e===boss||e.bossPart||e.elite;}catch{}const o=wear('ship');
     if(big&&o.hk){const n=now();if((hcd.get(e)||0)<n){hcd.set(e,n+90);fxHit(BF,o,e.x+(Math.random()-.5)*30,e.y+(e===boss?30:8)+(Math.random()-.5)*16);}}}}catch{}return r;};}}catch{}
  try{if(typeof kill==='function'&&!kill.__l8){const ok=kill;const f=function(e){const was=e&&!e.dead;const r=ok.apply(this,arguments);try{if(on()&&was&&e.dead&&play()){let isB=false;try{isB=e===boss;}catch{}const o=wear('ship');if(!isB&&o.hk)fxKill(BF,o,e.x,e.y,(e.r||20)*(e.elite?1.4:1));}}catch{}return r;};f.__l8=1;kill=f;}}catch{}
  // chỉ số: +% Công theo hạng cao nhất đang mặc + Thưởng Bộ 3/3
  try{if(typeof Combat!=='undefined'&&!Combat.__l8){Combat.__l8=1;const of=Combat.factor;Combat.factor=function(){const v=of.apply(this,arguments);try{return v*(1+bonus());}catch{return v;}};
    const ost=Combat.stats;Combat.stats=function(){/* lực chiến ngoài trận không tính trạng thái Bạo Tẩu của sân khấu sảnh (demo bật/tắt superTime làm lực chiến nhảy ±2 %). Tắt: window.CP8FIX=false */let st0=null;try{if(window.CP8FIX!==false&&typeof mode!=='undefined'&&mode!=='play'&&mode!=='pause'&&superTime>0){st0=superTime;superTime=0;}}catch{}let r;try{r=ost.apply(this,arguments);}finally{if(st0!==null)try{superTime=st0;}catch{}}try{const b=bonus();if(b>0&&r){const a0=r.attack;r.attack*=1+b;r.cp=Math.round(r.cp+(r.attack-a0)*24);}}catch{}return r;};}}catch{}
  regB();}
 hooks();setTimeout(hooks,0);setTimeout(hooks,1500);setTimeout(hooks,3000);setTimeout(hooks,6000);
 // ---------- Sảnh: khung + danh hiệu ----------
 function lobby(){const pp=document.getElementById('lb68-pp'),nm=document.getElementById('lb68-pnm');if(!pp||!nm)return;
   const fr=on()?cur('frame').id:'',tt=on()?cur('title'):null;
   pp.classList.forEach(c=>{if(/^fr8/.test(c)&&c!=='fr8'&&c!=='fr8-'+fr)pp.classList.remove(c);});if(fr){pp.classList.add('fr8','fr8-'+fr);}else pp.classList.remove('fr8');
   let el=nm.parentNode.querySelector('.tt8');if(!tt||tt.id==='none'){if(el)el.remove();return;}
   if(!el){el=document.createElement('i');el.className='tt8';nm.insertAdjacentElement('afterend',el);}if(el.dataset.id!==tt.id){el.dataset.id=tt.id;el.className='tt8 tt8-'+tt.id;el.textContent='★ '+tt.n.toUpperCase();}}
 // ---------- màn Trang phục ----------
 let el=null,tab='ship',pv=null,raf=0,origOpen=null,pick={};
 function progRows(req){return req.map((g,i)=>(i?'<i class="or8">hoặc</i>':'')+g.map(([q,v])=>{const h=Math.min(P[q](),v);return `<span><em style="width:${Math.round(h/v*100)}%"></em><b>${fmt(h)}/${fmt(v)} ${U[q]}</b></span>`;}).join('')).join('');}
 const pct=a=>'+'+Math.round(a*100)+'% Công';
 function swatch(o){return o.sw?`linear-gradient(135deg,${o.sw[0]} 0 45%,${o.sw[1]} 45% 80%,${o.sw[2]} 80%)`:'repeating-linear-gradient(45deg,#1e293b,#1e293b 4px,#334155 4px,#334155 8px)';}
 function oCard(o){const own=oOwned(o),use=S.o[tab]===o.id&&own||(o.id==='def'&&!oOwned(oget(S.o[tab]))),sel=(pick[tab]||S.o[tab])===o.id;
   return `<button type="button" class="oc8 rk8-${o.id} ${own?'':'lk'} ${use?'use':''} ${sel?'sel':''}" data-oc8="${o.id}"><i class="sw8" style="background:${swatch(o)}"></i><b>${o.r||'GỐC'}</b><small>${o.n}</small>${own?(use?'<em>ĐANG MẶC</em>':''):'<em class="lk8">🔒</em>'}</button>`;}
 function card(t,x){const own=owned(t,x),use=cur(t).id===x.id,sel=(pick[t]||cur(t).id)===x.id;const sw=t==='frame'?`<i class="sw8 fr8 fr8-${x.id}"></i>`:`<i class="sw8 tt8 tt8-${x.id}">${x.id==='none'?'—':'★'}</i>`;
   return `<button type="button" class="it8 ${own?'':'lk'} ${use?'use':''} ${sel?'sel':''}" data-it8="${t}:${x.id}">${sw}<span class="nm"><b>${x.n}</b><small>${x.d}</small>${own?'':`<span class="pg8">${progRows(x.req)}</span>`}</span><em class="st8">${use?'ĐANG DÙNG':own?'DÙNG':'🔒'}</em></button>`;}
 function render(){if(!el)return;el.querySelectorAll('[data-t8]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.t8===tab)));
   const fr=pick.frame||cur('frame').id,tt=item('title',pick.title||cur('title').id);let nm='PHI CÔNG';try{nm=document.getElementById('lb68-pnm').textContent||nm;}catch{}
   let face='';try{const p=document.getElementById('lb68-pp');face=p?p.innerHTML:'';}catch{}
   el.querySelector('.hd8').innerHTML=`<span class="av8 fr8 fr8-${fr}">${face}</span><span class="nm8"><b>${nm}</b>${tt.id==='none'?'':`<i class="tt8 tt8-${tt.id}">★ ${tt.n.toUpperCase()}</i>`}</span>`;
   const nOwn=O.slice(1).filter(oOwned).length+D.frame.slice(1).filter(x=>owned('frame',x)).length+D.title.slice(1).filter(x=>owned('title',x)).length;
   const si=setInfo();el.querySelector('.cnt8').innerHTML=`Đã sở hữu <b>${nOwn}/12</b>`;
   el.querySelector('.set8').className='set8'+(si.full?' on':'');el.querySelector('.set8').innerHTML=`BỘ <b>${si.full?3:si.n}/3</b> ${si.full?pct(SET):'· +3% Công'}`;
   const mid=el.querySelector('.mid8'),ls=el.querySelector('.ls8'),strip=el.querySelector('.str8');
   if(tab==='av'){mid.hidden=true;strip.hidden=true;ls.hidden=false;ls.innerHTML='<h4>KHUNG AVATAR</h4>'+D.frame.map(x=>card('frame',x)).join('')+'<h4>DANH HIỆU</h4>'+D.title.map(x=>card('title',x)).join('');return;}
   mid.hidden=false;strip.hidden=false;ls.hidden=true;
   const o=oget(pick[tab]||S.o[tab]),own=oOwned(o),use=wear(tab).id===o.id;
   mid.innerHTML=`<div class="rw8"><span class="rk8 rk8-${o.id}">${o.r||'MẶC ĐỊNH'}</span><b class="on8">${o.n}</b><span class="at8">${o.atk?pct(o.atk):'+0% Công'}</span></div><p>${o.d} <i>Áp cho ô ${SLOT[tab]}.</i></p>`
     +(own?`<button type="button" class="wr8 ${use?'use':''}" data-wr8="1">${use?'ĐANG MẶC':'MẶC CHO '+SLOT[tab].toUpperCase()}</button>`:`<div class="pg8">${progRows(o.req)}</div>`);
   strip.innerHTML=O.map(oCard).join('');}
 function shipImg(){try{const i=selected,s=SHIP118[String(i)];const k=s&&(s.tim5||s.tim||Object.values(s)[0]);const im=new Image();im.src=k;return im;}catch{return null;}}
 const MISK={inferno:'c_m_inferno',nova36:'c_m_inferno',cryo:'c_m_cryo',thunder:'c_m_thunder',singularity:'c_m_singularity',devour10_m:'c_m_singularity',spiral:'c_m_spiral',swarm9:'c_m_spiral',stellar:'c_m_stellar',comet36:'c_m_sword_gold',judgement36:'c_m_sword_gold',monarch12_m:'c_m_sword_gold',chrono11_m:'c_m_chrono'};
 function gearImg(kind){try{const it=(gear.equipment||[]).find(i=>i.kind===kind);const v=it&&it.variant;if(kind==='sidearm'){const im=window.TB309&&(TB309.img('pod_'+v)||TB309.img('pod_disc'));if(im)return im;const ks=Object.keys(window.TB309_IMG||{}).filter(k=>/^pod_/.test(k));return ks.length?TB309.img(ks[0]):null;}
   return window.TB309&&(TB309.img(MISK[v]||'c_m_inferno')||TB309.img('c_m_inferno'));}catch{return null;}}
 function bolt(g,x,y,o,len){const b=o&&o.b?o.b:[[224,242,254],[125,211,252],[3,105,161]],rgb=a=>`rgb(${a[0]|0},${a[1]|0},${a[2]|0})`;
   const hx=a=>'#'+a.map(v=>(v|0).toString(16).padStart(2,'0')).join('');g.globalCompositeOperation='lighter';g.globalAlpha=.55;g.drawImage(dot(hx(b[1])),x-8,y-len*.6,16,len*1.2);
   const gr=g.createLinearGradient(x,y-len/2,x,y+len/2);gr.addColorStop(0,rgb(b[0]));gr.addColorStop(.35,rgb(b[1]));gr.addColorStop(1,rgb(b[2]).replace('rgb','rgba').replace(')',',0)'));
   g.globalAlpha=.95;g.fillStyle=gr;g.beginPath();g.ellipse(x,y,3.6,len/2,0,0,TAU);g.fill();g.fillStyle='#ffffff';g.globalAlpha=.9;g.beginPath();g.ellipse(x,y-len*.18,1.4,len*.22,0,0,TAU);g.fill();}
 function loop(){if(!el||el.hidden){raf=0;return;}raf=requestAnimationFrame(loop);const c=pv.c,g=c.getContext('2d'),W2=c.width,H2=c.height,t=now()/1000,dt=Math.min(.05,pv.lt?t-pv.lt:.016);pv.lt=t;
   g.globalCompositeOperation='source-over';g.globalAlpha=1;const bg=g.createLinearGradient(0,0,0,H2);bg.addColorStop(0,'#05081a');bg.addColorStop(1,'#0b1a33');g.fillStyle=bg;g.fillRect(0,0,W2,H2);
   for(const s of pv.st){s.y+=s.v*dt;if(s.y>H2)s.y=0;g.fillStyle=`rgba(200,225,255,${s.a})`;g.fillRect(s.x,s.y,s.s,s.s);}
   const sel=k=>oget((tab===k?pick[k]:null)||S.o[k]);const oS=tab==='av'?wear('ship'):sel('ship'),oP=sel('pod'),oM=sel('mis');const okS=oS.id==='def'||oOwned(oS)||tab==='ship';
   const x=W2/2+Math.sin(t*1.1)*W2*.2,y=H2*.68+Math.sin(t*2.1)*6;
   trailStep(pv.T,oS,x,y+22,dt);trailDraw(g,pv.T,oS,x,y+22,t);
   const tx=W2/2+Math.sin(t*.7)*W2*.15,ty=34;g.save();g.translate(tx,ty);g.rotate(t*.6);g.strokeStyle='rgba(248,113,113,.85)';g.lineWidth=2;g.beginPath();for(let j=0;j<6;j++){const a=j/6*TAU;j?g.lineTo(Math.cos(a)*15,Math.sin(a)*15):g.moveTo(15,0);}g.closePath();g.stroke();g.fillStyle='rgba(127,29,29,.5)';g.fill();g.restore();
   pv.sh-=dt;if(pv.sh<=0){pv.sh=.14;pv.b.push({x:x-7,y:y-26},{x:x+7,y:y-26});}
   pv.ps-=dt;if(pv.ps<=0){pv.ps=.32;pv.pb.push({x:x-64,y:y-14},{x:x+64,y:y-14});}
   pv.ms-=dt;if(pv.ms<=0){pv.ms=1.1;pv.m.push({x:x-30,y:y-30,vx:-90,vy:-140,a:0},{x:x+30,y:y-30,vx:90,vy:-140,a:0});}
   g.save();for(const b of pv.b){b.y-=460*dt;b.x+=(tx-b.x)*dt*1.5;bolt(g,b.x,b.y,oS.id==='def'?null:oS,22);if(b.y<ty+12){b.dead=true;fxHit(pv.F,oS.id==='def'?O[2]:oS,tx+(Math.random()-.5)*10,ty+10);}}g.restore();pv.b=pv.b.filter(b=>!b.dead);
   const pim=pv.pod&&pv.pod.complete!==false&&(pv.pod.naturalWidth||pv.pod.width)?pv.pod:null,mim=pv.mis&&pv.mis.complete!==false&&(pv.mis.naturalWidth||pv.mis.width)?pv.mis:null;
   g.save();for(const b of pv.pb){b.y-=380*dt;g.globalCompositeOperation='lighter';g.globalAlpha=.9;g.drawImage(dot(oP.tc?oP.tc[1]:'#7dd3fc'),b.x-5,b.y-8,10,16);if(b.y<-10)b.dead=true;}g.restore();pv.pb=pv.pb.filter(b=>!b.dead);
   for(const m of pv.m){m.a+=dt;const k=Math.min(1,m.a*2.2);m.vx+=((tx-m.x)*3-m.vx)*dt*k*2;m.vy+=(-420-m.vy)*dt*k*2;m.x+=m.vx*dt;m.y+=m.vy*dt;
     if(mim){const im=bake(mim,oM)||mim,iw=im.width||im.naturalWidth,ih=im.height||im.naturalHeight,L=34,w=L*iw/ih;g.save();g.translate(m.x,m.y);g.rotate(Math.atan2(m.vy,m.vx)+Math.PI/2);
       g.globalCompositeOperation='lighter';g.globalAlpha=.6;g.drawImage(dot(oM.tc?oM.tc[1]:'#fb923c'),-6,L*.3,12,22);g.globalCompositeOperation='source-over';g.globalAlpha=1;g.drawImage(im,-w/2,-L/2,w,L);g.restore();}
     if(m.y<ty+12){m.dead=true;fxKill(pv.F,oM.id==='def'?O[2]:oM,m.x,m.y,16);}}pv.m=pv.m.filter(m=>!m.dead);
   pv.kt-=dt;if(pv.kt<=0){pv.kt=1.6;fxKill(pv.F,oS.id==='def'?O[2]:oS,W2*(.2+Math.random()*.6),40+Math.random()*30,20);}
   fxDraw(g,pv.F,dt);
   g.globalCompositeOperation='source-over';g.globalAlpha=1;
   if(pim){const im=bake(pim,oP)||pim,iw=im.width||im.naturalWidth,ih=im.height||im.naturalHeight,s=34/Math.max(iw,ih);for(const sd of [-1,1]){const px=x+sd*64,py=y-4+Math.sin(t*2.4+sd)*3;g.drawImage(im,px-iw*s/2,py-ih*s/2,iw*s,ih*s);}}
   if(pv.im&&pv.im.complete&&pv.im.naturalWidth){const im=okS?(bake(pv.im,oS)||pv.im):pv.im,s=86;g.drawImage(im,x-s/2,y-s/2,s,s);}}
 function wearPick(){const o=oget(pick[tab]||S.o[tab]);if(!oOwned(o))return;S.o[tab]=o.id;save();delete pick[tab];render();}
 function apply(t,id){const x=item(t,id);pick[t]=id;if(owned(t,x)){S[t]=id;save();lobby();}render();}
 function open(){if(!on()){return origOpen&&origOpen.apply(this,arguments);}
   if(!el){el=document.createElement('div');el.className='m63 sk8';el.hidden=true;el.innerHTML=`<div class="m63-card"><div class="m63-eye">TRANG PHỤC</div><button class="m63-x" data-x8="1" aria-label="Đóng">×</button>
     <div class="pv8"><canvas width="360" height="200"></canvas><div class="hd8"></div><div class="tr8"><span class="cnt8"></span><span class="set8"></span></div></div>
     <div class="mid8"></div><div class="str8"></div><div class="ls8" hidden></div>
     <div class="tb8"><button data-t8="ship">CHIẾN CƠ</button><button data-t8="pod">TÀU CON</button><button data-t8="mis">TÊN LỬA</button><button data-t8="av">AVATAR &amp; DANH HIỆU</button></div>
     <button type="button" class="old8" data-old8="1">SKIN CHIẾN CƠ (MÀU THÂN) ›</button></div>`;
     el.addEventListener('click',e=>{const t=e.target;if(t===el||t.closest('[data-x8]')){close();return;}const b=t.closest('[data-t8]');if(b){tab=b.dataset.t8;render();return;}
       const oc=t.closest('[data-oc8]');if(oc){pick[tab]=oc.dataset.oc8;render();return;}if(t.closest('[data-wr8]')){wearPick();return;}
       const it=t.closest('[data-it8]');if(it){const [k,id]=it.dataset.it8.split(':');apply(k,id);return;}if(t.closest('[data-old8]')){close();try{origOpen&&origOpen.call(Skin69);}catch{}}});
     document.body.appendChild(el);pv={c:el.querySelector('canvas'),T:Trail(),F:[],b:[],pb:[],m:[],sh:0,ps:.1,ms:.3,kt:.5,lt:0,st:Array.from({length:40},()=>({x:Math.random()*360,y:Math.random()*200,v:20+Math.random()*50,s:Math.random()<.2?2:1,a:.3+Math.random()*.6}))};}
   pick={};pv.im=shipImg();pv.pod=gearImg('sidearm');pv.mis=gearImg('missiles');render();el.hidden=false;if(!raf)raf=requestAnimationFrame(loop);}
 function close(){if(el)el.hidden=true;pick={};}
 function hookOpen(){try{if(typeof Skin69!=='undefined'&&!Skin69.__l8){Skin69.__l8=1;origOpen=Skin69.open;Skin69.open=function(){return open.apply(this,arguments);};}}catch{}}
 hookOpen();setTimeout(hookOpen,0);setTimeout(hookOpen,1500);
 // nút TỦ SKIN cũ (data-sk69, kể cả lối tắt SKIN ở Sảnh / tab Phi đội) gọi open() nội bộ của Skin69 → chặn ở pha bắt để mở màn mới
 document.addEventListener('click',e=>{if(!on())return;const b=e.target&&e.target.closest&&e.target.closest('[data-sk69]');if(!b)return;e.stopImmediatePropagation();e.preventDefault();open();},true);
 // ---------- Sảnh gọn (chủ dự án 21/11 16:42). Tắt: window.SANH8=false ----------
 //  (1) hàng tài nguyên trên cùng chỉ 3 ô: Thể lực · Hợp kim · Kim cương (ẩn ô Đá XP + Lõi Siêu Hợp; bỏ dòng 💎/🔋 dưới TỔNG LỰC CHIẾN)
 //  (2) bỏ hình viền bậc cũ (RankArt: cánh nét + elip hồng–tím) quanh chiến cơ khi KHÔNG trong trận (sân khấu sảnh)
 const sOn=()=>window.SANH8!==false;
 function res8(){const r=document.querySelector('#hgr41 .h1-res');if(!r)return;if(!window.__res8bg){const h=document.documentElement,c=h.classList.contains('sanh8');h.classList.remove('sanh8');const bg=getComputedStyle(r).backgroundImage;if(c)h.classList.add('sanh8');if(bg&&bg!=='none'){window.__res8bg=bg;h.style.setProperty('--res8',bg);}}document.documentElement.classList.toggle('sanh8',sOn());if(!sOn())return;
   const U=window.UI307_IMG||{};const ic=(k)=>U[k]?`<i data-ic74="1"><img class="ic74r" src="${U[k]}" alt=""></i>`:'<i></i>';
   if(!r.querySelector('.en8')){const d=document.createElement('div');d.className='h1-chip stone en8';d.title='Thể lực';d.innerHTML=ic('icon_stamina')+'<b class="en8v">0</b><button type="button" aria-label="Thể lực">+</button>';d.addEventListener('click',e=>{e.stopPropagation();const b=document.querySelector('.en75');if(b)b.click();},true);r.insertBefore(d,r.firstChild);}
   if(!r.querySelector('.dm8')){const d=document.createElement('div');d.className='h1-chip gem dm8';d.title='Kim cương';d.innerHTML=ic('icon_diamond')+'<b data-gem74>0</b><button type="button" aria-label="Chợ Đen">+</button>';d.querySelector('button').addEventListener('click',e=>{e.stopPropagation();try{if(typeof Trade67!=='undefined')Trade67.open();}catch{}});r.appendChild(d);}
   const coin=r.querySelector('.h1-chip.coin');if(coin&&coin.previousElementSibling!==r.querySelector('.en8'))r.insertBefore(coin,r.querySelector('.dm8'));
   try{const g=document.querySelector('#hgr41 .gem74 [data-gem74]');if(g)r.querySelector('.dm8 b').textContent=g.textContent;const e=document.querySelector('#hgr41 .gem74 [data-en75]');if(e)r.querySelector('.en8 b').textContent=e.textContent+'/120';}catch{}}
 function rankHook(){try{if(typeof RankArt==='undefined'||RankArt.__l8)return;RankArt.__l8=1;const od=RankArt.draw;RankArt.draw=function(c,i){try{if(sOn()&&typeof mode!=='undefined'&&mode!=='play'&&mode!=='pause'&&i&&!i.kind)return;}catch{}return od.apply(this,arguments);};}catch{}}
 rankHook();setTimeout(rankHook,0);setTimeout(rankHook,1500);setTimeout(rankHook,4000);
 setInterval(()=>{try{lobby();res8();}catch{}},600);
 return {S,P,O,D,open,close,owned,oOwned,cur,wear,setInfo,bonus,save,lobby,render,bake,_pv:()=>pv};
})();
