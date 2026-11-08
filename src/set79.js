// V79 · THÀNH TỰU TẶNG BỘ CHIẾN CƠ + TRANG BỊ (thay phôi mốc ải 20/40/60…)
//  Mỗi bộ = 1 chiến cơ + 3 trang bị của một chương. Mỗi bộ có 3 bậc nhận theo tiến độ ải:
//   Lục (mở khóa cả bộ ở khung Lục) → Lam (nâng lên Lam + 1 phôi Lam/món) → Tím (nâng lên Tím + 2 phôi Tím/món). Kèm hợp kim, đá, 1 bộ nguyên liệu.
//  Nhận xong bậc Tím → mở bộ kế tiếp. Món nào đã cao hơn bậc quà thì nhận 1 phôi cùng màu thay thế.
//  Tắt: window.SET79=false
const Set79=(()=>{
 const KEY='saobang-set79';
 // V79 · số chốt theo Gemini REVIEW79: 4 bộ (chiến cơ #2–#5 + bộ trang bị chương 1–4), mốc = ải cao nhất đã vượt + tổng sao chiến dịch
 //  c = chỉ số chiến cơ (0–9) · g = chỉ số bộ trang bị trong Campaign36.sets · n = nấc phẩm chất · ph = phôi tặng thêm mỗi món · dup = phôi thay thế khi món đã cao hơn
 const X=(cr,st,mat,ph,dup)=>({cr,st,mat,ph,dup});
 const SETS=[
  {c:1,g:1,steps:[{n:1,need:10,stars:0,x:X(4000,50,1,0,1)},{n:2,need:25,stars:40,x:X(10000,120,2,1,2)},{n:6,need:50,stars:90,x:X(25000,250,3,2,3)}]},
  {c:2,g:2,steps:[{n:1,need:55,stars:100,x:X(6000,70,1,0,1)},{n:2,need:70,stars:130,x:X(14000,150,2,1,2)},{n:6,need:90,stars:170,x:X(30000,300,3,2,3)}]},
  {c:3,g:3,steps:[{n:1,need:95,stars:180,x:X(8000,90,1,0,1)},{n:2,need:110,stars:210,x:X(18000,180,2,1,2)},{n:6,need:130,stars:250,x:X(35000,350,3,2,3)}]},
  {c:4,g:4,steps:[{n:1,need:135,stars:260,x:X(10000,110,1,0,1)},{n:2,need:145,stars:280,x:X(22000,220,2,1,2)},{n:6,need:160,stars:310,x:X(45000,450,3,2,3)}]}];
 const FR=['Trắng','Lục','Lam','Tím'],FC=['#d6e0ea','#3ee08f','#3aa8ff','#b45cff'];
 const frameOf=n=>n>=6?3:n>=2?2:n>=1?1:0;
 let S={k:0,s:0,ids:{}};try{const v=JSON.parse(localStorage.getItem(KEY)||'null');if(v&&typeof v==='object')S=Object.assign(S,v);}catch{}
 const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S));}catch{}};
 const on=()=>window.SET79!==false;
 const stars=()=>{try{const o=Campaign36.getState().stars||{};let t=0;for(const k in o)t+=o[k]|0;return t;}catch{return 0;}};
 const best=()=>{try{const c=Progress.getState().cleared||[];return c.length?Math.max(...c):0;}catch{return 0;}};
 const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 function pieces(k){const d=SETS[k];if(!d)return [];let models=[];try{models=Campaign36.sets[d.g]||[];}catch{}
  const out=[{kind:'craft',model:d.c,name:(()=>{try{return Fighters28.profiles[d.c].name;}catch{try{return crafts[d.c].name;}catch{return 'Chiến cơ '+(d.c+1);}}})()}];
  for(const m of models){let nm=m;try{nm=GearCatalog[m].name;}catch{}out.push({kind:'gear',model:m,name:nm});}return out;}
 const setName=k=>{try{return 'BỘ '+CHAPTERS36[SETS[k].c-1].set;}catch{return 'BỘ '+(k+1);}};
 function cur(){if(S.k>=SETS.length)return null;const d=SETS[S.k],st=d.steps[S.s];return st?{d,st,ready:best()>=st.need&&stars()>=(st.stars||0)}:null;}
 const ready=()=>{if(!on())return false;const c=cur();return !!(c&&c.ready);};
 function gearId(model){const id=S.ids[model];try{const its=Progress.getState().items||[];if(id&&its.some(i=>i.id===id))return id;const f=its.find(i=>i.variant===model);if(f){S.ids[model]=f.id;return f.id;}}catch{}return null;}
 function claim(){const c=cur();if(!c||!c.ready)return false;const n=c.st.n,fr=frameOf(n),x=c.st.x||{},got=[];
  for(const p of pieces(S.k)){
   let ref=p.model;
   if(p.kind==='craft'){let owned=false;try{owned=Campaign36.ownsCraft(p.model);}catch{}if(!owned){try{Campaign36.acquire('craft',p.model,'','story');}catch{}}}
   else{ref=gearId(p.model);if(!ref){try{const r=Campaign36.acquire('gear',p.model,'','story');if(r&&r.item){ref=r.item.id;S.ids[p.model]=ref;}}catch{}}if(!ref)continue;}
   if((window.Evo82&&Evo82.on())&&S.s>0){const nC=S.s===1?1:2,tC=S.s===1?1:2;for(let q=0;q<nC;q++)Evo82.addCopy(p.kind==='craft'?'craft':'gear',p.model,tC,1,true);got.push(p.name);continue;}
   let up=false;try{up=V70.setTier(p.kind,ref,n);}catch{}
   if(!up&&x.dup){try{V70.phAdd(p.kind,p.model,fr,x.dup);}catch{}}
   if(x.ph&&!(window.Evo82&&Evo82.on())){try{V70.phAdd(p.kind,p.model,fr,x.ph);}catch{}}
   got.push(p.name);}
  try{if(x.cr)Progress.grantCredits(x.cr);}catch{}try{if(x.st)Workshop.exp70(x.st);}catch{}
  try{if(x.mat)for(const t of MAT69.types)V70.add(t.id+x.mat,1);}catch{}
  const label=setName(S.k)+' · '+((window.Evo82&&Evo82.on())&&S.s>0?(S.s===1?'+1 BẢN SAO LỤC/MÓN':'+2 BẢN SAO LAM/MÓN'):FR[fr].toUpperCase());
  S.s++;if(S.s>=SETS[S.k].steps.length){S.k++;S.s=0;}save();
  try{V70.sync&&V70.sync();}catch{}try{Progress.render();}catch{}try{Workshop.render&&Workshop.render();}catch{}
  try{toast('🏆 '+label+' · '+got.length+' món'+(x.ph&&!(window.Evo82&&Evo82.on())?' + '+x.ph+' phôi '+FR[fr]+'/món':'')+(x.cr?' · +'+x.cr.toLocaleString('vi-VN')+' ◈':''));}catch{}
  return true;}
 function html(){if(!on())return '';const c=cur();
  if(!c)return `<div class="s79"><div class="s79h"><b>QUÀ BỘ CHIẾN CƠ</b><small>Đã nhận đủ ${SETS.length} bộ</small></div></div>`;
  const ps=pieces(S.k),b=best();
  const steps=c.d.steps.map((st,i)=>{const f=frameOf(st.n),done=i<S.s,now=i===S.s;
   const sv=stars(),okS=sv>=(st.stars||0);const ok2=now&&b>=st.need&&okS;
   return `<div class="s79s ${done?'done':''} ${now?'now':''}" style="--c:${FC[f]}"><i>${FR[f]}</i><small>${done?'Đã nhận':'Ải '+st.need+(st.stars?' · '+st.stars+'★':'')}</small>${now?`<button data-s79="claim" ${ok2?'':'disabled'}>${ok2?'NHẬN':(b<st.need?'Ải '+Math.min(b,st.need)+'/'+st.need:sv+'/'+st.stars+'★')}</button>`:''}</div>`;}).join('');
  return `<div class="s79"><div class="s79h"><b>QUÀ ${esc(setName(S.k))} · ${S.k+1}/${SETS.length}</b><small>Nguyên bộ: chiến cơ + giáp + tên lửa + vũ khí phụ · phẩm chất tăng dần Lục → Lam → Tím</small></div>
   <div class="s79p u19set f${frameOf(c.st.n)}">${ps.map(p=>`<div class="u19c" title="${esc(p.name)}"><span class="u19a">${(window.Ui19&&Ui19.pieceArt)?Ui19.pieceArt(p.kind,p.model):(p.kind==='craft'?'✈':'⚙')}</span><small>${esc(p.name)}</small><em class="u19k">${p.kind==='craft'?'CHIẾN CƠ':(()=>{try{return {armor:'GIÁP',missiles:'TÊN LỬA',sidearm:'VŨ KHÍ PHỤ'}[GearCatalog[p.model].kind]||'';}catch{return '';}})()}</em></div>`).join('')}</div><div class="s79r">${steps}</div>
   <p class="s79n">${(window.Evo82&&Evo82.on())?'Bậc 1: mở nguyên bộ ở khung Lục · Bậc 2: +1 bản sao Lục Lv1/món + bộ nguyên liệu Lam · Bậc 3: +2 bản sao Lam Lv1/món + bộ nguyên liệu Tím. Tự nâng bản sao rồi đột phá. Kèm hợp kim và đá.':'Mỗi bậc kèm hợp kim, đá và 1 bộ nguyên liệu. Bậc Lam +1 phôi Lam/món · bậc Tím +2 phôi Tím/món (lên ngay Tím +2). Món đã cao hơn bậc quà → nhận phôi cùng màu thay thế.'}</p></div>`;}
 function mount(){if(!on())return;const a=document.querySelector('.ach');if(!a)return;const host=a.parentNode;let el=host.querySelector('.s79');const h=html();
  if(!el){const w=document.createElement('div');w.innerHTML=h;el=w.firstElementChild;host.insertBefore(el,a);}else if(el.dataset.h!==h){const w=document.createElement('div');w.innerHTML=h;const n=w.firstElementChild;n.dataset.h=h;el.replaceWith(n);el=n;}
  el.dataset.h=h;}
 function dots(){if(!ready())return;for(const e of document.querySelectorAll('[data-go="ach"] .h1-dot,#lb-ach i'))e.hidden=false;}
 document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-s79="claim"]');if(!b)return;e.preventDefault();e.stopPropagation();if((window.Set79||{claim}).claim())setTimeout(mount,30);},true);
 setInterval(()=>{try{mount();dots();}catch{}},500);
 return {state:()=>({...S,best:best(),ready:ready()}),claim,ready,SETS,_reset:()=>{S={k:0,s:0,ids:{}};save();}};
})();
window.Set79=Set79;
