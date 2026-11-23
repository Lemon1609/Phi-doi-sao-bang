'use strict';
// V309 · Lượt 17 mục 4 · CHUỐT 4 CHI TIẾT CANVAS (dùng chung cho mọi tàu / tên lửa / tàu con). Tắt: window.FX18=false (các mô-đun quay về kiểu vẽ cũ).
//  • flame(): luồng đẩy thuôn nhọn, gradient 3 nấc (lõi trắng → màu hệ → trong suốt), vẽ 'lighter'. Sprite dựng sẵn theo màu, mỗi khung chỉ drawImage.
//  • disk(): đĩa hologram cyan–Royal Blue dưới gầm tàu ở màn Kho: quầng tâm + vành sáng + vòng nét đứt xoay chậm.
//  • wingImg(): cánh plasma mềm cho tàu con — sợi nhọn thanh, mờ tan ở chóp, bảng màu theo màu chủ đạo chiến cơ đang mặc.
//  • pal(): bảng 2 màu [sáng, chủ đạo] suy từ 1 màu tàu (giữ sắc độ, tăng sáng phần lõi).
//  Không ctx.filter, không shadowBlur, không tạo gradient mới trong vòng lặp trận (chỉ khi dựng sprite lần đầu).
const FX18=(()=>{
 const on=()=>window.FX18!==false;
 const hex=c=>{const m=/^#?([0-9a-f]{6})$/i.exec(String(c||'').trim());if(m){const n=parseInt(m[1],16);return [n>>16&255,n>>8&255,n&255];}const r=/rgba?\((\d+)[,\s]+(\d+)[,\s]+(\d+)/.exec(String(c||''));return r?[+r[1],+r[2],+r[3]]:[125,211,252];};
 const rgba=(a,al)=>`rgba(${a[0]|0},${a[1]|0},${a[2]|0},${al})`;
 const mix=(a,b,f)=>[a[0]+(b[0]-a[0])*f,a[1]+(b[1]-a[1])*f,a[2]+(b[2]-a[2])*f];
 // tăng bão hòa nhẹ để màu tối/xỉn (nâu) không ra "bệt"
 function vivid(c){let [r,g,b]=c;const mx=Math.max(r,g,b),mn=Math.min(r,g,b);if(mx<1)return [255,180,80];const k=255/mx;r*=k;g*=k;b*=k;const avg=(r+g+b)/3;const s=1.25;return [r,g,b].map(v=>Math.max(0,Math.min(255,avg+(v-avg)*s)));}
 function pal(col){const c=vivid(hex(col));return ['#'+mix(c,[255,255,255],.55).map(v=>(v|0).toString(16).padStart(2,'0')).join(''),'#'+c.map(v=>(v|0).toString(16).padStart(2,'0')).join('')];}
 // ---------- luồng đẩy ----------
 const FL=new Map();
 function flameImg(col,hot){hot=!!hot&&window.FX17B!==false;const k=String(col)+(hot?'|h':'');let cv=FL.get(k);if(cv)return cv;const c=vivid(hex(col)),W=32,H=128;cv=document.createElement('canvas');cv.width=W;cv.height=H;const g=cv.getContext('2d');
  // lớp ngoài: màu hệ → trong suốt, thân giọt nước thuôn nhọn (miệng ống ở trên)
  const shape=(w,len)=>{g.beginPath();g.moveTo(W/2-w,2);g.bezierCurveTo(W/2-w,len*.35,W/2-w*.35,len*.75,W/2,len);g.bezierCurveTo(W/2+w*.35,len*.75,W/2+w,len*.35,W/2+w,2);g.quadraticCurveTo(W/2,-2,W/2-w,2);g.closePath();};
  let gr=g.createLinearGradient(0,0,0,H);gr.addColorStop(0,rgba(mix(c,[255,255,255],.35),.95));gr.addColorStop(.3,rgba(c,.8));gr.addColorStop(1,rgba(c,0));g.fillStyle=gr;shape(W*.42,H-2);g.fill();
  // lớp giữa: vàng/cam sáng hơn
  gr=g.createLinearGradient(0,0,0,H*.7);gr.addColorStop(0,'rgba(255,255,255,.95)');gr.addColorStop(.35,rgba(mix(c,[255,236,170],.5),.85));gr.addColorStop(1,rgba(c,0));g.fillStyle=gr;shape(W*.26,H*.7);g.fill();
  // lõi trắng sáng ngắn
  gr=g.createLinearGradient(0,0,0,H*.34);gr.addColorStop(0,'rgba(255,255,255,1)');gr.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=gr;shape(W*.13,H*.34);g.fill();
  if(hot){/* V309 L17B: lõi trắng nóng dài hơn + quầng vàng cam sáng ở giữa → đuôi rực, hết xỉn */
   gr=g.createLinearGradient(0,0,0,H*.62);gr.addColorStop(0,'rgba(255,255,255,1)');gr.addColorStop(.45,'rgba(255,246,214,.9)');gr.addColorStop(1,'rgba(255,214,120,0)');g.fillStyle=gr;shape(W*.2,H*.62);g.fill();
   gr=g.createLinearGradient(0,0,0,H*.45);gr.addColorStop(0,'rgba(255,255,255,1)');gr.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=gr;shape(W*.1,H*.45);g.fill();}
  FL.set(k,cv);if(FL.size>64)FL.delete(FL.keys().next().value);return cv;}
 // vẽ trong hệ tọa độ hiện tại: (x,y) = tâm miệng ống, ang = hướng phụt (rad, 0 = xuống dưới), len/wid = px
 /* V2.2: luồng ion-plasma thuôn — kim lõi trắng-vàng/cyan mảnh ở miệng ống + đuôi lông vũ trong mờ dần về 0 (tính từng điểm ảnh 1 lần/màu, không gradient mỗi khung, không shadowBlur) */
 const PL=new Map();
 function plumeImg(col){const k=String(col);let cv=PL.get(k);if(cv)return cv;const c=vivid(hex(col)),W=40,H=160;cv=document.createElement('canvas');cv.width=W;cv.height=H;const g=cv.getContext('2d'),id=g.createImageData(W,H),d=id.data,cw=mix(c,[255,244,214],.55);
  for(let y=0;y<H;y++){const v=y/H,wo=W*.30*Math.pow(1-v,.75)*(v<.06?.72+.28*v/.06:1)+.6,wc=W*.075*Math.max(0,1-v/.52)+.35,fo=Math.pow(1-v,1.7),fc=Math.max(0,1-v/.55);
   for(let x=0;x<W;x++){const dx=Math.abs(x+.5-W/2),ao=Math.exp(-(dx/wo)*(dx/wo)*2.3)*fo*.82,ac=Math.exp(-(dx/wc)*(dx/wc)*2.6)*fc;
    const a=Math.min(1,ao+ac);if(a<.004)continue;const t=ac/(ao+ac+1e-6),i=(y*W+x)*4,mid=v<.25?cw:c;
    d[i]=mid[0]+(255-mid[0])*t;d[i+1]=mid[1]+(255-mid[1])*t;d[i+2]=mid[2]+(255-mid[2])*t;d[i+3]=a*255;}}
  g.putImageData(id,0,0);PL.set(k,cv);if(PL.size>48)PL.delete(PL.keys().next().value);return cv;}
 function flame(g,x,y,ang,len,wid,col,t,seed,hot){const p22=(window.V22!==false&&window.PLUME22!==false),im=p22?plumeImg(col):flameImg(col,hot),T0=(t||performance.now()/1000),fl=p22?len*1.12*(1+.06*Math.sin(T0*41+(seed||0))+.02*Math.sin(T0*73+(seed||0)*3)):len*(1+.12*Math.sin(T0*38+(seed||0))+.05*Math.sin((t||0)*71+(seed||0)*3));if(p22)wid*=1.15;
  const pc=g.globalCompositeOperation,pa=g.globalAlpha;g.save();g.translate(x,y);if(ang)g.rotate(ang);g.globalCompositeOperation='lighter';g.drawImage(im,-wid/2,0,wid,fl);g.restore();g.globalCompositeOperation=pc;g.globalAlpha=pa;}
 // ---------- đĩa hologram ----------
 const DK=new Map();
 function diskImg(){let cv=DK.get('d');if(cv)return cv;const S=256;cv=document.createElement('canvas');cv.width=S;cv.height=S;const g=cv.getContext('2d');
  let gr=g.createRadialGradient(S/2,S/2,0,S/2,S/2,S/2);gr.addColorStop(0,'rgba(140,240,255,.55)');gr.addColorStop(.28,'rgba(60,170,255,.28)');gr.addColorStop(.62,'rgba(31,87,200,.14)');gr.addColorStop(.86,'rgba(31,87,200,.05)');gr.addColorStop(1,'rgba(31,87,200,0)');
  g.fillStyle=gr;g.fillRect(0,0,S,S);
  // vành sáng mảnh ở 78 % bán kính + vạch chia
  g.strokeStyle='rgba(125,225,255,.75)';g.lineWidth=2.2;g.beginPath();g.arc(S/2,S/2,S*.39,0,6.283);g.stroke();
  g.strokeStyle='rgba(90,170,255,.45)';g.lineWidth=1.2;g.beginPath();g.arc(S/2,S/2,S*.25,0,6.283);g.stroke();
  g.strokeStyle='rgba(160,235,255,.55)';g.lineWidth=2;for(let i=0;i<24;i++){const a=i/24*6.283;g.beginPath();g.moveTo(S/2+Math.cos(a)*S*.41,S/2+Math.sin(a)*S*.41);g.lineTo(S/2+Math.cos(a)*S*(i%6?.43:.46),S/2+Math.sin(a)*S*(i%6?.43:.46));g.stroke();}
  DK.set('d',cv);return cv;}
 function disk(g,cx,cy,rx,ry,t){const im=diskImg();g.save();g.globalCompositeOperation='lighter';g.drawImage(im,cx-rx,cy-ry,rx*2,ry*2);
  // vòng nét đứt xoay chậm (ngoài) + vòng nét đứt ngược chiều (trong)
  g.lineCap='round';g.setLineDash([rx*.16,rx*.1]);g.lineDashOffset=-(t||0)*rx*.18;g.strokeStyle='rgba(120,230,255,.7)';g.lineWidth=1.6;g.beginPath();g.ellipse(cx,cy,rx*.96,ry*.96,0,0,6.283);g.stroke();
  g.setLineDash([rx*.05,rx*.07]);g.lineDashOffset=(t||0)*rx*.12;g.strokeStyle='rgba(80,160,255,.55)';g.lineWidth=1.2;g.beginPath();g.ellipse(cx,cy,rx*.62,ry*.62,0,0,6.283);g.stroke();
  g.setLineDash([]);
  // quầng tâm thở nhẹ
  const k=.85+.15*Math.sin((t||0)*2.2);g.globalAlpha=.35*k;g.drawImage(im,cx-rx*.45,cy-ry*.45,rx*.9,ry*.9);g.restore();}
 // ---------- cánh plasma tàu con ----------
 const WG=new Map();
 function wingImg(c0,c1){const k=c0+'|'+c1;let cv=WG.get(k);if(cv)return cv;cv=document.createElement('canvas');cv.width=128;cv.height=128;const g=cv.getContext('2d');const A=hex(c0),B=vivid(hex(c1));
  g.globalCompositeOperation='lighter';
  // 4 sợi plasma: gốc (10,104) → chóp; mỗi sợi vẽ 3 lượt rộng→hẹp, alpha thấp→cao (mềm viền, không blur)
  const blades=[[-1.18,92,7.5],[-.86,104,6.5],[-.55,96,5.5],[-.26,78,4.2]];
  for(const [a0,L,w] of blades){g.save();g.translate(10,104);g.rotate(a0);
   for(const [mw,al] of [[2.2,.16],[1.35,.32],[.7,.75]]){const ww=w*mw,gr=g.createLinearGradient(0,0,L,0);gr.addColorStop(0,rgba(mix(A,[255,255,255],.6),al));gr.addColorStop(.25,rgba(A,al));gr.addColorStop(.62,rgba(B,al*.9));gr.addColorStop(1,rgba(B,0));
    g.fillStyle=gr;g.beginPath();g.moveTo(0,-ww*.5);g.bezierCurveTo(L*.3,-ww*1.15,L*.7,-ww*.55-L*.05,L,-L*.1);g.bezierCurveTo(L*.7,ww*.15-L*.03,L*.3,ww*.75,0,ww*.5);g.closePath();g.fill();}
   // gân sáng giữa sợi
   const gl=g.createLinearGradient(0,0,L*.85,0);gl.addColorStop(0,'rgba(255,255,255,.85)');gl.addColorStop(1,'rgba(255,255,255,0)');g.strokeStyle=gl;g.lineWidth=.9;g.beginPath();g.moveTo(2,0);g.bezierCurveTo(L*.35,-w*.45,L*.68,-w*.3-L*.05,L*.9,-L*.09);g.stroke();g.restore();}
  WG.set(k,cv);if(WG.size>24)WG.delete(WG.keys().next().value);return cv;}
 // màu chủ đạo chiến cơ / Chiến Thần đang mặc (trận: tàu đang bay; Kho: tàu đang xem)
 function shipCol(i){try{if(typeof activeRobot!=='undefined'&&activeRobot&&activeRobot.color)return activeRobot.color;}catch{}try{const id=i!=null?i:(typeof selected!=='undefined'?selected:0);return Fighters28.profiles[id].color||'#7dd3fc';}catch{return '#7dd3fc';}}
 function podCols(i){const p=pal(tone(i));return [p[0],p[1]];}
 // ---------- V309 L17B: đọc ảnh tàu 1 lần → màu chủ đạo (theo thân tàu thật, không theo bảng hồ sơ) + vị trí họng xả ----------
 const INF=new Map();
 function shipInfo(im){if(!im)return null;const key=im.currentSrc||im.src||im;let r=INF.get(key);if(r)return r;const w0=im.naturalWidth||im.width,h0=im.naturalHeight||im.height;if(!w0||!h0)return null;
  try{const N=64,M=Math.max(1,Math.round(N*h0/w0)),cv=document.createElement('canvas');cv.width=N;cv.height=M;const g=cv.getContext('2d');g.drawImage(im,0,0,N,M);const d=g.getImageData(0,0,N,M).data;
   // màu: biểu đồ sắc độ 24 ô, trọng số bão hòa × sáng (bỏ trắng/xám/đen)
   const H=new Float64Array(24),R=new Float64Array(24),G=new Float64Array(24),B=new Float64Array(24);
   for(let i=0;i<d.length;i+=4){if(d[i+3]<160)continue;const r0=d[i]/255,g0=d[i+1]/255,b0=d[i+2]/255,mx=Math.max(r0,g0,b0),mn=Math.min(r0,g0,b0),dl=mx-mn;if(mx<.3||dl<.22)continue;
    let h=mx===r0?((g0-b0)/dl)%6:mx===g0?(b0-r0)/dl+2:(r0-g0)/dl+4;h=(h*60+360)%360;const k=Math.floor(h/15)%24,wt=(dl/mx)*mx*(dl);H[k]+=wt;R[k]+=d[i]*wt;G[k]+=d[i+1]*wt;B[k]+=d[i+2]*wt;}
   let best=-1,bv=0;for(let k=0;k<24;k++){const v=H[k]+.5*(H[(k+23)%24]+H[(k+1)%24]);if(v>bv){bv=v;best=k;}}
   let col=null;if(best>=0&&bv>0){let ws=0,rr=0,gg=0,bb=0;for(const k of [(best+23)%24,best,(best+1)%24]){ws+=H[k];rr+=R[k];gg+=G[k];bb+=B[k];}col='#'+vivid([rr/ws,gg/ws,bb/ws]).map(v=>(v|0).toString(16).padStart(2,'0')).join('');}
   // họng xả: đáy phần đặc (alpha>90) trong dải thân giữa 30–70 % bề ngang (tránh chóp cánh / xúc tu); gom cột gần đáy thành 1–2 họng
   const bot=new Int16Array(N).fill(-1);for(let x=0;x<N;x++){for(let y=M-1;y>=0;y--){if(d[(y*N+x)*4+3]>90){bot[x]=y;break;}}}
   let yb=-1;for(let x=Math.floor(N*.3);x<Math.ceil(N*.7);x++)yb=Math.max(yb,bot[x]);
   const near=[];for(let x=Math.floor(N*.3);x<Math.ceil(N*.7);x++)if(bot[x]>=yb-M*.05)near.push(x);
   const L=near.filter(x=>x<N/2),Rr=near.filter(x=>x>=N/2),avg=a=>a.reduce((s,v)=>s+v,0)/a.length/N-.5;
   let xs;if(L.length&&Rr.length&&(Math.min(...Rr)-Math.max(...L))>N*.06)xs=[avg(L),avg(Rr)];else xs=near.length?[avg(near)]:[0];
   if(xs.length===1&&Math.abs(xs[0])<.03)xs=[-.045,.045];
   r={col,y:yb>=0?(yb+1)/M:.92,xs,ar:w0/h0};}catch{r={col:null,y:.92,xs:[-.05,.05],ar:w0/h0};}
  INF.set(key,r);if(INF.size>64)INF.delete(INF.keys().next().value);return r;}
 const IMC=new Map();const imgOf=src=>{if(!src)return null;let im=IMC.get(src);if(!im){im=new Image();im.src=src;IMC.set(src,im);if(IMC.size>40)IMC.delete(IMC.keys().next().value);}return im;};
 // ảnh tàu đang bay: Chiến Thần (dạng hợp thể) nếu có, không thì chiến cơ theo khung
 const FORM=['thuong','luc','lam','lam','lam','lam','tim','tim','tim','tim','tim','tim5'];
 function battleIm(i){try{const id=i!=null?i:(typeof selected!=='undefined'?selected:0);if((window.KHO_SSS87===true||(window.TH17!==false&&window.KHO_SSS87!==false))&&window.SSS87&&SSS87.hull){const h=SSS87.hull(id);if(h&&(h.naturalWidth||h.width))return h;}const S=SHIP118[String(id)];const n=V70.craftN(id)|0;return imgOf(S[FORM[n]]||S.tim||S.thuong);}catch{return null;}}
 function tone(i){if(window.FX17B===false)return shipCol(i);const im=battleIm(i);const inf=im&&im.complete!==false?shipInfo(im):null;return (inf&&inf.col)||shipCol(i);}
 // lửa động cơ gắn khít họng xả: (cx,cy) tâm ảnh tàu, sw×sh cỡ vẽ
 function engine(g,cx,cy,sw,sh,inf,col,t){const yb=cy-sh/2+sh*(inf?inf.y:.92)-sh*.035,L=sh*.3,Wd=Math.max(6,sw*.085);for(const [k,xf] of (inf?inf.xs:[-.05,.05]).entries()){const x=cx+xf*sw;
   flame(g,x,yb,0,L,Wd,col,t,k*2.3,true);}}
 // tàu con: bỏ chùm gai → chỉ tia đẩy mini phụt xuống từ đuôi
 function podFx(g,x,y,w,sp,col,t){/* chủ dự án 23/11: bỏ vòng hào quang quanh tàu con, chỉ giữ tia đẩy mini dưới đuôi */
  flame(g,x,y+w*.36,0,w*(sp?1.05:.8),Math.max(5,w*.3),col,t||performance.now()/1000,x*.02,true);}
 return {on,flame,flameImg,plumeImg,disk,wingImg,pal,podCols,shipCol,hex,shipInfo,battleIm,tone,engine,podFx,imgOf};
})();window.FX18API=FX18;
