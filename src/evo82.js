// V82 · BỎ PHÔI — NUÔI CHIẾN CƠ / TRANG BỊ THẬT LÀM NGUYÊN LIỆU (Gemini REVIEW82, chủ dự án 25/10)
//  • Mọi nguồn trước đây ra "phôi" giờ ra BẢN SAO Lv1 (V70.phAdd(+n) được đổi hướng sang đây): Trắng/Lục/Lam/Tím → khung Trắng/Lục/Lam/Tím, Lv1.
//  • Bản sao nằm trong KHO BẢN SAO (tối đa 250): nâng cấp, đột phá như món thật, rồi dùng làm nguyên liệu đột phá món chính.
//  • Đột phá 11 bước theo EVO82.step: món chính đạt trần cấp + bản sao cùng mẫu (same) + món cùng loại (any) đạt khung/cấp tối thiểu + bộ NL màu + ◈ + ⬢.
//  • Ăn nguyên liệu hoàn 85% ◈ / 90% ⬢ đã nâng cấp; tách đồ hoàn 80% / 85% + thưởng gốc theo khung.
//  • Đồ S/SS: thiếu bản sao cùng mẫu thì mỗi bản thiếu thay bằng 2 món cùng loại.
//  • Save cũ: phôi Trắng/Lục → ◈ + ⬢ · phôi Lam/Tím → bản sao Lam/Tím Lv1 + ◈. Món đang có giữ nguyên khung và cấp.
//  Tắt: window.EVO82=false (quay về phôi V70)
const EVO82={
 // V307 (chủ dự án chốt 17/11, theo game gốc): Trắng→Lục, Lục→Lam, Lam+3→Tím chỉ cần 1 bộ nguyên liệu (không bản sao);
 //   Lam+1/+2/+3 cần bản sao bậc Lam CÙNG MẪU 1·1·2; Tím+1…+5 cần bản sao bậc Tím cùng mẫu 1·1·2·2·3. Bản sao không cần cấp.
 step:[
  {mainLv:25,same:0,any:0,min:{lv:1,t:0},mat:1,cr:[1500,1050],st:[20,15]},
  {mainLv:35,same:0,any:0,min:{lv:1,t:0},mat:2,cr:[3500,2450],st:[35,25]},
  {mainLv:45,same:1,any:0,min:{lv:1,t:2},mat:0,cr:[5000,3500],st:[45,30]},
  {mainLv:50,same:1,any:0,min:{lv:1,t:2},mat:0,cr:[6500,4550],st:[60,40]},
  {mainLv:55,same:2,any:0,min:{lv:1,t:2},mat:0,cr:[8500,5950],st:[75,55]},
  {mainLv:60,same:0,any:0,min:{lv:1,t:0},mat:3,cr:[12000,8400],st:[100,70]},
  {mainLv:75,same:1,any:0,min:{lv:1,t:6},mat:0,cr:[15000,10500],st:[120,85]},
  {mainLv:80,same:1,any:0,min:{lv:1,t:6},mat:0,cr:[18000,12600],st:[145,100]},
  {mainLv:85,same:2,any:0,min:{lv:1,t:6},mat:0,cr:[22000,15400],st:[175,120]},
  {mainLv:90,same:2,any:0,min:{lv:1,t:6},mat:0,cr:[27000,18900],st:[210,145]},
  {mainLv:95,same:3,any:0,min:{lv:1,t:6},mat:0,cr:[35000,24500],st:[260,180]}],
 refund:{cr:.85,st:.90,sCr:.80,sSt:.85,base:[300,800,2000,2000,2000,2000,6000,6000,6000,6000,6000,6000]},
 phTier:[0,1,2,6],
 mig:{0:{cr:1500,st:15},1:{cr:4000,st:40},2:{cr:2500},3:{cr:8000}},
 inv:{cap:250,warn:235},
 drop:{equipment:[[85,15,0],[70,28,2],[55,40,5],[40,50,10]],chestB:[80,20,0],chestA:[55,40,5],
  boss:[[60,.35,[100,0,0]],[120,.45,[70,30,0]],[999,.55,[50,45,5]]],
  rare:{B:{S:.01,SS:.0015,APEX:.0005},A:{S:.02,SS:.004,APEX:.0015}},ownedMult:3,smart:.35}};
