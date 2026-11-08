// V88 · ĐO FPS TRÊN MÁY THẬT: bật trong CÀI ĐẶT → góc trái trên hiện FPS khi chơi; mỗi trận lưu 1 dòng tóm tắt
//  (ải, FPS trung bình, FPS thấp nhất theo từng giây, số đạn nhiều nhất, có đồng đội không) để chủ dự án đọc lại và gửi Claude.
//  Khóa lưu mới: saobang-fps88 (tối đa 8 trận gần nhất). Không ảnh hưởng lối chơi.
const Fps88=(()=>{
 const KEY='saobang-fps88';let S={on:false,log:[]};try{const v=JSON.parse(localStorage.getItem(KEY)||'null');if(v&&typeof v==='object')S=Object.assign(S,v);}catch{}if(!Array.isArray(S.log))S.log=[];
 const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S));}catch{}};
 let run=null,el=null,frames=0,secT=0,last=0;
 const playing=()=>{try{return mode==='play';}catch{return false;}};
 function lvName(){try{if(gameMode==='campaign')return 'Ải '+level;if(gameMode==='endless')return 'Vô tận';return String(gameMode);}catch{return '?';}}
 function hud(){if(!el){el=document.createElement('div');el.id='fps88';el.style.cssText='position:fixed;left:6px;top:64px;z-index:99980;pointer-events:none;font:600 11px/1.35 ui-monospace,monospace;color:#9fffc8;background:rgba(0,0,0,.55);padding:3px 6px;border-radius:4px';document.body.appendChild(el);}return el;}
 function finish(){if(!run||run.secs<3)return run=null;const avg=run.sumF/run.secs;S.log.unshift({at:new Date().toLocaleString('vi-VN'),st:run.st,avg:Math.round(avg),min:Math.round(run.minF),bul:run.maxB,wing:run.wing?1:0,sec:run.secs,hitch:run.hitch|0,w:run.w||null});S.log=S.log.slice(0,8);save();run=null;}
 function loop(t){requestAnimationFrame(loop);if(!S.on){if(el)el.hidden=true;if(run)finish();return;}
  const p=playing();if(!p){if(el)el.hidden=true;if(run&&(()=>{try{return mode!=='pause';}catch{return true;}})())finish();last=t;return;}
  if(!run){run={st:lvName(),secs:0,sumF:0,minF:999,maxB:0,wing:false};frames=0;secT=0;last=t;}
  const dt=(t-last)/1000;last=t;if(dt>0&&dt<1){frames++;secT+=dt;if(dt>.1)run.hitch=(run.hitch|0)+1;}
  if(secT>=1){const f=frames/secT;run.secs++;run.sumF+=f;let nb=0;try{nb=bullets.length;}catch{}if(f<run.minF){let ne=0,bs='',q='';try{ne=enemies.filter(e=>!e.dead).length;}catch{}try{bs=boss?(boss.phase?'boss pha '+(boss.phase+1):'boss'):'';}catch{}try{q=VisualFX.counts().quality==='light'?'NHẸ':'ĐẸP';}catch{}run.w={s:run.secs,nb,ne,bs,q,rs:window.RS105||0};}run.minF=Math.min(run.minF,f);run.maxB=Math.max(run.maxB,nb);try{run.wing=run.wing||!!(window.Wing87&&Wing87.mate()!=null);}catch{}
   const e=hud();e.hidden=false;e.textContent=Math.round(f)+' FPS · thấp nhất '+Math.round(run.minF)+' · đạn '+nb;frames=0;secT=0;}}
 requestAnimationFrame(loop);
 // nút trong CÀI ĐẶT (bảng .st66)
 setInterval(()=>{try{const card=document.querySelector('.st66 .m63-card');if(!card||card.querySelector('[data-f88]'))return;const box=document.createElement('div');box.dataset.f88=1;
   box.innerHTML='<div class="st66-l">ĐO FPS (GỬI CHO CLAUDE)</div><div class="st66-row"><button data-f88b="1"></button></div><p class="st66-now" data-f88l="1" style="white-space:pre-line;font-size:11px"></p>';
   const btns=card.querySelector('.m63-btns');card.insertBefore(box,btns);
   const paint=()=>{box.querySelector('[data-f88b]').textContent='HIỆN FPS KHI CHƠI: '+(S.on?'BẬT':'TẮT');box.querySelector('[data-f88b]').setAttribute('aria-pressed',String(S.on));
    box.querySelector('[data-f88l]').textContent=S.log.length?S.log.map(r=>`${r.st} · TB ${r.avg} · thấp nhất ${r.min} FPS · đạn tối đa ${r.bul}${r.wing?' · có đồng đội':''} · ${r.sec}s${r.hitch!=null?' · giật '+r.hitch+' lần':''}${r.w?` · giây tệ nhất: giây ${r.w.s}, ${r.w.nb} đạn, ${r.w.ne} quái${r.w.bs?', '+r.w.bs:''}${r.w.q?', '+r.w.q:''}${r.w.rs?', độ nét '+String(r.w.rs).replace('.',',')+'×':''}`:''}`).join('\n'):'Chưa có trận nào được đo.';};
   box.querySelector('[data-f88b]').addEventListener('click',e=>{e.stopPropagation();S.on=!S.on;save();paint();});paint();}catch{}},800);
 return {state:()=>JSON.parse(JSON.stringify(S)),_set:o=>{Object.assign(S,o);save();}};
})();
window.Fps88=Fps88;
