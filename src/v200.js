'use strict';
// V200 · PHÒNG TẬP BẮN 30 GIÂY (Gemini rà soát 07/11, mục 9). Tắt: window.TAPBAN200=false
//  Vào thẳng pha boss của ải boss cao nhất đã mở (≤ 160), boss không chết, tàu không mất máu, KHÔNG tốn năng lượng,
//  KHÔNG thưởng / KHÔNG tính tiến trình (thoát trước khi xử lý kết quả ải). Đo ST/s tách 3 phần như bộ đo t190:
//  Đạn chính · Trang bị / SSS · Kỹ năng / VKTT. So với lần tập trước (khóa mới saobang-tapban-v200, không đụng khóa cũ).
//  Nút "🎯 TẬP BẮN" ở: màn Chip, màn Hợp thể, chi tiết Trang bị SSS. Chạy được cả chế độ Bạo Tẩu để thử dòng chip BT.
const TapBan200=(()=>{
 const KEY='saobang-tapban-v200',DUR=30;
 const on=()=>window.TAPBAN200!==false;
 let R=null,hud=null,iv=null;
 const host=()=>document.fullscreenElement||document.webkitFullscreenElement||document.body;/* trận chạy toàn màn hình: phần tử ngoài vùng fullscreen không được vẽ */
 const last=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'null');}catch{return null;}};
 const fmt=n=>n>=1e6?(n/1e6).toFixed(2).replace('.',',')+'M':n>=1e4?(n/1e3).toFixed(1).replace('.',',')+'K':String(Math.round(n));
 function pickStage(){let mx=0;try{const c=JSON.parse(localStorage.getItem('saobang-hangar-v1')||'{}').cleared||[];mx=Math.max(0,...c);}catch{}
  let s=Math.min(160,Math.max(10,mx+1));try{while(s>10&&!Campaign36.bossKind(s))s--;}catch{s=10;}return s;}
 function hook(){if(window.__db200)return;window.__db200=1;const od=damageBoss;const nb=function(a,s){try{if(R&&R.on){const v=+a||0;const k=(s==='gear'||(s&&s.gearKind))?'tb':(typeof s==='string'&&s!=='bomb')?'kn':s==='bomb'?'bom':'chinh';R.acc[k]=(R.acc[k]||0)+v;}}catch{}return od.apply(this,arguments);};window.damageBoss=nb;try{damageBoss=nb;}catch{}}
 function stop(show){clearInterval(iv);iv=null;if(hud){hud.remove();hud=null;}if(!R)return;const r=R;R=null;window.__tb200=false;
  try{Revive393.close();}catch{}try{Combat26.cancelSkill();}catch{}try{superTime=0;bullets=[];beams=[];enemies=[];boss=null;}catch{}try{if(typeof PlayScreen!=='undefined')PlayScreen.exit(false);}catch{}try{mode='menu';}catch{}try{Lobby.show();}catch{}try{document.getElementById('overlay').hidden=true;}catch{}
  try{const d=V75.energy()-r.en0;if(d<0)V75.addEn(-d);}catch{}
  if(!show)return;const sec=Math.max(1,r.sec),a=r.acc,res={t:Date.now(),bt:r.bt,stage:r.stage,chinh:(a.chinh||0)/sec,tb:(a.tb||0)/sec,kn:((a.kn||0)+(a.bom||0))/sec};res.tong=res.chinh+res.tb+res.kn;
  const prev=last();const L=(prev||{})[r.bt?'bt':'n'];try{const o=prev||{};o[r.bt?'bt':'n']=res;localStorage.setItem(KEY,JSON.stringify(o));}catch{}
  setTimeout(()=>panel(res,L),350);}
 function delta(n,o){if(!o)return '';const p=(n/o-1)*100;if(Math.abs(p)<0.5)return '<i class="eq">=</i>';return `<i class="${p>0?'up':'dn'}">${p>0?'▲':'▼'} ${Math.abs(p).toFixed(1).replace('.',',')}%</i>`;}
 function panel(res,L){const el=document.createElement('div');el.className='tb200';const row=(n,k)=>`<div><span>${n}</span><b>${fmt(res[k])}</b>${delta(res[k],L&&L[k])}</div>`;
  el.innerHTML=`<div class="tb200-b"><h3>🎯 KẾT QUẢ TẬP BẮN${res.bt?' · BẠO TẨU':''}</h3><p>Sát thương mỗi giây lên boss ải ${res.stage} · ${DUR} giây${L?' · so với lần tập trước':''}</p>
   <div class="tb200-r big">${row('Tổng ST/s','tong')}</div><div class="tb200-r">${row('Đạn chính','chinh')}${row('Trang bị / SSS','tb')}${row('Kỹ năng / VKTT','kn')}</div>
   <p class="nt">Đổi chip, trang bị hoặc cặp SSS rồi tập lại để so. Không tốn năng lượng, không tính tiến trình.</p>
   <div class="tb200-a"><button type="button" data-a="n">Tập lại</button><button type="button" data-a="bt">Tập Bạo Tẩu</button><button type="button" data-a="x" class="x">Đóng</button></div></div>`;
  el.addEventListener('click',e=>{const b=e.target.closest('[data-a]');if(!b&&e.target!==el)return;el.remove();if(b&&b.dataset.a!=='x')start(b.dataset.a==='bt');});host().appendChild(el);}
 function start(bt){if(!on()||R)return;hook();const stage=pickStage();let en0=0;try{en0=V75.energy();}catch{}
  try{document.querySelectorAll('.c72,.m63,.adv70,.st71,#g44,#hub40').forEach(e=>{if(e.id==='hub40'||e.classList.contains('c72')||e.id==='g44')e.hidden=true;});}catch{}
  try{mode='menu';Lobby.show();const sel=document.getElementById('mission-select');if(![...sel.options].some(o=>o.value==String(stage))){const o=document.createElement('option');o.value=String(stage);o.textContent='Tập bắn';sel.appendChild(o);}document.getElementById('gamemode').value='campaign';sel.value=String(stage);Lobby.hide();reset();if(mode==='pause')mode='play';}catch(e){try{toast('Chưa vào được phòng tập');}catch{}return;}
  R={on:false,acc:{},sec:0,stage,bt,en0};window.__tb200=true;
  hud=document.createElement('div');hud.className='tb200-hud';hud.innerHTML=`<b>🎯 TẬP BẮN${bt?' · BẠO TẨU':''}</b><span>Đang gọi boss…</span><button type="button">Dừng</button>`;hud.querySelector('button').onclick=()=>stop(R&&R.on&&R.sec>3);host().appendChild(hud);
  setTimeout(()=>{try{enemies=[];startBoss();}catch{}},700);
  let t0=0,last_=performance.now();
  iv=setInterval(()=>{if(!R)return;try{const h=host();if(hud&&hud.parentElement!==h)h.appendChild(hud);}catch{}try{invuln=999;hp=maxHp;for(const e of enemies)if(!e.boss&&!e.bossPart)e.dead=true;if(R.bt)superTime=Math.max(superTime,2);
    if(!R.on){if(boss&&boss.bossHealthReady&&boss.y>60){const m=1e4;boss.max*=m;boss.hp=boss.max;if(boss.coreMax){boss.coreMax*=m;boss.coreHp=boss.coreMax;}for(const p of (boss.parts||[]))if(p.max){p.max*=m;p.hp=p.max;}R.on=true;R.acc={};t0=time;}return;}
    if(mode==='play')R.sec=time-t0;const left=Math.max(0,DUR-R.sec);if(hud)hud.querySelector('span').textContent=Math.ceil(left)+' giây';if(left<=0||!boss||boss.dead)stop(true);}catch(e){}},100);}
 // nút mở ở các màn
 document.addEventListener('click',e=>{const b=e.target.closest('[data-tb200]');if(!b)return;e.preventDefault();e.stopPropagation();start(false);},true);
 const btn='<button type="button" class="tb200-btn" data-tb200="1">🎯 TẬP BẮN 30 GIÂY</button>';
 return {start,stop,btn,on,last};
})();