const Evo82=(()=>{
 const KEY='saobang-evo82';const on=()=>window.EVO82!==false&&typeof V70!=='undefined';
 let S={v:1,c:[],seq:0,mig:0};try{const v=JSON.parse(localStorage.getItem(KEY)||'null');if(v&&typeof v==='object')S=Object.assign(S,v);}catch{}if(!Array.isArray(S.c))S.c=[];
 const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S));}catch{}};
 const T=()=>TIER70,fmt=n=>Math.round(n).toLocaleString('vi-VN'),esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 const TN=t=>{try{return TIER70.name[t];}catch{return ''+t;}},FC=t=>{try{return TIER70.fcol[TIER70.frame[t]];}catch{return '#9fb6cf';}},CAP=t=>{try{return TIER70.cap[t];}catch{return 25;}};
 const slotOf=(k,m)=>k==='craft'?'craft':(()=>{try{return GearCatalog[m].kind;}catch{return 'armor';}})();
 const SLOTN={craft:'Chiến cơ',armor:'Giáp',missiles:'Tên lửa',sidearm:'Vũ khí phụ'};
 const nameOf=(k,m)=>{try{return k==='craft'?Fighters28.profiles[m].name:GearCatalog[m].name;}catch{return String(m);}};
 function groupOf(k,m){let si=-1;if(k==='craft')si=m|0;else{try{Campaign36.sets.forEach((s,i)=>{if(s&&s.includes(m))si=i;});}catch{}}return si>=7?'SS':si>=5?'S':'';}// bộ 10–12 (APEX) tính như SS cho luật thay bản sao
 const TH={};function shipThumb(i){if(TH[i])return TH[i];try{const im=(typeof Evo53!=='undefined'&&Evo53.hull)?Evo53.hull(i):fighterAtlasV22;const w=(im.naturalWidth||im.width)/5,h=(im.naturalHeight||im.height)/4,c=document.createElement('canvas');c.width=c.height=96;c.getContext('2d').drawImage(im,i%5*w,Math.floor(i/5)*h,w,h,0,0,96,96);return TH[i]=c.toDataURL();}catch{return '';}}
 function artOf(k,m,t){if(k==='craft'){const s=(window.UI17!==false&&typeof window.SHIPART17==='function'&&SHIPART17(m|0,t))||shipThumb(m|0);/* V309 L17: ảnh chiến cơ chuẩn SHIP118 thay atlas cũ */return s?`<img src="${s}" alt="">`:'✈';}
  try{const al=(typeof GEAR81_DATA!=='undefined'&&GEAR81_DATA[m])?GEAR81_DATA[m].art:m;const A=typeof GEAR44_ASSETS!=='undefined'?GEAR44_ASSETS:{},E=typeof EVO53_ART!=='undefined'?EVO53_ART:{};const src=A[m+'_icon']||A[al+'_icon']||E['g:'+al+'_icon_evo1'];if(src)return `<img src="${src}" alt="" class="${al!==m?'g81':''}">`;}catch{}return '⚙';}
 // ---------- kho bản sao ----------
 const lvCost=lv=>({cr:19*lv,st:Math.ceil(lv/13)});
 function salvageGain(c){const R=EVO82.refund;return {cr:Math.floor((c.cr|0)*R.sCr)+(R.base[c.t]||300),st:Math.floor((c.st|0)*R.sSt)};}
 function addCopy(k,m,t=0,lv=1,quiet){if(k==='craft')m=m|0;if(S.c.length>=EVO82.inv.cap){// đầy kho: tách tự động bản Trắng Lv1 thấp nhất (không khóa)
   const i=(t|0)>0?S.c.findIndex(c=>!c.lk&&c.t===0&&c.lv<=1):-1;if(i>=0){const g=salvageGain(S.c[i]);S.c.splice(i,1);try{Progress.grantCredits(g.cr);}catch{}}else{try{Progress.grantCredits(EVO82.refund.base[t]||300);}catch{}save();if(!quiet)try{toast('KHO BẢN SAO ĐẦY · đổi thành hợp kim');}catch{}return null;}}
  const c={u:++S.seq,k,m,t:Math.max(0,Math.min(11,t|0)),lv:Math.max(1,lv|0),lk:0,cr:0,st:0,ts:Date.now()};S.c.push(c);save();
  if(!quiet&&S.c.length>=EVO82.inv.warn)try{toast('KHO BẢN SAO '+S.c.length+'/'+EVO82.inv.cap+' · nên tách đồ thừa');}catch{}return c;}
 const get=u=>S.c.find(c=>c.u===+u);
 function removeCopy(u){const i=S.c.findIndex(c=>c.u===+u);if(i>=0)S.c.splice(i,1);}
 function levelCopy(u,to){const c=get(u);if(!c)return 0;to=Math.min(CAP(c.t),to|0);let n=0;
  while(c.lv<to){const q=lvCost(c.lv);if(Progress.balance()<q.cr||(Workshop.getState().exp|0)<q.st)break;if(!Progress.spendCredits(q.cr))break;if(!Workshop.exp70(-q.st)){Progress.grantCredits(q.cr);break;}c.cr+=q.cr;c.st+=q.st;c.lv++;n++;}
  if(n)save();return n;}
 function costTo(c,to){let cr=0,st=0;for(let l=c.lv;l<Math.min(CAP(c.t),to);l++){const q=lvCost(l);cr+=q.cr;st+=q.st;}return {cr,st};}
 function salvage(u,quiet){const c=get(u);if(!c||c.lk)return null;const g=salvageGain(c);removeCopy(u);save();try{Progress.grantCredits(g.cr);if(g.st)Workshop.exp70(g.st);}catch{}if(!quiet)try{toast('TÁCH · +'+fmt(g.cr)+' ◈'+(g.st?' · +'+g.st+' ⬢':''));}catch{}return g;}
 // ---------- mục tiêu đột phá: món chính hoặc bản sao ----------
 function tgt(kind,ref){if(kind==='copy'){const c=get(ref);if(!c)return null;return {copy:c,k:c.k,m:c.m,slot:slotOf(c.k,c.m),t:c.t,lv:c.lv,g:groupOf(c.k,c.m)};}
  let o=null;try{o=kind==='craft'?Workshop.craftProgress(ref|0):Progress.v70.get(ref);}catch{}if(!o)return null;const m=kind==='craft'?(ref|0):o.variant;
  let t=0;try{t=kind==='craft'?V70.craftN(ref|0):V70.nOf(o)|0;}catch{}let g=groupOf(kind,m);try{const gr=o.grade||o.rank;if(gr==='S'||gr==='SS')g=gr;}catch{}
  return {k:kind,m,ref,slot:slotOf(kind,m),t,lv:o.level|0,g};}
 // V307 (18/11): trang bị cùng mẫu nằm trong túi (không mặc, không hợp thể) cũng tính là bản sao khi tiến khung — như game cùng thể loại. Tắt: window.TB307V=false
 function virt(kind,ref){if(kind!=='gear'||window.TB307V===false)return [];let eq=[];try{eq=Object.values(Progress.v70.equipped()||{});}catch{}let L=[];try{L=Progress.v70.items();}catch{}
  return L.filter(i=>i.id!==ref&&!eq.includes(i.id)&&!i.super&&!i.key&&!i.fusion&&!i.directFusion).map(i=>{let t=0;try{t=V70.nOf(i)|0;}catch{}return {u:'i:'+i.id,vi:i.id,k:'gear',m:i.variant,t,lv:i.level|0||1,lk:0,cr:0,st:0};});}
 const elig=(c,min,ex)=>!c.lk&&c.u!==ex&&c.t>=min.t&&c.lv>=min.lv;
 function plan(kind,ref){const x=tgt(kind,ref);if(!x)return null;if(x.t>=11)return {x,max:true};const st=EVO82.step[x.t],K=x.k==='craft'?0:1,ex=x.copy?x.copy.u:-1;
  const same=S.c.concat(virt(x.k,ref)).filter(c=>c.k===x.k&&c.m==x.m&&elig(c,st.min,ex)).sort((a,b)=>a.t-b.t||(!!a.vi)-(!!b.vi)||a.lv-b.lv);
  // V307 (chủ dự án chốt 17/11): tiến khung CHỈ nhận bản sao CÙNG MẪU — phần 'cùng loại' cũ gộp vào số bản sao cùng mẫu. Tắt: window.CUNGMAU307=false
  const CM=window.CUNGMAU307!==false;const pick=[];let needSame=CM?st.same+st.any:st.same,needAny=CM?0:st.any;const useS=same.slice(0,needSame);pick.push(...useS);let miss=needSame-useS.length;
  let wild=0;if(!CM&&miss>0&&(x.g==='S'||x.g==='SS')){wild=miss;needAny+=miss*2;miss=0;}
  const anyPool=S.c.filter(c=>slotOf(c.k,c.m)===x.slot&&elig(c,st.min,ex)&&!pick.includes(c)).sort((a,b)=>(a.m==x.m)-(b.m==x.m)||a.t-b.t||a.lv-b.lv);
  const useA=anyPool.slice(0,needAny);pick.push(...useA);const missA=needAny-useA.length;
  // ứng viên chưa đủ cấp (đúng khung) → nâng nhanh
  const low=(arr)=>arr.filter(c=>!c.lk&&c.u!==ex&&c.t>=st.min.t&&c.lv<st.min.lv&&!pick.includes(c)).sort((a,b)=>b.lv-a.lv);
  const lowSame=low(S.c.filter(c=>c.k===x.k&&c.m==x.m)),lowAny=low(S.c.filter(c=>slotOf(c.k,c.m)===x.slot));
  const mats=st.mat?MAT69.types.map(ty=>({id:ty.id+st.mat,n:1,have:V70.have(ty.id+st.mat)})):[];
  const cr=st.cr[K],stone=st.st[K];let rf={cr:0,st:0};for(const c of pick){rf.cr+=Math.floor(c.cr*EVO82.refund.cr);rf.st+=Math.floor(c.st*EVO82.refund.st);}
  const L=[];if(x.lv<st.mainLv)L.push('Cấp món chính '+x.lv+'/'+st.mainLv);if(miss>0)L.push('Thiếu '+miss+' bản sao cùng mẫu');if(missA>0)L.push('Thiếu '+missA+' món cùng loại');
  for(const q of mats)if(q.have<q.n)L.push('Thiếu '+V70.matName(q.id));let bal=0,ex2=0;try{bal=Progress.balance();ex2=Workshop.getState().exp|0;}catch{}if(bal<cr)L.push('Thiếu hợp kim');if(ex2<stone)L.push('Thiếu đá');
  return {x,st,pick,needSame,needAny,miss,missA,wild,lowSame,lowAny,mats,cr,stone,rf,lacks:L,ok:!L.length};}
 function doBreak(kind,ref){const p=plan(kind,ref);if(!p||p.max)return false;if(!p.ok){try{toast(p.lacks[0].toUpperCase());}catch{}return false;}
  if(!Progress.spendCredits(p.cr))return false;if(!Workshop.exp70(-p.stone)){Progress.grantCredits(p.cr);return false;}
  for(const q of p.mats)V70.add(q.id,-q.n);for(const c of p.pick){if(c.vi){try{Progress.v70.remove(c.vi);}catch{}}else removeCopy(c.u);}
  try{if(p.rf.cr)Progress.grantCredits(p.rf.cr);if(p.rf.st)Workshop.exp70(p.rf.st);}catch{}
  const nt=p.x.t+1;if(p.x.copy){p.x.copy.t=nt;}else{try{V70.setTier(p.x.k,p.x.ref,nt);}catch{}}save();
  try{V70.sync&&V70.sync();}catch{}try{Progress.render();}catch{}
  try{toast('★ ĐỘT PHÁ · '+nameOf(p.x.k,p.x.m).toUpperCase()+' → '+TN(nt).toUpperCase()+(p.rf.cr?' · hoàn '+fmt(p.rf.cr)+' ◈':''));}catch{}return true;}
 // ---------- phôi → bản sao ----------
 function fromPh(kind,model,col,n){for(let i=0;i<(n|0);i++)addCopy(kind==='craft'?'craft':'gear',model,EVO82.phTier[col]??0,1,true);}
 function migrate(){if(S.mig||!on())return;let ph={};try{ph=V70.phList();}catch{return;}let cr=0,st=0,cp=0;
  for(const key in ph){const n=ph[key]|0;if(!n)continue;const mm=key.match(/^(c(\d+)|g:(.+)):([0-3])$/);if(!mm)continue;const col=+mm[4],kind=mm[2]!=null?'craft':'gear',model=mm[2]!=null?+mm[2]:mm[3];
   const R=EVO82.mig[col];if(col<=1){cr+=R.cr*n;st+=R.st*n;}else{for(let i=0;i<n;i++)if(addCopy(kind,model,EVO82.phTier[col],1,true))cp++;cr+=R.cr*n;}
   try{V70.phAdd(kind,model,col,-n);}catch{}}
  S.mig=1;save();try{if(cr)Progress.grantCredits(cr);if(st)Workshop.exp70(st);}catch{}
  if(cr||cp)setTimeout(()=>{try{toast('V82 · PHÔI CŨ ĐÃ QUY ĐỔI: +'+fmt(cr)+' ◈'+(st?' · +'+st+' ⬢':'')+(cp?' · '+cp+' bản sao Lam/Tím':''));}catch{}},1800);}
 // ---------- giao diện ----------
 let el=null,ctx=null,tab='craft',view='brk';
 function build(){el=document.createElement('div');el.className='m63 adv69 adv70 ev82';el.hidden=true;document.body.appendChild(el);
  el.addEventListener('click',e=>{const b=e.target.closest('[data-e]');if(!b){if(e.target===el)close();return;}e.preventDefault();e.stopPropagation();const a=b.dataset.e,v=b.dataset.v;
   if(a==='x')return close();
   if(a==='go'){if(doBreak(ctx.kind,ctx.ref))render();else render();return;}
   if(a==='inv'){view='inv';render();return;}
   if(a==='back'){view=ctx?'brk':'inv';if(!ctx)close();else render();return;}
   if(a==='tab'){tab=v;render();return;}
   if(a==='lk'){const c=get(v);if(c){c.lk=c.lk?0:1;save();}render();return;}
   if(a==='lv10'){const c=get(v);if(c){const n=levelCopy(v,c.lv+10);if(!n)toast('THIẾU HỢP KIM / ĐÁ');}render();return;}
   if(a==='lvmax'){const c=get(v);if(c){const n=levelCopy(v,CAP(c.t));if(!n)toast('THIẾU HỢP KIM / ĐÁ');}render();return;}
   if(a==='qk'){const [u,to]=v.split('|');const n=levelCopy(u,+to);if(!n)toast('THIẾU HỢP KIM / ĐÁ');render();return;}
   if(a==='cbrk'){ctx={kind:'copy',ref:+v};view='brk';render();return;}
   if(a==='sv'){salvage(v);render();return;}
   if(a==='junk'){let n=0,cr=0;for(const c of S.c.slice())if(!c.lk&&c.t===0&&c.lv<=1){const g=salvage(c.u,true);if(g){n++;cr+=g.cr;}}toast(n?'TÁCH '+n+' BẢN SAO TRẮNG LV1 · +'+fmt(cr)+' ◈':'KHÔNG CÓ BẢN TRẮNG LV1 CHƯA KHÓA');render();return;}
  });}
 function close(){if(el)el.hidden=true;try{Progress.render();}catch{}}
 const tag=t=>`<span class="fr70" style="--fc:${FC(t)}">${esc(TN(t))}</span>`;
 function copyCard(c,extra=''){return `<div class="ev82c ${c.lk?'lk':''}" style="--fc:${FC(c.t)}"><span class="ev82a">${artOf(c.k,c.m,c.t)}</span><b>${esc(nameOf(c.k,c.m))}</b><small>${esc(TN(c.t))} · Lv ${c.lv}/${CAP(c.t)}</small>${extra}</div>`;}
 function brkHtml(){const p=plan(ctx.kind,ctx.ref);if(!p){ctx=null;return invHtml();}const x=p.x,title=nameOf(x.k,x.m),isC=!!x.copy;
  if(p.max)return `<div class="m63-eye">ĐỘT PHÁ${isC?' BẢN SAO':''}</div><h3>${esc(title)} ${tag(x.t)}</h3><p class="adv-max">Đã đạt khung cao nhất: <b>Tím +5</b>.</p><div class="adv-btns"><button class="adv-x" data-e="inv">KHO BẢN SAO</button><button class="adv-x" data-e="x">ĐÓNG</button></div>`;
  const st=p.st,nt=x.t+1;
  const slot=(c,needLabel,lowList)=>{if(c)return copyCard(c,c.t>st.min.t||c.lv>st.min.lv+10?'<i class="no">⚠ CAO HƠN YÊU CẦU · mở kho để 🔒 nếu muốn giữ</i>':'<i class="ok">✓ ĐÃ CHỌN</i>');const lo=lowList[0];
   if(lo){const q=costTo(lo,st.min.lv);return copyCard(lo,`<button data-e="qk" data-v="${lo.u}|${st.min.lv}" class="hot">⚡ NÂNG NHANH Lv${st.min.lv}<small>${fmt(q.cr)} ◈ · ${q.st} ⬢</small></button>`);}
   return `<div class="ev82c empty" style="--fc:${FC(st.min.t)}"><span class="ev82a">?</span><b>${esc(needLabel)}</b><small>Cần ${esc(TN(st.min.t))} · Lv ${st.min.lv}</small></div>`;};
  const sameSel=p.pick.slice(0,p.needSame-p.wild),anySel=p.pick.slice(p.needSame-p.wild);const used=new Set(p.pick.map(c=>c.u));
  const ls=p.lowSame.filter(c=>!used.has(c.u)),la=p.lowAny.filter(c=>!used.has(c.u));
  let slots='';for(let i=0;i<p.needSame-p.wild;i++)slots+=slot(sameSel[i],'Bản sao '+title,i<sameSel.length?[]:ls.splice(0,1));
  for(let i=0;i<p.needAny;i++)slots+=slot(anySel[i],SLOTN[x.slot]+' bất kỳ',i<anySel.length?[]:la.splice(0,1));
  const mats=p.mats.length?`<div class="adv-req-t">BỘ NGUYÊN LIỆU · ${esc(MAT69.tiers[st.mat-1].n.toUpperCase())}</div><div class="adv-req">${p.mats.map(m=>`<span class="adv-m ${m.have>=m.n?'ok':'no'}" style="--mc:${MAT69.tiers[st.mat-1].c}"><img src="${V70.icon(m.id)}" alt=""><small>${esc(V70.matName(m.id))}</small><b>${m.have}/${m.n}</b></span>`).join('')}</div>`:'';
  return `<div class="m63-eye">ĐỘT PHÁ${isC?' BẢN SAO':''} · ${esc(SLOTN[x.slot]).toUpperCase()}</div><h3>${esc(title)} ${tag(x.t)} → ${tag(nt)}</h3>
   <p class="ev82n">Cấp: <b class="${x.lv>=st.mainLv?'ok':'no'}">${x.lv}/${st.mainLv}</b> · trần mới Lv ${CAP(nt)}${x.g?` · bậc ${x.g}`:''}${p.wild?` · <span class="ok">thiếu bản sao → dùng ${p.wild*2} món cùng loại thay</span>`:''}</p>
   ${(p.needSame||p.needAny)?`<div class="adv-req-t">NGUYÊN LIỆU (${p.needSame-p.wild?(p.needSame-p.wild)+' cùng mẫu':''}${p.needSame-p.wild&&p.needAny?' + ':''}${p.needAny?p.needAny+' cùng loại':''} · ${esc(TN(st.min.t))} Lv${st.min.lv}+)</div><div class="ev82g">${slots}</div>`:''}
   ${mats}
   <p class="adv-cost">Chi phí: <b>${fmt(p.cr)} ◈ · ${p.stone} ⬢</b>${p.rf.cr||p.rf.st?`<br><span class="ok">Hoàn lại khi ghép: +${fmt(p.rf.cr)} ◈ · +${p.rf.st} ⬢</span>`:''}${p.lacks.length?`<br><span class="no">${esc(p.lacks.slice(0,2).join(' · '))}</span>`:''}</p>
   <p class="ev82n">Tự chọn món thấp nhất, không lấy món đã 🔒. Bản sao lấy từ Vô tận, phó bản trang bị, ải boss, quà thành tựu.</p>
   <div class="adv-btns"><button class="m63-go ${p.ok?'':'off'}" data-e="go">${p.ok?'★ ĐỘT PHÁ → '+esc(TN(nt).toUpperCase()):'CHƯA ĐỦ ĐIỀU KIỆN'}</button><button class="adv-x" data-e="inv">KHO BẢN SAO</button><button class="adv-x" data-e="x">ĐÓNG</button></div>`;}
 function invHtml(){const list=S.c.filter(c=>slotOf(c.k,c.m)===tab).sort((a,b)=>b.t-a.t||b.lv-a.lv||String(a.m).localeCompare(String(b.m)));
  const rows=list.slice(0,80).map(c=>{const cap=CAP(c.t),q=costTo(c,Math.min(cap,c.lv+10));const sg=salvageGain(c);
   return copyCard(c,`<span class="ev82b"><button data-e="lv10" data-v="${c.u}" ${c.lv>=cap?'disabled':''}>+10 cấp<small>${fmt(q.cr)}◈ ${q.st}⬢</small></button><button data-e="lvmax" data-v="${c.u}" ${c.lv>=cap?'disabled':''}>MAX</button><button data-e="cbrk" data-v="${c.u}" ${c.t>=11?'disabled':''}>ĐỘT PHÁ</button><button data-e="lk" data-v="${c.u}">${c.lk?'🔒':'🔓'}</button><button data-e="sv" data-v="${c.u}" ${c.lk?'disabled':''}>TÁCH<small>+${fmt(sg.cr)}◈</small></button></span>`);}).join('');
  const cnt=k=>S.c.filter(c=>slotOf(c.k,c.m)===k).length;
  return `<div class="m63-eye">KHO BẢN SAO · ${S.c.length}/${EVO82.inv.cap}</div><h3>NGUYÊN LIỆU ĐỘT PHÁ</h3>
   <div class="ex67-tabs ev82t">${Object.keys(SLOTN).map(k=>`<button data-e="tab" data-v="${k}" aria-pressed="${tab===k}">${SLOTN[k]} (${cnt(k)})</button>`).join('')}</div>
   <p class="ev82n">Nâng bản sao lên đủ khung/cấp rồi dùng làm nguyên liệu đột phá. Ghép hoàn 85% ◈ · 90% ⬢ đã nâng; tách hoàn 80% · 85% + thưởng theo khung.</p>
   <div class="ev82l">${rows||'<p class="ev82n">Chưa có bản sao loại này.</p>'}${list.length>80?'<p class="ev82n">… và '+(list.length-80)+' món nữa</p>':''}</div>
   <div class="adv-btns"><button class="adv-x" data-e="junk">TÁCH HẾT TRẮNG LV1</button>${ctx?'<button class="adv-x" data-e="back">‹ QUAY LẠI</button>':''}<button class="adv-x" data-e="x">ĐÓNG</button></div>`;}
 function render(){if(!el)build();el.innerHTML=`<div class="m63-card adv-card ev82k">${view==='inv'||!ctx?invHtml():brkHtml()}</div>`;el.hidden=false;}
 function open(kind,ref){if(!el)build();ctx={kind:kind==='gear'?'gear':'craft',ref:kind==='gear'?ref:(ref|0)};view='brk';tab=ctx.kind==='craft'?'craft':slotOf('gear',(()=>{try{return Progress.v70.get(ref).variant;}catch{return '';}})());render();}
 function inv(k){if(!el)build();ctx=null;view='inv';if(k)tab=k;render();}
 function btnTxt(kind,ref){const p=plan(kind,ref);if(!p||p.max)return 'ĐỘT PHÁ<small>Tím +5 · tối đa</small>';return 'ĐỘT PHÁ → '+esc(TN(p.x.t+1).toUpperCase())+'<small>'+(p.ok?'Đủ điều kiện!':esc(p.lacks[0]))+'</small>';}
 const count=(k,m)=>S.c.filter(c=>c.k===k&&c.m==m).length;
 // ---------- rơi ở ải boss: theo dải ải (Gemini), ải mini chỉ còn nguyên liệu ----------
 function installDrops(){try{if(!on()||TIER70.__e82)return;const P=TIER70.phDrop;P.mini={p:0,w:[1,0,0,0]};
   Object.defineProperty(P,'boss',{configurable:true,get(){let lv=1;try{lv=level|0;}catch{}const b=EVO82.drop.boss.find(r=>lv<=r[0])||EVO82.drop.boss[2];return {p:b[1],w:[...b[2],0]};}});TIER70.__e82=1;}catch{}}
 setTimeout(()=>{try{migrate();installDrops();}catch(e){console.warn('evo82',e);}},900);
 // nút mở kho bản sao ở Kho (cạnh NGUYÊN LIỆU)
 setInterval(()=>{try{if(!on())return;const fx=document.querySelector('#hgr41 .h1-fx');if(fx&&!fx.querySelector('[data-ev82]')){const b=document.createElement('button');b.dataset.ev82='inv';b.className='adv69b';b.textContent='KHO BẢN SAO';b.addEventListener('click',e=>{e.stopPropagation();inv();});fx.appendChild(b);}}catch{}},900);
 return {on,open,inv,plan,doBreak,addCopy,take:u=>{const c=get(u);if(!c||c.lk)return false;removeCopy(u);save();return true;},levelCopy,salvage,fromPh,count,btnTxt,list:()=>S.c.slice(),state:()=>({n:S.c.length,mig:S.mig}),groupOf,_reset:()=>{S={v:1,c:[],seq:0,mig:1};save();}};
})();
window.Evo82=Evo82;
