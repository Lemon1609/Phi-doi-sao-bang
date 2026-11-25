'use strict';
// V212 · PHÒNG TRƯNG BÀY HOLOGRAM (bản thử định hướng mỹ thuật mới, chủ dự án chọn "đổi toàn bộ phong cách")
//  Thay nền xưởng kim loại ở sân khấu sảnh bằng nền bản vẽ navy: lưới kỹ thuật, số liệu mờ, hình nét phát sáng của chiến cơ, bệ tròn nét đứt.
//  3 nấc trưng bày: Thường (lam) · Siêu cấp (tím – hồng, tia cánh năng lượng) · Tối thượng (vàng kim). Chỉ ngoài trận.
//  Nút chuyển HOLOGRAM ⇄ XƯỞNG để so sánh. Lưu lựa chọn trong localStorage 'saobang-holo212'. Tắt hẳn: window.HOLO212=false
const HOLO212=(()=>{
 let LP=null;
 const KEY='saobang-holo212';let S={on:true,tier:1};try{Object.assign(S,JSON.parse(localStorage.getItem(KEY)||'{}'));}catch{}
 const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S));}catch{}};
 const on=()=>window.HOLO212!==false&&S.on;
 const TIER={1:{name:'THƯỜNG'},2:{name:'SIÊU CẤP'},3:{name:'TỐI THƯỢNG'}};
 // V212C (chủ dự án): tiến hóa KHÔNG tô vàng — màu mỗi nấc lấy theo đặc trưng (màu riêng) của chính chiến cơ / SSS
 const hx=(c)=>{c=String(c||'#3FA9FF').trim();if(/^#[0-9a-f]{3}$/i.test(c))c='#'+c[1]+c[1]+c[2]+c[2]+c[3]+c[3];return /^#[0-9a-f]{6}$/i.test(c)?c:'#3FA9FF';};
 const mix=(a,b,t)=>{a=hx(a);b=hx(b);const p=k=>Math.round(parseInt(a.slice(k,k+2),16)*(1-t)+parseInt(b.slice(k,k+2),16)*t).toString(16).padStart(2,'0');return '#'+p(1)+p(3)+p(5);};
 const NEW213={0:'#FF9A3D',1:'#3DE0A0',2:'#67D7FF',3:'#9BE83A',4:'#7FD6FF',5:'#B9A6FF',6:'#9C7BFF',7:'#FF8A2A',8:'#5CC8FF',9:'#5BE35B'}; // V213: màu theo tranh mới của tàu 1, 2, 3, 7 · V216: tàu 8 cam thép, 9 lam biển, 10 lục quân
 function shipCol(P){try{if(P&&P.t==='s')return hx(SSS_MODELS[P.i].color);if(NEW213[P.i])return NEW213[P.i];return hx(Fighters28.profiles[P.i].color);}catch{return '#3FA9FF';}}
 function tierCol(P,t){const c=shipCol(P);return t===1?{a:mix(c,'#3FA9FF',.55),b:mix(c,'#ffffff',.35)}:t===2?{a:c,b:mix(c,'#ffffff',.45)}:{a:mix(c,'#ffffff',.25),b:'#ffffff'};}
 // ---- V212C: tranh mẫu GPT (HOLO212_ART) cho một số tàu; tự nạp
 const ART={};try{if(typeof HOLO212_ART!=='undefined')for(const k in HOLO212_ART){const im=new Image();im.src=HOLO212_ART[k];ART[k]=im;}}catch{}
 const artOk=k=>{const im=ART[k];return im&&im.complete&&im.naturalWidth>0?im:null;};
 const shipIdx=P=>P&&P.t==='c'?(P.i|0):-1;
 function artFor(P){const i=shipIdx(P);if(i<0)return null;const t=S.tier||1;if(S.mecha&&t>=2){const m=artOk('m'+i+'_'+t);if(m)return {im:m,mecha:1};}const a=artOk(i+'_'+t);return a?{im:a}:null;}
 const hasMecha=P=>{const i=shipIdx(P);return i>=0&&!!ART['m'+i+'_2'];};
 // ---- hình nét phát sáng từ tranh chiến cơ (dò mép theo kênh alpha)
 const WF={};
 function cell(i){try{const im=(typeof Evo53!=='undefined'&&Evo53.hull)?Evo53.hull(i):fighterAtlasV22;if(!im||!(im.naturalWidth||im.width))return null;const w=(im.naturalWidth||im.width)/5,h=(im.naturalHeight||im.height)/4;return {im,sx:i%5*w,sy:Math.floor(i/5)*h,w,h};}catch{return null;}}
 function wire(i,col){const nA=artOk(i+'_1');const k=i+'|'+col+(nA?'|n':'');if(WF[k])return WF[k];const c=nA?{im:nA,sx:0,sy:0,w:nA.naturalWidth,h:nA.naturalHeight}:cell(i);if(!c)return null;const N=220;const a=document.createElement('canvas');a.width=a.height=N;const x=a.getContext('2d');x.drawImage(c.im,c.sx,c.sy,c.w,c.h,0,0,N,N);
  let d;try{d=x.getImageData(0,0,N,N);}catch{return null;}const A=d.data,o=x.createImageData(N,N),O=o.data;const r=parseInt(col.slice(1,3),16),g=parseInt(col.slice(3,5),16),b=parseInt(col.slice(5,7),16);
  const al=(X,Y)=>A[(Y*N+X)*4+3];
  for(let Y=1;Y<N-1;Y++)for(let X=1;X<N-1;X++){const c0=al(X,Y);const gx=al(X+1,Y)-al(X-1,Y),gy=al(X,Y+1)-al(X,Y-1);
   // mép ngoài + đường gân bên trong (độ sáng đổi mạnh)
   const l=(p)=>A[p]*.3+A[p+1]*.59+A[p+2]*.11,p=(Y*N+X)*4;const li=c0>80?Math.abs(l(p+4)-l(p-4))+Math.abs(l(p+N*4)-l(p-N*4)):0;
   const e=Math.min(255,Math.hypot(gx,gy)*1.4+(li>70?110:0));if(e>60){O[p]=r;O[p+1]=g;O[p+2]=b;O[p+3]=e;}}
  x.clearRect(0,0,N,N);x.putImageData(o,0,0);return WF[k]=a;}
 // ---- V2.2.2 HOLO22: hologram bản vẽ ĐÚNG chiến cơ đang chọn (ảnh SHIPCUR17 theo bậc hiện tại) — thay hình nét cũ lấy từ atlas cũ / tranh HOLO212_ART
 //  Dựng 1 lần cho mỗi (tàu, ảnh bậc): Sobel kênh alpha (viền) + gân sáng bên trong + lòng mờ + vạch quét ngang + vòng ngắm. Mỗi khung chỉ 1 drawImage 'lighter'.
 //  Màu theo hệ (sắc độ màu chủ đạo SHIP309COL): đỏ thẫm #FF4D4D · vàng hổ phách #FFB84D · lam điện #38E4FF · tím #B86BFF. Tắt: window.HOLO22=false
 const H22={},HIM={};
 function hcol(i){let c='#38E4FF';try{const v=(window.SHIP309COL||{})[i];if(!v)return c;const r=parseInt(v.slice(1,3),16)/255,g=parseInt(v.slice(3,5),16)/255,b=parseInt(v.slice(5,7),16)/255,mx=Math.max(r,g,b),mn=Math.min(r,g,b),d=mx-mn;if(d<.08)return c;
   let h=mx===r?((g-b)/d)%6:mx===g?(b-r)/d+2:(r-g)/d+4;h=(h*60+360)%360;return h>=345||h<15?'#FF4D4D':h<65?'#FFB84D':h<250?'#38E4FF':'#B86BFF';}catch{return c;}}
 function holo22(i){const url=typeof window.SHIPCUR17==='function'?SHIPCUR17(i):'';if(!url)return null;const key=i+'|'+url.length+'|'+url.slice(-32);if(H22[key])return H22[key];
  let im=HIM[url];if(!im){im=HIM[url]=new Image();im.src=url;}if(!im.complete||!im.naturalWidth)return null;
  const col=hcol(i),R=parseInt(col.slice(1,3),16),G=parseInt(col.slice(3,5),16),B=parseInt(col.slice(5,7),16);
  const N=256,sc=N/Math.max(im.naturalWidth,im.naturalHeight),w0=Math.round(im.naturalWidth*sc),h0=Math.round(im.naturalHeight*sc);
  const a=document.createElement('canvas');a.width=w0;a.height=h0;const x=a.getContext('2d');x.drawImage(im,0,0,w0,h0);let d;try{d=x.getImageData(0,0,w0,h0);}catch{return null;}
  const A=d.data;let bx0=w0,by0=h0,bx1=0,by1=0;for(let Y=0;Y<h0;Y++)for(let X=0;X<w0;X++)if(A[(Y*w0+X)*4+3]>90){if(X<bx0)bx0=X;if(X>bx1)bx1=X;if(Y<by0)by0=Y;if(Y>by1)by1=Y;}
  if(bx1<=bx0)return null;const bw=bx1-bx0+1,bh=by1-by0+1;
  const o=x.createImageData(w0,h0),O=o.data;const al=(X,Y)=>A[(Y*w0+X)*4+3],lu=(X,Y)=>{const q=(Y*w0+X)*4;return A[q]*.3+A[q+1]*.59+A[q+2]*.11;};
  for(let Y=1;Y<h0-1;Y++)for(let X=1;X<w0-1;X++){const q=(Y*w0+X)*4,c0=al(X,Y);
   const gx=(al(X+1,Y-1)+2*al(X+1,Y)+al(X+1,Y+1))-(al(X-1,Y-1)+2*al(X-1,Y)+al(X-1,Y+1)),gy=(al(X-1,Y+1)+2*al(X,Y+1)+al(X+1,Y+1))-(al(X-1,Y-1)+2*al(X,Y-1)+al(X+1,Y-1));
   let e=Math.min(255,Math.hypot(gx,gy)*.55);
   if(c0>110){const li=Math.abs(lu(X+1,Y)-lu(X-1,Y))+Math.abs(lu(X,Y+1)-lu(X,Y-1));if(li>58)e=Math.max(e,Math.min(200,li*1.4));e=Math.max(e,26);}
   if(Y%3===0)e*=.5;if(e<14)continue;O[q]=R;O[q+1]=G;O[q+2]=B;O[q+3]=e;}
  x.clearRect(0,0,w0,h0);x.putImageData(o,0,0);
  // khung đệm + vòng ngắm kỹ thuật phía sau
  const S=Math.ceil(Math.max(bw,bh)*1.22),c=document.createElement('canvas');c.width=c.height=S;const y=c.getContext('2d'),m=S/2;
  y.strokeStyle=col;y.lineWidth=1.4;y.globalAlpha=.34;y.beginPath();y.arc(m,m,S*.46,0,Math.PI*2);y.stroke();y.globalAlpha=.22;y.setLineDash([3,5]);y.beginPath();y.arc(m,m,S*.40,0,Math.PI*2);y.stroke();y.setLineDash([]);
  y.globalAlpha=.42;for(let j=0;j<48;j++){const t=j/48*Math.PI*2,l=j%4?S*.018:S*.045;y.beginPath();y.moveTo(m+Math.cos(t)*S*.46,m+Math.sin(t)*S*.46);y.lineTo(m+Math.cos(t)*(S*.46-l),m+Math.sin(t)*(S*.46-l));y.stroke();}
  y.globalAlpha=.30;y.lineWidth=2;for(const t0 of [-.6,Math.PI-.6]){y.beginPath();y.arc(m,m,S*.43,t0,t0+1.2);y.stroke();}
  y.globalAlpha=1;y.drawImage(a,bx0,by0,bw,bh,m-bw/2,m-bh/2,bw,bh);
  return H22[key]={c,bw,bh,S};}
 function draw22(g,SW,SH,py,k,clock,i){const h=holo22(i);if(!h)return false;
  let ow=0;try{ow=2*(window.__half22||0)*(window.__sz221||1);}catch{}if(!(ow>20&&ow<400))ow=86;
  const sw=ow*k*(window.HOLO22K||1.55),f=sw/h.bw,D=h.S*f,cy=(py-40*k)-h.bh*f*.16+Math.sin(clock*1.1)*3*k;
  g.save();g.globalCompositeOperation='lighter';g.globalAlpha=.49+.07*Math.sin(clock*1.6);g.drawImage(h.c,SW/2-D/2,cy-D/2,D,D);g.restore();return true;}
 // ---- vẽ nền (gọi từ sân khấu sảnh thay cho ảnh xưởng). Trả true nếu đã vẽ.
 function draw(g,SW,SH,py,k,clock,P){if(!on())return false;const T=tierCol(P,S.tier||1);LP=P;
  const sk=window.SANH307!==false&&!!document.querySelector('.sk307'); // V307: có nền sảnh vẽ bằng mã (xưởng + hố đen) thì để trong suốt cho nền đó lộ ra
  if(sk)g.clearRect(0,0,SW,SH);else{const bgG=g.createLinearGradient(0,0,0,SH);bgG.addColorStop(0,'#0B2A66');bgG.addColorStop(.55,'#071d4a');bgG.addColorStop(1,'#04122f');g.fillStyle=bgG;g.fillRect(0,0,SW,SH);}
  // lưới kỹ thuật
  g.save();g.strokeStyle=sk?'rgba(60,120,230,.10)':'rgba(60,120,230,.22)';g.lineWidth=1;const step=Math.max(18,SW/16);g.beginPath();for(let x=(SW/2)%step;x<SW;x+=step){g.moveTo(x+.5,0);g.lineTo(x+.5,SH);}for(let y=(py)%step;y<SH;y+=step){g.moveTo(0,y+.5);g.lineTo(SW,y+.5);}g.stroke();
  g.strokeStyle='rgba(90,160,255,.10)';g.beginPath();for(let x=(SW/2)%(step/4);x<SW;x+=step/4){g.moveTo(x+.5,0);g.lineTo(x+.5,SH);}g.stroke();
  // số liệu mờ + đồ thị cột góc phải
  g.fillStyle='rgba(120,170,255,.22)';g.font='9px monospace';const L=['SYS.HULL  '+(P&&P.t==='s'?'SSS':'MK-'+((P&&P.i|0)+1)),'CORE.OUT  '+(92+Math.round(Math.sin(clock)*3))+'%','SHIELD    ONLINE','VECTOR    0.'+(400+((clock*37)|0)%500)];L.forEach((t,j)=>g.fillText(t,12,SH*.62+j*12));
  for(let j=0;j<10;j++){const hh=8+((Math.sin(clock*1.3+j*1.7)+1)*.5)*26;g.fillRect(SW-18-j*7,48-hh,4,hh);}
  g.restore();
  // hình nét lớn mờ phía sau chiến cơ
  const i=P&&P.t==='c'?P.i:(P&&P.t==='s'?((typeof SSS_MODELS!=='undefined'&&SSS_MODELS[P.i]&&SSS_MODELS[P.i].base)|0):0);
  const h22=window.HOLO22!==false&&P&&P.t==='c'&&draw22(g,SW,SH,py,k,clock,i);
  const wf=!h22&&!(window.HOLO22!==false&&P&&P.t==='c')&&wire(i,'#3FA9FF');if(wf){const sz=Math.min(SW*.86,SH*.62);g.save();g.globalAlpha=.42+.06*Math.sin(clock*1.6);g.globalCompositeOperation='lighter';g.drawImage(wf,SW/2-sz/2,py-sz*.95,sz,sz);g.restore();}
  // tia năng lượng / hào quang theo nấc (phía sau tàu)
  if(S.tier>=2){g.save();g.globalCompositeOperation='lighter';const cx=SW/2,cy=py-80*k;for(let j=0;j<(S.tier===3?22:14);j++){const side=j%2?1:-1,ang=-Math.PI/2+side*(.35+Math.floor(j/2)*.16)+Math.sin(clock*1.4+j)*.03,len=(150+((j*53)%60))*k;
    const gr=g.createLinearGradient(cx,cy,cx+Math.cos(ang)*len,cy+Math.sin(ang)*len);gr.addColorStop(0,T.b+'cc');gr.addColorStop(1,T.a+'00');g.strokeStyle=gr;g.lineWidth=(10-Math.floor(j/2))*k*.55;g.lineCap='round';g.beginPath();g.moveTo(cx,cy);g.lineTo(cx+Math.cos(ang)*len,cy+Math.sin(ang)*len);g.stroke();}
   const ha=g.createRadialGradient(cx,cy,0,cx,cy,170*k);ha.addColorStop(0,T.a+'88');ha.addColorStop(1,T.a+'00');g.fillStyle=ha;g.fillRect(0,0,SW,SH);g.restore();}
  // bệ hologram nét đứt
  g.save();const cx=SW/2;g.globalCompositeOperation='lighter';for(let j=0;j<4;j++){g.setLineDash(j%2?[6*k,5*k]:[2*k,4*k]);g.lineDashOffset=-clock*(j%2?14:-10);g.strokeStyle=j===0?T.b:'#2F7BFF';g.globalAlpha=.75-j*.14;g.lineWidth=j===0?2:1.4;g.beginPath();g.ellipse(cx,py+6*k,(70+j*30)*k,(14+j*6)*k,0,0,Math.PI*2);g.stroke();}
  g.setLineDash([]);const pg=g.createRadialGradient(cx,py+6*k,0,cx,py+6*k,150*k);pg.addColorStop(0,'rgba(63,169,255,.30)');pg.addColorStop(1,'rgba(63,169,255,0)');g.globalAlpha=1;g.fillStyle=pg;g.beginPath();g.ellipse(cx,py+6*k,150*k,34*k,0,0,Math.PI*2);g.fill();g.restore();
  return true;}
 // ---- lớp màu theo nấc phủ lên chiến cơ (Tối thượng: ánh vàng kim nhẹ). Gọi sau khi chép khung trận.
 function tint(g,SW,SH,py,k){if(!on())return;const A=artFor(LP);if(A){const cy=py-40*k,w=(A.mecha?150:140)*k,h=w*A.im.naturalHeight/A.im.naturalWidth;
   // che chiến cơ cũ: quầng nền tối mờ dưới tranh mới
   g.save();const sh=g.createRadialGradient(SW/2,cy,0,SW/2,cy,w*.55);sh.addColorStop(0,'rgba(6,23,58,.92)');sh.addColorStop(.7,'rgba(6,23,58,.6)');sh.addColorStop(1,'rgba(6,23,58,0)');g.fillStyle=sh;g.fillRect(SW/2-w,cy-h,w*2,h*2);
   g.shadowColor=tierCol(LP,S.tier||1).a;g.shadowBlur=18;g.drawImage(A.im,SW/2-w/2,cy-h*(A.mecha?.62:.55),w,h);g.restore();
   g.save();g.font="800 9px 'Be Vietnam Pro',sans-serif";g.fillStyle='rgba(191,230,255,.8)';g.textAlign='center';g.fillText('MẪU TRANH V212C',SW/2,cy+h*.5+14);g.restore();}
  if(S.tier!==3)return;const T=tierCol(LP,3);g.save();g.globalCompositeOperation='screen';const cx=SW/2,cy=py-60*k;const gr=g.createRadialGradient(cx,cy,0,cx,cy,120*k);gr.addColorStop(0,T.a+'55');gr.addColorStop(1,T.a+'00');g.fillStyle=gr;g.fillRect(0,0,SW,SH);g.restore();}
 // ---- nút điều khiển trên sân khấu
 function ui(){const st=document.querySelector('.h1-stage');if(!st||st.querySelector('.ho212'))return;const d=document.createElement('div');d.className='ho212';
  d.innerHTML=`<button data-h="bg"></button><span>${[1,2,3].map(t=>`<button data-t="${t}">${TIER[t].name}</button>`).join('')}<button data-m="1" hidden>MECHA</button></span>`;st.appendChild(d);
  d.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;e.stopPropagation();if(b.dataset.h==='bg')S.on=!S.on;if(b.dataset.t)S.tier=+b.dataset.t;if(b.dataset.m){S.mecha=!S.mecha;if(S.mecha&&S.tier<2)S.tier=2;}save();sync();});sync();}
 function sync(){const d=document.querySelector('.ho212');if(!d)return;d.querySelector('[data-h="bg"]').textContent=S.on?'NỀN: HOLOGRAM ⇄':'NỀN: XƯỞNG ⇄';d.querySelectorAll('[data-t]').forEach(b=>{b.setAttribute('aria-pressed',String(+b.dataset.t===S.tier));b.disabled=!S.on;});d.classList.toggle('off',!S.on);const mb=d.querySelector('[data-m]');if(mb){mb.hidden=!hasMecha(LP);mb.setAttribute('aria-pressed',String(!!S.mecha));}}
 setInterval(()=>{try{sync();}catch{}},800);
 try{new MutationObserver(()=>ui()).observe(document.body,{childList:true,subtree:true});}catch{}setTimeout(ui,500);
 return {draw,tint,S,set:(o)=>{Object.assign(S,o);save();sync();},wire};
})();
window.HOLO212Draw=(...a)=>HOLO212.draw(...a);window.HOLO212Tint=(...a)=>HOLO212.tint(...a);
