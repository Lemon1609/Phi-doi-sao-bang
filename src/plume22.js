// V2.2 · Đuôi lửa ion-plasma đồng bộ (tắt: window.PLUME22=false — quay về luồng thuôn vẽ bằng mã của fx18)
//  • 4 sprite GPT (cyan / gold / crimson / void, 96×224, alpha mềm) vẽ 'lighter' — không shadowBlur, không filter, không gradient mỗi khung.
//  • THRUSTER_ANCHORS (claude_tools/v22_plume_neo.py): họng xả đo trên đường đáy thân thật của 13 chiến cơ × 6 bậc (+Bạo Tẩu),
//    tàu con (wg_/sw_), 7 Chiến Thần dạng chiến cơ / robot × 3 mốc. Đơn vị = cạnh dài ảnh, gốc = tâm ảnh; thụt 4 px vào họng lúc vẽ.
//  • Cỡ theo lớp: tàu con .45 · chiến cơ 1 · Chiến Thần / robot 1,45 (so với chiến cơ). Nhịp đẩy scaleY .90–1,14, scaleX .95–1,05 lệch pha từng họng.
//  • Bạo Tẩu: dài ×1,45, α .95 (thường .82). Trong trận: nghiêng ±7° ngược chiều kéo ngang (làm mượt).
//  • Luôn vẽ TRƯỚC thân (thân đè lên lửa).
(()=>{
 const ON=()=>window.V22!==false&&window.PLUME22!==false&&!!window.PLUME22_IMG;
 const IM={};const img=k=>{let i=IM[k];if(!i&&window.PLUME22_IMG&&PLUME22_IMG[k]){i=IM[k]=new Image();i.src=PLUME22_IMG[k];}return i&&i.complete&&i.naturalWidth?i:null;};
 const T=()=>window.THRUSTER_ANCHORS||{};
 const hex=c=>{c=String(c||'#38bdf8').trim();if(c[0]==='#'){if(c.length===4)c='#'+c[1]+c[1]+c[2]+c[2]+c[3]+c[3];const n=parseInt(c.slice(1,7),16);return [n>>16&255,n>>8&255,n&255];}const m=c.match(/\d+(\.\d+)?/g);return m?m.slice(0,3).map(Number):[56,189,248];};
 const EC=new Map();
 function el(col){if(col==='cyan'||col==='gold'||col==='crimson'||col==='void')return col;const k=String(col);let e=EC.get(k);if(e)return e;const [r,g,b]=hex(col),mx=Math.max(r,g,b),mn=Math.min(r,g,b),d=mx-mn;let h=0;
  if(d<18)e='cyan';else{if(mx===r)h=((g-b)/d)%6;else if(mx===g)h=(b-r)/d+2;else h=(r-g)/d+4;h=(h*60+360)%360;e=h<25||h>=335?'crimson':h<75?'gold':h<150?'gold':h<250?'cyan':'void';}
  EC.set(k,e);return e;}
 // ---- nghiêng theo vận tốc ngang (trận) ----
 const SW={x:null,t:0,v:0,a:0};
 function sway(){let play=false;try{play=mode==='play';}catch{}if(!play||typeof player==='undefined')return 0;const now=performance.now()/1000,dt=Math.min(.1,now-(SW.t||now));SW.t=now;
  if(dt>0&&SW.x!=null){const v=(player.x-SW.x)/dt;SW.v+=(v-SW.v)*Math.min(1,dt*12);}SW.x=player.x;
  const tg=Math.max(-1,Math.min(1,SW.v/650))*(7*Math.PI/180);SW.a+=(tg-SW.a)*Math.min(1,dt*9);return Math.abs(SW.a)<(4*Math.PI/180)&&Math.abs(SW.v)>40?Math.sign(SW.a)*Math.max(Math.abs(SW.a),Math.min(Math.abs(SW.a)*1.6,4*Math.PI/180)):SW.a;}
 // ---- 1 luồng ----
 function draw(g,x,y,len,wid,e,seed,boost,ang,alpha){const im=img(e)||img('cyan');if(!im)return false;const t=performance.now()/1000,s=seed||0;
  const sy=1.02+.08*Math.sin(t*29+s)+.04*Math.sin(t*53+s*2.3),sx=1+.035*Math.sin(t*37+s*1.7)+.015*Math.sin(t*61+s);
  const L=len*sy*(boost?1.45:1)*(window.VFX23!==false&&window.__vy23K?window.__vy23K:1),W=wid*sx*(boost?1.06:1);/* V2.2.3: lên +18 % / xuống −18 % theo vận tốc dọc (vfx23) */
  const pc=g.globalCompositeOperation,pa=g.globalAlpha;g.save();g.translate(x,y);if(ang)g.rotate(ang);g.globalCompositeOperation='lighter';g.globalAlpha=pa*(alpha!=null?alpha:(boost?.95:.82));
  g.drawImage(im,-W/2,-L*.03,W,L);g.restore();g.globalCompositeOperation=pc;g.globalAlpha=pa;return true;}
 // ---- 1 đơn vị theo bảng neo ----
 const CLS={pod:.45,ship:1,ct:1.45,rob:1.55};
 function unit(g,list,cx,cy,D,base,cls,e,boost,ang,seed){if(!list||!list.length)return false;const n=list.length,per=n===1?1:n===2?.8:.68,k=CLS[cls]||1,tuck=cls==='pod'?3:4;
  for(let i=0;i<n;i++){const [rx,ry,ws]=list[i],wsc=Math.max(.75,Math.min(1.2,ws||1));const L=base*k,Wd=L*.43*per*wsc;
   draw(g,cx+rx*D,cy+ry*D-tuck,L,Wd,e,(seed||0)+i*2.17,boost,ang);}return true;}
 // ---- chiến cơ (gọi từ l3309 back(), hệ toạ độ đã ở tâm tàu, đã xoay theo nghiêng thân) ----
 function ship(g,id,tf,sp,F,col){if(!ON())return false;const A=T().ship&&T().ship[id];if(!A)return false;const list=(sp&&A[tf+'_bt'])||A[tf]||A.tim;const e=(T().el&&T().el.ship&&T().el.ship[id])||el(col);
  /* V2.2.1 PL221: lửa thường ≤ 60 % chiều cao phần ĐẶC thân (Bạo Tẩu vẫn ×1,45 trong draw). Tắt: window.PL221=false */
  const bh=window.__bh221,base=(window.PL221!==false&&bh>0)?Math.min(F*.42,bh*(window.PL221K||.6)):F*.42;window.__bh221=0;
  return unit(g,list,0,0,F,base,'ship',e,sp,sway(),id*.9);}
 // ---- Kho / Sảnh: tàu id vẽ ở (x,y) cỡ S (khung vuông) ----
 function stageShip(g,id,x,y,S,boost){if(!ON())return false;const A=T().ship&&T().ship[id];if(!A)return false;let tf='tim';try{tf=L3309S.tierOf(id)||'tim';}catch{}
  const e=(T().el&&T().el.ship&&T().el.ship[id])||'cyan';let base=S*.42;try{const B=window.PL221!==false&&L3309S.BB[id]&&L3309S.BB[id][tf];if(B)base=Math.min(base,(B[3]-B[1])*S*(window.PL221K||.6));}catch{}return unit(g,A[tf]||A.tim,x,y,S,base,'ship',e,boost,0,id*.9);}
 // ---- tàu con: ảnh thân đang vẽ đặt ở window.__pim22 ngay trước podWing ----
 const PK=new WeakMap();let RS=null;
 function podKey(im){if(!im)return null;let k=PK.get(im);if(k!==undefined)return k;k=null;try{const src=im.src||'';if(src&&window.EVO21_IMG){if(!RS){RS=new Map();for(const [kk,v] of Object.entries(EVO21_IMG))if(/^(wg_|sw_)/.test(kk))RS.set(v,kk);}k=RS.get(src)||null;}}catch{}PK.set(im,k);return k;}
 function pod(g,x,y,w,sp,col,t){if(!ON())return false;const im=window.__pim22;window.__pim22=null;const k=podKey(im),A=k&&T().pod?T().pod[k]:null;
  let D=w;if(im){const iw=im.naturalWidth||im.width,ih=im.naturalHeight||im.height;D=w*Math.max(iw,ih)/Math.max(iw,ih);}
  const e=(k&&T().el&&T().el.pod&&T().el.pod[k])||el(col),a=sway()*.8;
  if(A)return unit(g,A,x,y,D,w*.95,'pod',e,sp,a,x*.03);
  return unit(g,[[0,.36,1]],x,y,w,w*.95,'pod',e,sp,a,x*.03);}
 // ---- dự phòng chung cho fx18 (thần hoá, tên lửa Kho…): cùng sprite, vị trí do nơi gọi ----
 function flame(g,x,y,ang,len,wid,col,t,seed){if(!ON())return false;return draw(g,x,y,len*1.25,Math.max(wid*1.25,len*.5),el(col),seed||0,false,ang,.88);}
 function engine(g,cx,cy,sw,sh,inf,col,t){if(!ON())return false;const id=window.__sid22;window.__sid22=null;if(Number.isInteger(id)&&stageShip(g,id,cx,cy,Math.max(sw,sh),false))return true;
  const yb=cy-sh/2+sh*(inf?inf.y:.92)-sh*.035,xs=inf?inf.xs:[-.05,.05],D=Math.max(sw,sh);
  return unit(g,xs.map(xf=>[xf*sw/D,(yb-cy)/D,1]),cx,cy,D,D*.42,'ship',el(col),false,0,cx*.01);}
 // ---- Chiến Thần (chiến cơ / robot): vẽ TRƯỚC SSSGame.draw ----
 const robOn=()=>{try{return !!(activeRobot&&activeRobot.super&&superTime>0);}catch{return false;}};
 // ---- đo họng xả trên ảnh (cổng JS của claude_tools/v22_plume_neo.py: mở hình thái bỏ gai mảnh → đường đáy đối xứng → 1–4 họng) ----
 function measure(src,sx,sy,sw,sh,maxn,frac,spread){const N=128,cv=document.createElement('canvas');cv.width=cv.height=N;const g=cv.getContext('2d');g.drawImage(src,sx,sy,sw,sh,0,0,N,N);const d=g.getImageData(0,0,N,N).data,A=new Uint8Array(N*N);
  let x0=N,x1=-1,y0=N,y1=-1;for(let y=0;y<N;y++)for(let x=0;x<N;x++)if(d[(y*N+x)*4+3]>110){A[y*N+x]=1;if(x<x0)x0=x;if(x>x1)x1=x;if(y<y0)y0=y;if(y>y1)y1=y;}
  if(x1<0)return [];const bw=x1-x0,bh=y1-y0,r=Math.max(2,Math.round(bw*frac)),I=new Int32Array((N+1)*(N+1)),box=(I,x,y)=>{const a=Math.max(0,x-(r>>1)),b=Math.max(0,y-(r>>1)),c=Math.min(N,a+r),e=Math.min(N,b+r);return I[e*(N+1)+c]-I[b*(N+1)+c]-I[e*(N+1)+a]+I[b*(N+1)+a];};
  const integ=(M,I)=>{for(let y=0;y<N;y++){let s=0;for(let x=0;x<N;x++){s+=M[y*N+x];I[(y+1)*(N+1)+x+1]=I[y*(N+1)+x+1]+s;}}};
  integ(A,I);const E=new Uint8Array(N*N);for(let y=0;y<N;y++)for(let x=0;x<N;x++)E[y*N+x]=box(I,x,y)>=r*r?1:0;const I2=new Int32Array((N+1)*(N+1));integ(E,I2);
  const O=new Uint8Array(N*N);for(let y=0;y<N;y++)for(let x=0;x<N;x++)O[y*N+x]=A[y*N+x]&&box(I2,x+(r>>1)-((r-1)>>1),y+(r>>1)-((r-1)>>1))>0?1:0;
  const cx=(x0+x1)/2,L=Math.max(0,Math.floor(cx-bw*spread)),R=Math.min(N-1,Math.ceil(cx+bw*spread)),b=new Float32Array(N).fill(-1);
  for(let x=L;x<=R;x++)for(let y=N-1;y>=0;y--)if(O[y*N+x]){b[x]=y;break;}
  const bs=new Float32Array(N).fill(-1);for(let x=0;x<N;x++){const m=Math.round(2*cx-x);if(m>=0&&m<N&&b[x]>=0&&b[m]>=0)bs[x]=Math.min(b[x],b[m]);}
  const w=Math.max(3,Math.round(bw*.02)),sm=new Float32Array(N).fill(-1);let top=-1;for(let x=0;x<N;x++){if(bs[x]<0)continue;let s=0,n=0;for(let k=-(w>>1);k<=(w>>1);k++){const v=bs[x+k];if(v>=0){s+=v;n++;}}sm[x]=s/n;if(bs[x]>top)top=bs[x];}
  if(top<0)return [[0,(y1-N/2)/N,1]];const thr=top-bh*.06,cand=[];for(let x=1;x<N-1;x++)if(sm[x]>=thr&&sm[x]>=sm[x-1]&&sm[x]>=sm[x+1])cand.push(x);
  const grp=[];for(const x of cand){const G=grp[grp.length-1];if(G&&x-G[G.length-1]<=Math.max(3,bw*.03))G.push(x);else grp.push([x]);}
  const pts=grp.map(G=>[G.reduce((a,b)=>a+b,0)/G.length,Math.max(...G.map(x=>sm[x]))]),ctr=pts.filter(p=>Math.abs(p[0]-cx)<bw*.04),side=pts.filter(p=>p[0]-cx>=bw*.04).sort((a,b)=>b[1]-a[1]);
  let out=[];if(ctr.length)out.push([cx,Math.max(...ctr.map(p=>p[1]))]);for(const p of side){if(out.length+2>maxn)break;if(out.some(q=>Math.abs(p[0]-q[0])<bw*.07))continue;out.push([p[0],p[1]],[2*cx-p[0],p[1]]);}if(!out.length)out=[[cx,top]];
  return out.map(([x,y])=>{const xi=Math.round(x);let lw=0,rw=0;while(xi-lw-1>=0&&sm[xi-lw-1]>=y-bh*.03)lw++;while(xi+rw+1<N&&sm[xi+rw+1]>=y-bh*.03)rw++;return [(x-N/2)/N,(y+.5-N/2)/N,Math.min(1.6,Math.max(.5,Math.max(lw+rw+1,bw*.05)/(bw*.16)))];}).sort((a,b)=>a[0]-b[0]);}
 const MC=new WeakMap();
 function cellAnchors(im,col,row){let M=MC.get(im);if(!M){M=new Map();MC.set(im,M);}const k=col+'|'+row,now=performance.now();let c=M.get(k);if(c&&(!im.__h309||now-c.t<4000))return c.v;/* atlas hop309 vẽ lại theo mốc → đo lại sau 4 s */let v;const cw=im.width/7,ch=im.height/2;
  try{v=measure(im,col*cw,row*ch,cw,ch,4,row?.05:.05,row?.38:.30);}catch(e){v=[[0,.4,1]];}M.set(k,{v,t:now});const TA=window.THRUSTER_ANCHORS;if(TA){(TA.rt||(TA.rt={}))[(row?'r':'f')+col]=v;}return v;}
 // Chiến Thần: đọc lệnh vẽ atlas của khung trước (hàng chiến cơ / robot, tâm, cỡ ô thật — gồm cả nhịp thở / chuyển dạng) → không đoán theo trạng thái
 const REC={ok:false,row:'f',x:0,y:0,D:0,t:0};
 function recWrap(g){const od=g.drawImage;let best=0;const R={ok:false};
  g.drawImage=function(im,...a){try{if(a.length===8&&im&&(im.width||0)>=2000&&(im.height||0)>=600){const [sx,sy,sw,sh,dx,dy,dw,dh]=a,cw=im.width/7,ch=im.height/2,cx0=Math.floor(sx/cw)*cw,mid=sx<=cx0+cw/2&&sx+sw>=cx0+cw/2,area=Math.abs(dw*dh)+(mid?1e9:0);/* ưu tiên mảnh giữa (thân) — 2 mảnh cánh có xoay vỗ */if(area>=best){best=area;k=dw/sw,lx=dx+(cx0+cw/2-sx)*k,ly=dy+(Math.floor(sy/ch)*ch+ch/2-sy)*(dh/sh),m=g.getTransform();
    R.ok=true;R.im=im;R.col=Math.floor(sx/cw);R.row=sy>=ch-1?'r':'f';R.x=m.e+m.a*lx+m.c*ly;R.y=m.f+m.b*lx+m.d*ly;R.D=cw*k*Math.hypot(m.a,m.b);R.alpha=g.globalAlpha;}}}catch{}return od.apply(this,arguments);};
  return ()=>{g.drawImage=od;return R;};}
 function ct(i){if(!ON()||!REC.ok||performance.now()-REC.t>250)return;const list=cellAnchors(REC.im,REC.col,REC.row==='r'?1:0);if(!list||!list.length)return;const rob=REC.row==='r',e=(T().el&&T().el.ct&&T().el.ct[i])||'void';let sp=false;try{sp=superTime>0;}catch{}
  const pa=ctx.globalAlpha;ctx.globalAlpha=pa*Math.min(1,Math.max(.25,REC.alpha==null?1:REC.alpha));
  unit(ctx,list,REC.x,REC.y,REC.D,118*.42,rob?'rob':'ct',e,sp,sway(),i*1.3);ctx.globalAlpha=pa;}
 function hookCT(){try{if(typeof SSSGame==='undefined'||!SSSGame.draw)return false;if(SSSGame.draw.__p22)return true;if(!SSSGame.draw.__led&&window.EVO21!==false&&window.EvoLED&&performance.now()<9000)return false;const od=SSSGame.draw;
  const f=function(r){let i=-1;try{if(ON()&&typeof player!=='undefined'){try{i=SSSGame.indexFor(r);}catch{}if(i>=0)ct(i);}}catch{}
   if(i<0||!ON())return od.apply(this,arguments);const stop=recWrap(ctx);let res;try{res=od.apply(this,arguments);}finally{const R=stop();if(R.ok){Object.assign(REC,R);REC.t=performance.now();}}return res;};
  for(const k of Object.keys(od))try{f[k]=od[k];}catch{}f.__p22=1;SSSGame.draw=f;return true;}catch{return false;}}
 const iv=setInterval(()=>{if(hookCT())clearInterval(iv);},300);
 window.Plume22={on:ON,el,draw,unit,ship,stageShip,pod,flame,engine,ct,sway,img,REC};
})();
