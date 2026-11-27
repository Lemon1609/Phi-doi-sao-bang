'use strict';
// V2.3 · Đợt U2 (nhánh v23-ui-meta): thẻ Túi đồ mật độ cao + danh sách phi công rõ mảnh / nút sẵn sàng.
//  CHỈ HIỂN THỊ — đọc dữ liệu thật đang có (bậc khung, cấp, đặc kỹ GearCatalog.skill / Fighters28.weapon,
//  Siêu Tần Tuần Q10309.oc, liên kết Chiến Thần qua Gear44.sssFor / Fusion.supers, Pilot67.ready / SUB).
//  KHÔNG đổi kinh tế, rơi đồ, chỉ số, cân bằng trận. Tắt: window.U2V23=false.
const U2V23=(()=>{
 const on=()=>window.U2V23!==false;
 const md=()=>{try{return mode;}catch{return '';}};const inB=()=>{const m=md();return m==='play'||m==='pause';};
 document.documentElement.classList.add('u2v23');
 const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 const FR=n=>[0,1,2,2,2,2,3,3,3,3,3,3][n|0]|0,PL=n=>n<2?0:n<6?n-2:n-6;
 const tierN=t=>{try{const k=String(t).trim().toLowerCase();return TIER70.name.findIndex(x=>x.toLowerCase()===k);}catch{return -1;}};
 const fcol=n=>{try{return TIER70.fcol[TIER70.frame[n]];}catch{return '#d6e0ea';}};
 // nhóm hiếm (giống chest74): bộ / chiến cơ thứ 6–7 S, 8–10 SS, 11–13 APEX
 const grpIdx=si=>si>=10?'APEX':si>=7?'SS':si>=5?'S':'';
 const grpGear=v=>{let si=-1;try{Campaign36.sets.forEach((st,i)=>{if(st&&st.includes(v))si=i;});}catch{}return grpIdx(si);};
 const oc=()=>{try{return Q10309.oc();}catch{return null;}};
 const shipLinked=i=>{try{const S=Fusion.getState();return (S.supers||[]).some(q=>(FusionBlueprints.pairs[q.model]||[]).includes(i));}catch{return false;}};
 // ---------- 1. thẻ Túi đồ (chiến cơ + 3 loại trang bị) ----------
 function info(r){const ship=r.dataset.k==='ship',id=r.dataset.id,rr=r.querySelector('.k307-rr');const eq=!!(rr&&rr.querySelector(':scope>s'));
  const o={ship,eq,skill:'',grade:'',lnk:false,oc:false,sss:''};
  if(ship){const i=+id;try{o.skill=Fighters28.profiles[i].weapon||'';}catch{}o.grade=grpIdx(i);const w=oc();o.oc=!!w&&w.ship===i;o.lnk=shipLinked(i);}
  else{let it=null;try{it=Progress.v70.get(id);}catch{}if(it){try{o.skill=(GearCatalog[it.variant]||{}).skill||'';}catch{}o.grade=grpGear(it.variant);const w=oc();o.oc=!!w&&w[it.kind]===it.variant;
    try{const s=Gear44.sssFor(it.variant,it.kind);if(s&&eq){o.lnk=true;o.sss=s;o.grade='SSS';}}catch{}}}
  return o;}
 function card(r){const ri=r.querySelector('.k307-ri'),ic=r.querySelector('.k307-ic'),rr=r.querySelector('.k307-rr');if(!ri||!ic||!rr)return;
  const name=((ri.querySelector(':scope>b')||{}).textContent||'').trim();const tl=((ri.querySelector(':scope>span small')||{}).textContent||'').trim();
  const sm=ri.querySelectorAll(':scope>small');let stat=((sm[sm.length-1]||{}).textContent||'').trim().replace(/^(Giáp|Tên lửa|Tàu con|Chiến cơ) · /,'');
  const n=tierN(tl);const lb=rr.querySelector(':scope>b');const lv=lb?lb.textContent.trim().replace(/^Lv\.?/i,'Lv.'):'';const I=info(r);
  ic.querySelectorAll(':scope>.u2x').forEach(x=>x.remove());
  ic.insertAdjacentHTML('beforeend',`<i class="u2x u2st" style="--sc:${fcol(n<0?0:n)}">${'★'.repeat(n>=0?FR(n)+1:1)}</i>`+(I.grade?`<i class="u2x u2gr g${I.grade}">${I.grade}</i>`:'')+(n===11?'<i class="u2x u2pl mx">MAX</i>':PL(n)?`<i class="u2x u2pl">+${PL(n)}</i>`:''));
  ri.innerHTML=`<p class="u2l1">${I.eq?'<em class="u2eq">ĐANG DÙNG</em>':''}<b>${esc(name)}</b><small>${esc(tl)}</small></p>`+
   `<p class="u2l2"><span class="u2s">${esc(stat)}</span><span class="u2lv">${I.lnk?`<i class="u2ln" title="Đang cấp sức cho Chiến Thần${I.sss?' ('+esc(I.sss)+')':''}"></i>`:''}${esc(lv)}</span>${I.oc?'<span class="u2oc">ϟ Cộng điểm +10%</span>':''}</p>`+
   (I.skill?`<p class="u2l3">Đặc kỹ: <b>${esc(I.skill)}</b></p>`:'');
  r.classList.add('u2c');if(I.lnk)r.classList.add('u2lk');
  for(const m of rr.querySelectorAll('.k9a.m'))if(m.textContent!=='ĐÃ TỐI ĐA')m.textContent='ĐÃ TỐI ĐA';
  r.dataset.u2=1;}
 function bag(){for(const r of document.querySelectorAll('#k307 .k307-row[data-k=item]:not([data-u2]),#k307 .k307-row[data-k=ship]:not([data-u2])'))try{card(r);}catch{}}
 // ---------- 2. danh sách phi công: sao dọc, Lv, mảnh thật, nút trạng thái + chấm đỏ khi làm được ngay ----------
 const LAB={rec:'CHIÊU MỘ',lv:'NÂNG CẤP',tier:'ĐỘT PHÁ',max:'MAX'};
 function ready(id){try{return Pilot67.ready(id);}catch{return null;}}
 function roster(){if(typeof Pilot67==='undefined'||!Pilot67.ready)return;
  for(const b of document.querySelectorAll('.m63.pl67 .pl67-list > button[data-v]')){const id=+b.dataset.v;const R=ready(id);if(!R)continue;let t=0;try{t=Pilot67.tierOf(id);}catch{}
   const k=JSON.stringify(R)+t;if(b.dataset.u2===k&&b.querySelector('.u2pbt'))continue;b.dataset.u2=k;b.classList.add('u2pc');
   const T=(typeof PILOT75!=='undefined'&&PILOT75.tiers&&PILOT75.tiers[t])||{};b.querySelectorAll('.u2p').forEach(x=>x.remove());const own=R.st!=='rec';
   b.insertAdjacentHTML('beforeend',(own?`<i class="u2p u2pst" style="--sc:${T.col||'#cfe4fb'}">${'★'.repeat(FR(t)+1)}</i><i class="u2p u2plv">Lv.${R.lv}/${R.cap}</i>`:'<i class="u2p u2plv no">Chưa có</i>')+
    `<i class="u2p u2psh">Mảnh ${R.pc}${R.st==='tier'?'/'+R.need:''}</i><i class="u2p u2pbt s${R.st}">${LAB[R.st]}</i>`+(R.ok?'<i class="u2p u2dot" title="Làm được ngay">!</i>':''));}
  for(const b of document.querySelectorAll('.m63.pl11 .pl11r > button[data-v]')){const R=ready(+b.dataset.v);const has=!!b.querySelector(':scope>.u2dot');if(R&&R.ok&&!has)b.insertAdjacentHTML('beforeend','<i class="u2p u2dot" title="Làm được ngay">!</i>');else if(!(R&&R.ok)&&has)b.querySelector(':scope>.u2dot').remove();}
  // chú thích luật đội hình ngay trên thanh nút đáy (số đọc từ Pilot67.SUB)
  for(const c of document.querySelectorAll('.m63.pl67 > .m63-card')){const btns=c.querySelector(':scope>.m63-btns');if(!btns)continue;const note=c.querySelector(':scope>.pl67-note');const sub=Math.round((Pilot67.SUB||.05)*1000)/10;
   const res=note&&note.querySelector('b')?' · '+note.querySelector('b').textContent.replace(/^CỘNG HƯỞNG:\s*/i,'Cộng hưởng '):'';const txt=`Lái chính 100% chỉ số + nội tại · Lái phụ +${String(sub).replace('.',',')}% chỉ số/người${res}`;
   let p=c.querySelector(':scope>.u2rule');if(!p||p.nextElementSibling!==btns){if(p)p.remove();p=document.createElement('p');p.className='u2rule';btns.before(p);}if(p.textContent!==txt){p.textContent=txt;p.style.removeProperty('font-size');p.style.whiteSpace='nowrap';}let fs=parseFloat(getComputedStyle(p).fontSize)||9.5;while(p.clientWidth&&p.scrollWidth>p.clientWidth+1&&fs>7.5){fs-=.5;p.style.setProperty('font-size',fs+'px','important');}if(p.scrollWidth>p.clientWidth+1)p.style.whiteSpace='normal';}
  // dòng chỉ số: gắn nhãn "Mảnh" trước biểu tượng mảnh (hết số "0" lẻ không tên)
  for(const st of document.querySelectorAll('.m63.pl67 .pl67-st')){const im=st.querySelector('img.r307i.pc');if(im&&!(im.previousElementSibling&&im.previousElementSibling.classList.contains('u2mk')))im.insertAdjacentHTML('beforebegin','<span class="u2mk">Mảnh</span>');}}
 function tick(){if(!on()||inB())return;try{bag();}catch{}try{roster();}catch{}}
 let busy=false;const mo=new MutationObserver(()=>{if(busy)return;busy=true;requestAnimationFrame(()=>{busy=false;tick();});});
 setInterval(()=>{if(!on()||inB())return;for(const el of document.querySelectorAll('#k307,.m63.pl67,.m63.pl11'))if(!el.__u2){el.__u2=1;mo.observe(el,{childList:true,subtree:true});}tick();},400);
 return {bag,roster,info,tick};
})();
window.U2V23S=U2V23;
