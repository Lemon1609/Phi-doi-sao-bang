'use strict';
// V309 LƯỢT 15 · PERF_HUD (đo FPS khi test máy thật).
//  Hộp nhỏ góc trái trên: FPS · ms/khung (trung bình | khung chậm nhất trong 1 s) · ms mã game mỗi khung · độ nét canvas (V105) + chế độ ĐẸP/NHẸ ·
//  số đạn ta / đạn địch / quái / hạt. Bật: Cài đặt › "ĐO FPS (THỬ MÁY)" hoặc gõ window.PERF_HUD=true (lưu `saobang-perf15`). Tắt thì không vẽ gì.
//  Tự thích ứng máy yếu ĐÃ CÓ từ trước (không làm lại): V105 độ nét 2→1,7→1,5 (NHẸ 1,5→1,25) khi < 40 FPS 3 s · BloomQuality/V66 tự NHẸ khi < 50 FPS 2 s
//  (tắt lớp sao gần, hạt 400→120) · V183 ép NHẸ khi < 30 FPS ở độ nét thấp nhất · pool hạt cố định · PERF94 trần đạn từ ải 140.
const Opt15=(()=>{
 const KEY='saobang-perf15';
 let saved=false;try{saved=localStorage.getItem(KEY)==='1';}catch{}
 if(window.PERF_HUD===undefined)window.PERF_HUD=saved;
 const hudOn=()=>window.PERF_HUD===true;
 let el=null,acc=0,n=0,worst=0,work=0,wn=0,wworst=0,lastT=0,lastPaint=0,fps=0,ms=0,mx=0,wk=0,wkx=0;
 // đo thời gian JS của 1 khung game (Safety31.frame(runGameFrameC))
 function hookFrame(){try{if(typeof Safety31==='undefined'||Safety31.__o15)return;const o=Safety31.frame;Safety31.frame=function(fn){const t0=performance.now();try{return o.apply(this,arguments);}finally{const d=performance.now()-t0;work+=d;wn++;if(d>wworst)wworst=d;}};Safety31.__o15=1;}catch{}}
 const len=a=>{try{return a.length|0;}catch{return 0;}};
 function counts(){let ps=0,eb=0,en=0,fx=0;try{ps=len(shots);}catch{}try{eb=len(bullets);}catch{}try{en=len(enemies);}catch{}
  try{const c=VisualFX.counts();fx=(c.effects|0)+(c.sparks|0)+(c.particles|0);}catch{}return {ps,eb,en,fx};}
 function paint(){if(!el){el=document.createElement('div');el.id='perf15';el.style.cssText='position:fixed;left:calc(env(safe-area-inset-left,0px) + 4px);top:calc(env(safe-area-inset-top,0px) + 112px);z-index:2147483000;pointer-events:none;font:700 10px/1.25 ui-monospace,Menlo,Consolas,monospace;color:#d8fbff;background:rgba(2,8,18,.78);border:1px solid rgba(63,230,255,.55);padding:3px 5px;white-space:pre;letter-spacing:0';}
  {const host=document.fullscreenElement||document.webkitFullscreenElement||document.body;if(el.parentNode!==host)host.appendChild(el);el.style.setProperty('display','block','important');el.style.setProperty('visibility','visible','important');}/* trong trận game ở chế độ toàn màn hình + CSS ẩn con của body → gắn vào phần tử toàn màn hình */
  const c=counts();const col=fps>=55?'#46ffb2':fps>=45?'#ffd56a':'#ff6a6a';let q='';try{q=VisualFX.counts().quality==='light'?'NHẸ':'ĐẸP';}catch{}let cv='';try{cv=canvas.width+'×'+canvas.height;}catch{}
  el.innerHTML=`<b style="color:${col}">${fps.toFixed(0)} FPS</b> ${ms.toFixed(1)}ms ↑${mx.toFixed(0)}\ngame ${wk.toFixed(1)}ms ↑${wkx.toFixed(0)}\nnét ${(+window.RS105||0).toFixed(2)}× ${q} ${cv}\nđạn ${c.ps} · địch ${c.eb}\nquái ${c.en} · hạt ${c.fx}`;el.hidden=false;}
 function raf(t){requestAnimationFrame(raf);if(!hudOn()){if(el){el.hidden=true;el.style.setProperty('display','none','important');}lastT=0;return;}
  hookFrame();if(lastT){const d=t-lastT;if(d>0&&d<1000){acc+=d;n++;if(d>worst)worst=d;}}lastT=t;
  if(t-lastPaint>=1000&&n){fps=n*1000/acc;ms=acc/n;mx=worst;wk=wn?work/wn:0;wkx=wworst;acc=n=worst=work=wn=wworst=0;lastPaint=t;paint();}}
 requestAnimationFrame(raf);
 function setHud(v){window.PERF_HUD=!!v;try{localStorage.setItem(KEY,v?'1':'0');}catch{}btn();}
 // nút trong Cài đặt (.st66), cạnh khối "ĐIỀU KHIỂN & RUNG" của l6309
 function btn(){const card=document.querySelector('.st66 .m63-card');if(!card)return;let b=card.querySelector('#perf15b');
  if(!b){b=document.createElement('button');b.id='perf15b';b.type='button';b.className='m63-go';b.style.cssText='width:100%;margin:6px 0 0;min-height:38px;font-size:12px';b.onclick=e=>{e.stopPropagation();setHud(!hudOn());};
   const ref=card.querySelector('.st6x')||card.lastElementChild;if(ref&&ref.parentNode===card)ref.after(b);else card.appendChild(b);}
  const t='ĐO FPS (THỬ MÁY): '+(hudOn()?'BẬT':'TẮT');if(b.textContent!==t)b.textContent=t;b.setAttribute('aria-pressed',String(hudOn()));}
 setInterval(()=>{try{btn();}catch{}},800);
 return {setHud,counts,stat:()=>({fps,ms,mx,wk,wkx})};
})();window.Opt15=Opt15;
