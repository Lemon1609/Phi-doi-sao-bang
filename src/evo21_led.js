'use strict';
// V2.1 · EVO21_LED — đèn LED & neon động cho 13 chiến cơ, 7 Chiến Thần (chiến cơ + robot), tên lửa / tàu con (thường + SSS),
// trong trận, sân khấu Kho và Xưởng SSS (chủ dự án 23/11). Chỉ drawImage sprite dựng sẵn ('lighter'), KHÔNG ctx.filter / shadowBlur.
// Tắt: window.EVO21LED=false · window.EVO21=false tắt cả V2.1.
(()=>{
 const ON=()=>window.EVO21!==false&&window.EVO21LED!==false;
 const NOW=()=>performance.now()/1000;
 // ---------- sprite dựng sẵn theo màu (bộ đệm) ----------
 const C={};
 const rgb=h=>{h=String(h||'#7dd3fc').replace('#','');if(h.length===3)h=h.split('').map(x=>x+x).join('');const n=parseInt(h.slice(0,6),16)||0x7dd3fc;return [n>>16&255,n>>8&255,n&255];};
 const rgba=(h,a)=>{const [r,g,b]=rgb(h);return `rgba(${r},${g},${b},${a})`;};
 function mk(w,h,fn){const c=document.createElement('canvas');c.width=w;c.height=h;fn(c.getContext('2d'),w,h);return c;}
 function flare(col){const k='f'+col;return C[k]||(C[k]=mk(64,64,(g)=>{const r=g.createRadialGradient(32,32,0,32,32,32);r.addColorStop(0,'rgba(255,255,255,1)');r.addColorStop(.09,'rgba(255,255,255,.85)');r.addColorStop(.24,rgba(col,.8));r.addColorStop(.62,rgba(col,.22));r.addColorStop(1,rgba(col,0));g.fillStyle=r;g.fillRect(0,0,64,64);
   /* 4 tia chữ thập mảnh cho LED sắc */g.globalCompositeOperation='lighter';const l=g.createLinearGradient(0,0,64,0);l.addColorStop(0,rgba(col,0));l.addColorStop(.5,'rgba(255,255,255,.7)');l.addColorStop(1,rgba(col,0));g.fillStyle=l;g.fillRect(0,31,64,2);const v=g.createLinearGradient(0,0,0,64);v.addColorStop(0,rgba(col,0));v.addColorStop(.5,'rgba(255,255,255,.55)');v.addColorStop(1,rgba(col,0));g.fillStyle=v;g.fillRect(31,8,2,48);}));}
 function streak(col){const k='s'+col;return C[k]||(C[k]=mk(128,16,(g,w,h)=>{g.save();g.translate(64,8);g.scale(1,.125);const r=g.createRadialGradient(0,0,0,0,0,64);r.addColorStop(0,'rgba(255,255,255,1)');r.addColorStop(.25,rgba(col,.85));r.addColorStop(.6,rgba(col,.25));r.addColorStop(1,rgba(col,0));g.fillStyle=r;g.fillRect(-64,-64,128,128);g.restore();}));}
 function ring(col){const k='r'+col;return C[k]||(C[k]=mk(96,96,(g)=>{const r=g.createRadialGradient(48,48,0,48,48,48);r.addColorStop(0,rgba(col,0));r.addColorStop(.66,rgba(col,0));r.addColorStop(.78,rgba(col,.55));r.addColorStop(.83,'rgba(255,255,255,.8)');r.addColorStop(.88,rgba(col,.5));r.addColorStop(1,rgba(col,0));g.fillStyle=r;g.fillRect(0,0,96,96);}));}
 function dot(g,x,y,r,col,a){if(a<=.01||r<=.5)return;g.globalAlpha=Math.min(1,a);g.drawImage(flare(col),x-r,y-r,r*2,r*2);}
 function vein(g,x1,y1,x2,y2,w,col,a,run){if(a<=.01)return;const L=Math.hypot(x2-x1,y2-y1);if(L<2)return;g.save();g.translate(x1,y1);g.rotate(Math.atan2(y2-y1,x2-x1));g.globalAlpha=Math.min(1,a);g.drawImage(streak(col),0,-w/2,L,w);
   if(run!=null){/* xung neon chạy dọc mạch (Bạo Tẩu) */const u=run-Math.floor(run);g.globalAlpha=Math.min(1,a*1.4);g.drawImage(flare(col),L*u-w*1.4,-w*1.4,w*2.8,w*2.8);}g.restore();}
 function ringAt(g,x,y,r,col,a){if(a<=.01)return;g.globalAlpha=Math.min(1,a);g.drawImage(ring(col),x-r,y-r,r*2,r*2);}
 // ---------- nhịp thở theo bậc ----------
 const TB={thuong:[.25,.45,1.6],luc:[.30,.55,1.8],lam:[.38,.65,2.0],tim:[.45,.80,2.4],tim5:[.48,.80,2.4],ss:[.50,.82,2.4],sss:[.50,.85,2.4]};
 const ACC={thuong:'#e2e8f0',luc:'#4ade80',lam:'#38bdf8',ss:'#fde047',sss:'#fde047'};
 const tierOf=id=>{try{return (window.Dan299&&Dan299.tierOf(id))||'tim';}catch{return 'tim';}};
 function pulse(tier,t,ph,sp,boost){const P=TB[tier]||TB.tim;let s=.5+.5*Math.sin(t*6.2832*P[2]+(ph||0));let a=P[0]+(P[1]-P[0])*s;if(sp){/* Bạo Tẩu: chớp neon tần số cao */a=Math.min(1,a+.15+.18*Math.max(0,Math.sin(t*6.2832*9+(ph||0))));}return a*(boost||1);}
 // ---------- tốc độ tàu → sáng +25 % khi lách nhanh ----------
 const MV={x:null,y:null,t:0,b:1};
 function moveBoost(){let x,y;try{x=player.x;y=player.y;}catch{return 1;}const t=NOW(),dt=t-MV.t;if(MV.x!=null&&dt>0&&dt<.2){const v=Math.hypot(x-MV.x,y-MV.y)/dt,tg=v>260?1.25:1;MV.b+=(tg-MV.b)*Math.min(1,dt*8);}MV.x=x;MV.y=y;MV.t=t;return MV.b;}
 const supNow=()=>{try{return superTime>0;}catch{return false;}};
 // ---------- chiến cơ: lõi + 2 mạch cánh + 2 đèn chóp cánh (theo SHIP309BB) ----------
 const CNT={ship:0,ct:0,pod:0,mis:0,miss:0};
 function shipLED(g,id,tier,F,t,sp,boost,cx,cy){const bb=window.SHIP309BB&&SHIP309BB[id]&&(SHIP309BB[id][tier]||SHIP309BB[id].tim);if(!bb){CNT.miss++;return false;}CNT.ship++;
   const col=(window.SHIP309COL&&SHIP309COL[id])||'#7dd3fc',acc=ACC[tier]||col,k=F,ox=cx||0,oy=cy||0;
   const gx=ox+bb[7]*k,gy=oy+bb[8]*k,lx=ox+bb[0]*k*.9,rx=ox+bb[2]*k*.9,wy=oy+bb[6]*k,P=TB[tier]||TB.tim,sz=k*(.055+.012*(tier==='tim'||tier==='tim5'||tier==='ss'?1:0));
   const a=pulse(tier,t,0,sp,boost),a2=pulse(tier,t,1.1,sp,boost),run=sp?t*3.2:null;
   g.save();g.globalCompositeOperation='lighter';
   vein(g,gx+(lx-gx)*.18,gy+(wy-gy)*.18,gx+(lx-gx)*.82,gy+(wy-gy)*.82,sz*1.8,col,a2,run);
   vein(g,gx+(rx-gx)*.18,gy+(wy-gy)*.18,gx+(rx-gx)*.82,gy+(wy-gy)*.82,sz*1.8,col,a2,run==null?null:run+.5);
   dot(g,gx,gy,sz*(2.4+.6*a),col,a);dot(g,gx,gy,sz*.8,'#ffffff',a*.6);
   const blink=.55+.45*Math.max(0,Math.sin(t*6.2832*P[2]*.5+(sp?t*20:0)));dot(g,lx,wy,sz*2,acc,a*blink);dot(g,rx,wy,sz*2,acc,a*blink);
   if(sp)ringAt(g,gx,gy,sz*(3.4+1.2*Math.sin(t*14)),col,.35+.25*a);
   g.restore();return true;}
 function hookShip(){try{if(typeof SuperGame==='undefined'||!SuperGame.drawShip)return false;if(HK.ship)return true;const od=SuperGame.drawShip;if(!od.__l3&&window.L3309!==false&&window.SHIP309V4&&performance.now()<9000)return false;
   const f=function(id,rot){const r=od.apply(this,arguments);try{if(ON()&&Number.isInteger(id)&&typeof player!=='undefined'){const sp=supNow(),F=(76+(sp?12:0))*1.4*(sp?1.08:1);let bank=0;try{bank=V118.state().bank||0;}catch{}
     ctx.save();ctx.translate(player.x,player.y);ctx.rotate((rot||0)*.6+bank);shipLED(ctx,id,tierOf(id),F,NOW(),sp,moveBoost());ctx.restore();}}catch(e){try{ctx.restore();}catch{}}return r;};
   for(const k of Object.keys(od))try{f[k]=od[k];}catch{}f.__led=1;SuperGame.drawShip=f;HK.ship=1;return true;}catch{return false;}}
 // ---------- Chiến Thần (chiến cơ / robot) ----------
 const CTC=[['#c026d3','#22d3ee'],['#a855f7','#2dd4bf'],['#facc15','#ef4444'],['#3b82f6','#a855f7'],['#38bdf8','#f8fafc'],['#dc2626','#fbbf24'],['#eab308','#9333ea']];
 const robM=()=>{try{return window.Evo21?Evo21.robM():0;}catch{return 0;}};
 const robOn=()=>{try{return !!(activeRobot&&activeRobot.super&&superTime>0);}catch{return false;}};
 function ctLED(g,i,x,y,t,robot,m,ultU,boost){const [c1,c2]=CTC[i]||CTC[0],tier=['lam','tim','tim','ss'][m]||'tim',S=robot?150:118,a=pulse(tier,t,0,robot,boost),a2=pulse(tier,t,1.3,robot,boost),run=robot?t*2.6:null,pk=ultU>0?1+1.2*ultU:1;
   g.save();g.globalCompositeOperation='lighter';
   if(!robot){/* chiến cơ: lõi + 2 mạch cánh + 2 chóp cánh + đầu mũi */const cy=y+S*.04;
     vein(g,x-S*.06,cy,x-S*.36,cy+S*.10,S*.05,c1,a2*.75,null);vein(g,x+S*.06,cy,x+S*.36,cy+S*.10,S*.05,c1,a2*.75,null);
     dot(g,x,cy,S*(.10+.03*a),c1,a);dot(g,x-S*.40,cy+S*.11,S*.06,c2,a);dot(g,x+S*.40,cy+S*.11,S*.06,c2,a);if(m>=1)dot(g,x,y-S*.40,S*.05,c2,a2);
     if(m>=3)ringAt(g,x,cy,S*(.22+.03*Math.sin(t*5)),c2,.25*a);}
   else{/* robot: lõi ngực + mạch giáp lưng + hào quang + đầu vũ khí; bùng 0,4 s khi Tuyệt kỹ E */const cy=y-S*.06,hy=y-S*.46,P=Math.min(1,a*pk);
     vein(g,x,cy,x,hy+S*.08,S*.06,c1,a2*.8*pk,run);vein(g,x-S*.04,cy,x-S*.30,y-S*.30,S*.05,c2,a2*.7*pk,run==null?null:run+.33);vein(g,x+S*.04,cy,x+S*.30,y-S*.30,S*.05,c2,a2*.7*pk,run==null?null:run+.66);
     dot(g,x,cy,S*(.07+.03*a)*(ultU>0?1.4:1),c1,P*.85);ringAt(g,x,hy,S*(.13+.015*Math.sin(t*6.2832*1.2)),c2,(m>=2?.45:.3)*a*pk);
     dot(g,x-S*.42,y+S*.02,S*.05,c2,a2);dot(g,x+S*.42,y+S*.02,S*.05,c2,a2);
     if(ultU>0)ringAt(g,x,cy,S*(.25+.6*(1-ultU)),c1,.7*ultU);}
   g.restore();}
 function hookCT(){try{if(typeof SSSGame==='undefined'||!SSSGame.draw)return false;if(HK.ct)return true;const od=SSSGame.draw;if(!od.__h4&&window.HOP4309!==false&&performance.now()<9000)return false;
   const f=function(r){const res=od.apply(this,arguments);try{if(ON()&&typeof player!=='undefined'){let i=-1;try{i=SSSGame.indexFor(r);}catch{}if(i>=0){const t=NOW(),rob=robOn();let U=0;try{U=SSSGame.state().ult||0;}catch{}
     const ultU=U>2.0&&U<=2.4?(U-2.0)/.4:0;/* 0,4 s đầu Tuyệt kỹ E: bùng neon */ctLED(ctx,i,player.x,player.y,t,rob,robM(),ultU,moveBoost());}}}catch{}return res;};
   for(const k of Object.keys(od))try{f[k]=od[k];}catch{}f.__led=1;SSSGame.draw=f;HK.ct=1;return true;}catch{return false;}}
 // ---------- trang bị ----------
 const GT={thuong:'thuong',luc:'luc',lam:'lam',tim:'tim',tim5:'tim5',ss:'ss',sss:'sss'};
 function sssTier(I){try{const e=Gear44.sssEnh(I.sss.id)||0;return e>=10?'sss':e>=3?'ss':'tim';}catch{return 'sss';}}
 function tierG(I){return I&&I.sss?sssTier(I):(GT[I&&I.tier]||'lam');}
 // tàu con: lõi + chớp nòng 0,12 s mỗi lần bắn + đồng bộ cánh mini khi Bạo Tẩu
 function pod(g,x,y,w,I,sp,fireAge){if(!ON()||!I)return;const tier=tierG(I),pal=I.pal||[],c1=pal[1]||'#7dd3fc',c3=pal[3]||c1,t=NOW(),P=TB[tier]||TB.tim;
   const lo=I.sss?(tier==='sss'?.55:tier==='ss'?.45:.35):[.35,.40,.48,.55,.58,.62][['thuong','luc','lam','tim','tim5','ss'].indexOf(tier)]||.45,hi=I.sss?(tier==='sss'?.75:.65):lo+.2;
   let s=.5+.5*Math.sin(t*6.2832*(sp?P[2]*1.6:P[2])+x*.02);if(sp)s=.6+.4*Math.abs(Math.sin(t*5*Math.PI));/* Bạo Tẩu: cùng nhịp phồng xẹp cánh mini */
   const a=lo+(hi-lo)*s;g.save();g.globalCompositeOperation='lighter';dot(g,x,y,w*(.20+.06*s),c1,a);dot(g,x,y,w*.08,'#ffffff',a*.7);
   if(fireAge!=null&&fireAge<.12){const u=1-fireAge/.12;dot(g,x,y-w*.42,w*(.16+.12*u),c3,.9*u);vein(g,x,y-w*.36,x,y-w*.75,w*.10,c3,.7*u,null);}
   g.restore();}
 // tên lửa: đèn đầu đạn + vệt LED dọc sống (toạ độ đã xoay theo hướng bay, gốc = tâm đạn)
 function mis(g,W,L,I,sup){if(!ON()||!I)return;const tier=tierG(I),pal=I.pal||[],c0=pal[0]||'#fff7ed',c3=pal[3]||'#fb923c',t=NOW(),P=TB[tier]||TB.tim,s=.5+.5*Math.sin(t*6.2832*P[2]*1.5+L),a=(P[0]+(P[1]-P[0])*s)*(sup?1.2:1);
   g.save();g.globalCompositeOperation='lighter';vein(g,0,-L*.30,0,L*.12,Math.max(2.2,W*.16),c3,a*.75,sup?t*3:null);dot(g,0,-L*.34,Math.max(3.5,W*(.22+.08*s)),c0,a);g.restore();}
 // ---------- sân khấu Kho (WING10.Stage) ----------
 function stageShip(g,id,x,y,S,t,burst){if(!ON()||!Number.isInteger(id)||id<0)return;g.save();shipLED(g,id,tierOf(id),S,t,burst>.5,1,x,y);g.restore();}
 function stageCT(g,i,x,y,S,t,robot){if(!ON()||i<0)return;g.save();g.translate(x,y);g.scale(S/(robot?300:236),S/(robot?300:236));ctLED(g,i,0,0,t,robot,robM(),0,1);g.restore();}
 // ---------- Xưởng SSS: khung xem trước có nhịp LED ----------
 const PV=new Set();
 function preview(cv,opt){if(!cv||!opt||!opt.src)return;cv.__o=opt;const im=new Image();im.src=opt.src;cv.__im=im;if(PV.has(cv))return;PV.add(cv);
   const loop=()=>{if(!cv.isConnected){PV.delete(cv);return;}requestAnimationFrame(loop);const W=cv.clientWidth||cv.width,H=cv.clientHeight||cv.height;if(!W||!H)return;const d=Math.min(2,window.devicePixelRatio||1);if(cv.width!==Math.round(W*d)){cv.width=Math.round(W*d);cv.height=Math.round(H*d);}
     const g=cv.getContext('2d'),o=cv.__o,im=cv.__im,t=NOW();g.setTransform(d,0,0,d,0,0);g.clearRect(0,0,W,H);
     const rg=g.createRadialGradient(W/2,H*.55,0,W/2,H*.55,W*.6);rg.addColorStop(0,'rgba(30,64,175,.35)');rg.addColorStop(1,'rgba(2,6,23,0)');g.fillStyle=rg;g.fillRect(0,0,W,H);
     g.save();g.globalCompositeOperation='lighter';ringAt(g,W/2,H*.82,W*.30,o.c1||'#38bdf8',.35+.15*Math.sin(t*2.4));g.restore();
     if(!(im.complete&&im.naturalWidth))return;const iw=im.naturalWidth,ih=im.naturalHeight,sc=Math.min(W*.74/iw,H*.74/ih),bob=Math.sin(t*1.9)*3,w=iw*sc,h=ih*sc,x=W/2,y=H*.48+bob;
     g.drawImage(im,x-w/2,y-h/2,w,h);if(!ON())return;const I={sss:o.sss?{id:o.sss}:null,tier:o.tier||'tim',pal:[o.c0||'#ffffff',o.c1||'#38bdf8','',o.c3||o.c1||'#38bdf8']};
     if(o.kind==='missiles'){g.save();g.translate(x,y);mis(g,w,h,I,false);g.restore();}else pod(g,x,y,Math.max(w,h),I,false,(t%1.1));};
   requestAnimationFrame(loop);}
 // Xưởng SSS: khung xem trước canvas.e21pv (gear45 chèn) + CSS dải 3 mốc
 function scan(){if(window.EVO21===false)return;for(const cv of document.querySelectorAll('canvas.e21pv:not([data-on])')){cv.dataset.on=1;const id=cv.dataset.id,src=window.Evo21&&Evo21.sssIcon?Evo21.sssIcon(id):null;if(!src)continue;const mis=!!(window.EVO21_IMG&&(EVO21_IMG['st_'+id+'_0']));const c=cv.dataset.c||'#38bdf8';
   preview(cv,{src,kind:mis?'missiles':'sidearm',sss:id,c1:c,c3:c,c0:'#ffffff',tier:'sss'});}}
 try{const st=document.createElement('style');st.id='evo21-led-css';st.textContent='.g44-art.e21a{display:flex;flex-direction:column;align-items:center;gap:4px}.g44-art.e21a canvas.e21pv{width:150px;height:150px;display:block}.g44-art.e21a .e21t{display:flex;gap:6px}.g44-art.e21a .e21t span{display:flex;flex-direction:column;align-items:center;padding:2px 3px;border:1px solid rgba(148,163,184,.35);border-radius:6px;background:rgba(2,6,23,.55);opacity:.6}.g44-art.e21a .e21t span.on{opacity:1;border-color:#fde047;box-shadow:0 0 0 1px rgba(253,224,71,.4) inset}.g44-art.e21a .e21t img{width:34px;height:34px;object-fit:contain}.g44-art.e21a .e21t b{font:700 10px/1.1 system-ui;color:#e2e8f0}';(document.head||document.documentElement).appendChild(st);}catch{}
 setInterval(scan,350);
 // ---------- móc ----------
 const HK={};const iv=setInterval(()=>{const a=hookShip(),b=hookCT();if(a&&b)clearInterval(iv);},400);setTimeout(()=>clearInterval(iv),60000);
 window.EvoLED={pod,mis,stageShip,stageCT,preview,shipLED,ctLED,dot,vein,ringAt,state:()=>({...HK,...CNT,cache:Object.keys(C).length,boost:MV.b})};
})();
