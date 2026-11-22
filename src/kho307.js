'use strict';
// V307 · KHO TRANG BỊ 1 MÀN + TÚI ĐỒ (học cách bố trí của game cùng thể loại · chủ dự án duyệt 17/11/2026)
//  • Màn Kho: xem trước tàu + 3 ô đang mặc (giữ của Hub40) + cộng hưởng; dưới là 2 nút NÂNG CẤP · TIẾN KHUNG (theo ô đang chọn)
//    và 1 nút TÚI ĐỒ. Lưới đồ, bộ lọc, nút Mặc tốt nhất / Phân giải nhanh chuyển vào Túi đồ.
//  • Túi đồ: tab đáy Trang bị / Tài nguyên; mỗi món 1 hàng (khung, sao, Lv, "cho X XP"); 3 nút đáy:
//    TIẾN KHUNG NHANH (các món đang mặc đủ điều kiện) · PHÂN GIẢI NHANH · MẶC TỐT NHẤT.
//  • Tắt: window.KHO307=false.
const KHO307=(()=>{
 const on=()=>window.KHO307!==false;
 const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 const fmt=n=>Math.round(n||0).toLocaleString('vi-VN');
 const items=()=>{try{return Progress.v70.items();}catch{return [];}};
 const eq=()=>{try{return Progress.v70.equipped()||{};}catch{return {};}};
 const eqIds=()=>Object.values(eq());
 const kname=k=>{try{return Progress.kindName(k);}catch{return k;}};
 const label=it=>{try{return V70T(it);}catch{return '';}};
 const col=it=>{try{return V70C(it);}catch{return '#d6e0ea';}};
 const nOf=it=>{try{const k=TIER70.name.indexOf(V70T(it));return k<0?0:k;}catch{return 0;}};
 const art=it=>{try{return String(Progress.art(it)).replace(/<b>[\s\S]*?<\/b>/g,'');}catch{return '';}};
 const title=it=>{try{return Progress.title(it).split(' · ')[0];}catch{return it.id;}};
 const feed=it=>{try{return NC307.feedXp(it);}catch{return 0;}};
 const capOf=it=>{try{return Workshop.cap(it);}catch{return 100;}};
 let sel=null;
 const B4=k=>(window.KHO307_IMG||{})[k]||'';
 (function(){if(document.getElementById('k307b4'))return;const I=window.KHO307_IMG||{};if(!I.nen_kho)return;const u=k=>'url('+I[k]+')';const c=document.createElement('style');c.id='k307b4';
  c.textContent=':root{--b4-nen:'+u('nen_kho')+';--b4-g:'+u('o_dang_mac_giap')+';--b4-t:'+u('o_dang_mac_ten_lua')+';--b4-p:'+u('o_dang_mac_vu_khi_phu')+';--b4-r0:'+u('hang_tui_trang')+';--b4-r1:'+u('hang_tui_luc')+';--b4-r2:'+u('hang_tui_lam')+';--b4-r3:'+u('hang_tui_tim')+';--b4-on:'+u('tab_day_bat')+';--b4-off:'+u('tab_day_tat')+'}';document.head.appendChild(c);document.documentElement.classList.add('b4307');})();
 // ---------- HỢP THÀNH 5 → 1 (chủ dự án chốt 17/11: 5 Trắng→Lục, 5 Lục→Lam, 5 Lam→Lam+1; trộn mẫu/loại tùy ý; không nhận đồ hợp thể)
 //  số theo Gemini lượt 5: ◈ 150 / 450 / 1.500 · 100 % thành công · Lam→Lam+1 tối đa 10 lượt/ngày · hoàn 85 % XP đã đầu tư bằng Đá XP
 const HOP={rec:[{inN:0,outN:1,cost:150,lim:0,name:'Trắng → Lục'},{inN:1,outN:2,cost:450,lim:0,name:'Lục → Lam'},{inN:2,outN:3,cost:1500,lim:10,name:'Lam → Lam +1'}],K:'saobang-hop307-v1'};
 let hr=0,hp=[],hask=false;
 const day=()=>{const d=new Date();return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();};
 const hopUsed=()=>{try{const v=JSON.parse(localStorage.getItem(HOP.K)||'{}');return v.d===day()?(v.n|0):0;}catch{return 0;}};
 const hopAdd=()=>{try{localStorage.setItem(HOP.K,JSON.stringify({d:day(),n:hopUsed()+1}));}catch{}};
 const hopOk=(it,r)=>it&&!eqIds().includes(it.id)&&!it.super&&!it.key&&!it.directFusion&&!it.fusion&&nOf(it)===r.inN;
 const baseXp=it=>{try{return NC307CFG.feed[nOf(it)];}catch{return 0;}};
 function refundXp(list){let x=0;for(const it of list)x+=Math.max(0,feed(it)-baseXp(it));return x;}
 function giveStones(xp){if(!(xp>0))return '';const o={};for(const t of [4,3,2]){const v=XPDA307.XP[t];o[t]=Math.floor(xp/v);xp-=o[t]*v;}o[1]=Math.ceil(xp/XPDA307.XP[1]);const out=[];for(const t of [4,3,2,1])if(o[t]){XPDA307.add(t,o[t]);out.push(o[t]+' '+XPDA307.NAME[t]);}return out.join(', ');}
 function hopRun(){const r=HOP.rec[hr],list=hp.map(id=>items().find(i=>i.id===id)).filter(i=>hopOk(i,r));
  if(list.length<5)return 'Cần đủ 5 món '+TIER70.name[r.inN]+'.';if(r.lim&&hopUsed()>=r.lim)return 'Hết lượt hôm nay ('+r.lim+'/ngày).';
  if(Progress.balance()<r.cost)return 'Thiếu hợp kim ('+fmt(r.cost)+' ◈).';
  // loại đầu ra theo trọng số đầu vào; mẫu ngẫu nhiên chưa Tím+5
  const kind=list[Math.floor(Math.random()*list.length)].kind;
  const isMax=v=>{try{return MAX307API.isMax('gear',v);}catch{return false;}};
  let pool=(typeof ACTIVE_GEAR_MODELS!=='undefined'?ACTIVE_GEAR_MODELS:Object.keys(GearCatalog)).filter(v=>GearCatalog[v]&&GearCatalog[v].kind===kind&&!isMax(v));
  if(!pool.length)pool=(typeof ACTIVE_GEAR_MODELS!=='undefined'?ACTIVE_GEAR_MODELS:Object.keys(GearCatalog)).filter(v=>GearCatalog[v]&&!isMax(v));
  if(!pool.length)pool=(typeof ACTIVE_GEAR_MODELS!=='undefined'?ACTIVE_GEAR_MODELS:Object.keys(GearCatalog)).filter(v=>GearCatalog[v]&&GearCatalog[v].kind===kind);/* mọi mẫu đã Tím+5: vẫn ra món (dùng làm vật liệu cùng mẫu) */
  const rx=refundXp(list);
  if(!Progress.spendCredits(r.cost))return 'Thiếu hợp kim.';
  let made=null;for(let k=0;k<8&&!made;k++){const v=pool[Math.floor(Math.random()*pool.length)];try{made=Progress.grantChestGear(v,'','legacy');}catch{}}
  if(!made){Progress.grantCredits(r.cost);return 'Không tạo được trang bị, đã hoàn hợp kim.';}
  for(const it of list)Progress.v70.remove(it.id);
  try{V70.setTier('gear',made.id,r.outN);}catch{}
  if(r.lim)hopAdd();const st=giveStones(rx);hp=[];
  try{Progress.render();}catch{}
  window.__hop307=(window.__hop307||[]).concat([{r:hr,out:made.variant,n:r.outN,refund:rx}]);
  return 'HỢP THÀNH: '+title(made)+' · '+TIER70.name[r.outN]+(st?' · hoàn '+st:'');}
 function hopHtml(){const r=HOP.rec[hr],pool=items().filter(i=>hopOk(i,r)&&!hp.includes(i.id)).sort((a,b)=>(a.level-b.level));
  const sl=hp.map(id=>items().find(i=>i.id===id)).filter(Boolean);
  return `<div class="k307-tabs">${HOP.rec.map((x,i)=>`<button data-k="hr" data-id="${i}" class="${i===hr?'on':''}">${u9()?['TRẮNG','LỤC','LAM'][i]:x.name}</button>`).join('')}</div>
  <div class="k307-hop"><p>5 món <b>${TIER70.name[r.inN]}</b> bất kỳ (khác mẫu, khác loại đều được) → 1 món <b>${TIER70.name[r.outN]}</b> ngẫu nhiên. Đồ đang mặc và đồ hợp thể không dùng được.</p>
   <div class="k307-slots">${Array.from({length:5},(_,k)=>{const it=sl[k];return it?`<button data-k="hun" data-id="${esc(it.id)}" style="--c:${col(it)}"><div class="k307-ic">${art(it)}</div><small>Lv${it.level|0}</small></button>`:'<button class="e" disabled>+</button>';}).join('')}</div>
   <div class="k307-hc">Chi phí <b>${fmt(r.cost)} ◈</b>${r.lim?` · hôm nay ${hopUsed()}/${r.lim}`:''}${refundXp(sl)>0?` · <em>hoàn ${fmt(refundXp(sl))} XP bằng Đá XP</em>`:''}</div></div>
  <div class="k307-list">${pool.length?pool.map(it=>`<button class="k307-row" data-k="hadd" data-id="${esc(it.id)}" style="--c:${col(it)}"><div class="k307-ic">${art(it)}</div><div class="k307-ri"><b>${esc(title(it))}</b><small>${esc(kname(it.kind))} · ${esc(label(it))}</small></div><div class="k307-rr"><b>Lv${it.level|0}</b>${it.level>1?'<em>hoàn XP</em>':''}</div></button>`).join(''):'<i>Không còn món '+TIER70.name[r.inN]+' dùng được.</i>'}</div>
  ${hask?`<div class="k307-ask"><div><p>Có món đã nâng Level: phần XP đã đầu tư hoàn <b>85%</b> bằng Đá XP. 5 món sẽ mất hẳn. Tiếp tục?</p><button data-k="hok">Hợp thành</button><button data-k="hno">Thôi</button></div></div>`:''}
  <div class="k307-acts k307-acts2 ${u9()?'k9h':''}"><button data-k="hauto">${u9()?'TỰ ĐỘNG CHỌN':'TỰ CHỌN'}</button>${u9()?'<button data-k="qhop" class="k9ah">TỰ ĐỘNG<br>HỢP THÀNH</button>':''}<button data-k="hgo" class="go" ${sl.length===5?'':'disabled'}>HỢP THÀNH</button></div>`;}               // id món đang chọn trên màn kho
 // ---------- màn Kho ----------
 function patch(){if(!on())return;const body=document.getElementById('hb-body');if(!body)return;const doll=body.querySelector(':scope>.hb-doll');
  if(!doll){body.classList.remove('k307');return;}
  body.classList.add('k307');
  const slots=[...doll.querySelectorAll('.hb-slot')],E=eq(),kinds=Object.keys(E);
  // V307 (18/11): chạm vào chiến cơ ở giữa để chọn tàu — nâng cấp / tiến khung tàu chung chỗ với trang bị (như game cùng thể loại)
  const lc=(()=>{try{return typeof launchCraft==='number'?launchCraft:0;}catch{return 0;}})();
  if(sel&&sel.startsWith&&sel.startsWith('craft:'))sel='craft:'+lc;
  if(!sel||(!sel.startsWith('craft:')&&!eqIds().includes(sel)))sel=E[kinds[0]]||('craft:'+lc);
  const sh=doll.querySelector('.hb-ship');if(sh){sh.classList.toggle('k307-on',sel.startsWith('craft:'));if(!sh.__k307){sh.__k307=1;sh.addEventListener('click',()=>{if(!on())return;sel='craft:'+lc;patch();},true);}
   if(!sh.querySelector('.k307-sht')){const t=document.createElement('span');t.className='k307-sht';t.textContent='CHẠM ĐỂ CHỌN TÀU';sh.appendChild(t);}}
  slots.forEach((s,i)=>{const id=E[kinds[i]];s.classList.toggle('k307-on',!!id&&id===sel);{const a=s.querySelector('[class*=gear25-]');const m=a&&String(a.className).match(/gear25-(armor|missiles|sidearm)/);if(m&&s.dataset.k307k!==m[1])s.dataset.k307k=m[1];}if(!s.__k307){s.__k307=1;s.addEventListener('click',ev=>{if(!on())return;const k=Object.keys(eq())[[...doll.querySelectorAll('.hb-slot')].indexOf(s)];const id=eq()[k];if(!id)return;if(sel!==id){sel=id;ev.stopImmediatePropagation();ev.preventDefault();patch();}},true);}});
  let bar=body.querySelector(':scope>.k307-bar');
  if(!bar){bar=document.createElement('div');bar.className='k307-bar';bar.innerHTML='<div class="k307-two"><button data-k="up">NÂNG CẤP<small></small></button><button data-k="adv">TIẾN KHUNG<small></small></button></div><button data-k="bag" class="k307-bag">'+(B4('icon_tui_do')?'<img class="k307-bi" src="'+B4('icon_tui_do')+'" alt="">':'🎒')+' TÚI ĐỒ <small></small></button>';
   bar.addEventListener('click',e=>{const b=e.target.closest('[data-k]');if(!b)return;const k=b.dataset.k;if(k==='up'){if(sel)NC307.open(sel);}else if(k==='adv'){if(sel)NC307.open(sel,'adv');}else if(k==='bag')bag();});
   const m7=body.querySelector(':scope>.m7-card');(m7||doll).after(bar);}
  if(sel.startsWith('craft:')){const i=+sel.slice(6);let v=null,nm='Chiến cơ',n=0;try{v=Workshop.craftProgress(i);}catch{}try{nm=Fighters28.profiles[i].name;}catch{}try{n=V70.craftN(i);}catch{}
   bar.querySelector('[data-k=up] small').textContent=nm+(v?' · Lv'+(v.level|0)+'/'+capOf(v):'');bar.querySelector('[data-k=adv] small').textContent=TIER70.name[n]||'';}
  else{const it=sel&&items().find(i=>i.id===sel);
  bar.querySelector('[data-k=up] small').textContent=it?title(it)+' · Lv'+(it.level|0)+'/'+capOf(it):'';
  bar.querySelector('[data-k=adv] small').textContent=it?label(it):'';}
  bar.querySelector('[data-k=bag] small').textContent=items().length+' món';}
 setInterval(()=>{try{patch();}catch{}},400);
 // ---------- Túi đồ ----------
 let el=null,tab='gear',kf='all',msg='',bm='bag';
 const u9=()=>window.UX9!==false;
 // V309 Lượt 9: nút hành động thông minh cho mỗi dòng (TIẾN KHUNG / CƯỜNG HÓA / Đã đầy cấp / TRANG BỊ)
 function smart(K,ref,isEq,lv,cap){if(!isEq)return K==='craft'?`<span class="k9a b" data-k="sship" data-id="${ref}">TRANG BỊ</span>`:`<span class="k9a b" data-k="seq" data-id="${esc(ref)}">TRANG BỊ</span>`;let p=null;try{p=Evo82.plan(K,ref);}catch{}const id=K==='craft'?'craft:'+ref:ref;
  if(p&&!p.max&&(p.ok||lv>=cap))return `<span class="k9a" data-k="sadv" data-id="${esc(id)}">TIẾN BẬC</span>`;if(lv<cap)return `<span class="k9a" data-k="sup" data-id="${esc(id)}">CƯỜNG HÓA</span>`;return '<span class="k9a m">Đã đầy cấp</span>';}
 function mergeXp(){let a=0,b=0;try{const D=XPDA307;while(D.have(1)>=4){if(!D.spend({1:4}))break;D.add(2,1);a++;}while(D.have(2)>=4){if(!D.spend({2:4}))break;D.add(3,1);b++;}}catch{}return a||b?'Gộp kinh nghiệm: '+(a?a+' '+XPDA307.NAME[2]:'')+(a&&b?', ':'')+(b?b+' '+XPDA307.NAME[3]:'')+' (4 viên → 1 viên lớn, giữ nguyên tổng XP).':'Chưa đủ 4 viên Đá XP cùng loại để gộp.';}
 function resetIt(id){const it=items().find(i=>i.id===id);if(!it||eqIds().includes(id)||(it.level|0)<=1)return 'Món này không hoàn nguyên được.';const rx=Math.floor((()=>{try{return NC307.invested(it);}catch{return refundXp([it]);}})());try{Progress.v70.set(id,{level:1});}catch{return 'Lỗi hoàn nguyên.';}try{NC307.clearX(id);}catch{}const st=giveStones(rx);try{Progress.render();}catch{}return 'HOÀN NGUYÊN: '+title(it)+' về Lv1'+(st?' · nhận '+st:'');}
 function quickHop(){let n=0,last='';for(let r=0;r<HOP.rec.length;r++){for(let g=0;g<30;g++){const rec=HOP.rec[r];const pool=items().filter(i=>hopOk(i,rec)&&(i.level|0)<=1);if(pool.length<5)break;hr=r;hp=pool.slice(0,5).map(i=>i.id);const m=hopRun();if(!/^HỢP THÀNH/.test(m)){last=m;hp=[];break;}n++;}}return n?'Đã hợp thành '+n+' lần (chỉ dùng đồ Lv1 chưa mặc).':(last||'Không đủ 5 món Lv1 chưa mặc cùng khung để hợp thành.');}
 function rowHtml(it){const e=eqIds().includes(it.id);let st='';try{const a=Progress.stat(it);st=it.kind==='armor'?`Giáp ${a.armor.toFixed(1)} · Máu ${a.hp.toFixed(1)}`:`ST ${a.auxDamage.toFixed(2)} · ${a.interval.toFixed(2)} s`;}catch{}
  const n=nOf(it),fr=[0,1,2,2,2,2,3,3,3,3,3,3][n],plus=n<2?0:n<6?n-2:n-6;
  return `<button class="k307-row" data-f="${fr}" data-k="item" data-id="${esc(it.id)}" style="--c:${col(it)}"><div class="k307-ic">${art(it)}</div><div class="k307-ri"><b>${esc(title(it))}</b><span>${'★'.repeat(fr+1)}${'✦'.repeat(plus)} <small>${esc(label(it))}</small></span><small>${kf==='all'?esc(kname(it.kind))+' · ':''}${st}</small></div><div class="k307-rr"><b>Lv${it.level|0}<small>/${capOf(it)}</small></b>${u9()?(e?'<s>Đang mặc</s>':'')+smart('gear',it.id,e,it.level|0,capOf(it)):(e?'<s>Đang mặc</s>':`<em>cho ${fmt(feed(it))} XP</em>`)}</div></button>`;}
 // V307 (18/11): túi gồm cả chiến cơ (tab Chiến cơ đầu tiên) và bản sao / phôi từ phó bản, sự kiện, phần thưởng (dùng làm vật liệu cùng mẫu)
 const FR=n=>[0,1,2,2,2,2,3,3,3,3,3,3][n|0]|0,PL=n=>n<2?0:n<6?n-2:n-6;
 const fcol=n=>{try{return TIER70.fcol[TIER70.frame[n]];}catch{return '#d6e0ea';}};
 const shipNm=i=>{try{return Fighters28.profiles[i].name;}catch{return 'Chiến cơ '+(i+1);}};
 const FORM=['thuong','luc','lam','lam','lam','lam','tim','tim','tim','tim','tim','tim5'];
 const shipArt=(i,n)=>{try{const S=SHIP118[i];const src=S[FORM[n]]||S.tim||S.lam||S.thuong;return src?`<img src="${src}" alt="" style="width:50px;height:50px;object-fit:contain">`:'';}catch{return '';}};
 function shipRows(){const out=[];for(let i=0;i<13;i++){let own=false;try{own=Campaign36.ownsCraft(i);}catch{}if(!own)continue;let v={level:1},n=0;try{v=Workshop.craftProgress(i);}catch{}try{n=V70.craftN(i);}catch{}
   const cur=(()=>{try{return launchCraft===i;}catch{return false;}})();
   out.push({s:(cur?1e6:0)+n*1000+(v.level|0),h:`<button class="k307-row" data-f="${FR(n)}" data-k="ship" data-id="${i}" style="--c:${fcol(n)}"><div class="k307-ic">${shipArt(i,n)}</div><div class="k307-ri"><b>${esc(shipNm(i))}</b><span>${'★'.repeat(FR(n)+1)}${'✦'.repeat(PL(n))} <small>${esc(TIER70.name[n]||'')}</small></span><small>${kf==='all'?'Chiến cơ · ':''}Hệ số ×${(()=>{try{return Workshop.levelFactor(v).toFixed(2);}catch{return '1.00';}})()}</small></div><div class="k307-rr"><b>Lv${v.level|0}<small>/${capOf(v)}</small></b>${cur?'<s>Đang dùng</s>':''}${u9()?smart('craft',i,cur,v.level|0,capOf(v)):''}</div></button>`});}
  return out.sort((a,b)=>b.s-a.s).map(x=>x.h);}
 function copyRows(){let L=[];try{L=Evo82.list();}catch{}return L.filter(c=>{const kd=c.k==='craft'?'craft':(()=>{try{return GearCatalog[c.m].kind;}catch{return '';}})();return kf==='all'||kf===kd;}).sort((a,b)=>b.t-a.t||b.lv-a.lv).map(c=>{
   const isS=c.k==='craft',nm=isS?shipNm(c.m|0):(()=>{try{return GearCatalog[c.m].name;}catch{return c.m;}})(),kd=isS?'Chiến cơ':(()=>{try{return kname(GearCatalog[c.m].kind);}catch{return '';}})();
   const ic=isS?shipArt(c.m|0,c.t):(()=>{try{return art({id:'c',variant:c.m,kind:GearCatalog[c.m].kind,level:c.lv,rarity:'normal',rank:'',grade:'',enhance:0});}catch{return '';}})();
   return `<button class="k307-row cp" data-f="${FR(c.t)}" data-k="copy" data-id="${c.u}" style="--c:${fcol(c.t)}"><div class="k307-ic">${ic}</div><div class="k307-ri"><b>${esc(nm)}</b><span>${'★'.repeat(FR(c.t)+1)}${'✦'.repeat(PL(c.t))} <small>${esc(TIER70.name[c.t]||'')}</small></span><small>${kf==='all'?esc(kd)+' · ':''}Bản sao · vật liệu cùng mẫu${c.lk?' · 🔒':''}</small></div><div class="k307-rr"><b>Lv${c.lv}</b><s class="cp">Bản sao</s></div></button>`;});}
 function resHtml(){const R=[];try{for(const t of XPDA307.types)R.push([XPDA307.NAME[t],XPDA307.have(t),fmt(XPDA307.XP[t])+' XP / viên',XPDA307.COL[t],'◆',XPDA307.IMG(t)]);}catch{}
  try{R.push(['Hợp kim',Progress.balance(),'Tiền tệ chính: nâng bậc, tiến khung, phi công','#ffd166','◈',(window.TN307_IMG||{}).hop_kim]);}catch{}
  try{R.push(['Lõi Siêu Hợp',Meta407.cores(),'Tiến bậc phi công Tím / Tím+5, cây tiềm năng','#c77dff','✪',(window.TN307_IMG||{}).loi_sieu_hop]);}catch{}
  try{R.push(['Bản sao (kho)',Evo82.list().length,'Nguyên liệu tiến khung','#7fdcff','❖',(window.TN307_IMG||{}).ban_sao_cc]);}catch{}
  try{R.push(['Vé càn quét',V75.state?V75.state().tk:0,'Càn quét nhanh ải đã đạt 3 sao','#7fdcff','🎫',(window.TN307_IMG||{}).ve]);}catch{}
  try{for(const ty of MAT69.types)for(const m of [1,2,3]){const id=ty.id+m;R.push([V70.matName(id),V70.have(id),'Nguyên liệu tiến khung '+['','Lục','Lam','Tím'][m],['','#3ee08f','#3aa8ff','#b45cff'][m],'◆',(typeof MAT69_ART!=='undefined'&&MAT69_ART[id])||'']);}}catch{}
  return R.map(r=>`<div class="k307-row k307-res" style="--c:${r[3]}"><div class="k307-ic">${r[5]?`<img src="${r[5]}" alt="" style="width:46px;height:46px;object-fit:contain">`:`<i>${r[4]}</i>`}</div><div class="k307-ri"><b>${esc(r[0])}</b><small>${esc(r[2])}</small></div><div class="k307-rr"><b>${fmt(r[1])}</b></div></div>`).join('');}
 function render(){if(!el)return;const all=items(),kinds=[...new Set(all.map(i=>i.kind))];
  let l=tab==='gear'?all.filter(i=>kf==='all'||i.kind===kf).sort((a,b)=>(eqIds().includes(b.id)-eqIds().includes(a.id))||nOf(b)-nOf(a)||(b.level-a.level)):[];
  let rows=tab==='gear'?((kf==='all'||kf==='craft')?shipRows():[]).concat(l.map(rowHtml),copyRows()):[];
  if(u9()&&tab==='gear'&&kf==='all'){const sr=shipRows(),cs=(()=>{try{return Campaign36.ownsCraft(launchCraft);}catch{return true;}})()?sr.slice(0,1):[],eqL=l.filter(i=>eqIds().includes(i.id)),otL=l.filter(i=>!eqIds().includes(i.id));rows=cs.concat(eqL.map(rowHtml),sr.slice(cs.length),otL.map(rowHtml),copyRows());}const nCp=(()=>{try{return Evo82.list().length;}catch{return 0;}})();
  const C9=u9()&&bm==='cai';el.querySelector('.k307-in').innerHTML=`<div class="k307-top"><b>${C9?'CẢI TẠO':'TÚI ĐỒ'}</b><span>${tab==='gear'?all.length+(window.POLISH12!==false?' món · ':' trang bị · ')+nCp+' bản sao':tab==='hop'?'Hợp thành':tab==='mel'?'Tách / Hoàn nguyên':'Tài nguyên'}</span>${u9()&&tab==='gear'?'<button data-k="best" class="k9best">MẶC TỐT NHẤT</button>':''}<button data-k="x" aria-label="Đóng">✕</button></div>
   ${tab==='gear'?`<div class="k307-tabs"><button data-k="kf" data-id="all" class="${kf==='all'?'on':''}">Tất cả</button><button data-k="kf" data-id="craft" class="${kf==='craft'?'on':''}">Chiến cơ</button>${kinds.map(k=>`<button data-k="kf" data-id="${esc(k)}" class="${kf===k?'on':''}">${esc(kname(k))}</button>`).join('')}</div>`:''}
   ${tab==='mel'?`<div class="k307-hop"><p><b>TÁCH / HOÀN NGUYÊN</b>: đưa món chưa mặc đã nâng cấp về <b>Lv1</b>, hoàn <b>100 %</b> XP đã đầu tư bằng Đá XP. Khung (tiến bậc) giữ nguyên.</p></div><div class="k307-list">${(()=>{const L=items().filter(i=>!eqIds().includes(i.id)&&(i.level|0)>1&&!i.super&&!i.fusion).sort((a,b)=>b.level-a.level);return L.length?L.map(it=>`<div class="k307-row" style="--c:${col(it)}"><div class="k307-ic">${art(it)}</div><div class="k307-ri"><b>${esc(title(it))}</b><small>${esc(kname(it.kind))} · ${esc(label(it))}</small></div><div class="k307-rr"><b>Lv${it.level|0}</b><span class="k9a" data-k="rst" data-id="${esc(it.id)}">HOÀN NGUYÊN</span><em>+${fmt(Math.floor((()=>{try{return NC307.invested(it);}catch{return refundXp([it]);}})()))} XP</em></div></div>`).join(''):'<i>Không có món chưa mặc nào đã nâng cấp.</i>';})()}</div>`:tab==='hop'?hopHtml():`<div class="k307-list">${tab==='gear'?(rows.length?rows.join(''):'<i>Túi trống.</i>'):resHtml()}</div>`}
   ${msg?`<p class="k307-m">${esc(msg)}</p>`:''}
   ${tab==='gear'?`${u9()?'<div class="k307-acts k9acts"><button data-k="qadv">TIẾN BẬC<br>NHANH</button><button data-k="qxp">GỘP KINH<br>NGHIỆM</button><button data-k="qm">BÁN /<br>PHÂN GIẢI</button></div>':'<div class="k307-acts"><button data-k="qadv">TIẾN KHUNG<br>NHANH</button><button data-k="qm">PHÂN GIẢI<br>NHANH</button><button data-k="best">MẶC TỐT<br>NHẤT</button></div>'}`:''}
   <div class="k307-foot">${C9?(tab==='mel'?'<button data-k="tab" data-id="hop" class="k9sw">⇄ HỢP THÀNH</button>':'<button data-k="tab" data-id="mel" class="k9sw">⇄ TÁCH / HOÀN NGUYÊN</button>'):u9()?`<button data-k="tab" data-id="gear" class="${tab==='gear'?'on':''}">TRANG BỊ</button><button data-k="tab" data-id="res" class="${tab==='res'?'on':''}">TÀI NGUYÊN</button>`:`<button data-k="tab" data-id="gear" class="${tab==='gear'?'on':''}">TRANG BỊ</button><button data-k="tab" data-id="hop" class="${tab==='hop'?'on':''}">HỢP THÀNH</button><button data-k="tab" data-id="res" class="${tab==='res'?'on':''}">TÀI NGUYÊN</button>`}</div>`;}
 function quickAdv(){let n=0;for(const id of eqIds()){try{for(let g=0;g<11;g++){const p=Evo82.plan('gear',id);if(!p||p.max||!p.ok)break;if(!Evo82.doBreak('gear',id))break;n++;}}catch{break;}}return n;}
 function click(e){const b=e.target.closest('[data-k]');if(!b||!el.contains(b))return;const k=b.dataset.k,id=b.dataset.id;msg='';
  if(k==='x'){close();return;}
  if(k==='tab'){tab=id;hp=[];hask=false;}else if(k==='kf')kf=id;
  else if(k==='hr'){hr=+id;hp=[];}
  else if(k==='hadd'){if(hp.length<5&&!hp.includes(id))hp.push(id);}
  else if(k==='hun'){hp=hp.filter(x=>x!==id);}
  else if(k==='hauto'){const r=HOP.rec[hr];hp=items().filter(i=>hopOk(i,r)).sort((a,b)=>a.level-b.level).slice(0,5).map(i=>i.id);if(hp.length<5)msg='Chỉ có '+hp.length+' món '+TIER70.name[r.inN]+' dùng được.';}
  else if(k==='hgo'){const sl=hp.map(x=>items().find(i=>i.id===x)).filter(Boolean);if(sl.some(i=>i.level>1)&&!hask){hask=true;}else{hask=false;msg=hopRun();}}
  else if(k==='hok'){hask=false;msg=hopRun();}
  else if(k==='hno'){hask=false;}
  else if(k==='sup'){close();try{NC307.open(id);}catch{}return;}
  else if(k==='sadv'){close();try{NC307.open(id,'adv');}catch{}return;}
  else if(k==='sship'){try{selectCraft(+id);msg='Đã chọn chiến cơ '+shipNm(+id)+'.';}catch{msg='Không chọn được chiến cơ.';}}
  else if(k==='seq'){try{Progress.equip(id);msg='Đã trang bị.';}catch{msg='Không trang bị được.';}}
  else if(k==='qhop'){msg=quickHop();}
  else if(k==='qxp'){msg=mergeXp();}
  else if(k==='rst'){msg=resetIt(id);}
  else if(k==='mel'){const q=document.getElementById('hb-qm');if(q){q.click();msg='Đã phân giải đồ Trắng/Lục thừa (không mặc).';}else msg='Chưa có món để phân giải.';}
  else if(k==='item'){close();if(u9()){try{NC307.open(id);}catch{}return;}try{Hub40.openItem(id);}catch{}return;}
  else if(k==='ship'){close();try{NC307.open('craft:'+id);}catch{}return;}
  else if(k==='copy'){msg='Bản sao: đặt vào ô vật liệu khi NÂNG CẤP hoặc tự tính khi TIẾN KHUNG món / tàu cùng mẫu.';}
  else if(k==='qadv'){const n=quickAdv();msg=n?'Đã tiến khung '+n+' lần cho đồ đang mặc.':'Đồ đang mặc chưa đủ điều kiện tiến khung (trần cấp, bản sao, hợp kim).';}
  else if(k==='qm'){const q=document.getElementById('hb-qm');if(q){q.click();msg='Đã phân giải đồ Trắng/Lục thừa.';}}
  else if(k==='best'){const q=document.getElementById('hb-best');if(q){q.click();msg='Đã mặc bộ tốt nhất.';}}
  render();}
 function bag(md){if(!on())return;bm=md==='cai'?'cai':'bag';if(bm==='cai'){if(tab!=='hop'&&tab!=='mel')tab='hop';}else if(u9()&&(tab==='hop'||tab==='mel'))tab='gear';if(!el){el=document.createElement('div');el.id='k307';el.innerHTML='<div class="k307-in"></div>';el.addEventListener('click',click);document.body.appendChild(el);}el.classList.add('open');render();}
 function close(){if(el)el.classList.remove('open','k9top');}
 return {bagRes:()=>{bag();tab='res';if(el)el.classList.add('k9top');render();},bag,close,patch,sel:()=>sel,hop:{run:hopRun,set:(r,ids)=>{hr=r;hp=ids.slice();},used:hopUsed,cfg:HOP}};
})();
// V307 · thanh tài nguyên dùng biểu tượng GPT (hợp kim, lõi); ô "Đá nâng cấp" cũ ở sảnh thành tổng XP của Đá XP, ẩn ở đầu màn Kho; mảnh phi công có biểu tượng
(function(){
 const I=k=>(window.TN307_IMG||{})[k]||'',XI=()=>{try{return XPDA307.IMG(3);}catch{return '';}};
 const fmt=n=>Math.round(n||0).toLocaleString('vi-VN'),xpTot=()=>{try{return XPDA307.total();}catch{return 0;}};
 const img=(src,c)=>`<img class="r307i${c?' '+c:''}" src="${src}" alt="">`;
 function tick(){if(window.KHO307===false)return;
  // sảnh
  const set=(chipSel,src,val,title)=>{const b=document.querySelector(chipSel);if(!b)return;const chip=b.closest('.h1-chip')||b.parentElement;const im=chip&&chip.querySelector('img');if(im&&src&&im.src!==src)im.src=src;if(val!=null){const t=fmt(val);if(b.textContent!==t)b.textContent=t;b.title=title||t;}if(title&&chip)chip.title=title;};
  if(!document.getElementById('r307css')&&I('hop_kim')){const c=document.createElement('style');c.id='r307css';c.textContent='html body .h1-chip:has(#h1-cr) img{content:url('+I('hop_kim')+')!important;object-fit:contain}html body .h1-chip:has(#h1-core) img{content:url('+I('loi_sieu_hop')+')!important;object-fit:contain}html body .h1-chip:has(#h1-exp) img{content:url('+XI()+')!important;object-fit:contain}html body #hb-res button[data-r=e]{display:none!important}';document.head.appendChild(c);}
  {const e=document.getElementById('h1-exp');if(e){const v=xpTot(),t=v>=1e6?(Math.floor(v/1e5)/10).toLocaleString('vi-VN')+'M':v>=1e4?Math.floor(v/1e3).toLocaleString('vi-VN')+'K':fmt(v);if(e.textContent!==t)e.textContent=t;e.title='Đá XP: '+fmt(v)+' XP';const ch=e.closest('.h1-chip');if(ch)ch.title='Đá XP (tổng XP)';}}
  // đầu các màn Kho / Chiến cơ
  document.querySelectorAll('#hb-res button[data-r]').forEach(b=>{const r=b.dataset.r;const src=r==='c'?I('hop_kim'):(r==='core'||r==='k')?I('loi_sieu_hop'):'';if(!src)return;
   const i=b.querySelector('i');const val=r==='e'?fmt(xpTot()):(i?i.textContent:'');const key=src.slice(-20)+val;if(b.dataset.r307===key)return;b.dataset.r307=key;b.innerHTML=img(src)+'<i>'+val+'</i>';if(r==='e')b.title='Đá XP (tổng XP)';});
  // mảnh phi công
  document.querySelectorAll('.pl67-st').forEach(p=>{if(p.querySelector('.r307i'))return;const h=p.innerHTML;if(!/Mảnh: \d/.test(h)||!I('manh_pc'))return;p.innerHTML=h.replace(/Mảnh: (\d[\d.]*)/,img(I('manh_pc'),'pc')+' $1');});}
 setInterval(()=>{try{tick();}catch{}},500);
 const st=document.createElement('style');st.textContent='.r307i{width:18px;height:18px;object-fit:contain;vertical-align:-4px;margin-right:3px}.r307i.pc{width:20px;height:20px;margin:0 2px 0 4px}#hb-res button .r307i{width:20px;height:20px}';document.head.appendChild(st);
})();
