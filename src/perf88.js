// V88 · HIỆU NĂNG (số đo máy thật của chủ dự án: ải 160 TB 23 FPS, thấp nhất 14; hồ sơ CPU: ~50% thời gian khung hình là VẼ CHỮ —
//  hạt lễ hội bằng emoji, thanh máu boss, nhãn PHÁ CÁNH, chữ nổi…). Vẽ chữ lên canvas rất đắt trên điện thoại vì phải dựng glyph mỗi khung.
//  • Bộ đệm chữ: mỗi chữ (nội dung + phông + màu + căn lề) vẽ 1 lần ra canvas phụ rồi dán lại bằng drawImage. Chỉ áp cho canvas trận đấu,
//    chỉ khi màu là chuỗi và không có bóng mờ; tối đa 500 mục (bỏ mục cũ nhất). Phông tải xong → xóa đệm.
//  Tắt: window.PERF88=false (tải lại trang)
const Perf88=(()=>{
 if(window.PERF88===false)return {on:false};
 const MAX=500,Q=2;let hit=0,miss=0,skip=0,fT=0,fM=0;const C=new Map();
 const off=document.createElement('canvas'),og=off.getContext('2d');
 function ent(kind,text,g){const fs=g.fillStyle,ss=g.strokeStyle,st=kind?ss:fs;if(typeof st!=='string')return null;
  const key=kind+'|'+text+'|'+g.font+'|'+st+'|'+(kind?g.lineWidth+'|'+g.lineJoin:'')+'|'+g.textAlign+'|'+g.textBaseline;let e=C.get(key);
  if(e){C.delete(key);C.set(key,e);hit++;return e;}
  const now=performance.now();if(now-fT>12){fT=now;fM=0;}if(++fM>10)return null;// chữ đổi liên tục (số đếm…): mỗi khung chỉ dựng tối đa 10 mục mới
  og.font=g.font;og.textAlign=g.textAlign;og.textBaseline=g.textBaseline;const m=og.measureText(text);
  const lw=kind?Math.ceil(g.lineWidth||1):0,pad=2+lw;const L=Math.ceil(m.actualBoundingBoxLeft||0),R=Math.ceil(m.actualBoundingBoxRight||m.width),A=Math.ceil(m.actualBoundingBoxAscent||12),D=Math.ceil(m.actualBoundingBoxDescent||4);
  const w=L+R+pad*2,h=A+D+pad*2;if(!(w>0&&h>0)||w*h>200000)return null;
  const c=document.createElement('canvas');c.width=Math.ceil(w*Q);c.height=Math.ceil(h*Q);const x=c.getContext('2d');x.scale(Q,Q);x.font=g.font;x.textAlign=g.textAlign;x.textBaseline=g.textBaseline;
  if(kind){x.strokeStyle=st;x.lineWidth=g.lineWidth;x.lineJoin=g.lineJoin;x.strokeText(text,pad+L,pad+A);}else{x.fillStyle=st;x.fillText(text,pad+L,pad+A);}
  e={c,ax:pad+L,ay:pad+A,w,h};C.set(key,e);miss++;if(C.size>MAX)C.delete(C.keys().next().value);return e;}
 function wrap(g){if(!g||g.__p88)return;g.__p88=1;const F=g.fillText.bind(g),S=g.strokeText.bind(g);
  g.fillText=function(t,x,y,mw){if(mw!==undefined||g.shadowBlur>0||t==null){skip++;return F(t,x,y,mw);}const e=ent(0,String(t),g);if(!e){skip++;return F(t,x,y);}g.drawImage(e.c,x-e.ax,y-e.ay,e.w,e.h);};
  g.strokeText=function(t,x,y,mw){if(mw!==undefined||g.shadowBlur>0||t==null){skip++;return S(t,x,y,mw);}const e=ent(1,String(t),g);if(!e){skip++;return S(t,x,y);}g.drawImage(e.c,x-e.ax,y-e.ay,e.w,e.h);};}
 function install(){try{if(typeof ctx!=='undefined'&&ctx)wrap(ctx);}catch{}}
 install();setTimeout(install,500);setInterval(install,3000);
 try{document.fonts&&document.fonts.addEventListener('loadingdone',()=>C.clear());}catch{}
 // ---- Tự hạ đồ họa nhanh hơn và NHỚ cho máy này (trước: phải giật liên tục 2 s mới hạ, sang trận sau lại về Đẹp) ----
 //  Chế độ TỰ ĐỘNG: 2 giây liên tiếp dưới 45 FPS → chuyển Nhẹ và ghi nhớ (saobang-autolight88); các trận sau vào thẳng Nhẹ.
 //  Người chơi chọn ĐẸP hoặc NHẸ trong Cài đặt thì theo lựa chọn đó. Ở chế độ Nhẹ tắt thêm hạt lễ hội trong trận.
 const AKEY='saobang-autolight88';let slowS=0,fr=0,acc=0,lastT=0,autoOn=false;try{autoOn=localStorage.getItem(AKEY)==='1';}catch{}
 const pref=()=>{try{return localStorage.getItem('saobang-gfx-v66')||'auto';}catch{return 'auto';}};
 const light=()=>{try{return VisualFX.counts().quality==='light';}catch{return false;}};
 function goLight(){try{VisualFX.setQuality('auto-light');}catch{}}
 function tickQ(t){requestAnimationFrame(tickQ);let m='';try{m=mode;}catch{}if(m!=='play'){lastT=0;fr=0;acc=0;slowS=0;return;}
  try{window.FEST78_FX=light()?false:undefined;}catch{}
  if(pref()!=='auto')return;if(autoOn&&!light())goLight();
  if(!lastT){lastT=t;return;}const d=t-lastT;lastT=t;if(d<=0||d>500)return;acc+=d;fr++;
  if(acc>=1000){const fps=fr*1000/acc;acc=0;fr=0;slowS=fps<45?slowS+1:0;if(slowS>=2&&!light()){goLight();autoOn=true;try{localStorage.setItem(AKEY,'1');}catch{}}}}
 requestAnimationFrame(tickQ);
 // chọn tay trong Cài đặt → bỏ ghi nhớ tự hạ
 document.addEventListener('click',e=>{try{const g=e.target.closest&&e.target.closest('[data-gfx]');if(g){autoOn=false;localStorage.removeItem(AKEY);}}catch{}},true);
 return {on:true,state:()=>({size:C.size,hit,miss,skip,autoOn,pref:pref(),light:light()}),clear:()=>C.clear()};
})();
window.Perf88=Perf88;
