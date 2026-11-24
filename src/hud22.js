'use strict';
// V2.2.1 · CÀI ĐẶT gọn + HUD chẩn đoán trên điện thoại. Tắt: window.HUD22=false
//  • Một công tắc duy nhất "HIỆN FPS KHI CHƠI" (của Fps88, vẫn ghi nhật ký 8 trận). Ẩn nút "ĐO FPS (THỬ MÁY)" (Opt15) và chữ FPS cũ của Fps88.
//  • Khi bật, trong trận: huy hiệu đơn cách góc trái trên, dưới vùng an toàn, cập nhật mỗi 500 ms:
//      FPS: 58 | 16.4ms | DPR 1.25 | P:42 B:28 | ĐẸP
//    FPS trung bình trượt · ms = thời gian JS + vẽ trung bình 1 khung (Safety31.frame) · DPR thật của canvas trận · P hạt/hiệu ứng · B đạn (ta + địch) · bậc đồ họa.
//    Chỉ đổi nội dung 1 nút văn bản (không innerHTML, không đo bố cục); không chạy rAF riêng khi tắt.
//  • Chặn khối trùng trong Cài đặt theo tiêu đề (MÃ QUÀ TẶNG / QUẢN TRỊ…), giữ khối đầu.
const HUD22=(()=>{
 const on=()=>window.HUD22!==false;
 const fpsOn=()=>{try{return !!Fps88.state().on;}catch{return false;}};
 const playing=()=>{try{return mode==='play'||mode==='pause';}catch{return false;}};
 if(on()){const st=document.createElement('style');st.id='hud22-css';
  st.textContent='html body #perf15b,html body #fps88,html body #perf15{display:none!important}'+
   /* V2.2.1 OFF22: trang #arsenal cũ nằm dưới màn hình (y≈13.000) vẫn chạy 39 hoạt ảnh xoay → trình duyệt bỏ qua phần ngoài màn hình (window.OFF22=false để tắt) */
   (window.OFF22===false?'':'#arsenal{content-visibility:auto;contain-intrinsic-size:auto 2000px}')+
  '#hud22{position:fixed;left:calc(env(safe-area-inset-left,0px) + 4px);top:calc(env(safe-area-inset-top,0px) + 2px);z-index:2147483100;pointer-events:none;'+
  'font:700 9.5px/1.2 ui-monospace,Menlo,Consolas,monospace;color:#d8fbff;background:rgba(2,8,18,.72);border:1px solid rgba(63,230,255,.5);padding:2px 4px;white-space:pre;contain:layout paint;transform:translateZ(0)}';
  (document.head||document.documentElement).appendChild(st);window.PERF_HUD=false;}
 // đo thời gian 1 khung game
 let work=0,wn=0;function hookFrame(){try{if(typeof Safety31==='undefined'||Safety31.__h22)return;const o=Safety31.frame;Safety31.frame=function(){const t0=performance.now();try{return o.apply(this,arguments);}finally{work+=performance.now()-t0;wn++;}};Safety31.__h22=1;}catch{}}
 let el=null,tx=null,lastT=0,acc=0,n=0,lastPaint=0,running=false;
 function host(){return document.fullscreenElement||document.webkitFullscreenElement||document.body;}
 function ensure(){if(!el){el=document.createElement('div');el.id='hud22';tx=document.createTextNode('');el.appendChild(tx);}const h=host();if(el.parentNode!==h)h.appendChild(el);}
 function paint(){ensure();const fps=n?Math.round(n*1000/acc):0;const ms=wn?work/wn:0;let dpr=1,P=0,B=0,q='ĐẸP';
  try{dpr=canvas.width/(canvas.clientWidth||canvas.width);}catch{}
  try{const c=VisualFX.counts();P=(c.effects|0)+(c.sparks|0)+(c.particles|0);q=c.quality==='light'?'NHẸ':'ĐẸP';}catch{}
  try{B=(shots.length|0)+(bullets.length|0);}catch{}
  tx.nodeValue='FPS: '+fps+' | '+ms.toFixed(1)+'ms | DPR '+dpr.toFixed(2)+' | P:'+P+' B:'+B+' | '+q;
  el.style.color=fps>=55?'#46ffb2':fps>=45?'#ffd56a':'#ff7a7a';acc=n=work=wn=0;}
 function raf(t){if(!(on()&&fpsOn()&&playing())){running=false;if(el)el.style.display='none';lastT=0;return;}
  requestAnimationFrame(raf);hookFrame();if(el)el.style.display='';if(lastT){const d=t-lastT;if(d>0&&d<500){acc+=d;n++;}}lastT=t;if(t-lastPaint>=500){lastPaint=t;paint();}}
 // chỉ khởi động vòng đo khi đang trận + công tắc bật (kiểm 4 lần/giây, rất rẻ)
 setInterval(()=>{if(on()&&fpsOn()&&playing()&&!running){running=true;lastT=0;requestAnimationFrame(raf);}},250);
 // Cài đặt: bỏ khối trùng theo tiêu đề
 function dedupe(){const card=document.querySelector('.st66 .m63-card');if(!card)return;const seen=new Set();
  for(const h of [...card.querySelectorAll(':scope > .st66-l')]){const k=(h.textContent||'').trim().toUpperCase();if(!k)continue;
   if(seen.has(k)){let x=h.nextElementSibling;h.remove();while(x&&!x.classList.contains('st66-l')&&!x.classList.contains('m63-btns')&&(x.classList.contains('st66-row')||x.classList.contains('st66-now')||x.classList.contains('st66-d'))){const y=x.nextElementSibling;x.remove();x=y;}}else seen.add(k);}
  const ds=[...card.querySelectorAll(':scope > [data-f88]')];for(let i=1;i<ds.length;i++)ds[i].remove();
  const f=card.querySelector(':scope > [data-f88] .st66-l');if(f&&f.textContent!=='CHẨN ĐOÁN')f.textContent='CHẨN ĐOÁN';}
 if(on())setInterval(()=>{if(playing())return;const m=document.querySelector('.st66');if(m&&!m.hidden)try{dedupe();}catch{}},400);
 // TỰ ĐỘNG hạ NHẸ (V2.2.1): bộ đo cũ BloomQualityC.sample chỉ chạy trong đường vẽ ánh sáng lan → trên máy thật có thể không được gọi
 //  (video: ~37 FPS mà vẫn ĐẸP). Nay: chế độ TỰ ĐỘNG + đang ĐẸP + trong trận, FPS từng cửa sổ 250 ms < 48 liên tục 2 s → hạ NHẸ (1 lần/lượt chơi). Tắt: window.AUTO22=false
 let aLast=0,aEl=0,aFr=0,aSlow=0,aRun=false;const A=window.AUTO22CFG={fps:48,ms:2000};
 const autoOn=()=>{if(window.AUTO22===false||!on())return false;let pref='auto';try{pref=localStorage.getItem('saobang-gfx-v66')||'auto';}catch{}if(pref!=='auto')return false;
  let q='high';try{q=VisualFX.counts().quality;}catch{}if(q==='light'||q==='auto-light')return false;try{return mode==='play';}catch{return false;}};
 function aTick(t){if(!autoOn()){aRun=false;aLast=0;aEl=aFr=aSlow=0;return;}requestAnimationFrame(aTick);if(document.hidden){aLast=0;return;}
  if(aLast){const d=t-aLast;if(d>0&&d<500){aEl+=d;aFr++;}}aLast=t;if(aEl<250)return;const f=aFr*1000/aEl;aSlow=f<A.fps?aSlow+aEl:0;aEl=aFr=0;
  if(aSlow>=A.ms){aSlow=0;try{VisualFX.setQuality('auto-light');}catch{}try{toast('MÁY GIẬT · TỰ CHUYỂN HÌNH ẢNH NHẸ');}catch{}window.__auto22=(window.__auto22|0)+1;}}
 setInterval(()=>{if(!aRun&&autoOn()){aRun=true;requestAnimationFrame(aTick);}},500);
 return {on,paint,dedupe};
})();
