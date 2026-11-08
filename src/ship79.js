// V79B · LỘ TRÌNH MỞ CHẮC CHẮN CHIẾN CƠ #6–#10 (Gemini REVIEW79B §3) — hiện trong Thành tựu, dưới Quà bộ
//  Mỗi chiếc gắn với 1 chế độ phụ; đạt 1 trong 2 điều kiện là nhận. Nhận ở khung mặc định (S → Lam, SS → Lam+1 / Lam+2 / Tím).
//  Đã có sẵn chiếc đó → nhận 2 phôi cùng màu khung thay thế. Điều kiện "đổi" (huy hiệu, mảnh ấn chú) trừ đúng số khi nhận.
//  Tắt: window.SHIP79=false
const Ship79=(()=>{
 const KEY='saobang-ship79';let S={got:{},spins:0};try{const v=JSON.parse(localStorage.getItem(KEY)||'null');if(v&&typeof v==='object')S=Object.assign(S,v);}catch{}
 const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S));}catch{}};
 const on=()=>window.SHIP79!==false;
 const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 const FR=['Trắng','Lục','Lam','Tím'],FC=['#d6e0ea','#3ee08f','#3aa8ff','#b45cff'];
 const g=(fn,d=0)=>{try{const v=fn();return typeof v==='number'&&isFinite(v)?v:d;}catch{return d;}};
 const towerBest=()=>g(()=>Meta40.state().S.tower.best);
 const seasonLv=()=>g(()=>S77.level());
 const stars=()=>g(()=>{const o=Campaign36.getState().stars||{};let t=0;for(const k in o)t+=o[k]|0;return t;});
 const badge=()=>g(()=>O78.state().badge);
 const shards=()=>g(()=>BK78.state().shards);
 const best=()=>g(()=>{const c=Progress.getState().cleared||[];return c.length?Math.max(...c):0;});
 // i = chỉ số chiến cơ · rank · n = nấc khung khi nhận · a/b = 2 điều kiện [nhãn, giá trị hiện tại, mục tiêu, trừ khi nhận?]
 // V189 · D2 (Gemini, số đo V188): tàu S trước ải 100, tàu SS trước ải 140. Tắt: window.D2_189=false
 const D2=window.D2_189!==false;
 const ROUTE=[
  {i:5,g:5,rank:'S',n:2,a:()=>['Tháp Boss tầng',towerBest(),D2?20:25],b:()=>['Tổng sao chiến dịch',stars(),D2?240:330]},
  {i:6,g:6,rank:'S',n:2,a:()=>['Mùa giải cấp',seasonLv(),D2?12:15],b:()=>['Tổng sao chiến dịch',stars(),D2?300:390]},
  {i:7,g:7,rank:'SS',n:3,a:()=>['Lượt vòng quay',S.spins|0,D2?35:40],b:()=>['Tổng sao chiến dịch',stars(),D2?360:450]},
  {i:8,g:8,rank:'SS',n:4,a:()=>['Đổi huy hiệu Vượt Hạn',badge(),600,'badge'],b:()=>['Tháp Boss tầng',towerBest(),32]},
  {i:9,g:9,rank:'SS',n:6,a:()=>['Phá đảo ải',best(),160],b:()=>['Đổi mảnh Ấn Chú',shards(),1000,'shards']}];
 const shipName=i=>{try{return crafts[i].name;}catch{try{return Fighters28.profiles[i].name;}catch{return 'Chiến cơ #'+(i+1);}}};
 const frameOf=n=>n>=6?3:n>=2?2:n>=1?1:0;
 const tierName=n=>{try{return TIER70.name[n];}catch{return FR[frameOf(n)];}};
 function readyOf(r){const A=r.a(),B=r.b();return A[1]>=A[2]?A:B[1]>=B[2]?B:null;}
 function claim(k){const r=ROUTE[k];if(!r||S.got[r.i])return false;const c=readyOf(r);if(!c)return false;
  if(c[3]==='badge'){try{const st=O78.state();if((st.badge|0)<c[2])return false;O78._set({badge:(st.badge|0)-c[2]});}catch{return false;}}
  if(c[3]==='shards'){try{const st=BK78.state();if((st.shards|0)<c[2])return false;BK78._set({shards:(st.shards|0)-c[2]});}catch{return false;}}
  let owned=false;try{owned=Campaign36.ownsCraft(r.i);}catch{}
  if(!owned){try{Campaign36.acquire('craft',r.i,r.rank,'endless');}catch{}}
  const ev=(window.Evo82&&Evo82.on()),nn=ev?Math.min(r.n,2):r.n;let up=false;
  if(ev&&owned){Evo82.addCopy('craft',r.i,r.n,1,true);}else{try{up=V70.setTier('craft',r.i,nn);}catch{}if(owned&&!up){try{V70.phAdd('craft',r.i,frameOf(r.n),2);}catch{}}}
  // V80 (chủ dự án): quà là NGUYÊN BỘ — chiến cơ + giáp + tên lửa + vũ khí phụ cùng bộ, cùng khung với chiến cơ
  const gear=[];try{for(const m of (Campaign36.sets[r.g]||[])){let it=null;try{it=(Progress.getState().items||[]).find(x=>x.variant===m);}catch{}
    let had=!!it;if(!it){try{const a=Campaign36.acquire('gear',m,r.rank,'endless');it=a&&a.item;}catch{}}
    if(it&&ev){if(had)Evo82.addCopy('gear',m,r.n,1,true);else{try{V70.setTier('gear',it.id,nn);}catch{}}let nm=m;try{nm=GearCatalog[m].name;}catch{}gear.push(nm);continue;}
    if(it){let u=false;try{u=V70.setTier('gear',it.id,r.n);}catch{}if(!u){try{V70.phAdd('gear',m,frameOf(r.n),2);}catch{}}let nm=m;try{nm=GearCatalog[m].name;}catch{}gear.push(nm);}}}catch{}
  S.got[r.i]=Date.now();save();try{V70.sync&&V70.sync();}catch{}try{Progress.render();}catch{}
  try{toast('✈ NHẬN NGUYÊN BỘ · '+shipName(r.i)+(gear.length?' + '+gear.length+' trang bị':'')+' · '+tierName(ev?(owned?r.n:nn):r.n)+(ev&&owned?' (đã có → bản sao '+tierName(r.n)+' Lv1)':'')+(!ev&&owned&&!up?' (chiến cơ đã có → +2 phôi '+FR[frameOf(r.n)]+')':''));}catch{}
  return true;}
 const ready=()=>on()&&ROUTE.some(r=>!S.got[r.i]&&readyOf(r));
 function html(){if(!on())return '';const rows=ROUTE.map((r,k)=>{const got=!!S.got[r.i],c=readyOf(r),A=r.a(),B=r.b(),f=frameOf(r.n);
   const cond=x=>`<span class="${x[1]>=x[2]?'ok':''}">${x[4]?esc(x[4]):esc(x[0])+' '+Math.min(x[1],x[2]).toLocaleString('vi-VN')+'/'+x[2].toLocaleString('vi-VN')}</span>`;
   const gs=(()=>{try{return (Campaign36.sets[r.g]||[]).map(m=>GearCatalog[m].name);}catch{return [];}})();
   return `<div class="s79sh ${got?'done':''}" style="--c:${FC[f]}"><div class="s79sn"><b>✈ ${esc(shipName(r.i))}</b><i>${r.rank} · ${esc(tierName((window.Evo82&&Evo82.on())?Math.min(r.n,2):r.n))} · nguyên bộ${(window.Evo82&&Evo82.on())?' · đã có → bản sao '+esc(tierName(r.n)):''}</i><small class="s79g">${gs.length?'🛡 '+gs.map(esc).join(' · '):'Bộ trang bị riêng sẽ có ở bản sau'}</small></div><div class="s79sc">${cond(A)}<em>hoặc</em>${cond(B)}</div>${got?'<small class="s79sg">ĐÃ NHẬN</small>':`<button data-s79s="${k}" ${c?'':'disabled'}>${c?'NHẬN':'CHƯA ĐẠT'}</button>`}</div>`;}).join('');
  return `<div class="s79 s79ships"><div class="s79h"><b>LỘ TRÌNH CHIẾN CƠ #6 – #13</b><small>Mỗi bậc tặng NGUYÊN BỘ: chiến cơ + giáp + tên lửa + vũ khí phụ · đạt 1 trong 2 điều kiện</small></div>${rows}</div>`;}
 function mount(){if(!on())return;const q=document.querySelector('.s79:not(.s79ships)');if(!q)return;let el=q.parentNode.querySelector('.s79ships');const h=html();
  if(!el||el.dataset.h!==h){const w=document.createElement('div');w.innerHTML=h;const n=w.firstElementChild;n.dataset.h=h;if(el)el.replaceWith(n);else q.after(n);}}
 function dots(){if(!ready())return;for(const e of document.querySelectorAll('[data-go="ach"] .h1-dot,#lb-ach i'))e.hidden=false;}
 document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-s79s]');if(!b)return;e.preventDefault();e.stopPropagation();if(claim(+b.dataset.s79s))setTimeout(mount,30);},true);
 function install(){try{const sp=Econ74.spin;Econ74.spin=function(n){const r=sp.apply(this,arguments);try{if(r){S.spins=(S.spins|0)+(n|0||1);save();}}catch{}return r;};}catch{}}
 setTimeout(install,110);setInterval(()=>{try{mount();dots();}catch{}},600);
 return {ROUTE,claim,ready,state:()=>({...S,ready:ready()})};
})();
window.Ship79=Ship79;
