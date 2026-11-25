'use strict';
// V2.2.3 · RIG23 — chuẩn hóa toàn hệ (ảnh 90240, chủ dự án 25/11). Tắt toàn bộ: window.RIG23=false (đặt trước khi trang tải)
//  1) Cánh năng lượng (Evo21.drawWing): gọn hơn 13 %, mỗi nửa cánh vểnh lên 10° quanh gốc thân, chân cánh nâng lên sao cho
//     mép dưới cánh (đo theo cột ảnh, 1 lần/ảnh) không chạm tàu con · α .82 'lighter' · bỏ vòng sáng lúc bung.
//  2) Màu cánh theo màu tàu (SHIP309COL): nếu sắc độ cánh lệch > 35° thì xoay sắc độ 1 lần, lưu bộ đệm theo (ảnh, màu) — không vòng lặp điểm ảnh mỗi khung.
//  3) Thứ tự lớp trong trận: lớp sau-thân (BtFx218.back: cánh, hào quang) vẽ TRƯỚC đạn ta (PlayerFXB.startPass), không còn đè đạn / tàu con.
//  4) Tàu con dạt ra ngoài thêm 14 px (GAP22) · vòng khiên / hào quang mảnh hơn (đặt ở tb309 / aura307 theo cờ RIG23).
//  5) Không mất tàu: giải mã sẵn ảnh thân / Bạo Tẩu / cánh của tàu đang dùng khi vào trận (ảnh ngoài www/assets nạp lười trên máy thật → khung trống).
(()=>{
 const ON=()=>window.RIG23!==false;
 if(!ON())return;
 if(window.GAP22===undefined)window.GAP22=24;if(window.SPMAX22===undefined)window.SPMAX22=114;
 const play=()=>{try{return mode==='play';}catch{return false;}};
 // ---------- màu ----------
 const hx=c=>{c=String(c||'').replace('#','');if(c.length===3)c=c.split('').map(x=>x+x).join('');const n=parseInt(c,16);return [n>>16&255,n>>8&255,n&255];};
 function rgb2h(r,g,b){r/=255;g/=255;b/=255;const M=Math.max(r,g,b),m=Math.min(r,g,b),d=M-m;let h=0;if(d){if(M===r)h=((g-b)/d)%6;else if(M===g)h=(b-r)/d+2;else h=(r-g)/d+4;h*=60;if(h<0)h+=360;}const l=(M+m)/2,s=d?d/(1-Math.abs(2*l-1)):0;return [h,s,l];}
 function h2rgb(h,s,l){const c=(1-Math.abs(2*l-1))*s,x=c*(1-Math.abs((h/60)%2-1)),m=l-c/2;let r=0,g=0,b=0;if(h<60)[r,g,b]=[c,x,0];else if(h<120)[r,g,b]=[x,c,0];else if(h<180)[r,g,b]=[0,c,x];else if(h<240)[r,g,b]=[0,x,c];else if(h<300)[r,g,b]=[x,0,c];else [r,g,b]=[c,0,x];return [(r+m)*255,(g+m)*255,(b+m)*255];}
 const shipHue=id=>{try{const c=(window.SHIP309COL||{})[id]||(window.SHIP309COL||{})[String(id)];if(!c)return null;const [r,g,b]=hx(c);const [h,s]=rgb2h(r,g,b);return s<.15?null:h;}catch{return null;}};
 const INFO=new WeakMap(),TINT=new Map();
 function info(im){let o=INFO.get(im);if(o)return o;const w=im.naturalWidth||im.width,h=im.naturalHeight||im.height;if(!(w>0&&h>0))return null;
  const S=Math.min(1,160/Math.max(w,h)),cw=Math.max(1,Math.round(w*S)),ch=Math.max(1,Math.round(h*S));const c=document.createElement('canvas');c.width=cw;c.height=ch;const g=c.getContext('2d');g.drawImage(im,0,0,cw,ch);
  let d;try{d=g.getImageData(0,0,cw,ch).data;}catch{o={hue:null,low:null,cw};INFO.set(im,o);return o;}let hs=0,hc=0,ws=0;const low=new Float32Array(cw).fill(-1);
  for(let y=0;y<ch;y++)for(let x=0;x<cw;x++){const i=(y*cw+x)*4,a=d[i+3];if(a>40){low[x]=y/ch;const [hh,ss,ll]=rgb2h(d[i],d[i+1],d[i+2]);if(ss>.25&&ll>.15&&ll<.9){const wt=ss*a;hs+=Math.cos(hh*Math.PI/180)*wt;hc+=Math.sin(hh*Math.PI/180)*wt;ws+=wt;}}}
  let hue=null;if(ws>0){hue=Math.atan2(hc,hs)*180/Math.PI;if(hue<0)hue+=360;}o={hue,low,cw};INFO.set(im,o);return o;}
 function tint(im,id){if(!im||window.TINT23===false)return im;const o=info(im);const sh=shipHue(id);if(!o||o.hue==null||sh==null)return im;let dh=sh-o.hue;dh=((dh+540)%360)-180;if(Math.abs(dh)<35)return im;
  const key=(im.src||'').length+'|'+(im.src||'').slice(-40)+'|'+Math.round(sh);let c=TINT.get(key);if(c)return c;
  const w=im.naturalWidth||im.width,h=im.naturalHeight||im.height;c=document.createElement('canvas');c.width=w;c.height=h;const g=c.getContext('2d');g.drawImage(im,0,0);let D;try{D=g.getImageData(0,0,w,h);}catch{TINT.set(key,im);return im;}const p=D.data;
  for(let i=0;i<p.length;i+=4){if(p[i+3]<4)continue;const [hh,ss,ll]=rgb2h(p[i],p[i+1],p[i+2]);if(ss<.08)continue;const [r,gg,b]=h2rgb((hh+dh+360)%360,ss,ll);p[i]=r;p[i+1]=gg;p[i+2]=b;}
  g.putImageData(D,0,0);TINT.set(key,c);return c;}
 // ---------- cánh ----------
 const DEG=Math.PI/180,TILT=10*DEG,K=.87;
 function podRel(){try{const P=Battle28.support();if(P&&P.length)return {dx:Math.abs(P[0].x-player.x),top:P[0].y-player.y-22};}catch{}return {dx:84,top:18};}
 // vẽ cánh: im = ảnh (đã làm mềm / nhuộm), o = info ảnh gốc (cột đáy)
 function wing(g,im,o,size,open,FK){const iw=im.width||im.naturalWidth,ih=im.height||im.naturalHeight;const w=size*2.35*open*K,h=w*ih/iw;let y0=-h*.42;const ry=y0+h*.45;
  // nâng chân cánh: tại cột ứng với tàu con, mép dưới (sau khi vểnh) phải cao hơn đỉnh tàu con 4 px
  let lift=0;try{if(o&&o.low){const pr=podRel(),fx=.5+Math.min(.49,pr.dx/w),col=Math.min(o.cw-1,Math.max(0,Math.round(fx*o.cw)));let lb=-1;for(let k=-2;k<=2;k++){const v=o.low[Math.min(o.cw-1,Math.max(0,col+k))];if(v>lb)lb=v;}
   if(lb>=0){const yb=y0+h*lb,dx=pr.dx,yr=ry+(yb-ry)*Math.cos(TILT)-dx*Math.sin(TILT);lift=Math.max(0,yr-(pr.top-4));}}}catch{}
  lift=Math.min(lift,size*.55);
  g.save();g.globalCompositeOperation='lighter';g.globalAlpha=.82*FK;g.translate(0,-lift);
  for(const sd of [-1,1]){g.save();g.translate(0,ry);g.rotate(sd*-TILT);g.translate(0,-ry);if(sd<0)g.drawImage(im,0,0,iw/2,ih,-w/2,y0,w/2,h);else g.drawImage(im,iw/2,0,iw/2,ih,0,y0,w/2,h);g.restore();}
  g.restore();return {lift,w,h,y0};}
 // ---------- VFX đợt 2: cánh sống (nửa trái/phải tách sẵn 1 lần, vỗ ±5,5°, phập phồng .97–1,03, trễ ±2° theo lách, Bạo Tẩu ×1,31 +6°) ----------
 const HALF=new WeakMap();
 function halves(im){let h=HALF.get(im);if(h)return h;const iw=im.width||im.naturalWidth,ih=im.height||im.naturalHeight;if(!(iw>0&&ih>0))return null;const mk=()=>{const c=document.createElement('canvas');c.width=Math.ceil(iw/2);c.height=ih;return c;};
  const L=mk(),R=mk();L.getContext('2d').drawImage(im,0,0);R.getContext('2d').drawImage(im,-Math.floor(iw/2),0);h={L,R,iw,ih};HALF.set(im,h);return h;}
 const WS2={s:0,last:0,px:null,vx:0,lag:0};
 function wing2(g,imV,imSrc,id,size,isOn,now,FK){const t=performance.now()/1000,dt=WS2.last?Math.min(.05,t-WS2.last):0;WS2.last=t;
  WS2.s+=((isOn?1:0)-WS2.s)*Math.min(1,dt*(isOn?7:4));const s=WS2.s,e=s*s*(3-2*s);
  try{if(WS2.px!==null&&dt>0){const v=(player.x-WS2.px)/dt;WS2.vx+=(v-WS2.vx)*Math.min(1,dt*6);}WS2.px=player.x;}catch{}
  WS2.lag+=((Math.max(-1,Math.min(1,-WS2.vx/600))*2*DEG)-WS2.lag)*Math.min(1,dt*5);
  const im=tint(imV,id),o=info(imSrc),H2=halves(im);if(!H2)return false;
  const fr=isOn?1.8:.9,flap=Math.sin(t*6.283*fr)*5.5*DEG*(isOn?1:.8),pulse=1+.03*Math.sin(t*6.283*fr+1.1);
  const sc=(1/1.31+(1-1/1.31)*e)*pulse,tilt=TILT+e*6*DEG,iw=H2.iw,ih=H2.ih,w=size*2.35*K*sc,h=w*ih/iw;let y0=-h*.42;const ry=y0+h*.45;
  let lift=0;try{if(o&&o.low){const pr=podRel(),fx=.5+Math.min(.49,pr.dx/w),col=Math.min(o.cw-1,Math.max(0,Math.round(fx*o.cw)));let lb=-1;for(let k=-2;k<=2;k++){const v=o.low[Math.min(o.cw-1,Math.max(0,col+k))];if(v>lb)lb=v;}
   if(lb>=0){const yb=y0+h*lb,tm=tilt-5.5*DEG-2*DEG,yr=ry+(yb-ry)*Math.cos(tm)-pr.dx*Math.sin(tm);lift=Math.max(0,yr-(pr.top-4));}}}catch{}
  lift=Math.min(lift,size*.55);
  g.save();g.globalCompositeOperation='lighter';g.globalAlpha=(.5+.32*e)*FK;g.translate(0,-lift);
  for(const sd of [-1,1]){g.save();g.translate(0,ry);g.rotate(sd*-(tilt+flap)+WS2.lag);g.translate(0,-ry);if(sd<0)g.drawImage(H2.L,-w/2,y0,w/2,h);else g.drawImage(H2.R,0,y0,w/2,h);g.restore();}
  g.restore();return true;}
 // ---------- thứ tự lớp: hoãn lớp sau-thân tới PlayerFXB.startPass ----------
 let Q=null;
 function hookBack(){try{if(!window.BtFx218||!BtFx218.back||BtFx218.back.__r23)return;const ob=BtFx218.back;
  const f=function(c){try{window.Rig23&&(Rig23.last={size:arguments[5],id:arguments[9],on:arguments[6]});}catch{}if(!play()||window.ZORD23===false||f.__now)return ob.apply(this,arguments);try{const m=c.getTransform();Q={a:[...arguments],m,px:player.x,py:player.y,ob,self:this};}catch{return ob.apply(this,arguments);}};f.__r23=1;BtFx218.back=f;}catch{}}
 function flush(){if(!Q)return;const q=Q;Q=null;try{const c=q.a[0],sx=c.canvas.width/W,sy=c.canvas.height/H,m=q.m;c.save();c.setTransform(m.a,m.b,m.c,m.d,m.e+(player.x-q.px)*sx,m.f+(player.y-q.py)*sy);BtFx218.back.__now=1;q.ob.apply(q.self,q.a);}catch{}finally{try{BtFx218.back.__now=0;q.a[0].restore();}catch{}}}
 function hookPass(){try{if(typeof PlayerFXB==='undefined'||PlayerFXB.__r23)return;const o=PlayerFXB.startPass;PlayerFXB.startPass=function(){try{flush();}catch{}return o.apply(this,arguments);};PlayerFXB.__r23=1;}catch{}}
 // ---------- giải mã sẵn ảnh tàu đang dùng ----------
 const DEC=new Set();
 function warm(){if(!play())return;let id=0;try{id=selected;}catch{}if(DEC.has(id))return;DEC.add(id);const L=[];
  try{const S=(window.SHIP118||{})[String(id)]||{};for(const k in S)L.push(S[k]);}catch{}
  try{const E=window.EVO21_IMG||{};const p='tau'+(id+1)+'_';for(const k in E)if(k.startsWith(p))L.push(E[k]);}catch{}
  for(const u of L){if(typeof u!=='string')continue;try{const i=new Image();i.src=u;i.decode&&i.decode().catch(()=>{});}catch{}}}
 function all(){hookBack();hookPass();}
 all();setTimeout(all,0);setTimeout(all,1500);setInterval(()=>{all();warm();},1000);
 window.Rig23={tint,info,wing,wing2,halves,podRel,state:()=>({q:!!Q,dec:[...DEC]})};
})();
