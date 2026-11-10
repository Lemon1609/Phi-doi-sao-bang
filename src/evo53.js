'use strict';
// V55 · TIẾN HÓA NGOẠI HÌNH theo mốc cường hóa (thay Rank52). Chỉ đổi HÌNH ẢNH, không đổi sát thương / cân bằng.
//  5 mức:  0 GỐC · 1 NGỌC LAM · 2 BẠCH KIM · 3 HOÀNG KIM · 4 CẦU VỒNG PHA LÊ (MAX)
//   • Chiến cơ & trang bị thường (+0…+5): +0 · +1–2 · +3 · +4 · +5
//   • Trang bị SSS (+0…+10):              +0–2 · +3–5 · +6–7 · +8–9 · +10
//  Gồm:
//   • Thân chiến cơ đổi màu/chất liệu (trong trận, Kho chiến cơ, sảnh): tô lại đúng tranh gốc (giữ chi tiết, alpha), MAX cầu vồng chuyển sắc + lấp lánh.
//     Nếu có tranh hình dáng tiến hóa của GPT (EVO53_ART.fighters_evo1 cho +3/+4, fighters_evo2 cho +5) thì dùng làm gốc rồi mới tô màu.
//   • Trang bị (bệ tên lửa, tàu con, giáp, đạn, nổ của GEAR_FX): tô lại toàn bộ tranh theo mức của món đó.
//   • Đạn chính: đổi màu theo mức; mức 2+ vệt sao; mức 3+ tia sét giật sang địch gần / nối giữa các viên; mức 4 màu cầu vồng.
//   • Giáp: vòng hào quang quanh chiến cơ theo mức. Kho: ô trang bị viền theo mức (data-t52 0–4); lên mức → thông báo.
const Evo53=(()=>{
 const TAU=Math.PI*2;
 const NAME=['GỐC','NGỌC LAM','BẠCH KIM','HOÀNG KIM','CẦU VỒNG PHA LÊ'];
 const COL=['', '#56d8ff','#e9eeff','#ffd54a','rainbow'];
 const tierN=e=>e>=5?4:e>=4?3:e>=3?2:e>=1?1:0,tierS=e=>e>=10?4:e>=8?3:e>=6?2:e>=3?1:0;
 const light=()=>{try{return VisualFX.counts().quality==='light';}catch{return false;}},quiet=()=>{try{return VisualFX.reduced();}catch{return false;}};
 const ART=typeof EVO53_ART!=='undefined'?EVO53_ART:{};const ARTIMG={};for(const k in ART){const im=new Image();im.src=ART[k];ARTIMG[k]=im;}
 const okIm=im=>im&&(im instanceof HTMLCanvasElement||(im.complete&&im.naturalWidth>0));
 const hue=(t,o=0)=>`hsl(${((t*90+o)%360+360)%360},100%,68%)`;
 const colOf=(t,o=0)=>t>=4?hue(time,o):COL[t]||'#9feeff';
 function mk(w,h){const c=document.createElement('canvas');c.width=Math.max(1,w|0);c.height=Math.max(1,h|0);return c;}
 // ---------- tô lại 1 vùng ----------
 // dst: ctx đích, vẽ src(sx,sy,w,h) vào (dx,dy) rồi tô theo mức t; phase: pha chuyển sắc của mức 4
 const tmp={c:null,m:null};
 function paint(dst,src,sx,sy,w,h,dx,dy,t,phase=0){
  if(!tmp.c||tmp.c.width<w||tmp.c.height<h){tmp.c=mk(w,h);tmp.m=mk(w,h);}
  const c=tmp.c,x=c.getContext('2d'),m=tmp.m.getContext('2d');x.save();x.setTransform(1,0,0,1,0,0);x.globalAlpha=1;x.globalCompositeOperation='source-over';x.clearRect(0,0,w,h);x.drawImage(src,sx,sy,w,h,0,0,w,h);
  m.setTransform(1,0,0,1,0,0);m.globalCompositeOperation='copy';m.drawImage(c,0,0,w,h,0,0,w,h);
  const fill=(op,a,style)=>{x.globalCompositeOperation=op;x.globalAlpha=a;x.fillStyle=style;x.fillRect(0,0,w,h);};
  const lin=(x0,y0,x1,y1,stops)=>{const g=x.createLinearGradient(x0,y0,x1,y1);for(const [o,cc] of stops)g.addColorStop(o,cc);return g;};
  const sheen=(a,col,pos=.5)=>fill('screen',a,lin(0,0,w,h*.6,[[Math.max(0,pos-.09),'rgba(0,0,0,0)'],[pos,col],[Math.min(1,pos+.09),'rgba(0,0,0,0)']]));
  if(t>=1&&t<=4&&window.EVO213!==false)t+=10;
  if(t>=11){/* V213 (chủ dự án duyệt): mọi mức tiến hóa GIỮ MÀU RIÊNG của món / chiến cơ — bỏ nhuộm lam (+1), bạc (+3), vàng (+4), cầu vồng (+5); mức càng cao chỉ càng sáng và óng. Tắt: window.EVO213=false */const L=Math.min(4,t-10);fill('overlay',[.10,.18,.28,.42][L-1],'#ffffff');if(L>=2)sheen([0,.25,.4,.6][L-1],'#ffffff',.2+((phase*.6)%1)*.6);}
  else if(t===1){fill('color',.55,'#2fc6ff');fill('overlay',.35,'#bff4ff');}
  else if(t===2){fill('saturation',.85,'#808080');fill('color',.22,'#b9a8ff');fill('overlay',.7,lin(0,0,0,h,[[0,'#ffffff'],[.55,'#c9d8ff'],[1,'#6b78a8']]));sheen(.55,'#ffffff');}
  else if(t===3){fill('color',.85,'#e0a72a');fill('overlay',.55,lin(0,0,0,h,[[0,'#fff3c4'],[.5,'#d99a1e'],[1,'#7a4a08']]));sheen(.35,'#fff6d0');}
  else if(t>=4){fill('saturation',.6,'#808080');const k=phase%1,st=[];for(let i=0;i<=6;i++){const o=i/6;st.push([o,`hsl(${(o*360+k*360)%360},100%,60%)`]);}
   fill('color',.72,lin(0,0,w,h,st));fill('overlay',.45,lin(0,0,0,h,[[0,'#ffffff'],[1,'#8f9cff']]));sheen(.6,'#ffffff',.2+((phase*.6)%1)*.6);
   // lấp lánh pha lê: vài sao 4 cánh cố định trên vùng sáng, nhấp nháy theo pha
   x.globalCompositeOperation='lighter';for(let i=0;i<7;i++){const a=.5+.5*Math.sin(phase*TAU*1.5+i*1.7);if(a<.35)continue;const px=(Math.sin(i*12.9898)*43758.5453%1+1)%1*w,py=(Math.sin(i*78.233)*12543.21%1+1)%1*h,r=Math.min(w,h)*.05*(.6+a*.6);x.globalAlpha=a*.9;x.fillStyle='#ffffff';x.beginPath();x.moveTo(px,py-r);x.lineTo(px+r*.18,py-r*.18);x.lineTo(px+r,py);x.lineTo(px+r*.18,py+r*.18);x.lineTo(px,py+r);x.lineTo(px-r*.18,py+r*.18);x.lineTo(px-r,py);x.lineTo(px-r*.18,py-r*.18);x.closePath();x.fill();}}
  x.globalAlpha=1;x.globalCompositeOperation='destination-in';x.drawImage(tmp.m,0,0,w,h,0,0,w,h);x.restore();
  dst.drawImage(c,0,0,w,h,dx,dy,w,h);}
 // ---------- mức hiện tại ----------
 function itemOf(kind){try{const P=Progress.getState();return P.items.find(x=>x.id===P.equipped[kind])||null;}catch{return null;}}
 function gearTier(kind){try{const d=Gear44.activeDef(kind);if(d&&d.tier==='sss'){const e=Gear44.sssEnh(d.id);return {t:tierS(e),sss:true,e};}
   const it=itemOf(kind);if(!it)return {t:0,sss:false,e:0};const e=it.enhance||0;return {t:tierN(e),sss:false,e};}catch{return {t:0,sss:false,e:0};}}
 const craftE=id=>{try{return (Workshop.craftProgress(id).enhance)||0;}catch{return 0;}};
 function craftTier(){try{if(activeRobot)return {t:0,sss:false,e:0,robot:true};const e=craftE(selected);return {t:tierN(e),sss:false,e};}catch{return {t:0,e:0};}}
 let T={craft:{t:0},armor:{t:0},missiles:{t:0},sidearm:{t:0}},tAt=-1;
 function refresh(){T={craft:craftTier(),armor:gearTier('armor'),missiles:gearTier('missiles'),sidearm:gearTier('sidearm')};}
 setInterval(()=>{try{refresh();}catch{}},500);try{refresh();}catch{}
 // ---------- thân chiến cơ ----------
 const HULL=new Map();// key id → {t,stage,c,at}
 function stageOf(e){return e>=5&&okIm(ARTIMG.fighters_evo2)?ARTIMG.fighters_evo2:e>=3&&okIm(ARTIMG.fighters_evo1)?ARTIMG.fighters_evo1:null;}
 // ô trống trong tranh tiến hóa (GPT giao từng đợt) → dùng ô gốc
 const HAS=new Map();function cellHas(src,i){const k=(src===ARTIMG.fighters_evo2?'2':'1')+':'+i;if(HAS.has(k))return HAS.get(k);let ok=false;try{const sw=src.naturalWidth/5,sh=src.naturalHeight/4,c=mk(50,40),g=c.getContext('2d');g.drawImage(src,i%5*sw,Math.floor(i/5)*sh,sw,sh,0,0,50,40);const d=g.getImageData(0,0,50,40).data;let n=0;for(let j=3;j<d.length;j+=4)if(d[j]>40)n++;ok=n>60;}catch{}HAS.set(k,ok);return ok;}
 function hull(id){try{const base=fighterAtlasV22;if(!base||!base.complete||!base.naturalWidth||!Number.isInteger(id))return base;
   const e=craftE(id),t=tierN(e),src=stageOf(e)||base;if(t===0&&src===base)return base;
   let h=HULL.get(id);const W0=base.naturalWidth,H0=base.naturalHeight;
   const anim=t>=4&&!quiet(),now=performance.now()/1000;
   if(!h||h.t!==t||h.src!==src||(anim&&now-h.at>(light()?1/6:1/10))){if(!h){if(HULL.size>=2){const k0=HULL.keys().next().value;HULL.delete(k0);}h={c:mk(W0,H0)};h.c.naturalWidth=W0;h.c.naturalHeight=H0;h.c.complete=true;HULL.set(id,h);}
    const g=h.c.getContext('2d'),cw=W0/5,ch=H0/4,sw=src.naturalWidth/5,sh=src.naturalHeight/4;
    if(h.t!==t||h.src!==src)g.clearRect(0,0,W0,H0);
    for(const i of [id,id+10]){const dx=i%5*cw,dy=Math.floor(i/5)*ch;g.clearRect(dx,dy,cw,ch);
     if(src!==base&&cellHas(src,i)){const sc=mk(cw,ch);sc.getContext('2d').drawImage(src,i%5*sw,Math.floor(i/5)*sh,sw,sh,0,0,cw,ch);paint(g,sc,0,0,cw,ch,dx,dy,t,now*.25);}
     else paint(g,base,dx,dy,cw,ch,dx,dy,t,now*.25);}
    h.t=t;h.src=src;h.at=now;}
   return h.c;}catch(err){return fighterAtlasV22;}}
 // ---------- tranh trang bị (GEAR_FX) ----------
 const GA=new Map();// key kind|asset|t → canvas
 //  Hình dáng tiến hóa trang bị (GPT): EVO53_ART['g:<khóa tranh>_evo1|2'] (vd 'g:inferno_pod_normal_evo2'); chặng I từ +3 (SSS +6), chặng II ở +5 (SSS +10).
 //  Tranh mới có thể lớn hơn (2×) — GEAR_FX vẽ theo kích thước đích nên càng nét.
 const gearStage=g=>{const e=(g&&g.e)||0;return g&&g.sss?(e>=10?2:e>=6?1:0):(e>=5?2:e>=3?1:0);};
 function gearAssets(kind,base){return new Proxy({},{get:(_,k)=>{const im=base[k];if(!im||typeof k!=='string')return im;const g=T[kind]||{},st=gearStage(g);let t=g.t||0;if(t>=3&&window.EVO213!==false&&/_(beam|projectile|impact|muzzle|trail)/.test(k))t+=10; // V213: xem paint() nhánh t>=13
   let src=im,sk='';if(st){for(let s=st;s>=1;s--){const a=ARTIMG['g:'+k+'_evo'+s];if(okIm(a)){src=a;sk='e'+s;break;}}}
   if(!t&&!sk)return im;
   // tranh tiến hóa khác tỉ lệ tranh gốc (vd bệ tên lửa gốc 80×112, tranh mới vuông) → đặt vừa (giữ tỉ lệ) vào khung cùng tỉ lệ gốc, KHÔNG để game ép méo
   if(sk){const bw=im.naturalWidth||im.width,bh=im.naturalHeight||im.height,sw=src.naturalWidth||src.width,sh=src.naturalHeight||src.height;
    if(bw&&bh&&Math.abs(bw/bh-sw/sh)>.02){const fk='fit|'+k+'|'+sk;let f=GA.get(fk);if(!f){const W2=Math.round(bw*sw/Math.max(bw,bh)),H2=Math.round(bh*sw/Math.max(bw,bh));
      const t0=mk(sw,sh),tg=t0.getContext('2d');tg.drawImage(src,0,0);let x0=sw,y0=sh,x1=0,y1=0;try{const d=tg.getImageData(0,0,sw,sh).data;for(let y=0;y<sh;y++)for(let x=0;x<sw;x++)if(d[(y*sw+x)*4+3]>16){if(x<x0)x0=x;if(x>x1)x1=x;if(y<y0)y0=y;if(y>y1)y1=y;}}catch{x0=0;y0=0;x1=sw-1;y1=sh-1;}
      if(x1<x0){x0=0;y0=0;x1=sw-1;y1=sh-1;}const cw=x1-x0+1,ch=y1-y0+1,s=Math.min(W2*.96/cw,H2*.96/ch);f=mk(W2,H2);f.getContext('2d').drawImage(src,x0,y0,cw,ch,(W2-cw*s)/2,(H2-ch*s)/2,cw*s,ch*s);f.naturalWidth=W2;f.naturalHeight=H2;f.complete=true;GA.set(fk,f);}src=f;}}
   const key=kind+'|'+k+'|'+t+'|'+sk;let c=GA.get(key);if(!c){const w=src.naturalWidth||src.width,h=src.naturalHeight||src.height;if(!w||!h)return im;c=mk(w,h);if(t)paint(c.getContext('2d'),src,0,0,w,h,0,0,t,.15);else c.getContext('2d').drawImage(src,0,0);c.naturalWidth=w;c.naturalHeight=h;c.complete=true;GA.set(key,c);if(GA.size>240){const k0=GA.keys().next().value;GA.delete(k0);}}
   return c;}});}
 // ---------- đạn chính: đổi màu ----------
 try{const of=Fighters28.draw;Fighters28.draw=function(g,s){const t=T.craft.t;if(!t||!s||window.EVO213!==false)return of.apply(this,arguments);const c0=s.color;s.color=t>=4?`hsl(${((time*120+(s.x||0)*.8)%360+360)%360},100%,66%)`:COL[t];try{return of.apply(this,arguments);}finally{s.color=c0;}};}catch{}
 // ---------- đạn chính dạng tranh (ShotV2): tô lại sprite đạn theo mức (tạm hoán đổi sprite khi vẽ) ----------
 const SH=new Map();
 function tintFrames(list,t,ph){return list?list.map(f=>{const w=f.img.width,h=f.img.height,c=mk(w,h);paint(c.getContext('2d'),f.img,0,0,w,h,0,0,t,ph);return {...f,img:c};}):list;}
 function tintedSet(id,sp,t,ph){const k=id+'|'+t+'|'+ph;let o=SH.get(k);if(!o){o={main:tintFrames(sp.main,t,ph/6),alt:sp.alt?tintFrames(sp.alt,t,ph/6):null,beam:null};
   if(sp.beam){const w=sp.beam.width,h=sp.beam.height,c=mk(w,h);paint(c.getContext('2d'),sp.beam,0,0,w,h,0,0,t,ph/6);o.beam=c;}SH.set(k,o);}return o;}
 function withShotTint(s,fn){const t=T.craft.t;if(!t||!s||typeof ShotV2==='undefined')return fn();const SP=ShotV2.sprites,id=s.art28??0,sp=SP[id]||SP[0];if(!sp)return fn();
  const ph=t>=4&&!quiet()?(Math.floor(time*3+(s.x||0)/160)%6+6)%6:0,o=tintedSet(SP[id]?id:0,sp,t,ph),m0=sp.main,a0=sp.alt,b0=sp.beam;sp.main=o.main;if(a0)sp.alt=o.alt;if(b0&&o.beam)sp.beam=o.beam;
  try{return fn();}finally{sp.main=m0;sp.alt=a0;sp.beam=b0;}}
 try{const oa=Arsenal30.draw;Arsenal30.draw=function(g,s){return withShotTint(s,()=>oa.apply(this,arguments));};}catch{}
 try{const ol=PlayerFXB.laser;PlayerFXB.laser=function(s){return withShotTint(s,()=>ol.apply(this,arguments));};}catch{}
 // ---------- hạt sao + tia sét ----------
 const cache=new Map();
 function halo(col){const k='h'+col;if(cache.has(k))return cache.get(k);const c=mk(64,64),g=c.getContext('2d'),gr=g.createRadialGradient(32,32,0,32,32,32);gr.addColorStop(0,'rgba(255,255,255,.8)');gr.addColorStop(.3,col);gr.addColorStop(1,'rgba(0,0,0,0)');g.globalAlpha=.55;g.fillStyle=gr;g.fillRect(0,0,64,64);cache.set(k,c);return c;}
 function star(col){const k='s'+col;if(cache.has(k))return cache.get(k);const c=mk(24,24),g=c.getContext('2d');g.translate(12,12);g.fillStyle=col;g.beginPath();for(let i=0;i<8;i++){const a=i*Math.PI/4-Math.PI/2,r=i%2?2:11;g.lineTo(Math.cos(a)*r,Math.sin(a)*r);}g.closePath();g.fill();g.fillStyle='#fff';g.beginPath();g.arc(0,0,2.2,0,TAU);g.fill();cache.set(k,c);return c;}
 const P=[],B=[];let acc=0,bacc=0;
 function emit(x,y,col,vx,vy){if(P.length>=(light()?40:90))P.shift();P.push({x,y,vx:vx*.08+(Math.random()-.5)*20,vy:vy*.08+(Math.random()-.5)*20,t:0,life:.38+Math.random()*.2,col,rot:Math.random()*TAU,sz:9+Math.random()*7});}
 function bolt(x0,y0,x1,y1,t){const n=7,pts=[[x0,y0]],dx=x1-x0,dy=y1-y0,L=Math.hypot(dx,dy)||1,nx=-dy/L,ny=dx/L;for(let i=1;i<n;i++){const u=i/n,j=(Math.random()-.5)*Math.min(26,L*.22);pts.push([x0+dx*u+nx*j,y0+dy*u+ny*j]);}pts.push([x1,y1]);if(B.length>=(light()?6:12))B.shift();B.push({pts,t:0,life:.12+Math.random()*.06,tier:t,o:Math.random()*360});}
 function pools(){const out=[];try{for(const k of ['missiles','sidearm']){const st=Gear44.fxState&&Gear44.fxState(k);if(st)out.push([k,st]);}}catch{}return out;}
 function nearestEnemy(x,y,R){let best=null,bd=R*R;for(const e of enemies){if(e.dead||!(e.hp>0))continue;const d=(e.x-x)**2+(e.y-y)**2;if(d<bd){bd=d;best=e;}}if(boss&&!boss.dead){const d=(boss.x-x)**2+(boss.y-y)**2;if(d<bd)best=boss;}return best;}
 function update(dt){const L=light(),Q=quiet();for(const p of P){p.t+=dt;p.x+=p.vx*dt;p.y+=p.vy*dt;}for(let i=P.length-1;i>=0;i--)if(P[i].t>=P[i].life)P.splice(i,1);for(const b of B)b.t+=dt;for(let i=B.length-1;i>=0;i--)if(B[i].t>=B[i].life)B.splice(i,1);
  if(Q)return;acc+=dt;bacc+=dt;
  if(acc>=(L?.09:.045)){acc=0;
   for(const [k,st] of pools()){const g=T[k];if(!g||g.t<2)continue;let n=0;for(const p of st.pool){if(!p.on||p.type!=='shot')continue;if(Math.random()<.7){emit(p.x,p.y,Math.random()<.5?'#ffffff':colOf(g.t,n*40),-p.vx,-p.vy);if(++n>=(g.t>=3?10:6))break;}}}
   const c=T.craft.t;if(c>=2){let n=0;for(const s of shots){if(s.dead||Math.random()>.3)continue;emit(s.x,s.y+6,Math.random()<.4?'#ffffff':colOf(c,n*50),-(s.vx||0),-(s.vy||-600));if(++n>=(c>=3?7:4))break;}}}
  // tia sét: mức 3+ (chiến cơ hoặc trang bị)
  if(bacc>=(L?.16:.09)){bacc=0;const c=T.craft.t;
   if(c>=3&&shots.length){const tries=c>=4?3:2;for(let i=0;i<tries;i++){const s=shots[(Math.random()*shots.length)|0];if(!s||s.dead||s.ray28)continue;const e=nearestEnemy(s.x,s.y,170);if(e)bolt(s.x,s.y,e.x,e.y,c);else{const o=shots[(Math.random()*shots.length)|0];if(o&&o!==s&&!o.dead&&Math.hypot(o.x-s.x,o.y-s.y)<120)bolt(s.x,s.y,o.x,o.y,c);}}}
   for(const [k,st] of pools()){const g=T[k];if(!g||g.t<3)continue;for(const p of st.pool){if(!p.on||p.type!=='shot'||Math.random()>.25)continue;const e=nearestEnemy(p.x,p.y,150);if(e){bolt(p.x,p.y,e.x,e.y,g.t);break;}}}}}
 function draw(){const L=light(),Q=quiet();ctx.save();ctx.globalCompositeOperation='lighter';ctx.lineCap='round';ctx.lineJoin='round';
  // quầng đạn trang bị theo màu mức
  for(const [k,st] of pools()){const g=T[k];if(!g||g.t<1)continue;const hs=g.t>=3?42:g.t>=2?34:28;let i=0;
   for(const p of st.pool){if(!p.on||p.type!=='shot')continue;ctx.globalAlpha=g.t>=3?.7:.55;ctx.drawImage(halo(g.t>=4?hue(time,i*45):COL[g.t]),p.x-hs/2,p.y-hs/2,hs,hs);i++;}}
  // đuôi sáng đạn chính
  {const c=T.craft.t;if(c>=2){for(const s of shots){if(s.dead||s.ray28)continue;const vx=s.vx||0,vy=s.vy||-600,v=Math.hypot(vx,vy)||1,len=c>=3?24:16;ctx.globalAlpha=c>=3?.55:.4;ctx.strokeStyle=colOf(c,s.x);ctx.lineWidth=c>=3?3:2;ctx.beginPath();ctx.moveTo(s.x,s.y);ctx.lineTo(s.x-vx/v*len,s.y-vy/v*len);ctx.stroke();}}}
  // tia sét
  for(const b of B){const u=b.t/b.life,col=b.tier>=4?`hsl(${(b.o+time*200)%360},100%,70%)`:'#ffd54a';
   for(const [w,a,cc] of [[5,.28,col],[2.2,.9,col],[1,1,'#ffffff']]){ctx.globalAlpha=a*(1-u*.6);ctx.strokeStyle=cc;ctx.lineWidth=w;ctx.beginPath();b.pts.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.stroke();}}
  // hạt sao
  for(const p of P){const u=p.t/p.life;ctx.globalAlpha=(1-u)*.9;const sz=p.sz*(1-u*.5);ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.rot+u*2);ctx.drawImage(star(p.col.startsWith('hsl')?'#ffffff':p.col),-sz/2,-sz/2,sz,sz);ctx.restore();}
  // hào quang giáp
  const a=T.armor;if(a&&a.t>=1&&mode==='play'){const x=player.x,y=player.y,r=58,spin=Q?0:time*.9,col=colOf(a.t);ctx.globalAlpha=.25+.08*a.t;ctx.strokeStyle=col;ctx.lineWidth=1.6+.3*a.t;ctx.beginPath();ctx.arc(x,y,r,0,TAU);ctx.stroke();
   if(a.t>=3){ctx.globalAlpha=.32;ctx.strokeStyle=a.t>=4?colOf(4,180):'#ffd54a';ctx.lineWidth=1.2;ctx.beginPath();ctx.arc(x,y,r+6,0,TAU);ctx.stroke();}
   if(a.t>=2){const n=a.t>=3?6:3;ctx.globalAlpha=.85;for(let i=0;i<n;i++){const q=spin+i*TAU/n,sz=a.t>=3?15:12,sp=star(a.t>=4?'#ffffff':a.t>=3?'#ffd54a':'#e9eeff');ctx.drawImage(sp,x+Math.cos(q)*r-sz/2,y+Math.sin(q)*r-sz/2,sz,sz);}}}
  ctx.restore();}
 // ---------- Kho chiến cơ + thông báo lên mức ----------
 const KEY='saobang-evo-v55';let seen=null;try{seen=JSON.parse(localStorage.getItem(KEY)||'null');}catch{}
 // ---------- ô Kho: hiện đúng hình tiến hóa ----------
 //  • Chiến cơ: vẽ thẳng ô thân đã tiến hóa + tô màu (Evo53.hull) vào ô → khớp 100% với trong trận.
 //  • Trang bị: nếu có tranh icon tiến hóa 'g:<id>_icon_evo1|2' (id gốc như 'inferno', SSS như 'sss_aegis_mirror') thì phủ lên ô; màu theo bậc do CSS.
 function slotEvo(el,k){const pic=el.querySelector('.pic');if(!pic)return;let ov=pic.querySelector('.evo59');
  const off=()=>{if(ov)ov.remove();pic.classList.remove('evo59on');};
  if(k==='craft'){if(activeRobot||!(T.craft.t>0)){off();return;}const h=hull(selected);if(!h||h===fighterAtlasV22){off();return;}
   if(!ov||ov.tagName!=='CANVAS'){if(ov)ov.remove();ov=document.createElement('canvas');ov.className='evo59 evo59c';ov.width=ov.height=160;pic.appendChild(ov);}
   const g=ov.getContext('2d'),w=h.naturalWidth/5,hh=h.naturalHeight/4;g.clearRect(0,0,160,160);g.drawImage(h,selected%5*w,Math.floor(selected/5)*hh,w,hh,6,6,148,148);pic.classList.add('evo59on');return;}
  let d=null;try{d=Gear44.activeDef(k);}catch{}const st=gearStage(T[k]);if(!d||!st){off();return;}
  let im=null;for(let s=st;s>=1;s--){const a=ARTIMG['g:'+d.id+'_icon_evo'+s];if(okIm(a)){im=a;break;}}if(!im){off();return;}
  if(!ov||ov.tagName!=='IMG'){if(ov)ov.remove();ov=document.createElement('img');ov.className='evo59';ov.alt='';pic.appendChild(ov);}
  if(ov.src!==im.src)ov.src=im.src;pic.classList.add('evo59on');}
 function ui(){if(['play','pause'].includes(mode))return;refresh();
  const root=document.getElementById('hgr41');if(root&&!root.hidden)for(const k of ['craft','armor','missiles','sidearm']){const el=root.querySelector(`.h1-slot[data-slot="${k}"]`);if(el){const v=String(T[k].t||0);if(el.dataset.t52!==v)el.dataset.t52=v;try{slotEvo(el,k);}catch{}}}
  const cur={};for(const k in T)cur[k]=(T[k].sss?'s':'n')+(T[k].t||0);
  if(seen){for(const k in cur){const o=seen[k]||'n0';if(cur[k]!==o&&cur[k][0]===o[0]&&+cur[k].slice(1)>+o.slice(1)){const lbl={craft:'CHIẾN CƠ',armor:'GIÁP',missiles:'VŨ KHÍ',sidearm:'TÀU CON'}[k];try{toast('★ TIẾN HÓA · '+lbl+' · '+NAME[+cur[k].slice(1)]);}catch{}}}}
  seen=cur;try{localStorage.setItem(KEY,JSON.stringify(cur));}catch{}}
 setInterval(()=>{try{ui();}catch{}},700);
 // ---------- V63 · TÁC DỤNG THẬT của tiến hóa chiến cơ (nhỏ, không phá cân bằng) ----------
 //  • (V64 theo Gemini) HOÀNG KIM (+4): mỗi 0,5 s một tia sét, sát thương = max(6% sát thương thật súng chính + trang bị trong 0,5 s đó, 30% sát thương 1 viên đạn chính).
 //  • CẦU VỒNG (+5): 8%, lan sang 1 địch thứ hai (≤200 px); LÁ CHẮN PHA LÊ chặn 1 viên đạn, hồi 15 s.
 let zapAcc=0,shCD=0,shReady=false,shFlash=0,armorUsed=-1;const PERK={zaps:0,zapDmg:0,blocks:0};
 function hurtE(e,amt){if(!e||e.dead||!(amt>0))return;if(e===boss||e.bossPart){try{damageBoss(amt,'evo',e);}catch{}return;}try{Report392.hit(Math.min(e.hp,amt),'evo');}catch{}e.hp-=amt;if(e.hp<=0)kill(e);}
 function perks(dt){const c=T.craft.t;if(c<3||activeRobot){shReady=false;return;}
  zapAcc+=dt;if(zapAcc>=.5){zapAcc=0;let dm=0;try{const d=Report392.state().dealt;dm=(d.main||0)+(d.gear||0);}catch{}const gain=Math.max(0,dm-(PERK.last||0));PERK.last=dm;let avg=0,n=0;for(const s of shots)if(!s.dead&&!s.ray28&&s.damage>0){avg+=s.damage;n++;}avg=n?avg/n:0;const amt=Math.max(gain*(c>=4?.08:.06),.3*avg);
   const e=nearestEnemy(player.x,player.y-20,1200);if(e&&amt>0){hurtE(e,amt);PERK.zaps++;PERK.zapDmg+=amt;if(!quiet())bolt(player.x,player.y-28,e.x,e.y,c);
    if(c>=4){let e2=null,bd=200*200;for(const o of enemies){if(o===e||o.dead||!(o.hp>0))continue;const d=(o.x-e.x)**2+(o.y-e.y)**2;if(d<bd){bd=d;e2=o;}}if(e2){hurtE(e2,amt);PERK.zapDmg+=amt;if(!quiet())bolt(e.x,e.y,e2.x,e2.y,c);}}}}
  if(c>=4){if(!shReady){shCD-=dt;if(shCD<=0)shReady=true;}}else shReady=false;
  if(shFlash>0)shFlash-=dt;}
 try{const od=window.damage;if(typeof od==='function'){damage=function(source){if(source==='bullet'&&shReady&&mode==='play'&&invuln<=0&&!(bulletShieldTime>0)){shReady=false;shCD=15;shFlash=.35;PERK.blocks++;try{VisualFX.impact(player.x,player.y,'#ffffff');}catch{}invuln=Math.max(invuln,.25);return;}const s0=shield;const rv=od.apply(this,arguments);try{if(s0>0&&shield<=0&&(T.armor||{}).t>=4&&armorUsed!==level){armorUsed=level;bullets=bullets.filter(b=>Math.hypot(b.x-player.x,b.y-player.y)>120);ring(player.x,player.y,'#ffffff',120);PERK.armorClears=(PERK.armorClears||0)+1;}}catch{}return rv;};}}catch{}
 function drawShield(){if(!shReady&&shFlash<=0)return;const x=player.x,y=player.y,r=40;ctx.save();ctx.globalCompositeOperation='lighter';
  if(shReady){ctx.globalAlpha=.55;ctx.lineWidth=2;const n=6;for(let i=0;i<n;i++){const a0=time*1.2+i*TAU/n;ctx.strokeStyle=hue(time,i*60);ctx.beginPath();ctx.arc(x,y,r,a0,a0+TAU/n*.7);ctx.stroke();}}
  if(shFlash>0){ctx.globalAlpha=shFlash/.35;ctx.strokeStyle='#ffffff';ctx.lineWidth=4;ctx.beginPath();ctx.arc(x,y,r+(.35-shFlash)*60,0,TAU);ctx.stroke();}ctx.restore();}
 // Trang bị +5 (MAX): Tên lửa ×1,2 sát thương (≈ +1 tên lửa/loạt) · Tàu con ×1,15 khi Bạo Tẩu · Giáp: vỡ giáp xóa đạn 120 px (1 lần/ải)
 function gearBonus(kind){const t=(T[kind]||{}).t||0;if(t<4)return 1;if(kind==='missiles')return 1.2;if(kind==='sidearm')return superTime>0?1.15:1;return 1;}
 // ---------- gắn vào game ----------
 const ov=VisualFX.draw;VisualFX.draw=function(){const v=ov.apply(this,arguments);try{if(mode==='play'||mode==='pause'){draw();drawShield();}}catch(e){}return v;};
 const oup=Waves30.update;Waves30.update=function(dt){const r=oup.apply(this,arguments);try{if(mode==='play'){update(dt);perks(dt);}}catch(e){}return r;};
 return {gearBonus,resetStage:()=>{armorUsed=-1;},perk:()=>({...PERK,shReady,shCD}),hull,gearAssets,paint,tiers:()=>{refresh();return JSON.parse(JSON.stringify(T));},tierN,tierS,names:NAME,particles:()=>P.length,bolts:()=>B.length,art:()=>Object.keys(ARTIMG)};
})();
const Rank52=Evo53;
